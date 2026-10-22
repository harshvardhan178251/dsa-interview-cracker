var e=`math.PalindromeNumber`,t=`package com.dsa.math;

import com.dsa.utils.FastScanner;

/**
 * Problem: Palindrome Number
 * LeetCode: 9 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Digit manipulation, Half reversal
 *
 * <p>Problem:
 * Decide whether a non-negative integer reads the same forwards and backwards.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 121
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: reverse the digits one by one and stop as soon as the reversed prefix
 * catches up with the remaining suffix — at that point the two halves can be compared
 * directly. For an odd number of digits the middle digit belongs to neither half, so
 * the reversed half is divided by ten before the comparison.
 *
 * <p>Complexity: Time O(log n), Space O(1).
 */
public class PalindromeNumber {

    /**
     * Returns whether {@code n} is a palindrome.
     *
     * @param n the number to test
     * @return {@code true} when the digits read the same in both directions
     */
    public static boolean isPalindrome(int n) {
        if (n < 0 || (n % 10 == 0 && n != 0)) {
            return false;   // a negative number has a leading '-', a trailing zero has no partner
        }
        int reverted = 0;
        int remaining = n;
        while (remaining > reverted) {
            reverted = reverted * 10 + remaining % 10;
            remaining /= 10;
        }
        return remaining == reverted || remaining == reverted / 10;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(isPalindrome(n) ? "true" : "false");
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Palindrome Number
 * LeetCode: 9 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Digit manipulation, Half reversal
 *
 * <p>Problem:
 * Decide whether a non-negative integer reads the same forwards and backwards.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 121
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: reverse the digits one by one and stop as soon as the reversed prefix
 * catches up with the remaining suffix — at that point the two halves can be compared
 * directly. For an odd number of digits the middle digit belongs to neither half, so
 * the reversed half is divided by ten before the comparison.
 *
 * <p>Complexity: Time O(log n), Space O(1).
 */
public class Main {

    /**
     * Returns whether {@code n} is a palindrome.
     *
     * @param n the number to test
     * @return {@code true} when the digits read the same in both directions
     */
    public static boolean isPalindrome(int n) {
        if (n < 0 || (n % 10 == 0 && n != 0)) {
            return false;   // a negative number has a leading '-', a trailing zero has no partner
        }
        int reverted = 0;
        int remaining = n;
        while (remaining > reverted) {
            reverted = reverted * 10 + remaining % 10;
            remaining /= 10;
        }
        return remaining == reverted || remaining == reverted / 10;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(isPalindrome(n) ? "true" : "false");
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
# Palindrome Number — LeetCode 9

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Digit manipulation · Half reversal |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg |

## Problem Statement

Decide whether a non-negative integer reads the same forwards and backwards.

- \`121\` → \`true\`
- \`-121\` → \`false\` (the minus sign breaks the symmetry)
- \`10\` → \`false\` (the leading digit would have to be \`0\`)

## Input Format

The program reads from standard input:

\`\`\`
n
\`\`\`

- \`n\` — the number to test (0 ≤ n ≤ 2³¹ - 1)

## Sample Input

\`\`\`
121
\`\`\`

## Expected Output

\`\`\`
true
\`\`\`

## Approach — reverse only the second half

Fully reversing the number needs extra space when the digits are strings, and it
overflows for large numbers. Instead, reverse the digits **one by one** and stop as
soon as the reversed prefix catches up with the remaining suffix:

\`\`\`
reverted  = 0
remaining = n
while (remaining > reverted) {
    reverted  = reverted * 10 + remaining % 10
    remaining = remaining / 10
}
\`\`\`

After the loop the number has been split into a reversed first half (\`reverted\`) and a
remaining second half (\`remaining\`):

- even number of digits → the halves have the same length → \`remaining == reverted\`;
- odd number of digits → the middle digit sits in \`reverted\` → \`remaining == reverted / 10\`.

**Why this is correct:** for a palindrome the two halves are mirror images, so they are
equal (or equal after dropping the middle digit). For a non-palindrome the halves
differ — the loop stops at the first moment where the comparison is meaningful, so
the test is exact.

## Dry Run

Input: \`n = 121\`

| Step | \`remaining\` before | \`reverted\` before | \`remaining > reverted\`? | \`reverted\` after | \`remaining\` after |
|---:|---:|---:|---|---|---:|
| 1 | 121 | 0 | yes | \`0*10 + 1 = 1\` | 12 |
| 2 | 12 | 1 | yes | \`1*10 + 2 = 12\` | 1 |
| 3 | 1 | 12 | no (\`1 > 12\` is false) | 12 | 1 |

\`remaining = 1\`, \`reverted = 12\` → \`remaining == reverted / 10\` → \`1 == 1\` → **true**
(odd number of digits).

### Trace of an even-length palindrome — \`n = 1221\`

| Step | \`remaining\` before | \`reverted\` before | \`reverted\` after | \`remaining\` after |
|---:|---:|---:|---:|---:|
| 1 | 1221 | 0 | 1 | 122 |
| 2 | 122 | 1 | 12 | 12 |
| 3 | 12 | 12 | no (\`12 > 12\` is false) | 12 |

\`remaining == reverted\` → \`12 == 12\` → **true**.

### Trace of a non-palindrome — \`n = 123\`

| Step | \`remaining\` before | \`reverted\` before | \`reverted\` after | \`remaining\` after |
|---:|---:|---:|---:|---:|
| 1 | 123 | 0 | 3 | 12 |
| 2 | 12 | 3 | 31 | 1 |
| 3 | 1 | 31 | no | 1 |

\`remaining = 1\`, \`reverted = 31\` → \`1 == 31 / 10 = 3\`? no → **false**.

## Java Solution

See [\`PalindromeNumber.java\`](./PalindromeNumber.java).

\`\`\`java
public static boolean isPalindrome(int n) {
    if (n < 0 || (n % 10 == 0 && n != 0)) {
        return false;
    }
    int reverted = 0;
    int remaining = n;
    while (remaining > reverted) {
        reverted = reverted * 10 + remaining % 10;
        remaining = remaining / 10;
    }
    return remaining == reverted || remaining == reverted / 10;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(log n) | half of the digits are processed |
| **Space** | O(1) | two integers, no string conversion |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the number is given as a string?"* → a two-pointer scan from both ends.
- *"What if leading zeros are allowed (\`"010"\`)?"* → the problem changes: \`"010"\` is a
  palindrome as a string but not as a number.
- *"What about a palindrome with an even number of digits?"* → it must be divisible by
  11 — a nice follow-up to test understanding.

**Common mistakes:**
- ❌ Forgetting the trailing-zero special case — \`10\` reverses to \`01\`, which is not a
  palindrome.
- ❌ Comparing \`remaining == reverted\` only — odd-length numbers need the
  \`reverted / 10\` variant.
- ❌ Converting to a string and reversing it — it works but costs O(n) space and
  overflows for long numbers.

**How to narrate:**
> "I avoid strings and avoid a full reversal: I peel digits off the end of the number
> and build the reversed prefix, stopping as soon as the prefix catches up with the
> remaining suffix. Then the two halves are either equal, or equal after dropping the
> middle digit for odd-length numbers."

## Related Problems

- [Reverse Integer](./ReverseInteger.md) — the same digit loop, producing a number
- [Add Binary](./AddBinary.md) — digit-by-digit addition with a carry
`,i=[`isPalindrome`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};