---
title: Jump Game III
leetcode: 1306
difficulty: Medium
patterns: [BFS, Visited set]
companies: [Amazon, Airbnb, Adobe, Wipro, Zebra]
frequency: 3
tags: [array, bfs, graph]
sampleInput: |
  7
  4 2 3 0 3 1 2
  0
sampleOutput: "true"
---

# Jump Game III — LeetCode 1306

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | BFS · Visited set |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

You are given an array `arr` of non-negative integers and a start index `start`. From
index `i` you may move to `i + arr[i]` or to `i - arr[i]`, as long as the new index is
inside the array. The walk is over as soon as it lands on an index whose value is `0`.

Return whether that happens.

- Index `start` may be any valid index.
- The jumps can form cycles — the search must not loop forever.

## Input Format

The program reads from standard input:

```
n
arr[0] arr[1] ... arr[n-1]
start
```

- `n` — length of the array (1 ≤ n ≤ 10⁵)
- `arr` — n space-separated non-negative integers (0 ≤ arr[i] < n)
- `start` — the index the walk starts at (0 ≤ start < n)

## Sample Input

```
7
4 2 3 0 3 1 2
0
```

## Expected Output

```
true
```

`0 → 4 → 1 → 3` and `arr[3] = 0`, so the walk comes to rest.

## Approach — BFS over the reachable indices

Treat every index as a node with at most two outgoing edges: `i + arr[i]` and
`i - arr[i]`. The question is whether any node with value `0` is reachable from
`start`, which is a plain graph reachability problem.

- A queue holds the indices whose outgoing edges have not been processed yet.
- A `visited` array guarantees that every index is enqueued at most once — this is
  what stops the search from looping on a cycle such as `arr = [1, 1]`.
- As soon as a dequeued index has the value `0`, the answer is `true`.

**Exchange argument (why the greedy/BFS choice is safe):** the set of reachable
indices is closed under "take an edge": if `i` is reachable, both `i + arr[i]` and
`i - arr[i]` (when they are valid) are reachable. The BFS explores exactly this
closure — it never discards a reachable index, and it never visits an unreachable one
(every visited index is reached by a concrete chain of jumps from `start`). Since the
indices are visited in the order of their distance from `start`, the first index with
value `0` is found in the minimum number of jumps, which is the extra information BFS
gives for free over DFS.

## Dry Run

Input: `arr = [4, 2, 3, 0, 3, 1, 2]`, `start = 0`

| Step | dequeue | `arr[i]` | `i + arr[i]` | `i - arr[i]` | visited before | enqueue | visited after | found? |
|---:|---:|---:|---:|---:|---|---|---|---|
| 1 | 0 | 4 | 4 | -4 (invalid) | `{0}` | 4 | `{0, 4}` | no |
| 2 | 4 | 3 | 7 (invalid) | 1 | `{0, 4}` | 1 | `{0, 1, 4}` | no |
| 3 | 1 | 2 | 3 | -1 (invalid) | `{0, 1, 4}` | 3 | `{0, 1, 3, 4}` | no |
| 4 | 3 | 0 | — | — | `{0, 1, 3, 4}` | — | unchanged | **yes — `arr[3] = 0`** |

The queue is empty afterwards and the answer is **true**.

### Trace that fails — `arr = [2, 3, 1, 1, 4]`, `start = 0`

| Step | dequeue | `arr[i]` | `i + arr[i]` | `i - arr[i]` | enqueue | found? |
|---:|---:|---:|---:|---:|---|---|
| 1 | 0 | 2 | 2 | -2 | 2 | no |
| 2 | 2 | 1 | 3 | 1 | 3, 1 | no |
| 3 | 3 | 1 | 4 | 2 (visited) | 4 | no |
| 4 | 1 | 3 | 4 (visited) | -2 | — | no |
| 5 | 4 | 4 | 8 (invalid) | 0 (visited) | — | no |

The queue is empty and no zero was found → **false**.

## Java Solution

See [`JumpGameIII.java`](./JumpGameIII.java).

```java
public static boolean canReach(int[] arr, int start) {
    if (arr == null || arr.length == 0 || start < 0 || start >= arr.length) {
        return false;
    }
    boolean[] visited = new boolean[arr.length];
    Deque<Integer> queue = new ArrayDeque<>();
    queue.add(start);
    visited[start] = true;

    while (!queue.isEmpty()) {
        int i = queue.poll();
        if (arr[i] == 0) {
            return true;
        }
        int[] next = {i + arr[i], i - arr[i]};
        for (int j : next) {
            if (j >= 0 && j < arr.length && !visited[j]) {
                visited[j] = true;
                queue.add(j);
            }
        }
    }
    return false;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | every index is dequeued at most once |
| **Space** | O(n) | the queue and the visited array |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Return the shortest path to the zero."* → keep the predecessor of every visited
  index and walk backwards from the zero.
- *"What if `arr[i]` can be huge and the jump lands outside the array?"* → same code,
  the bounds check already handles it.
- *"What if you needed the number of reachable indices?"* → count the visited entries.

**Common mistakes:**
- ❌ Forgetting the `visited` check — `arr = [1, 1]` makes the walk cycle forever.
- ❌ Marking a node visited only when it is dequeued — it will then be enqueued many
  times and the queue explodes.
- ❌ Checking `i == arr.length - 1` instead of `arr[i] == 0` — the walk ends on a
  zero value, which is the last index in a well-formed input but not in general.

**How to narrate:**
> "This is reachability in a graph where every index has two edges. I'll BFS from
> `start`, marking indices visited when I enqueue them so cycles cannot trap the
> search. If I ever dequeue an index whose value is zero the answer is yes; if the
> queue drains, the answer is no."

## Related Problems

- [Jump Game](./JumpGame.md) — the forward-only greedy version
- [Jump Game II](./JumpGameII.md) — BFS by layers, counting jumps
