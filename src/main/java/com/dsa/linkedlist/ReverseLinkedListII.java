package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;
import com.dsa.utils.ListNode;

/**
 * Problem: Reverse Linked List II
 * LeetCode: 92 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Pointer rewiring, Segment reversal
 *
 * <p>Problem:
 * Given the head of a linked list and two positions {@code left} and {@code right}
 * (1-indexed, inclusive), reverse the nodes between those positions and return the head.
 * The rest of the list must stay untouched.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * values[0] values[1] ... values[n-1]
 * left
 * right
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 2 3 4 5
 * 2
 * 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 4 3 2 5
 * </pre>
 *
 * <p>Approach: find the node just before {@code left}, then repeatedly pull the node that
 * follows the segment to the front of the segment. After {@code right - left} moves the
 * segment reads backwards.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class ReverseLinkedListII {

    /**
     * Reverses the sublist between the 1-indexed positions {@code left} and {@code right}.
     *
     * @param head  first node of the list
     * @param left  first position of the segment (1-indexed, inclusive)
     * @param right last position of the segment (1-indexed, inclusive)
     * @return the head of the modified list
     */
    public static ListNode reverseBetween(ListNode head, int left, int right) {
        if (head == null || left >= right) {
            return head;
        }
        ListNode dummy = new ListNode(0, head);
        ListNode prev = dummy;
        for (int i = 1; i < left; i++) {
            prev = prev.next;
        }
        ListNode curr = prev.next;                 // the first node of the segment
        for (int i = 0; i < right - left; i++) {
            ListNode moved = curr.next;            // the node to move to the front
            curr.next = moved.next;                // unlink it from its place
            moved.next = prev.next;                // link it in front of the segment
            prev.next = moved;
        }
        return dummy.next;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] values = fs.nextIntArray(n);
        int left = fs.nextInt();
        int right = fs.nextInt();

        ListNode head = ListNode.of(values);
        ListNode result = reverseBetween(head, left, right);

        StringBuilder sb = new StringBuilder();
        for (ListNode c = result; c != null; c = c.next) {
            if (sb.length() > 0) {
                sb.append(' ');
            }
            sb.append(c.val);
        }
        System.out.println(sb);
    }
}
