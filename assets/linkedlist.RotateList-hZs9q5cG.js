var e=`linkedlist.RotateList`,t=`package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;
import com.dsa.utils.ListNode;

/**
 * Problem: Rotate List
 * LeetCode: 61 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Pointer rewiring, Circular list
 *
 * <p>Problem:
 * Rotate a singly linked list to the right by {@code k} positions: the last {@code k} nodes
 * move in front of the first {@code n - k} nodes.
 *
 * <p>Input format (stdin):
 * <pre>
 * len
 * values[0] values[1] ... values[len-1]
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
 * 4 5 1 2 3
 * </pre>
 *
 * <p>Approach: find the tail, turn the list into a circle, and cut it at the right place.
 *
 * <p>Complexity: Time O(len), Space O(1).
 */
public class RotateList {

    /**
     * Rotates the list to the right by {@code k} positions.
     *
     * @param head first node of the list
     * @param k    number of positions to rotate right
     * @return the new head
     */
    public static ListNode rotateRight(ListNode head, int k) {
        if (head == null || head.next == null) {
            return head;
        }
        int length = 1;
        ListNode tail = head;
        while (tail.next != null) {
            tail = tail.next;
            length++;
        }
        k = ((k % length) + length) % length;   // k may be larger than the list
        if (k == 0) {
            return head;
        }
        // the new tail is the (length - k)-th node
        ListNode newTail = head;
        for (int i = 1; i < length - k; i++) {
            newTail = newTail.next;
        }
        ListNode newHead = newTail.next;
        newTail.next = null;      // break the list in two
        tail.next = head;         // close the circle
        return newHead;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int len = fs.nextInt();
        int[] values = fs.nextIntArray(len);
        int k = fs.nextInt();

        ListNode result = rotateRight(ListNode.of(values), k);

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
 * Problem: Rotate List
 * LeetCode: 61 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Pointer rewiring, Circular list
 *
 * <p>Problem:
 * Rotate a singly linked list to the right by {@code k} positions: the last {@code k} nodes
 * move in front of the first {@code n - k} nodes.
 *
 * <p>Input format (stdin):
 * <pre>
 * len
 * values[0] values[1] ... values[len-1]
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
 * 4 5 1 2 3
 * </pre>
 *
 * <p>Approach: find the tail, turn the list into a circle, and cut it at the right place.
 *
 * <p>Complexity: Time O(len), Space O(1).
 */
public class Main {

    /**
     * Rotates the list to the right by {@code k} positions.
     *
     * @param head first node of the list
     * @param k    number of positions to rotate right
     * @return the new head
     */
    public static ListNode rotateRight(ListNode head, int k) {
        if (head == null || head.next == null) {
            return head;
        }
        int length = 1;
        ListNode tail = head;
        while (tail.next != null) {
            tail = tail.next;
            length++;
        }
        k = ((k % length) + length) % length;   // k may be larger than the list
        if (k == 0) {
            return head;
        }
        // the new tail is the (length - k)-th node
        ListNode newTail = head;
        for (int i = 1; i < length - k; i++) {
            newTail = newTail.next;
        }
        ListNode newHead = newTail.next;
        newTail.next = null;      // break the list in two
        tail.next = head;         // close the circle
        return newHead;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int len = fs.nextInt();
        int[] values = fs.nextIntArray(len);
        int k = fs.nextInt();

        ListNode result = rotateRight(ListNode.of(values), k);

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
`,r='\n# Rotate List — LeetCode 61\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Pointer rewiring · Circular list |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |\n\n## Problem Statement\n\nGiven the head of a singly linked list and an integer `k`, rotate the list to the **right** by\n`k` positions.\n\n- `1 -> 2 -> 3 -> 4 -> 5` with `k = 2` becomes `4 -> 5 -> 1 -> 2 -> 3`.\n- `k` may be larger than the length of the list (use `k mod n`).\n- `k = 0` returns the list unchanged.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nlen\nvalues[0] values[1] ... values[len-1]\nk\n```\n\n- `len` — number of nodes (1 ≤ len ≤ 5 × 10⁴)\n- `values` — len space-separated integers\n- `k` — how many positions to rotate right (0 ≤ k ≤ 2 × 10⁹)\n\n## Sample Input\n\n```\n5\n1 2 3 4 5\n2\n```\n\n## Expected Output\n\n```\n4 5 1 2 3\n```\n\n## Approach — Close the Circle, Then Cut It\n\nRotating a list by `k` is the same as cutting a **circular** list at a different point. So:\n\n1. Walk to the tail and remember the length `len`.\n2. Reduce `k` to `k mod len` — rotating by `len` is the identity.\n3. The node that ends up **last** is the `(len - k)`-th node; the node that ends up **first**\n   is its successor. Walk `len - k - 1` steps to find that new tail.\n4. Break the list there (`newTail.next = null`) and close the circle (`tail.next = head`).\n5. The successor of the new tail is the new head.\n\n**Why the new tail is the `(len - k)`-th node:** after rotating right by `k`, the last `k`\nnodes end up in front. The node that was at position `len - k` (1-indexed) is the last node\nof the remaining front part, so it becomes the tail of the whole list.\n\n**Alternative:** reverse the list, take `k` nodes off the front, reverse again and stitch —\nmore steps, same complexity. The circular trick is the one to narrate.\n\n## Dry Run\n\nInput: `1 -> 2 -> 3 -> 4 -> 5`, `k = 2`, `len = 5`\n\n| Step | action | `newTail` | `newHead` | list state |\n|---:|---|---|---|---|\n| 0 | initial | — | — | `1 -> 2 -> 3 -> 4 -> 5` |\n| 1 | walk to the tail, `len = 5`, `tail = 5` | — | — | `1 -> 2 -> 3 -> 4 -> 5` |\n| 2 | `k = 2 % 5 = 2` | — | — | `1 -> 2 -> 3 -> 4 -> 5` |\n| 3 | walk `len - k - 1 = 2` steps | `3` | — | `1 -> 2 -> 3 -> 4 -> 5` |\n| 4 | `newHead = newTail.next`; `newTail.next = null` | `3` | `4` | `1 -> 2 -> 3` and `4 -> 5` |\n| 5 | `tail.next = head` (close the circle) | `3` | `4` | `1 -> 2 -> 3 -> 4 -> 5 -> 1 -> 2 -> 3` |\n| 6 | return `newHead` | `3` | `4` | `4 -> 5 -> 1 -> 2 -> 3` |\n\nThe result is `4 5 1 2 3`. ✓\n\n### Edge case — `k` larger than the list\n\n`len = 3`, `k = 7` → `k = 7 % 3 = 1` → one position to the right → `3 -> 1 -> 2`.\n\n## Java Solution\n\nSee [`RotateList.java`](./RotateList.java).\n\n```java\npublic static ListNode rotateRight(ListNode head, int k) {\n    if (head == null || head.next == null) {\n        return head;\n    }\n    int length = 1;\n    ListNode tail = head;\n    while (tail.next != null) {\n        tail = tail.next;\n        length++;\n    }\n    k = ((k % length) + length) % length;\n    if (k == 0) {\n        return head;\n    }\n    ListNode newTail = head;\n    for (int i = 1; i < length - k; i++) {\n        newTail = newTail.next;\n    }\n    ListNode newHead = newTail.next;\n    newTail.next = null;      // break the list in two\n    tail.next = head;         // close the circle\n    return newHead;\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(len) | Two linear walks |\n| **Space** | O(1) | Only pointers |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"Rotate to the left instead."* → the new head is the `(k + 1)`-th node and the new tail\n  is the `k`-th node; the same circle trick applies.\n- *"What if `k` is huge?"* → reduce it with `k % len` first.\n- *"Rotate an array instead."* → three reversals, or the same "cut the circle" idea with\n  modular arithmetic.\n- *"Rotate by `k` in O(1) space without knowing the length."* → impossible in one pass\n  without the length or a sentinel; the two-pass version is the standard answer.\n\n**Common mistakes:**\n- ❌ Forgetting `k % len` → the walk runs past the end of the list.\n- ❌ Breaking the list **before** saving `newHead` → `newHead` is lost.\n- ❌ Setting `tail.next = head` before `newTail.next = null` → the old tail keeps the old\n  successor and the list grows a loop in the wrong place.\n\n**How to narrate:**\n> "A rotation is a cut in a circular list. I walk to the tail, get the length, and reduce k\n> modulo the length. The node that becomes the new tail is the (length − k)-th node, so I\n> walk to it, remember its successor as the new head, cut the list after the new tail and\n> link the old tail back to the head. O(n) time, O(1) space."\n\n## Related Problems\n\n- [Reverse Linked List](ReverseLinkedList.md) — the same pointer surgery\n- [Reverse Nodes in k-Group](ReverseNodesInKGroup.md) — blocks of k\n- [Reorder List](ReorderList.md) — split, reverse, interleave\n',i=[`rotateRight`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};