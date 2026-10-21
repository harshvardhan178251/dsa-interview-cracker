---
title: Basic Calculator
leetcode: 224
difficulty: Hard
patterns: [Stack of pending results, Recursive descent]
companies: [Google, Amazon, JP Morgan, Netflix, Intel, Capgemini, Tech Mahindra, Siemens]
frequency: 4
tags: [stack, parsing, math, hard]
sampleInput: |
  1 - (2 - 3)
sampleOutput: "2"
---

# Basic Calculator — LeetCode 224

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Stack of pending results · Recursive descent |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

Given a string containing the operators `+` and `-`, integer numbers and parentheses, evaluate
the expression.

- `1 - (2 - 3)` → `2`
- `2 - (5 - 3)` → `0`
- `-(2 + 3)` → `-5` (a unary minus is allowed)

Spaces inside the expression are ignored.

## Input Format

The program reads the **expression** from standard input (a single line; the whitespace
between the tokens does not matter):

```
expression
```

- `expression` — e.g. `1 - (2 - 3)`

## Sample Input

```
1 - (2 - 3)
```

## Expected Output

```
2
```

`2 - 3` is `-1`, and `1 - (-1) = 2`. ✓

## Approach — A Stack of Pending Results

The tricky part of `+`/`-` is that the sign of a term depends on the parentheses around it:
`1 - (2 - 3)` is not `1 - 2 - 3`. So when a parenthesis opens we must **remember** the
sign that was in effect, and restore it when the parenthesis closes.

The state of the parser is `(result, sign, number)`:

- `result` — the value of the terms that are already finished,
- `number` — the digits of the term being read,
- `sign` — `+1` or `-1`, the sign of the term being read.

Walking the expression:

- **digit** → extend `number`.
- **`+` / `-`** → finish the current term (`result += sign * number`), reset `number`, and
  set `sign` for the next term.
- **`(`** → push `(result, sign)` on the stack, then start a fresh sub-expression with
  `result = 0`, `number = 0`, `sign = +1`.
- **`)`** → finish the sub-expression and combine it with the outer state:
  `result = outerResult + outerSign * subResult`.

**Why the stack instead of recursion?** A recursive solution is a natural fit, but the
explicit stack has the same shape, uses heap memory instead of call frames, and never
overflows on a deeply nested expression.

## Dry Run

Input: `1 - (2 - 3)`, stack shown as **(result, sign) pairs, bottom → top**

| Char | action | `result` | `number` | `sign` | stack |
|---|---|---:|---:|---:|---|
| `1` | `number = 1` | 0 | 1 | 1 | `[]` |
| `-` | `result += 1*1 = 1`; `number = 0`; `sign = -1` | 1 | 0 | -1 | `[]` |
| `(` | push `(1, -1)`; `result = 0`; `sign = 1` | 0 | 0 | 1 | `[(1, -1)]` |
| `2` | `number = 2` | 0 | 2 | 1 | `[(1, -1)]` |
| `-` | `result += 1*2 = 2`; `number = 0`; `sign = -1` | 2 | 0 | -1 | `[(1, -1)]` |
| `3` | `number = 3` | 2 | 3 | -1 | `[(1, -1)]` |
| `)` | `result += -1*3 = -1`; pop `(1, -1)` → `result = 1 + (-1)*(-1) = 2`; `sign = 1` | 2 | 0 | 1 | `[]` |
| end | return `result + sign*number = 2 + 0` | | | | |

The answer is `2` ✓

### Unary minus — `-(3 + 4)`

| Char | action | `result` | `sign` | stack |
|---|---|---:|---:|---|
| `-` | `result += 0`; `sign = -1` | 0 | -1 | `[]` |
| `(` | push `(0, -1)`; `result = 0`; `sign = 1` | 0 | 1 | `[(0, -1)]` |
| `3` | `number = 3` | 0 | 1 | `[(0, -1)]` |
| `+` | `result += 3`; `sign = 1` | 3 | 1 | `[(0, -1)]` |
| `4` | `number = 4` | 3 | 1 | `[(0, -1)]` |
| `)` | `result += 4 = 7`; pop → `result = 0 + (-1)*7 = -7` | -7 | 1 | `[]` |

The answer is `-7` for `-(3 + 4)` ✓

## Java Solution

See [`BasicCalculator.java`](./BasicCalculator.java).

```java
public static int evaluate(String expression) {
    Deque<int[]> stack = new ArrayDeque<>();
    int result = 0;
    int number = 0;
    int sign = 1;

    for (int i = 0; i < expression.length(); i++) {
        char c = expression.charAt(i);
        if (c >= '0' && c <= '9') {
            number = number * 10 + (c - '0');
        } else if (c == '+' || c == '-') {
            result += sign * number;
            number = 0;
            sign = (c == '+') ? 1 : -1;
        } else if (c == '(') {
            stack.push(new int[]{result, sign});
            result = 0;
            number = 0;
            sign = 1;
        } else if (c == ')') {
            result += sign * number;
            number = 0;
            int[] previous = stack.pop();
            result = previous[0] + previous[1] * result;
            sign = 1;
        }
    }
    return result + sign * number;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One pass over the expression |
| **Space** | O(d) | The stack holds one entry per open parenthesis (d = nesting depth) |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Add `*` and `/` (LeetCode 227)."* → operator precedence has to be respected: keep the
  last number and the last operator and apply them late — see
  [Basic Calculator II](BasicCalculatorII.md).
- *"Add parentheses-free multiplication with precedence."* → two stacks (shunting yard).
- *"Support variables and functions."* → the stack holds scopes; each scope keeps a map of
  names to values.
- *"Evaluate it with a recursive descent parser."* → the same algorithm, written with a
  method per grammar rule.

**Common mistakes:**
- ❌ Forgetting to add the pending `number` when the expression ends → the last term is
  dropped.
- ❌ Resetting the sign to `+1` at the wrong moment → `1 - (2 - 3)` becomes `1 - 2 + 3`.
- ❌ Not restoring the outer `result` after `)` → the outer terms are lost.
- ❌ Not handling the unary minus at the start → `-(2+3)` is wrong.

**How to narrate:**
> "The sign of a term depends on the parentheses around it, so when I hit an opening
> parenthesis I push the current result and sign on a stack and start a fresh
> sub-expression. When I hit the closing parenthesis I finish the sub-expression and combine
> it with the outer state as `outerResult + outerSign * innerResult`. Digits accumulate in
> a number buffer, and `+`/`-` flush that buffer. One pass over the string, and the stack
> depth is the nesting depth."

## Related Problems

- [Basic Calculator II](BasicCalculatorII.md) — with multiplication and division
- [Decode String](DecodeString.md) — a stack based parser
- [Valid Parentheses](ValidParentheses.md) — the simplest stack parser
