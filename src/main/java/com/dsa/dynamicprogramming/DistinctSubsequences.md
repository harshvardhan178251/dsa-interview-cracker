---
title: Distinct Subsequences
leetcode: null
difficulty: Medium
patterns: [Counting DP, Prefix DP]
companies: [Google, LinkedIn, Capgemini]
frequency: 3
tags: [dynamic-programming, strings, counting]
sampleInput: |
  babgbag
  bag
sampleOutput: "5"
---

# Distinct Subsequences

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Counting DP · Prefix DP |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Adobe |

## Problem Statement

Given a source string `s` and a target string `t`, count how many ways there are to choose indices `i₁ < i₂ < … < iₖ` from `s` such that `s[i₁] s[i₂] … s[iₖ] = t`.

Different index selections count as different ways, even when they spell the same string.

## Input Format

The program reads from standard input:

```
s
t
```

- `s` — the source string (1 ≤ |s| ≤ 1000)
- `t` — the target string (1 ≤ |t| ≤ 1000)

## Sample Input

```
babgbag
bag
```

## Expected Output

```
5
```

The index triples that spell `b`,`a`,`g` in order are `(0,1,3)`, `(0,1,6)`, `(0,5,6)`, `(2,5,6)` and `(4,5,6)` → **5** ways.

## Approach

This is the classic **subsequence counting** DP:

1. `dp[j]` = the number of ways to form `t[0 .. j-1]` from the prefix of `s` processed so far.
2. `dp[0] = 1` — there is exactly one way to form the empty target: choose nothing.
3. For every character `c` of `s` and every `j` (going **downwards**), if `c == t[j-1]` then
   `dp[j] += dp[j-1]`: every way of forming the shorter prefix can be extended with this    character.
4. The answer is `dp[m]`.

**Why downwards?** The inner loop must read the value of `dp[j-1]` from *before* the current character of `s` was taken. Going upwards would allow the same character to be used twice, which counts the wrong thing.

The same recurrence with a **set** instead of a count answers "how many *distinct* subsequence strings does `s` have" — that variant needs the "last occurrence" correction.

## Dry Run

Input: `s = "babgbag"`, `t = "bag"`.

| `s[i]` | matching `j` values | `dp` after the step |
|---:|---|---|
| `b` | j = 1 | `[1, 1, 0, 0]` |
| `a` | j = 2 | `[1, 1, 1, 0]` |
| `b` | j = 1 | `[1, 2, 1, 0]` |
| `g` | j = 3 | `[1, 2, 1, 1]` |
| `b` | j = 1 | `[1, 3, 1, 1]` |
| `a` | j = 2 | `[1, 3, 4, 1]` |
| `g` | j = 3 | `[1, 3, 4, 5]` |

`dp[3] = 5` → answer **5**.

**The five ways** (indices into `s = b a b g b a g`):

| way | indices | letters |
|---:|---|---|
| 1 | 0, 1, 3 | b a g |
| 2 | 0, 1, 6 | b a g |
| 3 | 0, 5, 6 | b a g |
| 4 | 2, 5, 6 | b a g |
| 5 | 4, 5, 6 | b a g |

**The last step in detail** (`s[6] = 'g'`): `dp[3] += dp[2]` → `1 + 4 = 5`, because the four ways to spell `ba` (using indices up to 5) can each be finished with the `g` at index 6.

**Why the loop goes downwards.** If `j` went upwards, the `g` at index 6 could be used twice in the same pass and the counts would be far too large.

## Java Solution

See [`DistinctSubsequences.java`](./DistinctSubsequences.java).

```java
    public static int countDistinctSubsequences(String s, String t) {
        int m = t.length();
        int[] dp = new int[m + 1];
        dp[0] = 1;

        for (int i = 0; i < s.length(); i++) {
            for (int j = m; j >= 1; j--) {
                if (s.charAt(i) == t.charAt(j - 1)) {
                    dp[j] += dp[j - 1];
                }
            }
        }
        return dp[m];
    }
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n · m) | `n` characters of `s`, each scanning `m` target positions |
| **Space** | O(m) | the `dp` array holds `m + 1` entries |

**Space `O(m)`.** A two-dimensional table `dp[i][j]` (prefix of `s` × prefix of `t`) is the same computation with `O(n·m)` space — the one-dimensional version is its rolled-up form.

## Interview Notes

**Follow-ups to raise yourself:**

- "Count the **distinct** subsequence strings instead of the index selections."* → use the "last occurrence" correction so that two selections producing the same string count once.
- "How many subsequences does `s` have in total?"* → `2ⁿ` minus the empty one, or the classic `dp[i] = 2·dp[i-1] − dp[last(s[i]) − 1]` trick.
- "What if `t` is longer than `s`?"* → the answer is `0`; the DP handles it without a special case.
- "Can you do it in `O(n + m)`?"* → not for arbitrary alphabets; `O(n·m)` is the standard bound.

**Common mistakes:**

- ❌ Iterating `j` upwards — the same character of `s` would be used more than once.
- ❌ Forgetting `dp[0] = 1` — the empty target has exactly one realisation.
- ❌ Counting *distinct strings* when the problem asks for index selections (or the other way round).

**How to narrate:**

> "`dp[j]` counts the ways to spell the first `j` characters of the target using the prefix of the source seen so far. When a character of the source matches `t[j-1]` I add `dp[j-1]` to `dp[j]` — every way of spelling the shorter prefix can be extended with it. The inner loop runs downwards so that the current character is used at most once."

## Related Problems

- [Decode Ways — LeetCode 91](./DecodeWays.java) — the same counting DP over digits
- [Word Break — LeetCode 139](./WordBreak.java) — existence instead of counting
