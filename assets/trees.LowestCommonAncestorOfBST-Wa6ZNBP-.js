var e=`trees.LowestCommonAncestorOfBST`,t=`package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;

/**
 * Problem: Lowest Common Ancestor of a BST
 * LeetCode: 235 | Difficulty: Medium | Frequency: 5/5
 * Pattern: BST, Iterative descent
 *
 * <p>Problem: Find the lowest common ancestor of two nodes in a binary search tree.
 *
 * <p>Input format (stdin):
 * <pre>
 * t
 * v0 v1 ... v(t-1)
 * p
 * q
 * </pre>
 * The tree is given in level order; {@code null} marks a missing child and the first
 * value is the root. {@code p} and {@code q} are the values of the two nodes.
 *
 * <p>Sample input:
 * <pre>
 * 11
 * 6 2 8 0 4 7 9 null null 3 5
 * 2
 * 8
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 6
 * </pre>
 *
 * <p>Approach: the BST ordering tells us where to look. If both nodes are smaller than
 * the current node, the LCA must be in the left subtree; if both are larger, it must be
 * in the right subtree; otherwise the current node is the LCA (it is either one of the
 * two nodes, or they sit on different sides of it).
 *
 * <p>Complexity: Time O(h), Space O(1).
 */
public class LowestCommonAncestorOfBST {

    /**
     * Returns the value of the lowest common ancestor of {@code p} and {@code q}.
     *
     * @param root root of the tree, may be {@code null}
     * @param p    value of the first node
     * @param q    value of the second node
     * @return the value of the LCA, or {@code null} when there is none
     */
    public static Integer lowestCommonAncestor(TreeNode root, int p, int q) {
        if (!contains(root, p) || !contains(root, q)) {
            return null; // both nodes have to exist in the tree
        }
        TreeNode current = root;
        while (current != null) {
            if (p < current.val && q < current.val) {
                current = current.left; // both in the left subtree
            } else if (p > current.val && q > current.val) {
                current = current.right; // both in the right subtree
            } else {
                return current.val; // current node splits them apart
            }
        }
        return null;
    }

    /** Checks whether the tree contains a node with the given value. */
    private static boolean contains(TreeNode node, int value) {
        if (node == null) {
            return false;
        }
        return node.val == value || contains(node.left, value) || contains(node.right, value);
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
        int p = fs.nextInt();
        int q = fs.nextInt();

        Integer answer = lowestCommonAncestor(root, p, q);
        System.out.println(answer == null ? "null" : answer.toString());
    }
}
`,n=`import java.io.IOException;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

/**
 * Problem: Lowest Common Ancestor of a BST
 * LeetCode: 235 | Difficulty: Medium | Frequency: 5/5
 * Pattern: BST, Iterative descent
 *
 * <p>Problem: Find the lowest common ancestor of two nodes in a binary search tree.
 *
 * <p>Input format (stdin):
 * <pre>
 * t
 * v0 v1 ... v(t-1)
 * p
 * q
 * </pre>
 * The tree is given in level order; {@code null} marks a missing child and the first
 * value is the root. {@code p} and {@code q} are the values of the two nodes.
 *
 * <p>Sample input:
 * <pre>
 * 11
 * 6 2 8 0 4 7 9 null null 3 5
 * 2
 * 8
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 6
 * </pre>
 *
 * <p>Approach: the BST ordering tells us where to look. If both nodes are smaller than
 * the current node, the LCA must be in the left subtree; if both are larger, it must be
 * in the right subtree; otherwise the current node is the LCA (it is either one of the
 * two nodes, or they sit on different sides of it).
 *
 * <p>Complexity: Time O(h), Space O(1).
 */
public class Main {

    /**
     * Returns the value of the lowest common ancestor of {@code p} and {@code q}.
     *
     * @param root root of the tree, may be {@code null}
     * @param p    value of the first node
     * @param q    value of the second node
     * @return the value of the LCA, or {@code null} when there is none
     */
    public static Integer lowestCommonAncestor(TreeNode root, int p, int q) {
        if (!contains(root, p) || !contains(root, q)) {
            return null; // both nodes have to exist in the tree
        }
        TreeNode current = root;
        while (current != null) {
            if (p < current.val && q < current.val) {
                current = current.left; // both in the left subtree
            } else if (p > current.val && q > current.val) {
                current = current.right; // both in the right subtree
            } else {
                return current.val; // current node splits them apart
            }
        }
        return null;
    }

    /** Checks whether the tree contains a node with the given value. */
    private static boolean contains(TreeNode node, int value) {
        if (node == null) {
            return false;
        }
        return node.val == value || contains(node.left, value) || contains(node.right, value);
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
        int p = fs.nextInt();
        int q = fs.nextInt();

        Integer answer = lowestCommonAncestor(root, p, q);
        System.out.println(answer == null ? "null" : answer.toString());
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
# Lowest Common Ancestor of a BST — LeetCode 235

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | BST · Iterative descent |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg |

## Problem Statement

Find the lowest common ancestor of two nodes in a **binary search tree**.

\`\`\`
        6
       / \\
      2   8
     / \\ / \\
    0  4 7  9
      / \\
     3   5
\`\`\`

For \`p = 2\` and \`q = 8\` the LCA is \`6\`.

## Input Format

The program reads from standard input:

\`\`\`
t
v0 v1 ... v(t-1)
p
q
\`\`\`

- \`t\` — how many level-order tokens follow (\`0\` for an empty tree)
- the tokens — the node values in **level order**; \`null\` marks a missing child and the
  first token is the root
- \`p\`, \`q\` — the values of the two nodes

The sample tree above is \`11\` followed by \`6 2 8 0 4 7 9 null null 3 5\`.

## Sample Input

\`\`\`
11
6 2 8 0 4 7 9 null null 3 5
2
8
\`\`\`

## Expected Output

\`\`\`
6
\`\`\`

## Approach — let the ordering do the work

For a general binary tree you need a post-order walk (see
[Lowest Common Ancestor of a Binary Tree](./LowestCommonAncestor.java)).
A BST gives you much more: at every node you already know **where both nodes live**.

\`\`\`java
while (current != null) {
    if (p < current.val && q < current.val)      current = current.left;
    else if (p > current.val && q > current.val)  current = current.right;
    else                                          return current.val;
}
\`\`\`

Three cases:

| situation | meaning |
|---|---|
| both \`p\` and \`q\` are smaller than the current node | both are in the left subtree → go left |
| both are larger | both are in the right subtree → go right |
| otherwise | the current node is the LCA |

The last case covers two possibilities: the current node **is** \`p\` or \`q\` (then it is
its own ancestor's answer), or \`p\` and \`q\` are on **opposite sides** of it.

As in the general version, both nodes have to exist in the tree — if one of them is
missing the answer is \`null\`.

## Dry Run

Input: tree as above, \`p = 2\`, \`q = 8\`

| Step | \`current\` | \`current.val\` | relation of p and q | action |
|---:|---|---:|---|---|
| 1 | root | 6 | \`2 < 6 < 8\` — they straddle the node | **return 6** ✓ |

### A longer walk — p = 3, q = 5

| Step | \`current.val\` | relation | action |
|---:|---:|---|---|
| 1 | 6 | \`3 < 6\` and \`5 < 6\` → both smaller | go left → node \`2\` |
| 2 | 2 | \`3 > 2\` and \`5 > 2\` → both larger | go right → node \`4\` |
| 3 | 4 | \`3 < 4 < 5\` → they straddle the node | **return 4** ✓ |

\`3 → 4 → 5\` and \`5 → 4\`; the lowest common ancestor is \`4\`, found in three steps.

## Java Solution

See [\`LowestCommonAncestorOfBST.java\`](./LowestCommonAncestorOfBST.java).

\`\`\`java
public static Integer lowestCommonAncestor(TreeNode root, int p, int q) {
    TreeNode current = root;
    while (current != null) {
        if (p < current.val && q < current.val) {
            current = current.left;
        } else if (p > current.val && q > current.val) {
            current = current.right;
        } else {
            return current.val;
        }
    }
    return null;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(h) | One path from the root down to the LCA |
| **Space** | O(1) | A single pointer |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the values are not unique?"* → the ordering argument breaks; fall back to the
  general post-order solution.
- *"What if one node is the ancestor of the other?"* → the "straddle" case returns the
  ancestor itself, because one value is smaller and the other larger than it.
- *"Find the LCA of k nodes."* → find the LCA of the smallest and the largest value; it
  is the LCA of all of them.

**Common mistakes:**
- ❌ Forgetting the case where \`p\` or \`q\` **equals** the current node → the comparison
  \`p < current.val && q < current.val\` is false and the node itself is returned, which
  is correct — but only if you also handle \`p == current.val\` (the "otherwise" branch).
- ❌ Writing the conditions with \`||\` instead of \`&&\` → the node would be returned too
  early.
- ❌ Copying the general binary-tree solution and ignoring the BST ordering → correct,
  but O(n) instead of O(h).

**How to narrate:**
> "Because the tree is sorted I don't need a post-order walk. At each node I check
> whether both values are smaller, both are larger, or they straddle the node. In the
> first two cases I descend into that side; in the third case this node is the LCA.
> It's O(h) time and O(1) space."

## Related Problems

- [Lowest Common Ancestor of a Binary Tree](./LowestCommonAncestor.java) — the general O(n) version
- [Validate Binary Search Tree](./ValidateBinarySearchTree.java) — the property this relies on
- [Search in a Binary Search Tree](./SearchInBST.java) — the same style of descent
`,i=[`lowestCommonAncestor`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};