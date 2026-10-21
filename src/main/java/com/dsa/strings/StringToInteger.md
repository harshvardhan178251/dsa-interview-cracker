---
title: String to Integer (atoi)
leetcode: 8
difficulty: Medium
patterns: [Parsing, Overflow guards]
companies: [Google, Meta, LinkedIn, Facebook, ByteDance, Infosys, Cognizant, Standard Chartered]
frequency: 4
tags: [string, parsing, overflow, atoi]
sampleInput: |
  2147483648
sampleOutput: "2147483647"
---

# String to Integer (atoi) — LeetCode 8

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Parsing · Overflow guards |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Microsoft, Apple |

## Problem Statement

Implement a function that converts a string into a 32-bit signed integer, exactly the
way C's `atoi` does:

1. Skip any leading **whitespace**.
2. Read an optional sign — `+` or `-`.
3. Read as many consecutive **digits** as possible; stop at the first other character.
4. Ignore everything after that.
5. If no digits were read, the result is `0`.
6. The result is **clamped** to `[−2³¹, 2³¹ − 1]` instead of overflowing.

## Input Format

The program reads from standard input:

```
s
```

- `s` — the string to parse, on a single line, no quotes.
- The scanner hands the parser one whitespace-free token; the parser itself also
  handles leading whitespace, which is covered by the unit tests.

## Sample Input

```
2147483648
```

## Expected Output

```
2147483647
```

`2147483648` is one larger than `Integer.MAX_VALUE`, so the value is clamped.

## Approach — Three phases plus a guard

The parse happens in three phases, each with its own loop:

| Phase | What it does |
|---|---|
| 1 | skip leading whitespace |
| 2 | consume an optional `+` / `-` and remember the sign |
| 3 | consume digits, accumulating `value = value * 10 + digit` |

**The overflow guard is the interesting part.** A `long` accumulator would happily
grow past `2³¹`, but the answer must fit in an `int`. So after every digit the value
is compared against the limit and the function returns the clamped bound immediately:

- positive and `value > Integer.MAX_VALUE` → return `Integer.MAX_VALUE`
- negative and `value > 2³¹` → return `Integer.MIN_VALUE`

Because the check runs *after* each digit, the accumulator never grows large: it is
stopped the moment it leaves the range.

## Dry Run

Input: `s = "2147483648"` — no leading whitespace, no sign, all digits.

| Step | i | `s[i]` | `value` (long) | `value ≤ 2147483647`? | action |
|---:|---:|---|---:|---|---|
| 1 | 0 | `2` | 2 | ✓ | continue |
| 2 | 1 | `1` | 21 | ✓ | continue |
| 3 | 2 | `4` | 214 | ✓ | continue |
| 4 | 3 | `7` | 2147 | ✓ | continue |
| 5 | 4 | `4` | 21474 | ✓ | continue |
| 6 | 5 | `8` | 214748 | ✓ | continue |
| 7 | 6 | `3` | 2147483 | ✓ | continue |
| 8 | 7 | `6` | 21474836 | ✓ | continue |
| 9 | 8 | `4` | 214748364 | ✓ | continue |
| 10 | 9 | `8` | 2147483648 | ✗ | **return `Integer.MAX_VALUE` = 2147483647** |

The loop is never left normally — the clamp short-circuits it.

### Trace with a sign and trailing garbage — `s = "   -42abc"`

| Step | phase | i | `s[i]` | `value` | note |
|---:|---|---:|---|---:|---|
| 1 | whitespace | 0 | ` ` | — | skip |
| 2 | whitespace | 1 | ` ` | — | skip |
| 3 | whitespace | 2 | ` ` | — | skip |
| 4 | sign | 3 | `-` | — | `sign = −1`, `i → 4` |
| 5 | digits | 4 | `4` | 4 | `−4 ≤ 2147483648` ✓ |
| 6 | digits | 5 | `2` | 42 | `−42 ≥ −2147483648` ✓ |
| 7 | stop | 6 | `a` | 42 | not a digit → stop reading |
| 8 | — | — | — | — | return `sign * value` = `−42` |

## Java Solution

See [`StringToInteger.java`](./StringToInteger.java).

```java
public static int myAtoi(String s) {
    int i = 0;
    int n = s.length();
    while (i < n && Character.isWhitespace(s.charAt(i))) {
        i++;
    }
    if (i == n) {
        return 0;
    }
    int sign = 1;
    char signChar = s.charAt(i);
    if (signChar == '+' || signChar == '-') {
        sign = signChar == '-' ? -1 : 1;
        i++;
    }
    long value = 0;
    while (i < n && isDigit(s.charAt(i))) {
        value = value * 10 + (s.charAt(i) - '0');
        if (sign == 1 && value > Integer.MAX_VALUE) {
            return Integer.MAX_VALUE;
        }
        if (sign == -1 && -value < Integer.MIN_VALUE) {
            return Integer.MIN_VALUE;
        }
        i++;
    }
    return (int) (sign * value);
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Each character is inspected at most once |
| **Space** | O(1) | Only an index, a sign and an accumulator |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the number has to fit in a `long`?"* → same code, swap the limits for
  `Long.MAX_VALUE` / `Long.MIN_VALUE`; the accumulator is already a `long`.
- *"Parse it into a `double` instead?"* → handle the fractional part and the exponent
  separately — and then the overflow question changes shape entirely.
- *"What does `Integer.parseInt` do differently?"* → it throws
  `NumberFormatException` instead of clamping, and it rejects a leading `+` in older
  JDKs.
- *"How would you unit-test this?"* → table-driven: sign × digits × garbage ×
  boundary values.

**Common mistakes:**
- ❌ Building the result in an **`int`** → it overflows silently and wraps to a
  negative number (`2147483648` becomes `-2147483648`).
- ❌ Checking the overflow **only after the loop** → the damage is already done.
- ❌ Using `Character.isDigit` → it accepts Unicode digits such as `'٣'`; the spec
  says ASCII only.
- ❌ Forgetting to handle the empty / whitespace-only string → index out of bounds.

**How to narrate:**
> "This is a three-phase scan: skip whitespace, read an optional sign, then read
> digits. The part people get wrong is overflow. I accumulate into a long and check
> the limit after every single digit, so I can never overflow and I return the
> clamped bound the moment the value leaves the 32-bit range. O(n) time, O(1) space."

## Related Problems

- [Valid Number](../../../../../../docs/topics/02-strings.md) — the "is this a number?" grammar check
- [Excel Sheet Column Title](../../../../../../docs/topics/02-strings.md) — the reverse direction: number → string
