---
title: Keys and Rooms
leetcode: 841
difficulty: Medium
patterns: [Graph traversal, DFS, Reachability]
companies: [Meta, Salesforce, Apple, Tech Mahindra, Zomato]
frequency: 3
tags: [graph, traversal, dfs, visited]
sampleInput: |
  3
  1 1
  1 2
  0
sampleOutput: "true"
---

# Keys and Rooms — LeetCode 841

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Graph traversal · Reachability |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Airbnb |

## Problem Statement

Rooms are numbered `0 … n-1`. Room `i` may contain **keys** to other rooms. Starting in room
`0`, decide whether **every** room can be opened.

A key can only be used once it has been picked up in a room that was already opened, so the
question is exactly: *is every vertex reachable from vertex 0?*

## Input Format

```
n
k0 key0_1 key0_2 ...
k1 key1_1 ...
...
k(n-1) ...
```

- `n` — number of rooms (`1 ≤ n ≤ 20`)
- one line per room, holding the **number of keys** in that room followed by the key numbers

## Sample Input

```
3
1 1
1 2
0
```

## Expected Output

```
true
```

Room 0 holds the key to room 1, room 1 holds the key to room 2, so all three rooms open.

## Approach — model it as a graph and traverse it

Room `i` holding the key to room `j` is an edge `i → j`. The answer is `true` when a DFS from
room 0 reaches every vertex.

The traversal is the standard one:

1. Mark room `0` visited and push it onto a stack.
2. Pop a room, look at its keys. For every key that points at an unvisited room, mark it visited
   **immediately** and push it.
3. Count how many rooms were opened; the answer is `opened == n`.

**Mark visited on push, not on pop.** Otherwise the same room can be pushed many times (once per
key that opens it) and the stack can blow up. Marking on push makes every room enter the stack
exactly once.

## Dry Run

| Step | Pop | Keys in that room | Newly opened | Visited after | Stack after |
|---:|---|---|---|---|---|
| 0 | — | — | `0` (the start) | `{0}` | `[0]` |
| 1 | `0` | `[1]` | `1` | `{0, 1}` | `[1]` |
| 2 | `1` | `[2]` | `2` | `{0, 1, 2}` | `[2]` |
| 3 | `2` | `[]` | — | `{0, 1, 2}` | `[]` |

`opened = 3 == n` → **`true`**.

### The unreachable case

```
3
0
1 1
1 2
```

Room 0 is empty, so no key is ever picked up. Only room 0 is opened → `opened = 1 ≠ 3` →
**`false`**.

## Java Solution

See [`KeysAndRooms.java`](./KeysAndRooms.java).

```java
public static boolean canVisitAllRooms(List<List<Integer>> rooms) {
    int n = rooms.size();
    boolean[] visited = new boolean[n];
    Deque<Integer> stack = new ArrayDeque<>();
    stack.push(0);
    visited[0] = true;
    int opened = 1;
    while (!stack.isEmpty()) {
        int room = stack.pop();
        for (int key : rooms.get(room)) {
            if (key >= 0 && key < n && !visited[key]) {
                visited[key] = true;
                opened++;
                stack.push(key);
            }
        }
    }
    return opened == n;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n + K) | `K` is the total number of keys; every key is inspected exactly once |
| **Space** | O(n + K) | The visited array, the stack and the room list |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the keys are in a single global list instead of per room?"* → the same traversal, but
  you need the room→keys mapping first.
- *"What if a key can open a room that contains the key back?"* → cycles are handled by the
  visited array.
- *"Can you solve it without a stack, using the room array itself?"* → yes — mark a room as
  visited in place (e.g. by emptying its key list) and scan the array repeatedly until no
  progress is made; that is the O(n·K) version.
- *"What if you had to report the order the rooms are opened?"* → record the order in which you
  push the rooms.

**Common mistakes:**
- ❌ Marking visited **after** popping → the same room gets pushed repeatedly.
- ❌ Forgetting to seed the stack with room `0` → the traversal never starts.
- ❌ Not handling `n == 0` → the start room does not exist; the answer is trivially `true`.

**How to narrate:**
> "This is reachability: treat every key as an edge from the room that holds it to the room it
> opens. I run an iterative DFS from room 0, marking a room visited the moment I push it so no
> room is pushed twice. If the number of opened rooms equals n, every room can be reached."

## Related Problems

- [Number of Connected Components](./NumberOfConnectedComponents.java) — count components instead
- [Graph Valid Tree](./GraphValidTree.java) — connectivity plus cycle detection
- [Clone Graph](./CloneGraph.java) — copying an arbitrary connected structure
- [Bipartite Check](./BipartiteCheck.java) — colouring every component
