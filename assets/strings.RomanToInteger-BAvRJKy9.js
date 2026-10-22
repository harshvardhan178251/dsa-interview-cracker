var e=`strings.RomanToInteger`,t=`package com.dsa.strings;

import com.dsa.utils.FastScanner;

/**
 * Problem: Roman to Integer
 * LeetCode: 13 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Greedy, Left-to-right scan
 *
 * <p>Problem: Convert a Roman numeral into an integer. Roman numerals use the symbols
 * {@code I, V, X, L, C, D, M}; a symbol that is smaller than the symbol right after it
 * is subtracted, every other symbol is added.
 *
 * <p>Input format (stdin):
 * <pre>
 * roman
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * MCMXCIV
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1994
 * </pre>
 *
 * <p>Approach: one left-to-right scan. For every symbol compare its value with the
 * value of the next symbol: if it is smaller it is subtracted, otherwise it is added.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class RomanToInteger {

    /**
     * Converts a Roman numeral into its integer value.
     *
     * @param s the Roman numeral
     * @return the numeric value, or 0 for an empty string
     */
    public static int romanToInt(String s) {
        int total = 0;
        for (int i = 0; i < s.length(); i++) {
            int current = valueOf(s.charAt(i));
            int next = (i + 1 < s.length()) ? valueOf(s.charAt(i + 1)) : 0;
            if (current < next) {
                total -= current; // subtractive pair such as IV or XC
            } else {
                total += current;
            }
        }
        return total;
    }

    /** The value of a single Roman symbol. */
    private static int valueOf(char c) {
        switch (c) {
            case 'I':
                return 1;
            case 'V':
                return 5;
            case 'X':
                return 10;
            case 'L':
                return 50;
            case 'C':
                return 100;
            case 'D':
                return 500;
            case 'M':
                return 1000;
            default:
                return 0;
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String roman = fs.next();

        System.out.println(romanToInt(roman));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Roman to Integer
 * LeetCode: 13 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Greedy, Left-to-right scan
 *
 * <p>Problem: Convert a Roman numeral into an integer. Roman numerals use the symbols
 * {@code I, V, X, L, C, D, M}; a symbol that is smaller than the symbol right after it
 * is subtracted, every other symbol is added.
 *
 * <p>Input format (stdin):
 * <pre>
 * roman
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * MCMXCIV
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1994
 * </pre>
 *
 * <p>Approach: one left-to-right scan. For every symbol compare its value with the
 * value of the next symbol: if it is smaller it is subtracted, otherwise it is added.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Converts a Roman numeral into its integer value.
     *
     * @param s the Roman numeral
     * @return the numeric value, or 0 for an empty string
     */
    public static int romanToInt(String s) {
        int total = 0;
        for (int i = 0; i < s.length(); i++) {
            int current = valueOf(s.charAt(i));
            int next = (i + 1 < s.length()) ? valueOf(s.charAt(i + 1)) : 0;
            if (current < next) {
                total -= current; // subtractive pair such as IV or XC
            } else {
                total += current;
            }
        }
        return total;
    }

    /** The value of a single Roman symbol. */
    private static int valueOf(char c) {
        switch (c) {
            case 'I':
                return 1;
            case 'V':
                return 5;
            case 'X':
                return 10;
            case 'L':
                return 50;
            case 'C':
                return 100;
            case 'D':
                return 500;
            case 'M':
                return 1000;
            default:
                return 0;
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String roman = fs.next();

        System.out.println(romanToInt(roman));
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
# Roman to Integer — LeetCode 13

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Greedy · Left-to-right scan |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Meta, Google, Uber |

## Problem Statement

Given a Roman numeral, convert it to an **integer**.

- Symbol values: \`I\`=1, \`V\`=5, \`X\`=10, \`L\`=50, \`C\`=100, \`D\`=500, \`M\`=1000.
- If a symbol is **smaller** than the symbol immediately to its right, it is
  **subtracted**; otherwise it is **added**.
  - \`IV\` = 5 − 1 = 4, \`IX\` = 10 − 1 = 9, \`XL\` = 50 − 10 = 40, \`XC\` = 100 − 10 = 90,
    \`CD\` = 500 − 100 = 400, \`CM\` = 1000 − 100 = 900.

## Input Format

The program reads from standard input:

\`\`\`
roman
\`\`\`

- \`roman\` — the Roman numeral, on a single line, no quotes.

## Sample Input

\`\`\`
MCMXCIV
\`\`\`

## Expected Output

\`\`\`
1994
\`\`\`

## Approach — One scan, look ahead by one

Walk the string from left to right. At position \`i\` compare the value of \`s[i]\` with
the value of \`s[i+1]\`:

- \`value(s[i]) < value(s[i+1])\` → the symbol is part of a subtractive pair → **subtract**
- otherwise → **add**

The last symbol has no successor, so it is always added (think of the missing next
symbol as \`0\`).

**Why this works:** in a canonical Roman numeral a subtractive pair is always exactly
two symbols long, and the smaller symbol comes first. Comparing each symbol with its
immediate successor therefore identifies every subtractive symbol correctly, and
nothing else.

## Dry Run

Input: \`s = "MCMXCIV"\`

| Step | i | \`s[i]\` | value | \`s[i+1]\` | next value | rule | running total |
|---:|---:|---|---:|---|---:|---|---:|
| 1 | 0 | \`M\` | 1000 | \`C\` | 100 | 1000 ≥ 100 → add | 1000 |
| 2 | 1 | \`C\` | 100 | \`M\` | 1000 | 100 < 1000 → **subtract** | 900 |
| 3 | 2 | \`M\` | 1000 | \`X\` | 10 | 1000 ≥ 10 → add | 1900 |
| 4 | 3 | \`X\` | 10 | \`C\` | 100 | 10 < 100 → **subtract** | 1890 |
| 5 | 4 | \`C\` | 100 | \`I\` | 1 | 100 ≥ 1 → add | 1990 |
| 6 | 5 | \`I\` | 1 | \`V\` | 5 | 1 < 5 → **subtract** | 1989 |
| 7 | 6 | \`V\` | 5 | — | 0 | no successor → add | **1994** |

### Symbol table used in the trace

| Symbol | \`I\` | \`V\` | \`X\` | \`L\` | \`C\` | \`D\` | \`M\` |
|---|---:|---:|---:|---:|---:|---:|---:|
| value | 1 | 5 | 10 | 50 | 100 | 500 | 1000 |

## Java Solution

See [\`RomanToInteger.java\`](./RomanToInteger.java).

\`\`\`java
public static int romanToInt(String s) {
    int total = 0;
    for (int i = 0; i < s.length(); i++) {
        int current = valueOf(s.charAt(i));
        int next = (i + 1 < s.length()) ? valueOf(s.charAt(i + 1)) : 0;
        if (current < next) {
            total -= current;
        } else {
            total += current;
        }
    }
    return total;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One pass over the string |
| **Space** | O(1) | Only the running total and two look-ahead values |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Validate that the input is a legal Roman numeral?"* → check the allowed symbols and
  that the subtractive pairs are legal (\`IV\`, \`IX\`, \`XL\`, \`XC\`, \`CD\`, \`CM\`) and that
  no symbol repeats more than three times.
- *"Convert an integer back to Roman."* → [Integer to Roman](../../../../../../docs/topics/02-strings.md).
- *"Can you do it with a right-to-left scan?"* → yes: add the symbol, and if the
  previous symbol is smaller, subtract twice its value (the classic "left-to-right vs
  right-to-left" trick).
- *"How would you handle lower-case input?"* → normalise with \`toUpperCase()\` first.

**Common mistakes:**
- ❌ Subtracting the **larger** symbol instead of the smaller one → \`IV\` becomes 6.
- ❌ Looking at \`s[i-1]\` instead of \`s[i+1]\` → the decision is about what comes
  *after* the current symbol.
- ❌ Forgetting the last symbol has no successor → it must still be added.

**How to narrate:**
> "I do a single left-to-right pass. For each symbol I look at the next one: if the
> current symbol is smaller it must be part of a subtractive pair, so I subtract it,
> otherwise I add it. The last symbol is always added. That's O(n) time and O(1)
> space."

## Related Problems

- [Integer to Roman](../../../../../../docs/topics/02-strings.md) — the inverse mapping
- [Compare Version Numbers](../../../../../../docs/topics/02-strings.md) — the same "compare two dotted strings" shape
`,i=[`romanToInt`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};