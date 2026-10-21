---
title: Group Anagrams
leetcode: 49
difficulty: Medium
patterns: [Hashing, Canonical key]
companies: [Meta, Google, Uber, Facebook, Lyft, Tech Mahindra, Infosys, Razorpay]
frequency: 4
tags: [hashmap, string, sorting, grouping]
sampleInput: |
  6
  eat
  tea
  tan
  nat
  ate
  bat
sampleOutput: |
  ate eat tea
  bat
  nat tan
---

# Group Anagrams — LeetCode 49

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Hashing · Canonical key |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Uber, Meta, Google, Bloomberg |

## Problem Statement

Given an array of strings, group the words that are **anagrams** of each other.

- Every group is printed on its own line, the words of a group separated by spaces.
- The order of the words inside a group and the order of the groups are fixed by this
  program so that the output is deterministic:
  - the words of a group are sorted alphabetically,
  - the groups are ordered by their first (smallest) word.

## Input Format

The program reads from standard input:

```
n
word[0]
word[1]
...
word[n-1]
```

- `n` — the number of words (1 ≤ n ≤ 10⁴).
- The next `n` lines each hold one lowercase word.

## Sample Input

```
6
eat
tea
tan
nat
ate
bat
```

## Expected Output

```
ate eat tea
bat
nat tan
```

`eat`, `tea` and `ate` all use the letters a, e and t; `tan` and `nat` use a, n and t;
`bat` stands alone.

## Approach — A canonical key per word

Two words are anagrams **exactly when their sorted letters are equal**. So the
sorted letters of a word are its **canonical key**, and all anagrams share the same
key:

1. Sort the letters of the word → the key.
2. Put the word into the bucket of that key in a hash map.
3. At the end, every bucket is one group.

**Why this beats comparing every pair:** comparing all pairs is O(n² · k). Grouping
by key is O(n · k log k) — one sort per word and a constant-time map lookup.

**The output order** is made deterministic in two steps: sort the words inside each
group, then sort the groups by their first word. Two different groups can never have
the same first word, because that word would belong to both groups.

## Dry Run

Input: `eat tea tan nat ate bat`

### Phase 1 — put every word into the bucket of its canonical key

| Step | word | sorted letters (key) | `groups` after |
|---:|---|---|---|
| 1 | `eat` | `aet` | `{aet: [eat]}` |
| 2 | `tea` | `aet` | `{aet: [eat, tea]}` |
| 3 | `tan` | `ant` | `{aet: [eat, tea], ant: [tan]}` |
| 4 | `nat` | `ant` | `{aet: [eat, tea], ant: [tan, nat]}` |
| 5 | `ate` | `aet` | `{aet: [eat, tea, ate], ant: [tan, nat]}` |
| 6 | `bat` | `abt` | `{aet: [eat, tea, ate], ant: [tan, nat], abt: [bat]}` |

### Phase 2 — sort the words inside every group

| group key | words before | words after | first word |
|---|---|---|---|
| `aet` | `[eat, tea, ate]` | `[ate, eat, tea]` | `ate` |
| `ant` | `[tan, nat]` | `[nat, tan]` | `nat` |
| `abt` | `[bat]` | `[bat]` | `bat` |

### Phase 3 — order the groups by their first word

| order | first word | group |
|---:|---|---|
| 1 | `ate` | `ate eat tea` |
| 2 | `bat` | `bat` |
| 3 | `nat` | `nat tan` |

Final output:

```
ate eat tea
bat
nat tan
```

## Java Solution

See [`GroupAnagrams.java`](./GroupAnagrams.java).

```java
public static List<List<String>> groupAnagrams(String[] strs) {
    Map<String, List<String>> groups = new HashMap<>();
    for (String word : strs) {
        char[] letters = word.toCharArray();
        Arrays.sort(letters);
        String key = new String(letters);
        groups.computeIfAbsent(key, k -> new ArrayList<>()).add(word);
    }
    List<List<String>> result = new ArrayList<>();
    for (List<String> group : groups.values()) {
        Collections.sort(group);
        result.add(group);
    }
    result.sort((a, b) -> a.get(0).compareTo(b.get(0)));
    return result;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n · k log k) | One sort of k letters per word, plus the group ordering |
| **Space** | O(n · k) | The keys and the buckets hold every character |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you avoid sorting every word?"* → yes, with a 26-element frequency vector as
  the key (`"aab" → "1#2#1#0#…"`), which is O(n · k) overall.
- *"What if the words are very long?"* → the counting key is O(k) per word but does
  not allocate a new array each time.
- *"How would you group them in a streaming fashion?"* → maintain the map of buckets
  as the words arrive; that is exactly what the algorithm does.
- *"How would you find the group with the most anagrams?"* → track the largest
  bucket while filling the map.

**Common mistakes:**
- ❌ Using the word itself as the key → the anagrams end up in different buckets.
- ❌ Only comparing the **sorted** strings pairwise → O(n²) instead of O(n).
- ❌ Forgetting that a word can appear **twice** → the bucket must be a list, not a
  single value.
- ❌ Relying on the **hash map's iteration order** for the output → it is not
  deterministic; sort the groups explicitly.

**How to narrate:**
> "Two words are anagrams exactly when their sorted letters are identical, so I use
> the sorted letters as a hash key and drop every word into the bucket of that key.
> One sort per word plus a map lookup, so O(n · k log k). To make the output
> deterministic I sort the words inside each group and then order the groups by their
> first word."

## Related Problems

- [Valid Anagram](../../../../../../docs/topics/02-strings.md) — the pairwise version of the same idea
- [FrequencySort](../../../../../../docs/topics/09-hashing.md) — counting instead of canonical keys
- [Valid Number](../../../../../../docs/topics/02-strings.md) — another canonical-form trick
