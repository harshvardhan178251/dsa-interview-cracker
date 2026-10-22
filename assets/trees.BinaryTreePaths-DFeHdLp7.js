var e=`trees.BinaryTreePaths`,t=`package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Problem: Binary Tree Paths
 * LeetCode: 257 | Difficulty: Easy | Frequency: 4/5
 * Pattern: DFS, Backtracking
 *
 * <p>Problem: Return all root-to-leaf paths of a binary tree. A path is written as the
 * node values joined by {@code ->}, for example {@code 1->2->5}.
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
 * 1 2 3 null 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1->2->5
 * 1->3
 * </pre>
 *
 * <p>Approach: a depth-first walk that keeps the current path in a string builder. On
 * reaching a leaf the builder holds a complete path and is copied into the result. When
 * the walk returns from a subtree the builder is truncated back to the length it had
 * before that subtree was entered.
 *
 * <p>Complexity: Time O(n^2) in the worst case — the paths of a skewed tree are O(n)
 * long each. Space O(h) for the builder plus the output.
 */
public class BinaryTreePaths {

    /**
     * Returns every root-to-leaf path of the tree.
     *
     * @param root root of the tree, may be {@code null}
     * @return the paths in depth-first (left subtree first) order
     */
    public static List<String> binaryTreePaths(TreeNode root) {
        List<String> paths = new ArrayList<>();
        walk(root, new StringBuilder(), paths);
        return paths;
    }

    /** Depth-first walk that appends to (and truncates) {@code path}. */
    private static void walk(TreeNode node, StringBuilder path, List<String> paths) {
        if (node == null) {
            return;
        }
        int mark = path.length();
        if (mark > 0) {
            path.append("->");
        }
        path.append(node.val);

        if (node.left == null && node.right == null) {
            paths.add(path.toString());
        } else {
            walk(node.left, path, paths);
            walk(node.right, path, paths);
        }
        path.setLength(mark); // backtrack
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

        for (String path : binaryTreePaths(root)) {
            System.out.println(path);
        }
    }
}
`,n=`import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Binary Tree Paths
 * LeetCode: 257 | Difficulty: Easy | Frequency: 4/5
 * Pattern: DFS, Backtracking
 *
 * <p>Problem: Return all root-to-leaf paths of a binary tree. A path is written as the
 * node values joined by {@code ->}, for example {@code 1->2->5}.
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
 * 1 2 3 null 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1->2->5
 * 1->3
 * </pre>
 *
 * <p>Approach: a depth-first walk that keeps the current path in a string builder. On
 * reaching a leaf the builder holds a complete path and is copied into the result. When
 * the walk returns from a subtree the builder is truncated back to the length it had
 * before that subtree was entered.
 *
 * <p>Complexity: Time O(n^2) in the worst case — the paths of a skewed tree are O(n)
 * long each. Space O(h) for the builder plus the output.
 */
public class Main {

    /**
     * Returns every root-to-leaf path of the tree.
     *
     * @param root root of the tree, may be {@code null}
     * @return the paths in depth-first (left subtree first) order
     */
    public static List<String> binaryTreePaths(TreeNode root) {
        List<String> paths = new ArrayList<>();
        walk(root, new StringBuilder(), paths);
        return paths;
    }

    /** Depth-first walk that appends to (and truncates) {@code path}. */
    private static void walk(TreeNode node, StringBuilder path, List<String> paths) {
        if (node == null) {
            return;
        }
        int mark = path.length();
        if (mark > 0) {
            path.append("->");
        }
        path.append(node.val);

        if (node.left == null && node.right == null) {
            paths.add(path.toString());
        } else {
            walk(node.left, path, paths);
            walk(node.right, path, paths);
        }
        path.setLength(mark); // backtrack
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

        for (String path : binaryTreePaths(root)) {
            System.out.println(path);
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
# Binary Tree Paths — LeetCode 257

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | DFS · Backtracking |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta |

## Problem Statement

Return every **root-to-leaf path** of a binary tree. A path is written as the node
values joined by \`->\`.

\`\`\`
    1
   / \\
  2   3
   \\
    5
\`\`\`

The paths are \`1->2->5\` and \`1->3\`.

## Input Format

The program reads from standard input:

\`\`\`
t
v0 v1 ... v(t-1)
\`\`\`

- \`t\` — how many level-order tokens follow (\`0\` for an empty tree)
- the tokens — the node values in **level order**; \`null\` marks a missing child and the
  first token is the root

The sample tree above is \`5\` followed by \`1 2 3 null 5\`.

## Sample Input

\`\`\`
5
1 2 3 null 5
\`\`\`

## Expected Output

\`\`\`
1->2->5
1->3
\`\`\`

One path per line, in depth-first order (the left subtree first).

## Approach — one builder, truncated on the way back

A single \`StringBuilder\` holds the path of the current branch:

1. Remember how long the builder was (\`mark\`).
2. Append \`->\` (except at the root) and the node's value.
3. If the node is a leaf, copy the builder into the result.
4. Otherwise recurse into the left and the right child.
5. **Truncate** the builder back to \`mark\` — this is the backtracking step.

Truncating (instead of building a new string per call) keeps the whole walk O(n) for
the traversal itself.

\`\`\`java
private static void walk(TreeNode node, StringBuilder path, List<String> paths) {
    if (node == null) return;
    int mark = path.length();
    if (mark > 0) path.append("->");
    path.append(node.val);
    if (node.left == null && node.right == null) {
        paths.add(path.toString());
    } else {
        walk(node.left, path, paths);
        walk(node.right, path, paths);
    }
    path.setLength(mark);
}
\`\`\`

## Dry Run

Input: tree \`1 → (2, 3)\`, \`2 → (null, 5)\`

| Step | call | node | \`path\` before | action | \`path\` after | \`paths\` |
|---:|---|---:|---|---|---|---|
| 1 | \`walk(1)\` | 1 | \`\` | append \`1\` (mark = 0) | \`1\` | — |
| 2 | \`walk(2)\` | 2 | \`1\` | append \`->2\` (mark = 1) | \`1->2\` | — |
| 3 | \`walk(null)\` | — | \`1->2\` | nothing to do | \`1->2\` | — |
| 4 | \`walk(5)\` | 5 | \`1->2\` | append \`->5\` (mark = 4) | \`1->2->5\` | — |
| 5 | \`walk(5)\` | — | — | leaf → add \`"1->2->5"\` | — | \`[1->2->5]\` |
| 6 | \`walk(2)\` | — | — | truncate to mark 1 → \`1\` | \`1\` | — |
| 7 | \`walk(3)\` | 3 | \`1\` | append \`->3\` (mark = 1) | \`1->3\` | — |
| 8 | \`walk(3)\` | — | — | leaf → add \`"1->3"\` | — | \`[1->2->5, 1->3]\` |
| 9 | \`walk(1)\` | — | — | truncate to mark 0 → \`\` | \`\` | — |

The \`mark\` column is the key: it is the length the builder must have **before** the
node was appended, so the truncation removes exactly that node's contribution (and its
separator).

## Java Solution

See [\`BinaryTreePaths.java\`](./BinaryTreePaths.java).

\`\`\`java
public static List<String> binaryTreePaths(TreeNode root) {
    List<String> paths = new ArrayList<>();
    walk(root, new StringBuilder(), paths);
    return paths;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n²) | The output itself is quadratic: a skewed tree has O(n) paths of O(n) length |
| **Space** | O(h) | The builder holds one root-to-leaf path; the output is extra |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Only print the paths that sum to a target."* → keep a running sum next to the
  builder.
- *"Do it without a global list."* → return the list from the recursion and merge the
  two children's lists.
- *"How would you stream the paths?"* → the builder already is the stream; print it at
  every leaf instead of collecting.

**Common mistakes:**
- ❌ Forgetting to truncate the builder after the recursive calls → the second path
  contains the first one (\`1->2->5->3\`).
- ❌ Truncating to the wrong length → use the \`mark\` you saved, not \`path.length() - 1\`
  (that would remove the separator but keep the digits).
- ❌ Adding a path at every node instead of only at the leaves.

**How to narrate:**
> "I keep the current path in a string builder. I remember its length before I append
> the node, recurse, and then truncate the builder back to that length — that is the
> backtracking. At a leaf the builder holds a complete path and I copy it into the
> result. The traversal is O(n); the output is what makes it O(n²)."

## Related Problems

- [Path Sum](./PathSum.java) — the same walk with a running sum
- [Binary Tree Inorder Traversal](./BinaryTreeInorderTraversal.java) — the same walk without the builder
- [Count Paths With Given Sum](./CountPathsWithGivenSum.java) — counts instead of printing
`,i=[`binaryTreePaths`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};