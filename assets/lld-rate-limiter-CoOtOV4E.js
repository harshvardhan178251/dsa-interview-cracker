var e=`lld:rate-limiter`,t=`
# LLD — Rate limiter

*The system-design cousin of the [rate limiting guide](../system-design/06-rate-limiting.md),
seen as a Java class design.*

## Requirements

- Limit requests per client (by API key, IP, or user id).
- \`allow(request)\` → permitted or rejected.
- A rejected request must tell the client when to retry.
- Configurable limit, window, and strategy.
- Thread-safe and horizontally scalable.

## The strategy interface

Everything above the algorithm is identical, so put the algorithm behind an interface:

\`\`\`java
public interface RateLimiter {
    /** @return a decision for this request */
    Decision tryAcquire(String clientId);

    record Decision(boolean allowed, long retryAfterMillis, long remaining) {}
}
\`\`\`

Implementations: \`FixedWindowRateLimiter\`, \`SlidingWindowLogRateLimiter\`,
\`SlidingWindowCounterRateLimiter\`, \`TokenBucketRateLimiter\`, \`LeakyBucketRateLimiter\`.

**The interface is what makes the system swappable** — and it is what the interviewer is
actually asking about.

## Token bucket in detail

The default choice, because it allows controlled bursts while enforcing a steady average.

**State per client:**
- \`tokens\` — the current count, a fractional number.
- \`lastRefillTime\` — when the bucket was last topped up.

**The algorithm:**

\`\`\`java
public class TokenBucketRateLimiter implements RateLimiter {

    private final double capacity;        // max burst
    private final double refillRatePerSec;
    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();

    private static final class Bucket {
        double tokens;
        long lastRefillNanos;
    }

    @Override
    public Decision tryAcquire(String clientId) {
        long now = System.nanoTime();
        Bucket bucket = buckets.computeIfAbsent(clientId, k -> {
            Bucket b = new Bucket();
            b.tokens = capacity;
            b.lastRefillNanos = now;
            return b;
        });

        synchronized (bucket) {
            // 1. refill
            long elapsedNanos = now - bucket.lastRefillNanos;
            double newTokens = elapsedNanos / 1_000_000_000.0 * refillRatePerSec;
            bucket.tokens = Math.min(capacity, bucket.tokens + newTokens);
            bucket.lastRefillNanos = now;

            // 2. try to consume
            if (bucket.tokens >= 1.0) {
                bucket.tokens -= 1.0;
                long remaining = (long) Math.floor(bucket.tokens);
                return new Decision(true, 0, remaining);
            }

            // 3. reject — say when the next token arrives
            double missing = 1.0 - bucket.tokens;
            long waitMillis = (long) (missing / refillRatePerSec * 1000);
            return new Decision(false, waitMillis, 0);
        }
    }
}
\`\`\`

**Why \`synchronized (bucket)\` rather than synchronising the whole limiter?** It locks
per client, so one noisy client does not block everyone else. Locking on a specific object
is a deliberate choice here — but note the risk of locking on a mutable key, so the bucket
must be a final, stable object.

**\`computeIfAbsent\` plus \`synchronized\` on the bucket** is correct: the map insert is
atomic, and the bucket's state is guarded by its own monitor.

## Sliding window counter

For a fixed window per client, using two counters:

\`\`\`java
public class SlidingWindowCounterRateLimiter implements RateLimiter {

    private final long windowMillis;
    private final long limit;
    private final Map<String, Window> windows = new ConcurrentHashMap<>();

    private static final class Window {
        long currentCount;
        long previousCount;
        long currentStartMillis;
    }
    ...
}
\`\`\`

Compute the effective count as:

\`\`\`
effective = currentCount + previousCount × overlapFraction
\`\`\`

where \`overlapFraction\` is the proportion of the previous window that still overlaps the
current one.

**The window boundary.** Derive \`currentStartMillis\` from the clock, not from the first
request — otherwise clients that start at different times get different windows.

\`\`\`java
long currentStart = (now / windowMillis) * windowMillis;
\`\`\`

## Configuration

\`\`\`java
public record RateLimitConfig(
    long limit,
    long windowMillis,
    Algorithm algorithm,
    double burstCapacity      // token bucket only
) {}
\`\`\`

Load it from config, and change it without a redeploy — that means the config comes from
a config service or a database row, and it is cached with a short TTL.

## Response shape

\`\`\`java
if (!decision.allowed()) {
    response.setStatus(429);
    response.setHeader("Retry-After", String.valueOf(decision.retryAfterMillis() / 1000));
    response.setHeader("X-RateLimit-Limit", String.valueOf(limit));
    response.setHeader("X-RateLimit-Remaining", "0");
    throw new TooManyRequestsException(...);
}
\`\`\`

**Never return 403 for a rate limit.** It is not a permission problem, and clients treat
403 as permanent.

## Distributed operation

The in-memory version above is per-JVM, so with 10 instances the effective limit is 10×.

**Option A: a shared store.** Redis. Keep the bucket state in Redis and make the
read-modify-write atomic with a Lua script. This is the production answer.

**Option B: a local limiter plus a global one.** The local limiter protects the JVM (fast,
no network), and a global limiter in Redis enforces the true quota. Best of both, at the
cost of two checks.

**Option C: consistent hashing to assign a client to a fixed instance.** Then the limit
is per-instance and consistent, but it breaks when instances come and go.

## Memory management

An in-memory map of buckets **grows without bound** — one entry per client id, forever.
An attacker rotating client ids exhausts your heap.

**Fixes:**
- **Expiry sweep** — a scheduled task removes buckets untouched for longer than the
  window. Since a full bucket is the default state, an expired bucket can simply be
  dropped.
- **A bounded cache** — an LRU of N buckets. Clients beyond N are treated as new clients.
- **A maximum bucket count** with an explicit rejection policy.

**Mention this in the interview.** "How do you stop someone exhausting your memory by
rotating client ids?" is a real question, and an unbounded map is the wrong answer.

## Metrics

- Allowed vs rejected, per algorithm.
- Rejection rate per client — an abuse signal.
- Bucket occupancy distribution.
- Memory usage of the bucket map.

## Common mistakes

- ❌ Using \`double\` for the token count without thinking about precision. It is fine, but
  be aware that \`0.1 + 0.2 != 0.3\`.
- ❌ Not clamping \`tokens\` to \`capacity\` after a long idle period — otherwise a client
  that has been away for an hour gets a huge burst.
- ❌ Using \`System.currentTimeMillis()\` for the refill — it is not monotonic. Use
  \`System.nanoTime()\` for durations.
- ❌ An unbounded map of per-client state.
- ❌ Forgetting to zero the bucket on a configuration change.
- ❌ Returning 403 instead of 429.
- ❌ Not handling clock skew across instances in a distributed deployment.

## Extensions to be ready for

| Extension | Design |
|---|---|
| Different limits per plan | A \`LimitProvider\` that resolves the config per client |
| Per-route limits | Include the route in the bucket key |
| Whitelist / blacklist | A bypass check before the limiter runs |
| Adaptive limits | Adjust the limit from the observed error rate |
| Distributed | Redis plus a Lua script |
| Burst + sustained | A token bucket handles both; a fixed window cannot express a burst |
`,n={id:e,body:t};export{t as body,n as default,e as id};