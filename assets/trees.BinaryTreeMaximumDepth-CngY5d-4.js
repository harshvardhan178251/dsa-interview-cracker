var e=`trees.BinaryTreeMaximumDepth`,t=`package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;

/**
 * Problem: Maximum Depth of Binary Tree
 * LeetCode: 104 | Difficulty: Easy | Frequency: 5/5
 * Pattern: DFS, Post-order recursion
 *
 * <p>Problem: Given the root of a binary tree, return its maximum depth — the number of
 * nodes on the longest root-to-leaf path.
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
 * 3
 * </pre>
 *
 * <p>Approach: the depth of an empty tree is 0 and the depth of a node is
 * {@code 1 + max(depth(left), depth(right))}. The recursion returns the answer for the
 * subtree and the parent adds its own level on the way back up.
 *
 * <p>Complexity: Time O(n) — every node is visited once. Space O(h) — the call stack
 * mirrors the height of the tree.
 */
public class BinaryTreeMaximumDepth {

    /**
     * Returns the maximum depth of the tree.
     *
     * @param root root of the tree, may be {@code null}
     * @return the number of nodes on the longest root-to-leaf path, 0 for an empty tree
     */
    public static int maxDepth(TreeNode root) {
        if (root == null) {
            return 0;
        }
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
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

        System.out.println(maxDepth(root));
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
 * Problem: Maximum Depth of Binary Tree
 * LeetCode: 104 | Difficulty: Easy | Frequency: 5/5
 * Pattern: DFS, Post-order recursion
 *
 * <p>Problem: Given the root of a binary tree, return its maximum depth — the number of
 * nodes on the longest root-to-leaf path.
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
 * 3
 * </pre>
 *
 * <p>Approach: the depth of an empty tree is 0 and the depth of a node is
 * {@code 1 + max(depth(left), depth(right))}. The recursion returns the answer for the
 * subtree and the parent adds its own level on the way back up.
 *
 * <p>Complexity: Time O(n) — every node is visited once. Space O(h) — the call stack
 * mirrors the height of the tree.
 */
public class Main {

    /**
     * Returns the maximum depth of the tree.
     *
     * @param root root of the tree, may be {@code null}
     * @return the number of nodes on the longest root-to-leaf path, 0 for an empty tree
     */
    public static int maxDepth(TreeNode root) {
        if (root == null) {
            return 0;
        }
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
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

        System.out.println(maxDepth(root));
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
# Maximum Depth of Binary Tree — LeetCode 104

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | DFS · Post-order recursion |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Uber, Adobe |

## Problem Statement

Given the root of a binary tree, return its **maximum depth** — the number of nodes on
the longest root-to-leaf path.

For the tree

\`\`\`
        3
       / \\
      9   20
         /  \\
        15   7
\`\`\`

the maximum depth is \`3\` (path \`3 → 20 → 15\`).

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
3
\`\`\`

## Approach — one line of recursion

Two facts do all the work:

- the depth of an **empty** tree is \`0\`,
- the depth of a **node** is \`1 + max(depth(left), depth(right))\`.

\`\`\`java
if (root == null) return 0;
return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
\`\`\`

The recursion returns the answer for a subtree; each parent adds its own level on the
way back up. It is a *post-order* walk: both children are solved before the parent.

The same idea gives the **minimum** depth — but with a twist, see
[Binary Tree Minimum Depth](./BinaryTreeMinimumDepth.java).

## Dry Run

Input: \`3 9 20 null null 15 7\`

| Step | call | node | left result | right result | returned |
|---:|---|---|---:|---:|---:|
| 1 | \`maxDepth(3)\` | \`3\` | — | — | — |
| 2 | \`maxDepth(9)\` | \`9\` | \`maxDepth(null)\` = 0 | \`maxDepth(null)\` = 0 | 1 |
| 3 | \`maxDepth(20)\` | \`20\` | — | — | — |
| 4 | \`maxDepth(null)\` | — | — | — | 0 |
| 5 | \`maxDepth(15)\` | \`15\` | \`maxDepth(null)\` = 0 | \`maxDepth(null)\` = 0 | 1 |
| 6 | \`maxDepth(7)\` | \`7\` | \`maxDepth(null)\` = 0 | \`maxDepth(null)\` = 0 | 1 |
| 7 | \`maxDepth(20)\` | \`20\` | 0 | 1 | \`1 + max(0, 1)\` = **2** |
| 8 | \`maxDepth(3)\` | \`3\` | 1 | 2 | \`1 + max(1, 2)\` = **3** |

The recursion order is \`3 → 9 → null → null → 20 → null → 15 → null → null → 7 → …\`;
every node contributes exactly one \`+1\`.

## Java Solution

See [\`BinaryTreeMaximumDepth.java\`](./BinaryTreeMaximumDepth.java).

\`\`\`java
public static int maxDepth(TreeNode root) {
    if (root == null) {
        return 0;
    }
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every node is visited once |
| **Space** | O(h) | The call stack mirrors the height of the tree |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the tree is a DAG with shared subtrees?"* → memoise on the node, otherwise
  shared subtrees are recomputed exponentially often.
- *"Compute the minimum depth as well."* → you cannot just take the \`min\` of the
  children: a missing child is not a path to a leaf.
- *"Do it iteratively."* → BFS level by level (count the levels) or DFS with an explicit
  stack that stores the depth.

**Common mistakes:**
- ❌ Returning \`0\` for an empty tree and then adding \`1\` at the root → the answer is off
  by one.
- ❌ Counting **edges** instead of **nodes** — LeetCode wants nodes, so a single node
  has depth 1.
- ❌ Forgetting the \`null\` base case → infinite recursion.

**How to narrate:**
> "The depth of a node is one plus the deeper of its two subtrees, and an empty subtree
> has depth zero. That's the whole algorithm — I recurse into both children and take
> the max on the way back up. O(n) time, O(h) stack."

## Related Problems

- [Binary Tree Minimum Depth](./BinaryTreeMinimumDepth.java) — the same walk with a different rule
- [Diameter of Binary Tree](./DiameterOfBinaryTree.java) — height plus a global maximum
- [Balanced Binary Tree](./BalancedBinaryTree.java) — compares the two heights
`,i=[`maxDepth`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};