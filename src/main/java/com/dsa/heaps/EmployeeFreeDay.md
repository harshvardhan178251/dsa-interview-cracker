---
title: Employee Free Day
leetcode: 1497
difficulty: Medium
patterns: [Greedy, Interval scheduling, Bounded heap]
companies: [Amazon, Meta, Google, Microsoft, Uber]
frequency: 3
tags: [greedy, intervals, heap, scheduling]
sampleInput: |
  8
  1 2 1
  2 3 1
  3 4 1
  3 5 1
  1 3 2
  2 4 2
  3 5 2
  4 6 2
sampleOutput: "4"
---

# Employee Free Day — LeetCode 1497

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Greedy · Interval scheduling · Bounded heap |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber |

## Problem Statement

Every event has a start day, an end day and the id of the employee who wants to attend
it. An employee may attend several events as long as **no two of them overlap**, and the
days are **inclusive** — `[1, 2]` and `[2, 3]` *do* overlap.

Return the maximum **total** number of events that all employees can attend together.

For the sample, employee `1` can attend `[1,2]` and `[3,4]`, employee `2` can attend
`[1,3]` and `[4,6]` — four events in total.

## Input Format

The program reads from standard input:

```
n
start end employeeId
...
```

- `n` — the number of events (1 ≤ n ≤ 10⁵)
- one line per event: its start day, its end day and the employee id

## Sample Input

```
8
1 2 1
2 3 1
3 4 1
3 5 1
1 3 2
2 4 2
3 5 2
4 6 2
```

## Expected Output

```
4
```

## Approach — Greedy per employee, tracked by a max-heap

The employees do not compete with each other, so the problem splits into one
**interval scheduling** problem per employee, and the answers are added up.

For one employee the classic greedy is:

> Always take the event that **finishes earliest**, then continue with the events that
> start strictly after it.

So: sort the employee's events by **end day** and scan them.

The heap plays the role of the "last accepted end day" pointer. It stores the end days
of the events that were accepted:

- the heap's **maximum** is the end day of the last accepted event — the next event must
  start strictly after it;
- the heap's **size** is the number of accepted events, i.e. this employee's answer.

The inclusive-interval rule is the detail people get wrong: an event may only follow
another one when `next.start > lastEnd` — **strictly** greater, because the end day
still belongs to the earlier event.

## Dry Run

Input: the eight events above

Employee `1` has `[1,2] [2,3] [3,4] [3,5]`, sorted by end day:

| Step | event | last accepted end | decision | heap (max-heap of accepted end days) |
|---:|---|---|---|---|
| 1 | `[1,2]` | — | **take** (2 > ∞) | `[2]` |
| 2 | `[2,3]` | 2 | skip (2 is not > 2) | `[2]` |
| 3 | `[3,4]` | 2 | **take** (3 > 2) | `[4, 2]` |
| 4 | `[3,5]` | 4 | skip (3 is not > 4) | `[4, 2]` |

Employee `1` attends 2 events.

Employee `2` has `[1,3] [2,4] [3,5] [4,6]`, sorted by end day:

| Step | event | last accepted end | decision | heap |
|---:|---|---|---|---|
| 1 | `[1,3]` | — | **take** | `[3]` |
| 2 | `[2,4]` | 3 | skip (2 is not > 3) | `[3]` |
| 3 | `[3,5]` | 3 | skip (3 is not > 3) | `[3]` |
| 4 | `[4,6]` | 3 | **take** (4 > 3) | `[6, 3]` |

Employee `2` attends 2 events. **Total = 2 + 2 = 4** ✓

## Java Solution

See [`EmployeeFreeDay.java`](./EmployeeFreeDay.java).

```java
MaxHeap<Integer> accepted = new MaxHeap<>();
for (int[] event : employeeEvents) {
    if (accepted.isEmpty() || accepted.peek() < event[0]) {
        accepted.add(event[1]);
    }
}
total += accepted.size();
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log n) | sorting the events, then O(log n) per accepted event |
| **Space** | O(n) | the events grouped per employee plus the heap |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Are the intervals really inclusive?"* → check the statement: LeetCode 1497 says
  `e1 < s2`, so `[1,2]` and `[2,3]` overlap. Getting this wrong silently changes the
  answer.
- *"What if one employee could attend several events at once?"* → then it is not a
  per-employee problem any more; you need a max-flow / matching formulation.
- *"What if you also wanted the actual schedule?"* → keep the accepted events in a list
  next to the heap, not just their end days.
- *"What if the employees must all attend the same number of events?"* → a fairness
  constraint turns the independent per-employee problems into a balancing problem.

**Common mistakes:**
- ❌ Using `start >= lastEnd` instead of `start > lastEnd` → the inclusive end day
  double-books the event.
- ❌ Sorting by **start** day instead of **end** day → the classic interval-scheduling
  greedy fails; the earliest-*end* event is the one that leaves room for the most.
- ❌ Forgetting that the answer is a **sum over employees**, not a maximum.

**How to narrate:**
> "Each employee is independent, so I solve the problem per employee and add the
> results. For one employee this is classic interval scheduling: sort the events by end
> day and take an event whenever it starts strictly after the last accepted one — the
> end day is inclusive, so the comparison has to be strict. I keep the accepted end days
> in a max-heap: its maximum is the end day of the last accepted event and its size is
> the number of events this employee attends."

## Related Problems

- [Merge Intervals](../intervals/MergeIntervals.md) — the same greedy, different question
- [Meeting Rooms II](../intervals/MeetingRoomsII.md) — maximum concurrent events
- [Task Scheduler](TaskScheduler.md) — greedy scheduling with a cooldown
- [Top K Frequent Elements](TopKFrequentElements.md) — a bounded heap
