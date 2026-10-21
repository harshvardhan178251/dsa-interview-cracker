---
title: Longest Substring Without Repeating Characters
leetcode: 3
difficulty: Medium
patterns: [Sliding window, Hashing, Two pointers]
companies: [Amazon, Meta, Google, Netflix, Salesforce, Bloomberg, Flipkart, Capgemini, Cognizant, EY]
frequency: 5
tags: [string, sliding-window, hashmap]
sampleInput: |
  abcabcbb
sampleOutput: "3"
---

# Longest Substring Without Repeating Characters — LeetCode 3

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Sliding window · Hashing · Two pointers |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Uber, Adobe, Bloomberg |

## Problem Statement

Given a string `s`, return the length of the **longest substring** that does not contain any
repeated character.

- The substring must be contiguous.
- `"abcabcbb"` → the answer is `"abc"`, length `3`.
- `"bbbbb"` → the answer is `"b"`, length `1`.
- `"pwwkew"` → the answer is `"wke"`, length `3`.

## Input Format

The program reads from standard input:

```
s
```

- `s` — a non-empty string without whitespace (1 ≤ |s| ≤ 5·10⁴)

## Sample Input

```
abcabcbb
```

## Expected Output

```
3
```

The longest duplicate-free substring is `"abc"`.

## Approach — Sliding window with a last-seen map

Keep a window `[left, right]` that contains no repeated character, plus a map
`lastSeen` recording the **last index** each character was seen at.

For each new `right`:

1. Let `c = s[right]`.
2. If `c` was seen before **inside the current window** (`lastSeen[c] >= left`), the window
   would now contain `c` twice. Move `left` to `lastSeen[c] + 1`, which drops the older
   occurrence.
3. Record `lastSeen[c] = right`.
4. Update the answer with `right - left + 1`.

**The `>= left` check is the whole trick.** The map holds the last occurrence *anywhere* in
the string, but an occurrence that has already been dropped from the window must not drag
`left` backwards. Without the check, `left` could move backwards and the window could grow
again, breaking the invariant.

**Why this is optimal.** The window is always the *longest* duplicate-free substring ending
at `right`: we only ever move `left` when it is forced to. So the maximum over all `right`
is the answer.

## Dry Run

Input: `s = "abcabcbb"`

| Step | right | char | `lastSeen` before | previous index | `left` before | `left` after | window | length | best |
|---:|---:|---|---|---:|---:|---:|---|---:|---:|
| 1 | 0 | `a` | `{}` | — | 0 | 0 | `a` | 1 | 1 |
| 2 | 1 | `b` | `{a: 0}` | — | 0 | 0 | `ab` | 2 | 2 |
| 3 | 2 | `c` | `{a: 0, b: 1}` | — | 0 | 0 | `abc` | 3 | 3 |
| 4 | 3 | `a` | `{a: 0, b: 1, c: 2}` | 0 | 0 | 1 | `bca` | 3 | 3 |
| 5 | 4 | `b` | `{a: 3, b: 1, c: 2}` | 1 | 1 | 2 | `cab` | 3 | 3 |
| 6 | 5 | `c` | `{a: 3, b: 4, c: 2}` | 2 | 2 | 3 | `abc` | 3 | 3 |
| 7 | 6 | `b` | `{a: 3, b: 4, c: 5}` | 4 | 3 | 5 | `cb` | 2 | 3 |
| 8 | 7 | `b` | `{a: 3, b: 6, c: 5}` | 6 | 5 | 7 | `b` | 1 | **3** |

Note step 7: the previous `b` was at index `4`, but index `4 < left (3)`, so the window is
untouched — `left` stays at `3`.

## Java Solution

See [`LongestSubstringWithoutRepeatingCharacters.java`](./LongestSubstringWithoutRepeatingCharacters.java).

```java
public static int lengthOfLongestSubstring(String s) {
    Map<Character, Integer> lastSeen = new HashMap<>();
    int left = 0;
    int best = 0;
    for (int right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        Integer previous = lastSeen.get(c);
        if (previous != null && previous >= left) {
            left = previous + 1;
        }
        lastSeen.put(c, right);
        best = Math.max(best, right - left + 1);
    }
    return best;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Each pointer moves forward at most n times |
| **Space** | O(min(n, Σ)) | One map entry per distinct character |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Return the substring, not just its length."* → remember the `left` of the best window.
- *"What if the alphabet is small (say 26 lowercase letters)?"* → replace the map with a
  fixed-size array of size 26 — faster and allocation-free.
- *"What if you need the longest substring with at most `k` distinct characters?"* → same
  window, count distinct instead of detecting repeats.
- *"How would you do this in a streaming fashion, where the string arrives chunk by
  chunk?"* → keep the map and the window start; the answer so far is valid but the window
  may need to be re-scanned if a very old duplicate arrives.

**Common mistakes:**
- ❌ Forgetting the `previous >= left` check → `left` can move backwards and the window
  contains a duplicate.
- ❌ Setting `left = previous` instead of `previous + 1` → the duplicate stays in the window.
- ❌ Using `s.charAt(i)` on a string being mutated → use a `char[]` if you plan to modify it.
- ❌ Resetting the map when `left` moves → you would lose the last-seen information for
  characters still inside the window.

**How to narrate:**
> "I'll keep a window with no repeated characters and a map from each character to the index
> where it last appeared. When a character repeats inside the window I move the left edge
> just past its previous occurrence — and I only do that if the previous occurrence is still
> inside the window. The window is always the longest valid one ending at the current right
> edge, so the maximum over all steps is the answer."

## Related Problems

- [Longest Repeating Character Replacement](./LongestRepeatingCharacterReplacement.java) — the same window with a budget of replacements
- [Minimum Window Substring](./MinimumWindowSubstring.java) — a window that must *contain* everything
- [Longest Subarray with At Most K Distinct](./LongestSubarrayWithAtMostKDistinct.java) — the array version
