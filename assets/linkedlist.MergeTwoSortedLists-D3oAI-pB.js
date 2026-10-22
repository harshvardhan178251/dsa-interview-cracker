var e=`linkedlist.MergeTwoSortedLists`,t=`package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;
import com.dsa.utils.ListNode;

/**
 * Problem: Merge Two Sorted Lists
 * LeetCode: 21 | Difficulty: Easy | Frequency: 5/5
 * Pattern: Two pointers, Dummy head
 *
 * <p>Problem:
 * Merge two sorted (ascending) singly linked lists into one sorted list. The result must be
 * built by **splicing existing nodes** — no new value nodes are created.
 *
 * <p>Input format (stdin):
 * <pre>
 * n1
 * list1 values
 * n2
 * list2 values
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 1 2 4
 * 3
 * 1 3 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 1 2 3 4 4
 * </pre>
 *
 * <p>Approach: one pointer per list, always take the smaller head and append it to a dummy
 * tail. When one list runs out, the remainder of the other is attached in one go.
 *
 * <p>Complexity: Time O(n + m), Space O(1).
 */
public class MergeTwoSortedLists {

    /**
     * Merges two ascending lists into one ascending list.
     *
     * @param list1 first sorted list (may be {@code null})
     * @param list2 second sorted list (may be {@code null})
     * @return the head of the merged list
     */
    public static ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;

        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                tail.next = list1;
                list1 = list1.next;
            } else {
                tail.next = list2;
                list2 = list2.next;
            }
            tail = tail.next;
        }
        // one list is exhausted — the rest of the other one is already sorted
        tail.next = list1 != null ? list1 : list2;
        return dummy.next;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n1 = fs.nextInt();
        int[] values1 = fs.nextIntArray(n1);
        int n2 = fs.nextInt();
        int[] values2 = fs.nextIntArray(n2);

        ListNode merged = mergeTwoLists(ListNode.of(values1), ListNode.of(values2));

        StringBuilder sb = new StringBuilder();
        for (ListNode c = merged; c != null; c = c.next) {
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
 * Problem: Merge Two Sorted Lists
 * LeetCode: 21 | Difficulty: Easy | Frequency: 5/5
 * Pattern: Two pointers, Dummy head
 *
 * <p>Problem:
 * Merge two sorted (ascending) singly linked lists into one sorted list. The result must be
 * built by **splicing existing nodes** — no new value nodes are created.
 *
 * <p>Input format (stdin):
 * <pre>
 * n1
 * list1 values
 * n2
 * list2 values
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 1 2 4
 * 3
 * 1 3 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 1 2 3 4 4
 * </pre>
 *
 * <p>Approach: one pointer per list, always take the smaller head and append it to a dummy
 * tail. When one list runs out, the remainder of the other is attached in one go.
 *
 * <p>Complexity: Time O(n + m), Space O(1).
 */
public class Main {

    /**
     * Merges two ascending lists into one ascending list.
     *
     * @param list1 first sorted list (may be {@code null})
     * @param list2 second sorted list (may be {@code null})
     * @return the head of the merged list
     */
    public static ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;

        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                tail.next = list1;
                list1 = list1.next;
            } else {
                tail.next = list2;
                list2 = list2.next;
            }
            tail = tail.next;
        }
        // one list is exhausted — the rest of the other one is already sorted
        tail.next = list1 != null ? list1 : list2;
        return dummy.next;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n1 = fs.nextInt();
        int[] values1 = fs.nextIntArray(n1);
        int n2 = fs.nextInt();
        int[] values2 = fs.nextIntArray(n2);

        ListNode merged = mergeTwoLists(ListNode.of(values1), ListNode.of(values2));

        StringBuilder sb = new StringBuilder();
        for (ListNode c = merged; c != null; c = c.next) {
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
# Merge Two Sorted Lists — LeetCode 21

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Two pointers · Dummy head |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

Merge two **sorted** (ascending) singly linked lists and return the head of the merged list.

- \`1 -> 2 -> 4\` and \`1 -> 3 -> 4\` merge into \`1 -> 1 -> 2 -> 3 -> 4 -> 4\`.
- The result must be sorted.
- The existing nodes are **re-linked**, not copied — this is what separates it from "merge two
  sorted arrays" where you build a new array.
- Either list may be empty.

## Input Format

The program reads from standard input:

\`\`\`
n1
list1[0] list1[1] ... list1[n1-1]
n2
list2[0] list2[1] ... list2[n2-1]
\`\`\`

- \`n1\` — length of the first list (0 ≤ n1 ≤ 10⁴)
- \`list1\` — n1 space-separated integers in ascending order
- \`n2\` — length of the second list (0 ≤ n2 ≤ 10⁴)
- \`list2\` — n2 space-separated integers in ascending order

## Sample Input

\`\`\`
3
1 2 4
3
1 3 4
\`\`\`

## Expected Output

\`\`\`
1 1 2 3 4 4
\`\`\`

## Approach — Two Pointers and a Dummy Head

The classic merge: keep a pointer at the head of each list, repeatedly take the **smaller**
head and append it to the result.

The only fiddly part is the *head* of the result. Instead of special-casing "what if the
first element I take comes from list 1?", we start the result with a **dummy head** node
whose value is irrelevant. We keep a \`tail\` pointer to the last node written and always do
\`tail.next = chosen; tail = tail.next\`. At the end \`dummy.next\` is the real head.

When one list is exhausted the loop stops — and because the other list is still sorted, its
entire remainder can be attached in one assignment: \`tail.next = list1 != null ? list1 : list2\`.

**Why \`<=\` and not \`<\`?** With \`<=\` the first list wins ties, which keeps the merge
**stable** — equal elements keep their relative order. Stability matters when the payloads
carry extra data.

## Dry Run

Input: \`A = 1 -> 2 -> 4\`, \`B = 1 -> 3 -> 4\`

| Step | \`A.val\` | \`B.val\` | chosen | \`tail.next\` after | result so far |
|---:|---:|---:|---|---|---|
| 0 | \`1\` | \`1\` | — | \`dummy -> 1\` (A) | \`1\` |
| 1 | \`2\` | \`1\` | B (\`1 < 2\`) | \`1 -> 1\` (B) | \`1 -> 1\` |
| 2 | \`2\` | \`3\` | A (\`2 <= 3\`) | \`1 -> 1 -> 2\` (A) | \`1 -> 1 -> 2\` |
| 3 | \`4\` | \`3\` | B (\`3 < 4\`) | \`... -> 3\` (B) | \`1 -> 1 -> 2 -> 3\` |
| 4 | \`4\` | \`4\` | A (\`4 <= 4\`) | \`... -> 4\` (A) | \`1 -> 1 -> 2 -> 3 -> 4\` |
| 5 | \`4\` | \`null\` | — | \`tail.next = A\` (rest) | \`1 -> 1 -> 2 -> 3 -> 4 -> 4\` |

Step 5 is the payoff of the sorted-input promise: the remaining \`4\` is attached in O(1). ✓

## Java Solution

See [\`MergeTwoSortedLists.java\`](./MergeTwoSortedLists.java).

\`\`\`java
public static ListNode mergeTwoLists(ListNode list1, ListNode list2) {
    ListNode dummy = new ListNode(0);
    ListNode tail = dummy;

    while (list1 != null && list2 != null) {
        if (list1.val <= list2.val) {
            tail.next = list1;
            list1 = list1.next;
        } else {
            tail.next = list2;
            list2 = list2.next;
        }
        tail = tail.next;
    }
    tail.next = list1 != null ? list1 : list2;
    return dummy.next;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n + m) | Each node is visited once; the tail is attached in O(1) |
| **Space** | O(1) | Only the dummy head and a few pointers |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Merge \`k\` sorted lists."* → a min-heap of heads (each pop advances one list), or divide
  and conquer with pairwise merges.
- *"Merge two sorted **arrays** instead."* → same idea, but you may write into a third
  array; the in-place variant is the classic two-pointer exercise.
- *"What if the lists are not sorted?"* → sort them first (O(n log n)) and then merge.
- *"Reverse the merged list."* → another pointer exercise, see
  [Reverse Linked List](ReverseLinkedList.md).

**Common mistakes:**
- ❌ Advancing the chosen pointer **before** linking it → the node is skipped.
- ❌ Losing the tail (\`tail = tail.next\` missing) → every write lands on the same node.
- ❌ Building a brand new list instead of re-linking the existing nodes → the interviewer
  asked for a merge, not a concatenation.

**How to narrate:**
> "Both lists are sorted, so the smallest remaining element is always at the head of one of
> them. I keep a tail pointer to the result and repeatedly attach the smaller head. I'll use
> a dummy head so I don't have to special-case the first element. When one list runs out,
> the rest of the other is still sorted, so I attach it in one step. O(n + m) time, O(1)
> space, and the merge is stable because I use \`<=\`."

## Related Problems

- [Merge k Sorted Lists](../../../../../../docs/topics/06-heaps.md) — the heap generalisation
- [Add Two Numbers](AddTwoNumbers.md) — merge two digit lists
- [Reverse Linked List](ReverseLinkedList.md) — pointer rewiring drill
`,i=[`mergeTwoLists`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};