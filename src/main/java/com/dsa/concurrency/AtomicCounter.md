---
title: Thread-Safe Counter
leetcode: null
difficulty: Easy
patterns: [Concurrency, Atomics, Lock-free]
companies: [Google, Apple, Airbnb, Capgemini, EY]
frequency: 4
tags: [concurrency, atomic, synchronized, longadder]
sampleInput: |
  5
  1
  2
  3
  4
  5
sampleOutput: |
  15
  15
  15
---

# Thread-Safe Counter

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Concurrency · Atomics · Lock-free |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Netflix |

## Problem Statement

A counter is incremented by many threads at the same time. Compare the three classic
ways of doing that safely:

1. an **`AtomicInteger`** — a lock-free compare-and-swap loop,
2. a counter guarded by **`synchronized`** — one monitor, one thread at a time,
3. a **`LongAdder`** — a striped counter that spreads the contention over several cells.

All three must produce the same total. The program runs the same workload three times,
once per implementation, and prints the three totals.

## Input Format

```
n
d1
d2
...
dn
```

- `n` — the number of increments.
- `d1..dn` — the amount each increment adds (usually all `1`).

The program prints three lines:

1. the total reached by the `AtomicInteger`,
2. the total reached by the `synchronized` counter,
3. the total reached by the `LongAdder`.

## Sample Input

```
5
1
2
3
4
5
```

## Expected Output

```
15
15
15
```

`1 + 2 + 3 + 4 + 5 = 15`, whichever implementation is used.

## Approach — the same workload, three implementations

The workload is fixed:

1. Split the `n` increments into contiguous chunks, one per worker.
2. Start all workers, but hold them at a `CountDownLatch` so they all begin at the same
   moment — that is what creates the contention.
3. Each worker applies its chunk to the counter.
4. The main thread waits on a second `CountDownLatch` and only then reads the total.

Because the workers are joined before the total is read, the printed result is the same
on every run — the *contention pattern* differs, the *answer* does not.

| Implementation | How it works | Cost per increment |
|---|---|---|
| `AtomicInteger` | `addAndGet` — a CAS loop on one word | one atomic instruction, but **all** threads fight for the same cache line |
| `synchronized` | the monitor serialises the whole method | a real blocking lock, plus the context switch |
| `LongAdder` | the value is spread over a table of cells, each updated with its own CAS | the cheapest under heavy contention, but `sum()` is not atomic |

`LongAdder` wins when there are many threads and many increments; `AtomicInteger` wins
for a single thread or a read-heavy workload.

## Dry Run

`n = 5`, increments `1, 2, 3, 4, 5`, `MAX_THREADS = 4` workers. The chunks are
`[1]`, `[2]`, `[3]`, `[4, 5]` — the first workers get the remainder.

The table shows **one valid interleaving** of the workers. The rows move from run to run,
the totals do not.

| Step | Worker | Chunk | `AtomicInteger` before | Action | `AtomicInteger` after | `synchronized` before | after | `LongAdder` before | after |
|---:|---|---|---:|---|---:|---:|---:|---:|---:|
| 1 | W0 | `[1]` | 0 | `addAndGet(1)` | 1 | 0 | 1 | 0 | 1 |
| 2 | W1 | `[2]` | 1 | `addAndGet(2)` | 3 | 1 | 3 | 1 | 3 |
| 3 | W2 | `[3]` | 3 | `addAndGet(3)` | 6 | 3 | 6 | 3 | 6 |
| 4 | W3 | `[4,5]` | 6 | `addAndGet(4)` | 10 | 6 | 10 | 6 | 10 |
| 5 | W3 | `[4,5]` | 10 | `addAndGet(5)` | 15 | 10 | 15 | 10 | 15 |

All three counters end at **15**.

### What a lost update would look like

Without any synchronisation, two threads can read the same value and write back the same
result — the classic lost update:

| Step | Thread A | Thread B | Counter |
|---:|---|---|---:|
| 1 | reads `v = 0` | | 0 |
| 2 | | reads `v = 0` | 0 |
| 3 | writes `0 + 1 = 1` | | 1 |
| 4 | | writes `0 + 1 = 1` | **1** — the increment of A is lost |

`addAndGet` cannot do this: the write is a compare-and-swap, so if two threads race,
the loser retries with the new value.

### The `synchronized` version serialises the same work

