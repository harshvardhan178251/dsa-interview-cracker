---
title: Jump Game
leetcode: 55
difficulty: Medium
patterns: [Greedy, Reach tracking]
companies: [Amazon, Google, Meta, Uber, Bloomberg]
frequency: 4
tags: [array, greedy]
sampleInput: |
  4
  2 3 1 1
sampleOutput: "true"
---

# Jump Game — LeetCode 55

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Greedy · Reach tracking |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg |

## Problem Statement

You are given an integer array `nums`. From index `i` you may jump to **any** index `j`
with `i < j <= i + nums[i]`. Decide whether the last index `nums.length - 1` can be
reached starting from index `0`.

- `nums[i]` is the **maximum** jump length from index `i` — you may jump less.
- If `nums.length == 1` you are already there.

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
```

- `n` — length of the array (1 ≤ n ≤ 10⁴)
- `nums` — n space-separated non-negative integers

## Sample Input

```
4
2 3 1 1
```

## Expected Output

```
true
```

Index 0 → index 2 (jump of 2) → index 3 (jump of 1) reaches the last index.

## Approach — greedy reach

Instead of asking *"can I jump from here?"* ask *"how far can I reach from here?"*. Keep a
single number `reach`: the furthest index that is known to be reachable.

1. Start with `reach = 0` — index 0 is reachable.
2. Walk `i` from left to right.
   * If `i > reach`, index `i` is **not** reachable. Every later index is even further
     away, so the answer is `false`.
   * Otherwise extend the frontier: `reach = max(reach, i + nums[i])`.
3. As soon as `reach >= n - 1` the last index is reachable → `true`.

**Why is one pass enough?** `reach` is only ever raised by an index that we have
already proven reachable, so it is always a true statement about the reachable set.
And because every jump goes **forward**, the set of reachable indices is a prefix
`[0 .. reach]`: if index `i` is reachable then so is every index before it. The first
index that is not in that prefix is the first place the walk gets stuck.

**Exchange argument (why the greedy choice is safe):** when we stand on a reachable
index `i`, taking the *largest* possible jump (`i + nums[i]`) can never hurt. Any plan
that jumps to a smaller index `j < i + nums[i]` can be extended by replacing that jump
with `i → i + nums[i]`: from `i + nums[i]` every index that was reachable from `j` and
greater than `i + nums[i]` is still reachable (a jump of length `nums[i]` reaches at
least as far as a jump of length `nums[j] - i` did), while the indices between `j` and
`i + nums[i]` are simply skipped. Skipping indices never removes a possibility, because
a reachable index `p` can only be used as a *launch pad* for jumps that go further
right — and `i + nums[i]` is at least as far right as `j`.

## Dry Run

Input: `nums = [2, 3, 1, 1]`, `n = 4`

| Step | i | nums[i] | `reach` before | `i > reach`? | `reach` after | Reachable set |
|---:|---:|---:|---:|---|---|---|
| 1 | 0 | 2 | 0 | no (0 ≤ 0) | `max(0, 0+2) = 2` | `[0, 1, 2]` |
| 2 | 1 | 3 | 2 | no (1 ≤ 2) | `max(2, 1+3) = 4` | `[0 .. 4]` |
| 3 | — | — | 4 | — | — | `reach = 4 ≥ n-1 = 3` → **true** |

The scan stops at step 2 because the frontier already covers the last index.

### Trace where it fails — `nums = [3, 2, 1, 0, 4]`, `n = 5`

| Step | i | nums[i] | `reach` before | `i > reach`? | `reach` after | Note |
|---:|---:|---:|---:|---|---|---|
| 1 | 0 | 3 | 0 | no | `max(0, 0+3) = 3` | reachable `[0..3]` |
| 2 | 1 | 2 | 3 | no | `max(3, 1+2) = 3` | reachable `[0..3]` |
| 3 | 2 | 1 | 3 | no | `max(3, 2+1) = 3` | reachable `[0..3]` |
| 4 | 3 | 0 | 3 | no | `max(3, 3+0) = 3` | reachable `[0..3]` |
| 5 | 4 | 4 | 3 | **yes** (4 > 3) | — | index 4 unreachable → **false** |

## Java Solution

See [`JumpGame.java`](./JumpGame.java).

```java
public static boolean canJump(int[] nums) {
    if (nums == null || nums.length == 0) {
        return false;
    }
    int reach = 0;
    for (int i = 0; i < nums.length; i++) {
        if (i > reach) {
            return false;
        }
        reach = Math.max(reach, i + nums[i]);
        if (reach >= nums.length - 1) {
            return true;
        }
    }
    return reach >= nums.length - 1;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | one left-to-right pass, O(1) work per element |
| **Space** | O(1) | only `i` and `reach` are stored |

**Optimal?** Yes — the input has to be read, so Ω(n) is a lower bound.

## Interview Notes

**Follow-ups to raise yourself:**
- *"What is the minimum number of jumps?"* → [Jump Game II](./JumpGameII.md) — the same
  reach idea, but counting BFS layers.
- *"What if the jumps can go backwards too?"* → [Jump Game III](./JumpGameIII.md), where
  the reach set is no longer a prefix and you need a BFS.
- *"Can you solve it in O(1) space?"* → you already are; mention that the greedy pass
  never needs the array after the last read.

**Common mistakes:**
- ❌ Checking `nums[i] >= n - 1 - i` only for the last element — you must know that
  every intermediate launch pad is reachable too.
- ❌ Returning `true` as soon as `i + nums[i] >= n - 1` **without** having proved that
  `i` itself is reachable.
- ❌ Using `i + nums[i] > reach` instead of `Math.max(...)` — `reach` must never shrink.

**How to narrate:**
> "I'll keep a single number `reach` — the furthest index I can get to. I scan left to
> right; if the current index is already beyond `reach` I'm stuck and the answer is no.
> Otherwise I extend `reach` with the jump from here. The key insight is that every
> jump goes forward, so the reachable set is always a prefix — one pass is enough."

## Related Problems

- [Jump Game II](./JumpGameII.md) — the minimum number of jumps
- [Jump Game III](./JumpGameIII.md) — jumps in both directions
- [Gas Station](./GasStation.md) — the same "restart when the tank goes negative" idea
