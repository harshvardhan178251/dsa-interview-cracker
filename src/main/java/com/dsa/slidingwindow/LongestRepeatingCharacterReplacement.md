---
title: Longest Repeating Character Replacement
leetcode: 424
difficulty: Medium
patterns: [Sliding window, Greedy]
companies: [Amazon, Meta, Facebook, LinkedIn, Spotify, HCLTech, Cognizant, Dell]
frequency: 4
tags: [string, sliding-window, greedy]
sampleInput: |
  AABABBA
  1
sampleOutput: "4"
---

# Longest Repeating Character Replacement — LeetCode 424

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Sliding window · Greedy |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, LinkedIn |

## Problem Statement

Given a string `s` and an integer `k`, return the length of the longest substring of `s`
such that **at most `k` characters** can be replaced to make all of them equal.

- `"AABABBA"`, `k = 1` → the answer is `4` (`"BABA"` → `"AAAA"`, or `"AABA"` → `"AAAA"`).
- `"ABAB"`, `k = 2` → the answer is `4`.

## Input Format

The program reads from standard input:

```
s
k
```

- `s` — a non-empty string without whitespace (1 ≤ |s| ≤ 10⁵)
- `k` — the number of replacements allowed (0 ≤ k ≤ |s|)

## Sample Input

```
AABABBA
1
```

## Expected Output

```
4
```

## Approach — Sliding window with a frequency budget

A window of length `L` whose most common character appears `f` times can be made uniform
with exactly `L - f` replacements. So the window is valid iff

```
windowLength - maxFrequency <= k
```

Slide `right` forward, maintaining the frequency map and `maxFrequency` — the largest
character count seen so far. Whenever the window becomes invalid, move `left` forward until
it is valid again.

**Why `maxFrequency` is never decreased.** This is the subtle part. If `maxFrequency` came
from a character that has since left the window, the real number of replacements needed is
*smaller* than `L - maxFrequency`, so keeping the stale (larger) `maxFrequency` is
**conservative** — the window we accept is still valid, we might just accept a slightly
shorter one. Not decreasing it keeps the algorithm O(n) instead of O(n²) (recomputing the
true maximum on every shrink would be expensive).

## Dry Run

Input: `s = "AABABBA"`, `k = 1`

| Step | right | char | window | `maxCount` | `len - maxCount` | `left` | valid? | best |
|---:|---:|---|---|---:|---:|---:|---|---:|
| 1 | 0 | `A` | `A` | 1 | 1 - 1 = 0 | 0 | yes | 1 |
| 2 | 1 | `A` | `AA` | 2 | 2 - 2 = 0 | 0 | yes | 2 |
| 3 | 2 | `B` | `AAB` | 2 | 3 - 2 = 1 | 0 | yes | 3 |
| 4 | 3 | `A` | `AABA` | 3 | 4 - 3 = 1 | 0 | yes | 4 |
| 5 | 4 | `B` | `AABAB` | 3 | 5 - 3 = 2 | 0 | **no** → shrink | 4 |
| 5a | 4 | `B` | `ABAB` (left = 1) | 3 | 4 - 3 = 1 | 1 | yes | 4 |
| 6 | 5 | `B` | `ABABB` | 3 | 5 - 3 = 2 | 1 | **no** → shrink | 4 |
| 6a | 5 | `B` | `BABB` (left = 2) | 3 | 4 - 3 = 1 | 2 | yes | 4 |
| 7 | 6 | `A` | `ABBA` + `A` → `ABBAA`? | 3 | 5 - 3 = 2 | 2 | **no** → shrink | 4 |
| 7a | 6 | `A` | `ABBA` (left = 3) | 3 | 4 - 3 = 1 | 3 | yes | **4** |

Answer: **4**.

### The frequency map at the end

| Character | `A` | `B` |
|---|---:|---:|
| count in the final window `"ABBA"` | 2 | 2 |

`4 - 3 = 1 ≤ k = 1` — one replacement turns `"ABBA"` into `"AAAA"`.

## Java Solution

See [`LongestRepeatingCharacterReplacement.java`](./LongestRepeatingCharacterReplacement.java).

```java
public static int characterReplacement(String s, int k) {
    Map<Character, Integer> count = new HashMap<>();
    int left = 0;
    int maxCount = 0;
    int best = 0;
    for (int right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        count.merge(c, 1, Integer::sum);
        if (count.get(c) > maxCount) {
            maxCount = count.get(c);
        }
        while (right - left + 1 - maxCount > k) {
            count.merge(s.charAt(left), -1, Integer::sum);
            left++;
        }
        best = Math.max(best, right - left + 1);
    }
    return best;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Each character enters and leaves the window once |
| **Space** | O(min(n, Σ)) | One map entry per distinct character |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the string has a fixed alphabet?"* → use a 26- or 128-entry array instead of a map.
- *"Return the substring too."* → remember the best `left` and `right`.
- *"What if exactly `k` replacements are required?"* → the constraint becomes
  `windowLength - maxFrequency == k`, so you must *grow* the window as well as shrink it.
- *"Why is `maxCount` allowed to be stale?"* → because it only ever over-estimates the
  number of replacements needed, so the accepted window is always valid; recomputing the
  true maximum would cost O(n) per shrink.

**Common mistakes:**
- ❌ Decreasing `maxCount` when the most common character leaves the window → the classic
  wrong answer is `3` instead of `4` for `"AABABBA"`, `k = 1`.
- ❌ Using `==` instead of `<=` for the validity test → off-by-one.
- ❌ Forgetting to decrement the frequency of the character leaving the window → the map
  drifts and the window shrinks too much.
- ❌ Assuming the most common character of the *whole string* is the one to target → it is
  the most common character **of the current window**.

**How to narrate:**
> "A window of length L whose most common character appears f times needs exactly L - f
> replacements to become uniform. So I slide a window and keep it valid while
> `length - maxFrequency <= k`. I keep `maxFrequency` as the largest count seen so far and
> never decrease it — that only makes the test stricter, never wrong, and it keeps the
> solution linear."

## Related Problems

- [Longest Substring Without Repeating Characters](./LongestSubstringWithoutRepeatingCharacters.java) — the same window with a budget of zero duplicates
- [Minimum Window Substring](./MinimumWindowSubstring.java) — a window that must contain everything
- [Longest Subarray with At Most K Distinct](./LongestSubarrayWithAtMostKDistinct.java) — the array version
