---
title: Single Number
leetcode: 136
difficulty: Easy
patterns: [XOR, Bit tricks]
companies: [Meta, Amazon, Google, Uber, Airbnb, Microsoft, Lyft]
frequency: 5
tags: [array, bit-manipulation, xor]
sampleInput: |
  5
  4 1 2 1 2
sampleOutput: "4"
---

# Single Number — LeetCode 136

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | XOR · Bit tricks |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Uber, Apple, Adobe |

## Problem Statement

Given an integer array `nums` in which **exactly one element appears once** and every other
element appears **twice**, find and return that single element.

- You must solve it in **O(n)** time and **O(1)** extra space.
- `"abcd"` where each letter appears twice except `c` → the answer is `c`.

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
```

- `n` — length of the array (1 ≤ n ≤ 3·10⁴)
- `nums` — n space-separated integers; every value appears twice except one

## Sample Input

```
5
4 1 2 1 2
```

## Expected Output

```
4
```

`1` and `2` each appear twice and cancel out; `4` appears once and survives.

## Approach — XOR cancels pairs

XOR has two properties that make it perfect for this problem:

1. `x ^ x = 0` — a value XORed with itself is zero.
2. `x ^ 0 = x` — XORing with zero changes nothing.

XOR is also **associative** and **commutative**, so the order of the elements does not
matter. Folding the whole array with XOR therefore cancels every pair and leaves exactly
the unpaired value:

```
4 ^ 1 ^ 2 ^ 1 ^ 2
= (1 ^ 1) ^ (2 ^ 2) ^ 4      (regrouping is allowed)
= 0 ^ 0 ^ 4
= 4
```

**Why not a hash map?** A map would work but needs O(n) extra space. XOR gives O(1).

## Dry Run

Input: `nums = [4, 1, 2, 1, 2]`, running XOR starts at `0`

| Step | i | `nums[i]` | running XOR (binary) | running XOR (decimal) | note |
|---:|---:|---:|---|---:|---|
| 1 | 0 | 4 | `0000 ^ 0100` = `0100` | 4 | first element |
| 2 | 1 | 1 | `0100 ^ 0001` = `0101` | 5 | |
| 3 | 2 | 2 | `0101 ^ 0010` = `0111` | 7 | |
| 4 | 3 | 1 | `0111 ^ 0001` = `0110` | 6 | the pair `1` cancels → bit 0 back to 0 |
| 5 | 4 | 2 | `0110 ^ 0010` = `0100` | **4** | the pair `2` cancels → only `4` remains |

The final accumulator is `4`, exactly the single element.

## Java Solution

See [`SingleNumber.java`](./SingleNumber.java).

```java
public static int singleNumber(int[] nums) {
    int result = 0;
    for (int num : nums) {
        result ^= num;
    }
    return result;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One pass |
| **Space** | O(1) | A single accumulator |

**Optimal?** Yes — you must look at every element, so Ω(n) time is required.

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if exactly two elements appear once?"* → see
  [Single Number III](./SingleNumberIII.java);
  XOR everything and then split by a differing bit.
- *"What if every element appears three times?"* → the classic trick: keep two counters
  `ones` and `twos`; for each bit, `ones = (ones ^ x) & ~twos`, `twos = (twos ^ x) & ~ones`.
- *"What if you could not use XOR?"* → a hash map of counts (O(n) space) or sorting.
- *"Can you extend this to find the element missing from 1..n?"* → XOR `1..n` with all the
  array elements; the leftover is the missing number.

**Common mistakes:**
- ❌ XORing the **indices** instead of the values → a common bug when adapting the trick to
  the "missing number" variant.
- ❌ Using `|=` (bitwise OR) instead of `^=` → OR does not cancel duplicates.
- ❌ Forgetting the accumulator starts at `0` → `x ^ 0 = x`, so starting anywhere else
  corrupts the result.
- ❌ Assuming the array is sorted → XOR does not need it, but a sorted-array solution would.

**How to narrate:**
> "XOR cancels equal pairs because `x ^ x = 0`, and it's associative and commutative, so I
> can fold the whole array with XOR in any order. Every duplicate pair cancels and the one
> unpaired value survives. That's O(n) time and O(1) space."

## Related Problems

- [Single Number III](./SingleNumberIII.java) — two unpaired values
- [XOR of All Elements](./XOROfArrayElements.java) — the same fold without the pairing guarantee
- [Hamming Distance](./HammingDistance.java) — XOR then count the set bits
