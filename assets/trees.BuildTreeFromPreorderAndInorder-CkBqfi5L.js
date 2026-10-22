var e=`trees.BuildTreeFromPreorderAndInorder`,t=`package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.Map;

/**
 * Problem: Construct Binary Tree from Preorder and Inorder Traversal
 * LeetCode: 105 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Divide and conquer, Index maps
 *
 * <p>Problem: Given the preorder and the inorder traversal of a tree with distinct
 * values, rebuild the tree.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * pre[0] pre[1] ... pre[n-1]
 * in[0] in[1] ... in[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 3 9 20 15 7
 * 9 3 15 20 7
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3 9 20 15 7
 * </pre>
 * The output lists the values of the rebuilt tree in level order (breadth first, left
 * to right); missing children are omitted.
 *
 * <p>Approach: the first value of the preorder traversal is the root. Its position in
 * the inorder traversal splits the tree into the left subtree (everything before it)
 * and the right subtree (everything after it). A map from value to inorder index makes
 * that split O(1), and a pointer into the preorder array tells us where each subtree
 * starts.
 *
 * <p>Complexity: Time O(n), Space O(n) for the index map.
 */
public class BuildTreeFromPreorderAndInorder {

    /**
     * Rebuilds the tree from its preorder and inorder traversals.
     *
     * @param preorder the preorder traversal
     * @param inorder  the inorder traversal
     * @return the root of the rebuilt tree, or {@code null} for empty input
     */
    public static TreeNode buildTree(int[] preorder, int[] inorder) {
        if (preorder == null || preorder.length == 0) {
            return null;
        }
        Map<Integer, Integer> inorderIndex = new HashMap<>();
        for (int i = 0; i < inorder.length; i++) {
            inorderIndex.put(inorder[i], i);
        }
        return build(preorder, 0, 0, inorder.length - 1, inorderIndex);
    }

    /** Builds the subtree whose preorder slice starts at {@code preStart}. */
    private static TreeNode build(int[] preorder, int preStart, int inStart, int inEnd,
                                  Map<Integer, Integer> inorderIndex) {
        if (inStart > inEnd) {
            return null; // empty subtree
        }
        int rootValue = preorder[preStart];
        TreeNode root = new TreeNode(rootValue);
        int mid = inorderIndex.get(rootValue);
        int leftSize = mid - inStart;
        root.left = build(preorder, preStart + 1, inStart, mid - 1, inorderIndex);
        root.right = build(preorder, preStart + 1 + leftSize, mid + 1, inEnd, inorderIndex);
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

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] preorder = fs.nextIntArray(n);
        int[] inorder = fs.nextIntArray(n);

        TreeNode root = buildTree(preorder, inorder);
        System.out.println(levelOrderValues(root));
    }
}
`,n=`import java.io.IOException;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.Map;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

/**
 * Problem: Construct Binary Tree from Preorder and Inorder Traversal
 * LeetCode: 105 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Divide and conquer, Index maps
 *
 * <p>Problem: Given the preorder and the inorder traversal of a tree with distinct
 * values, rebuild the tree.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * pre[0] pre[1] ... pre[n-1]
 * in[0] in[1] ... in[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 3 9 20 15 7
 * 9 3 15 20 7
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3 9 20 15 7
 * </pre>
 * The output lists the values of the rebuilt tree in level order (breadth first, left
 * to right); missing children are omitted.
 *
 * <p>Approach: the first value of the preorder traversal is the root. Its position in
 * the inorder traversal splits the tree into the left subtree (everything before it)
 * and the right subtree (everything after it). A map from value to inorder index makes
 * that split O(1), and a pointer into the preorder array tells us where each subtree
 * starts.
 *
 * <p>Complexity: Time O(n), Space O(n) for the index map.
 */
public class Main {

    /**
     * Rebuilds the tree from its preorder and inorder traversals.
     *
     * @param preorder the preorder traversal
     * @param inorder  the inorder traversal
     * @return the root of the rebuilt tree, or {@code null} for empty input
     */
    public static TreeNode buildTree(int[] preorder, int[] inorder) {
        if (preorder == null || preorder.length == 0) {
            return null;
        }
        Map<Integer, Integer> inorderIndex = new HashMap<>();
        for (int i = 0; i < inorder.length; i++) {
            inorderIndex.put(inorder[i], i);
        }
        return build(preorder, 0, 0, inorder.length - 1, inorderIndex);
    }

    /** Builds the subtree whose preorder slice starts at {@code preStart}. */
    private static TreeNode build(int[] preorder, int preStart, int inStart, int inEnd,
                                  Map<Integer, Integer> inorderIndex) {
        if (inStart > inEnd) {
            return null; // empty subtree
        }
        int rootValue = preorder[preStart];
        TreeNode root = new TreeNode(rootValue);
        int mid = inorderIndex.get(rootValue);
        int leftSize = mid - inStart;
        root.left = build(preorder, preStart + 1, inStart, mid - 1, inorderIndex);
        root.right = build(preorder, preStart + 1 + leftSize, mid + 1, inEnd, inorderIndex);
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

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] preorder = fs.nextIntArray(n);
        int[] inorder = fs.nextIntArray(n);

        TreeNode root = buildTree(preorder, inorder);
        System.out.println(levelOrderValues(root));
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
# Construct Binary Tree from Preorder and Inorder Traversal — LeetCode 105

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Divide and conquer · Index maps |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Adobe |

## Problem Statement

Given the **preorder** and the **inorder** traversal of a binary tree with distinct
values, rebuild the tree.

\`\`\`
      3
     / \\
    9  20
      /  \\
     15   7
\`\`\`

- preorder \`3 9 20 15 7\` — root, left, right
- inorder \`9 3 15 20 7\` — left, root, right

## Input Format

The program reads from standard input:

\`\`\`
n
pre[0] pre[1] ... pre[n-1]
in[0] in[1] ... in[n-1]
\`\`\`

- \`n\` — the number of nodes
- the two lines — the preorder and the inorder traversal of the same tree

## Sample Input

\`\`\`
5
3 9 20 15 7
9 3 15 20 7
\`\`\`

## Expected Output

\`\`\`
3 9 20 15 7
\`\`\`

The values of the rebuilt tree in **level order** (breadth first, left to right);
missing children are omitted.

## Approach — the root splits everything

Two facts do all the work:

1. The **first** element of the preorder traversal is the root of the (sub)tree.
2. The root's position in the **inorder** traversal splits the tree: everything before
   it is the left subtree, everything after it is the right subtree.

So the recursion knows the inorder range \`[inStart, inEnd]\` and the preorder index
where the subtree starts:

\`\`\`java
int rootValue = preorder[preStart];
int mid = inorderIndex.get(rootValue);       // O(1) thanks to the map
int leftSize = mid - inStart;
root.left  = build(preorder, preStart + 1,        inStart, mid - 1, map);
root.right = build(preorder, preStart + 1 + leftSize, mid + 1, inEnd, map);
\`\`\`

The \`leftSize\` tells us how many elements the left subtree occupies in the preorder
array, so the right subtree starts at \`preStart + 1 + leftSize\`.

The map \`value → inorder index\` turns the lookup of the root's position into O(1);
without it the whole algorithm degrades to O(n²).

## Dry Run

Input: preorder \`3 9 20 15 7\`, inorder \`9 3 15 20 7\`, map \`{9:0, 3:1, 15:2, 20:3, 7:4}\`

| Step | call \`(preStart, inStart, inEnd)\` | root = pre[preStart] | \`mid\` | leftSize | left call | right call |
|---:|---|---:|---:|---:|---|---|
| 1 | \`(0, 0, 4)\` | 3 | 1 | 1 | \`(1, 0, 0)\` | \`(2, 2, 4)\` |
| 2 | \`(1, 0, 0)\` | 9 | 0 | 0 | \`(2, 0, -1)\` → empty | \`(2, 1, 0)\` → empty |
| 3 | \`(2, 2, 4)\` | 20 | 3 | 1 | \`(3, 2, 2)\` | \`(4, 4, 4)\` |
| 4 | \`(3, 2, 2)\` | 15 | 2 | 0 | \`(4, 2, 1)\` → empty | \`(4, 3, 2)\` → empty |
| 5 | \`(4, 4, 4)\` | 7 | 4 | 0 | \`(5, 4, 3)\` → empty | \`(5, 5, 4)\` → empty |

The empty calls are detected by \`inStart > inEnd\` — **not** by the preorder index: the
preorder index of a right subtree is larger than the inorder index of its range.

The tree that comes out:

\`\`\`
      3
     / \\
    9  20
      /  \\
     15   7
\`\`\`

Level order (missing children omitted): \`3 9 20 15 7\` ✓

## Java Solution

See [\`BuildTreeFromPreorderAndInorder.java\`](./BuildTreeFromPreorderAndInorder.java).

\`\`\`java
public static TreeNode buildTree(int[] preorder, int[] inorder) {
    if (preorder == null || preorder.length == 0) {
        return null;
    }
    Map<Integer, Integer> inorderIndex = new HashMap<>();
    for (int i = 0; i < inorder.length; i++) {
        inorderIndex.put(inorder[i], i);
    }
    return build(preorder, 0, 0, inorder.length - 1, inorderIndex);
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every node is created once; the map lookup is O(1) on average |
| **Space** | O(n) | The index map plus O(h) recursion |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the values are not distinct?"* → the position of the root in the inorder
  traversal is ambiguous; you have to search for all candidates (or the input is
  invalid).
- *"Rebuild the tree from inorder and postorder."* → the same idea, but the root is the
  **last** element of the postorder slice.
- *"Can you do it in O(1) extra space?"* → yes, but you need the index of the root in
  the inorder array, which is O(n) to find — the map is the price of O(n) time.

**Common mistakes:**
- ❌ Detecting the empty subtree with the **preorder** index → the right subtree of a
  node has a preorder index that is larger than its inorder range; the check must be
  \`inStart > inEnd\`.
- ❌ Forgetting the \`leftSize\` offset for the right subtree → the right subtree is
  rebuilt from the wrong elements.
- ❌ Scanning the inorder array for the root on every call → O(n²).

**How to narrate:**
> "The first element of the preorder slice is the root, and its position in the
> inorder traversal tells me how big the left subtree is. I keep a map from value to
> inorder index so that lookup is O(1), and I recurse on the two inorder ranges with
> the matching preorder offsets. Every node is created exactly once, so O(n) time."

## Related Problems

- [Serialize and Deserialize Binary Tree](./SerializeAndDeserializeBinaryTree.java) — the opposite direction
- [Lowest Common Ancestor of a Binary Tree](./LowestCommonAncestor.java) — traversals as input
- [Validate Binary Search Tree](./ValidateBinarySearchTree.java) — checks what the rebuild produces
`,i=[`buildTree`,`levelOrderValues`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};