---
title: Rotate Array
leetcode: 189
difficulty: Medium
patterns: [Modulo indexing, Cyclic shift]
companies: [Amazon, Salesforce, JP Morgan]
frequency: 3
tags: [array, modulo, rotation]
sampleInput: |
  5
  1 2 3 4 5
  2
sampleOutput: "4 5 1 2 3"
---

# Rotate Array — LeetCode 189

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Modulo indexing · Cyclic shift |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Adobe |

## Problem Statement

Given an integer array `nums` and an integer `k`, rotate the array to the **right** by `k`
steps. The rotation is cyclic — elements that fall off the right end reappear at the
left end.

## Input Format

```
n
nums[0] nums[1] ... nums[n-1]
k
```

- `n` — length of the array (1 ≤ n ≤ 10⁴)
- `nums` — n space-separated integers
- `k` — number of steps to rotate right (may be negative or larger than `n`)

## Sample Input

```
5
1 2 3 4 5
2
```

## Expected Output

```
4 5 1 2 3
```

## Approach — One Pass with Modulo Indexing

Rotating right by `k` means the element at index `i` ends up at index
`(i + k) mod n`. That single fact gives an O(n) solution with one pass and no
intermediate arrays beyond the result.

Steps:

1. **Normalise `k`.** `shift = ((k % n) + n) % n`. This handles `k > n` (wrap around),
   `k < 0` (rotate left instead) and avoids a negative modulo in Java, where
   `-1 % 5 == -1`.
2. For every `i`, write `nums[i]` into `rotated[(i + shift) % n]`.

**Why it works:** the mapping `i → (i + shift) mod n` is a bijection on `{0..n-1}` — every
index is hit exactly once — so no element is lost or duplicated.

**In-place variant (the classic three-reversal):** reverse the whole array, reverse the
first `k` elements, reverse the remaining `n - k`. It is O(1) extra space, but it
mutates the input, which is why the version here allocates a fresh array.

## Dry Run

Input: `nums = [1, 2, 3, 4, 5]`, `k = 2`, `n = 5`

Normalisation: `shift = ((2 % 5) + 5) % 5 = 2`

| Step | i | `nums[i]` | destination `(i + 2) % 5` | `rotated` before | `rotated` after |
|---:|---:|---:|---:|---|---|
| 1 | 0 | 1 | 2 | `[0, 0, 0, 0, 0]` | `[0, 0, 1, 0, 0]` |
| 2 | 1 | 2 | 3 | `[0, 0, 1, 0, 0]` | `[0, 0, 1, 2, 0]` |
| 3 | 2 | 3 | 4 | `[0, 0, 1, 2, 0]` | `[0, 0, 1, 2, 3]` |
| 4 | 3 | 4 | 0 | `[0, 0, 1, 2, 3]` | `[4, 0, 1, 2, 3]` |
| 5 | 4 | 5 | 1 | `[4, 0, 1, 2, 3]` | `[4, 5, 1, 2, 3]` |

Answer: **4 5 1 2 3**

### Normalising a large or negative `k`

| `k` | `k % n` | `((k % n) + n) % n` | meaning |
|---:|---:|---:|---|
| 2 | 2 | 2 | rotate right by 2 |
| 7 | 2 | 2 | 7 mod 5 = 2 |
| −1 | −1 | 4 | rotate left by 1 = right by 4 |
| 0 | 0 | 0 | no rotation |

## Java Solution

See [`RotateArray.java`](./RotateArray.java).

```java
public static int[] rotate(int[] nums, int k) {
    int n = nums.length;
    if (n == 0) {
        return new int[0];
    }
    int shift = ((k % n) + n) % n;
    int[] rotated = new int[n];
    for (int i = 0; i < n; i++) {
        rotated[(i + shift) % n] = nums[i];
    }
    return rotated;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every element is moved once |
| **Space** | O(n) | A fresh result array (O(1) with the three-reversal variant) |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it in O(1) extra space?"* → yes, the three-reversal trick: reverse all,
  reverse the first `k`, reverse the rest.
- *"What if `k` is huge, like 10⁹?"* → normalise it with `k % n` first; the modulo
  normalisation above handles it in O(1).
- *"What if `k` can be negative?"* → the double-modulo makes negative `k` work directly.
- *"Rotate left instead of right?"* → change the destination to `(i - shift + n) % n`.
- *"What if you cannot allocate a second array?"* → the reversal approach, or a
  cycle-rotation using the gcd of `n` and `k`.

**Common mistakes:**
- ❌ Using `k % n` alone — in Java a negative `k` produces a **negative** shift and the
  destination index goes negative.
- ❌ Forgetting that the rotation is to the **right** — element `i` moves to
  `(i + k) % n`, not `(i - k) % n`.
- ❌ Off-by-one in the reversal variant: the last reversal covers `n - k` elements, not
  `k`.

**How to narrate:**
> "A right rotation by `k` maps index `i` to `(i + k) mod n`. I normalise `k` first so
> that huge and negative shifts both collapse into `[0, n-1]`, then I do a single pass
> writing each element to its destination. That's O(n) time. If the interviewer wants
> O(1) extra space, I switch to the three-reversal approach."

## Related Problems

- [Rotate Image](RotateImage.md) — the 2D version of the same idea
- [Shuffle Array](ShuffleArray.md) — Fisher-Yates, the other way to permute an array
- [Spiral Matrix](SpiralMatrix.md) — boundary-shifting matrix traversal
