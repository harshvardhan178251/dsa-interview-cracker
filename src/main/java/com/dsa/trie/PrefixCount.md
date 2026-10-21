---
title: Trie with Prefix Counting
leetcode: null
difficulty: Medium
patterns: [Trie, Augmented node state]
companies: [Amazon, Google, Meta]
frequency: 3
tags: [trie, design, counting, prefix]
sampleInput: |
  3
  apple
  app
  banana
  3
  count app
  insert applet
  count app
sampleOutput: |
  2
  ok
  3
---

# Trie with Prefix Counting

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Trie · Augmented node state |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta |

## Problem Statement

Build a prefix tree that can also answer the question *"how many inserted words start
with this prefix?"*. Words may be inserted more than once — every insertion counts.

This is the classic **autocomplete counter** you meet in search engines and IDEs.

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
- the operations — one per line, each `insert <word>` or `count <prefix>`

## Sample Input

```
3
apple
app
banana
3
count app
insert applet
count app
```

## Expected Output

```
2
ok
3
```

One line per operation: `ok` for an insert, the number of matching words for a count.

## Approach — a counter in every node

A plain trie only tells you *whether* a prefix exists. To count the words under a
prefix, every node needs one extra field: how many inserted words pass through it.

```java
public void insert(String word) {
    CountingNode node = root;
    node.count++;
    for (int i = 0; i < word.length(); i++) {
        node = node.getOrCreateChild(word.charAt(i));
        node.count++;
    }
}
```

When a word is inserted, the counter of **every node on its path** is increased by
one. The node reached by a prefix therefore holds exactly the number of inserted words
that start with that prefix.

The counter at the root counts all the inserted words.

The helper `com.dsa.utils.TrieNode` is extended with a `CountingNode` subclass that
adds the counter — the subclass overrides `getOrCreateChild` so that the children
keep the `CountingNode` type.

## Dry Run

After inserting `apple`, `app` and `banana`:

```
root (count 3)
 ├─ a (count 2)
 │   └─ p (count 2)
 │       └─ p (count 2)
 │           ├─ l (count 1) ─ e (count 1)      ← apple
 │           └─ (end of word: app)
 └─ b (count 1) ─ a ─ n ─ a ─ n ─ a            ← banana
```

| Step | operation | path | counter changes | answer |
|---:|---|---|---|---|
| 1 | `count app` | root → `a` → `p` → `p` | — | the node `app` has count **2** (`apple`, `app`) |
| 2 | `insert applet` | root → `a` → `p` → `p` → `l` → `e` → `t` | `a`: 2→3, `p`: 2→3, `p`: 2→3, `l`: 1→2, `e`: 1→2, new `t`: 1 | `ok` |
| 3 | `count app` | root → `a` → `p` → `p` | — | the node `app` now has count **3** |

The word `banana` never touches the `a`-branch, so the counter of `b` stays at 1.

### A prefix that was never inserted

`count banan` → the trie has the path `b → a → n → a → n` (the beginning of `banana`)
but no node for `banan` → the walk fails → the answer is **0**.

## Java Solution

See [`PrefixCount.java`](./PrefixCount.java).

```java
public static class CountingNode extends TrieNode {

    public int count;

    @Override
    public CountingNode getOrCreateChild(char c) {
        CountingNode child = (CountingNode) children.get(c);
        if (child == null) {
            child = new CountingNode();
            children.put(c, child);
        }
        return child;
    }
}

public int countPrefix(String prefix) {
    CountingNode node = root;
    for (int i = 0; i < prefix.length(); i++) {
        if (!node.hasChild(prefix.charAt(i))) {
            return 0;
        }
        node = (CountingNode) node.child(prefix.charAt(i));
    }
    return node.count;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(L) per operation | One step per character; the count lookup is O(1) at the end |
| **Space** | O(total characters inserted) | One node per distinct prefix, each with one extra counter |

## Interview Notes

**Follow-ups to raise yourself:**
- *"How would you delete a word and keep the counts correct?"* → walk the path,
  decrement the counters, and unlink the leaf (and optionally prune the empty nodes).
- *"How do you get the top k suggestions for a prefix?"* → walk to the prefix node and
  take the k most frequent children; that needs a per-node priority list.
- *"Why not keep a hash map from prefix to count?"* → it works, but it stores one entry
  per **distinct prefix** — the trie stores one node per distinct prefix and shares
  the paths, and it also gives you the prefix queries for free.

**Common mistakes:**
- ❌ Incrementing the counter **after** the loop → the last node is not counted.
- ❌ Not counting duplicates → every insertion must add one.
- ❌ Forgetting the root counter → the count of the empty prefix (all the words) is
  wrong.
- ❌ Casting the child to `CountingNode` without checking → the cast is safe only
  because every child was created by `getOrCreateChild` of the subclass.

**How to narrate:**
> "I keep a counter in every trie node: the number of inserted words that pass through
> it. Inserting a word increments the counter of every node on its path, so the node
> reached by a prefix holds exactly the number of words with that prefix. The count
> query is a walk down the trie — O(L), the same as the insert."

## Related Problems

- [Implement Trie](./ImplementTrie.java) — the plain trie
- [Longest Prefix of a Phone Number](./LongestPrefixOfAPhoneNumber.java) — another trie query
- [Design Add and Search Words](./DesignAddAndSearchWords.java) — the same structure with wildcards
