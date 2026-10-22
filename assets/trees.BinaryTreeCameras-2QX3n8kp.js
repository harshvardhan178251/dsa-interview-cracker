var e=`trees.BinaryTreeCameras`,t=`package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;

/**
 * Problem: Binary Tree Cameras
 * LeetCode: 757 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Greedy post-order, Tree DP
 *
 * <p>Problem: Place the minimum number of cameras on a binary tree so that every node is
 * watched — a camera watches its own node and its direct neighbours.
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
 * 0 0 null 0 0
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * </pre>
 *
 * <p>Approach: a greedy bottom-up walk. Each node reports one of three states: 0 — it is
 * not covered and needs its parent; 1 — it holds a camera; 2 — it is already covered.
 * If a child is in state 0 the node places a camera, because a camera is the last
 * chance to cover that child. Otherwise the node is covered by a camera below it.
 * The root needs one final check.
 *
 * <p>Complexity: Time O(n), Space O(h).
 */
public class BinaryTreeCameras {

    /** The node is not covered and expects its parent to place a camera. */
    private static final int NEEDS_COVER = 0;
    /** The node holds a camera. */
    private static final int HAS_CAMERA = 1;
    /** The node is watched by a camera in its subtree. */
    private static final int COVERED = 2;

    /** Number of cameras placed so far. */
    private static int cameras;

    /**
     * Returns the minimum number of cameras needed to watch the whole tree.
     *
     * @param root root of the tree, may be {@code null}
     * @return the minimum number of cameras
     */
    public static int minCameraCover(TreeNode root) {
        cameras = 0;
        if (root == null) {
            return 0;
        }
        int state = walk(root);
        if (state == NEEDS_COVER) {
            cameras++; // the root has no parent, so it needs its own camera
        }
        return cameras;
    }

    /**
     * Walks the subtree bottom-up, places cameras greedily and returns the state of
     * the subtree root.
     */
    private static int walk(TreeNode node) {
        if (node == null) {
            return COVERED; // nothing to watch
        }
        int left = walk(node.left);
        int right = walk(node.right);

        if (left == NEEDS_COVER || right == NEEDS_COVER) {
            cameras++; // a child is unwatched: this is the last chance to cover it
            return HAS_CAMERA;
        }
        if (left == HAS_CAMERA || right == HAS_CAMERA) {
            return COVERED; // a child watches this node
        }
        return NEEDS_COVER;
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

        System.out.println(minCameraCover(root));
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
 * Problem: Binary Tree Cameras
 * LeetCode: 757 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Greedy post-order, Tree DP
 *
 * <p>Problem: Place the minimum number of cameras on a binary tree so that every node is
 * watched — a camera watches its own node and its direct neighbours.
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
 * 0 0 null 0 0
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1
 * </pre>
 *
 * <p>Approach: a greedy bottom-up walk. Each node reports one of three states: 0 — it is
 * not covered and needs its parent; 1 — it holds a camera; 2 — it is already covered.
 * If a child is in state 0 the node places a camera, because a camera is the last
 * chance to cover that child. Otherwise the node is covered by a camera below it.
 * The root needs one final check.
 *
 * <p>Complexity: Time O(n), Space O(h).
 */
public class Main {

    /** The node is not covered and expects its parent to place a camera. */
    private static final int NEEDS_COVER = 0;
    /** The node holds a camera. */
    private static final int HAS_CAMERA = 1;
    /** The node is watched by a camera in its subtree. */
    private static final int COVERED = 2;

    /** Number of cameras placed so far. */
    private static int cameras;

    /**
     * Returns the minimum number of cameras needed to watch the whole tree.
     *
     * @param root root of the tree, may be {@code null}
     * @return the minimum number of cameras
     */
    public static int minCameraCover(TreeNode root) {
        cameras = 0;
        if (root == null) {
            return 0;
        }
        int state = walk(root);
        if (state == NEEDS_COVER) {
            cameras++; // the root has no parent, so it needs its own camera
        }
        return cameras;
    }

    /**
     * Walks the subtree bottom-up, places cameras greedily and returns the state of
     * the subtree root.
     */
    private static int walk(TreeNode node) {
        if (node == null) {
            return COVERED; // nothing to watch
        }
        int left = walk(node.left);
        int right = walk(node.right);

        if (left == NEEDS_COVER || right == NEEDS_COVER) {
            cameras++; // a child is unwatched: this is the last chance to cover it
            return HAS_CAMERA;
        }
        if (left == HAS_CAMERA || right == HAS_CAMERA) {
            return COVERED; // a child watches this node
        }
        return NEEDS_COVER;
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

        System.out.println(minCameraCover(root));
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
# Binary Tree Cameras — LeetCode 757

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Greedy post-order · Tree DP |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta |

## Problem Statement

Place the **minimum number of cameras** on a binary tree so that every node is watched.
A camera watches its own node and its direct neighbours (its parent and its children).

\`\`\`
      0
     / \\
    0   null
   / \\
  0   0
\`\`\`

One camera on the left \`0\` watches itself, its two children and the root → **1**
camera is enough.

## Input Format

The program reads from standard input:

\`\`\`
t
v0 v1 ... v(t-1)
\`\`\`

- \`t\` — how many level-order tokens follow (\`0\` for an empty tree)
- the tokens — the node values in **level order**; \`null\` marks a missing child and the
  first token is the root

The sample tree above is \`5\` followed by \`0 0 null 0 0\`.

## Sample Input

\`\`\`
5
0 0 null 0 0
\`\`\`

## Expected Output

\`\`\`
1
\`\`\`

## Approach — bottom-up greedy with three states

Each node reports one of three states to its parent:

| state | meaning |
|---|---|
| \`0\` | **not covered** — the node needs its parent to place a camera |
| \`1\` | the node **has a camera** |
| \`2\` | the node is **covered** by a camera in its subtree |

The rules, applied bottom-up:

1. If **either child is in state 0** (uncovered), put a camera **here** — this is the
   last chance to cover that child. Return state 1.
2. Else if **either child has a camera** (state 1), this node is watched by it.
   Return state 2.
3. Else neither child watches this node → return state 0 and hope the parent covers
   it.

Finally, the root has no parent: if it ends in state 0 it needs a camera of its own.

**Why is this minimal?** A camera at a node covers that node and its children. If a
child is uncovered, the camera *must* go at this node or at the child — and putting it
at the child would not cover the child itself. Placing it here covers the most nodes,
so the greedy choice is optimal.

## Dry Run

Input: tree \`0 → (0, null)\`, the left \`0 → (0, 0)\`

| Step | call | node | left state | right state | rule | cameras | returned state |
|---:|---|---:|---:|---:|---|---:|---:|
| 1 | \`walk(null)\` | — | — | — | empty subtree | 0 | 2 (covered) |
| 2 | \`walk(leaf)\` | 0 | 2 | 2 | no camera, no uncovered child → needs cover | 0 | **0** |
| 3 | \`walk(leaf)\` | 0 | 2 | 2 | same | 0 | **0** |
| 4 | \`walk(left 0)\` | 0 | 0 | 0 | a child is uncovered → **place a camera** | **1** | **1** |
| 5 | \`walk(right null)\` | — | — | — | empty | 0 | 2 |
| 6 | \`walk(root)\` | 0 | 1 | 2 | a child has a camera → covered | 1 | 2 |

The root ends in state 2 (covered by the camera of its left child), so no extra camera
is needed → **1** ✓

### A case where the root needs its own camera

Tree \`0\` (a single node): the leaf returns state 0 → the root is uncovered → the final
check adds one camera → **1**.

Tree \`0 → (0, 0)\` (the root with two leaf children): both children return 0 → the root
places a camera → **1**. The final check is not reached (the root is in state 1).

## Java Solution

See [\`BinaryTreeCameras.java\`](./BinaryTreeCameras.java).

\`\`\`java
public static int minCameraCover(TreeNode root) {
    cameras = 0;
    if (root == null) {
        return 0;
    }
    int state = walk(root);
    if (state == NEEDS_COVER) {
        cameras++; // the root has no parent
    }
    return cameras;
}

private static int walk(TreeNode node) {
    if (node == null) {
        return COVERED;
    }
    int left = walk(node.left);
    int right = walk(node.right);

    if (left == NEEDS_COVER || right == NEEDS_COVER) {
        cameras++;
        return HAS_CAMERA;
    }
    if (left == HAS_CAMERA || right == HAS_CAMERA) {
        return COVERED;
    }
    return NEEDS_COVER;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every node is visited once |
| **Space** | O(h) | The call stack mirrors the height of the tree |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if a camera also watches the whole subtree?"* → the states change and the
  greedy proof has to be redone.
- *"Place the cameras and return their positions."* → collect the nodes where you place
  a camera.
- *"What if you have a limited budget of k cameras?"* → the same DP with a budget, or
  the tree DP formulation \`dp[node][0..2]\` with three states and the number of cameras
  as the value.

**Common mistakes:**
- ❌ Forgetting the final check for the root → the root can be left unwatched.
- ❌ Returning \`NEEDS_COVER\` for a leaf that has a camera — the states must be
  consistent.
- ❌ Placing a camera as soon as a node is "not covered by a child" → you would place
  far too many cameras; the camera goes at the **parent**, where it also covers the
  siblings.

**How to narrate:**
> "I walk the tree bottom-up and every node reports one of three states: uncovered,
> has a camera, or covered. If one of my children is uncovered, I place a camera here
> — that's the last moment I can cover it, and a camera here also covers my other
> child. If a child has a camera, I'm covered. Otherwise I ask my parent to cover me.
> At the end I check the root, which has no parent. O(n) time."

## Related Problems

- [Balanced Binary Tree](./BalancedBinaryTree.java) — the same bottom-up walk
- [Diameter of Binary Tree](./DiameterOfBinaryTree.java) — post-order with global state
- [Binary Tree Level Order Traversal](./BinaryTreeLevelOrderTraversal.java) — the breadth-first alternative
`,i=[`minCameraCover`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};