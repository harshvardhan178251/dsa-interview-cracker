---
title: Valid Number
leetcode: null
difficulty: Medium
patterns: [Parsing, Finite state machine]
companies: [Amazon, Facebook]
frequency: 2
tags: [string, parsing, state-machine, validation]
sampleInput: |
  2e10
sampleOutput: "true"
---

# Valid Number

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Parsing · Finite state machine |
| **Interview heat** | ★★☆☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Decide whether a string represents a valid number.

A valid number follows this grammar:

```
[+-]? ( digits ( '.' digits* )? | '.' digits ) ( [eE] [+-]? digits )?
```

Read it piece by piece:

| Piece | Meaning | Examples |
|---|---|---|
| `[+-]?` | optional sign | `-`, `+` |
| `digits` | one or more digits — **mandatory** | `0`, `42` |
| `('.' digits*)?` | optional dot, then zero or more digits | `.`, `.5`, `3.14` |
| `('.' digits)?` | or a leading dot with **at least one** digit | `.5` |
| `([eE] [+-]? digits)?` | optional exponent with **at least one** digit | `e10`, `E-3` |

Consequences:

- `"3."` is **valid** (a trailing dot is allowed), but `"."` is **not**.
- `".5"` is **valid**, but `"e3"` is **not** (no mantissa digits).
- `"1e"` is **not** valid (an exponent needs at least one digit).
- `"99e2.5"` is **not** valid (a dot may not appear in the exponent).

## Input Format

The program reads from standard input:

```
s
```

- `s` — the candidate string, on a single line, no quotes.

## Sample Input

```
2e10
```

## Expected Output

```
true
```

## Approach — Consume the grammar in order

The grammar is already in evaluation order, so a single index scan is enough:

1. **Sign** — consume `+` or `-` if present.
2. **Mantissa** — consume digits, then (optionally) a dot and more digits. Remember
   whether **any** digit was seen; if not, the string is not a number.
3. **Exponent** — if the next character is `e`/`E`, consume it, an optional sign, and
   then the exponent digits. At least one digit is required.
4. **Leftovers** — the scan must have consumed the *entire* string, otherwise the
   string contains trailing garbage and is invalid.

Each phase is optional except the mantissa digits, which is exactly what the grammar
says.

## Dry Run

Input: `s = "2e10"`

| Step | phase | i | `s[i]` | action | i after |
|---:|---|---:|---|---|---:|
| 1 | sign | 0 | `2` | not `+`/`-` → no sign | 0 |
| 2 | mantissa digits | 0 | `2` | digit → `hasDigit = true` | 1 |
| 3 | mantissa digits | 1 | `e` | not a digit → stop the loop | 1 |
| 4 | dot | 1 | `e` | not `'.'` → skip the dot branch | 1 |
| 5 | mantissa check | — | — | `hasDigit == true` → continue | 1 |
| 6 | exponent | 1 | `e` | exponent marker → consume it | 2 |
| 7 | exponent sign | 2 | `1` | not `+`/`-` → no sign | 2 |
| 8 | exponent digits | 2 | `1` | digit → consumed | 3 |
| 9 | exponent digits | 3 | `0` | digit → consumed | 4 |
| 10 | exponent digits | 4 | — | end of string → stop | 4 |
| 11 | exponent check | — | — | `i (4) != exponentStart (2)` → at least one digit ✓ | 4 |
| 12 | leftovers | — | — | `i == n` (4 == 4) → **return true** | 4 |

### Trace of a rejection — `s = "1e"`

