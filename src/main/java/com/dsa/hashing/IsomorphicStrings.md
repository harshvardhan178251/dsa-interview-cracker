---
title: Isomorphic Strings
leetcode: 205
difficulty: Easy
patterns: [Hashing, Bijective mapping]
companies: [Amazon, Airbnb, Uber, TCS, Barclays]
frequency: 3
tags: [hashmap, string, bijection, character-mapping]
sampleInput: |
  egg
  add
sampleOutput: "true"
---

# Isomorphic Strings — LeetCode 205

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Hashing · Bijective mapping |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Meta, Google, Uber |

## Problem Statement

Two strings `s` and `t` are **isomorphic** when there is a one-to-one correspondence
between their characters:

- every character of `s` maps to exactly one character of `t`, and
- no two different characters of `s` map to the same character of `t`.

`"egg"` and `"add"` are isomorphic (`e → a`, `g → d`); `"badc"` and `"baba"` are not
(`d` and `a` would both have to map to `b`).

## Input Format

The program reads from standard input:

```
s
t
```

- `s` — the first string, on its own line, no quotes.
- `t` — the second string, on its own line, no quotes.

## Sample Input

```
egg
add
```

## Expected Output

```
true
```

## Approach — Two maps, one in each direction

The one-to-one rule has two halves, so two maps are needed:

| Map | Enforces |
|---|---|
| `forward` | a character of `s` always maps to the same character of `t` |
| `backward` | two different characters of `s` never map to the same character of `t` |

For every position `i`:

- If `s[i]` is new, `t[i]` must be new as well — otherwise two characters would
  share the same image. Map both directions.
- If `s[i]` is already mapped, `t[i]` must be exactly its image.

**Why the backward map is necessary:** with only the forward map, `"ab"` and `"aa"`
would be accepted, because `a → a` and `b → a` never contradict the forward
constraint.

## Dry Run

Input: `s = "egg"`, `t = "add"`

| Step | i | `s[i]` | `t[i]` | `forward` before | `backward` before | action | maps after |
|---:|---:|---|---|---|---|---|---|
| 1 | 0 | `e` | `a` | `{}` | `{}` | `e` is new, `a` is unused → map both | `{e: a}`, `{a: e}` |
| 2 | 1 | `g` | `d` | `{e: a}` | `{a: e}` | `g` is new, `d` is unused → map both | `{e: a, g: d}`, `{a: e, d: g}` |
| 3 | 2 | `g` | `d` | `{e: a, g: d}` | `{a: e, d: g}` | `g` is mapped to `d` and `t[2] = d` → ✔ | unchanged |

Final answer: **true**

### A rejection caught by the forward map — `"ab"` vs `"aa"`

| Step | i | `s[i]` | `t[i]` | `forward` before | action | maps after |
|---:|---:|---|---|---|---|---|
| 1 | 0 | `a` | `a` | `{}` | new → map both | `{a: a}`, `{a: a}` |
| 2 | 1 | `b` | `a` | `{a: a}` | `b` is new, but `a` is **already used** by `a` → **return false** | — |

### A rejection caught by the forward map — `"aa"` vs `"ab"`

| Step | i | `s[i]` | `t[i]` | `forward` before | action | maps after |
|---:|---:|---|---|---|---|---|
| 1 | 0 | `a` | `a` | `{}` | new → map both | `{a: a}`, `{a: a}` |
| 2 | 1 | `a` | `b` | `{a: a}` | `a` is mapped to `a`, but `t[1] = b` → **return false** | — |

### The lengths must match first

| input | result |
|---|---|
| `"ab"` vs `"abc"` | false — different lengths, checked before the loop |
| `"ab"` vs `"ba"` | true — the mapping is `a → b`, `b → a` |

## Java Solution

See [`IsomorphicStrings.java`](./IsomorphicStrings.java).

```java
public static boolean isIsomorphic(String s, String t) {
    if (s.length() != t.length()) {
        return false;
    }
    Map<Character, Character> forward = new HashMap<>();
    Map<Character, Character> backward = new HashMap<>();
    for (int i = 0; i < s.length(); i++) {
        char from = s.charAt(i);
        char to = t.charAt(i);
        Character mapped = forward.get(from);
        if (mapped == null) {
            if (backward.containsKey(to)) {
                return false;
            }
            forward.put(from, to);
            backward.put(to, from);
        } else if (mapped != to) {
            return false;
        }
    }
    return true;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One lookup per character in each map |
| **Space** | O(k) | The maps hold one entry per distinct character (k ≤ 26 for lowercase English) |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the mapping does not have to be one-to-one?"* → drop the backward map;
  that is the "is `s` a transformation of `t`" variant.
- *"Can you do it without maps?"* → yes: count the characters of both strings and
  compare the multisets of frequencies. Two strings are isomorphic exactly when
  their character-frequency multisets are equal.
- *"What about three strings?"* → keep one map per direction per pair.
- *"How does this relate to [Word Pattern](../../../../../../docs/topics/09-hashing.md)?"* → identical idea with words.

**Common mistakes:**
- ❌ Using **only** the forward map → `"ab"` vs `"aa"` is wrongly accepted.
- ❌ Using **only** the backward map → `"aa"` vs `"ab"` is wrongly accepted.
- ❌ Comparing the characters with `==` on boxed `Character` objects → reference
  comparison; Java unboxes automatically here, but `equals` is clearer.
- ❌ Forgetting the length check → the loop reads past the end of the shorter string.

**How to narrate:**
> "Isomorphism means a one-to-one mapping, so I keep two maps: one from the first
> string to the second and one back. A new character in the first string must map to
> a character that is not used yet, and a known character must always map to the
> same one. Two maps, one pass, O(n) time."

## Related Problems

- [Word Pattern](../../../../../../docs/topics/09-hashing.md) — the same bijection with words
- [Valid Anagram](../../../../../../docs/topics/02-strings.md) — counting characters of two strings
- [Group Anagrams](../../../../../../docs/topics/09-hashing.md) — grouping words by a canonical key
