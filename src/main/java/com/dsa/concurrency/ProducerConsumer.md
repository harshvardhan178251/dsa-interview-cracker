---
title: Producer–Consumer Problem
leetcode: null
difficulty: Medium
patterns: [Concurrency, Blocking queue, Poison pill]
companies: [Google, JP Morgan, Microsoft]
frequency: 4
tags: [concurrency, blocking queue, threads]
sampleInput: |
  2
  5
  3
sampleOutput: |
  1
  2
  3
  4
  5
---

# Producer–Consumer Problem

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Concurrency · Blocking queue · Poison pill |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Netflix |

## Problem Statement

The classic producer/consumer problem:

- a **producer** thread creates items and pushes them into a **bounded buffer**;
- a fixed number of **consumer** threads take items out of the buffer;
- the buffer has a fixed capacity, so the producer must **block** when it is full and the
  consumers must **block** when it is empty;
- every produced item must be consumed **exactly once** — nothing lost, nothing
  duplicated.

The output of this program is the set of consumed items. Since *which* consumer picks up
*which* item depends on the scheduler, the items are printed sorted, so the output is
identical on every run.

## Input Format

```
capacity
nItems
nConsumers
```

- `capacity` — the size of the bounded buffer (≥ 1).
- `nItems` — how many items the producer creates; the items are `1..nItems`.
- `nConsumers` — how many consumer threads to start.

The program prints the consumed items, one per line, in ascending order.

## Sample Input

```
2
5
3
```

## Expected Output

```
1
2
3
4
5
```

Every item is consumed exactly once, so the sorted output is always `1..5`.

## Approach — a blocking queue and a poison pill

An `ArrayBlockingQueue` already **is** the bounded buffer with blocking `put`/`take`, so
the interesting part is knowing when the consumers should stop.

The usual solution is the **poison pill**: after producing all the real items, the
producer pushes one sentinel value per consumer. Because the queue is FIFO:

- the consumers always drain the real items **before** they meet a pill,
- there is exactly one pill per consumer, so every consumer takes exactly one pill and
  exits.

No shared "are we done?" flag, no `Thread.sleep`, no busy waiting — and the producer
never blocks forever, because the consumers keep taking items while it is trying to push
the pills.

The main thread **joins** every thread before it reads the result, so the output can
never depend on the scheduling.

## Dry Run

`capacity = 2`, `nItems = 5`, `nConsumers = 3`.

The table shows **one valid interleaving** of the threads. The *order* of the rows
changes from run to run — that is the whole point of the problem — but the invariants in
the last column never do.

| Step | Thread | Action | Buffer before | Buffer after | Blocking? | Notes |
|---:|---|---|---|---|---|---|
| 1 | producer | `put 1` | `[]` | `[1]` | no | buffer has room |
| 2 | producer | `put 2` | `[1]` | `[1, 2]` | no | buffer is now **full** |
| 3 | producer | `put 3` | `[1, 2]` | `[1, 2]` | **yes** | `put` blocks, the buffer is full |
| 4 | consumer-0 | `take` | `[1, 2]` | `[2]` | no | takes `1`, frees one slot |
| 5 | producer | `put 3` (resumes) | `[2]` | `[2, 3]` | no | the blocked `put` completes |
| 6 | consumer-1 | `take` | `[2, 3]` | `[3]` | no | takes `2` |
| 7 | producer | `put 4` | `[3]` | `[3, 4]` | no | buffer is full again |
| 8 | producer | `put 5` | `[3, 4]` | `[3, 4]` | **yes** | blocks |
| 9 | consumer-2 | `take` | `[3, 4]` | `[4]` | no | takes `3` |
| 10 | producer | `put 5` (resumes) | `[4]` | `[4, 5]` | no | completes |
| 11 | consumer-0 | `take` | `[4, 5]` | `[5]` | no | takes `4` |
| 12 | producer | `put pill` | `[5]` | `[5, pill]` | no | all 5 items are produced |
| 13 | producer | `put pill` | `[5, pill]` | `[5, pill]` | **yes** | the buffer is full |
| 14 | consumer-1 | `take` | `[5, pill]` | `[pill]` | no | takes `5` |
| 15 | producer | `put pill` (resumes) | `[pill]` | `[pill, pill]` | no | second pill |
| 16 | consumer-2 | `take` | `[pill, pill]` | `[pill]` | no | takes a pill → consumer-2 exits |
| 17 | consumer-0 | `take` | `[pill]` | `[]` | no | takes a pill → consumer-0 exits |
| 18 | consumer-1 | `take` | `[]` | `[]` | **yes** | blocks, waiting for its pill |
| 19 | — | — | `[]` | — | — | consumer-1 is the only consumer left |

