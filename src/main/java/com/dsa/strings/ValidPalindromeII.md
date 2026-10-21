---
title: Valid Palindrome II
leetcode: 680
difficulty: Easy
patterns: [Two Pointers, One deletion]
companies: [Google, Salesforce, Goldman Sachs, Cognizant, Philips]
frequency: 3
tags: [string, palindrome, two-pointers]
sampleInput: |
  abca
sampleOutput: "true"
---

# Valid Palindrome II — LeetCode 680

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Two Pointers · One deletion |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Meta, Google, Microsoft |

## Problem Statement

Given a string `s`, return `true` if `s` can be turned into a palindrome by
deleting **at most one** character.

- The string may contain any character except whitespace.
- Deleting zero characters is allowed (the string may already be a palindrome).
- Exactly one character may be removed, never more.

## Input Format

The program reads from standard input:

```
s
```

- `s` — the string to test (1 ≤ |s| ≤ 10⁵), on a single line, no quotes.

## Sample Input

```
abca
```

## Expected Output

```
true
```

`abca` is not a palindrome, but deleting the `b` leaves `aca` — so the answer is `true`.

## Approach — Two pointers, one mismatch

A string is a palindrome when it reads the same from both ends. Walk two pointers
(`left`, `right`) towards each other:

1. If `s[left] == s[right]`, the pair is fine — move both pointers inwards.
2. Otherwise we have hit the **first mismatch**. This is the only place where the
   single allowed deletion can help, because everything outside `[left, right]`
   already matches.

At the mismatch there are exactly two candidate deletions:

- delete `s[left]` → the rest of the range is `s[left+1 .. right]`
- delete `s[right]` → the rest of the range is `s[left .. right-1]`

If either remaining range is a palindrome, the answer is `true`. Otherwise it is `false`.

**Why only the first mismatch matters:** the deletion must fix *every* mismatch, and
the mismatches outside the first one are already matched by symmetric characters. A
single deletion can only remove one character, so it can only ever fix the pair it
belongs to.

## Dry Run

Input: `s = "abca"` (length 4)

| Step | left | right | `s[left]` | `s[right]` | match? | action |
|---:|---:|---:|---|---|---|---|
| 1 | 0 | 3 | `a` | `a` | ✓ | symmetric — `left++`, `right--` |
| 2 | 1 | 2 | `b` | `c` | ✗ | first mismatch — try both deletions |
| 3a | 2 | 2 | — | — | — | delete `s[1]`: check `s[2..2]` = `"c"` → single char → palindrome ✓ |
| 4 | — | — | — | — | — | **return true** (the `\|\|` short-circuits here) |

The "delete `s[2]`" branch would check `s[1..1]` = `"b"` → also a palindrome, so in
this example *both* single deletions work.

### Trace where both branches fail — `s = "abcd"`

| Step | left | right | `s[left]` | `s[right]` | match? | action |
|---:|---:|---:|---|---|---|---|
| 1 | 0 | 3 | `a` | `d` | ✗ | first mismatch — try both deletions |
| 2a | 1 | 3 | `b` | `d` | ✗ | delete `s[0]`: check `s[1..3]` = `"bcd"` → not a palindrome |
| 2b | 0 | 2 | `a` | `c` | ✗ | delete `s[3]`: check `s[0..2]` = `"abc"` → not a palindrome |
| 3 | — | — | — | — | — | both branches fail → **return false** |

## Java Solution

See [`ValidPalindromeII.java`](./ValidPalindromeII.java).

```java
public static boolean validPalindrome(String s) {
    int left = 0;
    int right = s.length() - 1;
    while (left < right) {
        if (s.charAt(left) != s.charAt(right)) {
            return isPalindromeRange(s, left + 1, right) || isPalindromeRange(s, left, right - 1);
        }
        left++;
        right--;
    }
    return true;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One outer scan plus at most two inner scans, each O(n) |
| **Space** | O(1) | Only two indices; the recursive/substring checks are done by index, never by copying |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if at most `k` deletions are allowed?"* → the greedy "first mismatch" trick
  stops working; you need DP: `dp[i][j] = min(dp[i+1][j] + 1, dp[i][j-1] + 1)`.
- *"Can you do it in one pass without a helper?"* → yes, but the second scan has to
  restart from the mismatch, which is what the helper does anyway.
- *"Return the index you would delete, not just a boolean."* → return `left` or `right`
  from the branch that succeeds.
- *"What about case-insensitivity and non-alphanumeric characters?"* → normalise the
  string first (lowercase, drop non-alphanumerics) — LeetCode 125 / 680 variants.

**Common mistakes:**
- ❌ Trying **every** deletion position → O(n²) and unnecessary; only the first
  mismatch matters.
- ❌ Allowing the helper check to start at `left` instead of `left + 1` (or
  `right` instead of `right - 1`) → you "delete" nothing and the answer is always
  `true`.
- ❌ Comparing `s[left]` with `s[right]` **after** already incrementing them →
  off-by-one that silently accepts `"abcd"`.

**How to narrate:**
> "A palindrome check is a two-pointer scan. Since I may delete at most one
> character, the first pair that doesn't match is the only place a deletion can
> help. At that point I try the two possibilities — delete the left character or
> delete the right one — and check whether the rest of the range is a palindrome.
> That's O(n) time and O(1) space."

## Related Problems

- [Longest Palindromic Substring](../../../../../../docs/topics/02-strings.md) — expand around every centre
- [Valid Palindrome](../../../../../../docs/topics/02-strings.md) — the same scan without the deletion branch
