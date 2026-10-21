---
title: Valid Anagram
leetcode: 242
difficulty: Easy
patterns: [Frequency counting, Hash map]
companies: [Amazon, Uber, Meta, Google, Bloomberg]
frequency: 4
tags: [string, hashmap, frequency-counting]
sampleInput: |
  anagram
  nagaram
sampleOutput: "true"
---

# Valid Anagram — LeetCode 242

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Frequency counting · Hash map |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Uber, Meta, Google, Bloomberg |

## Problem Statement

Given two strings `s` and `t`, return `true` if `t` is an **anagram** of `s`.

- Two strings are anagrams when they contain the same characters with the same
  frequencies, in any order.
- `"anagram"` and `"nagaram"` are anagrams; `"rat"` and `"car"` are not.

## Input Format

The program reads from standard input:

```
s
t
```

- `s` — the first string, on its own line, no quotes.
- `t` — the second string, on its own line, no quotes.
- Neither string contains whitespace.

## Sample Input

```
anagram
nagaram
```

## Expected Output

```
true
```

## Approach — Count, then consume

Sorting both strings and comparing them is the obvious solution, but it costs
O(n log n). Counting gets it down to O(n):

1. **Different lengths → not an anagram.** Cheap early exit.
2. Count the occurrences of every character of `s` in a hash map.
3. Walk `t`. For each character:
   - if it is not in the map, or its remaining count is `0`, the strings differ →
     return `false`
   - otherwise decrement its count
4. If every character of `t` was consumed, return `true`.

**Why step 3 is enough:** the two strings have the same length, so if every character
of `t` finds a matching unused occurrence in `s`, then all of `s`'s occurrences were
used exactly once. No further check is needed.

**Why a map and not an array:** an array indexed by the character code is faster and
simpler, but it only works for a fixed alphabet. The map handles any character, and
its size is bounded by the number of *distinct* characters, not by the string length.

## Dry Run

Input: `s = "anagram"`, `t = "nagaram"`. Lengths are equal (7 = 7).

### Phase 1 — count the characters of `s`

| Step | char | `counts` after |
|---:|---|---|
| 1 | `a` | `{a: 1}` |
| 2 | `n` | `{a: 1, n: 1}` |
| 3 | `a` | `{a: 2, n: 1}` |
| 4 | `g` | `{a: 2, n: 1, g: 1}` |
| 5 | `r` | `{a: 2, n: 1, g: 1, r: 1}` |
| 6 | `a` | `{a: 3, n: 1, g: 1, r: 1}` |
| 7 | `m` | `{a: 3, n: 1, g: 1, r: 1, m: 1}` |

### Phase 2 — consume the characters of `t`

| Step | char | available before | available after | result |
|---:|---|---:|---:|---|
| 1 | `n` | 1 | 0 | ✓ |
| 2 | `a` | 3 | 2 | ✓ |
| 3 | `g` | 1 | 0 | ✓ |
| 4 | `a` | 2 | 1 | ✓ |
| 5 | `r` | 1 | 0 | ✓ |
| 6 | `a` | 1 | 0 | ✓ |
| 7 | `m` | 1 | 0 | ✓ |

Every character of `t` found an unused occurrence → **return true**

### A rejection — `s = "aab"`, `t = "abb"`

| Step | phase | char | detail | result |
|---:|---|---:|---|---|
| 1 | count | `a` | `{a: 1}` | — |
| 2 | count | `a` | `{a: 2}` | — |
| 3 | count | `b` | `{a: 2, b: 1}` | — |
| 4 | consume | `a` | available 2 → 1 | ✓ |
| 5 | consume | `b` | available 1 → 0 | ✓ |
| 6 | consume | `b` | available **0** → no occurrence left | **return false** |

## Java Solution

See [`ValidAnagram.java`](./ValidAnagram.java).

```java
public static boolean isAnagram(String s, String t) {
    if (s.length() != t.length()) {
        return false;
    }
    Map<Character, Integer> counts = new HashMap<>();
    for (char c : s.toCharArray()) {
        counts.merge(c, 1, Integer::sum);
    }
    for (char c : t.toCharArray()) {
        Integer available = counts.get(c);
        if (available == null || available == 0) {
            return false;
        }
        counts.put(c, available - 1);
    }
    return true;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Two passes over the strings, each map operation is O(1) on average |
| **Space** | O(k) | The map holds one entry per **distinct** character (k ≤ 26 for lowercase English) |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the strings are huge and cannot both fit in memory?"* → stream the first
  string into the map and the second one out of it, exactly as here; only the map
  grows, and it is bounded by the alphabet size.
- *"Can you do it in O(1) space?"* → yes, with a fixed array of 26 counters when the
  alphabet is known to be lowercase English letters.
- *"What if we had to detect anagrams in a stream of words?"* → maintain one shared
  map of character differences per word, or a rolling hash of each word's sorted
  characters.
- *"Sort both strings and compare — why is that worse?"* → it is O(n log n) and
  allocates two copies; the counting version is O(n) and does not copy.

**Common mistakes:**
- ❌ Forgetting the **length check** → two strings of different lengths can still have
  matching character counts in the naive version.
- ❌ Only checking that every character of `t` **exists** in `s` → `"aab"` and
  `"aba"` have the same character set but different counts.
- ❌ Decreasing the count **after** the existence check in the wrong order → the
  `available == 0` case is missed and duplicates slip through.
- ❌ Using `==` instead of `.equals()` to compare characters → `==` on `char` is fine,
  but on `Character` objects it compares references.

**How to narrate:**
> "Sorting would work but it's O(n log n). Instead I count the characters of the
> first string in a hash map, then walk the second string consuming one occurrence
> per character. If a character isn't there, or its count has run out, I return false
> immediately. Since the lengths are equal, consuming all of the second string proves
> the two are anagrams. O(n) time, O(k) space where k is the alphabet size."

## Related Problems

- [Group Anagrams](../../../../../../docs/topics/09-hashing.md) — the same counting idea, used to group words
- [Isomorphic Strings](../../../../../../docs/topics/09-hashing.md) — a similar "two maps must agree" contract
- [FrequencySort](../../../../../../docs/topics/09-hashing.md) — counting used for ordering
