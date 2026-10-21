package com.dsa.heaps;

import com.dsa.utils.FastScanner;
import com.dsa.utils.ListNode;
import com.dsa.utils.MinHeap;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

/**
 * Problem: Merge k Sorted Lists
 * LeetCode: 23 | Difficulty: Hard | Frequency: 4/5
 * Pattern: K-way merge, Bounded heap
 *
 * <p>Problem:
 * Given k sorted singly linked lists, return one sorted linked list that contains every
 * node of the input lists.
 *
 * <p>Input format (stdin):
 * <pre>
 * k
 * m1 v1 v2 ... vm1
 * m2 v1 v2 ... vm2
 * ...
 * </pre>
 * {@code k} is the number of lists; each following line describes one list — its length
 * followed by that many values in ascending order. A length of 0 means an empty list.
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 4 1 4 5 6
 * 3 1 3 4
 * 2 2 6
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 1 2 3 4 4 5 6 6
 * </pre>
 *
 * <p>Approach: put the head of every non-empty list into a min-heap. Repeatedly take the
 * smallest node out of the heap, emit its value and push its successor. The heap always
 * holds at most one "current" node per list, so it is the frontier of a k-way merge.
 *
 * <p>Complexity: Time O(N log k) with N total nodes, Space O(k).
 */
public class MergeKSortedLists {

    /**
     * Merges {@code lists} into one sorted list.
     *
     * @param lists the heads of the sorted lists; {@code null} entries are skipped
     * @return the head of the merged list, or {@code null} when everything is empty
     */
    public static ListNode mergeKSortedLists(ListNode[] lists) {
        if (lists == null || lists.length == 0) {
            return null;
        }

        MinHeap<ListNode> heap = new MinHeap<ListNode>(Comparator.comparingInt((ListNode node) -> node.val));
        for (ListNode head : lists) {
            if (head != null) {
                heap.add(head);
            }
        }

        ListNode dummy = new ListNode();
        ListNode tail = dummy;
        while (!heap.isEmpty()) {
            ListNode node = heap.poll();
            tail.next = node;
            tail = node;
            if (node.next != null) {
                heap.add(node.next);
            }
        }
        tail.next = null;
        return dummy.next;
    }

    /** Flattens the merged list into an array of values. */
    public static int[] mergeToArray(ListNode[] lists) {
        ListNode merged = mergeKSortedLists(lists);
        return merged == null ? new int[0] : merged.toArray();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int k = fs.nextInt();

        ListNode[] lists = new ListNode[k];
        for (int i = 0; i < k; i++) {
            int m = fs.nextInt();
            int[] values = fs.nextIntArray(m);
            lists[i] = ListNode.fromArray(values);
        }

        int[] merged = mergeToArray(lists);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < merged.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(merged[i]);
        }
        System.out.println(sb);
    }
}
