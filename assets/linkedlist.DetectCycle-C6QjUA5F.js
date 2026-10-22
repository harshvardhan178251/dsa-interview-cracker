var e=`linkedlist.DetectCycle`,t=`package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;
import com.dsa.utils.ListNode;

/**
 * Problem: Linked List Cycle
 * LeetCode: 141 | Difficulty: Easy | Frequency: 5/5
 * Pattern: Two pointers, Floyd's cycle detection
 *
 * <p>Problem:
 * Given the head of a linked list, decide whether the list contains a cycle. A cycle exists
 * when some node's {@code next} points back at a node that was already visited.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * values[0] values[1] ... values[n-1]
 * cyclePos
 * </pre>
 *
 * <p>{@code cyclePos} is the 0-based index of the node the last node points back to;
 * use {@code -1} to build a list whose last node points at {@code null}.
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
 * true
 * </pre>
 *
 * <p>Approach: Floyd's tortoise and hare. One pointer moves one step, the other two steps.
 * In an acyclic list the fast pointer reaches the end; in a cyclic list the distance
 * between the two pointers shrinks by one per lap until they meet.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class DetectCycle {

    /**
     * Returns {@code true} when the list contains a cycle.
     *
     * @param head first node of the list
     * @return whether a cycle exists
     */
    public static boolean hasCycle(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                return true;
            }
        }
        return false;
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

        System.out.println(hasCycle(head) ? "true" : "false");
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

/**
 * Problem: Linked List Cycle
 * LeetCode: 141 | Difficulty: Easy | Frequency: 5/5
 * Pattern: Two pointers, Floyd's cycle detection
 *
 * <p>Problem:
 * Given the head of a linked list, decide whether the list contains a cycle. A cycle exists
 * when some node's {@code next} points back at a node that was already visited.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * values[0] values[1] ... values[n-1]
 * cyclePos
 * </pre>
 *
 * <p>{@code cyclePos} is the 0-based index of the node the last node points back to;
 * use {@code -1} to build a list whose last node points at {@code null}.
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
 * true
 * </pre>
 *
 * <p>Approach: Floyd's tortoise and hare. One pointer moves one step, the other two steps.
 * In an acyclic list the fast pointer reaches the end; in a cyclic list the distance
 * between the two pointers shrinks by one per lap until they meet.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Returns {@code true} when the list contains a cycle.
     *
     * @param head first node of the list
     * @return whether a cycle exists
     */
    public static boolean hasCycle(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                return true;
            }
        }
        return false;
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

        System.out.println(hasCycle(head) ? "true" : "false");
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
# Linked List Cycle — LeetCode 141

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Two pointers · Floyd cycle detection |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

Given the head of a linked list, return \`true\` if the list contains a cycle and \`false\`
otherwise.

A cycle exists when the list walks back onto a node it has already visited — for example
\`1 -> 2 -> 3 -> 1\`.

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
  use \`-1\` for a list whose last node points at \`null\`

Example: \`cyclePos = 0\` builds \`1 -> 2 -> 3 -> 1\` (the tail loops back to the head).

## Sample Input

\`\`\`
3
1 2 3
0
\`\`\`

## Expected Output

\`\`\`
true
\`\`\`

## Approach — Floyd's Tortoise and Hare

Two pointers walk the same list at different speeds:

- \`slow\` advances **one** node per iteration,
- \`fast\` advances **two** nodes per iteration.

Two facts make this work:

1. **No cycle:** the fast pointer runs off the end of the list and the loop stops — the
   pointers can never meet because the slow pointer is always strictly behind.
2. **Cycle:** imagine the fast pointer laps the slow pointer. Every iteration the fast
   pointer gains exactly one node on the slow pointer, so after at most one lap the gap
   closes to zero and the two pointers point at the same node.

Because the pointers only meet *inside* the cycle, meeting is proof that a cycle exists.

**Why not a \`HashSet\` of visited nodes?** That also works, but it costs O(n) extra memory.
Floyd's algorithm uses O(1) space, which is exactly what interviewers want to hear.

## Dry Run

Input: \`1 -> 2 -> 3 -> (back to 1)\`, \`cyclePos = 0\`

| Step | \`slow\` (1 step) | \`fast\` (2 steps) | \`slow == fast\`? | list state |
|---:|---|---|---|---|
| 0 | \`1\` | \`1\` | yes (they start together) | \`1 -> 2 -> 3 -> 1\` |
| 1 | \`2\` | \`3\` | no | \`1 -> 2 -> 3 -> 1\` |
| 2 | \`3\` | \`2\` | no | \`1 -> 2 -> 3 -> 1\` |
| 3 | \`1\` | \`1\` | **yes** → cycle | \`1 -> 2 -> 3 -> 1\` |

The two pointers meet at node \`1\`, which proves the cycle exists. ✓

### Counter-example — an acyclic list \`1 -> 2 -> 3 -> null\`

| Step | \`slow\` | \`fast\` | \`slow == fast\`? | why the loop ends |
|---:|---|---|---|---|
| 1 | \`2\` | \`3\` | no | — |
| 2 | \`3\` | \`null\` | no | \`fast == null\` → loop condition fails |

The fast pointer fell off the end, so there is no cycle. ✓

## Java Solution

See [\`DetectCycle.java\`](./DetectCycle.java).

\`\`\`java
public static boolean hasCycle(ListNode head) {
    ListNode slow = head;
    ListNode fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) {
            return true;
        }
    }
    return false;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | The fast pointer makes at most one extra lap |
| **Space** | O(1) | Two pointers, no auxiliary container |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Return the node where the cycle starts."* → Floyd's second phase: after the pointers
  meet, put one pointer back at the head and advance both by one — see
  [Linked List Cycle II](LinkedListCycleII.md).
- *"Detect a cycle in a graph."* → the same two-pointer idea, but use colouring
  (white/grey/black) instead, because a graph can have branches.
- *"What about a cycle in a singly linked list with random access?"* → the same.

**Common mistakes:**
- ❌ Comparing **values** instead of node identity → \`1 -> 2 -> 1\` looks like a cycle of
  equal values, but \`1 -> 1 -> null\` is not a cycle.
- ❌ Moving the fast pointer before checking \`fast.next\` → \`NullPointerException\`.
- ❌ Checking \`slow == fast\` *before* the first move → the pointers are equal at the start,
  so every list would be reported as cyclic.

**How to narrate:**
> "I'll use Floyd's tortoise and hare: one pointer moves one step, the other moves two.
> If the fast pointer reaches the end there is no cycle. If the list is cyclic the fast
> pointer keeps lapping and the gap between the two pointers shrinks by one each round, so
> they must meet inside the cycle. That gives O(n) time and O(1) space — no visited set."

## Related Problems

- [Linked List Cycle II](LinkedListCycleII.md) — find the entry node
- [Reverse Linked List](ReverseLinkedList.md) — the other classic pointer drill
- [Reorder List](ReorderList.md) — split the list with two pointers
`,i=[`hasCycle`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};