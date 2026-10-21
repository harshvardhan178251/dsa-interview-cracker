---
title: Climbing Stairs
leetcode: 70
difficulty: Easy
patterns: [Bottom-up DP, Recursion + memoization]
companies: [Amazon, Meta, JP Morgan, Apple, Paytm]
frequency: 4
tags: [dynamic-programming, fibonacci, recursion]
sampleInput: |
  5
sampleOutput: "8"
---

# Climbing Stairs — LeetCode 70

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Bottom-up DP · Recursion + memoization |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Adobe, Uber |

## Problem Statement

You are climbing a staircase with `n` steps. Each time you can climb **one** or **two** steps. How many distinct ways can you reach the top?

The order of the moves matters: `1,2` and `2,1` are two different ways to climb three stairs.

## Input Format

The program reads from standard input:

```
n
```

- `n` — the number of stairs to climb (1 ≤ n ≤ 45)

## Sample Input

```
5
```

## Expected Output

```
8
```

The eight ways are the eight possible arrangements of `1` and `2` steps whose sum is 5: `1+1+1+1+1`, `2+1+1+1`, `1+2+1+1`, `1+1+2+1`, `1+1+1+2`, `2+2+1`, `2+1+2`, `1+2+2`.

## Approach

A brute-force recursion `f(n) = f(n-1) + f(n-2)` explores a binary tree of depth `n`: `O(2ⁿ)` calls, and the sub-problems `f(n-1)` / `f(n-2)` are recomputed over and over.

The fix is the classic **bottom-up dynamic programme**:

1. Define `dp[i]` = the number of ways to reach stair `i`.
2. Base cases: `dp[0] = 1` (stay put — the empty climb) and `dp[1] = 1` (one single step).
3. Transition: the last move onto stair `i` is either a 1-step or a 2-step, so
   `dp[i] = dp[i-1] + dp[i-2]`.
4. Fill the table left to right and return `dp[n]`.

The recurrence is the Fibonacci sequence, which is why `climbStairs(n)` equals `fib(n+1)`. You can also solve it with **top-down memoisation** (a hash map keyed by the stair number) — same `O(n)` work, but it also shows you how to spot the repeated sub-problems.

## Dry Run

Input: `n = 5`. The table `dp` has one slot per stair.

| stair `i` | `dp[i-1]` | `dp[i-2]` | `dp[i]` | where `dp[i]` came from |
|---:|---:|---:|---:|---|
| 0 | — | — | **1** | base case — the empty climb |
| 1 | — | — | **1** | base case — one single step |
| 2 | `dp[1]` = 1 | `dp[0]` = 1 | **2** | `1 + 1` — last move is 1 step or 2 steps |
| 3 | `dp[2]` = 2 | `dp[1]` = 1 | **3** | `2 + 1` |
| 4 | `dp[3]` = 3 | `dp[2]` = 2 | **5** | `3 + 2` |
| 5 | `dp[4]` = 5 | `dp[3]` = 3 | **8** | `5 + 3` |

Full table: `dp = [1, 1, 2, 3, 5, 8]` → answer **8**.

**Why the naive recursion is slow.** `climb(5)` expands into `climb(4) + climb(3)`, and `climb(4)` is evaluated twice (once through each branch). The number of calls is `O(2ⁿ)` — 32 calls for `n = 5`, and about a million for `n = 20`. The table version evaluates every stair exactly once.

## Java Solution

See [`ClimbingStairs.java`](./ClimbingStairs.java).

```java
    public static int climbStairs(int n) {
        if (n <= 1) {
            return 1;
        }
        int[] dp = new int[n + 1];
        dp[0] = 1;
        dp[1] = 1;
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | one pass over the `n` stairs |
| **Space** | O(n) | the `dp` array holds `n + 1` entries (it can be reduced to `O(1)` — see the notes) |

**Space can be `O(1)`.** Only the previous two values are ever needed, so a rolling pair (`prev2`, `prev1`) replaces the array. The table is kept here because it is what you draw on the whiteboard.

## Interview Notes

**Follow-ups to raise yourself:**

- "Can you do it in `O(1)` space?"* → keep only the last two values; mention that the table was only for teaching.
- "What if the moves are 1, 3 or 5 stairs?"* → generalise to `dp[i] = dp[i-1] + dp[i-3] + dp[i-5]`.
- "What if you must use an even number of 2-steps?"* → keep a second table that also tracks parity.
- "How is this related to Fibonacci?"* → `climbStairs(n) = fib(n + 1)`; the first two values coincide.
- "Can you solve it recursively with memoisation?"* → yes, and show that the memo table is the same bottom-up table written top-down.

**Common mistakes:**

- ❌ Setting `dp[0] = 0` — that removes the "empty climb" and makes `climbStairs(1)` wrong for the recurrence (use `dp[0] = 1`).
- ❌ Forgetting the base case for `n == 1` and reading `dp[-1]`.
- ❌ Returning `dp[n-1]` or `fib(n)` instead of `dp[n] = fib(n+1)`.

**How to narrate:**

> "A brute-force recursion is exponential because `f(n)` calls `f(n-1)` and `f(n-2)` and those sub-problems repeat. I can memoise them, or better, build the answer bottom-up: the last move onto stair `i` is either one step or two steps, so `dp[i] = dp[i-1] + dp[i-2]` with `dp[0] = dp[1] = 1`. That is `O(n)` time and `O(n)` space, and the table is just the Fibonacci sequence shifted by one."

## Related Problems

- [Fibonacci Number — LeetCode 509](./FibonacciNumber.java) — the same recurrence
- [House Robber — LeetCode 198](./HouseRobber.java) — "take or skip" DP
- [Coin Change — LeetCode 322](./CoinChange.java) — unbounded knapsack
