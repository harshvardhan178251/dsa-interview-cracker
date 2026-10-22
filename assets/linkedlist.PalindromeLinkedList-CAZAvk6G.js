var e=`linkedlist.PalindromeLinkedList`,t=`package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;
import com.dsa.utils.ListNode;

/**
 * Problem: Palindrome Linked List
 * LeetCode: 234 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Two pointers, Reverse a half list
 *
 * <p>Problem:
 * Given the head of a singly linked list, decide whether the list is a palindrome — the
 * sequence of values reads the same forwards and backwards.
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
 * 1 2 3 2 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: find the middle, reverse the second half, and compare the two halves node by
 * node.
 *
 * <p>Complexity: Time O(len), Space O(1).
 */
public class PalindromeLinkedList {

    /**
     * Returns {@code true} when the list reads the same forwards and backwards.
     *
     * @param head first node of the list
     * @return whether the list is a palindrome
     */
    public static boolean isPalindrome(ListNode head) {
        if (head == null || head.next == null) {
            return true;
        }
        // 1. find the last node of the first half
        ListNode slow = head;
        ListNode fast = head;
        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        // 2. reverse the second half
        ListNode prev = null;
        ListNode curr = slow.next;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        // 3. compare the front with the reversed back
        ListNode front = head;
        ListNode back = prev;
        while (back != null) {
            if (front.val != back.val) {
                return false;
            }
            front = front.next;
            back = back.next;
        }
        return true;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int len = fs.nextInt();
        int[] values = fs.nextIntArray(len);

        System.out.println(isPalindrome(ListNode.of(values)) ? "true" : "false");
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

/**
 * Problem: Palindrome Linked List
 * LeetCode: 234 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Two pointers, Reverse a half list
 *
 * <p>Problem:
 * Given the head of a singly linked list, decide whether the list is a palindrome — the
 * sequence of values reads the same forwards and backwards.
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
 * 1 2 3 2 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: find the middle, reverse the second half, and compare the two halves node by
 * node.
 *
 * <p>Complexity: Time O(len), Space O(1).
 */
public class Main {

    /**
     * Returns {@code true} when the list reads the same forwards and backwards.
     *
     * @param head first node of the list
     * @return whether the list is a palindrome
     */
    public static boolean isPalindrome(ListNode head) {
        if (head == null || head.next == null) {
            return true;
        }
        // 1. find the last node of the first half
        ListNode slow = head;
        ListNode fast = head;
        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        // 2. reverse the second half
        ListNode prev = null;
        ListNode curr = slow.next;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        // 3. compare the front with the reversed back
        ListNode front = head;
        ListNode back = prev;
        while (back != null) {
            if (front.val != back.val) {
                return false;
            }
            front = front.next;
            back = back.next;
        }
        return true;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int len = fs.nextInt();
        int[] values = fs.nextIntArray(len);

        System.out.println(isPalindrome(ListNode.of(values)) ? "true" : "false");
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
# Palindrome Linked List — LeetCode 234

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Two pointers · Reverse a half list |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

Given the head of a singly linked list, return \`true\` if the list is a **palindrome** — the
values read the same forwards and backwards — and \`false\` otherwise.

- \`1 -> 2 -> 3 -> 2 -> 1\` is a palindrome.
- \`1 -> 2\` is not.
- The list is not modified in the answer (the classic in-place version does modify it, but
  the values are what matters here).

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
1 2 3 2 1
\`\`\`

## Expected Output

\`\`\`
true
\`\`\`

Reading backwards gives \`1 2 3 2 1\` as well. ✓

## Approach — Reverse the Back Half and Compare

You cannot walk backwards through a singly linked list, so the only way to compare the front
with the back is to **reverse the back**. Three phases, exactly like
[Reorder List](ReorderList.md):

1. **Find the middle.** A slow/fast pointer pair: \`fast\` moves two steps per round, \`slow\`
   one. The loop condition \`fast.next != null && fast.next.next != null\` stops with \`slow\`
   on the **last node of the first half** — which also makes the odd-length case work
   (the middle node is skipped, and it is its own mirror).
2. **Reverse the second half** in place.
3. **Compare** the front pointer with the reversed back pointer, one node at a time, until
   the back pointer runs out.

**Why the back pointer is the right stopping condition:** the back half is never longer than
the front half, so when the back pointer reaches \`null\` every mirrored pair has been checked.

## Dry Run

Input: \`1 -> 2 -> 3 -> 2 -> 1\`

**Step 1 — find the middle**

| Step | \`slow\` | \`fast\` | list |
|---:|---|---|---|
| 0 | \`1\` | \`1\` | \`1 -> 2 -> 3 -> 2 -> 1\` |
| 1 | \`2\` | \`3\` | \`1 -> 2 -> 3 -> 2 -> 1\` |
| 2 | \`3\` | \`5\` | \`1 -> 2 -> 3 -> 2 -> 1\` |

\`fast.next == null\` → stop. The first half is \`1 -> 2 -> 3\`, the second half is
\`2 -> 1\`.

**Step 2 — reverse the second half**

| Step | \`curr\` | saved \`next\` | \`curr.next\` becomes | \`prev\` after | reversed chain |
|---:|---:|---:|---:|---:|---|
| 1 | \`2\` | \`1\` | \`null\` | \`2\` | \`2\` |
| 2 | \`1\` | \`null\` | \`2\` | \`1\` | \`1 -> 2\` |

**Step 3 — compare**

| Step | \`front\` | \`back\` | equal? | verdict |
|---:|---|---|---|---|
| 1 | \`1\` | \`1\` | yes | continue |
| 2 | \`2\` | \`2\` | yes | continue |
| 3 | \`3\` | \`null\` | — | loop ends → **palindrome** |

The value \`3\` in the middle is never compared with anything, which is correct: the middle
node of an odd-length list mirrors itself. ✓

### Counter-example — \`1 -> 2\`

| Step | \`front\` | \`back\` | equal? | verdict |
|---:|---|---|---|---|
| 1 | \`1\` | \`2\` | **no** | not a palindrome |

## Java Solution

See [\`PalindromeLinkedList.java\`](./PalindromeLinkedList.java).

\`\`\`java
public static boolean isPalindrome(ListNode head) {
    if (head == null || head.next == null) {
        return true;
    }
    ListNode slow = head;
    ListNode fast = head;
    while (fast.next != null && fast.next.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    ListNode prev = null;
    ListNode curr = slow.next;
    while (curr != null) {
        ListNode next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    ListNode front = head;
    ListNode back = prev;
    while (back != null) {
        if (front.val != back.val) {
            return false;
        }
        front = front.next;
        back = back.next;
    }
    return true;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(len) | Three linear passes |
| **Space** | O(1) | Only pointers — the reversal is in place |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Without modifying the list."* → copy the values into an array and compare the two
  halves: O(n) space, same time.
- *"Recursively."* → compare \`head.val\` with the last value, then recurse on the middle —
  needs a helper that returns both the verdict and the middle node.
- *"What about a palindrome with odd/even characters (LeetCode 125)?"* → skip the
  non-alphanumeric characters and ignore the case.
- *"Find the longest palindromic sublist."* → expand around the middle for each candidate
  centre: O(n²) time, O(1) space.

**Common mistakes:**
- ❌ Using \`fast != null\` only in the middle loop → \`slow\` ends one node too far for even
  lengths and the comparison compares the wrong pairs.
- ❌ Comparing until the **front** pointer is \`null\` → on odd lengths the front pointer runs
  out first and you would read past the end of the reversed half.
- ❌ Forgetting to reverse in place → a shallow copy of the second half would still point
  forwards and the comparison would be meaningless.

**How to narrate:**
> "A singly linked list can only be walked forwards, so I reverse the second half to be able
> to compare front against back. First I find the middle with a slow and a fast pointer,
> stopping when the fast pointer is two steps from the end. Then I reverse the second half
> in place, and finally I walk a front pointer and a back pointer towards each other
> comparing values until the back pointer runs out. O(n) time, O(1) space."

## Related Problems

- [Reorder List](ReorderList.md) — the same three phases
- [Reverse Linked List](ReverseLinkedList.md) — phase 2 on its own
- [Middle of the Linked List](MiddleOfTheLinkedList.md) — phase 1 on its own
`,i=[`isPalindrome`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};