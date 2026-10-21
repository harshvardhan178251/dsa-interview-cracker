package com.dsa.binarysearch;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class SearchInRotatedSortedArrayTest {

    @Test
    void findsATargetInTheSmallHalf() {
        assertEquals(4, SearchInRotatedSortedArray.search(new int[]{4, 5, 6, 7, 0, 1, 2}, 0));
    }

    @Test
    void findsATargetInTheLargeHalf() {
        assertEquals(2, SearchInRotatedSortedArray.search(new int[]{4, 5, 6, 7, 0, 1, 2}, 6));
    }

    @Test
    void findsATargetAtTheFirstAndLastIndex() {
        assertEquals(0, SearchInRotatedSortedArray.search(new int[]{4, 5, 6, 7, 0, 1, 2}, 4));
        assertEquals(6, SearchInRotatedSortedArray.search(new int[]{4, 5, 6, 7, 0, 1, 2}, 2));
    }

    @Test
    void returnsMinusOneWhenTheTargetIsAbsent() {
        assertEquals(-1, SearchInRotatedSortedArray.search(new int[]{4, 5, 6, 7, 0, 1, 2}, 3));
        assertEquals(-1, SearchInRotatedSortedArray.search(new int[]{4, 5, 6, 7, 0, 1, 2}, 8));
    }

    @Test
    void handlesASingleElementArray() {
        assertEquals(0, SearchInRotatedSortedArray.search(new int[]{1}, 1));
        assertEquals(-1, SearchInRotatedSortedArray.search(new int[]{1}, 2));
    }

    @Test
    void handlesAnArrayThatIsNotRotated() {
        assertEquals(2, SearchInRotatedSortedArray.search(new int[]{1, 2, 3, 4, 5}, 3));
        assertEquals(-1, SearchInRotatedSortedArray.search(new int[]{1, 2, 3, 4, 5}, 6));
    }

    @Test
    void agreesWithALinearScanOnManyRotations() {
        int[] sorted = {1, 3, 5, 7, 9, 11};
        for (int pivot = 0; pivot < sorted.length; pivot++) {
            int[] rotated = new int[sorted.length];
            for (int i = 0; i < sorted.length; i++) {
                rotated[i] = sorted[(i + pivot) % sorted.length];
            }
            for (int target = 0; target <= 12; target++) {
                int expected = -1;
                for (int i = 0; i < rotated.length; i++) {
                    if (rotated[i] == target) {
                        expected = i;
                        break;
                    }
                }
                assertEquals(expected, SearchInRotatedSortedArray.search(rotated, target),
                        "rotation " + pivot + ", target " + target);
            }
        }
    }
}
