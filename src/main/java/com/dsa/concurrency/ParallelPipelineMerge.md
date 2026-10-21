---
title: Parallel Pipeline Merge
leetcode: null
difficulty: Hard
patterns: [Concurrency, Pipeline, Ordered merge]
companies: [Amazon, Google, Meta, Uber, Netflix]
frequency: 2
tags: [concurrency, pipeline, queues, merge]
sampleInput: |
  3
  4
  1 2 3 4
sampleOutput: |
  64
  128
  192
  256
---

# Parallel Pipeline Merge

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Concurrency · Pipeline · Ordered merge |
| **Interview heat** | ★★☆☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Netflix |

## Problem Statement

Push a list of values through a pipeline of `stages` stages.

- Every stage is executed by a pool of worker threads.
- Stage `s` (1-based) transforms a value `x` into `x * 2^s`.
- The stages hand their results to each other through **bounded queues**, so the stages
  really overlap: stage 2 can already work on an item while stage 1 is still busy with
  the next one.
- The items leave the pipeline in **completion order**, which depends on the scheduling.
- The **merge** step has to put them back into the original input order.

The output of the program is the merged result of every item, one per line, in input
order — identical on every run.

## Input Format

```
stages
n
v1 v2 ... vn
```

- `stages` — the number of pipeline stages.
- `n` — the number of values.
- `v1..vn` — the values.

The program prints the merged result of every item, one per line, in input order.

## Sample Input

```
3
4
1 2 3 4
```

## Expected Output

```
64
128
192
256
```

With three stages the total factor is `2¹ · 2² · 2³ = 2⁶ = 64`, so the value `1`
becomes `64`, `2` becomes `128`, and so on.

## Approach — one bounded queue per stage plus a merger thread

```
queue[0] ──▶ [stage 1 workers] ──▶ queue[1] ──▶ [stage 2 workers] ──▶ queue[2] ──▶ …
                                                     …
                                     queue[stages] ──▶ [merger thread] ──▶ results[]
```

- `queue[0]` is pre-filled with all the items, each carrying its **original index**.
- The workers of stage `s` take an item from `queue[s-1]`, transform it and put it into
  `queue[s]`.
- The **merger** thread drains `queue[stages]` and writes every value into
  `results[item.index]` — the merge that restores the input order. The index travels
  with the item through the whole pipeline, so no matter in which order the items
  arrive, each one lands in its own slot.
- A `CountDownLatch` counts the merged items. When all `n` items are merged the workers
  are interrupted and the program reads the results.

**Why the merge is necessary.** Without it the output would be the completion order,
which changes from run to run — the pipeline is concurrent, the *result* must not be.

**Why a bounded queue.** An unbounded queue would let the first stage run ahead and
buffer everything in memory; the bounded queue applies back pressure, so a slow stage
slows the pipeline down instead of the memory growing.

## Dry Run

`stages = 3`, values `[1, 2, 3, 4]`. Stage `s` multiplies by `2^s`.

The table shows **one valid interleaving** — the row order changes from run to run, the
final result never does.

| Step | Thread | Action | `queue[0]` | `queue[1]` | `queue[2]` | `queue[3]` | `results[]` |
|---:|---|---|---|---|---|---|---|
| 1 | — | fill the input queue | `[1,2,3,4]` | `[]` | `[]` | `[]` | `[_,_,_,_]` |
| 2 | S1-W0 | take `1` → `1*2 = 2` | `[2,3,4]` | `[2]` | `[]` | `[]` | `[_,_,_,_]` |
| 3 | S1-W1 | take `2` → `2*2 = 4` | `[3,4]` | `[2,4]` | `[]` | `[]` | `[_,_,_,_]` |
| 4 | S2-W0 | take `2` → `2*4 = 8` | `[3,4]` | `[4]` | `[8]` | `[]` | `[_,_,_,_]` |
| 5 | S1-W2 | take `3` → `3*2 = 6` | `[4]` | `[4,6]` | `[8]` | `[]` | `[_,_,_,_]` |
| 6 | S2-W1 | take `4` → `4*4 = 16` | `[4]` | `[6]` | `[8,16]` | `[]` | `[_,_,_,_]` |
| 7 | S3-W0 | take `8` → `8*8 = 64` | `[4]` | `[6]` | `[16]` | `[64]` | `[_,_,_,_]` |
| 8 | merger | take `64` (index 0) | `[4]` | `[6]` | `[16]` | `[]` | `[64,_,_,_]` |
| 9 | S1-W3 | take `4` → `4*2 = 8` | `[]` | `[6,8]` | `[16]` | `[]` | `[64,_,_,_]` |
| 10 | S2-W2 | take `6` → `6*4 = 24` | `[]` | `[8]` | `[16,24]` | `[]` | `[64,_,_,_]` |
| 11 | S2-W3 | take `8` → `8*4 = 32` | `[]` | `[]` | `[16,24,32]` | `[]` | `[64,_,_,_]` |
| 12 | S3-W1 | take `16` → `16*8 = 128` | `[]` | `[]` | `[24,32]` | `[128]` | `[64,_,_,_]` |
| 13 | merger | take `128` (index 1) | `[]` | `[]` | `[24,32]` | `[]` | `[64,128,_,_]` |
| 14 | S3-W2 | take `24` → `24*8 = 192` | `[]` | `[]` | `[32]` | `[192]` | `[64,128,_,_]` |
| 15 | S3-W3 | take `32` → `32*8 = 256` | `[]` | `[]` | `[]` | `[192,256]` | `[64,128,_,_]` |
| 16 | merger | take `192` (index 2) | `[]` | `[]` | `[]` | `[256]` | `[64,128,192,_]` |
| 17 | merger | take `256` (index 3) → latch reaches 0 | `[]` | `[]` | `[]` | `[]` | `[64,128,192,256]` |

