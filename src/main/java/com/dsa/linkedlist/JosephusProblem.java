package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;

/**
 * Problem: Josephus Problem
 * Difficulty: Medium | Frequency: 3/5
 * Pattern: Recurrence, Simulation
 *
 * <p>Problem:
 * {@code n} people stand in a circle. Starting at person 0, every {@code k}-th person is
 * removed and the counting continues from the next person. Which person survives?
 * This program prints the **0-based index** of the survivor.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * k
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 7
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: the O(n) recurrence J(1) = 0, J(m) = (J(m - 1) + k) % m.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class JosephusProblem {

    /**
     * Returns the 0-based index of the survivor.
     *
     * @param n number of people (n &ge; 1)
     * @param k the counting step (k &ge; 1)
     * @return the index of the survivor
     */
    public static int josephus(int n, int k) {
        int survivor = 0;                 // J(1, k) = 0
        for (int size = 2; size <= n; size++) {
            survivor = (survivor + k) % size;
        }
        return survivor;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int k = fs.nextInt();

        System.out.println(josephus(n, k));
    }
}
