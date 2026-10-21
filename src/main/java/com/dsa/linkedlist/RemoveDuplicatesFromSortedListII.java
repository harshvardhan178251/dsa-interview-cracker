package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;
import com.dsa.utils.ListNode;

/**
 * Problem: Remove Duplicates from Sorted List II
 * LeetCode: 83 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Dummy head, Run detection
 *
 * <p>Problem:
 * Given a sorted linked list, delete all nodes that have a duplicate: every value that
 * appears **more than once** is removed completely, not just the extra copies.
 *
 * <p>Input format (stdin):
 * <pre>
 * len
 * values[0] values[1] ... values[len-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 7
 * 1 2 3 3 4 4 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 2 5
 * </pre>
 *
 * <p>Approach: walk the list with a cursor and a previous pointer; when a run of equal
 * values is found, unlink the whole run.
 *
 * <p>Complexity: Time O(len), Space O(1).
 */
public class RemoveDuplicatesFromSortedListII {

    /**
     * Removes every value that occurs more than once.
     *
     * @param head first node of the sorted list
     * @return the head of the cleaned list
     */
    public static ListNode deleteDuplicates(ListNode head) {
        ListNode dummy = new ListNode(0, head);
        ListNode prev = dummy;
        ListNode curr = head;

        while (curr != null) {
            if (curr.next != null && curr.next.val == curr.val) {
                int value = curr.val;
                while (curr != null && curr.val == value) {
                    curr = curr.next;          // skip the whole run of equal values
                }
                prev.next = curr;              // unlink the run
            } else {
                prev = curr;                   // this value is unique: keep it
                curr = curr.next;
            }
        }
        return dummy.next;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int len = fs.nextInt();
        int[] values = fs.nextIntArray(len);

        ListNode result = deleteDuplicates(ListNode.of(values));

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
