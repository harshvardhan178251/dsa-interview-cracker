---
title: Single Number III
leetcode: 260
difficulty: Medium
patterns: [XOR, Bit partitioning]
companies: [Amazon, Google, Salesforce, Uber, Datadog]
frequency: 4
tags: [array, bit-manipulation, xor]
sampleInput: |
  6
  1 2 1 3 2 5
sampleOutput: "3 5"
---

# Single Number III — LeetCode 260

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | XOR · Bit partitioning |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Apple |

## Problem Statement

Given an integer array `nums` in which **exactly two** elements appear **once** and every
other element appears **twice**, return those two elements **in ascending order**.

- `[1, 2, 1, 3, 2, 5]` → the answer is `[3, 5]`.
- You must solve it in O(n) time and O(1) extra space.

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
```

- `n` — length of the array (2 ≤ n ≤ 3·10⁴)
- `nums` — n space-separated integers; exactly two of them appear once

## Sample Input

```
6
1 2 1 3 2 5
```

## Expected Output

```
3 5
```

## Approach — XOR, then split by a differing bit

**Step 1.** XOR everything. All the pairs cancel, so what is left is `a ^ b` — the two
unpaired values XORed together.

**Step 2.** Find a bit where `a` and `b` differ. Since `a ^ b != 0`, at least one of its
bits is set. The lowest set bit of `a ^ b` is exactly such a bit:

```java
int differingBit = xorAll & (-xorAll);
```

**Step 3.** Partition the array by that bit. Because `a` and `b` differ in it, **one of
them lands in each partition**, and every duplicated value lands entirely in one
partition (a value XORed with itself has the same bits). So each partition contains exactly
one unpaired value among its duplicates.

**Step 4.** XOR each partition → the unpaired value in each.

**Why `& (-xorAll)` finds the lowest set bit.** In two's complement, `-x` is `~x + 1`, which
flips all the bits above the lowest set bit of `x` and leaves that bit set. AND-ing `x`
with `-x` therefore isolates exactly that bit.

## Dry Run

Input: `nums = [1, 2, 1, 3, 2, 5]`

**Step 1 — XOR everything**

| i | `nums[i]` | running XOR (binary) | decimal |
|---:|---:|---|---:|
| — | start | `000000` | 0 |
| 0 | 1 | `000001` | 1 |
| 1 | 2 | `000011` | 3 |
| 2 | 1 | `000010` | 2 |
| 3 | 3 | `000001` | 1 |
| 4 | 2 | `000011` | 3 |
| 5 | 5 | `000110` | **6** |

`xorAll = 6 = 110₂` — that is `3 ^ 5`.

**Step 2 — find a differing bit**

| expression | value | binary |
|---|---:|---|
| `xorAll` | 6 | `110` |
| `-xorAll` | -6 | `...11111010` |
| `xorAll & (-xorAll)` | **2** | `010` |

Bit 1 (value `2`) is set in `3 = 011` but not in `5 = 101`.

**Step 3 — partition by bit 1**

| `nums[i]` | binary | bit 1 | partition | running XOR |
|---:|---|---:|---|---:|
| 1 | `001` | 0 | low | 1 |
| 2 | `010` | 1 | high | 2 |
| 1 | `001` | 0 | low | 0 |
| 3 | `011` | 1 | high | 3 |
| 2 | `010` | 1 | high | 1 |
| 5 | `101` | 0 | low | 5 |

The **high** partition (`2, 3, 2`) XORs to `3`; the **low** partition (`1, 1, 5`) XORs to
`5`.

Result: `[3, 5]` → printed as `3 5`.

## Java Solution

See [`SingleNumberIII.java`](./SingleNumberIII.java).

```java
public static int[] singleNumberIII(int[] nums) {
    int xorAll = 0;
    for (int num : nums) {
        xorAll ^= num;
    }
    int differingBit = xorAll & (-xorAll);

    int a = 0;
    int b = 0;
    for (int num : nums) {
        if ((num & differingBit) != 0) {
            a ^= num;
        } else {
            b ^= num;
        }
    }
    return new int[]{Math.min(a, b), Math.max(a, b)};
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Two passes |
| **Space** | O(1) | A handful of accumulators |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if three elements appear once?"* → you need two differing bits; split the array
  into four groups by those two bits and XOR each group.
- *"What if you could not use XOR?"* → a frequency map gives the answer in O(n) space.
- *"Why does the duplicated value never get split across the partitions?"* → a value and
  its copy have identical bits, so they always fall into the same partition. This is the
  key property that makes the partition work.
- *"Can you avoid the `& (-x)` trick?"* → yes, any set bit of `a ^ b` works; you can find
  one with a loop, or use `Integer.lowestOneBit(xorAll)`.

**Common mistakes:**
- ❌ Returning the two values in the order the partitions happened to produce → the problem
  wants ascending order.
- ❌ Using the *highest* set bit and forgetting that it might also work — it does, but the
  lowest one is the idiomatic choice.
- ❌ Forgetting that `xorAll` could be `0` → that would mean the two singles are equal,
  which the problem excludes.
- ❌ Partitioning with `>=` instead of a bit test → wrong groups.

**How to narrate:**
> "XOR everything and the pairs cancel, leaving `a ^ b`. The lowest set bit of that value is
> a bit where `a` and `b` differ. I split the array by that bit — duplicates always land in
> the same group because a value and its copy have identical bits — so each group contains
> exactly one of the singles. XORing each group gives me the two numbers."

## Related Problems

- [Single Number](./SingleNumber.java) — one unpaired value
- [XOR of All Elements](./XOROfArrayElements.java) — the same fold without the pairing guarantee
- [CountSetBits](./CountSetBits.java) — counting the set bits of a value
