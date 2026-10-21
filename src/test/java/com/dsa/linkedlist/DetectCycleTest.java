package com.dsa.linkedlist;

import com.dsa.utils.ListNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class DetectCycleTest {

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
    void findsACycleBackToTheHead() {
        assertTrue(DetectCycle.hasCycle(withCycle(new int[]{1, 2, 3}, 0)));
    }

    @Test
    void findsACycleInTheMiddle() {
        assertTrue(DetectCycle.hasCycle(withCycle(new int[]{1, 2, 3, 4}, 1)));
    }

    @Test
    void findsASelfLoop() {
        assertTrue(DetectCycle.hasCycle(withCycle(new int[]{1}, 0)));
    }

    @Test
    void reportsNoCycleForAnAcyclicList() {
        assertFalse(DetectCycle.hasCycle(withCycle(new int[]{1, 2, 3, 4}, -1)));
    }

    @Test
    void reportsNoCycleForAnEmptyList() {
        assertFalse(DetectCycle.hasCycle(null));
    }

    @Test
    void reportsNoCycleForASingleNode() {
        assertFalse(DetectCycle.hasCycle(withCycle(new int[]{7}, -1)));
    }

    @Test
    void doesNotConfuseEqualValuesWithACycle() {
        // 1 -> 1 -> null: two equal values but no loop
        assertFalse(DetectCycle.hasCycle(withCycle(new int[]{1, 1}, -1)));
    }
}
