---
title: Roman to Integer
leetcode: 13
difficulty: Easy
patterns: [Greedy, Left-to-right scan]
companies: [Amazon, Meta, Google, Uber]
frequency: 3
tags: [string, roman-numerals, parsing]
sampleInput: |
  MCMXCIV
sampleOutput: "1994"
---

# Roman to Integer — LeetCode 13

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Greedy · Left-to-right scan |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Meta, Google, Uber |

## Problem Statement

Given a Roman numeral, convert it to an **integer**.

- Symbol values: `I`=1, `V`=5, `X`=10, `L`=50, `C`=100, `D`=500, `M`=1000.
- If a symbol is **smaller** than the symbol immediately to its right, it is
  **subtracted**; otherwise it is **added**.
  - `IV` = 5 − 1 = 4, `IX` = 10 − 1 = 9, `XL` = 50 − 10 = 40, `XC` = 100 − 10 = 90,
    `CD` = 500 − 100 = 400, `CM` = 1000 − 100 = 900.

## Input Format

The program reads from standard input:

```
roman
```

- `roman` — the Roman numeral, on a single line, no quotes.

## Sample Input

```
MCMXCIV
```

## Expected Output

```
1994
```

## Approach — One scan, look ahead by one

Walk the string from left to right. At position `i` compare the value of `s[i]` with
the value of `s[i+1]`:

- `value(s[i]) < value(s[i+1])` → the symbol is part of a subtractive pair → **subtract**
- otherwise → **add**

The last symbol has no successor, so it is always added (think of the missing next
symbol as `0`).

**Why this works:** in a canonical Roman numeral a subtractive pair is always exactly
two symbols long, and the smaller symbol comes first. Comparing each symbol with its
immediate successor therefore identifies every subtractive symbol correctly, and
nothing else.

## Dry Run

Input: `s = "MCMXCIV"`

| Step | i | `s[i]` | value | `s[i+1]` | next value | rule | running total |
|---:|---:|---|---:|---|---:|---|---:|
| 1 | 0 | `M` | 1000 | `C` | 100 | 1000 ≥ 100 → add | 1000 |
| 2 | 1 | `C` | 100 | `M` | 1000 | 100 < 1000 → **subtract** | 900 |
| 3 | 2 | `M` | 1000 | `X` | 10 | 1000 ≥ 10 → add | 1900 |
| 4 | 3 | `X` | 10 | `C` | 100 | 10 < 100 → **subtract** | 1890 |
| 5 | 4 | `C` | 100 | `I` | 1 | 100 ≥ 1 → add | 1990 |
| 6 | 5 | `I` | 1 | `V` | 5 | 1 < 5 → **subtract** | 1989 |
| 7 | 6 | `V` | 5 | — | 0 | no successor → add | **1994** |

### Symbol table used in the trace

| Symbol | `I` | `V` | `X` | `L` | `C` | `D` | `M` |
|---|---:|---:|---:|---:|---:|---:|---:|
| value | 1 | 5 | 10 | 50 | 100 | 500 | 1000 |

## Java Solution

See [`RomanToInteger.java`](./RomanToInteger.java).

```java
public static int romanToInt(String s) {
    int total = 0;
    for (int i = 0; i < s.length(); i++) {
        int current = valueOf(s.charAt(i));
        int next = (i + 1 < s.length()) ? valueOf(s.charAt(i + 1)) : 0;
        if (current < next) {
            total -= current;
        } else {
            total += current;
        }
    }
    return total;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One pass over the string |
| **Space** | O(1) | Only the running total and two look-ahead values |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Validate that the input is a legal Roman numeral?"* → check the allowed symbols and
  that the subtractive pairs are legal (`IV`, `IX`, `XL`, `XC`, `CD`, `CM`) and that
  no symbol repeats more than three times.
- *"Convert an integer back to Roman."* → [Integer to Roman](../../../../../../docs/topics/02-strings.md).
- *"Can you do it with a right-to-left scan?"* → yes: add the symbol, and if the
  previous symbol is smaller, subtract twice its value (the classic "left-to-right vs
  right-to-left" trick).
- *"How would you handle lower-case input?"* → normalise with `toUpperCase()` first.

**Common mistakes:**
- ❌ Subtracting the **larger** symbol instead of the smaller one → `IV` becomes 6.
- ❌ Looking at `s[i-1]` instead of `s[i+1]` → the decision is about what comes
  *after* the current symbol.
- ❌ Forgetting the last symbol has no successor → it must still be added.

**How to narrate:**
> "I do a single left-to-right pass. For each symbol I look at the next one: if the
> current symbol is smaller it must be part of a subtractive pair, so I subtract it,
> otherwise I add it. The last symbol is always added. That's O(n) time and O(1)
> space."

## Related Problems

- [Integer to Roman](../../../../../../docs/topics/02-strings.md) — the inverse mapping
- [Compare Version Numbers](../../../../../../docs/topics/02-strings.md) — the same "compare two dotted strings" shape
