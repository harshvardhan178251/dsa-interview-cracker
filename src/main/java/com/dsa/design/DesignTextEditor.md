---
title: Design Text Editor
leetcode: 2296
difficulty: Hard
patterns: [Design, Undo journal, Two stacks]
companies: [Meta, Facebook, Infosys]
frequency: 2
tags: [stack, undo, journal]
sampleInput: |
  6
  append a
  append b
  append c
  backspace
  undo
  backspace
sampleOutput: |
  ab
---

# Design Text Editor — LeetCode 2296

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Design · Undo journal · Two stacks |
| **Interview heat** | ★★☆☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Adobe |

## Problem Statement

Implement a text editor with three operations:

- `append(c)` — append the character `c` at the end of the text,
- `backspace()` — delete the last character,
- `undo()` — revert the last change.

Two details decide the design:

1. `undo` must restore the text **exactly** as it was before the last change, whether
   that change was an append or a backspace.
2. An `undo` is not a change itself: two consecutive `undo`s walk back through **two**
   changes, they do not cancel each other out.

## Input Format

```
n
append c
backspace
undo
...
```

- `n` — the number of commands.
- `append c` — append the single character `c`.
- `backspace` — delete the last character.
- `undo` — revert the last change.

The program prints the final text on one line.

## Sample Input

```
6
append a
append b
append c
backspace
undo
backspace
```

## Expected Output

```
ab
```

`append a`, `append b`, `append c` → `abc`; `backspace` → `ab`; `undo` → `abc` again
(the backspace is undone, not the append); `backspace` → `ab`.

## Approach — the text plus a journal of changes

The text itself is a stack of characters. The second stack is the **journal**: it
records what every change did, so an undo can be replayed backwards.

| Command | Effect on the text | Journal entry |
|---|---|---|
| `append c` | push `c` | `APPEND c` |
| `backspace` | pop the top character `c` | `BACKSPACE c` |
| `undo` | pop the journal and reverse the recorded effect | — |

Reversing an entry:

- `APPEND c` → pop the top character (it is `c`, because everything above it in the
  journal has already been undone);
- `BACKSPACE c` → push `c` back.

Because the journal is last-in-first-out, the change that `undo` reverses is always the
most recent one, and the text is always in the state that change left it in.

**Backspace on an empty text** changes nothing, so it is *not* journaled. Otherwise an
`undo` would have to skip over it, and the "undo the last change" contract would be
muddled.

**Alternative: snapshot the whole text on every change.** That is trivially correct but
O(n) memory per change. The journal is O(1) per change.

## Dry Run

Input: `append a`, `append b`, `append c`, `backspace`, `undo`, `backspace`.

| Step | Command | Text before | Journal before | Action | Text after | Journal after |
|---:|---|---|---|---|---|---|
| 1 | `append a` | `` | `[]` | push `a`, log `APPEND a` | `a` | `[APPEND a]` |
| 2 | `append b` | `a` | `[APPEND a]` | push `b`, log `APPEND b` | `ab` | `[APPEND a, APPEND b]` |
| 3 | `append c` | `ab` | `[APPEND a, APPEND b]` | push `c`, log `APPEND c` | `abc` | `[APPEND a, APPEND b, APPEND c]` |
| 4 | `backspace` | `abc` | `[APPEND a, APPEND b, APPEND c]` | pop `c`, log `BACKSPACE c` | `ab` | `[APPEND a, APPEND b, APPEND c, BACKSPACE c]` |
| 5 | `undo` | `ab` | `[… , BACKSPACE c]` | pop `BACKSPACE c` → push `c` back | `abc` | `[APPEND a, APPEND b, APPEND c]` |
| 6 | `backspace` | `abc` | `[APPEND a, APPEND b, APPEND c]` | pop `c`, log `BACKSPACE c` | `ab` | `[APPEND a, APPEND b, APPEND c, BACKSPACE c]` |

Final text: **ab**.

### Undoing an append

`append a`, `append b`, `undo`:

| Step | Command | Text before | Action | Text after |
|---:|---|---|---|---|
| 1 | `append a` | `` | push `a` | `a` |
| 2 | `append b` | `a` | push `b` | `ab` |
| 3 | `undo` | `ab` | pop `APPEND b` → remove the top character `b` | `a` |

The character that is removed is the current top of the text, because every change
above the undone one has already been undone.

## Java Solution

See [`DesignTextEditor.java`](./DesignTextEditor.java).

```java
public void append(char character) {
    text.addLast(character);
    journal.addLast(new JournalEntry(APPEND, character));
}

public void backspace() {
    if (text.isEmpty()) {
        return;                            // nothing changed, nothing to journal
    }
    char removed = text.removeLast();
    journal.addLast(new JournalEntry(BACKSPACE, removed));
}

public void undo() {
    if (journal.isEmpty()) {
        return;
    }
    JournalEntry entry = journal.removeLast();
    if (entry.kind == APPEND) {
        text.removeLast();                 // remove what was appended
    } else {
        text.addLast(entry.character);     // put the backspaced character back
    }
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(1) per operation | one push/pop on each of the two stacks |
| **Space** | O(n) | the text plus one journal entry per change |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the cursor can be in the middle of the text?"* → two stacks, one for the
  left and one for the right of the cursor; `append` pushes left, `backspace` pops left
  and pushes to right, and the undo journal records both directions.
- *"How would you support redo?"* → a second journal: an `undo` pushes the reverted
  entry onto the redo stack, and a `redo` pops it and replays it.
- *"How would you make `undo` O(1) for a huge document?"* → it already is; a snapshot
  approach would not be.
- *"What if you had to support collaborative editing?"* → an operation log with
  transformation functions (OT), the same idea as an undo journal but reconciled across
  clients.

**Common mistakes:**
- ❌ Recording the undo of an undo → two `undo`s then cancel each other instead of
  walking back two changes.
- ❌ Logging a backspace on an empty text → the undo then has to skip it.
- ❌ Forgetting to store *which* character a backspace removed → the undo cannot restore
  it.
- ❌ Assuming the text is always a plain string — for a cursor in the middle you need the
  two-stack version.

**How to narrate:**
> "The text is a stack of characters and I keep a second stack, the journal, that
> records what every change did. An append pushes the character and logs an APPEND
> entry; a backspace pops the character and logs a BACKSPACE entry carrying that
> character. `undo` pops the journal and reverses the recorded effect — remove the
> appended character, or put the backspaced character back. Because the journal is LIFO,
> the entry I reverse is always the most recent change, so the text is always exactly
> where that change left it."

## Related Problems

- [Design Browser History — LeetCode 348](./DesignBrowserHistory.md) — the same cursor idea with
  a history instead of an undo log
- [Min Max Stack](./MinMaxStack.md) — a stack whose frames carry extra state
- [Snapshot Array — LeetCode 1146](./SnapshotArray.md) — the same journal idea, indexed by time
