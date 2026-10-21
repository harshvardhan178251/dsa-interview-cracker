---
title: Word Ladder
leetcode: 127
difficulty: Medium
patterns: [BFS, Wildcard bucketing, String manipulation]
companies: [Amazon, Google, Meta, Uber, LinkedIn]
frequency: 4
tags: [graph, strings, bfs, hashing]
sampleInput: |
  6
  hot
  dot
  dog
  lot
  log
  cog
  hit
  cog
sampleOutput: "5"
---

# Word Ladder — LeetCode 127

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | BFS · Wildcard bucketing |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, LinkedIn |

## Problem Statement

Given a dictionary and a `beginWord` / `endWord`, return the length of the shortest **sequence
of words** that turns `beginWord` into `endWord`. One letter may be changed at a time and every
intermediate word must be in the dictionary.

The answer counts **words**, so `beginWord == endWord` gives `1`. `0` means the `endWord` cannot
be reached at all.

## Input Format

```
n
word1
word2
...
wordn
beginWord
endWord
```

- `n` — number of dictionary words
- `n` words, one per line (lowercase letters)
- `beginWord`, `endWord` — the two endpoints

## Sample Input

```
6
hot
dot
dog
lot
log
cog
hit
cog
```

## Expected Output

```
5
```

`hit → hot → dot → dog → cog` — five words.

## Approach — BFS over buckets, not over pairs

The obvious BFS expands every word into all 26 single-letter mutations: `O(26 · L · n)` word
constructions and a hash lookup each. That is fine but wasteful.

The **wildcard bucket** trick groups the dictionary so that two words one letter apart end up in
the same bucket:

```
"hot" → "*ot",  "h*t",  "ho*"
"dot" → "*ot",  "d*t",  "do*"
"cog" → "*og",  "c*g",  "co*"
```

Two words share a bucket **iff** they differ in exactly one position, so "words reachable from
`w`" = "all words in the buckets of `w`". Building the buckets costs `O(n · L)` and each BFS
level then expands in `O(bucket size)` instead of `O(26 · L)`.

BFS levels are the answer: level `1` is `beginWord` alone, level `2` contains all words one
change away, and so on. The first time `endWord` is generated we return the level number.

**Visited handling:** remove a word from the dictionary set the moment it is queued. That is the
visited mark, and it also stops us from generating the same word from several neighbours.

## Dry Run

Buckets that matter (key → words):

| Bucket | Words |
|---|---|
| `*ot` | `hot`, `dot`, `lot` |
| `*og` | `dog`, `log`, `cog` |
| `h*t` | `hot`, `hit` |
| `do*` | `dog`, `dot` |
| `lo*` | `lot`, `log` |
| `c*g` | `cog` |

BFS (the "level" column counts words in the sequence):

| Step | Level | Queue before | Word expanded | Buckets hit | New words | Queue after | Sequence length |
|---:|---:|---|---|---|---|---|---:|
| 1 | 1 | `[hit]` | `hit` | `h*t` → `[hot, hit]` | `hot` | `[hot]` | 1 |
| 2 | 2 | `[hot]` | `hot` | `*ot` → `[hot, dot, lot]` | `dot`, `lot` | `[dot, lot]` | 2 |
| 3 | 3 | `[dot, lot]` | `dot` | `*ot` → `[hot, dot, lot]`, `do*` → `[dog, dot]` | `dog` | `[dog, lot]` | 3 |
| 4 | 3 | `[dot, lot]` | `lot` | `lo*` → `[lot, log]` | `log` | `[dog, log]` | 3 |
| 5 | 4 | `[dog, log]` | `dog` | `*og` → `[dog, log, cog]` | **`cog` = endWord** | — | 4 |

`cog` is generated at level 4, so the shortest sequence contains **5** words → answer **`5`**.

## Java Solution

See [`WordLadder.java`](./WordLadder.java).

```java
public static int ladderLength(String[] words, String beginWord, String endWord) {
    Set<String> dictionary = new HashSet<>(Arrays.asList(words));
    if (!dictionary.contains(endWord)) {
        return 0;
    }
    // ... build the wildcard buckets ...
    int wordsInSequence = 1;
    while (!queue.isEmpty()) {
        int levelSize = queue.size();
        for (int i = 0; i < levelSize; i++) {
            String current = queue.poll();
            // ... look the buckets of `current` up ...
            for (String candidate : candidates) {
                if (!dictionary.remove(candidate)) {
                    continue;
                }
                if (candidate.equals(endWord)) {
                    return wordsInSequence + 1;
                }
                queue.add(candidate);
            }
        }
        wordsInSequence++;
    }
    return 0;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(N · L²) | N words × L wildcard buckets, each hashing an L-character string |
| **Space** | O(N · L) | The bucket map holds N · L entries |

`L` is the word length (≤ 10 for LeetCode), so `L²` is a small constant in practice.

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it without the extra bucket memory?"* → yes, mutate each word with all 26 letters
  and look it up; that is O(26 · L · N) time but only O(N) space.
- *"What if the dictionary is huge and changes often?"* → a Trie gives O(L) per mutation lookup;
  or precompute the buckets once and cache them.
- *"What if we need the actual sequence of words, not just its length?"* → keep a parent pointer
  for every word you enqueue and walk it back from `endWord`.
- *"How would you handle wildcard queries (find all words matching `h*t`)?"* → the same bucket
  index answers those in O(bucket size).

**Common mistakes:**
- ❌ Returning the number of **changes** instead of the number of **words** → off by one.
- ❌ Forgetting that `beginWord` may not be in the dictionary → it still needs to be bucketed and
  it still has to be marked visited.
- ❌ Not removing words from the visited set when they are queued → the same word is generated
  many times and the BFS degenerates.

**How to narrate:**
> "This is a shortest path problem where the edges are 'differ in one letter'. Instead of
> generating all 26 mutations for every word, I bucket the dictionary by wildcard patterns:
> 'hot' goes into '*ot', 'h*t' and 'ho*'. Two words share a bucket exactly when they are one
> letter apart, so a BFS level expands by looking at the buckets of the current word. The level
> number is the length of the shortest sequence."

## Related Problems

- [Alien Dictionary](./AlienDictionary.java) — the other classic string-graph problem
- [RottingOranges](./RottingOranges.java) — multi-source BFS
- [Number of Islands](./NumberOfIslands.java) — flood fill on a grid
- [Topological Sort](./TopologicalSort.java) — ordering a precedence graph
