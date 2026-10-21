package com.dsa.linkedlist;

import com.dsa.utils.ListNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

class IntersectionOfTwoLinkedListsTest {

    /** Builds A, then B = B prefix + the last `shared` nodes of A. */
    private static ListNode[] build(int[] a, int[] bPrefix, int shared) {
        ListNode headA = ListNode.of(a);
        ListNode headB = ListNode.of(bPrefix);
        if (shared > 0 && headA != null) {
            ListNode sharedHead = headA;
            for (int i = 0; i < a.length - shared; i++) {
                sharedHead = sharedHead.next;
            }
            if (headB == null) {
                headB = sharedHead;
            } else {
                ListNode tailB = headB;
                while (tailB.next != null) {
                    tailB = tailB.next;
                }
                tailB.next = sharedHead;
            }
        }
        return new ListNode[]{headA, headB};
    }

    @Test
    void findsTheIntersectionNode() {
        ListNode[] lists = build(new int[]{4, 1, 8, 4, 5}, new int[]{5, 6, 1}, 3);
        ListNode answer = IntersectionOfTwoLinkedLists.getIntersectionNode(lists[0], lists[1]);
        assertArrayEquals(new int[]{8}, new int[]{answer.val});
    }

    @Test
    void returnsTheSameNodeObject() {
        ListNode[] lists = build(new int[]{4, 1, 8, 4, 5}, new int[]{5, 6, 1}, 3);
        ListNode answer = IntersectionOfTwoLinkedLists.getIntersectionNode(lists[0], lists[1]);
        assertArrayEquals(new int[]{8, 4, 5}, answer.toArray());
    }

    @Test
    void returnsNullForDisjointLists() {
        ListNode[] lists = build(new int[]{1, 2, 3}, new int[]{4, 5}, 0);
        assertNull(IntersectionOfTwoLinkedLists.getIntersectionNode(lists[0], lists[1]));
    }

    @Test
    void handlesAnEmptyList() {
        assertNull(IntersectionOfTwoLinkedLists.getIntersectionNode(null, ListNode.of(1)));
        assertNull(IntersectionOfTwoLinkedLists.getIntersectionNode(ListNode.of(1), null));
    }

    @Test
    void handlesTwoEmptyLists() {
        assertNull(IntersectionOfTwoLinkedLists.getIntersectionNode(null, null));
    }

    @Test
    void findsAnIntersectionAtTheVeryFirstNode() {
        ListNode[] lists = build(new int[]{1, 2, 3}, new int[]{}, 3);
        ListNode answer = IntersectionOfTwoLinkedLists.getIntersectionNode(lists[0], lists[1]);
        assertArrayEquals(new int[]{1, 2, 3}, answer.toArray());
    }

    @Test
    void doesNotConfuseEqualValuesWithSharedNodes() {
        // both lists hold 1, 2, 3 but they are different nodes
        ListNode[] lists = build(new int[]{1, 2, 3}, new int[]{1, 2, 3}, 0);
        assertNull(IntersectionOfTwoLinkedLists.getIntersectionNode(lists[0], lists[1]));
    }
}
