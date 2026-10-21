---
title: Edit Distance
leetcode: 72
difficulty: Medium
patterns: [2-D DP, String DP]
companies: [Google, Amazon, Meta, Uber, LinkedIn, JP Morgan, Flipkart]
frequency: 5
tags: [dynamic-programming, strings]
sampleInput: |
  5 3
  horse
  ros
sampleOutput: "3"
---

# Edit Distance — LeetCode 72

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | 2-D DP · String DP |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber |

## Problem Statement

Given two strings `a` and `b`, return the minimum number of **edit operations** needed to transform `a` into `b`.

The operations are:

- **insert** a character
- **delete** a character
- **replace** a character with another one

## Input Format

The program reads from standard input:

```
n m
a
b
```

- `n` — length of the first string (1 ≤ n ≤ 500)
- `m` — length of the second string (1 ≤ m ≤ 500)
- `a` — the first string (no spaces)
- `b` — the second string (no spaces)

## Sample Input

```
5 3
horse
ros
```

## Expected Output

```
3
```

`horse` → `ros` needs three edits: `horse` → `rorse` (replace `h`→`r`) → `rose` (delete `r`) → `ros` (delete `e`). The minimum is **3**.

## Approach

The DP is over **prefixes**, exactly like the LCS problem, but the cell now stores a cost instead of a length:

`dp[i][j]` = the minimum edits that turn `a[0 .. i-1]` into `b[0 .. j-1]`.

- If `a[i-1] == b[j-1]` the last characters already match: `dp[i][j] = dp[i-1][j-1]`.
- Otherwise try the three operations, each of which costs one edit:
  - delete `a[i-1]` → `dp[i-1][j]`,
  - insert `b[j-1]` → `dp[i][j-1]`,
  - replace `a[i-1]` by `b[j-1]` → `dp[i-1][j-1]`.
  `dp[i][j] = 1 + min(...)`.

Base cases: `dp[i][0] = i` (delete everything) and `dp[0][j] = j` (insert everything).

## Dry Run

Input: `a = "horse"`, `b = "ros"`. Rows are prefixes of `a`, columns prefixes of `b`.

| | `""` | `r` | `ro` | `ros` |
|---|---:|---:|---:|---:|
| `""` | 0 | 1 | 2 | 3 |
| `h` | 1 | 1 | 2 | 3 |
| `ho` | 2 | 2 | 1 | 2 |
| `hor` | 3 | 2 | 2 | 2 |
| `hors` | 4 | 3 | 3 | 2 |
| `horse` | 5 | 4 | 4 | **3** |

The bottom-right cell holds **3** → answer **3**.

**The three interesting cells.**

| cell | characters | computation | value |
|---|---|---|---:|
| `dp[2][2]` | `o` vs `o` | equal → `dp[1][1] = 1` | 1 |
| `dp[3][3]` | `r` vs `s` | differ → `1 + min(dp[2][3]=2, dp[3][2]=2, dp[2][2]=1)` | 2 |
| `dp[5][3]` | `e` vs `s` | differ → `1 + min(dp[4][3]=2, dp[5][2]=4, dp[4][2]=3)` | 3 |

**An optimal alignment**

```
h o r s e
  r o s
```

`h` is deleted, `o` matches, `r` is deleted, `s` matches, `e` is deleted → three deletions.

## Java Solution

See [`EditDistance.java`](./EditDistance.java).

```java
    public static int minDistance(String a, String b) {
        int n = a.length();
        int m = b.length();
        int[][] dp = new int[n + 1][m + 1];

        for (int i = 0; i <= n; i++) {
            dp[i][0] = i;
        }
        for (int j = 0; j <= m; j++) {
            dp[0][j] = j;
        }

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (a.charAt(i - 1) == b.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + Math.min(
                            Math.min(dp[i - 1][j], dp[i][j - 1]),
                            dp[i - 1][j - 1]);
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

**Space can be `O(m)`** by keeping one row plus the saved diagonal. The same trick gives `O(min(n, m))` space by swapping the strings so the rolled row is the shorter one.

## Interview Notes

**Follow-ups to raise yourself:**

- "Can you reconstruct the edit script?"* → keep the table and walk backwards, emitting insert / delete / replace operations.
- "What if only insertions and deletions are allowed?"* → the answer is `n + m - 2 · LCS(a, b)`.
- "How is this related to the LCS?"* → `editDistance = n + m - 2 · LCS` when only insert and delete are allowed; with replacements the DP is needed.
- "What about a weighted edit distance?"* → give each operation its own cost in the `min`.

**Common mistakes:**

- ❌ Forgetting that the base cases are `i` and `j`, not `0` — an empty string still needs edits.
- ❌ Adding `1` when the characters match (that edit is free).
- ❌ Using `dp[i-1][j-1]` only — that misses the insert and delete options.

**How to narrate:**

> "`dp[i][j]` is the minimum edits to turn the first `i` characters of `a` into the first `j` of `b`. If the last characters match I take the diagonal for free; otherwise I try delete, insert and replace and add one to the cheapest. That is `O(n·m)` and I can roll it into a single row."

## Related Problems

- [Longest Common Subsequence — LeetCode 1143](./LongestCommonSubsequence.java) — the same table shape
- [Decode Ways — LeetCode 91](./DecodeWays.java) — prefix DP over strings
