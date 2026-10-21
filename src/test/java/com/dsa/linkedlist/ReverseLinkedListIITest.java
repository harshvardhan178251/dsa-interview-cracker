package com.dsa.linkedlist;

import com.dsa.utils.ListNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertSame;

class ReverseLinkedListIITest {

    @Test
    void reversesTheHappyPath() {
        ListNode head = ListNode.of(1, 2, 3, 4, 5);
        assertArrayEquals(new int[]{1, 4, 3, 2, 5}, ReverseLinkedListII.reverseBetween(head, 2, 4).toArray());
    }

    @Test
    void reversesFromTheFirstNode() {
        assertArrayEquals(new int[]{4, 3, 2, 1}, ReverseLinkedListII.reverseBetween(ListNode.of(1, 2, 3, 4), 1, 4).toArray());
    }

    @Test
    void reversesToTheLastNode() {
        assertArrayEquals(new int[]{1, 5, 4, 3, 2}, ReverseLinkedListII.reverseBetween(ListNode.of(1, 2, 3, 4, 5), 2, 5).toArray());
    }

    @Test
    void leavesTheListAloneWhenTheSegmentIsASingleNode() {
        assertArrayEquals(new int[]{1, 2, 3}, ReverseLinkedListII.reverseBetween(ListNode.of(1, 2, 3), 2, 2).toArray());
    }

    @Test
    void handlesAnEmptyList() {
        assertNull(ReverseLinkedListII.reverseBetween(null, 1, 1));
    }

    @Test
    void handlesASingleNodeList() {
        assertArrayEquals(new int[]{9}, ReverseLinkedListII.reverseBetween(ListNode.of(9), 1, 1).toArray());
    }

    @Test
    void keepsDuplicatedValuesInPlace() {
        assertArrayEquals(new int[]{1, 3, 3, 2}, ReverseLinkedListII.reverseBetween(ListNode.of(1, 3, 3, 2), 2, 3).toArray());
    }

    @Test
    void reusesTheOriginalNodes() {
        ListNode head = ListNode.of(1, 2, 3, 4);
        ListNode third = head.next.next;   // the node holding 3
        ListNode result = ReverseLinkedListII.reverseBetween(head, 2, 4);
        // 1 -> 4 -> 3 -> 2 : the node holding 3 is now third in the list
        assertSame(third, result.next.next);
    }
}
