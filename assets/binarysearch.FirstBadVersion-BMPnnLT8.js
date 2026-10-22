var e=`binarysearch.FirstBadVersion`,t=`package com.dsa.binarysearch;

import com.dsa.utils.FastScanner;

/**
 * Problem: First Bad Version
 * LeetCode: 278 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Binary search on a monotone predicate
 *
 * <p>Problem:
 * You have {@code n} versions of a product. The first bad version is the earliest version that
 * contains a defect; every later version is bad as well. Given a predicate
 * {@code isBadVersion(v)} that reports whether version {@code v} is bad, find the first bad
 * version.
 *
 * <p>Because the answer is not given on stdin, the predicate is implemented here as a
 * documented stub: this exercise treats every version {@code >= 4} as bad. Change
 * {@link #FIRST_BAD_VERSION} (or the body of {@link #isBadVersion(int)}) to model a different
 * release history; the search algorithm does not change.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 * where {@code n} is the highest version number that exists (versions are 1..n).
 *
 * <p>Sample input:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Approach: {@code isBadVersion} is monotone — false for every version before the first bad
 * one and true from that version onwards. Binary search for the first index where the
 * predicate turns true.
 *
 * <p>Complexity: Time O(log n), Space O(1).
 */
public class FirstBadVersion {

    /**
     * The first bad version in this exercise. Every version greater than or equal to this
     * number is considered bad.
     */
    public static final int FIRST_BAD_VERSION = 4;

    /**
     * Stub for the release-history oracle. In a real interview this would be a library call
     * the candidate does not control.
     *
     * @param version the version number to test (1-based)
     * @return {@code true} when the version contains the defect
     */
    public static boolean isBadVersion(int version) {
        return version >= FIRST_BAD_VERSION;
    }

    /**
     * Returns the smallest version number that is bad.
     *
     * @param n the highest version that exists
     * @return the first bad version, or {@code -1} when no version is bad
     */
    public static int firstBadVersion(int n) {
        if (n < 1 || !isBadVersion(n)) {
            return -1;
        }
        int left = 1;
        int right = n;
        // Invariant: the first bad version lies inside [left, right].
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (isBadVersion(mid)) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        return left;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(firstBadVersion(n));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: First Bad Version
 * LeetCode: 278 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Binary search on a monotone predicate
 *
 * <p>Problem:
 * You have {@code n} versions of a product. The first bad version is the earliest version that
 * contains a defect; every later version is bad as well. Given a predicate
 * {@code isBadVersion(v)} that reports whether version {@code v} is bad, find the first bad
 * version.
 *
 * <p>Because the answer is not given on stdin, the predicate is implemented here as a
 * documented stub: this exercise treats every version {@code >= 4} as bad. Change
 * {@link #FIRST_BAD_VERSION} (or the body of {@link #isBadVersion(int)}) to model a different
 * release history; the search algorithm does not change.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 * where {@code n} is the highest version number that exists (versions are 1..n).
 *
 * <p>Sample input:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Approach: {@code isBadVersion} is monotone — false for every version before the first bad
 * one and true from that version onwards. Binary search for the first index where the
 * predicate turns true.
 *
 * <p>Complexity: Time O(log n), Space O(1).
 */
public class Main {

    /**
     * The first bad version in this exercise. Every version greater than or equal to this
     * number is considered bad.
     */
    public static final int FIRST_BAD_VERSION = 4;

    /**
     * Stub for the release-history oracle. In a real interview this would be a library call
     * the candidate does not control.
     *
     * @param version the version number to test (1-based)
     * @return {@code true} when the version contains the defect
     */
    public static boolean isBadVersion(int version) {
        return version >= FIRST_BAD_VERSION;
    }

    /**
     * Returns the smallest version number that is bad.
     *
     * @param n the highest version that exists
     * @return the first bad version, or {@code -1} when no version is bad
     */
    public static int firstBadVersion(int n) {
        if (n < 1 || !isBadVersion(n)) {
            return -1;
        }
        int left = 1;
        int right = n;
        // Invariant: the first bad version lies inside [left, right].
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (isBadVersion(mid)) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        return left;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(firstBadVersion(n));
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
# First Bad Version — LeetCode 278

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Binary search · Monotone predicate |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Facebook |

## Problem Statement

You have \`n\` versions of a product; the first bad version is the earliest one that contains
a defect. Everything after it is bad as well.

An API \`isBadVersion(version)\` tells you whether a given version is bad. Using **as few
calls to that API as possible**, return the number of the **first** bad version.

If no version is bad, return \`-1\`.

## Input Format

The program reads from standard input:

\`\`\`
n
\`\`\`

- \`n\` — the highest version number that exists; versions are numbered \`1 .. n\`

### About the \`isBadVersion\` check

The release history cannot be read from stdin, so it is implemented here as a **documented
stub**:

\`\`\`java
public static final int FIRST_BAD_VERSION = 4;

public static boolean isBadVersion(int version) {
    return version >= FIRST_BAD_VERSION;
}
\`\`\`

Every version \`>= 4\` is bad, so the first bad version is \`4\` whenever \`n >= 4\`. Change
\`FIRST_BAD_VERSION\` (or the body of \`isBadVersion\`) to model a different release history —
the search algorithm does not change. In a real interview \`isBadVersion\` would be a library
call you do not control, and the point of the exercise is to minimise how often you call it.

## Sample Input

\`\`\`
5
\`\`\`

## Expected Output

\`\`\`
4
\`\`\`

Versions \`1, 2, 3\` are good and version \`4\` is the first bad one.

## Approach — Binary search on a monotone predicate

\`isBadVersion\` is monotone: it answers \`false\` for every version before the first bad one
and \`true\` from that version onwards. That is exactly the shape binary search needs.

Maintain the inclusive window \`[left, right]\` of versions that may contain the first bad
one:

- \`isBadVersion(mid)\` is \`true\` → the first bad version is at \`mid\` **or earlier** → \`right = mid\`.
- \`isBadVersion(mid)\` is \`false\` → the first bad version is strictly after \`mid\` → \`left = mid + 1\`.

The window shrinks by half each time, so the search needs **⌈log₂ n⌉** calls to the API —
which is exactly what the problem asks you to minimise.

**Guard clause.** If \`isBadVersion(n)\` is \`false\`, no version is bad and the answer is \`-1\`.

## Dry Run

Input: \`n = 5\`, bad versions are \`>= 4\`

**Guard call** — \`isBadVersion(5)\` → \`true\`, so a bad version exists and the search starts.

| Step | left | right | mid | \`isBadVersion(mid)\` | action | window after |
|---:|---:|---:|---:|---|---|---|
| 1 | 1 | 5 | 3 | \`false\` (3 < 4) | the first bad version is **after** \`mid\` → \`left = mid + 1\` | \`[4, 5]\` |
| 2 | 4 | 5 | 4 | \`true\` (4 >= 4) | the first bad version is **at** \`mid\` or earlier → \`right = mid\` | \`[4, 4]\` |

\`left == right == 4\` → return **4**.

### Every oracle call, in order

| call | version | \`isBadVersion\` | what it tells us |
|---:|---:|---|---|
| 0 (guard) | 5 | \`true\` | at least one bad version exists |
| 1 | 3 | \`false\` | versions ≤ 3 are good, so the answer is > 3 |
| 2 | 4 | \`true\` | version 4 is bad, so the answer is ≤ 4 |

Combining calls 1 and 2 pins the answer to exactly \`4\`.

**API calls used: 3** (including the guard). A linear scan \`isBadVersion(1), (2), (3), (4)\`
would have needed 4.

### The same search on a larger release history

If \`FIRST_BAD_VERSION\` were \`1000\` and \`n = 1024\`, the window would halve ten times:
\`[1,1024] → [512,1024] → [768,1024] → … → [1000,1000]\` — 10 probes instead of 1024.

## Java Solution

See [\`FirstBadVersion.java\`](./FirstBadVersion.java).

\`\`\`java
public static int firstBadVersion(int n) {
    if (n < 1 || !isBadVersion(n)) {
        return -1;
    }
    int left = 1;
    int right = n;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (isBadVersion(mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(log n) | ⌈log₂ n⌉ API calls; each call is O(1) |
| **Space** | O(1) | Only two index variables |

**Optimal?** Yes — with an unknown first bad version you need Ω(log n) oracle calls in the
worst case; each call only tells you one bit.

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the versions live on a remote server and each call costs 1 second?"* → the
  problem becomes about latency: ⌈log₂ n⌉ calls in parallel is not possible (each answer
  depends on the previous), so it is inherently sequential — but you can cache results and
  use exponential (galloping) search to reduce the *total* calls when the first bad version
  is close to \`1\`.
- *"What if there are multiple independent defects?"* → the predicate is no longer monotone
  and binary search breaks; you need a scan or a different oracle.
- *"How would you test this code?"* → mock the API with a fake release history and assert
  the number of calls (a good test asserts *how many* calls, not just the answer).
- *"What if the versions are released across several machines?"* → the oracle becomes a
  network call; the same binary search applies, only the cost model changes.

**Common mistakes:**
- ❌ Using \`left <= right\` and returning \`-1\` inside the loop → with \`left < right\` the loop
  always converges on the answer, no sentinel needed.
- ❌ Forgetting that \`isBadVersion\` is 1-based → versions start at \`1\`, not \`0\`.
- ❌ Calling \`isBadVersion(mid + 1)\` to move the bound → doubles the number of API calls for
  no reason.
- ❌ Not handling "no bad version at all" → an unguarded binary search returns \`n\`.

**How to narrate:**
> "The oracle is monotone, so the answer is the first version where it flips to true. I'll
> binary search for that boundary — each call halves the remaining range, so I make about
> log₂ n calls, which is the minimum possible. If the newest version is good, then no version
> is bad and I return -1."

## Related Problems

- [Binary Search](./BinarySearch.java) — the same skeleton on an array
- [Koko Eating Bananas](./KokoEatingBananas.java) — binary search on an answer
- [Search Insert Position](./SearchInsertPosition.java) — finding the first true index
`,i=[`isBadVersion`,`firstBadVersion`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};