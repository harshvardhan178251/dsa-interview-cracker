---
title: Longest Common Subsequence
leetcode: 1143
difficulty: Medium
patterns: [2-D DP, String DP]
companies: [Amazon, Google, Meta, Microsoft]
frequency: 5
tags: [dynamic-programming, strings]
sampleInput: |
  5 3
  abcde
  ace
sampleOutput: "3"
---

# Longest Common Subsequence — LeetCode 1143

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | 2-D DP · String DP |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Microsoft |

## Problem Statement

Given two strings `a` and `b`, return the length of their **longest common subsequence**.

A subsequence is a sequence that can be derived from the original by deleting some characters (possibly none) **without changing the order** of the remaining characters.

## Input Format

The program reads from standard input:

```
n m
a
b
```

- `n` — length of the first string (1 ≤ n ≤ 1000)
- `m` — length of the second string (1 ≤ m ≤ 1000)
- `a` — the first string (no spaces)
- `b` — the second string (no spaces)

## Sample Input

```
5 3
abcde
ace
```

## Expected Output

```
3
```

The common subsequence is `ace` — length **3**.

## Approach

Define the state on **prefixes** of the two strings:

`dp[i][j]` = the LCS length of the first `i` characters of `a` and the first `j` characters of `b`.

- If `a[i-1] == b[j-1]`, the two characters can both be used, so
  `dp[i][j] = dp[i-1][j-1] + 1`.
- Otherwise the last characters cannot be paired, so one of them has to be dropped:
  `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`.

The base row and column are `0` — an empty string shares nothing with anything. The answer is `dp[n][m]`.

The table can be rolled up into a single row (`O(m)` space) by keeping the old diagonal value in a temporary variable, but the two-dimensional version is what you draw first and it makes the recursion obvious.

## Dry Run

Input: `a = "abcde"`, `b = "ace"`. Rows are prefixes of `a`, columns are prefixes of `b`.

| | `""` | `a` | `ac` | `ace` |
|---|---:|---:|---:|---:|
| `""` | 0 | 0 | 0 | 0 |
| `a` | 0 | **1** | 1 | 1 |
| `ab` | 0 | 1 | **1** | 1 |
| `abc` | 0 | 1 | **2** | 2 |
| `abcd` | 0 | 1 | 2 | 2 |
| `abcde` | 0 | 1 | 2 | **3** |

Every cell in bold was computed from the diagonal (`a[i-1] == b[j-1]`), every other cell from the best of the two neighbours above / to the left.

**Cell by cell for the interesting ones.**

| cell | comparison | computation | value |
|---|---|---|---:|
| `dp[1][1]` | `a` vs `a` — equal | `dp[0][0] + 1 = 0 + 1` | 1 |
| `dp[2][2]` | `b` vs `c` — differ | `max(dp[1][2], dp[2][1]) = max(1, 1)` | 1 |
| `dp[3][2]` | `c` vs `c` — equal | `dp[2][1] + 1 = 1 + 1` | 2 |
| `dp[4][3]` | `d` vs `e` — differ | `max(dp[3][3], dp[4][2]) = max(2, 2)` | 2 |
| `dp[5][3]` | `e` vs `e` — equal | `dp[4][2] + 1 = 2 + 1` | 3 |

**Reading the answer back.** Starting at `dp[5][3]` the characters match, so take `e` and move diagonally to `dp[4][2]`; `d` and `c` differ, so move to the larger neighbour, and so on — that traces `a`, `c`, `e`.

## Java Solution

See [`LongestCommonSubsequence.java`](./LongestCommonSubsequence.java).

```java
    public static int lcs(String a, String b) {
        int n = a.length();
        int m = b.length();
        int[][] dp = new int[n + 1][m + 1];

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (a.charAt(i - 1) == b.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[n][m];
    }
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n · m) | `(n + 1) × (m + 1)` cells, each `O(1)` |
| **Space** | O(n · m) | the full `(n + 1) × (m + 1)` table is kept |

**Space can be `O(m)`** by rolling the table up into one row (plus a saved diagonal value). A common variant asks for the subsequence itself, which needs the whole table (or a parent array).

## Interview Notes

**Follow-ups to raise yourself:**

- "Print the LCS itself."* → keep the table and walk backwards from `dp[n][m]`, taking a character whenever `a[i-1] == b[j-1]`.
- "What is the difference between a subsequence and a substring?"* → a substring must be contiguous; see [Longest Common Substring](./LongestCommonSubstring.java).
- "Can you make the space `O(m)`?"* → roll the rows up, keeping the previous diagonal in a variable.
- "What about three strings?"* → a 3-D table `dp[i][j][k]`, `O(n·m·p)` time and space.
- "How does this relate to edit distance?"* → edit distance is the same shape with a different recurrence; see [Edit Distance](./EditDistance.java).

**Common mistakes:**

- ❌ Using `dp[i-1][j-1] + 1` even when the characters differ — that over-counts.
- ❌ Forgetting the empty-prefix base cases (the row and column of zeros).
- ❌ Confusing "subsequence" with "substring" and using the substring recurrence.

**How to narrate:**

> "I build a table over prefixes: `dp[i][j]` is the LCS of the first `i` characters of `a` and the first `j` of `b`. If the last characters are equal I extend the diagonal; otherwise one of them has to be dropped, so I take the max of the upper and left cell. That is `O(n·m)` time. If you want the subsequence itself I keep the table and walk it backwards."

## Related Problems

- [Longest Common Substring — LeetCode 718](./LongestCommonSubstring.java) — the contiguous variant
- [Edit Distance — LeetCode 72](./EditDistance.java) — same shape, different recurrence
- [Interleaving String — LeetCode 97](./InterleavingString.java) — a third two-string DP
