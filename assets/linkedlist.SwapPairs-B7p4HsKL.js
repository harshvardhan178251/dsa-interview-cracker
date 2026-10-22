var e=`linkedlist.SwapPairs`,t=`package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;
import com.dsa.utils.ListNode;

/**
 * Problem: Swap Nodes in Pairs
 * LeetCode: 24 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Pointer rewiring, Dummy head
 *
 * <p>Problem:
 * Given the head of a linked list, swap every pair of **adjacent** nodes. If there is an odd
 * node at the end it stays where it is.
 *
 * <p>Input format (stdin):
 * <pre>
 * len
 * values[0] values[1] ... values[len-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 1 2 3 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2 1 4 3
 * </pre>
 *
 * <p>Approach: a dummy head plus a pointer to the node in front of the current pair; swap the
 * two nodes and advance the pointer by two.
 *
 * <p>Complexity: Time O(len), Space O(1).
 */
public class SwapPairs {

    /**
     * Swaps every pair of adjacent nodes.
     *
     * @param head first node of the list (modified in place)
     * @return the new head
     */
    public static ListNode swapPairs(ListNode head) {
        ListNode dummy = new ListNode(0, head);
        ListNode prev = dummy;

        while (prev.next != null && prev.next.next != null) {
            ListNode first = prev.next;
            ListNode second = first.next;
            first.next = second.next;     // the first node now points past the pair
            second.next = first;           // the second node now points at the first
            prev.next = second;            // and the node before the pair points at the second
            prev = first;                  // move the cursor to the end of the swapped pair
        }
        return dummy.next;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int len = fs.nextInt();
        int[] values = fs.nextIntArray(len);

        ListNode result = swapPairs(ListNode.of(values));

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
 * Problem: Swap Nodes in Pairs
 * LeetCode: 24 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Pointer rewiring, Dummy head
 *
 * <p>Problem:
 * Given the head of a linked list, swap every pair of **adjacent** nodes. If there is an odd
 * node at the end it stays where it is.
 *
 * <p>Input format (stdin):
 * <pre>
 * len
 * values[0] values[1] ... values[len-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 1 2 3 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2 1 4 3
 * </pre>
 *
 * <p>Approach: a dummy head plus a pointer to the node in front of the current pair; swap the
 * two nodes and advance the pointer by two.
 *
 * <p>Complexity: Time O(len), Space O(1).
 */
public class Main {

    /**
     * Swaps every pair of adjacent nodes.
     *
     * @param head first node of the list (modified in place)
     * @return the new head
     */
    public static ListNode swapPairs(ListNode head) {
        ListNode dummy = new ListNode(0, head);
        ListNode prev = dummy;

        while (prev.next != null && prev.next.next != null) {
            ListNode first = prev.next;
            ListNode second = first.next;
            first.next = second.next;     // the first node now points past the pair
            second.next = first;           // the second node now points at the first
            prev.next = second;            // and the node before the pair points at the second
            prev = first;                  // move the cursor to the end of the swapped pair
        }
        return dummy.next;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int len = fs.nextInt();
        int[] values = fs.nextIntArray(len);

        ListNode result = swapPairs(ListNode.of(values));

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
# Swap Nodes in Pairs — LeetCode 24

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Pointer rewiring · Dummy head |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

Given the head of a singly linked list, swap every pair of **adjacent** nodes.

- \`1 -> 2 -> 3 -> 4\` becomes \`2 -> 1 -> 4 -> 3\`.
- \`1 -> 2 -> 3\` becomes \`2 -> 1 -> 3\` — the odd node at the end stays.
- \`1\` stays \`1\`.

## Input Format

The program reads from standard input:

\`\`\`
len
values[0] values[1] ... values[len-1]
\`\`\`

- \`len\` — number of nodes (1 ≤ len ≤ 100)
- \`values\` — len space-separated integers

## Sample Input

\`\`\`
4
1 2 3 4
\`\`\`

## Expected Output

\`\`\`
2 1 4 3
\`\`\`

## Approach — Dummy Head and a Two-Step Cursor

Swapping two nodes means changing **three** pointers, and the node in front of the pair
must be updated too. A **dummy head** provides that "node in front" even for the first pair,
so there is no special case for the head of the list.

For each pair (\`first\`, \`second\`) with the node \`prev\` in front of it:

1. \`first.next = second.next\` — the first node skips over the second.
2. \`second.next = first\` — the second node now points at the first.
3. \`prev.next = second\` — the node in front of the pair now points at the (new) first node
   of the pair.
4. \`prev = first\` — the cursor moves to the end of the swapped pair, because \`first\` is now
   the **second** node of it.

The loop condition \`prev.next != null && prev.next.next != null\` stops as soon as a pair
cannot be completed, which is exactly the odd-length case.

## Dry Run

Input: \`dummy -> 1 -> 2 -> 3 -> 4\`

| Step | \`prev\` | pair | \`first.next\` set to | \`second.next\` set to | \`prev.next\` set to | list |
|---:|---|---|---|---|---|---|
| 0 | \`dummy\` | \`1, 2\` | — | — | — | \`dummy -> 1 -> 2 -> 3 -> 4\` |
| 1 | \`dummy\` | \`1, 2\` | \`3\` | \`1\` | \`2\` | \`dummy -> 2 -> 1 -> 3 -> 4\` |
| 2 | \`1\` | \`3, 4\` | \`null\` | \`3\` | \`4\` | \`dummy -> 2 -> 1 -> 4 -> 3\` |
| 3 | \`3\` | — | — | — | — | \`prev.next.next == null\` → stop |

\`dummy.next\` is \`2\` → the result is \`2 1 4 3\`. ✓

### Odd length — \`dummy -> 1 -> 2 -> 3\`

| Step | \`prev\` | pair | list |
|---:|---|---|---|
| 1 | \`dummy\` | \`1, 2\` | \`dummy -> 2 -> 1 -> 3\` |
| 2 | \`1\` | — | \`prev.next.next == null\` → stop |

The lonely \`3\` stays at the end. ✓

## Java Solution

See [\`SwapPairs.java\`](./SwapPairs.java).

\`\`\`java
public static ListNode swapPairs(ListNode head) {
    ListNode dummy = new ListNode(0, head);
    ListNode prev = dummy;

    while (prev.next != null && prev.next.next != null) {
        ListNode first = prev.next;
        ListNode second = first.next;
        first.next = second.next;
        second.next = first;
        prev.next = second;
        prev = first;
    }
    return dummy.next;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(len) | One pass; every pair is touched once |
| **Space** | O(1) | A dummy head and three pointers |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Swap the values instead of the nodes."* → a much easier problem: keep a \`prev\` and
  swap the two values.
- *"Reverse the list in groups of k (LeetCode 25)."* → the same skeleton with a loop inside
  the group.
- *"Reverse every three nodes."* → the same idea with a group of three.
- *"Do it recursively."* → swap the first two, then recurse on the rest; the recursion is
  O(n) stack.

**Common mistakes:**
- ❌ Setting \`prev = second\` instead of \`prev = first\` → the cursor stays inside the pair
  and the same pair is swapped again.
- ❌ Forgetting \`prev.next = second\` → the list keeps the original first node of the pair
  and the swap is invisible.
- ❌ Using \`prev.next != null\` only as the loop condition → the last node has no partner and
  the code throws \`NullPointerException\`.

**How to narrate:**
> "Swapping two adjacent nodes changes three pointers, and the node before the pair has to
> be updated too — a dummy head gives me that node for free. I keep \`prev\` pointing at the
> node before the current pair; for each pair I rewire first, second and prev, then move
> \`prev\` to the end of the swapped pair, which is the node that used to be first. The loop
> stops as soon as a complete pair is no longer available, so an odd last node is left
> alone. One pass, O(1) space."

## Related Problems

- [Reverse Nodes in k-Group](ReverseNodesInKGroup.md) — the group variant
- [Reverse Linked List II](ReverseLinkedListII.md) — reversing a segment
- [Odd Even Linked List](OddEvenLinkedList.md) — another two-chain rewiring
`,i=[`swapPairs`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};