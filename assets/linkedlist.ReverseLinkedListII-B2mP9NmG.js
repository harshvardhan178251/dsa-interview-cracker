var e=`linkedlist.ReverseLinkedListII`,t=`package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;
import com.dsa.utils.ListNode;

/**
 * Problem: Reverse Linked List II
 * LeetCode: 92 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Pointer rewiring, Segment reversal
 *
 * <p>Problem:
 * Given the head of a linked list and two positions {@code left} and {@code right}
 * (1-indexed, inclusive), reverse the nodes between those positions and return the head.
 * The rest of the list must stay untouched.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * values[0] values[1] ... values[n-1]
 * left
 * right
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 2 3 4 5
 * 2
 * 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 4 3 2 5
 * </pre>
 *
 * <p>Approach: find the node just before {@code left}, then repeatedly pull the node that
 * follows the segment to the front of the segment. After {@code right - left} moves the
 * segment reads backwards.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class ReverseLinkedListII {

    /**
     * Reverses the sublist between the 1-indexed positions {@code left} and {@code right}.
     *
     * @param head  first node of the list
     * @param left  first position of the segment (1-indexed, inclusive)
     * @param right last position of the segment (1-indexed, inclusive)
     * @return the head of the modified list
     */
    public static ListNode reverseBetween(ListNode head, int left, int right) {
        if (head == null || left >= right) {
            return head;
        }
        ListNode dummy = new ListNode(0, head);
        ListNode prev = dummy;
        for (int i = 1; i < left; i++) {
            prev = prev.next;
        }
        ListNode curr = prev.next;                 // the first node of the segment
        for (int i = 0; i < right - left; i++) {
            ListNode moved = curr.next;            // the node to move to the front
            curr.next = moved.next;                // unlink it from its place
            moved.next = prev.next;                // link it in front of the segment
            prev.next = moved;
        }
        return dummy.next;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] values = fs.nextIntArray(n);
        int left = fs.nextInt();
        int right = fs.nextInt();

        ListNode head = ListNode.of(values);
        ListNode result = reverseBetween(head, left, right);

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
 * Problem: Reverse Linked List II
 * LeetCode: 92 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Pointer rewiring, Segment reversal
 *
 * <p>Problem:
 * Given the head of a linked list and two positions {@code left} and {@code right}
 * (1-indexed, inclusive), reverse the nodes between those positions and return the head.
 * The rest of the list must stay untouched.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * values[0] values[1] ... values[n-1]
 * left
 * right
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 2 3 4 5
 * 2
 * 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 4 3 2 5
 * </pre>
 *
 * <p>Approach: find the node just before {@code left}, then repeatedly pull the node that
 * follows the segment to the front of the segment. After {@code right - left} moves the
 * segment reads backwards.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Reverses the sublist between the 1-indexed positions {@code left} and {@code right}.
     *
     * @param head  first node of the list
     * @param left  first position of the segment (1-indexed, inclusive)
     * @param right last position of the segment (1-indexed, inclusive)
     * @return the head of the modified list
     */
    public static ListNode reverseBetween(ListNode head, int left, int right) {
        if (head == null || left >= right) {
            return head;
        }
        ListNode dummy = new ListNode(0, head);
        ListNode prev = dummy;
        for (int i = 1; i < left; i++) {
            prev = prev.next;
        }
        ListNode curr = prev.next;                 // the first node of the segment
        for (int i = 0; i < right - left; i++) {
            ListNode moved = curr.next;            // the node to move to the front
            curr.next = moved.next;                // unlink it from its place
            moved.next = prev.next;                // link it in front of the segment
            prev.next = moved;
        }
        return dummy.next;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] values = fs.nextIntArray(n);
        int left = fs.nextInt();
        int right = fs.nextInt();

        ListNode head = ListNode.of(values);
        ListNode result = reverseBetween(head, left, right);

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
`,r='\n# Reverse Linked List II — LeetCode 92\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Pointer rewiring · Segment reversal |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Microsoft, Uber |\n\n## Problem Statement\n\nGiven the head of a singly linked list and two positions `left` and `right` (1-indexed and\ninclusive), **reverse the nodes in between** and return the head of the list.\n\n- `left = 2, right = 4` on `1 -> 2 -> 3 -> 4 -> 5` yields `1 -> 4 -> 3 -> 2 -> 5`.\n- Nodes outside `[left, right]` keep their positions.\n- `left == right` changes nothing.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nn\nvalues[0] values[1] ... values[n-1]\nleft\nright\n```\n\n- `n` — number of nodes (1 ≤ n ≤ 500)\n- `values` — n space-separated integers\n- `left` — 1-indexed first position of the segment to reverse\n- `right` — 1-indexed last position of the segment to reverse\n\n## Sample Input\n\n```\n5\n1 2 3 4 5\n2\n4\n```\n\n## Expected Output\n\n```\n1 4 3 2 5\n```\n\n## Approach — Pull Nodes to the Front of the Segment\n\nReversing a segment "in place" is easy when you may use extra nodes, but here the node\nobjects themselves must be reused. The trick is to **move** nodes instead of moving data.\n\n1. Walk to the node **before** `left` (`prev`) using a dummy head so that `left == 1` needs\n   no special case.\n2. Let `curr = prev.next` be the current first node of the segment.\n3. Repeat `right - left` times:\n   - `moved = curr.next` — the node directly after the segment,\n   - `curr.next = moved.next` — unlink it (the segment shrinks by one),\n   - `moved.next = prev.next` — insert it at the front of the segment,\n   - `prev.next = moved` — the segment\'s head now points at it.\n\nEach pass puts one more node at the front of the segment, so after `right - left` passes the\nsegment reads backwards. `curr` always stays the **last** node of the segment, which is\nexactly where it must end up.\n\n**Alternative:** reverse the whole list, reverse the part before `left`, reverse the part\nafter `right` — three reversals, also O(n) time. The move-to-front version touches fewer\nnodes, so it is the one to narrate.\n\n## Dry Run\n\nInput: `1 -> 2 -> 3 -> 4 -> 5`, `left = 2`, `right = 4`\n\nSetup: `dummy -> 1 -> 2 -> 3 -> 4 -> 5`, `prev = 1`, `curr = 2`, segment = `[2, 3, 4]`\n\n| Step | `prev` | `curr` | `moved` | action | list after |\n|---:|---:|---:|---:|---|---|\n| 0 | `1` | `2` | — | setup (`dummy -> 1 -> 2 -> 3 -> 4 -> 5`) | `1 -> 2 -> 3 -> 4 -> 5` |\n| 1 | `1` | `2` | `3` | unlink `3` from `2`; `3 -> 2`; `prev.next = 3` | `1 -> 3 -> 2 -> 4 -> 5` |\n| 2 | `1` | `2` | `4` | unlink `4` from `2`; `4 -> 3`; `prev.next = 4` | `1 -> 4 -> 3 -> 2 -> 5` |\n| 3 | `1` | `2` | `5` | loop ends (`right - left = 2` passes) | `1 -> 4 -> 3 -> 2 -> 5` |\n\n`curr` is still `2` and it is now the **last** node of the segment `[4, 3, 2]` ✓\n\n## Java Solution\n\nSee [`ReverseLinkedListII.java`](./ReverseLinkedListII.java).\n\n```java\npublic static ListNode reverseBetween(ListNode head, int left, int right) {\n    if (head == null || left >= right) {\n        return head;\n    }\n    ListNode dummy = new ListNode(0, head);\n    ListNode prev = dummy;\n    for (int i = 1; i < left; i++) {\n        prev = prev.next;\n    }\n    ListNode curr = prev.next;                 // the first node of the segment\n    for (int i = 0; i < right - left; i++) {\n        ListNode moved = curr.next;            // the node to move to the front\n        curr.next = moved.next;                // unlink it from its place\n        moved.next = prev.next;                // link it in front of the segment\n        prev.next = moved;\n    }\n    return dummy.next;\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n) | One walk to `left` plus `right - left` O(1) moves |\n| **Space** | O(1) | Only three references, no extra nodes |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"Can you do it with a head/tail swap instead?"* → yes: find the node before `left` and\n  the node after `right`, then swap and rewire the tails of the two halves.\n- *"What if the segment spans the whole list?"* → the dummy head covers `left == 1`; the\n  algorithm is unchanged.\n- *"Reverse the segment with a stack instead."* → push the segment onto a stack and rebuild\n  it; O(k) extra space but conceptually simpler.\n\n**Common mistakes:**\n- ❌ Losing the reference to `curr.next` before saving it → the remainder of the list\n  disappears.\n- ❌ Moving `prev` forward during the loop → the front of the segment drifts and the result\n  is wrong.\n- ❌ Forgetting the dummy head → `left == 1` has no "node before the segment" and throws\n  `NullPointerException`.\n\n**How to narrate:**\n> "I will not create new nodes. I find the node before `left` — using a dummy head so\n> position 1 is handled — and then, `right - left` times, I pull the node that sits right\n> after the segment and insert it at the front of the segment. Each pull adds one node to\n> the front, so after the loop the segment reads backwards, and the nodes outside the\n> segment never moved."\n\n## Related Problems\n\n- [Reverse Linked List](ReverseLinkedList.md) — reverse everything\n- [Reverse Nodes in k-Group](ReverseNodesInKGroup.md) — reverse blocks of k\n- [Swap Nodes in Pairs](SwapPairs.md) — reverse every two nodes\n- [Rotate List](RotateList.md) — move the tail to the front\n',i=[`reverseBetween`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};