package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;
import com.dsa.utils.ListNode;

/**
 * Problem: Reverse Nodes in k-Group
 * LeetCode: 25 | Difficulty: Hard | Frequency: 4/5
 * Pattern: Pointer rewiring, Block reversal
 *
 * <p>Problem:
 * Given the head of a linked list and an integer {@code k}, reverse the order of the nodes
 * in every group of {@code k} nodes. Nodes left over at the end (fewer than {@code k}) keep
 * their original order.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * values[0] values[1] ... values[n-1]
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
 * 2 1 4 3 5
 * </pre>
 *
 * <p>Approach: for every block of k nodes, find its k-th node, remember the node after the
 * block, reverse the block, and stitch it back in front of the block's old position.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class ReverseNodesInKGroup {

    /**
     * Reverses every complete group of {@code k} nodes.
     *
     * @param head first node of the list
     * @param k    group size (values &lt;= 1 leave the list unchanged)
     * @return the new head
     */
    public static ListNode reverseKGroup(ListNode head, int k) {
        if (head == null || k <= 1) {
            return head;
        }
        ListNode dummy = new ListNode(0, head);
        ListNode groupPrev = dummy;

        while (true) {
            // find the k-th node of the current group
            ListNode kth = groupPrev;
            for (int i = 0; i < k && kth != null; i++) {
                kth = kth.next;
            }
            if (kth == null) {
                break;                      // fewer than k nodes left: keep them as they are
            }
            ListNode groupNext = kth.next;  // the node after the group

            // reverse the block [groupPrev.next .. kth]
            ListNode prev = groupNext;
            ListNode curr = groupPrev.next;
            while (curr != groupNext) {
                ListNode next = curr.next;
                curr.next = prev;
                prev = curr;
                curr = next;
            }

            // the old first node of the block is now its tail
            ListNode newGroupPrev = groupPrev.next;
            groupPrev.next = kth;
            groupPrev = newGroupPrev;
        }
        return dummy.next;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] values = fs.nextIntArray(n);
        int k = fs.nextInt();

        ListNode head = ListNode.of(values);
        ListNode result = reverseKGroup(head, k);

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
