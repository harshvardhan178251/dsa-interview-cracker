---
title: Find Median from Data Stream
leetcode: 295
difficulty: Hard
patterns: [Heap, Two heaps, Order statistics]
companies: [Meta, Amazon, Google, Salesforce, Apple, Airbnb, Paytm]
frequency: 5
tags: [heap, stream, median, design]
sampleInput: |
  5
  1 2 3 4 5
sampleOutput: |
  1.0
  1.5
  2.0
  2.5
  3.0
---

# Find Median from Data Stream — LeetCode 295

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Heap · Two heaps · Order statistics |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber, Bloomberg, Pinterest |

## Problem Statement

Support adding numbers to a stream and report the **median** of all the numbers added so
far, in constant time per query.

- An odd number of values → the middle value.
- An even number of values → the average of the two middle values.
- Every insertion must be O(log n) and every query O(1).

## Input Format

The program reads from standard input:

```
n
v0 v1 ... v(n-1)
```

- `n` — the number of values (1 ≤ n ≤ 10⁵)
- the n values, inserted in the order they are read

The program prints the median **after every insertion**, one per line. A median that is
an integer is printed as `X.0`, a half-integer as `X.5`.

## Sample Input

```
5
1 2 3 4 5
```

## Expected Output

```
1.0
1.5
2.0
2.5
3.0
```

## Approach — Two heaps, one partition

The median is the boundary between the smaller half and the larger half. So we keep the
values split across two heaps:

- **`lower`** — a **max**-heap with the smaller half. Its maximum is the lower median.
- **`upper`** — a **min**-heap with the larger half. Its minimum is the upper median.

Two invariants make the median a one-liner:

1. every value in `lower` is `≤` every value in `upper`;
2. `lower` holds either the same number of elements as `upper`, or exactly one more.

Then:

- odd count → `lower` is bigger by one → the median is `lower.peek()`;
- even count → the two heaps have the same size → the median is
  `(lower.peek() + upper.peek()) / 2`.

**Insertion** keeps both invariants with three moves:

1. push the new value into `lower` and immediately move `lower`'s maximum to `upper` —
   that guarantees the new value never sits above a bigger value in `upper`;
2. if `upper` ends up bigger than `lower`, move `upper`'s minimum into `lower`.

Both moves are O(log n).

## Dry Run

Input: `1 2 3 4 5`

`lower` is a max-heap (its root is the largest of the lower half), `upper` is a min-heap.

| Step | inserted | `lower` after | `upper` after | median |
|---:|---:|---|---|---|
| 1 | 1 | `[1]` | `[]` | `1.0` (odd → lower's max) |
| 2 | 2 | `[1]` | `[2]` | `1.5` (even → (1+2)/2) |
| 3 | 3 | `[2, 1]` | `[3]` | `2.0` (odd → lower's max) |
| 4 | 4 | `[2, 1]` | `[3, 4]` | `2.5` (even → (2+3)/2) |
| 5 | 5 | `[3, 1, 2]` | `[4, 5]` | `3.0` (odd → lower's max) |

Step 3 is the interesting one: `3` is inserted into `lower`, but `lower`'s maximum (`3`)
is immediately moved to `upper`, so the lower half stays the smaller one and keeps the
extra element. Step 4 repeats the pattern with `4`.

## Java Solution

See [`FindMedianFromDataStream.java`](./FindMedianFromDataStream.java).

```java
public void addNum(int value) {
    lower.add(value);
    upper.add(lower.poll());
    if (upper.size() > lower.size()) {
        lower.add(upper.poll());
    }
}

public double findMedian() {
    if (lower.size() > upper.size()) {
        return lower.peek();
    }
    return (lower.peek() + upper.peek()) / 2.0;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(log n) per insertion, O(1) per median | two heap operations per insertion |
| **Space** | O(n) | every value is stored exactly once |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if you also need the 90th percentile?"* → keep the two heaps and walk the
  percentile down into `lower`; the order statistics of a stream are available for free
  from the partition.
- *"What if values can be removed?"* → a plain heap cannot remove an arbitrary element;
  use a lazy-deletion heap (a map of pending deletions) or a balanced tree.
- *"What if the stream is huge and the values are approximate?"* → t-digest or
  KLL sketches give quantiles in constant memory.
- *"Why two heaps instead of one sorted list?"* → inserting into a sorted array is O(n);
  the heap gives O(log n) inserts and O(1) median.

**Common mistakes:**
- ❌ Putting the new value into the **wrong** half → the partition invariant breaks and
  the median is wrong as soon as the two halves are interleaved wrongly.
- ❌ Forgetting the **rebalance** step → the two halves drift apart in size and the
  median ends up in the wrong heap.
- ❌ Averaging with integer division → `(1 + 2) / 2` is `1`, not `1.5`.
- ❌ Returning `upper.peek()` for the odd case → the odd case is the *extra* element in
  `lower`.

**How to narrate:**
> "The median is the boundary between the smaller and the larger half, so I split the
> stream in two: a max-heap for the lower half and a min-heap for the upper half. Two
> invariants: everything in the lower half is at most everything in the upper half, and
> the lower half has the same size or one more. To insert, I push into the lower half,
> move its maximum up to the upper half, and rebalance if the upper half grew too big.
> The median is then either the lower heap's max or the average of the two tops."

## Related Problems

- [Median of Two Sorted Arrays](MedianOfTwoSortedArrays.md) — the same question, static input
- [Design a Min Queue](../queues/MinQueue.md) — a running minimum in a queue
- [K Closest Elements](KClosestElements.md) — order statistics on a sorted array
- [Top K Frequent Elements](TopKFrequentElements.md) — a bounded heap
