---
title: First Unique Character in a String
leetcode: 387
difficulty: Easy
patterns: [Frequency counting, Hash map]
companies: [Amazon, Meta, Google, Uber]
frequency: 3
tags: [hashmap, string, frequency-counting]
sampleInput: |
  leetcode
sampleOutput: "0"
---

# First Unique Character in a String — LeetCode 387

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Frequency counting · Hash map |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Meta, Google, Uber |

## Problem Statement

Given a string `s`, return the index of the **first** character that does **not**
repeat anywhere else in the string.

- If every character repeats, return `-1`.
- The index is 0-based.

## Input Format

The program reads from standard input:

```
s
```

- `s` — the string to scan (1 ≤ |s| ≤ 10⁵), on a single line, no quotes.

## Sample Input

```
leetcode
```

## Expected Output

```
0
```

`l` appears only once — it is the first unique character.

## Approach — Two passes over the string

1. **Count**: walk the string once and store how often every character occurs in a
   hash map.
2. **Find**: walk the string again and return the first index whose character has a
   count of exactly `1`.

The second pass has to be in **string order**, not map order — the question asks for
the *first* unique character, so the order of the scan decides the answer.

**Why not one pass?** The count of a character is only known after the whole string
has been seen, so a character that looked unique at index 3 can turn out to repeat
later. Counting first and scanning second is the simplest way to get that right.

## Dry Run

Input: `s = "leetcode"` — `l e e t c o d e`

### Phase 1 — count the characters

| Step | index | char | `counts` after |
|---:|---:|---|---|
| 1 | 0 | `l` | `{l: 1}` |
| 2 | 1 | `e` | `{l: 1, e: 1}` |
| 3 | 2 | `e` | `{l: 1, e: 2}` |
| 4 | 3 | `t` | `{l: 1, e: 2, t: 1}` |
| 5 | 4 | `c` | `{l: 1, e: 2, t: 1, c: 1}` |
| 6 | 5 | `o` | `{l: 1, e: 2, t: 1, c: 1, o: 1}` |
| 7 | 6 | `d` | `{l: 1, e: 2, t: 1, c: 1, o: 1, d: 1}` |
| 8 | 7 | `e` | `{l: 1, e: 3, t: 1, c: 1, o: 1, d: 1}` |

### Phase 2 — scan for the first character with a count of 1

| Step | index | char | count | unique? | action |
|---:|---:|---|---:|---|---|
| 1 | 0 | `l` | 1 | ✔ | **return 0** |

Final answer: **0**

### A longer scan — `s = "loveleetcode"`

| index | char | count | unique? | action |
|---:|---|---:|---|---|
| 0 | `l` | 2 | ✘ | continue |
| 1 | `o` | 2 | ✘ | continue |
| 2 | `v` | 1 | ✔ | **return 2** |

### A rejection — `s = "aabb"`

| index | char | count | unique? | action |
|---:|---|---:|---|---|
| 0 | `a` | 2 | ✘ | continue |
| 1 | `a` | 2 | ✘ | continue |
| 2 | `b` | 2 | ✘ | continue |
| 3 | `b` | 2 | ✘ | continue |

The loop ends without a hit → **return −1**

## Java Solution

See [`FirstUniqueCharacterInString.java`](./FirstUniqueCharacterInString.java).

```java
public static int firstUniqueCharacter(String s) {
    Map<Character, Integer> counts = new HashMap<>();
    for (char c : s.toCharArray()) {
        counts.merge(c, 1, Integer::sum);
    }
    for (int i = 0; i < s.length(); i++) {
        if (counts.get(s.charAt(i)) == 1) {
            return i;
        }
    }
    return -1;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Two passes over the string |
| **Space** | O(k) | The map holds one entry per distinct character (k ≤ 26 for lowercase English) |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Return the character instead of the index."* → return `s.charAt(i)`.
- *"Return every unique character."* → collect them all in the second pass.
- *"What if the string is a stream?"* → you cannot know the counts yet; either buffer
  the stream or use a two-pass approach over the buffered data.
- *"What if the alphabet is large?"* → a `HashMap<Character, Integer>` handles any
  character; an array of 256 counters is faster for ASCII.

**Common mistakes:**
- ❌ Returning the first character whose count **in the map** is 1 while iterating
  over the **map** → the map's iteration order is not the string order, so the
  "first" character can be wrong.
- ❌ Checking `counts.get(c) == 1` with an `int` and a boxed `Integer` → use
  `Integer` consistently, or `.equals`.
- ❌ Forgetting to return `-1` when nothing is unique.
- ❌ Returning the **last** unique character instead of the first.

**How to narrate:**
> "I count the characters in a hash map in one pass, then scan the string again in
> order and return the first index whose character has a count of one. If I get
> through the string without a hit, I return -1. The second pass has to follow the
> string order, not the map order. O(n) time, O(k) space."

## Related Problems

- [Contains Duplicate](../../../../../../docs/topics/09-hashing.md) — the simplest "have I seen this before?" check
- [Valid Anagram](../../../../../../docs/topics/02-strings.md) — counting characters with a map
- [FrequencySort](../../../../../../docs/topics/09-hashing.md) — counting characters and reordering them