### The invariants that hold on **every** interleaving

| Invariant | Why |
|---|---|
| The buffer never holds more than `capacity` items | `ArrayBlockingQueue` enforces it |
| Every item `1..nItems` is consumed exactly once | the items are produced once and taken once |
| No consumer ever takes a real item after a pill | the queue is FIFO, the pills are pushed last |
| Every consumer takes exactly one pill | there is one pill per consumer |
| No thread is left blocked when the producer is done | the pills always unblock the consumers |

The **output** of the program is the sorted list of consumed items — `1, 2, 3, 4, 5` for
this sample, no matter how the rows above were interleaved.

## Java Solution

See [`ProducerConsumer.java`](./ProducerConsumer.java).

```java
public void produce(int total, int consumers) throws InterruptedException {
    for (int value = 1; value <= total; value++) {
        buffer.put(value);              // blocks while the buffer is full
    }
    for (int i = 0; i < consumers; i++) {
        buffer.put(POISON);             // one pill per consumer
    }
}

public static List<Integer> run(int capacity, int totalItems, int nConsumers)
        throws InterruptedException {
    ProducerConsumer pc = new ProducerConsumer(capacity);
    List<Thread> threads = new ArrayList<>();

    Thread producer = new Thread(() -> { ... pc.produce(totalItems, nConsumers); ... });
    threads.add(producer);
    producer.start();

    for (int i = 0; i < nConsumers; i++) {
        Thread consumer = new Thread(() -> {
            while (true) {
                int value = pc.consume();          // blocks while the buffer is empty
                if (value == POISON) {
                    return;                        // the producer is done
                }
                pc.consumed.add(value);
            }
        });
        threads.add(consumer);
        consumer.start();
    }

    for (Thread thread : threads) {
        thread.join();                 // nobody is read before it finished
    }
    return pc.consumedItems();
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) overall | every item is produced once and consumed once |
| **Space** | O(capacity + n) | the buffer plus the list of consumed items |

## Interview Notes

**Follow-ups to raise yourself:**
- *"How would you avoid the poison pill?"* → an `AtomicInteger` of remaining items plus a
  `while (remaining.get() > 0 || !queue.isEmpty())` loop; the pill is usually cleaner.
- *"What if the consumers had to acknowledge the items?"* → an ack queue per consumer, or
  a `CompletableFuture` per item.
- *"How would you make it fair?"* → a `ReentrantLock(true)` and a fair `ArrayBlockingQueue`
  (`new ArrayBlockingQueue<>(capacity, true)`).
- *"What if the producer failed halfway?"* → catch the exception, push the pills anyway
  in a `finally` block, otherwise the consumers block forever.
- *"How would you scale it to many producers and consumers?"* → several producers and
  consumers sharing one queue; the queue is the only shared state.

**Common mistakes:**
- ❌ Using `Thread.sleep` instead of a blocking queue → the classic busy-wait.
- ❌ Forgetting to join the threads → the main thread may read the result before the
  consumers are done, so the output is not reproducible.
- ❌ Printing from the worker threads → the lines interleave, the output is garbage.
- ❌ Pushing only **one** pill → the other consumers block forever on `take()`.
- ❌ Not handling `InterruptedException` → the interrupt is swallowed.

**How to narrate:**
> "The bounded buffer is an `ArrayBlockingQueue` — it already blocks the producer when
> it is full and the consumers when it is empty. The only thing I have to design is the
> shutdown: the producer pushes one poison pill per consumer after the real items, and
> because the queue is FIFO every consumer drains the items first and then finds exactly
> one pill and exits. In the main thread I join everybody before I read the result, so
> the output never depends on the scheduling."

## Related Problems

- [Bounded Blocking Queue](./BoundedBlockingQueue.md) — the buffer itself, written by hand
- [Atomic Counter](./AtomicCounter.md) — a shared counter without locks
- [Concurrent Sum using Threads](./ConcurrentSumWithThreads.md) — the same join-then-read
  discipline
