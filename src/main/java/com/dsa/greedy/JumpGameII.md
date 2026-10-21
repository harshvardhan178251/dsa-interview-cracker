---
title: Jump Game II
leetcode: 45
difficulty: Medium
patterns: [Greedy, BFS by layers]
companies: [Google, Amazon, LinkedIn, Apple, Pinterest]
frequency: 4
tags: [array, greedy, bfs]
sampleInput: |
  5
  2 3 1 1 4
sampleOutput: "2"
---

# Jump Game II — LeetCode 45

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Greedy · BFS by layers |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber |

## Problem Statement

You are given an array `nums` where `nums[i]` is the maximum jump length from index `i`.
Return the **minimum** number of jumps needed to get from index `0` to the last index
`nums.length - 1`.

- You may jump to any index `i < j <= i + nums[i]`.
- The answer for an array of length 1 is `0`.

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
5
2 3 1 1 4
```

## Expected Output

```
2
```

`0 → 1 → 4` — two jumps.

## Approach — BFS without a queue

Think of the array as a graph: index `i` has edges to every index in
`i+1 .. i + nums[i]`. A breadth-first search over that graph visits the indices in
increasing number of jumps, so the first time we touch the last index we know the
minimum number of jumps.

The BFS can be run without a queue by tracking only two boundaries:

- `currentEnd` — the last index reachable with the jumps counted so far.
- `farthest` — the last index reachable with one more jump.

While scanning `i`, `farthest = max(farthest, i + nums[i])`. The moment `i` reaches
`currentEnd`, the current layer is complete: one more jump is needed, and the next
layer ends at `farthest`.

**Exchange argument (why the greedy choice is safe):** every index in the layer
`[prevEnd+1 .. currentEnd]` needs exactly one more jump to reach anything in the next
layer, and every one of them can reach the *same* furthest index `farthest` — the
maximum of `i + nums[i]` over the whole layer. Taking the maximum therefore produces
the widest possible next layer; no other choice of a single jump inside the current
layer can reach further. By induction, layer `k` of the greedy sweep contains every
index that is reachable in `k` jumps, so the first layer that contains the last index
gives the minimum number of jumps.

## Dry Run

Input: `nums = [2, 3, 1, 1, 4]`, `n = 5`

| Step | i | nums[i] | `farthest` before | `farthest` after | `i == currentEnd`? | `jumps` | `currentEnd` | Layer reached |
|---:|---:|---:|---:|---:|---|---:|---:|---|
| 1 | 0 | 2 | 0 | `max(0, 0+2) = 2` | **yes** (`i = 0 = currentEnd`) | 1 | 2 | 1 jump reaches `[1..2]` |
| 2 | 1 | 3 | 2 | `max(2, 1+3) = 4` | no (`1 ≠ 2`) | 1 | 2 | — |
| 3 | 2 | 1 | 4 | `max(4, 2+1) = 4` | **yes** (`i = 2 = currentEnd`) | 2 | 4 | 2 jumps reach `[3..4]` |

At step 3 `currentEnd = 4 ≥ n - 1 = 4`, so the loop breaks and the answer is **2**.

The layers are: 0 jumps reach `{0}`, 1 jump reaches `{1, 2}`, 2 jumps reach `{3, 4}` —
the last index sits in the third layer, so it takes 2 jumps.

## Java Solution

See [`JumpGameII.java`](./JumpGameII.java).

```java
public static int minJumps(int[] nums) {
    if (nums == null || nums.length <= 1) {
        return 0;
    }
    int jumps = 0;
    int currentEnd = 0;
    int farthest = 0;
    for (int i = 0; i < nums.length - 1; i++) {
        farthest = Math.max(farthest, i + nums[i]);
        if (i == currentEnd) {
            jumps++;
            currentEnd = farthest;
            if (currentEnd >= nums.length - 1) {
                break;
            }
        }
    }
    return jumps;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | one pass, every element is read once |
| **Space** | O(1) | three counters replace the BFS queue |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Why not just use a queue-based BFS?"* → you can, but it costs O(n) memory; the
  layer-boundary trick computes the same thing in O(1) space.
- *"What if jumps could also go backwards?"* → the layer trick still works, but the
  "furthest" frontier has to become a set of reachable indices.
- *"Can you return the actual path?"* → keep the predecessor of each index while
  expanding the layers.

**Common mistakes:**
- ❌ Counting a jump when `i` is *inside* the layer instead of when the layer ends —
  the jump count must increase once per layer, not once per element.
- ❌ Updating `currentEnd` inside the inner scan — `farthest` is accumulated over the
  whole layer first.
- ❌ Forgetting the `i < nums.length - 1` bound — the last index must not launch
  another layer.

**How to narrate:**
> "This is a BFS over the array where index `i` connects to everything up to
> `i + nums[i]`. BFS gives the shortest jump count, and I can run it without a queue
> by keeping the boundary of the current layer and the furthest index the next layer
> reaches. When the scan reaches the current boundary I close the layer and count one
> jump."

## Related Problems

- [Jump Game](./JumpGame.md) — reachability only, no counting
- [Jump Game III](./JumpGameIII.md) — jumps in both directions
- [BFS](../../../../../../docs/topics/15-graphs.md) — the general pattern behind the layer trick
