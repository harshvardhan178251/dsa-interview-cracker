---
title: Wildcard Matching
leetcode: 44
difficulty: Hard
patterns: [2-D DP, String DP, Greedy]
companies: [Meta, Google, Facebook, Adobe, Lyft, Accenture, TCS, Razorpay]
frequency: 4
tags: [dynamic-programming, strings, hard]
sampleInput: |
  adceb
  *a*b
sampleOutput: "1"
---

# Wildcard Matching — LeetCode 44

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | 2-D DP · String DP · Greedy |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Facebook |

## Problem Statement

Given an input string `s` and a pattern `p`, implement wildcard matching with support for:

- `?` — matches any **single** character
- `*` — matches any **sequence** of characters (including the empty sequence)

Return `true` when the whole string matches the whole pattern.

## Input Format

The program reads from standard input:

```
s
p
```

- `s` — the text (1 ≤ |s| ≤ 2000)
- `p` — the pattern (1 ≤ |p| ≤ 2000, only `*`, `?` and lower case letters)

## Sample Input

```
adceb
*a*b
```

## Expected Output

```
1
```

The pattern `*a*b` matches `adceb`: the first `*` eats `d`, the `a` matches `a`, the second `*` eats `ce` and the `b` matches `b` → **1**.

## Approach

`dp[i][j]` = "the first `i` characters of `s` match the first `j` characters of `p`".

- **Base case** `dp[0][0] = true` (empty matches empty).
- **Empty text**: `dp[0][j]` is true only while the pattern consists of `*`s.
- **Pattern character `?`**: it matches exactly one character → `dp[i][j] = dp[i-1][j-1]`.
- **Pattern character a letter**: `dp[i][j] = dp[i-1][j-1] && letter == s[i-1]`.
- **Pattern character `*`**: it either matches the empty string (`dp[i][j-1]`) or it swallows   `s[i-1]` and keeps matching the rest of the pattern (`dp[i-1][j]`).
  `dp[i][j] = dp[i][j-1] || dp[i-1][j]`.

There is also an `O(n · m)` **greedy** solution with `O(1)` space: remember the last seen `*`, and when a mismatch happens, let the last `*` swallow one more character. It is shorter to write but much harder to prove — the DP is the safer interview answer.

## Dry Run

Input: `s = "adceb"`, `p = "*a*b"`.

| | `""` | `*` | `*a` | `*a*` | `*a*b` |
|---|---|---|---|---|---|
| `""` | true | true | false | true | false |
| `a` | false | true | true | true | false |
| `ad` | false | true | false | true | false |
| `adc` | false | true | false | true | false |
| `adce` | false | true | false | true | false |
| `adceb` | false | true | false | true | **true** |

The bottom-right cell is true → answer **1**.

**The two ways a `*` can act.** At `dp[i][j]` with `p[j-1] == '*'`:

- `dp[i][j-1]` — the `*` matches the empty string, so the rest of the pattern must already match   the same text prefix.
- `dp[i-1][j]` — the `*` swallows `s[i-1]`, so the same pattern prefix has to match one character   less of the text.

**Reading the match.** `*a*b` against `adceb`: the first `*` takes `d`, `a` takes `a`, the second `*` takes `ce`, `b` takes `b`.

**A failing case.** `s = "aa"`, `p = "a"` → `dp[2][1]` is false (the text has one character too many) → answer 0.

## Java Solution

See [`WildcardMatching.java`](./WildcardMatching.java).

```java
    public static boolean isMatch(String s, String p) {
        int n = s.length();
        int m = p.length();
        boolean[][] dp = new boolean[n + 1][m + 1];
        dp[0][0] = true;

        for (int j = 1; j <= m; j++) {
            dp[0][j] = dp[0][j - 1] && p.charAt(j - 1) == '*';
        }

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                char pc = p.charAt(j - 1);
                if (pc == '*') {
                    dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
                } else if (pc == '?') {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = dp[i - 1][j - 1] && pc == s.charAt(i - 1);
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

**Space can be `O(m)`** by rolling the rows (the `*` case needs the cell above *and* the cell to the left, so one row plus one saved boolean is enough).

## Interview Notes

**Follow-ups to raise yourself:**

- "Can you do it greedily?"* → yes: keep the last `*` position and the text position it was at, and on a mismatch let the `*` absorb one more character — `O(n·m)` time, `O(1)` space.
- "What about `**` or a `[a-z]` character class?"* → a character class needs a set lookup per cell.
- "What if the pattern has to match the **whole** string?"* → that is what `dp[n][m]` checks — returning `dp[n][j]` would wrongly allow a trailing pattern.
- "How does this relate to regex matching?"* → see [Regex Matching](./RegexMatching.java), which adds `+` and parentheses.

**Common mistakes:**

- ❌ Forgetting the `dp[0][j]` initialisation for a pattern that starts with `*`s.
- ❌ Implementing `*` as "matches exactly one character" (that is `?`).
- ❌ Using `dp[i][j-1] && dp[i-1][j]` instead of `||` — a `*` may do either.

**How to narrate:**

> "`dp[i][j]` says whether the first `i` characters of the text match the first `j` characters of the pattern. A literal or `?` consumes one character from both sides. A `*` is the interesting one: it either matches nothing, which is the cell to the left, or it swallows one more character, which is the cell above — so the cell is the OR of those two. That is `O(n·m)`."

## Related Problems

- [Regex Matching — LeetCode 10](./RegexMatching.java) — the richer grammar
- [Edit Distance — LeetCode 72](./EditDistance.java) — the same table shape
