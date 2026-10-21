---
title: Snapshot Array
leetcode: 1146
difficulty: Medium
patterns: [Design, Versioning, Per-index history]
companies: [Amazon, Adobe, Facebook, HCLTech, Barclays]
frequency: 3
tags: [snapshot, versioning, history]
sampleInput: |
  3
  0 5
  1 6
  0 7
  3
  0
sampleOutput: |
  7
---

# Snapshot Array — LeetCode 1146

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Design · Versioning · Per-index history |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Airbnb |

## Problem Statement

Support a snapshot array.

- `set(index, value)` stores a new value for that index.
- `get(index, snap_id)` returns the value the index had **at the given snapshot** — the
  last value written to that index at or before that snapshot. An index that was never
  written returns `0`.

A snapshot freezes the whole array; the trick is that we only have to remember *when*
each value was written.

## Input Format

```
n
idx val
idx val
...
snap_id
snap_idx
```

- `n` — the length of the array **and** the number of set operations.
- `idx val` — one write. The `i`-th write belongs to snapshot `i + 1`, so snapshot `0` is
  the pristine array full of zeros.
- `snap_id` — the snapshot to read.
- `snap_idx` — the index to read.

The program prints the value of `snap_idx` as of snapshot `snap_id`.

## Sample Input

```
3
0 5
1 6
0 7
3
0
```

## Expected Output

```
7
```

Index `0` was written with `5` in snapshot `1` and overwritten with `7` in snapshot `3`,
so at snapshot `3` it holds `7`.

## Approach — one history list per index

Every index keeps its own list of `(snapshotId, value)` pairs, appended in increasing
snapshot order:

```
index 0 → [(1, 5), (3, 7)]
index 1 → [(2, 6)]
index 2 → []
```

`get(index, snap_id)` walks the list and keeps the value of the last pair whose
`snapshotId <= snap_id`; if there is none, the answer is `0`.

Because the history of an index is ordered by snapshot id, the walk can stop at the first
pair that is already too new.

**Space.** The naive version stores a full copy of the array per snapshot — O(n·s). The
history version stores one entry per *write*, so it is O(number of writes) in total, no
matter how many snapshots there are. That is the whole point of the problem.

## Dry Run

Input: `n = 3`, writes `(0,5)`, `(1,6)`, `(0,7)`, query `snap_id = 3`, `snap_idx = 0`.

| Step | Write | Index | Snapshot id | History of index before | History after | Note |
|---:|---|---:|---:|---|---|---|
| 1 | `0 5` | 0 | 1 | `[]` | `[(1,5)]` | first write to index 0 |
| 2 | `1 6` | 1 | 2 | `[]` | `[(2,6)]` | first write to index 1 |
| 3 | `0 7` | 0 | 3 | `[(1,5)]` | `[(1,5), (3,7)]` | index 0 written again |

Query `get(0, 3)`:

| Step | Pair | `snapId <= 3`? | Running result |
|---:|---|---|---|
| 1 | `(1, 5)` | yes | `5` |
| 2 | `(3, 7)` | yes | `7` |

Result: **7**.

The same query at an earlier snapshot gives a different answer:

| Query | Walk | Result |
|---|---|---|
| `get(0, 0)` | first pair `(1,5)` is already newer → stop | `0` (never written at snapshot 0) |
| `get(0, 1)` | `(1,5)` → yes, `(3,7)` → no → stop | `5` |
| `get(0, 2)` | `(1,5)` → yes, `(3,7)` → no → stop | `5` |
| `get(0, 3)` | `(1,5)` → yes, `(3,7)` → yes | `7` |

## Java Solution

See [`SnapshotArray.java`](./SnapshotArray.java).

```java
public void set(int index, int snapId, int value) {
    history.get(index).add(new Version(snapId, value));
}

public int get(int index, int snapId) {
    int result = 0;                         // every index starts at 0
    for (Version version : history.get(index)) {
        if (version.snapId > snapId) {
            break;                          // the history is ordered by snapshot id
        }
        result = version.value;
    }
    return result;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(1) per `set`, O(w) per `get` | one append; one walk over the writes of that index |
| **Space** | O(w) for w writes | one entry per write, not per snapshot |

**With binary search?** The history of an index is sorted by snapshot id, so `get` can
be O(log w) with a binary search for the last pair with `snapId <= snap_id`.

## Interview Notes

**Follow-ups to raise yourself:**
- *"How would you support `get(index, snap_id)` in O(log w)?"* → binary search over the
  per-index history.
- *"What if the array is huge and mostly zeros?"* → store only the indices that were
  written (a hash map of histories) — that is what this solution effectively does.
- *"How would you implement a real snapshot (copy-on-write)?"* → a persistent data
  structure, or a versioned B-tree, where a snapshot is just a root pointer.
- *"How would you undo to a snapshot?"* → the same history, read backwards.

**Common mistakes:**
- ❌ Copying the whole array for every snapshot — O(n) memory per snapshot.
- ❌ Storing the *diff* against the previous snapshot in a way that requires replaying
  from the beginning.
- ❌ Returning the current value instead of the value at the requested snapshot.
- ❌ Forgetting that an index that was never written must return `0`.

**How to narrate:**
> "A snapshot array only needs to remember *when* a value was written. So I'll keep a
> list of `(snapshotId, value)` pairs per index. A write appends one pair, and a read
> walks the list and takes the last pair whose snapshot id is not newer than the
> requested one. Memory is proportional to the number of writes, not to the number of
> snapshots, and the walk can be turned into a binary search if I need it."

## Related Problems

- [Design HashMap — LeetCode 706](./DesignHashMap.md) — the per-index store underneath
- [Design Browser History — LeetCode 348](./DesignBrowserHistory.md) — versioning a list
  instead of an array
- [Design Text Editor — LeetCode 2296](./DesignTextEditor.md) — an undo journal, the same idea
  in time
