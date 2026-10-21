---
title: Remove Duplicates from Sorted List II
leetcode: 83
difficulty: Medium
patterns: [Dummy head, Run detection]
companies: [Amazon, Meta, Facebook, JP Morgan, Lyft]
frequency: 4
tags: [linked-list, pointers, sorted]
sampleInput: |
  7
  1 2 3 3 4 4 5
sampleOutput: "1 2 5"
---

# Remove Duplicates from Sorted List II — LeetCode 83

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Dummy head · Run detection |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

Given the head of a **sorted** linked list, delete every node that is part of a duplicate —
all the copies of a repeated value are removed, not just the extra ones.

- `1 -> 2 -> 3 -> 3 -> 4 -> 4 -> 5` becomes `1 -> 2 -> 5`.
- `1 -> 1 -> 1 -> 2 -> 3` becomes `2 -> 3`.
- `1 -> 1` becomes an empty list.

This is the difference between LeetCode 83 (**all** copies go) and LeetCode 82 (only the extra
copies go).

## Input Format

The program reads from standard input:

```
len
values[0] values[1] ... values[len-1]
```

- `len` — number of nodes (1 ≤ len ≤ 300)
- `values` — len space-separated integers in **ascending** order

## Sample Input

```
7
1 2 3 3 4 4 5
```

## Expected Output

```
1 2 5
```

The values `3` and `4` each appear twice, so both of their copies are removed. ✓

## Approach — Skip the Whole Run

Because the list is sorted, equal values are **adjacent** — a duplicate is a run of equal
nodes. The algorithm walks the list with two pointers:

- `curr` — the node being examined,
- `prev` — the last node known to be kept (it points at `curr`).

For each `curr`:

- If `curr.next` has the same value, we have found a run. Walk `curr` past **every** node
  with that value, then set `prev.next = curr` — the whole run is unlinked in one
  assignment. `prev` does **not** move: it still points at the last kept node.
- Otherwise the value is unique: keep it, so `prev = curr`.

**Why the dummy head:** when the run to delete is at the very beginning, `prev` would have
to point at a node that does not exist. The dummy head gives `prev` a home and lets
`dummy.next` be returned directly.

**Why `prev` must not advance after a deletion:** the node after the run may itself be a
duplicate, and `prev` must still point at the last *kept* node so the next unlink lands in
the right place.

## Dry Run

Input: `dummy -> 1 -> 2 -> 3 -> 3 -> 4 -> 4 -> 5`

| Step | `curr` | `curr.next` | run? | action | list |
|---:|---|---|---|---|---|
| 0 | `1` | `2` | no | keep: `prev = 1`, `curr = 2` | `dummy -> 1 -> 2 -> 3 -> 3 -> 4 -> 4 -> 5` |
| 1 | `2` | `3` | no | keep: `prev = 2`, `curr = 3` | `dummy -> 1 -> 2 -> 3 -> 3 -> 4 -> 4 -> 5` |
| 2 | `3` | `3` | **yes** | skip both `3`s → `curr = 4`; `prev.next = 4` | `dummy -> 1 -> 2 -> 4 -> 4 -> 5` |
| 3 | `4` | `4` | **yes** | skip both `4`s → `curr = 5`; `prev.next = 5` | `dummy -> 1 -> 2 -> 5` |
| 4 | `5` | `null` | no | keep: `prev = 5`, `curr = null` | `dummy -> 1 -> 2 -> 5` |

`dummy.next` is `1` → the result is `1 2 5`. ✓

### The tricky case — a run at the very beginning

Input: `dummy -> 1 -> 1 -> 2`

| Step | `curr` | `curr.next` | run? | action | list |
|---:|---|---|---|---|---|
| 1 | `1` | `1` | **yes** | skip both `1`s → `curr = 2`; `prev.next = 2` (prev is the dummy!) | `dummy -> 2` |
| 2 | `2` | `null` | no | keep | `dummy -> 2` |

Without the dummy head this case would need a special "is the head a duplicate?" branch. ✓

## Java Solution

See [`RemoveDuplicatesFromSortedListII.java`](./RemoveDuplicatesFromSortedListII.java).

```java
public static ListNode deleteDuplicates(ListNode head) {
    ListNode dummy = new ListNode(0, head);
    ListNode prev = dummy;
    ListNode curr = head;

    while (curr != null) {
        if (curr.next != null && curr.next.val == curr.val) {
            int value = curr.val;
            while (curr != null && curr.val == value) {
                curr = curr.next;          // skip the whole run of equal values
            }
            prev.next = curr;              // unlink the run
        } else {
            prev = curr;                   // this value is unique: keep it
            curr = curr.next;
        }
    }
    return dummy.next;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(len) | One pass; every node is visited at most twice |
| **Space** | O(1) | A dummy head and two pointers |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Keep only one copy of each value (LeetCode 82)."* → instead of skipping the whole run,
  advance `curr` by one and keep the first node of the run.
- *"Do it on an unsorted list."* → you need a hash map of frequencies, then a second pass
  to remove the nodes whose count is above one.
- *"Remove the duplicates in place without a dummy head."* → handle the head separately; the
  dummy head is cleaner.
- *"Return the list of values that were removed."* → collect them while unlinking.

**Common mistakes:**
- ❌ Advancing `prev` **after** a deletion → the next unlink can remove a node that should
  have been kept.
- ❌ Removing only the second node of the run → the result keeps one copy, which is
  LeetCode 82, not 83.
- ❌ Forgetting the dummy head → a run at the head cannot be unlinked.

**How to narrate:**
> "The list is sorted, so duplicates are adjacent — I look for runs of equal values. I keep
> a `prev` pointer to the last node I kept and a `curr` pointer to the node I am examining.
> If `curr` and `curr.next` are equal I skip the entire run and link `prev` straight to the
> node after it, without moving `prev`. Otherwise I keep the node and move `prev` forward.
> A dummy head in front means a run at the very beginning needs no special case. One pass,
> O(1) space."

## Related Problems

- [Remove Duplicates from Sorted List](../../../../../../docs/topics/01-arrays.md) — keep one copy (LeetCode 82)
- [Remove Nth Node From End of List](DeleteNthFromEnd.md) — unlink a node
- [Merge Two Sorted Lists](MergeTwoSortedLists.md) — the other sorted-list drill
