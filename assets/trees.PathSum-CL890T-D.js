var e=`trees.PathSum`,t=`package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;

/**
 * Problem: Path Sum
 * LeetCode: 112 | Difficulty: Easy | Frequency: 5/5
 * Pattern: DFS, Running sum
 *
 * <p>Problem: Check whether the tree has a root-to-leaf path whose values sum to a
 * target. A path must start at the root and end at a leaf.
 *
 * <p>Input format (stdin):
 * <pre>
 * t
 * v0 v1 ... v(t-1)
 * target
 * </pre>
 * The tree is given in level order; {@code null} marks a missing child and the first
 * value is the root. {@code target} is the required sum.
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 2 3 null 4
 * 7
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 * The path 1 -&gt; 2 -&gt; 4 sums to 7.
 *
 * <p>Approach: carry the running sum down the tree. At a leaf the sum must equal the
 * target. Because the running sum is passed down instead of being accumulated and
 * undone, no backtracking is needed.
 *
 * <p>Complexity: Time O(n), Space O(h).
 */
public class PathSum {

    /**
     * Checks whether a root-to-leaf path adds up to {@code targetSum}.
     *
     * @param root      root of the tree, may be {@code null}
     * @param targetSum the required sum
     * @return {@code true} when such a path exists
     */
    public static boolean hasPathSum(TreeNode root, int targetSum) {
        if (root == null) {
            return false;
        }
        if (root.left == null && root.right == null) {
            return targetSum == root.val; // only a leaf closes a path
        }
        int remaining = targetSum - root.val;
        return hasPathSum(root.left, remaining) || hasPathSum(root.right, remaining);
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

        System.out.println(hasPathSum(root, target));
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
 * Problem: Path Sum
 * LeetCode: 112 | Difficulty: Easy | Frequency: 5/5
 * Pattern: DFS, Running sum
 *
 * <p>Problem: Check whether the tree has a root-to-leaf path whose values sum to a
 * target. A path must start at the root and end at a leaf.
 *
 * <p>Input format (stdin):
 * <pre>
 * t
 * v0 v1 ... v(t-1)
 * target
 * </pre>
 * The tree is given in level order; {@code null} marks a missing child and the first
 * value is the root. {@code target} is the required sum.
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 2 3 null 4
 * 7
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 * The path 1 -&gt; 2 -&gt; 4 sums to 7.
 *
 * <p>Approach: carry the running sum down the tree. At a leaf the sum must equal the
 * target. Because the running sum is passed down instead of being accumulated and
 * undone, no backtracking is needed.
 *
 * <p>Complexity: Time O(n), Space O(h).
 */
public class Main {

    /**
     * Checks whether a root-to-leaf path adds up to {@code targetSum}.
     *
     * @param root      root of the tree, may be {@code null}
     * @param targetSum the required sum
     * @return {@code true} when such a path exists
     */
    public static boolean hasPathSum(TreeNode root, int targetSum) {
        if (root == null) {
            return false;
        }
        if (root.left == null && root.right == null) {
            return targetSum == root.val; // only a leaf closes a path
        }
        int remaining = targetSum - root.val;
        return hasPathSum(root.left, remaining) || hasPathSum(root.right, remaining);
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

        System.out.println(hasPathSum(root, target));
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
# Path Sum — LeetCode 112

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | DFS · Running sum |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Uber, Adobe |

## Problem Statement

Check whether the tree has a **root-to-leaf path** whose values add up to a target. A
path must start at the root and end at a leaf — a partial path does not count.

\`\`\`
    1
   / \\
  2   3
   \\
    4
\`\`\`

The paths are \`1 → 2\`, \`1 → 2 → 4\` and \`1 → 3\`. The target \`7\` is reached by
\`1 → 2 → 4\`.

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
- \`target\` — the required sum

The sample tree above is \`5\` followed by \`1 2 3 null 4\`.

## Sample Input

\`\`\`
5
1 2 3 null 4
7
\`\`\`

## Expected Output

\`\`\`
true
\`\`\`

## Approach — carry the remaining sum down

Instead of accumulating a path and undoing it on the way back (backtracking), pass the
**remaining sum** down the recursion:

\`\`\`java
if (root == null) return false;
if (root.left == null && root.right == null) return targetSum == root.val;
int remaining = targetSum - root.val;
return hasPathSum(root.left, remaining) || hasPathSum(root.right, remaining);
\`\`\`

Two rules do the work:

1. A path is only complete at a **leaf** — so the sum is only checked there.
2. The \`||\` short-circuits: as soon as one side succeeds we stop.

Note that \`targetSum == root.val\` is checked **at the leaf**, with the value still
included: the recursion subtracts a node's value on the way *down*, and the leaf is
compared with what is left.

## Dry Run

Input: tree \`1 → (2, 3)\`, \`2 → (null, 4)\`, target \`7\`

| Step | call | node | remaining | leaf? | verdict |
|---:|---|---:|---:|---|---|
| 1 | \`hasPathSum(1, 7)\` | 1 | 7 | no | remaining = \`7 - 1\` = 6 → try both children |
| 2 | \`hasPathSum(2, 6)\` | 2 | 6 | no | remaining = \`6 - 2\` = 4 → try both children |
| 3 | \`hasPathSum(null, 4)\` | — | 4 | — | **false** (no node) |
| 4 | \`hasPathSum(4, 4)\` | 4 | 4 | **yes** | \`4 == 4\` → **true** ✓ |
| 5 | \`hasPathSum(2, 6)\` | — | — | — | left side true → short-circuit, \`||\` stops |
| 6 | \`hasPathSum(1, 7)\` | — | — | — | → **true** |

The right subtree (\`3\`) is never visited — the left branch already answered the
question.

### A failing case

With target \`8\` on the same tree: step 4 compares \`4 == 8\` → false; then
\`hasPathSum(3, 6)\` → \`3\` is a leaf and \`3 != 6\` → false → the whole call returns
\`false\`.

## Java Solution

See [\`PathSum.java\`](./PathSum.java).

\`\`\`java
public static boolean hasPathSum(TreeNode root, int targetSum) {
    if (root == null) {
        return false;
    }
    if (root.left == null && root.right == null) {
        return targetSum == root.val;
    }
    int remaining = targetSum - root.val;
    return hasPathSum(root.left, remaining) || hasPathSum(root.right, remaining);
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every node is visited at most once |
| **Space** | O(h) | The call stack mirrors the height of the tree |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Return all the paths that sum to the target."* → keep the path in a list and copy it
  at every matching leaf.
- *"Count the paths (starting at any node)."* → that is
  [Path Sum III](./CountPathsWithGivenSum.java); the
  prefix-sum map makes it O(n).
- *"What if the values can be negative?"* → this solution still works (the remaining sum
  simply goes up and down), but the prefix-sum version needs care.

**Common mistakes:**
- ❌ Checking the sum at **every** node → a path that stops in the middle is counted.
- ❌ Forgetting to subtract the node's value before recursing.
- ❌ Returning \`targetSum == 0\` at a non-leaf → wrong.
- ❌ Using \`&&\` instead of \`||\` when combining the two children → you would require
  *both* sides to have a path.

**How to narrate:**
> "I carry the remaining sum down the recursion. At a leaf I compare what is left with
> the node's value; everywhere else I subtract the node's value and try both children.
> Because the sum is passed down instead of accumulated, I don't need backtracking. O(n)
> time, O(h) space."

## Related Problems

- [Path Sum III](./CountPathsWithGivenSum.java) — paths that may start anywhere
- [Binary Tree Paths](./BinaryTreePaths.java) — prints every path
- [Binary Tree Minimum Depth](./BinaryTreeMinimumDepth.java) — the same "only leaves count" rule
`,i=[`hasPathSum`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};