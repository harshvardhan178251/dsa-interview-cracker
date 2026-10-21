---
title: Camelcase Matching
leetcode: 1253
difficulty: Medium
patterns: [Two pointers, Case rules]
companies: [Google, Adobe, Bloomberg]
frequency: 3
tags: [two-pointers, strings, case, matching]
sampleInput: |
  3
  FooBar
  FootBall
  FrameBuffer
  3
  FB
  FBar
  Buffer
sampleOutput: |
  0 1
  0
  0
---

# Camelcase Matching — LeetCode 1253

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Two pointers · Case rules |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

A query matches a pattern when the pattern can be turned into the query by **inserting
lowercase English letters** at arbitrary positions (inserting nothing is allowed).

Read it the other way round and the rule becomes crystal clear: **the query reduces to
the pattern by deleting some lowercase letters**. Uppercase letters can never be
deleted, so every uppercase letter of the query must be part of the pattern.

For the pattern `FB`:

| query | matches? | why |
|---|---|---|
| `FooBar` | yes | `F` + `oo` + `B` + `ar` — only lowercase letters were inserted |
| `FooBarTest` | no | the tail `arTest` contains an uppercase `T`, which could not have been inserted |
| `FootBall` | yes | `F` + `oot` + `B` + `all` |
| `FrameBuffer` | yes | `F` + `rame` + `B` + `uffer` |
| `ForceFeedBack` | no | the segment between `F` and `B` contains an uppercase `F` |

## Input Format

The program reads from standard input:

```
n
query1
...
queryn
m
pattern1
...
patternm
```

- `n` — how many queries follow
- the queries — one per line, English letters
- `m` — how many patterns follow
- the patterns — one per line, English letters

## Sample Input

```
3
FooBar
FootBall
FrameBuffer
3
FB
FBar
Buffer
```

## Expected Output

```
0 1
0
0
```

One line per query: the indices of the patterns it matches, in ascending order. The
line is **empty** when the query matches no pattern.

## Approach — two pointers, one rule

Walk the query and the pattern with two pointers:

- if the characters are **equal**, consume both (the pattern character is matched),
- otherwise the query character was *inserted* — that is only allowed when it is
  **lowercase**; if it is uppercase the match is impossible and we stop,
- when the query is exhausted the pattern must be exhausted too.

```java
public static boolean matches(String query, String pattern) {
    int i = 0, j = 0;
    while (i < query.length()) {
        if (j < pattern.length() && query.charAt(i) == pattern.charAt(j)) {
            i++; j++;
        } else if (Character.isUpperCase(query.charAt(i))) {
            return false;   // an uppercase query letter must belong to the pattern
        } else {
            i++;            // this lowercase letter was inserted into the pattern
        }
    }
    return j == pattern.length();
}
```

The comparison is **case sensitive**: the pattern characters keep their case, so `A`
matches `A` but not `a`.

## Dry Run

Query `FooBar` against the patterns:

**Pattern `FB`**

| Step | i | query[i] | j | pattern[j] | action |
|---:|---:|---|---:|---|---|
| 1 | 0 | `F` | 0 | `F` | equal → i=1, j=1 |
| 2 | 1 | `o` | 1 | `B` | different, `o` is lowercase → skip, i=2 |
| 3 | 2 | `o` | 1 | `B` | different, lowercase → skip, i=3 |
| 4 | 3 | `B` | 1 | `B` | equal → i=4, j=2 |
| 5 | 4 | `a` | 2 | — | the pattern is exhausted, `a` is lowercase → skip |
| 6 | 5 | `r` | 2 | — | lowercase → skip |
| 7 | — | end | 2 | — | `j == pattern.length()` → **true** ✓ |

**Pattern `FBar`**

