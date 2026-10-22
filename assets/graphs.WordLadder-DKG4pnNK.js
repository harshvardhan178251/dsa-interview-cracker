var e=`graphs.WordLadder`,t=`package com.dsa.graphs;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Deque;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Problem: Word Ladder
 * LeetCode: 127 | Difficulty: Medium | Frequency: 4/5
 * Pattern: BFS, wildcard bucketing
 *
 * <p>Problem: Given a dictionary of words and a begin/end word, return the length of the
 * shortest transformation sequence. A single letter may be changed at a time and every
 * intermediate word has to be in the dictionary. The answer counts the <em>words</em> in the
 * sequence (so {@code begin == end} gives 1). {@code 0} means the end word is unreachable.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * word1
 * ...
 * wordn
 * beginWord
 * endWord
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 6
 * hot
 * dot
 * dog
 * lot
 * log
 * cog
 * hit
 * cog
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Approach: BFS over the words. Comparing every pair of dictionary words would be O(n² * L).
 * Instead we bucket the words by a <em>wildcard</em> pattern: {@code "hot"} is bucketed under
 * {@code "*ot"}, {@code "dot"} and {@code "lot"} are all bucketed under {@code "o*"}, and so on.
 * Two words are one letter apart exactly when they share a bucket, so one BFS level expands in
 * O(total characters) instead of O(n²).
 *
 * <p>Complexity: Time O(N * L²) — L buckets per word, each hash of a length-L string. Space O(N * L).
 */
public class WordLadder {

    /**
     * Length of the shortest transformation sequence.
     *
     * @param words    the dictionary
     * @param beginWord the starting word
     * @param endWord   the target word
     * @return the number of words in the shortest sequence, {@code 0} when unreachable
     */
    public static int ladderLength(String[] words, String beginWord, String endWord) {
        Set<String> dictionary = new HashSet<>(Arrays.asList(words));
        if (!dictionary.contains(endWord)) {
            return 0;
        }
        if (beginWord.equals(endWord)) {
            return 1;
        }

        // bucket "hot" under "*ot", "dot" under "d*t", ...
        Map<String, List<String>> buckets = new HashMap<>();
        List<String> all = new ArrayList<>(Arrays.asList(words));
        all.add(beginWord);
        for (String word : all) {
            char[] chars = word.toCharArray();
            for (int i = 0; i < chars.length; i++) {
                char original = chars[i];
                chars[i] = '*';
                buckets.computeIfAbsent(new String(chars), key -> new ArrayList<>()).add(word);
                chars[i] = original;
            }
        }

        Deque<String> queue = new ArrayDeque<>();
        queue.add(beginWord);
        dictionary.remove(beginWord);

        int wordsInSequence = 1;
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            for (int i = 0; i < levelSize; i++) {
                String current = queue.poll();
                char[] chars = current.toCharArray();
                for (int p = 0; p < chars.length; p++) {
                    char original = chars[p];
                    chars[p] = '*';
                    List<String> candidates = buckets.get(new String(chars));
                    chars[p] = original;
                    if (candidates == null) {
                        continue;
                    }
                    for (String candidate : candidates) {
                        if (!dictionary.remove(candidate)) {
                            continue; // already visited
                        }
                        if (candidate.equals(endWord)) {
                            return wordsInSequence + 1;
                        }
                        queue.add(candidate);
                    }
                }
            }
            wordsInSequence++;
        }
        return 0;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        String[] words = new String[n];
        for (int i = 0; i < n; i++) {
            words[i] = fs.next();
        }
        String beginWord = fs.next();
        String endWord = fs.next();

        System.out.println(ladderLength(words, beginWord, endWord));
    }
}
`,n=`import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Deque;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Word Ladder
 * LeetCode: 127 | Difficulty: Medium | Frequency: 4/5
 * Pattern: BFS, wildcard bucketing
 *
 * <p>Problem: Given a dictionary of words and a begin/end word, return the length of the
 * shortest transformation sequence. A single letter may be changed at a time and every
 * intermediate word has to be in the dictionary. The answer counts the <em>words</em> in the
 * sequence (so {@code begin == end} gives 1). {@code 0} means the end word is unreachable.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * word1
 * ...
 * wordn
 * beginWord
 * endWord
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 6
 * hot
 * dot
 * dog
 * lot
 * log
 * cog
 * hit
 * cog
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Approach: BFS over the words. Comparing every pair of dictionary words would be O(n² * L).
 * Instead we bucket the words by a <em>wildcard</em> pattern: {@code "hot"} is bucketed under
 * {@code "*ot"}, {@code "dot"} and {@code "lot"} are all bucketed under {@code "o*"}, and so on.
 * Two words are one letter apart exactly when they share a bucket, so one BFS level expands in
 * O(total characters) instead of O(n²).
 *
 * <p>Complexity: Time O(N * L²) — L buckets per word, each hash of a length-L string. Space O(N * L).
 */
public class Main {

    /**
     * Length of the shortest transformation sequence.
     *
     * @param words    the dictionary
     * @param beginWord the starting word
     * @param endWord   the target word
     * @return the number of words in the shortest sequence, {@code 0} when unreachable
     */
    public static int ladderLength(String[] words, String beginWord, String endWord) {
        Set<String> dictionary = new HashSet<>(Arrays.asList(words));
        if (!dictionary.contains(endWord)) {
            return 0;
        }
        if (beginWord.equals(endWord)) {
            return 1;
        }

        // bucket "hot" under "*ot", "dot" under "d*t", ...
        Map<String, List<String>> buckets = new HashMap<>();
        List<String> all = new ArrayList<>(Arrays.asList(words));
        all.add(beginWord);
        for (String word : all) {
            char[] chars = word.toCharArray();
            for (int i = 0; i < chars.length; i++) {
                char original = chars[i];
                chars[i] = '*';
                buckets.computeIfAbsent(new String(chars), key -> new ArrayList<>()).add(word);
                chars[i] = original;
            }
        }

        Deque<String> queue = new ArrayDeque<>();
        queue.add(beginWord);
        dictionary.remove(beginWord);

        int wordsInSequence = 1;
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            for (int i = 0; i < levelSize; i++) {
                String current = queue.poll();
                char[] chars = current.toCharArray();
                for (int p = 0; p < chars.length; p++) {
                    char original = chars[p];
                    chars[p] = '*';
                    List<String> candidates = buckets.get(new String(chars));
                    chars[p] = original;
                    if (candidates == null) {
                        continue;
                    }
                    for (String candidate : candidates) {
                        if (!dictionary.remove(candidate)) {
                            continue; // already visited
                        }
                        if (candidate.equals(endWord)) {
                            return wordsInSequence + 1;
                        }
                        queue.add(candidate);
                    }
                }
            }
            wordsInSequence++;
        }
        return 0;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        String[] words = new String[n];
        for (int i = 0; i < n; i++) {
            words[i] = fs.next();
        }
        String beginWord = fs.next();
        String endWord = fs.next();

        System.out.println(ladderLength(words, beginWord, endWord));
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
`,r='\n# Word Ladder — LeetCode 127\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | BFS · Wildcard bucketing |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Uber, LinkedIn |\n\n## Problem Statement\n\nGiven a dictionary and a `beginWord` / `endWord`, return the length of the shortest **sequence\nof words** that turns `beginWord` into `endWord`. One letter may be changed at a time and every\nintermediate word must be in the dictionary.\n\nThe answer counts **words**, so `beginWord == endWord` gives `1`. `0` means the `endWord` cannot\nbe reached at all.\n\n## Input Format\n\n```\nn\nword1\nword2\n...\nwordn\nbeginWord\nendWord\n```\n\n- `n` — number of dictionary words\n- `n` words, one per line (lowercase letters)\n- `beginWord`, `endWord` — the two endpoints\n\n## Sample Input\n\n```\n6\nhot\ndot\ndog\nlot\nlog\ncog\nhit\ncog\n```\n\n## Expected Output\n\n```\n5\n```\n\n`hit → hot → dot → dog → cog` — five words.\n\n## Approach — BFS over buckets, not over pairs\n\nThe obvious BFS expands every word into all 26 single-letter mutations: `O(26 · L · n)` word\nconstructions and a hash lookup each. That is fine but wasteful.\n\nThe **wildcard bucket** trick groups the dictionary so that two words one letter apart end up in\nthe same bucket:\n\n```\n"hot" → "*ot",  "h*t",  "ho*"\n"dot" → "*ot",  "d*t",  "do*"\n"cog" → "*og",  "c*g",  "co*"\n```\n\nTwo words share a bucket **iff** they differ in exactly one position, so "words reachable from\n`w`" = "all words in the buckets of `w`". Building the buckets costs `O(n · L)` and each BFS\nlevel then expands in `O(bucket size)` instead of `O(26 · L)`.\n\nBFS levels are the answer: level `1` is `beginWord` alone, level `2` contains all words one\nchange away, and so on. The first time `endWord` is generated we return the level number.\n\n**Visited handling:** remove a word from the dictionary set the moment it is queued. That is the\nvisited mark, and it also stops us from generating the same word from several neighbours.\n\n## Dry Run\n\nBuckets that matter (key → words):\n\n| Bucket | Words |\n|---|---|\n| `*ot` | `hot`, `dot`, `lot` |\n| `*og` | `dog`, `log`, `cog` |\n| `h*t` | `hot`, `hit` |\n| `do*` | `dog`, `dot` |\n| `lo*` | `lot`, `log` |\n| `c*g` | `cog` |\n\nBFS (the "level" column counts words in the sequence):\n\n| Step | Level | Queue before | Word expanded | Buckets hit | New words | Queue after | Sequence length |\n|---:|---:|---|---|---|---|---|---:|\n| 1 | 1 | `[hit]` | `hit` | `h*t` → `[hot, hit]` | `hot` | `[hot]` | 1 |\n| 2 | 2 | `[hot]` | `hot` | `*ot` → `[hot, dot, lot]` | `dot`, `lot` | `[dot, lot]` | 2 |\n| 3 | 3 | `[dot, lot]` | `dot` | `*ot` → `[hot, dot, lot]`, `do*` → `[dog, dot]` | `dog` | `[dog, lot]` | 3 |\n| 4 | 3 | `[dot, lot]` | `lot` | `lo*` → `[lot, log]` | `log` | `[dog, log]` | 3 |\n| 5 | 4 | `[dog, log]` | `dog` | `*og` → `[dog, log, cog]` | **`cog` = endWord** | — | 4 |\n\n`cog` is generated at level 4, so the shortest sequence contains **5** words → answer **`5`**.\n\n## Java Solution\n\nSee [`WordLadder.java`](./WordLadder.java).\n\n```java\npublic static int ladderLength(String[] words, String beginWord, String endWord) {\n    Set<String> dictionary = new HashSet<>(Arrays.asList(words));\n    if (!dictionary.contains(endWord)) {\n        return 0;\n    }\n    // ... build the wildcard buckets ...\n    int wordsInSequence = 1;\n    while (!queue.isEmpty()) {\n        int levelSize = queue.size();\n        for (int i = 0; i < levelSize; i++) {\n            String current = queue.poll();\n            // ... look the buckets of `current` up ...\n            for (String candidate : candidates) {\n                if (!dictionary.remove(candidate)) {\n                    continue;\n                }\n                if (candidate.equals(endWord)) {\n                    return wordsInSequence + 1;\n                }\n                queue.add(candidate);\n            }\n        }\n        wordsInSequence++;\n    }\n    return 0;\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(N · L²) | N words × L wildcard buckets, each hashing an L-character string |\n| **Space** | O(N · L) | The bucket map holds N · L entries |\n\n`L` is the word length (≤ 10 for LeetCode), so `L²` is a small constant in practice.\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"Can you do it without the extra bucket memory?"* → yes, mutate each word with all 26 letters\n  and look it up; that is O(26 · L · N) time but only O(N) space.\n- *"What if the dictionary is huge and changes often?"* → a Trie gives O(L) per mutation lookup;\n  or precompute the buckets once and cache them.\n- *"What if we need the actual sequence of words, not just its length?"* → keep a parent pointer\n  for every word you enqueue and walk it back from `endWord`.\n- *"How would you handle wildcard queries (find all words matching `h*t`)?"* → the same bucket\n  index answers those in O(bucket size).\n\n**Common mistakes:**\n- ❌ Returning the number of **changes** instead of the number of **words** → off by one.\n- ❌ Forgetting that `beginWord` may not be in the dictionary → it still needs to be bucketed and\n  it still has to be marked visited.\n- ❌ Not removing words from the visited set when they are queued → the same word is generated\n  many times and the BFS degenerates.\n\n**How to narrate:**\n> "This is a shortest path problem where the edges are \'differ in one letter\'. Instead of\n> generating all 26 mutations for every word, I bucket the dictionary by wildcard patterns:\n> \'hot\' goes into \'*ot\', \'h*t\' and \'ho*\'. Two words share a bucket exactly when they are one\n> letter apart, so a BFS level expands by looking at the buckets of the current word. The level\n> number is the length of the shortest sequence."\n\n## Related Problems\n\n- [Alien Dictionary](./AlienDictionary.java) — the other classic string-graph problem\n- [RottingOranges](./RottingOranges.java) — multi-source BFS\n- [Number of Islands](./NumberOfIslands.java) — flood fill on a grid\n- [Topological Sort](./TopologicalSort.java) — ordering a precedence graph\n',i=[`ladderLength`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};