var e=`strings.ExcelSheetColumnTitle`,t=`package com.dsa.strings;

import com.dsa.utils.FastScanner;

/**
 * Problem: Excel Sheet Column Title
 * LeetCode: 168 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Base-26 conversion
 *
 * <p>Problem: Convert a positive integer into its Excel column title. Columns are
 * numbered from 1, and the letters are {@code A..Z} — so 1 is {@code "A"}, 26 is
 * {@code "Z"}, 27 is {@code "AA"}, 28 is {@code "AB"} and 703 is {@code "AAA"}.
 *
 * <p>Input format (stdin):
 * <pre>
 * columnNumber
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 28
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * AB
 * </pre>
 *
 * <p>Approach: this is base-26 with digits {@code 1..26} instead of {@code 0..25}.
 * Subtract one before every division so that the remainder lands on {@code 0..25}
 * and can be mapped onto {@code 'A'..'Z'}. The letters come out least-significant
 * first, so the result is reversed at the end.
 *
 * <p>Complexity: Time O(log26 n), Space O(log26 n).
 */
public class ExcelSheetColumnTitle {

    /**
     * Converts a column number into its Excel title.
     *
     * @param columnNumber the 1-based column number
     * @return the title, e.g. {@code "AB"} for 28
     */
    public static String convertToTitle(int columnNumber) {
        StringBuilder sb = new StringBuilder();
        while (columnNumber > 0) {
            columnNumber--; // shift the digit range from 1..26 to 0..25
            sb.append((char) ('A' + columnNumber % 26));
            columnNumber /= 26;
        }
        return sb.reverse().toString();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int columnNumber = fs.nextInt();

        System.out.println(convertToTitle(columnNumber));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Excel Sheet Column Title
 * LeetCode: 168 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Base-26 conversion
 *
 * <p>Problem: Convert a positive integer into its Excel column title. Columns are
 * numbered from 1, and the letters are {@code A..Z} — so 1 is {@code "A"}, 26 is
 * {@code "Z"}, 27 is {@code "AA"}, 28 is {@code "AB"} and 703 is {@code "AAA"}.
 *
 * <p>Input format (stdin):
 * <pre>
 * columnNumber
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 28
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * AB
 * </pre>
 *
 * <p>Approach: this is base-26 with digits {@code 1..26} instead of {@code 0..25}.
 * Subtract one before every division so that the remainder lands on {@code 0..25}
 * and can be mapped onto {@code 'A'..'Z'}. The letters come out least-significant
 * first, so the result is reversed at the end.
 *
 * <p>Complexity: Time O(log26 n), Space O(log26 n).
 */
public class Main {

    /**
     * Converts a column number into its Excel title.
     *
     * @param columnNumber the 1-based column number
     * @return the title, e.g. {@code "AB"} for 28
     */
    public static String convertToTitle(int columnNumber) {
        StringBuilder sb = new StringBuilder();
        while (columnNumber > 0) {
            columnNumber--; // shift the digit range from 1..26 to 0..25
            sb.append((char) ('A' + columnNumber % 26));
            columnNumber /= 26;
        }
        return sb.reverse().toString();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int columnNumber = fs.nextInt();

        System.out.println(convertToTitle(columnNumber));
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
`,r="\n# Excel Sheet Column Title — LeetCode 168\n\n| | |\n|---|---|\n| **Difficulty** | Easy |\n| **Pattern** | Base-26 conversion · Modular arithmetic |\n| **Interview heat** | ★★★☆☆ |\n| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg |\n\n## Problem Statement\n\nGiven a positive integer `columnNumber`, return the Excel column title that\ncorresponds to it.\n\n| Number | Title | Number | Title |\n|---:|---|---:|---|\n| 1 | `A` | 26 | `Z` |\n| 27 | `AA` | 28 | `AB` |\n| 703 | `AAA` | 18278 | `ZZZ` |\n\nColumns are numbered from **1**, not 0 — that is the only subtlety.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\ncolumnNumber\n```\n\n- `columnNumber` — the column number (1 ≤ columnNumber ≤ 2³¹ − 1), on its own line.\n\n## Sample Input\n\n```\n28\n```\n\n## Expected Output\n\n```\nAB\n```\n\n## Approach — Base 26 with digits 1..26\n\nExcel titles are base-26 numbers whose \"digits\" run from `1` to `26` (`A`..`Z`)\ninstead of `0` to `25`. That single difference changes the algorithm:\n\n```\nwhile n > 0:\n    n--                 // shift the digit range from 1..26 to 0..25\n    digit = n % 26      // the remainder now maps onto 'A'..'Z'\n    n = n / 26\n```\n\n**Why the decrement is essential:** without it, `26 % 26 == 0` would produce the\nletter `A` instead of `Z`, and `27` would come out as `BA` instead of `AA`. The\ndecrement turns the 1-based digit into a 0-based index exactly once per iteration.\n\n**Why the result is reversed:** the loop peels off the *least significant* letter\nfirst (`B` for 28, then `A`), so the letters are collected in reverse order. The\n`StringBuilder.reverse()` at the end fixes that.\n\n## Dry Run\n\nInput: `columnNumber = 28`\n\n| Step | `columnNumber` | after `columnNumber--` | `% 26` | letter | `columnNumber = n / 26` | `sb` |\n|---:|---:|---:|---:|---|---:|---|\n| 1 | 28 | 27 | 27 % 26 = **1** | `'B'` (1 + 'A') | 27 / 26 = 1 | `B` |\n| 2 | 1 | 0 | 0 % 26 = **0** | `'A'` (0 + 'A') | 0 / 26 = 0 | `BA` |\n\nThe loop ends because `columnNumber == 0`. Reversing `BA` gives **`AB`**.\n\n### Why the decrement matters — `columnNumber = 26`\n\n| Step | `columnNumber` | after `--` | `% 26` | letter | next `columnNumber` |\n|---:|---:|---:|---:|---|---:|\n| 1 | 26 | 25 | 25 % 26 = **25** | `'Z'` | 25 / 26 = 0 |\n\nWithout the decrement, 26 % 26 would be `0` → `'A'`, and the answer would be `A`\ninstead of `Z`.\n\n### Why the decrement matters — `columnNumber = 27`\n\n| Step | `columnNumber` | after `--` | `% 26` | letter | next `columnNumber` |\n|---:|---:|---:|---:|---|---:|\n| 1 | 27 | 26 | 26 % 26 = **0** | `'A'` | 26 / 26 = 1 |\n| 2 | 1 | 0 | 0 % 26 = **0** | `'A'` | 0 |\n\nReversed: **`AA`** ✓\n\n## Java Solution\n\nSee [`ExcelSheetColumnTitle.java`](./ExcelSheetColumnTitle.java).\n\n```java\npublic static String convertToTitle(int columnNumber) {\n    StringBuilder sb = new StringBuilder();\n    while (columnNumber > 0) {\n        columnNumber--;\n        sb.append((char) ('A' + columnNumber % 26));\n        columnNumber /= 26;\n    }\n    return sb.reverse().toString();\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(log₂₆ n) | One iteration per letter of the title |\n| **Space** | O(log₂₆ n) | The title itself (≤ 7 characters for a 32-bit integer) |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *\"Convert it back.\"* → [Excel Sheet Column Number](../../../../../../docs/topics/02-strings.md), a left-to-right fold.\n- *\"What if the numbering started at 0?\"* → then it is plain base-26 with digits\n  `0..25` and the decrement disappears.\n- *\"What if the input is out of range?\"* → decide the contract: return `\"\"`, throw, or\n  clamp. State it before coding.\n- *\"How many letters does a 32-bit number need at most?\"* → 7 (`A`..`Z` gives 26⁶ ≈\n  3·10⁸, and 26⁷ ≈ 8·10⁹ > 2³¹).\n\n**Common mistakes:**\n- ❌ **Forgetting the decrement** → `26` becomes `A` instead of `Z`, and every\n  multiple of 26 is wrong.\n- ❌ Decrementing **after** the modulo → the remainder is computed on the wrong value.\n- ❌ Forgetting to **reverse** the result → `28` comes out as `BA`.\n- ❌ Using `charAt` arithmetic on the string instead of building with a\n  `StringBuilder` → O(n²) string concatenation.\n\n**How to narrate:**\n> \"This is base 26, but the digits are 1 to 26 instead of 0 to 25. So I subtract one\n> before each modulo, which shifts the remainder into 0..25 and maps it onto A..Z.\n> The letters come out least-significant first, so I reverse the StringBuilder at the\n> end. O(log n) time.\"\n\n## Related Problems\n\n- [Excel Sheet Column Number](../../../../../../docs/topics/02-strings.md) — the inverse conversion\n- [String to Integer (atoi)](../../../../../../docs/topics/02-strings.md) — parsing with overflow guards\n",i=[`convertToTitle`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};