package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;
import com.dsa.utils.ListNode;

/**
 * Problem: Middle of the Linked List
 * LeetCode: 876 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Two pointers, Fast and slow
 *
 * <p>Problem:
 * Given the head of a singly linked list, return the **middle node**. When the list has an
 * even number of nodes the answer is the **second** of the two middle nodes (the one at
 * index {@code len / 2}).
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
 * 3
 * </pre>
 *
 * <p>Approach: a slow pointer that moves one step and a fast pointer that moves two. When
 * the fast pointer reaches the end, the slow pointer is in the middle.
 *
 * <p>Complexity: Time O(len), Space O(1).
 */
public class MiddleOfTheLinkedList {

    /**
     * Returns the middle node of the list.
     *
     * @param head first node of the list
     * @return the middle node (the second middle one for even lengths), or {@code null}
     */
    public static ListNode middleNode(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int len = fs.nextInt();
        int[] values = fs.nextIntArray(len);

        ListNode middle = middleNode(ListNode.of(values));
        System.out.println(middle == null ? "none" : String.valueOf(middle.val));
    }
}
