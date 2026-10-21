---
title: Rate limiting and throttling
order: 6
summary: The four rate-limiting algorithms, where to enforce them, and the fairness and correctness problems that show up in production.
---

# Rate limiting and throttling

## Why rate limit

- **Protect the system** from a traffic spike, a runaway client, or an attack.
- **Protect fairness** — one noisy tenant must not starve the others.
- **Control cost** — every request costs money downstream (LLM APIs, third-party calls).
- **Shape traffic** — smooth bursts into steady load.

## Where to enforce

| Layer | What it protects | Granularity |
|---|---|---|
| **CDN / edge** | Origin servers | Per IP, per region |
| **API gateway / load balancer** | The service tier | Per API key, per route |
| **Application** | Business rules | Per user, per tenant, per plan |
| **Downstream client** | Third-party quota | Per outgoing request |

Enforce at **multiple layers**. The edge protects against volumetric attacks; the
application enforces business rules like "a free user gets 100 requests a day".

**Always return `429 Too Many Requests` with a `Retry-After` header.** A client that is
told when to come back does not hammer you.

---

## The four algorithms

### 1. Fixed window

```
count = INCR(key + windowStart)
if count > limit: reject
```

- **Pro:** trivially simple, one `INCR` per request.
- **Con:** **boundary burst**. 100 requests at 10:59:59 and 100 at 11:00:00 — 200 in two
  seconds, and both windows are under the limit.

### 2. Sliding window log

Keep the timestamp of every request in a sorted set; drop the ones older than the window.

```
ZREMRANGEBYSCORE(key, 0, now - window)
count = ZCARD(key)
if count >= limit: reject
ZCARD <= limit: reject
else: ZADD(key, now); EXPIRE(key, window)
```

- **Pro:** exact, no boundary burst.
- **Con:** **O(limit) memory per client**. A client allowed 10,000 requests stores 10,000
  timestamps. At 100k clients that is 1 billion entries. You need a hard cap on the limit.

### 3. Sliding window counter

Keep two fixed counters (the current window and the previous one) and weight the previous
one by how much of it overlaps the current window.

```
count = currentCount + previousCount * overlapFraction
```

- **Pro:** O(1) memory, smooth, and far more accurate than a fixed window.
- **Con:** an approximation.

**This is the best default.** It is what most production rate limiters use.

### 4. Token bucket

Tokens refill at a constant rate up to a bucket capacity; each request consumes one token.

```
tokens = min(capacity, tokens + rate × elapsed)
if tokens >= 1: tokens -= 1; allow
else: reject, and tell the client how long until the next token
```

- **Pro:** allows **bursts** up to the bucket size while enforcing a steady average rate.
- **Con:** more state, but Redis makes it easy with a Lua script for atomicity.

### 5. Leaky bucket

The mirror image: requests go into a queue that leaks out at a fixed rate.

- **Pro:** perfectly smooth output to the downstream system.
- **Con:** adds latency; requests wait rather than being rejected.

---

## Which to pick

