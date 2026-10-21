---
title: Decode Ways
leetcode: 91
difficulty: Medium
patterns: [Prefix DP, String DP]
companies: [Meta, Amazon, Adobe, Goldman Sachs, Flipkart]
frequency: 4
tags: [dynamic-programming, strings]
sampleInput: |
  226
sampleOutput: "3"
---

# Decode Ways — LeetCode 91

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Prefix DP · String DP |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Adobe, Uber |

## Problem Statement

A message containing letters `A` to `Z` is encoded as digits: `A` → `1`, `B` → `2`, …, `Z` → `26`.

Given a string of digits, count the number of ways to decode it. A digit string that cannot be decoded has `0` ways.

## Input Format

The program reads from standard input:

```
s
```

- `s` — the digit string (1 ≤ |s| ≤ 300, digits only)

## Sample Input

```
226
```

## Expected Output

```
3
```

The three decodings are `2 | 2 | 6`, `2 | 26` and `22 | 6`.

## Approach

The same "last block" DP as [Word Break](./WordBreak.java), only with digits instead of words:

1. `dp[i]` = the number of decodings of `s[0 .. i-1]`.
2. `dp[0] = 1` — the empty prefix has exactly one decoding.
3. If `s[i-1] != '0'`, the last letter can be a single digit → `dp[i] += dp[i-1]`.
4. If `i ≥ 2` and the two digits form a number between `10` and `26`, the last letter can be a    two-digit code → `dp[i] += dp[i-2]`.
5. The answer is `dp[n]`.

**The `0` rules.** A lone `0` is not a code, so it contributes nothing. `10` and `20` are valid two-digit codes; `30` and `40` are not. That is exactly what the range check `10 ≤ two ≤ 26` encodes — and why `0` may never start a two-digit code.

## Dry Run

Input: `s = "226"`.

| `i` | prefix | last digit valid alone? | last two digits valid? | `dp[i]` |
|---:|---|---|---|---:|
| 0 | `""` | — | — | **1** (base case) |
| 1 | `2` | yes → `dp[0]` = 1 | — | **1** |
| 2 | `22` | yes → `dp[1]` = 1 | `22` ∈ [10,26] → `dp[0]` = 1 | **2** |
| 3 | `226` | yes → `dp[2]` = 2 | `26` ∈ [10,26] → `dp[1]` = 1 | **3** |

Full table: `dp = [1, 1, 2, 3]` → answer **3**.

**The three decodings of `"226"`**

| decoding | letters | path through the table |
|---|---|---|
| `2 2 6` | B B F | `dp[0] → dp[1] → dp[2] → dp[3]` |
| `2 26` | B Z | `dp[0] → dp[1] → dp[3]` |
| `22 6` | V F | `dp[0] → dp[2] → dp[3]` |

**Leading zero.** `"06"` → `dp[1] = 0` (a lone `0` is not a code) and the pair `06` is not in `[10,26]` → `dp[2] = 0` → the whole string is undecodable.

**Rolling memory.** Only `dp[i-1]` and `dp[i-2]` are read, so two variables suffice — `O(1)` space.

## Java Solution

See [`DecodeWays.java`](./DecodeWays.java).

```java
    public static int decodeWays(String s) {
        int n = s.length();
        int[] dp = new int[n + 1];
        dp[0] = 1;

        for (int i = 1; i <= n; i++) {
            if (s.charAt(i - 1) != '0') {
                dp[i] += dp[i - 1];
            }
            if (i >= 2) {
                int two = (s.charAt(i - 2) - '0') * 10 + (s.charAt(i - 1) - '0');
                if (two >= 10 && two <= 26) {
                    dp[i] += dp[i - 2];
                }
            }
        }
        return dp[n];
    }
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(|s|) | one pass over the digits |
| **Space** | O(|s|) | the `dp` array holds `n + 1` entries |

**Space can be `O(1)`** — keep only the previous two values.

## Interview Notes

**Follow-ups to raise yourself:**

- "What if `0` were also a letter on its own?"* → the single-digit rule changes to `s[i-1] != '0'`.
- "Return the actual decodings?"* → keep a parent array and backtrack.
- "How do you detect an invalid string quickly?"* → scan for a `0` that is not followed by a valid pair, or a leading `0` — `O(n)` without a table.
- "What if the codes were 1..100?"* → the two-digit check becomes a three-digit check.

**Common mistakes:**

- ❌ Allowing `0` as a single digit — `dp` then counts decodings that do not exist.
- ❌ Checking only `two <= 26` without the lower bound `10`, so `06` would be accepted.
- ❌ Forgetting `dp[0] = 1` (the empty decoding).

**How to narrate:**

> "`dp[i]` counts the decodings of the first `i` digits. The last letter either uses one digit — which must not be `0` — or two digits forming a number between 10 and 26. So I add `dp[i-1]` and `dp[i-2]` accordingly. The range check on the pair is what handles the `0` rules for free."

## Related Problems

- [Word Break — LeetCode 139](./WordBreak.java) — the same DP over a dictionary
- [Longest Common Subsequence — LeetCode 1143](./LongestCommonSubsequence.java) — string DP
