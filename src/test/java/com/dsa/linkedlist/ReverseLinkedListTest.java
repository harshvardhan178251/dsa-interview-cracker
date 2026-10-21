package com.dsa.linkedlist;

import com.dsa.utils.ListNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertSame;

class ReverseLinkedListTest {

    @Test
    void reversesTheHappyPath() {
        ListNode head = ListNode.of(1, 2, 3, 4, 5);
        ListNode reversed = ReverseLinkedList.reverse(head);
        assertArrayEquals(new int[]{5, 4, 3, 2, 1}, reversed.toArray());
    }

    @Test
    void handlesAnEmptyList() {
        assertNull(ReverseLinkedList.reverse(null));
    }

    @Test
    void handlesASingleNode() {
        ListNode head = ListNode.of(7);
        ListNode reversed = ReverseLinkedList.reverse(head);
        assertArrayEquals(new int[]{7}, reversed.toArray());
        assertNull(reversed.next);
    }

    @Test
    void handlesTwoNodes() {
        assertArrayEquals(new int[]{2, 1}, ReverseLinkedList.reverse(ListNode.of(1, 2)).toArray());
    }

    @Test
    void keepsDuplicatedValues() {
        assertArrayEquals(new int[]{1, 1, 2}, ReverseLinkedList.reverse(ListNode.of(2, 1, 1)).toArray());
    }

    @Test
    void keepsNegativeValues() {
        assertArrayEquals(new int[]{-3, -1, 0}, ReverseLinkedList.reverse(ListNode.of(0, -1, -3)).toArray());
    }

    @Test
    void reusesTheOriginalNodes() {
        ListNode head = ListNode.of(1, 2, 3);
        ListNode second = head.next;
        ListNode reversed = ReverseLinkedList.reverse(head);
        assertSame(second, reversed.next);
        assertSame(head, reversed.next.next);
    }
}
