---
title: Task Scheduler
leetcode: 621
difficulty: Medium
patterns: [Greedy, Max-heap, Cooldown, Frequency counting]
companies: [Amazon, Meta, Google, Microsoft, Uber, Google]
frequency: 5
tags: [heap, greedy, scheduling, frequency]
sampleInput: |
  6
  A A B C D D
  2
sampleOutput: "6"
---

# Task Scheduler — LeetCode 621

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Greedy · Max-heap · Cooldown · Frequency counting |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber |

## Problem Statement

Given a list of tasks (uppercase letters) and a cooldown `k`, the same task may not run
twice within `k` slots. Return the **minimum number of slots** needed to run all the
tasks.

For `tasks = [A, A, B, C, D, D]` and `k = 2` the answer is `6`:

```
A B C D A D
```

`A` runs in slots 1 and 5 (three slots apart), `D` in slots 4 and 6.

## Input Format

The program reads from standard input:

```
n
task0 task1 ... task(n-1)
k
```

- `n` — the number of tasks (1 ≤ n ≤ 26²)
- the n task letters, whitespace separated
- `k` — the cooldown: the same task may not repeat within k slots (0 ≤ k ≤ n)

## Sample Input

```
6
A A B C D D
2
```

## Expected Output

```
6
```

## Approach — Always run the most urgent task

The task with the **most remaining occurrences** is the one that needs the most room, so
it is always the safest to run now.

- A **max-heap** holds the remaining count of every task. Its top is the most urgent
  task.
- A small **cooldown queue** holds the tasks that are waiting, together with the number
  of slots they still have to wait.

Each slot:

1. Release the task whose cooldown expired — it goes back into the heap.
2. If the heap is empty, nothing can run: jump forward to the moment the next task
   becomes available (idle slots).
3. Otherwise run the heap's top, decrease its count, and if it still has occurrences put
   it into the cooldown queue.

**Why the greedy is optimal:** the number of slots is forced by the most frequent task.
If `A` appears `f` times, the `f` copies need at least `f + (f − 1) · k` slots, and the
other tasks can be fitted into the gaps. Running the most frequent task first is what
creates those gaps optimally.

## Dry Run

Input: `tasks = [A, A, B, C, D, D]`, `k = 2`

The heap is printed as `task x count`; the cooldown queue as `task/waiting slots`.

| Slot | released | heap before | run | heap after | cooldown after |
|---:|---|---|---|---|---|
| 1 | — | `[Ax2, Dx2, Cx1, Bx1]` | **A** (2 → 1) | `[Dx2, Bx1, Cx1]` | `[Ax1/2]` |
| 2 | — | `[Dx2, Bx1, Cx1]` | **D** (2 → 1) | `[Cx1, Bx1]` | `[Ax1/1, Dx1/2]` |
| 3 | — | `[Cx1, Bx1]` | **C** (1 → 0) | `[Bx1]` | `[Ax1/0, Dx1/1]` |
| 4 | `A` (its counter hit 0) | `[Bx1]` → `[Ax1, Bx1]` | **B** (1 → 0) | `[Ax1]` | `[Dx1/0]` |
| 5 | `D` (its counter hit 0) | `[Ax1]` → `[Ax1, Dx1]` | **A** (1 → 0) | `[Dx1]` | `[]` |
| 6 | — | `[Dx1]` | **D** (1 → 0) | `[]` | `[]` |

Six slots, and no task repeats within two slots ✓ (`A` in slots 1 and 5, `D` in slots 2
and 6).

## Java Solution

See [`TaskScheduler.java`](./TaskScheduler.java).

```java
MaxHeap<Task> heap = new MaxHeap<Task>((a, b) -> Integer.compare(a.remaining, b.remaining));
Deque<Cooldown> cooling = new ArrayDeque<>();
int slots = 0;

while (!heap.isEmpty()) {
    if (!cooling.isEmpty() && cooling.peek().remaining == 0) {
        heap.add(cooling.poll().task);
    }
    if (heap.isEmpty()) {
        int wait = cooling.peek().remaining;
        for (Cooldown entry : cooling) {
            entry.remaining -= wait;
        }
        slots += wait;
        continue;
    }
    slots++;
    for (Cooldown entry : cooling) {
        entry.remaining--;
    }
    Task current = heap.poll();
    current.remaining--;
    if (current.remaining > 0) {
        cooling.addLast(new Cooldown(k, current));
    }
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log m) | m distinct tasks, one heap operation per slot |
| **Space** | O(m) | the heap and the cooldown queue hold one entry per distinct task |

**Closed form (O(n), O(1) space):** with `f` = the largest frequency and `c` = the number
of tasks having that frequency, the answer is

```
max(n, (f − 1) × (k + 1) + c)
```

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you give me a formula instead of a simulation?"* → yes:
  `max(n, (f − 1) × (k + 1) + c)`.
- *"What if the tasks had different cooldowns?"* → the heap simulation still works, but
  the closed form does not; you need the "release the earliest available task" rule.
- *"What if the task list is a stream?"* → the same simulation, one task at a time.
- *"Why is running the most frequent task first optimal?"* → the most frequent task
  determines the number of "frames"; filling every frame with as many different tasks as
  possible minimises the total.

**Common mistakes:**
- ❌ Running the task with the **least** remaining count → the frequent tasks then pile
  up at the end and the answer grows.
- ❌ Forgetting the **idle jump** when the heap is empty → the loop either ends early
  (wrong count) or spins forever.
- ❌ Decrementing the cooldown counters in the wrong order → a task is released one slot
  too early and the schedule becomes invalid.
- ❌ Treating the cooldown as "k tasks in between" instead of "k slots apart" → off by
  one on every repetition.

**How to narrate:**
> "The task with the most occurrences left is the most urgent, so I always run the top
> of a max-heap of remaining counts. A task that was just run goes into a cooldown queue
> with the number of slots it has to wait; when that counter hits zero it re-enters the
> heap. If the heap is empty while tasks are cooling down, I jump straight to the next
> release instead of burning slots one by one. The heap simulation also mirrors the
> closed form `max(n, (f−1)(k+1)+c)`."

## Related Problems

- [Reorganize String](ReorganizeString.md) — the same cooldown idea
- [Employee Free Day](EmployeeFreeDay.md) — greedy scheduling
- [Top K Frequent Elements](TopKFrequentElements.md) — frequency counting
- [Find Median from Data Stream](FindMedianFromDataStream.md) — two heaps
