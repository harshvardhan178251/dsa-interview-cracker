---
title: Alien Dictionary
leetcode: 269
difficulty: Medium
patterns: [Topological sort, Precedence graph, String comparison]
companies: [Google, Airbnb, Goldman Sachs, HCLTech, Siemens]
frequency: 3
tags: [graph, strings, topological-sort, lexicographic]
sampleInput: |
  3
  abc
  bcd
  cde
  0 1
  1 2
sampleOutput: "true"
---

# Alien Dictionary — LeetCode 269

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Topological sort · Precedence graph |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Airbnb |

## Problem Statement

An alien language has its own alphabet. We are given `n` dictionary words and `n-1` ordering
constraints: a pair `(u, v)` means *"word `u` comes before word `v` in the alien alphabet"*.

The dictionary is **valid** when both of the following hold:

1. **The constraints are consistent.** No word is required to come before itself (directly or
   through other words) — the precedence graph must be acyclic.
2. **The constraints agree with the letters.** For every constrained pair, the first character
   where the two words differ must be *smaller* in `words[u]` than in `words[v]`. If one word is
   a strict prefix of the other, the shorter word has to come first.

## Input Format

```
n
word1
word2
...
wordn
u1 v1
u2 v2
...
u(n-1) v(n-1)
```

- `n` — number of words (`1 ≤ n ≤ 100`)
- `n` words, one per line (lowercase letters)
- `n-1` pairs `u v`: the word with index `u` must come before the word with index `v`

## Sample Input

```
3
abc
bcd
cde
0 1
1 2
```

## Expected Output

```
true
```

`abc` vs `bcd` differ first at index 0 (`a` < `b`), `bcd` vs `cde` differ first at index 0
(`b` < `c`), and the constraint chain `0 → 1 → 2` has no cycle.

## Approach — build the precedence graph, then sort it

1. For each constraint `(u, v)`:
   - compare `words[u]` and `words[v]` character by character;
     - the first differing characters must satisfy `words[u][i] < words[v][i]`;
     - if there is no differing character, the shorter word must be the first one;
   - add the edge `u → v` to a precedence graph and bump `inDegree[v]`.
2. Run **Kahn's algorithm** on that graph. If not all `n` words can be ordered, the constraints
   contain a cycle → invalid.

The letter check (step 1) is what makes the problem more than a cycle check: the constraints
could be perfectly acyclic and still contradict the actual letters.

## Dry Run

Words: `abc`, `bcd`, `cde`

| Step | Pair | Words | First differing index | Letters | Ordered? | Edge | In-degree after |
|---:|---|---|---:|---|---|---|---|
| 1 | `(0,1)` | `abc` / `bcd` | 0 | `a` / `b` | ✔ `a` < `b` | `0 → 1` | `[0, 1, 0]` |
| 2 | `(1,2)` | `bcd` / `cde` | 0 | `b` / `c` | ✔ `b` < `c` | `1 → 2` | `[0, 1, 1]` |

Topological sort:

| Step | Dequeue | Placed | Edges relaxed | In-degree after | Queue after |
|---:|---|---:|---|---|---|
| 0 | — | 0 | — | `[0, 1, 1]` | `[0]` |
| 1 | `0` | 1 | `0→1`: 1→0 | `[0, 0, 1]` | `[1]` |
| 2 | `1` | 2 | `1→2`: 1→0 | `[0, 0, 0]` | `[2]` |
| 3 | `2` | 3 | — | `[0, 0, 0]` | `[]` |

All 3 words were placed → **`true`**.

### A dictionary that is *not* valid

Same words, but the constraint is `bcd → abd` (pair `1 2`):

| Step | Pair | Words | First differing index | Letters | Ordered? |
|---:|---|---|---:|---|---|
| 1 | `(0,1)` | `abc` / `bcd` | 0 | `a` / `b` | ✔ |
| 2 | `(1,2)` | `bcd` / `abd` | 0 | `b` / `a` | ✘ `b` > `a` |

→ **`false`** immediately, without even running the topological sort.

## Java Solution

See [`AlienDictionary.java`](./AlienDictionary.java).

```java
public static boolean isValid(String[] words, int[][] pairs) {
    for (int[] pair : pairs) {
        if (!lexicallyOrdered(words[pair[0]], words[pair[1]])) {
            return false;
        }
        adj.get(pair[0]).add(pair[1]);
        inDegree[pair[1]]++;
    }
    // ... Kahn's algorithm; valid iff every word was placed ...
}

private static boolean lexicallyOrdered(String a, String b) {
    int common = Math.min(a.length(), b.length());
    for (int i = 0; i < common; i++) {
        if (a.charAt(i) != b.charAt(i)) {
            return a.charAt(i) < b.charAt(i);
        }
    }
    return a.length() <= b.length();
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n + m + L) | `m = n-1` comparisons, each up to `L` characters; the topological sort is O(n + m) |
| **Space** | O(n + m) | Adjacency list and in-degrees |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you recover the alien alphabet itself?"* → run the topological sort and record, for every
  edge `u → v`, the first differing characters; that gives the order relations between letters.
  Letters that never appear in a comparison can be placed anywhere.
- *"What if the constraints are given as a list of word pairs instead of `n-1` pairs?"* → build
  the edge set from every pair, deduplicate it, and run the same algorithm.
- *"What if two words are identical?"* → identical words impose no letter constraint, but they
  are fine; only a *strict* prefix in the wrong order is a contradiction.
- *"How would you detect the contradiction without the letter check?"* → the cycle check alone
  (that is what a pure topological sort would do).

**Common mistakes:**
- ❌ Comparing the whole words with `compareTo` instead of comparing the **first differing
  characters** — `"ab"` vs `"ac"` is fine, but `"ab"` vs `"ba"` is not, and only the first
  difference matters.
- ❌ Forgetting the prefix rule — `"ab"` must come before `"abc"`; if the constraint says
  otherwise the dictionary is invalid.
- ❌ Treating the constraint pairs as the *order of the word list* — they are independent
  precedence relations.

**How to narrate:**
> "An alien dictionary is a precedence problem. I turn every 'u before v' pair into a directed
> edge, but first I check the letters: the first position where the two words differ has to be
> smaller in the first word, and a strict prefix has to come first. Then I run Kahn's algorithm
> on the precedence graph — if I can place all the words the constraints are consistent and the
> dictionary is valid."

## Related Problems

- [Course Schedule](./CourseSchedule.java) — pure cycle detection
- [Topological Sort](./TopologicalSort.java) — the general ordering problem
- [Word Ladder](./WordLadder.java) — BFS over strings, the other classic string-graph problem
- [Reconstruct Itinerary](./ReconstructItinerary.java) — precedence plus a greedy ordering rule