| Step | phase | i | `s[i]` | action | i after |
|---:|---|---:|---|---|---:|
| 1 | sign | 0 | `1` | not a sign | 0 |
| 2 | mantissa digits | 0 | `1` | digit → `hasDigit = true` | 1 |
| 3 | mantissa digits | 1 | `e` | not a digit → stop | 1 |
| 4 | dot | 1 | `e` | not `'.'` | 1 |
| 5 | mantissa check | — | — | `hasDigit == true` | 1 |
| 6 | exponent | 1 | `e` | consume the marker | 2 |
| 7 | exponent sign | 2 | — | end of string | 2 |
| 8 | exponent digits | 2 | — | end of string → zero digits consumed | 2 |
| 9 | exponent check | — | — | `i (2) == exponentStart (2)` → **return false** | 2 |

### Trace of a rejection — `s = "99e2.5"`

| Step | phase | i | `s[i]` | action | i after |
|---:|---|---:|---|---|---:|
| 1–5 | sign + mantissa | 0–1 | `9`,`9` | two digits, `hasDigit = true` | 2 |
| 6 | exponent | 2 | `e` | consume the marker | 3 |
| 7 | exponent sign | 3 | `2` | not a sign | 3 |
| 8 | exponent digits | 3 | `2` | digit → consumed | 4 |
| 9 | exponent digits | 4 | `.` | not a digit → stop | 4 |
| 10 | exponent check | — | — | one digit seen ✓ | 4 |
| 11 | leftovers | — | — | `i (4) != n (6)` → **return false** | 4 |

The `.5` at the end is never allowed to appear.

## Java Solution

See [`ValidNumber.java`](./ValidNumber.java).

```java
public static boolean isValidNumber(String s) {
    int i = 0;
    int n = s.length();
    if (i < n && (s.charAt(i) == '+' || s.charAt(i) == '-')) {
        i++;
    }
    boolean hasDigit = false;
    while (i < n && isDigit(s.charAt(i))) {
        i++;
        hasDigit = true;
    }
    if (i < n && s.charAt(i) == '.') {
        i++;
        while (i < n && isDigit(s.charAt(i))) {
            i++;
            hasDigit = true;
        }
    }
    if (!hasDigit) {
        return false;
    }
    if (i < n && (s.charAt(i) == 'e' || s.charAt(i) == 'E')) {
        i++;
        if (i < n && (s.charAt(i) == '+' || s.charAt(i) == '-')) {
            i++;
        }
        int exponentStart = i;
        while (i < n && isDigit(s.charAt(i))) {
            i++;
        }
        if (i == exponentStart) {
            return false;
        }
    }
    return i == n;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Each character is inspected a constant number of times |
| **Space** | O(1) | Only an index and two flags |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you write it as a regular expression?"* → yes:
  `^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$`. Then the question becomes "is the
  regex engine available and fast enough?" — backtracking regexes can blow up on
  adversarial input.
- *"What about hex literals, `0x1F`?"* → extend the grammar; the same scan structure
  works.
- *"What if the input can be `nan` or `inf`?"* → Java's `Double.parseDouble` accepts
  them, but they are not numbers in the grammar above.
- *"Parse it into a `double` instead of validating it?"* → the same scan, but you must
  detect overflow of the mantissa.

**Common mistakes:**
- ❌ Forgetting that the mantissa needs **at least one digit** → `"."` and `"e3"`
  wrongly accepted.
- ❌ Forgetting that the exponent needs **at least one digit** → `"1e"` wrongly
  accepted.
- ❌ Not checking for **trailing garbage** → `"1e10a"` and `"99e2.5"` wrongly accepted.
- ❌ Rejecting `"3."` → a trailing dot with digits before it is legal.

**How to narrate:**
> "I'll translate the grammar into a scan: optional sign, then the mantissa, then the
> optional exponent. The two things people get wrong are that the mantissa must
> contain a digit and that the exponent must contain a digit. At the end I check that
> the index reached the end of the string, which rejects all trailing garbage. One
> pass, O(1) space."

## Related Problems

- [String to Integer (atoi)](../../../../../../docs/topics/02-strings.md) — parse instead of validate
- [Compare Version Numbers](../../../../../../docs/topics/02-strings.md) — another segmented-string parse
