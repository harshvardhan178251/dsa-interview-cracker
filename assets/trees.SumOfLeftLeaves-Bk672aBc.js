var e=`trees.SumOfLeftLeaves`,t=`package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;

/**
 * Problem: Sum of Left Leaves
 * LeetCode: 404 | Difficulty: Easy | Frequency: 3/5
 * Pattern: DFS, Recursion
 *
 * <p>Problem: Sum the values of all the leaves that are the left child of their parent.
 * A node that is the right child of its parent does not count, even when it is a leaf.
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
 * 4
 * </pre>
 * The tree is 1 -&gt; (2, 3) with 2 -&gt; (4, 5). The leaf 4 is a left child and counts,
 * the leaf 5 is a right child and does not, so the answer is 4.
 *
 * <p>Approach: a post-order walk that returns the sum of the left leaves of a subtree.
 * A node contributes its own value only when it is a leaf <i>and</i> it is the left
 * child of its parent.
 *
 * <p>Complexity: Time O(n), Space O(h).
 */
public class SumOfLeftLeaves {

    /**
     * Sums the values of the leaves that are left children.
     *
     * @param root root of the tree, may be {@code null}
     * @return the sum of the left leaves, 0 when there are none
     */
    public static int sumOfLeftLeaves(TreeNode root) {
        return sum(root, false);
    }

    /**
     * Returns the sum of the left leaves of the subtree.
     *
     * @param node    the root of the subtree
     * @param isLeft  whether {@code node} is the left child of its parent
     */
    private static int sum(TreeNode node, boolean isLeft) {
        if (node == null) {
            return 0;
        }
        if (node.left == null && node.right == null) {
            return isLeft ? node.val : 0;
        }
        return sum(node.left, true) + sum(node.right, false);
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

        System.out.println(sumOfLeftLeaves(root));
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
 * Problem: Sum of Left Leaves
 * LeetCode: 404 | Difficulty: Easy | Frequency: 3/5
 * Pattern: DFS, Recursion
 *
 * <p>Problem: Sum the values of all the leaves that are the left child of their parent.
 * A node that is the right child of its parent does not count, even when it is a leaf.
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
 * 4
 * </pre>
 * The tree is 1 -&gt; (2, 3) with 2 -&gt; (4, 5). The leaf 4 is a left child and counts,
 * the leaf 5 is a right child and does not, so the answer is 4.
 *
 * <p>Approach: a post-order walk that returns the sum of the left leaves of a subtree.
 * A node contributes its own value only when it is a leaf <i>and</i> it is the left
 * child of its parent.
 *
 * <p>Complexity: Time O(n), Space O(h).
 */
public class Main {

    /**
     * Sums the values of the leaves that are left children.
     *
     * @param root root of the tree, may be {@code null}
     * @return the sum of the left leaves, 0 when there are none
     */
    public static int sumOfLeftLeaves(TreeNode root) {
        return sum(root, false);
    }

    /**
     * Returns the sum of the left leaves of the subtree.
     *
     * @param node    the root of the subtree
     * @param isLeft  whether {@code node} is the left child of its parent
     */
    private static int sum(TreeNode node, boolean isLeft) {
        if (node == null) {
            return 0;
        }
        if (node.left == null && node.right == null) {
            return isLeft ? node.val : 0;
        }
        return sum(node.left, true) + sum(node.right, false);
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

        System.out.println(sumOfLeftLeaves(root));
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
# Sum of Left Leaves — LeetCode 404

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | DFS · Recursion |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta |

## Problem Statement

Sum the values of all the **leaves that are the left child** of their parent. A leaf
that is a right child does not count.

\`\`\`
    1
   / \\
  2   3
 / \\
4   5
\`\`\`

Only \`4\` is a left leaf — \`5\` is the right child of \`2\` — so the answer is \`4\`.

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
4
\`\`\`

## Approach — pass the "am I a left child?" flag down

The information "is this node a left child?" is **not** available inside the node
itself — it belongs to the edge that leads to it. So the recursion carries it as a
parameter:

\`\`\`java
private static int sum(TreeNode node, boolean isLeft) {
    if (node == null) {
        return 0;
    }
    if (node.left == null && node.right == null) {
        return isLeft ? node.val : 0;   // a leaf counts only when it is a left child
    }
    return sum(node.left, true) + sum(node.right, false);
}
\`\`\`

- the left child is always called with \`isLeft = true\`,
- the right child is always called with \`isLeft = false\`,
- the root is called with \`isLeft = false\` (it has no parent, so it cannot be a left
  leaf — but it is not a leaf anyway).

## Dry Run

Input: tree \`1 → (2, 3)\`, \`2 → (4, 5)\`

| Step | call | node | \`isLeft\` | leaf? | returned |
|---:|---|---:|---|---|---:|
| 1 | \`sum(1, false)\` | 1 | false | no | — |
| 2 | \`sum(2, true)\` | 2 | true | no | — |
| 3 | \`sum(4, true)\` | 4 | true | **yes** | \`4\` ✓ |
| 4 | \`sum(5, false)\` | 5 | false | **yes** | \`0\` (right leaf) |
| 5 | \`sum(2, true)\` | 2 | — | — | \`4 + 0\` = 4 |
| 6 | \`sum(3, false)\` | 3 | false | no | — |
| 7 | \`sum(null, true)\` | — | — | — | 0 |
| 8 | \`sum(null, false)\` | — | — | — | 0 |
| 9 | \`sum(3, false)\` | 3 | — | — | \`0 + 0\` = 0 |
| 10 | \`sum(1, false)\` | 1 | — | — | \`4 + 0\` = **4** ✓ |

### The case that catches people

\`\`\`
      1
     / \\
    2   3
   /
  4
\`\`\`

\`4\` is a left leaf and counts; \`3\` is a right child (and not a leaf) and does not.
The answer is \`4\`, not \`7\`.

## Java Solution

See [\`SumOfLeftLeaves.java\`](./SumOfLeftLeaves.java).

\`\`\`java
public static int sumOfLeftLeaves(TreeNode root) {
    return sum(root, false);
}

private static int sum(TreeNode node, boolean isLeft) {
    if (node == null) {
        return 0;
    }
    if (node.left == null && node.right == null) {
        return isLeft ? node.val : 0;
    }
    return sum(node.left, true) + sum(node.right, false);
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every node is visited once |
| **Space** | O(h) | The call stack mirrors the height of the tree |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Sum the left leaves of a binary **tree** (n-ary)."* → the same idea: the recursion
  takes the index of the child and counts index 0.
- *"Sum the right leaves."* → flip the flag.
- *"Sum the leaves of every subtree."* → the same walk, but you accumulate a map of
  subtree → sum.

**Common mistakes:**
- ❌ Forgetting to check that the node is a **leaf** → an inner node with a left child
  would be added even though it is not a leaf.
- ❌ Adding every leaf → the right leaves must be excluded.
- ❌ Passing \`true\` for the root → the root is not a left child of anything.

**How to narrate:**
> "Whether a node is a left child is a property of the edge, not of the node, so I pass
> it down as a flag. When I reach a leaf I add its value only if the flag says it is a
> left child. Everything else is a plain sum of the two subtrees. O(n) time."

## Related Problems

- [Binary Tree Paths](./BinaryTreePaths.java) — the same walk, building strings
- [Path Sum](./PathSum.java) — the "only leaves count" rule
- [Binary Tree Minimum Depth](./BinaryTreeMinimumDepth.java) — the same leaf rule
`,i=[`sumOfLeftLeaves`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};