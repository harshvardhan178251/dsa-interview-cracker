var e=`linkedlist.OddEvenLinkedList`,t=`package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;
import com.dsa.utils.ListNode;

/**
 * Problem: Odd Even Linked List
 * LeetCode: 328 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Pointer rewiring, Two chains
 *
 * <p>Problem:
 * Given the head of a singly linked list, reorder it so that all the nodes at **odd**
 * positions come first, followed by all the nodes at **even** positions. The relative order
 * inside each group is preserved.
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
 * 1 3 5 2 4
 * </pre>
 *
 * <p>Approach: split the list into an odd chain and an even chain with one pass, then join
 * the tail of the odd chain to the head of the even chain.
 *
 * <p>Complexity: Time O(len), Space O(1).
 */
public class OddEvenLinkedList {

    /**
     * Reorders the list so that odd positions come first, then even positions.
     *
     * @param head first node of the list (modified in place)
     * @return the new head
     */
    public static ListNode oddEvenList(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }
        ListNode oddHead = head;
        ListNode evenHead = head.next;
        ListNode odd = oddHead;
        ListNode even = evenHead;

        while (even != null && even.next != null) {
            odd.next = even.next;      // the next odd node
            odd = odd.next;
            even.next = odd.next;      // the next even node
            even = even.next;
        }
        odd.next = evenHead;           // join the two chains
        return oddHead;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int len = fs.nextInt();
        int[] values = fs.nextIntArray(len);

        ListNode result = oddEvenList(ListNode.of(values));

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
 * Problem: Odd Even Linked List
 * LeetCode: 328 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Pointer rewiring, Two chains
 *
 * <p>Problem:
 * Given the head of a singly linked list, reorder it so that all the nodes at **odd**
 * positions come first, followed by all the nodes at **even** positions. The relative order
 * inside each group is preserved.
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
 * 1 3 5 2 4
 * </pre>
 *
 * <p>Approach: split the list into an odd chain and an even chain with one pass, then join
 * the tail of the odd chain to the head of the even chain.
 *
 * <p>Complexity: Time O(len), Space O(1).
 */
public class Main {

    /**
     * Reorders the list so that odd positions come first, then even positions.
     *
     * @param head first node of the list (modified in place)
     * @return the new head
     */
    public static ListNode oddEvenList(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }
        ListNode oddHead = head;
        ListNode evenHead = head.next;
        ListNode odd = oddHead;
        ListNode even = evenHead;

        while (even != null && even.next != null) {
            odd.next = even.next;      // the next odd node
            odd = odd.next;
            even.next = odd.next;      // the next even node
            even = even.next;
        }
        odd.next = evenHead;           // join the two chains
        return oddHead;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int len = fs.nextInt();
        int[] values = fs.nextIntArray(len);

        ListNode result = oddEvenList(ListNode.of(values));

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
`,r='\n# Odd Even Linked List — LeetCode 328\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Pointer rewiring · Two chains |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |\n\n## Problem Statement\n\nReorder a singly linked list so that all the nodes at **odd** positions are followed by all the\nnodes at **even** positions. The relative order within each group is preserved.\n\n- `1 -> 2 -> 3 -> 4 -> 5` becomes `1 -> 3 -> 5 -> 2 -> 4`.\n- `1 -> 2 -> 3 -> 4` becomes `1 -> 3 -> 2 -> 4`.\n- Positions are 1-indexed: the head is position 1 (odd).\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nlen\nvalues[0] values[1] ... values[len-1]\n```\n\n- `len` — number of nodes (1 ≤ len ≤ 5 × 10⁴)\n- `values` — len space-separated integers\n\n## Sample Input\n\n```\n5\n1 2 3 4 5\n```\n\n## Expected Output\n\n```\n1 3 5 2 4\n```\n\n## Approach — Two Chains, One Pass\n\nThe list is already a perfect interleaving of two subsequences: the odd positions and the\neven positions. The job is to **separate** them and then **concatenate** them.\n\n1. `oddHead` = node 1, `evenHead` = node 2.\n2. Walk both chains at once. `odd.next = even.next` links the next odd node; `even.next =\n   odd.next` links the next even node. Then advance both pointers.\n3. The loop stops when the even chain runs out — at that point the last odd node is the\n   tail of the odd chain.\n4. `odd.next = evenHead` joins the two chains.\n\nDoing it with two chains avoids the alternative "collect into an array and rebuild" which\ncosts O(n) space.\n\n**Why the loop condition is `even != null && even.next != null`:** the even chain must\nhave a *successor* for the odd chain to be extended. On a list of odd length the even chain\nis the shorter one and the last odd node stays the tail of the whole list.\n\n## Dry Run\n\nInput: `1 -> 2 -> 3 -> 4 -> 5`, `odd = 1`, `even = 2`\n\n| Step | `odd` | `even` | `odd.next` set to | `even.next` set to | list |\n|---:|---|---|---|---|---|\n| 0 | `1` | `2` | — | — | `1 -> 2 -> 3 -> 4 -> 5` |\n| 1 | `1` | `2` | `3` | `4` | `1 -> 3 -> 2 -> 4 -> 5` |\n| 2 | `3` | `4` | `5` | `null` | `1 -> 3 -> 5 -> 2 -> 4` |\n| 3 | `5` | `null` | — | — | loop ends (`even == null`) |\n\nNow `odd` is on `5` (the tail of the odd chain) and `evenHead` is still `2`.\n\n| Step | action | list |\n|---:|---|---|\n| 4 | `odd.next = evenHead` → `5.next = 2` | `1 -> 3 -> 5 -> 2 -> 4` |\n\nThe result is `1 3 5 2 4`. ✓\n\n### Even length — `1 -> 2 -> 3 -> 4`\n\n| Step | `odd` | `even` | `odd.next` | `even.next` | list |\n|---:|---|---|---|---|---|\n| 1 | `1` | `2` | `3` | `4` | `1 -> 3 -> 2 -> 4` |\n| 2 | `3` | `4` | — | — | loop ends (`even.next == null`) |\n| 3 | join: `3.next = 2` | | | | `1 -> 3 -> 2 -> 4` |\n\n## Java Solution\n\nSee [`OddEvenLinkedList.java`](./OddEvenLinkedList.java).\n\n```java\npublic static ListNode oddEvenList(ListNode head) {\n    if (head == null || head.next == null) {\n        return head;\n    }\n    ListNode oddHead = head;\n    ListNode evenHead = head.next;\n    ListNode odd = oddHead;\n    ListNode even = evenHead;\n\n    while (even != null && even.next != null) {\n        odd.next = even.next;\n        odd = odd.next;\n        even.next = odd.next;\n        even = even.next;\n    }\n    odd.next = evenHead;\n    return oddHead;\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(len) | One pass over the nodes |\n| **Space** | O(1) | Only four pointers |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"Odd positions first, then even, but reversed inside each group?"* → collect into two\n  stacks and rebuild.\n- *"Group the nodes by value parity instead of position."* → two buckets and a join.\n- *"Rotate the list by one."* → the same shape of surgery — see\n  [Rotate List](RotateList.md).\n- *"Do it in O(1) space without mutating the list."* → you must copy into an array first:\n  O(n) space, O(n) time.\n\n**Common mistakes:**\n- ❌ Setting `even.next = odd.next` **before** `odd.next = even.next` → the odd chain is\n  broken and nodes are lost.\n- ❌ Using `while (even != null)` only → the last iteration writes `odd.next = null` and\n  drops the tail.\n- ❌ Forgetting the final `odd.next = evenHead` → the even chain is left dangling.\n\n**How to narrate:**\n> "The list is already an interleaving of the odd and the even positions, so I split it into\n> two chains in a single pass: the odd chain takes every second node, the even chain takes\n> the rest. While the even chain has a successor, I rewire both `next` pointers. Then I\n> link the tail of the odd chain to the head of the even chain. One pass, O(1) space, and\n> the order inside each group is preserved."\n\n## Related Problems\n\n- [Rotate List](RotateList.md) — the same kind of surgery\n- [Swap Nodes in Pairs](SwapPairs.md) — pairs instead of parity\n- [Reorder List](ReorderList.md) — front/back interleaving\n',i=[`oddEvenList`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};