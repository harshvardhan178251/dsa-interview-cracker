---
title: Excel Sheet Column Title
leetcode: 168
difficulty: Easy
patterns: [Base-26 conversion, Modular arithmetic]
companies: [Google, Netflix, Salesforce]
frequency: 3
tags: [string, math, base-conversion]
sampleInput: |
  28
sampleOutput: "AB"
---

# Excel Sheet Column Title — LeetCode 168

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Base-26 conversion · Modular arithmetic |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg |

## Problem Statement

Given a positive integer `columnNumber`, return the Excel column title that
corresponds to it.

| Number | Title | Number | Title |
|---:|---|---:|---|
| 1 | `A` | 26 | `Z` |
| 27 | `AA` | 28 | `AB` |
| 703 | `AAA` | 18278 | `ZZZ` |

Columns are numbered from **1**, not 0 — that is the only subtlety.

## Input Format

The program reads from standard input:

```
columnNumber
```

- `columnNumber` — the column number (1 ≤ columnNumber ≤ 2³¹ − 1), on its own line.

## Sample Input

```
28
```

## Expected Output

```
AB
```

## Approach — Base 26 with digits 1..26

Excel titles are base-26 numbers whose "digits" run from `1` to `26` (`A`..`Z`)
instead of `0` to `25`. That single difference changes the algorithm:

```
while n > 0:
    n--                 // shift the digit range from 1..26 to 0..25
    digit = n % 26      // the remainder now maps onto 'A'..'Z'
    n = n / 26
```

**Why the decrement is essential:** without it, `26 % 26 == 0` would produce the
letter `A` instead of `Z`, and `27` would come out as `BA` instead of `AA`. The
decrement turns the 1-based digit into a 0-based index exactly once per iteration.

**Why the result is reversed:** the loop peels off the *least significant* letter
first (`B` for 28, then `A`), so the letters are collected in reverse order. The
`StringBuilder.reverse()` at the end fixes that.

## Dry Run

Input: `columnNumber = 28`

| Step | `columnNumber` | after `columnNumber--` | `% 26` | letter | `columnNumber = n / 26` | `sb` |
|---:|---:|---:|---:|---|---:|---|
| 1 | 28 | 27 | 27 % 26 = **1** | `'B'` (1 + 'A') | 27 / 26 = 1 | `B` |
| 2 | 1 | 0 | 0 % 26 = **0** | `'A'` (0 + 'A') | 0 / 26 = 0 | `BA` |

The loop ends because `columnNumber == 0`. Reversing `BA` gives **`AB`**.

### Why the decrement matters — `columnNumber = 26`

| Step | `columnNumber` | after `--` | `% 26` | letter | next `columnNumber` |
|---:|---:|---:|---:|---|---:|
| 1 | 26 | 25 | 25 % 26 = **25** | `'Z'` | 25 / 26 = 0 |

Without the decrement, 26 % 26 would be `0` → `'A'`, and the answer would be `A`
instead of `Z`.

### Why the decrement matters — `columnNumber = 27`

| Step | `columnNumber` | after `--` | `% 26` | letter | next `columnNumber` |
|---:|---:|---:|---:|---|---:|
| 1 | 27 | 26 | 26 % 26 = **0** | `'A'` | 26 / 26 = 1 |
| 2 | 1 | 0 | 0 % 26 = **0** | `'A'` | 0 |

Reversed: **`AA`** ✓

## Java Solution

See [`ExcelSheetColumnTitle.java`](./ExcelSheetColumnTitle.java).

```java
public static String convertToTitle(int columnNumber) {
    StringBuilder sb = new StringBuilder();
    while (columnNumber > 0) {
        columnNumber--;
        sb.append((char) ('A' + columnNumber % 26));
        columnNumber /= 26;
    }
    return sb.reverse().toString();
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(log₂₆ n) | One iteration per letter of the title |
| **Space** | O(log₂₆ n) | The title itself (≤ 7 characters for a 32-bit integer) |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Convert it back."* → [Excel Sheet Column Number](../../../../../../docs/topics/02-strings.md), a left-to-right fold.
- *"What if the numbering started at 0?"* → then it is plain base-26 with digits
  `0..25` and the decrement disappears.
- *"What if the input is out of range?"* → decide the contract: return `""`, throw, or
  clamp. State it before coding.
- *"How many letters does a 32-bit number need at most?"* → 7 (`A`..`Z` gives 26⁶ ≈
  3·10⁸, and 26⁷ ≈ 8·10⁹ > 2³¹).

**Common mistakes:**
- ❌ **Forgetting the decrement** → `26` becomes `A` instead of `Z`, and every
  multiple of 26 is wrong.
- ❌ Decrementing **after** the modulo → the remainder is computed on the wrong value.
- ❌ Forgetting to **reverse** the result → `28` comes out as `BA`.
- ❌ Using `charAt` arithmetic on the string instead of building with a
  `StringBuilder` → O(n²) string concatenation.

**How to narrate:**
> "This is base 26, but the digits are 1 to 26 instead of 0 to 25. So I subtract one
> before each modulo, which shifts the remainder into 0..25 and maps it onto A..Z.
> The letters come out least-significant first, so I reverse the StringBuilder at the
> end. O(log n) time."

## Related Problems

- [Excel Sheet Column Number](../../../../../../docs/topics/02-strings.md) — the inverse conversion
- [String to Integer (atoi)](../../../../../../docs/topics/02-strings.md) — parsing with overflow guards
