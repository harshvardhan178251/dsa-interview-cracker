var e=`linkedlist.ReorderList`,t=`package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;
import com.dsa.utils.ListNode;

/**
 * Problem: Reorder List
 * LeetCode: 143 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Two pointers, Divide and conquer on a list
 *
 * <p>Problem:
 * Given the head of a singly linked list, reorder it so that the nodes alternate between the
 * first half and the second half: the first node, the last node, the second node, the
 * second-to-last node, and so on.
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
 * 1 5 2 4 3
 * </pre>
 *
 * <p>Approach: split the list in half with two pointers, reverse the second half, then
 * interleave the two halves.
 *
 * <p>Complexity: Time O(len), Space O(1).
 */
public class ReorderList {

    /**
     * Reorders the list in place so that nodes alternate between the two halves.
     *
     * @param head first node of the list (the list is modified in place)
     */
    public static void reorderList(ListNode head) {
        if (head == null || head.next == null) {
            return;
        }

        // 1. find the middle: slow ends on the last node of the first half
        ListNode slow = head;
        ListNode fast = head;
        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        ListNode second = slow.next;
        slow.next = null;                 // cut the list in two

        // 2. reverse the second half
        ListNode prev = null;
        ListNode curr = second;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }

        // 3. interleave: first half, second half, first half, second half, ...
        ListNode first = head;
        ListNode secondHead = prev;
        while (secondHead != null) {
            ListNode firstNext = first.next;
            ListNode secondNext = secondHead.next;
            first.next = secondHead;
            secondHead.next = firstNext;
            first = firstNext;
            secondHead = secondNext;
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int len = fs.nextInt();
        int[] values = fs.nextIntArray(len);

        ListNode head = ListNode.of(values);
        reorderList(head);

        StringBuilder sb = new StringBuilder();
        for (ListNode c = head; c != null; c = c.next) {
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
 * Problem: Reorder List
 * LeetCode: 143 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Two pointers, Divide and conquer on a list
 *
 * <p>Problem:
 * Given the head of a singly linked list, reorder it so that the nodes alternate between the
 * first half and the second half: the first node, the last node, the second node, the
 * second-to-last node, and so on.
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
 * 1 5 2 4 3
 * </pre>
 *
 * <p>Approach: split the list in half with two pointers, reverse the second half, then
 * interleave the two halves.
 *
 * <p>Complexity: Time O(len), Space O(1).
 */
public class Main {

    /**
     * Reorders the list in place so that nodes alternate between the two halves.
     *
     * @param head first node of the list (the list is modified in place)
     */
    public static void reorderList(ListNode head) {
        if (head == null || head.next == null) {
            return;
        }

        // 1. find the middle: slow ends on the last node of the first half
        ListNode slow = head;
        ListNode fast = head;
        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        ListNode second = slow.next;
        slow.next = null;                 // cut the list in two

        // 2. reverse the second half
        ListNode prev = null;
        ListNode curr = second;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }

        // 3. interleave: first half, second half, first half, second half, ...
        ListNode first = head;
        ListNode secondHead = prev;
        while (secondHead != null) {
            ListNode firstNext = first.next;
            ListNode secondNext = secondHead.next;
            first.next = secondHead;
            secondHead.next = firstNext;
            first = firstNext;
            secondHead = secondNext;
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int len = fs.nextInt();
        int[] values = fs.nextIntArray(len);

        ListNode head = ListNode.of(values);
        reorderList(head);

        StringBuilder sb = new StringBuilder();
        for (ListNode c = head; c != null; c = c.next) {
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
# Reorder List — LeetCode 143

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Two pointers · Divide and conquer on a list |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

Reorder the nodes of a singly linked list so that they alternate between the **first half**
and the **second half**:

- \`1 -> 2 -> 3 -> 4 -> 5\` becomes \`1 -> 5 -> 2 -> 4 -> 3\`.
- \`1 -> 2 -> 3 -> 4\` becomes \`1 -> 4 -> 2 -> 3\`.
- The list must be reordered **in place** — no new nodes, no extra list.

## Input Format

The program reads from standard input:

\`\`\`
len
values[0] values[1] ... values[len-1]
\`\`\`

- \`len\` — number of nodes (1 ≤ len ≤ 5 × 10⁴)
- \`values\` — len space-separated integers

## Sample Input

\`\`\`
5
1 2 3 4 5
\`\`\`

## Expected Output

\`\`\`
1 5 2 4 3
\`\`\`

## Approach — Split, Reverse, Interleave

The target order takes one node from the front of the list and one from the back, alternating.
That decomposes into three classic list operations:

1. **Split** the list into two halves. A slow/fast pointer pair finds the middle: \`fast\`
   moves twice as fast, so when \`fast\` reaches the end, \`slow\` is on the last node of the
   first half. Cut the link there.
2. **Reverse** the second half. The second half is now in the order we want to consume it
   (back to front).
3. **Interleave** the two halves: take one node from the first half, then one from the
   reversed second half, and repeat.

The interleaving loop must save both \`next\` pointers *before* overwriting them — the
classic place to lose a list.

**Why the second half is longer for odd lengths:** with 5 nodes the first half has 2 nodes
and the second has 3. The interleave loop runs while the second half has nodes, so the
extra node ends up at the end (\`1 5 2 4 3\`) — exactly the required order.

## Dry Run

Input: \`1 -> 2 -> 3 -> 4 -> 5\`

**Step 1 — find the middle**

| Step | \`slow\` | \`fast\` | list |
|---:|---|---|---|
| 0 | \`1\` | \`1\` | \`1 -> 2 -> 3 -> 4 -> 5\` |
| 1 | \`2\` | \`3\` | \`1 -> 2 -> 3 -> 4 -> 5\` |
| 2 | \`3\` | \`5\` | \`1 -> 2 -> 3 -> 4 -> 5\` |

\`fast.next == null\` → stop. \`slow\` is on \`3\`; cutting \`slow.next\` gives
\`1 -> 2 -> 3\` and \`4 -> 5\`.

**Step 2 — reverse the second half**

| Step | \`curr\` | saved \`next\` | \`curr.next\` becomes | \`prev\` after | reversed chain |
|---:|---:|---:|---:|---:|---|
| 1 | \`4\` | \`5\` | \`null\` | \`4\` | \`4\` |
| 2 | \`5\` | \`null\` | \`4\` | \`5\` | \`5 -> 4\` |

**Step 3 — interleave** (\`first = 1\`, \`secondHead = 5\`)

| Step | \`first\` | \`secondHead\` | \`first.next\` | \`secondHead.next\` | list |
|---:|---|---|---|---|---|
| 1 | \`1\` | \`5\` | \`5\` | \`2\` | \`1 -> 5 -> 2 -> 3 -> 4\` |
| 2 | \`2\` | \`4\` | \`4\` | \`3\` | \`1 -> 5 -> 2 -> 4 -> 3\` |
| 3 | \`3\` | \`null\` | — | — | \`1 -> 5 -> 2 -> 4 -> 3\` |

\`secondHead\` is \`null\`, so the loop ends and the third node of the first half (\`3\`) stays at
the tail. ✓

## Java Solution

See [\`ReorderList.java\`](./ReorderList.java).

\`\`\`java
public static void reorderList(ListNode head) {
    if (head == null || head.next == null) {
        return;
    }

    // 1. find the middle
    ListNode slow = head;
    ListNode fast = head;
    while (fast.next != null && fast.next.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    ListNode second = slow.next;
    slow.next = null;

    // 2. reverse the second half
    ListNode prev = null;
    ListNode curr = second;
    while (curr != null) {
        ListNode next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }

    // 3. interleave
    ListNode first = head;
    ListNode secondHead = prev;
    while (secondHead != null) {
        ListNode firstNext = first.next;
        ListNode secondNext = secondHead.next;
        first.next = secondHead;
        secondHead.next = firstNext;
        first = firstNext;
        secondHead = secondNext;
    }
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(len) | Three linear passes |
| **Space** | O(1) | Only pointers — no new nodes, no recursion |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Do it with one pass / without reversing?"* → you can interleave by walking the second
  half backwards with a stack (O(n) space) or by reversing as above.
- *"Reorder into the zigzag pattern."* → the same three phases, but alternate the
  comparison direction.
- *"Reorder so that the first half keeps its order and the second half is reversed."* →
  that is just phases 1 and 2 without the interleave.
- *"Do it recursively."* → recurse on the second half, then splice the node before the
  midpoint to the end.

**Common mistakes:**
- ❌ Overwriting \`first.next\` before saving \`firstNext\` → the rest of the first half is lost.
- ❌ Cutting the list at the wrong node → the halves overlap or a node is duplicated.
- ❌ Forgetting the odd-length case → the loop must stop when the *second* half runs out,
  not the first.

**How to narrate:**
> "The target order alternates between the front and the back of the list, so I split it in
> three phases. First I find the middle with a slow and a fast pointer and cut the list in
> two. Then I reverse the second half, which turns it into exactly the order I want to
> consume it. Finally I interleave the two halves, saving both next pointers before I
> overwrite them. Three linear passes, O(1) extra space, and the list is modified in place."

## Related Problems

- [Reverse Linked List](ReverseLinkedList.md) — phase 2 on its own
- [Reverse Linked List II](ReverseLinkedListII.md) — reverse a segment
- [Middle of the Linked List](MiddleOfTheLinkedList.md) — phase 1 on its own
- [Palindrome Linked List](PalindromeLinkedList.md) — the same three phases
`,i=[`reorderList`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};