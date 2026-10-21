---
title: Concurrency — concept notes
order: 24
summary: The Java concurrency tools an interview actually tests — happens-before, the memory model, and how to write a correct producer-consumer.
---

# Concurrency — concept notes

## The mental model

**The Java Memory Model (JMM)** says that without synchronisation, a thread may see
stale values or reorder operations. The `synchronized` keyword, `volatile`, and the
`java.util.concurrent` classes establish **happens-before** relationships.

| Mechanism | Guarantees |
|---|---|
| `synchronized` | Mutual exclusion **and** happens-before (unlock → lock) |
| `volatile` | Visibility and ordering, **not** atomicity of compound operations |
| `AtomicInteger` | Atomic compound operations on one variable |
| `ReentrantLock` | Mutual exclusion + explicit conditions; **must** `unlock` in a `finally` |
| `CountDownLatch` | Wait for N events to complete |
| `ConcurrentHashMap` | Thread-safe map, much better than `synchronizedMap` |
| `ExecutorService` | Thread pool management |
| `CompletableFuture` | Async composition |

---

## The three problems concurrency causes

1. **Race condition** — two threads read and write shared state without synchronisation.
2. **Visibility problem** — a thread's write is never seen by another thread.
3. **Atomicity problem** — a compound operation (`count++`) is not atomic.

**`count++` is three steps:** read, add, write. Two threads can interleave and lose an
update.

---

## `volatile` vs `synchronized` vs `AtomicInteger`

**`volatile`** — guarantees that a write is visible to other threads, and that
reads/writes are not reordered around it. It does **not** make compound operations
atomic.

```java
private volatile boolean running = true;      // correct for a flag
private volatile int count;                   // WRONG for counting
```

**`volatile int count++`** is still broken — the read-modify-write is not atomic.

**`AtomicInteger`** — lock-free atomic operations on a single variable:

```java
private final AtomicInteger counter = new AtomicInteger();
counter.incrementAndGet();       // atomic
counter.addAndGet(5);
counter.compareAndSet(expected, update);      // CAS
```

**`AtomicInteger` vs `synchronized` vs `LongAdder`:**

| | AtomicInteger | `synchronized` | LongAdder |
|---|---|---|---|
| Contention | Scales well (CAS) | Poor — one lock | Best under high contention |
| Overhead | Low | Higher (park/unpark) | Low per op, higher memory |
| Use for | General counters | Complex invariants | Write-heavy counters |

**LongAdder** uses striped cells — under heavy contention, threads hit different cells
and rarely collide. It is not atomic across multiple operations, so it is only for
counters.

---

## The producer-consumer problem

**The canonical concurrency interview question.**

```java
public class BoundedBlockingQueue<T> {
    private final Object lock = new Object();
    private final Queue<T> queue;
    private final int capacity;
    private int count = 0;

    public void put(T item) throws InterruptedException {
        synchronized (lock) {
            while (count == capacity) {
                lock.wait();              // release the lock and wait
            }
            queue.add(item);
            count++;
            lock.notifyAll();            // a consumer may be waiting
        }
    }

    public T take() throws InterruptedException {
        synchronized (lock) {
            while (count == 0) {
                lock.wait();
            }
            T item = queue.poll();
            count--;
            lock.notifyAll();            // a producer may be waiting
            return item;
        }
    }
}
```

### The three rules that make it correct

**1. `while`, not `if`.**

```java
while (count == capacity) {
    lock.wait();
}
```

**This is the single most important rule.** `wait()` releases the lock, so another
thread can change the state before you reacquire it. When you wake up, the condition
may no longer hold — or may hold *because of a different thread's action*. With `if`, you
would proceed with an invalid assumption.

**Spurious wakeups** are also a real thing: `wait()` may return without a `notify`.

**2. Always call `notifyAll()` (or `notify()`) after changing the state.**

**3. Hold the lock while checking the condition and modifying the state.**

**The `while` + `wait`/`notifyAll` trio is the entire pattern.** Everything else is
detail.

### `notify()` vs `notifyAll()`

**`notifyAll()` is almost always correct.** `notify()` wakes one arbitrary waiting
thread, which may not be the one whose condition is now satisfied — leading to a
deadlock or a hang.

**Use `notifyAll()` unless you can prove exactly one waiter can proceed.**

**The deadlock scenario:** two consumers wait; `notify()` wakes the wrong one; the
woken consumer finds the queue empty and waits again; the other consumer is never
woken even though an item was added. With `notifyAll()`, both wake, one consumes, the
other goes back to waiting. Correct.

---

## Deadlock

**Four conditions, all of which must hold:**

1. **Mutual exclusion** — a resource is held exclusively.
2. **Hold and wait** — a thread holds one resource while waiting for another.
3. **No preemption** — resources cannot be forcibly taken.
4. **Circular wait** — thread A waits for B's resource while B waits for A's.

**Breaking any one prevents deadlock.**

**The most common fix: impose a global lock ordering.** If every thread acquires
resources in the same order, a circular wait cannot form.

**Prevention in code:**
- Use a single lock instead of nested locks where possible.
- Use `tryLock()` with a timeout instead of `lock()`.
- Use `try-with-resources` for acquiring multiple locks (it releases in reverse order).
- Use concurrent collections instead of manual locking.

---

## `ExecutorService` and thread pools

