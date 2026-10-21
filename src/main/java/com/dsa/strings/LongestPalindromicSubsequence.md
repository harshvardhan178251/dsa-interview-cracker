---
title: Longest Palindromic Subsequence
leetcode: 516
difficulty: Medium
patterns: [Dynamic Programming, Interval DP]
companies: [Google, JP Morgan, Bloomberg]
frequency: 3
tags: [string, palindrome, dynamic-programming, dp]
sampleInput: |
  bbbab
sampleOutput: "4"
---

# Longest Palindromic Subsequence — LeetCode 516

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Dynamic Programming · Interval DP |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Adobe |

## Problem Statement

Given a string `s`, return the **length** of the longest *subsequence* of `s` that is
a palindrome.

- A **subsequence** keeps the relative order of the characters but may skip any of
  them — so `"bbbb"` is a subsequence of `"bbbab"`.
- A **substring** must be contiguous — that is the difference from
  [Longest Palindromic Substring](../../../../../../docs/topics/02-strings.md), which is solved by expanding around a centre.

## Input Format

The program reads from standard input:

```
s
```

- `s` — the string to scan (1 ≤ |s| ≤ 10³), on a single line, no quotes.

## Sample Input

```
bbbab
```

## Expected Output

```
4
```

The subsequence `"bbbb"` (indices 0, 1, 2, 4) is a palindrome of length 4.

## Approach — Interval dynamic programming

Define:

```
dp[i][j] = length of the longest palindromic subsequence of s[i..j]
```

**Base case:** `dp[i][i] = 1` — a single character is a palindrome.

**Transition** for `i < j`:

- If `s[i] == s[j]` — the two ends can wrap whatever is best inside:
  `dp[i][j] = 2 + dp[i+1][j-1]`
- If `s[i] != s[j]` — at least one end has to be dropped:
  `dp[i][j] = max(dp[i+1][j], dp[i][j-1])`

**Order of evaluation:** the table is filled by **increasing interval length**, so every
state a transition depends on (`dp[i+1][j-1]`, `dp[i+1][j]`, `dp[i][j-1]`) is already
computed. The answer is `dp[0][n-1]`.

**Why it is correct:** any palindromic subsequence of `s[i..j]` either uses both ends
(possible only when they are equal, and then the inside contributes `dp[i+1][j-1]`) or
misses at least one end (so it is contained in `s[i+1..j]` or `s[i..j-1]`). The
recurrence covers both cases and takes the best.

## Dry Run

Input: `s = "bbbab"` — indices `0:'b' 1:'b' 2:'b' 3:'a' 4:'b'`

Base case — every single character is a palindrome:

```
dp[0][0] = dp[1][1] = dp[2][2] = dp[3][3] = dp[4][4] = 1
```

### Length 2 intervals

| Step | i | j | `s[i]` | `s[j]` | equal? | computation | `dp[i][j]` |
|---:|---:|---:|---|---|---|---|---:|
| 1 | 0 | 1 | `b` | `b` | ✓ | `2 + dp[1][0]` = `2 + 0` | 2 |
| 2 | 1 | 2 | `b` | `b` | ✓ | `2 + dp[2][1]` = `2 + 0` | 2 |
| 3 | 2 | 3 | `b` | `a` | ✗ | `max(dp[3][2], dp[2][3])` = `max(1, 1)` | 1 |
| 4 | 3 | 4 | `a` | `b` | ✗ | `max(dp[4][3], dp[3][4])` = `max(1, 1)` | 1 |

### Length 3 intervals

| Step | i | j | `s[i]` | `s[j]` | equal? | computation | `dp[i][j]` |
|---:|---:|---:|---|---|---|---|---:|
| 5 | 0 | 2 | `b` | `b` | ✓ | `2 + dp[1][1]` = `2 + 1` | 3 |
| 6 | 1 | 3 | `b` | `a` | ✗ | `max(dp[2][3], dp[1][2])` = `max(1, 2)` | 2 |
| 7 | 2 | 4 | `b` | `b` | ✓ | `2 + dp[3][3]` = `2 + 1` | 3 |

### Length 4 intervals

