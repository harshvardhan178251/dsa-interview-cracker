---
title: Longest Prefix of a Phone Number
leetcode: 17
difficulty: Medium
patterns: [Trie, Prefix walk]
companies: [Google, Netflix, Microsoft, Capgemini, Atlassian]
frequency: 3
tags: [trie, strings, prefix, phone]
sampleInput: |
  3
  1234567890
  123
  9876543210
  3
  12345
  98765
  123
sampleOutput: |
  12345
  98765
  123
---

# Longest Prefix of a Phone Number — LeetCode 17

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Trie · Prefix walk |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

A phone company stores its numbers in a trie. For every query, report the **longest
prefix** of the query that is also the beginning of one of the stored numbers.

Stored numbers: `1234567890`, `123`, `9876543210`.

| query | answer | why |
|---|---|---|
| `12345` | `12345` | it is the beginning of `1234567890` |
| `98765` | `98765` | it is the beginning of `9876543210` |
| `123` | `123` | it is stored as a complete number |

## Input Format

The program reads from standard input:

```
n
number1
...
numbern
m
query1
...
querym
```

- `n` — how many phone numbers are stored
- the numbers — one per line, digits
- `m` — how many queries follow
- the queries — one per line, digits

## Sample Input

```
3
1234567890
123
9876543210
3
12345
98765
123
```

## Expected Output

```
12345
98765
123
```

One line per query. The line is **empty** when no prefix of the query matches.

## Approach — walk the trie as far as you can

Every stored number is a path in the trie. A prefix of a query matches when the trie
has a path with that prefix — so the answer is simply the longest prefix of the query
that the trie can follow:

```java
public String longestPrefix(String query) {
    TrieNode node = root;
    StringBuilder best = new StringBuilder();
    for (int i = 0; i < query.length(); i++) {
        char c = query.charAt(i);
        if (!node.hasChild(c)) {
            break; // no stored number continues with this digit
        }
        node = node.child(c);
        best.append(c);
    }
    return best.toString();
}
```

The walk stops at the first digit the trie does not know. Everything read so far is
the longest matching prefix.

Note that the answer does **not** have to be a complete phone number: `12345` is only
the *beginning* of `1234567890`, and that is exactly what is asked for.

## Dry Run

The trie of the three stored numbers:

```
root ─1─> 1 ─2─> 2 ─3─> 3 ─4─> 4 ─5─> 5 ─6─> 6 ─7─> 7 ─8─> 8 ─9─> 9 ─0─> 0   (1234567890)
             │         └─ (end of word: 123)
             └─9─> 9 ─8─> 8 ─7─> 7 ─6─> 6 ─5─> 5 ─4─> 4 ─3─> 3 ─2─> 2 ─1─> 1 ─0─> 0   (9876543210)
```

Query `12345`:

| Step | digit | child exists? | `best` |
|---:|---|---|---|
| 1 | `1` | yes (`1`) | `1` |
| 2 | `2` | yes (`12`) | `12` |
| 3 | `3` | yes (`123`) | `123` |
| 4 | `4` | yes (`1234`, the branch of `1234567890`) | `1234` |
| 5 | `5` | yes (`12345`) | `12345` |
| — | end of query | — | **`12345`** |

Query `98765`:

| Step | digit | child exists? | `best` |
|---:|---|---|---|
| 1 | `9` | yes | `9` |
| 2 | `8` | yes | `98` |
| 3 | `7` | yes | `987` |
| 4 | `6` | yes | `9876` |
| 5 | `5` | yes | `98765` |
| — | end of query | — | **`98765`** |

Query `123`:

| Step | digit | child exists? | `best` |
|---:|---|---|---|
| 1 | `1` | yes | `1` |
| 2 | `2` | yes | `12` |
| 3 | `3` | yes | `123` |
| — | end of query | — | **`123`** |

### A query with no match

Query `555`: step 1 fails immediately (the root has no child `5`) → the answer is the
empty string, and the output line is empty.

## Java Solution

See [`LongestPrefixOfAPhoneNumber.java`](./LongestPrefixOfAPhoneNumber.java).

```java
public static class PhoneTrie {

    private final TrieNode root = new TrieNode();

    public void insert(String number) {
        TrieNode node = root;
        for (int i = 0; i < number.length(); i++) {
            node = node.getOrCreateChild(number.charAt(i));
        }
        node.isEndOfWord = true;
    }

    public String longestPrefix(String query) {
        TrieNode node = root;
        StringBuilder best = new StringBuilder();
        for (int i = 0; i < query.length(); i++) {
            char c = query.charAt(i);
            if (!node.hasChild(c)) {
                break;
            }
            node = node.child(c);
            best.append(c);
        }
        return best.toString();
    }
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(total length of the numbers) to build, O(L) per query | One step per digit |
| **Space** | O(total length of the numbers) | One node per distinct prefix |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the phone numbers are stored in a database?"* → build the trie lazily from
  the numbers that share a prefix, or use a sorted list and binary search for the
  range of numbers with the given prefix.
- *"How would you delete a number?"* → walk the path and unlink the leaf.
- *"How many stored numbers start with `123`?"* → keep a counter in the trie nodes; see
  [Trie with Prefix Counting](./PrefixCount.java).

**Common mistakes:**
- ❌ Stopping at the first node that is the end of a word → the answer may be longer
  (the query `12345` matches even though `123` is a complete number).
- ❌ Forgetting that the answer can be empty → the output line is empty, not `null`.
- ❌ Comparing whole strings instead of walking the trie.

**How to narrate:**
> "I put every phone number into a trie. A query is answered by walking down the trie
> as long as the next digit exists; the last digit I could follow is the longest
> matching prefix. The answer does not have to be a complete number — it is the longest
> common prefix with one of the stored numbers."

## Related Problems

- [Implement Trie](./ImplementTrie.java) — the structure
- [Trie with Prefix Counting](./PrefixCount.java) — counts instead of matching
- [Longest Prefix of a Phone Number](./LongestPrefixOfAPhoneNumber.java) — the same idea without a trie
