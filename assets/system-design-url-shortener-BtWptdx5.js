var e=`system-design:url-shortener`,t=`
# Design a URL shortener

*TinyRocketURL, a Bitly clone.*

## Requirements

**Functional**
- \`POST /urls {longUrl}\` → \`GET /{shortCode}\` redirects to the long URL.
- Optional: custom alias, expiry date, click analytics.

**Non-functional**
- Redirects must be fast — this is the whole product.
- **5,000 URLs created per hour per user.**
- ~100M URLs created per month (a modest figure — Bitly does billions).
- Read:write ratio is about **100:1**.

**Estimates**

\`\`\`
100M URLs/month  → ~40 URLs/second average, ~800/s peak
Storage: 100M/month × 12 months × ~500 bytes ≈ 600 GB/year
Read traffic: 800/s peak × 100 (read multiplier) ≈ 80,000 reads/s peak
\`\`\`

## High-level design

\`\`\`
Client ──▶ Load Balancer ──▶ API Server ──▶ Cache (Redis) ──▶ Object Store / DB
                │                 │                                  │
                │                 └──▶ write path (encode + persist)  │
                └──▶ redirect path (cache hit = 99% of traffic) ──────┘
\`\`\`

**The key insight: this is a read-heavy, cache-friendly system.** Almost every request is
a redirect, and almost every redirect is a cache hit. Design for the read path first.

## Data model

\`\`\`sql
CREATE TABLE urls (
  short_code   VARCHAR(20) PRIMARY KEY,
  long_url     TEXT        NOT NULL,
  user_id      BIGINT      NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at   TIMESTAMPTZ,
  click_count  BIGINT      NOT NULL DEFAULT 0
);
CREATE INDEX idx_urls_user ON urls (user_id, created_at DESC);
\`\`\`

**Do not store the click count in the same row.** Every redirect would then write to the
primary database, destroying the read advantage. Push click events to a queue instead:

\`\`\`
Redirect ──▶ Cache hit ──▶ respond ──▶ publish "clicked" event
                                              │
                                              ▼
                                      Kafka ──▶ analytics consumer ──▶ ClickHouse
\`\`\`

## Short code generation

This is the part interviewers actually want to discuss. There are three approaches.

### 1. Hash the URL (base62 of a hash)

\`\`\`java
String code = base62(md5(longUrl).getBytes());   // truncated to 7 chars
\`\`\`

- **Pro:** deterministic — the same URL always yields the same code, so you can check for
  collisions with a lookup and no counter is needed.
- **Con:** you lose control of the length, and a hash prefix leaks that the same URL was
  shared twice (a minor privacy concern).

### 2. Counter + base62 (Snowflake-style)

\`\`\`java
long id = counter.incrementAndGet();          // global or per-user counter
String code = base62(id);
\`\`\`

- **Pro:** short, predictable, collision-free, and you can embed metadata in the ID.
- **Con:** sequential IDs leak volume information and let an attacker enumerate. Mitigate by
  starting the counter at a random offset, or by using a distributed ID generator
  (Snowflake: timestamp + machine id + sequence).

### 3. Random with collision check

\`\`\`java
do {
    code = randomBase62(7);
} while (!db.insertIfAbsent(code, longUrl));   // unique constraint handles it
\`\`\`

- **Pro:** unpredictable, no enumeration.
- **Con:** needs a retry loop and a unique index.

**The robust version of (2) that I would actually build:**

\`\`\`java
public String create(String longUrl, long userId) {
    for (int attempt = 0; attempt < 5; attempt++) {
        String code = randomBase62(7);           // 62^7 ≈ 3.5 trillion combinations
        if (repository.insertIfAbsent(code, longUrl, userId)) {
            return code;
        }
    }
    throw new IllegalStateException("Could not allocate a unique code");
}
\`\`\`

With a **unique constraint on \`short_code\`**, the collision check is a single insert
attempt. No distributed lock needed, no counter to keep in sync. At 7 characters with
base62 you have 3.5 trillion codes; at 800 URLs/second you would need ~28,000 years to
exhaust them, so a collision is rare and the retry loop almost always succeeds on the
first try.

**If you want custom aliases**, check availability first and fall back to a generated
code on conflict.

## The redirect path

\`\`\`java
@GetMapping("/{code}")
public void redirect(@PathVariable String code, HttpServletResponse response) {
    String longUrl = cache.get(code);
    if (longUrl == null) {
        longUrl = repository.find(code)
                .map(Urls::getLongUrl)
                .orElseThrow(() -> new NotFoundException(code));
        cache.set(code, longUrl, Duration.ofDays(30));
    }
    response.setStatus(302);
    response.setHeader("Location", longUrl);
    // publish the click event asynchronously
}
\`\`\`

**Why 302 and not 301?** A 301 is cached permanently by the browser, so you can never
change or expire the destination and you undercount clicks. 302 is cached by the browser
but re-validated. If you need analytics to be accurate, use 302.

**Why cache at all?** The redirect is the hot path. A cache hit is ~1 ms; a database read
is ~5 ms. With 80,000 reads/s at peak, the database would be the bottleneck for what is
essentially a key-value lookup.

**Cache sizing.** 600 GB of data does not fit in Redis. Cache only the hot keys — the
recent and the frequently-accessed ones. LRU with a 30-day TTL handles most of it.

## Write path

\`\`\`
POST /urls
  → validate the long URL (is it a valid URL? is it malicious?)
  → generate a short code
  → insert into the database
  → return 201 with the short URL
\`\`\`

**Do not write to the cache on the write path** (unless you use write-through). A brand-new
URL has no readers yet; populating the cache wastes memory. Let the first read populate it
(cache-aside).

**Validation matters.** A URL shortener that accepts \`javascript:\` URLs is an XSS
vector. Validate the scheme (\`http\`/\`https\` only) and consider scanning for malware.

## Handling the 5000/hour limit

Enforce it with the **sliding window counter** from the
[rate limiting guide](./06-rate-limiting.md), keyed by user id.

\`\`\`
if (!rateLimiter.allow(userId, limit=5000, window=1 hour)) {
    throw new TooManyRequestsException("Hourly limit reached, retry after " + resetTime);
}
\`\`\`

Return \`429\` with a \`Retry-After\` header giving the exact time the window resets.

## Analytics

Click events go through a queue, not the request path:

\`\`\`
redirect ──▶ publish {shortCode, timestamp, referrer, userAgent, geo}
                │
                ▼
          Kafka topic "clicks"
                │
                ▼
        Consumer ──▶ ClickHouse / BigQuery ──▶ dashboards
\`\`\`

**Why async?** A synchronous analytics write would put a database write on the hot path.
**Why a stream?** Click volume is high and bursty, and consumers may lag behind without
affecting the user.

For real-time counters, update Redis on the redirect path (\`INCR\`) and flush to the
analytics store periodically — a hybrid of the two.

## Scaling

| Concern | Answer |
|---|---|
| Read bottleneck | Cache-aside with Redis; read replicas behind it |
| Write bottleneck | The write rate (800/s) is small; a single primary with a replica handles it easily |
| Storage growth | 600 GB/year is fine for Postgres; partition by \`created_at\` when it gets large |
| Hot codes | A viral link gets 100× the traffic — cache the code on many nodes, and consider promoting it to a CDN redirect |
| Global audience | Multi-region with a replicated cache; the redirect path can serve from the edge |

## Monitoring

- Redirect latency p50/p99 (this is the product).
- Cache hit ratio (below ~90% means the cache is too small or the TTL is wrong).
- Code generation failures (collision retry exhaustion).
- 429 rate — a sudden spike means either abuse or a client bug.
- Click event lag — the gap between a click and it appearing in the dashboard.

## Follow-ups to expect

- **"How do you prevent abuse?"** → rate limiting per user and per IP, a blocklist of
  known malicious domains, and human review of reported links.
- **"What if the same URL is shortened twice?"** → return the existing code (deduplicate on
  a hash of the long URL) unless the user explicitly wants a fresh one.
- **"How do you support custom aliases?"** → reserve a namespace per user, check
  availability with a unique constraint.
- **"How do you expire links?"** → a \`expires_at\` column plus a background job; the read
  path also checks expiry as a safety net.
- **"How do you handle a malicious redirect?"** → validate schemes, maintain a blocklist,
  and rate-limit by IP rather than only by user.
`,n={id:e,body:t};export{t as body,n as default,e as id};