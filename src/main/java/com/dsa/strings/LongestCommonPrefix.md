---
title: Longest Common Prefix
leetcode: 14
difficulty: Easy
patterns: [Two Pointers, Vertical scan]
companies: [Meta, Amazon, Apple, Goldman Sachs, Spotify]
frequency: 4
tags: [string, two-pointers, array]
sampleInput: |
  3
  flower
  flow
  flight
sampleOutput: "fl"
---

# Longest Common Prefix — LeetCode 14

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Two Pointers · Vertical scan |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Meta, Google, Uber, Bloomberg |

## Problem Statement

Given an array of strings, return the longest prefix that **every** string shares.

- `["flower", "flow", "flight"]` → `"fl"`
- `["dog", "racecar", "car"]` → `""` (no common prefix)

## Input Format

The program reads from standard input:

```
n
strs[0]
strs[1]
...
strs[n-1]
```

- `n` — the number of strings (0 ≤ n ≤ 10⁴).
- The next `n` lines each hold one string, no quotes, no whitespace inside.

## Sample Input

```
3
flower
flow
flight
```

## Expected Output

```
fl
```

## Approach — Shrink the prefix as you go

Keep the current best prefix (initially the first string) and test it against every
following string:

1. Compare the prefix with `strs[i]` character by character, up to the length of the
   shorter one.
2. Cut the prefix down to the number of characters that matched.
3. If the prefix became empty, stop immediately — it can never grow again.

**Why this is efficient:** the prefix only ever gets **shorter**, so the total work is
bounded by `n × m` where `m` is the length of the first string — not
`n × m²` as a naive "compare every pair of strings" approach would be.

**Alternative — horizontal scan:** find the common prefix of the first two strings,
then intersect it with the third, and so on. Same complexity, slightly different
shape.

## Dry Run

Input: `strs = ["flower", "flow", "flight"]`

Start: `prefix = "flower"` (the first string)

| Step | i | `strs[i]` | comparison | matched `j` | prefix after |
|---:|---:|---|---|---:|---|
| 1 | 1 | `"flow"` | `f`=`f` ✓, `l`=`l` ✓, `o`≠`i` ✗ | 2 | `"fl"` |
| 2 | 2 | `"flight"` | `f`=`f` ✓, `l`=`l` ✓, `o`≠`i` ✗ | 2 | `"fl"` |

Loop ends → **`"fl"`**

### The character-by-character comparison in step 1

| j | `prefix[j]` | `strs[1][j]` | equal? |
|---:|---|---|---|
| 0 | `f` | `f` | ✓ |
| 1 | `l` | `l` | ✓ |
| 2 | `o` | `o` vs `i` | ✗ → stop, `j = 2` |

`prefix.substring(0, 2)` = `"fl"`.

### A rejection — `["dog", "racecar", "car"]`

| Step | i | `strs[i]` | comparison | matched `j` | prefix after |
|---:|---:|---|---|---:|---|
| 1 | 1 | `"racecar"` | `d`≠`r` ✗ | 0 | `""` → **early exit** |

The prefix is empty, so the answer is `""` — there is no need to look at `"car"`.

## Java Solution

See [`LongestCommonPrefix.java`](./LongestCommonPrefix.java).

```java
public static String longestCommonPrefix(String[] strs) {
    if (strs == null || strs.length == 0) {
        return "";
    }
    String prefix = strs[0];
    for (int i = 1; i < strs.length; i++) {
        int j = 0;
        int limit = Math.min(prefix.length(), strs[i].length());
        while (j < limit && prefix.charAt(j) == strs[i].charAt(j)) {
            j++;
        }
        prefix = prefix.substring(0, j);
        if (prefix.isEmpty()) {
            return "";
        }
    }
    return prefix;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n · m) | n strings, at most m characters compared per string (m = length of the first string) |
| **Space** | O(m) | The prefix string |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the input is a trie of millions of strings?"* → insert them into a trie
  and walk down until the node has no children; O(total length) to build.
- *"Find the longest common prefix of a file system — thousands of paths?"* → sort
  the paths and compare only the first and the last one; sorting guarantees they
  differ as early as possible.
- *"What if the strings are streamed and you cannot keep them all?"* → keep the
  running prefix, exactly as above.
- *"Longest common **suffix** instead?"* → the same algorithm applied to the
  reversed strings.

**Common mistakes:**
- ❌ Comparing the **full strings** instead of the prefix → O(n · m²).
- ❌ Forgetting the `Math.min` bound → `StringIndexOutOfBoundsException` when one
  string is shorter than the prefix.
- ❌ Not handling the **empty array** → `strs[0]` throws.
- ❌ Returning the first string when the array has **one element** without checking —
  in this case that is correct, but it should be a deliberate decision.

**How to narrate:**
> "I keep the running prefix, starting from the first string, and test it against
> every other string character by character, cutting it down to the part that
> matched. The prefix only gets shorter, so the total work is O(n times m) rather
> than comparing every pair. If it ever becomes empty I can stop right away."

## Related Problems

- [Valid Anagram](../../../../../../docs/topics/02-strings.md) — a similar "compare two strings" contract
- [Longest Palindromic Substring](../../../../../../docs/topics/02-strings.md) — the substring cousin
