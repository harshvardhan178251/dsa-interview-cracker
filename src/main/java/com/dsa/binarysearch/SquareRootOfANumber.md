---
title: Sqrt(x)
leetcode: 69
difficulty: Easy
patterns: [Binary search on the answer]
companies: [Amazon, Google, Meta, Facebook, Uber]
frequency: 4
tags: [math, binary-search, numbers]
sampleInput: |
  8
sampleOutput: "2"
---

# Sqrt(x) — LeetCode 69

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Binary search on the answer |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Facebook, Uber |

## Problem Statement

Given a non-negative integer `x`, return the **integer square root** of `x`: the largest
integer `r` such that `r * r <= x`.

- `x` is guaranteed to be in the range `[0, 2³¹ - 1]`.
- The result is rounded **down** — `sqrt(8) = 2.828…` becomes `2`.
- Do not use `Math.sqrt`.

## Input Format

The program reads from standard input:

```
x
```

- `x` — the non-negative radicand (0 ≤ x ≤ 2³¹ − 1)

## Sample Input

```
8
```

## Expected Output

```
2
```

`2 * 2 = 4 <= 8` but `3 * 3 = 9 > 8`, so the answer is `2`.

## Approach — Binary search on the answer

Instead of searching for a *given* value, search for the **boundary** where the predicate
flips:

> `P(r) = (r * r <= x)` — monotone: true for small `r`, false for large `r`.

The last `r` where `P(r)` holds is exactly `floor(sqrt(x))`.

The search range is `[1, x / 2]` — the square root of `x` never exceeds `x / 2` for
`x >= 4` (and `x < 2` is handled separately). Each step compares `mid * mid` with `x` and
narrows the range.

**Overflow.** `mid * mid` overflows `int` for `mid > 46340`. The multiplication is therefore
performed in `long`: `(long) mid * mid`. Since `mid <= x / 2 <= 2³⁰` the square still fits in
a `long` (max ≈ 2⁶⁰).

**Returning the answer.** When the loop ends, `right` holds the largest candidate whose
square is `<= x` — that value *is* the floor of the square root, so we return `right`
without any extra adjustment.

## Dry Run

Input: `x = 8`

| Step | left | right | mid | `mid * mid` | comparison with 8 | range after |
|---:|---:|---:|---:|---:|---|---|
| 1 | 1 | 4 | 2 | 4 | 4 < 8 | `[3, 4]` |
| 2 | 3 | 4 | 3 | 9 | 9 > 8 | `[3, 2]` |

The loop exits with `left > right`; `right = 2` is the largest value with `r² <= 8` → **2**.

### Trace with a perfect square — `x = 16`

| Step | left | right | mid | `mid * mid` | comparison | range after |
|---:|---:|---:|---:|---:|---|---|
| 1 | 1 | 8 | 4 | 16 | 16 == 16 | `[1, 8]` |

Exact hit → return **4** immediately.

## Java Solution

See [`SquareRootOfANumber.java`](./SquareRootOfANumber.java).

```java
public static int mySqrt(int x) {
    if (x < 2) {
        return x;
    }
    int left = 1;
    int right = x / 2;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        long square = (long) mid * mid;
        if (square == x) {
            return mid;
        } else if (square < x) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return right;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(log x) | The candidate range halves every iteration |
| **Space** | O(1) | Only three index variables |

**Optimal?** Yes for an exact answer without floating point. (Newton's method converges in
O(log log x) but is fiddlier and has rounding edge cases.)

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if `x` were a `long`?"* → the search range becomes `[1, x/2]`, which is still 63
  iterations at most, and `mid * mid` can still overflow a `long` for `x > 3·10⁹` — use
  `Math.multiplyExact` / `BigInteger` or switch to a division-based comparison
  (`mid <= x / mid`).
- *"Return the exact square root as a double."* → `Math.sqrt(x)` and round carefully at the
  boundaries.
- *"What about `floor(sqrt(x))` for a stream of values?"* → precompute the integer square
  roots of all values up to `n` in O(n) with a running counter, then answer each query in
  O(1).
- *"Why not just call `Math.sqrt`?"* → because of floating point rounding; the interview is
  about the algorithm, but also because `Math.sqrt` is not exact for large `long` values.

**Common mistakes:**
- ❌ Computing `mid * mid` in `int` → overflow for `x > 2³¹/2`, silently returning a wrong
  answer.
- ❌ Starting the search at `left = 0` and treating `mid == 0` specially → an extra branch
  that invites off-by-one bugs; starting at `1` and special-casing `x < 2` is cleaner.
- ❌ Returning `left` instead of `right` after the loop → off by one whenever the answer is
  not a perfect square.

**How to narrate:**
> "I'm looking for the boundary where `r² <= x` stops holding. That predicate is monotone, so
> I binary search over the candidate root. I'll widen the multiplication to `long` so that
> squaring a large candidate can't overflow, and when the range collapses the right bound is
> the floor of the square root."

## Related Problems

- [Koko Eating Bananas](./KokoEatingBananas.java) — binary search on a monotone answer
- [Search Insert Position](./SearchInsertPosition.java) — binary search on a sorted array
- [Divide Two Integers](../bitmanipulation/DivideTwoIntegers.java) — a different route to the same idea
