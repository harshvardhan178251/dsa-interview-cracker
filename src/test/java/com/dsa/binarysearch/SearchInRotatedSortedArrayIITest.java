package com.dsa.binarysearch;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class SearchInRotatedSortedArrayIITest {

    @Test
    void findsATarget() {
        assertTrue(SearchInRotatedSortedArrayII.search(new int[]{2, 5, 6, 0, 0, 1, 2}, 0));
        assertTrue(SearchInRotatedSortedArrayII.search(new int[]{2, 5, 6, 0, 0, 1, 2}, 5));
    }

    @Test
    void returnsFalseWhenTheTargetIsAbsent() {
        assertFalse(SearchInRotatedSortedArrayII.search(new int[]{2, 5, 6, 0, 0, 1, 2}, 7));
        assertFalse(SearchInRotatedSortedArrayII.search(new int[]{2, 5, 6, 0, 0, 1, 2}, 3));
    }

    @Test
    void handlesTheAmbiguousAllEqualCase() {
        assertTrue(SearchInRotatedSortedArrayII.search(new int[]{1, 0, 1, 1, 1}, 0));
        assertTrue(SearchInRotatedSortedArrayII.search(new int[]{1, 1, 1, 1, 1}, 1));
        assertFalse(SearchInRotatedSortedArrayII.search(new int[]{1, 1, 1, 1, 1}, 2));
    }

    @Test
    void handlesASingleElementArray() {
        assertTrue(SearchInRotatedSortedArrayII.search(new int[]{1}, 1));
        assertFalse(SearchInRotatedSortedArrayII.search(new int[]{1}, 2));
    }

    @Test
    void handlesAnArrayThatIsNotRotated() {
        assertTrue(SearchInRotatedSortedArrayII.search(new int[]{1, 2, 3, 4, 5}, 4));
        assertFalse(SearchInRotatedSortedArrayII.search(new int[]{1, 2, 3, 4, 5}, 0));
    }

    @Test
    void findsDuplicatesThatStraddleThePivot() {
        assertTrue(SearchInRotatedSortedArrayII.search(new int[]{1, 0, 1, 1, 1}, 0));
        assertTrue(SearchInRotatedSortedArrayII.search(new int[]{1, 1, 1, 0, 1}, 0));
    }
}
