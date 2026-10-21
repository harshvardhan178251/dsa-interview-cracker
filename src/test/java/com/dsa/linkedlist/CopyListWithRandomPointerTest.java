package com.dsa.linkedlist;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertNotSame;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertSame;

class CopyListWithRandomPointerTest {

    private static CopyListWithRandomPointer.RandomNode build(int[] values, int[] random) {
        CopyListWithRandomPointer.RandomNode head = null;
        CopyListWithRandomPointer.RandomNode tail = null;
        CopyListWithRandomPointer.RandomNode[] nodes = new CopyListWithRandomPointer.RandomNode[values.length];
        for (int i = 0; i < values.length; i++) {
            nodes[i] = new CopyListWithRandomPointer.RandomNode(values[i]);
            if (tail == null) {
                head = nodes[i];
            } else {
                tail.next = nodes[i];
            }
            tail = nodes[i];
        }
        for (int i = 0; i < values.length; i++) {
            nodes[i].random = random[i] < 0 ? null : nodes[random[i]];
        }
        return head;
    }

    @Test
    void copiesTheHappyPath() {
        CopyListWithRandomPointer.RandomNode head = build(new int[]{7, 13, 11}, new int[]{2, 0, 0});
        CopyListWithRandomPointer.RandomNode copy = CopyListWithRandomPointer.copyList(head);
        assertSame(copy.next.next, copy.random);       // 7'.random -> 11'
        assertSame(copy, copy.next.random);            // 13'.random -> 7'
        assertSame(copy, copy.next.next.random);       // 11'.random -> 7'
    }

    @Test
    void keepsTheSameValues() {
        CopyListWithRandomPointer.RandomNode head = build(new int[]{7, 13, 11}, new int[]{2, 0, 0});
        CopyListWithRandomPointer.RandomNode copy = CopyListWithRandomPointer.copyList(head);
        assertSame(7, copy.val);
        assertSame(13, copy.next.val);
        assertSame(11, copy.next.next.val);
    }

    @Test
    void doesNotShareNodesWithTheOriginal() {
        CopyListWithRandomPointer.RandomNode head = build(new int[]{7, 13, 11}, new int[]{2, 0, 0});
        CopyListWithRandomPointer.RandomNode copy = CopyListWithRandomPointer.copyList(head);
        assertNotSame(head, copy);
        assertNotSame(head.next, copy.next);
    }

    @Test
    void rewiresTheRandomPointersIntoTheCopy() {
        CopyListWithRandomPointer.RandomNode head = build(new int[]{7, 13, 11}, new int[]{2, 0, 0});
        CopyListWithRandomPointer.RandomNode copy = CopyListWithRandomPointer.copyList(head);
        assertSame(copy.next.next, copy.random);       // 7'.random -> 11'
        assertSame(copy, copy.next.random);            // 13'.random -> 7'
        assertSame(copy, copy.next.next.random);       // 11'.random -> 7'
    }

    @Test
    void keepsNullRandomPointersNull() {
        CopyListWithRandomPointer.RandomNode head = build(new int[]{1, 2}, new int[]{-1, -1});
        CopyListWithRandomPointer.RandomNode copy = CopyListWithRandomPointer.copyList(head);
        assertNull(copy.random);
        assertNull(copy.next.random);
    }

    @Test
    void handlesAnEmptyList() {
        assertNull(CopyListWithRandomPointer.copyList(null));
    }

    @Test
    void restoresTheOriginalChain() {
        CopyListWithRandomPointer.RandomNode head = build(new int[]{1, 2, 3}, new int[]{-1, 0, 1});
        CopyListWithRandomPointer.copyList(head);
        assertSame(1, head.val);
        assertSame(2, head.next.val);
        assertSame(3, head.next.next.val);
        assertNull(head.next.next.next);
    }
}
