var e=`graphs.AlienDictionary`,t=`package com.dsa.graphs;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

/**
 * Problem: Alien Dictionary
 * LeetCode: 269 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Topological sort, precedence graph
 *
 * <p>Problem: We are given a list of {@code n} words and {@code n-1} ordering constraints.
 * A pair {@code (u, v)} means "word u must come before word v in the alien alphabet". The
 * dictionary is valid when
 * <ol>
 *   <li>the constraints are consistent — the precedence graph has no cycle, and</li>
 *   <li>every constrained pair is also lexically ordered: the first differing character of
 *       {@code words[u]} must be smaller than the first differing character of
 *       {@code words[v]} (a strict prefix must come first).</li>
 * </ol>
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * word1
 * word2
 * ...
 * wordn
 * u1 v1        (n-1 pairs: word u must come before word v)
 * ...
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * abc
 * bcd
 * cde
 * 0 1
 * 1 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: build the precedence graph from the pairs, then run Kahn's algorithm to detect a
 * cycle. The lexical rule is checked pair by pair.
 *
 * <p>Complexity: Time O(n + m + L) where L is the total number of characters, Space O(n + m).
 */
public class AlienDictionary {

    /**
     * Decides whether the given ordering constraints describe a valid alien dictionary.
     *
     * @param words the dictionary words
     * @param pairs pairs {@code {u, v}} meaning "word u comes before word v"
     * @return {@code true} when the dictionary is valid
     */
    public static boolean isValid(String[] words, int[][] pairs) {
        int n = words.length;
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        int[] inDegree = new int[n];

        for (int[] pair : pairs) {
            int u = pair[0];
            int v = pair[1];
            if (!lexicallyOrdered(words[u], words[v])) {
                return false; // the characters contradict the requested order
            }
            adj.get(u).add(v);
            inDegree[v]++;
        }

        Deque<Integer> queue = new ArrayDeque<>();
        for (int v = 0; v < n; v++) {
            if (inDegree[v] == 0) {
                queue.add(v);
            }
        }
        int placed = 0;
        while (!queue.isEmpty()) {
            int u = queue.poll();
            placed++;
            for (int v : adj.get(u)) {
                if (--inDegree[v] == 0) {
                    queue.add(v);
                }
            }
        }
        return placed == n;
    }

    /**
     * True when {@code a} can legally precede {@code b}: the first differing character of
     * {@code a} is smaller, or {@code a} is a (possibly equal) prefix of {@code b}.
     */
    private static boolean lexicallyOrdered(String a, String b) {
        int common = Math.min(a.length(), b.length());
        for (int i = 0; i < common; i++) {
            if (a.charAt(i) != b.charAt(i)) {
                return a.charAt(i) < b.charAt(i);
            }
        }
        // No differing character: the shorter word has to come first.
        return a.length() <= b.length();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        String[] words = new String[n];
        for (int i = 0; i < n; i++) {
            words[i] = fs.next();
        }

        int[][] pairs = new int[Math.max(0, n - 1)][2];
        for (int i = 0; i < pairs.length; i++) {
            pairs[i][0] = fs.nextInt();
            pairs[i][1] = fs.nextInt();
        }

        System.out.println(isValid(words, pairs));
    }
}
`,n=`import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Alien Dictionary
 * LeetCode: 269 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Topological sort, precedence graph
 *
 * <p>Problem: We are given a list of {@code n} words and {@code n-1} ordering constraints.
 * A pair {@code (u, v)} means "word u must come before word v in the alien alphabet". The
 * dictionary is valid when
 * <ol>
 *   <li>the constraints are consistent — the precedence graph has no cycle, and</li>
 *   <li>every constrained pair is also lexically ordered: the first differing character of
 *       {@code words[u]} must be smaller than the first differing character of
 *       {@code words[v]} (a strict prefix must come first).</li>
 * </ol>
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * word1
 * word2
 * ...
 * wordn
 * u1 v1        (n-1 pairs: word u must come before word v)
 * ...
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * abc
 * bcd
 * cde
 * 0 1
 * 1 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: build the precedence graph from the pairs, then run Kahn's algorithm to detect a
 * cycle. The lexical rule is checked pair by pair.
 *
 * <p>Complexity: Time O(n + m + L) where L is the total number of characters, Space O(n + m).
 */
public class Main {

    /**
     * Decides whether the given ordering constraints describe a valid alien dictionary.
     *
     * @param words the dictionary words
     * @param pairs pairs {@code {u, v}} meaning "word u comes before word v"
     * @return {@code true} when the dictionary is valid
     */
    public static boolean isValid(String[] words, int[][] pairs) {
        int n = words.length;
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        int[] inDegree = new int[n];

        for (int[] pair : pairs) {
            int u = pair[0];
            int v = pair[1];
            if (!lexicallyOrdered(words[u], words[v])) {
                return false; // the characters contradict the requested order
            }
            adj.get(u).add(v);
            inDegree[v]++;
        }

        Deque<Integer> queue = new ArrayDeque<>();
        for (int v = 0; v < n; v++) {
            if (inDegree[v] == 0) {
                queue.add(v);
            }
        }
        int placed = 0;
        while (!queue.isEmpty()) {
            int u = queue.poll();
            placed++;
            for (int v : adj.get(u)) {
                if (--inDegree[v] == 0) {
                    queue.add(v);
                }
            }
        }
        return placed == n;
    }

    /**
     * True when {@code a} can legally precede {@code b}: the first differing character of
     * {@code a} is smaller, or {@code a} is a (possibly equal) prefix of {@code b}.
     */
    private static boolean lexicallyOrdered(String a, String b) {
        int common = Math.min(a.length(), b.length());
        for (int i = 0; i < common; i++) {
            if (a.charAt(i) != b.charAt(i)) {
                return a.charAt(i) < b.charAt(i);
            }
        }
        // No differing character: the shorter word has to come first.
        return a.length() <= b.length();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        String[] words = new String[n];
        for (int i = 0; i < n; i++) {
            words[i] = fs.next();
        }

        int[][] pairs = new int[Math.max(0, n - 1)][2];
        for (int i = 0; i < pairs.length; i++) {
            pairs[i][0] = fs.nextInt();
            pairs[i][1] = fs.nextInt();
        }

        System.out.println(isValid(words, pairs));
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
`,r='\n# Alien Dictionary — LeetCode 269\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Topological sort · Precedence graph |\n| **Interview heat** | ★★★☆☆ |\n| **Asked at** | Amazon, Google, Meta, Uber, Airbnb |\n\n## Problem Statement\n\nAn alien language has its own alphabet. We are given `n` dictionary words and `n-1` ordering\nconstraints: a pair `(u, v)` means *"word `u` comes before word `v` in the alien alphabet"*.\n\nThe dictionary is **valid** when both of the following hold:\n\n1. **The constraints are consistent.** No word is required to come before itself (directly or\n   through other words) — the precedence graph must be acyclic.\n2. **The constraints agree with the letters.** For every constrained pair, the first character\n   where the two words differ must be *smaller* in `words[u]` than in `words[v]`. If one word is\n   a strict prefix of the other, the shorter word has to come first.\n\n## Input Format\n\n```\nn\nword1\nword2\n...\nwordn\nu1 v1\nu2 v2\n...\nu(n-1) v(n-1)\n```\n\n- `n` — number of words (`1 ≤ n ≤ 100`)\n- `n` words, one per line (lowercase letters)\n- `n-1` pairs `u v`: the word with index `u` must come before the word with index `v`\n\n## Sample Input\n\n```\n3\nabc\nbcd\ncde\n0 1\n1 2\n```\n\n## Expected Output\n\n```\ntrue\n```\n\n`abc` vs `bcd` differ first at index 0 (`a` < `b`), `bcd` vs `cde` differ first at index 0\n(`b` < `c`), and the constraint chain `0 → 1 → 2` has no cycle.\n\n## Approach — build the precedence graph, then sort it\n\n1. For each constraint `(u, v)`:\n   - compare `words[u]` and `words[v]` character by character;\n     - the first differing characters must satisfy `words[u][i] < words[v][i]`;\n     - if there is no differing character, the shorter word must be the first one;\n   - add the edge `u → v` to a precedence graph and bump `inDegree[v]`.\n2. Run **Kahn\'s algorithm** on that graph. If not all `n` words can be ordered, the constraints\n   contain a cycle → invalid.\n\nThe letter check (step 1) is what makes the problem more than a cycle check: the constraints\ncould be perfectly acyclic and still contradict the actual letters.\n\n## Dry Run\n\nWords: `abc`, `bcd`, `cde`\n\n| Step | Pair | Words | First differing index | Letters | Ordered? | Edge | In-degree after |\n|---:|---|---|---:|---|---|---|---|\n| 1 | `(0,1)` | `abc` / `bcd` | 0 | `a` / `b` | ✔ `a` < `b` | `0 → 1` | `[0, 1, 0]` |\n| 2 | `(1,2)` | `bcd` / `cde` | 0 | `b` / `c` | ✔ `b` < `c` | `1 → 2` | `[0, 1, 1]` |\n\nTopological sort:\n\n| Step | Dequeue | Placed | Edges relaxed | In-degree after | Queue after |\n|---:|---|---:|---|---|---|\n| 0 | — | 0 | — | `[0, 1, 1]` | `[0]` |\n| 1 | `0` | 1 | `0→1`: 1→0 | `[0, 0, 1]` | `[1]` |\n| 2 | `1` | 2 | `1→2`: 1→0 | `[0, 0, 0]` | `[2]` |\n| 3 | `2` | 3 | — | `[0, 0, 0]` | `[]` |\n\nAll 3 words were placed → **`true`**.\n\n### A dictionary that is *not* valid\n\nSame words, but the constraint is `bcd → abd` (pair `1 2`):\n\n| Step | Pair | Words | First differing index | Letters | Ordered? |\n|---:|---|---|---:|---|---|\n| 1 | `(0,1)` | `abc` / `bcd` | 0 | `a` / `b` | ✔ |\n| 2 | `(1,2)` | `bcd` / `abd` | 0 | `b` / `a` | ✘ `b` > `a` |\n\n→ **`false`** immediately, without even running the topological sort.\n\n## Java Solution\n\nSee [`AlienDictionary.java`](./AlienDictionary.java).\n\n```java\npublic static boolean isValid(String[] words, int[][] pairs) {\n    for (int[] pair : pairs) {\n        if (!lexicallyOrdered(words[pair[0]], words[pair[1]])) {\n            return false;\n        }\n        adj.get(pair[0]).add(pair[1]);\n        inDegree[pair[1]]++;\n    }\n    // ... Kahn\'s algorithm; valid iff every word was placed ...\n}\n\nprivate static boolean lexicallyOrdered(String a, String b) {\n    int common = Math.min(a.length(), b.length());\n    for (int i = 0; i < common; i++) {\n        if (a.charAt(i) != b.charAt(i)) {\n            return a.charAt(i) < b.charAt(i);\n        }\n    }\n    return a.length() <= b.length();\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n + m + L) | `m = n-1` comparisons, each up to `L` characters; the topological sort is O(n + m) |\n| **Space** | O(n + m) | Adjacency list and in-degrees |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"Can you recover the alien alphabet itself?"* → run the topological sort and record, for every\n  edge `u → v`, the first differing characters; that gives the order relations between letters.\n  Letters that never appear in a comparison can be placed anywhere.\n- *"What if the constraints are given as a list of word pairs instead of `n-1` pairs?"* → build\n  the edge set from every pair, deduplicate it, and run the same algorithm.\n- *"What if two words are identical?"* → identical words impose no letter constraint, but they\n  are fine; only a *strict* prefix in the wrong order is a contradiction.\n- *"How would you detect the contradiction without the letter check?"* → the cycle check alone\n  (that is what a pure topological sort would do).\n\n**Common mistakes:**\n- ❌ Comparing the whole words with `compareTo` instead of comparing the **first differing\n  characters** — `"ab"` vs `"ac"` is fine, but `"ab"` vs `"ba"` is not, and only the first\n  difference matters.\n- ❌ Forgetting the prefix rule — `"ab"` must come before `"abc"`; if the constraint says\n  otherwise the dictionary is invalid.\n- ❌ Treating the constraint pairs as the *order of the word list* — they are independent\n  precedence relations.\n\n**How to narrate:**\n> "An alien dictionary is a precedence problem. I turn every \'u before v\' pair into a directed\n> edge, but first I check the letters: the first position where the two words differ has to be\n> smaller in the first word, and a strict prefix has to come first. Then I run Kahn\'s algorithm\n> on the precedence graph — if I can place all the words the constraints are consistent and the\n> dictionary is valid."\n\n## Related Problems\n\n- [Course Schedule](./CourseSchedule.java) — pure cycle detection\n- [Topological Sort](./TopologicalSort.java) — the general ordering problem\n- [Word Ladder](./WordLadder.java) — BFS over strings, the other classic string-graph problem\n- [Reconstruct Itinerary](./ReconstructItinerary.java) — precedence plus a greedy ordering rule\n',i=[`isValid`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};