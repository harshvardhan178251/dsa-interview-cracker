---
title: Plus One
leetcode: 66
difficulty: Easy
patterns: [Carry propagation, Right-to-left scan]
companies: [Amazon, Google, Meta, Uber, Microsoft]
frequency: 3
tags: [array, digits, carry]
sampleInput: |
  4
  1 2 3 4
sampleOutput: "1235"
---

# Plus One — LeetCode 66

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Carry propagation · Right-to-left scan |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Microsoft |

## Problem Statement

You are given a **non-negative** integer represented as an array of its decimal digits,
`digits`, with no leading zeros (except the number `0` itself).

Return the array of digits representing the number `digits + 1`.

The array must not be converted to an integer — the problem exists precisely because the
number may be too large for a primitive type.

## Input Format

```
n
digits[0] digits[1] ... digits[n-1]
```

- `n` — number of digits (1 ≤ n ≤ 10⁴)
- `digits` — n digits, most significant first

## Sample Input

```
4
1 2 3 4
```

## Expected Output

```
1235
```

The digits are printed without separators.

## Approach — Propagate the Carry Leftwards

Addition carries from the **right**. The only digit that changes is the first one (from
the right) that is not `9`; every `9` to its right becomes `0` and passes the carry on.

```
i = last index
while i >= 0 and digits[i] == 9:
    digits[i] = 0
    i--
if i >= 0:
    digits[i]++
else:
    // the carry ran off the front: 999 -> 1000
    return [1, 0, 0, 0]
```

**The carry-out case:** if every digit was `9`, the answer needs one extra digit in
front: `[9,9]` → `[1,0,0]`.

**Why not parse to an `int`?** The input may have 10⁴ digits, far beyond `long`. Working
on the digit array is the whole point of the problem.

## Dry Run

Input: `digits = [1, 2, 3, 4]`

| Step | `i` | `digits[i]` | is 9? | action | array after |
|---:|---:|---:|---|---|---|
| 1 | 3 | 4 | no | stop the loop, `digits[3]++` | `[1, 2, 3, 5]` |

`i >= 0`, so no extra digit is needed.

Answer: **1235**

### The carry-out case — `digits = [9, 9]`

| Step | `i` | `digits[i]` | is 9? | action | array after |
|---:|---:|---:|---|---|---|
| 1 | 1 | 9 | **yes** | `digits[1] = 0`, carry left | `[9, 0]` |
| 2 | 0 | 9 | **yes** | `digits[0] = 0`, carry left | `[0, 0]` |
| 3 | −1 | — | — | loop ends with `i < 0` → carry out | `[0, 0]` → `[1, 0, 0]` |

Answer: **1000** (for `[9,9,9]`)

## Java Solution

See [`PlusOne.java`](./PlusOne.java).

```java
public static int[] plusOne(int[] digits) {
    int[] result = digits.clone();
    int i = result.length - 1;
    while (i >= 0 && result[i] == 9) {
        result[i] = 0;
        i--;
    }
    if (i >= 0) {
        result[i]++;
    } else {
        int[] grown = new int[digits.length + 1];
        grown[0] = 1;
        result = grown;
    }
    return result;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Each digit is touched at most once |
| **Space** | O(n) | A copy of the digits (O(1) extra if you mutate in place) |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Do it in place."* → skip the `clone()` and write into `digits` directly.
- *"What about `+2`, `+10`?"* → generalise the carry: keep a `carry` variable and add
  the increment digit by digit.
- *"What if the input can have leading zeros?"* → strip them first, or handle the
  "insert a 1 in front" case carefully.
- *"How would you do it for a big number in a string?"* → the same algorithm on
  `char` values.
- *"What if the base were 16 instead of 10?"* → the logic is unchanged, only the number
  of "full" digits changes (15 instead of 9).

**Common mistakes:**
- ❌ Forgetting the **carry-out** case — `[9,9]` must become `[1,0,0]`, not `[0,0]`.
- ❌ Off-by-one in the loop bound — starting at `digits.length` instead of
  `digits.length - 1` throws `ArrayIndexOutOfBoundsException`.
- ❌ Modifying the caller's array when the caller expects it unchanged.
- ❌ Parsing the digits into a `long` — that is exactly what the problem forbids, and it
  overflows for long inputs.

**How to narrate:**
> "This is just addition with a carry, but done on the digit array so the number can be
> arbitrarily long. I scan from the right: every 9 becomes 0 and passes the carry on.
> The first digit that isn't 9 gets incremented and the carry stops. If I run off the
> left end, the number was all 9s, so the answer gains a leading 1."

## Related Problems

- [Missing Number](MissingNumber.md) — digit-array reasoning
- [Rotate Array](RotateArray.md) — another array-transformation drill
- [Running Sum of 1d Array](../../../../../../docs/topics/12-prefixsum.md) — the carry-style left-to-right accumulation
