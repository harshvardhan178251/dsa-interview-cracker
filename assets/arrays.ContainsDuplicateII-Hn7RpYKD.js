var e=`arrays.ContainsDuplicateII`,t=`package com.dsa.arrays;

import com.dsa.utils.FastScanner;

import java.util.HashMap;
import java.util.Map;

/**
 * Problem: Contains Duplicate II
 * LeetCode: 219 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Hashing, Sliding distance window
 *
 * <p>Problem:
 * Given an integer array {@code nums} and an integer {@code k}, return {@code true} if
 * there exist two <em>distinct</em> indices {@code i} and {@code j} such that
 * {@code nums[i] == nums[j]} and {@code |i - j| <= k}. Otherwise return {@code false}.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * k
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 2 3 1 3
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: walk the array and remember, for every value, the index where it was last
 * seen. If the current value was already seen at distance at most {@code k}, we have a
 * duplicate. Only the <em>latest</em> occurrence matters: if the closest previous
 * occurrence is too far away, every older one is farther away too.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class ContainsDuplicateII {

    /**
     * Tells whether some duplicate pair lies within distance {@code k}.
     *
     * @param nums the input array
     * @param k    the maximum allowed index distance
     * @return {@code true} when a qualifying duplicate exists
     */
    public static boolean containsNearbyDuplicate(int[] nums, int k) {
        Map<Integer, Integer> lastSeen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            Integer previous = lastSeen.get(nums[i]);
            if (previous != null && i - previous <= k) {
                return true;
            }
            lastSeen.put(nums[i], i);
        }
        return false;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int k = fs.nextInt();

        System.out.println(containsNearbyDuplicate(nums, k));
    }
}
`,n=`import java.util.HashMap;
import java.util.Map;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Contains Duplicate II
 * LeetCode: 219 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Hashing, Sliding distance window
 *
 * <p>Problem:
 * Given an integer array {@code nums} and an integer {@code k}, return {@code true} if
 * there exist two <em>distinct</em> indices {@code i} and {@code j} such that
 * {@code nums[i] == nums[j]} and {@code |i - j| <= k}. Otherwise return {@code false}.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * k
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 2 3 1 3
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: walk the array and remember, for every value, the index where it was last
 * seen. If the current value was already seen at distance at most {@code k}, we have a
 * duplicate. Only the <em>latest</em> occurrence matters: if the closest previous
 * occurrence is too far away, every older one is farther away too.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class Main {

    /**
     * Tells whether some duplicate pair lies within distance {@code k}.
     *
     * @param nums the input array
     * @param k    the maximum allowed index distance
     * @return {@code true} when a qualifying duplicate exists
     */
    public static boolean containsNearbyDuplicate(int[] nums, int k) {
        Map<Integer, Integer> lastSeen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            Integer previous = lastSeen.get(nums[i]);
            if (previous != null && i - previous <= k) {
                return true;
            }
            lastSeen.put(nums[i], i);
        }
        return false;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int k = fs.nextInt();

        System.out.println(containsNearbyDuplicate(nums, k));
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
`,r='\n# Contains Duplicate II — LeetCode 219\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Hashing · Sliding distance window |\n| **Interview heat** | ★★★☆☆ |\n| **Asked at** | Amazon, Google, Meta, Uber |\n\n## Problem Statement\n\nGiven an integer array `nums` and an integer `k`, return `true` if there exist **two\ndistinct indices** `i` and `j` such that:\n\n- `nums[i] == nums[j]`, and\n- `|i - j| <= k`.\n\nOtherwise return `false`.\n\n## Input Format\n\n```\nn\nnums[0] nums[1] ... nums[n-1]\nk\n```\n\n- `n` — length of the array (1 ≤ n ≤ 10⁵)\n- `nums` — n space-separated integers\n- `k` — the maximum allowed index distance\n\n## Sample Input\n\n```\n5\n1 2 3 1 3\n3\n```\n\n## Expected Output\n\n```\ntrue\n```\n\n`nums[0] == nums[3] == 1` and `|3 - 0| = 3 <= k`.\n\n## Approach — Last Occurrence Map\n\nThis is LeetCode 217 ("Contains Duplicate") plus a distance constraint. A hash map from\n**value → last index where it was seen** is enough.\n\nWalking the array:\n\n1. Look up `nums[i]` in the map. If it was seen at index `j` and `i - j <= k`, we have\n   our pair → return `true`.\n2. Otherwise record `lastSeen[nums[i]] = i` and continue.\n\n**Why only the *last* occurrence matters:** suppose the value was seen at indices\n`j1 < j2 < ... < jm`. The distance `i - j` is smallest for the **largest** `j`. If even\nthat closest occurrence is farther than `k`, every older one is farther too, so no pair\ncan exist. Keeping only the latest index therefore loses nothing.\n\nThis is the same "window" idea as a sliding window, but implemented with a map instead of\ntwo pointers — the map *is* the window: it holds the values of the last `k + 1` positions.\n\n## Dry Run\n\nInput: `nums = [1, 2, 3, 1, 3]`, `k = 3`\n\n| Step | i | `nums[i]` | `lastSeen` before | previous index | `i - previous` | `<= k`? | `lastSeen` after | result |\n|---:|---:|---:|---|---:|---:|---|---|---|\n| 1 | 0 | 1 | `{}` | — | — | — | `{1: 0}` | — |\n| 2 | 1 | 2 | `{1: 0}` | — | — | — | `{1: 0, 2: 1}` | — |\n| 3 | 2 | 3 | `{1: 0, 2: 1}` | — | — | — | `{1: 0, 2: 1, 3: 2}` | — |\n| 4 | 3 | 1 | `{1: 0, 2: 1, 3: 2}` | 0 | 3 | **yes** | `{1: 3, 2: 1, 3: 2}` | **true** |\n\nThe loop returns at step 4 — `nums[0] == nums[3]` and the distance is exactly `k`.\n\n### A negative case — `nums = [1, 2, 3, 1, 3]`, `k = 2`\n\n| Step | i | `nums[i]` | previous index | `i - previous` | `<= 2`? | `lastSeen` after |\n|---:|---:|---:|---:|---:|---|---|\n| 1 | 0 | 1 | — | — | — | `{1: 0}` |\n| 2 | 1 | 2 | — | — | — | `{1: 0, 2: 1}` |\n| 3 | 2 | 3 | — | — | — | `{1: 0, 2: 1, 3: 2}` |\n| 4 | 3 | 1 | 0 | 3 | no | `{1: 3, 2: 1, 3: 2}` |\n| 5 | 4 | 3 | 2 | 2 | **yes** | — |\n\nHere the pair `nums[2] == nums[4] == 3` is exactly 2 apart, so the answer is `true`.\n\n## Java Solution\n\nSee [`ContainsDuplicateII.java`](./ContainsDuplicateII.java).\n\n```java\npublic static boolean containsNearbyDuplicate(int[] nums, int k) {\n    Map<Integer, Integer> lastSeen = new HashMap<>();\n    for (int i = 0; i < nums.length; i++) {\n        Integer previous = lastSeen.get(nums[i]);\n        if (previous != null && i - previous <= k) {\n            return true;\n        }\n        lastSeen.put(nums[i], i);\n    }\n    return false;\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n) | One pass, one map lookup and one put per element |\n| **Space** | O(n) | The map holds at most one entry per distinct value |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"Can you do it in O(min(n, k)) space?"* → yes: keep a hash set of the last `k + 1`\n  values and evict the entry that falls out of the window.\n- *"Can you do it without a hash map?"* → no, in general — comparing every pair is\n  O(n²); a sorted-structure approach (BST / sorted list) is also O(n log n).\n- *"What if the array contained a value range instead of arbitrary ints?"* → use a\n  frequency array of size `range` — O(1) lookups and better cache behaviour.\n- *"What if `k` is 0?"* → the answer is always `false` (two distinct indices differ by at\n  least 1).\n- *"How would you find the actual pair of indices?"* → keep the previous index in the map\n  and return it together with `i`.\n\n**Common mistakes:**\n- ❌ Using `i - j < k` instead of `<= k` — the constraint is "at most `k` apart".\n- ❌ Checking the distance **before** the presence check, or using `Integer` unboxing\n  against a `null` map value → a `NullPointerException` on the first element.\n- ❌ Storing the **first** occurrence instead of the last — with `nums = [1,1,1]` and\n  `k = 1` the first-occurrence map reports distance 2 and wrongly returns `false`.\n- ❌ Returning `1`/`0` instead of `true`/`false` when the platform expects a boolean.\n\n**How to narrate:**\n> "I keep a map from value to the index where I last saw it. For each element I check\n> whether the previous occurrence is within `k` positions. Storing only the *last*\n> occurrence is enough, because the closest previous occurrence is the only one that\n> could be within the distance limit. That gives O(n) time in one pass."\n\n## Related Problems\n\n- [Two Sum](TwoSum.md) — the same value→index map, used for a target sum\n- [Remove Element](RemoveElement.md) — in-place compaction with two pointers\n- [Subarray Sum Equals K](../../../../../../docs/topics/12-prefixsum.md) — prefix sums stored in a hash map\n',i=[`containsNearbyDuplicate`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};