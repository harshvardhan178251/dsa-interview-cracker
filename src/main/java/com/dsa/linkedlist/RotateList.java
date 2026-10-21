package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;
import com.dsa.utils.ListNode;

/**
 * Problem: Rotate List
 * LeetCode: 61 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Pointer rewiring, Circular list
 *
 * <p>Problem:
 * Rotate a singly linked list to the right by {@code k} positions: the last {@code k} nodes
 * move in front of the first {@code n - k} nodes.
 *
 * <p>Input format (stdin):
 * <pre>
 * len
 * values[0] values[1] ... values[len-1]
 * k
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 2 3 4 5
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4 5 1 2 3
 * </pre>
 *
 * <p>Approach: find the tail, turn the list into a circle, and cut it at the right place.
 *
 * <p>Complexity: Time O(len), Space O(1).
 */
public class RotateList {

    /**
     * Rotates the list to the right by {@code k} positions.
     *
     * @param head first node of the list
     * @param k    number of positions to rotate right
     * @return the new head
     */
    public static ListNode rotateRight(ListNode head, int k) {
        if (head == null || head.next == null) {
            return head;
        }
        int length = 1;
        ListNode tail = head;
        while (tail.next != null) {
            tail = tail.next;
            length++;
        }
        k = ((k % length) + length) % length;   // k may be larger than the list
        if (k == 0) {
            return head;
        }
        // the new tail is the (length - k)-th node
        ListNode newTail = head;
        for (int i = 1; i < length - k; i++) {
            newTail = newTail.next;
        }
        ListNode newHead = newTail.next;
        newTail.next = null;      // break the list in two
        tail.next = head;         // close the circle
        return newHead;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int len = fs.nextInt();
        int[] values = fs.nextIntArray(len);
        int k = fs.nextInt();

        ListNode result = rotateRight(ListNode.of(values), k);

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
