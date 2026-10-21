---
title: Longest Subarray with At Most K Distinct
leetcode: 340
difficulty: Medium
patterns: [Sliding window, Frequency counting, Hashing]
companies: [Meta, Google, Microsoft, Uber, Oracle, Cognizant, Wipro, Dell]
frequency: 4
tags: [array, sliding-window, hashmap]
sampleInput: |
  5
  2 1 2 2 3
  2
sampleOutput: "4"
---

# Longest Subarray with At Most K Distinct — LeetCode 340

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Sliding window · Frequency counting · Hashing |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Given an array `nums` and an integer `k`, return the length of the **longest contiguous
subarray** in which at most `k` **distinct** values occur.

- `[2, 1, 2, 2, 3]`, `k = 2` → the answer is `4` (the subarray `[2, 1, 2, 2]`).
- `[2, 1, 2, 3, 3]`, `k = 2` → the answer is `4` (the subarray `[2, 1, 2, 3]` or
  `[1, 2, 3, 3]`).

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
k
```

- `n` — length of the array (1 ≤ n ≤ 10⁵)
- `nums` — n space-separated integers
- `k` — the maximum number of distinct values allowed (1 ≤ k ≤ n)

## Sample Input

```
5
2 1 2 2 3
2
```

## Expected Output

```
4
```

The subarray `[2, 1, 2, 2]` (indices 0–3) contains only the values `2` and `1`.

## Approach — Sliding window with a distinct-value count

Maintain a map of the value frequencies inside the window `[left, right]`.

- Add `nums[right]`.
- While the map holds **more than `k` distinct values**, remove `nums[left]` and advance
  `left`, deleting the map entry when its count hits zero.
- The window is now the longest valid window ending at `right`; update the answer.

**Why `count.size()` is the distinct-value count.** A map entry is deleted the moment its
count reaches zero, so the map always holds exactly the values currently present in the
window. Its size is therefore the number of distinct values — no separate counter needed.

**Why the left edge may only move right.** Suppose the window holds `k + 1` distinct
values. The value at the far left is either unique in the window (so any window that keeps
it and all the others is invalid) or appears again later (in which case the window that
starts after its last occurrence is at least as long). Either way no valid window ending at
`right` can start at or before `left` — so advancing `left` never discards a better answer.

## Dry Run

Input: `nums = [2, 1, 2, 2, 3]`, `k = 2`

| Step | right | value | `count` map | distinct | `left` | valid? | window | length | best |
|---:|---:|---:|---|---:|---:|---|---|---:|---:|
| 1 | 0 | 2 | `{2:1}` | 1 | 0 | yes | `[2]` | 1 | 1 |
| 2 | 1 | 1 | `{1:1, 2:1}` | 2 | 0 | yes | `[2, 1]` | 2 | 2 |
| 3 | 2 | 2 | `{1:1, 2:2}` | 2 | 0 | yes | `[2, 1, 2]` | 3 | 3 |
| 4 | 3 | 2 | `{1:1, 2:3}` | 2 | 0 | yes | `[2, 1, 2, 2]` | **4** | **4** |
| 5 | 4 | 3 | `{1:1, 2:3, 3:1}` | 3 | 0 | **no** → shrink | — | — | 4 |
| 5a | — | remove `2` | `{1:1, 2:2, 3:1}` | 3 | 1 | still no | — | — | 4 |
| 5b | — | remove `1` | `{2:2, 3:1}` | 2 | 2 | yes | `[2, 2, 3]` | 3 | 4 |

Answer: **4**.

### The window contents at each step

| right | window | contents | distinct | length |
|---:|---|---|---:|---:|
| 0 | `[2]` | `2` | 1 | 1 |
| 1 | `[2, 1]` | `2, 1` | 2 | 2 |
| 2 | `[2, 1, 2]` | `2, 1, 2` | 2 | 3 |
| 3 | `[2, 1, 2, 2]` | `2, 1, 2, 2` | 2 | 4 |
| 4 | `[2, 2, 3]` | `2, 2, 3` | 2 | 3 |

## Java Solution

See [`LongestSubarrayWithAtMostKDistinct.java`](./LongestSubarrayWithAtMostKDistinct.java).

```java
public static int longestSubarray(int[] nums, int k) {
    Map<Integer, Integer> count = new HashMap<>();
    int left = 0;
    int best = 0;
    for (int right = 0; right < nums.length; right++) {
        count.merge(nums[right], 1, Integer::sum);
        while (count.size() > k) {
            int outgoing = nums[left];
            int remaining = count.merge(outgoing, -1, Integer::sum);
            if (remaining == 0) {
                count.remove(outgoing);
            }
            left++;
        }
        best = Math.max(best, right - left + 1);
    }
    return best;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Each element enters and leaves the window once |
| **Space** | O(k) | At most k + 1 map entries while shrinking |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Return the subarray itself."* → remember the best `left` and `right`.
- *"What if `k` is 1?"* → the answer is the length of the longest run of equal values.
- *"What if the values are huge (up to 10¹⁸)?"* → the map handles that; an array counter
  would not.
- *"Can you solve it in O(n) time and O(1) extra space?"* → not in general — you need to
  remember the counts of up to k values.

**Common mistakes:**
- ❌ Keeping zero-count entries in the map → `count.size()` over-counts and the window
  shrinks too aggressively.
- ❌ Using `count.containsKey` to test for a new distinct value while stale entries remain.
- ❌ Shrinking with an `if` instead of a `while` → several types may have to be removed.
- ❌ Assuming the subarray must be a *prefix* of the array → it can start anywhere, which is
  exactly why `left` exists.

**How to narrate:**
> "I slide a window and keep a map of the value counts inside it. I delete an entry as soon
> as its count hits zero, so the map's size is exactly the number of distinct values in the
> window. While that exceeds k I move the left edge forward. After shrinking, the window is
> the longest valid one ending at the current index, so the maximum over all steps is the
> answer."

## Related Problems

- [Fruit Into Baskets](./FruitIntoBaskets.java) — the same window with a story
- [Longest Substring Without Repeating Characters](./LongestSubstringWithoutRepeatingCharacters.java) — the string version with k = 1
- [Longest Repeating Character Replacement](./LongestRepeatingCharacterReplacement.java) — a different budget on the same window
