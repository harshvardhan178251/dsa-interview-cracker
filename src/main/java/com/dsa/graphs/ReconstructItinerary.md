---
title: Reconstruct Itinerary
leetcode: 332
difficulty: Hard
patterns: [Hierholzer's algorithm, Eulerian path, Greedy]
companies: [Google, Meta, Netflix, Microsoft, Oracle]
frequency: 4
tags: [graph, directed, eulerian-path, hierholzer, greedy]
sampleInput: |
  5 4
  1 2
  0 1
  3 4
  2 3
sampleOutput: "0 1 2 3 4"
---

# Reconstruct Itinerary — LeetCode 332

| | |
|---|---|
| **Difficulty** | Hard |
| **Pattern** | Hierholzer's algorithm · Eulerian path |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Airbnb |

## Problem Statement

Airports are numbered `0 … n-1`. Every ticket `(u, v)` is a directed flight from `u` to `v`; a
ticket may be used **exactly once**. Reconstruct the itinerary that uses **every ticket exactly
once**.

When several flights leave the same airport, take the one with the **smallest destination**
first.

> LeetCode's statement uses three-letter airport codes. Here the airports are plain vertex
> numbers so that every graph problem in this repository shares the same input format — the
> original example is `JFK → MUC → LHR → SFO → SJC`, i.e. `0 1 2 3 4` in this encoding.

## Input Format

The program reads a directed graph given as an **edge list**:

```
n m
u1 v1
u2 v2
...
um vm
```

- `n` — number of airports, numbered `0 … n-1`
- `m` — number of tickets (directed edges)
- `m` lines, each with two integers `u v` in `0 … n-1`: the flight `u → v`

## Sample Input

```
5 4
1 2
0 1
3 4
2 3
```

## Expected Output

```
0 1 2 3 4
```

The flights are `1→2`, `0→1`, `3→4`, `2→3` — the chain `0 → 1 → 2 → 3 → 4` uses all four
tickets exactly once.

## Approach — Hierholzer's algorithm

The itinerary is an **Eulerian path**: a walk that uses every edge exactly once.

**Finding the start.** In an Eulerian path exactly one vertex has one more outgoing than
incoming edge (the start) and exactly one has one more incoming (the end); every other vertex is
balanced. If all vertices are balanced the graph has an Eulerian *circuit* and we may start
anywhere — we pick the smallest airport with a departing flight.

Before walking, the program also rejects the two impossible degree patterns (a vertex with more
than one extra outgoing/incoming flight, or a start without an end) and checks that every
airport carrying a flight is in the same component — a {@link com.dsa.utils.UnionFind} over the
edges does that in one pass. Without those checks a graph such as `0→1, 0→2` would produce a
walk that uses only one of the two tickets and silently claim to be a valid itinerary.

**Building the path.** The naive greedy walk ("always take the lexicographically smallest next
flight") can dead-end in the middle of the graph and strand tickets. Hierholzer's fix is to
*not* commit to the path as you go:

- Keep a **stack** of the current route.
- If the top vertex still has an outgoing edge, remove the smallest one and push its target.
- If the top vertex has **no** outgoing edge left, pop it and append it to the answer.
- Reverse the answer at the end.

The vertices are appended **when they become dead ends**, which is what puts them back into the
right order. Each edge is used exactly once, so the whole thing is linear.

## Dry Run

Edges: `1→2`, `0→1`, `3→4`, `2→3`.

In-degrees: `[0, 1, 1, 1, 1]`; out-degrees: `[1, 1, 1, 1, 0]`.
`out − in` = `[+1, 0, 0, 0, −1]` → **start = 0**, end = 4.

| Step | Stack (top → bottom) | Action | Answer (reversed) |
|---:|---|---|---|
| 0 | `[0]` | push the start | `[]` |
| 1 | `[0, 1]` | `0` has edge `0→1` → pop it, push `1` | `[]` |
| 2 | `[0, 1, 2]` | `1` has edge `1→2` → pop it, push `2` | `[]` |
| 3 | `[0, 1, 2, 3]` | `2` has edge `2→3` → pop it, push `3` | `[]` |
| 4 | `[0, 1, 2, 3, 4]` | `3` has edge `3→4` → pop it, push `4` | `[]` |
| 5 | `[0, 1, 2, 3]` | `4` has no outgoing edge → pop it into the answer | `[4]` |
| 6 | `[0, 1, 2]` | `3` has no outgoing edge → pop it | `[4, 3]` |
| 7 | `[0, 1]` | `2` has no outgoing edge → pop it | `[4, 3, 2]` |
| 8 | `[0]` | `1` has no outgoing edge → pop it | `[4, 3, 2, 1]` |
| 9 | `[]` | `0` has no outgoing edge → pop it | `[4, 3, 2, 1, 0]` |

Reversing the answer gives **`0 1 2 3 4`** — 5 vertices for 4 edges, so every ticket was used.

## Java Solution

See [`ReconstructItinerary.java`](./ReconstructItinerary.java).

```java
public static int[] reconstructItinerary(int n, int[][] edges) {
    // ... adjacency lists as min-heaps, in-degrees ...
    int start = -1;
    for (int v = 0; v < n; v++) {
        if (adj.get(v).size() - inDegree[v] == 1) {
            start = v;
            break;
        }
    }
    // ... fall back to the smallest airport with a departing flight ...

    Deque<Integer> stack = new ArrayDeque<>();
    List<Integer> reversed = new ArrayList<>();
    stack.push(start);
    while (!stack.isEmpty()) {
        int v = stack.peek();
        if (adj.get(v).isEmpty()) {
            reversed.add(stack.pop()); // dead end: flush the vertex into the answer
        } else {
            stack.push(adj.get(v).poll());
        }
    }
    Collections.reverse(reversed);
    // ... verify that every ticket was used ...
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(m log n) | Each edge is removed once from a min-heap; the heap operation costs O(log n) |
| **Space** | O(n + m) | Adjacency lists and the stack |

Without the min-heap (any order of the neighbours) the complexity is O(n + m), but the itinerary
is no longer the lexicographically smallest one.

## Interview Notes

**Follow-ups to raise yourself:**
- *"How do you know an Eulerian path exists?"* → the degree conditions plus weak connectivity of
  all vertices that carry an edge; see
  [Eulerian Path](../advancedgraphs/EulerianPath.java).
- *"What if the graph is undirected?"* → the degree condition becomes "0 or 2 odd-degree
  vertices", and the same Hierholzer walk works.
- *"Why not just take the smallest next flight greedily?"* → the greedy walk can dead-end with
  unused tickets left over (e.g. `A→B`, `A→C`, `B→D`, `C→D`); Hierholzer's stack fixes it.
- *"Can you return the itinerary when several exist?"* → yes, any Eulerian path is valid; the
  min-heap just picks a canonical one.

**Common mistakes:**
- ❌ Building the answer while walking (printing as you go) → the order can be wrong; you must
  build it in reverse and flip it.
- ❌ Forgetting to check that all tickets were used → a graph without an Eulerian path silently
  produces a partial itinerary.
- ❌ Assuming the start is vertex `0` → it is the vertex with `out − in == 1`.

**How to narrate:**
> "This is an Eulerian path problem. First I find the start: the airport with one more outgoing
> than incoming flight, or the smallest airport with a departure if the graph is an Eulerian
> circuit. Then I run Hierholzer's algorithm: I keep a stack of the current route and only move
> to the smallest unused destination. When I reach an airport with no flights left I pop it into
> the answer. Reversing that answer gives the itinerary, and if it has more vertices than tickets
> plus one, some ticket could not be used and there is no valid itinerary."

## Related Problems

- [Eulerian Path](../advancedgraphs/EulerianPath.java) — the general version
- [Topological Sort](./TopologicalSort.java) — a weaker ordering constraint
- [Course Schedule II](./CourseScheduleII.java) — the same "produce an order" shape
- [Network Delay Time](./NetworkDelayTime.java) — flights as a weighted graph
