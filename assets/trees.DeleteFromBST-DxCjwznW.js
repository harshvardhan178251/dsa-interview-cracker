var e=`trees.DeleteFromBST`,t=`package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;
import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Delete Node in a BST
 * LeetCode: 450 | Difficulty: Medium | Frequency: 4/5
 * Pattern: BST, Recursive descent
 *
 * <p>Problem: Delete a node with a given value from a binary search tree. When the node
 * has two children its value is replaced by its in-order successor (the smallest value
 * in its right subtree) and the successor is deleted instead.
 *
 * <p>Input format (stdin):
 * <pre>
 * t
 * v0 v1 ... v(t-1)
 * key
 * </pre>
 * The tree is given in level order; {@code null} marks a missing child and the first
 * value is the root. {@code key} is the value to delete.
 *
 * <p>Sample input:
 * <pre>
 * 7
 * 5 3 6 2 4 null 7
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 5 4 6 2 7
 * </pre>
 * The output lists the values of the resulting tree in level order (breadth first, left
 * to right); missing children are omitted.
 *
 * <p>Approach: descend like in a search. Once the node is found there are three cases:
 * no left child (return the right child), no right child (return the left child), or two
 * children (copy the in-order successor's value and delete that successor).
 *
 * <p>Complexity: Time O(h) for the descent plus O(h) for finding the successor.
 * Space O(h).
 */
public class DeleteFromBST {

    /**
     * Deletes {@code key} from the BST, modifying the tree in place.
     *
     * @param root root of the tree, may be {@code null}
     * @param key  the value to delete
     * @return the root of the remaining tree
     */
    public static TreeNode deleteNode(TreeNode root, int key) {
        if (root == null) {
            return null;
        }
        if (key < root.val) {
            root.left = deleteNode(root.left, key);
        } else if (key > root.val) {
            root.right = deleteNode(root.right, key);
        } else {
            if (root.left == null) {
                return root.right; // zero or one child
            }
            if (root.right == null) {
                return root.left;
            }
            // Two children: replace the value with the in-order successor.
            TreeNode successor = root.right;
            while (successor.left != null) {
                successor = successor.left;
            }
            root.val = successor.val;
            root.right = deleteNode(root.right, successor.val);
        }
        return root;
    }

    /**
     * Renders the values of a tree in level order (breadth first, left to right),
     * skipping the missing children.
     */
    public static String levelOrderValues(TreeNode root) {
        if (root == null) {
            return "";
        }
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        StringBuilder sb = new StringBuilder();
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            if (sb.length() > 0) {
                sb.append(' ');
            }
            sb.append(node.val);
            if (node.left != null) {
                queue.add(node.left);
            }
            if (node.right != null) {
                queue.add(node.right);
            }
        }
        return sb.toString();
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
        int key = fs.nextInt();

        TreeNode updated = deleteNode(root, key);
        System.out.println(levelOrderValues(updated));
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
 * Problem: Delete Node in a BST
 * LeetCode: 450 | Difficulty: Medium | Frequency: 4/5
 * Pattern: BST, Recursive descent
 *
 * <p>Problem: Delete a node with a given value from a binary search tree. When the node
 * has two children its value is replaced by its in-order successor (the smallest value
 * in its right subtree) and the successor is deleted instead.
 *
 * <p>Input format (stdin):
 * <pre>
 * t
 * v0 v1 ... v(t-1)
 * key
 * </pre>
 * The tree is given in level order; {@code null} marks a missing child and the first
 * value is the root. {@code key} is the value to delete.
 *
 * <p>Sample input:
 * <pre>
 * 7
 * 5 3 6 2 4 null 7
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 5 4 6 2 7
 * </pre>
 * The output lists the values of the resulting tree in level order (breadth first, left
 * to right); missing children are omitted.
 *
 * <p>Approach: descend like in a search. Once the node is found there are three cases:
 * no left child (return the right child), no right child (return the left child), or two
 * children (copy the in-order successor's value and delete that successor).
 *
 * <p>Complexity: Time O(h) for the descent plus O(h) for finding the successor.
 * Space O(h).
 */
public class Main {

    /**
     * Deletes {@code key} from the BST, modifying the tree in place.
     *
     * @param root root of the tree, may be {@code null}
     * @param key  the value to delete
     * @return the root of the remaining tree
     */
    public static TreeNode deleteNode(TreeNode root, int key) {
        if (root == null) {
            return null;
        }
        if (key < root.val) {
            root.left = deleteNode(root.left, key);
        } else if (key > root.val) {
            root.right = deleteNode(root.right, key);
        } else {
            if (root.left == null) {
                return root.right; // zero or one child
            }
            if (root.right == null) {
                return root.left;
            }
            // Two children: replace the value with the in-order successor.
            TreeNode successor = root.right;
            while (successor.left != null) {
                successor = successor.left;
            }
            root.val = successor.val;
            root.right = deleteNode(root.right, successor.val);
        }
        return root;
    }

    /**
     * Renders the values of a tree in level order (breadth first, left to right),
     * skipping the missing children.
     */
    public static String levelOrderValues(TreeNode root) {
        if (root == null) {
            return "";
        }
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        StringBuilder sb = new StringBuilder();
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            if (sb.length() > 0) {
                sb.append(' ');
            }
            sb.append(node.val);
            if (node.left != null) {
                queue.add(node.left);
            }
            if (node.right != null) {
                queue.add(node.right);
            }
        }
        return sb.toString();
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
        int key = fs.nextInt();

        TreeNode updated = deleteNode(root, key);
        System.out.println(levelOrderValues(updated));
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
# Delete Node in a BST — LeetCode 450

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | BST · Recursive descent |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Delete a node with a given value from a binary search tree. The remaining tree must
still be a valid BST.

\`\`\`
        5
       / \\
      3   6
     / \\   \\
    2   4   7
\`\`\`

Deleting \`3\` (which has two children) replaces it with its in-order successor \`4\`:

\`\`\`
        5
       / \\
      4   6
     /     \\
    2       7
\`\`\`

## Input Format

The program reads from standard input:

\`\`\`
t
v0 v1 ... v(t-1)
key
\`\`\`

- \`t\` — how many level-order tokens follow (\`0\` for an empty tree)
- the tokens — the node values in **level order**; \`null\` marks a missing child and the
  first token is the root
- \`key\` — the value to delete

The sample tree above is \`7\` followed by \`5 3 6 2 4 null 7\`.

## Sample Input

\`\`\`
7
5 3 6 2 4 null 7
3
\`\`\`

## Expected Output

\`\`\`
5 4 6 2 7
\`\`\`

The values of the remaining tree in **level order** (breadth first, left to right);
missing children are omitted.

## Approach — descend, then three cases

The search for the key is the familiar BST descent. Once the node is found there are
three cases:

| case | action |
|---|---|
| no left child | replace the node by its right child |
| no right child | replace the node by its left child |
| two children | copy the **in-order successor**'s value into the node, then delete that successor |

The in-order successor is the smallest value in the right subtree, found by walking
left from the right child. It has no left child, so deleting it is always the easy
case.

Copying the successor's *value* (instead of moving nodes) keeps the pointers of the
rest of the tree untouched.

## Dry Run

Input: tree \`5 → (3, 6)\`, \`3 → (2, 4)\`, \`6 → (null, 7)\`, delete \`key = 3\`

| Step | call | node.val | comparison | action | returned subtree |
|---:|---|---:|---|---|---|
| 1 | \`delete(5, 3)\` | 5 | \`3 < 5\` | \`5.left = delete(3, 3)\` | — |
| 2 | \`delete(3, 3)\` | 3 | \`3 == 3\` | found | — |
| 3 | — | — | — | two children → find the successor: \`3.right = 4\`, \`4.left == null\` → successor = \`4\` | — |
| 4 | — | — | — | \`3.val = 4\` (node becomes \`4\`) | — |
| 5 | \`delete(6, 4)\` | 6 | \`4 < 6\` | \`6.left = delete(null, 4)\` | — |
| 6 | \`delete(null, 4)\` | — | — | \`null\` → return \`null\` | \`null\` |
| 7 | \`delete(6, 4)\` | 6 | — | \`6.left = null\` (unchanged) | node \`6\` |
| 8 | \`delete(3, 3)\` | — | — | \`3.right = delete(4, 4)\` | — |
| 9 | \`delete(4, 4)\` | 4 | \`4 == 4\` | found, no left child → return \`4.right\` = \`null\` | \`null\` |
| 10 | \`delete(3, 3)\` | — | — | \`3.right = null\` | node \`4\` (left \`2\`, right \`null\`) |
| 11 | \`delete(5, 3)\` | — | — | \`5.left = node 4\` | node \`5\` |

Resulting tree:

\`\`\`
        5
       / \\
      4   6
     /     \\
    2       7
\`\`\`

Level order (missing children omitted): \`5 4 6 2 7\` ✓

## Java Solution

See [\`DeleteFromBST.java\`](./DeleteFromBST.java).

\`\`\`java
public static TreeNode deleteNode(TreeNode root, int key) {
    if (root == null) {
        return null;
    }
    if (key < root.val) {
        root.left = deleteNode(root.left, key);
    } else if (key > root.val) {
        root.right = deleteNode(root.right, key);
    } else {
        if (root.left == null) {
            return root.right;
        }
        if (root.right == null) {
            return root.left;
        }
        TreeNode successor = root.right;
        while (successor.left != null) {
            successor = successor.left;
        }
        root.val = successor.val;
        root.right = deleteNode(root.right, successor.val);
    }
    return root;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(h) | One descent to the node plus one descent to its successor |
| **Space** | O(h) | The call stack follows the same paths |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Why the in-order successor and not the predecessor?"* → both work; the successor
  keeps the values that are currently larger in the same relative position, the
  predecessor does the mirror of it.
- *"Delete a whole subtree."* → return \`null\` for that child; the same code handles it.
- *"What if the tree has duplicates?"* → decide whether the duplicates live in the left
  or the right subtree and stay consistent.

**Common mistakes:**
- ❌ Deleting a node with two children by simply returning one child → the other
  subtree is lost.
- ❌ Replacing the node with the **predecessor** but deleting it from the *left* subtree
  without handling its right child.
- ❌ Forgetting to re-assign the returned subtree (\`root.left = deleteNode(...)\`).
- ❌ Searching for the successor with \`root.right.right\` → you need the *leftmost* node
  of the right subtree.

**How to narrate:**
> "I descend like a normal BST search. Once I find the node there are three cases: no
> left child, no right child, or both. In the two-children case I copy the in-order
> successor's value into the node and delete the successor, which is the easy case
> because it has no left child. Only one path is walked, so O(h)."

## Related Problems

- [Insert into a Binary Search Tree](./InsertIntoBST.java) — the same descent
- [Search in a Binary Search Tree](./SearchInBST.java) — the same descent
- [Kth Smallest Element in a BST](./KthSmallestElementInBST.java) — in-order traversal
`,i=[`deleteNode`,`levelOrderValues`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};