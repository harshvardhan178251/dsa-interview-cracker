---
title: Longest Increasing Subsequence
leetcode: 300
difficulty: Medium
patterns: [Bottom-up DP, Patience sorting]
companies: [Google, Meta, Amazon, Salesforce, Uber, Goldman Sachs, Twitter]
frequency: 5
tags: [dynamic-programming, arrays, binary-search]
sampleInput: |
  8
  10 9 2 5 3 7 101 18
sampleOutput: "4"
---

# Longest Increasing Subsequence — LeetCode 300

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Bottom-up DP · Patience sorting |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber |

## Problem Statement

Given an integer array `nums`, return the **length** of the longest strictly increasing subsequence.

A subsequence keeps the relative order of the elements but does not have to be contiguous — so `10, 9, 2, 5, 3, 7, 101, 18` has the increasing subsequence `2, 3, 7, 101`.

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
```

- `n` — length of the array (1 ≤ n ≤ 1000)
- `nums` — n space-separated integers

## Sample Input

```
8
10 9 2 5 3 7 101 18
```

## Expected Output

```
4
```

One longest increasing subsequence is `2, 3, 7, 101` (length 4); `2, 5, 7, 101` is another.

## Approach

The quadratic DP is the easiest thing to write and to explain:

1. `dp[i]` = length of the longest increasing subsequence that **ends** at `nums[i]`.
2. Every element alone is a subsequence of length 1.
3. For each earlier `j < i` with `nums[j] < nums[i]`, we can append `nums[i]` to the best subsequence ending at `j`: `dp[i] = max(dp[i], dp[j] + 1)`.
4. The answer is `max(dp)`.

`O(n²)` is fine for `n ≤ 1000`, and it is the version to write in an interview unless the interviewer asks for better. The `O(n log n)` version uses **patience sorting**: keep a `tails` array where `tails[k]` is the smallest possible last element of an increasing subsequence of length `k + 1`; binary-search `tails` for the first entry `≥ nums[i]` and replace it. `tails.length` is then the answer.

## Dry Run

Input: `nums = [10, 9, 2, 5, 3, 7, 101, 18]`. Each row extends the DP with one more element.

| `i` | `nums[i]` | candidate `dp[j] + 1` for every `j < i` with `nums[j] < nums[i]` | `dp[i]` |
|---:|---:|---|---:|
| 0 | 10 | none → start at 1 | **1** |
| 1 | 9 | none (10 is not < 9) → 1 | **1** |
| 2 | 2 | none (10, 9 are not < 2) → 1 | **1** |
| 3 | 5 | j=2 (2 < 5): 1 + 1 = 2 | **2** |
| 4 | 3 | j=2 (2 < 3): 1 + 1 = 2 | **2** |
| 5 | 7 | j=2: 1+1=2, j=3: 2+1=3, j=4: 2+1=3 | **3** |
| 6 | 101 | j=0: 1+1=2, j=1: 1+1=2, j=2: 1+1=2, j=3: 2+1=3, j=4: 2+1=3, j=5: 3+1=4 | **4** |
| 7 | 18 | j=0: 2, j=1: 2, j=2: 2, j=3: 3, j=4: 3, j=5: 4 | **4** |

Full table: `dp = [1, 1, 1, 2, 2, 3, 4, 4]` → answer **4**.

**Reconstructing the subsequence.** Keep a `parent[i]` array: whenever `dp[i] = dp[j] + 1` improves the best, remember `parent[i] = j`. Walking backwards from the best index rebuilds `2, 3, 7, 101`.

**The `O(n log n)` version.** `tails` after the same input is `[2, 3, 7, 101]` — `tails[k]` is the smallest tail of a subsequence of length `k+1`, and `tails.length` is the answer.

## Java Solution

See [`LongestIncreasingSubsequence.java`](./LongestIncreasingSubsequence.java).

```java
    public static int lengthOfLIS(int[] nums) {
        if (nums.length == 0) {
            return 0;
        }
        int[] dp = new int[nums.length];
        int best = 1;
        for (int i = 0; i < nums.length; i++) {
            dp[i] = 1;
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
            best = Math.max(best, dp[i]);
        }
        return best;
    }
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n²) | the inner loop scans all earlier elements — `O(n²)` comparisons |
| **Space** | O(n) | the `dp` array holds `n` entries |

**`O(n log n)` is achievable** with the `tails` + binary search technique. It is also the technique behind the "Russian doll envelopes" and "minimum number of increasing subsequences" problems.

## Interview Notes

**Follow-ups to raise yourself:**

- "Can you make it `O(n log n)`?"* → patience sorting with `tails` and `Arrays.binarySearch`.
- "Print the subsequence itself."* → keep the `parent` array and walk it backwards.
- "What if it must be contiguous?"* → that is the longest increasing **subarray**, `O(n)` with a single pass.
- "Longest **non-decreasing** subsequence?"* → change the comparison to `<=`.
- "Count how many LIS exist?"* → a different DP that counts the number of maximal subsequences of that length.

**Common mistakes:**

- ❌ Using `<=` instead of `<` — that computes the longest non-decreasing subsequence, a different problem.
- ❌ Confusing *subsequence* with *substring* — the elements do not have to be contiguous.
- ❌ Setting `dp[i] = 0` initially instead of `1` (the element alone is always a valid subsequence).

**How to narrate:**

> "I define `dp[i]` as the length of the longest increasing subsequence that ends at `i`. For each earlier element smaller than `nums[i]`, I can extend that subsequence, so `dp[i] = max(dp[i], dp[j]+1)`. That is `O(n²)`; if you want `O(n log n)` I can keep a `tails` array of minimal tails and binary search for the replacement position."

## Related Problems

- [Longest Common Subsequence — LeetCode 1143](./LongestCommonSubsequence.java) — the two-sequence version
- [Partition Array for Maximum Sum](./MaximumProductSubarray.java) — another "keep or skip" DP
