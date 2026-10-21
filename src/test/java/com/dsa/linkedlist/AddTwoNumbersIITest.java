package com.dsa.linkedlist;

import com.dsa.utils.ListNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

class AddTwoNumbersIITest {

    @Test
    void addsTheHappyPath() {
        assertArrayEquals(new int[]{3, 4, 9, 2},
                AddTwoNumbersII.addTwoNumbers(ListNode.of(3, 4, 2, 7), ListNode.of(6, 5)).toArray());
    }

    @Test
    void keepsTheResultMostSignificantFirst() {
        // 243 + 561 = 804
        assertArrayEquals(new int[]{8, 0, 4},
                AddTwoNumbersII.addTwoNumbers(ListNode.of(2, 4, 3), ListNode.of(5, 6, 1)).toArray());
    }

    @Test
    void producesACarryDigit() {
        // 99 + 1 = 100
        assertArrayEquals(new int[]{1, 0, 0},
                AddTwoNumbersII.addTwoNumbers(ListNode.of(9, 9), ListNode.of(1)).toArray());
    }

    @Test
    void handlesNumbersOfDifferentLengths() {
        // 999 + 1 = 1000
        assertArrayEquals(new int[]{1, 0, 0, 0},
                AddTwoNumbersII.addTwoNumbers(ListNode.of(9, 9, 9), ListNode.of(1)).toArray());
    }

    @Test
    void addsZeroToZero() {
        assertArrayEquals(new int[]{0}, AddTwoNumbersII.addTwoNumbers(ListNode.of(0), ListNode.of(0)).toArray());
    }

    @Test
    void handlesAnEmptyList() {
        assertArrayEquals(new int[]{1, 2},
                AddTwoNumbersII.addTwoNumbers(null, ListNode.of(1, 2)).toArray());
        assertArrayEquals(new int[]{1, 2},
                AddTwoNumbersII.addTwoNumbers(ListNode.of(1, 2), null).toArray());
    }

    @Test
    void handlesTwoEmptyLists() {
        assertNull(AddTwoNumbersII.addTwoNumbers(null, null));
    }
}
