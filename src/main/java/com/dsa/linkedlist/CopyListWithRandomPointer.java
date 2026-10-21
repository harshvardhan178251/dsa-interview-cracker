package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;

import java.util.IdentityHashMap;
import java.util.Map;

/**
 * Problem: Copy List with Random Pointer
 * LeetCode: 138 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Interleaving, Deep copy with cycles
 *
 * <p>Problem:
 * A linked list node has a {@code next} pointer and a {@code random} pointer that may point
 * at any node of the list (or at {@code null}). Return a **deep copy** of the list: every
 * node is new, and the copy's random pointers point at the **copy's** nodes, not at the
 * originals.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * values[0] values[1] ... values[n-1]
 * random[0] random[1] ... random[n-1]
 * </pre>
 * where {@code random[i]} is the 0-based index of the node that node {@code i}'s random
 * pointer refers to, or {@code -1} for {@code null}.
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 7 13 11
 * 2 0 0
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * 0
 * 0
 * </pre>
 *
 * <p>Approach: weave a copy of every node in between the original nodes, fix up the random
 * pointers while the copy is adjacent to its original, then split the list again.
 *
 * <p>Complexity: Time O(n), Space O(1) besides the copy.
 */
public class CopyListWithRandomPointer {

    /** A node with an extra {@code random} pointer. */
    public static class RandomNode {
        public int val;
        public RandomNode next;
        public RandomNode random;

        public RandomNode(int val) {
            this.val = val;
        }
    }

    /**
     * Deep copies the list: new nodes, and random pointers that point into the copy.
     *
     * @param head head of the original list
     * @return the head of the copy
     */
    public static RandomNode copyList(RandomNode head) {
        if (head == null) {
            return null;
        }
        // 1. weave: A -> A' -> B -> B' -> C -> C'
        for (RandomNode cur = head; cur != null; ) {
            RandomNode copy = new RandomNode(cur.val);
            copy.next = cur.next;
            cur.next = copy;
            cur = copy.next;
        }
        // 2. random pointers: the copy of X points at the copy of X.random
        for (RandomNode cur = head; cur != null; cur = cur.next.next) {
            if (cur.random != null) {
                cur.next.random = cur.random.next;
            }
        }
        // 3. split the two chains apart again
        RandomNode copyHead = null;
        RandomNode copyTail = null;
        for (RandomNode cur = head; cur != null; ) {
            RandomNode copy = cur.next;
            cur.next = copy.next;                    // original chain
            if (copyTail == null) {
                copyHead = copy;
            } else {
                copyTail.next = copy;                // copy chain
            }
            copyTail = copy;
            cur = cur.next;
        }
        return copyHead;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] values = fs.nextIntArray(n);
        int[] random = fs.nextIntArray(n);

        RandomNode head = null;
        RandomNode tail = null;
        RandomNode[] nodes = new RandomNode[n];
        for (int i = 0; i < n; i++) {
            nodes[i] = new RandomNode(values[i]);
            if (tail == null) {
                head = nodes[i];
            } else {
                tail.next = nodes[i];
            }
            tail = nodes[i];
        }
        for (int i = 0; i < n; i++) {
            nodes[i].random = random[i] < 0 ? null : nodes[random[i]];
        }

        RandomNode copy = copyList(head);

        // map every node of the copy to its index so the random pointers can be reported
        Map<RandomNode, Integer> index = new IdentityHashMap<>();
        int i = 0;
        for (RandomNode c = copy; c != null; c = c.next) {
            index.put(c, i++);
        }

        StringBuilder sb = new StringBuilder();
        for (RandomNode c = copy; c != null; c = c.next) {
            Integer target = c.random == null ? null : index.get(c.random);
            if (sb.length() > 0) {
                sb.append('\n');
            }
            sb.append(target == null ? -1 : target);
        }
        System.out.println(sb);
    }
}
