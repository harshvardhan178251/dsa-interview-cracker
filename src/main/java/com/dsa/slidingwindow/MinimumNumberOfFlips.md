---
title: Minimum Number of Flips to Make the Binary String Alternating
leetcode: 188
difficulty: Medium
patterns: [Sliding window, Counting, Strings]
companies: [Amazon, Airbnb, Apple]
frequency: 3
tags: [string, sliding-window, binary]
sampleInput: |
  111000
sampleOutput: "2"
---

# Minimum Number of Flips to Make the Binary String Alternating — LeetCode 188

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Sliding window · Counting · Strings |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Facebook |

## Problem Statement

Given a binary string `s`, return the **minimum number of characters to flip** so that the
string becomes **alternating** — that is, so that no two adjacent characters are equal.

- `"111000"` → `2` (flip positions 1 and 4 to get `"101010"`).
- `"010"` → `0` (already alternating).
- `"1110"` → `1` (flip position 1 to get `"1010"`).

> **Rotations are not allowed.** The string itself must become alternating. LeetCode 1888
> adds a free *rotate* operation and is a different, harder problem — the answer there can
> be smaller than the answer here.

## Input Format

The program reads from standard input:

```
s
```

- `s` — a non-empty binary string without whitespace (1 ≤ |s| ≤ 10⁵)

## Sample Input

```
111000
```

## Expected Output

```
2
```

## Approach — Only two possible targets

An alternating binary string is completely determined by its **first** character:

| target | pattern |
|---|---|
| A | `0101010101…` |
| B | `1010101010…` |

So there are exactly two candidates. Count the mismatches against each and take the
smaller.

**The second count is free.** The two patterns are exact complements: at every index they
disagree. So if pattern A mismatches at `m` positions, pattern B mismatches at exactly
`|s| - m` positions. One pass over the string is enough.

**Why not a sliding window?** There is nothing to slide — the target is a fixed pattern, so
the problem is a straight comparison. A "window" interpretation (a window of length `n`
where the window itself must alternate) leads to the same count.

## Dry Run

Input: `s = "111000"`

| index | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---:|---:|---:|---:|---:|---:|
| `s[i]` | `1` | `1` | `1` | `0` | `0` | `0` |
| pattern A (`010101`) | `0` | `1` | `0` | `1` | `0` | `1` |
| match? | ✘ | ✔ | ✘ | ✘ | ✔ | ✘ |
| pattern B (`101010`) | `1` | `0` | `1` | `0` | `1` | `0` |
| match? | ✔ | ✘ | ✔ | ✔ | ✘ | ✔ |

| Pattern | mismatches | count |
|---|---|---:|
| A — starts with `0` | indices 0, 2, 3, 5 | 4 |
| B — starts with `1` | indices 1, 4 | 2 |

`min(4, 2) = 2` → flip indices **1** and **4** to get `"101010"` ✓

### The counter view

| Step | i | `s[i]` | expected by A | A mismatch | expected by B | B mismatch |
|---:|---:|---:|---|---:|---|---:|
| 1 | 0 | `1` | `0` | 1 | `1` | 0 |
| 2 | 1 | `1` | `1` | 1 | `0` | 1 |
| 3 | 2 | `1` | `0` | 2 | `1` | 1 |
| 4 | 3 | `0` | `1` | 3 | `0` | 1 |
| 5 | 4 | `0` | `0` | 3 | `1` | 2 |
| 6 | 5 | `0` | `1` | 4 | `0` | 2 |

Final: A needs 4 flips, B needs 2 flips → **2**.

## Java Solution

See [`MinimumNumberOfFlips.java`](./MinimumNumberOfFlips.java).

```java
public static int minimumFlips(String s) {
    int flipsStartingWithZero = 0;
    for (int i = 0; i < s.length(); i++) {
        char expected = (i % 2 == 0) ? '0' : '1';
        if (s.charAt(i) != expected) {
            flipsStartingWithZero++;
        }
    }
    int flipsStartingWithOne = s.length() - flipsStartingWithZero;
    return Math.min(flipsStartingWithZero, flipsStartingWithOne);
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One pass over the string |
| **Space** | O(1) | Two counters |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if rotations are also allowed?"* → that is LeetCode 1888. For even-length strings
  a rotation swaps the two patterns, so the answer is unchanged; for odd-length strings you
  must try every rotation, which can be done in O(n) with a sliding count over `s + s`.
- *"Return the positions to flip."* → collect the indices where the string differs from
  the chosen pattern.
- *"What if the alphabet is larger than two symbols?"* → an alternating string over `k`
  symbols has `k` possible patterns per starting symbol; the comparison is still O(k·n).
- *"Could you do it with a sliding window?"* → yes, but it buys nothing here — the target
  is static.

**Common mistakes:**
- ❌ Forgetting that the pattern can start with either symbol → the answer would be 4
  instead of 2.
- ❌ Assuming the answer is `min(mismatches, n - mismatches)` without proving the two
  patterns are complementary — they are, but say why.
- ❌ Implementing the *rotation* variant (LeetCode 1888) when the problem does not allow
  it → the answer can be smaller and the code looks over-engineered.
- ❌ Off-by-one in the expected character (`i % 2 == 0 ? '0' : '1'`) → every comparison is
  inverted.

**How to narrate:**
> "An alternating binary string is determined by its first character, so there are only two
> possible targets: `0101…` and `1010…`. I'll count the mismatches against the first one;
> because the two patterns are exact complements, the second count is just the length minus
> the first. The answer is the smaller of the two."

## Related Problems

- [Longest Repeating Character Replacement](./LongestRepeatingCharacterReplacement.java) — the sliding-window cousin of this problem
- [Longest Substring Without Repeating Characters](./LongestSubstringWithoutRepeatingCharacters.java) — the "no two neighbours equal" idea in its strictest form
