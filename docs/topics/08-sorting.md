---
title: Sorting — concept notes
order: 8
summary: The classic sorts, their invariants and complexities, stability, custom comparators, and when a non-comparison sort beats them.
---

# Sorting — concept notes

## The mental model

Sorting is both an algorithm topic and a **tool**. Before writing a sort, ask: do I need
the elements sorted, or do I just need a particular piece of information about their
order?

- "Find the K largest" → a heap, O(n log k). Not a sort.
- "Find the element that would be at position k" → quickselect, O(n) average.
- "Find the median" → quickselect, O(n) average.
- "Print in sorted order" → you need a sort.

**Sorting to answer a question you could answer otherwise is the most common waste in
DSA interviews.**

---

## The comparison sorts

| Sort | Best | Average | Worst | Space | Stable |
|---|---|---|---|---|---|
| Bubble | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Selection | O(n²) | O(n²) | O(n²) | O(1) | No |
| Insertion | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Merge | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Quick | O(n log n) | O(n log n) | O(n²) | O(log n) | No |
| Heap | O(n log n) | O(n log n) | O(n log n) | O(1) | No |
| Counting | O(n + k) | O(n + k) | O(n + k) | O(k) | Yes |
| Radix | O(d·(n+k)) | — | — | O(k) | Yes |

**Insertion sort is O(n) on nearly-sorted data** — which is why the Java library uses
TimSort (a hybrid of insertion and merge) and why "the array is nearly sorted" appears in
so many interview problems.

**Merge sort's O(n) space** is the price of stability. Quicksort's worst case of O(n²) is
avoided in practice by randomising the pivot.

**Java's `Arrays.sort` for primitives uses a dual-pivot quicksort (O(n log n), unstable).
For objects it uses TimSort (O(n log n), stable).**

---

## Merge sort

```java
public static void mergeSort(int[] arr, int left, int right) {
    if (left >= right) return;
    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}

private static void merge(int[] arr, int left, int mid, int right) {
    int[] temp = new int[right - left + 1];
    int i = left, j = mid + 1, k = 0;
    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) temp[k++] = arr[i++];
        else temp[k++] = arr[j++];
    }
    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];
    System.arraycopy(temp, 0, arr, left, temp.length);
}
```

**The merge step is O(n) because each element is copied exactly once.**

**The `<=` in the merge is what makes it stable** — when two elements are equal, the one
from the left half wins, preserving the original order.

**Bottom-up merge sort** avoids the recursion and is better for linked lists (where you
cannot index). That is the standard way to sort a linked list in O(n log n) time and O(1)
space.

---

## Quicksort

```java
public static void quickSort(int[] arr, int low, int high) {
    if (low >= high) return;
    int pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
}
```

**Partition (Lomuto):** choose the last element as the pivot, move everything smaller to
the left, and place the pivot in between.

```java
private static int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr, i, j);
        }
    }
    swap(arr, i + 1, high);
    return i + 1;
}
```

**The invariant:** after the loop, everything in `[low..i]` is ≤ the pivot, and
everything in `[i+1..high-1]` is > the pivot.

**The worst case:** a sorted array with the last element as pivot gives O(n²). Fixes:
random pivot, median-of-three, or **introsort** (switch to heapsort when the recursion
depth gets too large) — which is what Java's `Arrays.sort` does for primitives.

**Quickselect** — partition once, then recurse into only the side you need. O(n) average,
O(n²) worst case. This is the right tool for "find the kth largest" and "find the median".

**In-place partition** uses O(1) space; the recursive version costs O(log n) stack.

---

## Heapsort

```java
public static void heapSort(int[] arr) {
    int n = arr.length;
    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        swap(arr, 0, i);
        heapify(arr, i, 0);
    }
}
```

**Build the heap in O(n)** by calling `heapify` from `n/2 - 1` down to 0.

**Why building a heap is O(n), not O(n log n):** the work at each level is proportional
to the number of nodes at that level, and the levels sum to a geometric series.

**Then repeatedly swap the root (the maximum) to the end and re-heapify** — the sorted
part grows from the right.

**O(n log n) worst case, O(1) space, not stable.** It is the only comparison sort with
both. The constant factor is worse than quicksort, which is why it is not the default.

---

## Counting sort

**When the values are in a small known range, do not compare them at all.**

```java
public static void countingSort(int[] arr, int maxValue) {
    int[] counts = new int[maxValue + 1];
    for (int x : arr) counts[x]++;
    for (int i = 1; i <= maxValue; i++) counts[i] += counts[i - 1];   // prefix sums
    for (int i = arr.length - 1; i >= 0; i--) {
        arr[--counts[arr[i]]] = arr[i];
    }
}
```

**O(n + k)** where k is the range. Beats O(n log n) when k is O(n).

**The stability trick:** iterate the input **from right to left** and decrement the
prefix-sum counter. If you iterate forwards, equal elements come out reversed.

**Radix sort** is counting sort applied to each digit, from least to most significant.
O(d · (n + k)) for d digits.

---

## Dutch national flag (three-way partition)

