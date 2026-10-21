---
title: Minimum Window Substring
leetcode: 76
difficulty: Hard
patterns: [Sliding window, Hashing, Two pointers]
companies: [Meta, Google, JP Morgan, Uber, ByteDance]
frequency: 4
tags: [string, sliding-window, hashmap, hard]
sampleInput: |
  ADOBECODEBANC
  ABC
sampleOutput: "BANC"
---

# Minimum Window Substring — LeetCode 76

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Sliding window · Hashing · Two pointers |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg, Adobe |

## Problem Statement

Given strings `s` and `t`, return the **minimum window** of `s` that contains every character
of `t` — including the multiplicity. For example, `t = "AABC"` needs two `A`s.

- If no such window exists, return the empty string `""`.
- `"ADOBECODEBANC"`, `t = "ABC"` → the answer is `"BANC"`.

## Input Format

The program reads from standard input:

```
s
t
```

- `s` — the haystack, a string without whitespace (1 ≤ |s| ≤ 10⁵)
- `t` — the needle, a string without whitespace (1 ≤ |t| ≤ 10⁵)

## Sample Input

```
ADOBECODEBANC
ABC
```

## Expected Output

```
BANC
```

`"BANC"` contains `A`, `B` and `C`. It is the shortest such window — `"BANCA"` (also 5
characters) and the later `"ANC"` are too short.

## Approach — Expand right, contract left

Maintain two maps: `need` (how many of each character `t` requires) and `window` (how many
the current window holds). Also track `formed` — the number of **distinct** characters whose
required count has been reached.

- **Expand:** add `s[right]` to the window. If this character is needed and its window count
  just reached the required count, increment `formed`.
- **Contract:** while `formed == required` the window is valid — record its length and move
  `left` forward. When the count of a required character drops *below* its requirement,
  decrement `formed` and stop contracting.

**Why `formed` counts distinct characters, not occurrences.** A window of `"AAABBC"` for
`t = "ABC"` has three `A`s but only one `A` is needed; counting occurrences would make
`formed` wrong. The distinct-character count is what tells us the window *covers* `t`.

**Why the left pointer only moves when the window is valid.** Every recorded window is
guaranteed to contain `t`, so every recorded length is a real candidate. Contracting as far
as possible finds the shortest valid window ending at the current `right`.

## Dry Run

Input: `s = "ADOBECODEBANC"`, `t = "ABC"` — `need = {A:1, B:1, C:1}`, `required = 3`

| Step | right | char | window `s[left..right]` | counts of the needed chars | `formed` | valid? | action |
|---:|---:|---|---|---|---:|---|---|
| 1 | 0 | `A` | `A` | A:1 | 1 | no | expand |
| 2 | 1 | `D` | `AD` | A:1 | 1 | no | expand |
| 3 | 2 | `O` | `ADO` | A:1 | 1 | no | expand |
| 4 | 3 | `B` | `ADOB` | A:1 B:1 | 2 | no | expand |
| 5 | 4 | `E` | `ADOBE` | A:1 B:1 | 2 | no | expand |
| 6 | 5 | `C` | `ADOBEC` | A:1 B:1 C:1 | **3** | **yes** | record len **6** → contract |
| 6a | — | drop `A` | `DOBEC` | A:0 B:1 C:1 | 2 | no | stop contracting |
| 7 | 6 | `O` | `DOBECO` | A:0 B:1 C:1 | 2 | no | expand |
| 8 | 7 | `D` | `DOBECOD` | A:0 B:1 C:1 | 2 | no | expand |
| 9 | 8 | `E` | `DOBECODE` | A:0 B:1 C:1 | 2 | no | expand |
| 10 | 9 | `B` | `DOBECODEB` | A:0 B:2 C:1 | 2 | no | expand — `B` is already over quota, so `formed` is unchanged |
| 11 | 10 | `A` | `DOBECODEBA` | A:1 B:2 C:1 | **3** | **yes** | contract |
| 11a | — | drop `D` | `OBECODEBA` | A:1 B:2 C:1 | 3 | yes | len 9 → not better |
| 11b | — | drop `O` | `BECODEBA` | A:1 B:2 C:1 | 3 | yes | len 8 → not better |
| 11c | — | drop `B` | `ECODEBA` | A:1 B:1 C:1 | 3 | yes | len 7 → not better |
| 11d | — | drop `E` | `CODEBA` | A:1 B:1 C:1 | 3 | yes | len 6 → ties the best |
| 11e | — | drop `C` | `ODEBA` | A:1 B:1 C:0 | 2 | no | stop contracting |
| 12 | 11 | `N` | `ODEBAN` | A:1 B:1 C:0 | 2 | no | expand |
| 13 | 12 | `C` | `ODEBANC` | A:1 B:1 C:1 | **3** | **yes** | contract |
| 13a | — | drop `O` | `DEBANC` | A:1 B:1 C:1 | 3 | yes | len 6 → not better |
| 13b | — | drop `D` | `EBANC` | A:1 B:1 C:1 | 3 | yes | len 5 → **best = 5** |
| 13c | — | drop `E` | `BANC` | A:1 B:1 C:1 | 3 | yes | len 4 → **best = 4** ✓ |
| 13d | — | drop `B` | `ANC` | A:1 B:0 C:1 | 2 | no | stop contracting |

