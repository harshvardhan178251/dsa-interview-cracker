---
title: Reverse Integer
leetcode: 7
difficulty: Medium
patterns: [Digit manipulation, Overflow check]
companies: [Meta, Google, Adobe, Goldman Sachs, Zillow]
frequency: 4
tags: [math, numbers]
sampleInput: |
  -123
sampleOutput: "-321"
---

# Reverse Integer — LeetCode 7

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Digit manipulation · Overflow check |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg |

## Problem Statement

Reverse the digits of a signed 32-bit integer.

- `-123` → `-321`
- `120` → `21` (the leading zeros disappear)
- `1534236469` → `0` — the reversed value does not fit into a 32-bit integer, so `0`
  is returned.

## Input Format

The program reads from standard input:

```
n
```

- `n` — the number to reverse (-2³¹ ≤ n ≤ 2³¹ - 1)

## Sample Input

```
-123
```

## Expected Output

```
-321
```

## Approach — pull the digits off the end

The classic loop:

```
result = result * 10 + n % 10
n = n / 10
```

`n % 10` gives the last digit (also for negative numbers in Java: `-123 % 10 = -3`),
and `n / 10` removes it.

**Overflow:** the intermediate `result * 10` can leave the 32-bit range. The trick is to
accumulate in a `long` (64 bits) and check the bounds **once at the end** — a `long`
holds every value an `int` reversal can produce, including `2147483647 → 7463847412`.

## Dry Run

Input: `n = -123`

| Step | `value` before | `value % 10` | `result` after | `value` after |
|---:|---:|---:|---:|---:|
| 1 | -123 | -3 | `0 * 10 + (-3) = -3` | -12 |
| 2 | -12 | -2 | `-3 * 10 + (-2) = -32` | -1 |
| 3 | -1 | -1 | `-32 * 10 + (-1) = -321` | 0 |

`result = -321` fits into an `int` → output **-321**.

### Trace with a real overflow — `n = 1534236469`

| Step | `value` before | `value % 10` | `result` after | `value` after |
|---:|---:|---:|---:|---:|
| 1 | 1534236469 | 9 | 9 | 153423646 |
| 2 | 153423646 | 6 | 96 | 15342364 |
| 3 | 15342364 | 4 | 964 | 1534236 |
| 4 | 1534236 | 6 | 9646 | 153423 |
| 5 | 153423 | 3 | 96463 | 15342 |
| 6 | 15342 | 2 | 964632 | 1534 |
| 7 | 1534 | 4 | 9646324 | 153 |
| 8 | 153 | 3 | 96463243 | 15 |
| 9 | 15 | 5 | 964632435 | 1 |
| 10 | 1 | 1 | 9646324351 | 0 |

`result = 9646324351 > Integer.MAX_VALUE (2147483647)` → the reversal does not fit into
an `int` → output **0**.

### Trace with a reversal that still fits — `n = 987654321`

| Step | `value` before | `value % 10` | `result` after | `value` after |
|---:|---:|---:|---:|---:|
| 1 | 987654321 | 1 | 1 | 98765432 |
| … | … | … | … | … |
| 9 | 12 | 2 | 123456789 | 0 |

`result = 123456789` fits into an `int` → output **123456789**.

### Trace with the largest int — `n = 2147483647`

| Step | `value` before | `value % 10` | `result` after | `value` after |
|---:|---:|---:|---:|---:|
| 1 | 2147483647 | 7 | 7 | 214748364 |
| … | … | … | … | … |
| 10 | 746384741 | 1 | `7463847412` (a `long`!) | 0 |

`7463847412 > Integer.MAX_VALUE` → the reversal does not fit → output **0**.

## Java Solution

See [`ReverseInteger.java`](./ReverseInteger.java).

```java
public static int reverse(int x) {
    long result = 0;
    long value = x;
    while (value != 0) {
        result = result * 10 + value % 10;
        value /= 10;
    }
    if (result > Integer.MAX_VALUE || result < Integer.MIN_VALUE) {
        return 0;
    }
    return (int) result;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(log n) | one iteration per digit |
| **Space** | O(1) | two `long` accumulators |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the input is a string?"* → the same loop over the characters; no overflow
  is possible, but leading zeros still disappear.
- *"Reverse only the part between two indices (LeetCode 7 variant)?"* → the same idea
  with a bound check on the index.
- *"How do you detect the overflow without a `long`?"* → before computing
  `result * 10 + digit`, check `result > (MAX - digit) / 10`.

**Common mistakes:**
- ❌ Using `Math.abs(x)` and forgetting the sign — the negative sign must survive.
- ❌ Checking the overflow only at the end with `int` arithmetic — the overflow already
  happened.
- ❌ Forgetting that `x % 10` is negative in Java for negative numbers (that is
  actually what makes the sign "stick" automatically).

**How to narrate:**
> "I peel the last digit off with `% 10` and append it to the result. I accumulate in a
> `long` so the intermediate value cannot overflow, and I check the 32-bit bounds once
> at the end — if the reversal does not fit I return 0."

## Related Problems

- [Palindrome Number](./PalindromeNumber.md) — the same loop, only half the digits
- [Add Binary](./AddBinary.md) — digit arithmetic with a carry
