---
title: Valid Parentheses
leetcode: 20
difficulty: Easy
patterns: [Stack, Bracket matching]
companies: [Google, Amazon, Meta, Goldman Sachs, JP Morgan, Salesforce, Pinterest]
frequency: 5
tags: [stack, string, parsing]
sampleInput: |
  ()[]{}
sampleOutput: "true"
---

# Valid Parentheses — LeetCode 20

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Stack · Bracket matching |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg, Adobe |

## Problem Statement

Given a string containing only the characters `( ) [ ] { }`, decide whether the brackets are
**balanced**:

- every opening bracket is closed by a bracket of the same type,
- and the closing happens in the correct order (last opened, first closed).

`()` and `([]{})` are balanced; `([)]` and `(` are not.

## Input Format

The program reads a **single line** from standard input:

```
brackets
```

- `brackets` — the bracket string (1 ≤ length ≤ 10⁴)

## Sample Input

```
()[]{}
```

## Expected Output

```
true
```

## Approach — A Stack of Unclosed Brackets

The rule "last opened, first closed" is exactly what a **stack** does, so the algorithm is
almost a restatement of the definition:

1. Push every **opening** bracket.
2. For every **closing** bracket:
   - if the stack is empty → `false` (a closing bracket with nothing to close),
   - pop the top and check that it is the matching opening bracket → if not, `false`.
3. At the end the stack must be empty → otherwise some opening bracket was never closed.

**Why the stack and not a counter?** A counter only tracks *how many* brackets are open; it
cannot tell you that `([)]` is invalid, because the types are interleaved. The stack keeps
the **order**, which is exactly the information the problem is about.

**Why not recursion?** A recursive solution is elegant (push, recurse, pop) but costs O(n)
stack space in the call frames and blows up on a 10⁴-character input. The explicit stack is
the same idea with a predictable memory cost.

## Dry Run

Input: `()[]{}`

| Step | char | stack before | action | stack after |
|---:|---|---|---|---|
| 1 | `(` | `[]` | push `(` | `[(]` |
| 2 | `)` | `[(]` | pop `(` → matches | `[]` |
| 3 | `[` | `[]` | push `[` | `[[]` |
| 4 | `]` | `[[]` | pop `[` → matches | `[]` |
| 5 | `{` | `[]` | push `{` | `[{]` |
| 6 | `}` | `[{]` | pop `{` → matches | `[]` |

The stack is empty at the end → **balanced** ✓

### Counter-example — `([)]`

| Step | char | stack before | action | stack after | verdict |
|---:|---|---|---|---|---|
| 1 | `(` | `[]` | push | `[(]` | |
| 2 | `[` | `[(]` | push | `[[(]` | |
| 3 | `)` | `[[(]` | pop `[` → does **not** match `)` | `[(]` | **false** |

The types are interleaved, so the bracket that closes `(` was never opened at that point. ✓

## Java Solution

See [`ValidParentheses.java`](./ValidParentheses.java).

```java
public static boolean isValid(String s) {
    Deque<Character> stack = new ArrayDeque<>();
    for (int i = 0; i < s.length(); i++) {
        char c = s.charAt(i);
        if (c == '(' || c == '[' || c == '{') {
            stack.push(c);
        } else {
            if (stack.isEmpty()) {
                return false;
            }
            char open = stack.pop();
            if (!matches(open, c)) {
                return false;
            }
        }
    }
    return stack.isEmpty();
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One pass; every character is pushed and popped at most once |
| **Space** | O(n) | The stack holds the unclosed brackets |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the string also contains other characters?"* → ignore everything that is not a
  bracket.
- *"Return the position of the first invalid bracket."* → track the index and report it
  instead of a boolean.
- *"What about the *longest valid parentheses* (LeetCode 32)?"* → keep the **indices** on
  the stack and use a sentinel `-1` for the "last invalid position" — a classic stack
  variation.
- *"Do it with a counter."* → only possible if there is a single bracket type.

**Common mistakes:**
- ❌ Checking only the **count** of open and closed brackets → `([)]` would pass.
- ❌ Forgetting the "stack is empty" check before popping → `NullPointerException` on `")"`.
- ❌ Not checking that the stack is empty at the end → `"("` would be reported as valid.

**How to narrate:**
> "The rule is last opened, first closed, which is a stack. I push every opening bracket and
> for every closing bracket I pop the top — it has to be the matching opening bracket, and
> the stack must not be empty. At the end the stack must be empty too. That's O(n) time and
> O(n) space, and it is the only approach that also checks the *types*."

## Related Problems

- [Decode String](DecodeString.md) — stack based parsing
- [Basic Calculator](BasicCalculator.md) — a stack of pending results
- [Minimum Stack](MinStack.md) — the other classic stack design
