---
title: Longest Repeating Substring
leetcode: 1062
difficulty: Hard
patterns: [Dynamic programming, Sliding window, String hashing]
companies: [Amazon, Google, Meta, Uber, Airbnb]
frequency: 3
tags: [string, dynamic-programming, sliding-window, hard]
sampleInput: |
  banana
sampleOutput: "3"
---

# Longest Repeating Substring — LeetCode 1062

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Dynamic programming · Sliding window · String hashing |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Airbnb |

## Problem Statement

Given a string `s`, return the length of the **longest substring that occurs at least
twice**. The two occurrences may **overlap**.

- `"banana"` → `3` (the substring `"ana"` appears at indices 1 and 3).
- `"abcd"` → `0` (no substring repeats).
- `"aaaa"` → `3` (the substring `"aaa"` appears at indices 0 and 1).

## Input Format

The program reads from standard input:

```
s
```

- `s` — a non-empty string without whitespace (1 ≤ |s| ≤ 3·10⁴)

## Sample Input

```
banana
```

## Expected Output

```
3
```

## Approach — Longest common prefix of two suffixes

A substring that occurs twice is a common prefix of two different suffixes of `s`. So the
answer is

```
max over 0 <= i < j < n of  lcp(i, j)
```

where `lcp(i, j)` is the length of the longest common prefix of `s[i..]` and `s[j..]`.

`lcp` satisfies a simple recurrence:

```
lcp(i, j) = (s[i] == s[j]) ? 1 + lcp(i + 1, j + 1) : 0
```

This is a classic DP. Rolling it into a **single array** `dp` gives an O(n²) time, O(n)
space solution. The array is filled with `i` going **down** and `j` going **up**:

- `i` descending means `dp[j + 1]` still holds `lcp(i + 1, j + 1)` when we read it;
- `j` ascending means we overwrite `dp[j]` only *after* `dp[j + 1]` has been consumed.

**Overlapping is allowed.** `lcp(1, 3)` for `"banana"` is `3`, even though the two `"ana"`
occurrences share the index `3` — nothing in the definition forbids that.

## Dry Run

Input: `s = "banana"` (n = 6)

The DP rows are `i = 5, 4, 3, 2, 1, 0`; each row fills `j = i+1 .. n-1`.

| row `i` | `s[i]` | `j` | `s[j]` | equal? | `dp[j+1]` (previous row) | `dp[j]` | best so far |
|---:|---|---:|---|---|---:|---:|---:|
| 5 | `a` | — | — | — | — | — | 0 |
| 4 | `n` | 5 | `a` | no | — | 0 | 0 |
| 3 | `a` | 4 | `n` | no | 0 | 0 | 0 |
| 3 | `a` | 5 | `a` | **yes** | 0 | **1** | 1 |
| 2 | `n` | 3 | `a` | no | 1 | 0 | 1 |
| 2 | `n` | 4 | `n` | **yes** | 1 | **2** | 2 |
| 2 | `n` | 5 | `a` | no | 1 | 0 | 2 |
| 1 | `a` | 2 | `n` | no | 0 | 0 | 2 |
| 1 | `a` | 3 | `a` | **yes** | 2 | **3** | **3** ✓ |
| 1 | `a` | 4 | `n` | no | 2 | 0 | 3 |
| 1 | `a` | 5 | `a` | **yes** | 0 | **1** | 3 |
| 0 | `b` | 1–5 | `a n a n a` | no | — | 0 | 3 |

The winning cell is row `i = 1`, column `j = 3`: the suffixes `"anana"` and `"ana"` share
the prefix `"ana"`, so `dp[3] = 3`.

**The ordering matters.** At row `i = 1`, `dp[4]` still holds the value written at row
`i = 2` (`lcp(2, 4) = 2`), so `dp[3] = dp[4] + 1 = 3`. Had the inner loop run downwards,
`dp[4]` would already have been reset to `0` in the current row and the answer would come
out as `2`.

Final answer: **3** — the substring `"ana"` at indices 1 and 3.

### The repeating substrings of `"banana"`

| substring | length | occurrences (start indices) |
|---|---:|---|
| `a` | 1 | 1, 3, 5 |
| `n` | 1 | 2, 4 |
| `an` | 2 | 2, 4 |
| `na` | 2 | 1, 3 |
| `ana` | 3 | 1, 3 ✓ |
| `nan` | 3 | — |
| `anan` | 4 | — |
| `anana` | 5 | — |

The longest is `"ana"` with length **3**.

## Java Solution

See [`LongestRepeatingSubstring.java`](./LongestRepeatingSubstring.java).

```java
public static int longestRepeatingSubstring(String s) {
    int n = s.length();
    int[] dp = new int[n + 1];
    int best = 0;
    for (int i = n - 1; i >= 0; i--) {
        // Ascending j keeps dp[j + 1] on the previous row while dp[j] is rewritten.
        for (int j = i + 1; j < n; j++) {
            if (s.charAt(i) == s.charAt(j)) {
                dp[j] = dp[j + 1] + 1;
                if (dp[j] > best) {
                    best = dp[j];
                }
            } else {
                dp[j] = 0;
            }
        }
    }
    return best;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n²) | Every pair (i, j) with i < j is examined |
| **Space** | O(n) | One DP row |

**Alternative.** A rolling hash with binary search on the length gives O(n log n) time and
O(n) space — better asymptotically, but hash collisions make it fiddly. Mention it as a
follow-up rather than the main solution.

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do better than O(n²)?"* → rolling hash + binary search on the answer, O(n log n);
  or suffix-array / suffix-automaton techniques.
- *"Do the occurrences have to be non-overlapping?"* → if they must not overlap, the answer
  changes (e.g. `"aaa"` would be `1`, not `2`), and the DP needs a different guard.
- *"Return the two start indices."* → keep the `(i, j)` pair that produced the maximum.
- *"How does this relate to the longest common substring of two different strings?"* → it is
  the same DP with the two strings kept apart.

**Common mistakes:**
- ❌ Iterating `j` **downwards** in the inner loop → `dp[j + 1]` has already been
  overwritten in the current row, and the answer comes out too small (2 instead of 3 for
  `"banana"`).
- ❌ Requiring the two occurrences to be disjoint → the answer for `"banana"` is still 3.
- ❌ Forgetting to reset `dp[j]` to `0` when the characters differ → stale values leak into
  later rows.
- ❌ Comparing `s.charAt(i)` with `s.charAt(j)` but storing into `dp[i]` instead of `dp[j]`.

**How to narrate:**
> "A repeating substring is a common prefix of two different suffixes, so I want the largest
> `lcp(i, j)` over all `i < j`. The LCP obeys `lcp(i, j) = s[i] == s[j] ? 1 + lcp(i+1, j+1) : 0`,
> which is a DP. I roll it into one array, iterating `i` downwards and `j` upwards so that
> `dp[j + 1]` still holds the previous row when I read it — that's O(n²) time and O(n) space."

## Related Problems

- [Longest Substring Without Repeating Characters](./LongestSubstringWithoutRepeatingCharacters.java) — a different, single-window version
- [Find All Anagrams in a String](./FindAllAnagramsInString.java) — sliding window over a string
