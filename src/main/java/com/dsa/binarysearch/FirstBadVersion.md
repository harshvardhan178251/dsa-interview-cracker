---
title: First Bad Version
leetcode: 278
difficulty: Easy
patterns: [Binary search, Monotone predicate]
companies: [Google, Amazon, Apple, Uber, Cloudflare]
frequency: 4
tags: [binary-search, api-design, versioning]
sampleInput: |
  5
sampleOutput: "4"
---

# First Bad Version — LeetCode 278

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Binary search · Monotone predicate |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Facebook |

## Problem Statement

You have `n` versions of a product; the first bad version is the earliest one that contains
a defect. Everything after it is bad as well.

An API `isBadVersion(version)` tells you whether a given version is bad. Using **as few
calls to that API as possible**, return the number of the **first** bad version.

If no version is bad, return `-1`.

## Input Format

The program reads from standard input:

```
n
```

- `n` — the highest version number that exists; versions are numbered `1 .. n`

### About the `isBadVersion` check

The release history cannot be read from stdin, so it is implemented here as a **documented
stub**:

```java
public static final int FIRST_BAD_VERSION = 4;

public static boolean isBadVersion(int version) {
    return version >= FIRST_BAD_VERSION;
}
```

Every version `>= 4` is bad, so the first bad version is `4` whenever `n >= 4`. Change
`FIRST_BAD_VERSION` (or the body of `isBadVersion`) to model a different release history —
the search algorithm does not change. In a real interview `isBadVersion` would be a library
call you do not control, and the point of the exercise is to minimise how often you call it.

## Sample Input

```
5
```

## Expected Output

```
4
```

Versions `1, 2, 3` are good and version `4` is the first bad one.

## Approach — Binary search on a monotone predicate

`isBadVersion` is monotone: it answers `false` for every version before the first bad one
and `true` from that version onwards. That is exactly the shape binary search needs.

Maintain the inclusive window `[left, right]` of versions that may contain the first bad
one:

- `isBadVersion(mid)` is `true` → the first bad version is at `mid` **or earlier** → `right = mid`.
- `isBadVersion(mid)` is `false` → the first bad version is strictly after `mid` → `left = mid + 1`.

The window shrinks by half each time, so the search needs **⌈log₂ n⌉** calls to the API —
which is exactly what the problem asks you to minimise.

**Guard clause.** If `isBadVersion(n)` is `false`, no version is bad and the answer is `-1`.

## Dry Run

Input: `n = 5`, bad versions are `>= 4`

**Guard call** — `isBadVersion(5)` → `true`, so a bad version exists and the search starts.

| Step | left | right | mid | `isBadVersion(mid)` | action | window after |
|---:|---:|---:|---:|---|---|---|
| 1 | 1 | 5 | 3 | `false` (3 < 4) | the first bad version is **after** `mid` → `left = mid + 1` | `[4, 5]` |
| 2 | 4 | 5 | 4 | `true` (4 >= 4) | the first bad version is **at** `mid` or earlier → `right = mid` | `[4, 4]` |

`left == right == 4` → return **4**.

### Every oracle call, in order

| call | version | `isBadVersion` | what it tells us |
|---:|---:|---|---|
| 0 (guard) | 5 | `true` | at least one bad version exists |
| 1 | 3 | `false` | versions ≤ 3 are good, so the answer is > 3 |
| 2 | 4 | `true` | version 4 is bad, so the answer is ≤ 4 |

Combining calls 1 and 2 pins the answer to exactly `4`.

**API calls used: 3** (including the guard). A linear scan `isBadVersion(1), (2), (3), (4)`
would have needed 4.

### The same search on a larger release history

If `FIRST_BAD_VERSION` were `1000` and `n = 1024`, the window would halve ten times:
`[1,1024] → [512,1024] → [768,1024] → … → [1000,1000]` — 10 probes instead of 1024.

## Java Solution

See [`FirstBadVersion.java`](./FirstBadVersion.java).

```java
public static int firstBadVersion(int n) {
    if (n < 1 || !isBadVersion(n)) {
        return -1;
    }
    int left = 1;
    int right = n;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (isBadVersion(mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(log n) | ⌈log₂ n⌉ API calls; each call is O(1) |
| **Space** | O(1) | Only two index variables |

**Optimal?** Yes — with an unknown first bad version you need Ω(log n) oracle calls in the
worst case; each call only tells you one bit.

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the versions live on a remote server and each call costs 1 second?"* → the
  problem becomes about latency: ⌈log₂ n⌉ calls in parallel is not possible (each answer
  depends on the previous), so it is inherently sequential — but you can cache results and
  use exponential (galloping) search to reduce the *total* calls when the first bad version
  is close to `1`.
- *"What if there are multiple independent defects?"* → the predicate is no longer monotone
  and binary search breaks; you need a scan or a different oracle.
- *"How would you test this code?"* → mock the API with a fake release history and assert
  the number of calls (a good test asserts *how many* calls, not just the answer).
- *"What if the versions are released across several machines?"* → the oracle becomes a
  network call; the same binary search applies, only the cost model changes.

**Common mistakes:**
- ❌ Using `left <= right` and returning `-1` inside the loop → with `left < right` the loop
  always converges on the answer, no sentinel needed.
- ❌ Forgetting that `isBadVersion` is 1-based → versions start at `1`, not `0`.
- ❌ Calling `isBadVersion(mid + 1)` to move the bound → doubles the number of API calls for
  no reason.
- ❌ Not handling "no bad version at all" → an unguarded binary search returns `n`.

**How to narrate:**
> "The oracle is monotone, so the answer is the first version where it flips to true. I'll
> binary search for that boundary — each call halves the remaining range, so I make about
> log₂ n calls, which is the minimum possible. If the newest version is good, then no version
> is bad and I return -1."

## Related Problems

- [Binary Search](./BinarySearch.java) — the same skeleton on an array
- [Koko Eating Bananas](./KokoEatingBananas.java) — binary search on an answer
- [Search Insert Position](./SearchInsertPosition.java) — finding the first true index
