package com.dsa.linkedlist;

import com.dsa.utils.ListNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertSame;

class LinkedListCycleIITest {

    private static ListNode withCycle(int[] values, int cyclePos) {
        ListNode head = ListNode.of(values);
        if (cyclePos >= 0 && head != null) {
            ListNode tail = head;
            while (tail.next != null) {
                tail = tail.next;
            }
            ListNode target = head;
            for (int i = 0; i < cyclePos; i++) {
                target = target.next;
            }
            tail.next = target;
        }
        return head;
    }

    @Test
    void findsTheEntryWhenTheCycleStartsAtTheHead() {
        assertEquals(0, LinkedListCycleII.cycleEntryIndex(withCycle(new int[]{1, 2, 3}, 0)));
    }

    @Test
    void findsTheEntryInTheMiddleOfTheList() {
        assertEquals(1, LinkedListCycleII.cycleEntryIndex(withCycle(new int[]{1, 2, 3, 4}, 1)));
    }

    @Test
    void findsTheEntryOfASelfLoop() {
        assertEquals(0, LinkedListCycleII.cycleEntryIndex(withCycle(new int[]{1}, 0)));
    }

    @Test
    void returnsMinusOneForAnAcyclicList() {
        assertEquals(-1, LinkedListCycleII.cycleEntryIndex(withCycle(new int[]{1, 2, 3, 4}, -1)));
    }

    @Test
    void returnsMinusOneForAnEmptyList() {
        assertEquals(-1, LinkedListCycleII.cycleEntryIndex(null));
    }

    @Test
    void returnsMinusOneForASingleNode() {
        assertEquals(-1, LinkedListCycleII.cycleEntryIndex(withCycle(new int[]{5}, -1)));
    }

    @Test
    void returnsTheEntryNodeItself() {
        ListNode head = withCycle(new int[]{3, 2, 0, -4}, 1);
        ListNode entry = LinkedListCycleII.detectCycle(head);
        assertSame(head.next, entry);
    }

    @Test
    void returnsNullForAnAcyclicList() {
        assertNull(LinkedListCycleII.detectCycle(ListNode.of(1, 2, 3)));
    }
}
