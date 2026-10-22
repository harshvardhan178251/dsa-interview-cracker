var e=`hashing.WordPattern`,t=`package com.dsa.hashing;

import com.dsa.utils.FastScanner;

import java.util.HashMap;
import java.util.Map;

/**
 * Problem: Word Pattern
 * LeetCode: 290 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Hashing, Bijective mapping
 *
 * <p>Problem: Given a pattern of letters and a list of words, decide whether every
 * letter of the pattern maps to exactly one word — and every word to exactly one
 * letter.
 *
 * <p>Input format (stdin):
 * <pre>
 * pattern
 * n
 * word[0] word[1] ... word[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * abba
 * 4
 * dog cat cat dog
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: two maps — one from letter to word and one from word to letter. Both
 * directions are needed: the first forbids one letter from standing for two words,
 * the second forbids two letters from standing for the same word.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class WordPattern {

    /**
     * Returns {@code true} when the words follow the pattern.
     *
     * @param pattern the pattern of letters
     * @param words   the words, one per letter of the pattern
     * @return {@code true} when the mapping is a bijection
     */
    public static boolean wordPattern(String pattern, String[] words) {
        if (pattern.length() != words.length) {
            return false;
        }

        Map<Character, String> letterToWord = new HashMap<>();
        Map<String, Character> wordToLetter = new HashMap<>();

        for (int i = 0; i < pattern.length(); i++) {
            char letter = pattern.charAt(i);
            String word = words[i];

            String mapped = letterToWord.get(letter);
            if (mapped == null) {
                // A fresh letter may not steal a word that another letter already uses.
                if (wordToLetter.containsKey(word)) {
                    return false;
                }
                letterToWord.put(letter, word);
                wordToLetter.put(word, letter);
            } else if (!mapped.equals(word)) {
                return false; // the same letter must always stand for the same word
            }
        }
        return true;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String pattern = fs.next();
        int n = fs.nextInt();
        String[] words = fs.nextStringArray(n);

        System.out.println(wordPattern(pattern, words));
    }
}
`,n=`import java.util.HashMap;
import java.util.Map;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Word Pattern
 * LeetCode: 290 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Hashing, Bijective mapping
 *
 * <p>Problem: Given a pattern of letters and a list of words, decide whether every
 * letter of the pattern maps to exactly one word — and every word to exactly one
 * letter.
 *
 * <p>Input format (stdin):
 * <pre>
 * pattern
 * n
 * word[0] word[1] ... word[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * abba
 * 4
 * dog cat cat dog
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: two maps — one from letter to word and one from word to letter. Both
 * directions are needed: the first forbids one letter from standing for two words,
 * the second forbids two letters from standing for the same word.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class Main {

    /**
     * Returns {@code true} when the words follow the pattern.
     *
     * @param pattern the pattern of letters
     * @param words   the words, one per letter of the pattern
     * @return {@code true} when the mapping is a bijection
     */
    public static boolean wordPattern(String pattern, String[] words) {
        if (pattern.length() != words.length) {
            return false;
        }

        Map<Character, String> letterToWord = new HashMap<>();
        Map<String, Character> wordToLetter = new HashMap<>();

        for (int i = 0; i < pattern.length(); i++) {
            char letter = pattern.charAt(i);
            String word = words[i];

            String mapped = letterToWord.get(letter);
            if (mapped == null) {
                // A fresh letter may not steal a word that another letter already uses.
                if (wordToLetter.containsKey(word)) {
                    return false;
                }
                letterToWord.put(letter, word);
                wordToLetter.put(word, letter);
            } else if (!mapped.equals(word)) {
                return false; // the same letter must always stand for the same word
            }
        }
        return true;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String pattern = fs.next();
        int n = fs.nextInt();
        String[] words = fs.nextStringArray(n);

        System.out.println(wordPattern(pattern, words));
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
`,r='\n# Word Pattern — LeetCode 290\n\n| | |\n|---|---|\n| **Difficulty** | Easy |\n| **Pattern** | Hashing · Bijective mapping |\n| **Interview heat** | ★★★☆☆ |\n| **Asked at** | Amazon, Meta, Google, Uber |\n\n## Problem Statement\n\nGiven a pattern of letters and a list of words, decide whether the words follow the\npattern.\n\n- Every letter stands for exactly one word, and every word is matched by exactly one\n  letter — the mapping is a **bijection**.\n- `"abba"` with `["dog", "cat", "cat", "dog"]` → `true`\n- `"abba"` with `["dog", "cat", "dog", "cat"]` → `false`\n\n## Input Format\n\nThe program reads from standard input:\n\n```\npattern\nn\nword[0] word[1] ... word[n-1]\n```\n\n- `pattern` — the pattern string (lowercase letters), on its own line.\n- `n` — the number of words.\n- The next line holds the `n` space-separated words.\n\n## Sample Input\n\n```\nabba\n4\ndog cat cat dog\n```\n\n## Expected Output\n\n```\ntrue\n```\n\n`a` stands for `dog`, `b` stands for `cat` — the pattern `abba` is followed exactly.\n\n## Approach — Two maps, one in each direction\n\nOne map is not enough. It has to enforce **both** halves of the rule:\n\n| Map | Enforces |\n|---|---|\n| `letterToWord` | one letter always stands for the same word |\n| `wordToLetter` | one word is never claimed by two different letters |\n\nFor every position `i` with letter `c` and word `w`:\n\n- If `c` is new → `w` must be unused as well, otherwise the pattern is broken. Map\n  both directions.\n- If `c` is already mapped → `w` must be exactly the word it was mapped to.\n\n**Why the backward map is necessary:** with only the forward map, the pattern `ab`\nwith the words `["dog", "dog"]` would be accepted — `a` → `dog`, `b` → `dog` — but\ntwo different letters standing for the same word is not a valid bijection.\n\n## Dry Run\n\nInput: `pattern = "abba"`, `words = [dog, cat, cat, dog]`\n\n| Step | i | letter | word | `letterToWord` before | `wordToLetter` before | action | maps after |\n|---:|---:|---|---|---|---|---|---|\n| 1 | 0 | `a` | `dog` | `{}` | `{}` | new letter, `dog` unused → map both | `{a: dog}`, `{dog: a}` |\n| 2 | 1 | `b` | `cat` | `{a: dog}` | `{dog: a}` | new letter, `cat` unused → map both | `{a: dog, b: cat}`, `{dog: a, cat: b}` |\n| 3 | 2 | `b` | `cat` | `{a: dog, b: cat}` | `{dog: a, cat: b}` | `b` is mapped to `cat` and the word is `cat` → ✔ | unchanged |\n| 4 | 3 | `a` | `dog` | `{a: dog, b: cat}` | `{dog: a, cat: b}` | `a` is mapped to `dog` and the word is `dog` → ✔ | unchanged |\n\nFinal answer: **true**\n\n### A rejection — the backward map catches it\n\nInput: `pattern = "ab"`, `words = [dog, dog]`\n\n| Step | i | letter | word | `letterToWord` before | `wordToLetter` before | action | maps after |\n|---:|---:|---|---|---|---|---|---|\n| 1 | 0 | `a` | `dog` | `{}` | `{}` | new letter, `dog` unused → map both | `{a: dog}`, `{dog: a}` |\n| 2 | 1 | `b` | `dog` | `{a: dog}` | `{dog: a}` | new letter, but `dog` is **already used** by `a` → **return false** | — |\n\n### A rejection — the forward map catches it\n\nInput: `pattern = "aa"`, `words = [dog, cat]`\n\n| Step | i | letter | word | `letterToWord` before | action | maps after |\n|---:|---:|---|---|---|---|---|\n| 1 | 0 | `a` | `dog` | `{}` | new letter → map both | `{a: dog}`, `{dog: a}` |\n| 2 | 1 | `a` | `cat` | `{a: dog}` | `a` is mapped to `dog`, but the word is `cat` → **return false** | — |\n\n## Java Solution\n\nSee [`WordPattern.java`](./WordPattern.java).\n\n```java\npublic static boolean wordPattern(String pattern, String[] words) {\n    if (pattern.length() != words.length) {\n        return false;\n    }\n    Map<Character, String> letterToWord = new HashMap<>();\n    Map<String, Character> wordToLetter = new HashMap<>();\n    for (int i = 0; i < pattern.length(); i++) {\n        char letter = pattern.charAt(i);\n        String word = words[i];\n        String mapped = letterToWord.get(letter);\n        if (mapped == null) {\n            if (wordToLetter.containsKey(word)) {\n                return false;\n            }\n            letterToWord.put(letter, word);\n            wordToLetter.put(word, letter);\n        } else if (!mapped.equals(word)) {\n            return false;\n        }\n    }\n    return true;\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n) | One map lookup and one insert per word (string hashing included) |\n| **Space** | O(n) | The two maps hold at most n entries |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"What if the pattern can contain digits too?"* → the letters and the digits are\n  just different characters; the code does not change.\n- *"Can you do it without the second map?"* → yes, but then you must detect the\n  "two letters, one word" case by counting the distinct words and comparing it with\n  the number of distinct letters.\n- *"What if the words can repeat but the pattern cannot?"* → then only the forward\n  map is needed.\n- *"How is this different from [Isomorphic Strings](../../../../../../docs/topics/09-hashing.md)?"* → exactly the same\n  idea, with characters instead of words.\n\n**Common mistakes:**\n- ❌ Using **only** the forward map → the "two letters, one word" case slips through.\n- ❌ Using **only** the backward map → the "one letter, two words" case slips through.\n- ❌ Forgetting the length check → the loop would read past the end of the shorter\n  array.\n- ❌ Comparing words with `==` instead of `equals` → reference comparison.\n\n**How to narrate:**\n> "The mapping has to be a bijection, so I need both directions: a map from letter\n> to word and a map from word to letter. When I meet a new letter, the word must not\n> already belong to another letter; when I meet a known letter, the word must be the\n> one it was mapped to. Two maps, one pass, O(n)."\n\n## Related Problems\n\n- [Isomorphic Strings](../../../../../../docs/topics/09-hashing.md) — the same bijection, character by character\n- [Valid Anagram](../../../../../../docs/topics/02-strings.md) — counting characters of two strings\n- [Group Anagrams](../../../../../../docs/topics/09-hashing.md) — grouping words by a canonical key\n',i=[`wordPattern`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};