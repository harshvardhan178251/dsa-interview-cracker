---
title: Heap Sort
leetcode: null
difficulty: Medium
patterns: [Heap, In-place sorting]
companies: [Amazon, Google, Meta, Uber, Adobe]
frequency: 3
tags: [sorting, heap-sort, priority-queue]
sampleInput: |
  5
  5 2 4 6 1
sampleOutput: "1 2 4 5 6"
---

# Heap Sort

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Heap · In-place sorting |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Adobe |

## Problem Statement

Sort an array of integers in ascending order using **heap sort** and print the
result.

- The algorithm builds a max heap and then repeatedly extracts the maximum.
- Print the sorted array as space-separated integers on one line.

## Input Format

The program reads from standard input:

```
n
nums[0] nums[1] ... nums[n-1]
```

- `n` — the length of the array (0 ≤ n ≤ 10⁴).
- `nums` — n space-separated integers.

## Sample Input

```
5
5 2 4 6 1
```

## Expected Output

```
1 2 4 5 6
```

## Approach — Heap in place, then extract the root

The array itself is the heap: the children of index `i` live at `2i + 1` and
`2i + 2`.

**Phase 1 — build a max heap.** Start at the last internal node (`n / 2 - 1`) and
sift every node **down** to its place. Working from the bottom up means every
subtree below a node is already a valid heap when it is sifted.

**Phase 2 — extract.** The root of a max heap is the largest element. Swap it with
the last element of the heap, shrink the heap by one, and sift the new root back
down. The sorted region at the back of the array grows by one every round.

## Dry Run

Input: `nums = [5, 2, 4, 6, 1]` (n = 5)

Heap layout (indices):

```
          0
        /   \
       1     2
      / \
     3   4
```

### Phase 1 — build the max heap, nodes 1 and 0 (the last internal node is `5/2 - 1 = 1`)

**Sift down node 1** (value `2`; children `nums[3] = 6` and `nums[4] = 1`)

| Step | root | left | right | largest | action | array |
|---:|---:|---:|---:|---:|---|---|
| 1 | 1 | 3 (6) | 4 (1) | 3 | `6 > 2` → swap(1, 3) | `[5, 6, 4, 2, 1]` |
| 2 | 3 | 7 (–) | 8 (–) | 3 | both children out of range → stop | `[5, 6, 4, 2, 1]` |

**Sift down node 0** (value `5`; children `nums[1] = 6` and `nums[2] = 4`)

| Step | root | left | right | largest | action | array |
|---:|---:|---:|---:|---:|---|---|
| 3 | 0 | 1 (6) | 2 (4) | 1 | `6 > 5` → swap(0, 1) | `[6, 5, 4, 2, 1]` |
| 4 | 1 | 3 (2) | 4 (1) | 1 | neither child is larger → stop | `[6, 5, 4, 2, 1]` |

The heap is now `[6, 5, 4, 2, 1]` — every parent is larger than its children.

### Phase 2 — extract the maximum five times

| Round | `end` | action | array after the swap | sift down | array after the sift |
|---:|---:|---|---|---|---|
| 1 | 4 | `swap(0, 4)` → 6 to the back | `[1, 5, 4, 2, 6]` | root 0: child `5` is larger → swap(0,1); then stop | `[5, 1, 4, 2, 6]` |
| 2 | 3 | `swap(0, 3)` → 5 to the back | `[2, 1, 4, 5, 6]` | root 0: child `4` (index 2) is larger → swap(0,2); then stop | `[4, 1, 2, 5, 6]` |
| 3 | 2 | `swap(0, 2)` → 4 to the back | `[2, 1, 4, 5, 6]` | root 0: child `1` is not larger → stop | `[2, 1, 4, 5, 6]` |
| 4 | 1 | `swap(0, 1)` → 2 to the back | `[1, 2, 4, 5, 6]` | root 0: heap size is 1 → stop | `[1, 2, 4, 5, 6]` |

Final array: **`[1, 2, 4, 5, 6]`**

## Java Solution

See [`HeapSort.java`](./HeapSort.java).

```java
public static int[] heapSort(int[] nums) {
    int n = nums.length;
    for (int i = n / 2 - 1; i >= 0; i--) {
        siftDown(nums, i, n);
    }
    for (int end = n - 1; end > 0; end--) {
        swap(nums, 0, end);
        siftDown(nums, 0, end);
    }
    return nums;
}

private static void siftDown(int[] nums, int root, int size) {
    while (true) {
        int largest = root;
        int left = 2 * root + 1;
        int right = 2 * root + 2;
        if (left < size && nums[left] > nums[largest]) {
            largest = left;
        }
        if (right < size && nums[right] > nums[largest]) {
            largest = right;
        }
        if (largest == root) {
            return;
        }
        swap(nums, root, largest);
        root = largest;
    }
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log n) | Building the heap is O(n), each of the n extractions is O(log n) |
| **Space** | O(1) | The heap *is* the array — no extra storage at all |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Build a heap from a stream of numbers."* → push each number into a heap; that is
  O(n log n), while heapify-ing an array is O(n).
- *"Why is building the heap O(n)?"* → most nodes are near the bottom and sift only
  a little; the sum of the work over all levels is a convergent series.
- *"Find the k-th largest element."* → use a min heap of size k, or quickselect
  (O(n) average).
- *"Is it stable?"* → **no**.

**Common mistakes:**
- ❌ Building the heap from the **last element** instead of the last **internal**
  node (`n / 2 - 1`) → leaves the structure broken.
- ❌ Sifting **up** instead of down when building a max heap.
- ❌ Forgetting to shrink the heap size after the swap → the element that was just
  placed at the end is sifted back into the heap.
- ❌ Using `>=` in the "is the right child larger" test → the heap property still
  holds, but the sift behaves differently; `>` is the standard choice.

**How to narrate:**
> "Heap sort stores the heap inside the array itself — children of i are at 2i+1 and
> 2i+2. First I heapify from the last internal node down to the root, which builds a
> max heap in O(n). Then I repeatedly swap the root with the last element of the heap,
> shrink the heap by one and sift the root back down. Each extraction costs O(log n),
> so the whole thing is O(n log n) with O(1) extra space — better than merge sort on
> space, worse on stability."

## Related Problems

- [Merge Sort](../../../../../../docs/topics/08-sorting.md) — O(n log n) but needs O(n) space and is stable
- [Quick Sort](../../../../../../docs/topics/08-sorting.md) — usually faster in practice
- [Counting Sort](../../../../../../docs/topics/08-sorting.md) — O(n) when the value range is small
