---
title: Josephus Problem
leetcode: null
difficulty: Medium
patterns: [Recurrence, Simulation]
companies: [Amazon, Google, Meta, Microsoft, Uber]
frequency: 3
tags: [math, recurrence, circular, linked-list]
sampleInput: |
  7
  3
sampleOutput: "3"
---

# Josephus Problem

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Recurrence · Simulation |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber |

## Problem Statement

`n` people stand in a circle, numbered `0` to `n - 1`. Starting at person `0`, count `k`
people and remove the last one; continue counting from the next person. Which person is left
last?

- `n = 7, k = 3` → the survivor is person `3` (the 4th person).
- `n = 1` → the survivor is person `0`.
- `k = 1` → people are removed in order, so the survivor is person `n - 1`.

The program prints the **0-based index** of the survivor.

## Input Format

The program reads from standard input:

```
n
k
```

- `n` — the number of people (1 ≤ n ≤ 10⁶)
- `k` — the counting step (1 ≤ k ≤ 10⁶)

## Sample Input

```
7
3
```

## Expected Output

```
3
```

The elimination order is `2, 5, 1, 6, 4, 0`, so person `3` survives. ✓

## Approach — The O(n) Recurrence

A simulation with a linked list takes O(n · k) time — with `k = 10⁶` that is hopeless. The
classic trick is to notice that the answer for `n` people is the answer for `n - 1` people
**rotated**.

Let `J(m)` be the 0-based index of the survivor among `m` people. The first person removed
is `(k - 1) % m`. Relabel the circle so that the person *after* the removed one becomes
person `0` — then the remaining `m - 1` people are exactly the same problem, and the
survivor's position in the new labelling is `J(m - 1)`. Undoing the relabelling shifts
every position by `k`:

```
J(1) = 0
J(m) = (J(m - 1) + k) % m
```

Computing this bottom-up is a single loop of `n` iterations, each O(1) — O(n) time, O(1)
space.

**Why the shift is `k` and not `k - 1`:** the new person 0 is the old person `k % m`, so
old position = new position + `k` (mod `m`).

## Dry Run

Input: `n = 7`, `k = 3`

| Step | `size` (m) | `J(m - 1)` | `J(m) = (J(m - 1) + k) % m` | note |
|---:|---:|---:|---:|---|
| 1 | `1` | — | `0` | base case: one person survives |
| 2 | `2` | `0` | `(0 + 3) % 2 = 1` | |
| 3 | `3` | `1` | `(1 + 3) % 3 = 1` | |
| 4 | `4` | `1` | `(1 + 3) % 4 = 0` | |
| 5 | `5` | `0` | `(0 + 3) % 5 = 3` | |
| 6 | `6` | `3` | `(3 + 3) % 6 = 0` | |
| 7 | `7` | `0` | `(0 + 3) % 7 = 3` | **answer: person 3** |

The loop keeps only the previous value, so the memory used is a single int. ✓

### Cross-check with the simulation for `n = 7, k = 3`

| Round | circle before | removed | circle after |
|---:|---|---|---|
| 1 | `0 1 2 3 4 5 6` | `2` | `0 1 3 4 5 6` (counting restarts at 3) |
| 2 | `0 1 3 4 5 6` | `5` | `0 1 3 4 6` |
| 3 | `0 1 3 4 6` | `1` | `0 3 4 6` |
| 4 | `0 3 4 6` | `6` | `0 3 4` |
| 5 | `0 3 4` | `4` | `0 3` |
| 6 | `0 3` | `0` | `3` |

The last person standing is `3` — the same answer the recurrence gives. ✓

## Java Solution

See [`JosephusProblem.java`](./JosephusProblem.java).

```java
public static int josephus(int n, int k) {
    int survivor = 0;                 // J(1, k) = 0
    for (int size = 2; size <= n; size++) {
        survivor = (survivor + k) % size;
    }
    return survivor;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One iteration per person |
| **Space** | O(1) | A single variable holds the running answer |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Make it work for huge `n`."* → the recurrence is already O(n); for `n` up to 10¹⁸ use
  the matrix-exponentiation variant, or the fact that `J(n) = n - 1` for `k = 1`.
- *"What if the counting starts at person 1?"* → add 1 to the 0-based answer.
- *"What if `k` is fixed and `n` varies — can you precompute?"* → yes, the recurrence gives
  every `J(m)` for `m = 1..n` in one pass.
- *"Can you do it with a linked list?"* → yes: a circular list and `k - 1` steps per
  removal — O(n·k), which is exactly why the recurrence is the better answer.

**Common mistakes:**
- ❌ Using `(survivor + k - 1) % size` → off by one; the shift is `k`, not `k - 1`.
- ❌ Starting the loop at `size = 1` with the base case `J(1) = 1` → mixing 1-based and
  0-based indexing.
- ❌ Forgetting the modulo → the running value grows without bound.

**How to narrate:**
> "A simulation is O(n·k) and too slow. I use the recurrence: with one person the survivor
> is 0, and going from m-1 people to m people is just a rotation by k, so
> `J(m) = (J(m-1) + k) % m`. I compute it bottom-up in one loop, keeping a single variable.
> O(n) time and O(1) space."

## Related Problems

- [Rotate List](RotateList.md) — the same circle, a different cut
- [Linked List Cycle](DetectCycle.md) — circular list detection
- [Game of Life](../../../../../../docs/topics/17-dynamicprogramming.md) — the same "reduce to a smaller circle" idea
