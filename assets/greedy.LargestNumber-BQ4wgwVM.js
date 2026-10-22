var e=`greedy.LargestNumber`,t=`package com.dsa.greedy;

import com.dsa.utils.FastScanner;

import java.util.Arrays;

/**
 * Problem: Largest Number
 * LeetCode: 179 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Greedy, Custom comparator
 *
 * <p>Problem:
 * Given an array of non-negative integers, arrange them so that they form the largest
 * possible number and return that number as a string.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 10 2 9 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 93210
 * </pre>
 *
 * <p>Approach: for two candidate strings {@code a} and {@code b}, {@code a} must come
 * first exactly when {@code a + b} is larger than {@code b + a}. The comparator
 * therefore puts {@code a} in front when {@code b + a} is smaller than {@code a + b}.
 * Sorting with that comparator yields the maximum concatenation. Numbers that compare
 * equal under {@code a + b == b + a} (such as {@code "3"} and {@code "33"}) are
 * interchangeable.
 *
 * <p>Complexity: Time O(n log n * L), Space O(n * L) where L is the number of digits.
 */
public class LargestNumber {

    /**
     * Returns the largest number that can be formed from the given values.
     *
     * @param nums non-negative integers
     * @return the largest number as a string
     */
    public static String largestNumber(int[] nums) {
        if (nums == null || nums.length == 0) {
            return "";
        }
        String[] parts = new String[nums.length];
        for (int i = 0; i < nums.length; i++) {
            parts[i] = String.valueOf(nums[i]);
        }
        Arrays.sort(parts, (a, b) -> (b + a).compareTo(a + b));
        if (parts[0].equals("0")) {
            return "0";   // every number is zero
        }
        StringBuilder sb = new StringBuilder();
        for (String part : parts) {
            sb.append(part);
        }
        return sb.toString();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(largestNumber(nums));
    }
}
`,n=`import java.util.Arrays;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Largest Number
 * LeetCode: 179 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Greedy, Custom comparator
 *
 * <p>Problem:
 * Given an array of non-negative integers, arrange them so that they form the largest
 * possible number and return that number as a string.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 10 2 9 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 93210
 * </pre>
 *
 * <p>Approach: for two candidate strings {@code a} and {@code b}, {@code a} must come
 * first exactly when {@code a + b} is larger than {@code b + a}. The comparator
 * therefore puts {@code a} in front when {@code b + a} is smaller than {@code a + b}.
 * Sorting with that comparator yields the maximum concatenation. Numbers that compare
 * equal under {@code a + b == b + a} (such as {@code "3"} and {@code "33"}) are
 * interchangeable.
 *
 * <p>Complexity: Time O(n log n * L), Space O(n * L) where L is the number of digits.
 */
public class Main {

    /**
     * Returns the largest number that can be formed from the given values.
     *
     * @param nums non-negative integers
     * @return the largest number as a string
     */
    public static String largestNumber(int[] nums) {
        if (nums == null || nums.length == 0) {
            return "";
        }
        String[] parts = new String[nums.length];
        for (int i = 0; i < nums.length; i++) {
            parts[i] = String.valueOf(nums[i]);
        }
        Arrays.sort(parts, (a, b) -> (b + a).compareTo(a + b));
        if (parts[0].equals("0")) {
            return "0";   // every number is zero
        }
        StringBuilder sb = new StringBuilder();
        for (String part : parts) {
            sb.append(part);
        }
        return sb.toString();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        System.out.println(largestNumber(nums));
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
`,r='\n# Largest Number — LeetCode 179\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Greedy · Custom comparator |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Microsoft, Uber |\n\n## Problem Statement\n\nGiven an array of non-negative integers, arrange them so that they form the largest\npossible number, and return that number as a string.\n\n- `10` and `2` become `"2"` and `"10"`: `"210"` is bigger than `"102"`, so `2` comes\n  first.\n- The result may be very long — do not convert it to a number.\n- If every number is `0`, the answer is `"0"` (not `"000"`).\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nn\nnums[0] nums[1] ... nums[n-1]\n```\n\n- `n` — length of the array (1 ≤ n ≤ 100)\n- `nums` — n space-separated non-negative integers (0 ≤ nums[i] ≤ 2³¹ - 1)\n\n## Sample Input\n\n```\n4\n10 2 9 3\n```\n\n## Expected Output\n\n```\n93210\n```\n\n## Approach — sort with a comparator on `a + b` vs `b + a`\n\nNumeric sorting is useless here: `"9"` must come before `"91"`, but `"91"` must come\nbefore `"9"` in other situations. The only thing that matters is **how two candidates\nbehave next to each other**.\n\nFor two strings `a` and `b`, compare the two possible concatenations:\n\n- if `a + b > b + a` then `a` must come **first**;\n- if `a + b < b + a` then `b` must come first;\n- if they are equal, either order gives the same result.\n\nSo the comparator is `(a, b) -> (b + a).compareTo(a + b)` — `a` sorts before `b` exactly\nwhen `a + b` is the larger concatenation.\n\n**Exchange argument (why the comparator is safe):** consider any two adjacent elements\n`a` and `b` in a candidate arrangement. The rest of the string is identical in both\narrangements, so the whole number is larger exactly when the pair `"ab"` is larger\nthan `"ba"`. Therefore swapping any out-of-order adjacent pair strictly increases the\nnumber (or leaves it unchanged when the two concatenations are equal). Sorting with the\ncomparator removes every such inversion, so no arrangement can be larger than the\nsorted one. This is exactly the "exchange argument" that proves a comparison sort\nyields the optimal permutation for any consistent ordering rule.\n\nBecause the relation "a + b ≥ b + a" is transitive (it is the standard string\nconcatenation ordering), `Arrays.sort` produces a total order and the result is\nwell-defined.\n\n## Dry Run\n\nInput: `nums = [10, 2, 9, 3]` → parts `["10", "2", "9", "3"]`\n\n| Step | compare | `a + b` | `b + a` | winner (first) | order so far |\n|---:|---|---|---|---|---|\n| 1 | `2` vs `10` | `"210"` | `"102"` | `2` | `["2", "10"]` |\n| 2 | `9` vs `3` | `"93"` | `"39"` | `9` | `["9", "3"]` |\n| 3 | `9` vs `2` | `"92"` | `"29"` | `9` | `["9", "2"]` |\n| 4 | `3` vs `2` | `"32"` | `"23"` | `3` | `["9", "3", "2"]` |\n| 5 | `2` vs `10` | `"210"` | `"102"` | `2` | `["9", "3", "2", "10"]` |\n\nConcatenation: `"9" + "3" + "2" + "10"` = **93210**.\n\n### The tie case — `nums = [3, 30, 34, 5, 9]`\n\n| compare | `a + b` | `b + a` | note |\n|---|---|---|---|\n| `3` vs `30` | `"330"` | `"303"` | `"330"` is larger → `3` first |\n| `3` vs `34` | `"334"` | `"343"` | `"343"` is larger → `34` first |\n\n`3` and `30` compare equal-ish (`"330"` > `"303"`), so several arrangements tie; the\nanswer `"9534330"` is the same for all of them.\n\n## Java Solution\n\nSee [`LargestNumber.java`](./LargestNumber.java).\n\n```java\npublic static String largestNumber(int[] nums) {\n    String[] parts = new String[nums.length];\n    for (int i = 0; i < nums.length; i++) {\n        parts[i] = String.valueOf(nums[i]);\n    }\n    Arrays.sort(parts, (a, b) -> (b + a).compareTo(a + b));\n    if (parts[0].equals("0")) {\n        return "0";   // every number is zero\n    }\n    StringBuilder sb = new StringBuilder();\n    for (String part : parts) {\n        sb.append(part);\n    }\n    return sb.toString();\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n log n · L) | `n log n` comparisons, each building two strings of length ≤ 2L |\n| **Space** | O(n · L) | the string representation of every number |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"What if negative numbers are allowed?"* → the problem changes completely: the\n  comparator must also decide whether a negative number goes in front or at the back.\n- *"Can you avoid the string building in the comparator?"* → compare digit by digit\n  from the first difference, or precompute the doubled keys `a + a` vs `b + b`.\n- *"Why not just sort numerically?"* → `"9"` vs `"91"`: numerically `91 > 9`, so\n  `"91"` would come first, but `"991"` > `"919"` — the numeric order is wrong.\n\n**Common mistakes:**\n- ❌ `(a + b).compareTo(b + a)` — this is the comparator **reversed**; it produces\n  `"10239"` instead of `"93210"`.\n- ❌ Returning `"000"` when every number is zero — the answer must be `"0"`.\n- ❌ Converting the result to a `long` — the number can have hundreds of digits.\n\n**How to narrate:**\n> "For two numbers `a` and `b` only the concatenation matters: `a` goes first when\n> `a + b` is bigger than `b + a`. So I sort the strings with that comparator — the\n> comparison is exactly the swap argument: if two neighbours are in the wrong order,\n> swapping them increases the number, so the sorted arrangement is the maximum."\n\n## Related Problems\n\n- [Assign Cookies](./AssignCookies.md) — another "sort and sweep" greedy\n- [Hand of Straights](./HandOfStraights.md) — sorting by value\n- [String Compression](../../../../../../docs/topics/02-strings.md) — comparing strings by value instead of by integer\n',i=[`largestNumber`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};