---
title: Hand of Straights
leetcode: 846
difficulty: Medium
patterns: [Greedy, Frequency counting]
companies: [Amazon, Google, Meta, Uber]
frequency: 3
tags: [array, hashmap, sorting, greedy]
sampleInput: |
  9
  1 2 3 6 2 3 4 7 8
  3
sampleOutput: "true"
---

# Hand of Straights — LeetCode 846

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Greedy · Frequency counting |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

A collection of cards carries one number each. Every card must be used exactly once,
the cards must be split into groups of **exactly `k`** cards, and the numbers inside a
group must be consecutive (`x, x+1, …, x+k-1`).

Decide whether such a grouping exists.

## Input Format

The program reads from standard input:

```
n
cards[0] cards[1] ... cards[n-1]
k
```

- `n` — number of cards (1 ≤ n ≤ 10⁵)
- `cards` — n space-separated card values
- `k` — size of every group (1 ≤ k ≤ n)

## Sample Input

```
9
1 2 3 6 2 3 4 7 8
3
```

## Expected Output

```
true
```

The groups are `[1, 2, 3]`, `[2, 3, 4]` and `[6, 7, 8]`.

## Approach — count, then peel off groups

Count how many cards carry each value. Then walk the values in **ascending** order:

- If value `v` still has `c` unused cards, then `c` groups must start at `v` — no
  smaller value is left to build them.
- Each of those groups also needs one card of `v+1, v+2, …, v+k-1`. Take one card of
  each; if any of them is missing or exhausted, the answer is `false`.

**Exchange argument (why the greedy choice is safe):** let `v` be the smallest value
that still has unused cards. In any valid grouping, the card with value `v` cannot be
placed in a group that contains a smaller value — there is none left — so it must be
the **first** card of its group, and its group is exactly `v, v+1, …, v+k-1`. If there
are `c` such cards, there must be `c` copies of every following value as well. The
greedy step therefore *forces* the grouping: there is no alternative arrangement of
the remaining cards that could work. If the forced step fails, no solution exists; if
it succeeds, the problem shrinks to the values above `v+k-1`.

## Dry Run

Input: `cards = [1, 2, 3, 6, 2, 3, 4, 7, 8]`, `k = 3`

Counts: `{1: 1, 2: 2, 3: 2, 4: 1, 6: 1, 7: 1, 8: 1}` (9 cards, `9 % 3 == 0` ✓)

| Step | value `v` | unused `c` | needed values | available before | take | available after | group formed |
|---:|---:|---:|---|---|---|---|---|
| 1 | 1 | 1 | 2, 3 | `2: 2`, `3: 2` | 1 each | `2: 1`, `3: 1` | `[1, 2, 3]` |
| 2 | 2 | 1 | 3, 4 | `3: 1`, `4: 1` | 1 each | `3: 0`, `4: 0` | `[2, 3, 4]` |
| 3 | 3 | 0 | — | — | — | `3: 0` | — (already used) |
| 4 | 4 | 0 | — | — | — | `4: 0` | — |
| 5 | 6 | 1 | 7, 8 | `7: 1`, `8: 1` | 1 each | `7: 0`, `8: 0` | `[6, 7, 8]` |
| 6 | 7 | 0 | — | — | — | `7: 0` | — |
| 7 | 8 | 0 | — | — | — | `8: 0` | — |

Every card was placed → **true**.

### Trace that fails — `cards = [1, 2, 3, 4, 6, 7]`, `k = 3`

`6 % 3 == 0`, so the divisibility check passes. Counts: `{1:1, 2:1, 3:1, 4:1, 6:1, 7:1}`

| Step | value `v` | unused `c` | needed values | available | result |
|---:|---:|---:|---|---|---|
| 1 | 1 | 1 | 2, 3 | `2: 1`, `3: 1` | take → `[1, 2, 3]` |
| 2 | 2 | 0 | — | — | already used |
| 3 | 3 | 0 | — | — | already used |
| 4 | 4 | 1 | 5, 6 | `5` **missing**, `6: 1` | **value 5 missing → false** |

The card `4` has to open a group (no smaller card is left), and that group needs a `5`
— which does not exist, so no grouping is possible.

## Java Solution

See [`HandOfStraights.java`](./HandOfStraights.java).

```java
public static boolean isStraightHand(int[] cards, int k) {
    if (k <= 1) {
        return true;
    }
    if (cards.length % k != 0) {
        return false;
    }
    Map<Integer, Integer> count = new TreeMap<>();
    for (int card : cards) {
        count.merge(card, 1, Integer::sum);
    }
    for (Map.Entry<Integer, Integer> entry : new ArrayList<>(count.entrySet())) {
        int value = entry.getKey();
        int groups = entry.getValue();
        if (groups <= 0) {
            continue;
        }
        for (int offset = 1; offset < k; offset++) {
            Integer available = count.get(value + offset);
            if (available == null || available < groups) {
                return false;
            }
            count.put(value + offset, available - groups);
        }
    }
    return true;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log n) | the map keeps the values sorted; every card is consumed once |
| **Space** | O(n) | one counter per distinct value |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the card values are limited to 1..13?"* → replace the map with an array of
  14 counters and the whole thing becomes O(n).
- *"What if groups may have **at most** `k` cards?"* → the divisibility check disappears
  and the algorithm still works (the leftovers simply form smaller groups).
- *"Return the groups themselves."* → keep the value that opened each group and print
  the `k` consecutive numbers.

**Common mistakes:**
- ❌ Forgetting the `cards.length % k != 0` early exit — it is not an optimisation, it
  is a correctness requirement when every card must be used.
- ❌ Iterating over the cards in arbitrary order — the values must be processed in
  ascending order, otherwise a group can steal a card that a smaller value needed.
- ❌ Mutating the map while iterating over it — copy the entries first (or iterate over
  the sorted keys).

**How to narrate:**
> "I count the cards per value, then walk the values from small to large. The smallest
> value that still has cards can only start a group, because there is nothing smaller
> left to put in front of it. So that many groups are forced, and each of them needs
> the next k-1 values. If those are not available the answer is no — and if they are,
> the choice was forced anyway, so the greedy step cannot be wrong."

## Related Problems

- [Coin Change with Greedy](./GreedyCoinChange.md) — greedy over a sorted value set
- [Partition Array Into Maximum Subarrays](./PartitionArrayToMaximumSum.md) — keeping the k best values
