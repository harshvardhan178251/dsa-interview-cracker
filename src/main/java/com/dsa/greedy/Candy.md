---
title: Candy
leetcode: 135
difficulty: Hard
patterns: [Greedy, Two-pass constraint propagation]
companies: [Amazon, Meta, Google, Microsoft]
frequency: 4
tags: [array, greedy]
sampleInput: |
  5
  1 0 2 2 5
sampleOutput: "8"
---

# Candy — LeetCode 135

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Greedy · Two-pass constraint propagation |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Meta, Google, Microsoft |

## Problem Statement

Every child in a row has a rating. Each child receives at least one candy and:

- if a child's rating is **higher** than the left neighbour's, it gets **more** candies;
- if a child's rating is **higher** than the right neighbour's, it gets **more** candies.

Return the **fewest** candies that satisfy both rules. Equal ratings impose no
constraint.

## Input Format

The program reads from standard input:

```
n
ratings[0] ratings[1] ... ratings[n-1]
```

- `n` — number of children (1 ≤ n ≤ 10⁵)
- `ratings` — n space-separated integers (0 ≤ ratings[i] ≤ 10⁴)

## Sample Input

```
5
1 0 2 2 5
```

## Expected Output

```
8
```

Candy counts `[2, 1, 2, 1, 2]` → 8 candies.

## Approach — two greedy passes

The two constraints pull in opposite directions, so they are enforced in two separate
passes and the larger requirement wins.

1. **Left to right.** Give everybody one candy. Then, whenever `ratings[i] >
   ratings[i-1]`, set `candies[i] = candies[i-1] + 1`. This satisfies the "greater than
   the left neighbour" rule.
2. **Right to left.** Whenever `ratings[i] > ratings[i+1]`, set
   `candies[i] = max(candies[i], candies[i+1] + 1)`. This satisfies the "greater than
   the right neighbour" rule without breaking the first one — the `max` is what keeps
   both rules valid at the same time.
3. Sum the array.

**Exchange argument (why the greedy choice is safe):** the constraints only ever say
"this child needs strictly more than that child", so they form a forest of chains
running up-hill. Along such a chain the candy counts must increase by at least 1 per
step, so the smallest valid assignment on a chain of length `L` is `1, 2, 3, …, L`. The
left-to-right pass computes exactly the "increasing run from the left" and the
right-to-left pass computes exactly the "increasing run from the right"; the child at
the meeting point of two runs needs `max(left, right)`, which is the tightest bound
that still satisfies both directions. Since the assignment is pointwise minimal, the
sum is minimal too.

## Dry Run

Input: `ratings = [1, 0, 2, 2, 5]`, `n = 5`

| Step | Pass | i | ratings[i] | rule applied | `candies` after | note |
|---:|---|---:|---:|---|---|---|
| 0 | init | — | — | everyone starts with 1 | `[1, 1, 1, 1, 1]` | |
| 1 | → | 1 | 0 | `0 > 1`? no | `[1, 1, 1, 1, 1]` | |
| 2 | → | 2 | 2 | `2 > 0` → `candies[2] = candies[1]+1 = 2` | `[1, 1, 2, 1, 1]` | |
| 3 | → | 3 | 2 | `2 > 2`? no | `[1, 1, 2, 1, 1]` | equal ratings, no rule |
| 4 | → | 4 | 5 | `5 > 2` → `candies[4] = candies[3]+1 = 2` | `[1, 1, 2, 1, 2]` | |
| 5 | ← | 3 | 2 | `2 > 5`? no | `[1, 1, 2, 1, 2]` | |
| 6 | ← | 2 | 2 | `2 > 2`? no | `[1, 1, 2, 1, 2]` | |
| 7 | ← | 1 | 0 | `0 > 2`? no | `[1, 1, 2, 1, 2]` | |
| 8 | ← | 0 | 1 | `1 > 0` → `candies[0] = max(1, candies[1]+1 = 2) = 2` | `[2, 1, 2, 1, 2]` | |

Total = 2 + 1 + 2 + 1 + 2 = **8**.

## Java Solution

See [`Candy.java`](./Candy.java).

```java
public static int minCandies(int[] ratings) {
    if (ratings == null || ratings.length == 0) {
        return 0;
    }
    int n = ratings.length;
    int[] candies = new int[n];
    for (int i = 0; i < n; i++) {
        candies[i] = 1;
    }
    for (int i = 1; i < n; i++) {
        if (ratings[i] > ratings[i - 1]) {
            candies[i] = candies[i - 1] + 1;
        }
    }
    for (int i = n - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) {
            candies[i] = Math.max(candies[i], candies[i + 1] + 1);
        }
    }
    int total = 0;
    for (int c : candies) {
        total += c;
    }
    return total;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | two passes plus a sum |
| **Space** | O(n) | the `candies` array |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it in O(1) space?"* → yes, with two running counters (a "left run" and a
  "right run" that meet in the middle); the trick is easy to get wrong, so mention it
  as an optimisation rather than the main solution.
- *"What if there were three rules (left, right and same rating)?"* → the problem
  becomes a graph/DP problem: assign candies so that adjacent children differ by at
  least 1 and equal ratings get equal candies.
- *"What if the children are in a circle?"* → the left and right constraints meet; the
  two-pass trick still works but you have to re-check the wrap-around pair.

**Common mistakes:**
- ❌ Doing only the left-to-right pass — the "greater than the right neighbour" rule is
  violated.
- ❌ Using `candies[i] = candies[i+1] + 1` in the second pass without the `max` — the
  left-to-right requirement can be destroyed.
- ❌ Comparing `>=` instead of `>` — equal ratings do **not** force more candies.

**How to narrate:**
> "The two rules point in opposite directions, so I handle them separately. First a
> left-to-right pass fixes the 'greater than the left neighbour' rule, then a
> right-to-left pass fixes the other one but takes the max with what I already have, so
> neither pass undoes the other. Each pass produces the smallest possible candy count
> for its direction, so the pointwise max is the minimum valid assignment."

## Related Problems

- [Partition Array Into Maximum Subarrays](./PartitionArrayToMaximumSum.md) — greedy with two constraints
- [Non-overlapping Intervals](../intervals/NonOverlappingIntervals.md) — the same "smallest sufficient value" idea
