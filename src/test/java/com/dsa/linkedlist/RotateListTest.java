package com.dsa.linkedlist;

import com.dsa.utils.ListNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

class RotateListTest {

    @Test
    void rotatesTheHappyPath() {
        assertArrayEquals(new int[]{4, 5, 1, 2, 3},
                RotateList.rotateRight(ListNode.of(1, 2, 3, 4, 5), 2).toArray());
    }

    @Test
    void rotatesByOne() {
        assertArrayEquals(new int[]{5, 1, 2, 3, 4},
                RotateList.rotateRight(ListNode.of(1, 2, 3, 4, 5), 1).toArray());
    }

    @Test
    void rotatesByTheWholeLength() {
        assertArrayEquals(new int[]{1, 2, 3, 4, 5},
                RotateList.rotateRight(ListNode.of(1, 2, 3, 4, 5), 5).toArray());
    }

    @Test
    void reducesKModuloTheLength() {
        assertArrayEquals(new int[]{3, 1, 2},
                RotateList.rotateRight(ListNode.of(1, 2, 3), 7).toArray());
    }

    @Test
    void doesNothingWhenKIsZero() {
        assertArrayEquals(new int[]{1, 2, 3},
                RotateList.rotateRight(ListNode.of(1, 2, 3), 0).toArray());
    }

    @Test
    void handlesASingleNode() {
        assertArrayEquals(new int[]{1}, RotateList.rotateRight(ListNode.of(1), 3).toArray());
    }

    @Test
    void handlesAnEmptyList() {
        assertNull(RotateList.rotateRight(null, 2));
    }

    @Test
    void handlesTwoNodes() {
        assertArrayEquals(new int[]{2, 1}, RotateList.rotateRight(ListNode.of(1, 2), 1).toArray());
    }
}
