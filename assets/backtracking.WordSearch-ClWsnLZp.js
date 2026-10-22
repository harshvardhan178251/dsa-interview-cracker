var e=`backtracking.WordSearch`,t=`package com.dsa.backtracking;

import com.dsa.utils.FastScanner;

/**
 * Problem: Word Search
 * LeetCode: 79 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Backtracking, DFS on a grid
 *
 * <p>Problem: Decide whether a word exists in the board, where the letters of the word have to be neighbours horizontally or vertically.
 *
 * <p>Input format (stdin):
 * <pre>
 * rows cols
 * board[0]
 * board[1]
 * ...
 * board[rows-1]
 * word
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3 4
 * ABCE
 * SFCS
 * ADEE
 * ABCCED
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * </pre>
 *
 * <p>Approach: Start a depth-first search from every cell and walk the word, marking the cells that are already used.
 *
 * <p>Complexity: Time O(rows x cols x 4^L), Space O(rows x cols).
 */
public class WordSearch {

    /**
     * Decides whether {@code word} exists in {@code board}.
     *
     * <p>The letters of the word have to be neighbours horizontally or vertically, and every cell may be
     * used only once. The cell that is currently taken is marked in the board itself and released again
     * when the branch is finished.
     *
     * @param board the grid of characters
     * @param word  the word to look for
     * @return {@code true} when the word exists in the board
     */
    public static boolean exist(char[][] board, String word) {
        if (board.length == 0 || board[0].length == 0) {
            return false;
        }
        for (int row = 0; row < board.length; row++) {
            for (int col = 0; col < board[0].length; col++) {
                if (search(board, row, col, 0, word)) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Walks the word from one cell.
     *
     * @param board the grid, the taken cell is marked while the search stands on it
     * @param row   the current row
     * @param col   the current column
     * @param index the index of the letter that has to be matched
     * @param word  the word to look for
     * @return {@code true} when the rest of the word was found
     */
    private static boolean search(char[][] board, int row, int col, int index, String word) {
        if (row < 0 || row >= board.length || col < 0 || col >= board[0].length) {
            return false; // outside the board
        }
        if (board[row][col] != word.charAt(index)) {
            return false; // the letter does not match
        }
        if (index == word.length() - 1) {
            return true; // the last letter matched
        }

        char taken = board[row][col];
        board[row][col] = '\\0'; // the cell is used by this path
        boolean found = search(board, row + 1, col, index + 1, word)
                || search(board, row - 1, col, index + 1, word)
                || search(board, row, col + 1, index + 1, word)
                || search(board, row, col - 1, index + 1, word);
        board[row][col] = taken; // backtrack
        return found;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int rows = fs.nextInt();
        int cols = fs.nextInt();
        char[][] board = new char[rows][cols];
        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {
                board[row][col] = fs.nextChar();
            }
        }
        String word = fs.next();

        System.out.println(exist(board, word) ? 1 : 0);
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Word Search
 * LeetCode: 79 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Backtracking, DFS on a grid
 *
 * <p>Problem: Decide whether a word exists in the board, where the letters of the word have to be neighbours horizontally or vertically.
 *
 * <p>Input format (stdin):
 * <pre>
 * rows cols
 * board[0]
 * board[1]
 * ...
 * board[rows-1]
 * word
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3 4
 * ABCE
 * SFCS
 * ADEE
 * ABCCED
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * </pre>
 *
 * <p>Approach: Start a depth-first search from every cell and walk the word, marking the cells that are already used.
 *
 * <p>Complexity: Time O(rows x cols x 4^L), Space O(rows x cols).
 */
public class Main {

    /**
     * Decides whether {@code word} exists in {@code board}.
     *
     * <p>The letters of the word have to be neighbours horizontally or vertically, and every cell may be
     * used only once. The cell that is currently taken is marked in the board itself and released again
     * when the branch is finished.
     *
     * @param board the grid of characters
     * @param word  the word to look for
     * @return {@code true} when the word exists in the board
     */
    public static boolean exist(char[][] board, String word) {
        if (board.length == 0 || board[0].length == 0) {
            return false;
        }
        for (int row = 0; row < board.length; row++) {
            for (int col = 0; col < board[0].length; col++) {
                if (search(board, row, col, 0, word)) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Walks the word from one cell.
     *
     * @param board the grid, the taken cell is marked while the search stands on it
     * @param row   the current row
     * @param col   the current column
     * @param index the index of the letter that has to be matched
     * @param word  the word to look for
     * @return {@code true} when the rest of the word was found
     */
    private static boolean search(char[][] board, int row, int col, int index, String word) {
        if (row < 0 || row >= board.length || col < 0 || col >= board[0].length) {
            return false; // outside the board
        }
        if (board[row][col] != word.charAt(index)) {
            return false; // the letter does not match
        }
        if (index == word.length() - 1) {
            return true; // the last letter matched
        }

        char taken = board[row][col];
        board[row][col] = '\\0'; // the cell is used by this path
        boolean found = search(board, row + 1, col, index + 1, word)
                || search(board, row - 1, col, index + 1, word)
                || search(board, row, col + 1, index + 1, word)
                || search(board, row, col - 1, index + 1, word);
        board[row][col] = taken; // backtrack
        return found;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int rows = fs.nextInt();
        int cols = fs.nextInt();
        char[][] board = new char[rows][cols];
        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {
                board[row][col] = fs.nextChar();
            }
        }
        String word = fs.next();

        System.out.println(exist(board, word) ? 1 : 0);
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
`,r='\n# Word Search — LeetCode 79\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Backtracking · DFS on a grid |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Uber |\n\n## Problem Statement\n\nGiven an `m × n` board of characters and a word, find whether the word **exists** in the board.\n\nThe word must be built from letters of **adjacent** cells — horizontally or vertically, not diagonally — and every cell may be used **at most once**.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nrows cols\nboard[0]\nboard[1]\n...\nboard[rows-1]\nword\n```\n\n- `rows` — number of rows (1 ≤ rows ≤ 20)\n- `cols` — number of columns (1 ≤ cols ≤ 20)\n- the next `rows` lines are the rows of the board, each holding `cols` characters\n- the last line is the word to look for\n\n## Sample Input\n\n```\n3 4\nABCE\nSFCS\nADEE\nABCCED\n```\n\n## Expected Output\n\n```\n1\n```\n\nThe path `A(0,0) → B(0,1) → C(0,2) → C(1,2) → E(2,2) → D(2,1)` spells `ABCCED` → **1**.\n\n## Approach\n\nA depth-first search with backtracking:\n\n1. Try every cell as the start of the word.\n2. In the search, check that the current cell is inside the board and that its letter is the    letter the word expects at that position.\n3. If it is the **last** letter, the word was found.\n4. Otherwise mark the cell as used (`\\0`), recurse into the four neighbours, and **unmark** the    cell afterwards — that is the backtrack.\n\n**Why the cell has to be marked.** A cell may only be used once, so the search must not walk back onto a cell that the current path already uses. Marking the cell in the board itself is the simplest way to do that — and the mark is removed again when the branch is finished.\n\n**Why the first letter is not marked.** The check for the last letter happens before the mark, so a one-letter word is found correctly.\n\n## Dry Run\n\nInput: board\n\n```\nA B C E\nS F C S\nA D E E\n```\n\nword = `ABCCED`. The search starts at `(0,0)` because it is the first cell with the letter `A`.\n\n| step | cell | letter | matches the word? | mark |\n|---:|---|---|---|---|\n| 1 | `(0,0)` | `A` | yes — `A` | `(0,0)` taken |\n| 2 | `(0,1)` | `B` | yes — `B` | `(0,1)` taken |\n| 3 | `(0,2)` | `C` | yes — `C` | `(0,2)` taken |\n| 4 | `(1,2)` | `C` | yes — `C` | `(1,2)` taken |\n| 5 | `(2,2)` | `E` | yes — `E` | `(2,2)` taken |\n| 6 | `(2,1)` | `D` | yes — `D` — the last letter | the whole word is found |\n\nThe neighbours that were rejected on the way:\n\n| from | neighbour | letter | why it was rejected |\n|---|---|---|---|\n| `(0,0)` | `(1,0)` | `S` | does not match `B` |\n| `(0,1)` | `(1,1)` | `F` | does not match `C` |\n| `(0,2)` | `(0,3)` | `E` | does not match `C` |\n| `(1,2)` | `(1,1)` | `F` | does not match `E` |\n| `(2,2)` | `(2,3)` | `E` | does not match `D` |\n\nThe path worked on the first try → answer **1**.\n\n**A backtracking example.** With the word `ABCB` the search walks `A(0,0) → B(0,1) → C(0,2)` and then needs another `B`. The neighbours of `(0,2)` are `E(0,3)` and `C(1,2)` — neither is a `B`, and `(0,1)` is already taken by the path. So the search backtracks to `(0,1)` and tries `(1,1)` (an `F`), then gives up on this start cell and continues with the next `A`.\n\n**The mark is what makes that work.** Without the mark the search could walk `A → B → C → … → B` through the same cell twice, which the rules forbid.\n\n## Java Solution\n\nSee [`WordSearch.java`](./WordSearch.java).\n\n```java\n    public static boolean exist(char[][] board, String word) {\n        if (board.length == 0 || board[0].length == 0) {\n            return false;\n        }\n        for (int row = 0; row < board.length; row++) {\n            for (int col = 0; col < board[0].length; col++) {\n                if (search(board, row, col, 0, word)) {\n                    return true;\n                }\n            }\n        }\n        return false;\n    }\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(rows · cols · 4^L) | every cell starts a search of at most `4^L` paths, where `L` is the length of the word |\n| **Space** | O(rows · cols) | the recursion stack is at most `L` deep and the board stores the marks |\n\n**Space `O(rows · cols)`** for the board and the recursion stack. The board is modified during the search and restored afterwards.\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n\n- "What if the word may also move diagonally?"* → add the four diagonal neighbours to the search.\n- "What if the word may be reused?"* → drop the marking of the cells.\n- "How do you find all words of a dictionary?"* → [Word Search II](./WordSearch.java) with a trie; that is the follow-up this problem usually leads to.\n- "How do you make it faster?"* → prune the search when the remaining letters of the word do not occur in the board at all.\n\n**Common mistakes:**\n\n- ❌ Forgetting to unmark the cell after the recursive calls — the other start cells would fail.\n- ❌ Marking the cell before the "last letter" check — a one-letter word would never be found.\n- ❌ Allowing diagonal moves.\n- ❌ Forgetting that the same cell may not be used twice in the same path.\n\n**How to narrate:**\n\n> "I try every cell as the start of the word and walk the word with a depth-first search. The important detail is the mark: while the search stands on a cell it is taken, so the search cannot walk onto it twice — and when the branch is finished I release the cell again. That is the backtrack."\n\n## Related Problems\n\n- [Letter Combinations of a Phone Number — LeetCode 17](./LetterCombinationsOfAPhoneNumber.java) — the same skeleton without a grid\n- [GridUniquePathsIII — LeetCode 980](../dynamicprogramming/GridUniquePathsIII.java) — a grid walk that has to cover every cell\n',i=[`exist`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};