| Step | i | j | `s[i]` | `s[j]` | equal? | computation | `dp[i][j]` |
|---:|---:|---:|---|---|---|---|---:|
| 8 | 0 | 3 | `b` | `a` | ✗ | `max(dp[1][3], dp[0][2])` = `max(2, 3)` | 3 |
| 9 | 1 | 4 | `b` | `b` | ✓ | `2 + dp[2][3]` = `2 + 1` | 3 |

### Length 5 interval

| Step | i | j | `s[i]` | `s[j]` | equal? | computation | `dp[i][j]` |
|---:|---:|---:|---|---|---|---|---:|
| 10 | 0 | 4 | `b` | `b` | ✓ | `2 + dp[1][3]` = `2 + 2` | **4** |

Answer: `dp[0][4]` = **4**

### The completed table

| `dp[i][j]` | j=0 | j=1 | j=2 | j=3 | j=4 |
|---|---:|---:|---:|---:|---:|
| **i=0** | 1 | 2 | 3 | 3 | **4** |
| **i=1** | — | 1 | 2 | 2 | 3 |
| **i=2** | — | — | 1 | 1 | 3 |
| **i=3** | — | — | — | 1 | 1 |
| **i=4** | — | — | — | — | 1 |

The `4` at `dp[0][4]` is the `"bbbb"` subsequence.

## Java Solution

See [`LongestPalindromicSubsequence.java`](./LongestPalindromicSubsequence.java).

```java
public static int longestPalindromeSubsequence(String s) {
    int n = s.length();
    if (n == 0) {
        return 0;
    }
    int[][] dp = new int[n][n];
    for (int i = 0; i < n; i++) {
        dp[i][i] = 1;
    }
    for (int length = 2; length <= n; length++) {
        for (int i = 0; i + length - 1 < n; i++) {
            int j = i + length - 1;
            if (s.charAt(i) == s.charAt(j)) {
                dp[i][j] = 2 + dp[i + 1][j - 1];
            } else {
                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[0][n - 1];
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n²) | n² table cells, each computed in O(1) |
| **Space** | O(n²) | The table itself; can be squeezed to O(n) with a rolling array |

**Space optimisation:** the transition only ever reads `dp[i+1][j-1]`, `dp[i+1][j]` and
`dp[i][j-1]`, so a single rolling row (updated right-to-left) is enough — O(n) space.
The 2D version is kept here because the table *is* the explanation.

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you get it down to O(n) space?"* → yes, roll the DP into one array, iterating
  `i` from right to left and `j` from left to right.
- *"Return the subsequence itself, not just its length?"* → store the choice in the
  table (or backtrack from `dp[0][n-1]`, following whichever end was dropped).
- *"How does this relate to LCS?"* → the longest palindromic subsequence of `s` is
  the LCS of `s` and `reverse(s)`, but that trick is only correct when you forbid
  using the same character twice — the interval DP above is always safe.
- *"What about the longest palindromic **substring**?"* → expand around centres,
  O(n²) time, O(1) space.

**Common mistakes:**
- ❌ Filling the table with `i` in the outer loop and `j` in the inner loop **without**
  restricting `j ≥ i` → `dp[i+1][j-1]` is read before it is written.
- ❌ Writing `dp[i][j] = 2 + dp[i+1][j-1]` when the ends **differ** → produces answers
  that are too large.
- ❌ Returning the length of the longest palindromic *substring* → subsequence answers
  are often bigger (`"bbbab"` → 4, but the longest palindromic substring is `"bbb"` → 3).

**How to narrate:**
> "This is an interval DP. `dp[i][j]` is the longest palindromic subsequence inside
> `s[i..j]`. If the ends match I can always use them and add two to the inside; if
> they don't match, one of them has to go, so I take the max of the two smaller
> ranges. I fill the table by increasing interval length so every dependency is
> already computed. O(n²) time, O(n²) space — and I can roll it to O(n) space if
> asked."

## Related Problems

- [Longest Palindromic Substring](../../../../../../docs/topics/02-strings.md) — the contiguous version
- [Count and Say](../../../../../../docs/topics/02-strings.md) — another "expand a string" warm-up
