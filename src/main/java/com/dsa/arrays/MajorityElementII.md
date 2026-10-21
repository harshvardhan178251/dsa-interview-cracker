---
title: Majority Element II
leetcode: 229
difficulty: Medium
patterns: [Boyer-Moore voting, Extended to two candidates]
companies: [Amazon, Microsoft, Apple, Capgemini, Philips]
frequency: 3
tags: [array, voting, frequency]
sampleInput: |
  7
  1 1 1 2 2 2 3
sampleOutput: "1 2"
---

# Majority Element II — LeetCode 229

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Boyer-Moore voting · Extended to two candidates |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Given an integer array `nums`, return **all** elements that appear **more than
`n / 3` times**.

- The answer contains **at most two** elements.
- The elements are returned in **ascending** order.

## Input Format

```
n
nums[0] nums[1] ... nums[n-1]
```

- `n` — length of the array (1 ≤ n ≤ 5 × 10⁴)
- `nums` — n space-separated integers

## Sample Input

```
7
1 1 1 2 2 2 3
```

## Expected Output

```
1 2
```

`n / 3 = 2` (integer division), so an element qualifies with **at least 3** occurrences.
`1` occurs 3 times, `2` occurs 3 times, `3` occurs once.

## Approach — Two-Candidate Boyer-Moore

**Why at most two elements?** If three elements each occurred more than `n / 3` times,
their total would exceed `n`. So the extended Boyer-Moore vote needs two candidate slots.

The vote:

```
for each value:
    if it matches candidate1 → count1++
    else if it matches candidate2 → count2++
    else if count1 == 0 → candidate1 = value, count1 = 1
    else if count2 == 0 → candidate2 = value, count2 = 1
    else → count1--, count2--      // the value cancels one unit of both candidates
```

A value that does not match either candidate is used to "kill" one unit of **both**
candidates — that is what keeps the two-candidate invariant.

**The verification pass is mandatory.** The voting pass only *nominates* candidates: a
value can end up as a candidate even if it occurs twice. So a second pass recounts the
occurrences of each candidate and keeps the ones above the threshold.

## Dry Run

Input: `nums = [1, 1, 1, 2, 2, 2, 3]`, `n = 7`, threshold `n / 3 = 2` (qualify with > 2)

### Pass 1 — voting

| Step | i | `value` | `candidate1` | `count1` | `candidate2` | `count2` | action | counts after |
|---:|---:|---:|---:|---:|---:|---:|---|---|
| 1 | 0 | 1 | 0 | 0 | 0 | 0 | `count1 == 0` → new candidate | c1=1, c2=0 |
| 2 | 1 | 1 | 1 | 1 | 0 | 0 | matches candidate1 → `count1++` | c1=2, c2=0 |
| 3 | 2 | 1 | 1 | 2 | 0 | 0 | matches candidate1 → `count1++` | c1=3, c2=0 |
| 4 | 3 | 2 | 1 | 3 | 0 | 0 | `count2 == 0` → new candidate | c1=3, c2=1 |
| 5 | 4 | 2 | 1 | 3 | 2 | 1 | matches candidate2 → `count2++` | c1=3, c2=2 |
| 6 | 5 | 2 | 1 | 3 | 2 | 2 | matches candidate2 → `count2++` | c1=3, c2=3 |
| 7 | 6 | 3 | 1 | 3 | 2 | 3 | matches neither, both counts > 0 → cancel both | c1=2, c2=2 |

Nominees: `candidate1 = 1`, `candidate2 = 2`.

### Pass 2 — verification

| candidate | occurrences | `> n / 3`? | kept? |
|---|---:|---|---|
| 1 | 3 | 3 > 2 → **yes** | ✔ |
| 2 | 3 | 3 > 2 → **yes** | ✔ |
| 3 | 1 | 1 > 2 → no | ✘ (never became a candidate) |

Answer (sorted): **1 2**

## Java Solution

See [`MajorityElementII.java`](./MajorityElementII.java).

```java
public static List<Integer> majorityElements(int[] nums) {
    int candidate1 = 0, candidate2 = 0, count1 = 0, count2 = 0;
    for (int value : nums) {
        if (count1 > 0 && value == candidate1) { count1++; }
        else if (count2 > 0 && value == candidate2) { count2++; }
        else if (count1 == 0) { candidate1 = value; count1 = 1; }
        else if (count2 == 0) { candidate2 = value; count2 = 1; }
        else { count1--; count2--; }
    }
    count1 = 0; count2 = 0;
    for (int value : nums) {
        if (value == candidate1) { count1++; }
        else if (value == candidate2) { count2++; }
    }
    List<Integer> answer = new ArrayList<>();
    int n = nums.length;
    if (count1 > n / 3) { answer.add(candidate1); }
    if (count2 > n / 3) { answer.add(candidate2); }
    Collections.sort(answer);
    return answer;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Two passes, constant work per element |
| **Space** | O(1) | Two candidates and two counters (the result holds ≤ 2 values) |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the threshold were `n / 4`?"* → the same technique with **three** candidates.
  In general, `k` candidates handle the `> n / (k + 1)` threshold.
- *"Can you skip the verification pass?"* → only if the existence of the majority is
  guaranteed (as in LeetCode 169). Here it is not, so the pass is required.
- *"What if I want the elements in the order they appear?"* → drop the final `sort()`.
- *"Is there a hashing solution?"* → yes, count frequencies and filter, but it is O(n)
  space; the vote is O(1) space.
- *"How would you extend this to a stream?"* → the vote is online; the verification needs
  a second pass or a frequency sketch.

**Common mistakes:**
- ❌ Skipping the verification pass — the vote only nominates candidates.
- ❌ Using `>= n / 3` instead of `> n / 3` — the condition is *strictly* more than one
  third.
- ❌ Forgetting the `count > 0` checks before comparing to a candidate — a stale
  candidate with count 0 would steal values from the other slot.
- ❌ Resetting a candidate to `0` and then comparing real values against it — harmless
  here only because `0` is just another value, but the count checks keep the logic sound.

**How to narrate:**
> "Since three elements can't each exceed a third of the array, at most two can qualify.
> I extend Boyer-Moore to two candidate slots: a value that matches neither candidate
> cancels one unit from both, which preserves the invariant. Then I do a second pass to
> verify each candidate really occurs more than n/3 times — the vote alone only
> nominates. Finally I sort the (at most two) results."

## Related Problems

- [Majority Element](MajorityElement.md) — the single-candidate version
- [Contains Duplicate II](ContainsDuplicateII.md) — hash-map counting
- [Pairs With a Target Sum](../../../../../../docs/topics/12-prefixsum.md) — hash-map counting with complements
