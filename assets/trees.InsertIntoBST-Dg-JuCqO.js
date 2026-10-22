var e=`trees.InsertIntoBST`,t=`package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;
import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Insert into a Binary Search Tree
 * LeetCode: 701 | Difficulty: Medium | Frequency: 4/5
 * Pattern: BST, Recursive descent
 *
 * <p>Problem: Insert a value into a binary search tree. If the value is already present
 * nothing changes; otherwise it becomes a new leaf.
 *
 * <p>Input format (stdin):
 * <pre>
 * t
 * v0 v1 ... v(t-1)
 * x
 * </pre>
 * The tree is given in level order; {@code null} marks a missing child and the first
 * value is the root. {@code x} is the value to insert.
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 4 2 7 1 3
 * 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4 2 7 1 3 5
 * </pre>
 * The output lists the values of the resulting tree in level order (breadth first, left
 * to right); missing children are omitted.
 *
 * <p>Approach: walk down from the root comparing with the value. Smaller values go
 * left, larger values go right. The first missing child we meet is where the new leaf
 * is attached, so exactly one pointer in the tree changes.
 *
 * <p>Complexity: Time O(h) — one path down the tree. Space O(h) for the recursion.
 */
public class InsertIntoBST {

    /**
     * Inserts {@code value} into the BST, modifying the tree in place.
     *
     * @param root  root of the tree, may be {@code null}
     * @param value the value to insert
     * @return the root of the (possibly new) tree
     */
    public static TreeNode insertIntoBST(TreeNode root, int value) {
        if (root == null) {
            return new TreeNode(value);
        }
        if (value < root.val) {
            root.left = insertIntoBST(root.left, value);
        } else if (value > root.val) {
            root.right = insertIntoBST(root.right, value);
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
        int value = fs.nextInt();

        TreeNode updated = insertIntoBST(root, value);
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
 * Problem: Insert into a Binary Search Tree
 * LeetCode: 701 | Difficulty: Medium | Frequency: 4/5
 * Pattern: BST, Recursive descent
 *
 * <p>Problem: Insert a value into a binary search tree. If the value is already present
 * nothing changes; otherwise it becomes a new leaf.
 *
 * <p>Input format (stdin):
 * <pre>
 * t
 * v0 v1 ... v(t-1)
 * x
 * </pre>
 * The tree is given in level order; {@code null} marks a missing child and the first
 * value is the root. {@code x} is the value to insert.
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 4 2 7 1 3
 * 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4 2 7 1 3 5
 * </pre>
 * The output lists the values of the resulting tree in level order (breadth first, left
 * to right); missing children are omitted.
 *
 * <p>Approach: walk down from the root comparing with the value. Smaller values go
 * left, larger values go right. The first missing child we meet is where the new leaf
 * is attached, so exactly one pointer in the tree changes.
 *
 * <p>Complexity: Time O(h) — one path down the tree. Space O(h) for the recursion.
 */
public class Main {

    /**
     * Inserts {@code value} into the BST, modifying the tree in place.
     *
     * @param root  root of the tree, may be {@code null}
     * @param value the value to insert
     * @return the root of the (possibly new) tree
     */
    public static TreeNode insertIntoBST(TreeNode root, int value) {
        if (root == null) {
            return new TreeNode(value);
        }
        if (value < root.val) {
            root.left = insertIntoBST(root.left, value);
        } else if (value > root.val) {
            root.right = insertIntoBST(root.right, value);
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
        int value = fs.nextInt();

        TreeNode updated = insertIntoBST(root, value);
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
# Insert into a Binary Search Tree — LeetCode 701

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | BST · Recursive descent |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta |

## Problem Statement

Insert a value into a binary search tree. If the value is already in the tree nothing
changes; otherwise it becomes a new leaf in the right place.

\`\`\`
    4          4
   / \\        / \\
  2   7   →  2   7
 / \\          / \\ \\
1   3        1   3 5
\`\`\`

## Input Format

The program reads from standard input:

\`\`\`
t
v0 v1 ... v(t-1)
x
\`\`\`

- \`t\` — how many level-order tokens follow (\`0\` for an empty tree)
- the tokens — the node values in **level order**; \`null\` marks a missing child and the
  first token is the root
- \`x\` — the value to insert

The sample tree above is \`5\` followed by \`4 2 7 1 3\`.

## Sample Input

\`\`\`
5
4 2 7 1 3
5
\`\`\`

## Expected Output

\`\`\`
4 2 7 1 3 5
\`\`\`

The values of the resulting tree in **level order** (breadth first, left to right);
missing children are omitted.

## Approach — descend until a child is missing

The BST ordering tells us where the value belongs at every step:

- \`x < node.val\` → it belongs in the **left** subtree,
- \`x > node.val\` → it belongs in the **right** subtree,
- \`x == node.val\` → it is already there, stop.

The recursion returns the (possibly new) subtree root, so the assignment
\`root.left = insert(root.left, x)\` re-attaches it. Exactly **one** pointer in the tree
changes — the leaf that is created.

\`\`\`java
if (root == null) return new TreeNode(value);
if (value < root.val) root.left = insertIntoBST(root.left, value);
else if (value > root.val) root.right = insertIntoBST(root.right, value);
return root;
\`\`\`

## Dry Run

Input: tree \`4 → (2, 7)\`, \`2 → (1, 3)\`, insert \`x = 5\`

| Step | call | node.val | comparison | action | subtree returned |
|---:|---|---:|---|---|---|
| 1 | \`insert(4, 5)\` | 4 | \`5 > 4\` | go right | — |
| 2 | \`insert(7, 5)\` | 7 | \`5 < 7\` | go left | — |
| 3 | \`insert(null, 5)\` | — | — | create a leaf \`5\` | node \`5\` |
| 4 | \`insert(7, 5)\` | 7 | — | \`7.left = 5\` | node \`7\` |
| 5 | \`insert(4, 5)\` | 4 | — | \`4.right = 7\` | node \`4\` |

Resulting tree:

\`\`\`
    4
   / \\
  2   7
 / \\  /
1  3 5
\`\`\`

Level order (missing children omitted): \`4 2 7 1 3 5\` ✓

### The duplicate case

Inserting \`5\` again: step 1 (\`5 > 4\` → right), step 2 (\`5 < 7\` → left), step 3
(\`5 == 5\` → neither branch) → the tree is unchanged. The \`else if\` for \`>\` is what
prevents an infinite recursion.

## Java Solution

See [\`InsertIntoBST.java\`](./InsertIntoBST.java).

\`\`\`java
public static TreeNode insertIntoBST(TreeNode root, int value) {
    if (root == null) {
        return new TreeNode(value);
    }
    if (value < root.val) {
        root.left = insertIntoBST(root.left, value);
    } else if (value > root.val) {
        root.right = insertIntoBST(root.right, value);
    }
    return root;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(h) | One path from the root to the insertion point |
| **Space** | O(h) | The call stack follows the same path |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Insert several values — is it still O(n log n)?"* → yes, if you insert them in
  sorted order it degenerates to O(n²); randomising the order keeps it O(n log n) on
  average.
- *"Can you do it iteratively?"* → yes: keep a parent pointer and attach the new leaf
  at the end; O(1) extra space.
- *"What if the tree is not balanced?"* → the insert is still correct, but the height can
  be O(n); that is why self-balancing trees exist.

**Common mistakes:**
- ❌ Using \`else\` instead of \`else if\` → an equal value would recurse into the right
  subtree forever (or duplicate the value).
- ❌ Forgetting \`root.left = ...\` → the new subtree is created but never attached.
- ❌ Inserting into a leaf's *left* child when the value is bigger → the BST property
  breaks.

**How to narrate:**
> "I walk down from the root: smaller values go left, bigger values go right. The first
> missing child is where the new leaf goes, so only one pointer changes. I use two
> separate comparisons so a duplicate value is a no-op. O(h) time."

## Related Problems

- [Search in a Binary Search Tree](./SearchInBST.java) — the same descent
- [Delete Node in a BST](./DeleteFromBST.java) — the same descent, with three cases
- [Validate Binary Search Tree](./ValidateBinarySearchTree.java) — checks the property the insert maintains
`,i=[`insertIntoBST`,`levelOrderValues`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};