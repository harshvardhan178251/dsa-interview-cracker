---
title: Catalan Number
leetcode: 96
difficulty: Medium
patterns: [Counting DP, Combinatorics]
companies: [Amazon, Google, Apple, Bloomberg, Flipkart, Capgemini, HCLTech, Siemens]
frequency: 4
tags: [dynamic-programming, combinatorics, trees]
sampleInput: |
  5
sampleOutput: "42"
---

# Catalan Number — LeetCode 96

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Counting DP · Combinatorics |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft |

## Problem Statement

The Catalan numbers count a family of combinatorial objects — most famously the number of structurally different **binary search trees** with `n` nodes.

Compute `C(n)`, where `C(0) = 1` and

`C(n) = sum over i = 0 … n-1 of ( C(i) × C(n-1-i) )`.

## Input Format

The program reads from standard input:

```
n
```

- `n` — the index of the Catalan number (0 ≤ n ≤ 19)

## Sample Input

```
5
```

## Expected Output

```
42
```

The Catalan numbers are `1, 1, 2, 5, 14, 42, 132, …` → `C(5) = 42`.

## Approach

**The combinatorial view (used here).** A binary search tree with `n` nodes has a root; the nodes smaller than the root go left, the larger ones go right. If the left subtree has `i` nodes the right one has `n - 1 - i`, and the two subtrees can be chosen independently:

`C(n) = Σ C(i) · C(n-1-i)`

`C(0) = 1` — there is exactly one empty tree.

**The closed form.** `C(n) = (2n)! / ((n+1)! · n!) = C(2n, n) / (n+1)`. It is `O(n)` with exact integer arithmetic, but it overflows quickly and it hides the structure — the DP is what interviewers want.

Catalan numbers also count: parenthesisations of `n+1` factors, valid bracket sequences of length `2n`, triangulations of a convex polygon with `n+2` vertices, and the number of ways to build a binary search tree from a sorted array.

## Dry Run

Input: `n = 5`.

| nodes | splits `i` | computation | `dp[nodes]` |
|---:|---|---|---:|
| 0 | — | base case | **1** |
| 1 | 0 | `C(0)·C(0) = 1·1` | **1** |
| 2 | 0, 1 | `1·1 + 1·1 = 2` | **2** |
| 3 | 0, 1, 2 | `1·2 + 1·1 + 2·1 = 5` | **5** |
| 4 | 0, 1, 2, 3 | `1·5 + 1·2 + 2·1 + 5·1 = 14` | **14** |
| 5 | 0, 1, 2, 3, 4 | `1·14 + 1·5 + 2·2 + 5·1 + 14·1 = 42` | **42** |

Full table: `dp = [1, 1, 2, 5, 14, 42]` → answer **42**.

**The symmetry.** `C(n) = Σ C(i)·C(n-1-i)` is symmetric in `i` and `n-1-i`, so the sum can be halved with one middle term — a constant-factor trick worth mentioning.

**The closed form check.** `C(5) = C(10, 5) / 6 = 252 / 6 = 42` ✓

**Overflow.** `C(20) = 6 564 120 420`, which no longer fits in an `int` — that is why the method returns a `long`.

## Java Solution

See [`CatalanNumber.java`](./CatalanNumber.java).

```java
    public static long catalan(int n) {
        long[] dp = new long[n + 1];
        dp[0] = 1;

        for (int nodes = 1; nodes <= n; nodes++) {
            for (int left = 0; left < nodes; left++) {
                dp[nodes] += dp[left] * dp[nodes - 1 - left];
            }
        }
        return dp[n];
    }
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n²) | `n` sizes, each trying `n` splits |
| **Space** | O(n) | the `dp` array holds `n + 1` entries |

**Space `O(n)`.** The closed form `C(2n, n) / (n + 1)` is `O(n)` time and `O(1)` space with exact arithmetic.

## Interview Notes

**Follow-ups to raise yourself:**

- "Give me the closed form."* → `C(2n, n) / (n + 1)`, computed with a running product to avoid overflow.
- "What else do Catalan numbers count?"* → parenthesisations, bracket sequences, polygon triangulations, the "number of ways to build a BST from a sorted array" (LeetCode 96).
- "Can you compute it in `O(n)` time?"* → yes, with the closed form.
- "How would you count the BSTs directly?"* → by inserting the keys in the given order and multiplying the number of valid slots at each step.

**Common mistakes:**

- ❌ Using `int` — `C(20)` already overflows a 32-bit integer.
- ❌ Setting `dp[0] = 0` — the empty tree is one valid structure.
- ❌ Iterating the splits over `1 … n` instead of `0 … n-1` (the left subtree may be empty).

**How to narrate:**

> "A binary search tree with `n` nodes is determined by its root: the left subtree gets `i` nodes and the right one `n-1-i`, and the two can be chosen independently, so the counts multiply. That gives the Catalan recurrence `C(n) = sum C(i)·C(n-1-i)` with `C(0) = 1`, computed in `O(n²)` time. I return a `long` because `C(20)` overflows an `int`."

## Related Problems

- [Unique Paths — LeetCode 62](./UniquePaths.java) — binomial coefficients
- [Longest Increasing Subsequence — LeetCode 300](./LongestIncreasingSubsequence.java) — another classic DP
