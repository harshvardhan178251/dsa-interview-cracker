package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;
import com.dsa.utils.ListNode;

/**
 * Problem: Linked List Cycle
 * LeetCode: 141 | Difficulty: Easy | Frequency: 5/5
 * Pattern: Two pointers, Floyd's cycle detection
 *
 * <p>Problem:
 * Given the head of a linked list, decide whether the list contains a cycle. A cycle exists
 * when some node's {@code next} points back at a node that was already visited.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * values[0] values[1] ... values[n-1]
 * cyclePos
 * </pre>
 *
 * <p>{@code cyclePos} is the 0-based index of the node the last node points back to;
 * use {@code -1} to build a list whose last node points at {@code null}.
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
 * true
 * </pre>
 *
 * <p>Approach: Floyd's tortoise and hare. One pointer moves one step, the other two steps.
 * In an acyclic list the fast pointer reaches the end; in a cyclic list the distance
 * between the two pointers shrinks by one per lap until they meet.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class DetectCycle {

    /**
     * Returns {@code true} when the list contains a cycle.
     *
     * @param head first node of the list
     * @return whether a cycle exists
     */
    public static boolean hasCycle(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                return true;
            }
        }
        return false;
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

        System.out.println(hasCycle(head) ? "true" : "false");
    }
}
