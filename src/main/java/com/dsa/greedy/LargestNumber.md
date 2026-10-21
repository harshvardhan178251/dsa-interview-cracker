---
title: Largest Number
leetcode: 179
difficulty: Medium
patterns: [Greedy, Custom comparator]
companies: [Amazon, Google, Airbnb, Uber, eBay, Capgemini, TCS, Qualcomm]
frequency: 4
tags: [array, sorting, strings, greedy]
sampleInput: |
  4
  10 2 9 3
sampleOutput: "93210"
---

# Largest Number — LeetCode 179

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Greedy · Custom comparator |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber |

## Problem Statement

Given an array of non-negative integers, arrange them so that they form the largest
possible number, and return that number as a string.

- `10` and `2` become `"2"` and `"10"`: `"210"` is bigger than `"102"`, so `2` comes
  first.
- The result may be very long — do not convert it to a number.
- If every number is `0`, the answer is `"0"` (not `"000"`).

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
```

- `n` — length of the array (1 ≤ n ≤ 100)
- `nums` — n space-separated non-negative integers (0 ≤ nums[i] ≤ 2³¹ - 1)

## Sample Input

```
4
10 2 9 3
```

## Expected Output

```
93210
```

## Approach — sort with a comparator on `a + b` vs `b + a`

Numeric sorting is useless here: `"9"` must come before `"91"`, but `"91"` must come
before `"9"` in other situations. The only thing that matters is **how two candidates
behave next to each other**.

For two strings `a` and `b`, compare the two possible concatenations:

- if `a + b > b + a` then `a` must come **first**;
- if `a + b < b + a` then `b` must come first;
- if they are equal, either order gives the same result.

So the comparator is `(a, b) -> (b + a).compareTo(a + b)` — `a` sorts before `b` exactly
when `a + b` is the larger concatenation.

**Exchange argument (why the comparator is safe):** consider any two adjacent elements
`a` and `b` in a candidate arrangement. The rest of the string is identical in both
arrangements, so the whole number is larger exactly when the pair `"ab"` is larger
than `"ba"`. Therefore swapping any out-of-order adjacent pair strictly increases the
number (or leaves it unchanged when the two concatenations are equal). Sorting with the
comparator removes every such inversion, so no arrangement can be larger than the
sorted one. This is exactly the "exchange argument" that proves a comparison sort
yields the optimal permutation for any consistent ordering rule.

Because the relation "a + b ≥ b + a" is transitive (it is the standard string
concatenation ordering), `Arrays.sort` produces a total order and the result is
well-defined.

## Dry Run

Input: `nums = [10, 2, 9, 3]` → parts `["10", "2", "9", "3"]`

| Step | compare | `a + b` | `b + a` | winner (first) | order so far |
|---:|---|---|---|---|---|
| 1 | `2` vs `10` | `"210"` | `"102"` | `2` | `["2", "10"]` |
| 2 | `9` vs `3` | `"93"` | `"39"` | `9` | `["9", "3"]` |
| 3 | `9` vs `2` | `"92"` | `"29"` | `9` | `["9", "2"]` |
| 4 | `3` vs `2` | `"32"` | `"23"` | `3` | `["9", "3", "2"]` |
| 5 | `2` vs `10` | `"210"` | `"102"` | `2` | `["9", "3", "2", "10"]` |

Concatenation: `"9" + "3" + "2" + "10"` = **93210**.

### The tie case — `nums = [3, 30, 34, 5, 9]`

| compare | `a + b` | `b + a` | note |
|---|---|---|---|
| `3` vs `30` | `"330"` | `"303"` | `"330"` is larger → `3` first |
| `3` vs `34` | `"334"` | `"343"` | `"343"` is larger → `34` first |

`3` and `30` compare equal-ish (`"330"` > `"303"`), so several arrangements tie; the
answer `"9534330"` is the same for all of them.

## Java Solution

See [`LargestNumber.java`](./LargestNumber.java).

```java
public static String largestNumber(int[] nums) {
    String[] parts = new String[nums.length];
    for (int i = 0; i < nums.length; i++) {
        parts[i] = String.valueOf(nums[i]);
    }
    Arrays.sort(parts, (a, b) -> (b + a).compareTo(a + b));
    if (parts[0].equals("0")) {
        return "0";   // every number is zero
    }
    StringBuilder sb = new StringBuilder();
    for (String part : parts) {
        sb.append(part);
    }
    return sb.toString();
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log n · L) | `n log n` comparisons, each building two strings of length ≤ 2L |
| **Space** | O(n · L) | the string representation of every number |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if negative numbers are allowed?"* → the problem changes completely: the
  comparator must also decide whether a negative number goes in front or at the back.
- *"Can you avoid the string building in the comparator?"* → compare digit by digit
  from the first difference, or precompute the doubled keys `a + a` vs `b + b`.
- *"Why not just sort numerically?"* → `"9"` vs `"91"`: numerically `91 > 9`, so
  `"91"` would come first, but `"991"` > `"919"` — the numeric order is wrong.

**Common mistakes:**
- ❌ `(a + b).compareTo(b + a)` — this is the comparator **reversed**; it produces
  `"10239"` instead of `"93210"`.
- ❌ Returning `"000"` when every number is zero — the answer must be `"0"`.
- ❌ Converting the result to a `long` — the number can have hundreds of digits.

**How to narrate:**
> "For two numbers `a` and `b` only the concatenation matters: `a` goes first when
> `a + b` is bigger than `b + a`. So I sort the strings with that comparator — the
> comparison is exactly the swap argument: if two neighbours are in the wrong order,
> swapping them increases the number, so the sorted arrangement is the maximum."

## Related Problems

- [Assign Cookies](./AssignCookies.md) — another "sort and sweep" greedy
- [Hand of Straights](./HandOfStraights.md) — sorting by value
- [String Compression](../../../../../../docs/topics/02-strings.md) — comparing strings by value instead of by integer
