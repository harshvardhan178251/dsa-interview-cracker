---
title: Design a video streaming platform
order: 10
summary: YouTube-style — transcoding pipelines, adaptive bitrate streaming, CDN delivery, the watch-history write path, and feed ranking.
---

# Design a video streaming platform

*YouTube-scale: upload, transcode, deliver, and personalise.*

## Requirements

**Functional**
- Upload a video, get a shareable URL.
- Play back with adaptive quality.
- Like, comment, subscribe, watch history, recommendations.

**Non-functional**
- Video is **write-heavy on ingest** and **read-heavy on playback** — the exact opposite
  of a typical application.
- Playback must start in **under 2 seconds**.
- Support for hundreds of millions of videos.

**Estimates**

```
500M videos × avg 20 MB = 10 PB of source video
Transcoding: each video produces ~5 renditions ≈ 50 PB stored
Playback: 1B hours/day watched; average bitrate 5 Mbps
  → 1B × 3600 s × 5 Mbps ≈ 2.25 PB/hour ≈ 1.8 EB/year of egress
```

**The egress number is the design.** 1.8 EB/year at $0.05/GB is roughly **$90M a year**.
Everything about this system follows from the fact that **CDN delivery is the dominant
cost**, and that a 5% reduction in egress is worth more than any backend optimisation.

## Ingest pipeline

```
Client ──▶ Upload Service ──▶ Object Storage (raw)  ──▶ Transcode Queue
                                                            │
                                                            ▼
                                                     Transcoder fleet
                                                            │
                          ┌─────────────────┬───────────────┼──────────────┐
                          ▼                 ▼               ▼              ▼
                      144p            360p            720p           1080p
                          └─────────────────┴───────────────┴──────────────┘
                                            │
                                            ▼
                                    Object Storage (renditions) + CDN
```

**Upload directly to object storage** via a pre-signed URL. The bytes never pass through
your servers — that would mean 1.8 PB of egress just for uploading.

**Transcoding is the expensive step.** It is CPU-bound and slow (a 10-minute video at 1080p
takes minutes of CPU). So:

- Queue the job (Kafka/SQS).
- A fleet of workers pulls jobs, auto-scaling on queue depth.
- Each rendition is independent, so it can be produced in parallel.
- Upload each rendition to storage as soon as it is finished, and publish the video as
  soon as the minimum viable set (say, 360p and 720p) is done. Do not wait for 4K.

**Use a preset ladder** — 144p, 240p, 360p, 480p, 720p, 1080p, 1440p, 2160p, plus audio
only. Precompute the ladder; do not make users choose.

## Playback and adaptive bitrate

**HLS or DASH** — the manifest (`.m3u8` / `.mpd`) describes the available renditions, and
the player picks based on bandwidth.

```
master.m3u8
  ├── 360p/playlist.m3u8
  ├── 720p/playlist.m3u8
  └── 1080p/playlist.m3u8
```

**Segmented delivery** — each rendition is split into 4–10 second segments so the player
can switch quality mid-stream without re-buffering.

**Why the CDN dominates:**

- Video is immutable once transcoded. Cache it forever — content-addressed by video id
  and rendition.
- The CDN is a massive distributed cache, which is exactly the right shape for immutable
  media.
- The origin is hit only on a cache miss, which is rare.

**Never let a hot video hit the origin.** A viral video with 100M views in a day would
destroy the storage service. Use a **cache reservation** or push the asset to the CDN
ahead of a known launch.

## Data model

```sql
CREATE TABLE videos (
  id            UUID PRIMARY KEY,
  owner_id      BIGINT NOT NULL,
  title         TEXT,
  duration_ms   INTEGER,
  status        TEXT NOT NULL,     -- UPLOADING, PROCESSING, READY, FAILED
  visibility    TEXT NOT NULL,     -- PUBLIC, PRIVATE, UNLISTED
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE video_assets (
  video_id      UUID NOT NULL,
  rendition    TEXT NOT NULL,       -- '720p'
  bucket       TEXT NOT NULL,
  key          TEXT NOT NULL,       -- 'videos/{id}/720p/playlist.m3u8'
  bitrate_kbps INTEGER,
  width        INTEGER,
  height       INTEGER,
  size_bytes   BIGINT,
  PRIMARY KEY (video_id, rendition)
);

CREATE TABLE watch_history (
  user_id     BIGINT NOT NULL,
  video_id    UUID NOT NULL,
  position_ms INTEGER,               -- resume position
  watched_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, video_id)
);
CREATE INDEX idx_watch_user_time ON watch_history (user_id, watched_at DESC);

CREATE TABLE subscriptions (
  user_id     BIGINT NOT NULL,
  channel_id  BIGINT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, channel_id)
);
```

