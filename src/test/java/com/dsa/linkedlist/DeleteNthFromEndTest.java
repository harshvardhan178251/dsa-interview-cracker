package com.dsa.linkedlist;

import com.dsa.utils.ListNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

class DeleteNthFromEndTest {

    @Test
    void removesTheHappyPath() {
        assertArrayEquals(new int[]{1, 2, 3, 5},
                DeleteNthFromEnd.removeNthFromEnd(ListNode.of(1, 2, 3, 4, 5), 2).toArray());
    }

    @Test
    void removesTheLastNode() {
        assertArrayEquals(new int[]{1, 2, 3, 4},
                DeleteNthFromEnd.removeNthFromEnd(ListNode.of(1, 2, 3, 4, 5), 1).toArray());
    }

    @Test
    void removesTheFirstNode() {
        assertArrayEquals(new int[]{2, 3},
                DeleteNthFromEnd.removeNthFromEnd(ListNode.of(1, 2, 3), 3).toArray());
    }

    @Test
    void removesTheOnlyNode() {
        assertNull(DeleteNthFromEnd.removeNthFromEnd(ListNode.of(1), 1));
    }

    @Test
    void handlesAnEmptyList() {
        assertNull(DeleteNthFromEnd.removeNthFromEnd(null, 1));
    }

    @Test
    void keepsTheListWhenNIsTooLarge() {
        assertArrayEquals(new int[]{1, 2},
                DeleteNthFromEnd.removeNthFromEnd(ListNode.of(1, 2), 5).toArray());
    }

    @Test
    void keepsDuplicatedValues() {
        assertArrayEquals(new int[]{1, 2, 4},
                DeleteNthFromEnd.removeNthFromEnd(ListNode.of(1, 2, 3, 4), 2).toArray());
    }
}
