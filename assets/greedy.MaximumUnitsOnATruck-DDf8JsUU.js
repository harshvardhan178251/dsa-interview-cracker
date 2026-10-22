var e=`greedy.MaximumUnitsOnATruck`,t=`package com.dsa.greedy;

import com.dsa.utils.FastScanner;

import java.util.Arrays;

/**
 * Problem: Maximum Units on a Truck
 * LeetCode: none (USACO "Delivering Cookies" style) | Difficulty: Easy | Frequency: 2/5
 * Pattern: Greedy, Sort by value per unit
 *
 * <p>Problem:
 * A truck can carry {@code truckSize} boxes. Box type {@code i} exists in
 * {@code quantities[i]} copies and every copy holds {@code unitsPerBox[i]} units.
 * Return the maximum number of units the truck can carry.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * quantities[0] quantities[1] ... quantities[n-1]
 * unitsPerBox[0] unitsPerBox[1] ... unitsPerBox[n-1]
 * truckSize
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 1 2 3
 * 3 2 1
 * 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 8
 * </pre>
 *
 * <p>Approach: every box occupies exactly one slot of the truck, so a box that holds
 * more units is always at least as good as one that holds fewer. Take the boxes with
 * the largest {@code unitsPerBox} first until the truck is full.
 *
 * <p>Complexity: Time O(n log n), Space O(n).
 */
public class MaximumUnitsOnATruck {

    /**
     * Returns the maximum number of units the truck can carry.
     *
     * @param quantities   number of boxes of every type
     * @param unitsPerBox  units carried by one box of every type
     * @param truckSize    number of boxes the truck can hold
     * @return the maximum number of units
     */
    public static int maximumUnits(int[] quantities, int[] unitsPerBox, int truckSize) {
        if (quantities == null || unitsPerBox == null || truckSize <= 0) {
            return 0;
        }
        int n = Math.min(quantities.length, unitsPerBox.length);
        Integer[] order = new Integer[n];
        for (int i = 0; i < n; i++) {
            order[i] = i;
        }
        Arrays.sort(order, (a, b) -> Integer.compare(unitsPerBox[b], unitsPerBox[a]));

        int slots = truckSize;
        int units = 0;
        for (int i : order) {
            if (slots == 0) {
                break;
            }
            int taken = Math.min(slots, quantities[i]);
            units += taken * unitsPerBox[i];
            slots -= taken;
        }
        return units;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] quantities = fs.nextIntArray(n);
        int[] unitsPerBox = fs.nextIntArray(n);
        int truckSize = fs.nextInt();

        System.out.println(maximumUnits(quantities, unitsPerBox, truckSize));
    }
}
`,n=`import java.util.Arrays;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Maximum Units on a Truck
 * LeetCode: none (USACO "Delivering Cookies" style) | Difficulty: Easy | Frequency: 2/5
 * Pattern: Greedy, Sort by value per unit
 *
 * <p>Problem:
 * A truck can carry {@code truckSize} boxes. Box type {@code i} exists in
 * {@code quantities[i]} copies and every copy holds {@code unitsPerBox[i]} units.
 * Return the maximum number of units the truck can carry.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * quantities[0] quantities[1] ... quantities[n-1]
 * unitsPerBox[0] unitsPerBox[1] ... unitsPerBox[n-1]
 * truckSize
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 1 2 3
 * 3 2 1
 * 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 8
 * </pre>
 *
 * <p>Approach: every box occupies exactly one slot of the truck, so a box that holds
 * more units is always at least as good as one that holds fewer. Take the boxes with
 * the largest {@code unitsPerBox} first until the truck is full.
 *
 * <p>Complexity: Time O(n log n), Space O(n).
 */
public class Main {

    /**
     * Returns the maximum number of units the truck can carry.
     *
     * @param quantities   number of boxes of every type
     * @param unitsPerBox  units carried by one box of every type
     * @param truckSize    number of boxes the truck can hold
     * @return the maximum number of units
     */
    public static int maximumUnits(int[] quantities, int[] unitsPerBox, int truckSize) {
        if (quantities == null || unitsPerBox == null || truckSize <= 0) {
            return 0;
        }
        int n = Math.min(quantities.length, unitsPerBox.length);
        Integer[] order = new Integer[n];
        for (int i = 0; i < n; i++) {
            order[i] = i;
        }
        Arrays.sort(order, (a, b) -> Integer.compare(unitsPerBox[b], unitsPerBox[a]));

        int slots = truckSize;
        int units = 0;
        for (int i : order) {
            if (slots == 0) {
                break;
            }
            int taken = Math.min(slots, quantities[i]);
            units += taken * unitsPerBox[i];
            slots -= taken;
        }
        return units;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] quantities = fs.nextIntArray(n);
        int[] unitsPerBox = fs.nextIntArray(n);
        int truckSize = fs.nextInt();

        System.out.println(maximumUnits(quantities, unitsPerBox, truckSize));
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
# Maximum Units on a Truck

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Greedy · Sort by value per unit |
| **Interview heat** | ★★☆☆☆ |
| **Asked at** | Amazon, Google, Uber |

## Problem Statement

A truck can carry \`truckSize\` boxes. Box type \`i\` exists in \`quantities[i]\` copies and
every copy holds \`unitsPerBox[i]\` units. Return the **maximum** number of units the
truck can carry.

- Every box occupies exactly one slot of the truck, no matter how many units it holds.
- A box that holds more units is always at least as good as one that holds fewer.

## Input Format

The program reads from standard input:

\`\`\`
n
quantities[0] quantities[1] ... quantities[n-1]
unitsPerBox[0] unitsPerBox[1] ... unitsPerBox[n-1]
truckSize
\`\`\`

- \`n\` — number of box types (1 ≤ n ≤ 10⁴)
- \`quantities\` — n space-separated counts of available boxes
- \`unitsPerBox\` — n space-separated units carried by one box of each type
- \`truckSize\` — number of boxes the truck can hold

## Sample Input

\`\`\`
3
1 2 3
3 2 1
4
\`\`\`

## Expected Output

\`\`\`
8
\`\`\`

The truck takes the three best boxes first — one box holding 3 units and two boxes
holding 2 units each — and then one box holding 1 unit: \`3 + 2 + 2 + 1 = 8\`.

## Approach — take the most valuable boxes first

Every box costs exactly one slot, so the problem is "pick at most \`truckSize\` boxes
with the largest total value". Sort the box types by \`unitsPerBox\` in descending order
and fill the truck from the front.

**Exchange argument (why the greedy choice is safe):** suppose a solution loads a box
worth \`x\` units while leaving behind a box worth \`y > x\` units (there is room for one
more box, otherwise the truck would not be full). Swapping the two boxes keeps the
number of loaded boxes the same and increases the total by \`y - x > 0\`. Therefore an
optimal solution never loads a less valuable box while a more valuable one is left
behind — the greedy order (most valuable first) is optimal, and filling the truck
completely is optimal because every box adds a non-negative number of units.

## Dry Run

Input: \`quantities = [1, 2, 3]\`, \`unitsPerBox = [3, 2, 1]\`, \`truckSize = 4\`

Sorted by \`unitsPerBox\` descending: \`(type 0: 1 box × 3)\`, \`(type 1: 2 boxes × 2)\`,
\`(type 2: 3 boxes × 1)\`

| Step | box type | units/box | boxes available | slots left | boxes taken | units gained | units total |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | 0 | 3 | 1 | 4 | \`min(4, 1) = 1\` | \`1 × 3 = 3\` | 3 |
| 2 | 1 | 2 | 2 | 3 | \`min(3, 2) = 2\` | \`2 × 2 = 4\` | 7 |
| 3 | 2 | 1 | 3 | 1 | \`min(1, 3) = 1\` | \`1 × 1 = 1\` | 8 |

No slots left → stop. Total = **8**.

## Java Solution

See [\`MaximumUnitsOnATruck.java\`](./MaximumUnitsOnATruck.java).

\`\`\`java
public static int maximumUnits(int[] quantities, int[] unitsPerBox, int truckSize) {
    int n = Math.min(quantities.length, unitsPerBox.length);
    Integer[] order = new Integer[n];
    for (int i = 0; i < n; i++) {
        order[i] = i;
    }
    Arrays.sort(order, (a, b) -> Integer.compare(unitsPerBox[b], unitsPerBox[a]));

    int slots = truckSize;
    int units = 0;
    for (int i : order) {
        if (slots == 0) {
            break;
        }
        int taken = Math.min(slots, quantities[i]);
        units += taken * unitsPerBox[i];
        slots -= taken;
    }
    return units;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log n) | one sort plus a linear pass |
| **Space** | O(n) | the index array that carries the sort order |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if a box may be split between trucks?"* → the greedy is still right, but the
  arithmetic becomes fractional; a sweep over the sorted values with a remaining
  capacity works.
- *"What if some boxes are too heavy for the truck?"* → add a weight dimension; then it
  becomes a knapsack problem and the greedy is no longer optimal.
- *"Return the number of boxes too."* → count the boxes taken in the same loop.

**Common mistakes:**
- ❌ Sorting by \`quantity\` instead of by \`unitsPerBox\` — the value of a box is what
  matters, not how many there are.
- ❌ Forgetting that the truck size counts **boxes**, not units.
- ❌ Using \`>\` instead of \`>=\` when comparing the units of two types — ties are
  irrelevant, but the sort must be stable enough not to lose boxes.

**How to narrate:**
> "Every box takes one slot, so I want the \`truckSize\` most valuable boxes. I sort the
> types by units per box and fill the truck greedily. The exchange argument is simple:
> if I load a 2-unit box while a 5-unit box is left behind, swapping them strictly
> increases the total, so an optimal solution always takes the most valuable boxes
> first."

## Related Problems

- [Partition Array Into Maximum Subarrays](./PartitionArrayToMaximumSum.md) — keeping the best values with a heap
- [Coin Change with Greedy](./GreedyCoinChange.md) — another "value per slot" greedy`,i=[`maximumUnits`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};