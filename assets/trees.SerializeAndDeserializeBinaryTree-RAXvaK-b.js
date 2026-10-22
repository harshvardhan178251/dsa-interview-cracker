var e=`trees.SerializeAndDeserializeBinaryTree`,t=`package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.LinkedList;
import java.util.List;

/**
 * Problem: Serialize and Deserialize Binary Tree
 * LeetCode: 297 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Level-order encoding, Round trip
 *
 * <p>Problem: Design an algorithm that serialises a binary tree to a string and
 * deserialises it back into the very same tree.
 *
 * <p>Input format (stdin):
 * <pre>
 * t
 * v0 v1 ... v(t-1)
 * </pre>
 * The tree is given in level order; {@code null} marks a missing child and the first
 * value is the root. {@code t} is the number of level-order tokens that follow.
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 2 3 null 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1,2,3,null,4
 * 1 2 3 4
 * </pre>
 * The first line is the serialised tree: the values in level order, separated by commas,
 * with {@code null} for the missing children and without the trailing {@code null}s. The
 * second line is the deserialised tree printed in level order, proving the round trip.
 *
 * <p>Approach: the level-order encoding is the input format of this repository, so the
 * serialisation is exactly that list, comma separated. Deserialising means splitting
 * the string again and rebuilding the tree from the level-order list. Trailing
 * {@code null}s may be dropped because they never carry information.
 *
 * <p>Complexity: Time O(n) for both directions, Space O(n) for the encoding.
 */
public class SerializeAndDeserializeBinaryTree {

    /**
     * Serialises a tree into a comma separated level-order string.
     *
     * @param root root of the tree, may be {@code null}
     * @return the serialised tree, or an empty string for an empty tree
     */
    public static String serialize(TreeNode root) {
        if (root == null) {
            return "";
        }
        // A linked list is used as the queue because it happily stores null children.
        Deque<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        List<String> parts = new ArrayList<>();
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            if (node == null) {
                parts.add("null");
                continue;
            }
            parts.add(String.valueOf(node.val));
            queue.add(node.left);
            queue.add(node.right);
        }
        while (!parts.isEmpty() && "null".equals(parts.get(parts.size() - 1))) {
            parts.remove(parts.size() - 1); // trailing nulls carry no information
        }
        return String.join(",", parts);
    }

    /**
     * Rebuilds the tree from its serialised form.
     *
     * @param data the string produced by {@link #serialize(TreeNode)}
     * @return the rebuilt tree, or {@code null} for an empty string
     */
    public static TreeNode deserialize(String data) {
        if (data == null || data.isEmpty()) {
            return null;
        }
        String[] parts = data.split(",");
        Integer[] values = new Integer[parts.length];
        for (int i = 0; i < parts.length; i++) {
            values[i] = "null".equals(parts[i]) ? null : Integer.valueOf(parts[i]);
        }
        return TreeNode.of(values);
    }

    /** Reads one level-order token: an integer, or {@code null} for a missing node. */
    private static Integer nextTreeValue(FastScanner fs) throws IOException {
        String token = fs.next();
        return "null".equals(token) ? null : Integer.valueOf(token);
    }

    /** Reads a tree: a token count followed by that many level-order tokens. */
    private static TreeNode readTree(FastScanner fs) throws IOException {
        int count = fs.nextInt();
        Integer[] values = new Integer[count];
        for (int i = 0; i < count; i++) {
            values[i] = nextTreeValue(fs);
        }
        return TreeNode.of(values);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        TreeNode root = readTree(fs);

        String encoded = serialize(root);
        System.out.println(encoded);

        TreeNode restored = deserialize(encoded);
        System.out.println(levelOrderValues(restored));
    }

    /**
     * Renders the values of a tree in level order (breadth first, left to right),
     * skipping the missing children.
     */
    private static String levelOrderValues(TreeNode root) {
        if (root == null) {
            return "";
        }
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        StringBuilder sb = new StringBuilder();
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            if (sb.length() > 0) {
                sb.append(' ');
            }
            sb.append(node.val);
            if (node.left != null) {
                queue.add(node.left);
            }
            if (node.right != null) {
                queue.add(node.right);
            }
        }
        return sb.toString();
    }
}
`,n=`import java.io.IOException;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.LinkedList;
import java.util.List;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Serialize and Deserialize Binary Tree
 * LeetCode: 297 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Level-order encoding, Round trip
 *
 * <p>Problem: Design an algorithm that serialises a binary tree to a string and
 * deserialises it back into the very same tree.
 *
 * <p>Input format (stdin):
 * <pre>
 * t
 * v0 v1 ... v(t-1)
 * </pre>
 * The tree is given in level order; {@code null} marks a missing child and the first
 * value is the root. {@code t} is the number of level-order tokens that follow.
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 2 3 null 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1,2,3,null,4
 * 1 2 3 4
 * </pre>
 * The first line is the serialised tree: the values in level order, separated by commas,
 * with {@code null} for the missing children and without the trailing {@code null}s. The
 * second line is the deserialised tree printed in level order, proving the round trip.
 *
 * <p>Approach: the level-order encoding is the input format of this repository, so the
 * serialisation is exactly that list, comma separated. Deserialising means splitting
 * the string again and rebuilding the tree from the level-order list. Trailing
 * {@code null}s may be dropped because they never carry information.
 *
 * <p>Complexity: Time O(n) for both directions, Space O(n) for the encoding.
 */
public class Main {

    /**
     * Serialises a tree into a comma separated level-order string.
     *
     * @param root root of the tree, may be {@code null}
     * @return the serialised tree, or an empty string for an empty tree
     */
    public static String serialize(TreeNode root) {
        if (root == null) {
            return "";
        }
        // A linked list is used as the queue because it happily stores null children.
        Deque<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        List<String> parts = new ArrayList<>();
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            if (node == null) {
                parts.add("null");
                continue;
            }
            parts.add(String.valueOf(node.val));
            queue.add(node.left);
            queue.add(node.right);
        }
        while (!parts.isEmpty() && "null".equals(parts.get(parts.size() - 1))) {
            parts.remove(parts.size() - 1); // trailing nulls carry no information
        }
        return String.join(",", parts);
    }

    /**
     * Rebuilds the tree from its serialised form.
     *
     * @param data the string produced by {@link #serialize(TreeNode)}
     * @return the rebuilt tree, or {@code null} for an empty string
     */
    public static TreeNode deserialize(String data) {
        if (data == null || data.isEmpty()) {
            return null;
        }
        String[] parts = data.split(",");
        Integer[] values = new Integer[parts.length];
        for (int i = 0; i < parts.length; i++) {
            values[i] = "null".equals(parts[i]) ? null : Integer.valueOf(parts[i]);
        }
        return TreeNode.of(values);
    }

    /** Reads one level-order token: an integer, or {@code null} for a missing node. */
    private static Integer nextTreeValue(FastScanner fs) throws IOException {
        String token = fs.next();
        return "null".equals(token) ? null : Integer.valueOf(token);
    }

    /** Reads a tree: a token count followed by that many level-order tokens. */
    private static TreeNode readTree(FastScanner fs) throws IOException {
        int count = fs.nextInt();
        Integer[] values = new Integer[count];
        for (int i = 0; i < count; i++) {
            values[i] = nextTreeValue(fs);
        }
        return TreeNode.of(values);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        TreeNode root = readTree(fs);

        String encoded = serialize(root);
        System.out.println(encoded);

        TreeNode restored = deserialize(encoded);
        System.out.println(levelOrderValues(restored));
    }

    /**
     * Renders the values of a tree in level order (breadth first, left to right),
     * skipping the missing children.
     */
    private static String levelOrderValues(TreeNode root) {
        if (root == null) {
            return "";
        }
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        StringBuilder sb = new StringBuilder();
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            if (sb.length() > 0) {
                sb.append(' ');
            }
            sb.append(node.val);
            if (node.left != null) {
                queue.add(node.left);
            }
            if (node.right != null) {
                queue.add(node.right);
            }
        }
        return sb.toString();
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

// ---------- inlined com.dsa.utils.TreeNode ----------
/**
 * Binary tree node used across the tree problems.
 */
class TreeNode {

    public int val;
    public TreeNode left;
    public TreeNode right;

    public TreeNode() {
    }

    public TreeNode(int val) {
        this.val = val;
    }

    public TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }

    /**
     * Builds a tree from a level-order sequence where {@code null} marks a missing child.
     *
     * <pre>{@code
     * TreeNode.of(1, 2, 3, null, 4)  // 1 -> (2, 3), 2 -> (null, 4)
     * }</pre>
     */
    public static TreeNode of(Integer... values) {
        if (values == null || values.length == 0) {
            return null;
        }
        TreeNode root = new TreeNode(values[0]);
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        int i = 1;
        while (!queue.isEmpty() && i < values.length) {
            TreeNode node = queue.poll();
            if (i < values.length) {
                Integer leftValue = values[i++];
                if (leftValue != null) {
                    node.left = new TreeNode(leftValue);
                    queue.add(node.left);
                }
            }
            if (i < values.length) {
                Integer rightValue = values[i++];
                if (rightValue != null) {
                    node.right = new TreeNode(rightValue);
                    queue.add(node.right);
                }
            }
        }
        return root;
    }

    /** Height of the tree (a leaf has height 1). */
    public int height() {
        if (this == null) {
            return 0;
        }
        return 1 + Math.max(left == null ? 0 : left.height(), right == null ? 0 : right.height());
    }

    /** Number of nodes in the tree. */
    public int size() {
        if (this == null) {
            return 0;
        }
        return 1 + (left == null ? 0 : left.size()) + (right == null ? 0 : right.size());
    }

    /**
     * Level-order list where {@code null} marks a missing node.
     *
     * <p>Uses an {@link ArrayList} as the queue rather than an {@link ArrayDeque},
     * because {@code ArrayDeque} does not accept {@code null} elements and a
     * missing child is exactly what we need to record.
     */
    public List<Integer> toLevelOrderList() {
        List<Integer> out = new ArrayList<>();
        if (this == null) {
            return out;
        }
        List<TreeNode> queue = new ArrayList<>();
        queue.add(this);
        for (int i = 0; i < queue.size(); i++) {
            TreeNode node = queue.get(i);
            if (node == null) {
                out.add(null);
                continue;
            }
            out.add(node.val);
            queue.add(node.left);
            queue.add(node.right);
        }
        return out;
    }

    @Override
    public String toString() {
        return toLevelOrderList().toString();
    }
}
`,r='\n# Serialize and Deserialize Binary Tree — LeetCode 297\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Level-order encoding · Round trip |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Uber, Adobe |\n\n## Problem Statement\n\nDesign an algorithm that **serialises** a binary tree to a string and **deserialises**\nit back into exactly the same tree.\n\n```\n    1\n   / \\\n  2   3\n   \\\n    4\n```\n\nThe serialised form used here is the level-order list, comma separated, with `null` for\nthe missing children:\n\n```\n1,2,3,null,4\n```\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nt\nv0 v1 ... v(t-1)\n```\n\n- `t` — how many level-order tokens follow (`0` for an empty tree)\n- the tokens — the node values in **level order**; `null` marks a missing child and the\n  first token is the root\n\nThe sample tree above is `5` followed by `1 2 3 null 4`.\n\n## Sample Input\n\n```\n5\n1 2 3 null 4\n```\n\n## Expected Output\n\n```\n1,2,3,null,4\n1 2 3 4\n```\n\nThe first line is the serialised tree; the second line is the deserialised tree printed\nin level order, which proves the round trip.\n\n## Approach — the level order is already an encoding\n\nThe input format of this repository **is** a level-order encoding, so the serialisation\nis that list, comma separated. The only question is how to handle the missing children:\nthey must be in the string, otherwise the shape is lost.\n\n`1,2,3` alone would rebuild `1 → (2, 3)` — the left child of `2` would be missing\ninformation. With `null` in the list the shape is preserved.\n\n**Trailing** `null`s can be dropped: they only describe empty slots at the end of the\ntree and carry no information.\n\nDeserialising is the reverse: split the string on `,`, turn `null` back into a missing\nchild and rebuild the tree from the level-order list.\n\n## Dry Run\n\nInput: tree `1 → (2, 3)`, `2 → (null, 4)`\n\n| Step | node taken from the queue | emitted | enqueued | list so far |\n|---:|---|---|---|---|\n| 1 | `1` | `1` | `2`, `3` | `1` |\n| 2 | `2` | `2` | `null`, `4` | `1,2` |\n| 3 | `3` | `3` | `null`, `null` | `1,2,3` |\n| 4 | `null` | `null` | — | `1,2,3,null` |\n| 5 | `4` | `4` | `null`, `null` | `1,2,3,null,4` |\n| 6 | `null` | `null` | — | `1,2,3,null,4,null` |\n| 7 | `null` | `null` | — | `1,2,3,null,4,null,null` |\n\nTrimming the trailing `null`s gives the serialised string `1,2,3,null,4`.\n\n### The round trip\n\nDeserialising splits `1,2,3,null,4` into `[1, 2, 3, null, 4]` and rebuilds the tree\nlevel by level:\n\n| Step | token | node created | attached to |\n|---:|---|---|---|\n| 1 | `1` | root `1` | — |\n| 2 | `2` | `2` | `1.left` |\n| 3 | `3` | `3` | `1.right` |\n| 4 | `null` | — | `2.left` stays empty |\n| 5 | `4` | `4` | `2.right` |\n\nPrinting the rebuilt tree in level order (missing children omitted) gives `1 2 3 4` ✓\n\n## Java Solution\n\nSee [`SerializeAndDeserializeBinaryTree.java`](./SerializeAndDeserializeBinaryTree.java).\n\n```java\npublic static String serialize(TreeNode root) {\n    if (root == null) {\n        return "";\n    }\n    Deque<TreeNode> queue = new LinkedList<>();   // a linked list stores null children\n    queue.add(root);\n    List<String> parts = new ArrayList<>();\n    while (!queue.isEmpty()) {\n        TreeNode node = queue.poll();\n        if (node == null) {\n            parts.add("null");\n            continue;\n        }\n        parts.add(String.valueOf(node.val));\n        queue.add(node.left);\n        queue.add(node.right);\n    }\n    while (!parts.isEmpty() && "null".equals(parts.get(parts.size() - 1))) {\n        parts.remove(parts.size() - 1);\n    }\n    return String.join(",", parts);\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n) | Every node is visited once in both directions |\n| **Space** | O(n) | The encoding, plus O(w) for the queue |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"Use a different format."* → the classic LeetCode format is pre-order with `#` for\n  the missing children (`1,2,#,3`); it is shorter and deserialises with a simple\n  recursion.\n- *"How would you store the tree in a database?"* → serialise to a string and store\n  that; the format is an implementation detail as long as it round-trips.\n- *"What if the tree is huge?"* → serialise iteratively (as here) to avoid a stack\n  overflow, and consider a compact format.\n\n**Common mistakes:**\n- ❌ Dropping the `null` markers → the shape of the tree is lost.\n- ❌ Using `ArrayDeque` for the queue → it rejects `null` elements; a `LinkedList` (or\n  an index-based list) is needed.\n- ❌ Not trimming the trailing `null`s → the string is longer than it has to be (it is\n  still correct, just wasteful).\n- ❌ Serialising in pre-order without the `null` markers → the tree cannot be rebuilt.\n\n**How to narrate:**\n> "I use the level-order encoding: the values in breadth-first order, `null` for every\n> missing child, comma separated. The `null`s are what preserve the shape; the trailing\n> ones are noise and can be trimmed. Deserialising is the same walk in reverse — split\n> on commas and rebuild level by level. Both directions are O(n)."\n\n## Related Problems\n\n- [Binary Tree Level Order Traversal](./BinaryTreeLevelOrderTraversal.java) — the walk the encoding is based on\n- [Build Tree From Preorder and Inorder](./BuildTreeFromPreorderAndInorder.java) — the other reconstruction problem\n- [Invert Binary Tree](./InvertBinaryTree.java) — prints a tree in level order\n',i=[`serialize`,`deserialize`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};