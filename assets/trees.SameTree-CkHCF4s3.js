var e=`trees.SameTree`,t=`package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;

/**
 * Problem: Same Tree
 * LeetCode: 100 | Difficulty: Easy | Frequency: 5/5
 * Pattern: DFS, Structural comparison
 *
 * <p>Problem: Given the roots of two binary trees, check whether they are structurally
 * identical: same shape and same values at the same positions.
 *
 * <p>Input format (stdin):
 * <pre>
 * t1
 * v0 v1 ... v(t1-1)
 * t2
 * w0 w1 ... w(t2-1)
 * </pre>
 * Each tree is given in level order; {@code null} marks a missing child and the first
 * value of a block is that tree's root.
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 1 2 3 4
 * 4
 * 1 2 3 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: compare the two trees in lockstep. Two empty subtrees are equal, two
 * non-empty ones are equal when their values match and both children pairs are equal.
 * The moment one side is empty and the other is not, the trees differ.
 *
 * <p>Complexity: Time O(n), Space O(h).
 */
public class SameTree {

    /**
     * Checks whether two trees are structurally identical.
     *
     * @param p root of the first tree
     * @param q root of the second tree
     * @return {@code true} when the trees have the same shape and the same values
     */
    public static boolean isSameTree(TreeNode p, TreeNode q) {
        if (p == null && q == null) {
            return true;
        }
        if (p == null || q == null) {
            return false;
        }
        if (p.val != q.val) {
            return false;
        }
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
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
        TreeNode p = readTree(fs);
        TreeNode q = readTree(fs);

        System.out.println(isSameTree(p, q));
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
 * Problem: Same Tree
 * LeetCode: 100 | Difficulty: Easy | Frequency: 5/5
 * Pattern: DFS, Structural comparison
 *
 * <p>Problem: Given the roots of two binary trees, check whether they are structurally
 * identical: same shape and same values at the same positions.
 *
 * <p>Input format (stdin):
 * <pre>
 * t1
 * v0 v1 ... v(t1-1)
 * t2
 * w0 w1 ... w(t2-1)
 * </pre>
 * Each tree is given in level order; {@code null} marks a missing child and the first
 * value of a block is that tree's root.
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 1 2 3 4
 * 4
 * 1 2 3 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: compare the two trees in lockstep. Two empty subtrees are equal, two
 * non-empty ones are equal when their values match and both children pairs are equal.
 * The moment one side is empty and the other is not, the trees differ.
 *
 * <p>Complexity: Time O(n), Space O(h).
 */
public class Main {

    /**
     * Checks whether two trees are structurally identical.
     *
     * @param p root of the first tree
     * @param q root of the second tree
     * @return {@code true} when the trees have the same shape and the same values
     */
    public static boolean isSameTree(TreeNode p, TreeNode q) {
        if (p == null && q == null) {
            return true;
        }
        if (p == null || q == null) {
            return false;
        }
        if (p.val != q.val) {
            return false;
        }
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
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
        TreeNode p = readTree(fs);
        TreeNode q = readTree(fs);

        System.out.println(isSameTree(p, q));
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
# Same Tree — LeetCode 100

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | DFS · Structural comparison |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Given the roots of two binary trees, check whether they are **structurally identical**:
the same shape and the same values at the same positions.

## Input Format

The program reads from standard input:

\`\`\`
t1
v0 v1 ... v(t1-1)
t2
w0 w1 ... w(t2-1)
\`\`\`

- \`t1\`, \`t2\` — how many level-order tokens follow for each tree (\`0\` for an empty tree)
- the tokens — the node values in **level order**; \`null\` marks a missing child and the
  first token of a block is that tree's root

The sample compares two copies of

\`\`\`
  1
 / \\
2   3
/
4
\`\`\`

## Sample Input

\`\`\`
4
1 2 3 4
4
1 2 3 4
\`\`\`

## Expected Output

\`\`\`
true
\`\`\`

## Approach — compare in lockstep

The comparison has exactly three cases:

| situation | answer |
|---|---|
| both nodes are \`null\` | \`true\` — two empty subtrees match |
| exactly one node is \`null\` | \`false\` — the shapes differ |
| both nodes exist | their values must be equal **and** both child pairs must match |

\`\`\`java
if (p == null && q == null) return true;
if (p == null || q == null) return false;
if (p.val != q.val) return false;
return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
\`\`\`

The \`&&\` short-circuits: as soon as the left subtrees differ we never look at the
right ones.

## Dry Run

Input: tree A = \`1 2 3 4\`, tree B = \`1 2 3 4\`

| Step | call \`(p, q)\` | p | q | verdict | next call |
|---:|---|---:|---:|---|---|
| 1 | \`(A.root, B.root)\` | 1 | 1 | values equal → compare children | \`(2, 2)\` and \`(3, 3)\` |
| 2 | \`(2, 2)\` | 2 | 2 | values equal → compare children | \`(4, 4)\` and \`(null, null)\` |
| 3 | \`(4, 4)\` | 4 | 4 | values equal → compare children | \`(null, null)\` and \`(null, null)\` |
| 4 | \`(null, null)\` | — | — | both empty → **true** | — |
| 5 | \`(null, null)\` | — | — | both empty → **true** | — |
| 6 | \`(2, 2)\` | — | — | left pair true, right pair true → **true** | — |
| 7 | \`(3, 3)\` | 3 | 3 | values equal → compare children | \`(null, null)\` and \`(null, null)\` |
| 8 | \`(null, null)\` | — | — | both empty → **true** | — |
| 9 | \`(null, null)\` | — | — | both empty → **true** | — |
| 10 | \`(3, 3)\` | — | — | → **true** | — |
| 11 | \`(1, 1)\` | — | — | left true, right true → **true** | — |

### A failing case

Trees \`1 2 3\` and \`1 2\`: step 2 compares \`(2, 2)\` → true, then step 3 compares
\`(3, null)\` → one side is \`null\` → **false** in one line.

## Java Solution

See [\`SameTree.java\`](./SameTree.java).

\`\`\`java
public static boolean isSameTree(TreeNode p, TreeNode q) {
    if (p == null && q == null) {
        return true;
    }
    if (p == null || q == null) {
        return false;
    }
    if (p.val != q.val) {
        return false;
    }
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every pair of nodes is compared once |
| **Space** | O(h) | The call stack mirrors the height of the trees |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the values may be \`null\` as well?"* → use a sentinel or compare
  \`Objects.equals(p.val, q.val)\`.
- *"Compare two *serialised* trees."* → the same idea, but on the token lists.
- *"Can you do it iteratively?"* → yes, with two stacks or by pushing \`(p, q)\` pairs
  onto one stack.

**Common mistakes:**
- ❌ Checking \`p.val == q.val\` **before** the null checks → \`NullPointerException\`.
- ❌ Returning \`true\` when only one of the two nodes is \`null\` → the shapes differ.
- ❌ Using \`||\` instead of \`&&\` when combining the two child comparisons → the trees
  would match if *either* side matches.

**How to narrate:**
> "I walk both trees at the same time. If both are null they're equal; if exactly one is
> null the shapes differ; otherwise the values have to match and I recurse into both
> child pairs. It's O(n) with an O(h) stack."

## Related Problems

- [Symmetric Tree](./SymmetricTree.java) — the same comparison, mirrored
- [Subtree of Another Tree](./SubtreeOfAnotherTree.java) — the same comparison at every candidate root
- [Serialize and Deserialize Binary Tree](./SerializeAndDeserializeBinaryTree.java) — round-trips a tree
`,i=[`isSameTree`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};