var e=`trees.SymmetricTree`,t=`package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;

/**
 * Problem: Symmetric Tree
 * LeetCode: 101 | Difficulty: Easy | Frequency: 4/5
 * Pattern: DFS, Mirror recursion
 *
 * <p>Problem: Check whether a binary tree is a mirror of itself, i.e. whether the tree is
 * symmetric about its centre.
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
 * 1 2 2 3 4 4 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: the tree is symmetric when its left and right subtrees are mirror images
 * of each other. We therefore walk two positions at a time: the left child of the left
 * node against the right child of the right node, and so on. Both positions must be
 * empty, or both present with equal values.
 *
 * <p>Complexity: Time O(n), Space O(h).
 */
public class SymmetricTree {

    /**
     * Checks whether the tree is symmetric about its centre.
     *
     * @param root root of the tree, may be {@code null}
     * @return {@code true} when the tree mirrors itself
     */
    public static boolean isSymmetric(TreeNode root) {
        if (root == null) {
            return true;
        }
        return isMirror(root.left, root.right);
    }

    /** Compares two subtrees as mirror images of each other. */
    private static boolean isMirror(TreeNode left, TreeNode right) {
        if (left == null && right == null) {
            return true;
        }
        if (left == null || right == null) {
            return false;
        }
        if (left.val != right.val) {
            return false;
        }
        return isMirror(left.left, right.right) && isMirror(left.right, right.left);
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

        System.out.println(isSymmetric(root));
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
 * Problem: Symmetric Tree
 * LeetCode: 101 | Difficulty: Easy | Frequency: 4/5
 * Pattern: DFS, Mirror recursion
 *
 * <p>Problem: Check whether a binary tree is a mirror of itself, i.e. whether the tree is
 * symmetric about its centre.
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
 * 1 2 2 3 4 4 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: the tree is symmetric when its left and right subtrees are mirror images
 * of each other. We therefore walk two positions at a time: the left child of the left
 * node against the right child of the right node, and so on. Both positions must be
 * empty, or both present with equal values.
 *
 * <p>Complexity: Time O(n), Space O(h).
 */
public class Main {

    /**
     * Checks whether the tree is symmetric about its centre.
     *
     * @param root root of the tree, may be {@code null}
     * @return {@code true} when the tree mirrors itself
     */
    public static boolean isSymmetric(TreeNode root) {
        if (root == null) {
            return true;
        }
        return isMirror(root.left, root.right);
    }

    /** Compares two subtrees as mirror images of each other. */
    private static boolean isMirror(TreeNode left, TreeNode right) {
        if (left == null && right == null) {
            return true;
        }
        if (left == null || right == null) {
            return false;
        }
        if (left.val != right.val) {
            return false;
        }
        return isMirror(left.left, right.right) && isMirror(left.right, right.left);
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

        System.out.println(isSymmetric(root));
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
# Symmetric Tree — LeetCode 101

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | DFS · Mirror recursion |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta |

## Problem Statement

Check whether a binary tree is **symmetric** — a mirror image of itself around its
centre.

\`\`\`
      1
     / \\
    2   2
   / \\ / \\
  3  4 4  3     → symmetric
\`\`\`

\`\`\`
      1
     / \\
    2   2
    \\   \\
     3   3     → not symmetric
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

The sample tree above is \`7\` followed by \`1 2 2 3 4 4 3\`.

## Sample Input

\`\`\`
7
1 2 2 3 4 4 3
\`\`\`

## Expected Output

\`\`\`
true
\`\`\`

## Approach — two pointers instead of one

A single tree cannot be compared with itself position by position (the left half would
be compared with itself). So we walk **two positions at a time**:

- the root's **left** child against the root's **right** child,
- the left child's **left** against the right child's **right**,
- the left child's **right** against the right child's **left**.

\`\`\`java
private static boolean isMirror(TreeNode left, TreeNode right) {
    if (left == null && right == null) return true;
    if (left == null || right == null) return false;
    if (left.val != right.val) return false;
    return isMirror(left.left, right.right) && isMirror(left.right, right.left);
}
\`\`\`

Note the **crossed** pairing in the recursive calls — that is what makes it a mirror
and not just an equality check.

## Dry Run

Input: \`1 2 2 3 4 4 3\`

| Step | call \`(left, right)\` | left | right | verdict | next calls |
|---:|---|---:|---:|---|---|
| 1 | \`isSymmetric(root)\` | — | — | root exists → compare its children | \`(2, 2)\` |
| 2 | \`(2, 2)\` | 2 | 2 | values equal | \`(3, 3)\` and \`(4, 4)\` |
| 3 | \`(3, 3)\` | 3 | 3 | values equal | \`(null, null)\`, \`(null, null)\` |
| 4 | \`(null, null)\` | — | — | both empty → **true** | — |
| 5 | \`(null, null)\` | — | — | both empty → **true** | — |
| 6 | \`(3, 3)\` | — | — | → **true** | — |
| 7 | \`(4, 4)\` | 4 | 4 | values equal | \`(null, null)\`, \`(null, null)\` |
| 8 | \`(null, null)\` | — | — | both empty → **true** | — |
| 9 | \`(null, null)\` | — | — | both empty → **true** | — |
| 10 | \`(4, 4)\` | — | — | → **true** | — |
| 11 | \`(2, 2)\` | — | — | left true, right true → **true** | — |
| 12 | \`isSymmetric(root)\` | — | — | → **true** | — |

### The failing case

With \`1 2 2 null 3 null 4\` the tree is

\`\`\`
      1
     / \\
    2   2
     \\   \\
      3   4
\`\`\`

step 2 is \`(2, 2)\` → the values are equal → the next calls are
\`isMirror(2.left = null, 2.right = 4)\` → one side is \`null\` → **false** immediately.

## Java Solution

See [\`SymmetricTree.java\`](./SymmetricTree.java).

\`\`\`java
public static boolean isSymmetric(TreeNode root) {
    if (root == null) {
        return true;
    }
    return isMirror(root.left, root.right);
}

private static boolean isMirror(TreeNode left, TreeNode right) {
    if (left == null && right == null) {
        return true;
    }
    if (left == null || right == null) {
        return false;
    }
    if (left.val != right.val) {
        return false;
    }
    return isMirror(left.left, right.right) && isMirror(left.right, right.left);
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every node is visited once |
| **Space** | O(h) | The call stack mirrors the height of the tree |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Is a tree symmetric if and only if its two subtrees are mirror images?"* → yes, that
  is exactly the definition we coded.
- *"Check whether two trees are mirror images of each other."* → the same helper, called
  with the two roots.
- *"Do it iteratively."* → use a queue and push the pairs in crossed order.

**Common mistakes:**
- ❌ Comparing \`left.left\` with \`right.left\` → that is an **equality** check, not a
  mirror check.
- ❌ Forgetting to compare the **root's** two children before recursing.
- ❌ Returning \`false\` for an empty tree → an empty tree is trivially symmetric.

**How to narrate:**
> "Symmetry means the left subtree and the right subtree are mirror images. So I
> compare two nodes at a time: the root's left child against its right child, then the
> crossed pairs inside. Two empty positions match, one empty position does not, and two
> real positions must have the same value. O(n) time."

## Related Problems

- [Same Tree](./SameTree.java) — the same comparison without the crossing
- [Invert Binary Tree](./InvertBinaryTree.java) — creates the mirror explicitly
- [Subtree of Another Tree](./SubtreeOfAnotherTree.java) — structural comparison again
`,i=[`isSymmetric`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};