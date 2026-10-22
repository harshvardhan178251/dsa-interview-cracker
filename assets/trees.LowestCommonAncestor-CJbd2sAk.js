var e=`trees.LowestCommonAncestor`,t=`package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;

/**
 * Problem: Lowest Common Ancestor of a Binary Tree
 * LeetCode: 236 | Difficulty: Medium | Frequency: 5/5
 * Pattern: DFS, Post-order recursion
 *
 * <p>Problem: Given a binary tree and two of its nodes {@code p} and {@code q}, find their
 * lowest common ancestor. The LCA is the node that is an ancestor of both and sits
 * closest to them. Node values are unique.
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
 * 3 5 1 6 2 0 8 null null 7 4
 * 5
 * 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: a post-order walk that returns the answer for a subtree. If one of
 * {@code p}/{@code q} is found in a subtree we return that node; if both are found in
 * different subtrees, this node is the LCA. Otherwise we return whatever the children
 * returned (at most one of them can be non-null).
 *
 * <p>Complexity: Time O(n), Space O(h).
 */
public class LowestCommonAncestor {

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
        return find(root, p, q);
    }

    /** Checks whether the tree contains a node with the given value. */
    private static boolean contains(TreeNode node, int value) {
        if (node == null) {
            return false;
        }
        return node.val == value || contains(node.left, value) || contains(node.right, value);
    }

    /** Post-order search that returns the LCA of {@code p} and {@code q} inside a subtree. */
    private static Integer find(TreeNode node, int p, int q) {
        if (node == null) {
            return null;
        }
        if (node.val == p || node.val == q) {
            return node.val;
        }
        Integer left = find(node.left, p, q);
        Integer right = find(node.right, p, q);
        if (left != null && right != null) {
            // p is in the left subtree and q in the right one: this node is the LCA.
            return node.val;
        }
        return left != null ? left : right;
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
 * Problem: Lowest Common Ancestor of a Binary Tree
 * LeetCode: 236 | Difficulty: Medium | Frequency: 5/5
 * Pattern: DFS, Post-order recursion
 *
 * <p>Problem: Given a binary tree and two of its nodes {@code p} and {@code q}, find their
 * lowest common ancestor. The LCA is the node that is an ancestor of both and sits
 * closest to them. Node values are unique.
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
 * 3 5 1 6 2 0 8 null null 7 4
 * 5
 * 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: a post-order walk that returns the answer for a subtree. If one of
 * {@code p}/{@code q} is found in a subtree we return that node; if both are found in
 * different subtrees, this node is the LCA. Otherwise we return whatever the children
 * returned (at most one of them can be non-null).
 *
 * <p>Complexity: Time O(n), Space O(h).
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
        return find(root, p, q);
    }

    /** Checks whether the tree contains a node with the given value. */
    private static boolean contains(TreeNode node, int value) {
        if (node == null) {
            return false;
        }
        return node.val == value || contains(node.left, value) || contains(node.right, value);
    }

    /** Post-order search that returns the LCA of {@code p} and {@code q} inside a subtree. */
    private static Integer find(TreeNode node, int p, int q) {
        if (node == null) {
            return null;
        }
        if (node.val == p || node.val == q) {
            return node.val;
        }
        Integer left = find(node.left, p, q);
        Integer right = find(node.right, p, q);
        if (left != null && right != null) {
            // p is in the left subtree and q in the right one: this node is the LCA.
            return node.val;
        }
        return left != null ? left : right;
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
# Lowest Common Ancestor of a Binary Tree — LeetCode 236

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | DFS · Post-order recursion |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Uber, Adobe |

## Problem Statement

Given a binary tree and two of its nodes \`p\` and \`q\`, find their **lowest common
ancestor** — the node that is an ancestor of both and is closest to them. The LCA can
be one of the two nodes itself.

Node values in the tree are unique, so a node is identified by its value.

\`\`\`
        3
       / \\
      5   1
     / \\   \\
    6   2   0
       / \\   \\
      7   4   8
\`\`\`

For \`p = 5\` and \`q = 1\` the LCA is \`3\`.

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

The sample tree above is \`11\` followed by \`3 5 1 6 2 0 8 null null 7 4\`.

## Sample Input

\`\`\`
11
3 5 1 6 2 0 8 null null 7 4
5
1
\`\`\`

## Expected Output

\`\`\`
3
\`\`\`

## Approach — post-order, return the answer upward

The recursion answers one question: *"what is the LCA of p and q inside this subtree?"*
and it can answer it with three different values:

- \`null\` — neither node is here,
- a **node value** — exactly one of them is here (and it is the answer for this
  subtree),
- a **node value** — the LCA is this very node.

\`\`\`java
if (node == null) return null;
if (node.val == p || node.val == q) return node.val;   // found one of them
Integer left  = find(node.left, p, q);
Integer right = find(node.right, p, q);
if (left != null && right != null) return node.val;    // they are on different sides
return left != null ? left : right;                    // at most one is non-null
\`\`\`

The key line is the third one: if both subtrees returned something, then \`p\` and \`q\`
live in different subtrees and the current node is their lowest common ancestor.

Before the walk the code checks that **both** nodes exist in the tree; if one of them
is missing the answer is \`null\`.

## Dry Run

Input: \`3 5 1 6 2 0 8 null null 7 4\`, \`p = 5\`, \`q = 1\`

| Step | call | node | left result | right result | returned |
|---:|---|---:|---|---|---:|
| 1 | \`find(3)\` | 3 | — | — | — |
| 2 | \`find(5)\` | 5 | — | — | — |
| 3 | \`find(6)\` | 6 | \`null\` | \`null\` | \`null\` |
| 4 | \`find(2)\` | 2 | — | — | — |
| 5 | \`find(7)\` | 7 | \`null\` | \`null\` | \`null\` |
| 6 | \`find(4)\` | 4 | \`null\` | \`null\` | \`null\` |
| 7 | \`find(2)\` | 2 | \`null\` | \`null\` | \`null\` |
| 8 | \`find(5)\` | 5 | — | — | **5** (node.val == p) |
| 9 | \`find(1)\` | 1 | — | — | — |
| 10 | \`find(0)\` | 0 | \`null\` | \`null\` | \`null\` |
| 11 | \`find(8)\` | 8 | \`null\` | \`null\` | \`null\` |
| 12 | \`find(1)\` | 1 | — | — | **1** (node.val == q) |
| 13 | \`find(3)\` | 3 | \`5\` | \`1\` | both non-null → **3** ✓ |

Steps 8 and 12 stop the recursion immediately: once we have found \`p\` we do not need to
look inside its subtree.

## Java Solution

See [\`LowestCommonAncestor.java\`](./LowestCommonAncestor.java).

\`\`\`java
public static Integer lowestCommonAncestor(TreeNode root, int p, int q) {
    return find(root, p, q);
}

private static Integer find(TreeNode node, int p, int q) {
    if (node == null) {
        return null;
    }
    if (node.val == p || node.val == q) {
        return node.val;
    }
    Integer left = find(node.left, p, q);
    Integer right = find(node.right, p, q);
    if (left != null && right != null) {
        return node.val;
    }
    return left != null ? left : right;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every node is visited at most once |
| **Space** | O(h) | The call stack mirrors the height of the tree |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the values are not unique?"* → you have to compare node **identity**, not
  values; pass the node references instead of the values.
- *"How do you do it for a BST?"* → the ordering does the work: walk left while both
  nodes are smaller, right while both are bigger, otherwise you have arrived.
- *"What if one of the nodes is the ancestor of the other?"* → the answer is the
  ancestor itself; the code handles it because hitting \`p\` returns immediately.
- *"Can you do it iteratively with a parent map?"* → yes: record the parents, then walk
  \`p\` and \`q\` up to the root and look for the first common ancestor.

**Common mistakes:**
- ❌ Returning \`null\` when one subtree is empty → you must propagate the other side's
  answer.
- ❌ Continuing the search *below* a node that already equals \`p\` or \`q\` → the answer
  would still be correct but you do unnecessary work.
- ❌ Assuming \`p\` is an ancestor of \`q\` → handle both orders.

**How to narrate:**
> "I'll do a post-order walk. Each call returns the LCA of p and q inside its subtree:
> null if neither is there, the node if one of them is there, and the node itself if
> both subtrees returned something — that means p and q are on opposite sides and this
> node is their lowest common ancestor. O(n) time, O(h) stack."

## Related Problems

- [Lowest Common Ancestor of a BST](./LowestCommonAncestorOfBST.java) — the same question, O(h) thanks to the ordering
- [Path Sum](./PathSum.java) — another "walk upward with an answer" recursion
- [Validate Binary Search Tree](./ValidateBinarySearchTree.java) — the bounds technique
`,i=[`lowestCommonAncestor`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};