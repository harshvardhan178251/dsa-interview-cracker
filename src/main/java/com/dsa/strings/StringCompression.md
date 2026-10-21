---
title: String Compression
leetcode: null
difficulty: Easy
patterns: [Run-length encoding, Two Pointers]
companies: [Google, Microsoft]
frequency: 2
tags: [string, run-length-encoding, two-pointers]
sampleInput: |
  aabcccccaaa
sampleOutput: "a2b1c5a3"
---

# String Compression

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Run-length encoding · Two Pointers |
| **Interview heat** | ★★☆☆☆ |
| **Asked at** | Amazon, Meta, Google, Uber, Apple |

## Problem Statement

Compress a string by replacing every run of equal consecutive characters with the
character itself followed by the number of times it occurs.

- `"aabcccccaaa"` → `"a2b1c5a3"`
- The count is **always written**, even when it is `1` (`"abc"` → `"a1b1c1"`), so the
  encoding is unambiguous and can be decoded again.
- The input contains no whitespace.

## Input Format

The program reads from standard input:

```
s
```

- `s` — the string to compress (1 ≤ |s| ≤ 10³), on a single line, no quotes.

## Sample Input

```
aabcccccaaa
```

## Expected Output

```
a2b1c5a3
```

The string holds five `a`s (two at the front, three at the end), one `b` and five
`c`s — three runs, three pieces of output.

## Approach — Two indices, one pass

Keep the index of the current character and a counter for how many times it repeats:

1. Start a run at position `i` with `runLength = 1`.
2. While the next character is the same, extend the run.
3. When the run ends, append the character and the length, then reset the counter.

**The trick that avoids an off-by-one:** the loop runs one step **past** the end of
the string (`i <= s.length()`). Inside it, the run is flushed whenever the character
changes *or* the string has ended. That way the final run is written out without a
special case after the loop.

## Dry Run

Input: `s = "aabcccccaaa"` (length 11)

| index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| char | `a` | `a` | `b` | `c` | `c` | `c` | `c` | `c` | `a` | `a` | `a` |

| Step | i | `s[i-1]` | `s[i]` | same? | `runLength` | append | output so far |
|---:|---:|---|---|---|---:|---|---|
| 1 | 1 | `a` | `a` | ✓ | 2 | — | *(empty)* |
| 2 | 2 | `a` | `b` | ✗ | 2 | `a2` | `a2` |
| 3 | 3 | `b` | `c` | ✗ | 1 | `b1` | `a2b1` |
| 4 | 4 | `c` | `c` | ✓ | 2 | — | `a2b1` |
| 5 | 5 | `c` | `c` | ✓ | 3 | — | `a2b1` |
| 6 | 6 | `c` | `c` | ✓ | 4 | — | `a2b1` |
| 7 | 7 | `c` | `c` | ✓ | 5 | — | `a2b1` |
| 8 | 8 | `c` | `a` | ✗ | 5 | `c5` | `a2b1c5` |
| 9 | 9 | `a` | `a` | ✓ | 2 | — | `a2b1c5` |
| 10 | 10 | `a` | `a` | ✓ | 3 | — | `a2b1c5` |
| 11 | 11 | `a` | *end of string* | — | 3 | `a3` | `a2b1c5a3` |

Final answer: **`a2b1c5a3`**

The runs are: `aa` (2), `b` (1), `ccccc` (5), `aaa` (3) — the last `a` run is a
*separate* run from the first one, so the two `a` runs are never merged.

## Java Solution

See [`StringCompression.java`](./StringCompression.java).

```java
public static String compress(String s) {
    if (s.isEmpty()) {
        return "";
    }
    StringBuilder sb = new StringBuilder();
    int runLength = 1;
    for (int i = 1; i <= s.length(); i++) {
        if (i < s.length() && s.charAt(i) == s.charAt(i - 1)) {
            runLength++;
        } else {
            sb.append(s.charAt(i - 1)).append(runLength);
            runLength = 1;
        }
    }
    return sb.toString();
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One pass over the string; each character is read a constant number of times |
| **Space** | O(n) | The output buffer (at most 2n characters) |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the compressed form is longer than the original?"* → return the original
  (a classic variant of the problem).
- *"What if a run count has to be written in words — `"one"`?"* → same algorithm, but
  append a word instead of a digit.
- *"Decompress it again."* → read a digit run after each character and repeat the
  character that many times.
- *"Do it in O(1) extra space?"* → you can overwrite the string in place, because the
  compressed form is never longer than the original (when the count is written as a
  single digit).

**Common mistakes:**
- ❌ Forgetting to flush the **last run** → the classic bug drops the final run
  entirely (`"aab"` would come out as `"a2b"`).
- ❌ Writing the count **before** the character → `"2a"` instead of `"a2"`.
- ❌ Comparing `s.charAt(i)` with `s.charAt(i - 1)` **after** already advancing the
  counter → the first character is never counted.
- ❌ Using `append(runLength)` on a `char` → Java appends the *character code*, not
  the number.

**How to narrate:**
> "This is run-length encoding. I keep an index and a counter; while the next
> character is the same I extend the run, and when it changes I flush the character
> and the count into a StringBuilder. I deliberately let the loop run one index past
> the end of the string so the final run is flushed without a special case. One pass,
> O(n) time."

## Related Problems

- [Reverse Words in a String](../../../../../../docs/topics/02-strings.md) — rebuilding a string from parts
- [FrequencySort](../../../../../../docs/topics/09-hashing.md) — the same frequency counting, but used for ordering
