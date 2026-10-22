var e=`trees.BalancedBinaryTree`,t=`package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;

/**
 * Problem: Balanced Binary Tree
 * LeetCode: 110 | Difficulty: Easy | Frequency: 5/5
 * Pattern: DFS, Post-order height check
 *
 * <p>Problem: Check whether a binary tree is height-balanced: for every node, the
 * heights of its two subtrees differ by at most one.
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
 * 7
 * 3 9 20 null null 15 7
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: a post-order walk returns the height of each subtree, or {@code -1} when
 * the subtree is already known to be unbalanced. Because the walk stops as soon as an
 * imbalance is found, a skewed tree costs O(n) in the worst case but usually much less.
 *
 * <p>Complexity: Time O(n), Space O(h).
 */
public class BalancedBinaryTree {

    /**
     * Checks whether the tree is height-balanced.
     *
     * @param root root of the tree, may be {@code null}
     * @return {@code true} when every node's subtrees differ in height by at most one
     */
    public static boolean isBalanced(TreeNode root) {
        return height(root) != -1;
    }

    /**
     * Returns the height of the subtree, or {@code -1} when it is not balanced.
     */
    private static int height(TreeNode node) {
        if (node == null) {
            return 0;
        }
        int left = height(node.left);
        if (left == -1) {
            return -1;
        }
        int right = height(node.right);
        if (right == -1) {
            return -1;
        }
        if (Math.abs(left - right) > 1) {
            return -1;
        }
        return 1 + Math.max(left, right);
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

        System.out.println(isBalanced(root));
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
 * Problem: Balanced Binary Tree
 * LeetCode: 110 | Difficulty: Easy | Frequency: 5/5
 * Pattern: DFS, Post-order height check
 *
 * <p>Problem: Check whether a binary tree is height-balanced: for every node, the
 * heights of its two subtrees differ by at most one.
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
 * 7
 * 3 9 20 null null 15 7
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: a post-order walk returns the height of each subtree, or {@code -1} when
 * the subtree is already known to be unbalanced. Because the walk stops as soon as an
 * imbalance is found, a skewed tree costs O(n) in the worst case but usually much less.
 *
 * <p>Complexity: Time O(n), Space O(h).
 */
public class Main {

    /**
     * Checks whether the tree is height-balanced.
     *
     * @param root root of the tree, may be {@code null}
     * @return {@code true} when every node's subtrees differ in height by at most one
     */
    public static boolean isBalanced(TreeNode root) {
        return height(root) != -1;
    }

    /**
     * Returns the height of the subtree, or {@code -1} when it is not balanced.
     */
    private static int height(TreeNode node) {
        if (node == null) {
            return 0;
        }
        int left = height(node.left);
        if (left == -1) {
            return -1;
        }
        int right = height(node.right);
        if (right == -1) {
            return -1;
        }
        if (Math.abs(left - right) > 1) {
            return -1;
        }
        return 1 + Math.max(left, right);
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

        System.out.println(isBalanced(root));
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
# Balanced Binary Tree — LeetCode 110

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | DFS · Post-order height check |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Uber, Adobe |

## Problem Statement

Check whether a binary tree is **height-balanced**: for every node, the heights of its
two subtrees differ by at most one.

\`\`\`
        3
       / \\
      9   20
         /  \\
        15   7
\`\`\`

The left subtree has height 1 and the right one height 2 → the difference is 1 → the
tree is balanced.

## Input Format

The program reads from standard input:

\`\`\`
t
v0 v1 ... v(t-1)
\`\`\`

- \`t\` — how many level-order tokens follow (\`0\` for an empty tree)
- the tokens — the node values in **level order**; \`null\` marks a missing child and the
  first token is the root

The sample tree above is \`7\` followed by \`3 9 20 null null 15 7\`.

## Sample Input

\`\`\`
7
3 9 20 null null 15 7
\`\`\`

## Expected Output

\`\`\`
true
\`\`\`

## Approach — height, or -1 for "broken"

The naive solution computes the height of every subtree and compares the two heights —
but that is **O(n²)** on a skewed tree, because the heights are recomputed over and
over.

The trick is to compute the height **once** per node on the way up and to abort early:

\`\`\`java
private static int height(TreeNode node) {
    if (node == null) return 0;
    int left = height(node.left);
    if (left == -1) return -1;          // the left subtree is already unbalanced
    int right = height(node.right);
    if (right == -1) return -1;
    if (Math.abs(left - right) > 1) return -1;
    return 1 + Math.max(left, right);
}
\`\`\`

The function returns the height of a balanced subtree and \`-1\` for an unbalanced one.
The \`-1\` propagates all the way up, so the walk stops as soon as the first violation
is found.

## Dry Run

Input: \`3 9 20 null null 15 7\`

| Step | call | node | left | right | balanced? | returned |
|---:|---|---:|---:|---:|---|---:|
| 1 | \`height(3)\` | 3 | — | — | — | — |
| 2 | \`height(9)\` | 9 | 0 | 0 | \`|0-0| = 0 ≤ 1\` | 1 |
| 3 | \`height(20)\` | 20 | — | — | — | — |
| 4 | \`height(15)\` | 15 | 0 | 0 | ok | 1 |
| 5 | \`height(7)\` | 7 | 0 | 0 | ok | 1 |
| 6 | \`height(20)\` | 20 | 1 | 1 | \`|1-1| = 0 ≤ 1\` | 2 |
| 7 | \`height(3)\` | 3 | 1 | 2 | \`|1-2| = 1 ≤ 1\` | 3 |

No \`-1\` was ever returned → the tree is balanced → \`true\`.

### The failing case — \`1 2 3 null 4 null 4 5\`

\`\`\`
        1
       / \\
      2   3
     /     \\
    4       4
             \\
              5
\`\`\`

| Step | call | node | left | right | returned |
|---:|---|---:|---:|---:|---:|
| 1 | \`height(2)\` | 2 | 0 | 1 (\`4\`) | 2 |
| 2 | \`height(3)\` | 3 | 0 | 2 (\`4 → 5\`) | 3 |
| 3 | \`height(1)\` | 1 | 2 | 3 | \`|2-3| = 1\` → ok → 4 |

This one is still balanced — the imbalance is one level deeper:

\`\`\`
        1
       / \\
      2   3
       \\
        4
         \\
          5
\`\`\`

Here \`height(2) = 3\` (nodes 2 → 4 → 5) and \`height(3) = 1\`, so \`|3-1| = 2 > 1\` at the
root → the function returns \`-1\` → \`false\`.

## Java Solution

See [\`BalancedBinaryTree.java\`](./BalancedBinaryTree.java).

\`\`\`java
public static boolean isBalanced(TreeNode root) {
    return height(root) != -1;
}

private static int height(TreeNode node) {
    if (node == null) {
        return 0;
    }
    int left = height(node.left);
    if (left == -1) {
        return -1;
    }
    int right = height(node.right);
    if (right == -1) {
        return -1;
    }
    if (Math.abs(left - right) > 1) {
        return -1;
    }
    return 1 + Math.max(left, right);
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every node is visited once; the walk stops early on an unbalanced tree |
| **Space** | O(h) | The call stack mirrors the height of the tree |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What is the maximum possible height of a balanced tree with n nodes?"* → about
  \`log2(n+1)\`; ask for the proof.
- *"Balance the tree."* → the AVL rotation (rotate the taller subtree) or a red-black
  tree.
- *"Check whether it is a complete binary tree."* → BFS: all the leaves must be at the
  last two levels and on the left.

**Common mistakes:**
- ❌ Computing the height twice (once to compare, once to recurse) → O(n²).
- ❌ Forgetting the \`left == -1\` early exit → the recursion keeps going after the tree
  is already known to be unbalanced.
- ❌ Comparing the heights of the **root's** children only → the condition must hold at
  *every* node.
- ❌ Using \`>\` instead of \`>=\` for the difference → a difference of exactly 1 is allowed.

**How to narrate:**
> "I'll do a post-order walk that returns the height of each subtree, or -1 as soon as
> it finds an imbalance. Because the check happens on the way back up, every height is
> computed exactly once — O(n) instead of the O(n²) you get from calling a plain height
> function twice. The -1 short-circuits the rest of the walk."

## Related Problems

- [Maximum Depth of Binary Tree](./BinaryTreeMaximumDepth.java) — the height function alone
- [Diameter of Binary Tree](./DiameterOfBinaryTree.java) — the same walk, a different question
- [Binary Tree Cameras](./BinaryTreeCameras.java) — post-order with a three-state machine
`,i=[`isBalanced`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};