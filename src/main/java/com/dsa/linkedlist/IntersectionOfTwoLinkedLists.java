package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;
import com.dsa.utils.ListNode;

/**
 * Problem: Intersection of Two Linked Lists
 * LeetCode: 160 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Two pointers, Pointer switching
 *
 * <p>Problem:
 * Given the heads of two singly linked lists, return the node where the two lists intersect
 * — the first node that is <em>shared</em> by both lists (the same object, not merely the
 * same value). Return {@code null} when the lists do not intersect.
 *
 * <p>Input format (stdin):
 * <pre>
 * nA
 * A values
 * nB
 * B prefix values
 * shared
 * </pre>
 *
 * <p>The second list is built as {@code B prefix} followed by the last {@code shared} nodes of
 * list A, which is how two lists physically share a tail.
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 4 1 8 4 5
 * 3
 * 5 6 1
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 8
 * </pre>
 *
 * <p>Approach: two pointers, each switching to the other list's head when it reaches the
 * end. The two paths then have the same length and the pointers must meet.
 *
 * <p>Complexity: Time O(n + m), Space O(1).
 */
public class IntersectionOfTwoLinkedLists {

    /**
     * Returns the first node shared by the two lists, or {@code null}.
     *
     * @param headA head of the first list
     * @param headB head of the second list
     * @return the shared node or {@code null}
     */
    public static ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        if (headA == null || headB == null) {
            return null;
        }
        ListNode a = headA;
        ListNode b = headB;
        while (a != b) {
            a = (a == null) ? headB : a.next;
            b = (b == null) ? headA : b.next;
        }
        return a;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int nA = fs.nextInt();
        int[] valuesA = fs.nextIntArray(nA);
        int nB = fs.nextInt();
        int[] valuesB = fs.nextIntArray(nB);
        int shared = fs.nextInt();

        ListNode headA = ListNode.of(valuesA);
        ListNode headB = ListNode.of(valuesB);

        if (shared > 0 && headA != null) {
            // the first node of the tail that both lists share
            ListNode sharedHead = headA;
            for (int i = 0; i < nA - shared; i++) {
                sharedHead = sharedHead.next;
            }
            if (headB == null) {
                headB = sharedHead;          // list B is nothing but the shared tail
            } else {
                ListNode tailB = headB;
                while (tailB.next != null) {
                    tailB = tailB.next;
                }
                tailB.next = sharedHead;
            }
        }

        ListNode intersection = getIntersectionNode(headA, headB);
        System.out.println(intersection == null ? "none" : String.valueOf(intersection.val));
    }
}
