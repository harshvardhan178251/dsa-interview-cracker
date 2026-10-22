var e=`trie.DesignAddAndSearchWords`,t=`package com.dsa.trie;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TrieNode;

import java.io.IOException;

/**
 * Problem: Design Add and Search Words
 * LeetCode: 211 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Trie, Backtracking with wildcards
 *
 * <p>Problem: Implement a word search that supports the character {@code '.'}, which
 * matches any single letter. Words can be added between searches.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * word1
 * ...
 * wordn
 * m
 * op1
 * ...
 * opm
 * </pre>
 * The first {@code n} words are added before the operations run. Each operation is
 * {@code add &lt;word&gt;} or {@code search &lt;word&gt;} (where {@code word} may contain
 * {@code .}).
 *
 * <p>Sample input:
 * <pre>
 * 2
 * bad
 * dad
 * 3
 * search b.d
 * add bad
 * search b.d
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * ok
 * true
 * </pre>
 * One line per operation: {@code ok} for a successful add, {@code true}/{@code false}
 * for a search.
 *
 * <p>Approach: the words live in a trie. A search walks the trie; when it meets a
 * {@code .} it tries every child of the current node recursively. The search is only
 * accepted when the final node is flagged as the end of a word.
 *
 * <p>Complexity: Time O(L) for a search without wildcards, O(26^L) in the worst case
 * when every position is a wildcard. Space O(total characters added).
 */
public class DesignAddAndSearchWords {

    /** The prefix tree with wildcard-aware searching. */
    public static class WordDictionary {

        private final TrieNode root = new TrieNode();

        /** Adds a word to the dictionary. */
        public void addWord(String word) {
            TrieNode node = root;
            for (int i = 0; i < word.length(); i++) {
                node = node.getOrCreateChild(word.charAt(i));
            }
            node.isEndOfWord = true;
        }

        /** Returns {@code true} when some word matches the pattern. */
        public boolean search(String word) {
            return search(root, word, 0);
        }

        /** Recursive helper: matches {@code word} from position {@code index} onwards. */
        private boolean search(TrieNode node, String word, int index) {
            if (node == null) {
                return false;
            }
            if (index == word.length()) {
                return node.isEndOfWord;
            }
            char c = word.charAt(index);
            if (c != '.') {
                if (!node.hasChild(c)) {
                    return false;
                }
                return search(node.child(c), word, index + 1);
            }
            for (TrieNode child : node.children.values()) {
                if (search(child, word, index + 1)) {
                    return true;
                }
            }
            return false;
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        WordDictionary dictionary = new WordDictionary();

        int n = fs.nextInt();
        for (int i = 0; i < n; i++) {
            dictionary.addWord(fs.next());
        }

        int m = fs.nextInt();
        for (int i = 0; i < m; i++) {
            String operation = fs.next();
            String argument = fs.next();
            switch (operation) {
                case "add":
                    dictionary.addWord(argument);
                    System.out.println("ok");
                    break;
                case "search":
                    System.out.println(dictionary.search(argument));
                    break;
                default:
                    throw new IllegalArgumentException("unknown operation: " + operation);
            }
        }
    }
}
`,n=`import java.io.IOException;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

/**
 * Problem: Design Add and Search Words
 * LeetCode: 211 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Trie, Backtracking with wildcards
 *
 * <p>Problem: Implement a word search that supports the character {@code '.'}, which
 * matches any single letter. Words can be added between searches.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * word1
 * ...
 * wordn
 * m
 * op1
 * ...
 * opm
 * </pre>
 * The first {@code n} words are added before the operations run. Each operation is
 * {@code add &lt;word&gt;} or {@code search &lt;word&gt;} (where {@code word} may contain
 * {@code .}).
 *
 * <p>Sample input:
 * <pre>
 * 2
 * bad
 * dad
 * 3
 * search b.d
 * add bad
 * search b.d
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * ok
 * true
 * </pre>
 * One line per operation: {@code ok} for a successful add, {@code true}/{@code false}
 * for a search.
 *
 * <p>Approach: the words live in a trie. A search walks the trie; when it meets a
 * {@code .} it tries every child of the current node recursively. The search is only
 * accepted when the final node is flagged as the end of a word.
 *
 * <p>Complexity: Time O(L) for a search without wildcards, O(26^L) in the worst case
 * when every position is a wildcard. Space O(total characters added).
 */
public class Main {

    /** The prefix tree with wildcard-aware searching. */
    public static class WordDictionary {

        private final TrieNode root = new TrieNode();

        /** Adds a word to the dictionary. */
        public void addWord(String word) {
            TrieNode node = root;
            for (int i = 0; i < word.length(); i++) {
                node = node.getOrCreateChild(word.charAt(i));
            }
            node.isEndOfWord = true;
        }

        /** Returns {@code true} when some word matches the pattern. */
        public boolean search(String word) {
            return search(root, word, 0);
        }

        /** Recursive helper: matches {@code word} from position {@code index} onwards. */
        private boolean search(TrieNode node, String word, int index) {
            if (node == null) {
                return false;
            }
            if (index == word.length()) {
                return node.isEndOfWord;
            }
            char c = word.charAt(index);
            if (c != '.') {
                if (!node.hasChild(c)) {
                    return false;
                }
                return search(node.child(c), word, index + 1);
            }
            for (TrieNode child : node.children.values()) {
                if (search(child, word, index + 1)) {
                    return true;
                }
            }
            return false;
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        WordDictionary dictionary = new WordDictionary();

        int n = fs.nextInt();
        for (int i = 0; i < n; i++) {
            dictionary.addWord(fs.next());
        }

        int m = fs.nextInt();
        for (int i = 0; i < m; i++) {
            String operation = fs.next();
            String argument = fs.next();
            switch (operation) {
                case "add":
                    dictionary.addWord(argument);
                    System.out.println("ok");
                    break;
                case "search":
                    System.out.println(dictionary.search(argument));
                    break;
                default:
                    throw new IllegalArgumentException("unknown operation: " + operation);
            }
        }
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

// ---------- inlined com.dsa.utils.TrieNode ----------
/**
 * Trie node used across the trie problems.
 */
class TrieNode {

    public Map<Character, TrieNode> children = new HashMap<>();
    public boolean isEndOfWord;

    public TrieNode() {
    }

    public TrieNode(char letter) {
        children.put(letter, new TrieNode());
    }

    public boolean hasChild(char c) {
        return children.containsKey(c);
    }

    public TrieNode child(char c) {
        return children.get(c);
    }

    public TrieNode getOrCreateChild(char c) {
        return children.computeIfAbsent(c, k -> new TrieNode());
    }
}
`,r=`
# Design Add and Search Words — LeetCode 211

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Trie · Backtracking with wildcards |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Implement a word search that supports the character \`.\`, which matches **any single
letter**. Words can be added between searches.

\`\`\`
dictionary: bad, dad
search "b.d"  → true   (b a d)
search "b.."  → true
search "b.x"  → false
\`\`\`

## Input Format

The program reads from standard input:

\`\`\`
n
word1
...
wordn
m
op1
...
opm
\`\`\`

- \`n\` — how many words are added before the operations run
- the words — one per line, lowercase English letters
- \`m\` — how many operations follow
- the operations — one per line, each \`add <word>\` or \`search <word>\` (the searched
  word may contain \`.\`)

## Sample Input

\`\`\`
2
bad
dad
3
search b.d
add bad
search b.d
\`\`\`

## Expected Output

\`\`\`
true
ok
true
\`\`\`

One line per operation: \`ok\` for an add, \`true\`/\`false\` for a search.

## Approach — the trie plus backtracking on \`.\`

The trie is the same as in
[Implement Trie](./ImplementTrie.java). The only new
part is the search with wildcards:

\`\`\`java
private boolean search(TrieNode node, String word, int index) {
    if (node == null) return false;
    if (index == word.length()) return node.isEndOfWord;   // the whole word matched
    char c = word.charAt(index);
    if (c != '.') {
        if (!node.hasChild(c)) return false;
        return search(node.child(c), word, index + 1);
    }
    for (TrieNode child : node.children.values()) {   // '.' tries every child
        if (search(child, word, index + 1)) return true;
    }
    return false;
}
\`\`\`

Two rules:

- a **concrete** letter must match exactly one child,
- a \`.\` tries **every** child and backtracks.

The search is accepted only when the whole pattern is consumed **and** the node reached
is the end of a word — otherwise \`b.\` would match \`bad\` too early.

## Dry Run

Input: the dictionary contains \`bad\` and \`dad\`; operation \`search b.d\`

| Step | call \`(node, index)\` | letter | branch taken | result |
|---:|---|---|---|---|
| 1 | \`(root, 0)\` | \`b\` | concrete → child \`b\` exists | → \`(node b, 1)\` |
| 2 | \`(node b, 1)\` | \`.\` | wildcard → try every child of \`b\` (only \`a\`) | → \`(node a, 2)\` |
| 3 | \`(node a, 2)\` | \`d\` | concrete → child \`d\` exists | → \`(node d, 3)\` |
| 4 | \`(node d, 3)\` | — | the pattern is consumed | the node is the end of the word \`bad\` → **true** ✓ |

The other operations:

| Step | operation | what happens | answer |
|---:|---|---|---|
| 5 | \`add bad\` | \`bad\` already exists → the path is walked, the end flag is set again | \`ok\` |
| 6 | \`search b.d\` | the same walk as steps 1–4 | \`true\` |

### A failing wildcard

\`search b.x\`: step 3 fails because the node \`a\` has no child \`x\` → the wildcard at
step 2 has no other child to try → **false**.

### The "must end at a word" rule

\`search b.\` on the dictionary \`bad\`: step 2 tries the child \`a\` → step 3 finds the
end of the pattern at the node \`a\`, but \`a\` is **not** the end of a word (only \`bad\`
is) → the search continues with the other children → none matches → **false**.

## Java Solution

See [\`DesignAddAndSearchWords.java\`](./DesignAddAndSearchWords.java).

\`\`\`java
public static class WordDictionary {

    private final TrieNode root = new TrieNode();

    public void addWord(String word) {
        TrieNode node = root;
        for (int i = 0; i < word.length(); i++) {
            node = node.getOrCreateChild(word.charAt(i));
        }
        node.isEndOfWord = true;
    }

    public boolean search(String word) {
        return search(root, word, 0);
    }
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(L) without wildcards, O(26^L) in the worst case | Every \`.\` multiplies the branching factor by the alphabet size |
| **Space** | O(total characters added) | One node per distinct prefix |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do the wildcard search without backtracking?"* → yes, with a DP table over
  the positions (the classic \`dp[i][j]\` formulation) — O(L²) instead of exponential.
- *"What if the dictionary is huge and the queries are many?"* → keep the trie in memory
  (or on disk) and cache the results.
- *"Support \`.\` matching zero or more characters."* → that is a regular expression; the
  trie approach no longer applies.

**Common mistakes:**
- ❌ Accepting the match when the pattern is consumed but the node is **not** the end of
  a word → \`b.\` would match \`bad\`.
- ❌ Forgetting to explore **all** children of a \`.\` node.
- ❌ Treating \`.\` as a literal character.

**How to narrate:**
> "The words live in a trie. The search walks down the trie: a concrete letter must
> match exactly one child, and a dot tries every child and backtracks. The match is
> only accepted when the whole pattern is consumed and the node I land on is the end of
> a word. Without wildcards it's O(L); with them it can blow up to O(26^L)."

## Related Problems

- [Implement Trie](./ImplementTrie.java) — the trie without wildcards
- [Word Search II](./WordSearchII.java) — the trie used to prune a grid search
- [Prefix Count](./PrefixCount.java) — a trie with extra state
`,i=[`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};