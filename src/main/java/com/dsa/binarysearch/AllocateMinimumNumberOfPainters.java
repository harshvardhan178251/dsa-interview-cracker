package com.dsa.binarysearch;

import com.dsa.utils.FastScanner;

/**
 * Problem: Allocate Minimum Number of Painters
 * LeetCode: null (classic "painter's partition" problem) | Difficulty: Hard | Frequency: 3/5
 * Pattern: Binary search on the answer
 *
 * <p>Problem:
 * There are {@code n} boards of lengths {@code boards[0..n-1]} and {@code k} painters. Each
 * painter paints one continuous run of boards and takes exactly as much time as the total
 * length of the boards assigned to them. All painters work in parallel, so the total time is
 * the largest workload of any single painter. Return the minimum possible time.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * boards[0] boards[1] ... boards[n-1]
 * k
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 10 10 10 10
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 20
 * </pre>
 *
 * <p>Approach: binary search the maximum workload a single painter may be given. The lower
 * bound is the longest board (it cannot be split) and the upper bound is the sum of all
 * lengths (one painter does everything). The greedy feasibility check packs as many boards as
 * possible into the current painter's run; the number of painters needed is monotone in the
 * limit, so binary search finds the smallest limit that needs at most {@code k} painters.
 *
 * <p>Complexity: Time O(n log(sum(boards))), Space O(1).
 */
public class AllocateMinimumNumberOfPainters {

    /**
     * Returns the minimum time needed for {@code painters} painters to paint every board.
     *
     * @param boards   the board lengths, in painting order
     * @param painters the number of painters available
     * @return the minimum possible makespan
     */
    public static int minTimeToPaint(int[] boards, int painters) {
        long low = 0;
        long high = 0;
        for (int board : boards) {
            low = Math.max(low, board);
            high += board;
        }
        while (low < high) {
            long mid = low + (high - low) / 2;
            if (paintersNeeded(boards, mid) <= painters) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }
        return (int) low;
    }

    /** Painters required when no single painter may exceed {@code limit} work. */
    private static int paintersNeeded(int[] boards, long limit) {
        int painters = 1;
        long load = 0;
        for (int board : boards) {
            if (load + board > limit) {
                painters++;
                load = 0;
            }
            load += board;
        }
        return painters;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] boards = fs.nextIntArray(n);
        int painters = fs.nextInt();

        System.out.println(minTimeToPaint(boards, painters));
    }
}
