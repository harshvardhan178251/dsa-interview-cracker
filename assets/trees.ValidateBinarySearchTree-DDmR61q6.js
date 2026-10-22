var e=`trees.ValidateBinarySearchTree`,t=`package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;

/**
 * Problem: Validate Binary Search Tree
 * LeetCode: 98 | Difficulty: Medium | Frequency: 5/5
 * Pattern: DFS, Range bounds
 *
 * <p>Problem: Check whether a binary tree is a valid BST: every node's value is strictly
 * greater than all values in its left subtree and strictly smaller than all values in
 * its right subtree.
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
 * 5 1 4 null null 3 6
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * false
 * </pre>
 *
 * <p>Approach: passing the allowed range down the tree. A node must sit strictly inside
 * {@code (low, high)}; the left subtree inherits {@code (low, node.val)} and the right
 * subtree {@code (node.val, high)}. The bounds are what make the check correct — only
 * comparing a node with its direct parent is not enough.
 *
 * <p>Complexity: Time O(n), Space O(h).
 */
public class ValidateBinarySearchTree {

    /**
     * Checks whether the tree is a valid binary search tree.
     *
     * @param root root of the tree, may be {@code null}
     * @return {@code true} when the BST property holds everywhere
     */
    public static boolean isValidBST(TreeNode root) {
        return valid(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }

    /** Checks the subtree against the open interval {@code (low, high)}. */
    private static boolean valid(TreeNode node, long low, long high) {
        if (node == null) {
            return true;
        }
        if (node.val <= low || node.val >= high) {
            return false;
        }
        return valid(node.left, low, node.val) && valid(node.right, node.val, high);
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

        System.out.println(isValidBST(root));
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
 * Problem: Validate Binary Search Tree
 * LeetCode: 98 | Difficulty: Medium | Frequency: 5/5
 * Pattern: DFS, Range bounds
 *
 * <p>Problem: Check whether a binary tree is a valid BST: every node's value is strictly
 * greater than all values in its left subtree and strictly smaller than all values in
 * its right subtree.
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
 * 5 1 4 null null 3 6
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * false
 * </pre>
 *
 * <p>Approach: passing the allowed range down the tree. A node must sit strictly inside
 * {@code (low, high)}; the left subtree inherits {@code (low, node.val)} and the right
 * subtree {@code (node.val, high)}. The bounds are what make the check correct — only
 * comparing a node with its direct parent is not enough.
 *
 * <p>Complexity: Time O(n), Space O(h).
 */
public class Main {

    /**
     * Checks whether the tree is a valid binary search tree.
     *
     * @param root root of the tree, may be {@code null}
     * @return {@code true} when the BST property holds everywhere
     */
    public static boolean isValidBST(TreeNode root) {
        return valid(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }

    /** Checks the subtree against the open interval {@code (low, high)}. */
    private static boolean valid(TreeNode node, long low, long high) {
        if (node == null) {
            return true;
        }
        if (node.val <= low || node.val >= high) {
            return false;
        }
        return valid(node.left, low, node.val) && valid(node.right, node.val, high);
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

        System.out.println(isValidBST(root));
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
# Validate Binary Search Tree — LeetCode 98

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | DFS · Range bounds |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg |

## Problem Statement

Check whether a binary tree is a valid **binary search tree**: every node's value is
strictly greater than all the values in its left subtree and strictly smaller than all
the values in its right subtree.

\`\`\`
    5
   / \\
  1   4
     / \\
    3   6
\`\`\`

This is **not** a valid BST: \`3\` is in the right subtree of \`5\` but smaller than \`5\`.

## Input Format

The program reads from standard input:

\`\`\`
t
v0 v1 ... v(t-1)
\`\`\`

- \`t\` — how many level-order tokens follow (\`0\` for an empty tree)
- the tokens — the node values in **level order**; \`null\` marks a missing child and the
  first token is the root

The sample tree above is \`7\` followed by \`5 1 4 null null 3 6\`.

## Sample Input

\`\`\`
7
5 1 4 null null 3 6
\`\`\`

## Expected Output

\`\`\`
false
\`\`\`

## Approach — carry the allowed range down

The tempting check — "is the left child smaller and the right child bigger?" — is
**wrong**: it only compares neighbours. The real rule involves *every* ancestor.

So we pass the open interval \`(low, high)\` down the tree:

- a node must satisfy \`low < node.val < high\`,
- its left subtree inherits \`(low, node.val)\`,
- its right subtree inherits \`(node.val, high)\`.

The root gets \`(-∞, +∞)\`. Because the bound comes from the ancestors, a node deep in the
tree is compared with all of them at once.

## Dry Run

Input: \`5 1 4 null null 3 6\` — the tree \`5 → (1, 4)\`, \`4 → (3, 6)\`

| Step | call \`(node, low, high)\` | node.val | check | verdict |
|---:|---|---:|---|---|
| 1 | \`(5, -∞, +∞)\` | 5 | \`-∞ < 5 < +∞\` | ok → children get \`(-∞, 5)\` and \`(5, +∞)\` |
| 2 | \`(1, -∞, 5)\` | 1 | \`-∞ < 1 < 5\` | ok → children get \`(-∞, 1)\` and \`(1, 5)\` |
| 3 | \`(null, -∞, 1)\` | — | — | **true** |
| 4 | \`(null, 1, 5)\` | — | — | **true** |
| 5 | \`(4, 5, +∞)\` | 4 | \`5 < 4\` is false | **false** ✗ |

The walk stops at step 5 — node \`4\` sits in the right subtree of \`5\`, so it must be
larger than \`5\`, and it is not.

### The case that fools the naive check

\`\`\`
    10
   /  \\
  5    15
      /  \\
     6    20
\`\`\`

\`6\` is bigger than its parent \`15\`? No — \`6 < 15\`, so the naive parent/child check
passes, yet the tree is **invalid** because \`6\` is smaller than \`10\`, the ancestor that
bounds the whole right subtree. The range check catches it: \`6\` must satisfy
\`15 < 6 < 20\`.

## Java Solution

See [\`ValidateBinarySearchTree.java\`](./ValidateBinarySearchTree.java).

\`\`\`java
public static boolean isValidBST(TreeNode root) {
    return valid(root, Long.MIN_VALUE, Long.MAX_VALUE);
}

private static boolean valid(TreeNode node, long low, long high) {
    if (node == null) {
        return true;
    }
    if (node.val <= low || node.val >= high) {
        return false;
    }
    return valid(node.left, low, node.val) && valid(node.right, node.val, high);
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every node is visited once (and the walk stops at the first violation) |
| **Space** | O(h) | The call stack mirrors the height of the tree |

## Interview Notes

**Follow-ups to raise yourself:**
- *"How do you find the k-th smallest element in a BST?"* → in-order traversal; see
  [Kth Smallest Element in a BST](./KthSmallestElementInBST.java).
- *"What if the values can be \`null\`?"* → use \`Integer\` and an explicit "no bound" flag
  instead of \`±∞\`.
- *"Validate a binary tree with arbitrary values."* → in-order traversal and check that
  the sequence is strictly increasing.

**Common mistakes:**
- ❌ Only comparing a node with its **parent** → misses the ancestor violations.
- ❌ Using \`Integer.MIN_VALUE\` / \`Integer.MAX_VALUE\` as the initial bounds → a tree that
  really contains those values fails; \`long\` avoids the problem.
- ❌ Using \`<=\` instead of \`<\` → duplicate values are **not** allowed in a strict BST.
- ❌ Passing \`node.val\` as the *inclusive* bound on the wrong side.

**How to narrate:**
> "A node must be bigger than every value above it on the left and smaller than every
> value above it on the right. I carry that interval down the recursion: a node has to
> sit strictly inside (low, high), and then I tighten the interval for its children.
> That way each node is compared with all its ancestors. O(n) time."

## Related Problems

- [Lowest Common Ancestor of a BST](./LowestCommonAncestorOfBST.java) — uses the ordering the bounds prove
- [Insert into a Binary Search Tree](./InsertIntoBST.java) — keeps the property
- [Search in a Binary Search Tree](./SearchInBST.java) — relies on it
`,i=[`isValidBST`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};