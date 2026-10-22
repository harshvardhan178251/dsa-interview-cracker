var e=`trie.PrefixCount`,t=`package com.dsa.trie;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TrieNode;

import java.io.IOException;

/**
 * Problem: Trie with Prefix Counting
 * LeetCode: n/a | Difficulty: Medium | Frequency: 3/5
 * Pattern: Trie, Augmented node state
 *
 * <p>Problem: Build a prefix tree that also answers "how many inserted words start with
 * this prefix?". Words may be inserted more than once — every insertion counts.
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
 * {@code insert &lt;word&gt;} or {@code count &lt;prefix&gt;}.
 *
 * <p>Sample input:
 * <pre>
 * 3
 * apple
 * app
 * banana
 * 3
 * count app
 * insert applet
 * count app
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * ok
 * 3
 * </pre>
 * One line per operation: {@code ok} for an insert, the number of matching words for a
 * count.
 *
 * <p>Approach: every trie node keeps a counter of the words that pass through it. When
 * a word is inserted the counter of every node on its path is increased, so the counter
 * of the node reached by a prefix is exactly the number of inserted words with that
 * prefix.
 *
 * <p>Complexity: Time O(L) per operation, Space O(total characters inserted).
 */
public class PrefixCount {

    /** A trie node that counts the words passing through it. */
    public static class CountingNode extends TrieNode {

        /** Number of inserted words whose path contains this node. */
        public int count;

        /** Creates the child for {@code c}, keeping the {@link CountingNode} type. */
        @Override
        public CountingNode getOrCreateChild(char c) {
            CountingNode child = (CountingNode) children.get(c);
            if (child == null) {
                child = new CountingNode();
                children.put(c, child);
            }
            return child;
        }
    }

    /** The counting prefix tree. */
    public static class CountingTrie {

        private final CountingNode root = new CountingNode();

        /** Inserts a word and counts it. */
        public void insert(String word) {
            CountingNode node = root;
            node.count++;
            for (int i = 0; i < word.length(); i++) {
                node = node.getOrCreateChild(word.charAt(i));
                node.count++;
            }
        }

        /** Returns the number of inserted words that start with {@code prefix}. */
        public int countPrefix(String prefix) {
            CountingNode node = root;
            for (int i = 0; i < prefix.length(); i++) {
                if (!node.hasChild(prefix.charAt(i))) {
                    return 0;
                }
                node = (CountingNode) node.child(prefix.charAt(i));
            }
            return node.count;
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        CountingTrie trie = new CountingTrie();

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
                case "count":
                    System.out.println(trie.countPrefix(argument));
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
 * Problem: Trie with Prefix Counting
 * LeetCode: n/a | Difficulty: Medium | Frequency: 3/5
 * Pattern: Trie, Augmented node state
 *
 * <p>Problem: Build a prefix tree that also answers "how many inserted words start with
 * this prefix?". Words may be inserted more than once — every insertion counts.
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
 * {@code insert &lt;word&gt;} or {@code count &lt;prefix&gt;}.
 *
 * <p>Sample input:
 * <pre>
 * 3
 * apple
 * app
 * banana
 * 3
 * count app
 * insert applet
 * count app
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * ok
 * 3
 * </pre>
 * One line per operation: {@code ok} for an insert, the number of matching words for a
 * count.
 *
 * <p>Approach: every trie node keeps a counter of the words that pass through it. When
 * a word is inserted the counter of every node on its path is increased, so the counter
 * of the node reached by a prefix is exactly the number of inserted words with that
 * prefix.
 *
 * <p>Complexity: Time O(L) per operation, Space O(total characters inserted).
 */
public class Main {

    /** A trie node that counts the words passing through it. */
    public static class CountingNode extends TrieNode {

        /** Number of inserted words whose path contains this node. */
        public int count;

        /** Creates the child for {@code c}, keeping the {@link CountingNode} type. */
        @Override
        public CountingNode getOrCreateChild(char c) {
            CountingNode child = (CountingNode) children.get(c);
            if (child == null) {
                child = new CountingNode();
                children.put(c, child);
            }
            return child;
        }
    }

    /** The counting prefix tree. */
    public static class CountingTrie {

        private final CountingNode root = new CountingNode();

        /** Inserts a word and counts it. */
        public void insert(String word) {
            CountingNode node = root;
            node.count++;
            for (int i = 0; i < word.length(); i++) {
                node = node.getOrCreateChild(word.charAt(i));
                node.count++;
            }
        }

        /** Returns the number of inserted words that start with {@code prefix}. */
        public int countPrefix(String prefix) {
            CountingNode node = root;
            for (int i = 0; i < prefix.length(); i++) {
                if (!node.hasChild(prefix.charAt(i))) {
                    return 0;
                }
                node = (CountingNode) node.child(prefix.charAt(i));
            }
            return node.count;
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        CountingTrie trie = new CountingTrie();

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
                case "count":
                    System.out.println(trie.countPrefix(argument));
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
# Trie with Prefix Counting

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Trie · Augmented node state |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta |

## Problem Statement

Build a prefix tree that can also answer the question *"how many inserted words start
with this prefix?"*. Words may be inserted more than once — every insertion counts.

This is the classic **autocomplete counter** you meet in search engines and IDEs.

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
- the operations — one per line, each \`insert <word>\` or \`count <prefix>\`

## Sample Input

\`\`\`
3
apple
app
banana
3
count app
insert applet
count app
\`\`\`

## Expected Output

\`\`\`
2
ok
3
\`\`\`

One line per operation: \`ok\` for an insert, the number of matching words for a count.

## Approach — a counter in every node

A plain trie only tells you *whether* a prefix exists. To count the words under a
prefix, every node needs one extra field: how many inserted words pass through it.

\`\`\`java
public void insert(String word) {
    CountingNode node = root;
    node.count++;
    for (int i = 0; i < word.length(); i++) {
        node = node.getOrCreateChild(word.charAt(i));
        node.count++;
    }
}
\`\`\`

When a word is inserted, the counter of **every node on its path** is increased by
one. The node reached by a prefix therefore holds exactly the number of inserted words
that start with that prefix.

The counter at the root counts all the inserted words.

The helper \`com.dsa.utils.TrieNode\` is extended with a \`CountingNode\` subclass that
adds the counter — the subclass overrides \`getOrCreateChild\` so that the children
keep the \`CountingNode\` type.

## Dry Run

After inserting \`apple\`, \`app\` and \`banana\`:

\`\`\`
root (count 3)
 ├─ a (count 2)
 │   └─ p (count 2)
 │       └─ p (count 2)
 │           ├─ l (count 1) ─ e (count 1)      ← apple
 │           └─ (end of word: app)
 └─ b (count 1) ─ a ─ n ─ a ─ n ─ a            ← banana
\`\`\`

| Step | operation | path | counter changes | answer |
|---:|---|---|---|---|
| 1 | \`count app\` | root → \`a\` → \`p\` → \`p\` | — | the node \`app\` has count **2** (\`apple\`, \`app\`) |
| 2 | \`insert applet\` | root → \`a\` → \`p\` → \`p\` → \`l\` → \`e\` → \`t\` | \`a\`: 2→3, \`p\`: 2→3, \`p\`: 2→3, \`l\`: 1→2, \`e\`: 1→2, new \`t\`: 1 | \`ok\` |
| 3 | \`count app\` | root → \`a\` → \`p\` → \`p\` | — | the node \`app\` now has count **3** |

The word \`banana\` never touches the \`a\`-branch, so the counter of \`b\` stays at 1.

### A prefix that was never inserted

\`count banan\` → the trie has the path \`b → a → n → a → n\` (the beginning of \`banana\`)
but no node for \`banan\` → the walk fails → the answer is **0**.

## Java Solution

See [\`PrefixCount.java\`](./PrefixCount.java).

\`\`\`java
public static class CountingNode extends TrieNode {

    public int count;

    @Override
    public CountingNode getOrCreateChild(char c) {
        CountingNode child = (CountingNode) children.get(c);
        if (child == null) {
            child = new CountingNode();
            children.put(c, child);
        }
        return child;
    }
}

public int countPrefix(String prefix) {
    CountingNode node = root;
    for (int i = 0; i < prefix.length(); i++) {
        if (!node.hasChild(prefix.charAt(i))) {
            return 0;
        }
        node = (CountingNode) node.child(prefix.charAt(i));
    }
    return node.count;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(L) per operation | One step per character; the count lookup is O(1) at the end |
| **Space** | O(total characters inserted) | One node per distinct prefix, each with one extra counter |

## Interview Notes

**Follow-ups to raise yourself:**
- *"How would you delete a word and keep the counts correct?"* → walk the path,
  decrement the counters, and unlink the leaf (and optionally prune the empty nodes).
- *"How do you get the top k suggestions for a prefix?"* → walk to the prefix node and
  take the k most frequent children; that needs a per-node priority list.
- *"Why not keep a hash map from prefix to count?"* → it works, but it stores one entry
  per **distinct prefix** — the trie stores one node per distinct prefix and shares
  the paths, and it also gives you the prefix queries for free.

**Common mistakes:**
- ❌ Incrementing the counter **after** the loop → the last node is not counted.
- ❌ Not counting duplicates → every insertion must add one.
- ❌ Forgetting the root counter → the count of the empty prefix (all the words) is
  wrong.
- ❌ Casting the child to \`CountingNode\` without checking → the cast is safe only
  because every child was created by \`getOrCreateChild\` of the subclass.

**How to narrate:**
> "I keep a counter in every trie node: the number of inserted words that pass through
> it. Inserting a word increments the counter of every node on its path, so the node
> reached by a prefix holds exactly the number of words with that prefix. The count
> query is a walk down the trie — O(L), the same as the insert."

## Related Problems

- [Implement Trie](./ImplementTrie.java) — the plain trie
- [Longest Prefix of a Phone Number](./LongestPrefixOfAPhoneNumber.java) — another trie query
- [Design Add and Search Words](./DesignAddAndSearchWords.java) — the same structure with wildcards
`,i=[`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};