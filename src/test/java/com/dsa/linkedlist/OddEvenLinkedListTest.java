package com.dsa.linkedlist;

import com.dsa.utils.ListNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

class OddEvenLinkedListTest {

    @Test
    void reordersTheHappyPath() {
        ListNode head = ListNode.of(1, 2, 3, 4, 5);
        assertArrayEquals(new int[]{1, 3, 5, 2, 4}, OddEvenLinkedList.oddEvenList(head).toArray());
    }

    @Test
    void reordersAnEvenLengthList() {
        assertArrayEquals(new int[]{1, 3, 2, 4}, OddEvenLinkedList.oddEvenList(ListNode.of(1, 2, 3, 4)).toArray());
    }

    @Test
    void handlesASingleNode() {
        assertArrayEquals(new int[]{1}, OddEvenLinkedList.oddEvenList(ListNode.of(1)).toArray());
    }

    @Test
    void handlesTwoNodes() {
        assertArrayEquals(new int[]{1, 2}, OddEvenLinkedList.oddEvenList(ListNode.of(1, 2)).toArray());
    }

    @Test
    void handlesThreeNodes() {
        assertArrayEquals(new int[]{1, 3, 2}, OddEvenLinkedList.oddEvenList(ListNode.of(1, 2, 3)).toArray());
    }

    @Test
    void keepsTheRelativeOrderOfEachGroup() {
        assertArrayEquals(new int[]{10, 30, 50, 20, 40},
                OddEvenLinkedList.oddEvenList(ListNode.of(10, 20, 30, 40, 50)).toArray());
    }
}
