---
title: Sort a Hand of Cards
leetcode: null
difficulty: Medium
patterns: [Radix sort, Stable counting sort]
companies: [Amazon, Google, Meta, Uber, Poker sites]
frequency: 2
tags: [sorting, radix-sort, counting-sort, cards]
sampleInput: |
  5
  5 2 3 0 5 1 3 3 5 0
sampleOutput: "3 0 3 3 5 0 5 1 5 2"
---

# Sort a Hand of Cards

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Radix sort · Stable counting sort |
| **Interview heat** | ★★☆☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, card-game backends |

## Problem Statement

A standard deck has **13 ranks** (1 = Ace … 13 = King) and **4 suits**
(0 = Clubs, 1 = Diamonds, 2 = Hearts, 3 = Spades).

You are dealt `n` cards. Sort the hand into **canonical deck order**:

- ranks ascending, and
- inside one rank, the suits ascending — Clubs, Diamonds, Hearts, Spades.

Print the sorted hand as `rank suit` pairs, separated by spaces.

## Input Format

The program reads from standard input:

```
n
rank[0] suit[0] rank[1] suit[1] ... rank[n-1] suit[n-1]
```

- `n` — the number of cards (0 ≤ n ≤ 52).
- The next `2n` integers alternate between the rank and the suit of a card.

## Sample Input

```
5
5 2 3 0 5 1 3 3 5 0
```

## Expected Output

```
3 0 3 3 5 0 5 1 5 2
```

The hand was `5♥ 3♣ 5♦ 3♠ 5♣`; sorted it becomes `3♣ 3♠ 5♣ 5♦ 5♥`.

## Approach — Radix sort on two digits

Every card can be packed into a **single key**:

```
key = rank * 4 + suit
```

The key is a two-digit number in base 4: the **suit** is the least significant digit
and the **rank** is the most significant one. Sorting the keys numerically is
exactly the deck order we want.

That turns the problem into a **radix sort** with two digits, and each digit is
sorted with a **counting sort**:

1. **Pass 1** — stable counting sort by the suit (`key % 4`, four buckets).
2. **Pass 2** — stable counting sort by the rank (`key / 4`, fourteen buckets).

**Why the order of the passes matters:** LSD radix sort processes the *least*
significant digit first. Sorting by suit first and by rank second leaves the
suit order intact inside each rank, because the second pass is **stable**.

**Why stability matters:** a stable sort keeps the relative order of equal keys. If
pass 2 were not stable, the suits inside one rank could be shuffled.

## Dry Run

Input: `5` cards — `(5,2) (3,0) (5,1) (3,3) (5,0)`

### Step 0 — pack every card into a key

| card | rank | suit | `key = rank * 4 + suit` | binary (base 4) |
|---|---:|---:|---:|---|
| 1 | 5 | 2 | 22 | `1 1 2` |
| 2 | 3 | 0 | 12 | `0 3 0` |
| 3 | 5 | 1 | 21 | `1 1 1` |
| 4 | 3 | 3 | 15 | `0 3 3` |
| 5 | 5 | 0 | 20 | `1 1 0` |

`keys = [22, 12, 21, 15, 20]`

### Pass 1 — stable counting sort by suit (`key % 4`)

Counting the suits:

| bucket (suit) | 0 | 1 | 2 | 3 |
|---|---:|---:|---:|---:|
| count | 2 | 1 | 1 | 1 |
| prefix sum (end position) | 2 | 3 | 4 | 5 |

Filling the output **backwards** (that is what makes the sort stable):

| step | key | suit | bucket | position | output |
|---:|---:|---:|---:|---:|---|
| 1 | 20 | 0 | 0 | `result[1] = 20` | `[_, 20, _, _, _]` |
| 2 | 15 | 3 | 3 | `result[4] = 15` | `[_, 20, _, _, 15]` |
| 3 | 21 | 1 | 1 | `result[2] = 21` | `[_, 20, 21, _, 15]` |
| 4 | 12 | 0 | 0 | `result[0] = 12` | `[12, 20, 21, _, 15]` |
| 5 | 22 | 2 | 2 | `result[3] = 22` | `[12, 20, 21, 22, 15]` |

`keys = [12, 20, 21, 22, 15]` → cards `(3,0) (5,0) (5,1) (5,2) (3,3)`

The two threes are still in their original relative order (`12` before `15`) — the
pass was stable.

### Pass 2 — stable counting sort by rank (`key / 4`)

Counting the ranks:

