---
title: Reorganize String
leetcode: 358
difficulty: Medium
patterns: [Greedy, Max-heap, Frequency counting, Cooldown]
companies: [Amazon, Meta, Google, Microsoft, Uber]
frequency: 4
tags: [heap, greedy, string, frequency]
sampleInput: |
  3
  aab
sampleOutput: "aba"
---

# Reorganize String — LeetCode 358

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Greedy · Max-heap · Frequency counting · Cooldown |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber |

## Problem Statement

Rearrange the characters of a string so that **no two equal characters are adjacent**.
Return the rearranged string, or the empty string when no arrangement exists.

For `"aab"` the answer is `"aba"`. For `"aaab"` no arrangement exists — the `a`s cannot
all be separated.

## Input Format

The program reads from standard input:

```
n
s
```

- `n` — the length of the string (1 ≤ n ≤ 10⁴)
- `s` — the string itself, lowercase English letters only, no whitespace inside

## Sample Input

```
3
aab
```

## Expected Output

```
aba
```

## Approach — Greedy with a max-heap and one blocked letter

The letter with the **most occurrences left** is the one that needs the most room, so
placing it first is what keeps the arrangement possible.

- A **max-heap** holds the remaining count of every letter; its top is the letter to
  place next.
- The letter placed in the **previous slot** is *blocked*: it may only re-enter the heap
  after a different letter has been placed. That single rule guarantees no two equal
  letters ever become adjacent.

**When is it impossible?** If the most frequent letter appears more than
`ceil(n / 2)` times, there are not enough other letters to separate the copies. The
program returns an empty string in that case.

## Dry Run

Input: `s = "aab"`, counts `a → 2`, `b → 1`

The heap is printed as `letter x count`; the root is the most frequent letter.

| Step | placed | heap before | heap after | blocked | result |
|---:|---|---|---|---|---|
| 1 | `a` (2 → 1) | `[ax2, bx1]` | `[bx1]` | `a` (still has one copy) | `a` |
| 2 | `b` (1 → 0) | `[bx1]` → `a` is released → `[ax1, bx1]` | `[ax1]` | — | `ab` |
| 3 | `a` (1 → 0) | `[ax1]` | `[]` | — | `aba` |

Step 2 is the rule in action: `a` was blocked after step 1, so it was **not** eligible
when the next letter was picked — `b` was. Only after `b` was placed did `a` re-enter
the heap.

### The impossible case — `"aaab"`

`a` appears 3 times, `ceil(4 / 2) = 2` → the check `maxCount > (n + 1) / 2` fails and
the program prints an empty line.

## Java Solution

See [`ReorganizeString.java`](./ReorganizeString.java).

```java
Letter blocked = null;
while (true) {
    if (heap.isEmpty()) {
        if (blocked == null || blocked.remaining == 0) {
            break;
        }
        return "";
    }
    Letter current = heap.poll();
    result.append(current.ch);
    current.remaining--;

    // the slot is filled, so the blocked letter becomes usable again
    if (blocked != null) {
        heap.add(blocked);
        blocked = null;
    }
    if (current.remaining > 0) {
        blocked = current;
    }
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log m) | m distinct letters, one heap operation per character |
| **Space** | O(m) | the heap holds one entry per distinct letter |

## Interview Notes

**Follow-ups to raise yourself:**
- *"How do you know in advance that it is impossible?"* → the most frequent letter must
  fit into the gaps: `maxCount ≤ ceil(n / 2)`.
- *"Could you solve it without a heap?"* → yes: place the most frequent letters in the
  even positions first, then the rest (the "fill the gaps" technique).
- *"What if the alphabet were huge (all Unicode)?"* → use a hash map instead of an array
  of 26 counters.
- *"How does this compare with the Task Scheduler?"* → the same cooldown idea, but there
  the cooldown is `k` slots instead of one.

**Common mistakes:**
- ❌ Releasing the blocked letter **before** picking the next one → the same letter is
  placed twice in a row.
- ❌ Forgetting the impossibility check → the greedy happily produces `"aaab"`.
- ❌ Placing the **least** frequent letter first → the frequent letters then collide at
  the end.

**How to narrate:**
> "The letter with the most copies left is the one with the least room, so I always
> place the top of a max-heap of remaining counts. To avoid two equal letters next to
> each other, the letter I just placed is blocked: it only re-enters the heap after a
> different letter has been placed. Before starting I also check that no letter occurs
> more than ceil(n/2) times — otherwise no arrangement exists and I return an empty
> string."

## Related Problems

- [Task Scheduler](TaskScheduler.md) — the same cooldown idea with k slots
- [Top K Frequent Elements](TopKFrequentElements.md) — frequency counting
- [String Compression](../strings/StringCompression.md) — run-length encoding
- [Valid Palindrome II](../strings/ValidPalindromeII.md) — rearranging a string
