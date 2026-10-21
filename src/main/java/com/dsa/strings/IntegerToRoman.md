---
title: Integer to Roman
leetcode: 12
difficulty: Medium
patterns: [Greedy, Lookup table]
companies: [Amazon, Meta, Google, Uber]
frequency: 3
tags: [string, roman-numerals, greedy]
sampleInput: |
  1994
sampleOutput: "MCMXCIV"
---

# Integer to Roman — LeetCode 12

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Greedy · Lookup table |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Meta, Google, Uber |

## Problem Statement

Convert an integer (1 ≤ num ≤ 3999) into its **Roman numeral** representation.

| Symbol | Value | Symbol | Value |
|---|---:|---|---:|
| `I` | 1 | `X` | 10 |
| `V` | 5 | `L` | 50 |
| `C` | 100 | `D` | 500 |
| `M` | 1000 | | |

Six "subtractive" spellings exist and must be used instead of the naive form:
`IV` (4), `IX` (9), `XL` (40), `XC` (90), `CD` (400), `CM` (900).

## Input Format

The program reads from standard input:

```
num
```

- `num` — the integer to convert (1 ≤ num ≤ 3999), on its own line.

## Sample Input

```
1994
```

## Expected Output

```
MCMXCIV
```

`1994 = 1000 + 900 + 90 + 4 = M + CM + XC + IV`.

## Approach — Greedy with a descending table

Build a table of **value → symbol** pairs sorted by value descending, including the
six subtractive pairs:

```
1000 M    900 CM    500 D    400 CD    100 C    90 XC    50 L
   40 XL     10 X      9 IX     5 V      4 IV     1 I
```

Then walk the table once. For every row, while the remaining value is at least the
row's value, append its symbol and subtract the value.

**Why the subtractive pairs must be in the table:** without `CM`, the number 900 would
be spelled `DCCCC` instead of `CM`. Putting `900 CM` *before* `500 D` in the table
makes the greedy choice automatically correct.

**Why greedy is optimal:** Roman numerals are canonical — each place value has exactly
one spelling. Taking the largest symbol that fits at each step reproduces that
canonical spelling, because the table contains every legal building block in
descending order.

## Dry Run

Input: `num = 1994`

| Step | table value | symbol | `num` before | fits? | `num` after | output so far |
|---:|---:|---|---:|---|---:|---|
| 1 | 1000 | `M` | 1994 | ✓ | 994 | `M` |
| 2 | 1000 | `M` | 994 | ✗ | 994 | `M` |
| 3 | 900 | `CM` | 994 | ✓ | 94 | `MCM` |
| 4 | 900 | `CM` | 94 | ✗ | 94 | `MCM` |
| 5 | 500 | `D` | 94 | ✗ | 94 | `MCM` |
| 6 | 400 | `CD` | 94 | ✗ | 94 | `MCM` |
| 7 | 100 | `C` | 94 | ✗ | 94 | `MCM` |
| 8 | 90 | `XC` | 94 | ✓ | 4 | `MCMXC` |
| 9 | 90 | `XC` | 4 | ✗ | 4 | `MCMXC` |
| 10 | 50 | `L` | 4 | ✗ | 4 | `MCMXC` |
| 11 | 40 | `XL` | 4 | ✗ | 4 | `MCMXC` |
| 12 | 10 | `X` | 4 | ✗ | 4 | `MCMXC` |
| 13 | 9 | `IX` | 4 | ✗ | 4 | `MCMXC` |
| 14 | 5 | `V` | 4 | ✗ | 4 | `MCMXC` |
| 15 | 4 | `IV` | 4 | ✓ | 0 | `MCMXCIV` |
| 16 | 4 | `IV` | 0 | ✗ | 0 | `MCMXCIV` |
| 17 | 1 | `I` | 0 | ✗ | 0 | `MCMXCIV` |

Final answer: **`MCMXCIV`**

## Java Solution

See [`IntegerToRoman.java`](./IntegerToRoman.java).

```java
private static final int[] VALUES = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
private static final String[] SYMBOLS = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};

public static String intToRoman(int num) {
    if (num <= 0) {
        return "";
    }
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < VALUES.length; i++) {
        while (num >= VALUES[i]) {
            sb.append(SYMBOLS[i]);
            num -= VALUES[i];
        }
    }
    return sb.toString();
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(1 + k) | 13 table rows, plus one append per output symbol (k ≤ 15) |
| **Space** | O(k) | The output string |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the input can be larger than 3999?"* → repeat `M` as needed (4000 = `MMMM`);
  Roman numerals have no standard form above 3999.
- *"Convert it back."* → [Roman to Integer](../../../../../../docs/topics/02-strings.md), a single left-to-right scan.
- *"How would you handle a non-canonical numeral such as `IIII`?"* → decide whether to
  accept it; the canonical form is `IV`, and a strict parser can reject `IIII`.
- *"Can you do it without a lookup table?"* → digit-by-digit with four small arrays
  (ones, tens, hundreds, thousands).

**Common mistakes:**
- ❌ Leaving the subtractive pairs **out** of the table → `900` becomes `DCCCC`.
- ❌ Putting `CM` **after** `D` in the table → greedy picks `D` first and produces
  `DCCCC`.
- ❌ Using `IIV` / `IIII` style output → the canonical spellings must be used.
- ❌ Looping with `for` over the values instead of a `while` → `3000` must be `MMM`,
  not `M`.

**How to narrate:**
> "Roman numerals are canonical, so I can be greedy. I keep a table of value/symbol
> pairs in descending order, including the six subtractive pairs — that's the trick
> that makes 900 come out as CM instead of DCCCC. Then I walk the table and, while
> the value fits, I append the symbol and subtract. O(1) time for the table walk
> plus the output length."

## Related Problems

- [Roman to Integer](../../../../../../docs/topics/02-strings.md) — the inverse mapping
- [String to Integer (atoi)](../../../../../../docs/topics/02-strings.md) — parsing with overflow guards