Note how the merger receives the items in the order `64, 128, 192, 256` here, but it
could have received them in any order — the **index** carried by each item decides where
it lands. That is the merge.

### The merge matters — the same run without it

| Step | Merger receives | Without the index | With the index |
|---:|---|---|---|
| 1 | item of value `64` | slot 0 | slot 0 (its index) |
| 2 | item of value `256` | slot 1 | slot 3 (its index) |
| 3 | item of value `192` | slot 2 | slot 2 |
| 4 | item of value `128` | slot 3 | slot 1 |

Without the index the output would be `64, 256, 192, 128` — wrong order. With it, the
output is always `64, 128, 192, 256`.

## Java Solution

See [`ParallelPipelineMerge.java`](./ParallelPipelineMerge.java).

```java
static final class Item {
    final int index;                       // the original position of the item
    final long value;
}

// worker of stage s
Item in = queues[stageIndex - 1].take();
long out = in.value * (1L << stageIndex);
queues[stageIndex].put(new Item(in.index, out));

// merger thread
Item item = queues[stageCount].take();
results[item.index] = item.value;         // the merge restores the input order
merged.countDown();
```

The main thread waits on `merged.await()`, interrupts the workers (they are blocked in
`take()`) and then prints `results` in index order.

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n · stages) overall | every item passes through every stage once |
| **Space** | O(n · stages) worst case | the items can be queued in several stages at once |

## Interview Notes

**Follow-ups to raise yourself:**
- *"How would you bound the memory?"* → bounded queues (as here) apply back pressure; the
  total number of items in flight is then limited by the queue capacities.
- *"How would you make the stages different?"* → give each stage its own function instead
  of the `x * 2^s` rule; the structure does not change.
- *"What if the stages have different speeds?"* → the slow stage becomes the bottleneck;
  more workers on the fast stages do not help. That is where a work-stealing scheduler
  wins.
- *"How would you parallelise it across machines?"* → each machine runs the stages for a
  slice of the data and the merger combines the partial results — the same split/merge
  pattern as a MapReduce job.
- *"How would you handle an item that fails in stage 2?"* → a dead-letter queue and a
  per-item error state carried along with the item.

**Common mistakes:**
- ❌ Returning the items in completion order → the output changes from run to run.
- ❌ Forgetting to carry the original index along with the value.
- ❌ Reading the results before the merger has finished → a race.
- ❌ Using unbounded queues → the memory grows with the input size.
- ❌ Forgetting to interrupt the workers → the program never terminates because the
  workers wait for more items forever.
- ❌ Sharing a plain `ArrayList` between the stages → it is not thread safe.

**How to narrate:**
> "A pipeline is a chain of bounded queues with a pool of workers behind each of them.
> Every item carries its original index, so when the items come out in completion order
> the merger can put each one back into its own slot — that is the merge, and it is what
> makes the output reproducible. A countdown latch tells the main thread when all the
> items have been merged; after that I interrupt the workers and print the result array
> in index order."

## Related Problems

- [Producer–Consumer](./ProducerConsumer.md) — one bounded queue instead of a chain of them
- [Bounded Blocking Queue](./BoundedBlockingQueue.md) — the queue this pipeline is built on
- [Concurrent Sum using Threads](./ConcurrentSumWithThreads.md) — the same split/merge pattern
  without the stages
