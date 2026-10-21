package com.dsa.graphs;

import com.dsa.utils.FastScanner;
import com.dsa.utils.UnionFind;

/**
 * Problem: Number of Provinces
 * LeetCode: 547 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Union-Find, connected components
 *
 * <p>Problem: A square matrix {@code isConnected} describes a graph: {@code isConnected[i][j] = 1}
 * means cities {@code i} and {@code j} are directly connected. Return the number of provinces,
 * i.e. the number of connected components.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * 0 1 0 0        (n lines, each with n space-separated 0/1 values)
 * ...
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 1 1 0
 * 1 1 0
 * 0 0 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: the matrix is symmetric, so every {@code 1} at {@code (i, j)} with {@code j > i}
 * is an edge. Feed those edges into a {@link UnionFind} and count the surviving sets.
 *
 * <p>Complexity: Time O(n² * alpha(n)), Space O(n) besides the matrix.
 */
public class NumberOfProvinces {

    /**
     * Counts the provinces in an adjacency matrix.
     *
     * @param isConnected {@code n x n} matrix, {@code 1} = directly connected
     * @return the number of connected components
     */
    public static int countProvinces(int[][] isConnected) {
        int n = isConnected.length;
        UnionFind uf = new UnionFind(n);
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (isConnected[i][j] == 1) {
                    uf.union(i, j);
                }
            }
        }
        return uf.components();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        int[][] isConnected = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                isConnected[i][j] = fs.nextInt();
            }
        }

        System.out.println(countProvinces(isConnected));
    }
}
