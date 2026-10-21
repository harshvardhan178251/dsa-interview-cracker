---
title: Hashing — concept notes
order: 9
summary: Turning "have I seen this?" into O(1) — the four counting idioms, hashing pitfalls, and the moment a hash map stops being the right answer.
---

# Hashing — concept notes

## The mental model

A hash map turns a key into an array index via a hash function, so lookups are O(1)
instead of O(n).

**The key insight of almost every hashing problem:** if the question is *"have I seen
this before?"*, *"how many times has this appeared?"*, or *"can I group these by some
property?"*, the answer is a hash map.

---

## The four counting idioms

Almost every counting problem is one of these four.

### 1. Count occurrences

```java
Map<String, Integer> counts = new HashMap<>();
for (String word : words) {
    counts.merge(word, 1, Integer::sum);
}
```

`merge(key, value, remappingFunction)` is the cleanest form: it does a get, and only
puts when the key is absent.

### 2. Count with a default

```java
int count = counts.getOrDefault(word, 0);
```

Or `counts.computeIfAbsent(word, k -> 0)++;` — but prefer `merge` for pure counting.

### 3. Group by a key

```java
Map<Integer, List<String>> byLength = new HashMap<>();
for (String word : words) {
    byLength.computeIfAbsent(word.length(), k -> new ArrayList<>()).add(word);
}
```

`computeIfAbsent` is the workhorse of grouping. The mapping function must return a
**new** value each time, or you will share mutable state across keys.

### 4. Detect a duplicate in one pass

```java
Set<Integer> seen = new HashSet<>();
for (int x : nums) {
    if (!seen.add(x)) return true;    // add() returns false if it was already there
}
```

`Set.add` returning `false` on a duplicate is the tightest duplicate-detection idiom in
Java.

---

## When to use an array instead of a map

**If the value range is small and known, use an array.** It is faster, allocates less, and
avoids boxing.

```java
int[] counts = new int[26];            // lowercase letters
for (char c : s.toCharArray()) counts[c - 'a']++;
```

| Situation | Use |
|---|---|
| Lowercase English letters | `int[26]` |
| Digits | `int[10]` |
| ASCII printable | `int[128]` |
| Values in 0..1000 | `int[1001]` |
| Arbitrary values | `HashMap` |
| Values in a huge sparse range | `HashMap` (an array would OOM) |

**Say this in the interview:** "since the alphabet is fixed at 26 letters, I'll use a
frequency array instead of a hash map — O(1) and no hashing overhead."

---

## The prefix-sum + hash map pattern

The most valuable hashing pattern, and the one that solves "subarray sum equals K".

```java
public static int subarraySum(int[] nums, int k) {
    Map<Integer, Integer> prefixCounts = new HashMap<>();
    prefixCounts.put(0, 1);                    // the empty prefix
    int sum = 0, result = 0;

    for (int x : nums) {
        sum += x;
        result += prefixCounts.getOrDefault(sum - k, 0);
        prefixCounts.merge(sum, 1, Integer::sum);
    }
    return result;
}
```

**The idea:** if `prefix[j] - prefix[i] == k`, then `prefix[i] == prefix[j] - k`. So while
scanning, look up how many times `sum - k` has appeared before.

**`prefixCounts.put(0, 1)` is essential.** It represents the empty prefix, and without
it every subarray starting at index 0 is missed. **This is the single most common bug in
this problem.** Say why you put it there.

**The order matters:** look up first, then insert. If you insert first, you would count
the empty subarray.

**The extension:** "count subarrays with sum at most k" — use a sliding window instead.
"Longest subarray with sum k" — store the *earliest* index for each prefix sum, and
overwrite only when the sum repeats.

---

## Grouping by a canonical key

**Group Anagrams (LC 49):**

```java
Map<String, List<String>> groups = new HashMap<>();
for (String word : words) {
    char[] chars = word.toCharArray();
    Arrays.sort(chars);
    groups.computeIfAbsent(new String(chars), k -> new ArrayList<>()).add(word);
}
```

**The canonical key** is a form of the word where the order of the characters does not
matter. Three options:

| Key | Cost | When |
|---|---|---|
| Sorted characters | O(n log n) per word | Simple, always works |
| Frequency array | O(n) per word | Fixed alphabet |
| Frequency array as a string | O(n) per word, some allocation | Fixed alphabet, hashable |

**Mention the trade-off**: "I could use a frequency array for O(n), but sorting is simpler
and O(n log n) is fine here."

**The same pattern solves:** group by anagram, group by digit signature (LC 869), group
words by their sorted letters.

---

## Set-based problems

**Longest Consecutive Sequence (LC 128)** — the set trick:

```java
public static int longestConsecutive(int[] nums) {
    Set<Integer> values = new HashSet<>(Arrays.asList(nums));
    int best = 0;
    for (int x : values) {
        if (values.contains(x - 1)) continue;    // not the start of a sequence
        int length = 1;
        while (values.contains(x + length)) length++;
        best = Math.max(best, length);
    }
    return best;
}
```

