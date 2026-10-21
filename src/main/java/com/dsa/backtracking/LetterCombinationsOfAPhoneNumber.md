---
title: Letter Combinations of a Phone Number
leetcode: 17
difficulty: Medium
patterns: [Backtracking, DFS with a path]
companies: [Amazon, Google, Meta, Microsoft, Uber]
frequency: 4
tags: [backtracking, strings, maps]
sampleInput: |
  23
sampleOutput: |
  ad
  ae
  af
  bd
  be
  bf
  cd
  ce
  cf
---

# Letter Combinations of a Phone Number — LeetCode 17

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Backtracking · DFS with a path |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber |

## Problem Statement

Given the digits of a phone number, return **all** the letter combinations the number can stand for.

The classic keypad maps

```
2 -> abc   3 -> def   4 -> ghi   5 -> jkl
6 -> mno   7 -> pqrs  8 -> tuv   9 -> wxyz
```

## Input Format

The program reads from standard input:

```
digits
```

- `digits` — the phone number as a string of digits `2` to `9` (1 ≤ |digits| ≤ 9)

## Sample Input

```
23
```

## Expected Output

```
ad
ae
af
bd
be
bf
cd
ce
cf
```

The nine combinations of `2` and `3`, one per line.

## Approach

The classic backtracking example: the path **is** the answer.

1. Look at the digit at the current index and get its letters.
2. For every letter: append it to the path, recurse into the next digit, and **remove it again**    (the backtrack).
3. When every digit was expanded, the path is a complete combination — record it.

**Why the backtrack is needed.** The path is shared by all the branches of the recursion. If the letter were not removed after the recursive call, the next branch would start with a polluted path and produce nonsense like `ad`, `aead`, `aeadf`.

**The number of combinations** is the product of the number of letters of every digit: `3 × 4 = 12` for `23`… careful, `2` has three letters and `3` has three, so `23` gives `3 × 3 = 9` combinations.

## Dry Run

Input: `digits = "23"`.

| path | digit | letters tried | new path |
|---|---|---|---|
| `""` | `2` | `a` | `"a"` |
| `"a"` | `3` | `d` | `"ad"` → **record** |
| `"a"` | `3` | `e` | `"ae"` → **record** |
| `"a"` | `3` | `f` | `"af"` → **record** |
| `""` | `2` | `b` | `"b"` |
| `"b"` | `3` | `d` | `"bd"` → **record** |
| `"b"` | `3` | `e` | `"be"` → **record** |
| `"b"` | `3` | `f` | `"bf"` → **record** |
| `""` | `2` | `c` | `"c"` |
| `"c"` | `3` | `d` | `"cd"` → **record** |
| `"c"` | `3` | `e` | `"ce"` → **record** |
| `"c"` | `3` | `f` | `"cf"` → **record** |

Nine combinations were recorded.

**The backtrack in the trace.** After `"ad"` was recorded, the `d` is removed again, so the path is `"a"` again when the next letter `e` is tried — that is the `deleteCharAt` call.

**The result is already sorted.** The letters of every digit are tried in alphabetical order and the digits are handled from left to right, so the DFS produces the combinations in lexicographic order. The explicit sort only makes that independent of the implementation.

**A corner case.** The digits `1` and `0` have no letters — the keypad table has an empty string for them, so they produce no combination at all.

## Java Solution

See [`LetterCombinationsOfAPhoneNumber.java`](./LetterCombinationsOfAPhoneNumber.java).

```java
    public static List<String> letterCombinations(String digits) {
        List<String> result = new ArrayList<>();
        if (digits == null || digits.isEmpty()) {
            return result;
        }
        build(digits, 0, new StringBuilder(), result);
        result.sort(Comparator.naturalOrder());
        return result;
    }
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(4^n) | the number of combinations is the product of the letter counts, at most `4^n` |
| **Space** | O(n) | the path and the recursion stack hold `n` characters |

**Space `O(n)`** apart from the output, which holds up to `4^n` strings of `n` characters.

## Interview Notes

**Follow-ups to raise yourself:**

- "What if the number is very long?"* → the number of combinations explodes; usually only the count is asked for then.
- "How do you handle the letters of a dictionary instead of digits?"* → the same search, but the letters of a position come from a map.
- "Can you generate the combinations in a different order?"* → yes, the order of the result list is not part of the contract.
- "How do you count them without building them?"* → multiply the number of letters of every digit.

**Common mistakes:**

- ❌ Forgetting to remove the letter after the recursive call — the path keeps growing.
- ❌ Assuming the digits `1` and `0` have letters — they have none.
- ❌ Using the letter index of the digit directly instead of the letter string of the digit.

**How to narrate:**

> "I map every digit to its letters and then run a depth-first search: for each digit I try every letter, recurse with the next digit and remove the letter again afterwards. The path is the combination, so when every digit was expanded I record it. The number of combinations is the product of the letter counts — nine for `23`."

## Related Problems

- [Word Search — LeetCode 79](./WordSearch.java) — the same skeleton on a grid
- [Generate Parentheses — LeetCode 22](./GenerateParentheses.java) — the same skeleton with pruning