The best window recorded is `"BANC"` (length 4), starting at index 9.

### Every window that was a valid candidate

| Window | has A | has B | has C | length | better than the previous best? |
|---|---|---|---|---:|---|
| `ADOBEC` | ✔ | ✔ | ✔ | 6 | first candidate → best = 6 |
| `DOBECODEBA` | ✔ | ✔ | ✔ | 10 | no |
| `OBECODEBA` | ✔ | ✔ | ✔ | 9 | no |
| `BECODEBA` | ✔ | ✔ | ✔ | 8 | no |
| `ECODEBA` | ✔ | ✔ | ✔ | 7 | no |
| `CODEBA` | ✔ | ✔ | ✔ | 6 | no (tie) |
| `ODEBANC` | ✔ | ✔ | ✔ | 7 | no |
| `DEBANC` | ✔ | ✔ | ✔ | 6 | no |
| `EBANC` | ✔ | ✔ | ✔ | 5 | **yes → best = 5** |
| **`BANC`** | ✔ | ✔ | ✔ | **4** | **yes → best = 4** ✓ |

Notice that the window keeps *growing* on the right between contractions — the left edge
only moves when the window is valid, so a window that is currently invalid can still
become valid again later. That is why `"BANC"` is found at the very end and not earlier.

## Java Solution

See [`MinimumWindowSubstring.java`](./MinimumWindowSubstring.java).

```java
public static String minWindow(String s, String t) {
    if (s.isEmpty() || t.isEmpty() || t.length() > s.length()) {
        return "";
    }
    Map<Character, Integer> need = new HashMap<>();
    for (char c : t.toCharArray()) {
        need.merge(c, 1, Integer::sum);
    }
    Map<Character, Integer> window = new HashMap<>();

    int required = need.size();
    int formed = 0;
    int left = 0;
    int bestLength = Integer.MAX_VALUE;
    int bestStart = 0;

    for (int right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        if (need.containsKey(c)) {
            int count = window.merge(c, 1, Integer::sum);
            if (count == need.get(c)) {
                formed++;
            }
        }
        while (formed == required) {
            if (right - left + 1 < bestLength) {
                bestLength = right - left + 1;
                bestStart = left;
            }
            char removed = s.charAt(left);
            if (need.containsKey(removed)) {
                int count = window.merge(removed, -1, Integer::sum);
                if (count < need.get(removed)) {
                    formed--;
                }
            }
            left++;
        }
    }
    return bestLength == Integer.MAX_VALUE ? "" : s.substring(bestStart, bestStart + bestLength);
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(\|s\| + \|t\|) | Both pointers move forward at most \|s\| times |
| **Space** | O(\|t\|) | One map entry per distinct character of `t` |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Return all minimum windows when there are several."* → collect every window whose
  length equals the best instead of keeping only one.
- *"What if `t` contains characters that never appear in `s`?"* → return `""` immediately;
  the algorithm already handles it (the window never becomes valid).
- *"How would you stream this?"* → keep the two maps and the left edge; the answer so far
  is final for the prefix seen so far, but the window start may need to be re-scanned.
- *"How does this relate to finding the smallest anagram window?"* → that is the same
  algorithm with `need` built from the pattern instead of a separate string.

**Common mistakes:**
- ❌ Counting occurrences instead of distinct characters in `formed` → `"AAABC"` would be
  judged invalid for `t = "ABC"`.
- ❌ Shrinking the window even when it is invalid → the window may lose characters it still
  needs and never recover.
- ❌ Comparing counts with `==` after the increment when the character was already over
  quota → `formed` would be incremented twice.
- ❌ Forgetting the `bestLength == Integer.MAX_VALUE` case → you would throw instead of
  returning `""`.

**How to narrate:**
> "I'll slide a window over `s`. I keep a map of what `t` needs and a map of what the window
> has, plus a counter of how many *distinct* required characters are fully covered. When
> that counter reaches the number of distinct characters in `t` the window is valid, and I
> shrink it from the left as far as I can, recording the length at every step. The shortest
> recorded window is the answer."

## Related Problems

- [Find All Anagrams in a String](./FindAllAnagramsInString.java) — fixed-size windows
- [Permutation in String](./PermutationInString.java) — the same idea as a boolean
- [Longest Substring Without Repeating Characters](./LongestSubstringWithoutRepeatingCharacters.java) — the opposite constraint
