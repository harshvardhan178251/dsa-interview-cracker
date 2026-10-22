var e=`linkedlist.AddTwoNumbers`,t=`package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;
import com.dsa.utils.ListNode;

/**
 * Problem: Add Two Numbers
 * LeetCode: 2 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Digit-by-digit carry, Dummy head
 *
 * <p>Problem:
 * Two non-negative numbers are given as linked lists of digits, **least significant digit
 * first** (the classic "reverse order" storage). Add them and return the sum as a linked
 * list of digits in the same order.
 *
 * <p>Input format (stdin):
 * <pre>
 * n1
 * l1 digits (least significant first)
 * n2
 * l2 digits (least significant first)
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 2
 * 9 9
 * 1
 * 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0 0 1
 * </pre>
 *
 * <p>Approach: walk both lists in parallel — the head of each list is the units column — add
 * the two digits plus the carry, and emit {@code sum % 10} with the carry {@code sum / 10}.
 *
 * <p>Complexity: Time O(n + m), Space O(1) besides the output.
 */
public class AddTwoNumbers {

    /**
     * Adds two numbers stored as digit lists (least significant digit first).
     *
     * @param l1 first number
     * @param l2 second number
     * @return the sum as a digit list, least significant digit first
     */
    public static ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        int carry = 0;

        while (l1 != null || l2 != null || carry != 0) {
            int sum = carry;
            if (l1 != null) {
                sum += l1.val;
                l1 = l1.next;
            }
            if (l2 != null) {
                sum += l2.val;
                l2 = l2.next;
            }
            carry = sum / 10;
            tail.next = new ListNode(sum % 10);
            tail = tail.next;
        }
        return dummy.next;
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
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

/**
 * Problem: Add Two Numbers
 * LeetCode: 2 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Digit-by-digit carry, Dummy head
 *
 * <p>Problem:
 * Two non-negative numbers are given as linked lists of digits, **least significant digit
 * first** (the classic "reverse order" storage). Add them and return the sum as a linked
 * list of digits in the same order.
 *
 * <p>Input format (stdin):
 * <pre>
 * n1
 * l1 digits (least significant first)
 * n2
 * l2 digits (least significant first)
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 2
 * 9 9
 * 1
 * 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0 0 1
 * </pre>
 *
 * <p>Approach: walk both lists in parallel — the head of each list is the units column — add
 * the two digits plus the carry, and emit {@code sum % 10} with the carry {@code sum / 10}.
 *
 * <p>Complexity: Time O(n + m), Space O(1) besides the output.
 */
public class Main {

    /**
     * Adds two numbers stored as digit lists (least significant digit first).
     *
     * @param l1 first number
     * @param l2 second number
     * @return the sum as a digit list, least significant digit first
     */
    public static ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        int carry = 0;

        while (l1 != null || l2 != null || carry != 0) {
            int sum = carry;
            if (l1 != null) {
                sum += l1.val;
                l1 = l1.next;
            }
            if (l2 != null) {
                sum += l2.val;
                l2 = l2.next;
            }
            carry = sum / 10;
            tail.next = new ListNode(sum % 10);
            tail = tail.next;
        }
        return dummy.next;
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
`,r='\n# Add Two Numbers — LeetCode 2\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Digit-by-digit carry · Dummy head |\n| **Interview heat** | ★★★★★ |\n| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg, Adobe |\n\n## Problem Statement\n\nTwo non-negative integers are represented as linked lists of digits, **least significant\ndigit first** (the classic "reverse order" storage). Add them and return the sum in the same\nrepresentation.\n\n- `9 -> 9` (99) plus `1` (1) gives `0 -> 0 -> 1` (100).\n- The lists may have **different lengths** — the missing digits sit at the tail, which is the\n  most significant end.\n- The result uses the same least-significant-first order as the input.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nn1\ndigits1[0] digits1[1] ... digits1[n1-1]\nn2\ndigits2[0] digits2[1] ... digits2[n2-1]\n```\n\n- `n1` — number of digits of the first number (1 ≤ n1 ≤ 10⁴)\n- `digits1` — the digits, **least significant first** (each 0…9)\n- `n2` — number of digits of the second number (1 ≤ n2 ≤ 10⁴)\n- `digits2` — the digits, least significant first\n\n## Sample Input\n\n```\n2\n9 9\n1\n1\n```\n\n## Expected Output\n\n```\n0 0 1\n```\n\n99 + 1 = 100, written least significant digit first. ✓\n\n## Approach — Carry Propagation, One Column at a Time\n\nBecause the digits are stored least significant first, **the head of the list is the units\ncolumn**. Walking both lists from the head therefore visits the columns in exactly the order\nthe carry needs: units first, tens second, and so on.\n\nPer column:\n\n```\nsum   = digit1 + digit2 + carry\ndigit = sum % 10\ncarry = sum / 10\n```\n\n`sum` is at most `9 + 9 + 1 = 19`, so the carry is always `0` or `1` and the modulo/division\nsplit is exact.\n\nTwo details make the loop correct:\n\n- The condition is `l1 != null || l2 != null || carry != 0` — the last term is what emits the\n  extra leading digit of `99 + 1 = 100`.\n- A list that has already ended contributes `0` to the remaining columns. Because the short\n  list\'s missing digits are at its tail, those zeros land at the **most significant** end,\n  which is exactly right.\n\nA dummy head removes the "what is the first digit?" special case: we always append to the\ntail and return `dummy.next` at the end.\n\n## Dry Run\n\nInput: `9 -> 9` (99) and `1 -> null` (1)\n\n| Step | `l1.val` | `l2.val` | carry in | `sum` | digit out | carry out | result so far |\n|---:|---:|---:|---:|---:|---:|---:|---|\n| 1 | `9` | `1` | `0` | `10` | `0` | `1` | `0` |\n| 2 | `9` | `null` | `1` | `10` | `0` | `1` | `0 -> 0` |\n| 3 | `null` | `null` | `1` | `1` | `1` | `0` | `0 -> 0 -> 1` |\n\nThe loop stops when the carry is `0` **and** both lists are exhausted. ✓\n\n### Unequal lengths — `2 -> 4 -> 3` (342) plus `5 -> 6 -> 1` (165)\n\n| Step | `l1.val` | `l2.val` | carry in | `sum` | digit out | carry out | result so far |\n|---:|---:|---:|---:|---:|---:|---:|---|\n| 1 | `2` | `5` | `0` | `7` | `7` | `0` | `7` |\n| 2 | `4` | `6` | `0` | `10` | `0` | `1` | `7 -> 0` |\n| 3 | `3` | `1` | `1` | `5` | `5` | `0` | `7 -> 0 -> 5` |\n\n342 + 165 = 507, stored as `7 -> 0 -> 5`. ✓\n\n## Java Solution\n\nSee [`AddTwoNumbers.java`](./AddTwoNumbers.java).\n\n```java\npublic static ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n    ListNode dummy = new ListNode(0);\n    ListNode tail = dummy;\n    int carry = 0;\n\n    while (l1 != null || l2 != null || carry != 0) {\n        int sum = carry;\n        if (l1 != null) {\n            sum += l1.val;\n            l1 = l1.next;\n        }\n        if (l2 != null) {\n            sum += l2.val;\n            l2 = l2.next;\n        }\n        carry = sum / 10;\n        tail.next = new ListNode(sum % 10);\n        tail = tail.next;\n    }\n    return dummy.next;\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n + m) | Each digit of both lists is visited once |\n| **Space** | O(n + m) | The result list — the algorithm itself uses O(1) extra space |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"What if the digits are stored most significant first?"* → the columns are in the wrong\n  order; reverse the lists, add, and reverse the result — or use two stacks — see\n  [Add Two Numbers II](AddTwoNumbersII.md).\n- *"What if the numbers can be negative?"* → handle the sign separately, or use a signed\n  representation with borrow propagation.\n- *"Do it without creating new nodes."* → write the digits back into the existing nodes and\n  re-use the longer list.\n- *"Add three numbers."* → same loop with three lists, or add two and then add the third.\n\n**Common mistakes:**\n- ❌ Forgetting the `|| carry != 0` in the loop condition → `99 + 1` returns `0 -> 0` instead\n  of `0 -> 0 -> 1`.\n- ❌ Using `sum / 10` and `sum % 10` the other way round → digits and carries are swapped.\n- ❌ Mutating the **input** lists while reading them → the caller\'s lists are destroyed; walk\n  with local pointers instead.\n\n**How to narrate:**\n> "The digits are stored least significant first, so the head of each list is the units\n> column — walking both lists in parallel visits the columns in the order the carry needs.\n> For each column I add the two digits plus the carry, emit `sum % 10` and carry `sum / 10`\n> forward. The loop runs while either list has digits **or** a carry is left, and that last\n> part is what emits the extra leading digit when the sum overflows. A missing list\n> contributes zero, and because the short list\'s gap is at its tail those zeros land at the\n> most significant end, which is correct."\n\n## Related Problems\n\n- [Add Two Numbers II](AddTwoNumbersII.md) — most significant digit first\n- [Merge Two Sorted Lists](MergeTwoSortedLists.md) — the same merge skeleton\n- [Evaluate Reverse Polish Notation](../stacks/EvaluateReversePolishNotation.md) — stack evaluation\n',i=[`addTwoNumbers`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};