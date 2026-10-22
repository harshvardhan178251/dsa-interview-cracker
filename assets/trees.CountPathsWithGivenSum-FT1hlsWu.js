var e=`trees.CountPathsWithGivenSum`,t=`package com.dsa.trees;

import com.dsa.utils.FastScanner;
import com.dsa.utils.TreeNode;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Problem: Path Sum III
 * LeetCode: 437 | Difficulty: Medium | Frequency: 4/5
 * Pattern: DFS, Prefix sums
 *
 * <p>Problem: Count the number of downward paths in a binary tree whose values sum to a
 * target. A path may start at any node and end at any descendant.
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
 * 11
 * 10 5 -3 3 2 null 11 3 -2 null 1
 * 8
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: a path from an ancestor down to the current node has sum
 * {@code currentPrefix - earlierPrefix}. While walking down the tree we keep a map of
 * the prefix sums seen on the current root-to-node path and how often each occurred, so
 * the number of matching prefixes tells us how many paths end here. The map entry is
 * removed again when the walk backtracks.
 *
 * <p>Complexity: Time O(n), Space O(h) for the map and the recursion.
 */
public class CountPathsWithGivenSum {

    /**
     * Counts the downward paths whose values add up to {@code targetSum}.
     *
     * @param root      root of the tree, may be {@code null}
     * @param targetSum the required sum
     * @return the number of matching paths
     */
    public static int pathSum(TreeNode root, int targetSum) {
        Map<Long, Integer> prefix = new HashMap<>();
        prefix.put(0L, 1); // the empty path above the root
        return walk(root, 0L, targetSum, prefix);
    }

    /** Depth-first walk that maintains the prefix sums of the current path. */
    private static int walk(TreeNode node, long sum, long target, Map<Long, Integer> prefix) {
        if (node == null) {
            return 0;
        }
        sum += node.val;
        int found = prefix.getOrDefault(sum - target, 0);
        prefix.merge(sum, 1, Integer::sum);

        int total = found
                + walk(node.left, sum, target, prefix)
                + walk(node.right, sum, target, prefix);

        prefix.merge(sum, -1, Integer::sum); // backtrack
        return total;
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

        System.out.println(pathSum(root, target));
    }
}
`,n=`import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

/**
 * Problem: Path Sum III
 * LeetCode: 437 | Difficulty: Medium | Frequency: 4/5
 * Pattern: DFS, Prefix sums
 *
 * <p>Problem: Count the number of downward paths in a binary tree whose values sum to a
 * target. A path may start at any node and end at any descendant.
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
 * 11
 * 10 5 -3 3 2 null 11 3 -2 null 1
 * 8
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: a path from an ancestor down to the current node has sum
 * {@code currentPrefix - earlierPrefix}. While walking down the tree we keep a map of
 * the prefix sums seen on the current root-to-node path and how often each occurred, so
 * the number of matching prefixes tells us how many paths end here. The map entry is
 * removed again when the walk backtracks.
 *
 * <p>Complexity: Time O(n), Space O(h) for the map and the recursion.
 */
public class Main {

    /**
     * Counts the downward paths whose values add up to {@code targetSum}.
     *
     * @param root      root of the tree, may be {@code null}
     * @param targetSum the required sum
     * @return the number of matching paths
     */
    public static int pathSum(TreeNode root, int targetSum) {
        Map<Long, Integer> prefix = new HashMap<>();
        prefix.put(0L, 1); // the empty path above the root
        return walk(root, 0L, targetSum, prefix);
    }

    /** Depth-first walk that maintains the prefix sums of the current path. */
    private static int walk(TreeNode node, long sum, long target, Map<Long, Integer> prefix) {
        if (node == null) {
            return 0;
        }
        sum += node.val;
        int found = prefix.getOrDefault(sum - target, 0);
        prefix.merge(sum, 1, Integer::sum);

        int total = found
                + walk(node.left, sum, target, prefix)
                + walk(node.right, sum, target, prefix);

        prefix.merge(sum, -1, Integer::sum); // backtrack
        return total;
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

        System.out.println(pathSum(root, target));
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
# Path Sum III — LeetCode 437

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | DFS · Prefix sums |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Count the number of **downward paths** whose values add up to a target. A path may start
at **any** node and end at any descendant of it.

\`\`\`
        10
       /  \\
      5    -3
     / \\     \\
    3   2     11
   / \\   \\    /
  3  -2   1  (etc.)
\`\`\`

With target \`8\` there are exactly **3** such paths.

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

The sample tree above is \`11\` followed by \`10 5 -3 3 2 null 11 3 -2 null 1\`.

## Sample Input

\`\`\`
11
10 5 -3 3 2 null 11 3 -2 null 1
8
\`\`\`

## Expected Output

\`\`\`
3
\`\`\`

## Approach — prefix sums in a map

Brute force tries every starting node and walks down — O(n²) in the worst case.

The prefix-sum trick: along the current root-to-node path, the sum of the segment
between two nodes is the difference of their prefix sums. So while walking down we
keep a map \`prefix\` that counts how often each prefix sum occurred on the **current
path**:

\`\`\`java
sum += node.val;
int found = prefix.getOrDefault(sum - target, 0);   // paths that end here
prefix.merge(sum, 1, Integer::sum);                  // this node extends the path
... recurse ...
prefix.merge(sum, -1, Integer::sum);                 // backtrack
\`\`\`

Three details make it work:

1. \`prefix.put(0, 1)\` — the empty path above the root, so a path that starts at the
   root is counted.
2. The lookup happens **before** the insert, so a node is never paired with itself.
3. The counter is decremented again on the way back, so only the sums of the *current*
   path are counted.

## Dry Run

Input: tree \`10 → (5, -3)\`, \`5 → (3, 2)\`, \`-3 → (null, 11)\`, \`3 → (3, -2)\`, \`2 → (null, 1)\`,
target \`8\`

| Step | node | \`sum\` | \`sum - target\` | \`found\` | \`prefix\` after insert | total |
|---:|---|---:|---:|---:|---|---:|
| 0 | — | — | — | — | \`{0: 1}\` | 0 |
| 1 | \`10\` | 10 | 2 | 0 | \`{0: 1, 10: 1}\` | 0 |
| 2 | \`5\` | 15 | 7 | 0 | \`{0: 1, 10: 1, 15: 1}\` | 0 |
| 3 | \`3\` (left of 5) | 18 | 10 | **1** (\`10\` is on the path) | \`{0: 1, 10: 1, 15: 1, 18: 1}\` | **1** |
| 4 | \`3\` (child of 3) | 21 | 13 | 0 | \`{…, 21: 1}\` | 1 |
| 5 | \`-2\` | 19 | 11 | 0 | \`{…, 19: 1}\` | 1 |
| 6 | backtrack to \`3\` | — | — | — | \`21\` and \`19\` removed | 1 |
| 7 | \`2\` | 17 | 9 | 0 | \`{…, 17: 1}\` | 1 |
| 8 | \`1\` | 18 | 10 | **1** | \`{…, 18: 1}\` | **2** |
| 9 | backtrack to \`5\` | — | — | — | \`18\`, \`17\` removed | 2 |
| 10 | \`-3\` | 7 | -1 | 0 | \`{0: 1, 10: 1, 15: 1, 7: 1}\` | 2 |
| 11 | \`11\` | 18 | 10 | **1** | \`{…, 18: 1}\` | **3** |

The three hits are the paths \`5 → 3\` (5+3 = 8), \`5 → 2 → 1\` (5+2+1 = 8) and
\`-3 → 11\` (-3+11 = 8).

## Java Solution

See [\`CountPathsWithGivenSum.java\`](./CountPathsWithGivenSum.java).

\`\`\`java
public static int pathSum(TreeNode root, int targetSum) {
    Map<Long, Integer> prefix = new HashMap<>();
    prefix.put(0L, 1);
    return walk(root, 0L, targetSum, prefix);
}

private static int walk(TreeNode node, long sum, long target, Map<Long, Integer> prefix) {
    if (node == null) {
        return 0;
    }
    sum += node.val;
    int found = prefix.getOrDefault(sum - target, 0);
    prefix.merge(sum, 1, Integer::sum);

    int total = found
            + walk(node.left, sum, target, prefix)
            + walk(node.right, sum, target, prefix);

    prefix.merge(sum, -1, Integer::sum); // backtrack
    return total;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every node is visited once and every map operation is O(1) on average |
| **Space** | O(h) | The map holds at most one entry per node on the current path |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the values can be negative?"* → this solution still works; a sliding window
  would not.
- *"Count the paths that start at the root only."* → that is
  [Path Sum](./PathSum.java).
- *"Return the paths instead of the count."* → keep the path stack next to the prefix
  map.

**Common mistakes:**
- ❌ Forgetting \`prefix.put(0, 1)\` → paths that start at the root are missed.
- ❌ Looking up **after** inserting → a node can be paired with itself (the empty path).
- ❌ Never removing the entry on the way back → sums from other branches leak in and the
  count is far too large.
- ❌ Using \`int\` for the running sum → overflow with long chains; use \`long\`.

**How to narrate:**
> "A downward path is the difference of two prefix sums on the same root-to-node path.
> So I walk down the tree keeping a map of the prefix sums I have seen on the current
> path. At each node I look for \`sum - target\`, which tells me how many paths end
> exactly here, and I add and remove the entry again when I backtrack. That's O(n)."

## Related Problems

- [Path Sum](./PathSum.java) — the simpler root-to-leaf variant
- [Binary Tree Paths](./BinaryTreePaths.java) — prints the paths instead of counting them
- [Subtree Sum Equals Target](./CountPathsWithGivenSum.java) — the same trick on arrays
`,i=[`pathSum`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};