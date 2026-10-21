---
title: Reverse Words in a String
leetcode: 151
difficulty: Medium
patterns: [String splitting, Two pointers]
companies: [Amazon, Goldman Sachs, Facebook, TCS, Zomato]
frequency: 3
tags: [string, parsing, two-pointers]
sampleInput: |
  the sky is blue
sampleOutput: "blue is sky the"
---

# Reverse Words in a String — LeetCode 151

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | String splitting · Two Pointers |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Meta, Google, Uber, Facebook |

## Problem Statement

Given a sentence, return it with the order of its **words** reversed.

- Words are separated by one or more spaces.
- The output must use **exactly one space** between words.
- The output must not start or end with a space.

`"the sky is blue"` → `"blue is sky the"`

## Input Format

The program reads from standard input:

```
sentence
```

- `sentence` — the whole sentence on **one line**, spaces included, no quotes.
- The program reads the line as-is, so leading, trailing and repeated spaces are all
  visible to the algorithm.

## Sample Input

```
the sky is blue
```

## Expected Output

```
blue is sky the
```

## Approach — Split, then rebuild backwards

The "hard" part of this problem is not the reversal, it is the whitespace handling.
Three steps take care of everything:

1. `trim()` the sentence — removes leading and trailing whitespace.
2. `split("\\s+")` — splits on **runs** of whitespace, so repeated spaces collapse
   automatically and empty words never appear.
3. Walk the array **backwards**, appending each word and a single space between words.

**Why not `String.split(" ")`?** That splits on exactly one space, so `"a  b"` would
produce an empty middle element and the answer would contain a double space. The
regex `\\s+` also treats tabs and other whitespace as separators.

## Dry Run

Input: `sentence = "the sky is blue"`

| Step | operation | result |
|---:|---|---|
| 1 | `trim()` | `"the sky is blue"` |
| 2 | `split("\\s+")` | `["the", "sky", "is", "blue"]` |
| 3 | — | — |

Rebuilding from the last word backwards:

| Step | i | word | `sb` before | append | `sb` after |
|---:|---:|---|---|---|---|
| 4 | 3 | `"blue"` | *(empty)* | `blue` | `blue` |
| 5 | 2 | `"is"` | `blue` | `" "` + `is` | `blue is` |
| 6 | 1 | `"sky"` | `blue is` | `" "` + `sky` | `blue is sky` |
| 7 | 0 | `"the"` | `blue is sky` | `" "` + `the` | `blue is sky the` |

Final answer: **`blue is sky the`**

### The same trace with messy whitespace — `"  the   sky  is blue  "`

| Step | operation | result |
|---:|---|---|
| 1 | `trim()` | `"the   sky  is blue"` |
| 2 | `split("\\s+")` | `["the", "sky", "is", "blue"]` — the runs of spaces are collapsed |
| 3 | rebuild backwards | `blue is sky the` |

### Two pointers instead of an array

The same result can be produced in place without allocating the word array: walk a
right index to the end of the string, then move left until a space is found, and
copy that word to the front of a buffer, repeating. Same O(n) time, O(n) space for the
buffer, but no array of substrings.

## Java Solution

See [`ReverseWordsInString.java`](./ReverseWordsInString.java).

```java
public static String reverseWords(String s) {
    String trimmed = s.trim();
    if (trimmed.isEmpty()) {
        return "";
    }
    String[] words = trimmed.split("\\s+");
    StringBuilder sb = new StringBuilder();
    for (int i = words.length - 1; i >= 0; i--) {
        if (sb.length() > 0) {
            sb.append(' ');
        }
        sb.append(words[i]);
    }
    return sb.toString();
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One pass to split, one pass to rebuild |
| **Space** | O(n) | The word array plus the output buffer |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Reverse the characters of each word too?"* → that is
  [Reverse String](../../../../../../docs/topics/02-strings.md) applied to every word.
- *"Do it without allocating an array of substrings?"* → yes, the two-pointer /
  `lastIndexOf(' ')` version described above.
- *"What if the string contains punctuation?"* → the problem only talks about spaces;
  splitting on a regex such as `\\s+` already handles tabs.
- *"Reverse the words in place without extra memory?"* → possible but fiddly: you
  need to know the final length after collapsing the spaces.

**Common mistakes:**
- ❌ Using `split(" ")` instead of `split("\\s+")` → repeated spaces produce empty
  words and double spaces in the output.
- ❌ Forgetting to `trim()` → leading/trailing spaces end up in the result.
- ❌ Reading the sentence with a whitespace token scanner → only the first word would
  be read; the **whole line** has to be read.
- ❌ Emitting a trailing space because a space is appended after every word →
  append the separator *before* every word except the first.

**How to narrate:**
> "The reversal is trivial — the work is in the whitespace. I trim the sentence, split
> it on runs of whitespace with a regular expression so repeated spaces collapse, and
> then rebuild the string from the last word backwards, inserting a single space
> between words. O(n) time, O(n) space."

## Related Problems

- [Reverse String](../../../../../../docs/topics/02-strings.md) — the same idea at character granularity
- [String Compression](../../../../../../docs/topics/02-strings.md) — another "rebuild a string character by character"
