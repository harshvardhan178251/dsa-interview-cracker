var e=`linkedlist.ReverseNodesInKGroup`,t=`package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;
import com.dsa.utils.ListNode;

/**
 * Problem: Reverse Nodes in k-Group
 * LeetCode: 25 | Difficulty: Hard | Frequency: 4/5
 * Pattern: Pointer rewiring, Block reversal
 *
 * <p>Problem:
 * Given the head of a linked list and an integer {@code k}, reverse the order of the nodes
 * in every group of {@code k} nodes. Nodes left over at the end (fewer than {@code k}) keep
 * their original order.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * values[0] values[1] ... values[n-1]
 * k
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 2 3 4 5
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2 1 4 3 5
 * </pre>
 *
 * <p>Approach: for every block of k nodes, find its k-th node, remember the node after the
 * block, reverse the block, and stitch it back in front of the block's old position.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class ReverseNodesInKGroup {

    /**
     * Reverses every complete group of {@code k} nodes.
     *
     * @param head first node of the list
     * @param k    group size (values &lt;= 1 leave the list unchanged)
     * @return the new head
     */
    public static ListNode reverseKGroup(ListNode head, int k) {
        if (head == null || k <= 1) {
            return head;
        }
        ListNode dummy = new ListNode(0, head);
        ListNode groupPrev = dummy;

        while (true) {
            // find the k-th node of the current group
            ListNode kth = groupPrev;
            for (int i = 0; i < k && kth != null; i++) {
                kth = kth.next;
            }
            if (kth == null) {
                break;                      // fewer than k nodes left: keep them as they are
            }
            ListNode groupNext = kth.next;  // the node after the group

            // reverse the block [groupPrev.next .. kth]
            ListNode prev = groupNext;
            ListNode curr = groupPrev.next;
            while (curr != groupNext) {
                ListNode next = curr.next;
                curr.next = prev;
                prev = curr;
                curr = next;
            }

            // the old first node of the block is now its tail
            ListNode newGroupPrev = groupPrev.next;
            groupPrev.next = kth;
            groupPrev = newGroupPrev;
        }
        return dummy.next;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] values = fs.nextIntArray(n);
        int k = fs.nextInt();

        ListNode head = ListNode.of(values);
        ListNode result = reverseKGroup(head, k);

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
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

/**
 * Problem: Reverse Nodes in k-Group
 * LeetCode: 25 | Difficulty: Hard | Frequency: 4/5
 * Pattern: Pointer rewiring, Block reversal
 *
 * <p>Problem:
 * Given the head of a linked list and an integer {@code k}, reverse the order of the nodes
 * in every group of {@code k} nodes. Nodes left over at the end (fewer than {@code k}) keep
 * their original order.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * values[0] values[1] ... values[n-1]
 * k
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 2 3 4 5
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2 1 4 3 5
 * </pre>
 *
 * <p>Approach: for every block of k nodes, find its k-th node, remember the node after the
 * block, reverse the block, and stitch it back in front of the block's old position.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Reverses every complete group of {@code k} nodes.
     *
     * @param head first node of the list
     * @param k    group size (values &lt;= 1 leave the list unchanged)
     * @return the new head
     */
    public static ListNode reverseKGroup(ListNode head, int k) {
        if (head == null || k <= 1) {
            return head;
        }
        ListNode dummy = new ListNode(0, head);
        ListNode groupPrev = dummy;

        while (true) {
            // find the k-th node of the current group
            ListNode kth = groupPrev;
            for (int i = 0; i < k && kth != null; i++) {
                kth = kth.next;
            }
            if (kth == null) {
                break;                      // fewer than k nodes left: keep them as they are
            }
            ListNode groupNext = kth.next;  // the node after the group

            // reverse the block [groupPrev.next .. kth]
            ListNode prev = groupNext;
            ListNode curr = groupPrev.next;
            while (curr != groupNext) {
                ListNode next = curr.next;
                curr.next = prev;
                prev = curr;
                curr = next;
            }

            // the old first node of the block is now its tail
            ListNode newGroupPrev = groupPrev.next;
            groupPrev.next = kth;
            groupPrev = newGroupPrev;
        }
        return dummy.next;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] values = fs.nextIntArray(n);
        int k = fs.nextInt();

        ListNode head = ListNode.of(values);
        ListNode result = reverseKGroup(head, k);

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

// ---------- inlined com.dsa.utils.FastScanner ----------
/**
 * Allocation-light scanner for contest-style stdin input.
 *
 * <p>Every problem in this repository reads its input through this class so the
 * expected stdin format stays consistent across the whole set.
 *
 * <p>Typical usage:
 * <pre>{@code
 * FastScanner fs = new FastScanner(System.in);
 * int n = fs.nextInt();
 * int[] nums = fs.nextIntArray(n);
 * }</pre>
 */
class FastScanner {

    private final BufferedReader reader;
    private final char[] buffer = new char[1 << 16];
    private int ptr = 0;
    private int len = 0;

    public FastScanner(InputStream in) {
        this.reader = new BufferedReader(new InputStreamReader(in, StandardCharsets.UTF_8), 1 << 16);
    }

    /** Returns the next raw character, or -1 at end of input. */
    private int read() throws IOException {
        if (ptr >= len) {
            len = reader.read(buffer);
            ptr = 0;
            if (len <= 0) {
                return -1;
            }
        }
        return buffer[ptr++];
    }

    private void skipWhitespace() throws IOException {
        int c;
        while ((c = read()) != -1) {
            if (!Character.isWhitespace(c)) {
                ptr--; // step back onto the first meaningful character
                return;
            }
        }
    }

    /** True when at least one more non-whitespace character exists. */
    public boolean hasNext() throws IOException {
        skipWhitespace();
        return ptr < len;
    }

    /** Reads the next whitespace-delimited token as a string. */
    public String next() throws IOException {
        skipWhitespace();
        StringBuilder sb = new StringBuilder();
        int c;
        while ((c = read()) != -1 && !Character.isWhitespace(c)) {
            sb.append((char) c);
        }
        return sb.toString();
    }

    public int nextInt() throws IOException {
        skipWhitespace();
        int c = read();
        while (c != -1 && c != '-' && (c < '0' || c > '9')) {
            c = read();
        }
        int sign = 1;
        if (c == '-') {
            sign = -1;
            c = read();
        }
        int value = 0;
        while (c >= '0' && c <= '9') {
            value = value * 10 + (c - '0');
            c = read();
        }
        return sign * value;
    }

    public long nextLong() throws IOException {
        skipWhitespace();
        int c = read();
        while (c != -1 && c != '-' && (c < '0' || c > '9')) {
            c = read();
        }
        int sign = 1;
        if (c == '-') {
            sign = -1;
            c = read();
        }
        long value = 0;
        while (c >= '0' && c <= '9') {
            value = value * 10 + (c - '0');
            c = read();
        }
        return sign * value;
    }

    public double nextDouble() throws IOException {
        return Double.parseDouble(next());
    }

    public char nextChar() throws IOException {
        skipWhitespace();
        int c = read();
        return c == -1 ? '\\0' : (char) c;
    }

    /** Reads exactly {@code n} integers. */
    public int[] nextIntArray(int n) throws IOException {
        int[] out = new int[n];
        for (int i = 0; i < n; i++) {
            out[i] = nextInt();
        }
        return out;
    }

    /** Reads exactly {@code n} longs. */
    public long[] nextLongArray(int n) throws IOException {
        long[] out = new long[n];
        for (int i = 0; i < n; i++) {
            out[i] = nextLong();
        }
        return out;
    }

    /** Reads exactly {@code n} whitespace-delimited strings. */
    public String[] nextStringArray(int n) throws IOException {
        String[] out = new String[n];
        for (int i = 0; i < n; i++) {
            out[i] = next();
        }
        return out;
    }
}

// ---------- inlined com.dsa.utils.ListNode ----------
/**
 * Singly linked list node used across the linked-list problems.
 */
class ListNode {

    public int val;
    public ListNode next;

    public ListNode() {
    }

    public ListNode(int val) {
        this.val = val;
    }

    public ListNode(int val, ListNode next) {
        this.val = val;
        this.next = next;
    }

    /** Builds a chain from the given values, e.g. {@code ListNode.of(1, 2, 3)}. */
    public static ListNode of(int... values) {
        ListNode dummy = new ListNode();
        ListNode tail = dummy;
        for (int v : values) {
            tail.next = new ListNode(v);
            tail = tail.next;
        }
        return dummy.next;
    }

    /** Builds a chain from an array; {@code null} for a null input. */
    public static ListNode fromArray(int[] values) {
        if (values == null) {
            return null;
        }
        return of(values);
    }

    /** Flattens the chain into an array (ignores any cycle). */
    public int[] toArray() {
        int[] out = new int[size()];
        ListNode cur = this;
        for (int i = 0; cur != null && i < out.length; i++) {
            out[i] = cur.val;
            cur = cur.next;
        }
        return out;
    }

    public int size() {
        int n = 0;
        for (ListNode cur = this; cur != null; cur = cur.next) {
            n++;
        }
        return n;
    }

    @Override
    public String toString() {
        return Arrays.toString(toArray());
    }
}
`,r=`
# Reverse Nodes in k-Group — LeetCode 25

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Pointer rewiring · Block reversal |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

Given the head of a linked list and a positive integer \`k\`, reverse the order of the nodes in
**every group of \`k\` consecutive nodes**.

- The list \`1 -> 2 -> 3 -> 4 -> 5\` with \`k = 2\` becomes \`2 -> 1 -> 4 -> 3 -> 5\`.
- With \`k = 3\` it becomes \`3 -> 2 -> 1 -> 4 -> 5\`.
- If the last group has fewer than \`k\` nodes, those nodes stay in their original order.

## Input Format

The program reads from standard input:

\`\`\`
n
values[0] values[1] ... values[n-1]
k
\`\`\`

- \`n\` — number of nodes (1 ≤ n ≤ 10⁴)
- \`values\` — n space-separated integers
- \`k\` — the group size (1 ≤ k ≤ n)

## Sample Input

\`\`\`
5
1 2 3 4 5
2
\`\`\`

## Expected Output

\`\`\`
2 1 4 3 5
\`\`\`

## Approach — Reverse Block by Block

The classic reversal works on a contiguous run of nodes. Here the list is chopped into
consecutive runs of \`k\`, and each run is reversed independently — but a reversed run has to be
**stitched back** at exactly the right place, otherwise the groups interleave.

Per group:

1. **Locate** the \`k\`-th node of the group by walking \`k\` steps from the node in front of
   the group. If the list runs out, stop — the leftover nodes stay untouched.
2. **Remember** the node after the group (\`groupNext\`); it becomes the new \`prev\` seed when
   the block is reversed.
3. **Reverse** the block, starting \`prev\` at \`groupNext\` so the last node of the block points
   at the untouched remainder instead of at \`null\`.
4. **Stitch**: the block's old first node is now its tail, so the node in front of the group
   must point at the block's *last* node (the \`k\`-th node), and the group boundary moves to
   the block's old first node.

The dummy head removes the "what if the first group starts at the head?" special case.

## Dry Run

Input: \`1 -> 2 -> 3 -> 4 -> 5\`, \`k = 2\`

| Step | \`groupPrev\` | block before | \`k\`-th node | block after (reversed) | whole list |
|---:|---|---|---|---|---|
| 0 | \`dummy\` | \`1 -> 2\` | \`2\` | — | \`1 -> 2 -> 3 -> 4 -> 5\` |
| 1 | \`dummy\` | \`1 -> 2\` | \`2\` | \`2 -> 1\` | \`2 -> 1 -> 3 -> 4 -> 5\` |
| 2 | \`1\` | \`3 -> 4\` | \`4\` | \`4 -> 3\` | \`2 -> 1 -> 4 -> 3 -> 5\` |
| 3 | \`3\` | \`5 -> null\` | \`null\` | — (fewer than k nodes left) | \`2 -> 1 -> 4 -> 3 -> 5\` |

Inside step 1 the block reversal runs with \`prev = 3\` (the node after the group):

| micro-step | \`curr\` | \`next\` saved | \`curr.next\` becomes | \`prev\` after | block state |
|---:|---:|---:|---:|---:|---|
| 1 | \`1\` | \`2\` | \`3\` | \`1\` | \`1 -> 3\` |
| 2 | \`2\` | \`3\` | \`1\` | \`2\` | \`2 -> 1 -> 3\` |

After the block is reversed we set \`groupPrev.next = kth (2)\` and move \`groupPrev\` to the
block's old first node (\`1\`). The list is now \`2 -> 1 -> 3 -> 4 -> 5\` ✓

## Java Solution

See [\`ReverseNodesInKGroup.java\`](./ReverseNodesInKGroup.java).

\`\`\`java
public static ListNode reverseKGroup(ListNode head, int k) {
    if (head == null || k <= 1) {
        return head;
    }
    ListNode dummy = new ListNode(0, head);
    ListNode groupPrev = dummy;

    while (true) {
        ListNode kth = groupPrev;
        for (int i = 0; i < k && kth != null; i++) {
            kth = kth.next;
        }
        if (kth == null) {
            break;                      // fewer than k nodes left: keep them as they are
        }
        ListNode groupNext = kth.next;

        ListNode prev = groupNext;
        ListNode curr = groupPrev.next;
        while (curr != groupNext) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }

        ListNode newGroupPrev = groupPrev.next;
        groupPrev.next = kth;
        groupPrev = newGroupPrev;
    }
    return dummy.next;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every node is walked a constant number of times (once to find the \`k\`-th, once to reverse) |
| **Space** | O(1) | Only a handful of references |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if \`k\` is larger than the list length?"* → nothing is reversed; the loop breaks on
  the first \`k\`-th-node search.
- *"Can you do it in place without a dummy node?"* → yes, handle the first group separately
  — more code, no benefit.
- *"What if you must reverse the leftover group too?"* → reverse it unconditionally instead of
  breaking out of the loop.

**Common mistakes:**
- ❌ Seeding the reversal with \`prev = null\` → the last node of the block points at \`null\`
  and the rest of the list is cut off.
- ❌ Forgetting to keep \`groupNext\` before reversing → the remainder is lost.
- ❌ Moving \`groupPrev\` to \`kth\` instead of to the block's **old first node** → the next group
  starts in the wrong place.

**How to narrate:**
> "I process the list group by group. For each group I first walk \`k\` steps to find the
> group's last node — if I run out of list, the rest stays as it is. Then I remember the node
> after the group, reverse the block using that node as the seed so the block's tail points
> at the untouched remainder, and finally I re-link: the node before the group now points at
> the block's last node, and the group boundary becomes the block's old first node. Every node
> is visited O(1) times, so the whole thing is O(n) time and O(1) space."

## Related Problems

- [Reverse Linked List](ReverseLinkedList.md) — reverse the whole list
- [Reverse Linked List II](ReverseLinkedListII.md) — reverse one segment
- [Swap Nodes in Pairs](SwapPairs.md) — the special case k = 2
- [Rotate List](RotateList.md) — move the tail to the front
`,i=[`reverseKGroup`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};