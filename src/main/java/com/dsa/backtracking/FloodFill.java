package com.dsa.backtracking;

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
            out.append('\n');
        }
        System.out.print(out);
    }
}
