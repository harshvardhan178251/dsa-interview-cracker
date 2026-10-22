var e=`trees.SearchInBST`,t=`package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;

/**
 * Problem: Search in a Binary Search Tree
 * LeetCode: 700 | Difficulty: Easy | Frequency: 4/5
 * Pattern: BST, Iterative descent
 *
 * <p>Problem: Search for a target value in a binary search tree.
 *
 * <p>Input format (stdin):
 * <pre>
 * t
 * v0 v1 ... v(t-1)
 * target
 * </pre>
 * The tree is given in level order; {@code null} marks a missing child and the first
 * value is the root. {@code target} is the value to look for.
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 4 2 7 1 3
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: the BST ordering means only one branch can contain the target. Compare
 * the target with the current node: if it is smaller go left, if it is bigger go right,
 * if it is equal we are done. An empty subtree ends the search.
 *
 * <p>Complexity: Time O(h) — at most one path is walked. Space O(1) with the iterative
 * version, O(h) with the recursive one.
 */
public class SearchInBST {

    /**
     * Searches the BST for {@code target}.
     *
     * @param root   root of the tree, may be {@code null}
     * @param target the value to look for
     * @return {@code true} when the value is present
     */
    public static boolean searchBST(TreeNode root, int target) {
        TreeNode current = root;
        while (current != null) {
            if (current.val == target) {
                return true;
            }
            current = target < current.val ? current.left : current.right;
        }
        return false;
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
        int target = fs.nextInt();

        System.out.println(searchBST(root, target));
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
 * Problem: Search in a Binary Search Tree
 * LeetCode: 700 | Difficulty: Easy | Frequency: 4/5
 * Pattern: BST, Iterative descent
 *
 * <p>Problem: Search for a target value in a binary search tree.
 *
 * <p>Input format (stdin):
 * <pre>
 * t
 * v0 v1 ... v(t-1)
 * target
 * </pre>
 * The tree is given in level order; {@code null} marks a missing child and the first
 * value is the root. {@code target} is the value to look for.
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 4 2 7 1 3
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: the BST ordering means only one branch can contain the target. Compare
 * the target with the current node: if it is smaller go left, if it is bigger go right,
 * if it is equal we are done. An empty subtree ends the search.
 *
 * <p>Complexity: Time O(h) — at most one path is walked. Space O(1) with the iterative
 * version, O(h) with the recursive one.
 */
public class Main {

    /**
     * Searches the BST for {@code target}.
     *
     * @param root   root of the tree, may be {@code null}
     * @param target the value to look for
     * @return {@code true} when the value is present
     */
    public static boolean searchBST(TreeNode root, int target) {
        TreeNode current = root;
        while (current != null) {
            if (current.val == target) {
                return true;
            }
            current = target < current.val ? current.left : current.right;
        }
        return false;
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
        int target = fs.nextInt();

        System.out.println(searchBST(root, target));
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
# Search in a Binary Search Tree — LeetCode 700

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | BST · Iterative descent |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta |

## Problem Statement

Search for a target value in a binary search tree. Return whether the value is present.

\`\`\`
    4
   / \\
  2   7
 / \\
1   3
\`\`\`

Searching for \`2\` walks \`4 → 2\` and stops.

## Input Format

The program reads from standard input:

\`\`\`
t
v0 v1 ... v(t-1)
target
\`\`\`

- \`t\` — how many level-order tokens follow (\`0\` for an empty tree)
- the tokens — the node values in **level order**; \`null\` marks a missing child and the
  first token is the root
- \`target\` — the value to look for

The sample tree above is \`5\` followed by \`4 2 7 1 3\`.

## Sample Input

\`\`\`
5
4 2 7 1 3
2
\`\`\`

## Expected Output

\`\`\`
true
\`\`\`

## Approach — only one branch can hold the target

At every node the BST ordering eliminates half of the remaining tree:

\`\`\`java
while (current != null) {
    if (current.val == target) return true;
    current = target < current.val ? current.left : current.right;
}
return false;
\`\`\`

The loop ends in one of two ways: we found the value, or we walked off the tree
(\`current == null\`). There is no need to look at the other subtree — the ordering
guarantees the target is not there.

This is the same descent as
[Insert into a Binary Search Tree](./InsertIntoBST.java),
without the modification.

## Dry Run

Input: tree \`4 → (2, 7)\`, \`2 → (1, 3)\`, target \`2\`

| Step | \`current\` | \`current.val\` | comparison | next \`current\` |
|---:|---|---:|---|---|
| 1 | \`4\` | 4 | \`2 < 4\` → go left | node \`2\` |
| 2 | \`2\` | 2 | \`2 == 2\` → **found** | — |

Result: \`true\`

### A failed search — target \`5\`

| Step | \`current\` | \`current.val\` | comparison | next \`current\` |
|---:|---|---:|---|---|
| 1 | \`4\` | 4 | \`5 > 4\` → go right | node \`7\` |
| 2 | \`7\` | 7 | \`5 < 7\` → go left | \`null\` |
| 3 | \`null\` | — | loop ends | — |

Result: \`false\` — and note that the subtree \`2 → (1, 3)\` was never visited, because
every value in it is smaller than \`4\`.

## Java Solution

See [\`SearchInBST.java\`](./SearchInBST.java).

\`\`\`java
public static boolean searchBST(TreeNode root, int target) {
    TreeNode current = root;
    while (current != null) {
        if (current.val == target) {
            return true;
        }
        current = target < current.val ? current.left : current.right;
    }
    return false;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(h) | Only one root-to-leaf path is walked |
| **Space** | O(1) | The iterative version needs a single pointer |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Find the k-th smallest element."* → the same descent, but with an in-order
  traversal: see [Kth Smallest Element in a BST](./KthSmallestElementInBST.java).
- *"Find the floor and the ceiling of a target."* → keep the last node that was ≤ (≥)
  the target while you descend.
- *"What if the tree is not a BST?"* → you must search both subtrees, O(n).

**Common mistakes:**
- ❌ Searching **both** subtrees → throws away the whole point of the BST.
- ❌ Comparing with \`>=\` / \`<=\` instead of \`==\` → the target may live in either subtree.
- ❌ Forgetting the \`null\` check in the loop condition → \`NullPointerException\`.

**How to narrate:**
> "Because the tree is sorted, each comparison eliminates one whole subtree, so the
> search follows a single path down the tree. I compare, go left or right accordingly,
> and stop when I either find the value or fall off the tree. O(h) time and O(1)
> space."

## Related Problems

- [Insert into a Binary Search Tree](./InsertIntoBST.java) — the same descent
- [Delete Node in a BST](./DeleteFromBST.java) — the same descent with three cases
- [Kth Smallest Element in a BST](./KthSmallestElementInBST.java) — in-order traversal
`,i=[`searchBST`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};