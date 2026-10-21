---
title: Next Greater Element II
leetcode: 503
difficulty: Medium
patterns: [Monotonic stack, Circular array]
companies: [Amazon, Google, Meta, Microsoft, Uber, Bloomberg]
frequency: 4
tags: [stack, monotonic-stack, circular]
sampleInput: |
  5
  1 2 3 4 3
sampleOutput: "2 3 4 -1 4"
---

# Next Greater Element II — LeetCode 503

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Monotonic stack · Circular array |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

Given a **circular** array of integers, for every element return the first element to its
right that is strictly greater, **wrapping around** at the end of the array.

- `[1, 2, 3, 4, 3]` → `[2, 3, 4, -1, 4]`
  - the last `3` looks forward past the end and finds the `1`, the `2`, the `3` and finally
    the `4` — the `4` is the first one that is greater.
  - the `4` never finds a greater element, so it answers `-1`.

## Input Format

The program reads from standard input:

```
n
values[0] values[1] ... values[n-1]
```

- `n` — the length of the array (1 ≤ n ≤ 10⁴)
- `values` — n space-separated integers

## Sample Input

```
5
1 2 3 4 3
```

## Expected Output

```
2 3 4 -1 4
```

## Approach — Run the Monotonic Stack Over the Array Twice

The circular array is just the linear array repeated. An element's first greater element is
at most one full lap away, so:

- traverse the array **twice**, reading `nums[i % n]`,
- run the ordinary monotonic stack algorithm,
- but only **push** indices during the **first** pass — otherwise every index would be
  pushed twice and could be answered twice.

The stack holds indices into the *virtual* doubled array; `stack.peek() % n` gives the
value at that position and `stack.pop() % n` the position in the original array.

**Alternative:** double the array explicitly (`nums[i] = nums[i % n]`) and run the linear
algorithm on it. Same idea, one extra array of size 2n. The modulo version avoids the copy.

## Dry Run

Input: `[1, 2, 3, 4, 3]`, `n = 5`, stack shown as **values (top → bottom)**

| Step | i | `nums[i % 5]` | stack before (values, top → bottom) | popped (index, value) | stack after | answers so far |
|---:|---:|---:|---|---|---|---|
| 1 | 0 | `1` | `[]` | — | `[1]` | `[-1, -1, -1, -1, -1]` |
| 2 | 1 | `2` | `[1]` | `0` (1 < 2) | `[2]` | `[2, -1, -1, -1, -1]` |
| 3 | 2 | `3` | `[2]` | `1` (2 < 3) | `[3]` | `[2, 3, -1, -1, -1]` |
| 4 | 3 | `4` | `[3]` | `2` (3 < 4) | `[4]` | `[2, 3, 4, -1, -1]` |
| 5 | 4 | `3` | `[4]` | — (4 ≥ 3) | `[3, 4]` | `[2, 3, 4, -1, -1]` |
| 6 | 5 | `1` | `[3, 4]` | — (3 ≥ 1) | `[3, 4]` | unchanged (second pass) |
| 7 | 6 | `2` | `[3, 4]` | — (3 ≥ 2) | `[3, 4]` | unchanged |
| 8 | 7 | `3` | `[3, 4]` | — (3 ≥ 3) | `[3, 4]` | unchanged |
| 9 | 8 | `4` | `[3, 4]` | `4` (3 < 4) | `[4]` | `[2, 3, 4, -1, 4]` |
| 10 | 9 | `3` | `[4]` | — (4 ≥ 3) | `[4]` | unchanged |

Index `4` (the last `3`) was answered in step 9 by the `4` that wrapped around ✓, and index
`3` (the `4`) never found a greater element, so it stays `-1` ✓. The final answer is
`2 3 4 -1 4`.

## Java Solution

See [`NextGreaterElementII.java`](./NextGreaterElementII.java).

```java
public static int[] nextGreaterCircular(int[] nums) {
    int n = nums.length;
    int[] result = new int[n];
    Arrays.fill(result, -1);
    Deque<Integer> stack = new ArrayDeque<>();

    for (int i = 0; i < 2 * n; i++) {
        int value = nums[i % n];
        while (!stack.isEmpty() && nums[stack.peek() % n] < value) {
            result[stack.pop() % n] = value;
        }
        if (i < n) {
            stack.push(i);          // only the first pass adds new candidates
        }
    }
    return result;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Two passes over n elements, each index pushed and popped at most once |
| **Space** | O(n) | The stack |

## Interview Notes

**Follow-ups to raise yourself:**
- *"The array is not circular but you may look at the next `k` positions."* → same trick
  with a bounded window.
- *"Return the index instead of the value."* → store the index of the current element in
  the answer.
- *"What if the array is circular and we want the next **smaller** element?"* → flip the
  comparison.
- *"Multiple circular arrays / a sliding window on a circle."* → the same doubled-array
  trick generalises.

**Common mistakes:**
- ❌ Pushing indices in **both** passes → the same index is answered twice and the stack
  grows needlessly.
- ❌ Traversing only `n` elements → the elements near the end never see the wrapped-around
  values.
- ❌ Forgetting the `% n` when reading the value of a stacked index → `ArrayIndexOutOfBounds`
  in the second pass.

**How to narrate:**
> "A circular array is the array repeated, and an element only has to look one lap ahead, so
> I traverse it twice with `i % n` and run the same monotonic stack algorithm. The only
> detail is that I only push new indices during the first pass — otherwise every index
> would be a candidate twice. Each index is pushed and popped at most once, so the whole
> thing is O(n)."

## Related Problems

- [Next Greater Element](NextGreaterElement.md) — the linear version
- [Daily Temperatures](DailyTemperatures.md) — the distance variant
- [Trapping Rain Water](TrappingRainWater.md) — two-pointer extremes
