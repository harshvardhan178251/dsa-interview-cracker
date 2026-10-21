---
title: Evaluate Reverse Polish Notation
leetcode: 150
difficulty: Medium
patterns: [Stack, Postfix evaluation]
companies: [Amazon, Google, Meta, Microsoft, Uber, Bloomberg]
frequency: 4
tags: [stack, parsing, math]
sampleInput: |
  7
  2 1 + 3 * 4 -
sampleOutput: "5"
---

# Evaluate Reverse Polish Notation — LeetCode 150

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Stack · Postfix evaluation |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

Evaluate an expression given in **reverse polish notation** (postfix notation), where the
operator comes **after** its operands.

- `2 1 + 3 * 4 -` → `5` (that is `((2 + 1) * 3) - 4`)
- `4 2 +` → `6`
- Division is integer division that truncates towards zero.

## Input Format

The program reads from standard input:

```
n
token[0] token[1] ... token[n-1]
```

- `n` — the number of tokens (1 ≤ n ≤ 10⁵)
- `tokens` — n space-separated tokens: either an integer or one of `+ - * /`

## Sample Input

```
7
2 1 + 3 * 4 -
```

## Expected Output

```
5
```

## Approach — The Stack Is the Expression

Postfix notation exists precisely so that an expression can be evaluated with a stack and
nothing else. The rule is one sentence:

> Push every number. When you meet an operator, pop the **right** operand, pop the **left**
> operand, push the result.

The order of the two pops matters: for `-` and `/` the operands are not commutative, and the
**right** operand is on top of the stack.

**Why the order is guaranteed:** in postfix notation the operands of an operator always
appear before it, so by the time the operator is reached both operands are already on the
stack, and the most recently pushed one is the right operand.

At the end exactly one value is left on the stack — the answer.

**Why this problem is a stack exercise, not a parsing exercise:** there is no grammar to
follow and no parentheses to match. The stack *is* the expression.

## Dry Run

Input: `2 1 + 3 * 4 -`, stack shown **bottom → top**

| Step | token | action | stack |
|---:|---|---|---|
| 1 | `2` | push 2 | `[2]` |
| 2 | `1` | push 1 | `[2, 1]` |
| 3 | `+` | pop right = 1, pop left = 2 → push `2 + 1 = 3` | `[3]` |
| 4 | `3` | push 3 | `[3, 3]` |
| 5 | `*` | pop right = 3, pop left = 3 → push `3 * 3 = 9` | `[9]` |
| 6 | `4` | push 4 | `[9, 4]` |
| 7 | `-` | pop right = 4, pop left = 9 → push `9 - 4 = 5` | `[5]` |

The stack holds a single value: `5` ✓

### Order matters — `5 1 -`

| Step | token | action | stack |
|---:|---|---|---|
| 1 | `5` | push 5 | `[5]` |
| 2 | `1` | push 1 | `[5, 1]` |
| 3 | `-` | pop right = 1, pop left = 5 → push `5 - 1 = 4` | `[4]` |

Popping in the wrong order would give `1 - 5 = -4` ✗

## Java Solution

See [`EvaluateReversePolishNotation.java`](./EvaluateReversePolishNotation.java).

```java
public static int evaluate(String[] tokens) {
    Deque<Integer> stack = new ArrayDeque<>();

    for (String token : tokens) {
        if (isOperator(token)) {
            int right = stack.pop();     // the right operand is on top
            int left = stack.pop();      // then the left operand
            stack.push(apply(token, left, right));
        } else {
            stack.push(Integer.parseInt(token));
        }
    }
    return stack.pop();
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every token is processed once, each push/pop is O(1) |
| **Space** | O(n) | The stack |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Convert infix to postfix."* → the shunting-yard algorithm with an operator stack and a
  precedence table.
- *"Evaluate infix directly with two stacks."* → one stack of values, one of operators.
- *"Add the `^` operator (right associative)."* → the shunting-yard algorithm handles the
  associativity rules; a single stack does not.
- *"What about unary minus?"* → it needs a context flag: an operator expecting an operand
  versus one expecting a value.

**Common mistakes:**
- ❌ Popping the operands in the wrong order → subtraction and division give wrong results.
- ❌ Treating a negative number as an operator → check the token, not the first character.
- ❌ Forgetting to push the result back after an operation → the stack loses a value.
- ❌ Using `int` division and expecting a float → Java's `int` division truncates towards
  zero.

**How to narrate:**
> "Postfix is designed for a stack. I push every number. When I see an operator I pop the
> right operand first, then the left one, compute the result and push it back. At the end
> the single remaining value is the answer. The pop order matters for `-` and `/` because
> those operators are not commutative. O(n) time, O(n) space."

## Related Problems

- [Basic Calculator II](BasicCalculatorII.md) — infix with precedence
- [Basic Calculator](BasicCalculator.md) — infix with parentheses
- [Decode String](DecodeString.md) — stack of partial results
