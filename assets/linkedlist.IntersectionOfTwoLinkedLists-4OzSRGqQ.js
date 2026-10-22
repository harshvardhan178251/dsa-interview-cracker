var e=`linkedlist.IntersectionOfTwoLinkedLists`,t=`package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;
import com.dsa.utils.ListNode;

/**
 * Problem: Intersection of Two Linked Lists
 * LeetCode: 160 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Two pointers, Pointer switching
 *
 * <p>Problem:
 * Given the heads of two singly linked lists, return the node where the two lists intersect
 * — the first node that is <em>shared</em> by both lists (the same object, not merely the
 * same value). Return {@code null} when the lists do not intersect.
 *
 * <p>Input format (stdin):
 * <pre>
 * nA
 * A values
 * nB
 * B prefix values
 * shared
 * </pre>
 *
 * <p>The second list is built as {@code B prefix} followed by the last {@code shared} nodes of
 * list A, which is how two lists physically share a tail.
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 4 1 8 4 5
 * 3
 * 5 6 1
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 8
 * </pre>
 *
 * <p>Approach: two pointers, each switching to the other list's head when it reaches the
 * end. The two paths then have the same length and the pointers must meet.
 *
 * <p>Complexity: Time O(n + m), Space O(1).
 */
public class IntersectionOfTwoLinkedLists {

    /**
     * Returns the first node shared by the two lists, or {@code null}.
     *
     * @param headA head of the first list
     * @param headB head of the second list
     * @return the shared node or {@code null}
     */
    public static ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        if (headA == null || headB == null) {
            return null;
        }
        ListNode a = headA;
        ListNode b = headB;
        while (a != b) {
            a = (a == null) ? headB : a.next;
            b = (b == null) ? headA : b.next;
        }
        return a;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int nA = fs.nextInt();
        int[] valuesA = fs.nextIntArray(nA);
        int nB = fs.nextInt();
        int[] valuesB = fs.nextIntArray(nB);
        int shared = fs.nextInt();

        ListNode headA = ListNode.of(valuesA);
        ListNode headB = ListNode.of(valuesB);

        if (shared > 0 && headA != null) {
            // the first node of the tail that both lists share
            ListNode sharedHead = headA;
            for (int i = 0; i < nA - shared; i++) {
                sharedHead = sharedHead.next;
            }
            if (headB == null) {
                headB = sharedHead;          // list B is nothing but the shared tail
            } else {
                ListNode tailB = headB;
                while (tailB.next != null) {
                    tailB = tailB.next;
                }
                tailB.next = sharedHead;
            }
        }

        ListNode intersection = getIntersectionNode(headA, headB);
        System.out.println(intersection == null ? "none" : String.valueOf(intersection.val));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

/**
 * Problem: Intersection of Two Linked Lists
 * LeetCode: 160 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Two pointers, Pointer switching
 *
 * <p>Problem:
 * Given the heads of two singly linked lists, return the node where the two lists intersect
 * — the first node that is <em>shared</em> by both lists (the same object, not merely the
 * same value). Return {@code null} when the lists do not intersect.
 *
 * <p>Input format (stdin):
 * <pre>
 * nA
 * A values
 * nB
 * B prefix values
 * shared
 * </pre>
 *
 * <p>The second list is built as {@code B prefix} followed by the last {@code shared} nodes of
 * list A, which is how two lists physically share a tail.
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 4 1 8 4 5
 * 3
 * 5 6 1
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 8
 * </pre>
 *
 * <p>Approach: two pointers, each switching to the other list's head when it reaches the
 * end. The two paths then have the same length and the pointers must meet.
 *
 * <p>Complexity: Time O(n + m), Space O(1).
 */
public class Main {

    /**
     * Returns the first node shared by the two lists, or {@code null}.
     *
     * @param headA head of the first list
     * @param headB head of the second list
     * @return the shared node or {@code null}
     */
    public static ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        if (headA == null || headB == null) {
            return null;
        }
        ListNode a = headA;
        ListNode b = headB;
        while (a != b) {
            a = (a == null) ? headB : a.next;
            b = (b == null) ? headA : b.next;
        }
        return a;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int nA = fs.nextInt();
        int[] valuesA = fs.nextIntArray(nA);
        int nB = fs.nextInt();
        int[] valuesB = fs.nextIntArray(nB);
        int shared = fs.nextInt();

        ListNode headA = ListNode.of(valuesA);
        ListNode headB = ListNode.of(valuesB);

        if (shared > 0 && headA != null) {
            // the first node of the tail that both lists share
            ListNode sharedHead = headA;
            for (int i = 0; i < nA - shared; i++) {
                sharedHead = sharedHead.next;
            }
            if (headB == null) {
                headB = sharedHead;          // list B is nothing but the shared tail
            } else {
                ListNode tailB = headB;
                while (tailB.next != null) {
                    tailB = tailB.next;
                }
                tailB.next = sharedHead;
            }
        }

        ListNode intersection = getIntersectionNode(headA, headB);
        System.out.println(intersection == null ? "none" : String.valueOf(intersection.val));
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
# Intersection of Two Linked Lists — LeetCode 160

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Two pointers · Pointer switching |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

Given the heads of two singly linked lists, return the node where they **intersect** — the
first node that is physically **shared** by both lists. Return \`null\` if they never meet.

- List A: \`4 -> 1 -> 8 -> 4 -> 5\`
- List B: \`5 -> 6 -> 1 -> 8 -> 4 -> 5\` (it rejoins A at the node holding \`8\`)
- The answer is the node holding \`8\` — the **first** shared node, not the first shared
  *value*.

> The intersection is defined by **node identity**, not by value. In the example above list B
> contains the values \`5\` and \`1\`, which also occur in list A, but those are different nodes.

## Input Format

The program reads from standard input:

\`\`\`
nA
A[0] A[1] ... A[nA-1]
nB
B[0] B[1] ... B[nB-1]
shared
\`\`\`

- \`nA\` — number of nodes in list A (0 ≤ nA ≤ 10³)
- \`A\` — nA space-separated integers
- \`nB\` — number of **prefix** nodes in list B (0 ≤ nB ≤ 10³)
- \`B\` — nB space-separated integers — the nodes of list B that are *not* shared
  (with \`nB = 0\` list B is exactly the shared tail)
- \`shared\` — how many trailing nodes of list A list B continues with (0 ≤ shared ≤ nA);
  \`shared = 0\` builds two disjoint lists

The program prints the value of the first shared node, or \`none\` when the lists do not
intersect.

## Sample Input

\`\`\`
5
4 1 8 4 5
3
5 6 1
3
\`\`\`

## Expected Output

\`\`\`
8
\`\`\`

List B is \`5 -> 6 -> 1\` followed by A's last three nodes \`8 -> 4 -> 5\`, so the first shared
node holds \`8\`. ✓

## Approach — Switch Pointers at the End

Because the lists share a *tail*, the path from each head to the shared node has a different
length. The neat trick is to make the two paths the same length:

1. Walk one pointer through list A and one through list B.
2. When a pointer reaches the end of its list, send it to the **head of the other list**
   instead of stopping.
3. Both pointers now travel paths of exactly \`len(A) + len(B)\` steps, so they must arrive at
   the shared node at the same moment — that is where they meet.

If the lists do not intersect, both pointers reach \`null\` at the same time, so the loop ends
with \`a == b == null\` and we correctly report "no intersection".

**Why not compare values?** Two lists can contain the same numbers without sharing any node.
The check is \`a != b\` — reference comparison.

## Dry Run

List A: \`A0(4) -> A1(1) -> A2(8) -> A3(4) -> A4(5) -> null\`
List B: \`B0(5) -> B1(6) -> B2(1) -> A2(8) -> A3(4) -> A4(5) -> null\`

| Step | \`a\` | \`b\` | \`a == b\`? | note |
|---:|---|---|---|---|
| 0 | \`A0(4)\` | \`B0(5)\` | no | |
| 1 | \`A1(1)\` | \`B1(6)\` | no | |
| 2 | \`A2(8)\` | \`B2(1)\` | no | \`a\` has reached the shared part |
| 3 | \`A3(4)\` | \`A2(8)\` | no | \`b\` has reached the shared part |
| 4 | \`A4(5)\` | \`A3(4)\` | no | |
| 5 | \`null\` | \`A4(5)\` | no | \`a\` reached the end of A |
| 6 | \`B0(5)\` | \`null\` | no | \`a\` switches to the head of B, \`b\` reaches the end |
| 7 | \`B1(6)\` | \`A0(4)\` | no | \`b\` switches to the head of A |
| 8 | \`B2(1)\` | \`A1(1)\` | **no** | equal *values*, different nodes — identity matters! |
| 9 | \`A2(8)\` | \`A2(8)\` | **yes** | the first shared node |

The answer is the node holding \`8\`. ✓

## Java Solution

See [\`IntersectionOfTwoLinkedLists.java\`](./IntersectionOfTwoLinkedLists.java).

\`\`\`java
public static ListNode getIntersectionNode(ListNode headA, ListNode headB) {
    if (headA == null || headB == null) {
        return null;
    }
    ListNode a = headA;
    ListNode b = headB;
    while (a != b) {
        a = (a == null) ? headB : a.next;
        b = (b == null) ? headA : b.next;
    }
    return a;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n + m) | Each pointer walks at most \`n + m\` links |
| **Space** | O(1) | Two pointers |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the lists do not share a tail but merely cross?"* → not possible in a singly
  linked list; sharing requires sharing the tail.
- *"What if you want every common node?"* → walk the shared tail and collect the values.
- *"How would you detect the intersection with a hash set?"* → collect the node identities
  of list A in a set, then walk list B — O(n + m) time but O(n) space.
- *"Does the answer change if the lists can have cycles?"* → yes, you must first find where
  each cycle starts.

**Common mistakes:**
- ❌ Comparing **values** (\`a.val == b.val\`) → reports a false intersection; the sample's
  step 8 is exactly this trap.
- ❌ Forgetting the "switch to the other head" step → the loop ends when one pointer is
  \`null\` and the other is not.
- ❌ Comparing node objects with \`equals()\` instead of \`==\` → \`ListNode\` does not override
  \`equals\`, but writing \`equals\` on a node type is a trap for the reader; use \`==\`.

**How to narrate:**
> "Two lists intersect only if they share the actual nodes of a tail, so the answer is a
> node identity, not a value. I run two pointers, one per list, and whenever a pointer runs
> off the end of its list I send it to the head of the other list. Both pointers then travel
> the same total distance, so they meet exactly at the first shared node — and if the lists
> are disjoint they both reach null at the same time. O(n + m) time, O(1) space."

## Related Problems

- [Linked List Cycle](DetectCycle.md) — Floyd's algorithm, same territory
- [Merge Two Sorted Lists](MergeTwoSortedLists.md) — the other two-pointer list drill
- [Middle of the Linked List](MiddleOfTheLinkedList.md) — two pointers, different goal
`,i=[`getIntersectionNode`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};