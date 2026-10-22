var e=`topic:advancedgraphs`,t=`
# Advanced graphs — concept notes

## The mental model

These are the graph algorithms that need more than a traversal. Each has a specific
trigger:

| Trigger | Algorithm |
|---|---|
| "Minimum total cost to connect everything" | **MST** — Kruskal or Prim |
| "Cheapest path" with weights | **Dijkstra** |
| "Cheapest path" with possibly-negative weights | **Bellman-Ford** |
| "All-pairs shortest paths" | **Floyd-Warshall** |
| "Mutually reachable groups" | **SCC** — Tarjan or Kosaraju |
| "Edges whose removal disconnects the graph" | **Bridges** |
| "Vertices whose removal disconnects the graph" | **Articulation points** |

---

## Minimum spanning tree

**An MST connects every vertex with the minimum total edge weight, and it has exactly
V − 1 edges.** It exists for any connected, **undirected** graph.

### Kruskal's algorithm — sort edges, add if no cycle

\`\`\`java
public static int kruskal(int n, List<Edge> edges) {
    edges.sort(Comparator.comparingInt(Edge::weight));
    UnionFind uf = new UnionFind(n);
    int total = 0, used = 0;

    for (Edge edge : edges) {
        if (uf.union(edge.from, edge.to)) {
            total += edge.weight;
            used++;
            if (used == n - 1) break;      // the tree is complete
        }
    }
    return used == n - 1 ? total : -1;    // -1 means the graph was disconnected
}
\`\`\`

**The greedy argument (the cut property):** consider the cheapest edge that connects two
different components. Adding it is always safe — some MST contains it. This holds
because the edge is the minimum across the cut between the two components.

**Time:** O(E log E) for the sort, then O(E · α(V)) for the Union-Find operations.

**Kruskal suits a sparse graph** and produces edges in increasing weight order, so it
favours edges that connect distant components.

### Prim's algorithm — grow one tree

\`\`\`java
public static int prim(int n, List<List<int[]>> graph) {
    boolean[] inTree = new boolean[n];
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]);
    pq.add(new int[]{0, 0});
    int total = 0, count = 0;

    while (!pq.isEmpty() && count < n) {
        int[] entry = pq.poll();
        int node = entry[0], weight = entry[1];
        if (inTree[node]) continue;
        inTree[node] = true;
        total += weight;
        count++;
        for (int[] edge : graph.get(node)) {
            if (!inTree[edge[0]]) pq.add(edge);
        }
    }
    return count == n ? total : -1;
}
\`\`\`

**Time:** O(E log V) with a priority queue.

**Prim suits a dense graph** and grows a single connected tree, so the edges it picks
tend to be local.

### Which to choose

| | Kruskal | Prim |
|---|---|---|
| Best for | Sparse graphs | Dense graphs |
| Data structure | Union-Find | Priority queue |
| Order | Edges sorted globally | Grows from one vertex |
| Time | O(E log E) | O(E log V) |

**Say: "I'll use Kruskal with Union-Find"** and explain why. Both are acceptable; naming
one and justifying it is what matters.

---

## Dijkstra's shortest path

**For graphs with non-negative edge weights.**

\`\`\`java
public static int[] dijkstra(int n, List<List<int[]>> graph, int source) {
    int[] dist = new int[n];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[source] = 0;

    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]);
    pq.add(new int[]{source, 0});

    while (!pq.isEmpty()) {
        int[] entry = pq.poll();
        int node = entry[0], currentDist = entry[1];
        if (currentDist > dist[node]) continue;          // stale entry

        for (int[] edge : graph.get(node)) {
            int next = edge[0];
            int newDist = currentDist + edge[1];
            if (newDist < dist[next]) {
                dist[next] = newDist;
                pq.add(new int[]{next, newDist});
            }
        }
    }
    return dist;
}
\`\`\`

**The greedy argument:** when you pop the smallest-distance node from the priority queue,
its distance is final. Any path to it through an unvisited node would be longer.

**The stale-entry check is essential** — without it you process nodes multiple times.

**Time:** O(E log V).

### Why Dijkstra fails with negative weights

Dijkstra assumes that once a node is settled, no shorter path can appear later. With a
negative edge, a longer path can become shorter after going through the negative edge.

\`\`\`
s → a (cost 10),  a → b (cost -20),  s → b (cost 5)
\`\`\`

Dijkstra settles \`b\` at 5, then discovers \`a → b\` would give −10. **It breaks.**

**The fix:** Bellman-Ford.

---

## Bellman-Ford

**Handles negative weights and detects negative cycles.**

\`\`\`java
public static int[] bellmanFord(int n, List<List<int[]>> graph, int source) {
    int[] dist = new int[n];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[source] = 0;

    for (int i = 0; i < n - 1; i++) {
        boolean changed = false;
        for (int u = 0; u < n; u++) {
            if (dist[u] == Integer.MAX_VALUE) continue;
            for (int[] edge : graph.get(u)) {
                if (dist[u] + edge[1] < dist[edge[0]]) {
                    dist[edge[0]] = dist[u] + edge[1];
                    changed = true;
                }
            }
        }
        if (!changed) break;              // early exit — already converged
    }
    return dist;
}
\`\`\`

**The invariant:** after \`k\` passes, \`dist[v]\` is the shortest path using at most \`k\`
edges. After \`n − 1\` passes, all shortest paths (which use at most \`n − 1\` edges) are
found.

**Time:** O(V · E).

**Negative cycle detection:** run one more pass — if any distance still improves, there is
a negative cycle.

**Use Bellman-Ford when:** weights may be negative, or you need to detect negative cycles.

---

## Floyd-Warshall

**All-pairs shortest paths.**

\`\`\`java
for (int k = 0; k < n; k++) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
        }
    }
}
\`\`\`

**The invariant:** after iteration \`k\`, \`dist[i][j]\` is the shortest path from \`i\` to \`j\`
using only vertices \`0..k\` as intermediates.

**The \`k\` loop must be the OUTERMOST loop** — that is the whole point of the algorithm.
Getting the loop order wrong is the single most common bug.

**Time:** O(V³). Only worth it for small V (a few hundred).

**It also detects negative cycles:** if \`dist[i][i]\` becomes negative, there is one.

---

## Strongly connected components

**Two nodes are in the same SCC if each can reach the other.**

### Kosaraju — two DFS passes

\`\`\`java
// Pass 1: DFS on the original graph, recording finish order
// Pass 2: DFS on the reversed graph, in reverse finish order
\`\`\`

**The insight:** the second pass on the reversed graph, starting from nodes in reverse
finish order, finds exactly one SCC at a time.

### Tarjan's — one pass, using a stack

\`\`\`java
private int index = 0;
private int[] low, num, parent;
private boolean[] onStack;
private final Deque<Integer> stack = new ArrayDeque<>();

void strongConnect(int v) {
    num[v] = low[v] = index++;
    stack.push(v);
    onStack[v] = true;

    for (int w : graph.get(v)) {
        if (num[w] == UNVISITED) {
            parent[w] = v;
            strongConnect(w);
            low[v] = Math.min(low[v], low[w]);
        } else if (onStack[w]) {
            low[v] = Math.min(low[v], num[w]);
        }
    }

    if (low[v] == num[v]) {
        // v is the root of an SCC — pop until v
        while (true) {
            int w = stack.pop();
            onStack[w] = false;
            component.add(w);
            if (w == v) break;
        }
    }
}
\`\`\`

**Tarjan is harder to explain but it is one pass.** Kosaraju is easier and is what most
candidates should implement in an interview.

**For the interview:** "I'll use Kosaraju — DFS to get finish order, then DFS on the
reversed graph in reverse finish order." That is enough.

---

## Bridges and articulation points

**A bridge** is an edge whose removal increases the number of connected components.

**Find them with a DFS and a low-link value:**

\`\`\`java
void dfs(int u, int parentEdge) {
    discovery[u] = low[u] = time++;
    for (Edge e : graph.get(u)) {
        if (e.id == parentEdge) continue;         // do not go back to the parent
        if (discovery[e.to] == UNVISITED) {
            dfs(e.to, e.id);
            low[u] = Math.min(low[u], low[e.to]);
            if (low[e.to] > discovery[u]) {
                bridges.add(e);                   // (u, e.to) is a bridge
            }
        } else {
            low[u] = Math.min(low[u], discovery[e.to]);
        }
    }
}
\`\`\`

**\`low[u]\`** = the earliest discovery time reachable from \`u\`'s subtree using tree edges
and at most one back edge.

**The bridge condition:** \`low[child] > discovery[u]\` — the child's subtree cannot reach
\`u\` or any ancestor of \`u\`, so the edge is the only way out.

**Note:** the check is by **edge id**, not by parent vertex, so parallel edges are handled
correctly.

**An articulation point** is a vertex whose removal increases the number of components.
The conditions are similar:
- A **root** with more than one child in the DFS tree.
- A **non-root** \`u\` with a child \`w\` where \`low[w] >= discovery[u]\`.

**Tarjan's algorithm finds both** in one DFS.

---

## Eulerian path and circuit

**An Eulerian path** uses every edge exactly once.

| | Condition |
|---|---|
| **Eulerian circuit** (starts and ends at the same vertex) | The graph is connected and **every vertex has even degree** |
| **Eulerian path** (different start and end) | The graph is connected and **exactly two vertices have odd degree** |
| **Neither** | More than two vertices have odd degree |

**The starting vertex** for a path is one of the two odd-degree vertices.

**Hierholzer's algorithm** finds the path:

\`\`\`java
// iterative Hierholzer
Deque<Integer> stack = new ArrayDeque<>();
Deque<Integer> circuit = new ArrayDeque<>();
stack.push(start);
while (!stack.isEmpty()) {
    int v = stack.peek();
    if (!graph.get(v).isEmpty()) {
        stack.push(graph.get(v).remove(0));      // take an edge
    } else {
        circuit.push(stack.pop());
    }
}
\`\`\`

**The reversed output** is the Eulerian path.

---

## Common traps

| Trap | Why it bites |
|---|---|
| The \`k\` loop not being outermost in Floyd-Warshall | Wrong results |
| Missing the stale-entry check in Dijkstra | Nodes processed multiple times |
| Using Dijkstra with negative weights | Incorrect distances |
| Not checking for a cycle after topological sort | Silently wrong order |
| The \`k\` iteration count in Bellman-Ford | \`n − 1\` passes, plus one for cycle detection |
| Using the parent *vertex* instead of the parent *edge* in bridge detection | Parallel edges break it |
| Comparing \`low[child] > discovery[u]\` with \`>=\` | Off by one in the articulation condition |
| Prim's starting from a single node in a disconnected graph | Missing components |
| Integer overflow in distance accumulation | Use \`long\` for large graphs |

---

## Complexity cheat sheet

| Algorithm | Time | Space |
|---|---|---|
| Kruskal | O(E log E) | O(V) |
| Prim (binary heap) | O(E log V) | O(V + E) |
| Dijkstra | O((V + E) log V) | O(V + E) |
| Bellman-Ford | O(V · E) | O(V) |
| Floyd-Warshall | O(V³) | O(V²) |
| Kosaraju | O(V + E) | O(V) |
| Tarjan SCC | O(V + E) | O(V) |
| Bridges / articulation points | O(V + E) | O(V) |
| Eulerian path (Hierholzer) | O(V + E) | O(V) |

---

## How to crack it in an interview

1. **Identify the graph type first:** undirected? weighted? non-negative? a DAG?
2. **State the trigger:** "you're asking for the minimum total cost to connect everything,
   so this is an MST problem — I'll use Kruskal with Union-Find".
3. **State the greedy argument or the invariant.** For Dijkstra: "when I pop the minimum,
   that distance is final". For MST: "the cut property".
4. **Handle disconnected graphs** explicitly.
5. **Mention the alternative** and why you did not choose it — "Bellman-Ford instead of
   Dijkstra, because the weights may be negative".
6. **Name the linear-time DFS techniques** — Tarjan, low-link — if the problem hints at
   them.
`,n={id:e,body:t};export{t as body,n as default,e as id};