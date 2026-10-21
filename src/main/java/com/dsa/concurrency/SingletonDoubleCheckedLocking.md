---
title: Singleton with Double-Checked Locking
leetcode: null
difficulty: Medium
patterns: [Concurrency, Double-checked locking, Safe publication]
companies: [Google, Netflix, Adobe]
frequency: 4
tags: [concurrency, singleton, volatile, dcl]
sampleInput: |
  8
sampleOutput: |
  1 0
---

# Singleton with Double-Checked Locking

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Concurrency · Double-checked locking · Safe publication |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Oracle |

## Problem Statement

Create a thread safe singleton with the classic **double-checked locking** pattern:

- the fast path reads the instance field **without taking a lock**,
- the slow path takes the class lock and checks the field **again** before creating the
  instance.

The pattern is only correct if the field is `volatile`. Explain why, and show that the
instance is created exactly once and that no thread ever observes a partially constructed
object.

## Input Format

```
n
```

- `n` — the number of threads that race for the instance.

The program prints two numbers:

1. the number of **distinct instances** the threads observed — with a correct
   implementation this is always `1`;
2. the number of threads that saw a **partially constructed** instance — with a correct
   implementation this is always `0`.

## Sample Input

```
8
```

## Expected Output

```
1 0
```

Eight threads race for the instance; exactly one instance exists and every thread sees
the fully constructed object.

## Approach — double check plus `volatile`

```java
private static volatile SingletonDoubleCheckedLocking instance;

public static SingletonDoubleCheckedLocking getInstance() {
    if (instance == null) {                 // 1st check: no lock, the fast path
        synchronized (SingletonDoubleCheckedLocking.class) {
            if (instance == null) {         // 2nd check: under the lock
                instance = new SingletonDoubleCheckedLocking();
            }
        }
    }
    return instance;
}
```

The first check makes the *steady state* (the instance already exists) lock-free: after
the initialisation, every caller only does a volatile read.

### Why `volatile` is not optional

Without `volatile`, the write `instance = new SingletonDoubleCheckedLocking()` can be
**reordered** by the compiler and the CPU so that it becomes visible *before* the
constructor has finished writing the fields. A second thread can then see a non-null
reference to an object whose fields are still the default values — a *partially
constructed* instance.

`volatile` fixes exactly that:

1. the write to `instance` is a **release** — everything the constructor wrote before it
   is visible to any thread that reads `instance`;
2. the read of `instance` is an **acquire** — the reader is guaranteed to see the
   constructor's writes.

The synchronisation on the class monitor alone is **not** enough, because the fast path
does not take the lock at all.

This is exactly the rule the Java Memory Model states: *"an object is safely published
through a volatile field or through a lock, but not through an unsynchronised field."*

### The demonstration

The constructor writes a `ready` flag **last**. Every thread that receives the instance
checks the flag:

- with `volatile` the flag is always `true` — the instance is fully constructed,
- without `volatile` a thread can observe `ready == false` — the bug is visible.

The program reports both numbers, so the difference is measurable, not just theoretical.

## Dry Run

`n = 8`. The table shows **one valid interleaving**. The rows move from run to run; the
two numbers never do.

| Step | Thread | Fast path `instance == null`? | Monitor | Action | `instance` after | Thread sees `ready` |
|---:|---|---|---|---|---|---|
| 1 | T0 | yes | free | enters the `synchronized` block | `null` | — |
| 2 | T1 | yes | held by T0 | **blocks** on the monitor | `null` | — |
| 3 | T2…T7 | yes | held by T0 | block on the monitor | `null` | — |
| 4 | T0 | — | held by T0 | second check: still `null` → `new SingletonDoubleCheckedLocking()` → constructor runs → `ready = true` | the new instance | — |
| 5 | T0 | — | held by T0 | `instance = new …` (**volatile write** — publishes the constructor's writes), exit the block | the new instance | `true` |
| 6 | T1 | — | acquired | second check: `instance != null` → skip the creation | the new instance | `true` |
| 7 | T2 | **no** — the volatile read sees the instance | free | skip the block entirely, return the instance | the new instance | `true` |
| 8 | T3…T7 | no | free | same as T2 | the new instance | `true` |

Result: **1 distinct instance, 0 partially constructed observations.**

### The same race without `volatile`

| Step | Thread | Action | What T1 can see |
|---:|---|---|---|
| 1 | T0 | `new SingletonDoubleCheckedLocking()` — the reference is stored, the constructor has not finished | — |
| 2 | T1 | reads `instance` — **not null**, so it skips the lock entirely | an instance whose `ready` flag is still `false` |
| 3 | T0 | the constructor finishes, `ready = true` | — |

T1 used the instance before it was fully constructed. With `volatile` the write of
`instance` cannot become visible before the constructor's writes.

## Java Solution

See [`SingletonDoubleCheckedLocking.java`](./SingletonDoubleCheckedLocking.java).

```java
private static volatile SingletonDoubleCheckedLocking instance;

public static SingletonDoubleCheckedLocking getInstance() {
    if (instance == null) {                 // 1st check: no lock
        synchronized (SingletonDoubleCheckedLocking.class) {
            if (instance == null) {         // 2nd check: under the lock
                instance = new SingletonDoubleCheckedLocking();
            }
        }
    }
    return instance;
}
```

The driver releases all the threads at the same time with a `CountDownLatch`, counts the
distinct instances **by identity** (not by `equals`), and counts the threads that saw a
`ready == false` instance.

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(1) after the first call | a volatile read in the fast path |
| **Space** | O(1) | one instance |

## Interview Notes

**Follow-ups to raise yourself:**
- *"How would you do it without `synchronized`?"* → an `enum` singleton (the JVM
  guarantees the initialisation) or an `AtomicReference` with `compareAndSet`.
- *"What is the holder idiom?"* → a static nested class with the instance in a static
  final field; the class initialisation lock guarantees thread safety and laziness, and
  it is the fastest variant.
- *"Does `synchronized` on the method suffice?"* → `public static synchronized getInstance()`
  is correct but **always** takes the lock — the double check exists to avoid that.
- *"Why is the second check inside the lock necessary?"* → without it, two threads could
  both see `null` and both create an instance.
- *"What about reflection and `clone`?"* → the classic ways to break a singleton; the
  answers are an enum, a defensive `readResolve`, or a module system.

**Common mistakes:**
- ❌ Forgetting `volatile` → the broken pattern that looks right and passes a
  single-threaded test.
- ❌ Making the field `final` — `final` does not help here, because the problem is the
  *publication* of a partially constructed object.
- ❌ Using `instance == null` twice but with the check *outside* the lock only.
- ❌ Synchronizing on an instance field instead of the class object.
- ❌ Believing `synchronized getInstance()` on a non-static method works — it would lock
  on different objects.

**How to narrate:**
> "Double-checked locking needs three things: a `volatile` field, the check outside the
> lock for the fast path, and the second check inside the lock. The `volatile` is the
> interesting part: it guarantees that the write of the reference also publishes
> everything the constructor wrote, so no thread can see a half-built object. Without it
> the write of the reference can be reordered before the constructor's writes, and the
> fast path — which takes no lock — can hand out a broken instance."

## Related Problems

- [Atomic Counter](./AtomicCounter.md) — `volatile` versus atomics, the same memory model
- [Bounded Blocking Queue](./BoundedBlockingQueue.md) — the lock and condition pattern
- [Semaphore](../design/SemaphoreClass.java) — the monitor based
  pattern
