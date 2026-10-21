package com.dsa.linkedlist;

import com.dsa.utils.ListNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

class ReorderListTest {

    @Test
    void reordersTheHappyPath() {
        ListNode head = ListNode.of(1, 2, 3, 4, 5);
        ReorderList.reorderList(head);
        assertArrayEquals(new int[]{1, 5, 2, 4, 3}, head.toArray());
    }

    @Test
    void reordersAnEvenLengthList() {
        ListNode head = ListNode.of(1, 2, 3, 4);
        ReorderList.reorderList(head);
        assertArrayEquals(new int[]{1, 4, 2, 3}, head.toArray());
    }

    @Test
    void handlesASingleNode() {
        ListNode head = ListNode.of(1);
        ReorderList.reorderList(head);
        assertArrayEquals(new int[]{1}, head.toArray());
    }

    @Test
    void handlesTwoNodes() {
        ListNode head = ListNode.of(1, 2);
        ReorderList.reorderList(head);
        assertArrayEquals(new int[]{1, 2}, head.toArray());
    }

    @Test
    void handlesThreeNodes() {
        ListNode head = ListNode.of(1, 2, 3);
        ReorderList.reorderList(head);
        assertArrayEquals(new int[]{1, 3, 2}, head.toArray());
    }

    @Test
    void keepsTheSameNodesInTheSameSet() {
        ListNode head = ListNode.of(1, 2, 3, 4, 5, 6);
        ReorderList.reorderList(head);
        assertArrayEquals(new int[]{1, 6, 2, 5, 3, 4}, head.toArray());
    }

    @Test
    void handlesDuplicatedValues() {
        ListNode head = ListNode.of(1, 1, 2, 2);
        ReorderList.reorderList(head);
        assertArrayEquals(new int[]{1, 2, 1, 2}, head.toArray());
    }
}
