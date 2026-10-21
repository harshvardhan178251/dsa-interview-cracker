---
title: Ugly Number
leetcode: 313
difficulty: Medium
patterns: [Dynamic programming, Three pointers]
companies: [Amazon, Google, Meta, Uber]
frequency: 3
tags: [math, dynamic-programming, pointers]
sampleInput: |
  10
sampleOutput: "12"
---

# Ugly Number — LeetCode 313

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Dynamic programming · Three pointers |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

An **ugly number** is a positive integer whose only prime factors are `2`, `3` and `5`.
The sequence starts

```
1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 16, 18, 20, 24, 25, 27, 30, 32, ...
```

`1` is ugly by definition. Return the **n-th** ugly number (1-indexed).

## Input Format

The program reads from standard input:

```
n
```

- `n` — the 1-based index (1 ≤ n ≤ 1690)

## Sample Input

```
10
```

## Expected Output

```
12
```

## Approach — three pointers over the sequence

Every ugly number is `2 × u`, `3 × u` or `5 × u` for an earlier ugly number `u`. So the
sequence can be generated with three pointers into the already computed values:

- `i2` points at the ugly number whose double is the next candidate,
- `i3` at the one whose triple is the candidate,
- `i5` at the one whose fivefold is the candidate.

The next ugly number is the **minimum** of the three candidates. Then **every** pointer
that produced that minimum moves forward — otherwise duplicates appear (`6` is both
`2 × 3` and `3 × 2`).

**Why the minimum is correct:** the ugly numbers are exactly the numbers reachable by
multiplying `1` by 2, 3 and 5 in any order. Sorted, they form the sequence above, and
each of them is produced by multiplying a smaller ugly number by one of the three
factors — so the next one must be among the three candidates, and by induction the
pointers always reference the smallest not-yet-used multiple.

**Why all matching pointers move:** `12` can be written as `2 × 6` and as `3 × 4`. If
only `i2` moved, `12` would be emitted again later. Moving every pointer that
produced the minimum removes the duplicate — this is the classic "merge k sorted
lists" trick.

## Dry Run

Input: `n = 10`

| Step | `ugly[i2] × 2` | `ugly[i3] × 3` | `ugly[i5] × 5` | next | pointers after | `ugly` |
|---:|---:|---:|---:|---:|---|---|
| 0 | — | — | — | 1 | `i2 = i3 = i5 = 0` | `[1]` |
| 1 | `1×2 = 2` | `1×3 = 3` | `1×5 = 5` | 2 | `i2 = 1` | `[1, 2]` |
| 2 | `2×2 = 4` | `1×3 = 3` | `1×5 = 5` | 3 | `i3 = 1` | `[1, 2, 3]` |
| 3 | `2×2 = 4` | `2×3 = 6` | `1×5 = 5` | 4 | `i2 = 2` | `[1, 2, 3, 4]` |
| 4 | `3×2 = 6` | `2×3 = 6` | `1×5 = 5` | 5 | `i5 = 1` | `[1, 2, 3, 4, 5]` |
| 5 | `3×2 = 6` | `2×3 = 6` | `2×5 = 10` | 6 | `i2 = 3`, `i3 = 2` | `[…, 6]` |
| 6 | `4×2 = 8` | `3×3 = 9` | `2×5 = 10` | 8 | `i2 = 4` | `[…, 8]` |
| 7 | `4×2 = 8` | `3×3 = 9` | `2×5 = 10` | 9 | `i3 = 3` | `[…, 9]` |
| 8 | `5×2 = 10` | `3×3 = 9` | `2×5 = 10` | 10 | `i2 = 5`, `i5 = 2` | `[…, 10]` |
| 9 | `6×2 = 12` | `4×3 = 12` | `3×5 = 15` | 12 | `i2 = 6`, `i3 = 4` | `[…, 12]` |

The 10-th ugly number is **12** ✓

## Java Solution

See [`UglyNumber.java`](./UglyNumber.java).

```java
public static int nthUglyNumber(int n) {
    if (n <= 0) {
        return 0;
    }
    long[] ugly = new long[n];
    ugly[0] = 1;
    int i2 = 0;
    int i3 = 0;
    int i5 = 0;
    for (int i = 1; i < n; i++) {
        long next = Math.min(ugly[i2] * 2, Math.min(ugly[i3] * 3, ugly[i5] * 5));
        ugly[i] = next;
        if (next == ugly[i2] * 2) {
            i2++;
        }
        if (next == ugly[i3] * 3) {
            i3++;
        }
        if (next == ugly[i5] * 5) {
            i5++;
        }
    }
    return (int) ugly[n - 1];
}
```

The array holds `long` values because the candidate `ugly[i] × 5` can exceed the range
of an `int` even when the answer itself fits.

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | three comparisons and three pointer moves per element |
| **Space** | O(n) | the sequence has to be kept for the pointers |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Generalise to the ugly number II — numbers with at most `k` prime factors."* → use
  `k` pointers instead of three.
- *"Find the nth ugly number without storing the whole sequence?"* → you need the
  sequence for the pointers; a heap of the three candidates is the alternative.
- *"How do you test whether a number is ugly?"* → divide out the factors of 2, 3 and
  5 and check that what is left is 1.

**Common mistakes:**
- ❌ Moving only one pointer when several candidates tie — `12` would be emitted twice.
- ❌ Using `int` for the array — `ugly[i] × 5` can overflow.
- ❌ Forgetting that `1` is the first ugly number.

**How to narrate:**
> "Every ugly number is two, three or five times a smaller ugly number, so I keep the
> sequence and three pointers, one per factor. The next number is the smallest of the
> three candidates, and I advance *every* pointer that produced it — otherwise
> duplicates like `12 = 2 × 6 = 3 × 4` would slip in."

## Related Problems

- [Coin Change with Greedy](../greedy/GreedyCoinChange.md) — a greedy over the same kind of values
- [Count Primes](./SieveOfEratosthenes.md) — primes instead of smooth numbers
