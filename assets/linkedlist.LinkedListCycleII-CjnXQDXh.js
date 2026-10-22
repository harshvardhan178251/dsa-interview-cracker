var e=`linkedlist.LinkedListCycleII`,t=`package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;
import com.dsa.utils.ListNode;

/**
 * Problem: Linked List Cycle II
 * LeetCode: 142 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Two pointers, Floyd cycle detection
 *
 * <p>Problem:
 * Given the head of a linked list, return the node where the cycle begins. If there is no
 * cycle, return {@code null}. The answer is a node, not an index — but this program prints
 * the 0-based index of that node in the original list, or {@code -1} when there is no cycle.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * values[0] values[1] ... values[n-1]
 * cyclePos
 * </pre>
 *
 * <p>{@code cyclePos} is the 0-based index of the node the last node points back to;
 * use {@code -1} for a list without a cycle.
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 1 2 3
 * 0
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0
 * </pre>
 *
 * <p>Approach: Floyd's algorithm in two phases. Phase one finds any node inside the cycle,
 * phase two walks the head and the meeting node one step at a time — they meet exactly at
 * the cycle's entry node.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class LinkedListCycleII {

    /**
     * Returns the node where the cycle begins, or {@code null} when the list is acyclic.
     *
     * @param head first node of the list
     * @return the cycle entry node or {@code null}
     */
    public static ListNode detectCycle(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                // phase two: one pointer at the head, one at the meeting node
                ListNode pointer = head;
                while (pointer != slow) {
                    pointer = pointer.next;
                    slow = slow.next;
                }
                return pointer;
            }
        }
        return null;
    }

    /**
     * Returns the 0-based index of the cycle entry node, or {@code -1} when there is no cycle.
     *
     * @param head first node of the list
     * @return the index of the cycle entry node, or {@code -1}
     */
    public static int cycleEntryIndex(ListNode head) {
        ListNode entry = detectCycle(head);
        if (entry == null) {
            return -1;
        }
        int index = 0;
        for (ListNode cur = head; cur != null && cur != entry; cur = cur.next) {
            index++;
        }
        return index;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] values = fs.nextIntArray(n);
        int cyclePos = fs.nextInt();

        ListNode head = ListNode.of(values);
        if (cyclePos >= 0 && head != null) {
            ListNode tail = head;
            while (tail.next != null) {
                tail = tail.next;
            }
            ListNode target = head;
            for (int i = 0; i < cyclePos; i++) {
                target = target.next;
            }
            tail.next = target;   // close the loop
        }

        System.out.println(cycleEntryIndex(head));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

/**
 * Problem: Linked List Cycle II
 * LeetCode: 142 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Two pointers, Floyd cycle detection
 *
 * <p>Problem:
 * Given the head of a linked list, return the node where the cycle begins. If there is no
 * cycle, return {@code null}. The answer is a node, not an index — but this program prints
 * the 0-based index of that node in the original list, or {@code -1} when there is no cycle.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * values[0] values[1] ... values[n-1]
 * cyclePos
 * </pre>
 *
 * <p>{@code cyclePos} is the 0-based index of the node the last node points back to;
 * use {@code -1} for a list without a cycle.
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 1 2 3
 * 0
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0
 * </pre>
 *
 * <p>Approach: Floyd's algorithm in two phases. Phase one finds any node inside the cycle,
 * phase two walks the head and the meeting node one step at a time — they meet exactly at
 * the cycle's entry node.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Returns the node where the cycle begins, or {@code null} when the list is acyclic.
     *
     * @param head first node of the list
     * @return the cycle entry node or {@code null}
     */
    public static ListNode detectCycle(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                // phase two: one pointer at the head, one at the meeting node
                ListNode pointer = head;
                while (pointer != slow) {
                    pointer = pointer.next;
                    slow = slow.next;
                }
                return pointer;
            }
        }
        return null;
    }

    /**
     * Returns the 0-based index of the cycle entry node, or {@code -1} when there is no cycle.
     *
     * @param head first node of the list
     * @return the index of the cycle entry node, or {@code -1}
     */
    public static int cycleEntryIndex(ListNode head) {
        ListNode entry = detectCycle(head);
        if (entry == null) {
            return -1;
        }
        int index = 0;
        for (ListNode cur = head; cur != null && cur != entry; cur = cur.next) {
            index++;
        }
        return index;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] values = fs.nextIntArray(n);
        int cyclePos = fs.nextInt();

        ListNode head = ListNode.of(values);
        if (cyclePos >= 0 && head != null) {
            ListNode tail = head;
            while (tail.next != null) {
                tail = tail.next;
            }
            ListNode target = head;
            for (int i = 0; i < cyclePos; i++) {
                target = target.next;
            }
            tail.next = target;   // close the loop
        }

        System.out.println(cycleEntryIndex(head));
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
# Linked List Cycle II — LeetCode 142

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Two pointers · Floyd cycle detection |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

Given the head of a linked list, return the **node** where the cycle begins. If the list has
no cycle, return \`null\`.

The list \`3 -> 2 -> 0 -> -4\` whose tail points back at the node \`2\` has its cycle entry at
index \`1\`.

This program prints the **0-based index** of the entry node (\`-1\` when there is no cycle),
because an index is easier to check than a node identity on standard input.

## Input Format

The program reads from standard input:

\`\`\`
n
values[0] values[1] ... values[n-1]
cyclePos
\`\`\`

- \`n\` — number of nodes (0 ≤ n ≤ 10⁴)
- \`values\` — n space-separated integers
- \`cyclePos\` — the **0-based index** of the node that the last node points back to;
  use \`-1\` for a list without a cycle

## Sample Input

\`\`\`
3
1 2 3
0
\`\`\`

## Expected Output

\`\`\`
0
\`\`\`

The tail of \`1 -> 2 -> 3\` points back at index \`0\`, so the cycle begins at node \`1\`. ✓

## Approach — Floyd's Algorithm, Two Phases

**Phase 1 — find a meeting point inside the cycle.** Run the tortoise and hare exactly as in
[Linked List Cycle](DetectCycle.md): \`slow\` moves one step, \`fast\`
moves two. In a cyclic list they eventually meet *somewhere inside* the cycle; in an acyclic
list the fast pointer reaches \`null\` and we return \`null\`.

**Phase 2 — walk the meeting point back to the entry.** Reset one pointer to the head, keep
the other on the meeting node, and advance **both by exactly one step** until they meet.

Why does that work? Let the distance from the head to the entry node be \`a\` and the length of
the cycle be \`L\`. When the pointers meet, the fast pointer has travelled \`2d\` and the slow
pointer \`d\` for some \`d\`, so \`d\` is a multiple of \`L\` and \`2d - d = d ≡ 0 (mod L)\`. The
meeting node is therefore \`d\` steps past the head, and \`d mod L\` steps past the entry. The
second pointer, starting at the head, needs exactly \`a\` steps to reach the entry, and
\`a ≡ d (mod L)\`, so both pointers reach the entry node at the same time.

## Dry Run

Input: \`1 -> 2 -> 3 -> (back to 1)\`, \`cyclePos = 0\`

**Phase 1**

| Step | \`slow\` | \`fast\` | \`slow == fast\`? |
|---:|---|---|---|
| 1 | \`2\` | \`3\` | no |
| 2 | \`3\` | \`2\` | no |
| 3 | \`1\` | \`1\` | **yes** → meeting node is \`1\` |

**Phase 2** — \`pointer = head (1)\`, \`slow = meeting node (1)\`

| Step | \`pointer\` | \`slow\` | equal? |
|---:|---|---|---|
| 0 | \`1\` | \`1\` | **yes** → the entry node is \`1\` |

\`1\` is at index \`0\`, so the program prints \`0\`. ✓

### Acyclic list \`1 -> 2 -> 3 -> null\`

| Step | \`slow\` | \`fast\` | outcome |
|---:|---|---|---|
| 1 | \`2\` | \`3\` | continue |
| 2 | \`3\` | \`null\` | \`fast == null\` → no cycle → print \`-1\` |

## Java Solution

See [\`LinkedListCycleII.java\`](./LinkedListCycleII.java).

\`\`\`java
public static ListNode detectCycle(ListNode head) {
    ListNode slow = head;
    ListNode fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) {
            ListNode pointer = head;
            while (pointer != slow) {
                pointer = pointer.next;
                slow = slow.next;
            }
            return pointer;
        }
    }
    return null;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Phase one is one lap, phase two is at most one lap |
| **Space** | O(1) | Two pointers, no auxiliary container |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Why not just remember the first repeated node in a \`HashSet\`?"* → works, but costs O(n)
  space; Floyd keeps it O(1). A set is the right answer when the list has *branches*.
- *"Return the values of all nodes in the cycle."* → from the entry node, walk until you
  come back to it.
- *"Remove the cycle."* → find the entry node, then rewire the node before it to the node
  after it.

**Common mistakes:**
- ❌ Resetting **both** pointers to the head in phase two → they meet at the head, not at
  the entry node.
- ❌ Advancing the fast pointer by two in phase two → they never meet at the entry.
- ❌ Comparing values instead of node identity → the entry node is a *position*, duplicates
  in the values make value comparison wrong.

**How to narrate:**
> "First I run Floyd's algorithm to find a meeting point inside the cycle. Then I put one
> pointer at the head and advance both pointers one step at a time. Because the head is
> \`a\` steps from the entry and the cycle length is \`L\`, and the meeting point is at a
> distance that is a multiple of \`L\` from the entry, both pointers arrive at the entry node
> at the same time. That node is the cycle's start."

## Related Problems

- [Linked List Cycle](DetectCycle.md) — the boolean version
- [Middle of the Linked List](MiddleOfTheLinkedList.md) — two pointers, no cycle
- [Reorder List](ReorderList.md) — split a list with two pointers
`,i=[`detectCycle`,`cycleEntryIndex`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};