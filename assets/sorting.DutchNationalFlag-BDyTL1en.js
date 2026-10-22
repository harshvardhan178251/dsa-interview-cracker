var e=`sorting.DutchNationalFlag`,t=`package com.dsa.sorting;

import com.dsa.utils.FastScanner;

/**
 * Problem: Dutch National Flag
 * LeetCode: 75 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Three-way partitioning, Two pointers
 *
 * <p>Problem: An array holds only the values {@code 0}, {@code 1} and {@code 2}. Sort
 * it in place so that all the zeros come first, then all the ones, then all the
 * twos — in a single pass over the array.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 6
 * 2 0 2 1 1 0
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0 0 1 1 2 2
 * </pre>
 *
 * <p>Approach: three pointers. {@code low} marks the end of the zero region,
 * {@code mid} is the current element and {@code high} marks the start of the two
 * region. Everything before {@code low} is a zero, everything from {@code high} on is
 * a two, and everything between is a one.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class DutchNationalFlag {

    /**
     * Sorts {@code nums} so that all zeros come before all ones and all ones before
     * all twos.
     *
     * @param nums the array to sort, containing only 0, 1 and 2
     * @return the same array, sorted
     */
    public static int[] dutchNationalFlag(int[] nums) {
        int low = 0;
        int mid = 0;
        int high = nums.length - 1;

        while (mid <= high) {
            if (nums[mid] == 0) {
                swap(nums, low, mid);
                low++;
                mid++;
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                swap(nums, mid, high);
                high--;
            }
        }
        return nums;
    }

    /** Swaps two elements of the array. */
    private static void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int[] sorted = dutchNationalFlag(nums);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < sorted.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(sorted[i]);
        }
        System.out.println(sb);
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Dutch National Flag
 * LeetCode: 75 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Three-way partitioning, Two pointers
 *
 * <p>Problem: An array holds only the values {@code 0}, {@code 1} and {@code 2}. Sort
 * it in place so that all the zeros come first, then all the ones, then all the
 * twos — in a single pass over the array.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 6
 * 2 0 2 1 1 0
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0 0 1 1 2 2
 * </pre>
 *
 * <p>Approach: three pointers. {@code low} marks the end of the zero region,
 * {@code mid} is the current element and {@code high} marks the start of the two
 * region. Everything before {@code low} is a zero, everything from {@code high} on is
 * a two, and everything between is a one.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Sorts {@code nums} so that all zeros come before all ones and all ones before
     * all twos.
     *
     * @param nums the array to sort, containing only 0, 1 and 2
     * @return the same array, sorted
     */
    public static int[] dutchNationalFlag(int[] nums) {
        int low = 0;
        int mid = 0;
        int high = nums.length - 1;

        while (mid <= high) {
            if (nums[mid] == 0) {
                swap(nums, low, mid);
                low++;
                mid++;
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                swap(nums, mid, high);
                high--;
            }
        }
        return nums;
    }

    /** Swaps two elements of the array. */
    private static void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        int[] sorted = dutchNationalFlag(nums);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < sorted.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(sorted[i]);
        }
        System.out.println(sb);
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
`,r='\n# Dutch National Flag — LeetCode 75\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Three-way partitioning · Two pointers |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Uber |\n\n## Problem Statement\n\nAn array contains only the values `0`, `1` and `2`. Sort it **in a single pass** so\nthat all the `0`s come first, then all the `1`s, then all the `2`s.\n\n- The relative order of the equal values does not matter.\n- Print the sorted array as space-separated integers on one line.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nn\nnums[0] nums[1] ... nums[n-1]\n```\n\n- `n` — the length of the array (1 ≤ n ≤ 10⁴).\n- `nums` — n space-separated integers, each `0`, `1` or `2`.\n\n## Sample Input\n\n```\n6\n2 0 2 1 1 0\n```\n\n## Expected Output\n\n```\n0 0 1 1 2 2\n```\n\n## Approach — Three pointers\n\nUse three pointers instead of the usual two:\n\n| Pointer | Meaning |\n|---|---|\n| `low` | everything **before** it is a `0` |\n| `mid` | the element currently being looked at |\n| `high` | everything **from** it on is a `2` |\n\nThe region between `low` and `mid` holds the `1`s that are already in place, and the\nregion between `mid` and `high` is still unknown.\n\nLook at `nums[mid]`:\n\n- **`0`** → swap it with `nums[low]`. The `0` belongs at the front and the element\n  that was at `low` is a `1` that now belongs where `mid` was, so **both** `low` and\n  `mid` move right.\n- **`1`** → it is already in place, just move `mid` right.\n- **`2`** → swap it with `nums[high]`. The value that comes back from `high` has not\n  been examined yet, so `mid` **stays** and `high` moves left.\n\nThe loop stops when `mid > high`.\n\n## Dry Run\n\nInput: `nums = [2, 0, 2, 1, 1, 0]`, `low = 0`, `mid = 0`, `high = 5`\n\n| Step | `low` | `mid` | `high` | `nums[mid]` | action | array after |\n|---:|---:|---:|---:|---:|---|---|\n| 1 | 0 | 0 | 5 | 2 | swap(0, 5), `high = 4` | `[0, 0, 2, 1, 1, 2]` |\n| 2 | 0 | 0 | 4 | 0 | swap(0, 0), `low = 1`, `mid = 1` | `[0, 0, 2, 1, 1, 2]` |\n| 3 | 1 | 1 | 4 | 0 | swap(1, 1), `low = 2`, `mid = 2` | `[0, 0, 2, 1, 1, 2]` |\n| 4 | 2 | 2 | 4 | 2 | swap(2, 4), `high = 3` | `[0, 0, 1, 1, 2, 2]` |\n| 5 | 2 | 3 | 3 | 1 | `mid = 4` | `[0, 0, 1, 1, 2, 2]` |\n| 6 | 2 | 4 | 3 | — | `mid (4) > high (3)` → stop | `[0, 0, 1, 1, 2, 2]` |\n\nFinal array: **`[0, 0, 1, 1, 2, 2]`**\n\n### Why `mid` does not move in the `2` branch\n\nAt step 4 the value `2` at index 2 was swapped with the value `2` at index 4 — no\nvisible change, but `high` dropped to 3, so index 4 is now outside the unknown\nregion. The `2` branch is the only one where the element that arrives from `high`\nhas **not** been inspected yet, so `mid` must stay put and re-examine it.\n\n### The `0` branch moves both pointers\n\nAt step 3 the `0` at index 1 was swapped with the `0` at index 1 (a no-op). In\ngeneral the element that comes back from `low` is a `1` that was already in the\ncorrect region, so it is moved to `mid`\'s position and both pointers advance.\n\n## Java Solution\n\nSee [`DutchNationalFlag.java`](./DutchNationalFlag.java).\n\n```java\npublic static int[] dutchNationalFlag(int[] nums) {\n    int low = 0;\n    int mid = 0;\n    int high = nums.length - 1;\n    while (mid <= high) {\n        if (nums[mid] == 0) {\n            swap(nums, low, mid);\n            low++;\n            mid++;\n        } else if (nums[mid] == 1) {\n            mid++;\n        } else {\n            swap(nums, mid, high);\n            high--;\n        }\n    }\n    return nums;\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n) | Every element is examined at most twice; one pass, no inner loops |\n| **Space** | O(1) | Three indices |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"What if there are k distinct values instead of three?"* → the generalisation is\n  the Dutch national flag problem with k pointers; or use a hash map to count the\n  values and rewrite the array (O(n) time, O(k) space).\n- *"Can you do it in two passes?"* → yes: count the zeros, then fill the array with\n  zeros, ones and twos — simpler but two passes instead of one.\n- *"Is it stable?"* → **no**: the `2` branch swaps a `2` with an unexamined element,\n  which can reorder equal values.\n- *"Why not just sort it?"* → sorting is O(n log n) with comparisons; the three-way\n  partition is O(n) with none.\n\n**Common mistakes:**\n- ❌ Moving `mid` in the **`2` branch** → the element swapped in from `high` is never\n  examined and can end up in the wrong region.\n- ❌ Forgetting to move `low` in the **`0` branch** → the next `0` may be swapped\n  with a `1`, breaking the invariant.\n- ❌ Using `mid < high` instead of `mid <= high` as the loop condition → the last\n  element is left unsorted.\n- ❌ Swapping `mid` with `low` **before** checking `nums[mid]` → the value you\n  classified is not the value you swap.\n\n**How to narrate:**\n> "I use three pointers: low marks the end of the zero region, mid is the current\n> element and high marks the start of the two region. A zero gets swapped with\n> nums[low] and both pointers advance; a one just advances mid; a two gets swapped\n> with nums[high] and only high moves, because the value that comes back from high\n> hasn\'t been examined yet. One pass, O(n) time, O(1) space."\n\n## Related Problems\n\n- [Sort Array By Parity](../../../../../../docs/topics/08-sorting.md) — the same idea with two pointers and two groups\n- [Quick Sort](../../../../../../docs/topics/08-sorting.md) — partitioning with two pointers\n- [Two Sum II](../../../../../../docs/topics/10-twopointers.md) — partitioning with two pointers\n',i=[`dutchNationalFlag`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};