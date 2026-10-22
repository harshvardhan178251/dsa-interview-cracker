var e=`trees.BinaryTreeInorderTraversal`,t=`package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

/**
 * Problem: Binary Tree Inorder Traversal
 * LeetCode: 94 | Difficulty: Easy | Frequency: 5/5
 * Pattern: DFS, Explicit stack
 *
 * <p>Problem: Given the root of a binary tree, return the values of its nodes in
 * <b>inorder</b>: left subtree, node, right subtree.
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
 * 4
 * 1 null 2 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 3 2
 * </pre>
 *
 * <p>Approach: an explicit stack replaces the call stack of the recursive version. We walk
 * down the left spine pushing every node we meet, then pop one node (the leftmost one),
 * emit its value and move to its right child. The loop condition
 * {@code current != null || !stack.isEmpty()} keeps the traversal alive until both the
 * current pointer and the stack are exhausted.
 *
 * <p>Complexity: Time O(n) — every node is pushed and popped once. Space O(h) — the stack
 * holds at most one root-to-leaf path.
 */
public class BinaryTreeInorderTraversal {

    /**
     * Returns the inorder traversal of the tree.
     *
     * @param root root of the tree, may be {@code null}
     * @return the node values in left-node-right order
     */
    public static List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> out = new ArrayList<>();
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode current = root;

        while (current != null || !stack.isEmpty()) {
            // Go as far left as possible, remembering the way back.
            while (current != null) {
                stack.push(current);
                current = current.left;
            }
            // The top of the stack is the leftmost pending node.
            current = stack.pop();
            out.add(current.val);
            current = current.right;
        }
        return out;
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

        List<Integer> answer = inorderTraversal(root);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < answer.size(); i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(answer.get(i));
        }
        System.out.println(sb);
    }
}
`,n=`import java.io.IOException;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Binary Tree Inorder Traversal
 * LeetCode: 94 | Difficulty: Easy | Frequency: 5/5
 * Pattern: DFS, Explicit stack
 *
 * <p>Problem: Given the root of a binary tree, return the values of its nodes in
 * <b>inorder</b>: left subtree, node, right subtree.
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
 * 4
 * 1 null 2 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 3 2
 * </pre>
 *
 * <p>Approach: an explicit stack replaces the call stack of the recursive version. We walk
 * down the left spine pushing every node we meet, then pop one node (the leftmost one),
 * emit its value and move to its right child. The loop condition
 * {@code current != null || !stack.isEmpty()} keeps the traversal alive until both the
 * current pointer and the stack are exhausted.
 *
 * <p>Complexity: Time O(n) — every node is pushed and popped once. Space O(h) — the stack
 * holds at most one root-to-leaf path.
 */
public class Main {

    /**
     * Returns the inorder traversal of the tree.
     *
     * @param root root of the tree, may be {@code null}
     * @return the node values in left-node-right order
     */
    public static List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> out = new ArrayList<>();
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode current = root;

        while (current != null || !stack.isEmpty()) {
            // Go as far left as possible, remembering the way back.
            while (current != null) {
                stack.push(current);
                current = current.left;
            }
            // The top of the stack is the leftmost pending node.
            current = stack.pop();
            out.add(current.val);
            current = current.right;
        }
        return out;
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

        List<Integer> answer = inorderTraversal(root);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < answer.size(); i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(answer.get(i));
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
# Binary Tree Inorder Traversal — LeetCode 94

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | DFS · Explicit stack |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Uber, Adobe |

## Problem Statement

Given the root of a binary tree, return the values of its nodes in **inorder**:
left subtree, then the node, then the right subtree.

For the tree

\`\`\`
    1
     \\
      2
     /
    3
\`\`\`

the inorder traversal is \`1 3 2\`.

## Input Format

The program reads from standard input:

\`\`\`
t
v0 v1 ... v(t-1)
\`\`\`

- \`t\` — how many level-order tokens follow (\`0\` for an empty tree)
- the tokens — the node values in **level order**; \`null\` marks a missing child and the
  first token is the root

So the sample tree above is \`4\` followed by \`1 null 2 3\`.

## Sample Input

\`\`\`
4
1 null 2 3
\`\`\`

## Expected Output

\`\`\`
1 3 2
\`\`\`

## Approach — left spine, pop, go right

The recursive version is three lines: recurse left, visit, recurse right. The iterative
version replaces the call stack with an explicit one:

1. Walk down the **left spine**, pushing every node you meet onto a stack.
2. The top of the stack is now the leftmost node that still has to be visited — pop it
   and emit its value.
3. Move to its right child and repeat.

The loop condition \`current != null || !stack.isEmpty()\` is what keeps the traversal
alive: it runs while there is a node to descend into **or** something waiting on the
stack.

> Why not pre-order or post-order? Because inorder needs the *whole* left subtree
> before the node, so you must remember the way back — that memory is the stack.

## Dry Run

Input: \`1 null 2 3\` — the tree \`1 → (null, 2)\`, \`2 → (3, null)\`.

| Step | \`current\` | action | \`stack\` (bottom → top) | output so far |
|---:|---|---|---|---|
| 1 | \`1\` | push 1, go left | \`[1]\` | \`[]\` |
| 2 | \`null\` | left spine ends, pop | \`[1]\` → pop \`1\` | \`[1]\` |
| 3 | \`1.right\` = \`2\` | go right, push 2, go left | \`[2]\` | \`[1]\` |
| 4 | \`2.left\` = \`3\` | push 3, go left | \`[2, 3]\` | \`[1]\` |
| 5 | \`null\` | left spine ends, pop | \`[2, 3]\` → pop \`3\` | \`[1, 3]\` |
| 6 | \`3.right\` = \`null\` | nothing to the right, pop | \`[2]\` → pop \`2\` | \`[1, 3, 2]\` |
| 7 | \`null\` | stack empty and no current node → stop | \`[]\` | \`[1, 3, 2]\` |

Every node is pushed once and popped once, so the traversal is O(n).

## Java Solution

See [\`BinaryTreeInorderTraversal.java\`](./BinaryTreeInorderTraversal.java).

\`\`\`java
public static List<Integer> inorderTraversal(TreeNode root) {
    List<Integer> out = new ArrayList<>();
    Deque<TreeNode> stack = new ArrayDeque<>();
    TreeNode current = root;

    while (current != null || !stack.isEmpty()) {
        while (current != null) {
            stack.push(current);
            current = current.left;
        }
        current = stack.pop();
        out.add(current.val);
        current = current.right;
    }
    return out;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every node is pushed and popped exactly once |
| **Space** | O(h) | The stack holds at most one root-to-leaf path |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Return the inorder traversal without a stack (O(1) extra space)."* → Morris traversal:
  thread the right pointer of every node to its in-order successor and undo the threads
  on the way back. O(n) time, O(1) space, but it mutates the tree.
- *"Do it for pre-order and post-order."* → pre-order is the same loop without the second
  inner loop; post-order is easier iteratively with **two** stacks or with a
  "visiting" marker pushed onto the same stack.
- *"What if the tree is a DAG / has cycles?"* → you need a visited set, and the problem
  changes completely.

**Common mistakes:**
- ❌ Forgetting the second \`while\` — without it you only visit the left spine.
- ❌ Popping **before** pushing the left child → that is a pre-order traversal.
- ❌ Using \`ArrayDeque\` and pushing \`null\` → \`ArrayDeque\` rejects null elements; guard
  with \`if (current != null)\`.

**How to narrate:**
> "Inorder is the one traversal that cannot be done without remembering the way back,
> so I'll use an explicit stack. I descend to the leftmost node, then pop and emit,
> then move right. The stack never holds more than the height of the tree, so it's
> O(h) space and O(n) time."

## Related Problems

- [Binary Tree Level Order Traversal](./BinaryTreeLevelOrderTraversal.java) — the breadth-first cousin
- [Binary Tree Paths](./BinaryTreePaths.java) — builds strings during a DFS
- [Kth Smallest Element in a BST](./KthSmallestElementInBST.java) — stops the same traversal after k steps
`,i=[`inorderTraversal`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};