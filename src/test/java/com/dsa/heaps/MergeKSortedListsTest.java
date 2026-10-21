package com.dsa.heaps;

import com.dsa.utils.ListNode;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

class MergeKSortedListsTest {

    @Test
    void mergesThreeSortedLists() {
        ListNode[] lists = {
                ListNode.fromArray(new int[]{1, 4, 5, 6}),
                ListNode.fromArray(new int[]{1, 3, 4}),
                ListNode.fromArray(new int[]{2, 6})
        };
        assertArrayEquals(new int[]{1, 1, 2, 3, 4, 4, 5, 6, 6},
                MergeKSortedLists.mergeToArray(lists));
    }

    @Test
    void mergesTwoLists() {
        ListNode[] lists = {
                ListNode.fromArray(new int[]{1, 2, 3}),
                ListNode.fromArray(new int[]{1, 4, 5})
        };
        assertArrayEquals(new int[]{1, 1, 2, 3, 4, 5}, MergeKSortedLists.mergeToArray(lists));
    }

    @Test
    void singleListIsReturnedUnchanged() {
        ListNode[] lists = {ListNode.fromArray(new int[]{1, 2, 3})};
        assertArrayEquals(new int[]{1, 2, 3}, MergeKSortedLists.mergeToArray(lists));
    }

    @Test
    void allListsEmpty() {
        assertArrayEquals(new int[0], MergeKSortedLists.mergeToArray(new ListNode[]{null, null}));
        assertNull(MergeKSortedLists.mergeKSortedLists(new ListNode[0]));
    }

    @Test
    void someListsEmpty() {
        ListNode[] lists = {null, ListNode.fromArray(new int[]{2, 3}), null};
        assertArrayEquals(new int[]{2, 3}, MergeKSortedLists.mergeToArray(lists));
    }

    @Test
    void duplicatesAreKept() {
        ListNode[] lists = {
                ListNode.fromArray(new int[]{1, 1, 1}),
                ListNode.fromArray(new int[]{1, 1})
        };
        assertArrayEquals(new int[]{1, 1, 1, 1, 1}, MergeKSortedLists.mergeToArray(lists));
    }

    @Test
    void negativeValuesAreSupported() {
        ListNode[] lists = {
                ListNode.fromArray(new int[]{-5, 0}),
                ListNode.fromArray(new int[]{-3, -1})
        };
        assertArrayEquals(new int[]{-5, -3, -1, 0}, MergeKSortedLists.mergeToArray(lists));
    }
}
