---
title: Basic Calculator II
leetcode: 227
difficulty: Medium
patterns: [Operator precedence, Deferred evaluation]
companies: [Meta, Google, Microsoft, Uber, Lyft, Cognizant, Capgemini, Sony]
frequency: 4
tags: [stack, parsing, math]
sampleInput: |
  3 + 2 * 2
sampleOutput: "7"
---

# Basic Calculator II — LeetCode 227

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Operator precedence · Deferred evaluation |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

Given a string containing the operators `+`, `-`, `*` and `/` and integer numbers, evaluate the
expression with the usual **operator precedence** (`*` and `/` before `+` and `-`).

- `3 + 2 * 2` → `7`
- `3 / 2` → `1` (integer division, truncated towards zero)
- `2 * 3 + 4` → `10`

Spaces inside the expression are ignored.

## Input Format

The program reads the **expression** from standard input (a single line):

```
expression
```

- `expression` — e.g. `3 + 2 * 2`

## Sample Input

```
3 + 2 * 2
```

## Expected Output

```
7
```

## Approach — Defer the `+` and `-`

The classic trick is to keep **three** values:

| Variable | Meaning |
|---|---|
| `result` | the terms that are completely finished |
| `lastNumber` | the last number, already multiplied/divided, with its sign |
| `number` | the number currently being read |

and the **operator that is still pending**.

Whenever a new operator is reached (or the end of the string), the **previous** operator is
applied to the number that was just read:

- `+` → flush `lastNumber` into `result` and make `lastNumber` the new number,
- `-` → flush `lastNumber` into `result` and make `lastNumber` the **negated** number,
- `*` → `lastNumber = lastNumber * number` (the flush has to wait),
- `/` → `lastNumber = lastNumber / number`.

At the very end the answer is `result + lastNumber`.

**Why this works:** `*` and `/` bind tighter than `+` and `-`, so they are applied to
`lastNumber` immediately, while `+` and `-` only decide the *sign* of the term — and that
sign can be stored without touching `result` until the term is really over.

**Why not a stack?** A two-stack shunting-yard parser handles any precedence table, but this
problem only has one level of precedence, so three variables are enough.

**Division truncates towards zero** in Java for `int` operands, which is what the problem
asks for (`7 / 2 == 3`, `-7 / 2 == -3`).

## Dry Run

Input: `3 + 2 * 2` — the characters are `3`, ` `, `+`, ` `, `2`, ` `, `*`, ` `, `2`

The switch is entered when an operator is met **or** at the last character; it always
applies the operator that was pending from the previous step.

| Step | i | char | `number` | pending operator | action | `result` | `lastNumber` |
|---:|---:|---|---:|---|---|---:|---:|
| 1 | 0 | `3` | 3 | — | digits are only accumulated | 0 | 0 |
| 2 | 2 | `+` | 3 | `+` (initial) | `result += lastNumber (0)`; `lastNumber = number (3)`; pending becomes `+` | 0 | 3 |
| 3 | 4 | `2` | 2 | — | digits are only accumulated | 0 | 3 |
| 4 | 6 | `*` | 2 | `+` | `result += lastNumber (3)`; `lastNumber = number (2)`; pending becomes `*` | 3 | 2 |
| 5 | 8 | `2` (last char) | 2 | `*` | `lastNumber = lastNumber * number = 2 * 2 = 4` | 3 | 4 |

The answer is `result + lastNumber` = `3 + 4` = **7** ✓

The multiplication was applied to the `2` that followed it, not to the `3` — that is exactly
what the precedence requires.

### Division — `14 / 3`

| Step | char | `number` | pending operator | action | `result` | `lastNumber` |
|---:|---|---:|---|---|---:|---:|
| 1 | `1` | 1 | — | accumulate | 0 | 0 |
| 2 | `4` | 14 | — | accumulate | 0 | 0 |
| 3 | `/` | 14 | `+` | `result += 0`; `lastNumber = 14`; pending becomes `/` | 0 | 14 |
| 4 | `3` (last char) | 3 | `/` | `lastNumber = 14 / 3 = 4` | 0 | 4 |

The answer is `0 + 4` = **4** ✓ (integer division truncates).

## Java Solution

See [`BasicCalculatorII.java`](./BasicCalculatorII.java).

```java
public static int evaluate(String expression) {
    int result = 0;
    int lastNumber = 0;
    int number = 0;
    char operator = '+';

    for (int i = 0; i < expression.length(); i++) {
        char c = expression.charAt(i);
        if (c >= '0' && c <= '9') {
            number = number * 10 + (c - '0');
        }
        boolean isOperator = c != ' ' && (c < '0' || c > '9');
        if (isOperator || i == expression.length() - 1) {
            switch (operator) {
                case '+':
                    result += lastNumber;
                    lastNumber = number;
                    break;
                case '-':
                    result += lastNumber;
                    lastNumber = -number;
                    break;
                case '*':
                    lastNumber = lastNumber * number;
                    break;
                case '/':
                    lastNumber = lastNumber / number;
                    break;
                default:
                    break;
            }
            operator = c;
            number = 0;
        }
    }
    return result + lastNumber;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One pass over the expression |
| **Space** | O(1) | Four variables, no stack |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Add parentheses too (LeetCode 224 + 227 combined)."* → a stack of `(result, lastNumber,
  operator)` frames; that is the natural next step.
- *"Support an arbitrary precedence table."* → the shunting-yard algorithm with two stacks.
- *"What about floating point division?"* → use `double` and be careful with the rounding.
- *"What if the expression contains variables?"* → a map from names to values, resolved when
  the identifier is read.

**Common mistakes:**
- ❌ Applying the **new** operator instead of the **pending** one → the precedence is off by
  one term.
- ❌ Forgetting the `i == length - 1` case → the last number is never flushed.
- ❌ Treating a space as an operator → `3 + 2` would be split at the space and produce
  garbage.
- ❌ Using floating point division and truncating later → `7 / 2` must be `3`, not `3.5`.

**How to narrate:**
> "I keep a running total, a last number and the pending operator. When I hit an operator I
> apply the *previous* operator to the number I just read: `*` and `/` are applied to the
> last number immediately, while `+` and `-` flush the last number into the total and store
> the new number with its sign. At the end the answer is the total plus the last number.
> One pass, O(1) space."

## Related Problems

- [Basic Calculator](BasicCalculator.md) — parentheses instead of precedence
- [Evaluate Reverse Polish Notation](EvaluateReversePolishNotation.md) — postfix evaluation
- [Decode String](DecodeString.md) — another stack parser
