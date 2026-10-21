---
title: Decode String
leetcode: 394
difficulty: Medium
patterns: [Stack of frames, Nested parsing]
companies: [Meta, Amazon, Netflix, Adobe, Stripe, Infosys, Capgemini, Figma]
frequency: 4
tags: [stack, parsing, string]
sampleInput: |
  3[a2[c]]
sampleOutput: "accaccacc"
---

# Decode String — LeetCode 394

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Stack of frames · Nested parsing |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

Given an encoded string, decode it. The encoding rule is `k[encoded_string]` — the content of
the square brackets is repeated `k` times — and the brackets may be nested.

- `3[a2[c]]` → `accaccacc`
- `2[abc]3[cd]ef` → `abcabccdcdcdef`
- `abc` → `abc` (nothing to decode)

## Input Format

The program reads the **encoded string** from standard input (a single line):

```
encoded
```

- `encoded` — e.g. `3[a2[c]]`

## Sample Input

```
3[a2[c]]
```

## Expected Output

```
accaccacc
```

`2[c]` is `cc`, and `3[acc]` is `accaccacc`. ✓

## Approach — A Stack of Frames

The decoded text of a nested block can only be built **inside out**, so the partial results
have to be remembered — that is what the stack is for.

Each frame holds:

- the **repeat count** `k` of the bracket that opened it,
- the **text built so far outside** the bracket.

Walking the string:

- **digit** → accumulate the count (it may have several digits: `12[a]`).
- **`[`** → push a frame with the count and the current text, then start a **fresh** text
  buffer.
- **letter** → append it to the current text.
- **`]`** → pop the frame: take the finished text, append it to the saved outer text
  `count` times, and make that the current text again.

At the end the current text is the answer.

**Why the count is read before the `[`:** the count always precedes its bracket
(`3[a]`), so by the time the `[` is met the count is complete.

**Why the outer text is saved and not just the count:** when a block closes, its decoded
text has to be appended to whatever came before it — `2[a]b` is `aab`, not `ab`.

## Dry Run

Input: `3[a2[c]]`, stack shown **bottom → top**

| Step | char | action | current text | stack |
|---:|---|---|---|---|
| 1 | `3` | `number = 3` | `""` | `[]` |
| 2 | `[` | push frame `(3, "")`; `number = 0`; start a new text | `""` | `[(3, "")]` |
| 3 | `a` | append | `"a"` | `[(3, "")]` |
| 4 | `2` | `number = 2` | `"a"` | `[(3, "")]` |
| 5 | `[` | push frame `(2, "a")`; `number = 0`; start a new text | `""` | `[(2, "a"), (3, "")]` |
| 6 | `c` | append | `"c"` | `[(2, "a"), (3, "")]` |
| 7 | `]` | pop `(2, "a")`; `"a" += "c"` twice → `"acc"` | `"acc"` | `[(3, "")]` |
| 8 | `]` | pop `(3, "")`; `"" += "acc"` three times → `"accaccacc"` | `"accaccacc"` | `[]` |

The decoded string is `accaccacc` ✓

## Java Solution

See [`DecodeString.java`](./DecodeString.java).

```java
public static String decode(String encoded) {
    Deque<Frame> stack = new ArrayDeque<>();
    StringBuilder current = new StringBuilder();
    int number = 0;

    for (int i = 0; i < encoded.length(); i++) {
        char c = encoded.charAt(i);
        if (c >= '0' && c <= '9') {
            number = number * 10 + (c - '0');
        } else if (c == '[') {
            stack.push(new Frame(number, current));
            number = 0;
            current = new StringBuilder();
        } else if (c == ']') {
            Frame frame = stack.pop();
            StringBuilder outer = frame.text;
            for (int k = 0; k < frame.count; k++) {
                outer.append(current);
            }
            current = outer;
        } else {
            current.append(c);
        }
    }
    return current.toString();
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(L) | L is the length of the **decoded** output — every character is written once per repetition |
| **Space** | O(L) | The stack plus the text buffers |

## Interview Notes

**Follow-ups to raise yourself:**
- *"The count can be huge — the output would not fit in memory."* → return a lazy structure
  (a tree of repetitions) instead of a string.
- *"What if the string also contains other brackets?"* → the same idea with a matching rule.
- *"Reverse the problem: encode a string."* → the reverse transformation needs the counts.
- *"What if the input is a stream?"* → the same state machine, fed character by character.

**Common mistakes:**
- ❌ Forgetting to save the **outer** text in the frame → the result loses everything that
  came before the block.
- ❌ Resetting the count at the wrong moment → `12[a]` becomes `2[a]`.
- ❌ Building the result with string concatenation in a loop → O(n²); use a `StringBuilder`.

**How to narrate:**
> "The decoded text has to be built from the inside out, so I keep a stack of frames. Every
> frame stores the repeat count and the text that was built outside the bracket. On `[` I
> push a frame and start a fresh buffer; on `]` I pop the frame, repeat the finished text
> that many times and append it to the saved outer text. Digits accumulate into the count,
> and letters are appended to the current buffer. The time is linear in the length of the
> decoded output."

## Related Problems

- [Valid Parentheses](ValidParentheses.md) — the simplest bracket stack
- [Basic Calculator](BasicCalculator.md) — a stack of pending results
- [Evaluate Reverse Polish Notation](EvaluateReversePolishNotation.md) — a stack of operands
