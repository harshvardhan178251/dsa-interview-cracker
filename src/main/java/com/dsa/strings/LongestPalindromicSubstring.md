---
title: Longest Palindromic Substring
leetcode: 5
difficulty: Medium
patterns: [Expand around centre, Two Pointers]
companies: [Google, Amazon, Airbnb, Netflix, Visa]
frequency: 4
tags: [string, palindrome, expand-around-centre]
sampleInput: |
  babad
sampleOutput: "bab"
---

# Longest Palindromic Substring — LeetCode 5

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Expand around centre · Two Pointers |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Apple |

## Problem Statement

Given a string `s`, return the **longest contiguous substring** of `s` that is a
palindrome.

- If several answers have the same maximum length, any of them may be returned —
  this implementation returns the one that starts **earliest**, so the output is
  deterministic.
- `"babad"` has two length-3 answers: `"bab"` and `"aba"`. This program prints `"bab"`.

## Input Format

The program reads from standard input:

```
s
```

- `s` — the string to scan (1 ≤ |s| ≤ 10³), on a single line, no quotes.

## Sample Input

```
babad
```

## Expected Output

```
bab
```

## Approach — Expand around every centre

Brute force checks every substring: O(n³) with a palindrome test per substring.
The key observation is that **every palindrome has a centre**, and there are only
`2n - 1` possible centres:

- **odd** length → the centre is a character, e.g. `"bab"` is centred on `a`
- **even** length → the centre is a gap, e.g. `"abba"` is centred between the two `b`s

So we try every centre and expand outwards while the two characters match. Each
expansion is a two-pointer walk, and the longest one wins.

| Centre | Odd expansion | Even expansion |
|---|---|---|
| `i` | `(i, i)` | `(i, i + 1)` |

**Why it is correct:** every palindrome in the string is symmetric around exactly one
of those centres, so the maximal expansion from that centre is at least as long as
that palindrome. Taking the maximum over all centres therefore yields the longest
palindrome.

**Tie-breaking:** we only replace the best answer when the new length is *strictly*
greater, and centres are visited left to right, so the earliest (leftmost) longest
palindrome wins.

## Dry Run

Input: `s = "babad"` — indices `0:'b' 1:'a' 2:'b' 3:'a' 4:'d'`

| Step | centre | type | expansion (left, right) | characters compared | length | best (start, len) | best string |
|---:|---:|---|---|---|---:|---|---|
| 1 | 0 | odd | (0, 0) | `b`=`b` ✓ → (-1, 1) stop | 1 | (0, 1) | `b` |
| 2 | 0 | even | (0, 1) | `b`≠`a` ✗ | 0 | (0, 1) | `b` |
| 3 | 1 | odd | (1, 1) | `a`=`a` ✓ → (0, 2) `b`=`b` ✓ → (-1, 3) stop | 3 | (0, 3) | **`bab`** |
| 4 | 1 | even | (1, 2) | `a`≠`b` ✗ | 0 | (0, 3) | `bab` |
| 5 | 2 | odd | (2, 2) | `b`=`b` ✓ → (1, 3) `a`=`a` ✓ → (0, 4) `b`≠`d` ✗ stop | 3 | (0, 3) | `bab` (tie — not strictly longer) |
| 6 | 2 | even | (2, 3) | `b`≠`a` ✗ | 0 | (0, 3) | `bab` |
| 7 | 3 | odd | (3, 3) | `a`=`a` ✓ → (2, 4) `b`≠`d` ✗ stop | 1 | (0, 3) | `bab` |
| 8 | 3 | even | (3, 4) | `a`≠`d` ✗ | 0 | (0, 3) | `bab` |
| 9 | 4 | odd | (4, 4) | `d`=`d` ✓ → (3, 5) stop | 1 | (0, 3) | `bab` |
| 10 | 4 | even | (4, 5) | out of bounds | 0 | (0, 3) | `bab` |

Final answer: `s.substring(0, 0 + 3)` = **`bab`**

### Why the length formula works

When the expansion stops, `left` and `right` are the two indices *just outside* the
palindrome, so the palindrome spans `left + 1 .. right - 1` and its length is
`right - left - 1`.

| centre | odd | even |
|---|---|---|
| 1 in `"babad"` | length 3 → start = `1 - 3/2` = `0` | length 0 → ignored |
| 2 in `"babad"` | length 3 → start = `2 - 3/2` = `1` (`"aba"`, tie) | length 0 → ignored |

For an even-length palindrome of length `L` the start is `centre - (L - 1) / 2`;
for an odd-length one it is `centre - L / 2`.

## Java Solution

See [`LongestPalindromicSubstring.java`](./LongestPalindromicSubstring.java).

```java
public static String longestPalindrome(String s) {
    int bestStart = 0;
    int bestLength = 1;
    for (int centre = 0; centre < s.length(); centre++) {
        int odd = expand(s, centre, centre);
        if (odd > bestLength) {
            bestLength = odd;
            bestStart = centre - odd / 2;
        }
        int even = expand(s, centre, centre + 1);
        if (even > bestLength) {
            bestLength = even;
            bestStart = centre - (even - 1) / 2;
        }
    }
    return s.substring(bestStart, bestStart + bestLength);
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n²) | `2n - 1` centres, each expansion walks at most O(n) steps |
| **Space** | O(1) | Only indices and counters; the answer is a substring view, not a copy |

**Can it be better?** Yes — Manacher's algorithm solves it in **O(n)** using a
mirror trick. It is worth knowing the name, but almost nobody is asked to write it
from scratch.

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it in linear time?"* → Manacher's algorithm (O(n) with a mirror array).
- *"What if the string is very large — millions of characters?"* → the O(n²) version
  stops being practical; go linear or use a rolling hash / suffix approach.
- *"Return the longest palindromic **subsequence** instead?"* → that is a different
  problem, solved with DP in O(n²) time.
- *"What about the longest palindrome that spans the whole string?"* → trivial check,
  but a useful warm-up.

**Common mistakes:**
- ❌ Forgetting the **even** centre (`i, i + 1`) → `"cbbd"` would be missed entirely.
- ❌ Returning the palindrome of length 1 when the string is empty → guard the empty
  case before touching `substring`.
- ❌ Computing the start index with the wrong formula for even lengths → off-by-one
  that slices the wrong substring (e.g. `"abba"` → `"bba"`).

**How to narrate:**
> "Brute force is O(n³). The key insight is that a palindrome is fully described by
> its centre, and there are only 2n-1 centres. For each one I expand outwards with
> two pointers while the characters match, tracking the longest expansion. That's
> O(n²) time and O(1) extra space. If the interviewer wants linear time, that's
> Manacher's algorithm."

## Related Problems

- [Longest Palindromic Subsequence](../../../../../../docs/topics/02-strings.md) — the DP variant, characters may be skipped
- [Valid Palindrome II](../../../../../../docs/topics/02-strings.md) — the two-pointer palindrome scan
