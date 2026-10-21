---
title: Concurrent Sum using Threads
leetcode: null
difficulty: Medium
patterns: [Concurrency, Work splitting, Join before reading]
companies: [Meta, Apple]
frequency: 3
tags: [concurrency, threads, work splitting, join]
sampleInput: |
  5
  1 2 3 4 5
  2
sampleOutput: |
  6
  9
  15
---

# Concurrent Sum using Threads

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Concurrency · Work splitting · Join before reading |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Sum a large array with several threads.

- Split the array into contiguous chunks, one per thread.
- Every thread computes the partial sum of **its own** chunk — no locks, no shared
  writes.
- The partial sums are added up at the end.

The result must be exactly the sequential sum, no matter how the threads are scheduled.

## Input Format

```
n
v1 v2 ... vn
threads
```

- `n` — the number of values.
- `v1..vn` — the values (they may be on one line or on several).
- `threads` — how many worker threads to use.

The program prints one line per thread with its partial sum, and a final line with the
total.

## Sample Input

```
5
1 2 3 4 5
2
```

## Expected Output

```
6
9
15
```

Two threads: the first owns `[1, 2, 3]` (sum `6`), the second owns `[4, 5]` (sum `9`),
and `6 + 9 = 15`.

## Approach — split the work, write to private slots, join

The whole design is about **avoiding shared mutable state**:

1. **Split** the array into `threads` contiguous chunks. The remainder is given to the
   first workers, so a chunk is never empty while elements are left.
2. **Private slots**: worker `i` writes its partial sum into `partial[i]`. No two threads
   write the same element, so there is no data race and no lock is needed.
3. **Join before reading**: `Thread.join()` returns only after the thread has finished,
   and it establishes a *happens-before* edge — everything the worker wrote is visible
   to the main thread afterwards. Reading the slots before the join would be a race.

This is the pattern behind `parallelStream()`, `ForkJoinPool` and every "embarrassingly
parallel" map/reduce: split, compute privately, combine.

## Dry Run

`n = 5`, values `[1, 2, 3, 4, 5]`, `threads = 2`. The split gives
`base = 5 / 2 = 2`, `extra = 5 % 2 = 1`, so worker 0 gets the extra element.

| Worker | `from` | `to` | Chunk | Partial sum | Written to |
|---:|---:|---:|---|---:|---|
| 0 | `0*2 + min(0,1) = 0` | `0 + 2 + 1 = 3` | `[1, 2, 3]` | `1 + 2 + 3 = 6` | `partial[0]` |
| 1 | `1*2 + min(1,1) = 3` | `3 + 2 + 0 = 5` | `[4, 5]` | `4 + 5 = 9` | `partial[1]` |

The execution itself is concurrent; the *slots* are fixed:

| Step | Worker | Values added | Running sum | `partial[]` after |
|---:|---|---|---:|---|
| 1 | W0 | `1` | 1 | `[_, _]` |
| 2 | W0 | `2` | 3 | `[_, _]` |
| 3 | W1 | `4` | 4 | `[_, _]` |
| 4 | W1 | `5` | 9 | `[_, _]` |
| 5 | W0 | `3` | 6 | `[6, 9]` |
| 6 | — | — | — | join → the main thread reads `[6, 9]` |

The order of the rows changes from run to run; the two partial sums and the total never
do.

The final combination happens in the main thread, in **worker order**, not in completion
order — that is what makes the output reproducible.

## Java Solution

See [`ConcurrentSumWithThreads.java`](./ConcurrentSumWithThreads.java).

```java
public static long[] sumInChunks(long[] values, int threads) throws InterruptedException {
    int n = values.length;
    int workers = Math.max(1, Math.min(threads, Math.max(1, n)));
    long[] partial = new long[workers];
    List<Thread> workersList = new ArrayList<>();

    for (int worker = 0; worker < workers; worker++) {
        final int workerIndex = worker;
        int[] bounds = chunkBounds(n, workers, worker);
        int from = bounds[0];
        int to = bounds[1];
        Thread thread = new Thread(() -> {
            long sum = 0;
            for (int i = from; i < to; i++) {
                sum += values[i];
            }
            partial[workerIndex] = sum;       // private slot, no lock
        }, "summer-" + worker);
        workersList.add(thread);
        thread.start();
    }

    for (Thread thread : workersList) {
        thread.join();                        // happens-before edge
    }
    return partial;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) overall, O(n / threads) per worker | every element is touched once |
| **Space** | O(n) for the input, O(threads) for the partial sums | the chunks are views, not copies |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the array does not fit in memory?"* → stream it in blocks, or use
  `IntStream.range(...).parallel()`.
- *"How would you use the CPUs better?"* → the chunk boundaries are static; a work-stealing
  pool (`ForkJoinPool`) hands out small tasks dynamically instead.
- *"What if the values arrive over a network?"* → the same splitting, but the chunks are
  distributed to the machines and the partial sums are combined afterwards.
- *"How would you sum a huge file?"* → map/reduce: each mapper sums its block, the
  reducer sums the partial sums — exactly this algorithm.

**Common mistakes:**
- ❌ Reading the partial sums before joining the threads → a race, and the total can be
  wrong.
- ❌ Writing to a shared `long total` from the workers → a lost update; use private slots
  and combine afterwards.
- ❌ Using `long` for the accumulation but `int` for the partial sums → an overflow.
- ❌ Splitting with `n / threads` only and ignoring the remainder → some elements are
  never summed.
- ❌ Printing from the worker threads → the output interleaves.

**How to narrate:**
> "This is an embarrassingly parallel problem, so I avoid shared state completely. I
> split the array into contiguous chunks, each worker sums its own chunk and writes the
> result into its own slot of an array — no two threads touch the same element, so no
> lock is needed. The main thread joins every worker before it reads the slots; `join`
> gives me the happens-before edge that makes the writes visible. Then I add the partial
> sums in worker order, which makes the output deterministic."

## Related Problems

- [Atomic Counter](./AtomicCounter.md) — the same latch-and-join discipline on a counter
- [Producer–Consumer](./ProducerConsumer.md) — the same discipline with a shared buffer
- [Parallel Pipeline Merge](./ParallelPipelineMerge.md) — the same discipline with several
  stages
