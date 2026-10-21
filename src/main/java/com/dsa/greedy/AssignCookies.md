---
title: Assign Cookies
leetcode: 455
difficulty: Easy
patterns: [Greedy, Sort and two pointers]
companies: [Amazon, Google, Meta, Uber, Airbnb]
frequency: 3
tags: [array, sorting, greedy, two-pointers]
sampleInput: |
  2
  1 2
  3
  1 1 2
sampleOutput: "2"
---

# Assign Cookies — LeetCode 455

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Greedy · Sort and two pointers |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Airbnb |

## Problem Statement

Every child has a greed factor `g` and every cookie has a size `s`.

- A child can be satisfied with a cookie when `s >= g`.
- Every child receives **at most one** cookie and every cookie goes to **at most one**
  child.

Return the maximum number of children that can be satisfied.

## Input Format

The program reads from standard input:

```
n
greed[0] greed[1] ... greed[n-1]
m
size[0] size[1] ... size[m-1]
```

- `n` — number of children
- `greed` — n space-separated greed factors
- `m` — number of cookies
- `size` — m space-separated cookie sizes

## Sample Input

```
2
1 2
3
1 1 2
```

## Expected Output

```
2
```

The child with greed `1` gets a cookie of size `1`, the child with greed `2` gets the
cookie of size `2`. The extra cookie of size `1` is useless.

## Approach — sort both sides and walk two pointers

Sort the greed factors and the cookie sizes. Then:

- If the smallest remaining cookie is **too small** for the least greedy remaining
  child, that cookie is useless — it is too small for every other child as well, so
  throw it away.
- Otherwise give that cookie to that child and advance both pointers.

**Exchange argument (why the greedy choice is safe):** let `g` be the smallest
remaining greed and `s` the smallest remaining cookie.

- If `s < g`, then `s` cannot satisfy any remaining child (all of them need at least
  `g`), so discarding `s` loses nothing.
- If `s >= g`, then giving `s` to the child with greed `g` is safe. In any optimal
  solution that child either gets nothing (then giving it `s` adds one satisfied
  child) or gets some cookie `s' >= s`. If `s` was given to another child with greed
  `g' >= g`, swap the two cookies: `s'` is at least as large as `s`, so it still
  satisfies the child with greed `g'`, and the child with greed `g` is happy with `s`.
  The number of satisfied children does not change — so there is always an optimal
  solution that makes the greedy choice.

## Dry Run

Input: `greed = [1, 2]`, `size = [1, 1, 2]` (both already sorted)

| Step | child pointer | greed[child] | cookie pointer | size[cookie] | `size >= greed`? | Action | satisfied |
|---:|---:|---:|---:|---:|---|---|---:|
| 1 | 0 | 1 | 0 | 1 | yes | give cookie 0 to child 0 | 1 |
| 2 | 1 | 2 | 1 | 1 | **no** | discard cookie 1 (too small for everyone) | 1 |
| 3 | 1 | 2 | 2 | 2 | yes | give cookie 2 to child 1 | 2 |
| 4 | 2 | — | 3 | — | — | no cookies left → stop | 2 |

Answer: **2**.

### Trace where cookies run out first — `greed = [1, 2, 3]`, `size = [1, 1]`

| Step | child | greed | cookie | size | `size >= greed`? | Action | satisfied |
|---:|---:|---:|---:|---:|---|---|---:|
| 1 | 0 | 1 | 0 | 1 | yes | give | 1 |
| 2 | 1 | 2 | 1 | 1 | no | discard | 1 |
| 3 | — | — | 2 | — | — | no cookies left → stop | 1 |

## Java Solution

See [`AssignCookies.java`](./AssignCookies.java).

```java
public static int findContentChildren(int[] greed, int[] size) {
    int[] g = greed.clone();
    int[] s = size.clone();
    Arrays.sort(g);
    Arrays.sort(s);

    int child = 0;
    int cookie = 0;
    int satisfied = 0;
    while (child < g.length && cookie < s.length) {
        if (s[cookie] >= g[child]) {
            satisfied++;
            child++;
        }
        cookie++;
    }
    return satisfied;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log n + m log m) | two sorts plus a linear scan |
| **Space** | O(1) | the inputs are cloned before sorting, so the caller's arrays are untouched |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if a child can take several cookies?"* → the greedy is no longer valid; you
  need a knapsack-style DP.
- *"What if cookies have a value as well as a size?"* → the objective changes and a DP
  (or min-cost flow) is the right tool.
- *"Can you do it without sorting?"* → no, the greedy fundamentally needs the order;
  mention the O(n log n) lower bound of the comparison model.

**Common mistakes:**
- ❌ Using `s > g` instead of `s >= g` — a cookie of exactly the greed factor is
  allowed.
- ❌ Advancing the child pointer when the cookie is too small — the child still waits
  for a bigger cookie.
- ❌ Sorting the caller's arrays in place — clone them first; the caller may still
  need the original order.

**How to narrate:**
> "I sort both lists and walk them with two pointers. If the smallest cookie can't
> satisfy the least greedy child, that cookie is useless for everyone, so I throw it
> away. Otherwise the two go together — and by a swap argument that never costs me a
> satisfied child, because any cookie that could have gone to this child can also
> satisfy whoever the small cookie was reserved for."

## Related Problems

- [Largest Number](./LargestNumber.md) — sorting with a custom comparator
- [Hand of Straights](./HandOfStraights.md) — grouping after counting values
