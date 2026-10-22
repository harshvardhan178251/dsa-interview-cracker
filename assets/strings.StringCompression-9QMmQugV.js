var e=`strings.StringCompression`,t=`package com.dsa.strings;

import com.dsa.utils.FastScanner;

/**
 * Problem: String Compression
 * LeetCode: null | Difficulty: Easy | Frequency: 2/5
 * Pattern: Run-length encoding, Two pointers
 *
 * <p>Problem: Compress a string by replacing every run of equal consecutive
 * characters with the character followed by the number of times it occurs.
 *
 * <p>For example {@code "aabcccccaaa"} becomes {@code "a2b1c4a3"}.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * aabcccccaaa
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * a2b1c5a3
 * </pre>
 *
 * <p>Approach: walk the string once. A second index runs ahead while the characters
 * are equal; when the run ends, the character and the run length are appended.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class StringCompression {

    /**
     * Compresses the runs of equal characters in {@code s}.
     *
     * @param s the string to compress
     * @return the run-length encoded string
     */
    public static String compress(String s) {
        if (s.isEmpty()) {
            return "";
        }

        StringBuilder sb = new StringBuilder();
        int runLength = 1;

        // The loop runs one step past the end so that the final run is flushed too.
        for (int i = 1; i <= s.length(); i++) {
            if (i < s.length() && s.charAt(i) == s.charAt(i - 1)) {
                runLength++;
            } else {
                sb.append(s.charAt(i - 1)).append(runLength);
                runLength = 1;
            }
        }
        return sb.toString();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(compress(s));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: String Compression
 * LeetCode: null | Difficulty: Easy | Frequency: 2/5
 * Pattern: Run-length encoding, Two pointers
 *
 * <p>Problem: Compress a string by replacing every run of equal consecutive
 * characters with the character followed by the number of times it occurs.
 *
 * <p>For example {@code "aabcccccaaa"} becomes {@code "a2b1c4a3"}.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * aabcccccaaa
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * a2b1c5a3
 * </pre>
 *
 * <p>Approach: walk the string once. A second index runs ahead while the characters
 * are equal; when the run ends, the character and the run length are appended.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class Main {

    /**
     * Compresses the runs of equal characters in {@code s}.
     *
     * @param s the string to compress
     * @return the run-length encoded string
     */
    public static String compress(String s) {
        if (s.isEmpty()) {
            return "";
        }

        StringBuilder sb = new StringBuilder();
        int runLength = 1;

        // The loop runs one step past the end so that the final run is flushed too.
        for (int i = 1; i <= s.length(); i++) {
            if (i < s.length() && s.charAt(i) == s.charAt(i - 1)) {
                runLength++;
            } else {
                sb.append(s.charAt(i - 1)).append(runLength);
                runLength = 1;
            }
        }
        return sb.toString();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(compress(s));
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
`,r='\n# String Compression\n\n| | |\n|---|---|\n| **Difficulty** | Easy |\n| **Pattern** | Run-length encoding · Two Pointers |\n| **Interview heat** | ★★☆☆☆ |\n| **Asked at** | Amazon, Meta, Google, Uber, Apple |\n\n## Problem Statement\n\nCompress a string by replacing every run of equal consecutive characters with the\ncharacter itself followed by the number of times it occurs.\n\n- `"aabcccccaaa"` → `"a2b1c5a3"`\n- The count is **always written**, even when it is `1` (`"abc"` → `"a1b1c1"`), so the\n  encoding is unambiguous and can be decoded again.\n- The input contains no whitespace.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\ns\n```\n\n- `s` — the string to compress (1 ≤ |s| ≤ 10³), on a single line, no quotes.\n\n## Sample Input\n\n```\naabcccccaaa\n```\n\n## Expected Output\n\n```\na2b1c5a3\n```\n\nThe string holds five `a`s (two at the front, three at the end), one `b` and five\n`c`s — three runs, three pieces of output.\n\n## Approach — Two indices, one pass\n\nKeep the index of the current character and a counter for how many times it repeats:\n\n1. Start a run at position `i` with `runLength = 1`.\n2. While the next character is the same, extend the run.\n3. When the run ends, append the character and the length, then reset the counter.\n\n**The trick that avoids an off-by-one:** the loop runs one step **past** the end of\nthe string (`i <= s.length()`). Inside it, the run is flushed whenever the character\nchanges *or* the string has ended. That way the final run is written out without a\nspecial case after the loop.\n\n## Dry Run\n\nInput: `s = "aabcccccaaa"` (length 11)\n\n| index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |\n|---|---|---|---|---|---|---|---|---|---|---|---|\n| char | `a` | `a` | `b` | `c` | `c` | `c` | `c` | `c` | `a` | `a` | `a` |\n\n| Step | i | `s[i-1]` | `s[i]` | same? | `runLength` | append | output so far |\n|---:|---:|---|---|---|---:|---|---|\n| 1 | 1 | `a` | `a` | ✓ | 2 | — | *(empty)* |\n| 2 | 2 | `a` | `b` | ✗ | 2 | `a2` | `a2` |\n| 3 | 3 | `b` | `c` | ✗ | 1 | `b1` | `a2b1` |\n| 4 | 4 | `c` | `c` | ✓ | 2 | — | `a2b1` |\n| 5 | 5 | `c` | `c` | ✓ | 3 | — | `a2b1` |\n| 6 | 6 | `c` | `c` | ✓ | 4 | — | `a2b1` |\n| 7 | 7 | `c` | `c` | ✓ | 5 | — | `a2b1` |\n| 8 | 8 | `c` | `a` | ✗ | 5 | `c5` | `a2b1c5` |\n| 9 | 9 | `a` | `a` | ✓ | 2 | — | `a2b1c5` |\n| 10 | 10 | `a` | `a` | ✓ | 3 | — | `a2b1c5` |\n| 11 | 11 | `a` | *end of string* | — | 3 | `a3` | `a2b1c5a3` |\n\nFinal answer: **`a2b1c5a3`**\n\nThe runs are: `aa` (2), `b` (1), `ccccc` (5), `aaa` (3) — the last `a` run is a\n*separate* run from the first one, so the two `a` runs are never merged.\n\n## Java Solution\n\nSee [`StringCompression.java`](./StringCompression.java).\n\n```java\npublic static String compress(String s) {\n    if (s.isEmpty()) {\n        return "";\n    }\n    StringBuilder sb = new StringBuilder();\n    int runLength = 1;\n    for (int i = 1; i <= s.length(); i++) {\n        if (i < s.length() && s.charAt(i) == s.charAt(i - 1)) {\n            runLength++;\n        } else {\n            sb.append(s.charAt(i - 1)).append(runLength);\n            runLength = 1;\n        }\n    }\n    return sb.toString();\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n) | One pass over the string; each character is read a constant number of times |\n| **Space** | O(n) | The output buffer (at most 2n characters) |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"What if the compressed form is longer than the original?"* → return the original\n  (a classic variant of the problem).\n- *"What if a run count has to be written in words — `"one"`?"* → same algorithm, but\n  append a word instead of a digit.\n- *"Decompress it again."* → read a digit run after each character and repeat the\n  character that many times.\n- *"Do it in O(1) extra space?"* → you can overwrite the string in place, because the\n  compressed form is never longer than the original (when the count is written as a\n  single digit).\n\n**Common mistakes:**\n- ❌ Forgetting to flush the **last run** → the classic bug drops the final run\n  entirely (`"aab"` would come out as `"a2b"`).\n- ❌ Writing the count **before** the character → `"2a"` instead of `"a2"`.\n- ❌ Comparing `s.charAt(i)` with `s.charAt(i - 1)` **after** already advancing the\n  counter → the first character is never counted.\n- ❌ Using `append(runLength)` on a `char` → Java appends the *character code*, not\n  the number.\n\n**How to narrate:**\n> "This is run-length encoding. I keep an index and a counter; while the next\n> character is the same I extend the run, and when it changes I flush the character\n> and the count into a StringBuilder. I deliberately let the loop run one index past\n> the end of the string so the final run is flushed without a special case. One pass,\n> O(n) time."\n\n## Related Problems\n\n- [Reverse Words in a String](../../../../../../docs/topics/02-strings.md) — rebuilding a string from parts\n- [FrequencySort](../../../../../../docs/topics/09-hashing.md) — the same frequency counting, but used for ordering\n',i=[`compress`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};