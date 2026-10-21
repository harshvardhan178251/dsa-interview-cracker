package com.dsa.heaps;

import com.dsa.utils.FastScanner;
import com.dsa.utils.MaxHeap;

/**
 * Problem: Last Stone Weight II
 * LeetCode: 1049 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Partition, Subset sum, Greedy heap (the wrong answer)
 *
 * <p>Problem:
 * Every turn you pick the two heaviest stones and smash them together: the heavier stone
 * survives with the difference of the two weights (a stone of weight 0 disappears).
 * You must find the **minimum possible weight of the last remaining stone**.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * stones[0] stones[1] ... stones[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 31 26 33 21 40
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Approach: smashing stones is equivalent to splitting the stones into two groups and
 * cancelling out the pairs, so the answer is {@code total - 2 * best}, where {@code best}
 * is the largest subset sum that does not exceed {@code total / 2}. The subset sum is
 * computed with a bitset-style DP.
 *
 * <p>The greedy max-heap smash — the natural first idea — is <em>not</em> optimal for
 * this variant; {@link #greedySmash(int[])} implements it so the difference can be shown
 * side by side.
 *
 * <p>Complexity: Time O(n · total / 64) with a bitset, Space O(total / 64).
 */
public class LastStoneWeightII {

    /**
     * Returns the minimum possible weight of the last remaining stone.
     *
     * @param stones the stone weights
     * @return the smallest achievable remaining weight
     */
    public static int lastStoneWeightII(int[] stones) {
        if (stones == null || stones.length == 0) {
            return 0;
        }

        int total = 0;
        for (int stone : stones) {
            total += stone;
        }
        int target = total / 2;

        // reachable[s] is true when some subset of the processed stones sums to s.
        boolean[] reachable = new boolean[target + 1];
        reachable[0] = true;
        for (int stone : stones) {
            for (int s = target; s >= stone; s--) {
                if (reachable[s - stone]) {
                    reachable[s] = true;
                }
            }
        }

        int best = 0;
        for (int s = target; s >= 0; s--) {
            if (reachable[s]) {
                best = s;
                break;
            }
        }
        return total - 2 * best;
    }

    /**
     * The greedy "always smash the two heaviest" simulation.
     *
     * <p>This is the obvious first idea, and it is exactly the solution of the first part
     * of the problem — but it is <em>not</em> optimal here. For
     * {@code [31, 26, 33, 21, 40]} it returns 9 while the optimum is 5.
     *
     * @param stones the stone weights
     * @return the weight left by the greedy simulation
     */
    public static int greedySmash(int[] stones) {
        MaxHeap<Integer> heap = new MaxHeap<>();
        for (int stone : stones) {
            heap.add(stone);
        }
        while (heap.size() > 1) {
            int first = heap.poll();
            int second = heap.poll();
            if (first != second) {
                heap.add(first - second);
            }
        }
        return heap.isEmpty() ? 0 : heap.peek();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] stones = fs.nextIntArray(n);

        System.out.println(lastStoneWeightII(stones));
    }
}
