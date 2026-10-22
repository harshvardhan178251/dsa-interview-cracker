var e=`trees.ZigzagLevelOrderTraversal`,t=`package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Deque;
import java.util.List;

/**
 * Problem: Zigzag Level Order Traversal
 * LeetCode: 103 | Difficulty: Medium | Frequency: 4/5
 * Pattern: BFS, Alternating direction
 *
 * <p>Problem: Return the node values of a binary tree level by level, but reverse the
 * order of every second level.
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
 * 20 9
 * 15 7
 * </pre>
 *
 * <p>Approach: a normal breadth-first walk collects each level from left to right. Every
 * second level is then reversed, which turns the left-to-right order into the required
 * right-to-left order.
 *
 * <p>Complexity: Time O(n), Space O(w) where w is the width of the tree.
 */
public class ZigzagLevelOrderTraversal {

    /**
     * Returns the levels of the tree, alternating between left-to-right and
     * right-to-left.
     *
     * @param root root of the tree, may be {@code null}
     * @return one list per level
     */
    public static List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        List<List<Integer>> levels = new ArrayList<>();
        if (root == null) {
            return levels;
        }
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        boolean leftToRight = true;

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
            if (!leftToRight) {
                Collections.reverse(level);
            }
            levels.add(level);
            leftToRight = !leftToRight;
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

        for (List<Integer> level : zigzagLevelOrder(root)) {
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
import java.util.Collections;
import java.util.Deque;
import java.util.List;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Zigzag Level Order Traversal
 * LeetCode: 103 | Difficulty: Medium | Frequency: 4/5
 * Pattern: BFS, Alternating direction
 *
 * <p>Problem: Return the node values of a binary tree level by level, but reverse the
 * order of every second level.
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
 * 20 9
 * 15 7
 * </pre>
 *
 * <p>Approach: a normal breadth-first walk collects each level from left to right. Every
 * second level is then reversed, which turns the left-to-right order into the required
 * right-to-left order.
 *
 * <p>Complexity: Time O(n), Space O(w) where w is the width of the tree.
 */
public class Main {

    /**
     * Returns the levels of the tree, alternating between left-to-right and
     * right-to-left.
     *
     * @param root root of the tree, may be {@code null}
     * @return one list per level
     */
    public static List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        List<List<Integer>> levels = new ArrayList<>();
        if (root == null) {
            return levels;
        }
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        boolean leftToRight = true;

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
            if (!leftToRight) {
                Collections.reverse(level);
            }
            levels.add(level);
            leftToRight = !leftToRight;
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

        for (List<Integer> level : zigzagLevelOrder(root)) {
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
# Zigzag Level Order Traversal — LeetCode 103

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | BFS · Alternating direction |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Return the node values of a binary tree level by level, but **reverse the order of
every second level**.

\`\`\`
        3
       / \\
      9   20
         /  \\
        15   7
\`\`\`

The answer is \`[[3], [20, 9], [15, 7]]\` — level 2 is printed right to left.

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
20 9
15 7
\`\`\`

One level per line.

## Approach — BFS, then reverse every second level

The traversal itself is the ordinary
[level order traversal](./BinaryTreeLevelOrderTraversal.java):
a queue, and the queue size at the start of the round tells you the size of the level.

The zigzag comes from a flag that flips after every level:

\`\`\`java
if (!leftToRight) {
    Collections.reverse(level);
}
leftToRight = !leftToRight;
\`\`\`

Reversing a level after it was collected left-to-right is much simpler than pushing the
children in the opposite order (which would need a stack or a different enqueue
discipline).

## Dry Run

Input: \`3 9 20 null null 15 7\`, direction flag starts at \`leftToRight = true\`

| Step | \`queue\` before | level collected | \`leftToRight\` before | reversed? | level emitted |
|---:|---|---|---|---|---|
| 1 | \`[3]\` | \`[3]\` | true | no | \`3\` |
| 2 | \`[9, 20]\` | \`[9, 20]\` | false | **yes** → \`[20, 9]\` | \`20 9\` |
| 3 | \`[20, 15, 7]\` (after the previous round) | \`[15, 7]\` | true | no | \`15 7\` |
| 4 | \`[]\` | — | — | — | queue empty → stop |

The flag after step 1 is \`false\`, after step 2 it is \`true\` again — so the levels
alternate \`L→R\`, \`R→L\`, \`L→R\`, …

### Why not enqueue the children in reverse order?

You could (push the right child first on every second level), but then the *children*
of the reversed level would be enqueued in the wrong order for the next level. The
"collect then reverse" approach keeps the enqueueing discipline constant, so the
direction flag is the only state you have to flip.

## Java Solution

See [\`ZigzagLevelOrderTraversal.java\`](./ZigzagLevelOrderTraversal.java).

\`\`\`java
public static List<List<Integer>> zigzagLevelOrder(TreeNode root) {
    List<List<Integer>> levels = new ArrayList<>();
    if (root == null) {
        return levels;
    }
    Deque<TreeNode> queue = new ArrayDeque<>();
    queue.add(root);
    boolean leftToRight = true;

    while (!queue.isEmpty()) {
        int levelSize = queue.size();
        List<Integer> level = new ArrayList<>(levelSize);
        for (int i = 0; i < levelSize; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        if (!leftToRight) {
            Collections.reverse(level);
        }
        levels.add(level);
        leftToRight = !leftToRight;
    }
    return levels;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every node is visited once; reversing a level is linear in its size |
| **Space** | O(w) | \`w\` = the width of the tree |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Print the zigzag traversal without building the lists."* → print each level as soon
> as it is complete; the reversal happens per level.
- *"Do it for a k-ary tree."* → the same idea, the level size is the number of children
> times the number of nodes.
- *"What if you only want every k-th level reversed?"* → replace the boolean flag with a
> counter.

**Common mistakes:**
- ❌ Reversing the **whole** result instead of every second level.
- ❌ Flipping the flag at the wrong place (before vs. after the level) → the first level
  would be reversed.
- ❌ Taking \`queue.size()\` inside the inner loop → the level never ends.

**How to narrate:**
> "It's the ordinary level-order traversal with one extra bit of state: a flag that
> tells me whether to print the current level left to right or right to left. I collect
> the level left to right as usual and reverse it when the flag says so, then flip the
> flag. O(n) time, O(w) space."

## Related Problems

- [Binary Tree Level Order Traversal](./BinaryTreeLevelOrderTraversal.java) — the same walk without the flag
- [Populating Next Right Pointers](./PopulateNextRightPointers.java) — links the nodes of each level
- [Binary Tree Paths](./BinaryTreePaths.java) — the depth-first counterpart
`,i=[`zigzagLevelOrder`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};