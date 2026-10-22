var e=`backtracking.FloodFill`,t=`package com.dsa.backtracking;

import com.dsa.utils.FastScanner;

/**
 * Problem: Flood Fill
 * LeetCode: 733 | Difficulty: Easy | Frequency: 3/5
 * Pattern: DFS on a grid, Flood fill
 *
 * <p>Problem: Recolour every pixel that is connected to the starting pixel and has the same original colour.
 *
 * <p>Input format (stdin):
 * <pre>
 * rows cols
 * image[0][0] image[0][1] ... image[rows-1][cols-1]
 * sr sc color
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3 3
 * 1 1 1 1 1 0 1 0 1
 * 1 1 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2 2 2
 * 2 2 0
 * 2 0 1
 * </pre>
 *
 * <p>Approach: Start a depth-first search at the given pixel and spread the new colour over the connected component of the original colour.
 *
 * <p>Complexity: Time O(rows x cols), Space O(rows x cols).
 */
public class FloodFill {

    /**
     * Recolours the connected component of the starting pixel.
     *
     * <p>Every pixel that is connected to {@code (sr, sc)} -- through neighbours with the same colour -- ' +
      'gets the new colour. The pixels are recoloured while the search runs, so a pixel is never ' +
      'visited twice.
     *
     * @param image the grid of pixels
     * @param sr    the row of the starting pixel
     * @param sc    the column of the starting pixel
     * @param color the new colour
     * @return the recoloured image
     */
    public static int[][] floodFill(int[][] image, int sr, int sc, int color) {
        if (image.length == 0 || image[0].length == 0) {
            return image;
        }
        int original = image[sr][sc];
        if (original == color) {
            return image; // nothing would change
        }
        fill(image, sr, sc, original, color);
        return image;
    }

    /**
     * Spreads the new colour over the connected component.
     *
     * @param image    the grid of pixels
     * @param row     the current row
     * @param col     the current column
     * @param original the colour of the component
     * @param color   the new colour
     */
    private static void fill(int[][] image, int row, int col, int original, int color) {
        if (row < 0 || row >= image.length || col < 0 || col >= image[0].length) {
            return; // outside the grid
        }
        if (image[row][col] != original) {
            return; // a different colour: the flood does not reach it
        }
        image[row][col] = color; // recolour and spread from here
        fill(image, row + 1, col, original, color);
        fill(image, row - 1, col, original, color);
        fill(image, row, col + 1, original, color);
        fill(image, row, col - 1, original, color);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int rows = fs.nextInt();
        int cols = fs.nextInt();
        int[][] image = new int[rows][cols];
        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {
                image[row][col] = fs.nextInt();
            }
        }
        int sr = fs.nextInt();
        int sc = fs.nextInt();
        int color = fs.nextInt();

        int[][] result = floodFill(image, sr, sc, color);

        StringBuilder out = new StringBuilder();
        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {
                if (col > 0) {
                    out.append(' ');
                }
                out.append(result[row][col]);
            }
            out.append('\\n');
        }
        System.out.print(out);
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Flood Fill
 * LeetCode: 733 | Difficulty: Easy | Frequency: 3/5
 * Pattern: DFS on a grid, Flood fill
 *
 * <p>Problem: Recolour every pixel that is connected to the starting pixel and has the same original colour.
 *
 * <p>Input format (stdin):
 * <pre>
 * rows cols
 * image[0][0] image[0][1] ... image[rows-1][cols-1]
 * sr sc color
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3 3
 * 1 1 1 1 1 0 1 0 1
 * 1 1 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2 2 2
 * 2 2 0
 * 2 0 1
 * </pre>
 *
 * <p>Approach: Start a depth-first search at the given pixel and spread the new colour over the connected component of the original colour.
 *
 * <p>Complexity: Time O(rows x cols), Space O(rows x cols).
 */
public class Main {

    /**
     * Recolours the connected component of the starting pixel.
     *
     * <p>Every pixel that is connected to {@code (sr, sc)} -- through neighbours with the same colour -- ' +
      'gets the new colour. The pixels are recoloured while the search runs, so a pixel is never ' +
      'visited twice.
     *
     * @param image the grid of pixels
     * @param sr    the row of the starting pixel
     * @param sc    the column of the starting pixel
     * @param color the new colour
     * @return the recoloured image
     */
    public static int[][] floodFill(int[][] image, int sr, int sc, int color) {
        if (image.length == 0 || image[0].length == 0) {
            return image;
        }
        int original = image[sr][sc];
        if (original == color) {
            return image; // nothing would change
        }
        fill(image, sr, sc, original, color);
        return image;
    }

    /**
     * Spreads the new colour over the connected component.
     *
     * @param image    the grid of pixels
     * @param row     the current row
     * @param col     the current column
     * @param original the colour of the component
     * @param color   the new colour
     */
    private static void fill(int[][] image, int row, int col, int original, int color) {
        if (row < 0 || row >= image.length || col < 0 || col >= image[0].length) {
            return; // outside the grid
        }
        if (image[row][col] != original) {
            return; // a different colour: the flood does not reach it
        }
        image[row][col] = color; // recolour and spread from here
        fill(image, row + 1, col, original, color);
        fill(image, row - 1, col, original, color);
        fill(image, row, col + 1, original, color);
        fill(image, row, col - 1, original, color);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int rows = fs.nextInt();
        int cols = fs.nextInt();
        int[][] image = new int[rows][cols];
        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {
                image[row][col] = fs.nextInt();
            }
        }
        int sr = fs.nextInt();
        int sc = fs.nextInt();
        int color = fs.nextInt();

        int[][] result = floodFill(image, sr, sc, color);

        StringBuilder out = new StringBuilder();
        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {
                if (col > 0) {
                    out.append(' ');
                }
                out.append(result[row][col]);
            }
            out.append('\\n');
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
`,r=`
# Flood Fill — LeetCode 733

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | DFS on a grid · Flood fill |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

An image is given as a grid of pixel values. Starting from the pixel \`image[sr][sc]\`, replace the colour of every pixel that is **4-directionally connected** to it and has the **same original colour**.

Return the recoloured image.

## Input Format

The program reads from standard input:

\`\`\`
rows cols
image[0][0] image[0][1] ... image[rows-1][cols-1]
sr sc color
\`\`\`

- \`rows\` — number of rows (1 ≤ rows ≤ 20)
- \`cols\` — number of columns (1 ≤ cols ≤ 20)
- the next \`rows * cols\` integers are the pixel values, read row by row
- \`sr\` — the row of the starting pixel (0 ≤ sr < rows)
- \`sc\` — the column of the starting pixel (0 ≤ sc < cols)
- \`color\` — the new colour (0 ≤ color ≤ 65535)

## Sample Input

\`\`\`
3 3
1 1 1 1 1 0 1 0 1
1 1 2
\`\`\`

## Expected Output

\`\`\`
2 2 2
2 2 0
2 0 1
\`\`\`

The pixels that are connected to \`(1,1)\` and have the colour \`1\` become \`2\`; the pixels with the colour \`0\` stay untouched.

## Approach

A flood fill is a depth-first search over the connected component:

1. Remember the original colour of the starting pixel.
2. If the new colour is the same as the original one, nothing changes — return the image    immediately. (Without this check the search would run forever, because every pixel would be    "the original colour" again after the recolouring.)
3. Recolor the pixel and recurse into the four neighbours. A neighbour is only visited when it    still has the **original** colour.

**Why no visited array is needed.** The recolouring itself is the mark: a pixel that already has the new colour no longer matches the original colour, so the search never steps on it twice.

**Why the original colour is remembered.** The check has to be against the colour the component had *before* the flood, not against the new colour — otherwise a pixel that was already \`color\` would be swallowed.

## Dry Run

Input: \`image = [[1,1,1],[1,1,0],[1,0,1]]\`, start \`(1,1)\`, new colour \`2\`.

| step | pixel | value before | value after | neighbours that are flooded |
|---:|---|---:|---:|---|
| 1 | \`(1,1)\` | 1 | **2** | \`(0,1)\`, \`(2,1)\` is \`0\` → stop, \`(1,0)\`, \`(1,2)\` is \`0\` → stop |
| 2 | \`(0,1)\` | 1 | **2** | \`(0,0)\`, \`(0,2)\` |
| 3 | \`(1,0)\` | 1 | **2** | \`(0,0)\`, \`(2,0)\` |
| 4 | \`(0,0)\` | 1 | **2** | — (the other neighbours are already \`2\`) |
| 5 | \`(0,2)\` | 1 | **2** | — |
| 6 | \`(2,0)\` | 1 | **2** | — |

The pixels \`(0,2)\` and \`(2,0)\` are reachable through \`(0,1)\` and \`(1,0)\`; the \`0\` pixels are not flooded because they have a different colour.

**The grid while the flood runs:**

\`\`\`
1 1 1      1 2 1      2 2 2      2 2 2      2 2 2
1 1 0  ->  1 2 0  ->  2 2 0  ->  2 2 0  ->  2 2 0
1 0 1      1 0 1      1 0 1      1 0 1      2 0 1
\`\`\`

**Why the start colour is remembered.** The check is \`image[row][col] != original\`, not \`!= color\`. If the check used the new colour, a pixel that already had the new colour would be flooded as well — and the search would never terminate on a grid that already contains the new colour.

**Why the same-colour case returns immediately.** If the start pixel already has the new colour, the whole component would be "flooded" with the colour it already has — the result is the same grid, and the early return saves the work.

**The final grid**

\`\`\`
2 2 2
2 2 0
2 0 1
\`\`\`

## Java Solution

See [\`FloodFill.java\`](./FloodFill.java).

\`\`\`java
    public static int[][] floodFill(int[][] image, int sr, int sc, int color) {
        if (image.length == 0 || image[0].length == 0) {
            return image;
        }
        int original = image[sr][sc];
        if (original == color) {
            return image;
        }
        fill(image, sr, sc, original, color);
        return image;
    }
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(rows · cols) | every pixel is recoloured at most once |
| **Space** | O(rows · cols) | the recursion stack is at most \`rows * cols\` deep |

**Space \`O(rows · cols)\`** in the worst case, because the recursion follows a snake-like path through the grid. An explicit stack (iterative DFS) has the same worst case; a BFS queue would usually be smaller.

## Interview Notes

**Follow-ups to raise yourself:**

- "What if the diagonal neighbours count as well?"* → add the four diagonal directions.
- "What if there are several starting pixels?"* → call the fill once per start pixel.
- "Can you do it without recursion?"* → yes, with an explicit stack (or a queue for BFS).
- "How would you count the size of the component?"* → count the pixels you recolour.

**Common mistakes:**

- ❌ Comparing the neighbour against the **new** colour instead of the original one — the flood would leak into pixels that already had the new colour.
- ❌ Forgetting the early return when the start colour equals the new colour — the search would never terminate.
- ❌ Forgetting the bounds check — the search would walk out of the grid.

**How to narrate:**

> "A flood fill is a depth-first search over the connected component. I remember the original colour of the start pixel, and then spread the new colour to every neighbour that still has the original colour. The recolouring itself is the visited mark, so no extra array is needed — but I have to compare against the *original* colour, not the new one, and I return early when the two are the same."

## Related Problems

- [Word Search — LeetCode 79](./WordSearch.java) — the same grid search with backtracking
- [GridUniquePathsIII — LeetCode 980](../dynamicprogramming/GridUniquePathsIII.java) — a grid walk that has to cover every cell
`,i=[`floodFill`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};