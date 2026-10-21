---
title: Fibonacci Number
leetcode: 509
difficulty: Easy
patterns: [Bottom-up DP, Iterative recurrence]
companies: [Meta, Adobe, Airbnb, TCS, Bosch]
frequency: 3
tags: [dynamic-programming, fibonacci]
sampleInput: |
  6
sampleOutput: "8"
---

# Fibonacci Number — LeetCode 509

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Bottom-up DP · Iterative recurrence |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta |

## Problem Statement

The Fibonacci numbers are defined by:

- `F(0) = 0`
- `F(1) = 1`
- `F(n) = F(n-1) + F(n-2)` for `n > 1`

Given `n`, return `F(n)`.

## Input Format

The program reads from standard input:

```
n
```

- `n` — the index of the Fibonacci number (0 ≤ n ≤ 30)

## Sample Input

```
6
```

## Expected Output

```
8
```

`F(6) = F(5) + F(4) = 5 + 3 = 8`. The first values are `0, 1, 1, 2, 3, 5, 8, 13, …`.

## Approach

This is the recurrence that dynamic programming was invented for. Three ways to compute it:

1. **Naive recursion** — `O(2ⁿ)` calls, exponential.
2. **Top-down memoisation** — a hash map caches `F(k)` after the first computation, `O(n)` time, `O(n)` space.
3. **Bottom-up tabulation** — fill a table of size `n+1`, `O(n)` time and space.

But look at the recurrence again: `F(n)` only ever needs `F(n-1)` and `F(n-2)`. Once you have computed `F(i)` the older values are dead. So two variables are enough — `O(n)` time, `O(1)` space. This "rolling window" trick is the most common space optimisation in DP interviews, and it applies to any recurrence that only looks back a fixed number of steps.

## Dry Run

Input: `n = 6`. Two variables hold the window `F(i-2), F(i-1)`.

| iteration `i` | `prev2` = `F(i-2)` | `prev1` = `F(i-1)` | `current` = `F(i)` | state after the shift |
|---:|---:|---:|---:|---|
| init | `0` = F(0) | `1` = F(1) | — | `prev2 = 0`, `prev1 = 1` |
| 2 | 0 | 1 | **1** = 1 + 0 | `prev2 = 1`, `prev1 = 1` |
| 3 | 1 | 1 | **2** = 1 + 1 | `prev2 = 1`, `prev1 = 2` |
| 4 | 1 | 2 | **3** = 2 + 1 | `prev2 = 2`, `prev1 = 3` |
| 5 | 2 | 3 | **5** = 3 + 2 | `prev2 = 3`, `prev1 = 5` |
| 6 | 3 | 5 | **8** = 5 + 3 | `prev2 = 5`, `prev1 = 8` |

The loop ends with `prev1 = 8 = F(6)` → answer **8**.

**Table version for comparison.** A bottom-up table would hold `F = [0, 1, 1, 2, 3, 5, 8]` — same numbers, but it allocates `n + 1` integers to store two of them.

## Java Solution

See [`FibonacciNumber.java`](./FibonacciNumber.java).

```java
    public static int fib(int n) {
        int prev2 = 0; // F(0)
        int prev1 = 1; // F(1)
        for (int i = 2; i <= n; i++) {
            int current = prev1 + prev2;
            prev2 = prev1;
            prev1 = current;
        }
        return n == 0 ? prev2 : prev1;
    }
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | one addition per index, `n` iterations |
| **Space** | O(1) | only two integers are alive at any moment |

**Memoised recursion** is `O(n)` time and `O(n)` space (the recursion stack), and is often the follow-up the interviewer wants to see. `O(log n)` is possible with matrix exponentiation or fast doubling, but that is rarely worth the complexity in an interview.

## Interview Notes

**Follow-ups to raise yourself:**

- "Show me the recursive version."* → the naive `fib(n-1) + fib(n-2)` recursion, then add memoisation.
- "Can it be `O(1)` space?"* → yes, the two-variable version above.
- "What about `O(log n)`?"* → fast doubling `F(2k) = F(k) * (2*F(k+1) - F(k))`, or matrix exponentiation.
- "How is this used in practice?"* → Fibonacci numbers pop up in counting binary strings without consecutive ones, tiling problems, and as a worst-case benchmark for recursive algorithms.

**Common mistakes:**

- ❌ Starting the loop at `i = 1` and computing `F(i) = F(i-1) + F(i-2)` — that reads `F(-1)`.
- ❌ Returning `prev1` unconditionally — for `n == 0` the answer is `0`, not `1`.
- ❌ Using `long` where the result overflows silently — `F(92)` no longer fits in an `int`.

**How to narrate:**

> "The naive recursion recomputes the same values exponentially often. The recurrence only looks back two steps, so instead of memoising with a map I can keep a rolling window of two variables and shift them forward — that is `O(n)` time and `O(1)` space. If you want the recursion, memoising it gives the same `O(n)` bound with `O(n)` space."

## Related Problems

- [Climbing Stairs — LeetCode 70](./ClimbingStairs.java) — the same recurrence, shifted
- [Unique Paths — LeetCode 62](./UniquePaths.java) — binomial coefficients
