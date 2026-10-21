---
title: Interleaving String
leetcode: 97
difficulty: Medium
patterns: [2-D DP, String DP]
companies: [Google, Amazon, LinkedIn, Salesforce, Paytm]
frequency: 4
tags: [dynamic-programming, strings]
sampleInput: |
  2 2 4
  ab
  cd
  acbd
sampleOutput: "1"
---

# Interleaving String — LeetCode 97

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | 2-D DP · String DP |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft |

## Problem Statement

Given strings `a`, `b` and `c`, decide whether `c` is an **interleaving** of `a` and `b`.

An interleaving keeps the relative order of the characters of `a` and of `b` — the characters of `c` are taken from the front of `a` or the front of `b`, in any order.

## Input Format

The program reads from standard input:

```
n m k
a
b
c
```

- `n` — length of the first string
- `m` — length of the second string
- `k` — length of the third string
- `a`, `b`, `c` — the three strings (no spaces)

## Sample Input

```
2 2 4
ab
cd
acbd
```

## Expected Output

```
1
```

`acbd` takes `a` from `a`, `c` from `b`, `b` from `a` and `d` from `b` → **1**.

## Approach

`dp[i][j]` = "the first `i` characters of `a` and the first `j` characters of `b` can be interleaved into the first `i + j` characters of `c`".

The **last** character of that prefix of `c` came from somewhere:

- from `a`: `a[i-1] == c[i+j-1]` and the rest (`dp[i-1][j]`) was possible, or
- from `b`: `b[j-1] == c[i+j-1]` and the rest (`dp[i][j-1]`) was possible.

`dp[0][0] = true`, and the answer is `dp[n][m]`. A length check comes first: an interleaving must use every character of both strings, so `|a| + |b|` has to equal `|c|`.

The table can be rolled up into one row (`O(m)` space) — the same trick as the edit distance.

## Dry Run

Input: `a = "ab"`, `b = "cd"`, `c = "acbd"`.

| | `""` | `c` | `cd` |
|---|---|---|---|
| `""` | true | false | false |
| `a` | true | true | false |
| `ab` | false | true | **true** |

The bottom-right cell is true → answer **1**.

**Cell by cell** (`c = "acbd"`):

| cell | last character of `c` comes from | computation | value |
|---|---|---|---:|
| `dp[0][0]` | — | base case | true |
| `dp[0][1]` | `b[0]` = `c` vs `c[0]` = `a` | no match | false |
| `dp[1][0]` | `a[0]` = `a` vs `c[0]` = `a` | match and `dp[0][0]` | true |
| `dp[1][1]` | `b[0]` = `c` vs `c[1]` = `c` | match and `dp[1][0]` | true |
| `dp[1][2]` | `c[2]` = `b` | `a[0]` ≠ `b`, `b[1]` = `d` ≠ `b` | false |
| `dp[2][0]` | `a[1]` = `b` vs `c[1]` = `c` | no match | false |
| `dp[2][1]` | `a[1]` = `b` vs `c[2]` = `b` | match and `dp[1][1]` | true |
| `dp[2][2]` | `b[1]` = `d` vs `c[3]` = `d` | match and `dp[2][1]` | true |

**The interleaving** `a b` + `c d` → `acbd`: take `a` from `a`, `c` from `b`, `b` from `a`, `d` from `b` ✓

**The four interleavings** of `ab` and `cd` are `abcd`, `acbd`, `cadb` and `cbad`.

## Java Solution

See [`InterleavingString.java`](./InterleavingString.java).

```java
    public static boolean isInterleave(String a, String b, String c) {
        int n = a.length();
        int m = b.length();
        if (n + m != c.length()) {
            return false;
        }

        boolean[][] dp = new boolean[n + 1][m + 1];
        dp[0][0] = true;

        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= m; j++) {
                if (i > 0 && a.charAt(i - 1) == c.charAt(i + j - 1) && dp[i - 1][j]) {
                    dp[i][j] = true;
                } else if (j > 0 && b.charAt(j - 1) == c.charAt(i + j - 1) && dp[i][j - 1]) {
                    dp[i][j] = true;
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

**Space can be `O(m)`** by rolling the table into one row.

## Interview Notes

**Follow-ups to raise yourself:**

- "Can you print one of the interleavings?"* → keep the table and walk it backwards to recover the choices.
- "What if the strings are very long?"* → the same DP with a rolled row, `O(m)` space.
- "How is this different from the edit distance?"* → the edit distance allows deletions and replacements; here every character must be used, in order.
- "What if `c` is shorter than `a` + `b`?"* → impossible, and the length check rejects it immediately.

**Common mistakes:**

- ❌ Comparing against `c[i-1]` instead of `c[i+j-1]` — the index of the last character depends on both prefixes.
- ❌ Forgetting the length check `|a| + |b| == |c|`.
- ❌ Using `&&` between the two "comes from" branches instead of `||`.

**How to narrate:**

> "`dp[i][j]` says whether the first `i` characters of `a` and the first `j` of `b` interleave into the first `i+j` characters of `c`. The last character came either from `a` — matched against `c[i+j-1]` with `dp[i-1][j]` — or from `b` with `dp[i][j-1]`. If either holds the cell is true, and the answer is `dp[n][m]`."

## Related Problems

- [Longest Common Subsequence — LeetCode 1143](./LongestCommonSubsequence.java) — the same table shape
- [Edit Distance — LeetCode 72](./EditDistance.java) — the string-DP baseline
