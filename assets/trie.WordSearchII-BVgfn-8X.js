var e=`trie.WordSearchII`,t=`package com.dsa.trie;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TrieNode;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Problem: Word Search II
 * LeetCode: 212 | Difficulty: Hard | Frequency: 4/5
 * Pattern: Trie + backtracking, Grid search
 *
 * <p>Problem: Given a board of characters and a list of words, return every word of the
 * list that can be spelled by moving left, right, up or down through the board without
 * reusing a cell.
 *
 * <p>Input format (stdin):
 * <pre>
 * rows
 * cols
 * c0 c1 ... c(rows*cols-1)
 * n
 * word1
 * ...
 * wordn
 * </pre>
 * The characters are the cells of the board in row-major order.
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 4
 * o a a n e t a e i h k r i f l v
 * 4
 * oath
 * pea
 * eat
 * rain
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * eat
 * oath
 * </pre>
 * The words that were found, sorted alphabetically.
 *
 * <p>Approach: put the dictionary into a trie and start a depth-first search from every
 * cell of the board. The search only follows trie edges, so it never explores a branch
 * that cannot lead to a word. As soon as a word is found it is removed from the trie,
 * which both avoids duplicates and prunes the remaining search.
 *
 * <p>Complexity: Time O(rows * cols * L) where L is the longest word. Space O(total
 * characters of the dictionary).
 */
public class WordSearchII {

    /** The prefix tree holding the dictionary. */
    public static class Trie {

        private final TrieNode root = new TrieNode();

        /** Adds a word to the trie. */
        public void insert(String word) {
            TrieNode node = root;
            for (int i = 0; i < word.length(); i++) {
                node = node.getOrCreateChild(word.charAt(i));
            }
            node.isEndOfWord = true;
        }

        /** Returns the node reached by the word, or {@code null}. */
        public TrieNode find(String word) {
            TrieNode node = root;
            for (int i = 0; i < word.length(); i++) {
                if (!node.hasChild(word.charAt(i))) {
                    return null;
                }
                node = node.child(word.charAt(i));
            }
            return node;
        }
    }

    /**
     * Returns the words of the dictionary that occur in the board.
     *
     * @param board the grid of characters
     * @param words the dictionary
     * @return the matching words, sorted alphabetically
     */
    public static List<String> findWords(char[][] board, List<String> words) {
        List<String> found = new ArrayList<>();
        if (board == null || board.length == 0 || words == null || words.isEmpty()) {
            return found;
        }
        Trie trie = new Trie();
        for (String word : words) {
            trie.insert(word);
        }

        int rows = board.length;
        int cols = board[0].length;
        boolean[][] used = new boolean[rows][cols];

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                search(board, used, trie.root, new StringBuilder(), r, c, found);
            }
        }
        Collections.sort(found);
        return found;
    }

    /** Depth-first search that follows the trie from a cell. */
    private static void search(char[][] board, boolean[][] used, TrieNode node,
                               StringBuilder path, int r, int c, List<String> found) {
        if (r < 0 || r >= board.length || c < 0 || c >= board[0].length || used[r][c]) {
            return;
        }
        char letter = board[r][c];
        if (!node.hasChild(letter)) {
            return; // no word can continue with this letter
        }
        TrieNode next = node.child(letter);
        used[r][c] = true;
        path.append(letter);

        if (next.isEndOfWord) {
            found.add(path.toString());
            next.isEndOfWord = false; // report every word only once
        }

        search(board, used, next, path, r + 1, c, found);
        search(board, used, next, path, r - 1, c, found);
        search(board, used, next, path, r, c + 1, found);
        search(board, used, next, path, r, c - 1, found);

        path.setLength(path.length() - 1); // backtrack
        used[r][c] = false; // backtrack
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int rows = fs.nextInt();
        int cols = fs.nextInt();

        char[][] board = new char[rows][cols];
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                board[r][c] = fs.next().charAt(0);
            }
        }

        int n = fs.nextInt();
        List<String> words = new ArrayList<>(n);
        for (int i = 0; i < n; i++) {
            words.add(fs.next());
        }

        for (String word : findWords(board, words)) {
            System.out.println(word);
        }
    }
}
`,n=`import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

/**
 * Problem: Word Search II
 * LeetCode: 212 | Difficulty: Hard | Frequency: 4/5
 * Pattern: Trie + backtracking, Grid search
 *
 * <p>Problem: Given a board of characters and a list of words, return every word of the
 * list that can be spelled by moving left, right, up or down through the board without
 * reusing a cell.
 *
 * <p>Input format (stdin):
 * <pre>
 * rows
 * cols
 * c0 c1 ... c(rows*cols-1)
 * n
 * word1
 * ...
 * wordn
 * </pre>
 * The characters are the cells of the board in row-major order.
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 4
 * o a a n e t a e i h k r i f l v
 * 4
 * oath
 * pea
 * eat
 * rain
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * eat
 * oath
 * </pre>
 * The words that were found, sorted alphabetically.
 *
 * <p>Approach: put the dictionary into a trie and start a depth-first search from every
 * cell of the board. The search only follows trie edges, so it never explores a branch
 * that cannot lead to a word. As soon as a word is found it is removed from the trie,
 * which both avoids duplicates and prunes the remaining search.
 *
 * <p>Complexity: Time O(rows * cols * L) where L is the longest word. Space O(total
 * characters of the dictionary).
 */
public class Main {

    /** The prefix tree holding the dictionary. */
    public static class Trie {

        private final TrieNode root = new TrieNode();

        /** Adds a word to the trie. */
        public void insert(String word) {
            TrieNode node = root;
            for (int i = 0; i < word.length(); i++) {
                node = node.getOrCreateChild(word.charAt(i));
            }
            node.isEndOfWord = true;
        }

        /** Returns the node reached by the word, or {@code null}. */
        public TrieNode find(String word) {
            TrieNode node = root;
            for (int i = 0; i < word.length(); i++) {
                if (!node.hasChild(word.charAt(i))) {
                    return null;
                }
                node = node.child(word.charAt(i));
            }
            return node;
        }
    }

    /**
     * Returns the words of the dictionary that occur in the board.
     *
     * @param board the grid of characters
     * @param words the dictionary
     * @return the matching words, sorted alphabetically
     */
    public static List<String> findWords(char[][] board, List<String> words) {
        List<String> found = new ArrayList<>();
        if (board == null || board.length == 0 || words == null || words.isEmpty()) {
            return found;
        }
        Trie trie = new Trie();
        for (String word : words) {
            trie.insert(word);
        }

        int rows = board.length;
        int cols = board[0].length;
        boolean[][] used = new boolean[rows][cols];

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                search(board, used, trie.root, new StringBuilder(), r, c, found);
            }
        }
        Collections.sort(found);
        return found;
    }

    /** Depth-first search that follows the trie from a cell. */
    private static void search(char[][] board, boolean[][] used, TrieNode node,
                               StringBuilder path, int r, int c, List<String> found) {
        if (r < 0 || r >= board.length || c < 0 || c >= board[0].length || used[r][c]) {
            return;
        }
        char letter = board[r][c];
        if (!node.hasChild(letter)) {
            return; // no word can continue with this letter
        }
        TrieNode next = node.child(letter);
        used[r][c] = true;
        path.append(letter);

        if (next.isEndOfWord) {
            found.add(path.toString());
            next.isEndOfWord = false; // report every word only once
        }

        search(board, used, next, path, r + 1, c, found);
        search(board, used, next, path, r - 1, c, found);
        search(board, used, next, path, r, c + 1, found);
        search(board, used, next, path, r, c - 1, found);

        path.setLength(path.length() - 1); // backtrack
        used[r][c] = false; // backtrack
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int rows = fs.nextInt();
        int cols = fs.nextInt();

        char[][] board = new char[rows][cols];
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                board[r][c] = fs.next().charAt(0);
            }
        }

        int n = fs.nextInt();
        List<String> words = new ArrayList<>(n);
        for (int i = 0; i < n; i++) {
            words.add(fs.next());
        }

        for (String word : findWords(board, words)) {
            System.out.println(word);
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
# Word Search II — LeetCode 212

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Trie + backtracking · Grid search |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Airbnb |

## Problem Statement

Given a board of characters and a list of words, return every word of the list that can
be **spelled** in the board. The letters must be adjacent (left, right, up, down) and
no cell may be used twice.

\`\`\`
o a a n
e t a e
i h k r
i f l v
\`\`\`

The words \`oath\` and \`eat\` can be spelled; \`pea\` and \`rain\` cannot.

## Input Format

The program reads from standard input:

\`\`\`
rows
cols
c0 c1 ... c(rows*cols-1)
n
word1
...
wordn
\`\`\`

- \`rows\`, \`cols\` — the size of the board
- the characters — the cells of the board in row-major order
- \`n\` — how many words follow
- the words — one per line

## Sample Input

\`\`\`
4
4
o a a n e t a e i h k r i f l v
4
oath
pea
eat
rain
\`\`\`

## Expected Output

\`\`\`
eat
oath
\`\`\`

The words that were found, sorted alphabetically.

## Approach — a trie prunes the search

Searching every word separately is far too slow: the words share prefixes, so most of
the work is repeated. Putting the dictionary into a **trie** shares that work:

1. Build a trie of all the words.
2. Start a depth-first search from **every** cell of the board.
3. The DFS only follows trie edges: if the current letter has no child, the branch is
   dead and we stop immediately.
4. When a node with the end flag is reached, the word is found. **Remove** it from the
   trie (\`isEndOfWord = false\`) so it is reported once and so the branch is pruned for
   the remaining searches.

Step 4 is the second half of the trick: once a word is found, its leaf is dead and the
trie prunes itself.

## Dry Run

The trie of \`oath\`, \`pea\`, \`eat\`, \`rain\` (only the \`eat\` branch is drawn):

\`\`\`
root ─e─> e ─a─> a ─t─> t   (end of word "eat")
root ─o─> o ─a─> a ─t─> t ─h─> h   (end of word "oath")
root ─p─> p ─e─> e ─a─> a
root ─r─> r ─a─> a ─i─> i ─n─> n
\`\`\`

Search starting at cell \`(0, 0)\` = \`o\`:

| Step | cell | letter | trie child | action |
|---:|---|---|---|---|
| 1 | \`(0,0)\` | \`o\` | \`o\` exists | descend, mark the cell used |
| 2 | \`(0,1)\` | \`a\` | \`a\` exists | descend |
| 3 | \`(0,2)\` | \`a\` | **no child \`a\` under \`oa\`** | prune → backtrack |
| 4 | \`(1,0)\` | \`e\` | **no child \`e\` under \`o\`** | prune → backtrack |
| 5 | \`(2,0)\` | \`i\` | no child | prune |
| 6 | \`(3,0)\` | \`i\` | no child | prune |
| 7 | \`(0,0)\` | — | — | unmark the cell, the start \`(0,0)\` is exhausted |

Search starting at cell \`(1, 1)\` = \`t\`:

| Step | cell | letter | trie child | action |
|---:|---|---|---|---|
| 1 | \`(1,1)\` | \`t\` | no child \`t\` under the root | prune immediately |

Search starting at cell \`(1, 2)\` = \`a\`:

| Step | cell | letter | trie child | action |
|---:|---|---|---|---|
| 1 | \`(1,2)\` | \`a\` | no child \`a\` under the root | prune |

Search starting at cell \`(1, 3)\` = \`e\`:

| Step | cell | letter | trie child | action |
|---:|---|---|---|---|
| 1 | \`(1,3)\` | \`e\` | \`e\` exists | descend |
| 2 | \`(1,2)\` | \`a\` | \`a\` exists under \`e\` | descend |
| 3 | \`(1,1)\` | \`t\` | \`t\` exists under \`ea\` | descend — **end of the word \`eat\`** → add \`eat\`, clear the flag |
| 4 | \`(1,1)\` | — | — | no further children → backtrack |
| 5 | \`(0,2)\` | \`a\` | no child | prune |
| 6 | \`(2,3)\` | \`r\` | no child | prune |
| 7 | \`(1,3)\` | — | — | backtrack |

The same happens for \`oath\` starting at \`(0, 0)\` → \`o → a → t → h\`. The words \`pea\`
and \`rain\` are never completed.

Found: \`eat\`, \`oath\` → sorted → \`eat\`, \`oath\` ✓

## Java Solution

See [\`WordSearchII.java\`](./WordSearchII.java).

\`\`\`java
private static void search(char[][] board, boolean[][] used, TrieNode node,
                           StringBuilder path, int r, int c, List<String> found) {
    if (r < 0 || r >= board.length || c < 0 || c >= board[0].length || used[r][c]) {
        return;
    }
    char letter = board[r][c];
    if (!node.hasChild(letter)) {
        return; // no word can continue with this letter
    }
    TrieNode next = node.child(letter);
    used[r][c] = true;
    path.append(letter);

    if (next.isEndOfWord) {
        found.add(path.toString());
        next.isEndOfWord = false; // report every word only once
    }

    search(board, used, next, path, r + 1, c, found);
    search(board, used, next, path, r - 1, c, found);
    search(board, used, next, path, r, c + 1, found);
    search(board, used, next, path, r, c - 1, found);

    path.setLength(path.length() - 1); // backtrack
    used[r][c] = false;                // backtrack
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(rows · cols · L) | \`L\` = the length of the longest word; each search path is bounded by \`L\` |
| **Space** | O(total characters of the dictionary) | The trie, plus O(rows · cols) for the \`used\` grid |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Search for one word instead of many."* → the plain backtracking version, O(4^(r·c)).
- *"Why is the trie version faster?"* → the words share prefixes, so the trie shares
  that work; the search only explores paths that can still complete a word.
- *"How would you handle a board that is updated between queries?"* → the trie stays
  valid, only the \`used\` grid is reset.
- *"What if the words contain \`*\`?"* → that is regular-expression matching, not a trie
  problem.

**Common mistakes:**
- ❌ Not removing a found word → it is reported several times.
- ❌ Forgetting to unmark the cell on the way back → the search cannot reuse a cell.
- ❌ Building the path with string concatenation → O(L²) per path; use a \`StringBuilder\`.
- ❌ Searching only from the top-left corner → the word can start anywhere.

**How to narrate:**
> "Searching every word separately repeats a lot of work, because the words share
> prefixes. So I put the dictionary in a trie and start a DFS from every cell. The DFS
> only follows trie edges, so a branch dies as soon as the letters cannot lead to a
> word. When a word is found I clear its end flag, which reports it once and prunes
> the trie for the rest of the search."

## Related Problems

- [Implement Trie](./ImplementTrie.java) — the trie itself
- [Design Add and Search Words](./DesignAddAndSearchWords.java) — wildcard search in a trie
- [Word Search](./WordSearchII.java) — the single-word version of the same search
`,i=[`findWords`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};