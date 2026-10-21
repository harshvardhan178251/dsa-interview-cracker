package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;
import com.dsa.utils.ListNode;

/**
 * Problem: Swap Nodes in Pairs
 * LeetCode: 24 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Pointer rewiring, Dummy head
 *
 * <p>Problem:
 * Given the head of a linked list, swap every pair of **adjacent** nodes. If there is an odd
 * node at the end it stays where it is.
 *
 * <p>Input format (stdin):
 * <pre>
 * len
 * values[0] values[1] ... values[len-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 1 2 3 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2 1 4 3
 * </pre>
 *
 * <p>Approach: a dummy head plus a pointer to the node in front of the current pair; swap the
 * two nodes and advance the pointer by two.
 *
 * <p>Complexity: Time O(len), Space O(1).
 */
public class SwapPairs {

    /**
     * Swaps every pair of adjacent nodes.
     *
     * @param head first node of the list (modified in place)
     * @return the new head
     */
    public static ListNode swapPairs(ListNode head) {
        ListNode dummy = new ListNode(0, head);
        ListNode prev = dummy;

        while (prev.next != null && prev.next.next != null) {
            ListNode first = prev.next;
            ListNode second = first.next;
            first.next = second.next;     // the first node now points past the pair
            second.next = first;           // the second node now points at the first
            prev.next = second;            // and the node before the pair points at the second
            prev = first;                  // move the cursor to the end of the swapped pair
        }
        return dummy.next;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int len = fs.nextInt();
        int[] values = fs.nextIntArray(len);

        ListNode result = swapPairs(ListNode.of(values));

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