**Why the `contains(x - 1)` check:** without it, you would re-scan the same sequence from
every element in it, making it O(n²). With it, each sequence is scanned exactly once.

**Why a set and not a sorted array?** Because `contains` on a hash set is O(1), so the
inner loop is O(length) rather than O(n) per step. Both approaches are O(n) overall; the
set version avoids sorting.

**The expected-vs-worst-case caveat:** a `HashSet` is O(1) *expected*, and O(n) in the
worst case under hash collisions. Java 8+ treeifies buckets, bounding it at O(log n).

---

## Set operations and how they differ

| | `HashSet` | `TreeSet` | `LinkedHashSet` |
|---|---|---|---|
| Order | none | sorted | insertion order |
| `contains` | O(1) avg | O(log n) | O(1) avg |
| Iteration | arbitrary | sorted | insertion |
| `first()`/`last()` | no | yes | no |
| `floor`/`ceiling` | no | **yes** | no |

**`TreeSet` is the underused one.** `floor(key)` and `ceiling(key)` answer "largest value
≤ x" and "smallest value ≥ x" in O(log n). Many "premium" problems reduce to that.

**`LinkedHashSet` gives you insertion order AND O(1) contains** — the right structure when
you need to remember the order but also dedupe.

---

## Hashing pitfalls

**1. Mutable keys.** If the key's `hashCode` changes after it is in the map, the entry
becomes unreachable. Use immutable keys — `String`, `Integer`, or a `record`.

**2. Forgetting `equals` and `hashCode` on a custom key.** Two objects that are `equals`
must have the same `hashCode`. If you override `equals` but not `hashCode`, the map
silently misbehaves.

**3. Modifying the key object.** The same problem as (1).

**4. Using `null` as a "not found" marker** when `null` is also a valid value.

**5. `HashMap` iteration order is not insertion order.** If you need insertion order, use
`LinkedHashMap`.

**6. Concurrent modification.** Modifying a `HashMap` while iterating it (other than via
`Iterator.remove()`) throws `ConcurrentModificationException`.

**7. The `containsKey` + `get` race.** Two separate calls on a concurrent map are not
atomic. Use `getOrDefault`, `merge`, or `computeIfAbsent`.

---

## When a hash map is the wrong answer

| Situation | Better tool |
|---|---|
| You need the k smallest/largest | A heap of size k |
| You need ordered iteration | A `TreeMap` / `TreeSet` |
| The range is small and fixed | An array |
| You need to count with a bounded key space | An array |
| The map would hold millions of entries and you only need the hot ones | A cache with eviction |
| You need range queries over keys | A `TreeMap` with `subMap`, or a Fenwick tree / segment tree |
| You need prefix sums | A prefix-sum array |

**The most common mistake in an interview:** using a `HashMap` where an array would do,
and then saying "O(n) time" without noticing the constant factor and the allocation.

---

## Common traps

| Trap | Why it bites |
|---|---|
| Forgetting `prefixCounts.put(0, 1)` | Every subarray starting at index 0 is missed |
| Inserting before looking up | You count the empty subarray |
| Using `HashMap` with a mutable key | The entry becomes unreachable |
| Overriding `equals` without `hashCode` | Silent misbehaviour |
| Expecting `HashMap` iteration order | It is not insertion order and not sorted |
| Using a `HashMap` where the range is small | An array is faster and clearer |
| `containsKey` followed by `get` | Not atomic; use `computeIfAbsent` |
| Reusing a `Map.Entry` from a `HashMap` after modifying the map | The entry is invalidated |
| Assuming O(1) is guaranteed | It is expected; pathological inputs can degrade |

---

## Complexity cheat sheet

| Operation | Time |
|---|---|
| `get`, `put`, `remove`, `containsKey` | O(1) expected, O(log n) with treeified buckets |
| `contains` on a `HashSet` | O(1) expected |
| Iteration | O(n) |
| Counting frequencies | O(n) |
| Grouping | O(n) |
| Subarray sum equals K | O(n) |
| Longest consecutive sequence | O(n) |
| `TreeMap` / `TreeSet` operations | O(log n) |

---

## How to crack it in an interview

1. **Say what the map holds:** "a map from value to the index where I last saw it" — or
   "value to count", or "canonical form to the list of items". This is the design.
2. **Ask whether the value range is small.** "Since the input is lowercase English, I'll
   use a 26-element array instead of a map."
3. **For prefix-sum problems, say why you seed the map with `0 → 1`.** It shows you
   understand the empty prefix.
4. **State the complexity honestly:** "expected O(1) per operation".
5. **Mention the `TreeMap` alternative** when ordering or range queries matter.
6. **For duplicates, use `Set.add`'s return value** — it is the tightest idiom.
