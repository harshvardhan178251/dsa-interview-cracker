---
title: Word Search II
leetcode: 212
difficulty: Hard
patterns: [Trie + backtracking, Grid search]
companies: [Google, Meta, JP Morgan, Goldman Sachs, Visa]
frequency: 4
tags: [trie, backtracking, grid, hard]
sampleInput: |
  4
  4
  o a a n e t a e i h k r i f l v
  4
  oath
  pea
  eat
  rain
sampleOutput: |
  eat
  oath
---

# Word Search II — LeetCode 212

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Trie + backtracking · Grid search |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Airbnb |

## Problem Statement

Given a board of characters and a list of words, return every word of the list that can
be **spelled** in the board. The letters must be adjacent (left, right, up, down) and
no cell may be used twice.

```
o a a n
e t a e
i h k r
i f l v
```

The words `oath` and `eat` can be spelled; `pea` and `rain` cannot.

## Input Format

The program reads from standard input:

```
rows
cols
c0 c1 ... c(rows*cols-1)
n
word1
...
wordn
```

- `rows`, `cols` — the size of the board
- the characters — the cells of the board in row-major order
- `n` — how many words follow
- the words — one per line

## Sample Input

```
4
4
o a a n e t a e i h k r i f l v
4
oath
pea
eat
rain
```

## Expected Output

```
eat
oath
```

The words that were found, sorted alphabetically.

## Approach — a trie prunes the search

Searching every word separately is far too slow: the words share prefixes, so most of
the work is repeated. Putting the dictionary into a **trie** shares that work:

1. Build a trie of all the words.
2. Start a depth-first search from **every** cell of the board.
3. The DFS only follows trie edges: if the current letter has no child, the branch is
   dead and we stop immediately.
4. When a node with the end flag is reached, the word is found. **Remove** it from the
   trie (`isEndOfWord = false`) so it is reported once and so the branch is pruned for
   the remaining searches.

Step 4 is the second half of the trick: once a word is found, its leaf is dead and the
trie prunes itself.

## Dry Run

The trie of `oath`, `pea`, `eat`, `rain` (only the `eat` branch is drawn):

```
root ─e─> e ─a─> a ─t─> t   (end of word "eat")
root ─o─> o ─a─> a ─t─> t ─h─> h   (end of word "oath")
root ─p─> p ─e─> e ─a─> a
root ─r─> r ─a─> a ─i─> i ─n─> n
```

Search starting at cell `(0, 0)` = `o`:

| Step | cell | letter | trie child | action |
|---:|---|---|---|---|
| 1 | `(0,0)` | `o` | `o` exists | descend, mark the cell used |
| 2 | `(0,1)` | `a` | `a` exists | descend |
| 3 | `(0,2)` | `a` | **no child `a` under `oa`** | prune → backtrack |
| 4 | `(1,0)` | `e` | **no child `e` under `o`** | prune → backtrack |
| 5 | `(2,0)` | `i` | no child | prune |
| 6 | `(3,0)` | `i` | no child | prune |
| 7 | `(0,0)` | — | — | unmark the cell, the start `(0,0)` is exhausted |

Search starting at cell `(1, 1)` = `t`:

| Step | cell | letter | trie child | action |
|---:|---|---|---|---|
| 1 | `(1,1)` | `t` | no child `t` under the root | prune immediately |

Search starting at cell `(1, 2)` = `a`:

| Step | cell | letter | trie child | action |
|---:|---|---|---|---|
| 1 | `(1,2)` | `a` | no child `a` under the root | prune |

Search starting at cell `(1, 3)` = `e`:

| Step | cell | letter | trie child | action |
|---:|---|---|---|---|
| 1 | `(1,3)` | `e` | `e` exists | descend |
| 2 | `(1,2)` | `a` | `a` exists under `e` | descend |
| 3 | `(1,1)` | `t` | `t` exists under `ea` | descend — **end of the word `eat`** → add `eat`, clear the flag |
| 4 | `(1,1)` | — | — | no further children → backtrack |
| 5 | `(0,2)` | `a` | no child | prune |
| 6 | `(2,3)` | `r` | no child | prune |
| 7 | `(1,3)` | — | — | backtrack |

The same happens for `oath` starting at `(0, 0)` → `o → a → t → h`. The words `pea`
and `rain` are never completed.

Found: `eat`, `oath` → sorted → `eat`, `oath` ✓

## Java Solution

See [`WordSearchII.java`](./WordSearchII.java).

```java
private static void search(char[][] board, boolean[][] used, TrieNode node,
                           StringBuilder path, int r, int c, List<String> found) {
    if (r < 0 || r >= board.length || c < 0 || c >= board[0].length || used[r][c]) {
        return;
    }
    char letter = board[r][c];
    if (!node.hasChild(letter)) {
        return; // no word can continue with this letter
    }
    TrieNode next = node.child(letter);
    used[r][c] = true;
    path.append(letter);

    if (next.isEndOfWord) {
        found.add(path.toString());
        next.isEndOfWord = false; // report every word only once
    }

    search(board, used, next, path, r + 1, c, found);
    search(board, used, next, path, r - 1, c, found);
    search(board, used, next, path, r, c + 1, found);
    search(board, used, next, path, r, c - 1, found);

    path.setLength(path.length() - 1); // backtrack
    used[r][c] = false;                // backtrack
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(rows · cols · L) | `L` = the length of the longest word; each search path is bounded by `L` |
| **Space** | O(total characters of the dictionary) | The trie, plus O(rows · cols) for the `used` grid |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Search for one word instead of many."* → the plain backtracking version, O(4^(r·c)).
- *"Why is the trie version faster?"* → the words share prefixes, so the trie shares
  that work; the search only explores paths that can still complete a word.
- *"How would you handle a board that is updated between queries?"* → the trie stays
  valid, only the `used` grid is reset.
- *"What if the words contain `*`?"* → that is regular-expression matching, not a trie
  problem.

**Common mistakes:**
- ❌ Not removing a found word → it is reported several times.
- ❌ Forgetting to unmark the cell on the way back → the search cannot reuse a cell.
- ❌ Building the path with string concatenation → O(L²) per path; use a `StringBuilder`.
- ❌ Searching only from the top-left corner → the word can start anywhere.

**How to narrate:**
> "Searching every word separately repeats a lot of work, because the words share
> prefixes. So I put the dictionary in a trie and start a DFS from every cell. The DFS
> only follows trie edges, so a branch dies as soon as the letters cannot lead to a
> word. When a word is found I clear its end flag, which reports it once and prunes
> the trie for the rest of the search."

## Related Problems

- [Implement Trie](./ImplementTrie.java) — the trie itself
- [Design Add and Search Words](./DesignAddAndSearchWords.java) — wildcard search in a trie
- [Word Search](./WordSearchII.java) — the single-word version of the same search
