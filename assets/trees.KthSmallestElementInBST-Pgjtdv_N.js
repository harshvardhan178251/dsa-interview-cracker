var e=`trees.KthSmallestElementInBST`,t=`package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;
import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Kth Smallest Element in a BST
 * LeetCode: 230 | Difficulty: Medium | Frequency: 5/5
 * Pattern: BST, In-order iteration
 *
 * <p>Problem: Find the k-th smallest value in a binary search tree, where k is 1-based.
 *
 * <p>Input format (stdin):
 * <pre>
 * t
 * v0 v1 ... v(t-1)
 * k
 * </pre>
 * The tree is given in level order; {@code null} marks a missing child and the first
 * value is the root. {@code k} is the 1-based rank to report.
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 3 1 4 null 2
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: an in-order traversal of a BST visits the values in sorted order, so the
 * k-th node we pop off the stack is the answer. We stop as soon as we have counted k
 * values, which avoids traversing the rest of the tree.
 *
 * <p>Complexity: Time O(h + k) — at most k nodes are popped. Space O(h).
 */
public class KthSmallestElementInBST {

    /**
     * Returns the k-th smallest value in the BST.
     *
     * @param root root of the tree, may be {@code null}
     * @param k    1-based rank
     * @return the k-th smallest value
     */
    public static int kthSmallest(TreeNode root, int k) {
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode current = root;
        int remaining = k;

        while (current != null || !stack.isEmpty()) {
            while (current != null) {
                stack.push(current);
                current = current.left;
            }
            current = stack.pop();
            if (--remaining == 0) {
                return current.val;
            }
            current = current.right;
        }
        throw new IllegalArgumentException("k is out of range: " + k);
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
        int k = fs.nextInt();

        System.out.println(kthSmallest(root, k));
    }
}
`,n=`import java.io.IOException;
import java.util.ArrayDeque;
import java.util.Deque;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

/**
 * Problem: Kth Smallest Element in a BST
 * LeetCode: 230 | Difficulty: Medium | Frequency: 5/5
 * Pattern: BST, In-order iteration
 *
 * <p>Problem: Find the k-th smallest value in a binary search tree, where k is 1-based.
 *
 * <p>Input format (stdin):
 * <pre>
 * t
 * v0 v1 ... v(t-1)
 * k
 * </pre>
 * The tree is given in level order; {@code null} marks a missing child and the first
 * value is the root. {@code k} is the 1-based rank to report.
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 3 1 4 null 2
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: an in-order traversal of a BST visits the values in sorted order, so the
 * k-th node we pop off the stack is the answer. We stop as soon as we have counted k
 * values, which avoids traversing the rest of the tree.
 *
 * <p>Complexity: Time O(h + k) — at most k nodes are popped. Space O(h).
 */
public class Main {

    /**
     * Returns the k-th smallest value in the BST.
     *
     * @param root root of the tree, may be {@code null}
     * @param k    1-based rank
     * @return the k-th smallest value
     */
    public static int kthSmallest(TreeNode root, int k) {
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode current = root;
        int remaining = k;

        while (current != null || !stack.isEmpty()) {
            while (current != null) {
                stack.push(current);
                current = current.left;
            }
            current = stack.pop();
            if (--remaining == 0) {
                return current.val;
            }
            current = current.right;
        }
        throw new IllegalArgumentException("k is out of range: " + k);
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
        int k = fs.nextInt();

        System.out.println(kthSmallest(root, k));
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
# Kth Smallest Element in a BST — LeetCode 230

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | BST · In-order iteration |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg |

## Problem Statement

Find the **k-th smallest** value in a binary search tree (k is 1-based).

\`\`\`
    3
   / \\
  1   4
   \\
    2
\`\`\`

The in-order traversal is \`1 2 3 4\`, so the 2nd smallest value is \`2\`.

## Input Format

The program reads from standard input:

\`\`\`
t
v0 v1 ... v(t-1)
k
\`\`\`

- \`t\` — how many level-order tokens follow (\`0\` for an empty tree)
- the tokens — the node values in **level order**; \`null\` marks a missing child and the
  first token is the root
- \`k\` — the 1-based rank to report

The sample tree above is \`5\` followed by \`3 1 4 null 2\`.

## Sample Input

\`\`\`
5
3 1 4 null 2
2
\`\`\`

## Expected Output

\`\`\`
2
\`\`\`

## Approach — in-order, stop after k pops

The magic of a BST is that an **in-order** traversal visits the values in **sorted
order**. So the k-th smallest value is simply the k-th node the in-order traversal
visits.

Instead of collecting all the values we count them and stop as soon as the counter
reaches \`k\`:

\`\`\`java
while (current != null || !stack.isEmpty()) {
    while (current != null) {           // descend the left spine
        stack.push(current);
        current = current.left;
    }
    current = stack.pop();              // visit the next smallest value
    if (--remaining == 0) return current.val;
    current = current.right;           // and continue to the right
}
\`\`\`

This is the same loop as
[Binary Tree Inorder Traversal](./BinaryTreeInorderTraversal.java)
with a counter and an early exit.

**Complexity:** O(h + k) time — we only touch the first k nodes — and O(h) space.

## Dry Run

Input: tree \`3 → (1, 4)\`, \`1 → (null, 2)\`, k = 2

| Step | \`current\` | action | \`stack\` (bottom → top) | \`remaining\` | result |
|---:|---|---|---|---:|---|
| 1 | \`3\` | push 3, go left | \`[3]\` | 2 | — |
| 2 | \`1\` | push 1, go left | \`[3, 1]\` | 2 | — |
| 3 | \`null\` | spine ends, pop \`1\` | \`[3]\` | 2 → **1** | not the answer yet |
| 4 | \`1.right\` = \`2\` | go right, push 2, go left | \`[3, 2]\` | 1 | — |
| 5 | \`null\` | spine ends, pop \`2\` | \`[3]\` | 1 → **0** | **return 2** ✓ |

Only five steps were needed — the rest of the tree (\`4\`) was never visited.

### The full in-order sequence

Continuing the same walk without the early exit would visit \`1\`, \`2\`, \`3\`, \`4\` — the
sorted order of the values.

## Java Solution

See [\`KthSmallestElementInBST.java\`](./KthSmallestElementInBST.java).

\`\`\`java
public static int kthSmallest(TreeNode root, int k) {
    Deque<TreeNode> stack = new ArrayDeque<>();
    TreeNode current = root;
    int remaining = k;

    while (current != null || !stack.isEmpty()) {
        while (current != null) {
            stack.push(current);
            current = current.left;
        }
        current = stack.pop();
        if (--remaining == 0) {
            return current.val;
        }
        current = current.right;
    }
    throw new IllegalArgumentException("k is out of range: " + k);
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(h + k) | The left spine is walked once, then k nodes are visited |
| **Space** | O(h) | The stack holds at most one root-to-leaf path |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Find the k-th **largest** value."* → walk the tree in reverse in-order (right, node,
  left) and count the same way.
- *"How often is this query made?"* → if it is repeated, augment the tree with the size
  of each subtree and descend with a rank comparison — O(h) regardless of k.
- *"Do it with recursion."* → return the k-th smallest from the left subtree when it
  holds enough elements, otherwise look in the right subtree with a reduced k.

**Common mistakes:**
- ❌ Using \`k == 0\` after decrementing → the 1-based rank is off by one.
- ❌ Traversing in pre-order or level order → the values are not sorted that way.
- ❌ Not handling the case where \`k\` is larger than the number of nodes → the stack
  empties and the loop ends without a result.

**How to narrate:**
> "A BST's in-order traversal is sorted, so the k-th smallest is the k-th node in
> in-order. I'll run an iterative in-order walk with a counter and stop as soon as I
> have counted k values — that keeps it O(h + k) instead of O(n) and uses O(h) space."

## Related Problems

- [Binary Tree Inorder Traversal](./BinaryTreeInorderTraversal.java) — the walk without the counter
- [Lowest Common Ancestor of a BST](./LowestCommonAncestorOfBST.java) — the other classic BST question
- [Search in a Binary Search Tree](./SearchInBST.java) — a single-path descent
`,i=[`kthSmallest`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};