| Step | i | query[i] | j | pattern[j] | action |
|---:|---:|---|---:|---|---|
| 1 | 0 | `F` | 0 | `F` | equal → i=1, j=1 |
| 2 | 1 | `o` | 1 | `B` | lowercase → skip |
| 3 | 2 | `o` | 1 | `B` | lowercase → skip |
| 4 | 3 | `B` | 1 | `B` | equal → i=4, j=2 |
| 5 | 4 | `a` | 2 | `a` | equal → i=5, j=3 |
| 6 | 5 | `r` | 3 | `r` | equal → i=6, j=4 |
| 7 | — | end | 4 | — | `j == pattern.length()` → **true** ✓ |

**Pattern `Buffer`**

| Step | i | query[i] | j | pattern[j] | action |
|---:|---:|---|---:|---|---|
| 1 | 0 | `F` | 0 | `B` | different, `F` is **uppercase** → **false** ✗ |

So `FooBar` matches the patterns `0` (`FB`) and `1` (`FBar`) → the line is `0 1`.

**Query `FootBall`**

| pattern | result |
|---|---|
| `FB` | `F` matches, `o`,`o`,`t` are skipped, `B` matches, tail `all` is lowercase → **true** → index `0` |
| `FBar` | `F` matches, `o`,`o`,`t` skipped, `B` matches, `a` matches, then `r` vs `l`: `l` is skipped, `l` is skipped, the query ends but `r` is unmatched → **false** |
| `Buffer` | `F` vs `B` → uppercase → **false** |

So the line is `0`.

**Query `FrameBuffer`**

| pattern | result |
|---|---|
| `FB` | `F` matches, `r`,`a`,`m`,`e` skipped, `B` matches, tail `uffer` is lowercase → **true** → index `0` |
| `FBar` | after `B` the pattern wants `a` but the query has `u` — `u`,`f`,`f`,`e`,`r` are lowercase and get skipped, then the query ends with `r` unmatched → **false** |
| `Buffer` | `F` vs `B` → uppercase → **false** |

So the line is `0`.

## Java Solution

See [`CamelCaseMatching.java`](./CamelCaseMatching.java).

```java
public static boolean matches(String query, String pattern) {
    int i = 0; // index into the query
    int j = 0; // index into the pattern
    while (i < query.length()) {
        if (j < pattern.length() && query.charAt(i) == pattern.charAt(j)) {
            i++;
            j++;
        } else if (Character.isUpperCase(query.charAt(i))) {
            return false; // an uppercase query letter must belong to the pattern
        } else {
            i++; // this lowercase letter was inserted into the pattern
        }
    }
    return j == pattern.length();
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(sum of the query lengths) per pattern | One pass over the query |
| **Space** | O(1) | Only two pointers |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the pattern may also contain `.`?"* → the wildcard tries every character
  (backtracking), or you use a DP table.
- *"Return the matching patterns instead of the indices."* → the same walk, collecting
  the pattern.
- *"Do it for many patterns at once."* → a trie of the patterns, or a hash map from the
  pattern's uppercase letters to the candidates.

**Common mistakes:**
- ❌ Comparing **case-insensitively** → the pattern characters keep their case, so `A`
  never matches `a`.
- ❌ Skipping an uppercase query character → uppercase letters can never be inserted.
- ❌ Forgetting to check `j == pattern.length()` at the end → a query that is a prefix
  of the pattern would match.
- ❌ Continuing to match after the pattern is exhausted → the tail of the query must
  consist of lowercase letters only.

**How to narrate:**
> "The pattern matches the query if the query can be reduced to the pattern by deleting
> lowercase letters. So I walk both with two pointers: equal characters are consumed,
> a lowercase query character that does not match is an inserted letter and gets
> skipped, and an uppercase one that does not match means the answer is no. At the end
> the pattern must be fully consumed. O(n) per pattern."

## Related Problems

- [Implement Trie](./ImplementTrie.java) — prefix matching in a trie
- [Design Add and Search Words](./DesignAddAndSearchWords.java) — wildcard matching
- [Camelcase Matching](./CamelCaseMatching.java) — the same walk, many patterns
