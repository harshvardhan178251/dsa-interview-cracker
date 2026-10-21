---
title: Perfect Number
leetcode: 507
difficulty: Easy
patterns: [Number theory, Divisor pairs]
companies: [Amazon, Bloomberg, Goldman Sachs]
frequency: 3
tags: [math, numbers]
sampleInput: |
  28
sampleOutput: "true"
---

# Perfect Number — LeetCode 507

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Number theory · Divisor pairs |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

A number is **perfect** when it equals the sum of its **proper divisors** — all
divisors except the number itself.

```
6  = 1 + 2 + 3            -> perfect
28 = 1 + 2 + 4 + 7 + 14   -> perfect
12 = 1 + 2 + 3 + 4 + 6    -> 16 ≠ 12, not perfect
```

The only known perfect numbers are `6`, `28`, `496`, `8128` and `33550336`; it is an
open question whether there are infinitely many.

## Input Format

The program reads from standard input:

```
n
```

- `n` — the number to test (1 ≤ n ≤ 10⁸)

## Sample Input

```
28
```

## Expected Output

```
true
```

## Approach — sum the divisors in pairs

The divisors of `n` come in pairs `(d, n / d)`, so it is enough to walk `d` up to
√n and add **both** members of every pair. The square root is only counted once.

The sum starts at `1` (the divisor that every number above 1 has) and `n` itself is
never added.

**Why this is complete:** for every divisor `d < √n` its partner `n / d > √n` is also a
divisor, and every divisor of `n` belongs to exactly one such pair. Walking `d` up to
√n therefore visits every divisor exactly once — except `n` itself, which is excluded
on purpose.

## Dry Run

Input: `n = 28`

| Step | `d` | `d² ≤ 28`? | `28 % d` | divisor pair | sum after | note |
|---:|---:|---|---|---|---:|---|
| 0 | — | — | — | — | 1 | `1` is a proper divisor |
| 1 | 2 | `4 ≤ 28` ✓ | 0 | `2` and `14` | `1 + 2 + 14 = 17` | pair added |
| 2 | 3 | `9 ≤ 28` ✓ | 1 | — | 17 | not a divisor |
| 3 | 4 | `16 ≤ 28` ✓ | 0 | `4` and `7` | `17 + 4 + 7 = 28` | pair added |
| 4 | 5 | `25 ≤ 28` ✓ | 3 | — | 28 | not a divisor |
| 5 | 6 | `36 ≤ 28`? **no** | — | — | 28 | loop ends |

`sum = 28 == n` → **true** ✓

### Trace of a non-perfect number — `n = 12`

| Step | `d` | pair | sum after |
|---:|---:|---|---:|
| 0 | — | — | 1 |
| 1 | 2 | `2` and `6` | `1 + 2 + 6 = 9` |
| 2 | 3 | `3` and `4` | `9 + 3 + 4 = 16` |
| 3 | 4 | `16 ≤ 12`? no | 16 |

`16 ≠ 12` → **false**

## Java Solution

See [`PerfectNumber.java`](./PerfectNumber.java).

```java
public static boolean isPerfect(int n) {
    if (n <= 1) {
        return false;
    }
    int sum = 1;
    for (int d = 2; (long) d * d <= n; d++) {
        if (n % d == 0) {
            sum += d;
            int other = n / d;
            if (other != d) {
                sum += other;
            }
        }
    }
    return sum == n;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(√n) | the loop walks up to √n |
| **Space** | O(1) | two counters |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Return all the divisors."* → collect the pairs in a list.
- *"What about the other special numbers — deficient, abundant, sociable?"* → the same
  sum classifies them: sum < n is deficient, sum > n is abundant.
- *"What about the odd perfect numbers?"* → none are known; their existence is an open
  mathematical problem.

**Common mistakes:**
- ❌ Adding `n` itself to the sum — the definition uses the **proper** divisors only.
- ❌ Adding the square root twice for perfect squares (`36 = 6²`) — the `other != d`
  check prevents that.
- ❌ Forgetting that `1` is not perfect — the sum of its proper divisors is `0`.

**How to narrate:**
> "The divisors come in pairs, so I only walk up to the square root and add both
> members of every pair. The sum starts at 1 and never includes the number itself, so
> the test is just `sum == n`."

## Related Problems

- [Is a Number Prime](./DetectPrime.md) — the same trial division loop
- [Largest Prime Factor](./LargestPrimeFactor.md) — factorising a number
- [GCD and LCM](./GcdAndLcm.md) — another classic number-theory routine
