---
title: Semaphore
leetcode: null
difficulty: Medium
patterns: [Design, Concurrency, Condition variables]
companies: [Amazon, Netflix]
frequency: 3
tags: [concurrency, synchronized, wait notify]
sampleInput: |
  2
  5
  acquire
  acquire
  release
  acquire
  release
sampleOutput: |
  1
  0
  1
  0
  1
---

# Semaphore

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Design · Concurrency · Condition variables |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Implement a **counting semaphore**:

- `acquire()` takes a permit. If no permit is free the calling thread **blocks** until
  one is released.
- `release()` gives a permit back and wakes up a waiting thread.
- The semaphore never holds more permits than it was created with.

The number of permits still available must be observable, because that is what a test
(and an interviewer) wants to see.

## Input Format

```
permits
n
acquire
release
...
```

- `permits` — the number of permits the semaphore starts with.
- `n` — the number of commands.
- `acquire` — take a permit (blocks while none is free).
- `release` — give a permit back.

The program prints one line per command: the number of permits still available. The
driver uses a bounded wait, so an unbalanced input can never hang it — the printed
number is the same whether the permit was taken or not.

## Sample Input

```
2
5
acquire
acquire
release
acquire
release
```

## Expected Output

```
1
0
1
0
1
```

## Approach — a monitor, one condition variable and a `while` loop

The permit count is the shared state, so it is guarded by the instance monitor
(`synchronized`).

```java
public synchronized void acquire() throws InterruptedException {
    while (available == 0) {
        wait();                       // releases the monitor, waits to be notified
    }
    available--;
}
```

- `wait()` **releases the monitor** while the thread sleeps, so other threads can enter
  the critical section — that is what makes the whole thing work instead of deadlocking.
- `release()` increments the count and calls `notifyAll()`, waking the waiting threads.
- The condition is checked in a **`while`** loop, never an `if`: a thread can be woken up
  spuriously, and `notifyAll` wakes *all* waiters while only one permit may exist, so the
  losers have to go back to sleep.

`notifyAll` is used instead of `notify` because `release` does not know which waiter is
eligible; waking everybody and letting the `while` loop sort it out is the safe pattern.

## Dry Run

`permits = 2`. The "state" column is the value of `available` while the monitor is held.

| Step | Command | `available` before | Waiters | Action | `available` after | Waiters notified | Output |
|---:|---|---:|---:|---|---:|---|---|
| 1 | `acquire` | 2 | 0 | `available > 0` → take it | 1 | — | `1` |
| 2 | `acquire` | 1 | 0 | `available > 0` → take it | 0 | — | `0` |
| 3 | `release` | 0 | 0 | `available++`, `notifyAll()` (nobody waiting) | 1 | — | `1` |
| 4 | `acquire` | 1 | 0 | `available > 0` → take it | 0 | — | `0` |
| 5 | `release` | 0 | 0 | `available++`, `notifyAll()` (nobody waiting) | 1 | — | `1` |

### What happens when a thread has to wait

With `permits = 1` and two threads:

| Step | Thread | Action | `available` | Waiter set |
|---:|---|---|---:|---|
| 1 | T1 | `acquire` → takes the only permit | 0 | `{}` |
| 2 | T2 | `acquire` → `available == 0` → `wait()` (monitor released) | 0 | `{T2}` |
| 3 | T1 | `release` → `available = 1`, `notifyAll()` | 1 | T2 wakes up, re-checks the loop |
| 4 | T2 | loop condition true → `available--` | 0 | `{}` |

The `while` loop is what makes step 3 safe: `notifyAll` woke T2, but T2 still had to
re-check that a permit was really available before taking it.

## Java Solution

See [`SemaphoreClass.java`](./SemaphoreClass.java).

```java
public synchronized void acquire() throws InterruptedException {
    while (available == 0) {
        wait();
    }
    available--;
}

public synchronized void release() {
    if (available >= permits) {
        throw new IllegalStateException("released more permits than were acquired");
    }
    available++;
    notifyAll();
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(1) when no thread waits, O(w) to wake a waiter | one monitor acquisition, one `notifyAll` |
| **Space** | O(1) | the permit count plus the monitor's wait set |

## Interview Notes

**Follow-ups to raise yourself:**
- *"How is this different from a lock?"* → a lock allows one owner, a semaphore counts
  permits; a binary semaphore with one permit is a mutex that has no owner.
- *"What is a fair semaphore?"* → one that hands the permits out in FIFO order of the
  waiting threads (Java's `Semaphore` is not fair by default, the constructor takes a
  `fair` flag).
- *"How would you implement it without `synchronized`?"* → a `ReentrantLock` plus two
  `Condition`s, exactly like the
  [Bounded Blocking Queue](../concurrency/BoundedBlockingQueue.java).
- *"What is the difference between `notify` and `notifyAll`?"* → `notify` wakes one
  arbitrary waiter, which can cause a lost wake-up if that waiter is not the right one.

**Common mistakes:**
- ❌ Using `if (available == 0)` instead of `while` — the classic bug; a woken thread
  takes a permit that is no longer there.
- ❌ Calling `wait()` outside the monitor, or `notifyAll()` on the wrong object.
- ❌ Not catching `InterruptedException` — `wait()` throws it, and swallowing it loses the
  interrupt.
- ❌ Releasing more permits than were acquired → the semaphore grows without bound.

**How to narrate:**
> "A counting semaphore is a shared counter guarded by a monitor. `acquire` waits while
> the counter is zero — inside a `while` loop, because `notifyAll` can wake several
> threads for one permit and because wake-ups can be spurious. `release` increments the
> counter and notifies the waiters. `wait` gives up the monitor while sleeping, which is
> exactly what lets the releasing thread get in."

## Related Problems

- [Bounded Blocking Queue](../concurrency/BoundedBlockingQueue.java)
  — the same idea with two conditions
- [Producer–Consumer](../concurrency/ProducerConsumer.java) — the
  classic application of a semaphore
- [Min Max Stack](./MinMaxStack.md) — the non-concurrent half of this repository
