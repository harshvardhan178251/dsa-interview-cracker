package com.dsa.linkedlist;

import com.dsa.utils.ListNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

class MiddleOfTheLinkedListTest {

    @Test
    void findsTheMiddleOfAnOddLengthList() {
        ListNode middle = MiddleOfTheLinkedList.middleNode(ListNode.of(1, 2, 3, 4, 5));
        assertArrayEquals(new int[]{3}, new int[]{middle.val});
    }

    @Test
    void findsTheSecondMiddleOfAnEvenLengthList() {
        ListNode middle = MiddleOfTheLinkedList.middleNode(ListNode.of(1, 2, 3, 4));
        assertArrayEquals(new int[]{3}, new int[]{middle.val});
    }

    @Test
    void findsTheOnlyNode() {
        ListNode middle = MiddleOfTheLinkedList.middleNode(ListNode.of(9));
        assertArrayEquals(new int[]{9}, new int[]{middle.val});
    }

    @Test
    void findsTheSecondOfTwoNodes() {
        ListNode middle = MiddleOfTheLinkedList.middleNode(ListNode.of(1, 2));
        assertArrayEquals(new int[]{2}, new int[]{middle.val});
    }

    @Test
    void handlesAnEmptyList() {
        assertNull(MiddleOfTheLinkedList.middleNode(null));
    }

    @Test
    void findsTheMiddleOfALongList() {
        ListNode middle = MiddleOfTheLinkedList.middleNode(ListNode.of(1, 2, 3, 4, 5, 6, 7));
        assertArrayEquals(new int[]{4}, new int[]{middle.val});
    }
}
