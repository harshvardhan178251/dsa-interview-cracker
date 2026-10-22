var e=`linkedlist.AddTwoNumbersII`,t=`package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;
import com.dsa.utils.ListNode;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Add Two Numbers II
 * LeetCode: 445 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Two stacks, Carry propagation
 *
 * <p>Problem:
 * Two non-negative numbers are given as linked lists of digits, **most significant digit
 * first**. Add them and return the sum as a linked list of digits in the same order.
 *
 * <p>Input format (stdin):
 * <pre>
 * n1
 * l1 digits (most significant first)
 * n2
 * l2 digits (most significant first)
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 3 4 2 7
 * 2
 * 6 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3 4 9 2
 * </pre>
 *
 * <p>Approach: push every digit of both lists onto two stacks. Popping the stacks yields the
 * digits from least to most significant, which is the order the carry needs. The result
 * digits are computed least significant first, so each one is prepended to the result.
 *
 * <p>Complexity: Time O(n + m), Space O(n + m).
 */
public class AddTwoNumbersII {

    /**
     * Adds two numbers stored as digit lists (most significant digit first).
     *
     * @param l1 first number
     * @param l2 second number
     * @return the sum as a digit list, most significant digit first
     */
    public static ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        Deque<Integer> first = new ArrayDeque<>();
        Deque<Integer> second = new ArrayDeque<>();
        for (ListNode cur = l1; cur != null; cur = cur.next) {
            first.push(cur.val);
        }
        for (ListNode cur = l2; cur != null; cur = cur.next) {
            second.push(cur.val);
        }

        ListNode head = null;
        int carry = 0;
        while (!first.isEmpty() || !second.isEmpty() || carry != 0) {
            int sum = carry;
            if (!first.isEmpty()) {
                sum += first.pop();
            }
            if (!second.isEmpty()) {
                sum += second.pop();
            }
            carry = sum / 10;
            // the digits come out least significant first, so prepend them
            head = new ListNode(sum % 10, head);
        }
        return head;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n1 = fs.nextInt();
        int[] digits1 = fs.nextIntArray(n1);
        int n2 = fs.nextInt();
        int[] digits2 = fs.nextIntArray(n2);

        ListNode sum = addTwoNumbers(ListNode.of(digits1), ListNode.of(digits2));

        StringBuilder sb = new StringBuilder();
        for (ListNode c = sum; c != null; c = c.next) {
            if (sb.length() > 0) {
                sb.append(' ');
            }
            sb.append(c.val);
        }
        System.out.println(sb);
    }
}
`,n=`import java.util.ArrayDeque;
import java.util.Deque;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

/**
 * Problem: Add Two Numbers II
 * LeetCode: 445 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Two stacks, Carry propagation
 *
 * <p>Problem:
 * Two non-negative numbers are given as linked lists of digits, **most significant digit
 * first**. Add them and return the sum as a linked list of digits in the same order.
 *
 * <p>Input format (stdin):
 * <pre>
 * n1
 * l1 digits (most significant first)
 * n2
 * l2 digits (most significant first)
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 3 4 2 7
 * 2
 * 6 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3 4 9 2
 * </pre>
 *
 * <p>Approach: push every digit of both lists onto two stacks. Popping the stacks yields the
 * digits from least to most significant, which is the order the carry needs. The result
 * digits are computed least significant first, so each one is prepended to the result.
 *
 * <p>Complexity: Time O(n + m), Space O(n + m).
 */
public class Main {

    /**
     * Adds two numbers stored as digit lists (most significant digit first).
     *
     * @param l1 first number
     * @param l2 second number
     * @return the sum as a digit list, most significant digit first
     */
    public static ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        Deque<Integer> first = new ArrayDeque<>();
        Deque<Integer> second = new ArrayDeque<>();
        for (ListNode cur = l1; cur != null; cur = cur.next) {
            first.push(cur.val);
        }
        for (ListNode cur = l2; cur != null; cur = cur.next) {
            second.push(cur.val);
        }

        ListNode head = null;
        int carry = 0;
        while (!first.isEmpty() || !second.isEmpty() || carry != 0) {
            int sum = carry;
            if (!first.isEmpty()) {
                sum += first.pop();
            }
            if (!second.isEmpty()) {
                sum += second.pop();
            }
            carry = sum / 10;
            // the digits come out least significant first, so prepend them
            head = new ListNode(sum % 10, head);
        }
        return head;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n1 = fs.nextInt();
        int[] digits1 = fs.nextIntArray(n1);
        int n2 = fs.nextInt();
        int[] digits2 = fs.nextIntArray(n2);

        ListNode sum = addTwoNumbers(ListNode.of(digits1), ListNode.of(digits2));

        StringBuilder sb = new StringBuilder();
        for (ListNode c = sum; c != null; c = c.next) {
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
# Add Two Numbers II — LeetCode 445

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Two stacks · Carry propagation |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

Two non-negative integers are represented as linked lists of digits, **most significant digit
first**. Add them and return the sum in the same representation.

- \`3 -> 4 -> 2 -> 7\` (3427) plus \`6 -> 5\` (65) gives \`3 -> 4 -> 9 -> 2\` (3492).
- The result is **also** stored most significant digit first.

This is the harder twin of [Add Two Numbers](AddTwoNumbers.md): there the
digits were stored least significant first, so the columns were already lined up. Here they
are stored the other way round, and the carry has to travel **against** the direction the
lists are stored in.

## Input Format

The program reads from standard input:

\`\`\`
n1
digits1[0] digits1[1] ... digits1[n1-1]
n2
digits2[0] digits2[1] ... digits2[n2-1]
\`\`\`

- \`n1\` — number of digits of the first number (1 ≤ n1 ≤ 10⁴)
- \`digits1\` — the digits, **most significant first** (each 0…9)
- \`n2\` — number of digits of the second number (1 ≤ n2 ≤ 10⁴)
- \`digits2\` — the digits, most significant first

## Sample Input

\`\`\`
4
3 4 2 7
2
6 5
\`\`\`

## Expected Output

\`\`\`
3 4 9 2
\`\`\`

3427 + 65 = 3492, written most significant digit first. ✓

## Approach — Two Stacks

The digits are stored most significant first, but the carry travels from the **least**
significant column to the most significant one. We therefore need to read the lists in the
opposite order of how they are stored.

Two options:

1. Reverse both lists in place, add them with the usual carry, and reverse the result.
2. **Push every digit onto a stack.** A stack is LIFO, so the first digit pushed (the most
   significant one) comes out last — exactly the order the carry needs.

Option 2 never mutates the input, so it is the safer choice in an interview.

Then, for each column:

\`\`\`
sum   = (first.pop() or 0) + (second.pop() or 0) + carry
digit = sum % 10
carry = sum / 10
\`\`\`

The digits come out **least significant first**. The result list must be most significant
first, so every new digit is **prepended**: the last digit computed (the most significant
one) ends up at the head of the list.

## Dry Run

Input: \`3 -> 4 -> 2 -> 7\` (3427) and \`6 -> 5\` (65)

**Phase 1 — fill the stacks** (\`push\` adds to the front, \`pop\` takes from the front)

| Step | pushed | \`first\` (front → back) | pushed | \`second\` (front → back) |
|---:|---|---|---|---|
| 1 | \`3\` | \`3\` | \`6\` | \`6\` |
| 2 | \`4\` | \`4 3\` | \`5\` | \`5 6\` |
| 3 | \`2\` | \`2 4 3\` | — | \`5 6\` |
| 4 | \`7\` | \`7 2 4 3\` | — | \`5 6\` |

**Phase 2 — add column by column** (the digits are prepended)

| Step | \`first.pop()\` | \`second.pop()\` | carry in | \`sum\` | digit | carry out | result (head → tail) |
|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | \`7\` | \`5\` | \`0\` | \`12\` | \`2\` | \`1\` | \`2\` |
| 2 | \`2\` | \`6\` | \`1\` | \`9\` | \`9\` | \`0\` | \`9 -> 2\` |
| 3 | \`4\` | \`null\` | \`0\` | \`4\` | \`4\` | \`0\` | \`4 -> 9 -> 2\` |
| 4 | \`3\` | \`null\` | \`0\` | \`3\` | \`3\` | \`0\` | \`3 -> 4 -> 9 -> 2\` |

The list is read from the head, so the program prints \`3 4 9 2\` — most significant first,
the same format as the input. ✓

**Watch out:** *appending* the digits instead of prepending them would produce
\`2 -> 9 -> 4 -> 3\`, which is the least-significant-first format of the sibling problem.

## Java Solution

See [\`AddTwoNumbersII.java\`](./AddTwoNumbersII.java).

\`\`\`java
public static ListNode addTwoNumbers(ListNode l1, ListNode l2) {
    Deque<Integer> first = new ArrayDeque<>();
    Deque<Integer> second = new ArrayDeque<>();
    for (ListNode cur = l1; cur != null; cur = cur.next) {
        first.push(cur.val);
    }
    for (ListNode cur = l2; cur != null; cur = cur.next) {
        second.push(cur.val);
    }

    ListNode head = null;
    int carry = 0;
    while (!first.isEmpty() || !second.isEmpty() || carry != 0) {
        int sum = carry;
        if (!first.isEmpty()) {
            sum += first.pop();
        }
        if (!second.isEmpty()) {
            sum += second.pop();
        }
        carry = sum / 10;
        // the digits come out least significant first, so prepend them
        head = new ListNode(sum % 10, head);
    }
    return head;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n + m) | Every digit is pushed and popped exactly once |
| **Space** | O(n + m) | The two stacks hold all the digits |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you avoid the extra space?"* → reverse both input lists in place, add, and reverse
  the result back: O(1) extra space, three reversals.
- *"What if the numbers are huge and you cannot convert them to a primitive type?"* → this
> solution never does.
- *"What about subtraction?"* → same skeleton with borrow propagation.
- *"Multiply the two numbers?"* → the classic "multiply strings" trick: accumulate the
  digits of one number into the other, least significant first.

**Common mistakes:**
- ❌ Appending the result digits → the result comes out least significant first, which is
  the **other** problem.
- ❌ Forgetting \`|| carry != 0\` in the loop → a final carry is dropped.
- ❌ Mutating the input lists → the caller's lists are destroyed.

**How to narrate:**
> "The digits are stored most significant first but the carry travels from the least
> significant column, so I push both lists onto stacks — a stack hands the digits back to me
> in the opposite order, which is exactly the order the carry needs. Then I add column by
> column with the usual carry rule. The digits come out least significant first, and the
> result has to be most significant first, so I prepend each new digit. O(n + m) time and
> O(n + m) space, and I never touch the input lists."

## Related Problems

- [Add Two Numbers](AddTwoNumbers.md) — least significant digit first
- [Evaluate Reverse Polish Notation](../stacks/EvaluateReversePolishNotation.md) — stack evaluation
- [Reverse Linked List](ReverseLinkedList.md) — the in-place alternative
`,i=[`addTwoNumbers`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};