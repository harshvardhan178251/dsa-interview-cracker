---
title: Excel Sheet Column Number
leetcode: 171
difficulty: Easy
patterns: [Base-26 conversion, Running value]
companies: [Google, Apple, Goldman Sachs, Capgemini, Philips]
frequency: 3
tags: [string, math, base-conversion]
sampleInput: |
  AB
sampleOutput: "28"
---

# Excel Sheet Column Number — LeetCode 171

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Base-26 conversion · Running value |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg |

## Problem Statement

Given an Excel column title, return the corresponding column number.

| Title | Number | Title | Number |
|---|---:|---|---:|
| `A` | 1 | `Z` | 26 |
| `AA` | 27 | `AB` | 28 |
| `AAA` | 703 | `ZZZ` | 18278 |

The title is a base-26 number whose digits are `1..26` (`A`..`Z`).

## Input Format

The program reads from standard input:

```
columnTitle
```

- `columnTitle` — the title (1 ≤ length ≤ 7), on a single line, no quotes.

## Sample Input

```
AB
```

## Expected Output

```
28
```

## Approach — Fold left to right

A title is a positional number, so process the letters from left to right and shift
the accumulated value one base-26 place per letter:

```
result = result * 26 + digit
```

where `digit = char - 'A' + 1` (the `+ 1` is what makes the digits 1..26 instead of
0..25).

**Why the multiply comes first:** each new letter is worth 26 times more than the
previous one, so the running total has to be scaled before the digit is added.

## Dry Run

Input: `columnTitle = "AB"`

| Step | i | char | digit = char − 'A' + 1 | `result = result * 26 + digit` | `result` |
|---:|---:|---|---:|---|---:|
| 1 | 0 | `A` | 0 − 0 + 1 = **1** | `0 * 26 + 1` | 1 |
| 2 | 1 | `B` | 1 − 0 + 1 = **2** | `1 * 26 + 2` | **28** |

### The same fold for `"AAA"`

| Step | i | char | digit | `result = result * 26 + digit` | `result` |
|---:|---:|---|---:|---|---:|
| 1 | 0 | `A` | 1 | `0 * 26 + 1` | 1 |
| 2 | 1 | `A` | 1 | `1 * 26 + 1` | 27 |
| 3 | 2 | `A` | 1 | `27 * 26 + 1` | **703** |

### The digit table used in the trace

| Letter | `A` | `B` | `C` | … | `Y` | `Z` |
|---|---:|---:|---:|---|---:|---:|
| digit | 1 | 2 | 3 | … | 25 | 26 |

## Java Solution

See [`ExcelSheetColumnNumber.java`](./ExcelSheetColumnNumber.java).

```java
public static int titleToNumber(String columnTitle) {
    int result = 0;
    for (int i = 0; i < columnTitle.length(); i++) {
        result = result * 26 + (columnTitle.charAt(i) - 'A' + 1);
    }
    return result;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One pass over the title (n ≤ 7) |
| **Space** | O(1) | Only the running value |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Convert it the other way."* → [Excel Sheet Column Title](../../../../../../docs/topics/02-strings.md).
- *"What if the title is invalid — lowercase, or a character outside `A..Z`?"* →
  validate the characters and throw or return a sentinel; decide the contract first.
- *"How would you convert to base 26 with digits `0..25`?"* → the same fold with
  `digit = char - 'A'`; the difference between the two numberings is exactly the
  `+ 1`.
- *"Can it overflow?"* → with a 7-letter title the maximum is 18278, so an `int` is
  plenty; for longer titles use `long`.

**Common mistakes:**
- ❌ Forgetting the **`+ 1`** → `"A"` becomes 0 and `"AA"` becomes 0 instead of 27.
- ❌ Multiplying **after** adding the digit → the place values are wrong.
- ❌ Iterating the string **backwards** (that is the *title* algorithm, not this one).
- ❌ Using `char` arithmetic without the cast → in Java `char` promotes to `int`
  automatically, but forgetting the `- 'A'` gives the raw ASCII code.

**How to narrate:**
> "An Excel title is a base-26 number with digits 1 to 26. So I fold the letters
> left to right: result = result * 26 + (letter - 'A' + 1). The + 1 is what makes
> it 1-based, exactly like the reverse problem needs a -1. O(n) time, O(1) space."

## Related Problems

- [Excel Sheet Column Title](../../../../../../docs/topics/02-strings.md) — the inverse conversion
- [String to Integer (atoi)](../../../../../../docs/topics/02-strings.md) — parsing with overflow guards
