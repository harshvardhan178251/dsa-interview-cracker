package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;
import com.dsa.utils.ListNode;

/**
 * Problem: Odd Even Linked List
 * LeetCode: 328 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Pointer rewiring, Two chains
 *
 * <p>Problem:
 * Given the head of a singly linked list, reorder it so that all the nodes at **odd**
 * positions come first, followed by all the nodes at **even** positions. The relative order
 * inside each group is preserved.
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
 * 1 3 5 2 4
 * </pre>
 *
 * <p>Approach: split the list into an odd chain and an even chain with one pass, then join
 * the tail of the odd chain to the head of the even chain.
 *
 * <p>Complexity: Time O(len), Space O(1).
 */
public class OddEvenLinkedList {

    /**
     * Reorders the list so that odd positions come first, then even positions.
     *
     * @param head first node of the list (modified in place)
     * @return the new head
     */
    public static ListNode oddEvenList(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }
        ListNode oddHead = head;
        ListNode evenHead = head.next;
        ListNode odd = oddHead;
        ListNode even = evenHead;

        while (even != null && even.next != null) {
            odd.next = even.next;      // the next odd node
            odd = odd.next;
            even.next = odd.next;      // the next even node
            even = even.next;
        }
        odd.next = evenHead;           // join the two chains
        return oddHead;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int len = fs.nextInt();
        int[] values = fs.nextIntArray(len);

        ListNode result = oddEvenList(ListNode.of(values));

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
