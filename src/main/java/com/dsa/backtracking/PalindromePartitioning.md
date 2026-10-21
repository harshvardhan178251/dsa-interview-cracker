---
title: Palindrome Partitioning
leetcode: 131
difficulty: Medium
patterns: [Backtracking, Pruning]
companies: [Amazon, Meta, Apple, Salesforce, Flipkart, TCS, Capgemini, Samsung]
frequency: 4
tags: [backtracking, strings]
sampleInput: |
  aab
sampleOutput: |
  a|a|b
  aa|b
---

# Palindrome Partitioning — LeetCode 131

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Backtracking · Pruning |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Given a string `s`, split it into **all** possible partitions where every part is a palindrome.

Return every such partition. The parts of a partition keep the order of the original string.

## Input Format

The program reads from standard input:

```
s
```

- `s` — the string to split (1 ≤ |s| ≤ 16, lower case letters)

## Sample Input

```
aab
```

## Expected Output

```
a|a|b
aa|b
```

The two partitions of `aab`: `["a", "a", "b"]` and `["aa", "b"]`. The parts of a partition keep their original order and are separated by a `|`.

## Approach

The backtracking skeleton with a **validity check** in front of every choice:

1. At position `start`, try every prefix `s[start … end]` as the next part.
2. Only continue when that prefix is a palindrome — otherwise skip it (the pruning).
3. Add the part to the path, recurse from `end + 1`, and **remove the part again** (the    backtrack).
4. When `start` reaches the end of the string, the path is a complete partition — record it.

**Why the pruning is worth it.** Without the palindrome check the search would produce all `2^(n-1)` ways of cutting the string; with it, only the valid partitions survive. For `n = 16` that is the difference between 32 768 and 16 valid partitions.

**The palindrome check.** A string is a palindrome when the characters at both ends are equal all the way to the middle — a two-pointer scan, `O(len)` time.

## Dry Run

Input: `s = "aab"`.

| start | end | part | palindrome? | new path | result |
|---:|---:|---|---|---|---|
| 0 | 0 | `a` | yes | `["a"]` | — |
| 1 | 1 | `a` | yes | `["a", "a"]` | — |
| 2 | 2 | `b` | yes | `["a", "a", "b"]` | **`["a", "a", "b"]`** |
| 1 | 2 | `ab` | no | — | — |
| 0 | 1 | `aa` | yes | `["aa"]` | — |
| 2 | 2 | `b` | yes | `["aa", "b"]` | **`["aa", "b"]`** |
| 0 | 2 | `aab` | no | — | — |

Two partitions were recorded; sorted lexicographically they are printed in the order above.

**The backtrack.** After `["a", "a", "b"]` was recorded, the `b` is removed again, and after the branch `["a", "a"]` is finished the second `a` is removed as well — so the path is `["a"]` again when the next part is tried.

**Why the parts are not sorted inside a partition.** `["a", "a", "b"]` and `["b", "a", "a"]` are different partitions — the parts keep the order of the string. Only the list of partitions is sorted, so the printed output is stable.

**The number of partitions** of `"aab"` is two; for `"aabb"` it is six.

## Java Solution

See [`PalindromePartitioning.java`](./PalindromePartitioning.java).

```java
    public static List<List<String>> partition(String s) {
        List<List<String>> result = new ArrayList<>();
        split(s, 0, new ArrayList<>(), result);
        result.sort((a, b) -> compareLists(a, b));
        return result;
    }
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(2^n · n) | in the worst case every cut of the string is tried, which is `O(2^n)` |
| **Space** | O(n) | the path holds at most `n` parts, the recursion stack is `n` deep |

**Space `O(n)`** apart from the output. The palindrome check is `O(n)` per candidate part, which is why the total time is `O(2^n · n)`.

## Interview Notes

**Follow-ups to raise yourself:**

- "What if I only need the **number** of palindromic partitions?"* → a DP over the prefixes (`dp[i] = sum of dp[j] over the palindromic prefixes s[j..i-1]`).
- "How do I find the **longest** palindromic partition?"* → the same DP with `max` instead of `sum`.
- "Can the palindrome check be faster?"* → precompute `isPalindrome[i][j]` with the classic interval DP, then the check is `O(1)`.
- "What is the difference to a palindrome *substring*?"* → here the string is cut into several palindromes; see [Palindromic Substrings](../dynamicprogramming/PalindromicSubstrings.java).

**Common mistakes:**

- ❌ Sorting the parts inside a partition — that destroys the order of the original string.
- ❌ Forgetting the backtrack, so the parts of the next branch pile up.
- ❌ Checking the palindrome of the whole remaining string instead of the candidate part.
- ❌ Returning the parts of a partition without copying them — the later backtracks would empty them.

**How to narrate:**

> "I try every prefix of the remaining string as the next part and only continue when that prefix is a palindrome — that check is the pruning that keeps the search small. When the whole string is split I record the parts, and after every recursive call I remove the part again. The parts keep their order, so only the list of partitions is sorted."

## Related Problems

- [Sudoku Solver — LeetCode 37](./SudokuSolver.java) — the same skeleton with a validity check
- [Generate Parentheses — LeetCode 22](./GenerateParentheses.java) — the same skeleton with pruning
