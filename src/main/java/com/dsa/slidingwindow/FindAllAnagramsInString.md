---
title: Find All Anagrams in a String
leetcode: 438
difficulty: Medium
patterns: [Sliding window, Frequency counting]
companies: [Amazon, Google, Meta, Uber, Adobe]
frequency: 4
tags: [string, sliding-window, hashmap]
sampleInput: |
  cbaebabacd
  abc
sampleOutput: "0 6"
---

# Find All Anagrams in a String — LeetCode 438

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Sliding window · Frequency counting |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Adobe |

## Problem Statement

Given two strings `s` and `p`, return the **start indices** of every substring of `s` that
is an anagram of `p`. The indices may be returned in any order.

- `"cbaebabacd"`, `p = "abc"` → the answers are `[0, 6]` (the substrings `"cba"` and
  `"bac"`).

## Input Format

The program reads from standard input:

```
s
p
```

- `s` — the haystack, a string without whitespace (1 ≤ |s| ≤ 10⁵)
- `p` — the pattern, a string without whitespace (1 ≤ |p| ≤ |s|)

## Sample Input

```
cbaebabacd
abc
```

## Expected Output

```
0 6
```

## Approach — Fixed-size window with a "missing" counter

Every candidate window has length `|p|`, so slide a window of exactly that size across `s`.

Keep:

- `need[c]` — how many times `c` occurs in `p`;
- `window[c]` — how many times `c` occurs in the current window;
- `missing` — the number of **required occurrences** the window is still missing.

**Adding a character `c`.** If `c` is needed and the window holds fewer than `need[c]`
copies, this new copy satisfies one requirement → `missing--`. Then bump `window[c]`.

**Removing a character `c`.** If `c` is needed and the window holds `window[c] <= need[c]`
copies *before* the removal, removing one makes the window fall short → `missing++`. Then
decrement `window[c]`.

The window is an anagram exactly when `missing == 0`, and it starts at `right - |p| + 1`.

**Why the removal test uses `<=` and not `<`.** After removing one copy the window holds
`window[c] - 1` copies. If `window[c] - 1 < need[c]` the window now falls short, i.e.
`window[c] <= need[c]` before the removal. Using a strict `<` would miss the case where
the count is exactly the requirement — which is precisely the common case.

## Dry Run

Input: `s = "cbaebabacd"`, `p = "abc"` — `need = {a:1, b:1, c:1}`, `missing = 3`

| Step | right | char added | char removed | counts of the needed chars | `missing` | anagram? | start index |
|---:|---:|---|---|---|---:|---|---:|
| 1 | 0 | `c` | — | c:1 | 2 | no | — |
| 2 | 1 | `b` | — | b:1 c:1 | 1 | no | — |
| 3 | 2 | `a` | — | a:1 b:1 c:1 | **0** | **yes** | **0** ✓ |
| 4 | 3 | `e` | `c` (right ≥ 3) | a:1 b:1 c:0 | 1 | no | — |
| 5 | 4 | `b` | `b` | a:1 b:1 c:0 | 1 | no | — |
| 6 | 5 | `a` | `a` | a:1 b:1 c:0 | 1 | no | — |
| 7 | 6 | `b` | `e` | a:1 b:1 c:0 | 1 | no | — |
| 8 | 7 | `a` | `b` | a:1 b:1 c:0 | 1 | no | — |
| 9 | 8 | `c` | `a` | a:1 b:1 c:1 | **0** | **yes** | **6** ✓ |
| 10 | 9 | `d` | `b` | a:1 b:0 c:1 | 1 | no | — |

Two anagrams found, at indices `0` and `6`.

### The windows that were a permutation

| Window | start | contents | needed chars present? |
|---|---:|---|---|
| `cba` | 0 | c b a | ✔ a, b, c |
| `bae` | 1 | b a e | ✘ missing c |
| `aeb` | 2 | a e b | ✘ missing c |
| `eba` | 3 | e b a | ✘ missing c |
| `bab` | 4 | b a b | ✘ missing c |
| `aba` | 5 | a b a | ✘ missing c |
| `bac` | 6 | b a c | ✔ a, b, c |
| `acd` | 7 | a c d | ✘ missing b |

Exactly two of the eight windows are anagrams of `"abc"` — the ones starting at `0` and `6`.

## Java Solution

See [`FindAllAnagramsInString.java`](./FindAllAnagramsInString.java).

```java
public static List<Integer> findAnagrams(String s, String p) {
    List<Integer> result = new ArrayList<>();
    if (p.isEmpty() || s.length() < p.length()) {
        return result;
    }
    int[] need = new int[26];
    for (char c : p.toCharArray()) {
        need[c - 'a']++;
    }
    int[] window = new int[26];
    int missing = p.length();

    for (int right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        if (need[c - 'a'] > 0 && window[c - 'a'] < need[c - 'a']) {
            missing--;
        }
        window[c - 'a']++;

        if (right >= p.length()) {
            char removed = s.charAt(right - p.length());
            int index = removed - 'a';
            if (need[index] > 0 && window[index] <= need[index]) {
                missing++;
            }
            window[index]--;
        }

        if (missing == 0 && right >= p.length() - 1) {
            result.add(right - p.length() + 1);
        }
    }
    return result;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(\|s\| + \|p\|) | One pass over both strings |
| **Space** | O(1) for the counters, O(k) for the answer | k = number of matches |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Return just the first anagram."* → return the index as soon as `missing == 0`.
- *"How would you do this in a single pass over a stream?"* → the same algorithm; the
  window start is `right - |p| + 1`.
- *"What if the pattern is much longer than the text?"* → return an empty list immediately.
- *"What if the alphabet is not lowercase English?"* → use a `HashMap<Character, Integer>`.

**Common mistakes:**
- ❌ Using `<` instead of `<=` in the removal test → the `b` removal at step 5 would not
  have re-opened the requirement and the counters would drift.
- ❌ Reporting the index as `right` instead of `right - |p| + 1`.
- ❌ Checking `missing == 0` before the window is full → `missing` can only reach 0 once the
  window has |p| characters, but the explicit `right >= p.length() - 1` guard makes the
  intent clear.
- ❌ Forgetting that `p` may contain repeated characters → the counters handle them, but a
  naive "set of characters" check would not.

**How to narrate:**
> "An anagram has the same character counts as the pattern, so every candidate window has the
> pattern's length. I slide that window across the text and keep a counter of how many
> required occurrences are still missing. Adding a character fills a requirement if it was
> needed; removing one re-opens a requirement if the window was not carrying extra copies.
> When the counter hits zero I record `right - |p| + 1`."

## Related Problems

- [Permutation in String](./PermutationInString.java) — the boolean version
- [Minimum Window Substring](./MinimumWindowSubstring.java) — the variable-size version
- [Longest Substring Without Repeating Characters](./LongestSubstringWithoutRepeatingCharacters.java) — the opposite constraint
