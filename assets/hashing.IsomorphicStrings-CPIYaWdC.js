var e=`hashing.IsomorphicStrings`,t=`package com.dsa.hashing;

import com.dsa.utils.FastScanner;

import java.util.HashMap;
import java.util.Map;

/**
 * Problem: Isomorphic Strings
 * LeetCode: 205 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Hashing, Bijective mapping
 *
 * <p>Problem: Two strings are isomorphic when every character of the first string
 * maps to exactly one character of the second string, and no two different
 * characters map to the same character.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * t
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * egg
 * add
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: two maps — one in each direction. The forward map stops one character
 * from mapping to two different characters, and the backward map stops two different
 * characters from mapping to the same character.
 *
 * <p>Complexity: Time O(n), Space O(k) where k is the number of distinct characters.
 */
public class IsomorphicStrings {

    /**
     * Returns {@code true} when {@code s} and {@code t} are isomorphic.
     *
     * @param s the first string
     * @param t the second string
     * @return {@code true} when the characters correspond one to one
     */
    public static boolean isIsomorphic(String s, String t) {
        if (s.length() != t.length()) {
            return false;
        }

        Map<Character, Character> forward = new HashMap<>();
        Map<Character, Character> backward = new HashMap<>();

        for (int i = 0; i < s.length(); i++) {
            char from = s.charAt(i);
            char to = t.charAt(i);

            Character mapped = forward.get(from);
            if (mapped == null) {
                if (backward.containsKey(to)) {
                    return false; // another character already maps to \`to\`
                }
                forward.put(from, to);
                backward.put(to, from);
            } else if (mapped != to) {
                return false; // \`from\` already maps to a different character
            }
        }
        return true;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();
        String t = fs.next();

        System.out.println(isIsomorphic(s, t));
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
 * Problem: Isomorphic Strings
 * LeetCode: 205 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Hashing, Bijective mapping
 *
 * <p>Problem: Two strings are isomorphic when every character of the first string
 * maps to exactly one character of the second string, and no two different
 * characters map to the same character.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * t
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * egg
 * add
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: two maps — one in each direction. The forward map stops one character
 * from mapping to two different characters, and the backward map stops two different
 * characters from mapping to the same character.
 *
 * <p>Complexity: Time O(n), Space O(k) where k is the number of distinct characters.
 */
public class Main {

    /**
     * Returns {@code true} when {@code s} and {@code t} are isomorphic.
     *
     * @param s the first string
     * @param t the second string
     * @return {@code true} when the characters correspond one to one
     */
    public static boolean isIsomorphic(String s, String t) {
        if (s.length() != t.length()) {
            return false;
        }

        Map<Character, Character> forward = new HashMap<>();
        Map<Character, Character> backward = new HashMap<>();

        for (int i = 0; i < s.length(); i++) {
            char from = s.charAt(i);
            char to = t.charAt(i);

            Character mapped = forward.get(from);
            if (mapped == null) {
                if (backward.containsKey(to)) {
                    return false; // another character already maps to \`to\`
                }
                forward.put(from, to);
                backward.put(to, from);
            } else if (mapped != to) {
                return false; // \`from\` already maps to a different character
            }
        }
        return true;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();
        String t = fs.next();

        System.out.println(isIsomorphic(s, t));
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
`,r='\n# Isomorphic Strings — LeetCode 205\n\n| | |\n|---|---|\n| **Difficulty** | Easy |\n| **Pattern** | Hashing · Bijective mapping |\n| **Interview heat** | ★★★☆☆ |\n| **Asked at** | Amazon, Meta, Google, Uber |\n\n## Problem Statement\n\nTwo strings `s` and `t` are **isomorphic** when there is a one-to-one correspondence\nbetween their characters:\n\n- every character of `s` maps to exactly one character of `t`, and\n- no two different characters of `s` map to the same character of `t`.\n\n`"egg"` and `"add"` are isomorphic (`e → a`, `g → d`); `"badc"` and `"baba"` are not\n(`d` and `a` would both have to map to `b`).\n\n## Input Format\n\nThe program reads from standard input:\n\n```\ns\nt\n```\n\n- `s` — the first string, on its own line, no quotes.\n- `t` — the second string, on its own line, no quotes.\n\n## Sample Input\n\n```\negg\nadd\n```\n\n## Expected Output\n\n```\ntrue\n```\n\n## Approach — Two maps, one in each direction\n\nThe one-to-one rule has two halves, so two maps are needed:\n\n| Map | Enforces |\n|---|---|\n| `forward` | a character of `s` always maps to the same character of `t` |\n| `backward` | two different characters of `s` never map to the same character of `t` |\n\nFor every position `i`:\n\n- If `s[i]` is new, `t[i]` must be new as well — otherwise two characters would\n  share the same image. Map both directions.\n- If `s[i]` is already mapped, `t[i]` must be exactly its image.\n\n**Why the backward map is necessary:** with only the forward map, `"ab"` and `"aa"`\nwould be accepted, because `a → a` and `b → a` never contradict the forward\nconstraint.\n\n## Dry Run\n\nInput: `s = "egg"`, `t = "add"`\n\n| Step | i | `s[i]` | `t[i]` | `forward` before | `backward` before | action | maps after |\n|---:|---:|---|---|---|---|---|---|\n| 1 | 0 | `e` | `a` | `{}` | `{}` | `e` is new, `a` is unused → map both | `{e: a}`, `{a: e}` |\n| 2 | 1 | `g` | `d` | `{e: a}` | `{a: e}` | `g` is new, `d` is unused → map both | `{e: a, g: d}`, `{a: e, d: g}` |\n| 3 | 2 | `g` | `d` | `{e: a, g: d}` | `{a: e, d: g}` | `g` is mapped to `d` and `t[2] = d` → ✔ | unchanged |\n\nFinal answer: **true**\n\n### A rejection caught by the forward map — `"ab"` vs `"aa"`\n\n| Step | i | `s[i]` | `t[i]` | `forward` before | action | maps after |\n|---:|---:|---|---|---|---|---|\n| 1 | 0 | `a` | `a` | `{}` | new → map both | `{a: a}`, `{a: a}` |\n| 2 | 1 | `b` | `a` | `{a: a}` | `b` is new, but `a` is **already used** by `a` → **return false** | — |\n\n### A rejection caught by the forward map — `"aa"` vs `"ab"`\n\n| Step | i | `s[i]` | `t[i]` | `forward` before | action | maps after |\n|---:|---:|---|---|---|---|---|\n| 1 | 0 | `a` | `a` | `{}` | new → map both | `{a: a}`, `{a: a}` |\n| 2 | 1 | `a` | `b` | `{a: a}` | `a` is mapped to `a`, but `t[1] = b` → **return false** | — |\n\n### The lengths must match first\n\n| input | result |\n|---|---|\n| `"ab"` vs `"abc"` | false — different lengths, checked before the loop |\n| `"ab"` vs `"ba"` | true — the mapping is `a → b`, `b → a` |\n\n## Java Solution\n\nSee [`IsomorphicStrings.java`](./IsomorphicStrings.java).\n\n```java\npublic static boolean isIsomorphic(String s, String t) {\n    if (s.length() != t.length()) {\n        return false;\n    }\n    Map<Character, Character> forward = new HashMap<>();\n    Map<Character, Character> backward = new HashMap<>();\n    for (int i = 0; i < s.length(); i++) {\n        char from = s.charAt(i);\n        char to = t.charAt(i);\n        Character mapped = forward.get(from);\n        if (mapped == null) {\n            if (backward.containsKey(to)) {\n                return false;\n            }\n            forward.put(from, to);\n            backward.put(to, from);\n        } else if (mapped != to) {\n            return false;\n        }\n    }\n    return true;\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n) | One lookup per character in each map |\n| **Space** | O(k) | The maps hold one entry per distinct character (k ≤ 26 for lowercase English) |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"What if the mapping does not have to be one-to-one?"* → drop the backward map;\n  that is the "is `s` a transformation of `t`" variant.\n- *"Can you do it without maps?"* → yes: count the characters of both strings and\n  compare the multisets of frequencies. Two strings are isomorphic exactly when\n  their character-frequency multisets are equal.\n- *"What about three strings?"* → keep one map per direction per pair.\n- *"How does this relate to [Word Pattern](../../../../../../docs/topics/09-hashing.md)?"* → identical idea with words.\n\n**Common mistakes:**\n- ❌ Using **only** the forward map → `"ab"` vs `"aa"` is wrongly accepted.\n- ❌ Using **only** the backward map → `"aa"` vs `"ab"` is wrongly accepted.\n- ❌ Comparing the characters with `==` on boxed `Character` objects → reference\n  comparison; Java unboxes automatically here, but `equals` is clearer.\n- ❌ Forgetting the length check → the loop reads past the end of the shorter string.\n\n**How to narrate:**\n> "Isomorphism means a one-to-one mapping, so I keep two maps: one from the first\n> string to the second and one back. A new character in the first string must map to\n> a character that is not used yet, and a known character must always map to the\n> same one. Two maps, one pass, O(n) time."\n\n## Related Problems\n\n- [Word Pattern](../../../../../../docs/topics/09-hashing.md) — the same bijection with words\n- [Valid Anagram](../../../../../../docs/topics/02-strings.md) — counting characters of two strings\n- [Group Anagrams](../../../../../../docs/topics/09-hashing.md) — grouping words by a canonical key\n',i=[`isIsomorphic`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};