| Situation | Algorithm |
|---|---|
| Protect a third-party API with a known quota | Token bucket (matches the quota's shape) |
| Protect your own service from a spike | Sliding window counter |
| Need exactness and the limit is small | Sliding window log |
| Smooth output to a fragile downstream | Leaky bucket |
| Per-user daily quota | Fixed window on a calendar day |
| Fairness across tenants | Token bucket per tenant, plus a global bucket |

**Token bucket vs sliding window:** token bucket allows bursts by design; sliding window
caps the count in any rolling period. If your downstream cannot absorb bursts, use token
bucket with a small capacity.

---

## Distributed implementation

The counter must be shared across all app instances, so it lives in Redis.

```lua
-- Atomic sliding-window counter. Redis executes Lua scripts atomically.
local key         = KEYS[1]
local now_ms      = tonumber(ARGV[1])
local window_ms   = tonumber(ARGV[2])
local limit       = tonumber(ARGV[3])

local cur_key  = key .. ':' .. math.floor(now_ms / window_ms)
local prev_key = key .. ':' .. (math.floor(now_ms / window_ms) - 1)

local current = tonumber(redis.call('GET', cur_key)) or 0
local previous = tonumber(redis.call('GET', prev_key)) or 0

-- How much of the previous window still overlaps the current one
local elapsed = now_ms % window_ms
local overlap = (window_ms - elapsed) / window_ms
local count = current + previous * overlap

if count >= limit then
  local retry_after = math.ceil((window_ms - elapsed) / 1000)
  return {0, retry_after}
end

redis.call('INCR', cur_key)
redis.call('PEXPIRE', cur_key, window_ms * 2)
return {1, 0}
```

**Why a Lua script?** Because `GET`, then `INCR`, then `EXPIRE` are three round trips, and
another client can interleave between them. Lua scripts run atomically inside Redis.

**Why Redis and not the database?** The counter is high-write, ephemeral, and needs
microsecond latency. A `UPDATE ... WHERE count < limit` on Postgres would work but adds
write load to your primary.

---

## Fairness

A global limit alone is unfair: one abusive client can consume the whole budget.

**Hierarchical limits** — check the most specific first, and report the tightest:

```
if !check(user:123)        → 429 (retry after 1s)
else if !check(tenant:acme) → 429 (retry after 60s)
else if !check(global)      → 429 (retry after 300s)
else allow
```

Order matters: check the user before the tenant before the global, and return the
**tightest** retry-after, not the first one you hit. Otherwise a client gets told to retry
in 1 second and burns the tenant's budget again.

---

## Returning the right error

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 30
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1712345678
RateLimit-Limit: 1000;w=3600
RateLimit-Remaining: 0
RateLimit-Reset: 1712345678
```

The `X-RateLimit-*` headers let a well-behaved client back off *before* it gets rejected.

**Do not return 403** for a rate limit — it is not a permission problem, and clients treat
403 as permanent.

---

## Client-side behaviour

The server must assume clients are broken or malicious. So:

- **Exponential backoff with jitter** on the client.
- **Honour `Retry-After`** when it is present.
- **Never retry a non-idempotent request** without an idempotency key — otherwise a
  retried POST creates a duplicate order.

**Idempotency keys:** the client generates a UUID per logical operation and sends it as a
header; the server records it and returns the original result for repeats. This is how
you make retries safe.

---

## Circuit breakers and bulkheads

Rate limiting protects against **too many requests**. A circuit breaker protects against a
**dependency being down**.

- **Circuit breaker** — after N failures, fail fast for T seconds, then try one request.
  Prevents a slow dependency from exhausting your thread pool.
- **Bulkhead** — give each dependency its own thread pool or connection pool, so a
  dependency that stalls cannot consume all your resources.

These travel together: a rate limiter controls volume, a bulkhead controls blast radius,
a circuit breaker controls failure propagation.

---

## Interview answers

**"How would you rate limit an API?"**
> "I'd use a sliding window counter in Redis, enforced at the API gateway and again at the
> application layer for business rules. I'd key it by API key or user id, run the
> increment-and-check atomically via a Lua script, and return a 429 with a Retry-After
> header and the X-RateLimit headers so clients can back off correctly."

**"How do you handle a sudden spike?"**
> "The rate limiter sheds load above the threshold, which protects the system. But I also
> need to make sure the limit is high enough that legitimate traffic is never shed — a
> 10× spike should be absorbed by autoscaling, not by rejection."

**"What if Redis goes down?"**
> "Fail open — allow the traffic. Rate limiting is a protection mechanism, not a
> correctness requirement, and taking down the whole service because the limiter is down
> is the wrong trade. I'll log it and alert so it gets fixed. If the limiter protects
> something that must not be exceeded (billing quotas), I fail closed for that specific
> path only."

**"How do you pick the limit?"**
> "From the downstream's capacity and cost. If one request costs $0.002 to serve, a
> budget of $10k/day means roughly 5M requests a day — so the limit is set from the budget,
> then tuned with the observed p99 latency."
