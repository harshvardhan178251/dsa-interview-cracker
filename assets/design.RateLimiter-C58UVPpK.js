var e=`design.RateLimiter`,t=`package com.dsa.design;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Rate Limiter
 * LeetCode: null | Difficulty: Medium | Frequency: 3/5
 * Pattern: Design, Sliding window over a request log
 *
 * <p>Problem:
 * A rate limiter allows at most {@code capacity} requests inside any window of
 * {@code window} seconds. Every request that arrives is either allowed or rejected.
 * The timestamps of the requests are given in non-decreasing order.
 *
 * <p>Input format (stdin):
 * <pre>
 * capacity window
 * n
 * t1
 * t2
 * ...
 * tn
 * </pre>
 * The program prints one line per request: {@code 1} when the request is allowed and
 * {@code 0} when it is rejected.
 *
 * <p>Sample input:
 * <pre>
 * 2 10
 * 5
 * 0
 * 0
 * 1
 * 11
 * 12
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * 1
 * 0
 * 1
 * 1
 * </pre>
 *
 * <p>Approach: keep a deque of the timestamps of the requests that are still inside the
 * window. A request at time {@code t} first evicts every timestamp {@code <= t - window},
 * then it is allowed when the deque holds fewer than {@code capacity} timestamps.
 *
 * <p>Complexity: Time O(1) amortised per request, Space O(capacity).
 */
public class RateLimiter {

    private final int capacity;
    private final long window;
    private final Deque<Long> hits = new ArrayDeque<>();

    public RateLimiter(int capacity, long window) {
        this.capacity = Math.max(0, capacity);
        this.window = Math.max(0, window);
    }

    /**
     * Decides whether the request arriving at {@code timestamp} is allowed.
     * Timestamps must be non-decreasing.
     */
    public boolean allow(long timestamp) {
        while (!hits.isEmpty() && hits.peekFirst() <= timestamp - window) {
            hits.pollFirst();
        }
        if (hits.size() >= capacity) {
            return false;
        }
        hits.addLast(timestamp);
        return true;
    }

    /** Number of requests still inside the window. */
    public int used() {
        return hits.size();
    }

    /** Human readable snapshot of the live window. */
    public String state() {
        return hits.toString();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int capacity = fs.nextInt();
        long window = fs.nextLong();
        int n = fs.nextInt();

        RateLimiter limiter = new RateLimiter(capacity, window);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < n; i++) {
            long timestamp = fs.nextLong();
            out.append(limiter.allow(timestamp) ? 1 : 0).append('\\n');
        }
        System.out.print(out);
    }
}
`,n=`import java.util.ArrayDeque;
import java.util.Deque;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Rate Limiter
 * LeetCode: null | Difficulty: Medium | Frequency: 3/5
 * Pattern: Design, Sliding window over a request log
 *
 * <p>Problem:
 * A rate limiter allows at most {@code capacity} requests inside any window of
 * {@code window} seconds. Every request that arrives is either allowed or rejected.
 * The timestamps of the requests are given in non-decreasing order.
 *
 * <p>Input format (stdin):
 * <pre>
 * capacity window
 * n
 * t1
 * t2
 * ...
 * tn
 * </pre>
 * The program prints one line per request: {@code 1} when the request is allowed and
 * {@code 0} when it is rejected.
 *
 * <p>Sample input:
 * <pre>
 * 2 10
 * 5
 * 0
 * 0
 * 1
 * 11
 * 12
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * 1
 * 0
 * 1
 * 1
 * </pre>
 *
 * <p>Approach: keep a deque of the timestamps of the requests that are still inside the
 * window. A request at time {@code t} first evicts every timestamp {@code <= t - window},
 * then it is allowed when the deque holds fewer than {@code capacity} timestamps.
 *
 * <p>Complexity: Time O(1) amortised per request, Space O(capacity).
 */
public class Main {

    private final int capacity;
    private final long window;
    private final Deque<Long> hits = new ArrayDeque<>();

    public Main(int capacity, long window) {
        this.capacity = Math.max(0, capacity);
        this.window = Math.max(0, window);
    }

    /**
     * Decides whether the request arriving at {@code timestamp} is allowed.
     * Timestamps must be non-decreasing.
     */
    public boolean allow(long timestamp) {
        while (!hits.isEmpty() && hits.peekFirst() <= timestamp - window) {
            hits.pollFirst();
        }
        if (hits.size() >= capacity) {
            return false;
        }
        hits.addLast(timestamp);
        return true;
    }

    /** Number of requests still inside the window. */
    public int used() {
        return hits.size();
    }

    /** Human readable snapshot of the live window. */
    public String state() {
        return hits.toString();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int capacity = fs.nextInt();
        long window = fs.nextLong();
        int n = fs.nextInt();

        Main limiter = new Main(capacity, window);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < n; i++) {
            long timestamp = fs.nextLong();
            out.append(limiter.allow(timestamp) ? 1 : 0).append('\\n');
        }
        System.out.print(out);
    }
}

// ---------- inlined com.dsa.utils.FastScanner ----------
/**
 * Allocation-light scanner for contest-style stdin input.
 *
 * <p>Every problem in this repository reads its input through this class so the
 * expected stdin format stays consistent across the whole set.
 *
 * <p>Typical usage:
 * <pre>{@code
 * FastScanner fs = new FastScanner(System.in);
 * int n = fs.nextInt();
 * int[] nums = fs.nextIntArray(n);
 * }</pre>
 */
class FastScanner {

    private final BufferedReader reader;
    private final char[] buffer = new char[1 << 16];
    private int ptr = 0;
    private int len = 0;

    public FastScanner(InputStream in) {
        this.reader = new BufferedReader(new InputStreamReader(in, StandardCharsets.UTF_8), 1 << 16);
    }

    /** Returns the next raw character, or -1 at end of input. */
    private int read() throws IOException {
        if (ptr >= len) {
            len = reader.read(buffer);
            ptr = 0;
            if (len <= 0) {
                return -1;
            }
        }
        return buffer[ptr++];
    }

    private void skipWhitespace() throws IOException {
        int c;
        while ((c = read()) != -1) {
            if (!Character.isWhitespace(c)) {
                ptr--; // step back onto the first meaningful character
                return;
            }
        }
    }

    /** True when at least one more non-whitespace character exists. */
    public boolean hasNext() throws IOException {
        skipWhitespace();
        return ptr < len;
    }

    /** Reads the next whitespace-delimited token as a string. */
    public String next() throws IOException {
        skipWhitespace();
        StringBuilder sb = new StringBuilder();
        int c;
        while ((c = read()) != -1 && !Character.isWhitespace(c)) {
            sb.append((char) c);
        }
        return sb.toString();
    }

    public int nextInt() throws IOException {
        skipWhitespace();
        int c = read();
        while (c != -1 && c != '-' && (c < '0' || c > '9')) {
            c = read();
        }
        int sign = 1;
        if (c == '-') {
            sign = -1;
            c = read();
        }
        int value = 0;
        while (c >= '0' && c <= '9') {
            value = value * 10 + (c - '0');
            c = read();
        }
        return sign * value;
    }

    public long nextLong() throws IOException {
        skipWhitespace();
        int c = read();
        while (c != -1 && c != '-' && (c < '0' || c > '9')) {
            c = read();
        }
        int sign = 1;
        if (c == '-') {
            sign = -1;
            c = read();
        }
        long value = 0;
        while (c >= '0' && c <= '9') {
            value = value * 10 + (c - '0');
            c = read();
        }
        return sign * value;
    }

    public double nextDouble() throws IOException {
        return Double.parseDouble(next());
    }

    public char nextChar() throws IOException {
        skipWhitespace();
        int c = read();
        return c == -1 ? '\\0' : (char) c;
    }

    /** Reads exactly {@code n} integers. */
    public int[] nextIntArray(int n) throws IOException {
        int[] out = new int[n];
        for (int i = 0; i < n; i++) {
            out[i] = nextInt();
        }
        return out;
    }

    /** Reads exactly {@code n} longs. */
    public long[] nextLongArray(int n) throws IOException {
        long[] out = new long[n];
        for (int i = 0; i < n; i++) {
            out[i] = nextLong();
        }
        return out;
    }

    /** Reads exactly {@code n} whitespace-delimited strings. */
    public String[] nextStringArray(int n) throws IOException {
        String[] out = new String[n];
        for (int i = 0; i < n; i++) {
            out[i] = next();
        }
        return out;
    }
}
`,r=`
# Rate Limiter

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Design · Sliding window · Rate limiting |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Stripe, Cloudflare |

## Problem Statement

A rate limiter allows at most \`capacity\` requests inside any window of \`window\` seconds.
Every request that arrives is either **allowed** or **rejected**.

The request timestamps arrive in non-decreasing order. A request at time \`t\` counts
towards the limit of every window that contains \`t\`, so the interesting state is
"requests that are still inside the window".

## Input Format

\`\`\`
capacity window
n
t1
t2
...
tn
\`\`\`

- \`capacity window\` — the limit and the window length in seconds (first line).
- \`n\` — the number of requests.
- \`t1..tn\` — the request timestamps, non-decreasing.

The program prints one line per request: \`1\` when the request is allowed, \`0\` when it is
rejected.

## Sample Input

\`\`\`
2 10
5
0
0
1
11
12
\`\`\`

## Expected Output

\`\`\`
1
1
0
1
1
\`\`\`

At \`t = 0\` and \`t = 0\` the window \`(−10, 0]\` holds 0 and then 1 requests, so both are
allowed. At \`t = 1\` the window \`(−9, 1]\` already holds 2 requests → rejected. At
\`t = 11\` the two requests from \`t = 0\` fell out of the window \`(1, 11]\` → allowed again.

## Approach — a deque of the requests still inside the window

The window is half open: a request at time \`t\` is inside the window of a later request at
time \`t'\` exactly when \`t' - window < t <= t'\`. That means the request at \`t\` expires as
soon as a request arrives at \`t + window\` or later.

Keep a deque of the timestamps that are still alive:

1. **Evict** every timestamp \`<= t - window\` from the front — those requests left the
   window.
2. If the deque holds **fewer than \`capacity\`** timestamps → allow the request and push
   \`t\` at the back.
3. Otherwise → reject it (and do not push anything).

The deque never holds more than \`capacity\` entries, and every timestamp is pushed once
and popped once, so the whole run is O(n) amortised.

**Fixed window vs sliding window.** The classic cheap alternative counts requests per
calendar window (\`floor(t / window)\`), which allows \`2 * capacity\` requests around a
boundary. The sliding window above never does that.

## Dry Run

\`capacity = 2\`, \`window = 10\`. The deque column shows the live window, oldest first.

| Step | Request \`t\` | Evicted (\`<= t - 10\`) | Deque before | Size | Allowed? | Deque after | Output |
|---:|---:|---|---|---:|---|---|---|
| 1 | 0 | — | \`[]\` | 0 | yes (0 < 2) | \`[0]\` | \`1\` |
| 2 | 0 | — | \`[0]\` | 1 | yes (1 < 2) | \`[0, 0]\` | \`1\` |
| 3 | 1 | — | \`[0, 0]\` | 2 | **no** (2 ≥ 2) | \`[0, 0]\` | \`0\` |
| 4 | 11 | \`0\`, \`0\` (\`<= 1\`) | \`[0, 0]\` | 0 | yes (0 < 2) | \`[11]\` | \`1\` |
| 5 | 12 | — (\`<= 2\`, none) | \`[11]\` | 1 | yes (1 < 2) | \`[11, 12]\` | \`1\` |

Step 4 is the interesting one: the two rejected requests of step 3 were *not* stored, so
they did not keep the window busy. Only allowed requests occupy a slot.

## Java Solution

See [\`RateLimiter.java\`](./RateLimiter.java).

\`\`\`java
public boolean allow(long timestamp) {
    while (!hits.isEmpty() && hits.peekFirst() <= timestamp - window) {
        hits.pollFirst();                       // the request left the window
    }
    if (hits.size() >= capacity) {
        return false;                           // the window is full
    }
    hits.addLast(timestamp);
    return true;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(1) amortised per request | each timestamp is pushed once and popped once |
| **Space** | O(capacity) | the deque never holds more than \`capacity\` timestamps |

## Interview Notes

**Follow-ups to raise yourself:**
- *"How would you scale this to many machines?"* → a shared store (Redis \`INCR\` +
  \`EXPIRE\`) or a token bucket per API key in the gateway; the sliding window itself does
  not move.
- *"Token bucket vs leaky bucket vs fixed window?"* → token bucket allows bursts up to the
  bucket size and refills at a fixed rate; the leaky bucket smooths the output rate.
- *"What about per-user limits?"* → keep a limiter per key, e.g. a \`Map<String, Limiter>\`
  with eviction of idle entries.
- *"How would you handle 10 million requests per second?"* → shard the counters by key
  hash, pre-allocate, and use a hierarchical limiter (local + global).

**Common mistakes:**
- ❌ Evicting with \`<\` instead of \`<=\` — a request exactly \`window\` seconds old has
  already left the window.
- ❌ Pushing the timestamp of a **rejected** request → rejected requests would keep
  blocking later ones.
- ❌ Using \`Math.abs\` style rounding on the window boundary.
- ❌ Forgetting that the timestamps may repeat — the deque holds duplicates, one per
  request.

**How to narrate:**
> "A sliding window over the request log. I keep a deque of the requests that are still
> inside the window; on every request I first drop the ones that fell out, then allow the
> request if the deque has room. Because every timestamp is inserted once and removed
> once, the whole thing is O(n) amortised, and the deque is bounded by the capacity."

## Related Problems

- [Design HitCounter — LeetCode 362](./DesignHitCounter.md) — the same sliding window, fixed at
  300 seconds
- [LRU Cache — LeetCode 146](./LRUCache.md) — eviction by recency
- [MovingAverage — LeetCode 346](./MovingAverage.md) — the sliding window on values
`,i=[`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};