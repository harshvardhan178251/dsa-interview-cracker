var e=`strings.IntegerToRoman`,t=`package com.dsa.strings;

import com.dsa.utils.FastScanner;

/**
 * Problem: Integer to Roman
 * LeetCode: 12 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Greedy, Lookup table
 *
 * <p>Problem: Convert an integer between 1 and 3999 into its Roman numeral
 * representation using the standard symbols {@code I, V, X, L, C, D, M}.
 *
 * <p>Input format (stdin):
 * <pre>
 * num
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 1994
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * MCMXCIV
 * </pre>
 *
 * <p>Approach: greedy. Walk a table of value/symbol pairs in descending order and
 * repeatedly append the largest symbol that still fits. The table contains the six
 * subtractive pairs ({@code CM, CD, XC, XL, IX, IV}) so that no special casing is
 * needed.
 *
 * <p>Complexity: Time O(n) in the number of output symbols, Space O(n).
 */
public class IntegerToRoman {

    private static final int[] VALUES = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
    private static final String[] SYMBOLS = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};

    /**
     * Converts an integer into its Roman numeral representation.
     *
     * @param num the value to convert (1 ≤ num ≤ 3999)
     * @return the Roman numeral, or {@code ""} for values below 1
     */
    public static String intToRoman(int num) {
        if (num <= 0) {
            return "";
        }

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < VALUES.length; i++) {
            while (num >= VALUES[i]) {
                sb.append(SYMBOLS[i]);
                num -= VALUES[i];
            }
        }
        return sb.toString();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int num = fs.nextInt();

        System.out.println(intToRoman(num));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Integer to Roman
 * LeetCode: 12 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Greedy, Lookup table
 *
 * <p>Problem: Convert an integer between 1 and 3999 into its Roman numeral
 * representation using the standard symbols {@code I, V, X, L, C, D, M}.
 *
 * <p>Input format (stdin):
 * <pre>
 * num
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 1994
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * MCMXCIV
 * </pre>
 *
 * <p>Approach: greedy. Walk a table of value/symbol pairs in descending order and
 * repeatedly append the largest symbol that still fits. The table contains the six
 * subtractive pairs ({@code CM, CD, XC, XL, IX, IV}) so that no special casing is
 * needed.
 *
 * <p>Complexity: Time O(n) in the number of output symbols, Space O(n).
 */
public class Main {

    private static final int[] VALUES = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
    private static final String[] SYMBOLS = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};

    /**
     * Converts an integer into its Roman numeral representation.
     *
     * @param num the value to convert (1 ≤ num ≤ 3999)
     * @return the Roman numeral, or {@code ""} for values below 1
     */
    public static String intToRoman(int num) {
        if (num <= 0) {
            return "";
        }

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < VALUES.length; i++) {
            while (num >= VALUES[i]) {
                sb.append(SYMBOLS[i]);
                num -= VALUES[i];
            }
        }
        return sb.toString();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int num = fs.nextInt();

        System.out.println(intToRoman(num));
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
`,r='\n# Integer to Roman — LeetCode 12\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Greedy · Lookup table |\n| **Interview heat** | ★★★☆☆ |\n| **Asked at** | Amazon, Meta, Google, Uber |\n\n## Problem Statement\n\nConvert an integer (1 ≤ num ≤ 3999) into its **Roman numeral** representation.\n\n| Symbol | Value | Symbol | Value |\n|---|---:|---|---:|\n| `I` | 1 | `X` | 10 |\n| `V` | 5 | `L` | 50 |\n| `C` | 100 | `D` | 500 |\n| `M` | 1000 | | |\n\nSix "subtractive" spellings exist and must be used instead of the naive form:\n`IV` (4), `IX` (9), `XL` (40), `XC` (90), `CD` (400), `CM` (900).\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nnum\n```\n\n- `num` — the integer to convert (1 ≤ num ≤ 3999), on its own line.\n\n## Sample Input\n\n```\n1994\n```\n\n## Expected Output\n\n```\nMCMXCIV\n```\n\n`1994 = 1000 + 900 + 90 + 4 = M + CM + XC + IV`.\n\n## Approach — Greedy with a descending table\n\nBuild a table of **value → symbol** pairs sorted by value descending, including the\nsix subtractive pairs:\n\n```\n1000 M    900 CM    500 D    400 CD    100 C    90 XC    50 L\n   40 XL     10 X      9 IX     5 V      4 IV     1 I\n```\n\nThen walk the table once. For every row, while the remaining value is at least the\nrow\'s value, append its symbol and subtract the value.\n\n**Why the subtractive pairs must be in the table:** without `CM`, the number 900 would\nbe spelled `DCCCC` instead of `CM`. Putting `900 CM` *before* `500 D` in the table\nmakes the greedy choice automatically correct.\n\n**Why greedy is optimal:** Roman numerals are canonical — each place value has exactly\none spelling. Taking the largest symbol that fits at each step reproduces that\ncanonical spelling, because the table contains every legal building block in\ndescending order.\n\n## Dry Run\n\nInput: `num = 1994`\n\n| Step | table value | symbol | `num` before | fits? | `num` after | output so far |\n|---:|---:|---|---:|---|---:|---|\n| 1 | 1000 | `M` | 1994 | ✓ | 994 | `M` |\n| 2 | 1000 | `M` | 994 | ✗ | 994 | `M` |\n| 3 | 900 | `CM` | 994 | ✓ | 94 | `MCM` |\n| 4 | 900 | `CM` | 94 | ✗ | 94 | `MCM` |\n| 5 | 500 | `D` | 94 | ✗ | 94 | `MCM` |\n| 6 | 400 | `CD` | 94 | ✗ | 94 | `MCM` |\n| 7 | 100 | `C` | 94 | ✗ | 94 | `MCM` |\n| 8 | 90 | `XC` | 94 | ✓ | 4 | `MCMXC` |\n| 9 | 90 | `XC` | 4 | ✗ | 4 | `MCMXC` |\n| 10 | 50 | `L` | 4 | ✗ | 4 | `MCMXC` |\n| 11 | 40 | `XL` | 4 | ✗ | 4 | `MCMXC` |\n| 12 | 10 | `X` | 4 | ✗ | 4 | `MCMXC` |\n| 13 | 9 | `IX` | 4 | ✗ | 4 | `MCMXC` |\n| 14 | 5 | `V` | 4 | ✗ | 4 | `MCMXC` |\n| 15 | 4 | `IV` | 4 | ✓ | 0 | `MCMXCIV` |\n| 16 | 4 | `IV` | 0 | ✗ | 0 | `MCMXCIV` |\n| 17 | 1 | `I` | 0 | ✗ | 0 | `MCMXCIV` |\n\nFinal answer: **`MCMXCIV`**\n\n## Java Solution\n\nSee [`IntegerToRoman.java`](./IntegerToRoman.java).\n\n```java\nprivate static final int[] VALUES = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};\nprivate static final String[] SYMBOLS = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};\n\npublic static String intToRoman(int num) {\n    if (num <= 0) {\n        return "";\n    }\n    StringBuilder sb = new StringBuilder();\n    for (int i = 0; i < VALUES.length; i++) {\n        while (num >= VALUES[i]) {\n            sb.append(SYMBOLS[i]);\n            num -= VALUES[i];\n        }\n    }\n    return sb.toString();\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(1 + k) | 13 table rows, plus one append per output symbol (k ≤ 15) |\n| **Space** | O(k) | The output string |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"What if the input can be larger than 3999?"* → repeat `M` as needed (4000 = `MMMM`);\n  Roman numerals have no standard form above 3999.\n- *"Convert it back."* → [Roman to Integer](../../../../../../docs/topics/02-strings.md), a single left-to-right scan.\n- *"How would you handle a non-canonical numeral such as `IIII`?"* → decide whether to\n  accept it; the canonical form is `IV`, and a strict parser can reject `IIII`.\n- *"Can you do it without a lookup table?"* → digit-by-digit with four small arrays\n  (ones, tens, hundreds, thousands).\n\n**Common mistakes:**\n- ❌ Leaving the subtractive pairs **out** of the table → `900` becomes `DCCCC`.\n- ❌ Putting `CM` **after** `D` in the table → greedy picks `D` first and produces\n  `DCCCC`.\n- ❌ Using `IIV` / `IIII` style output → the canonical spellings must be used.\n- ❌ Looping with `for` over the values instead of a `while` → `3000` must be `MMM`,\n  not `M`.\n\n**How to narrate:**\n> "Roman numerals are canonical, so I can be greedy. I keep a table of value/symbol\n> pairs in descending order, including the six subtractive pairs — that\'s the trick\n> that makes 900 come out as CM instead of DCCCC. Then I walk the table and, while\n> the value fits, I append the symbol and subtract. O(1) time for the table walk\n> plus the output length."\n\n## Related Problems\n\n- [Roman to Integer](../../../../../../docs/topics/02-strings.md) — the inverse mapping\n- [String to Integer (atoi)](../../../../../../docs/topics/02-strings.md) — parsing with overflow guards\n',i=[`intToRoman`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};