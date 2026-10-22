var e=`trees.InvertBinaryTree`,t=`package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;
import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Invert Binary Tree
 * LeetCode: 226 | Difficulty: Easy | Frequency: 4/5
 * Pattern: DFS, Mirror recursion
 *
 * <p>Problem: Invert a binary tree — every node's left and right children are swapped.
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
 * 1 2 3 4 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 3 2 5 4
 * </pre>
 * The output lists the values of the inverted tree in level order (breadth first, left
 * to right); missing children are omitted.
 *
 * <p>Approach: swap the two children of every node. The recursion first inverts the two
 * subtrees and then swaps them, so the whole tree becomes its own mirror image.
 *
 * <p>Complexity: Time O(n), Space O(h).
 */
public class InvertBinaryTree {

    /**
     * Inverts the tree in place.
     *
     * @param root root of the tree, may be {@code null}
     * @return the root of the inverted tree
     */
    public static TreeNode invertTree(TreeNode root) {
        if (root == null) {
            return null;
        }
        TreeNode left = invertTree(root.left);
        TreeNode right = invertTree(root.right);
        root.left = right;
        root.right = left;
        return root;
    }

    /**
     * Renders the values of a tree in level order (breadth first, left to right),
     * skipping the missing children.
     */
    public static String levelOrderValues(TreeNode root) {
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

        TreeNode inverted = invertTree(root);
        System.out.println(levelOrderValues(inverted));
    }
}
`,n=`import java.io.IOException;
import java.util.ArrayDeque;
import java.util.Deque;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

/**
 * Problem: Invert Binary Tree
 * LeetCode: 226 | Difficulty: Easy | Frequency: 4/5
 * Pattern: DFS, Mirror recursion
 *
 * <p>Problem: Invert a binary tree — every node's left and right children are swapped.
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
 * 1 2 3 4 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 3 2 5 4
 * </pre>
 * The output lists the values of the inverted tree in level order (breadth first, left
 * to right); missing children are omitted.
 *
 * <p>Approach: swap the two children of every node. The recursion first inverts the two
 * subtrees and then swaps them, so the whole tree becomes its own mirror image.
 *
 * <p>Complexity: Time O(n), Space O(h).
 */
public class Main {

    /**
     * Inverts the tree in place.
     *
     * @param root root of the tree, may be {@code null}
     * @return the root of the inverted tree
     */
    public static TreeNode invertTree(TreeNode root) {
        if (root == null) {
            return null;
        }
        TreeNode left = invertTree(root.left);
        TreeNode right = invertTree(root.right);
        root.left = right;
        root.right = left;
        return root;
    }

    /**
     * Renders the values of a tree in level order (breadth first, left to right),
     * skipping the missing children.
     */
    public static String levelOrderValues(TreeNode root) {
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

        TreeNode inverted = invertTree(root);
        System.out.println(levelOrderValues(inverted));
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
# Invert Binary Tree — LeetCode 226

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | DFS · Mirror recursion |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

**Invert** a binary tree: every node's left and right children are swapped, so the tree
becomes its own mirror image.

\`\`\`
    1            1
   / \\          / \\
  2   3   →    3   2
 / \\              / \\
4   5            5   4
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

The sample tree above is \`5\` followed by \`1 2 3 4 5\`.

## Sample Input

\`\`\`
5
1 2 3 4 5
\`\`\`

## Expected Output

\`\`\`
1 3 2 5 4
\`\`\`

The values of the inverted tree in **level order** (breadth first, left to right);
missing children are omitted.

## Approach — swap after recursing

\`\`\`java
if (root == null) return null;
TreeNode left  = invertTree(root.left);
TreeNode right = invertTree(root.right);
root.left = right;
root.right = left;
return root;
\`\`\`

The order matters: if you swap **before** recursing you would recurse into the swapped
subtrees, which inverts them twice (the tree comes out unchanged). Recursing first and
swapping afterwards inverts each subtree exactly once.

The tree is modified **in place** — no new nodes are allocated — so the complexity is
O(n) time and O(h) stack.

## Dry Run

Input: \`1 2 3 4 5\` — the tree \`1 → (2, 3)\`, \`2 → (4, 5)\`.

| Step | call | node | children before | after inverting the children | after the swap |
|---:|---|---:|---|---|---|
| 1 | \`invert(2)\` | \`2\` | left \`4\`, right \`5\` | \`invert(4)\` = \`4\`, \`invert(5)\` = \`5\` | left \`5\`, right \`4\` |
| 2 | \`invert(4)\` | \`4\` | no children | — | unchanged |
| 3 | \`invert(5)\` | \`5\` | no children | — | unchanged |
| 4 | \`invert(3)\` | \`3\` | no children | — | unchanged |
| 5 | \`invert(1)\` | \`1\` | left \`2\`, right \`3\` | left → \`2 (now 5,4)\`, right → \`3\` | left \`3\`, right \`2\` |

Resulting tree:

\`\`\`
    1
   / \\
  3   2
     / \\
    5   4
\`\`\`

Level order (missing children omitted): \`1 3 2 5 4\` ✓

## Java Solution

See [\`InvertBinaryTree.java\`](./InvertBinaryTree.java).

\`\`\`java
public static TreeNode invertTree(TreeNode root) {
    if (root == null) {
        return null;
    }
    TreeNode left = invertTree(root.left);
    TreeNode right = invertTree(root.right);
    root.left = right;
    root.right = left;
    return root;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every node is visited once |
| **Space** | O(h) | The call stack mirrors the height of the tree; the tree itself is changed in place |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Do it without recursion."* → BFS level by level: swap the children of every node you
  dequeue.
- *"Is the inverted tree the same as the original if the tree is symmetric?"* → yes, and
  that is exactly the symmetry check.
- *"Invert only the nodes on a path from the root to a given node."* → the recursion can
  return a boolean telling you whether the target is in the subtree you just inverted.

**Common mistakes:**
- ❌ Swapping **before** the recursive calls → the subtrees get inverted twice.
- ❌ Writing \`root.left = invertTree(root.right)\` without keeping the old left child →
  the original left subtree is lost.
- ❌ Allocating new nodes instead of reusing the existing ones → wastes memory and loses
  any external references to the nodes.

**How to narrate:**
> "Inverting is just swapping the two children of every node. I recurse first so each
> subtree is inverted exactly once, then I swap. The tree is modified in place, so
> it's O(n) time and O(h) stack with no extra allocation."

## Related Problems

- [Symmetric Tree](./SymmetricTree.java) — a tree that is its own mirror
- [Binary Tree Inorder Traversal](./BinaryTreeInorderTraversal.java) — prints the mirrored order
- [Serialize and Deserialize Binary Tree](./SerializeAndDeserializeBinaryTree.java) — prints a tree in level order
`,i=[`invertTree`,`levelOrderValues`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};