package com.dsa.linkedlist;

import com.dsa.utils.ListNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

class ReverseNodesInKGroupTest {

    @Test
    void reversesGroupsOfTwo() {
        assertArrayEquals(new int[]{2, 1, 4, 3, 5},
                ReverseNodesInKGroup.reverseKGroup(ListNode.of(1, 2, 3, 4, 5), 2).toArray());
    }

    @Test
    void reversesGroupsOfThree() {
        assertArrayEquals(new int[]{3, 2, 1, 4, 5},
                ReverseNodesInKGroup.reverseKGroup(ListNode.of(1, 2, 3, 4, 5), 3).toArray());
    }

    @Test
    void keepsTheIncompleteTrailingGroup() {
        // the last group has a single node, so it is not reversed
        assertArrayEquals(new int[]{2, 1, 4, 3, 5},
                ReverseNodesInKGroup.reverseKGroup(ListNode.of(1, 2, 3, 4, 5), 2).toArray());
    }

    @Test
    void reversesTheWholeListWhenKEqualsTheLength() {
        assertArrayEquals(new int[]{3, 2, 1},
                ReverseNodesInKGroup.reverseKGroup(ListNode.of(1, 2, 3), 3).toArray());
    }

    @Test
    void doesNothingWhenKIsOne() {
        assertArrayEquals(new int[]{1, 2, 3},
                ReverseNodesInKGroup.reverseKGroup(ListNode.of(1, 2, 3), 1).toArray());
    }

    @Test
    void doesNothingWhenKExceedsTheListLength() {
        assertArrayEquals(new int[]{1, 2},
                ReverseNodesInKGroup.reverseKGroup(ListNode.of(1, 2), 5).toArray());
    }

    @Test
    void handlesAnEmptyList() {
        assertNull(ReverseNodesInKGroup.reverseKGroup(null, 3));
    }

    @Test
    void handlesASingleNode() {
        assertArrayEquals(new int[]{1}, ReverseNodesInKGroup.reverseKGroup(ListNode.of(1), 1).toArray());
    }
}
