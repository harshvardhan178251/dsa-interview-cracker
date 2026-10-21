package com.dsa.linkedlist;

import com.dsa.utils.ListNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

class RemoveDuplicatesFromSortedListIITest {

    @Test
    void removesDuplicateRuns() {
        assertArrayEquals(new int[]{1, 2, 5},
                RemoveDuplicatesFromSortedListII.deleteDuplicates(ListNode.of(1, 2, 3, 3, 4, 4, 5)).toArray());
    }

    @Test
    void keepsAListWithoutDuplicates() {
        assertArrayEquals(new int[]{1, 2, 3},
                RemoveDuplicatesFromSortedListII.deleteDuplicates(ListNode.of(1, 2, 3)).toArray());
    }

    @Test
    void removesEveryCopyOfADuplicatedValue() {
        assertArrayEquals(new int[]{2, 3},
                RemoveDuplicatesFromSortedListII.deleteDuplicates(ListNode.of(1, 1, 1, 2, 3)).toArray());
    }

    @Test
    void removesARunAtTheStart() {
        assertArrayEquals(new int[]{2, 3},
                RemoveDuplicatesFromSortedListII.deleteDuplicates(ListNode.of(1, 1, 2, 3)).toArray());
    }

    @Test
    void removesARunAtTheEnd() {
        assertArrayEquals(new int[]{1, 2},
                RemoveDuplicatesFromSortedListII.deleteDuplicates(ListNode.of(1, 2, 3, 3)).toArray());
    }

    @Test
    void removesEverythingWhenEveryValueIsDuplicated() {
        assertNull(RemoveDuplicatesFromSortedListII.deleteDuplicates(ListNode.of(1, 1, 2, 2)));
    }

    @Test
    void handlesASingleNode() {
        assertArrayEquals(new int[]{1},
                RemoveDuplicatesFromSortedListII.deleteDuplicates(ListNode.of(1)).toArray());
    }

    @Test
    void handlesAnEmptyList() {
        assertNull(RemoveDuplicatesFromSortedListII.deleteDuplicates(null));
    }
}
