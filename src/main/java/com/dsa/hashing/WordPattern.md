---
title: Word Pattern
leetcode: 290
difficulty: Easy
patterns: [Hashing, Bijective mapping]
companies: [Amazon, Meta, Google, Uber]
frequency: 3
tags: [hashmap, string, bijection, pattern-matching]
sampleInput: |
  abba
  4
  dog cat cat dog
sampleOutput: "true"
---

# Word Pattern — LeetCode 290

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Hashing · Bijective mapping |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Meta, Google, Uber |

## Problem Statement

Given a pattern of letters and a list of words, decide whether the words follow the
pattern.

- Every letter stands for exactly one word, and every word is matched by exactly one
  letter — the mapping is a **bijection**.
- `"abba"` with `["dog", "cat", "cat", "dog"]` → `true`
- `"abba"` with `["dog", "cat", "dog", "cat"]` → `false`

## Input Format

The program reads from standard input:

```
pattern
n
word[0] word[1] ... word[n-1]
```

- `pattern` — the pattern string (lowercase letters), on its own line.
- `n` — the number of words.
- The next line holds the `n` space-separated words.

## Sample Input

```
abba
4
dog cat cat dog
```

## Expected Output

```
true
```

`a` stands for `dog`, `b` stands for `cat` — the pattern `abba` is followed exactly.

## Approach — Two maps, one in each direction

One map is not enough. It has to enforce **both** halves of the rule:

| Map | Enforces |
|---|---|
| `letterToWord` | one letter always stands for the same word |
| `wordToLetter` | one word is never claimed by two different letters |

For every position `i` with letter `c` and word `w`:

- If `c` is new → `w` must be unused as well, otherwise the pattern is broken. Map
  both directions.
- If `c` is already mapped → `w` must be exactly the word it was mapped to.

**Why the backward map is necessary:** with only the forward map, the pattern `ab`
with the words `["dog", "dog"]` would be accepted — `a` → `dog`, `b` → `dog` — but
two different letters standing for the same word is not a valid bijection.

## Dry Run

Input: `pattern = "abba"`, `words = [dog, cat, cat, dog]`

| Step | i | letter | word | `letterToWord` before | `wordToLetter` before | action | maps after |
|---:|---:|---|---|---|---|---|---|
| 1 | 0 | `a` | `dog` | `{}` | `{}` | new letter, `dog` unused → map both | `{a: dog}`, `{dog: a}` |
| 2 | 1 | `b` | `cat` | `{a: dog}` | `{dog: a}` | new letter, `cat` unused → map both | `{a: dog, b: cat}`, `{dog: a, cat: b}` |
| 3 | 2 | `b` | `cat` | `{a: dog, b: cat}` | `{dog: a, cat: b}` | `b` is mapped to `cat` and the word is `cat` → ✔ | unchanged |
| 4 | 3 | `a` | `dog` | `{a: dog, b: cat}` | `{dog: a, cat: b}` | `a` is mapped to `dog` and the word is `dog` → ✔ | unchanged |

Final answer: **true**

### A rejection — the backward map catches it

Input: `pattern = "ab"`, `words = [dog, dog]`

| Step | i | letter | word | `letterToWord` before | `wordToLetter` before | action | maps after |
|---:|---:|---|---|---|---|---|---|
| 1 | 0 | `a` | `dog` | `{}` | `{}` | new letter, `dog` unused → map both | `{a: dog}`, `{dog: a}` |
| 2 | 1 | `b` | `dog` | `{a: dog}` | `{dog: a}` | new letter, but `dog` is **already used** by `a` → **return false** | — |

### A rejection — the forward map catches it

Input: `pattern = "aa"`, `words = [dog, cat]`

| Step | i | letter | word | `letterToWord` before | action | maps after |
|---:|---:|---|---|---|---|---|
| 1 | 0 | `a` | `dog` | `{}` | new letter → map both | `{a: dog}`, `{dog: a}` |
| 2 | 1 | `a` | `cat` | `{a: dog}` | `a` is mapped to `dog`, but the word is `cat` → **return false** | — |

## Java Solution

See [`WordPattern.java`](./WordPattern.java).

```java
public static boolean wordPattern(String pattern, String[] words) {
    if (pattern.length() != words.length) {
        return false;
    }
    Map<Character, String> letterToWord = new HashMap<>();
    Map<String, Character> wordToLetter = new HashMap<>();
    for (int i = 0; i < pattern.length(); i++) {
        char letter = pattern.charAt(i);
        String word = words[i];
        String mapped = letterToWord.get(letter);
        if (mapped == null) {
            if (wordToLetter.containsKey(word)) {
                return false;
            }
            letterToWord.put(letter, word);
            wordToLetter.put(word, letter);
        } else if (!mapped.equals(word)) {
            return false;
        }
    }
    return true;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One map lookup and one insert per word (string hashing included) |
| **Space** | O(n) | The two maps hold at most n entries |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the pattern can contain digits too?"* → the letters and the digits are
  just different characters; the code does not change.
- *"Can you do it without the second map?"* → yes, but then you must detect the
  "two letters, one word" case by counting the distinct words and comparing it with
  the number of distinct letters.
- *"What if the words can repeat but the pattern cannot?"* → then only the forward
  map is needed.
- *"How is this different from [Isomorphic Strings](../../../../../../docs/topics/09-hashing.md)?"* → exactly the same
  idea, with characters instead of words.

**Common mistakes:**
- ❌ Using **only** the forward map → the "two letters, one word" case slips through.
- ❌ Using **only** the backward map → the "one letter, two words" case slips through.
- ❌ Forgetting the length check → the loop would read past the end of the shorter
  array.
- ❌ Comparing words with `==` instead of `equals` → reference comparison.

**How to narrate:**
> "The mapping has to be a bijection, so I need both directions: a map from letter
> to word and a map from word to letter. When I meet a new letter, the word must not
> already belong to another letter; when I meet a known letter, the word must be the
> one it was mapped to. Two maps, one pass, O(n)."

## Related Problems

- [Isomorphic Strings](../../../../../../docs/topics/09-hashing.md) — the same bijection, character by character
- [Valid Anagram](../../../../../../docs/topics/02-strings.md) — counting characters of two strings
- [Group Anagrams](../../../../../../docs/topics/09-hashing.md) — grouping words by a canonical key