```java
public static void sortColors(int[] arr) {
    int low = 0, mid = 0, high = arr.length - 1;
    while (mid <= high) {
        if (arr[mid] == 0) {
            swap(arr, low++, mid++);
        } else if (arr[mid] == 1) {
            mid++;
        } else {
            swap(arr, mid, high--);
        }
    }
}
```

**Three pointers, one pass, O(n), O(1) space.**

**The invariant:**
- `[0, low)` are all 0.
- `[low, mid)` are all 1.
- `[mid, high]` is unknown.
- `(high, n)` are all 2.

**Why `mid++` only in the 0 case:** after swapping with `low`, the element that came
from `low` is unexamined, so `mid` must not advance.

**Why `high--` but not `mid--`:** the element swapped in from `high` is unexamined, so
`mid` must stay.

This is the hardest of the three to reason about, and a very common interview question.
Walk it with the interviewer.

---

## Stability

**A stable sort preserves the relative order of equal elements.**

```java
// sort students by name, then by age — the second sort must be stable
students.sort(Comparator.comparing(Student::name));
students.sort(Comparator.comparingInt(Student::age));
```

**Stable algorithms:** insertion sort, merge sort, counting sort, radix sort, TimSort
(Java's object sort).

**Unstable algorithms:** selection sort, quicksort, heapsort.

**Why it matters:** sorting by a secondary key first and then a primary key only works
if the sort is stable.

**In Java, `List.sort` and `Collections.sort` are stable** (they use TimSort). So
`Arrays.sort(int[])` is unstable but `Arrays.sort(Integer[])` is stable. That surprises
people.

---

## Custom comparators

```java
// Descending by age
people.sort(Comparator.comparingInt(Employee::age).reversed());

// By last name, then first name
people.sort(Comparator.comparing(Employee::lastName).thenComparing(Employee::firstName));

// By length, then alphabetically
words.sort(Comparator.comparingInt(String::length).thenComparing(Comparator.naturalOrder()));

// The "largest number" comparator: a should come before b if a+b > b+a
nums.sort((a, b) -> (b + a).compareTo(a + b));
```

**The comparator contract:**
- Must be consistent: `compare(a,b) == 0` iff a and b are equal by the ordering.
- Must be antisymmetric: `compare(a,b) == -compare(b,a)`.
- Must be transitive.

**A broken comparator gives unpredictable results**, not an exception — so it is hard to
debug. Say the contract out loud.

**Never write `a.getAge() - b.getAge()`** — it overflows for large values. Use
`Integer.compare(a.getAge(), b.getAge())`.

**Never sort a list with a mutable key.** If the key changes after the sort, the list is
no longer sorted, and `binarySearch` will give wrong answers.

---

## Sorting a linked list

**Merge sort, bottom-up**, because you cannot index a linked list:

```java
ListNode mergeSort(ListNode head) {
    if (head == null || head.next == null) return head;
    // find the midpoint with fast/slow, split, recurse, merge
}
```

**O(n log n) time, O(1) space** (with a careful bottom-up merge that reuses the nodes
rather than allocating).

---

## Common traps

| Trap | Why it bites |
|---|---|
| Off-by-one in the merge (`mid + 1`) | Elements get duplicated or dropped |
| Using `<` instead of `<=` in the merge | Destroys stability |
| Iterating forwards when building from prefix sums | Equal elements come out reversed |
| `high - 1` instead of `high` in the pivot swap | The pivot lands in the wrong place |
| `arr[i] - arr[j]` in a comparator | Integer overflow |
| Assuming `Arrays.sort(int[])` is stable | It is not; `Integer[]` is |
| Mutating a field that a comparator depends on | The list is silently no longer sorted |
| Forgetting `mid++` after swapping in the Dutch flag | Elements are skipped |
| Assuming the array is sorted for `binarySearch` after your own sort | Only true if the sort was complete |

---

## Complexity cheat sheet

| Situation | Best choice | Why |
|---|---|---|
| Small array, or nearly sorted | Insertion sort | O(n) on nearly-sorted data, no overhead |
| Need stability, O(1) space not required | Merge sort | Stable, predictable O(n log n) |
| In general, want the best average case | Quicksort | Fastest in practice, cache-friendly |
| Worst-case guarantee needed | Heapsort | O(n log n) worst case |
| Small integer range | Counting sort | O(n + k) |
| Large integer keys | Radix sort | O(d(n+k)), no comparisons |
| Need only the kth element | Quickselect | O(n) average |
| Need the top k of a stream | Heap of size k | O(n log k), O(k) space |
| Sorting a linked list | Bottom-up merge sort | O(n log n) time, O(1) space |

---

## How to crack it in an interview

1. **Ask whether you actually need a sort.** "Do you need all of them sorted, or just the
   kth largest?" This question alone can turn an O(n log n) answer into O(n).
2. **Ask about the value range.** If the values are in 0..1000, counting sort beats
   everything.
3. **Ask about stability** if equal elements have different meanings.
4. **Name the algorithm and its complexity before writing it.**
5. **Use `Arrays.sort` with a comparator** unless the interview is specifically about
   implementing a sort — but be ready to explain the comparator contract.
6. **If implementing:** state the invariant of your partition or merge step. That is what
   makes the code reviewable.
