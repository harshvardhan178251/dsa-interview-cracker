var e=`linkedlist.MiddleOfTheLinkedList`,t=`package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;
import com.dsa.utils.ListNode;

/**
 * Problem: Middle of the Linked List
 * LeetCode: 876 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Two pointers, Fast and slow
 *
 * <p>Problem:
 * Given the head of a singly linked list, return the **middle node**. When the list has an
 * even number of nodes the answer is the **second** of the two middle nodes (the one at
 * index {@code len / 2}).
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
 * 3
 * </pre>
 *
 * <p>Approach: a slow pointer that moves one step and a fast pointer that moves two. When
 * the fast pointer reaches the end, the slow pointer is in the middle.
 *
 * <p>Complexity: Time O(len), Space O(1).
 */
public class MiddleOfTheLinkedList {

    /**
     * Returns the middle node of the list.
     *
     * @param head first node of the list
     * @return the middle node (the second middle one for even lengths), or {@code null}
     */
    public static ListNode middleNode(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int len = fs.nextInt();
        int[] values = fs.nextIntArray(len);

        ListNode middle = middleNode(ListNode.of(values));
        System.out.println(middle == null ? "none" : String.valueOf(middle.val));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

/**
 * Problem: Middle of the Linked List
 * LeetCode: 876 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Two pointers, Fast and slow
 *
 * <p>Problem:
 * Given the head of a singly linked list, return the **middle node**. When the list has an
 * even number of nodes the answer is the **second** of the two middle nodes (the one at
 * index {@code len / 2}).
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
 * 3
 * </pre>
 *
 * <p>Approach: a slow pointer that moves one step and a fast pointer that moves two. When
 * the fast pointer reaches the end, the slow pointer is in the middle.
 *
 * <p>Complexity: Time O(len), Space O(1).
 */
public class Main {

    /**
     * Returns the middle node of the list.
     *
     * @param head first node of the list
     * @return the middle node (the second middle one for even lengths), or {@code null}
     */
    public static ListNode middleNode(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int len = fs.nextInt();
        int[] values = fs.nextIntArray(len);

        ListNode middle = middleNode(ListNode.of(values));
        System.out.println(middle == null ? "none" : String.valueOf(middle.val));
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
# Middle of the Linked List — LeetCode 876

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Two pointers · Fast and slow |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

Given the head of a singly linked list, return the **middle node**.

- \`1 -> 2 -> 3 -> 4 -> 5\` → the node holding \`3\`.
- \`1 -> 2 -> 3 -> 4\` → the node holding \`3\` (the **second** of the two middle nodes, the one
  at index \`len / 2\`).
- The answer is a *node*, not a value — but the program prints the value it holds.

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
3
\`\`\`

## Approach — Fast and Slow Pointers

The classic trick: the fast pointer moves **two** steps per round, the slow pointer moves
**one**. The fast pointer therefore covers twice the distance, and when it can no longer
move two steps the slow pointer has covered exactly half the list.

\`\`\`java
while (fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;
}
\`\`\`

**Why this returns the second middle for even lengths:** the loop body only runs while
\`fast.next\` exists, so with 4 nodes the slow pointer advances twice and lands on the 3rd
node (index \`4 / 2 = 2\`) — the second middle. With 5 nodes it advances twice as well and
lands on the 3rd node (index 2), the true middle.

**Alternative:** two passes — count the length, then walk \`len / 2\` steps. Same O(n) time,
slightly more code. The one-pass version is what interviewers like to see.

## Dry Run

Input: \`1 -> 2 -> 3 -> 4 -> 5\`

| Step | \`slow\` | \`fast\` | \`fast.next\` | \`fast.next.next\` | note |
|---:|---|---|---|---|---|
| 0 | \`1\` | \`1\` | \`2\` | \`3\` | both at the head |
| 1 | \`2\` | \`3\` | \`4\` | \`5\` | continue |
| 2 | \`3\` | \`5\` | \`null\` | — | \`fast.next == null\` → stop |

\`slow\` is on the node holding \`3\` — the middle of 5 nodes. ✓

### Even length — \`1 -> 2 -> 3 -> 4\`

| Step | \`slow\` | \`fast\` | note |
|---:|---|---|---|
| 0 | \`1\` | \`1\` | |
| 1 | \`2\` | \`3\` | \`fast.next\` = \`4\` exists → the body runs |
| 2 | \`3\` | \`null\` | \`fast == null\` → stop |

\`slow\` ends on the node holding \`3\` — the second middle node (index \`4 / 2 = 2\`), exactly
what LeetCode asks for. ✓

## Java Solution

See [\`MiddleOfTheLinkedList.java\`](./MiddleOfTheLinkedList.java).

\`\`\`java
public static ListNode middleNode(ListNode head) {
    ListNode slow = head;
    ListNode fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(len) | One pass; the slow pointer travels half the list |
| **Space** | O(1) | Two pointers |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Return the middle **value** instead of the node."* → read \`slow.val\`.
- *"Return the first middle node for even lengths."* → change the loop condition to
  \`fast.next != null && fast.next.next != null\`.
- *"What is the k-th node from the end?"* → the same two-pointer trick with an offset — see
  [Remove Nth Node From End of List](DeleteNthFromEnd.md).
- *"Delete the middle node."* → find it, then unlink it with a dummy head.

**Common mistakes:**
- ❌ Using \`fast.next.next != null\` as the loop condition → for even lengths the slow
  pointer stops one node too early.
- ❌ Moving the fast pointer only one step → both pointers stay in lock-step and the slow
  one lands on the wrong node.
- ❌ Forgetting the \`fast != null\` check → \`NullPointerException\` on an empty or one-node
  list.

**How to narrate:**
> "I run a slow pointer that moves one step and a fast pointer that moves two. While the
> fast pointer can still take two steps, the slow one advances. The fast pointer covers
> twice the distance, so when it runs out the slow pointer is exactly at the middle — and
> because the loop only advances while \`fast.next\` exists, on an even-length list the slow
> pointer lands on the second middle node. One pass, O(1) space."

## Related Problems

- [Remove Nth Node From End of List](DeleteNthFromEnd.md) — the offset variant
- [Palindrome Linked List](PalindromeLinkedList.md) — finds the middle first
- [Reorder List](ReorderList.md) — splits at the middle
- [Linked List Cycle](DetectCycle.md) — the same two-pointer family
`,i=[`middleNode`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};