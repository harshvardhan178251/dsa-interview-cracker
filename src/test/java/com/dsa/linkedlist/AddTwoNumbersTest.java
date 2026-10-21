package com.dsa.linkedlist;

import com.dsa.utils.ListNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

class AddTwoNumbersTest {

    @Test
    void addsTheHappyPath() {
        assertArrayEquals(new int[]{0, 0, 1},
                AddTwoNumbers.addTwoNumbers(ListNode.of(9, 9), ListNode.of(1)).toArray());
    }

    @Test
    void addsNumbersOfDifferentLengths() {
        // 342 + 165 = 507, stored least significant first
        assertArrayEquals(new int[]{7, 0, 5},
                AddTwoNumbers.addTwoNumbers(ListNode.of(2, 4, 3), ListNode.of(5, 6, 1)).toArray());
    }

    @Test
    void addsWithoutACarry() {
        assertArrayEquals(new int[]{2, 4, 6},
                AddTwoNumbers.addTwoNumbers(ListNode.of(2, 4, 3), ListNode.of(0, 0, 3)).toArray());
    }

    @Test
    void carriesAcrossEveryDigit() {
        assertArrayEquals(new int[]{9, 9, 9},
                AddTwoNumbers.addTwoNumbers(ListNode.of(4, 5, 6), ListNode.of(5, 4, 3)).toArray());
    }

    @Test
    void addsZeroToZero() {
        assertArrayEquals(new int[]{0}, AddTwoNumbers.addTwoNumbers(ListNode.of(0), ListNode.of(0)).toArray());
    }

    @Test
    void addsZeroToANumber() {
        assertArrayEquals(new int[]{1, 2, 3},
                AddTwoNumbers.addTwoNumbers(ListNode.of(1, 2, 3), ListNode.of(0)).toArray());
    }

    @Test
    void handlesAnEmptyList() {
        assertArrayEquals(new int[]{1, 2},
                AddTwoNumbers.addTwoNumbers(null, ListNode.of(1, 2)).toArray());
        assertArrayEquals(new int[]{1, 2},
                AddTwoNumbers.addTwoNumbers(ListNode.of(1, 2), null).toArray());
    }

    @Test
    void handlesTwoEmptyLists() {
        assertNull(AddTwoNumbers.addTwoNumbers(null, null));
    }
}
