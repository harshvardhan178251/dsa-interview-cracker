---
title: Moving Average
leetcode: 346
difficulty: Easy
patterns: [Design, Sliding window, Running sum]
companies: [Amazon, LinkedIn, Facebook]
frequency: 3
tags: [sliding window, deque, running sum]
sampleInput: |
  3
  4
  1
  2
  3
  4
sampleOutput: |
  1.00
  1.50
  2.00
  3.00
---

# Moving Average — LeetCode 346

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Design · Sliding window · Running sum |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, LinkedIn |

## Problem Statement

Keep a sliding window of the last `k` values and report the average of the window after
every new value.

- While fewer than `k` values have been seen, the average is taken over everything seen
  so far.
- Once the window is full, the oldest value leaves the window when a new one arrives.

## Input Format

```
k
n
v1
v2
...
vn
```

- `k` — the window size.
- `n` — the number of values.
- `v1..vn` — the values.

The program prints one line per value: the moving average, formatted with two decimals.

## Sample Input

```
3
4
1
2
3
4
```

## Expected Output

```
1.00
1.50
2.00
3.00
```

After the fourth value the window is `[2, 3, 4]` — the value `1` fell out.

## Approach — a deque plus the running sum

Two pieces of state:

- the **deque** of the values currently inside the window,
- the **sum** of those values.

Adding a value touches the sum (`sum += value`); removing the oldest value touches it
again (`sum -= oldest`). The average is `sum / size` — a division, not a subtraction of
two averages, so there is no accumulation of rounding error.

Both operations are O(1) because a deque supports push-back, pop-front and peek-front in
constant time.

**Why not a circular array?** It also works, but a `Deque` is shorter to write and
handles the "window not full yet" case without extra logic.

## Dry Run

`k = 3`. The deque is shown oldest → newest.

| Step | Value | Deque before | Action | Sum before | Sum after | Deque after | Window size | Average | Output |
|---:|---:|---|---|---:|---:|---|---:|---|---|
| 1 | 1 | `[]` | push 1 (size 1 ≤ k) | 0 | 1 | `[1]` | 1 | `1 / 1 = 1.00` | `1.00` |
| 2 | 2 | `[1]` | push 2 (size 2 ≤ k) | 1 | 3 | `[1, 2]` | 2 | `3 / 2 = 1.50` | `1.50` |
| 3 | 3 | `[1, 2]` | push 3 (size 3 ≤ k) | 3 | 6 | `[1, 2, 3]` | 3 | `6 / 3 = 2.00` | `2.00` |
| 4 | 4 | `[1, 2, 3]` | push 4 → size 4 > k → pop 1 and subtract it | 6 | 10 → 9 | `[2, 3, 4]` | 3 | `9 / 3 = 3.00` | `3.00` |

Step 4 is the only interesting one: the value that leaves the window is always the
**front** of the deque, and its contribution is subtracted from the sum in the same
step.

## Java Solution

See [`MovingAverage.java`](./MovingAverage.java).

```java
public double next(int value) {
    window.addLast(value);
    sum += value;
    if (window.size() > k) {
        sum -= window.pollFirst();      // the oldest value leaves the window
    }
    return (double) sum / window.size();
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(1) per value | one push, at most one pop |
| **Space** | O(k) | the window holds at most k values |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the values arrive out of order?"* → the window becomes ambiguous; sort first
  or use a different structure.
- *"How would you get the median of the window?"* → two heaps with lazy deletion, or a
  balanced BST; the running sum is not enough.
- *"How would you do it with a stream of millions of values?"* → the same deque, but with
  a primitive `long[]` ring buffer instead of boxed objects.
- *"What if `k` changes?"* → keep the values in a deque and resize the window on the
  fly.

**Common mistakes:**
- ❌ Computing the average as `previousAverage + (new - old) / k` → rounding errors
  accumulate.
- ❌ Popping from the wrong end of the deque.
- ❌ Dividing by `k` instead of by the current window size when fewer than `k` values
  have arrived.
- ❌ Formatting with the default locale → `1,50` instead of `1.50`.

**How to narrate:**
> "I'll keep the window in a deque together with its running sum. Adding a value only
> touches the sum; when the window grows past k the oldest value is removed from both.
> The average is the sum divided by the current size — no subtraction of averages, so no
> floating point drift."

## Related Problems

- [Design HitCounter — LeetCode 362](./DesignHitCounter.md) — the same window over timestamps
- [Rate Limiter](./RateLimiter.md) — the same window with a capacity limit
- [Design Underground System — LeetCode 373](./DesignUndergroundSystem.md) — running averages
  per key
