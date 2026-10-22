var e=`trie.ImplementTrie`,t=`package com.dsa.trie;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TrieNode;

import java.io.IOException;

/**
 * Problem: Implement Trie (prefix tree)
 * LeetCode: 208 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Trie, Prefix tree
 *
 * <p>Problem: Implement a prefix tree with three operations:
 * <ul>
 *   <li>{@code insert(word)} — add a word,</li>
 *   <li>{@code search(word)} — is the word present,</li>
 *   <li>{@code startsWith(prefix)} — does any word start with the prefix.</li>
 * </ul>
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
 * The first {@code n} words are inserted before the operations run. Each operation is
 * {@code insert &lt;word&gt;}, {@code search &lt;word&gt;} or {@code startsWith &lt;prefix&gt;}.
 *
 * <p>Sample input:
 * <pre>
 * 3
 * apple
 * app
 * application
 * 4
 * search app
 * startsWith appl
 * insert banana
 * search banan
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * true
 * ok
 * false
 * </pre>
 * One line per operation: {@code ok} for a successful insert, {@code true}/{@code false}
 * for the two queries.
 *
 * <p>Approach: every node of the trie stores a map from a letter to the child node that
 * continues that letter, plus a flag saying whether a word ends there. Inserting walks
 * the characters of the word and creates the missing nodes; searching walks the same
 * way but stops at the first missing child, and it only succeeds if the last node is
 * flagged as the end of a word.
 *
 * <p>Complexity: Time O(L) per operation, where L is the length of the word. Space
 * O(total characters inserted).
 */
public class ImplementTrie {

    /** The prefix tree itself. */
    public static class Trie {

        private final TrieNode root = new TrieNode();

        /** Inserts a word into the trie. */
        public void insert(String word) {
            TrieNode node = root;
            for (int i = 0; i < word.length(); i++) {
                node = node.getOrCreateChild(word.charAt(i));
            }
            node.isEndOfWord = true;
        }

        /** Returns {@code true} when the exact word was inserted. */
        public boolean search(String word) {
            TrieNode node = walk(word);
            return node != null && node.isEndOfWord;
        }

        /** Returns {@code true} when some inserted word starts with the prefix. */
        public boolean startsWith(String prefix) {
            return walk(prefix) != null;
        }

        /** Follows the characters of {@code text}, or returns {@code null}. */
        private TrieNode walk(String text) {
            TrieNode node = root;
            for (int i = 0; i < text.length(); i++) {
                if (!node.hasChild(text.charAt(i))) {
                    return null;
                }
                node = node.child(text.charAt(i));
            }
            return node;
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        Trie trie = new Trie();

        int n = fs.nextInt();
        for (int i = 0; i < n; i++) {
            trie.insert(fs.next());
        }

        int m = fs.nextInt();
        for (int i = 0; i < m; i++) {
            String operation = fs.next();
            String argument = fs.next();
            switch (operation) {
                case "insert":
                    trie.insert(argument);
                    System.out.println("ok");
                    break;
                case "search":
                    System.out.println(trie.search(argument));
                    break;
                case "startsWith":
                    System.out.println(trie.startsWith(argument));
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
 * Problem: Implement Trie (prefix tree)
 * LeetCode: 208 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Trie, Prefix tree
 *
 * <p>Problem: Implement a prefix tree with three operations:
 * <ul>
 *   <li>{@code insert(word)} — add a word,</li>
 *   <li>{@code search(word)} — is the word present,</li>
 *   <li>{@code startsWith(prefix)} — does any word start with the prefix.</li>
 * </ul>
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
 * The first {@code n} words are inserted before the operations run. Each operation is
 * {@code insert &lt;word&gt;}, {@code search &lt;word&gt;} or {@code startsWith &lt;prefix&gt;}.
 *
 * <p>Sample input:
 * <pre>
 * 3
 * apple
 * app
 * application
 * 4
 * search app
 * startsWith appl
 * insert banana
 * search banan
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * true
 * ok
 * false
 * </pre>
 * One line per operation: {@code ok} for a successful insert, {@code true}/{@code false}
 * for the two queries.
 *
 * <p>Approach: every node of the trie stores a map from a letter to the child node that
 * continues that letter, plus a flag saying whether a word ends there. Inserting walks
 * the characters of the word and creates the missing nodes; searching walks the same
 * way but stops at the first missing child, and it only succeeds if the last node is
 * flagged as the end of a word.
 *
 * <p>Complexity: Time O(L) per operation, where L is the length of the word. Space
 * O(total characters inserted).
 */
public class Main {

    /** The prefix tree itself. */
    public static class Trie {

        private final TrieNode root = new TrieNode();

        /** Inserts a word into the trie. */
        public void insert(String word) {
            TrieNode node = root;
            for (int i = 0; i < word.length(); i++) {
                node = node.getOrCreateChild(word.charAt(i));
            }
            node.isEndOfWord = true;
        }

        /** Returns {@code true} when the exact word was inserted. */
        public boolean search(String word) {
            TrieNode node = walk(word);
            return node != null && node.isEndOfWord;
        }

        /** Returns {@code true} when some inserted word starts with the prefix. */
        public boolean startsWith(String prefix) {
            return walk(prefix) != null;
        }

        /** Follows the characters of {@code text}, or returns {@code null}. */
        private TrieNode walk(String text) {
            TrieNode node = root;
            for (int i = 0; i < text.length(); i++) {
                if (!node.hasChild(text.charAt(i))) {
                    return null;
                }
                node = node.child(text.charAt(i));
            }
            return node;
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        Trie trie = new Trie();

        int n = fs.nextInt();
        for (int i = 0; i < n; i++) {
            trie.insert(fs.next());
        }

        int m = fs.nextInt();
        for (int i = 0; i < m; i++) {
            String operation = fs.next();
            String argument = fs.next();
            switch (operation) {
                case "insert":
                    trie.insert(argument);
                    System.out.println("ok");
                    break;
                case "search":
                    System.out.println(trie.search(argument));
                    break;
                case "startsWith":
                    System.out.println(trie.startsWith(argument));
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
# Implement Trie — LeetCode 208

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Trie · Prefix tree |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Twitter |

## Problem Statement

Implement a **prefix tree** with three operations:

- \`insert(word)\` — add a word to the trie,
- \`search(word)\` — is the exact word present?
- \`startsWith(prefix)\` — does any inserted word start with the prefix?

\`\`\`
        (root)
          |
          a
          |
          p ── p
          |    |
          p    l ── e
          |
          l ── e
\`\`\`

\`app\` is a word, \`appl\` is a prefix of \`apple\` but not a word.

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

- \`n\` — how many words are inserted before the operations run
- the words — one per line, lowercase English letters
- \`m\` — how many operations follow
- the operations — one per line, each \`insert <word>\`, \`search <word>\` or
  \`startsWith <prefix>\`

## Sample Input

\`\`\`
3
apple
app
application
4
search app
startsWith appl
insert banana
search banan
\`\`\`

## Expected Output

\`\`\`
true
true
ok
false
\`\`\`

One line per operation: \`ok\` for an insert, \`true\`/\`false\` for the two queries.

## Approach — one node per prefix

A trie is a tree where each node holds:

- a **map from a letter to the child node** that continues with that letter,
- a **flag** saying whether a word ends exactly here.

| operation | walk |
|---|---|
| \`insert\` | create the missing children on the way down, then set the end flag |
| \`search\` | walk down; fail if a child is missing; succeed if the end flag is set |
| \`startsWith\` | walk down; succeed as soon as the prefix is fully matched |

\`search\` and \`startsWith\` differ only in the final check: the word must **end** at the
node for \`search\`, while for \`startsWith\` the node just has to **exist**.

The helper \`com.dsa.utils.TrieNode\` already provides the children map, the end flag and
the \`hasChild\` / \`child\` / \`getOrCreateChild\` helpers.

## Dry Run

Input: insert \`apple\`, \`app\`, \`application\`, then the four operations.

After the three inserts the trie looks like this (only the shared prefix \`app\` is
drawn):

\`\`\`
root ─a─> a ─p─> p ─p─> p ─l─> l ─e─> e   (apple: end flag)
                    └──────> l ─e─> e      (application continues)
\`\`\`

| Step | operation | path walked | node reached | end flag? | answer |
|---:|---|---|---|---|---|
| 1 | \`search app\` | root → a → p → p | the node after \`app\` | **yes** | \`true\` |
| 2 | \`startsWith appl\` | root → a → p → p → l | the node after \`appl\` | no (it is only a prefix) | \`true\` ✓ |
| 3 | \`insert banana\` | root → b → a → n → a → n → a | creates \`b\`,\`a\`,\`n\`,\`a\`,\`n\`,\`a\` | set on the last one | \`ok\` |
| 4 | \`search banan\` | root → b → a → n → a → n | the node after \`banan\` | **no** — \`banana\` was inserted, \`banan\` was not | \`false\` |

Step 2 is the interesting one: \`appl\` is not a word, but it **is** a prefix of \`apple\`
and \`application\`, so \`startsWith\` returns \`true\` while \`search\` would return \`false\`.

## Java Solution

See [\`ImplementTrie.java\`](./ImplementTrie.java).

\`\`\`java
public static class Trie {

    private final TrieNode root = new TrieNode();

    public void insert(String word) {
        TrieNode node = root;
        for (int i = 0; i < word.length(); i++) {
            node = node.getOrCreateChild(word.charAt(i));
        }
        node.isEndOfWord = true;
    }

    public boolean search(String word) {
        TrieNode node = walk(word);
        return node != null && node.isEndOfWord;
    }

    public boolean startsWith(String prefix) {
        return walk(prefix) != null;
    }

    private TrieNode walk(String text) {
        TrieNode node = root;
        for (int i = 0; i < text.length(); i++) {
            if (!node.hasChild(text.charAt(i))) {
                return null;
            }
            node = node.child(text.charAt(i));
        }
        return node;
    }
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(L) per operation | \`L\` = the length of the word; one step per character |
| **Space** | O(total characters inserted) | One node per distinct prefix |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Add \`delete(word)\`."* → walk down remembering the path and then unlink the last
  node from its parent; you may also want to prune the now-empty nodes.
- *"How many words start with \`pre\`?"* → keep a counter in every node; see
  [Trie with Prefix Counting](./PrefixCount.java).
- *"When is a trie better than a hash set?"* → when you need prefix queries
  (\`startsWith\`, autocomplete) or when the alphabet is small and the memory overhead is
  acceptable.
- *"Search for a word with wildcards."* → see
  [Design Add and Search Words](./DesignAddAndSearchWords.java).

**Common mistakes:**
- ❌ Forgetting the **end flag** → \`search("app")\` would also return \`true\` for a trie
  that only contains \`apple\`.
- ❌ Using a fixed-size array of 26 children → wastes memory when the alphabet is
  larger; a map is more flexible.
- ❌ Sharing the nodes between two tries by accident → each trie needs its own root.

**How to narrate:**
> "A trie is a tree of prefixes: every node has a map of children keyed by a letter
> and a flag that marks the end of a word. Inserting walks down and creates what is
> missing; searching walks down and checks the flag; startsWith walks down and only
> checks that the node exists. Every operation is linear in the length of the word."

## Related Problems

- [Design Add and Search Words](./DesignAddAndSearchWords.java) — adds wildcard search
- [Trie with Prefix Counting](./PrefixCount.java) — counts the words under a prefix
- [Word Search II](./WordSearchII.java) — the trie used to prune a grid search
`,i=[`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};