| bucket (rank) | 0 | 1 | 2 | 3 | 4 | 5 | 6 … 13 |
|---|---:|---:|---:|---:|---:|---:|---|
| count | 0 | 0 | 0 | 2 | 0 | 3 | 0 |
| prefix sum | 0 | 0 | 0 | 2 | 2 | 5 | 5 |

Filling the output backwards:

| step | key | rank | bucket | position | output |
|---:|---:|---:|---:|---:|---|
| 1 | 15 | 3 | 3 | `result[1] = 15` | `[_, 15, _, _, _]` |
| 2 | 22 | 5 | 5 | `result[4] = 22` | `[_, 15, _, _, 22]` |
| 3 | 21 | 5 | 5 | `result[3] = 21` | `[_, 15, _, 21, 22]` |
| 4 | 20 | 5 | 5 | `result[2] = 20` | `[_, 15, 20, 21, 22]` |
| 5 | 12 | 3 | 3 | `result[0] = 12` | `[12, 15, 20, 21, 22]` |

`keys = [12, 15, 20, 21, 22]` → cards `(3,0) (3,3) (5,0) (5,1) (5,2)`

### Unpack

| key | rank = `key / 4` | suit = `key % 4` |
|---:|---:|---:|
| 12 | 3 | 0 |
| 15 | 3 | 3 |
| 20 | 5 | 0 |
| 21 | 5 | 1 |
| 22 | 5 | 2 |

Final hand: **`3 0 3 3 5 0 5 1 5 2`**

## Java Solution

See [`SortHand.java`](./SortHand.java).

```java
public static int[][] sortHand(int[] ranks, int[] suits) {
    int n = ranks.length;
    int[] keys = new int[n];
    for (int i = 0; i < n; i++) {
        keys[i] = ranks[i] * 4 + suits[i];
    }
    keys = countingSort(keys, 1, 4);   // by suit — the least significant digit
    keys = countingSort(keys, 4, 14);  // by rank — the most significant digit

    int[][] hand = new int[n][2];
    for (int i = 0; i < n; i++) {
        hand[i][0] = keys[i] / 4;
        hand[i][1] = keys[i] % 4;
    }
    return hand;
}

private static int[] countingSort(int[] keys, int divisor, int bucketCount) {
    int[] counts = new int[bucketCount];
    for (int key : keys) {
        counts[(key / divisor) % bucketCount]++;
    }
    for (int i = 1; i < bucketCount; i++) {
        counts[i] += counts[i - 1];
    }
    int[] result = new int[keys.length];
    for (int i = keys.length - 1; i >= 0; i--) {
        int bucket = (keys[i] / divisor) % bucketCount;
        result[--counts[bucket]] = keys[i];
    }
    return result;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n + 4 + 14) = O(n) | Two counting passes over a bounded number of buckets |
| **Space** | O(n) | The key array and the two output buffers |

## Interview Notes

**Follow-ups to raise yourself:**
- *"How would you sort a full 52-card deck?"* → exactly this: 13 ranks × 4 suits is
  a two-digit radix sort.
- *"What if a card had a joker?"* → give the joker its own rank value and decide
  where it sorts (usually first or last).
- *"Is this stable?"* → yes, and it has to be: the second pass relies on the suit
  order established by the first pass.
- *"How would you sort by suit first, then rank?"* → swap the two passes — that is
  the MSD variant of radix sort.

**Common mistakes:**
- ❌ Doing the passes in the **wrong order** (rank first) → the suits inside a rank
  get shuffled.
- ❌ Filling the counting sort output **forwards** → the sort is no longer stable and
  the deck order is wrong.
- ❌ Using `bucketCount = 13` for the rank pass → rank 13 would wrap into bucket 0.
- ❌ Forgetting the `+1` / offset when the ranks do not start at 1.

**How to narrate:**
> "A card is two digits — the suit and the rank — so I pack it into rank * 4 + suit
> and radix sort the keys. The suit is the least significant digit, so I do a stable
> counting sort by suit first and then a stable counting sort by rank. Stability in
> the second pass is what keeps the suits ordered inside each rank. The whole thing
> is two linear passes, so O(n)."

## Related Problems

- [Counting Sort](../../../../../../docs/topics/08-sorting.md) — the single-pass version this build on
- [Quick Sort](../../../../../../docs/topics/08-sorting.md) — the general purpose alternative
- [Sort Array By Parity](../../../../../../docs/topics/08-sorting.md) — partitioning by a key
