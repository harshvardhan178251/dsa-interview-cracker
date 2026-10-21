---
title: System design fundamentals
order: 1
summary: The vocabulary, the estimation method and the clarifying questions every system design round depends on, before any technology is chosen.
---

# System design fundamentals

## The 45-minute shape of a round

| Phase | Time | What happens |
|---|---|---|
| Requirements | 5 min | Functional and non-functional requirements, scope |
| Estimation | 5 min | Numbers: DAU, QPS, storage, bandwidth |
| API & data model | 10 min | Endpoints and the schema |
| High-level design | 10 min | The boxes and the arrows |
| Deep dive | 10 min | The component the interviewer picked |
| Wrap-up | 5 min | Bottlenecks, monitoring, failure modes |

**The single biggest mistake is skipping straight to a design.** A design that solves the
wrong problem in brilliant detail still fails.

---

## The clarifying questions

Ask these before drawing anything:

1. **Who uses this?** Consumers, producers, admins? Read-heavy or write-heavy?
2. **What is the core operation?** What does a user actually *do*?
3. **Scale** — DAU, peak QPS, read:write ratio, data volume, growth.
4. **Latency target** — is this interactive (100 ms) or batch (minutes)?
5. **Consistency** — must a write be immediately visible? Can it be eventually consistent?
   Is there money involved? (If yes, you need strong consistency somewhere.)
6. **Availability** — 99.9% (8.7 h downtime/yr) or 99.99% (52 min/yr)?
7. **Data sensitivity** — PII, GDPR, encryption at rest, audit requirements?
8. **Multi-region?** Is it global from day one?

Say your assumptions out loud: *"I'm going to assume 10M DAU with a 20:1 read:write ratio —
does that sound right?"* Getting a correction is a good outcome; building on a wrong
assumption silently is not.

---

## Estimation: how to do it fast

You do not need precision. You need **order of magnitude** and the ability to defend it.

### Requests

```
DAU × requests per user per day = requests per day
requests per day / 86,400 = average QPS
peak QPS ≈ average QPS × 10–20   (traffic is never flat)
```

**Worked example:** 10M DAU, each user does 20 actions/day → 200M requests/day →
~2,300 average QPS → assume **~46,000 peak QPS** (20×).

### Storage

```
entities created per day × retention period × size per entity
```

**Worked example:** 10M DAU, each user creates 10 posts/day, 1 KB per post, kept forever:

```
10M × 10 = 100M posts/day
100M × 365 = 36.5B posts/year
36.5B × 1 KB ≈ 36.5 TB/year
```

Add replication and index overhead — say **3×** → plan for ~110 TB.

### Bandwidth

```
peak QPS × average response size
```

**Worked example:** 46,000 QPS × 100 KB response = 4.6 GB/s ≈ **37 Gbps**. That immediately
tells you the CDN is not optional.

### The numbers that matter

Whatever you compute, be ready to answer:

- How many **servers**? `peak QPS / (requests per second per server)`.
  A typical app server handles 1,000–10,000 QPS depending on the work.
- How much **memory**? If you cache a hot entity, `entity size × cache entries`.
- What is the **fan-out**? If one request touches 50 DB rows, your DB needs 50× the QPS.

---

## The vocabulary

Know these cold — they are the words that make you sound like an engineer.

| Term | Meaning |
|---|---|
| **Load balancer** | Distributes requests across servers; also does health checks |
| **Vertical scaling** | Bigger machine (CPU/RAM/disk). Simple, has a ceiling, gets expensive |
| **Horizontal scaling** | More machines. The default for large systems |
| **Stateless service** | Holds no state between requests → trivially scalable and restartable |
| **Stateful service** | Holds state (a DB, a session store) → needs sharding/replication |
| **Cache** | A fast copy of data close to the reader |
| **Cache-aside** | App checks the cache, falls back to the DB on a miss, then fills the cache |
| **Write-through / write-behind** | Writes go to the cache first (through) or are batched (behind) |
| **CDN** | Cache of static/edge content, geographically distributed |
| **Replication** | Copies of the same data (read replicas, multi-AZ) |
| **Sharding / partitioning** | Splitting data horizontally across nodes by a key |
| **Consistency** | Whether all readers see the same data |
| **Eventual consistency** | They will, shortly |
| **CAP** | Under a partition, choose consistency or availability |
| **Idempotency** | Repeating a request has the same effect as doing it once |
| **Backpressure** | The system pushes back when the consumer cannot keep up |
| **Tail latency (p99)** | What matters, not the average |
| **Throughput vs latency** | More load usually means higher latency |
| **Quota / rate limit** | Caps on requests per client |
| **Circuit breaker** | Stops calling a failing dependency instead of cascading the failure |
| **Fan-out** | One request triggers many sub-requests |
| **Fan-in** | Many sub-requests are combined into one response |

---

## Designing for failure

Assume everything fails. Every component you name should have an answer for "what if this
dies?".

