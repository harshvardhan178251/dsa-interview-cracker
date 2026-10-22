var e=`linkedlist.RemoveDuplicatesFromSortedListII`,t=`package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;
import com.dsa.utils.ListNode;

/**
 * Problem: Remove Duplicates from Sorted List II
 * LeetCode: 83 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Dummy head, Run detection
 *
 * <p>Problem:
 * Given a sorted linked list, delete all nodes that have a duplicate: every value that
 * appears **more than once** is removed completely, not just the extra copies.
 *
 * <p>Input format (stdin):
 * <pre>
 * len
 * values[0] values[1] ... values[len-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 7
 * 1 2 3 3 4 4 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 2 5
 * </pre>
 *
 * <p>Approach: walk the list with a cursor and a previous pointer; when a run of equal
 * values is found, unlink the whole run.
 *
 * <p>Complexity: Time O(len), Space O(1).
 */
public class RemoveDuplicatesFromSortedListII {

    /**
     * Removes every value that occurs more than once.
     *
     * @param head first node of the sorted list
     * @return the head of the cleaned list
     */
    public static ListNode deleteDuplicates(ListNode head) {
        ListNode dummy = new ListNode(0, head);
        ListNode prev = dummy;
        ListNode curr = head;

        while (curr != null) {
            if (curr.next != null && curr.next.val == curr.val) {
                int value = curr.val;
                while (curr != null && curr.val == value) {
                    curr = curr.next;          // skip the whole run of equal values
                }
                prev.next = curr;              // unlink the run
            } else {
                prev = curr;                   // this value is unique: keep it
                curr = curr.next;
            }
        }
        return dummy.next;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int len = fs.nextInt();
        int[] values = fs.nextIntArray(len);

        ListNode result = deleteDuplicates(ListNode.of(values));

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
 * Problem: Remove Duplicates from Sorted List II
 * LeetCode: 83 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Dummy head, Run detection
 *
 * <p>Problem:
 * Given a sorted linked list, delete all nodes that have a duplicate: every value that
 * appears **more than once** is removed completely, not just the extra copies.
 *
 * <p>Input format (stdin):
 * <pre>
 * len
 * values[0] values[1] ... values[len-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 7
 * 1 2 3 3 4 4 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 2 5
 * </pre>
 *
 * <p>Approach: walk the list with a cursor and a previous pointer; when a run of equal
 * values is found, unlink the whole run.
 *
 * <p>Complexity: Time O(len), Space O(1).
 */
public class Main {

    /**
     * Removes every value that occurs more than once.
     *
     * @param head first node of the sorted list
     * @return the head of the cleaned list
     */
    public static ListNode deleteDuplicates(ListNode head) {
        ListNode dummy = new ListNode(0, head);
        ListNode prev = dummy;
        ListNode curr = head;

        while (curr != null) {
            if (curr.next != null && curr.next.val == curr.val) {
                int value = curr.val;
                while (curr != null && curr.val == value) {
                    curr = curr.next;          // skip the whole run of equal values
                }
                prev.next = curr;              // unlink the run
            } else {
                prev = curr;                   // this value is unique: keep it
                curr = curr.next;
            }
        }
        return dummy.next;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int len = fs.nextInt();
        int[] values = fs.nextIntArray(len);

        ListNode result = deleteDuplicates(ListNode.of(values));

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
`,r='\n# Remove Duplicates from Sorted List II — LeetCode 83\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Dummy head · Run detection |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |\n\n## Problem Statement\n\nGiven the head of a **sorted** linked list, delete every node that is part of a duplicate —\nall the copies of a repeated value are removed, not just the extra ones.\n\n- `1 -> 2 -> 3 -> 3 -> 4 -> 4 -> 5` becomes `1 -> 2 -> 5`.\n- `1 -> 1 -> 1 -> 2 -> 3` becomes `2 -> 3`.\n- `1 -> 1` becomes an empty list.\n\nThis is the difference between LeetCode 83 (**all** copies go) and LeetCode 82 (only the extra\ncopies go).\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nlen\nvalues[0] values[1] ... values[len-1]\n```\n\n- `len` — number of nodes (1 ≤ len ≤ 300)\n- `values` — len space-separated integers in **ascending** order\n\n## Sample Input\n\n```\n7\n1 2 3 3 4 4 5\n```\n\n## Expected Output\n\n```\n1 2 5\n```\n\nThe values `3` and `4` each appear twice, so both of their copies are removed. ✓\n\n## Approach — Skip the Whole Run\n\nBecause the list is sorted, equal values are **adjacent** — a duplicate is a run of equal\nnodes. The algorithm walks the list with two pointers:\n\n- `curr` — the node being examined,\n- `prev` — the last node known to be kept (it points at `curr`).\n\nFor each `curr`:\n\n- If `curr.next` has the same value, we have found a run. Walk `curr` past **every** node\n  with that value, then set `prev.next = curr` — the whole run is unlinked in one\n  assignment. `prev` does **not** move: it still points at the last kept node.\n- Otherwise the value is unique: keep it, so `prev = curr`.\n\n**Why the dummy head:** when the run to delete is at the very beginning, `prev` would have\nto point at a node that does not exist. The dummy head gives `prev` a home and lets\n`dummy.next` be returned directly.\n\n**Why `prev` must not advance after a deletion:** the node after the run may itself be a\nduplicate, and `prev` must still point at the last *kept* node so the next unlink lands in\nthe right place.\n\n## Dry Run\n\nInput: `dummy -> 1 -> 2 -> 3 -> 3 -> 4 -> 4 -> 5`\n\n| Step | `curr` | `curr.next` | run? | action | list |\n|---:|---|---|---|---|---|\n| 0 | `1` | `2` | no | keep: `prev = 1`, `curr = 2` | `dummy -> 1 -> 2 -> 3 -> 3 -> 4 -> 4 -> 5` |\n| 1 | `2` | `3` | no | keep: `prev = 2`, `curr = 3` | `dummy -> 1 -> 2 -> 3 -> 3 -> 4 -> 4 -> 5` |\n| 2 | `3` | `3` | **yes** | skip both `3`s → `curr = 4`; `prev.next = 4` | `dummy -> 1 -> 2 -> 4 -> 4 -> 5` |\n| 3 | `4` | `4` | **yes** | skip both `4`s → `curr = 5`; `prev.next = 5` | `dummy -> 1 -> 2 -> 5` |\n| 4 | `5` | `null` | no | keep: `prev = 5`, `curr = null` | `dummy -> 1 -> 2 -> 5` |\n\n`dummy.next` is `1` → the result is `1 2 5`. ✓\n\n### The tricky case — a run at the very beginning\n\nInput: `dummy -> 1 -> 1 -> 2`\n\n| Step | `curr` | `curr.next` | run? | action | list |\n|---:|---|---|---|---|---|\n| 1 | `1` | `1` | **yes** | skip both `1`s → `curr = 2`; `prev.next = 2` (prev is the dummy!) | `dummy -> 2` |\n| 2 | `2` | `null` | no | keep | `dummy -> 2` |\n\nWithout the dummy head this case would need a special "is the head a duplicate?" branch. ✓\n\n## Java Solution\n\nSee [`RemoveDuplicatesFromSortedListII.java`](./RemoveDuplicatesFromSortedListII.java).\n\n```java\npublic static ListNode deleteDuplicates(ListNode head) {\n    ListNode dummy = new ListNode(0, head);\n    ListNode prev = dummy;\n    ListNode curr = head;\n\n    while (curr != null) {\n        if (curr.next != null && curr.next.val == curr.val) {\n            int value = curr.val;\n            while (curr != null && curr.val == value) {\n                curr = curr.next;          // skip the whole run of equal values\n            }\n            prev.next = curr;              // unlink the run\n        } else {\n            prev = curr;                   // this value is unique: keep it\n            curr = curr.next;\n        }\n    }\n    return dummy.next;\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(len) | One pass; every node is visited at most twice |\n| **Space** | O(1) | A dummy head and two pointers |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"Keep only one copy of each value (LeetCode 82)."* → instead of skipping the whole run,\n  advance `curr` by one and keep the first node of the run.\n- *"Do it on an unsorted list."* → you need a hash map of frequencies, then a second pass\n  to remove the nodes whose count is above one.\n- *"Remove the duplicates in place without a dummy head."* → handle the head separately; the\n  dummy head is cleaner.\n- *"Return the list of values that were removed."* → collect them while unlinking.\n\n**Common mistakes:**\n- ❌ Advancing `prev` **after** a deletion → the next unlink can remove a node that should\n  have been kept.\n- ❌ Removing only the second node of the run → the result keeps one copy, which is\n  LeetCode 82, not 83.\n- ❌ Forgetting the dummy head → a run at the head cannot be unlinked.\n\n**How to narrate:**\n> "The list is sorted, so duplicates are adjacent — I look for runs of equal values. I keep\n> a `prev` pointer to the last node I kept and a `curr` pointer to the node I am examining.\n> If `curr` and `curr.next` are equal I skip the entire run and link `prev` straight to the\n> node after it, without moving `prev`. Otherwise I keep the node and move `prev` forward.\n> A dummy head in front means a run at the very beginning needs no special case. One pass,\n> O(1) space."\n\n## Related Problems\n\n- [Remove Duplicates from Sorted List](../../../../../../docs/topics/01-arrays.md) — keep one copy (LeetCode 82)\n- [Remove Nth Node From End of List](DeleteNthFromEnd.md) — unlink a node\n- [Merge Two Sorted Lists](MergeTwoSortedLists.md) — the other sorted-list drill\n',i=[`deleteDuplicates`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};