**Watch history is written constantly.** Every play and every progress update is a write.
At 1B hours watched per day with progress updates every 10 seconds, that is enormous.

**Batch the writes.** The client buffers progress locally and flushes every 30–60 seconds
or on pause/stop. Even better, write to a queue and consume into the database in batches.
And **drop the write if nothing changed** — a viewer watching a 3-minute video at 5-second
granularity generates far fewer meaningful updates than raw play events.

## Recommendations

A recommendation system is a pipeline, not a single query:

```
Candidates  →  Ranked  →  Post-processing  →  Served
```

| Stage | Approach | Cost |
|---|---|---|
| **Candidate generation** | Matrix factorisation, item-to-item similarity, "more from this channel", trending | Cheap, broad |
| **Ranking** | A learned model (gradient-boosted trees or a neural net) over hundreds of features | Expensive, precise |
| **Post-processing** | Diversity, ad slots, filtering already-watched items, deduplication | Cheap |

**Feature examples:** what the user watched and for how long, channel affinity, recency,
title/embedding similarity, the time of day, the device.

**Serve from a precomputed cache.** You cannot run a neural ranker in the request path at
YouTube scale. Precompute the top-N recommendations per user every few minutes and serve
them from a cache; refresh in the background.

**Cold start.** A brand-new video has no engagement signal. Seed it with content-based
similarity and give it a small exploration budget.

**Explore vs exploit.** Pure exploitation starves new content. Allocate ~5–10% of
impressions to exploration.

## Watch history and recommendations at scale

Separate the **hot path** (serve a feed) from the **write path** (record behaviour):

```
Watch event ──▶ Kafka ──▶ consumer ──▶ watch_history (batched)
                         └──▶ feature store (near real time)
                         └──▶ offline training pipeline
```

The training pipeline reads from the event stream, not from the operational database.

## Comments and notifications

Comments are another write-heavy, read-heavy entity, and they are the classic **fan-out
on write** case:

```
Comment added
  → notify the video owner
  → notify subscribers (millions) → fan out on WRITE into a notification queue
  → notifications are batched and digested (YouTube groups them by channel)
```

Batching notifications into a digest is what keeps this tractable. If the digest does not
help, fan out on read with a capped list of recent commenters.

## Failure modes

| Failure | Mitigation |
|---|---|
| The transcoder queue backs up | Autoscale on queue depth; show "processing" in the UI; process a low-res rendition first |
| A viral video overwhelms the CDN | Pre-warm the CDN; serve from cache; only the origin misses hurt |
| The metadata database is down | The CDN still serves the video bytes; only the page metadata fails — degrade to a minimal page |
| A recommendation service is down | Fall back to trending or to the subscription feed |
| The event stream falls behind | Recommendations go stale but playback is unaffected — decouple them |

## Monitoring

- **Transcode queue depth** and time-to-ready per video.
- **Startup time** (TTFB of the manifest + first segment). This is the user-visible metric.
- CDN hit ratio and **egress volume and cost**.
- Rebuffer rate per rendition and per client network.
- Recommendation click-through rate.
- Playback error rate by client platform.

## Follow-ups to expect

- **"How do you handle live streaming?"** → the same pipeline without the pre-transcode
  step; instead, segment the live stream in near real time (a low-latency packaging
  worker) and push the segments to the CDN. The manifest is rewritten continuously.
- **"How do you support offline viewing?"** → a signed-URL manifest that the client
  downloads and plays locally; DRM for premium content.
- **"How do you prevent piracy?"** → you do not, fully. You can make it inconvenient:
  signed URLs that expire, DRM (Widevine/FairPlay), watermarking, and fingerprinting.
- **"How do you reduce cost?"** → improve the CDN hit ratio, use more efficient codecs
  (AV1/HEVC cut bandwidth 30–50% versus H.264), and cap the rendition ladder for
  long-tail content.
- **"How do you handle a video that fails to transcode?"** → mark it FAILED, notify the
  owner, and retry with a different preset. A dead-letter queue handles the poison case.
