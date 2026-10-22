var e=`trees.DiameterOfBinaryTree`,t=`package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;

/**
 * Problem: Diameter of Binary Tree
 * LeetCode: 543 | Difficulty: Easy | Frequency: 4/5
 * Pattern: DFS, Post-order with global state
 *
 * <p>Problem: Given the root of a binary tree, return the length of its diameter — the
 * number of edges on the longest path between any two nodes.
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
 * 3
 * </pre>
 *
 * <p>Approach: the longest path of any tree goes through the root or lies completely
 * inside one subtree. In a post-order walk every node knows the height of its two
 * subtrees, so the longest path <i>through</i> that node is
 * {@code height(left) + height(right)}. We return the height from the recursion and keep
 * the best diameter seen in a field.
 *
 * <p>Complexity: Time O(n), Space O(h).
 */
public class DiameterOfBinaryTree {

    /** Longest path found so far, in edges. */
    private static int diameter;

    /**
     * Returns the diameter of the tree in edges.
     *
     * @param root root of the tree, may be {@code null}
     * @return the length of the longest path between any two nodes
     */
    public static int diameter(TreeNode root) {
        diameter = 0;
        height(root);
        return diameter;
    }

    /**
     * Returns the height of the subtree rooted at {@code node} (a leaf has height 1) and
     * updates the diameter on the way back up.
     */
    private static int height(TreeNode node) {
        if (node == null) {
            return 0;
        }
        int left = height(node.left);
        int right = height(node.right);
        int through = left + right; // edges of the path that goes through this node
        if (through > diameter) {
            diameter = through;
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

        System.out.println(diameter(root));
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
 * Problem: Diameter of Binary Tree
 * LeetCode: 543 | Difficulty: Easy | Frequency: 4/5
 * Pattern: DFS, Post-order with global state
 *
 * <p>Problem: Given the root of a binary tree, return the length of its diameter — the
 * number of edges on the longest path between any two nodes.
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
 * 3
 * </pre>
 *
 * <p>Approach: the longest path of any tree goes through the root or lies completely
 * inside one subtree. In a post-order walk every node knows the height of its two
 * subtrees, so the longest path <i>through</i> that node is
 * {@code height(left) + height(right)}. We return the height from the recursion and keep
 * the best diameter seen in a field.
 *
 * <p>Complexity: Time O(n), Space O(h).
 */
public class Main {

    /** Longest path found so far, in edges. */
    private static int diameter;

    /**
     * Returns the diameter of the tree in edges.
     *
     * @param root root of the tree, may be {@code null}
     * @return the length of the longest path between any two nodes
     */
    public static int diameter(TreeNode root) {
        diameter = 0;
        height(root);
        return diameter;
    }

    /**
     * Returns the height of the subtree rooted at {@code node} (a leaf has height 1) and
     * updates the diameter on the way back up.
     */
    private static int height(TreeNode node) {
        if (node == null) {
            return 0;
        }
        int left = height(node.left);
        int right = height(node.right);
        int through = left + right; // edges of the path that goes through this node
        if (through > diameter) {
            diameter = through;
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

        System.out.println(diameter(root));
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
# Diameter of Binary Tree — LeetCode 543

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | DFS · Post-order with global state |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Given the root of a binary tree, return the length of its **diameter** — the number of
**edges** on the longest path between any two nodes (the path does not have to start at
the root).

For the tree

\`\`\`
    1
   / \\
  2   3
 / \\
4   5
\`\`\`

the longest path is \`4 → 2 → 1 → 3\`, which is \`3\` edges.

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
3
\`\`\`

## Approach — height on the way up, diameter on the side

Every longest path either

1. lies completely inside the left subtree, or
2. lies completely inside the right subtree, or
3. **passes through** the current node.

A post-order walk solves (1) and (2) by recursion. For (3) the path through a node is
the left height plus the right height (in edges), because the node itself is not
counted.

\`\`\`java
int left  = height(node.left);    // height in nodes
int right = height(node.right);
diameter = max(diameter, left + right);
return 1 + max(left, right);      // height in nodes
\`\`\`

The recursion returns the **height**, the diameter is kept in a field and updated on
the way back up.

## Dry Run

Input: \`1 2 3 4 5\`

| Step | call | node | left height | right height | \`left + right\` | diameter after | height returned |
|---:|---|---|---:|---:|---:|---:|---:|
| 1 | \`height(1)\` | \`1\` | — | — | — | 0 | — |
| 2 | \`height(2)\` | \`2\` | — | — | — | 0 | — |
| 3 | \`height(4)\` | \`4\` | 0 | 0 | 0 | 0 | 1 |
| 4 | \`height(5)\` | \`5\` | 0 | 0 | 0 | 0 | 1 |
| 5 | \`height(2)\` | \`2\` | 1 | 1 | **2** | **2** | 2 |
| 6 | \`height(3)\` | \`3\` | 0 | 0 | 0 | 2 | 1 |
| 7 | \`height(1)\` | \`1\` | 2 | 1 | **3** | **3** | 3 |

The best path is found at the root: \`left height 2\` (node \`2\` → \`4\`) plus
\`right height 1\` (node \`3\`) = 3 edges.

### Why the heights are counted in nodes

\`height(4) = 1\` although \`4\` has no children. The path \`4 → 2\` uses one edge, and the
formula \`left + right\` at node \`2\` is \`1 + 1 = 2\` — the two edges \`2–4\` and \`2–5\`.
Because the node itself contributes \`+1\` to the height but nothing to the diameter, the
arithmetic lines up.

## Java Solution

See [\`DiameterOfBinaryTree.java\`](./DiameterOfBinaryTree.java).

\`\`\`java
public static int diameter(TreeNode root) {
    diameter = 0;
    height(root);
    return diameter;
}

private static int height(TreeNode node) {
    if (node == null) {
        return 0;
    }
    int left = height(node.left);
    int right = height(node.right);
    int through = left + right;
    if (through > diameter) {
        diameter = through;
    }
    return 1 + Math.max(left, right);
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every node is visited once |
| **Space** | O(h) | The call stack plus one field for the answer |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Return the diameter itself, not its length."* → also store the two endpoint nodes
  when you improve the maximum.
- *"Do it without a global field."* → return a small \`record {height, diameter}\` from
  the recursion and merge the two children. Cleaner and thread-safe.
- *"What if the tree is a BST — can you do better?"* → no, the diameter is not related to
  the ordering; it is still O(n).

**Common mistakes:**
- ❌ Counting **nodes** instead of edges → the answer is one too large.
- ❌ Forgetting that the path does not have to pass through the root.
- ❌ Sharing one global field between calls without resetting it → the second call
  returns the first call's maximum.

**How to narrate:**
> "A longest path either stays inside a subtree or passes through the current node.
> My recursion returns the height of each subtree; on the way back up I check whether
> the path through this node — left height plus right height — beats the best I have
> seen. That's O(n) time and O(h) space."

## Related Problems

- [Maximum Depth of Binary Tree](./BinaryTreeMaximumDepth.java) — the height function alone
- [Balanced Binary Tree](./BalancedBinaryTree.java) — same walk, different question
- [Binary Tree Cameras](./BinaryTreeCameras.java) — post-order with a state machine
`,i=[`diameter`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};