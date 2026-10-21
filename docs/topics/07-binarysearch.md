---
title: Binary search — concept notes
order: 7
summary: Four flavours of binary search — on an index, on a boundary, on a rotated array, and on the answer — plus the loop invariants that make each correct.
---

# Binary search — concept notes

## The mental model

Binary search is not one algorithm. It is four, and choosing the right one is the skill:

| Flavour | The array is | You are searching for |
|---|---|---|
| **On an index** | Sorted by a key | An element or its position |
| **On a boundary** | Sorted, monotone predicate | The first `true` / first `false` |
| **On a rotated array** | Sorted, then rotated | An element, despite the rotation |
| **On the answer** | Not sorted at all | A value in a range, found by asking "is X feasible?" |

**The last one is the most valuable and the least practised.** Search *space* rather than
*data*.

---

## Flavour 1 — on an index

```java
int low = 0, high = nums.length - 1;
while (low <= high) {
    int mid = low + (high - low) / 2;
    if (nums[mid] == target) return mid;
    if (nums[mid] < target) low = mid + 1;
    else high = mid - 1;
}
return -1;
```

**`low + (high - low) / 2` instead of `(low + high) / 2`** — the latter overflows when both
are near `Integer.MAX_VALUE`. In Java, `low + ((high - low) >>> 1)` is the usual form.

**The invariant:** the target, if it exists, is in `[low, high]`.

**When the array has duplicates**, plain binary search may return any of the matching
indices. To find the first or last occurrence, use the boundary flavour.

---

## Flavour 2 — on a boundary

The most reusable form. Two variants:

**Lower bound** — the first index where `a[i] >= target`:

```java
int low = 0, high = nums.length;      // high is exclusive
while (low < high) {
    int mid = low + (high - low) / 2;
    if (nums[mid] < target) low = mid + 1;
    else high = mid;
}
return low;                            // may equal nums.length
```

**Upper bound** — the first index where `a[i] > target`:

```java
int low = 0, high = nums.length;
while (low < high) {
    int mid = low + (high - low) / 2;
    if (nums[mid] <= target) low = mid + 1;
    else high = mid;
}
return low;
```

**Then:**
- First occurrence of `target` = `lowerBound(target)`, if `a[that] == target`.
- Last occurrence = `upperBound(target) - 1`.
- Count of `target` = `upperBound - lowerBound`.

**The key structural difference: `high = nums.length` (exclusive) and `while (low < high)`.**
The "half-open" interval makes the exit condition correct even when the answer is past the
end.

**Say this in the interview:** "I'll find the lower bound of the target and the upper
bound; the difference is the count, and the boundaries give the first and last
occurrences." That one sentence answers a whole family of questions.

### The monotone predicate form

Generalise: instead of `a[mid] < target`, use any **monotone predicate** `p(i)`:

```java
// first index where p(i) is true
int low = 0, high = n;
while (low < high) {
    int mid = low + (high - low) / 2;
    if (!p(mid)) low = mid + 1;
    else high = mid;
}
return low;
```

`p` must be **false...false, true...true** (or the reverse) over the array. That
monotonicity is what makes binary search valid.

---

## Flavour 3 — on a rotated array

**Search in Rotated Sorted Array (LC 33)** — no duplicates.

```java
public static int search(int[] nums, int target) {
    int low = 0, high = nums.length - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;

        if (nums[low] <= nums[mid]) {
            // the left half is sorted
            if (nums[low] <= target && target < nums[mid]) high = mid - 1;
            else low = mid + 1;
        } else {
            // the right half is sorted
            if (nums[mid] < target && target <= nums[high]) low = mid + 1;
            else high = mid - 1;
        }
    }
    return -1;
}
```

**The reasoning:** at every step, **at least one half is sorted**. Check whether the
target falls in the sorted half's range; if so, go there, otherwise go the other way.

**LC 81** has duplicates, and `nums[low] == nums[mid] == nums[high]` breaks the "which
half is sorted" test. The fix: shrink both ends.

```java
if (nums[low] == nums[mid] && nums[mid] == nums[high]) {
    low++;
    high--;
    continue;
}
```

**Worst case becomes O(n)** with duplicates — which is fine, because the *average* is
still O(log n) and the adversary needed duplicates to force it.

**Find Minimum in Rotated Sorted Array (LC 153)** — the same shape, comparing
`nums[mid]` with `nums[high]`:

```java
if (nums[mid] > nums[high]) low = mid + 1;     // the minimum is to the right
else high = mid;                               // the minimum is at mid or to the left
```

**LC 33 and LC 153 are the same problem with a different question.** Say that.

---

## Flavour 4 — binary search on the answer

The most powerful technique in the whole topic, and the one that separates candidates.

**The idea:** the answer is a number in `[low, high]`. Define a **feasibility predicate**
`can(x)` — "is there a solution that is at most `x`?" — and binary search for the
smallest `x` for which `can(x)` is true.

