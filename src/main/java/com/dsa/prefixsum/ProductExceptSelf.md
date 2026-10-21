---
title: Product of Array Except Self
leetcode: 238
difficulty: Medium
patterns: [Prefix and suffix products, No division]
companies: [Google, Amazon, Microsoft, Apple, Walmart]
frequency: 4
tags: [prefix-sum, array, product]
sampleInput: |
  4
  1 2 3 4
sampleOutput: "24 12 8 6"
---

# Product of Array Except Self — LeetCode 238

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Prefix and suffix products · No division |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Adobe |

## Problem Statement

Given an integer array `nums`, return an array `answer` where `answer[i]` is the
product of **all** the elements of `nums` **except** `nums[i]`.

- The solution **must not use division** — that is an explicit constraint of the problem.
- The output array is not counted against the space budget, but the *auxiliary* space
  must be O(1).

## Input Format

```
n
nums[0] nums[1] ... nums[n-1]
```

- `n` — length of the array (2 ≤ n ≤ 10⁵)
- `nums` — n space-separated integers

## Sample Input

```
4
1 2 3 4
```

## Expected Output

```
24 12 8 6
```

- `answer[0] = 2 · 3 · 4 = 24`
- `answer[1] = 1 · 3 · 4 = 12`
- `answer[2] = 1 · 2 · 4 = 8`
- `answer[3] = 1 · 2 · 3 = 6`

## Approach — Prefix Products × Suffix Products

For each index `i`:

```
answer[i] = (product of everything BEFORE i) × (product of everything AFTER i)
```

Two passes, one accumulator each, **no division**:

1. **Left to right.** Keep `prefix` = product of `nums[0..i-1]`. Store it in
   `answer[i]`, then multiply `nums[i]` into `prefix`.
2. **Right to left.** Keep `suffix` = product of `nums[i+1..n-1]`. Multiply it into
   `answer[i]`, then multiply `nums[i]` into `suffix`.

**Why not divide?** The natural trick is "total product divided by `nums[i]`", but that
breaks in two ways: division by zero throws, and integer division truncates. The
prefix/suffix method sidesteps both — zeros are handled naturally (a zero in the
prefix makes the left part zero, which is exactly right).

**Why is the output array excluded from the space budget?** Because it is the answer;
the *auxiliary* space is the two scalar accumulators.

## Dry Run

Input: `nums = [1, 2, 3, 4]`

### Pass 1 — left to right: write the running prefix product

| Step | `i` | `nums[i]` | `prefix` before | `answer[i]` written | `prefix` after |
|---:|---:|---:|---:|---:|---:|
| 1 | 0 | 1 | 1 | `answer[0] = 1` | 1 · 1 = 1 |
| 2 | 1 | 2 | 1 | `answer[1] = 1` | 1 · 2 = 2 |
| 3 | 2 | 3 | 2 | `answer[2] = 2` | 2 · 3 = 6 |
| 4 | 3 | 4 | 6 | `answer[3] = 6` | 6 · 4 = 24 |

`answer = [1, 1, 2, 6]`

### Pass 2 — right to left: multiply the running suffix product in

| Step | `i` | `nums[i]` | `suffix` before | `answer[i]` before | `answer[i]` after | `suffix` after |
|---:|---:|---:|---:|---:|---:|---:|
| 1 | 3 | 4 | 1 | 6 | 6 · 1 = **6** | 1 · 4 = 4 |
| 2 | 2 | 3 | 4 | 2 | 2 · 4 = **8** | 4 · 3 = 12 |
| 3 | 1 | 2 | 12 | 1 | 1 · 12 = **12** | 12 · 2 = 24 |
| 4 | 0 | 1 | 24 | 1 | 1 · 24 = **24** | 24 · 1 = 24 |

`answer = [24, 12, 8, 6]` ✓

### The zero case — `nums = [1, 0, 3, 4]`

| `i` | left product (pass 1) | right product (pass 2) | `answer[i]` |
|---:|---:|---:|---:|
| 0 | 1 | 0 | **0** |
| 1 | 1 | 12 | **12** |
| 2 | 0 | 4 | **0** |
| 3 | 0 | 1 | **0** |

`answer = [0, 12, 0, 0]` — the two products that do not contain the zero are correct, and
no division by zero ever happens.

## Java Solution

See [`ProductExceptSelf.java`](./ProductExceptSelf.java).

```java
public static int[] productExceptSelf(int[] nums) {
    int n = nums.length;
    int[] answer = new int[n];

    int prefix = 1;
    for (int i = 0; i < n; i++) {
        answer[i] = prefix;      // product of everything strictly before i
        prefix *= nums[i];
    }

    int suffix = 1;
    for (int i = n - 1; i >= 0; i--) {
        answer[i] *= suffix;     // multiply by the product of everything after i
        suffix *= nums[i];
    }
    return answer;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Two passes, constant work per element |
| **Space** | O(1) auxiliary | Two scalars; the O(n) output array is the answer itself |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if division were allowed?"* → compute the total product once and divide, but
  you must first count zeros; the prefix/suffix solution avoids the whole mess.
- *"What if the values were `long`?"* → use `long` accumulators; overflow is still a
  risk for large inputs, and modular arithmetic is the usual answer.
- *"What if the product should be taken modulo some prime?"* → the same algorithm with
  `% mod` on each multiplication; the prefix/suffix trick still avoids division.
- *"Can you do it in one pass with O(1) space?"* → you need the total product first, so
  two passes are needed unless you write into the output array (which this does).
- *"How does this relate to prefix sums?"* → it is the multiplicative analogue: sums
  become products, and the "running total" is a running product.

**Common mistakes:**
- ❌ Multiplying `nums[i]` into `prefix` **before** writing `answer[i]` — then the
  answer includes the element itself.
- ❌ Forgetting the initial value `1` for the accumulators.
- ❌ Using division and blowing up on zeros.
- ❌ Overwriting `answer[i]` in the second pass instead of multiplying into it.

**How to narrate:**
> "The product of everything except nums[i] is the product of the elements before i times
> the product of the elements after i. So I make two passes: left to right I write the
> running prefix product into the answer array, then right to left I multiply in the
> running suffix product. No division, so zeros are handled naturally, and the only
> extra space is two accumulators."

## Related Problems

- [Range Sum Query — Immutable](RangeSumQuery.md) — the additive analogue
- [Running Sum of 1d Array](RunningSum.md) — the running accumulator
- [Maximum Subarray](../arrays/MaxSubarray.md) — another two-scan pattern
