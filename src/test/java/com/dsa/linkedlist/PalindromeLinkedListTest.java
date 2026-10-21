package com.dsa.linkedlist;

import com.dsa.utils.ListNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class PalindromeLinkedListTest {

    @Test
    void findsTheHappyPath() {
        assertTrue(PalindromeLinkedList.isPalindrome(ListNode.of(1, 2, 3, 2, 1)));
    }

    @Test
    void findsAnEvenLengthPalindrome() {
        assertTrue(PalindromeLinkedList.isPalindrome(ListNode.of(1, 2, 2, 1)));
    }

    @Test
    void rejectsANonPalindrome() {
        assertFalse(PalindromeLinkedList.isPalindrome(ListNode.of(1, 2)));
    }

    @Test
    void rejectsAnEvenLengthNonPalindrome() {
        assertFalse(PalindromeLinkedList.isPalindrome(ListNode.of(1, 2, 3, 4)));
    }

    @Test
    void handlesASingleNode() {
        assertTrue(PalindromeLinkedList.isPalindrome(ListNode.of(1)));
    }

    @Test
    void handlesAnEmptyList() {
        assertTrue(PalindromeLinkedList.isPalindrome(null));
    }

    @Test
    void handlesTwoEqualNodes() {
        assertTrue(PalindromeLinkedList.isPalindrome(ListNode.of(7, 7)));
    }

    @Test
    void rejectsTwoDifferentNodes() {
        assertFalse(PalindromeLinkedList.isPalindrome(ListNode.of(7, 8)));
    }
}