| Failure | Mitigation |
|---|---|
| A server dies | Health checks + the load balancer removes it; keep the fleet sized for N−1 |
| A whole zone dies | Deploy across 3+ availability zones; the load balancer routes around it |
| The primary DB dies | Automated failover to a synchronous replica; **this is the hard one** |
| A read replica lags | Serve slightly stale data, or route reads to the primary for critical reads |
| The cache dies | Fall back to the DB (expect a latency spike and a thundering herd) |
| A downstream service is slow | Timeouts + circuit breaker + degrade gracefully |
| A queue grows unboundedly | Backpressure, retention policy, dead-letter queue |
| A bad deploy | Feature flags, canary rollout, instant rollback |
| A single hot key | Split the key, add a per-key cache, replicate the hot row |

**Never let a cache miss become a database stampede.** Two mitigations:
1. **Request coalescing** — one request to the DB, everyone else waits on it.
2. **Probabilistic early expiry** — refresh slightly before the TTL, spreading the load.

---

## Monitoring: what would you actually watch?

Say something specific. "We'd monitor latency" is not an answer.

| Signal | Metric | Alert on |
|---|---|---|
| Traffic | Requests/second per endpoint | Sudden change (up = attack, down = outage) |
| Errors | 5xx rate per service | Any sustained increase |
| Latency | p50 / p95 / **p99** | p99 above SLO |
| Saturation | CPU, memory, connection pool usage, queue depth | Approaching limits |
| Dependencies | Latency and error rate of every downstream call | Breach of the budget |
| Business | Signups, orders, uploads | Anomaly detection |

**p99 over the mean.** A service with a 50 ms mean and a 4 s p99 has 1% of users waiting
four seconds — and those are exactly the users who leave.

### SLOs and error budgets

Say: *"we have a 99.9% availability SLO for reads, which gives us an error budget of 43
minutes a month. When the budget is exhausted, we stop shipping features and spend the
quarter on reliability."* Interviewers notice this.

---

## Data storage choices

| Store | Use it for | Do not use it for |
|---|---|---|
| **Postgres / MySQL** | Transactions, relational data, anything needing ACID | Unbounded write-heavy logs |
| **DynamoDB / Cassandra** | Key-value or wide-column at high write volume | Rich queries, multi-row transactions |
| **Redis** | Caching, counters, rate limits, leaderboards, session state | Anything you cannot lose or recompute |
| **S3 / GCS** | Objects, images, video, backups, data lakes | Structured queries |
| **Elasticsearch** | Full-text search, log search, analytics | The system of record |
| **Kafka / Pub-Sub** | Event streaming, decoupling, log ingestion | Request/response |
| **ClickHouse / BigQuery** | Columnar analytics over huge volumes | Transactional writes |

**The default answer for an interview** is: Postgres as the system of record, Redis in front
of it for reads, S3 for blobs, and a queue for anything asynchronous. Choosing something
exotic without a reason is a red flag.

---

## Data modelling: get the access patterns right first

Before the schema, list the **queries you must serve** and their frequency. The schema
follows from that.

```sql
-- access pattern: "posts for a user, newest first"
CREATE TABLE posts (
  id          BIGSERIAL PRIMARY KEY,
  user_id     BIGINT NOT NULL,
  content     TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_posts_user_created ON posts (user_id, created_at DESC);
```

**The index is the design.** The index that matches the hot query is worth more than any
amount of vertical scaling. And note the column order: `(user_id, created_at DESC)`
serves "user X's posts, newest first" perfectly and also serves "user X's posts" — the
reverse order would not.

---

## The shape of a good answer

1. **Clarify** (5 min) — requirements, scale, consistency needs.
2. **Estimate** (5 min) — QPS, storage, bandwidth, server count.
3. **API** (5 min) — the endpoints, with request and response shapes.
4. **Data model** (5 min) — the schema and the indexes.
5. **High-level design** (10 min) — the boxes, the arrows, where the state lives.
6. **Deep dive** (10 min) — the interviewer picks a component; go deep there.
7. **Bottlenecks and trade-offs** (5 min) — what breaks first, and what you would do about
   it.

At every step, name the trade-off you are making and why. "I'll use a read-heavy design
with a cache because the read:write ratio is 20:1" is a complete sentence.

---

## Red flags in a system design answer

- Choosing technology before discussing requirements.
- No numbers, anywhere. "It scales" is not an answer.
- A cache with no invalidation strategy. **Say how the cache is invalidated** — TTL, write-through, or event-driven — every time.
- "The database will handle it" for a write-heavy workload.
- Sharding with no shard key discussion. **What is the shard key?** How do you avoid hot shards? What happens when you need a query that spans shards?
- No mention of what happens when a dependency is down.
- A single point of failure that you do not name and then address.
- Talking about microservices when the problem is solved by a monolith. **Do not use a
  microservice for something that does not need one** — it is a cost, not a feature.
