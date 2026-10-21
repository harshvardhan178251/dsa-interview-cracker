---
title: Happy Number
leetcode: 202
difficulty: Easy
patterns: [Number theory, Cycle detection]
companies: [Amazon, Google, Meta, Uber, Uber]
frequency: 3
tags: [math, hashset, numbers]
sampleInput: |
  19
sampleOutput: "true"
---

# Happy Number — LeetCode 202

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Number theory · Cycle detection |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

A **happy number** is a number that reaches `1` when the digits are repeatedly replaced
by the **sum of the squares** of its digits. If this process ends in a cycle that does
not contain `1`, the number is not happy.

For example, `19 → 1² + 9² = 82 → 8² + 2² = 68 → 6² + 8² = 100 → 1`.

Decide whether a number is happy.

## Input Format

The program reads from standard input:

```
n
```

- `n` — the number to test (1 ≤ n ≤ 2³¹ - 1)

## Sample Input

```
19
```

## Expected Output

```
true
```

## Approach — follow the sequence and watch for a cycle

Repeatedly replace the number by the sum of the squared digits and remember every
value that was already seen:

- if the value becomes `1` → happy;
- if a value repeats → the sequence is in a cycle → not happy.

The `seen` set is what makes the process terminate: for any number, the value after
one step is at most `81 × 10 = 810` (for a 10-digit number), so the sequence is
bounded and must eventually repeat.

A faster variant uses **Floyd's cycle detection**: run the transformation twice, one
pointer one step at a time and one pointer two steps at a time; if they meet, there is
a cycle — no extra memory needed.

## Dry Run

Input: `n = 19`

| Step | `n` before | digits | sum of squared digits | `n` after | `seen` after | result |
|---:|---:|---|---|---:|---|---|
| 1 | 19 | 1, 9 | `1 + 81 = 82` | 82 | `{19}` | not 1 |
| 2 | 82 | 8, 2 | `64 + 4 = 68` | 68 | `{19, 82}` | not 1 |
| 3 | 68 | 6, 8 | `36 + 64 = 100` | 100 | `{19, 82, 68}` | not 1 |
| 4 | 100 | 1, 0, 0 | `1 + 0 + 0 = 1` | 1 | `{19, 82, 68, 100}` | **1 → happy** |

### Trace of an unhappy number — `n = 2`

| Step | `n` before | digits | sum of squares | `n` after | `seen` | result |
|---:|---:|---|---|---:|---|---|
| 1 | 2 | 2 | `4` | 4 | `{2}` | not 1 |
| 2 | 4 | 4 | `16` | 16 | `{2, 4}` | not 1 |
| 3 | 16 | 1, 6 | `1 + 36 = 37` | 37 | `{2, 4, 16}` | not 1 |
| 4 | 37 | 3, 7 | `9 + 49 = 58` | 58 | `{… , 37}` | not 1 |
| 5 | 58 | 5, 8 | `25 + 64 = 89` | 89 | `{…, 58}` | not 1 |
| 6 | 89 | 8, 9 | `64 + 81 = 145` | 145 | `{…, 89}` | not 1 |
| 7 | 145 | 1, 4, 5 | `1 + 16 + 25 = 42` | 42 | `{…, 145}` | not 1 |
| 8 | 42 | 4, 2 | `16 + 4 = 20` | 20 | `{…, 42}` | not 1 |
| 9 | 20 | 2, 0 | `4 + 0 = 4` | 4 | `{…, 20}` | **4 repeats → cycle → false** |

## Java Solution

See [`HappyNumber.java`](./HappyNumber.java).

```java
public static boolean isHappy(int n) {
    Set<Integer> seen = new HashSet<>();
    while (n != 1 && seen.add(n)) {
        n = sumOfSquaredDigits(n);
    }
    return n == 1;
}

public static int sumOfSquaredDigits(int n) {
    int sum = 0;
    while (n > 0) {
        int digit = n % 10;
        sum += digit * digit;
        n /= 10;
    }
    return sum;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(log n) | every step touches the digits once; the sequence is bounded |
| **Space** | O(log n) | the set of seen values (bounded by a few hundred entries) |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it without a set?"* → yes, Floyd's cycle detection: slow and fast
  pointers, both applying the transformation.
- *"Which numbers are happy?"* → all numbers reach `1` or fall into the cycle
  `4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4`; only that cycle (plus `1`) exists.
- *"What if the transformation were the sum of the cubes?"* → the same code works.

**Common mistakes:**
- ❌ Forgetting that `seen.add(n)` returns `false` when the value was already there —
  the loop must stop exactly at the repeat.
- ❌ Treating `n = 1` as a normal step — the loop must exit with `n == 1`.
- ❌ Using `Math.pow(digit, 2)` — it returns a `double`; `digit * digit` is exact.

**How to narrate:**
> "I keep applying the sum-of-squared-digits transformation and remember the values
> I have seen. If I hit 1 the number is happy; if I hit a value twice the sequence is
> in a cycle and it is not. The transformation shrinks the number dramatically, so the
> loop always terminates."

## Related Problems

- [Add Binary](./AddBinary.md) — digit-by-digit arithmetic
- [Reverse Integer](./ReverseInteger.md) — the same "pull the digits apart" technique
