package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;
import com.dsa.utils.ListNode;

/**
 * Problem: Reorder List
 * LeetCode: 143 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Two pointers, Divide and conquer on a list
 *
 * <p>Problem:
 * Given the head of a singly linked list, reorder it so that the nodes alternate between the
 * first half and the second half: the first node, the last node, the second node, the
 * second-to-last node, and so on.
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
 * 1 2 3 4 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 5 2 4 3
 * </pre>
 *
 * <p>Approach: split the list in half with two pointers, reverse the second half, then
 * interleave the two halves.
 *
 * <p>Complexity: Time O(len), Space O(1).
 */
public class ReorderList {

    /**
     * Reorders the list in place so that nodes alternate between the two halves.
     *
     * @param head first node of the list (the list is modified in place)
     */
    public static void reorderList(ListNode head) {
        if (head == null || head.next == null) {
            return;
        }

        // 1. find the middle: slow ends on the last node of the first half
        ListNode slow = head;
        ListNode fast = head;
        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        ListNode second = slow.next;
        slow.next = null;                 // cut the list in two

        // 2. reverse the second half
        ListNode prev = null;
        ListNode curr = second;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }

        // 3. interleave: first half, second half, first half, second half, ...
        ListNode first = head;
        ListNode secondHead = prev;
        while (secondHead != null) {
            ListNode firstNext = first.next;
            ListNode secondNext = secondHead.next;
            first.next = secondHead;
            secondHead.next = firstNext;
            first = firstNext;
            secondHead = secondNext;
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int len = fs.nextInt();
        int[] values = fs.nextIntArray(len);

        ListNode head = ListNode.of(values);
        reorderList(head);

        StringBuilder sb = new StringBuilder();
        for (ListNode c = head; c != null; c = c.next) {
            if (sb.length() > 0) {
                sb.append(' ');
            }
            sb.append(c.val);
        }
        System.out.println(sb);
    }
}