**The critical property: `can(x)` must be monotone.** If `can(x)` is true, `can(y)` must be
true for every `y > x`. (Or the reverse — then search for the largest feasible `x`.)

### The canonical template

```java
int low = minPossible, high = maxPossible;
while (low < high) {
    int mid = low + (high - low) / 2;      // avoid overflow
    if (can(mid)) {
        high = mid;                       // mid is feasible → try smaller
    } else {
        low = mid + 1;                    // mid is infeasible → need more
    }
}
return low;
```

**This single template solves an enormous number of problems.** Memorise it.

### Worked examples

**Koko Eating Bananas (LC 875)** — minimum speed to eat all bananas within `h` hours.

```java
boolean can(int speed) {
    long hours = 0;
    for (int pile : piles) hours += (pile + speed - 1) / speed;   // ceil division
    return hours <= h;
}
```

**Note the ceiling division with integers:** `(pile + speed - 1) / speed`. Using `long`
for the accumulator — the sum can exceed `int`.

**Aggressive Cows** — maximise the minimum distance between `c` cows.

```java
boolean can(int distance) {
    int placed = 1, last = stalls[0];
    for (int i = 1; i < stalls.length; i++) {
        if (stalls[i] - last >= distance) {
            placed++;
            last = stalls[i];
            if (placed >= cows) return true;
        }
    }
    return false;
}
```

**Capacity To Ship Packages (LC 1011)** — minimum ship capacity.

**Split Array Largest Sum (LC 410)** — minimise the largest subarray sum.

**Minimum Height Trees (LC 910)** — minimise the maximum distance to a closer tree.

**Find the Smallest Divisor (LC 1283)** — minimise the maximum per-element sum.

### The recipe

Whenever you see "**minimise the maximum**" or "**maximise the minimum**":

1. Identify the quantity to optimise — it is the search variable.
2. Write `can(x)`: "is there a solution with the quantity at most x?"
3. **Check monotonicity out loud:** if `x` works, does `x + 1` work? (For minimise-max, yes
   — a larger bound is always easier to satisfy. For maximise-min, the direction flips.)
4. Binary search the value.

**Step 3 is where most candidates get stuck.** If the predicate is not monotone, binary
search is invalid and you need a different approach — say so explicitly.

---

## The template family

**The `while (low <= high)` form** — search for an exact element, returns an index or -1.

**The `while (low < high)` half-open form** — search for a boundary.

**The "find the last true" form** — search for the largest `x` with `can(x)`:

```java
int low = min, high = max;
while (low <= high) {
    int mid = low + (high - low) / 2;
    if (can(mid)) { answer = mid; low = mid + 1; }
    else high = mid - 1;
}
```

**Say which form you are using and why** in the interview. It tells the interviewer you
understand the difference between "find it" and "find the boundary".

---

## Common traps

| Trap | Why it bites |
|---|---|
| `(low + high) / 2` | Integer overflow |
| `high = nums.length - 1` in the boundary form | The answer may be `nums.length` |
| `while (low <= high)` in the boundary form | Off by one at the end |
| Infinite loop when `low` and `high` are adjacent | One of them must always move |
| Forgetting the sortedness assumption | Binary search on unsorted data is meaningless |
| Using a non-monotone predicate | The search is invalid |
| Not handling `target` outside the array range | Return -1 or clamp |
| Overflow in the feasibility check | Use `long` for sums |
| Comparing `nums[low] <= nums[mid]` without considering duplicates (LC 81) | Wrong branch |
| Not saying the monotonicity out loud | The interviewer cannot tell you understood it |

---

## Complexity cheat sheet

| Variant | Time | Space |
|---|---|---|
| Binary search | O(log n) | O(1) |
| Lower/upper bound | O(log n) | O(1) |
| Rotated array search (no duplicates) | O(log n) | O(1) |
| Rotated array search (duplicates) | O(log n) avg, O(n) worst | O(1) |
| Binary search on the answer | O(log(range) × cost(can)) | O(1) |

**The binary-search-on-answer complexity is worth stating properly:** O(log R) iterations,
each costing T, so O(T · log R) where R is the size of the search range. If R is
10⁹, that is 30 iterations.

---

## How to crack it in an interview

1. **Identify the flavour.** "Is the array sorted? Is the predicate monotone?"
2. **State the invariant:** "the answer is in [low, high]" or "the answer is at least low
   and at most high".
3. **For the answer-search flavour, say the monotonicity argument explicitly.** This is
   the single most impressive thing you can do in a binary-search question, because it
   proves you did not just memorise the template.
4. **Handle the boundaries**: what if the answer does not exist, or is at the very edge?
5. **Trace it** — write the low/high values at each step. Binary search bugs hide in the
   first two iterations.
6. **Mention the alternative** — "I could also solve this in O(n) with a scan; binary
   search gets it to O(log n) because the constraint is monotone."
