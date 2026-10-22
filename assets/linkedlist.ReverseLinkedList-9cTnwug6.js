var e=`linkedlist.ReverseLinkedList`,t=`package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;
import com.dsa.utils.ListNode;

/**
 * Problem: Reverse Linked List
 * LeetCode: 206 | Difficulty: Easy | Frequency: 5/5
 * Pattern: Pointer rewiring, Iterative reversal
 *
 * <p>Problem:
 * Given the head of a singly linked list, reverse the order of its nodes and return the
 * new head. The list {@code 1 -> 2 -> 3 -> 4 -> 5} becomes {@code 5 -> 4 -> 3 -> 2 -> 1}.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * values[0] values[1] ... values[n-1]
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
 * 5 4 3 2 1
 * </pre>
 *
 * <p>Approach: three pointers. {@code prev} is the already-reversed head, {@code curr} is the
 * node being visited and {@code next} remembers where to continue. Each step flips
 * {@code curr.next} to {@code prev} and slides the window one node to the right. When
 * {@code curr} falls off the end, {@code prev} is the new head.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class ReverseLinkedList {

    /**
     * Reverses the chain that starts at {@code head}.
     *
     * @param head first node of the list, may be {@code null}
     * @return the new head of the reversed list ({@code null} for an empty list)
     */
    public static ListNode reverse(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode next = curr.next;   // remember where to go after the flip
            curr.next = prev;            // flip the arrow backwards
            prev = curr;                 // prev now owns the reversed prefix
            curr = next;                 // move on to the untouched remainder
        }
        return prev;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] values = fs.nextIntArray(n);

        ListNode head = ListNode.of(values);
        ListNode reversed = reverse(head);

        StringBuilder sb = new StringBuilder();
        for (ListNode c = reversed; c != null; c = c.next) {
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
 * Problem: Reverse Linked List
 * LeetCode: 206 | Difficulty: Easy | Frequency: 5/5
 * Pattern: Pointer rewiring, Iterative reversal
 *
 * <p>Problem:
 * Given the head of a singly linked list, reverse the order of its nodes and return the
 * new head. The list {@code 1 -> 2 -> 3 -> 4 -> 5} becomes {@code 5 -> 4 -> 3 -> 2 -> 1}.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * values[0] values[1] ... values[n-1]
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
 * 5 4 3 2 1
 * </pre>
 *
 * <p>Approach: three pointers. {@code prev} is the already-reversed head, {@code curr} is the
 * node being visited and {@code next} remembers where to continue. Each step flips
 * {@code curr.next} to {@code prev} and slides the window one node to the right. When
 * {@code curr} falls off the end, {@code prev} is the new head.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Reverses the chain that starts at {@code head}.
     *
     * @param head first node of the list, may be {@code null}
     * @return the new head of the reversed list ({@code null} for an empty list)
     */
    public static ListNode reverse(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode next = curr.next;   // remember where to go after the flip
            curr.next = prev;            // flip the arrow backwards
            prev = curr;                 // prev now owns the reversed prefix
            curr = next;                 // move on to the untouched remainder
        }
        return prev;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] values = fs.nextIntArray(n);

        ListNode head = ListNode.of(values);
        ListNode reversed = reverse(head);

        StringBuilder sb = new StringBuilder();
        for (ListNode c = reversed; c != null; c = c.next) {
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
`,r='\n# Reverse Linked List — LeetCode 206\n\n| | |\n|---|---|\n| **Difficulty** | Easy |\n| **Pattern** | Pointer rewiring · Iterative reversal |\n| **Interview heat** | ★★★★★ |\n| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |\n\n## Problem Statement\n\nGiven the head of a singly linked list, reverse the list **in place** and return its new head.\n\n- The list `1 -> 2 -> 3 -> 4 -> 5` must become `5 -> 4 -> 3 -> 2 -> 1`.\n- The node **values** stay the same; only the `next` arrows change.\n- An empty list reverses to an empty list.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nn\nvalues[0] values[1] ... values[n-1]\n```\n\n- `n` — number of nodes (0 ≤ n ≤ 10⁴)\n- `values` — n space-separated integers, the node values in order\n\n## Sample Input\n\n```\n5\n1 2 3 4 5\n```\n\n## Expected Output\n\n```\n5 4 3 2 1\n```\n\n## Approach — Three Pointers, One Pass\n\nReversal is nothing more than flipping every arrow. To flip an arrow safely you need to know\nwhere it pointed *before* you overwrite it, so the loop keeps three pointers:\n\n| Pointer | Meaning |\n|---|---|\n| `prev` | head of the part that has **already** been reversed |\n| `curr` | the node currently being processed |\n| `next` | the node `curr.next` pointed at, saved before the flip |\n\nEach iteration does exactly four things:\n\n1. `next = curr.next` — save the continuation.\n2. `curr.next = prev` — flip the arrow backwards.\n3. `prev = curr` — the reversed prefix grows by one node.\n4. `curr = next` — advance into the untouched remainder.\n\nWhen `curr` finally becomes `null` the whole list has been reversed and `prev` is the new head.\n\n**Why not recursion?** A recursive version is shorter to write but costs O(n) call-stack space\nand blows up on a 10⁵-node list in Java. The iterative version uses one extra variable and\nis what you should write in an interview unless the interviewer asks for recursion.\n\n## Dry Run\n\nInput: `1 -> 2 -> 3 -> 4 -> 5`\n\n| Step | `curr` | saved `next` | `curr.next` becomes | `prev` after | reversed prefix | untouched remainder |\n|---:|---:|---:|---:|---:|---|---|\n| 0 | — | — | — | `null` | `null` | `1 -> 2 -> 3 -> 4 -> 5` |\n| 1 | `1` | `2` | `null` | `1` | `1` | `2 -> 3 -> 4 -> 5` |\n| 2 | `2` | `3` | `1` | `2` | `2 -> 1` | `3 -> 4 -> 5` |\n| 3 | `3` | `4` | `2` | `3` | `3 -> 2 -> 1` | `4 -> 5` |\n| 4 | `4` | `5` | `3` | `4` | `4 -> 3 -> 2 -> 1` | `5` |\n| 5 | `5` | `null` | `4` | `5` | `5 -> 4 -> 3 -> 2 -> 1` | `null` |\n\n`curr` is now `null`, the loop ends, and `prev` (`5`) is returned. ✓\n\n### Edge case — a single node\n\n| Step | `curr` | saved `next` | `curr.next` becomes | `prev` after | result |\n|---:|---:|---:|---:|---:|---|\n| 1 | `7` | `null` | `null` | `7` | `7` |\n\nOne iteration, no special case needed.\n\n## Java Solution\n\nSee [`ReverseLinkedList.java`](./ReverseLinkedList.java).\n\n```java\npublic static ListNode reverse(ListNode head) {\n    ListNode prev = null;\n    ListNode curr = head;\n    while (curr != null) {\n        ListNode next = curr.next;   // remember where to go after the flip\n        curr.next = prev;            // flip the arrow backwards\n        prev = curr;                 // prev now owns the reversed prefix\n        curr = next;                 // move on to the untouched remainder\n    }\n    return prev;\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n) | Every node is visited exactly once |\n| **Space** | O(1) | Only three references, no new nodes allocated |\n\n**Optimal?** Yes — you must touch every node, and the in-place version needs no extra memory.\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"Do it recursively."* → `reverse(head.next)` returns the new head of the rest; set\n  `head.next.next = head`, `head.next = null`, return the recursive result.\n- *"Reverse only the first k nodes (LeetCode 25)."* → stop the loop after k flips; the\n  remainder is spliced back in.\n- *"Reverse the sublist between positions m and n (LeetCode 92)."* → find the node before\n  `m`, then repeatedly move the node after the segment to the front of it.\n- *"Reverse in groups of k, keeping the leftover order (LeetCode 25)."* → see\n  [Reverse Nodes in k-Group](./ReverseNodesInKGroup.md).\n\n**Common mistakes:**\n- ❌ Overwriting `curr.next` **before** saving it → the rest of the list is lost and the\n  traversal dies after one node.\n- ❌ Returning `head` instead of `prev` → `head` is now the *last* node of the reversed list.\n- ❌ Forgetting the `curr != null` guard → `NullPointerException` on the final iteration.\n\n**How to narrate:**\n> "I\'ll reverse iteratively with three pointers. `prev` holds the already-reversed prefix,\n> `curr` is the node I\'m on, and before I flip `curr.next` I save the old target in `next`.\n> Then I flip the arrow, advance `prev` to `curr`, and move `curr` to the saved node.\n> When `curr` hits null, `prev` is the reversed list\'s head. That\'s O(n) time, O(1) space."\n\n## Related Problems\n\n- [Reverse Linked List II](ReverseLinkedListII.md) — reverse only a segment\n- [Reverse Nodes in k-Group](ReverseNodesInKGroup.md) — reverse in blocks of k\n- [Swap Nodes in Pairs](SwapPairs.md) — reverse every two nodes\n- [Reorder List](ReorderList.md) — reverse the second half, then interleave\n- [Palindrome Linked List](PalindromeLinkedList.md) — reverse half, then compare\n',i=[`reverse`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};