```java
ExecutorService pool = Executors.newFixedThreadPool(8);
try {
    Future<Integer> future = pool.submit(() -> computeSomething());
    int result = future.get();          // blocks
} finally {
    pool.shutdown();
}
```

**Always shut the pool down.** `shutdown()` lets queued tasks finish;
`shutdownNow()` interrupts them.

**`Future.get()` throws `InterruptedException`, `ExecutionException`.** Handle both.

**`invokeAll`** takes a list of callables and returns a list of futures.
**`invokeAny`** returns the first successful result.

**The pool size:** for CPU-bound work, `n_cores + 1`. For IO-bound work, more —
`n_cores × (1 + wait/service ratio)`.

**Why a pool rather than raw threads:** thread creation is expensive, and an unbounded
thread creation is a denial-of-service vector.

---

## `CountDownLatch`

**Wait for N things to finish.**

```java
CountDownLatch latch = new CountDownLatch(3);
for (int i = 0; i < 3; i++) {
    pool.submit(() -> {
        try {
            doWork();
        } finally {
            latch.countDown();       // ALWAYS in a finally
        }
    });
}
latch.await();      // returns when the count reaches 0
```

**`countDown()` in a `finally`** — otherwise an exception in the task leaves the latch
never reaching zero, and `await()` hangs forever.

**A `CountDownLatch` is one-shot.** For a reusable barrier, use `CyclicBarrier` or
`Phaser`.

---

## `CompletableFuture`

**For async composition rather than just waiting.**

```java
CompletableFuture<String> future = CompletableFuture
        .supplyAsync(() -> fetchData(), executor)
        .thenApply(data -> transform(data))
        .thenCompose(data -> fetchMore(data))
        .exceptionally(ex -> "fallback");
```

**The callback methods run on the completing thread** (or the common pool). Pass an
explicit `Executor` for `supplyAsync` in production, so you do not use the common pool
for blocking work.

**`allOf` and `anyOf`** for combining futures.

---

## `ConcurrentHashMap`

**The right concurrent map.** In Java 8+ it uses a lock-free read path (CAS on the
head node) and a per-bin lock for writes. It does **not** allow `null` keys or values
(because `get` returning `null` would be ambiguous with "absent").

**`computeIfAbsent`** is atomic per key:

```java
ConcurrentHashMap<String, List<String>> map = new ConcurrentHashMap<>();
map.computeIfAbsent(key, k -> new ArrayList<>()).add(value);   // atomic per key
```

**The `ArrayList` inside is still not thread-safe** — `computeIfAbsent` guarantees the
mapping function runs once per key, but concurrent `add` calls on the returned list are
still a problem. Use `CopyOnWriteArrayList` or a concurrent set for that.

**`synchronizedMap`** is a wrapper with a single lock — correct but slow under
contention.

---

## Volatile, atomic and the memory model

**The JMM's guarantees:**

- **Program order** — within a thread, operations appear in order.
- **Synchronization order** — a `unlock` happens-before the subsequent `lock` on the
  same monitor.
- **Volatile order** — a write to a volatile field happens-before any subsequent read
  of it.
- **Thread start** — everything the starting thread did happens-before the started
  thread's actions.
- **Thread termination** — everything in a terminated thread happens-before another
  thread detects its termination.

**The practical consequence:** if thread A writes to a plain field and thread B reads
it, B may see a stale value or see the write out of order. If the field is `volatile`,
B sees the latest write.

**`volatile` does not make `i++` atomic** — it makes each individual read and write
visible and ordered, but the three steps can still interleave.

---

## Common traps

| Trap | Why it bites |
|---|---|
| `if` instead of `while` around `wait()` | Spurious wakeups and lost signals |
| Not calling `notifyAll()` after a state change | The consumer waits forever |
| `notify()` instead of `notifyAll()` | Wakes the wrong thread |
| `countDown()` not in a `finally` | An exception leaves the latch hanging |
| `volatile` on a counter | `count++` is still not atomic |
| Not shutting down the executor | Threads leak |
| Using the common pool for blocking work | Starves every other task |
| `ConcurrentHashMap` with a `null` value | Throws `NullPointerException` |
| Modifying a collection inside `computeIfAbsent` | Deadlock or `IllegalStateException` |
| Assuming `synchronized` on one object protects another | It does not |
| Swapping two fields without a lock | Readers can see them inconsistent |

---

## Complexity cheat sheet

| Operation | Cost |
|---|---|
| `AtomicInteger.incrementAndGet` | O(1), lock-free |
| `synchronized` uncontended | Fast (biased/thin locks) |
| `synchronized` contended | Slow (park and unpark) |
| `CountDownLatch.await` | Blocks until the count is 0 |
| `Future.get` | Blocks |
| `LongAdder.increment` | O(1) amortised, scales under contention |

---

## How to crack it in an interview

1. **Identify the shared state and the invariant** that must hold.
2. **Choose the primitive:** `synchronized` for compound invariants, `Atomic*` for a
   single variable, `volatile` for a flag, a concurrent collection for a shared map.
3. **For a producer-consumer, say the three rules:** `while` not `if`, `notifyAll`
   after every state change, hold the lock while checking and mutating.
4. **Say how the threads terminate.** A concurrency solution that never finishes is
   wrong.
5. **Make the output deterministic** — join the threads and collect results in order.
6. **Mention the failure modes** — deadlock, starvation, lost wakeups, and how your
   design avoids them.
