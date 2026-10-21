package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;
import com.dsa.utils.ListNode;

/**
 * Problem: Remove Nth Node From End of List
 * LeetCode: 19 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Two pointers, Dummy head
 *
 * <p>Problem:
 * Given a linked list and an integer {@code n}, remove the node that is {@code n} positions
 * from the end of the list and return the head of the list.
 *
 * <p>Input format (stdin):
 * <pre>
 * len
 * values[0] values[1] ... values[len-1]
 * n
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
 * 1 2 3 5
 * </pre>
 *
 * <p>Approach: two pointers separated by exactly {@code n} links. When the fast pointer
 * reaches the end, the slow pointer sits on the node to remove.
 *
 * <p>Complexity: Time O(len), Space O(1).
 */
public class DeleteNthFromEnd {

    /**
     * Removes the {@code n}-th node from the end of the list (1-indexed).
     *
     * @param head first node of the list
     * @param n    position from the end, 1 = the last node
     * @return the head of the shortened list
     */
    public static ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0, head);
        ListNode fast = dummy;
        ListNode slow = dummy;

        for (int i = 0; i < n && fast != null; i++) {
            fast = fast.next;
        }
        if (fast == null) {
            return head;       // n is larger than the list: nothing to remove
        }
        while (fast.next != null) {
            fast = fast.next;
            slow = slow.next;
        }
        slow.next = slow.next.next;   // unlink the node after slow
        return dummy.next;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int len = fs.nextInt();
        int[] values = fs.nextIntArray(len);
        int n = fs.nextInt();

        ListNode result = removeNthFromEnd(ListNode.of(values), n);

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
