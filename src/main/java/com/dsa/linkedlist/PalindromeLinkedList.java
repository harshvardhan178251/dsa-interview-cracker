package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;
import com.dsa.utils.ListNode;

/**
 * Problem: Palindrome Linked List
 * LeetCode: 234 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Two pointers, Reverse a half list
 *
 * <p>Problem:
 * Given the head of a singly linked list, decide whether the list is a palindrome — the
 * sequence of values reads the same forwards and backwards.
 *
 * <p>Input format (stdin):
 * <pre>
 * len
 * values[0] values[1] ... values[len-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 2 3 2 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: find the middle, reverse the second half, and compare the two halves node by
 * node.
 *
 * <p>Complexity: Time O(len), Space O(1).
 */
public class PalindromeLinkedList {

    /**
     * Returns {@code true} when the list reads the same forwards and backwards.
     *
     * @param head first node of the list
     * @return whether the list is a palindrome
     */
    public static boolean isPalindrome(ListNode head) {
        if (head == null || head.next == null) {
            return true;
        }
        // 1. find the last node of the first half
        ListNode slow = head;
        ListNode fast = head;
        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        // 2. reverse the second half
        ListNode prev = null;
        ListNode curr = slow.next;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        // 3. compare the front with the reversed back
        ListNode front = head;
        ListNode back = prev;
        while (back != null) {
            if (front.val != back.val) {
                return false;
            }
            front = front.next;
            back = back.next;
        }
        return true;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int len = fs.nextInt();
        int[] values = fs.nextIntArray(len);

        System.out.println(isPalindrome(ListNode.of(values)) ? "true" : "false");
    }
}
