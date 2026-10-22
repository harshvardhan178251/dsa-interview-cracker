var e=`prefixsum.PairsWithTargetSum`,t=`package com.dsa.prefixsum;

import com.dsa.utils.FastScanner;

import java.util.HashMap;
import java.util.Map;

/**
 * Problem: Pairs With a Target Sum
 * LeetCode: 1674 | Difficulty: Medium | Frequency: 2/5
 * Pattern: Hashing, Complement counting
 *
 * <p>Problem:
 * Given an integer array {@code nums} and an integer {@code target}, return the number of
 * index pairs {@code (i, j)} with {@code i < j} and {@code nums[i] + nums[j] == target}.
 * Pairs are counted by position, so duplicate values create multiple pairs.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * target
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 1 2 3 4
 * 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: walk the array once and keep a frequency map of the values already seen.
 * For each value {@code v}, every earlier occurrence of {@code target - v} forms one new
 * pair, so we add that frequency to the answer. The value is only inserted into the map
 * <em>after</em> the lookup, which guarantees {@code i < j} and prevents pairing an
 * element with itself.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class PairsWithTargetSum {

    /**
     * Counts the index pairs whose values add up to {@code target}.
     *
     * @param nums   the input array
     * @param target the required sum
     * @return the number of pairs
     */
    public static int countPairs(int[] nums, int target) {
        Map<Integer, Integer> frequency = new HashMap<>();
        int pairs = 0;
        for (int value : nums) {
            Integer seen = frequency.get(target - value);
            if (seen != null) {
                pairs += seen;
            }
            frequency.merge(value, 1, Integer::sum);
        }
        return pairs;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int target = fs.nextInt();

        System.out.println(countPairs(nums, target));
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
 * Problem: Pairs With a Target Sum
 * LeetCode: 1674 | Difficulty: Medium | Frequency: 2/5
 * Pattern: Hashing, Complement counting
 *
 * <p>Problem:
 * Given an integer array {@code nums} and an integer {@code target}, return the number of
 * index pairs {@code (i, j)} with {@code i < j} and {@code nums[i] + nums[j] == target}.
 * Pairs are counted by position, so duplicate values create multiple pairs.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * target
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 1 2 3 4
 * 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: walk the array once and keep a frequency map of the values already seen.
 * For each value {@code v}, every earlier occurrence of {@code target - v} forms one new
 * pair, so we add that frequency to the answer. The value is only inserted into the map
 * <em>after</em> the lookup, which guarantees {@code i < j} and prevents pairing an
 * element with itself.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class Main {

    /**
     * Counts the index pairs whose values add up to {@code target}.
     *
     * @param nums   the input array
     * @param target the required sum
     * @return the number of pairs
     */
    public static int countPairs(int[] nums, int target) {
        Map<Integer, Integer> frequency = new HashMap<>();
        int pairs = 0;
        for (int value : nums) {
            Integer seen = frequency.get(target - value);
            if (seen != null) {
                pairs += seen;
            }
            frequency.merge(value, 1, Integer::sum);
        }
        return pairs;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int target = fs.nextInt();

        System.out.println(countPairs(nums, target));
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
`,r='\n# Pairs With a Target Sum — LeetCode 1674\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Hashing · Complement counting |\n| **Interview heat** | ★★☆☆☆ |\n| **Asked at** | Amazon, Google, Meta, Uber |\n\n## Problem Statement\n\nGiven an integer array `nums` and an integer `target`, return the **number of index\npairs** `(i, j)` with `i < j` and\n\n```\nnums[i] + nums[j] == target\n```\n\nPairs are counted **by position**, so duplicate values create multiple pairs. For\nexample, in `[1, 1, 2, 2]` with `target = 3` there are four pairs.\n\n## Input Format\n\n```\nn\nnums[0] nums[1] ... nums[n-1]\ntarget\n```\n\n- `n` — length of the array (2 ≤ n ≤ 10⁴)\n- `nums` — n space-separated integers\n- `target` — the required sum\n\n## Sample Input\n\n```\n4\n1 2 3 4\n5\n```\n\n## Expected Output\n\n```\n2\n```\n\nThe pairs are `(0, 3)` — `1 + 4` — and `(1, 2)` — `2 + 3`.\n\n## Approach — Frequency Map of the Seen Values\n\nThe same idea as [Two Sum](../arrays/TwoSum.md), but counting\ninstead of returning one pair.\n\nWalk the array and keep `frequency`: value → how many times it has already been seen.\n\nAt each value `v`:\n\n1. `need = target - v`.\n2. Every earlier occurrence of `need` forms a new pair → add `frequency[need]` to the\n   answer.\n3. Increment `frequency[v]`.\n\n**The order matters.** The lookup happens **before** the insert, which guarantees `i < j`\nand prevents an element from pairing with itself. Inserting first would count the\nelement\'s own complement twice.\n\n**Why add the whole frequency instead of just 1?** Because several earlier elements can\nhold the complement value, and each of them is a distinct pair.\n\n## Dry Run\n\nInput: `nums = [1, 2, 3, 4]`, `target = 5`\n\n| Step | `i` | `value` | `need = target - value` | `frequency` before | `frequency[need]` | `pairs` before | `pairs` after | `frequency` after |\n|---:|---:|---:|---:|---|---:|---:|---:|---|\n| 1 | 0 | 1 | 4 | `{}` | absent | 0 | 0 | `{1: 1}` |\n| 2 | 1 | 2 | 3 | `{1: 1}` | absent | 0 | 0 | `{1: 1, 2: 1}` |\n| 3 | 2 | 3 | 2 | `{1: 1, 2: 1}` | 1 | 0 | **1** | `{1: 1, 2: 1, 3: 1}` |\n| 4 | 3 | 4 | 1 | `{1: 1, 2: 1, 3: 1}` | 1 | 1 | **2** | `{1: 1, 2: 1, 3: 1, 4: 1}` |\n\nAnswer: **2** — the pairs `(1, 2)` (values 2 and 3) and `(0, 3)` (values 1 and 4).\n\n### Duplicates — `nums = [1, 1, 2, 2]`, `target = 3`\n\n| Step | `i` | `value` | `need` | `frequency[need]` | `pairs` after | `frequency` after |\n|---:|---:|---:|---:|---:|---:|---|\n| 1 | 0 | 1 | 2 | absent | 0 | `{1: 1}` |\n| 2 | 1 | 1 | 2 | absent | 0 | `{1: 2}` |\n| 3 | 2 | 2 | 1 | 2 | **2** | `{1: 2, 2: 1}` |\n| 4 | 3 | 2 | 1 | 2 | **4** | `{1: 2, 2: 2}` |\n\nAnswer: **4** — the pairs `(0,2)`, `(0,3)`, `(1,2)`, `(1,3)`.\n\n## Java Solution\n\nSee [`PairsWithTargetSum.java`](./PairsWithTargetSum.java).\n\n```java\npublic static int countPairs(int[] nums, int target) {\n    Map<Integer, Integer> frequency = new HashMap<>();\n    int pairs = 0;\n    for (int value : nums) {\n        Integer seen = frequency.get(target - value);\n        if (seen != null) {\n            pairs += seen;\n        }\n        frequency.merge(value, 1, Integer::sum);\n    }\n    return pairs;\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n) | One pass, one map lookup and one update per element |\n| **Space** | O(n) | The frequency map holds at most n entries |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"Return the pairs instead of the count."* → store the index list per value, or\n  re-scan with a map from value → indices.\n- *"What if the array were sorted?"* → two pointers, O(n) time and O(1) space.\n- *"What if the values were huge or negative?"* → a `HashMap` handles any `int` key.\n- *"What if `target` were a range instead of a single value?"* → keep a map of\n  frequencies and, for each value, add the frequencies of every value in the range —\n  that is O(n · range), so a prefix-frequency array over the value domain is better.\n- *"How does this relate to counting subarrays with sum k?"* → the same idea, but the\n  map stores *prefix sums* rather than values; see\n  [Subarray Sum Equals K](SubarraySumEqualsK.md).\n\n**Common mistakes:**\n- ❌ Inserting the value into the map **before** the lookup — the element then pairs\n  with itself (`[3,3]` with `target = 6` would count 2 pairs instead of 1).\n- ❌ Counting each pair twice (once from each side) — the "insert after lookup" rule\n  prevents that automatically.\n- ❌ Counting **distinct value pairs** instead of **index pairs** — with duplicates the\n  count is larger.\n- ❌ Using `frequency.getOrDefault(need, 0)` with an `int` key and then `frequency.put`\n  instead of `merge` — `merge` is the one-liner that never forgets the increment.\n\n**How to narrate:**\n> "This is Two Sum with counting. I keep a map from value to how many times I\'ve\n> already seen it. For each element I look up its complement and add that frequency to\n> the answer — every earlier copy of the complement is a distinct pair. I insert the\n> current value only after the lookup, which guarantees the two indices are ordered and\n> that an element never pairs with itself."\n\n## Related Problems\n\n- [Two Sum](../arrays/TwoSum.md) — the single-pair version\n- [Subarray Sum Equals K](SubarraySumEqualsK.md) — prefix sums in a hash map\n- [Contiguous Array](ContiguousArray.md) — prefix balances in a hash map\n',i=[`countPairs`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};