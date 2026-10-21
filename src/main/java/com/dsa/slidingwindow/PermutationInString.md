---
title: Permutation in String
leetcode: 567
difficulty: Medium
patterns: [Sliding window, Frequency counting, Hashing]
companies: [Google, Meta, JP Morgan, Goldman Sachs, eBay, Cognizant, HCLTech, Sony]
frequency: 4
tags: [string, sliding-window, hashmap]
sampleInput: |
  ab
  eidbaooo
sampleOutput: "true"
---

# Permutation in String — LeetCode 567

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Sliding window · Frequency counting · Hashing |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Adobe |

## Problem Statement

Given two strings `s1` and `s2`, return `true` if `s2` contains a **permutation** of `s1`;
otherwise return `false`.

- A permutation of `s1` is a rearrangement of its characters, so the two strings must have
  exactly the same character counts.
- `"ab"`, `"eidbaooo"` → `true` (the substring `"ba"`).
- `"ab"`, `"eidboaoo"` → `false`.

## Input Format

The program reads from standard input:

```
s1
s2
```

- `s1` — the pattern, a string without whitespace (1 ≤ |s1| ≤ 26)
- `s2` — the haystack, a string without whitespace (1 ≤ |s2| ≤ 10⁵)

## Sample Input

```
ab
eidbaooo
```

## Expected Output

```
true
```

`s2` contains `"ba"` (positions 3–4), which is a permutation of `"ab"`.

## Approach — Fixed-size window with a "missing" counter

A permutation has exactly the same character counts as `s1`, so every candidate window has
length `|s1|`. Slide that window across `s2` and maintain:

- `need[c]` — how many times `c` occurs in `s1`;
- `window[c]` — how many times `c` occurs in the current window;
- `missing` — the number of **required occurrences** the window is still missing.

**Adding a character `c`.** If `c` is needed and the window currently holds fewer than
`need[c]` copies, this new copy satisfies one requirement → `missing--`. Then bump
`window[c]`.

**Removing a character `c`.** If `c` is needed and the window holds `window[c] <= need[c]`
copies *before* the removal, then removing one makes the window fall short → `missing++`.
Then decrement `window[c]`.

The window is a permutation exactly when `missing == 0`.

**Why not just compare the two arrays on every step?** That works, but it costs O(26) per
position. The `missing` counter keeps the inner work O(1).

## Dry Run

Input: `s1 = "ab"`, `s2 = "eidbaooo"` — `need = {a:1, b:1}`, `missing = 2`

| Step | i | char added | char removed | `window` | `need` | `missing` | permutation? |
|---:|---:|---|---|---|---|---:|---|
| 1 | 0 | `e` | — | `{e:1}` | `{a:1, b:1}` | 2 | no |
| 2 | 1 | `i` | — | `{e:1, i:1}` | `{a:1, b:1}` | 2 | no |
| 3 | 2 | `d` | `e` (i ≥ 2) | `{d:1, i:1}` | `{a:1, b:1}` | 2 | no |
| 4 | 3 | `b` | `i` | `{b:1, d:1}` | `{a:1, b:1}` | **1** | no — `a` still missing |
| 5 | 4 | `a` | `d` | `{a:1, b:1}` | `{a:1, b:1}` | **0** | **yes → return true** |

At step 4 the `b` fills one of the two requirements (`missing` drops from 2 to 1) and the
removed `i` was not needed, so `missing` stays at 1. At step 5 the `a` fills the last
requirement and the removed `d` was not needed either — `missing` reaches 0 and the window
`"ba"` is a permutation of `"ab"`.

### A miss — `s1 = "ab"`, `s2 = "eidboaoo"`

| Step | i | char added | char removed | `missing` | permutation? |
|---:|---:|---|---|---:|---|
| 1 | 0 | `e` | — | 2 | no |
| 2 | 1 | `i` | — | 2 | no |
| 3 | 2 | `d` | `e` | 2 | no |
| 4 | 3 | `b` | `i` | 1 | no |
| 5 | 4 | `o` | `d` | 1 | no |
| 6 | 5 | `a` | `b` | 1 | no — removing `b` re-opens a requirement |
| 7 | 6 | `o` | `o` | 1 | no |
| 8 | 7 | `o` | `a` | 2 | no |

`missing` never reaches 0 → **false**.

## Java Solution

See [`PermutationInString.java`](./PermutationInString.java).

```java
public static boolean checkInclusion(String s1, String s2) {
    if (s1.length() > s2.length()) {
        return false;
    }
    int[] need = new int[26];
    for (char c : s1.toCharArray()) {
        need[c - 'a']++;
    }
    int[] window = new int[26];
    int missing = s1.length();

    for (int i = 0; i < s2.length(); i++) {
        char c = s2.charAt(i);
        if (need[c - 'a'] > 0 && window[c - 'a'] < need[c - 'a']) {
            missing--;
        }
        window[c - 'a']++;

        if (i >= s1.length()) {
            char removed = s2.charAt(i - s1.length());
            int index = removed - 'a';
            if (need[index] > 0 && window[index] <= need[index]) {
                missing++;
            }
            window[index]--;
        }
        if (missing == 0) {
            return true;
        }
    }
    return false;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(\|s1\| + \|s2\|) | One pass over both strings |
| **Space** | O(1) | Two arrays of 26 counters |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Return the starting index of the permutation."* → return `i - s1.length() + 1` instead
  of `true`.
- *"Return every permutation."* → collect all such indices; that is LeetCode 438.
- *"What if the alphabet is not lowercase English?"* → use a `HashMap<Character, Integer>`
  instead of a 26-element array.
- *"How would you solve it if `s2` were a stream and you wanted to react to each window?"* →
  the same algorithm; emit a signal whenever `missing == 0`.

**Common mistakes:**
- ❌ Comparing the two count arrays for equality but forgetting the window length → a
  window with the right counts but the wrong length would pass.
- ❌ Incrementing `missing` when removing a character whose count is *above* the quota →
  the removal was harmless.
- ❌ Forgetting the `s1.length() > s2.length()` early exit → the window would never be full.
- ❌ Using `c - 'a'` on a non-lowercase character → an out-of-bounds array access.

**How to narrate:**
> "A permutation has the same character counts as the pattern, so every candidate window has
> the same length as `s1`. I slide that window over `s2` and keep a counter of how many
> required occurrences are still missing. Adding a character fills a requirement if it was
> still needed; removing one re-opens a requirement if the window was not carrying extra
> copies. When the counter hits zero the window is a permutation."

## Related Problems

- [Find All Anagrams in a String](./FindAllAnagramsInString.java) — the same window, returning every index
- [Minimum Window Substring](./MinimumWindowSubstring.java) — the same idea with a variable window size
- [Longest Substring Without Repeating Characters](./LongestSubstringWithoutRepeatingCharacters.java) — the opposite constraint
