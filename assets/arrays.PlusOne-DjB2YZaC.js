var e=`arrays.PlusOne`,t=`package com.dsa.arrays;

import com.dsa.utils.FastScanner;

/**
 * Problem: Plus One
 * LeetCode: 66 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Carry propagation, Right-to-left scan
 *
 * <p>Problem:
 * Given a non-negative integer represented by a digit array {@code digits} (no leading
 * zeros except for the number 0 itself), increment the number by one and return the new
 * digit array.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * digits[0] digits[1] ... digits[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 1 2 3 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1235
 * </pre>
 *
 * <p>Approach: start at the last digit and carry leftwards while the digit is 9. The
 * first digit that is not 9 is incremented; every 9 that was passed becomes 0. If the
 * carry runs off the left end, the answer needs one extra leading digit.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class PlusOne {

    /**
     * Returns the digits of {@code digits + 1}.
     *
     * @param digits the decimal digits, most significant first
     * @return a new array holding the incremented number
     */
    public static int[] plusOne(int[] digits) {
        int[] result = digits.clone();
        int i = result.length - 1;
        while (i >= 0 && result[i] == 9) {
            result[i] = 0;
            i--;
        }
        if (i >= 0) {
            result[i]++;
        } else {
            int[] grown = new int[digits.length + 1];
            grown[0] = 1;
            result = grown;
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] digits = fs.nextIntArray(n);

        int[] answer = plusOne(digits);
        StringBuilder out = new StringBuilder();
        for (int digit : answer) {
            out.append(digit);
        }
        System.out.println(out);
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Plus One
 * LeetCode: 66 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Carry propagation, Right-to-left scan
 *
 * <p>Problem:
 * Given a non-negative integer represented by a digit array {@code digits} (no leading
 * zeros except for the number 0 itself), increment the number by one and return the new
 * digit array.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * digits[0] digits[1] ... digits[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 1 2 3 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1235
 * </pre>
 *
 * <p>Approach: start at the last digit and carry leftwards while the digit is 9. The
 * first digit that is not 9 is incremented; every 9 that was passed becomes 0. If the
 * carry runs off the left end, the answer needs one extra leading digit.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class Main {

    /**
     * Returns the digits of {@code digits + 1}.
     *
     * @param digits the decimal digits, most significant first
     * @return a new array holding the incremented number
     */
    public static int[] plusOne(int[] digits) {
        int[] result = digits.clone();
        int i = result.length - 1;
        while (i >= 0 && result[i] == 9) {
            result[i] = 0;
            i--;
        }
        if (i >= 0) {
            result[i]++;
        } else {
            int[] grown = new int[digits.length + 1];
            grown[0] = 1;
            result = grown;
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] digits = fs.nextIntArray(n);

        int[] answer = plusOne(digits);
        StringBuilder out = new StringBuilder();
        for (int digit : answer) {
            out.append(digit);
        }
        System.out.println(out);
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
# Plus One — LeetCode 66

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Carry propagation · Right-to-left scan |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Microsoft |

## Problem Statement

You are given a **non-negative** integer represented as an array of its decimal digits,
\`digits\`, with no leading zeros (except the number \`0\` itself).

Return the array of digits representing the number \`digits + 1\`.

The array must not be converted to an integer — the problem exists precisely because the
number may be too large for a primitive type.

## Input Format

\`\`\`
n
digits[0] digits[1] ... digits[n-1]
\`\`\`

- \`n\` — number of digits (1 ≤ n ≤ 10⁴)
- \`digits\` — n digits, most significant first

## Sample Input

\`\`\`
4
1 2 3 4
\`\`\`

## Expected Output

\`\`\`
1235
\`\`\`

The digits are printed without separators.

## Approach — Propagate the Carry Leftwards

Addition carries from the **right**. The only digit that changes is the first one (from
the right) that is not \`9\`; every \`9\` to its right becomes \`0\` and passes the carry on.

\`\`\`
i = last index
while i >= 0 and digits[i] == 9:
    digits[i] = 0
    i--
if i >= 0:
    digits[i]++
else:
    // the carry ran off the front: 999 -> 1000
    return [1, 0, 0, 0]
\`\`\`

**The carry-out case:** if every digit was \`9\`, the answer needs one extra digit in
front: \`[9,9]\` → \`[1,0,0]\`.

**Why not parse to an \`int\`?** The input may have 10⁴ digits, far beyond \`long\`. Working
on the digit array is the whole point of the problem.

## Dry Run

Input: \`digits = [1, 2, 3, 4]\`

| Step | \`i\` | \`digits[i]\` | is 9? | action | array after |
|---:|---:|---:|---|---|---|
| 1 | 3 | 4 | no | stop the loop, \`digits[3]++\` | \`[1, 2, 3, 5]\` |

\`i >= 0\`, so no extra digit is needed.

Answer: **1235**

### The carry-out case — \`digits = [9, 9]\`

| Step | \`i\` | \`digits[i]\` | is 9? | action | array after |
|---:|---:|---:|---|---|---|
| 1 | 1 | 9 | **yes** | \`digits[1] = 0\`, carry left | \`[9, 0]\` |
| 2 | 0 | 9 | **yes** | \`digits[0] = 0\`, carry left | \`[0, 0]\` |
| 3 | −1 | — | — | loop ends with \`i < 0\` → carry out | \`[0, 0]\` → \`[1, 0, 0]\` |

Answer: **1000** (for \`[9,9,9]\`)

## Java Solution

See [\`PlusOne.java\`](./PlusOne.java).

\`\`\`java
public static int[] plusOne(int[] digits) {
    int[] result = digits.clone();
    int i = result.length - 1;
    while (i >= 0 && result[i] == 9) {
        result[i] = 0;
        i--;
    }
    if (i >= 0) {
        result[i]++;
    } else {
        int[] grown = new int[digits.length + 1];
        grown[0] = 1;
        result = grown;
    }
    return result;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Each digit is touched at most once |
| **Space** | O(n) | A copy of the digits (O(1) extra if you mutate in place) |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Do it in place."* → skip the \`clone()\` and write into \`digits\` directly.
- *"What about \`+2\`, \`+10\`?"* → generalise the carry: keep a \`carry\` variable and add
  the increment digit by digit.
- *"What if the input can have leading zeros?"* → strip them first, or handle the
  "insert a 1 in front" case carefully.
- *"How would you do it for a big number in a string?"* → the same algorithm on
  \`char\` values.
- *"What if the base were 16 instead of 10?"* → the logic is unchanged, only the number
  of "full" digits changes (15 instead of 9).

**Common mistakes:**
- ❌ Forgetting the **carry-out** case — \`[9,9]\` must become \`[1,0,0]\`, not \`[0,0]\`.
- ❌ Off-by-one in the loop bound — starting at \`digits.length\` instead of
  \`digits.length - 1\` throws \`ArrayIndexOutOfBoundsException\`.
- ❌ Modifying the caller's array when the caller expects it unchanged.
- ❌ Parsing the digits into a \`long\` — that is exactly what the problem forbids, and it
  overflows for long inputs.

**How to narrate:**
> "This is just addition with a carry, but done on the digit array so the number can be
> arbitrarily long. I scan from the right: every 9 becomes 0 and passes the carry on.
> The first digit that isn't 9 gets incremented and the carry stops. If I run off the
> left end, the number was all 9s, so the answer gains a leading 1."

## Related Problems

- [Missing Number](MissingNumber.md) — digit-array reasoning
- [Rotate Array](RotateArray.md) — another array-transformation drill
- [Running Sum of 1d Array](../../../../../../docs/topics/12-prefixsum.md) — the carry-style left-to-right accumulation
`,i=[`plusOne`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};