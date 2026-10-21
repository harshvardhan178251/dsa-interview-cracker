---
title: Regular Expression Matching
leetcode: 10
difficulty: Hard
patterns: [2-D DP, String DP]
companies: [Google, Meta, Bloomberg, Salesforce, Walmart]
frequency: 4
tags: [dynamic-programming, strings, regex, hard]
sampleInput: |
  aab
  c*a*b
sampleOutput: "1"
---

# Regular Expression Matching — LeetCode 10

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | 2-D DP · String DP |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft |

## Problem Statement

Implement regular expression matching for a text `s` and a pattern `p` with full support of:

- `.` — matches any single character
- `*` — matches zero or more of the element that precedes it

The matching must cover the **entire** input string (not a partial match).

Examples: `"aa"` matches `"a"`, `"aa"` matches `"a*"` and `"ab"` does **not** match `"a*"`.

## Input Format

The program reads from standard input:

```
s
p
```

- `s` — the text (1 ≤ |s| ≤ 20)
- `p` — the pattern (1 ≤ |p| ≤ 20, only lower case letters, `.` and `*`)

## Sample Input

```
aab
c*a*b
```

## Expected Output

```
1
```

`c*` matches the empty string, `a` matches the first `a`, `a*` matches the second `a` and `b` matches the `b` → **1**.

## Approach

`dp[i][j]` = "the first `i` characters of `s` match the first `j` characters of `p`".

**Without a `*`:** the last characters must match (`p[j-1]` is a literal or `.`), and the rest must match too:

`dp[i][j] = matches(s[i-1], p[j-1]) && dp[i-1][j-1]`

**With a `*` at `p[j-1]`:** the `*` belongs to the element `p[j-2]`, so there are two cases:

1. the element matches **zero** times → `dp[i][j-2]`;
2. the element matches **one more** time → `matches(s[i-1], p[j-2]) && dp[i-1][j]`.

`dp[i][j] = dp[i][j-2] || (matches(s[i-1], p[j-2]) && dp[i-1][j])`

**Base cases.** `dp[0][0] = true`; an empty text matches a pattern such as `a*b*` because each `x*` group can match zero times, so `dp[0][j] = dp[0][j-2]` whenever `p[j-1] == '*'`.

## Dry Run

Input: `s = "aab"`, `p = "c*a*b"`.

| | `""` | `c` | `c*` | `c*a` | `c*a*` | `c*a*b` |
|---|---|---|---|---|---|---|
| `""` | true | false | true | false | true | false |
| `a` | false | false | false | true | true | false |
| `aa` | false | false | false | false | true | false |
| `aab` | false | false | false | false | false | **true** |

The bottom-right cell is true → answer **1**.

**The two ways a `*` can act** (at `dp[i][j]` with `p[j-1] == '*'`):

| case | meaning | cell |
|---|---|---|
| zero occurrences | `p[j-2]` matches nothing | `dp[i][j-2]` |
| one more occurrence | `p[j-2]` matches `s[i-1]` | `matches(s[i-1], p[j-2]) && dp[i-1][j]` |

**The last cell in detail** (`dp[3][5]`, `p[4] = '*'`):

| case | check | value |
|---|---|---|
| zero | `dp[3][3]` = false (`c*a` cannot match `aab`) | false |
| one more | `p[3] = 'a'` matches `s[2] = 'b'`? no | false |

So `dp[3][5]` is false — but the answer comes from `dp[3][6]`:

| cell | check | value |
|---|---|---|
| `dp[3][6]` (literal `b`) | `p[5] = 'b'` matches `s[2] = 'b'` and `dp[2][5]` = true | **true** |

The match is `c*` (empty) + `a` + `a*` (one `a`) + `b` ✓

## Java Solution

See [`RegexMatching.java`](./RegexMatching.java).

```java
    public static boolean isMatch(String s, String p) {
        int n = s.length();
        int m = p.length();
        boolean[][] dp = new boolean[n + 1][m + 1];
        dp[0][0] = true;

        for (int j = 1; j <= m; j++) {
            if (p.charAt(j - 1) == '*' && j >= 2) {
                dp[0][j] = dp[0][j - 2];
            }
        }

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                char pc = p.charAt(j - 1);
                if (pc == '*') {
                    boolean zero = j >= 2 && dp[i][j - 2];
                    boolean more = j >= 2 && matches(s.charAt(i - 1), p.charAt(j - 2)) && dp[i - 1][j];
                    dp[i][j] = zero || more;
                } else {
                    dp[i][j] = matches(s.charAt(i - 1), pc) && dp[i - 1][j - 1];
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

**Space can be `O(m)`** by rolling the rows — the `*` case needs `dp[i][j-2]` and `dp[i-1][j]`, so two rows are enough.

## Interview Notes

**Follow-ups to raise yourself:**

- "What if the pattern may contain `+` and `?`?"* → they are easy: `+` is `*` with a mandatory first occurrence, `?` is "zero or one".
- "What about parentheses and alternation?"* → the state needs a stack of sub-expressions — that is the full regex engine.
- "Can you match a whole file against a pattern?"* → the same idea, but the pattern is compiled into a state machine (Thompson's construction) instead of a table.
- "Why is the empty text matched by `c*a*b`?"* → no: `dp[0][6]` is false, because the trailing `b` needs a character.

**Common mistakes:**

- ❌ Treating `*` as a standalone wildcard (it belongs to the element **before** it).
- ❌ Forgetting the `dp[0][j]` base cases for patterns like `a*b*`.
- ❌ Using `dp[i][j-1]` instead of `dp[i][j-2]` in the "zero occurrences" case.
- ❌ Allowing a partial match — the answer must be `dp[n][m]`.

**How to narrate:**

> "`dp[i][j]` is whether the first `i` characters of the text match the first `j` characters of the pattern. Without a star the last characters simply have to match. With a star the star belongs to the previous element, and there are two possibilities: that element matches zero times, so I jump two columns back, or it matches one more character, so I stay in the same column and go one row up. The answer is `dp[n][m]` — the whole text has to match."

## Related Problems

- [Wildcard Matching — LeetCode 44](./WildcardMatching.java) — the same table with `?` instead of `*`
- [Edit Distance — LeetCode 72](./EditDistance.java) — the other classic string DP
