---
title: Sort by Frequency of Characters
leetcode: null
difficulty: Medium
patterns: [Frequency counting, Custom ordering]
companies: [Amazon, Meta, Google, Uber]
frequency: 2
tags: [hashmap, string, frequency-counting, sorting]
sampleInput: |
  tree
sampleOutput: "eert"
---

# Sort by Frequency of Characters

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Frequency counting · Custom ordering |
| **Interview heat** | ★★☆☆☆ |
| **Asked at** | Amazon, Meta, Google, Uber |

## Problem Statement

Reorder the characters of a string so that the most frequent character comes first,
the second most frequent comes next, and so on.

- Characters with the **same frequency** are ordered by their character code, the
  smaller one first — this makes the output deterministic.
- `"tree"` → `"eert"`: `e` occurs twice, `r` and `t` occur once each, and `r` comes
  before `t`.

## Input Format

The program reads from standard input:

```
s
```

- `s` — the string to reorder (1 ≤ |s| ≤ 10⁵), on a single line, no quotes.

## Sample Input

```
tree
```

## Expected Output

```
eert
```

## Approach — Count, sort the distinct characters, write them out

1. Count the occurrences of every character in a hash map.
2. Sort the **distinct** characters with a custom comparator:
   - primary key: frequency, descending
   - secondary key: character code, ascending
3. Write every character as often as it was counted.

**Why the tie-break matters:** without it, two characters with the same frequency
could be emitted in any order, and the output would not be reproducible.

**Why sorting the distinct characters (k of them) is cheaper than sorting the whole
string (n characters):** k ≤ 26 for lowercase English, so the sort is tiny.

## Dry Run

Input: `s = "tree"` — `t r e e`

### Phase 1 — count the characters

| Step | index | char | `counts` after |
|---:|---:|---|---|
| 1 | 0 | `t` | `{t: 1}` |
| 2 | 1 | `r` | `{t: 1, r: 1}` |
| 3 | 2 | `e` | `{t: 1, r: 1, e: 1}` |
| 4 | 3 | `e` | `{t: 1, r: 1, e: 2}` |

### Phase 2 — sort the distinct characters

| character | frequency | compared with | verdict | order |
|---|---:|---|---|---:|
| `e` | 2 | highest frequency | first | 1 |
| `r` | 1 | same frequency as `t` → `r` < `t` | second | 2 |
| `t` | 1 | same frequency as `r` → `t` > `r` | third | 3 |

### Phase 3 — write every character out

| step | character | copies | output so far |
|---:|---|---:|---|
| 1 | `e` | 2 | `ee` |
| 2 | `r` | 1 | `eer` |
| 3 | `t` | 1 | `eert` |

Final answer: **`eert`**

### A case with a clear winner — `s = "abbaa"`

| character | frequency |
|---|---:|
| `a` | 3 |
| `b` | 2 |

Sorted order: `a`, `b` → output **`aaabb`**

## Java Solution

See [`FrequencySort.java`](./FrequencySort.java).

```java
public static String frequencySort(String s) {
    Map<Character, Integer> counts = new HashMap<>();
    for (char c : s.toCharArray()) {
        counts.merge(c, 1, Integer::sum);
    }
    List<Map.Entry<Character, Integer>> entries = new ArrayList<>(counts.entrySet());
    entries.sort((a, b) -> {
        int byFrequency = b.getValue() - a.getValue();
        if (byFrequency != 0) {
            return byFrequency;
        }
        return Character.compare(a.getKey(), b.getKey());
    });
    StringBuilder sb = new StringBuilder();
    for (Map.Entry<Character, Integer> entry : entries) {
        for (int i = 0; i < entry.getValue(); i++) {
            sb.append(entry.getKey());
        }
    }
    return sb.toString();
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n + k log k) | n counting increments plus a sort of the k distinct characters |
| **Space** | O(k) | The map and the list of entries |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the tie-break should be the *first* occurrence instead?"* → store the
  first index of every character and use it as the secondary key.
- *"How would you do it with a bucket sort?"* → one bucket per frequency, then walk
  the buckets from the highest frequency down: O(n + max frequency).
- *"What if you had to keep the relative order of the equal-frequency characters?"* →
  that is the stable variant: bucket the characters by frequency and fill the buckets
  in first-occurrence order.
- *"Can it be done in O(n)?"* → yes, with bucket sort: the number of buckets is bounded
  by the maximum frequency, which is at most n.

**Common mistakes:**
- ❌ Forgetting the **tie-break** → the output order is not deterministic.
- ❌ Sorting the **characters** instead of the distinct characters → O(n log n)
  instead of O(n + k log k).
- ❌ Getting the comparator **backwards** (`a.getValue() - b.getValue()`) → the
  *least* frequent character ends up first.
- ❌ Comparing the frequencies with `==` in the comparator → all the ties are treated
  as equal and the secondary key never runs.

**How to narrate:**
> "I count the characters in a hash map, then sort the distinct characters by
> frequency descending with a tie-break on the character code, and finally write each
> character out as many times as it was counted. Counting is O(n) and the sort only
> touches the distinct characters, so it's O(n + k log k) with k the alphabet size."

## Related Problems

- [Valid Anagram](../../../../../../docs/topics/02-strings.md) — counting characters with a map
- [First Unique Character in a String](../../../../../../docs/topics/09-hashing.md) — counting characters with a map
- [Group Anagrams](../../../../../../docs/topics/09-hashing.md) — grouping words by a canonical key
