var e=`strings.CountAndSay`,t=`package com.dsa.strings;

import com.dsa.utils.FastScanner;

/**
 * Problem: Count and Say
 * LeetCode: 38 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Run-length encoding, String building
 *
 * <p>Problem: The "look-and-say" sequence starts with {@code "1"}. Each following term
 * describes the previous one by listing the length of every run of equal digits,
 * followed by the digit itself.
 *
 * <pre>
 * 1 -&gt; 11 -&gt; 21 -&gt; 1211 -&gt; 111221 -&gt; ...
 * </pre>
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1211
 * </pre>
 *
 * <p>Approach: start from {@code "1"} and apply a "describe the runs" helper
 * {@code n - 1} times.
 *
 * <p>Complexity: Time O(total length of all generated terms), Space O(length of the
 * last term).
 */
public class CountAndSay {

    /**
     * Returns the {@code n}-th term of the look-and-say sequence.
     *
     * @param n the 1-based term number (n ≥ 1)
     * @return the term, e.g. {@code "1211"} for n = 4
     */
    public static String countAndSay(int n) {
        String current = "1";
        for (int step = 1; step < n; step++) {
            current = describe(current);
        }
        return current;
    }

    /**
     * Describes the runs of equal characters in {@code s}.
     *
     * <p>{@code "111221"} becomes {@code "312211"}: three {@code 1}s, two {@code 2}s,
     * one {@code 1}.
     */
    private static String describe(String s) {
        StringBuilder sb = new StringBuilder();
        int i = 0;
        while (i < s.length()) {
            int j = i;
            while (j < s.length() && s.charAt(j) == s.charAt(i)) {
                j++;
            }
            sb.append(j - i).append(s.charAt(i));
            i = j;
        }
        return sb.toString();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(countAndSay(n));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Count and Say
 * LeetCode: 38 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Run-length encoding, String building
 *
 * <p>Problem: The "look-and-say" sequence starts with {@code "1"}. Each following term
 * describes the previous one by listing the length of every run of equal digits,
 * followed by the digit itself.
 *
 * <pre>
 * 1 -&gt; 11 -&gt; 21 -&gt; 1211 -&gt; 111221 -&gt; ...
 * </pre>
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1211
 * </pre>
 *
 * <p>Approach: start from {@code "1"} and apply a "describe the runs" helper
 * {@code n - 1} times.
 *
 * <p>Complexity: Time O(total length of all generated terms), Space O(length of the
 * last term).
 */
public class Main {

    /**
     * Returns the {@code n}-th term of the look-and-say sequence.
     *
     * @param n the 1-based term number (n ≥ 1)
     * @return the term, e.g. {@code "1211"} for n = 4
     */
    public static String countAndSay(int n) {
        String current = "1";
        for (int step = 1; step < n; step++) {
            current = describe(current);
        }
        return current;
    }

    /**
     * Describes the runs of equal characters in {@code s}.
     *
     * <p>{@code "111221"} becomes {@code "312211"}: three {@code 1}s, two {@code 2}s,
     * one {@code 1}.
     */
    private static String describe(String s) {
        StringBuilder sb = new StringBuilder();
        int i = 0;
        while (i < s.length()) {
            int j = i;
            while (j < s.length() && s.charAt(j) == s.charAt(i)) {
                j++;
            }
            sb.append(j - i).append(s.charAt(i));
            i = j;
        }
        return sb.toString();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        System.out.println(countAndSay(n));
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
`,r='\n# Count and Say — LeetCode 38\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Run-length encoding · String building |\n| **Interview heat** | ★★★☆☆ |\n| **Asked at** | Amazon, Meta, Google, Uber, Adobe |\n\n## Problem Statement\n\nThe **look-and-say** sequence starts with `"1"`. Every following term describes the\nprevious one: read it left to right, and for every run of equal digits write **how\nmany** there are followed by **which** digit it is.\n\n```\n1 → 11 → 21 → 1211 → 111221 → 312211 → ...\n```\n\nReturn the `n`-th term (1-based).\n\n- Term 1 is `"1"`.\n- `"1211"` is read as *one 1, one 2, two 1s* → `"111221"`.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nn\n```\n\n- `n` — the 1-based term number (1 ≤ n ≤ 30), on its own line.\n\n## Sample Input\n\n```\n4\n```\n\n## Expected Output\n\n```\n1211\n```\n\n## Approach — One helper, applied `n - 1` times\n\nSplit the problem into two pieces:\n\n- `countAndSay(n)` — starts from `"1"` and applies the helper `n - 1` times.\n- `describe(s)` — walks `s` once, splits it into runs, and writes\n  `<run length><run character>` for each run.\n\nThe helper uses **two indices**: `i` is the start of the current run and `j` runs\nahead while the characters are equal. When `j` stops, the run is `s[i..j-1]`, so its\nlength is `j - i` and its character is `s.charAt(i)`.\n\n## Dry Run\n\nInput: `n = 4`\n\n| Step | term | runs in the term | next term |\n|---:|---|---|---|\n| 1 | `"1"` | one `1` | `"11"` |\n| 2 | `"11"` | two `1`s | `"21"` |\n| 3 | `"21"` | one `2`, one `1` | `"1211"` |\n| 4 | `"1211"` | one `1`, one `2`, two `1`s | `"111221"` |\n\nThe loop applies `describe` exactly `n - 1 = 3` times, so the value printed is the\nterm produced at **step 3**: **`1211`**.\n\n### Inside `describe("1211")`\n\n| Step | i | j | run | length | appended | output so far |\n|---:|---:|---:|---|---:|---|---|\n| 1 | 0 | 1 | `"1"` | 1 | `"11"` | `11` |\n| 2 | 1 | 2 | `"2"` | 1 | `"12"` | `1112` |\n| 3 | 2 | 4 | `"11"` | 2 | `"21"` | `111221` |\n\n### Inside `describe("21")`\n\n| Step | i | j | run | length | appended | output so far |\n|---:|---:|---:|---|---:|---|---|\n| 1 | 0 | 1 | `"2"` | 1 | `"12"` | `12` |\n| 2 | 1 | 2 | `"1"` | 1 | `"11"` | `1211` |\n\n## Java Solution\n\nSee [`CountAndSay.java`](./CountAndSay.java).\n\n```java\npublic static String countAndSay(int n) {\n    String current = "1";\n    for (int step = 1; step < n; step++) {\n        current = describe(current);\n    }\n    return current;\n}\n\nprivate static String describe(String s) {\n    StringBuilder sb = new StringBuilder();\n    int i = 0;\n    while (i < s.length()) {\n        int j = i;\n        while (j < s.length() && s.charAt(j) == s.charAt(i)) {\n            j++;\n        }\n        sb.append(j - i).append(s.charAt(i));\n        i = j;\n    }\n    return sb.toString();\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(L) | L is the total length of all generated terms — each term is scanned once |\n| **Space** | O(k) | k is the length of the longest term (only the current term is kept) |\n\nThe sequence grows by roughly 1.3× per term, so for n = 30 the last term has about\n5 000 characters.\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"What if the sequence started with a different seed — `"2"` or `"99"`?"* → the\n  helper does not change; only the seed does.\n- *"Generate the first n terms, not just the n-th."* → collect them in a list; the\n  total time is the same.\n- *"Can you do it without building intermediate strings?"* → you would have to\n  stream the output, but each term depends on the previous one, so the intermediate\n  term has to exist somewhere.\n- *"What is the time complexity precisely?"* → it is the sum of the term lengths, not\n  a simple O(n).\n\n**Common mistakes:**\n- ❌ Running the helper **n** times instead of `n - 1` → the answer is one term ahead.\n- ❌ Writing the character **before** the count → `"1"` instead of `"11"`.\n- ❌ Off-by-one in the run length → the run `s[i..j-1]` has length `j - i`, not\n  `j - i + 1`.\n- ❌ Using `String` concatenation instead of a `StringBuilder` → O(k²) instead of O(k).\n\n**How to narrate:**\n> "The sequence is generated, not computed, so I simulate it. I keep a helper that\n> takes a term and writes the runs: with two indices I find the end of each run of\n> equal characters and append its length and the character itself. I start from \'1\'\n> and call the helper n-1 times, so the total time is the sum of the term lengths."\n\n## Related Problems\n\n- [String Compression](../../../../../../docs/topics/02-strings.md) — the same run-length idea, without the sequence\n- [Longest Palindromic Substring](../../../../../../docs/topics/02-strings.md) — another character-level walk\n',i=[`countAndSay`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};