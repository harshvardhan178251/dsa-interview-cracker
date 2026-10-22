var e=`sorting.SortArrayByParity`,t=`package com.dsa.sorting;

import com.dsa.utils.FastScanner;

/**
 * Problem: Sort Array By Parity
 * LeetCode: 905 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Two pointers, Partitioning
 *
 * <p>Problem: Given an array of integers, move every even number before every odd
 * number. The relative order inside the two groups does not matter.
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
 * 3 1 2 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4 2 1 3
 * </pre>
 *
 * <p>Approach: two pointers walking towards each other. The left pointer skips over
 * the even numbers that are already in place, the right pointer skips over the odd
 * numbers that are already in place, and the two that meet are swapped.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class SortArrayByParity {

    /**
     * Rearranges {@code nums} so that every even number comes before every odd
     * number.
     *
     * @param nums the array to rearrange, in place
     * @return the same array, rearranged
     */
    public static int[] sortArrayByParity(int[] nums) {
        int left = 0;
        int right = nums.length - 1;

        while (left < right) {
            // Move the left pointer to the first odd number.
            while (left < right && nums[left] % 2 == 0) {
                left++;
            }
            // Move the right pointer to the first even number.
            while (left < right && nums[right] % 2 != 0) {
                right--;
            }
            if (left < right) {
                swap(nums, left, right);
                left++;
                right--;
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

        int[] sorted = sortArrayByParity(nums);

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
 * Problem: Sort Array By Parity
 * LeetCode: 905 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Two pointers, Partitioning
 *
 * <p>Problem: Given an array of integers, move every even number before every odd
 * number. The relative order inside the two groups does not matter.
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
 * 3 1 2 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4 2 1 3
 * </pre>
 *
 * <p>Approach: two pointers walking towards each other. The left pointer skips over
 * the even numbers that are already in place, the right pointer skips over the odd
 * numbers that are already in place, and the two that meet are swapped.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Rearranges {@code nums} so that every even number comes before every odd
     * number.
     *
     * @param nums the array to rearrange, in place
     * @return the same array, rearranged
     */
    public static int[] sortArrayByParity(int[] nums) {
        int left = 0;
        int right = nums.length - 1;

        while (left < right) {
            // Move the left pointer to the first odd number.
            while (left < right && nums[left] % 2 == 0) {
                left++;
            }
            // Move the right pointer to the first even number.
            while (left < right && nums[right] % 2 != 0) {
                right--;
            }
            if (left < right) {
                swap(nums, left, right);
                left++;
                right--;
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

        int[] sorted = sortArrayByParity(nums);

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
`,r=`
# Sort Array By Parity — LeetCode 905

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Two Pointers · Partitioning |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Meta, Google, Uber |

## Problem Statement

Given an array of integers, move every **even** number before every **odd** number.

- The relative order inside the two groups does not matter.
- The rearrangement is done in place.
- Print the array as space-separated integers on one line.

## Input Format

The program reads from standard input:

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
\`\`\`

- \`n\` — the length of the array (1 ≤ n ≤ 10⁴).
- \`nums\` — n space-separated integers.

## Sample Input

\`\`\`
4
3 1 2 4
\`\`\`

## Expected Output

\`\`\`
4 2 1 3
\`\`\`

## Approach — Two pointers, one swap per pair

Two pointers start at the two ends of the array:

- \`left\` walks right over the even numbers that are already in place and stops at the
  first **odd** number.
- \`right\` walks left over the odd numbers that are already in place and stops at the
  first **even** number.

Now \`nums[left]\` is odd and \`nums[right]\` is even, so they are swapped and both
pointers move inwards. When the pointers meet, everything is in place.

This is the classic **partition** step of quicksort, specialised to two groups.

## Dry Run

Input: \`nums = [3, 1, 2, 4]\`, \`left = 0\`, \`right = 3\`

### Round 1

| Step | pointer | scan | stop position | note |
|---:|---|---|---:|---|
| 1 | \`left\` | \`nums[0] = 3\` is odd | 0 | stops immediately |
| 2 | \`right\` | \`nums[3] = 4\` is even | 3 | stops immediately |
| 3 | — | swap \`nums[0]\` and \`nums[3]\` | — | \`[4, 1, 2, 3]\`, \`left = 1\`, \`right = 2\` |

### Round 2

| Step | pointer | scan | stop position | note |
|---:|---|---|---:|---|
| 4 | \`left\` | \`nums[1] = 1\` is odd | 1 | stops immediately |
| 5 | \`right\` | \`nums[2] = 2\` is even | 2 | stops immediately |
| 6 | — | swap \`nums[1]\` and \`nums[2]\` | — | \`[4, 2, 1, 3]\`, \`left = 2\`, \`right = 1\` |

### Round 3

| Step | pointer | scan | stop position | note |
|---:|---|---|---:|---|
| 7 | — | \`left (2) >= right (1)\` → the outer loop ends | — | \`[4, 2, 1, 3]\` |

Final array: **\`[4, 2, 1, 3]\`** — the evens (\`4, 2\`) are in front of the odds (\`1, 3\`).

### A longer scan — \`[2, 4, 6, 1, 3, 5]\`

| Step | pointer | scan | stop position | array |
|---:|---|---|---:|---|
| 1 | \`left\` | \`2\` even → \`4\` even → \`6\` even → \`1\` odd | 3 | \`[2, 4, 6, 1, 3, 5]\` |
| 2 | \`right\` | \`5\` odd → \`3\` odd → \`1\` odd → \`6\` even | 2 | \`[2, 4, 6, 1, 3, 5]\` |
| 3 | — | swap \`nums[3]\` and \`nums[2]\` | — | \`[2, 4, 1, 6, 3, 5]\`, \`left = 4\`, \`right = 1\` |
| 4 | — | \`left (4) >= right (1)\` → stop | — | \`[2, 4, 1, 6, 3, 5]\` |

The evens are \`2, 4, 6\` and the odds are \`1, 3, 5\` ✓

## Java Solution

See [\`SortArrayByParity.java\`](./SortArrayByParity.java).

\`\`\`java
public static int[] sortArrayByParity(int[] nums) {
    int left = 0;
    int right = nums.length - 1;
    while (left < right) {
        while (left < right && nums[left] % 2 == 0) {
            left++;
        }
        while (left < right && nums[right] % 2 != 0) {
            right--;
        }
        if (left < right) {
            swap(nums, left, right);
            left++;
            right--;
        }
    }
    return nums;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Each pointer crosses the array at most once |
| **Space** | O(1) | Only two indices |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Keep the relative order inside each group?"* → that is the **stable** version and
  needs O(n) extra space (or a stable partition algorithm).
- *"Three groups instead of two?"* → the Dutch national flag problem with three
  pointers.
- *"What if you only need the k smallest elements?"* → quickselect, O(n) on average.
- *"Can you do it with a hash map?"* → yes, but that is O(n) space and loses the
  original order.

**Common mistakes:**
- ❌ Using \`nums[right] % 2 == 1\` to detect an odd number → in Java, \`-3 % 2\` is
  \`-1\`, not \`1\`, so negative odd numbers are missed. Use \`!= 0\`.
- ❌ Swapping **without** moving the pointers afterwards → an infinite loop.
- ❌ Forgetting the \`left < right\` guard inside the inner loops → an
  \`ArrayIndexOutOfBoundsException\` when the pointers cross.
- ❌ Only swapping once and stopping → the rest of the array stays unsorted.

**How to narrate:**
> "This is quicksort's partition step specialised to two groups. The left pointer
> skips the evens that are already in place and stops at the first odd; the right
> pointer skips the odds and stops at the first even. I swap those two and move both
> pointers inwards. Each pointer crosses the array once, so it's O(n) time and O(1)
> space."

## Related Problems

- [Dutch National Flag](../../../../../../docs/topics/08-sorting.md) — the three-group version
- [Quick Sort](../../../../../../docs/topics/08-sorting.md) — the same partition idea, recursive
- [Sort a Hand of Cards](../../../../../../docs/topics/08-sorting.md) — sorting by two keys
`,i=[`sortArrayByParity`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};