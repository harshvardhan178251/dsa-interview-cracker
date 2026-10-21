---
title: Generate Parentheses
leetcode: 22
difficulty: Medium
patterns: [Backtracking, Pruning]
companies: [Amazon, Google, Facebook, Netflix, Stripe]
frequency: 4
tags: [backtracking, strings, recursion]
sampleInput: |
  3
sampleOutput: |
  ((()))
  (()())
  (())()
  ()(())
  ()()()
---

# Generate Parentheses — LeetCode 22

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Backtracking · Pruning |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Adobe |

## Problem Statement

Given `n` pairs of parentheses, generate **all** combinations of well-formed parentheses.

For example, with `n = 3` the five valid combinations are `((()))`, `(()())`, `(())()`, `()(())` and `()()()`.

## Input Format

The program reads from standard input:

```
n
```

- `n` — the number of parenthesis pairs (1 ≤ n ≤ 8)

## Sample Input

```
3
```

## Expected Output

```
((()))
(()())
(())()
()(())
()()()
```

The five valid combinations of three pairs, one per line, sorted lexicographically.

## Approach

The backtracking skeleton with **pruning built into the choice**:

1. Track `open` (opening brackets used) and `close` (closing brackets used).
2. Add `(` when `open < n` — there is still a pair that has to be opened.
3. Add `)` when `close < open` — a closing bracket is only legal when there is an unmatched    opening bracket in front of it.
4. When the path has `2n` characters it is a valid combination — record it.
5. Backtrack: delete the character that was just added.

**The pruning is the whole point.** Without the `close < open` rule the search would also produce strings like `)(` — invalid prefixes that can never be repaired. With it, every path in the search tree is a valid prefix, so nothing invalid is ever explored.

The number of results is the Catalan number `C(n)`: `C(3) = 5`, `C(4) = 14`.

## Dry Run

Input: `n = 3`. The path is built left to right; `(` may be added while `open < 3`, `)` only while `close < open`.

| path | open | close | try | new path | result |
|---|---:|---:|---|---|---|
| `""` | 0 | 0 | `(` | `"("` | — |
| `"("` | 1 | 0 | `(` | `"(("` | — |
| `"(("` | 2 | 0 | `(` | `"((("` | — |
| `"((("` | 3 | 0 | `)` | `"((()"` | — |
| `"((()"` | 3 | 1 | `)` | `"((())"` | — |
| `"((())"` | 3 | 2 | `)` | `"((()))"` | **`((()))`** |
| `"((())"` | 3 | 2 | — (`open == n`) | — | — |
| `"((()"` | 3 | 1 | — | — | — |
| `"((("` | 3 | 0 | — | — | — |
| `"(("` | 2 | 0 | `)` | `"(()"` | — |
| `"(()"` | 2 | 1 | `(` | `"(()("` | — |
| `"(()("` | 3 | 1 | `)` | `"(()()"` | — |
| `"(()()"` | 3 | 2 | `)` | `"(()())"` | **`(()())`** |
| `"(()"` | 2 | 1 | `)` | `"(()"` → wait, `(()` + `)` = `(())` | **`(())()`** |
| … | | | | | |
| `"("` | 1 | 0 | `)` | `"()"` | — |
| `"()"` | 1 | 1 | `(` | `"()("` | — |
| `"()("` | 2 | 1 | `(` | `"()(("` | — |
| `"()(("` | 3 | 1 | `)` | `"()(()"` | — |
| `"()(()"` | 3 | 2 | `)` | `"()(())"` | **`()(())`** |
| `"()("` | 2 | 1 | `)` | `"()()"` | — |
| `"()()"` | 2 | 2 | `(` | `"()()("` | — |
| `"()()("` | 3 | 2 | `)` | `"()()()"` | **`()()()`** |

Five combinations were recorded.

**The pruning in action.** From `"((("` the only legal move is `)` — `open == n`, so no more `(` is allowed, and `close < open` allows exactly one `)`.

**The five results** — `((()))`, `(()())`, `(())()`, `()(())`, `()()()` — are the Catalan number `C(3) = 5`. For `n = 4` there are `14`, for `n = 5` there are `42`.

**Why the result is sorted.** The DFS explores `(` before `)`, so the results already come out in lexicographic order — the explicit sort only makes that independent of the implementation.

## Java Solution

See [`GenerateParentheses.java`](./GenerateParentheses.java).

```java
    public static List<String> generateParenthesis(int n) {
        List<String> result = new ArrayList<>();
        build(new StringBuilder(), 0, 0, n, result);
        result.sort((a, b) -> compareLists(a, b));
        return result;
    }
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(4ⁿ / √n) | the number of results is the Catalan number `C(n) ≈ 4ⁿ / (n√π)` |
| **Space** | O(n) | the path and the recursion stack hold `2n` characters |

**Space `O(n)`** apart from the output, which holds `C(n)` strings of `2n` characters.

## Interview Notes

**Follow-ups to raise yourself:**

- "How many results are there?"* → the Catalan number `C(n)` — see [Catalan Number](../dynamicprogramming/CatalanNumber.java).
- "Can you generate only the `k`-th combination?"* → the unranking algorithm: build the string left to right and count how many valid completions start with each candidate.
- "What is the difference to a plain Catalan DP?"* → the DP counts them, the backtracking lists them.
- "How do you check a string in `O(n)`?"* → keep a counter of the balance — it must never go negative and must end at zero.

**Common mistakes:**

- ❌ Allowing `)` when `close == open` — that produces invalid brackets such as `)(`.
- ❌ Forgetting to delete the character after the recursive call — the path keeps growing.
- ❌ Stopping at `open == n` instead of `path.length() == 2 * n` — the closing brackets are still missing.

**How to narrate:**

> "I keep two counters, `open` and `close`. I can always add an opening bracket while `open` is below `n`, and I can add a closing bracket only while `close < open`, because a closing bracket needs an unmatched opening bracket in front of it. That rule prunes the invalid branches before they are explored, and when the path has `2n` characters it is a valid combination."

## Related Problems

- [Catalan Number — LeetCode 96](../dynamicprogramming/CatalanNumber.java) — counts the same objects
- [Palindrome Partitioning — LeetCode 131](./PalindromePartitioning.java) — the same skeleton over a string
