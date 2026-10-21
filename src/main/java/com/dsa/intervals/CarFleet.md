---
title: Car Fleet
leetcode: 1491
difficulty: Medium
patterns: [Greedy, Fleet time from the back]
companies: [Meta, Amazon, Bloomberg, Apple, Twitter]
frequency: 4
tags: [array, sorting, greedy]
sampleInput: |
  5
  10 2
  8 4
  0 1
  3 1
  0 1
  12
sampleOutput: "3"
---

# Car Fleet — LeetCode 1491

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Greedy · Fleet time from the back |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg |

## Problem Statement

`n` cars drive towards a target at position `target`. Car `i` starts at `position[i]`
and drives at `speed[i]`. A car that catches up with the car in front of it joins its
fleet and can never go faster than that fleet. Return the number of fleets that reach
the target.

- The cars are given in **descending** order of position (the car closest to the
  target first); the solution sorts them anyway.
- Reaching the target exactly counts as arriving.

## Input Format

The program reads from standard input:

```
n
position[0] speed[0]
position[1] speed[1]
...
position[n-1] speed[n-1]
target
```

- `n` — number of cars (1 ≤ n ≤ 10⁵)
- `position` — start position of each car
- `speed` — speed of each car (positive)
- `target` — the position of the destination

## Sample Input

```
5
10 2
8 4
0 1
3 1
0 1
12
```

## Expected Output

```
3
```

- **Fleet 1** — the car at position `10` (speed 2) arrives at time `1`; the car at
  position `8` (speed 4) would arrive at time `1` as well, so it catches up and joins
  that fleet.
- **Fleet 2** — the car at position `3` (speed 1) arrives at time `9`.
- **Fleet 3** — the two cars at position `0` (speed 1) arrive at time `12`.

## Approach — process the cars from the front backwards

Sort the cars by position **descending** (closest to the target first) and walk
through them. Keep `fleetTime`, the arrival time of the fleet directly ahead.

For a car with arrival time `t = (target - position) / speed`:

- if `t > fleetTime`, the car is slower than the fleet ahead: it catches up and
  joins that fleet → no new fleet;
- if `t <= fleetTime`, the car would arrive **before** the fleet ahead, so it slows
  down and becomes the leader of a **new fleet** → `fleets++` and
  `fleetTime = t`.

**Exchange argument (why the greedy choice is safe):** the fleet ahead of a car is
already decided — its members cannot go faster than the slowest car in it. A car
whose own arrival time is **later** than the fleet's time catches up before the
target and therefore joins it; this is forced, because it cannot overtake. A car
whose own arrival time is **earlier** would arrive before the fleet ahead, so it
must become a new fleet leader — and it *is* the leader of a new fleet, because it
arrives first among all the cars behind it (the cars behind it are even further
away, so they can only arrive later if they do not catch it). Both branches are
forced by the physics of the situation, so the greedy classification of every car is
correct and the number of fleets is exact.

## Dry Run

Input: cars `(10,2)`, `(8,4)`, `(0,1)`, `(3,1)`, `(0,1)`, `target = 12`

Sorted by position descending: `(10,2)`, `(8,4)`, `(3,1)`, `(0,1)`, `(0,1)`

| Step | car | arrival time `(12-pos)/speed` | `fleetTime` before | `t > fleetTime`? | action | fleets | `fleetTime` after |
|---:|---|---:|---:|---|---|---:|---:|
| 1 | `(10,2)` | `(12-10)/2 = 1.000` | 0 | yes | new fleet | 1 | 1.000 |
| 2 | `(8,4)` | `(12-8)/4 = 1.000` | 1.000 | no (`1.0 > 1.0` is false) | joins fleet 1 | 1 | 1.000 |
| 3 | `(3,1)` | `(12-3)/1 = 9.000` | 1.000 | yes | new fleet | 2 | 9.000 |
| 4 | `(0,1)` | `(12-0)/1 = 12.000` | 9.000 | yes | new fleet | 3 | 12.000 |
| 5 | `(0,1)` | `(12-0)/1 = 12.000` | 12.000 | no | joins fleet 3 | 3 | 12.000 |

Answer: **3** fleets.

## Java Solution

See [`CarFleet.java`](./CarFleet.java).

```java
public static int carFleet(int target, int[] positions, int[] speeds) {
    Integer[] order = new Integer[positions.length];
    for (int i = 0; i < positions.length; i++) {
        order[i] = i;
    }
    Arrays.sort(order, (a, b) -> Integer.compare(positions[b], positions[a]));

    int fleets = 0;
    double fleetTime = 0;
    for (int i : order) {
        double time = (double) (target - positions[i]) / speeds[i];
        if (time > fleetTime) {
            fleets++;
            fleetTime = time;
        }
    }
    return fleets;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log n) | one sort plus a linear scan |
| **Space** | O(n) | the index array that carries the sort order |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Return the fleets themselves."* → group the cars by the fleet leader they join.
- *"What if the cars can change lanes?"* → the model changes completely; then it is a
  traffic simulation problem.
- *"What if the target is at position 0?"* → every car is already there; the answer is
  the number of cars.

**Common mistakes:**
- ❌ Comparing the cars in the wrong direction — you must start with the car **closest
  to the target**, otherwise you do not know the fleet's arrival time yet.
- ❌ Using `>=` instead of `>` — a car that arrives at exactly the same time as the
  fleet ahead joins it, it does not start a new fleet.
- ❌ Comparing the times as integers — use `double`, otherwise `1/3` rounds to `0` and
  the fleet boundaries come out wrong.

**How to narrate:**
> "I sort the cars by position, closest to the target first, and keep the arrival time
> of the fleet directly ahead. A car that would arrive later catches up and joins that
> fleet; a car that would arrive earlier becomes the leader of a new fleet. Both
> outcomes are forced by the physics, so the count of new leaders is the number of
> fleets."

## Related Problems

- [Meeting Rooms II](./MeetingRoomsII.md) — grouping by overlapping time spans
- [Meeting Rooms III](./MeetingRoomsIII.md) — another "group by time" sweep
