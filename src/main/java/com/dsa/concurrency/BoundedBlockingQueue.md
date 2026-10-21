---
title: Bounded Blocking Queue
leetcode: null
difficulty: Medium
patterns: [Concurrency, Lock, Condition variables]
companies: [Google, LinkedIn, Adobe, Cognizant, HSBC]
frequency: 4
tags: [concurrency, lock, condition, blocking queue]
sampleInput: |
  2
  5
  put 1
  put 2
  put 3
  take
  take
sampleOutput: |
  1
  2
  -1
  1
  2
---

# Bounded Blocking Queue

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Concurrency · Lock · Condition variables |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Netflix |

## Problem Statement

Implement a queue with a fixed capacity from scratch, using locks and condition
variables instead of `ArrayBlockingQueue`.

- `put(value)` — append a value; **blocks** while the queue is full.
- `take()` — remove and return the head; **blocks** while the queue is empty.

The queue must be safe to use from several threads at the same time, and it must never
exceed its capacity or hand out a value that is not there.

## Input Format

```
capacity
n
put v
take
...
```

- `capacity` — the maximum number of queued values.
- `n` — the number of commands.
- `put v` — enqueue the value `v`.
- `take` — dequeue the oldest value.

The program prints one line per command: the value that was enqueued by `put`, or the
value that was dequeued by `take`. `-1` means the operation could not be performed — the
queue was full for a `put`, empty for a `take`.

The driver uses the non blocking variants (`offer` / `poll`) so that it can never
deadlock, whatever the input is.

## Sample Input

```
2
5
put 1
put 2
put 3
take
take
```

## Expected Output

```
1
2
-1
1
2
```

The third `put` finds the queue full (capacity 2) and is rejected; the two `take`s then
hand out `1` and `2` in FIFO order.

## Approach — one lock, two conditions

The shared state is the deque of items and its size. Both are protected by one
`ReentrantLock`, and there are two `Condition`s:

- `notEmpty` — signalled when an item is added, so a waiting consumer can wake up;
- `notFull` — signalled when an item is removed, so a waiting producer can wake up.

```java
public void put(int value) throws InterruptedException {
    lock.lock();
    try {
        while (items.size() == capacity) {
            notFull.await();
        }
        items.addLast(value);
        notEmpty.signal();
    } finally {
        lock.unlock();
    }
}
```

Three details make this correct:

1. **`await()` instead of `wait()`** — `Condition.await()` works with the explicit lock
   and cannot be called without holding it. It releases the lock while the thread sleeps
   and re-acquires it before returning.
2. **The condition is checked in a `while` loop** — `signal()` wakes one waiter, but
   another thread may have taken the slot in the meantime, and the wake-up may be
   spurious. The loop re-checks the real state.
3. **`unlock()` in a `finally` block** — an exception inside the critical section must
   not leave the lock held forever.

**Two conditions, not one.** With a single condition, a producer woken up by a consumer
would find the queue still full and go back to sleep — correct but wasteful, and it can
starve. With two conditions, each waiter is woken for the reason it is waiting for.

**Fairness.** `new ReentrantLock(true)` hands the lock to the longest-waiting thread
first, which keeps the order of the queue predictable.

## Dry Run

`capacity = 2`. The driver uses `offer` / `poll`, so no thread ever blocks here; the
blocking behaviour is shown in the second table.

| Step | Command | Queue before | Lock held by | Action | Queue after | Result | Output |
|---:|---|---|---|---|---|---|---|
| 1 | `put 1` | `[]` | main | `size (0) == capacity (2)`? no → add, `notEmpty.signal()` | `[1]` | accepted | `1` |
| 2 | `put 2` | `[1]` | main | `size (1) == capacity (2)`? no → add | `[1, 2]` | accepted | `2` |
| 3 | `put 3` | `[1, 2]` | main | `size (2) == capacity (2)`? **yes** → return `false` | `[1, 2]` | rejected | `-1` |
| 4 | `take` | `[1, 2]` | main | empty? no → poll `1`, `notFull.signal()` | `[2]` | value `1` | `1` |
| 5 | `take` | `[2]` | main | empty? no → poll `2` | `[]` | value `2` | `2` |

### The blocking behaviour — a producer that has to wait

`capacity = 1`, one consumer:

| Step | Thread | Lock state | Condition | Action | Queue |
|---:|---|---|---|---|---|
| 1 | T1 (producer) | held by T1 | — | `put 1`: `size 0 < 1` → add, signal `notEmpty` | `[1]` |
| 2 | T2 (producer) | held by T2 | — | `put 2`: `size 1 == 1` → `notFull.await()` → **releases the lock** | `[1]` |
| 3 | T3 (consumer) | held by T3 | — | `take 1`: not empty → poll `1`, `notFull.signal()` | `[]` |
| 4 | T2 | re-acquired | `notFull` | wakes up, re-checks `size 0 < 1` → true → add `2` | `[2]` |

Step 4 is the point of the whole design: the producer was asleep, the consumer freed a
slot and signalled, and the producer re-checked the condition under the lock before
acting.

## Java Solution

See [`BoundedBlockingQueue.java`](./BoundedBlockingQueue.java).

```java
public void put(int value) throws InterruptedException {
    lock.lock();
    try {
        while (items.size() == capacity) {
            notFull.await();               // releases the lock while waiting
        }
        items.addLast(value);
        notEmpty.signal();
    } finally {
        lock.unlock();
    }
}

public int take() throws InterruptedException {
    lock.lock();
    try {
        while (items.isEmpty()) {
            notEmpty.await();
        }
        int value = items.pollFirst();
        notFull.signal();
        return value;
    } finally {
        lock.unlock();
    }
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(1) per operation | one lock acquisition plus a constant number of deque operations |
| **Space** | O(capacity) | the items plus the lock's wait sets |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Why two conditions instead of one?"* → so that a producer is never woken up by a
  consumer's signal and vice versa; with one condition the wake-ups are wasted and
  starvation is possible.
- *"Why `while` and not `if`?"* → spurious wake-ups and lost wake-ups: the condition must
  be re-checked under the lock.
- *"What is `signalAll` for?"* → when several waiters can make progress (e.g. a
  `takeAll`); with one permit only one can proceed, so `signal` is enough.
- *"How would you add a `peek` and a `size`?"* → both are trivial under the same lock;
  `size` must be read under the lock to be meaningful.
- *"How does `ArrayBlockingQueue` implement this?"* → exactly this, with a `ReentrantLock`
  and a `Condition` per non-empty/non-full state.

**Common mistakes:**
- ❌ Using `if` instead of `while` around `await()`.
- ❌ Calling `await()` without holding the lock → `IllegalMonitorStateException`.
- ❌ Forgetting the `finally { lock.unlock(); }` → the lock is leaked on an exception.
- ❌ Signalling the wrong condition.
- ❌ Using a non-reentrant `synchronized` block with `wait()` inside a `while` that also
  calls a helper method which needs the lock.

**How to narrate:**
> "One `ReentrantLock` guards the deque, and two conditions express the two reasons a
> thread may have to sleep: `notFull` for the producer and `notEmpty` for the consumer.
> `await` releases the lock while the thread waits, and the condition is always checked
> in a `while` loop, because a signalled thread may find that another thread was faster.
> The unlock happens in a `finally` block so an exception cannot leak the lock."

## Related Problems

- [Producer–Consumer](./ProducerConsumer.md) — the application of this queue
- [Semaphore](../design/SemaphoreClass.java) — the same
  `while` + `wait`/`notifyAll` pattern with a monitor
- [Atomic Counter](./AtomicCounter.md) — the lock-free alternative for a single counter
