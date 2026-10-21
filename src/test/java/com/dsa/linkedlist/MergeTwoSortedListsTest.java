package com.dsa.linkedlist;

import com.dsa.utils.ListNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertSame;

class MergeTwoSortedListsTest {

    @Test
    void mergesTheHappyPath() {
        ListNode merged = MergeTwoSortedLists.mergeTwoLists(ListNode.of(1, 2, 4), ListNode.of(1, 3, 4));
        assertArrayEquals(new int[]{1, 1, 2, 3, 4, 4}, merged.toArray());
    }

    @Test
    void mergesWhenOneListIsEmpty() {
        assertArrayEquals(new int[]{1, 2}, MergeTwoSortedLists.mergeTwoLists(ListNode.of(1, 2), null).toArray());
        assertArrayEquals(new int[]{1, 2}, MergeTwoSortedLists.mergeTwoLists(null, ListNode.of(1, 2)).toArray());
    }

    @Test
    void mergesTwoEmptyLists() {
        assertNull(MergeTwoSortedLists.mergeTwoLists(null, null));
    }

    @Test
    void handlesDuplicateValues() {
        assertArrayEquals(new int[]{1, 1, 1, 1},
                MergeTwoSortedLists.mergeTwoLists(ListNode.of(1, 1), ListNode.of(1, 1)).toArray());
    }

    @Test
    void handlesNegativeValues() {
        assertArrayEquals(new int[]{-5, -1, 0, 7},
                MergeTwoSortedLists.mergeTwoLists(ListNode.of(-5, 0), ListNode.of(-1, 7)).toArray());
    }

    @Test
    void handlesASingleNodeOnEachSide() {
        assertArrayEquals(new int[]{1, 2}, MergeTwoSortedLists.mergeTwoLists(ListNode.of(1), ListNode.of(2)).toArray());
    }

    @Test
    void reusesTheOriginalNodes() {
        ListNode a = ListNode.of(1, 3);
        ListNode b = ListNode.of(2);
        ListNode merged = MergeTwoSortedLists.mergeTwoLists(a, b);
        assertSame(a, merged);
        assertSame(b, merged.next);
    }
}
