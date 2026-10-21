---
title: Word Break
leetcode: 139
difficulty: Medium
patterns: [Prefix DP, HashSet lookups]
companies: [Amazon, Google, Apple, Netflix, Zillow, TCS, HCLTech, Figma]
frequency: 4
tags: [dynamic-programming, strings, hashmap]
sampleInput: |
  2
  leet code
  leetcode
sampleOutput: "1"
---

# Word Break — LeetCode 139

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Prefix DP · HashSet lookups |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Adobe |

## Problem Statement

Given a string `s` and a dictionary `wordDict`, return `true` if `s` can be segmented into a sequence of one or more dictionary words that are **space separated**.

A word may be used as often as the dictionary contains it.

## Input Format

The program reads from standard input:

```
n
word[0] word[1] ... word[n-1]
s
```

- `n` — number of dictionary words (1 ≤ n ≤ 300)
- `word[i]` — a dictionary word (lower case letters only)
- `s` — the string to break (1 ≤ |s| ≤ 300)

## Sample Input

```
2
leet code
leetcode
```

## Expected Output

```
1
```

`leetcode` = `leet` + `code`, so the string can be broken → **1**.

## Approach

A prefix DP:

1. `dp[i]` = true when the first `i` characters of `s` can be segmented.
2. `dp[0] = true` — the empty prefix is trivially breakable, and it is the base case that lets the first word start at position 0.
3. For every position `i` and every dictionary word `word` of length `len ≤ i`, check
   `dp[i - len] && s.startsWith(word, i - len)`. If both hold, `dp[i] = true`.
4. The answer is `dp[s.length()]`.

The condition is exactly "the prefix before the last word is breakable **and** the last word matches here" — the same take-or-skip idea as House Robber, but over prefixes.

The variant **Word Break II** asks for all the segmentations: keep a `parents[i]` list and walk the graph backwards.

## Dry Run

Input: `s = "leetcode"`, dictionary = `{leet, code}`.

| `i` | prefix `s[0..i-1]` | last word tried | `dp[i-len]` | `dp[i]` | why |
|---:|---|---|---|---:|---|
| 0 | `""` | — | — | **true** | base case |
| 1 | `l` | `leet` (len 4 > 1) | — | false | no word fits |
| 2 | `le` | `leet` (len 4 > 2) | — | false | no word fits |
| 3 | `lee` | `leet` (len 4 > 3) | — | false | no word fits |
| 4 | `leet` | `leet` | `dp[0]` = true | **true** | `leet` matches at 0 |
| 5 | `leetc` | `leet` | `dp[1]` = false | false | prefix `l` is not breakable |
| 6 | `leetco` | `leet` | `dp[2]` = false | false | prefix `le` is not breakable |
| 7 | `leetcod` | `leet` | `dp[3]` = false | false | prefix `lee` is not breakable |
| 8 | `leetcode` | `leet` | `dp[4]` = true | **true** | `leet` matches at 0 — then `code` at 4 |

Full table: `dp = [T, F, F, F, T, F, F, F, T]` → answer **true**.

**The `dp[0] = true` base case matters.** It is what lets the first word start at index 0; without it every `dp[i]` stays false.

**Why the check is `dp[i-len] && startsWith(...)`** — both halves are needed: the prefix must be breakable **and** the word must really be there. Either alone gives wrong answers.

## Java Solution

See [`WordBreak.java`](./WordBreak.java).

```java
    public static boolean wordBreak(String s, List<String> wordDict) {
        Set<String> words = new HashSet<>(wordDict);
        int n = s.length();

        boolean[] dp = new boolean[n + 1];
        dp[0] = true;

        for (int i = 1; i <= n; i++) {
            for (String word : words) {
                int len = word.length();
                if (i >= len && dp[i - len] && s.startsWith(word, i - len)) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[n];
    }
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n · L²) | for each of the `|s|` positions every dictionary word is tried; each check is `O(word length)` |
| **Space** | O(|s|) | the `dp` array holds `|s| + 1` booleans plus the dictionary set |

**Time `O(|s| · L²)`** in the worst case, where `L` is the maximum word length: `|s|` positions × `n` words × `O(L)` for the comparison. The inner loop can be restricted to words that actually match, which is what the `startsWith` call does.

## Interview Notes

**Follow-ups to raise yourself:**

- "Print all the ways to break the string."* → Word Break II: store the parents of each reachable prefix and enumerate backwards.
- "What if the words may only be used once?"* → that is a different (0/1) DP over the dictionary.
- "Can it be done in `O(|s| · n)`?"* → yes with a trie, or with a rolling hash instead of `startsWith`.
- "How would you detect a typo?"* → a dictionary of frequencies plus a probabilistic check (Bloom filter / local sensitivity hashing).

**Common mistakes:**

- ❌ Forgetting `dp[0] = true` — nothing can ever be breakable.
- ❌ Checking only that the word appears somewhere, not that it ends at position `i`.
- ❌ Iterating the dictionary in the outer loop over the positions in the inner loop with the same formula — that turns it into a 0/1 variant.

**How to narrate:**

> "I use a prefix DP: `dp[i]` says whether the first `i` characters can be segmented. `dp[0]` is true. For every position I try each dictionary word as the *last* word — the part before it must be breakable and the word must match exactly there. That is `O(|s| · n · L)`."

## Related Problems

- [Decode Ways — LeetCode 91](./DecodeWays.java) — the same "last block" DP over digits
- [Coin Change II — LeetCode 518](./CoinChangeII.java) — count instead of decide
