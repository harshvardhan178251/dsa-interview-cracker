var e=`trees.SubtreeOfAnotherTree`,t=`package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;

/**
 * Problem: Subtree of Another Tree
 * LeetCode: 572 | Difficulty: Easy | Frequency: 4/5
 * Pattern: DFS, Structural comparison
 *
 * <p>Problem: Check whether {@code subRoot} is a subtree of {@code root}: there must be
 * a node of {@code root} whose subtree is identical (same shape, same values) to
 * {@code subRoot}.
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
 * 5
 * 3 4 5 1 2
 * 3
 * 4 1 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: try every node of the big tree as the root of the candidate subtree and
 * compare it with the small tree using the same structural comparison as
 * {@code SameTree}. The first match wins.
 *
 * <p>Complexity: Time O(n * m) in the worst case, Space O(h).
 */
public class SubtreeOfAnotherTree {

    /**
     * Checks whether {@code subRoot} is a subtree of {@code root}.
     *
     * @param root    root of the big tree
     * @param subRoot root of the candidate subtree
     * @return {@code true} when the candidate occurs inside the big tree
     */
    public static boolean isSubtree(TreeNode root, TreeNode subRoot) {
        if (subRoot == null) {
            return true;
        }
        if (root == null) {
            return false;
        }
        if (isSame(root, subRoot)) {
            return true;
        }
        return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
    }

    /** Structural comparison of two subtrees. */
    private static boolean isSame(TreeNode a, TreeNode b) {
        if (a == null && b == null) {
            return true;
        }
        if (a == null || b == null) {
            return false;
        }
        if (a.val != b.val) {
            return false;
        }
        return isSame(a.left, b.left) && isSame(a.right, b.right);
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
        TreeNode subRoot = readTree(fs);

        System.out.println(isSubtree(root, subRoot));
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
 * Problem: Subtree of Another Tree
 * LeetCode: 572 | Difficulty: Easy | Frequency: 4/5
 * Pattern: DFS, Structural comparison
 *
 * <p>Problem: Check whether {@code subRoot} is a subtree of {@code root}: there must be
 * a node of {@code root} whose subtree is identical (same shape, same values) to
 * {@code subRoot}.
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
 * 5
 * 3 4 5 1 2
 * 3
 * 4 1 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: try every node of the big tree as the root of the candidate subtree and
 * compare it with the small tree using the same structural comparison as
 * {@code SameTree}. The first match wins.
 *
 * <p>Complexity: Time O(n * m) in the worst case, Space O(h).
 */
public class Main {

    /**
     * Checks whether {@code subRoot} is a subtree of {@code root}.
     *
     * @param root    root of the big tree
     * @param subRoot root of the candidate subtree
     * @return {@code true} when the candidate occurs inside the big tree
     */
    public static boolean isSubtree(TreeNode root, TreeNode subRoot) {
        if (subRoot == null) {
            return true;
        }
        if (root == null) {
            return false;
        }
        if (isSame(root, subRoot)) {
            return true;
        }
        return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
    }

    /** Structural comparison of two subtrees. */
    private static boolean isSame(TreeNode a, TreeNode b) {
        if (a == null && b == null) {
            return true;
        }
        if (a == null || b == null) {
            return false;
        }
        if (a.val != b.val) {
            return false;
        }
        return isSame(a.left, b.left) && isSame(a.right, b.right);
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
        TreeNode subRoot = readTree(fs);

        System.out.println(isSubtree(root, subRoot));
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
# Subtree of Another Tree — LeetCode 572

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | DFS · Structural comparison |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Check whether \`subRoot\` is a **subtree** of \`root\`: there must be a node of \`root\`
whose subtree is identical (same shape, same values) to \`subRoot\`.

\`\`\`
    3
   / \\
  4   5
 / \\
1   2
\`\`\`

The tree \`4 → (1, 2)\` is the left subtree of \`3\`, so the answer is \`true\`.

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

The sample compares

\`\`\`
    3              4
   / \\            / \\
  4   5    vs    1   2
 / \\
1   2
\`\`\`

## Sample Input

\`\`\`
5
3 4 5 1 2
3
4 1 2
\`\`\`

## Expected Output

\`\`\`
true
\`\`\`

## Approach — try every node as the root of the candidate

The subtree of \`root\` rooted at some node is a candidate; we simply test all of them.

\`\`\`java
public static boolean isSubtree(TreeNode root, TreeNode subRoot) {
    if (subRoot == null) return true;
    if (root == null) return false;
    if (isSame(root, subRoot)) return true;
    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}
\`\`\`

\`isSame\` is exactly the structural comparison of
[Same Tree](./SameTree.java): same shape, same values.

The recursion explores the big tree; \`isSame\` explores the candidate. The \`||\`
short-circuits as soon as one place matches.

## Dry Run

Input: root = \`3 → (4, 5)\`, \`4 → (1, 2)\`; subRoot = \`4 → (1, 2)\`

| Step | call | node | \`isSame(node, subRoot)\` | verdict |
|---:|---|---:|---|---|
| 1 | \`isSubtree(3, 4)\` | 3 | \`3.val != 4.val\` → false | try the children |
| 2 | \`isSubtree(4, 4)\` | 4 | values equal → compare the children | — |
| 3 | \`isSame(4, 4)\` | 4 | — | \`4 == 4\` → compare \`(1,1)\` and \`(2,2)\` |
| 4 | \`isSame(1, 1)\` | 1 | — | values equal → \`(null, null)\` twice → **true** |
| 5 | \`isSame(2, 2)\` | 2 | — | values equal → \`(null, null)\` twice → **true** |
| 6 | \`isSame(4, 4)\` | — | — | both children matched → **true** |
| 7 | \`isSubtree(4, 4)\` | — | — | → **true** ✓ |

The right subtree of \`3\` (the node \`5\`) is never visited — the \`||\` short-circuits.

### A failing case

root = \`1 2 3\`, subRoot = \`1 2 3\` as well, but with a different shape — say
\`subRoot = 1 → (2, null)\`: step 1 compares \`1 == 1\` → then \`isSame(2, 2)\` → true,
but \`isSame(3, null)\` → one side is \`null\` → **false**. The whole comparison fails, and
the recursion continues with the children of \`1\`.

## Java Solution

See [\`SubtreeOfAnotherTree.java\`](./SubtreeOfAnotherTree.java).

\`\`\`java
public static boolean isSubtree(TreeNode root, TreeNode subRoot) {
    if (subRoot == null) {
        return true;
    }
    if (root == null) {
        return false;
    }
    if (isSame(root, subRoot)) {
        return true;
    }
    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}

private static boolean isSame(TreeNode a, TreeNode b) {
    if (a == null && b == null) return true;
    if (a == null || b == null) return false;
    if (a.val != b.val) return false;
    return isSame(a.left, b.left) && isSame(a.right, b.right);
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n · m) | In the worst case every node of the big tree is compared with the whole candidate |
| **Space** | O(h) | The call stack; the two recursions share it |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it in O(n + m)?"* → yes: serialise both trees (with the \`null\`
  markers) and use the **KMP** string-matching algorithm to look for the candidate
  inside the big tree — the classic trick.
- *"What if the values may repeat?"* → the serialise-and-match trick still works; the
  naive version does too, it is just slower.
- *"What if the trees are huge and you get many queries?"* → serialise the big tree
  once and reuse it for every candidate.

**Common mistakes:**
- ❌ Comparing only the **values** and not the shape → \`1 → (2, 3)\` and \`1 → (3, 2)\`
  would be "equal".
- ❌ Checking the children of the candidate against the children of the *root* of the
  big tree instead of against the candidate's own children.
- ❌ Forgetting the empty-tree cases.

**How to narrate:**
> "The candidate has to match at one of the nodes of the big tree, so I walk the big
> tree and at every node run the same structural comparison I use for two identical
> trees. It's O(n·m) worst case; if I need better I would serialise both trees and use
> KMP to find the candidate inside the bigger string."

## Related Problems

- [Same Tree](./SameTree.java) — the comparison itself
- [Symmetric Tree](./SymmetricTree.java) — the mirrored comparison
- [Serialize and Deserialize Binary Tree](./SerializeAndDeserializeBinaryTree.java) — the O(n + m) trick's building block
`,i=[`isSubtree`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};