| Step | Thread | Monitor | Action | Counter |
|---:|---|---|---|---:|
| 1 | W0 | held | `value += 1` | 1 |
| 2 | W1 | held | `value += 2` | 3 |
| 3 | W2 | held | `value += 3` | 6 |
| 4 | W3 | held | `value += 4`, `value += 5` | 15 |

Identical result, but the threads take turns — with four threads on a four core machine
the monitor serialises all of them.

### The `LongAdder` version spreads the writes

| Step | Thread | Cell it updates | Cell totals after | `sum()` |
|---:|---|---|---|---:|
| 1 | W0 | cell `a` | `a = 1` | 1 |
| 2 | W1 | cell `b` | `a = 1, b = 2` | 3 |
| 3 | W2 | cell `a` (contended, but not the same word as W1) | `a = 4, b = 2` | 6 |
| 4 | W3 | cell `c` | `a = 4, b = 2, c = 9` | 15 |

Two threads that update *different* cells do not invalidate each other's cache line —
that is the whole idea of `LongAdder`.

## Java Solution

See [`AtomicCounter.java`](./AtomicCounter.java).

```java
public static final class AtomicIntegerCounter implements Counter {
    private final AtomicInteger value = new AtomicInteger();

    @Override
    public void add(long delta) {
        value.addAndGet((int) delta);
    }

    @Override
    public long total() {
        return value.get();
    }
}

public static final class SynchronizedCounter implements Counter {
    private long value;

    @Override
    public synchronized void add(long delta) {
        value += delta;
    }

    @Override
    public synchronized long total() {
        return value;
    }
}

public static long runConcurrent(long[] deltas, int threads, Counter counter)
        throws InterruptedException {
    CountDownLatch start = new CountDownLatch(1);
    CountDownLatch done = new CountDownLatch(workers);
    for (int worker = 0; worker < workers; worker++) {
        new Thread(() -> {
            start.await();                       // all workers start together
            for (int i = from; i < to; i++) {
                counter.add(deltas[i]);
            }
            done.countDown();
        }).start();
    }
    start.countDown();
    done.await();                               // nobody reads before this returns
    return counter.total();
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) overall, O(1) per increment | each increment touches one cell / one word |
| **Space** | O(1) per implementation | one word for the atomic, a small table for the adder |

## Interview Notes

**Follow-ups to raise yourself:**
- *"When do you use `LongAdder` over `AtomicLong`?"* → when there are many threads and
  many writes and the reads are rare; the adder is not atomic for `sum()`, so it must
  not be used when the value has to be read and written as one atomic unit.
- *"What is a compare-and-swap?"* → an atomic instruction that writes a value only if the
  memory still holds the expected value; it is the building block of every lock-free
  algorithm.
- *"What is the ABA problem?"* → a CAS can succeed on a value that changed and changed
  back; the fix is a versioned stamp (as in `AtomicStampedReference`).
- *"How would you build a lock-free stack?"* → a Treiber stack with a CAS on the head.
- *"What does `volatile` give you and what does it not?"* → visibility and ordering, but
  **not** atomicity of `count++`.

**Common mistakes:**
- ❌ Believing `volatile int count; count++;` is atomic — it is a read, a write and a race.
- ❌ Reading `LongAdder.sum()` and expecting an atomic snapshot of the value.
- ❌ Using `AtomicInteger` for the sum of a `long` → it truncates; use `AtomicLong`.
- ❌ Printing the counter from the worker threads → the output would interleave.
- ❌ Forgetting the `join`/`await` before reading the total → a torn result.

**How to narrate:**
> "There are three ways. `synchronized` is the simplest but serialises the threads.
> `AtomicInteger` is lock-free — a compare-and-swap loop on one word — but all the
> threads fight for the same cache line. `LongAdder` spreads the increments over several
> cells, so two threads usually touch different words; it is much faster under heavy
> contention, at the price of a `sum()` that is not atomic. I'll run the same workload
> three times, release all the workers at once with a latch, and join them before
> reading the totals, so the printed numbers are reproducible."

## Related Problems

- [Singleton with Double-Checked Locking](./SingletonDoubleCheckedLocking.md) — `volatile`
  versus a lock, the other half of the story
- [Bounded Blocking Queue](./BoundedBlockingQueue.md) — the blocking alternative
- [Concurrent Sum using Threads](./ConcurrentSumWithThreads.md) — the same latch-and-join
  discipline
