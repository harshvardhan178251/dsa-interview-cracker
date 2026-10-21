package com.dsa.greedy;

import com.dsa.utils.FastScanner;
import com.dsa.utils.Interval;

import java.util.Arrays;

/**
 * Problem: Maximum Profit Scheduling Jobs
 * LeetCode: none (classic weighted interval scheduling) | Difficulty: Medium | Frequency: 3/5
 * Pattern: Greedy sorting, weighted interval scheduling
 *
 * <p>Problem:
 * Every job {@code i} occupies the half-open time span {@code [start[i], end[i])} and pays
 * {@code profit[i]}. A machine can run one job at a time. Return the largest total
 * profit obtainable.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * start[0] end[0] profit[0]
 * start[1] end[1] profit[1]
 * ...
 * start[n-1] end[n-1] profit[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 1 3 50
 * 2 5 20
 * 3 6 60
 * 4 7 30
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 110
 * </pre>
 *
 * <p>Approach: sort the jobs by finishing time. Process them in that order and keep
 * {@code dp[i]}, the best profit obtainable from the first {@code i} sorted jobs. For
 * the {@code i}-th job either skip it ({@code dp[i-1]}) or take it — in which case
 * every earlier job that finishes at or before its start has to be dropped, which is
 * exactly the prefix {@code dp[compatible]}.
 *
 * <p>Complexity: Time O(n log n), Space O(n).
 */
public class SchedulingMaximumProfit {

    /**
     * Returns the maximum total profit of a non-overlapping set of jobs.
     *
     * @param jobs    time span of every job, half-open {@code [start, end)}
     * @param profits profit of every job, parallel to {@code jobs}
     * @return the maximum total profit
     */
    public static int maxProfit(Interval[] jobs, int[] profits) {
        if (jobs == null || profits == null || jobs.length == 0) {
            return 0;
        }
        int n = jobs.length;
        Integer[] order = new Integer[n];
        for (int i = 0; i < n; i++) {
            order[i] = i;
        }
        Arrays.sort(order, (a, b) -> {
            int byEnd = Integer.compare(jobs[a].end, jobs[b].end);
            return byEnd != 0 ? byEnd : Integer.compare(jobs[a].start, jobs[b].start);
        });

        int[] ends = new int[n];
        for (int i = 0; i < n; i++) {
            ends[i] = jobs[order[i]].end;
        }

        int[] dp = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            Interval job = jobs[order[i - 1]];
            int profit = profits[order[i - 1]];

            // how many of the earlier jobs finish at or before this job starts
            int lo = 0;
            int hi = i - 2;
            int compatible = 0;
            while (lo <= hi) {
                int mid = (lo + hi) / 2;
                if (ends[mid] <= job.start) {
                    compatible = mid + 1;
                    lo = mid + 1;
                } else {
                    hi = mid - 1;
                }
            }
            dp[i] = Math.max(dp[i - 1], profit + dp[compatible]);
        }
        return dp[n];
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        Interval[] jobs = new Interval[n];
        int[] profits = new int[n];
        for (int i = 0; i < n; i++) {
            int start = fs.nextInt();
            int end = fs.nextInt();
            jobs[i] = new Interval(start, end);
            profits[i] = fs.nextInt();
        }

        System.out.println(maxProfit(jobs, profits));
    }
}
