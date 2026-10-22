var e=`linkedlist.DeleteNthFromEnd`,t=`package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;
import com.dsa.utils.ListNode;

/**
 * Problem: Remove Nth Node From End of List
 * LeetCode: 19 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Two pointers, Dummy head
 *
 * <p>Problem:
 * Given a linked list and an integer {@code n}, remove the node that is {@code n} positions
 * from the end of the list and return the head of the list.
 *
 * <p>Input format (stdin):
 * <pre>
 * len
 * values[0] values[1] ... values[len-1]
 * n
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
 * 1 2 3 5
 * </pre>
 *
 * <p>Approach: two pointers separated by exactly {@code n} links. When the fast pointer
 * reaches the end, the slow pointer sits on the node to remove.
 *
 * <p>Complexity: Time O(len), Space O(1).
 */
public class DeleteNthFromEnd {

    /**
     * Removes the {@code n}-th node from the end of the list (1-indexed).
     *
     * @param head first node of the list
     * @param n    position from the end, 1 = the last node
     * @return the head of the shortened list
     */
    public static ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0, head);
        ListNode fast = dummy;
        ListNode slow = dummy;

        for (int i = 0; i < n && fast != null; i++) {
            fast = fast.next;
        }
        if (fast == null) {
            return head;       // n is larger than the list: nothing to remove
        }
        while (fast.next != null) {
            fast = fast.next;
            slow = slow.next;
        }
        slow.next = slow.next.next;   // unlink the node after slow
        return dummy.next;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int len = fs.nextInt();
        int[] values = fs.nextIntArray(len);
        int n = fs.nextInt();

        ListNode result = removeNthFromEnd(ListNode.of(values), n);

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
 * Problem: Remove Nth Node From End of List
 * LeetCode: 19 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Two pointers, Dummy head
 *
 * <p>Problem:
 * Given a linked list and an integer {@code n}, remove the node that is {@code n} positions
 * from the end of the list and return the head of the list.
 *
 * <p>Input format (stdin):
 * <pre>
 * len
 * values[0] values[1] ... values[len-1]
 * n
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
 * 1 2 3 5
 * </pre>
 *
 * <p>Approach: two pointers separated by exactly {@code n} links. When the fast pointer
 * reaches the end, the slow pointer sits on the node to remove.
 *
 * <p>Complexity: Time O(len), Space O(1).
 */
public class Main {

    /**
     * Removes the {@code n}-th node from the end of the list (1-indexed).
     *
     * @param head first node of the list
     * @param n    position from the end, 1 = the last node
     * @return the head of the shortened list
     */
    public static ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0, head);
        ListNode fast = dummy;
        ListNode slow = dummy;

        for (int i = 0; i < n && fast != null; i++) {
            fast = fast.next;
        }
        if (fast == null) {
            return head;       // n is larger than the list: nothing to remove
        }
        while (fast.next != null) {
            fast = fast.next;
            slow = slow.next;
        }
        slow.next = slow.next.next;   // unlink the node after slow
        return dummy.next;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int len = fs.nextInt();
        int[] values = fs.nextIntArray(len);
        int n = fs.nextInt();

        ListNode result = removeNthFromEnd(ListNode.of(values), n);

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
# Remove Nth Node From End of List — LeetCode 19

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Two pointers · Dummy head |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

Given the head of a singly linked list, remove the **n-th node from the end** of the list and
return its head.

- Removing the 2nd node from the end of \`1 -> 2 -> 3 -> 4 -> 5\` gives \`1 -> 2 -> 3 -> 5\`.
- \`n = 1\` removes the last node.
- \`n\` is 1-indexed.

## Input Format

The program reads from standard input:

\`\`\`
len
values[0] values[1] ... values[len-1]
n
\`\`\`

- \`len\` — number of nodes (1 ≤ len ≤ 10⁴)
- \`values\` — len space-separated integers
- \`n\` — the position from the end of the node to remove (1 ≤ n ≤ len)

## Sample Input

\`\`\`
5
1 2 3 4 5
2
\`\`\`

## Expected Output

\`\`\`
1 2 3 5
\`\`\`

The 2nd node from the end is the node holding \`4\`; it is unlinked. ✓

## Approach — Two Pointers, One Pass

Counting from the end means walking backwards, and a singly linked list only points
forwards. The trick is to create the distance in **advance**:

1. Put a **dummy head** in front of the list. It gives us a node to unlink from even when the
   node to remove is the very first one, and it removes the "is it the head?" special case.
2. Move \`fast\` \`n\` steps forward. \`slow\` stays on the dummy head.
3. Now \`fast\` is \`n\` links ahead of \`slow\`. Move **both** one step at a time until \`fast\` is
   the last node.
4. \`slow\` is now on the node **before** the one to remove → \`slow.next = slow.next.next\`.

The one-pass property is what makes this O(len): the list is walked a single time, and \`n\`
never has to be turned into "len − n" with a separate counting pass.

## Dry Run

Input: \`dummy -> 1 -> 2 -> 3 -> 4 -> 5\`, \`n = 2\`

**Phase 1 — move \`fast\` two steps**

| Step | \`fast\` | \`slow\` | list |
|---:|---|---|---|
| 0 | \`dummy\` | \`dummy\` | \`dummy -> 1 -> 2 -> 3 -> 4 -> 5\` |
| 1 | \`1\` | \`dummy\` | \`dummy -> 1 -> 2 -> 3 -> 4 -> 5\` |
| 2 | \`2\` | \`dummy\` | \`dummy -> 1 -> 2 -> 3 -> 4 -> 5\` |

\`fast\` is now 2 links ahead of \`slow\`.

**Phase 2 — move both until \`fast\` is the last node**

| Step | \`fast\` | \`slow\` | equal? | list |
|---:|---|---|---|---|
| 3 | \`3\` | \`1\` | no | \`dummy -> 1 -> 2 -> 3 -> 4 -> 5\` |
| 4 | \`4\` | \`2\` | no | \`dummy -> 1 -> 2 -> 3 -> 4 -> 5\` |
| 5 | \`5\` | \`3\` | no | \`dummy -> 1 -> 2 -> 3 -> 4 -> 5\` |

\`fast.next\` is \`null\`, so the loop stops. \`slow\` is on the node holding \`3\` — the node
**before** the one to delete.

**Phase 3 — unlink**

| Action | \`slow.next\` before | \`slow.next\` after | list |
|---|---|---|---|
| \`slow.next = slow.next.next\` | \`4\` | \`5\` | \`dummy -> 1 -> 2 -> 3 -> 5\` |

\`dummy.next\` is returned → \`1 2 3 5\` ✓

## Java Solution

See [\`DeleteNthFromEnd.java\`](./DeleteNthFromEnd.java).

\`\`\`java
public static ListNode removeNthFromEnd(ListNode head, int n) {
    ListNode dummy = new ListNode(0, head);
    ListNode fast = dummy;
    ListNode slow = dummy;

    for (int i = 0; i < n && fast != null; i++) {
        fast = fast.next;
    }
    if (fast == null) {
        return head;       // n is larger than the list: nothing to remove
    }
    while (fast.next != null) {
        fast = fast.next;
        slow = slow.next;
    }
    slow.next = slow.next.next;   // unlink the node after slow
    return dummy.next;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(len) | One pass; the two pointers move at most \`len\` steps in total |
| **Space** | O(1) | A dummy head and two pointers |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it in two passes?"* → yes: count the length, then walk again to the
  (len − n)-th node — O(len) time but two traversals.
- *"What if \`n\` is larger than the list?"* → return the list unchanged.
- *"Delete the node you are given, without knowing its position."* → the classic trick: copy
  the next node's value into the given node and delete the *next* node instead.
- *"Remove duplicates, keep the first."* → see
  [Remove Duplicates from Sorted List II](RemoveDuplicatesFromSortedListII.md).

**Common mistakes:**
- ❌ Moving \`slow\` during phase 1 → the two pointers are no longer \`n\` apart.
- ❌ Stopping the second loop when \`fast == null\` instead of when \`fast.next == null\` → \`slow\`
  ends up on the node *to delete* and you unlink the wrong node.
- ❌ Forgetting the dummy head → removing the first node throws \`NullPointerException\`.

**How to narrate:**
> "I don't want to compute the length first, so I use two pointers. I put a dummy head in
> front so I can also delete the first node. I move the fast pointer n steps, then I move
> both pointers together until the fast one reaches the last node — at that point the slow
> pointer is exactly on the node before the one to delete, and I unlink it. One pass, O(1)
> space."

## Related Problems

- [Remove Duplicates from Sorted List II](RemoveDuplicatesFromSortedListII.md) — unlink runs of nodes
- [Middle of the Linked List](MiddleOfTheLinkedList.md) — the same two-pointer trick
- [Palindrome Linked List](PalindromeLinkedList.md) — find the middle, then walk inwards
`,i=[`removeNthFromEnd`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};