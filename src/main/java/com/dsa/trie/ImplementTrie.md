---
title: Implement Trie
leetcode: 208
difficulty: Medium
patterns: [Trie, Prefix tree]
companies: [Amazon, Google, Meta, Uber, Twitter]
frequency: 4
tags: [trie, design, prefix-tree, strings]
sampleInput: |
  3
  apple
  app
  application
  4
  search app
  startsWith appl
  insert banana
  search banan
sampleOutput: |
  true
  true
  ok
  false
---

# Implement Trie — LeetCode 208

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Trie · Prefix tree |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Twitter |

## Problem Statement

Implement a **prefix tree** with three operations:

- `insert(word)` — add a word to the trie,
- `search(word)` — is the exact word present?
- `startsWith(prefix)` — does any inserted word start with the prefix?

```
        (root)
          |
          a
          |
          p ── p
          |    |
          p    l ── e
          |
          l ── e
```

`app` is a word, `appl` is a prefix of `apple` but not a word.

## Input Format

The program reads from standard input:

```
n
word1
...
wordn
m
op1
...
opm
```

- `n` — how many words are inserted before the operations run
- the words — one per line, lowercase English letters
- `m` — how many operations follow
- the operations — one per line, each `insert <word>`, `search <word>` or
  `startsWith <prefix>`

## Sample Input

```
3
apple
app
application
4
search app
startsWith appl
insert banana
search banan
```

## Expected Output

```
true
true
ok
false
```

One line per operation: `ok` for an insert, `true`/`false` for the two queries.

## Approach — one node per prefix

A trie is a tree where each node holds:

- a **map from a letter to the child node** that continues with that letter,
- a **flag** saying whether a word ends exactly here.

| operation | walk |
|---|---|
| `insert` | create the missing children on the way down, then set the end flag |
| `search` | walk down; fail if a child is missing; succeed if the end flag is set |
| `startsWith` | walk down; succeed as soon as the prefix is fully matched |

`search` and `startsWith` differ only in the final check: the word must **end** at the
node for `search`, while for `startsWith` the node just has to **exist**.

The helper `com.dsa.utils.TrieNode` already provides the children map, the end flag and
the `hasChild` / `child` / `getOrCreateChild` helpers.

## Dry Run

Input: insert `apple`, `app`, `application`, then the four operations.

After the three inserts the trie looks like this (only the shared prefix `app` is
drawn):

```
root ─a─> a ─p─> p ─p─> p ─l─> l ─e─> e   (apple: end flag)
                    └──────> l ─e─> e      (application continues)
```

| Step | operation | path walked | node reached | end flag? | answer |
|---:|---|---|---|---|---|
| 1 | `search app` | root → a → p → p | the node after `app` | **yes** | `true` |
| 2 | `startsWith appl` | root → a → p → p → l | the node after `appl` | no (it is only a prefix) | `true` ✓ |
| 3 | `insert banana` | root → b → a → n → a → n → a | creates `b`,`a`,`n`,`a`,`n`,`a` | set on the last one | `ok` |
| 4 | `search banan` | root → b → a → n → a → n | the node after `banan` | **no** — `banana` was inserted, `banan` was not | `false` |

Step 2 is the interesting one: `appl` is not a word, but it **is** a prefix of `apple`
and `application`, so `startsWith` returns `true` while `search` would return `false`.

## Java Solution

See [`ImplementTrie.java`](./ImplementTrie.java).

```java
public static class Trie {

    private final TrieNode root = new TrieNode();

    public void insert(String word) {
        TrieNode node = root;
        for (int i = 0; i < word.length(); i++) {
            node = node.getOrCreateChild(word.charAt(i));
        }
        node.isEndOfWord = true;
    }

    public boolean search(String word) {
        TrieNode node = walk(word);
        return node != null && node.isEndOfWord;
    }

    public boolean startsWith(String prefix) {
        return walk(prefix) != null;
    }

    private TrieNode walk(String text) {
        TrieNode node = root;
        for (int i = 0; i < text.length(); i++) {
            if (!node.hasChild(text.charAt(i))) {
                return null;
            }
            node = node.child(text.charAt(i));
        }
        return node;
    }
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(L) per operation | `L` = the length of the word; one step per character |
| **Space** | O(total characters inserted) | One node per distinct prefix |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Add `delete(word)`."* → walk down remembering the path and then unlink the last
  node from its parent; you may also want to prune the now-empty nodes.
- *"How many words start with `pre`?"* → keep a counter in every node; see
  [Trie with Prefix Counting](./PrefixCount.java).
- *"When is a trie better than a hash set?"* → when you need prefix queries
  (`startsWith`, autocomplete) or when the alphabet is small and the memory overhead is
  acceptable.
- *"Search for a word with wildcards."* → see
  [Design Add and Search Words](./DesignAddAndSearchWords.java).

**Common mistakes:**
- ❌ Forgetting the **end flag** → `search("app")` would also return `true` for a trie
  that only contains `apple`.
- ❌ Using a fixed-size array of 26 children → wastes memory when the alphabet is
  larger; a map is more flexible.
- ❌ Sharing the nodes between two tries by accident → each trie needs its own root.

**How to narrate:**
> "A trie is a tree of prefixes: every node has a map of children keyed by a letter
> and a flag that marks the end of a word. Inserting walks down and creates what is
> missing; searching walks down and checks the flag; startsWith walks down and only
> checks that the node exists. Every operation is linear in the length of the word."

## Related Problems

- [Design Add and Search Words](./DesignAddAndSearchWords.java) — adds wildcard search
- [Trie with Prefix Counting](./PrefixCount.java) — counts the words under a prefix
- [Word Search II](./WordSearchII.java) — the trie used to prune a grid search
