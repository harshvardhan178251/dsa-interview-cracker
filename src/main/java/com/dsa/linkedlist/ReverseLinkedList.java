package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;
import com.dsa.utils.ListNode;

/**
 * Problem: Reverse Linked List
 * LeetCode: 206 | Difficulty: Easy | Frequency: 5/5
 * Pattern: Pointer rewiring, Iterative reversal
 *
 * <p>Problem:
 * Given the head of a singly linked list, reverse the order of its nodes and return the
 * new head. The list {@code 1 -> 2 -> 3 -> 4 -> 5} becomes {@code 5 -> 4 -> 3 -> 2 -> 1}.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * values[0] values[1] ... values[n-1]
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
 * 5 4 3 2 1
 * </pre>
 *
 * <p>Approach: three pointers. {@code prev} is the already-reversed head, {@code curr} is the
 * node being visited and {@code next} remembers where to continue. Each step flips
 * {@code curr.next} to {@code prev} and slides the window one node to the right. When
 * {@code curr} falls off the end, {@code prev} is the new head.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class ReverseLinkedList {

    /**
     * Reverses the chain that starts at {@code head}.
     *
     * @param head first node of the list, may be {@code null}
     * @return the new head of the reversed list ({@code null} for an empty list)
     */
    public static ListNode reverse(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode next = curr.next;   // remember where to go after the flip
            curr.next = prev;            // flip the arrow backwards
            prev = curr;                 // prev now owns the reversed prefix
            curr = next;                 // move on to the untouched remainder
        }
        return prev;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] values = fs.nextIntArray(n);

        ListNode head = ListNode.of(values);
        ListNode reversed = reverse(head);

        StringBuilder sb = new StringBuilder();
        for (ListNode c = reversed; c != null; c = c.next) {
            if (sb.length() > 0) {
                sb.append(' ');
            }
            sb.append(c.val);
        }
        System.out.println(sb);
    }
}
