var e=`backtracking.LetterCombinationsOfAPhoneNumber`,t=`package com.dsa.backtracking;

import com.dsa.utils.FastScanner;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

/**
 * Problem: Letter Combinations of a Phone Number
 * LeetCode: 17 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Backtracking, DFS with a path
 *
 * <p>Problem: Return every combination of letters that the digits of a phone number can stand for.
 *
 * <p>Input format (stdin):
 * <pre>
 * digits
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 23
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * ad
 * ae
 * af
 * bd
 * be
 * bf
 * cd
 * ce
 * cf
 * </pre>
 *
 * <p>Approach: For every digit, try each of its letters and recurse -- the path is the combination that is built.
 *
 * <p>Complexity: Time O(4^n), Space O(n).
 */
public class LetterCombinationsOfAPhoneNumber {

    /** The letters of the telephone keypad, indexed by the digit. */
    private static final String[] KEYS = {
        "", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"
    };

    /**
     * Returns every letter combination the digits of a phone number stand for.
     *
     * <p>The digits are mapped to the letters of the classic telephone keypad. The search builds the
     * combination one digit at a time.
     *
     * @param digits the phone number
     * @return every combination, sorted lexicographically
     */
    public static List<String> letterCombinations(String digits) {
        List<String> result = new ArrayList<>();
        if (digits == null || digits.isEmpty()) {
            return result;
        }
        build(digits, 0, new StringBuilder(), result);
        result.sort(Comparator.naturalOrder());
        return result;
    }

    /**
     * Depth-first search over the digits.
     *
     * @param digits the phone number
     * @param index  the digit that is handled next
     * @param path   the combination built so far
     * @param result the collected combinations
     */
    private static void build(String digits, int index, StringBuilder path, List<String> result) {
        if (index == digits.length()) {
            result.add(path.toString()); // every digit was expanded
            return;
        }
        String letters = KEYS[digits.charAt(index) - '0'];
        for (int i = 0; i < letters.length(); i++) {
            path.append(letters.charAt(i));      // choose a letter
            build(digits, index + 1, path, result);
            path.deleteCharAt(path.length() - 1); // backtrack
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String digits = fs.next();

        StringBuilder out = new StringBuilder();
        for (String combination : letterCombinations(digits)) {
            out.append(combination).append('\\n');
        }
        System.out.print(out);
    }
}
`,n=`import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Letter Combinations of a Phone Number
 * LeetCode: 17 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Backtracking, DFS with a path
 *
 * <p>Problem: Return every combination of letters that the digits of a phone number can stand for.
 *
 * <p>Input format (stdin):
 * <pre>
 * digits
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 23
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * ad
 * ae
 * af
 * bd
 * be
 * bf
 * cd
 * ce
 * cf
 * </pre>
 *
 * <p>Approach: For every digit, try each of its letters and recurse -- the path is the combination that is built.
 *
 * <p>Complexity: Time O(4^n), Space O(n).
 */
public class Main {

    /** The letters of the telephone keypad, indexed by the digit. */
    private static final String[] KEYS = {
        "", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"
    };

    /**
     * Returns every letter combination the digits of a phone number stand for.
     *
     * <p>The digits are mapped to the letters of the classic telephone keypad. The search builds the
     * combination one digit at a time.
     *
     * @param digits the phone number
     * @return every combination, sorted lexicographically
     */
    public static List<String> letterCombinations(String digits) {
        List<String> result = new ArrayList<>();
        if (digits == null || digits.isEmpty()) {
            return result;
        }
        build(digits, 0, new StringBuilder(), result);
        result.sort(Comparator.naturalOrder());
        return result;
    }

    /**
     * Depth-first search over the digits.
     *
     * @param digits the phone number
     * @param index  the digit that is handled next
     * @param path   the combination built so far
     * @param result the collected combinations
     */
    private static void build(String digits, int index, StringBuilder path, List<String> result) {
        if (index == digits.length()) {
            result.add(path.toString()); // every digit was expanded
            return;
        }
        String letters = KEYS[digits.charAt(index) - '0'];
        for (int i = 0; i < letters.length(); i++) {
            path.append(letters.charAt(i));      // choose a letter
            build(digits, index + 1, path, result);
            path.deleteCharAt(path.length() - 1); // backtrack
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String digits = fs.next();

        StringBuilder out = new StringBuilder();
        for (String combination : letterCombinations(digits)) {
            out.append(combination).append('\\n');
        }
        System.out.print(out);
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
`,r='\n# Letter Combinations of a Phone Number — LeetCode 17\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Backtracking · DFS with a path |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Microsoft, Uber |\n\n## Problem Statement\n\nGiven the digits of a phone number, return **all** the letter combinations the number can stand for.\n\nThe classic keypad maps\n\n```\n2 -> abc   3 -> def   4 -> ghi   5 -> jkl\n6 -> mno   7 -> pqrs  8 -> tuv   9 -> wxyz\n```\n\n## Input Format\n\nThe program reads from standard input:\n\n```\ndigits\n```\n\n- `digits` — the phone number as a string of digits `2` to `9` (1 ≤ |digits| ≤ 9)\n\n## Sample Input\n\n```\n23\n```\n\n## Expected Output\n\n```\nad\nae\naf\nbd\nbe\nbf\ncd\nce\ncf\n```\n\nThe nine combinations of `2` and `3`, one per line.\n\n## Approach\n\nThe classic backtracking example: the path **is** the answer.\n\n1. Look at the digit at the current index and get its letters.\n2. For every letter: append it to the path, recurse into the next digit, and **remove it again**    (the backtrack).\n3. When every digit was expanded, the path is a complete combination — record it.\n\n**Why the backtrack is needed.** The path is shared by all the branches of the recursion. If the letter were not removed after the recursive call, the next branch would start with a polluted path and produce nonsense like `ad`, `aead`, `aeadf`.\n\n**The number of combinations** is the product of the number of letters of every digit: `3 × 4 = 12` for `23`… careful, `2` has three letters and `3` has three, so `23` gives `3 × 3 = 9` combinations.\n\n## Dry Run\n\nInput: `digits = "23"`.\n\n| path | digit | letters tried | new path |\n|---|---|---|---|\n| `""` | `2` | `a` | `"a"` |\n| `"a"` | `3` | `d` | `"ad"` → **record** |\n| `"a"` | `3` | `e` | `"ae"` → **record** |\n| `"a"` | `3` | `f` | `"af"` → **record** |\n| `""` | `2` | `b` | `"b"` |\n| `"b"` | `3` | `d` | `"bd"` → **record** |\n| `"b"` | `3` | `e` | `"be"` → **record** |\n| `"b"` | `3` | `f` | `"bf"` → **record** |\n| `""` | `2` | `c` | `"c"` |\n| `"c"` | `3` | `d` | `"cd"` → **record** |\n| `"c"` | `3` | `e` | `"ce"` → **record** |\n| `"c"` | `3` | `f` | `"cf"` → **record** |\n\nNine combinations were recorded.\n\n**The backtrack in the trace.** After `"ad"` was recorded, the `d` is removed again, so the path is `"a"` again when the next letter `e` is tried — that is the `deleteCharAt` call.\n\n**The result is already sorted.** The letters of every digit are tried in alphabetical order and the digits are handled from left to right, so the DFS produces the combinations in lexicographic order. The explicit sort only makes that independent of the implementation.\n\n**A corner case.** The digits `1` and `0` have no letters — the keypad table has an empty string for them, so they produce no combination at all.\n\n## Java Solution\n\nSee [`LetterCombinationsOfAPhoneNumber.java`](./LetterCombinationsOfAPhoneNumber.java).\n\n```java\n    public static List<String> letterCombinations(String digits) {\n        List<String> result = new ArrayList<>();\n        if (digits == null || digits.isEmpty()) {\n            return result;\n        }\n        build(digits, 0, new StringBuilder(), result);\n        result.sort(Comparator.naturalOrder());\n        return result;\n    }\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(4^n) | the number of combinations is the product of the letter counts, at most `4^n` |\n| **Space** | O(n) | the path and the recursion stack hold `n` characters |\n\n**Space `O(n)`** apart from the output, which holds up to `4^n` strings of `n` characters.\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n\n- "What if the number is very long?"* → the number of combinations explodes; usually only the count is asked for then.\n- "How do you handle the letters of a dictionary instead of digits?"* → the same search, but the letters of a position come from a map.\n- "Can you generate the combinations in a different order?"* → yes, the order of the result list is not part of the contract.\n- "How do you count them without building them?"* → multiply the number of letters of every digit.\n\n**Common mistakes:**\n\n- ❌ Forgetting to remove the letter after the recursive call — the path keeps growing.\n- ❌ Assuming the digits `1` and `0` have letters — they have none.\n- ❌ Using the letter index of the digit directly instead of the letter string of the digit.\n\n**How to narrate:**\n\n> "I map every digit to its letters and then run a depth-first search: for each digit I try every letter, recurse with the next digit and remove the letter again afterwards. The path is the combination, so when every digit was expanded I record it. The number of combinations is the product of the letter counts — nine for `23`."\n\n## Related Problems\n\n- [Word Search — LeetCode 79](./WordSearch.java) — the same skeleton on a grid\n- [Generate Parentheses — LeetCode 22](./GenerateParentheses.java) — the same skeleton with pruning\n',i=[`letterCombinations`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};