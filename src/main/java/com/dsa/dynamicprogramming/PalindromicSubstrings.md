---
title: Palindromic Substrings
leetcode: 647
difficulty: Medium
patterns: [Interval DP, Expand around the centre]
companies: [Meta, Google, Airbnb, Bloomberg, Stripe]
frequency: 4
tags: [dynamic-programming, strings, palindrome]
sampleInput: |
  aaa
sampleOutput: "6"
---

# Palindromic Substrings — LeetCode 647

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Interval DP · Expand around the centre |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Given a string `s`, count the number of **palindromic substrings**.

Occurrences are counted separately: in `"aaa"` the substring `"aa"` occurs twice, so the answer is `3 × "a"` + `2 × "aa"` + `1 × "aaa"` = `6`.

## Input Format

The program reads from standard input:

```
s
```

- `s` — the string (1 ≤ |s| ≤ 1000, lower case letters)

## Sample Input

```
aaa
```

## Expected Output

```
6
```

`"aaa"` contains the palindromes `a`, `a`, `a`, `aa`, `aa` and `aaa` → **6**.

## Approach

Two classic routes lead to the same answer.

**1. Interval DP (used here).** `dp[i][j]` = "is `s[i .. j]` a palindrome?".

`dp[i][j] = (s[i] == s[j]) && (j - i < 2 || dp[i+1][j-1])`

The inside of a palindrome is a palindrome, and a substring of length 1 or 2 needs no inside check. Every `true` cell is one palindromic substring. The table is filled from the bottom-left so that `dp[i+1][j-1]` is always known.

**2. Expand around the centre.** Every palindrome has a centre (a character or a gap). For each centre, expand outwards while the characters match. That is `O(n²)` time and `O(1)` space, and it is usually the shorter interview answer.

## Dry Run

Input: `s = "aaa"`. Every `true` cell is one palindromic occurrence.

| | `a[0]` | `a[1]` | `a[2]` |
|---|---|---|---|
| `a[0]` | **true** | **true** | **true** |
| `a[1]` | — | **true** | **true** |
| `a[2]` | — | — | **true** |

Six `true` cells → answer **6**.

**Cell by cell** (`s = "aaa"`):

| cell | length | ends equal? | inside a palindrome? | value |
|---|---|---|---|---|
| `dp[2][2]` | 1 | `a` = `a` | length < 3 → no check | **true** |
| `dp[1][1]` | 1 | `a` = `a` | length < 3 → no check | **true** |
| `dp[1][2]` | 2 | `a` = `a` | length < 3 → no check | **true** |
| `dp[0][0]` | 1 | `a` = `a` | length < 3 → no check | **true** |
| `dp[0][1]` | 2 | `a` = `a` | length < 3 → no check | **true** |
| `dp[0][2]` | 3 | `a` = `a` | `dp[1][1]` = true | **true** |

**The six palindromes** are `a`(0), `a`(1), `a`(2), `aa`(0-1), `aa`(1-2), `aaa`(0-2).

**Expand-around-the-centre version** — centres `a`(0), gap, `a`(1), gap, `a`(2), gap give the same six palindromes.

## Java Solution

See [`PalindromicSubstrings.java`](./PalindromicSubstrings.java).

```java
    public static int countSubstrings(String s) {
        int n = s.length();
        boolean[][] dp = new boolean[n][n];
        int count = 0;

        for (int i = n - 1; i >= 0; i--) {
            for (int j = i; j < n; j++) {
                if (s.charAt(i) == s.charAt(j) && (j - i < 2 || dp[i + 1][j - 1])) {
                    dp[i][j] = true;
                    count++;
                }
            }
        }
        return count;
    }
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n²) | `n(n + 1) / 2` cells, each `O(1)` |
| **Space** | O(n²) | the full `n × n` table is kept |

**Space can be `O(1)`** with the expand-around-the-centre approach, and `O(n)` with a rolled row (only `dp[i+1][j-1]` is needed).

## Interview Notes

**Follow-ups to raise yourself:**

- "Count only the **distinct** palindromic substrings."* → use a set, or the eertree / Manacher algorithm.
- "Find the **longest** palindromic substring."* → expand around the centre and remember the best, or a rolled DP.
- "Count the palindromic **subsequences** instead."* → a different DP (`O(n²)`), which also has the `O(2ⁿ)` brute force to contrast with.
- "Can you do it in `O(n)`?"* → Manacher's algorithm computes all palindrome radii in linear time.

**Common mistakes:**

- ❌ Counting **distinct** palindromes instead of occurrences — `"aaa"` gives 6, not 3.
- ❌ Forgetting the `j - i < 2` case (substrings of length 1 and 2 have no inside).
- ❌ Filling the table in the wrong direction and reading an uncomputed `dp[i+1][j-1]`.

**How to narrate:**

> "A substring is a palindrome when its ends are equal and its inside is a palindrome, so I keep a table `dp[i][j]`. Length one and two need no inside check. Every `true` cell is one palindromic occurrence, and I count them as I fill the table. The alternative is expanding around each centre, which needs no table at all."

## Related Problems

- [Longest Common Substring — LeetCode 718](./LongestCommonSubstring.java) — the same interval table
- [Decode Ways — LeetCode 91](./DecodeWays.java) — string DP
