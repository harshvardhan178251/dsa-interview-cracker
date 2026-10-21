---
title: Path Sum III
leetcode: 437
difficulty: Medium
patterns: [DFS, Prefix sums]
companies: [Meta, Google, Adobe, LinkedIn, Paytm, Accenture, Wipro, IBM]
frequency: 4
tags: [tree, dfs, prefix-sum, hashmap]
sampleInput: |
  11
  10 5 -3 3 2 null 11 3 -2 null 1
  8
sampleOutput: "3"
---

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

```
        10
       /  \
      5    -3
     / \     \
    3   2     11
   / \   \    /
  3  -2   1  (etc.)
```

With target `8` there are exactly **3** such paths.

## Input Format

The program reads from standard input:

```
t
v0 v1 ... v(t-1)
target
```

- `t` — how many level-order tokens follow (`0` for an empty tree)
- the tokens — the node values in **level order**; `null` marks a missing child and the
  first token is the root
- `target` — the required sum

The sample tree above is `11` followed by `10 5 -3 3 2 null 11 3 -2 null 1`.

## Sample Input

```
11
10 5 -3 3 2 null 11 3 -2 null 1
8
```

## Expected Output

```
3
```

## Approach — prefix sums in a map

Brute force tries every starting node and walks down — O(n²) in the worst case.

The prefix-sum trick: along the current root-to-node path, the sum of the segment
between two nodes is the difference of their prefix sums. So while walking down we
keep a map `prefix` that counts how often each prefix sum occurred on the **current
path**:

```java
sum += node.val;
int found = prefix.getOrDefault(sum - target, 0);   // paths that end here
prefix.merge(sum, 1, Integer::sum);                  // this node extends the path
... recurse ...
prefix.merge(sum, -1, Integer::sum);                 // backtrack
```

Three details make it work:

1. `prefix.put(0, 1)` — the empty path above the root, so a path that starts at the
   root is counted.
2. The lookup happens **before** the insert, so a node is never paired with itself.
3. The counter is decremented again on the way back, so only the sums of the *current*
   path are counted.

## Dry Run

Input: tree `10 → (5, -3)`, `5 → (3, 2)`, `-3 → (null, 11)`, `3 → (3, -2)`, `2 → (null, 1)`,
target `8`

| Step | node | `sum` | `sum - target` | `found` | `prefix` after insert | total |
|---:|---|---:|---:|---:|---|---:|
| 0 | — | — | — | — | `{0: 1}` | 0 |
| 1 | `10` | 10 | 2 | 0 | `{0: 1, 10: 1}` | 0 |
| 2 | `5` | 15 | 7 | 0 | `{0: 1, 10: 1, 15: 1}` | 0 |
| 3 | `3` (left of 5) | 18 | 10 | **1** (`10` is on the path) | `{0: 1, 10: 1, 15: 1, 18: 1}` | **1** |
| 4 | `3` (child of 3) | 21 | 13 | 0 | `{…, 21: 1}` | 1 |
| 5 | `-2` | 19 | 11 | 0 | `{…, 19: 1}` | 1 |
| 6 | backtrack to `3` | — | — | — | `21` and `19` removed | 1 |
| 7 | `2` | 17 | 9 | 0 | `{…, 17: 1}` | 1 |
| 8 | `1` | 18 | 10 | **1** | `{…, 18: 1}` | **2** |
| 9 | backtrack to `5` | — | — | — | `18`, `17` removed | 2 |
| 10 | `-3` | 7 | -1 | 0 | `{0: 1, 10: 1, 15: 1, 7: 1}` | 2 |
| 11 | `11` | 18 | 10 | **1** | `{…, 18: 1}` | **3** |

The three hits are the paths `5 → 3` (5+3 = 8), `5 → 2 → 1` (5+2+1 = 8) and
`-3 → 11` (-3+11 = 8).

## Java Solution

See [`CountPathsWithGivenSum.java`](./CountPathsWithGivenSum.java).

```java
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
```

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
- ❌ Forgetting `prefix.put(0, 1)` → paths that start at the root are missed.
- ❌ Looking up **after** inserting → a node can be paired with itself (the empty path).
- ❌ Never removing the entry on the way back → sums from other branches leak in and the
  count is far too large.
- ❌ Using `int` for the running sum → overflow with long chains; use `long`.

**How to narrate:**
> "A downward path is the difference of two prefix sums on the same root-to-node path.
> So I walk down the tree keeping a map of the prefix sums I have seen on the current
> path. At each node I look for `sum - target`, which tells me how many paths end
> exactly here, and I add and remove the entry again when I backtrack. That's O(n)."

## Related Problems

- [Path Sum](./PathSum.java) — the simpler root-to-leaf variant
- [Binary Tree Paths](./BinaryTreePaths.java) — prints the paths instead of counting them
- [Subtree Sum Equals Target](./CountPathsWithGivenSum.java) — the same trick on arrays
