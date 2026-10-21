---
title: Design Browser History
leetcode: 348
difficulty: Medium
patterns: [Design, Array with a cursor]
companies: [Google, Airbnb, JP Morgan]
frequency: 3
tags: [array, cursor, history]
sampleInput: |
  6
  visit a
  visit b
  back 1
  back 1
  forward 1
  forward 1
sampleOutput: |
  a
  none
  a
  b
---

# Design Browser History — LeetCode 348

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Design · Array with a cursor |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Airbnb |

## Problem Statement

Implement a browser history with three operations:

- `visit(url)` — open a new page. **The forward history is erased**, exactly like a real
  browser: if you go back and then open a new tab, the pages you had gone forward to are
  gone.
- `back(steps)` — move back up to `steps` pages and return the URL now shown.
- `forward(steps)` — move forward up to `steps` pages and return the URL now shown.

Moving beyond the ends of the history clamps to the end instead of failing.

## Input Format

```
n
visit url
back k
forward k
...
```

- `n` — the number of commands.
- `visit url` — open the page `url`.
- `back k` / `forward k` — move `k` pages.

The program prints one line per `back` and `forward`: the URL that is now shown, or
`none` when the history does not reach that far. `visit` prints nothing.

## Sample Input

```
6
visit a
visit b
back 1
back 1
forward 1
forward 1
```

## Expected Output

```
a
none
a
b
```

The second `back 1` tries to leave the history before its first page; the cursor stops
at "before the beginning", so nothing is shown.

## Approach — a list of URLs plus a cursor

The history is an `ArrayList<String>` and the cursor is the index of the page that is
currently shown. It may be:

- `0..size-1` — a real page,
- `-1` — before the first page (the state after `back` at the very beginning).

`visit(url)` truncates everything **after** the cursor and appends the new URL:
the forward history is exactly the tail of the list.

```
history = [a, b, c]      cursor = 1  (showing b)

visit d   →  truncate the tail after the cursor  →  history = [a, b]  →  append d
          →  history = [a, b, d]                 cursor = 2
```

`back(k)` moves the cursor left, clamped at `-1`. `forward(k)` moves it right, clamped
at `size - 1`.

**Alternative: two stacks.** One stack for the pages before the cursor, one for the
pages after it; `back` pops from the first and pushes to the second. The array with a
cursor is simpler and gives O(1) `back`/`forward`; the two-stack version gives O(1)
`visit` without the O(n) truncation.

## Dry Run

Input: `visit a`, `visit b`, `back 1`, `back 1`, `forward 1`, `forward 1`.

| Step | Command | `history` before | `cursor` before | Action | `history` after | `cursor` after | Shown | Output |
|---:|---|---|---:|---|---|---:|---|---|
| 1 | `visit a` | `[]` | -1 | truncate tail after cursor (nothing), append `a` | `[a]` | 0 | `a` | — |
| 2 | `visit b` | `[a]` | 0 | truncate tail after cursor (nothing), append `b` | `[a, b]` | 1 | `b` | — |
| 3 | `back 1` | `[a, b]` | 1 | cursor = max(-1, 1-1) = 0 | `[a, b]` | 0 | `a` | `a` |
| 4 | `back 1` | `[a, b]` | 0 | cursor = max(-1, 0-1) = -1 | `[a, b]` | -1 | none | `none` |
| 5 | `forward 1` | `[a, b]` | -1 | cursor = min(1, -1+1) = 0 | `[a, b]` | 0 | `a` | `a` |
| 6 | `forward 1` | `[a, b]` | 0 | cursor = min(1, 0+1) = 1 | `[a, b]` | 1 | `b` | `b` |

### Visiting after going back erases the forward history

`visit a`, `visit b`, `visit c`, `back 2`, `visit d`:

| Step | Command | `history` before | `cursor` | Action | `history` after | `cursor` |
|---:|---|---|---:|---|---|---:|
| 1 | `visit a` | `[]` | -1 | append `a` | `[a]` | 0 |
| 2 | `visit b` | `[a]` | 0 | append `b` | `[a, b]` | 1 |
| 3 | `visit c` | `[a, b]` | 1 | append `c` | `[a, b, c]` | 2 |
| 4 | `back 2` | `[a, b, c]` | 2 | cursor = 0 | `[a, b, c]` | 0 |
| 5 | `visit d` | `[a, b, c]` | 0 | truncate the tail after the cursor → `[a]`, append `d` | `[a, d]` | 1 |

Pages `b` and `c` are gone — that is the browser behaviour the problem asks for.

## Java Solution

See [`DesignBrowserHistory.java`](./DesignBrowserHistory.java).

```java
public void visit(String url) {
    while (history.size() > cursor + 1) {
        history.remove(history.size() - 1);   // erase the forward history
    }
    history.add(url);
    cursor++;
}

public String back(int steps) {
    cursor = Math.max(-1, cursor - steps);
    return current();
}

public String forward(int steps) {
    cursor = Math.min(history.size() - 1, cursor + steps);
    return current();
}

public String current() {
    if (cursor < 0 || cursor >= history.size()) {
        return EMPTY;                       // "none"
    }
    return history.get(cursor);
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(1) for `back`/`forward`, O(n) worst case for `visit` | `visit` may have to truncate the tail |
| **Space** | O(n) | one URL per visited page |

## Interview Notes

**Follow-ups to raise yourself:**
- *"How would you make `visit` O(1)?"* → two stacks (before/after the cursor) instead of
  one list with a cursor.
- *"How would you support many tabs, each with its own history?"* → a stack of cursors,
  one per tab.
- *"How would you persist the history across restarts?"* → an append-only log on disk
  plus a periodic checkpoint of the cursor.
- *"What if `back` had to be O(1) for a huge history?"* → a doubly linked list, where
  moving the cursor is a pointer swap.

**Common mistakes:**
- ❌ Not erasing the forward history on `visit`.
- ❌ Clamping `back` to `0` instead of `-1` — then the "before the first page" state
  cannot be represented.
- ❌ Forgetting that `forward` past the last page must clamp, not throw.
- ❌ Returning an empty string instead of a defined "nothing here" marker — pick one and
  document it.

**A note on the LeetCode wording.** LeetCode 348 says that a `back` beyond the first page
*goes back to the first page*; this implementation instead stops one step further, in the
"before the beginning" state, and prints `none`. The truncation on `visit` — the actual
point of the problem — behaves exactly like LeetCode's. If the interviewer insists on
LeetCode's exact contract, change `Math.max(-1, ...)` to `Math.max(0, ...)` and drop the
`none` state.

**How to narrate:**
> "The history is a list of URLs and a cursor that points at the current page. The
> cursor can sit at -1, before the first page. `visit` truncates everything after the
> cursor — that's the forward history — and appends the new URL. `back` and `forward`
> just move the cursor and clamp it at the ends. Both are O(1); only `visit` can be O(n)
> because of the truncation."

## Related Problems

- [Design Text Editor — LeetCode 2296](./DesignTextEditor.md) — a cursor and an undo journal
- [Snapshot Array — LeetCode 1146](./SnapshotArray.md) — versioning a list of values
- [Min Max Stack](./MinMaxStack.md) — the same "one mutable cursor" idea on a stack
