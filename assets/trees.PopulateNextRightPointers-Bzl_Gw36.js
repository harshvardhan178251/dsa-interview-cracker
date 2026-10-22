var e=`trees.PopulateNextRightPointers`,t=`package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Problem: Populating Next Right Pointers in Each Node
 * LeetCode: 116 | Difficulty: Medium | Frequency: 4/5
 * Pattern: BFS, Level linking
 *
 * <p>Problem: Give every node of a binary tree a pointer to the next node on the same
 * level (left to right). The last node of a level points to nothing.
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
 * 6
 * 1 2 3 null 4 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * null 3 null 5 null
 * </pre>
 * The output lists, for every node of the tree in level order, the value of its next
 * pointer ({@code null} when there is none).
 *
 * <p>Approach: a breadth-first walk knows the size of every level. While a level is
 * being processed we link each node to the node that follows it in that level, and the
 * last node of the level to nothing.
 *
 * <p>Complexity: Time O(n), Space O(w).
 */
public class PopulateNextRightPointers {

    /**
     * Links every node to the next node on its level.
     *
     * @param root root of the tree, may be {@code null}
     * @return a map from every node of the tree to its next node ({@code null} at the
     *         end of a level). {@link TreeNode} does not override {@code equals}, so
     *         the map behaves like an identity map.
     */
    public static Map<TreeNode, TreeNode> connect(TreeNode root) {
        Map<TreeNode, TreeNode> next = new HashMap<>();
        if (root == null) {
            return next;
        }
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            TreeNode previous = null;
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                if (previous != null) {
                    next.put(previous, node); // link the previous node of this level
                }
                previous = node;
                if (node.left != null) {
                    queue.add(node.left);
                }
                if (node.right != null) {
                    queue.add(node.right);
                }
            }
            if (previous != null) {
                next.put(previous, null); // the last node of a level points nowhere
            }
        }
        return next;
    }

    /**
     * Returns, for every node of the tree in level order, the value of its next pointer
     * ({@code null} when it has none).
     */
    public static List<Integer> nextValues(TreeNode root) {
        Map<TreeNode, TreeNode> next = connect(root);
        List<Integer> values = new ArrayList<>();
        if (root == null) {
            return values;
        }
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            TreeNode neighbour = next.get(node);
            values.add(neighbour == null ? null : neighbour.val);
            if (node.left != null) {
                queue.add(node.left);
            }
            if (node.right != null) {
                queue.add(node.right);
            }
        }
        return values;
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

        List<Integer> values = nextValues(root);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < values.size(); i++) {
            if (i > 0) {
                sb.append(' ');
            }
            Integer value = values.get(i);
            sb.append(value == null ? "null" : value.toString());
        }
        System.out.println(sb);
    }
}
`,n=`import java.io.IOException;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Populating Next Right Pointers in Each Node
 * LeetCode: 116 | Difficulty: Medium | Frequency: 4/5
 * Pattern: BFS, Level linking
 *
 * <p>Problem: Give every node of a binary tree a pointer to the next node on the same
 * level (left to right). The last node of a level points to nothing.
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
 * 6
 * 1 2 3 null 4 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * null 3 null 5 null
 * </pre>
 * The output lists, for every node of the tree in level order, the value of its next
 * pointer ({@code null} when there is none).
 *
 * <p>Approach: a breadth-first walk knows the size of every level. While a level is
 * being processed we link each node to the node that follows it in that level, and the
 * last node of the level to nothing.
 *
 * <p>Complexity: Time O(n), Space O(w).
 */
public class Main {

    /**
     * Links every node to the next node on its level.
     *
     * @param root root of the tree, may be {@code null}
     * @return a map from every node of the tree to its next node ({@code null} at the
     *         end of a level). {@link TreeNode} does not override {@code equals}, so
     *         the map behaves like an identity map.
     */
    public static Map<TreeNode, TreeNode> connect(TreeNode root) {
        Map<TreeNode, TreeNode> next = new HashMap<>();
        if (root == null) {
            return next;
        }
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            TreeNode previous = null;
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                if (previous != null) {
                    next.put(previous, node); // link the previous node of this level
                }
                previous = node;
                if (node.left != null) {
                    queue.add(node.left);
                }
                if (node.right != null) {
                    queue.add(node.right);
                }
            }
            if (previous != null) {
                next.put(previous, null); // the last node of a level points nowhere
            }
        }
        return next;
    }

    /**
     * Returns, for every node of the tree in level order, the value of its next pointer
     * ({@code null} when it has none).
     */
    public static List<Integer> nextValues(TreeNode root) {
        Map<TreeNode, TreeNode> next = connect(root);
        List<Integer> values = new ArrayList<>();
        if (root == null) {
            return values;
        }
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            TreeNode neighbour = next.get(node);
            values.add(neighbour == null ? null : neighbour.val);
            if (node.left != null) {
                queue.add(node.left);
            }
            if (node.right != null) {
                queue.add(node.right);
            }
        }
        return values;
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

        List<Integer> values = nextValues(root);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < values.size(); i++) {
            if (i > 0) {
                sb.append(' ');
            }
            Integer value = values.get(i);
            sb.append(value == null ? "null" : value.toString());
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
`,r=`
# Populating Next Right Pointers in Each Node — LeetCode 116

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | BFS · Level linking |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Give every node of a binary tree a pointer to the **next node on the same level**
(left to right). The last node of a level points to nothing.

\`\`\`
      1        1 -> null
     / \\       / \\
    2   3  →  2 -> 3
   / \\         / \\
  4   5       4 -> 5
\`\`\`

## Input Format

The program reads from standard input:

\`\`\`
t
v0 v1 ... v(t-1)
\`\`\`

- \`t\` — how many level-order tokens follow (\`0\` for an empty tree)
- the tokens — the node values in **level order**; \`null\` marks a missing child and the
  first token is the root

The sample tree above is \`6\` followed by \`1 2 3 null 4 5\`.

## Sample Input

\`\`\`
6
1 2 3 null 4 5
\`\`\`

## Expected Output

\`\`\`
null 3 null 5 null
\`\`\`

For every node of the tree — in level order — the value of its next pointer (\`null\`
when it has none).

## Approach — link the nodes of each level

The BFS gives us the nodes of a level in order. Inside a level, the "next" node is
simply the one that follows:

\`\`\`java
while (!queue.isEmpty()) {
    int levelSize = queue.size();
    TreeNode previous = null;
    for (int i = 0; i < levelSize; i++) {
        TreeNode node = queue.poll();
        if (previous != null) {
            next.put(previous, node);   // link the previous node of this level
        }
        previous = node;
        ... enqueue the children ...
    }
    next.put(previous, null);          // the last node of the level points nowhere
}
\`\`\`

The \`previous\` pointer does the work: when the next node of the level is dequeued, it
becomes the next pointer of the one before it. The last node of the level is reset to
\`null\`.

> **Follow-up:** the same problem can be solved in O(1) extra space without a queue:
> walk the tree with two pointers (\`leftChild\` and \`rightChild\`) and connect the
> children of the \`leftChild\` to the children of the \`rightChild\` for every node.

## Dry Run

Input: tree \`1 → (2, 3)\`, \`2 → (null, 4)\`, \`3 → (5, null)\`

| Step | \`queue\` before | node polled | \`previous\` | link created | \`queue\` after |
|---:|---|---|---|---|---|
| 1 | \`[1]\` | \`1\` | \`null\` | — (first of the level) | \`[2, 3]\` |
| 2 | \`[2, 3]\` | \`2\` | \`1\` | \`1 → 2\` | \`[3, 4]\` |
| 3 | \`[3, 4]\` | \`3\` | \`2\` | \`2 → 3\` | \`[4, 5]\` |
| 4 | \`[4, 5]\` | — | — | end of the level → \`3 → null\` | \`[5]\` |
| 5 | \`[5]\` | \`4\` | \`null\` | — (first of the level) | \`[5]\` |
| 6 | \`[5]\` | \`5\` | \`4\` | \`4 → 5\` | \`[]\` |
| 7 | \`[]\` | — | — | end of the level → \`5 → null\` | \`[]\` |

Resulting next pointers: \`1 → 2 → 3 → null\` and \`4 → 5 → null\`.

The nodes in level order are \`1, 2, 3, 4, 5\`, so the answer is
\`null 3 null 5 null\` ✓

## Java Solution

See [\`PopulateNextRightPointers.java\`](./PopulateNextRightPointers.java).

\`\`\`java
public static Map<TreeNode, TreeNode> connect(TreeNode root) {
    Map<TreeNode, TreeNode> next = new HashMap<>();
    if (root == null) {
        return next;
    }
    Deque<TreeNode> queue = new ArrayDeque<>();
    queue.add(root);

    while (!queue.isEmpty()) {
        int levelSize = queue.size();
        TreeNode previous = null;
        for (int i = 0; i < levelSize; i++) {
            TreeNode node = queue.poll();
            if (previous != null) {
                next.put(previous, node);
            }
            previous = node;
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        if (previous != null) {
            next.put(previous, null);
        }
    }
    return next;
}
\`\`\`

\`TreeNode\` does not override \`equals\`, so the map behaves like an identity map — which
is exactly what we want here.

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every node is visited once |
| **Space** | O(n) | The map holds one entry per node (O(w) with the queue-based variant) |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Solve it without a queue and in O(1) space."* → the two-pointer trick: for every
  node, connect the children of its left child to the children of its right child, and
  recurse on both children.
- *"Do it for a perfect binary tree."* → then the next pointer of a node is its
  sibling's right child (or its parent's left child) — a pure pointer chase, O(1) per
  node.
- *"What if the tree is not perfect?"* → the queue-based level walk above is the general
  solution.

**Common mistakes:**
- ❌ Forgetting to reset the last node of a level to \`null\` → the pointers leak into
  the next level.
- ❌ Linking the nodes of **different** levels → the level size is what prevents it.
- ❌ Using a \`HashMap<TreeNode, TreeNode>\` and expecting value equality → \`TreeNode\`
  uses identity equality; that is what you want, but do not rely on \`equals\`.

**How to narrate:**
> "This is a BFS where the queue size tells me the level boundaries. I keep the
> previously dequeued node and, as soon as the next node of the level comes out, I
> link them. At the end of the level I point the last node at null. O(n) time."

## Related Problems

- [Binary Tree Level Order Traversal](./BinaryTreeLevelOrderTraversal.java) — the same walk
- [Zigzag Level Order Traversal](./ZigzagLevelOrderTraversal.java) — the same walk with a direction flag
- [Binary Tree Cameras](./BinaryTreeCameras.java) — BFS with a state machine
`,i=[`connect`,`nextValues`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};