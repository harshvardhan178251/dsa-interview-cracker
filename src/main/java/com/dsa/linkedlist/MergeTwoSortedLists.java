package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;
import com.dsa.utils.ListNode;

/**
 * Problem: Merge Two Sorted Lists
 * LeetCode: 21 | Difficulty: Easy | Frequency: 5/5
 * Pattern: Two pointers, Dummy head
 *
 * <p>Problem:
 * Merge two sorted (ascending) singly linked lists into one sorted list. The result must be
 * built by **splicing existing nodes** — no new value nodes are created.
 *
 * <p>Input format (stdin):
 * <pre>
 * n1
 * list1 values
 * n2
 * list2 values
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 1 2 4
 * 3
 * 1 3 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 1 2 3 4 4
 * </pre>
 *
 * <p>Approach: one pointer per list, always take the smaller head and append it to a dummy
 * tail. When one list runs out, the remainder of the other is attached in one go.
 *
 * <p>Complexity: Time O(n + m), Space O(1).
 */
public class MergeTwoSortedLists {

    /**
     * Merges two ascending lists into one ascending list.
     *
     * @param list1 first sorted list (may be {@code null})
     * @param list2 second sorted list (may be {@code null})
     * @return the head of the merged list
     */
    public static ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;

        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                tail.next = list1;
                list1 = list1.next;
            } else {
                tail.next = list2;
                list2 = list2.next;
            }
            tail = tail.next;
        }
        // one list is exhausted — the rest of the other one is already sorted
        tail.next = list1 != null ? list1 : list2;
        return dummy.next;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n1 = fs.nextInt();
        int[] values1 = fs.nextIntArray(n1);
        int n2 = fs.nextInt();
        int[] values2 = fs.nextIntArray(n2);

        ListNode merged = mergeTwoLists(ListNode.of(values1), ListNode.of(values2));

        StringBuilder sb = new StringBuilder();
        for (ListNode c = merged; c != null; c = c.next) {
            if (sb.length() > 0) {
                sb.append(' ');
            }
            sb.append(c.val);
        }
        System.out.println(sb);
    }
}
