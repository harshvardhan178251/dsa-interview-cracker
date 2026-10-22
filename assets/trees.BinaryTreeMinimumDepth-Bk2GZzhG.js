var e=`trees.BinaryTreeMinimumDepth`,t=`package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;

/**
 * Problem: Minimum Depth of Binary Tree
 * LeetCode: 111 | Difficulty: Easy | Frequency: 4/5
 * Pattern: DFS, Post-order recursion
 *
 * <p>Problem: Given the root of a binary tree, return its minimum depth — the number of
 * nodes on the shortest root-to-leaf path. An empty tree has depth 0.
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
 * 2
 * </pre>
 *
 * <p>Approach: unlike the maximum depth we cannot simply take the minimum of the two
 * subtrees, because a missing child is not a path to a leaf. When one side is empty the
 * answer must come from the other side: {@code 1 + minDepth(other)}. Only when both
 * sides exist do we take the minimum of the two.
 *
 * <p>Complexity: Time O(n), Space O(h).
 */
public class BinaryTreeMinimumDepth {

    /**
     * Returns the minimum depth of the tree.
     *
     * @param root root of the tree, may be {@code null}
     * @return the number of nodes on the shortest root-to-leaf path, 0 for an empty tree
     */
    public static int minDepth(TreeNode root) {
        if (root == null) {
            return 0;
        }
        if (root.left == null) {
            return 1 + minDepth(root.right);
        }
        if (root.right == null) {
            return 1 + minDepth(root.left);
        }
        return 1 + Math.min(minDepth(root.left), minDepth(root.right));
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

        System.out.println(minDepth(root));
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
 * Problem: Minimum Depth of Binary Tree
 * LeetCode: 111 | Difficulty: Easy | Frequency: 4/5
 * Pattern: DFS, Post-order recursion
 *
 * <p>Problem: Given the root of a binary tree, return its minimum depth — the number of
 * nodes on the shortest root-to-leaf path. An empty tree has depth 0.
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
 * 2
 * </pre>
 *
 * <p>Approach: unlike the maximum depth we cannot simply take the minimum of the two
 * subtrees, because a missing child is not a path to a leaf. When one side is empty the
 * answer must come from the other side: {@code 1 + minDepth(other)}. Only when both
 * sides exist do we take the minimum of the two.
 *
 * <p>Complexity: Time O(n), Space O(h).
 */
public class Main {

    /**
     * Returns the minimum depth of the tree.
     *
     * @param root root of the tree, may be {@code null}
     * @return the number of nodes on the shortest root-to-leaf path, 0 for an empty tree
     */
    public static int minDepth(TreeNode root) {
        if (root == null) {
            return 0;
        }
        if (root.left == null) {
            return 1 + minDepth(root.right);
        }
        if (root.right == null) {
            return 1 + minDepth(root.left);
        }
        return 1 + Math.min(minDepth(root.left), minDepth(root.right));
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

        System.out.println(minDepth(root));
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
# Binary Tree Minimum Depth — LeetCode 111

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | DFS · Post-order recursion |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta |

## Problem Statement

Given the root of a binary tree, return its **minimum depth** — the number of nodes on
the *shortest* root-to-leaf path. An empty tree has depth 0.

For the tree

\`\`\`
        3
       / \\
      9   20
         /  \\
        15   7
\`\`\`

the minimum depth is \`2\` (the path \`3 → 9\`).

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
2
\`\`\`

## Approach — the missing-child trap

The obvious formula \`1 + min(left, right)\` is **wrong**: a missing child is not a path
to a leaf, it is the *absence* of a path. In the sample the root's left child \`9\` is a
leaf (depth 1) and its right child \`20\` is not — the formula \`1 + min(1, 2) = 2\` happens
to be right here, but consider

\`\`\`
    1
   /
  2
\`\`\`

\`1 + min(depth(null) = 0, depth(2) = 1) = 1\` — yet the real minimum depth is 2,
because the path must end in a leaf.

The fix is to treat the empty side as "no answer" and take the other side:

- left child missing → \`1 + minDepth(right)\`
- right child missing → \`1 + minDepth(left)\`
- both present → \`1 + min(minDepth(left), minDepth(right))\`

## Dry Run

Input: \`3 9 20 null null 15 7\`

| Step | call | node | children | returned |
|---:|---|---|---|---:|
| 1 | \`minDepth(3)\` | \`3\` | left \`9\`, right \`20\` — both present | — |
| 2 | \`minDepth(9)\` | \`9\` | no children → left missing | \`1 + minDepth(null)\` = \`1 + 0\` = **1** |
| 3 | \`minDepth(null)\` | — | — | **0** |
| 4 | \`minDepth(20)\` | \`20\` | left missing, right \`7\` | \`1 + minDepth(7)\` = — |
| 5 | \`minDepth(7)\` | \`7\` | no children → left missing | \`1 + minDepth(null)\` = **1** |
| 6 | \`minDepth(20)\` | \`20\` | — | \`1 + 1\` = **2** |
| 7 | \`minDepth(3)\` | \`3\` | both present | \`1 + min(1, 2)\` = **2** |

The crucial line is step 2: \`9\` is a leaf, so its left child is missing and the answer
comes from the (empty) right side plus the node itself.

## Java Solution

See [\`BinaryTreeMinimumDepth.java\`](./BinaryTreeMinimumDepth.java).

\`\`\`java
public static int minDepth(TreeNode root) {
    if (root == null) {
        return 0;
    }
    if (root.left == null) {
        return 1 + minDepth(root.right);
    }
    if (root.right == null) {
        return 1 + minDepth(root.left);
    }
    return 1 + Math.min(minDepth(root.left), minDepth(root.right));
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every node is visited once |
| **Space** | O(h) | The call stack mirrors the height of the tree |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Return the shortest path itself, not just its length."* → keep the path in a list and
  copy it when you reach a leaf that improves the best length.
- *"What if the tree may contain cycles?"* → keep a visited set.
- *"How would you do it with BFS?"* → BFS reaches the first leaf in the fewest steps,
  so the number of levels is the answer.

**Common mistakes:**
- ❌ Using \`1 + min(left, right)\` unconditionally → a missing child is not a leaf.
- ❌ Returning \`1\` for an empty tree instead of \`0\`.
- ❌ Checking \`root.left == null && root.right == null\` **after** the min → you get the
  leaf case right but the one-sided case wrong.

**How to narrate:**
> "The trick here is that a null child is not a path to a leaf. So if one side is
> missing I have to take the other side, and only when both sides exist do I take the
> minimum. That is the difference between this problem and the maximum depth."

## Related Problems

- [Maximum Depth of Binary Tree](./BinaryTreeMaximumDepth.java) — the same walk, \`max\` instead of \`min\`
- [Path Sum](./PathSum.java) — the same "only leaves count" rule
- [Balanced Binary Tree](./BalancedBinaryTree.java) — compares the two subtree heights
`,i=[`minDepth`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};