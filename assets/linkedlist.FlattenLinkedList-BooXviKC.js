var e=`linkedlist.FlattenLinkedList`,t=`package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;

/**
 * Problem: Flatten a Multilevel Linked List
 * Difficulty: Medium | Frequency: 3/5
 * Pattern: Recursion, Parsing a nested structure
 *
 * <p>Problem:
 * A multilevel linked list is a list whose nodes can also own a <em>child</em> list. The
 * task is to flatten it into a single list that contains every value, in the order they are
 * reached by a depth-first walk (a node, then its whole child list, then the next sibling).
 *
 * <p>Input format (stdin): a single line with a nested description
 * <pre>
 * value[childList],value[childList],...
 * </pre>
 * where a child list is written the same way inside brackets. Example: {@code 1[2[3],4],5}
 *
 * <p>Sample input:
 * <pre>
 * 1[2[3],4],5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 2 3 4 5
 * </pre>
 *
 * <p>Approach: parse the text into a tree of nodes, then splice every child list into the
 * chain right after its owner.
 *
 * <p>Complexity: Time O(n), Space O(n) for the parse (the flattening itself is in place).
 */
public class FlattenLinkedList {

    /** A node of a multilevel list: a value, a next sibling and a child list. */
    public static class MultiNode {
        public int val;
        public MultiNode next;
        public MultiNode child;

        public MultiNode(int val) {
            this.val = val;
        }
    }

    private static int pos;

    /**
     * Parses the nested description into a multilevel list.
     *
     * @param text the description, e.g. {@code 1[2[3],4],5}
     * @return the head of the parsed multilevel list
     */
    public static MultiNode parse(String text) {
        pos = 0;
        return parseList(text);
    }

    /** Parses a comma separated list of nodes; stops at a closing bracket or at the end. */
    private static MultiNode parseList(String text) {
        MultiNode head = null;
        MultiNode tail = null;
        while (pos < text.length()) {
            char c = text.charAt(pos);
            if (c == ']') {
                pos++;              // consume the closing bracket of this level
                break;
            }
            if (c == ',') {
                pos++;
                continue;
            }
            int start = pos;
            while (pos < text.length() && Character.isDigit(text.charAt(pos))) {
                pos++;
            }
            MultiNode node = new MultiNode(Integer.parseInt(text.substring(start, pos)));
            if (pos < text.length() && text.charAt(pos) == '[') {
                pos++;              // consume '['
                node.child = parseList(text);
            }
            if (tail == null) {
                head = node;
            } else {
                tail.next = node;
            }
            tail = node;
        }
        return head;
    }

    /**
     * Flattens the multilevel list in place: every child list is spliced in right after the
     * node that owns it.
     *
     * @param head the head of the multilevel list
     */
    public static void flatten(MultiNode head) {
        for (MultiNode cur = head; cur != null; cur = cur.next) {
            if (cur.child != null) {
                flatten(cur.child);                    // flatten the child list first
                MultiNode tail = cur.child;
                while (tail.next != null) {
                    tail = tail.next;
                }
                tail.next = cur.next;                  // attach it after the owner
                cur.next = cur.child;                   // and put it in front of the sibling
                cur.child = null;
            }
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String text = fs.next();

        MultiNode head = parse(text);
        flatten(head);

        StringBuilder sb = new StringBuilder();
        for (MultiNode c = head; c != null; c = c.next) {
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

/**
 * Problem: Flatten a Multilevel Linked List
 * Difficulty: Medium | Frequency: 3/5
 * Pattern: Recursion, Parsing a nested structure
 *
 * <p>Problem:
 * A multilevel linked list is a list whose nodes can also own a <em>child</em> list. The
 * task is to flatten it into a single list that contains every value, in the order they are
 * reached by a depth-first walk (a node, then its whole child list, then the next sibling).
 *
 * <p>Input format (stdin): a single line with a nested description
 * <pre>
 * value[childList],value[childList],...
 * </pre>
 * where a child list is written the same way inside brackets. Example: {@code 1[2[3],4],5}
 *
 * <p>Sample input:
 * <pre>
 * 1[2[3],4],5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 2 3 4 5
 * </pre>
 *
 * <p>Approach: parse the text into a tree of nodes, then splice every child list into the
 * chain right after its owner.
 *
 * <p>Complexity: Time O(n), Space O(n) for the parse (the flattening itself is in place).
 */
public class Main {

    /** A node of a multilevel list: a value, a next sibling and a child list. */
    public static class MultiNode {
        public int val;
        public MultiNode next;
        public MultiNode child;

        public MultiNode(int val) {
            this.val = val;
        }
    }

    private static int pos;

    /**
     * Parses the nested description into a multilevel list.
     *
     * @param text the description, e.g. {@code 1[2[3],4],5}
     * @return the head of the parsed multilevel list
     */
    public static MultiNode parse(String text) {
        pos = 0;
        return parseList(text);
    }

    /** Parses a comma separated list of nodes; stops at a closing bracket or at the end. */
    private static MultiNode parseList(String text) {
        MultiNode head = null;
        MultiNode tail = null;
        while (pos < text.length()) {
            char c = text.charAt(pos);
            if (c == ']') {
                pos++;              // consume the closing bracket of this level
                break;
            }
            if (c == ',') {
                pos++;
                continue;
            }
            int start = pos;
            while (pos < text.length() && Character.isDigit(text.charAt(pos))) {
                pos++;
            }
            MultiNode node = new MultiNode(Integer.parseInt(text.substring(start, pos)));
            if (pos < text.length() && text.charAt(pos) == '[') {
                pos++;              // consume '['
                node.child = parseList(text);
            }
            if (tail == null) {
                head = node;
            } else {
                tail.next = node;
            }
            tail = node;
        }
        return head;
    }

    /**
     * Flattens the multilevel list in place: every child list is spliced in right after the
     * node that owns it.
     *
     * @param head the head of the multilevel list
     */
    public static void flatten(MultiNode head) {
        for (MultiNode cur = head; cur != null; cur = cur.next) {
            if (cur.child != null) {
                flatten(cur.child);                    // flatten the child list first
                MultiNode tail = cur.child;
                while (tail.next != null) {
                    tail = tail.next;
                }
                tail.next = cur.next;                  // attach it after the owner
                cur.next = cur.child;                   // and put it in front of the sibling
                cur.child = null;
            }
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String text = fs.next();

        MultiNode head = parse(text);
        flatten(head);

        StringBuilder sb = new StringBuilder();
        for (MultiNode c = head; c != null; c = c.next) {
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
`,r='\n# Flatten a Multilevel Linked List\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Recursion · Parsing a nested structure |\n| **Interview heat** | ★★★☆☆ |\n| **Asked at** | Amazon, Google, Meta, Microsoft |\n\n## Problem Statement\n\nA **multilevel linked list** is a list where a node may own a *child list* of its own:\n\n```\n1 -> 5\n     |\n     2 -> 9\n          |\n          3\n```\n\nFlattening it means producing a single list that contains every node, in the order a\ndepth-first walk reaches them: a node, then everything below it, then its next sibling.\n\n- `1[2[3],4],5` flattens to `1 -> 2 -> 3 -> 4 -> 5`.\n- The flattening is done **in place** — the child pointers are removed.\n\n## Input Format\n\nThe program reads a **single line** from standard input: a nested description of the list.\n\n```\nvalue[childList],value[childList],...\n```\n\n- A node is written as its value, optionally followed by `[` and a child list in the same\n  format, closed by `]`.\n- Nodes inside a level are separated by commas.\n\nExample: `1[2[3],4],5` is the list `1 -> 5` where `1` owns the child list `2 -> 4` and `2`\nowns the child list `3`.\n\n## Sample Input\n\n```\n1[2[3],4],5\n```\n\n## Expected Output\n\n```\n1 2 3 4 5\n```\n\n## Approach — Parse, Then Splice\n\n**Phase 1 — parse.** A recursive descent parser. `parseList` reads nodes until it hits a\nclosing bracket or the end of the text:\n\n1. Skip `,` separators.\n2. Read the digits of the value.\n3. If the next character is `[`, consume it and recurse — the result is the node\'s child list.\n4. Link the node into the chain being built.\n\n**Phase 2 — flatten.** Walk the top level. For every node that owns a child list:\n\n1. **Recursively flatten the child list first** (otherwise a grandchild would be spliced\n   into the wrong place).\n2. Walk to the tail of the flattened child list.\n3. `tail.next = cur.next` and `cur.next = cur.child` — the child list is now spliced in\n   right after its owner.\n4. `cur.child = null` — the multilevel structure is gone.\n\n## Dry Run\n\nInput: `1[2[3],4],5`\n\n**Phase 1 — parse**\n\n| Step | text consumed | node created | link built |\n|---:|---|---|---|\n| 1 | `1` | `1` | — |\n| 2 | `[` | — | recurse into level 2 |\n| 3 | `2` | `2` | level 2: `2` |\n| 4 | `[` | — | recurse into level 3 |\n| 5 | `3` | `3` | level 3: `3` → `3.child = null`, back to level 2 |\n| 6 | `]`, `,` | — | level 2 continues: `2 -> 4` |\n| 7 | `4` | `4` | level 2: `2 -> 4` |\n| 8 | `]`, `,` | — | level 2 ends → `1.child = 2 -> 4` |\n| 9 | `5` | `5` | level 1: `1 -> 5` |\n\nParsed structure:\n\n```\n1 -> 5\n     |\n     2 -> 4\n          |\n          3\n```\n\n**Phase 2 — flatten**\n\n| Step | node | action | list |\n|---:|---|---|---|\n| 1 | `1` | flatten child `2 -> 4`: `2` owns `3`, so `3` is spliced in → child becomes `2 -> 3 -> 4` | `1 -> 5`, `1.child = 2 -> 3 -> 4` |\n| 2 | `1` | tail of child = `4`; `4.next = 1.next (5)`; `1.next = 2`; `1.child = null` | `1 -> 2 -> 3 -> 4 -> 5` |\n| 3 | `2` | `child == null` → nothing to do | `1 -> 2 -> 3 -> 4 -> 5` |\n| 4 | `3` | `child == null` → nothing to do | `1 -> 2 -> 3 -> 4 -> 5` |\n| 5 | `4` | `child == null` → nothing to do | `1 -> 2 -> 3 -> 4 -> 5` |\n| 6 | `5` | `child == null` → nothing to do | `1 -> 2 -> 3 -> 4 -> 5` |\n\nThe flattened list is `1 2 3 4 5`. ✓\n\n## Java Solution\n\nSee [`FlattenLinkedList.java`](./FlattenLinkedList.java).\n\n```java\npublic static void flatten(MultiNode head) {\n    for (MultiNode cur = head; cur != null; cur = cur.next) {\n        if (cur.child != null) {\n            flatten(cur.child);                    // flatten the child list first\n            MultiNode tail = cur.child;\n            while (tail.next != null) {\n                tail = tail.next;\n            }\n            tail.next = cur.next;                  // attach it after the owner\n            cur.next = cur.child;                   // and put it in front of the sibling\n            cur.child = null;\n        }\n    }\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n) | Every node is parsed once and spliced once |\n| **Space** | O(n) | The parse builds the tree; the flattening itself is in place (O(h) recursion depth) |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"Flatten into a new list instead of in place."* → collect the values in a list during\n  the walk and build a fresh chain.\n- *"Flatten depth-first with an explicit stack."* → the recursion can be replaced by a stack\n  of pending lists; the depth may be large.\n- *"Merge the child lists in sorted order."* → flatten, then sort.\n- *"What if a node can have several child lists?"* → the parse already generalises: store\n  the children in a list and splice them one by one.\n\n**Common mistakes:**\n- ❌ Splicing the child list in **before** flattening it → a grandchild ends up after the\n  wrong node.\n- ❌ Forgetting `cur.child = null` → the list still looks multilevel.\n- ❌ Losing the sibling link (`tail.next = cur.next` before `cur.next = cur.child`) → the\n  rest of the list disappears.\n\n**How to narrate:**\n> "First I parse the text recursively: read a value, and if it is followed by a bracket\n> recurse for the child list. Then I flatten: for every node that owns a child list I first\n> flatten that child list recursively, then walk to its tail, link the tail to the current\n> next, and link the current node to the child head. The result is a single list in\n> depth-first order."\n\n## Related Problems\n\n- [Reorder List](ReorderList.md) — the same split/reverse/interleave family\n- [Flatten Binary Tree to Linked List](../../../../../../docs/topics/13-trees.md) — the tree version of this problem\n- [Merge Two Sorted Lists](MergeTwoSortedLists.md) — splicing chains\n',i=[`parse`,`flatten`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};