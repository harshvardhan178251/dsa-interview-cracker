package com.dsa.linkedlist;

import com.dsa.utils.ListNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

class SwapPairsTest {

    @Test
    void swapsTheHappyPath() {
        assertArrayEquals(new int[]{2, 1, 4, 3}, SwapPairs.swapPairs(ListNode.of(1, 2, 3, 4)).toArray());
    }

    @Test
    void leavesTheOddNodeAtTheEnd() {
        assertArrayEquals(new int[]{2, 1, 3}, SwapPairs.swapPairs(ListNode.of(1, 2, 3)).toArray());
    }

    @Test
    void handlesASingleNode() {
        assertArrayEquals(new int[]{1}, SwapPairs.swapPairs(ListNode.of(1)).toArray());
    }

    @Test
    void handlesTwoNodes() {
        assertArrayEquals(new int[]{2, 1}, SwapPairs.swapPairs(ListNode.of(1, 2)).toArray());
    }

    @Test
    void handlesAnEmptyList() {
        assertNull(SwapPairs.swapPairs(null));
    }

    @Test
    void handlesFiveNodes() {
        assertArrayEquals(new int[]{2, 1, 4, 3, 5}, SwapPairs.swapPairs(ListNode.of(1, 2, 3, 4, 5)).toArray());
    }

    @Test
    void keepsDuplicatedValues() {
        // swapping equal values leaves the sequence looking the same
        assertArrayEquals(new int[]{1, 1, 2, 2}, SwapPairs.swapPairs(ListNode.of(1, 1, 2, 2)).toArray());
    }
}
