package com.dsa.binarysearch;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class PeakElementTest {

    @Test
    void findsAPeakInTheMiddle() {
        assertEquals(2, PeakElement.peakElement(new int[]{1, 2, 3, 1, 2}));
    }

    @Test
    void findsAPeakAtTheEnd() {
        assertEquals(4, PeakElement.peakElement(new int[]{1, 2, 3, 4, 5}));
    }

    @Test
    void findsAPeakAtTheStart() {
        assertEquals(0, PeakElement.peakElement(new int[]{5, 4, 3, 2, 1}));
    }

    @Test
    void handlesASingleElementArray() {
        assertEquals(0, PeakElement.peakElement(new int[]{42}));
    }

    @Test
    void handlesATwoElementArray() {
        assertEquals(1, PeakElement.peakElement(new int[]{1, 2}));
        assertEquals(0, PeakElement.peakElement(new int[]{2, 1}));
    }

    @Test
    void theReturnedIndexReallyIsAPeak() {
        int[][] cases = {
                {1, 2, 3, 1, 2},
                {3, 2, 1},
                {1, 2},
                {1, 2, 3, 2, 1},
                {-3, -2, -5, -6, -2}
        };
        for (int[] nums : cases) {
            int index = PeakElement.peakElement(nums);
            boolean isPeak = (index == 0 || nums[index] > nums[index - 1])
                    && (index == nums.length - 1 || nums[index] > nums[index + 1]);
            assertTrue(isPeak, "index " + index + " is not a peak of " + java.util.Arrays.toString(nums));
        }
    }
}
