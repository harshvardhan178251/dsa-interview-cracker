package com.dsa.greedy;

import com.dsa.utils.Interval;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class SchedulingMaximumProfitTest {

    private static Interval[] jobs(int[][] specs) {
        Interval[] result = new Interval[specs.length];
        for (int i = 0; i < specs.length; i++) {
            result[i] = new Interval(specs[i][0], specs[i][1]);
        }
        return result;
    }

    @Test
    void takesTheTwoCompatibleJobs() {
        Interval[] jobs = jobs(new int[][]{{1, 3}, {2, 5}, {3, 6}, {4, 7}});
        assertEquals(110, SchedulingMaximumProfit.maxProfit(jobs, new int[]{50, 20, 60, 30}));
    }

    @Test
    void aSingleJobIsTakenWhenItIsTheOnlyOne() {
        Interval[] jobs = jobs(new int[][]{{1, 4}});
        assertEquals(7, SchedulingMaximumProfit.maxProfit(jobs, new int[]{7}));
    }

    @Test
    void overlappingJobsCannotBothBeTaken() {
        Interval[] jobs = jobs(new int[][]{{1, 5}, {2, 6}});
        assertEquals(10, SchedulingMaximumProfit.maxProfit(jobs, new int[]{10, 10}));
    }

    @Test
    void withoutJobsTheProfitIsZero() {
        assertEquals(0, SchedulingMaximumProfit.maxProfit(new Interval[]{}, new int[]{}));
    }

    @Test
    void theMoreProfitableJobWins() {
        Interval[] jobs = jobs(new int[][]{{1, 5}, {2, 6}});
        assertEquals(20, SchedulingMaximumProfit.maxProfit(jobs, new int[]{5, 20}));
    }

    @Test
    void jobsThatOnlyTouchCanBothBeTaken() {
        Interval[] jobs = jobs(new int[][]{{1, 3}, {3, 5}});
        assertEquals(9, SchedulingMaximumProfit.maxProfit(jobs, new int[]{4, 5}));
    }
}
