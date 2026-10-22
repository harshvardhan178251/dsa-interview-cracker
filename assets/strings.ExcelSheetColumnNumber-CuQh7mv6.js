var e=`strings.ExcelSheetColumnNumber`,t=`package com.dsa.strings;

import com.dsa.utils.FastScanner;

/**
 * Problem: Excel Sheet Column Number
 * LeetCode: 171 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Base-26 conversion
 *
 * <p>Problem: Convert an Excel column title into its number. {@code "A"} is 1,
 * {@code "Z"} is 26, {@code "AA"} is 27, {@code "AB"} is 28.
 *
 * <p>Input format (stdin):
 * <pre>
 * columnTitle
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * AB
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 28
 * </pre>
 *
 * <p>Approach: treat the title as a base-26 number whose digits are {@code 1..26}
 * instead of {@code 0..25}. Fold the title left to right with
 * {@code result = result * 26 + digit}.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class ExcelSheetColumnNumber {

    /**
     * Converts an Excel column title into its column number.
     *
     * @param columnTitle the title, e.g. {@code "AB"}
     * @return the 1-based column number, e.g. 28
     */
    public static int titleToNumber(String columnTitle) {
        int result = 0;
        for (int i = 0; i < columnTitle.length(); i++) {
            result = result * 26 + (columnTitle.charAt(i) - 'A' + 1);
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String columnTitle = fs.next();

        System.out.println(titleToNumber(columnTitle));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Excel Sheet Column Number
 * LeetCode: 171 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Base-26 conversion
 *
 * <p>Problem: Convert an Excel column title into its number. {@code "A"} is 1,
 * {@code "Z"} is 26, {@code "AA"} is 27, {@code "AB"} is 28.
 *
 * <p>Input format (stdin):
 * <pre>
 * columnTitle
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * AB
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 28
 * </pre>
 *
 * <p>Approach: treat the title as a base-26 number whose digits are {@code 1..26}
 * instead of {@code 0..25}. Fold the title left to right with
 * {@code result = result * 26 + digit}.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Converts an Excel column title into its column number.
     *
     * @param columnTitle the title, e.g. {@code "AB"}
     * @return the 1-based column number, e.g. 28
     */
    public static int titleToNumber(String columnTitle) {
        int result = 0;
        for (int i = 0; i < columnTitle.length(); i++) {
            result = result * 26 + (columnTitle.charAt(i) - 'A' + 1);
        }
        return result;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String columnTitle = fs.next();

        System.out.println(titleToNumber(columnTitle));
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
# Excel Sheet Column Number — LeetCode 171

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Base-26 conversion · Running value |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg |

## Problem Statement

Given an Excel column title, return the corresponding column number.

| Title | Number | Title | Number |
|---|---:|---|---:|
| \`A\` | 1 | \`Z\` | 26 |
| \`AA\` | 27 | \`AB\` | 28 |
| \`AAA\` | 703 | \`ZZZ\` | 18278 |

The title is a base-26 number whose digits are \`1..26\` (\`A\`..\`Z\`).

## Input Format

The program reads from standard input:

\`\`\`
columnTitle
\`\`\`

- \`columnTitle\` — the title (1 ≤ length ≤ 7), on a single line, no quotes.

## Sample Input

\`\`\`
AB
\`\`\`

## Expected Output

\`\`\`
28
\`\`\`

## Approach — Fold left to right

A title is a positional number, so process the letters from left to right and shift
the accumulated value one base-26 place per letter:

\`\`\`
result = result * 26 + digit
\`\`\`

where \`digit = char - 'A' + 1\` (the \`+ 1\` is what makes the digits 1..26 instead of
0..25).

**Why the multiply comes first:** each new letter is worth 26 times more than the
previous one, so the running total has to be scaled before the digit is added.

## Dry Run

Input: \`columnTitle = "AB"\`

| Step | i | char | digit = char − 'A' + 1 | \`result = result * 26 + digit\` | \`result\` |
|---:|---:|---|---:|---|---:|
| 1 | 0 | \`A\` | 0 − 0 + 1 = **1** | \`0 * 26 + 1\` | 1 |
| 2 | 1 | \`B\` | 1 − 0 + 1 = **2** | \`1 * 26 + 2\` | **28** |

### The same fold for \`"AAA"\`

| Step | i | char | digit | \`result = result * 26 + digit\` | \`result\` |
|---:|---:|---|---:|---|---:|
| 1 | 0 | \`A\` | 1 | \`0 * 26 + 1\` | 1 |
| 2 | 1 | \`A\` | 1 | \`1 * 26 + 1\` | 27 |
| 3 | 2 | \`A\` | 1 | \`27 * 26 + 1\` | **703** |

### The digit table used in the trace

| Letter | \`A\` | \`B\` | \`C\` | … | \`Y\` | \`Z\` |
|---|---:|---:|---:|---|---:|---:|
| digit | 1 | 2 | 3 | … | 25 | 26 |

## Java Solution

See [\`ExcelSheetColumnNumber.java\`](./ExcelSheetColumnNumber.java).

\`\`\`java
public static int titleToNumber(String columnTitle) {
    int result = 0;
    for (int i = 0; i < columnTitle.length(); i++) {
        result = result * 26 + (columnTitle.charAt(i) - 'A' + 1);
    }
    return result;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One pass over the title (n ≤ 7) |
| **Space** | O(1) | Only the running value |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Convert it the other way."* → [Excel Sheet Column Title](../../../../../../docs/topics/02-strings.md).
- *"What if the title is invalid — lowercase, or a character outside \`A..Z\`?"* →
  validate the characters and throw or return a sentinel; decide the contract first.
- *"How would you convert to base 26 with digits \`0..25\`?"* → the same fold with
  \`digit = char - 'A'\`; the difference between the two numberings is exactly the
  \`+ 1\`.
- *"Can it overflow?"* → with a 7-letter title the maximum is 18278, so an \`int\` is
  plenty; for longer titles use \`long\`.

**Common mistakes:**
- ❌ Forgetting the **\`+ 1\`** → \`"A"\` becomes 0 and \`"AA"\` becomes 0 instead of 27.
- ❌ Multiplying **after** adding the digit → the place values are wrong.
- ❌ Iterating the string **backwards** (that is the *title* algorithm, not this one).
- ❌ Using \`char\` arithmetic without the cast → in Java \`char\` promotes to \`int\`
  automatically, but forgetting the \`- 'A'\` gives the raw ASCII code.

**How to narrate:**
> "An Excel title is a base-26 number with digits 1 to 26. So I fold the letters
> left to right: result = result * 26 + (letter - 'A' + 1). The + 1 is what makes
> it 1-based, exactly like the reverse problem needs a -1. O(n) time, O(1) space."

## Related Problems

- [Excel Sheet Column Title](../../../../../../docs/topics/02-strings.md) — the inverse conversion
- [String to Integer (atoi)](../../../../../../docs/topics/02-strings.md) — parsing with overflow guards
`,i=[`titleToNumber`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};