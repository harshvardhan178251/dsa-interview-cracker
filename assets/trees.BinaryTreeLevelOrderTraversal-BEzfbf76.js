var e=`trees.BinaryTreeLevelOrderTraversal`,t=`package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

/**
 * Problem: Binary Tree Level Order Traversal
 * LeetCode: 102 | Difficulty: Medium | Frequency: 5/5
 * Pattern: BFS, Queue
 *
 * <p>Problem: Given the root of a binary tree, return the values of its nodes level by
 * level, from left to right, top to bottom.
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
 * 9 20
 * 15 7
 * </pre>
 *
 * <p>Approach: a FIFO queue gives breadth-first order for free. The queue always holds
 * exactly the nodes of the level being processed plus the children of the nodes already
 * taken out. We remember the queue size at the start of each round — that count is the
 * number of nodes on the current level — and process only that many nodes.
 *
 * <p>Complexity: Time O(n), Space O(w) where w is the width of the tree.
 */
public class BinaryTreeLevelOrderTraversal {

    /**
     * Returns the nodes of the tree grouped by level, top to bottom.
     *
     * @param root root of the tree, may be {@code null}
     * @return one list per level, each list left to right
     */
    public static List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> levels = new ArrayList<>();
        if (root == null) {
            return levels;
        }
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> level = new ArrayList<>(levelSize);
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                level.add(node.val);
                if (node.left != null) {
                    queue.add(node.left);
                }
                if (node.right != null) {
                    queue.add(node.right);
                }
            }
            levels.add(level);
        }
        return levels;
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

        for (List<Integer> level : levelOrder(root)) {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < level.size(); i++) {
                if (i > 0) {
                    sb.append(' ');
                }
                sb.append(level.get(i));
            }
            System.out.println(sb);
        }
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
 * Problem: Binary Tree Level Order Traversal
 * LeetCode: 102 | Difficulty: Medium | Frequency: 5/5
 * Pattern: BFS, Queue
 *
 * <p>Problem: Given the root of a binary tree, return the values of its nodes level by
 * level, from left to right, top to bottom.
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
 * 9 20
 * 15 7
 * </pre>
 *
 * <p>Approach: a FIFO queue gives breadth-first order for free. The queue always holds
 * exactly the nodes of the level being processed plus the children of the nodes already
 * taken out. We remember the queue size at the start of each round — that count is the
 * number of nodes on the current level — and process only that many nodes.
 *
 * <p>Complexity: Time O(n), Space O(w) where w is the width of the tree.
 */
public class Main {

    /**
     * Returns the nodes of the tree grouped by level, top to bottom.
     *
     * @param root root of the tree, may be {@code null}
     * @return one list per level, each list left to right
     */
    public static List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> levels = new ArrayList<>();
        if (root == null) {
            return levels;
        }
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> level = new ArrayList<>(levelSize);
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                level.add(node.val);
                if (node.left != null) {
                    queue.add(node.left);
                }
                if (node.right != null) {
                    queue.add(node.right);
                }
            }
            levels.add(level);
        }
        return levels;
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

        for (List<Integer> level : levelOrder(root)) {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < level.size(); i++) {
                if (i > 0) {
                    sb.append(' ');
                }
                sb.append(level.get(i));
            }
            System.out.println(sb);
        }
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
# Binary Tree Level Order Traversal — LeetCode 102

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | BFS · Queue |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg |

## Problem Statement

Given the root of a binary tree, return the values of its nodes **level by level**,
from left to right, top to bottom.

For the tree

\`\`\`
        3
       / \\
      9   20
         /  \\
        15   7
\`\`\`

the answer is \`[[3], [9, 20], [15, 7]]\`.

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
9 20
15 7
\`\`\`

One line per level.

## Approach — BFS with a queue

A FIFO queue visits nodes in breadth-first order for free: the queue always holds the
nodes that are waiting to be visited, and they come out in the order they were added.

The only subtlety is **knowing where one level ends**. The trick: remember the size of
the queue *before* you start the level.

\`\`\`text
levelSize = queue.size()      // how many nodes are on this level
repeat levelSize times:
    poll one node, emit it, enqueue its children
\`\`\`

Because you only enqueue children of the nodes you remove, and you remove exactly
\`levelSize\` nodes, the children of the next level cannot leak into the current one.

## Dry Run

Input: \`3 9 20 null null 15 7\`

| Step | \`queue\` before | \`levelSize\` | node polled | \`queue\` after | level collected |
|---:|---|---:|---|---|---|
| 1 | \`[3]\` | 1 | \`3\` | \`[9, 20]\` | \`[3]\` |
| 2 | \`[9, 20]\` | 2 | \`9\` | \`[20, 15]\` | \`[9]\` |
| 3 | \`[20, 15]\` | 2 | \`20\` | \`[15, 7]\` | \`[9, 20]\` |
| 4 | \`[15, 7]\` | 2 | \`15\` | \`[7]\` | \`[15, 7]\` |
| 5 | \`[7]\` | 1 | \`7\` | \`[]\` | \`[15, 7]\` |
| 6 | \`[]\` | — | — | — | queue empty → stop |

Note how the queue never contains a \`null\`: children are only enqueued when they exist.

## Java Solution

See [\`BinaryTreeLevelOrderTraversal.java\`](./BinaryTreeLevelOrderTraversal.java).

\`\`\`java
public static List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> levels = new ArrayList<>();
    if (root == null) {
        return levels;
    }
    Deque<TreeNode> queue = new ArrayDeque<>();
    queue.add(root);

    while (!queue.isEmpty()) {
        int levelSize = queue.size();
        List<Integer> level = new ArrayList<>(levelSize);
        for (int i = 0; i < levelSize; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        levels.add(level);
    }
    return levels;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every node is enqueued and dequeued once |
| **Space** | O(w) | \`w\` = the width of the tree; the queue never holds more than a level and the next one |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Return the level order bottom-up."* → reverse the list of levels at the end.
- *"Do it without a queue."* → you can use a \`List\` as the queue with an index pointer,
  but that is the same algorithm with more bookkeeping.
- *"How would you do it if the tree were huge (millions of nodes)?"* → BFS needs O(w)
  memory; DFS with an explicit stack is O(h) and is the better choice for a deep tree.

**Common mistakes:**
- ❌ Taking \`queue.size()\` **inside** the inner loop → the level never ends and you loop
  forever.
- ❌ Enqueueing \`null\` children → the queue fills with nulls and \`ArrayDeque\` throws.
- ❌ Forgetting that the children of the *current* level belong to the *next* level.

**How to narrate:**
> "This is a textbook BFS. The queue gives me the breadth-first order; the only thing I
> have to add is a marker for the end of a level. I snapshot the queue size at the
> start of the level and process exactly that many nodes, so the children I enqueue
> belong to the next level. Time O(n), space O(w)."

## Related Problems

- [Zigzag Level Order Traversal](./ZigzagLevelOrderTraversal.java) — reverse every second level
- [Binary Tree Cameras](./BinaryTreeCameras.java) — BFS with a state machine
- [Serialize and Deserialize Binary Tree](./SerializeAndDeserializeBinaryTree.java) — level order as an encoding
`,i=[`levelOrder`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};