package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;
import com.dsa.utils.ListNode;

/**
 * Problem: Linked List Cycle II
 * LeetCode: 142 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Two pointers, Floyd cycle detection
 *
 * <p>Problem:
 * Given the head of a linked list, return the node where the cycle begins. If there is no
 * cycle, return {@code null}. The answer is a node, not an index — but this program prints
 * the 0-based index of that node in the original list, or {@code -1} when there is no cycle.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * values[0] values[1] ... values[n-1]
 * cyclePos
 * </pre>
 *
 * <p>{@code cyclePos} is the 0-based index of the node the last node points back to;
 * use {@code -1} for a list without a cycle.
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 1 2 3
 * 0
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0
 * </pre>
 *
 * <p>Approach: Floyd's algorithm in two phases. Phase one finds any node inside the cycle,
 * phase two walks the head and the meeting node one step at a time — they meet exactly at
 * the cycle's entry node.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class LinkedListCycleII {

    /**
     * Returns the node where the cycle begins, or {@code null} when the list is acyclic.
     *
     * @param head first node of the list
     * @return the cycle entry node or {@code null}
     */
    public static ListNode detectCycle(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                // phase two: one pointer at the head, one at the meeting node
                ListNode pointer = head;
                while (pointer != slow) {
                    pointer = pointer.next;
                    slow = slow.next;
                }
                return pointer;
            }
        }
        return null;
    }

    /**
     * Returns the 0-based index of the cycle entry node, or {@code -1} when there is no cycle.
     *
     * @param head first node of the list
     * @return the index of the cycle entry node, or {@code -1}
     */
    public static int cycleEntryIndex(ListNode head) {
        ListNode entry = detectCycle(head);
        if (entry == null) {
            return -1;
        }
        int index = 0;
        for (ListNode cur = head; cur != null && cur != entry; cur = cur.next) {
            index++;
        }
        return index;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] values = fs.nextIntArray(n);
        int cyclePos = fs.nextInt();

        ListNode head = ListNode.of(values);
        if (cyclePos >= 0 && head != null) {
            ListNode tail = head;
            while (tail.next != null) {
                tail = tail.next;
            }
            ListNode target = head;
            for (int i = 0; i < cyclePos; i++) {
                target = target.next;
            }
            tail.next = target;   // close the loop
        }

        System.out.println(cycleEntryIndex(head));
    }
}
