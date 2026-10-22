var e=`guide:pattern-index`,t=`
# Interview pattern index

> **This page is generated.** It is rebuilt from the problem catalogue by
> \`web/scripts/generate-guides.mjs\`.

Almost every interview problem is one of a few dozen patterns wearing a different hat.
When you are stuck, the question is not *"which problem is this?"* but *"which pattern does
this shape match?"*.

## How to use the patterns

1. Read the problem statement and ask: **what is the shape of the input?**
   - Sorted array → two pointers, binary search
   - Array with duplicates → hash map, or sorting
   - Tree → recursion
   - Graph → BFS/DFS
   - Grid → BFS/DFS
   - "Minimum/maximum with a constraint" → greedy or DP
   - "How many ways" → DP
   - "Choose a subset" → backtracking
2. Look the shape up below.
3. Solve the **easiest** problem with that pattern first — usually there are three or four,
   and the easy one teaches you the shape.

## Pattern summary

| Pattern | Problems | ★★★★★ | Main topic |
|---|---:|---:|---|
| **Greedy** | 36 | 3 | Advanced Graphs |
| **DFS** | 20 | 7 | Advanced Graphs |
| **Two pointers** | 19 | 6 | Arrays |
| **Hashing** | 17 | 3 | Arrays |
| **Two Pointers** | 16 | 2 | Sorting |
| **Backtracking** | 15 | 3 | Advanced Graphs |
| **BFS** | 13 | 1 | Graphs |
| **Design** | 13 | 1 | Design |
| **Frequency counting** | 13 | 2 | Greedy |
| **Sliding window** | 13 | 2 | Design |
| **Bit tricks** | 11 | 1 | Bit Manipulation |
| **Binary search** | 10 | 2 | Binary Search |
| **Bottom-up DP** | 10 | 3 | Dynamic Programming |
| **Divide and conquer** | 9 | 0 | Binary Search |
| **Heap** | 9 | 4 | Heaps & Priority Queues |
| **Concurrency** | 7 | 0 | Concurrency |
| **Dynamic programming** | 7 | 0 | Advanced Graphs |
| **Monotonic stack** | 7 | 0 | Arrays |
| **Sorting** | 7 | 2 | Advanced Graphs |
| **Stack** | 7 | 2 | Design |
| **String DP** | 7 | 2 | Dynamic Programming |
| **2-D DP** | 6 | 2 | Dynamic Programming |
| **Binary search on the answer** | 6 | 0 | Binary Search |
| **Grid traversal** | 6 | 0 | Graphs |
| **Number theory** | 6 | 0 | Math & Number Theory |
| **Pointer rewiring** | 6 | 1 | Linked List |
| **Union-Find** | 6 | 0 | Advanced Graphs |
| **BST** | 5 | 2 | Trees & BST |
| **Counting DP** | 5 | 0 | Dynamic Programming |
| **Dummy head** | 5 | 3 | Linked List |
| **Top-K** | 5 | 2 | Heaps & Priority Queues |
| **XOR** | 5 | 1 | Bit Manipulation |
| **Cycle detection** | 4 | 0 | Advanced Graphs |
| **In-place compaction** | 4 | 0 | Arrays |
| **Priority queue** | 4 | 1 | Advanced Graphs |
| **Topological sort** | 4 | 0 | Graphs |
| **Trie** | 4 | 0 | Trie |
| **Unbounded knapsack** | 4 | 1 | Dynamic Programming |
| **Amortised O(1)** | 3 | 0 | Queues & Deques |
| **Bounded heap** | 3 | 1 | Heaps & Priority Queues |
| **Carry propagation** | 3 | 0 | Arrays |
| **Comparison sort** | 3 | 0 | Sorting |
| **Constraint pruning** | 3 | 0 | Backtracking |
| **DFS on a grid** | 3 | 0 | Backtracking |
| **DFS with a path** | 3 | 2 | Backtracking |
| **HashMap** | 3 | 1 | Design |
| **Interval DP** | 3 | 0 | Dynamic Programming |
| **Low-link values** | 3 | 0 | Advanced Graphs |
| **Multi-source BFS** | 3 | 0 | Graphs |
| **Partition** | 3 | 0 | Binary Search |
| **Post-order recursion** | 3 | 2 | Trees & BST |
| **Prefix DP** | 3 | 0 | Dynamic Programming |
| **Prefix sums** | 3 | 0 | Prefix & Suffix Sums |
| **Recursive descent** | 3 | 0 | Stacks |
| **Rotated array** | 3 | 1 | Binary Search |
| **Run detection** | 3 | 0 | Hashing |
| **Running sum** | 3 | 1 | Design |
| **Shortest path** | 3 | 0 | Graphs |
| **Base-26 conversion** | 2 | 0 | Strings |
| **Bellman-Ford** | 2 | 0 | Advanced Graphs |
| **BFS by layers** | 2 | 0 | Binary Search |
| **Bijective mapping** | 2 | 0 | Hashing |
| **Boyer-Moore voting** | 2 | 0 | Arrays |
| **Combinatorics** | 2 | 1 | Dynamic Programming |
| **Condition variables** | 2 | 0 | Concurrency |
| **Connected components** | 2 | 0 | Graphs |
| **Cooldown** | 2 | 1 | Heaps & Priority Queues |
| **Digit manipulation** | 2 | 0 | Math & Number Theory |
| **Dijkstra** | 2 | 1 | Advanced Graphs |
| **Duplicate pruning** | 2 | 0 | Backtracking |
| **Eulerian path** | 2 | 0 | Advanced Graphs |
| **Floyd cycle detection** | 2 | 1 | Linked List |
| **Graph traversal** | 2 | 0 | Graphs |
| **Grid DP** | 2 | 1 | Dynamic Programming |
| **Hash map** | 2 | 0 | Hashing |
| **Hierholzer's algorithm** | 2 | 0 | Advanced Graphs |
| **Iterative descent** | 2 | 1 | Trees & BST |
| **K-way merge** | 2 | 1 | Heaps & Priority Queues |
| **Kadane's algorithm** | 2 | 0 | Arrays |
| **Lower bound** | 2 | 0 | Binary Search |
| **Matrix** | 2 | 0 | Binary Search |
| **Max-heap** | 2 | 1 | Heaps & Priority Queues |
| **Mirror recursion** | 2 | 0 | Trees & BST |
| **Modular arithmetic** | 2 | 0 | Queues & Deques |
| **Order statistics** | 2 | 2 | Heaps & Priority Queues |
| **Parsing** | 2 | 0 | Strings |
| **Partitioning** | 2 | 0 | Sorting |
| **Pruning** | 2 | 0 | Backtracking |
| **Queue** | 2 | 1 | Queues & Deques |
| **Recursion** | 2 | 0 | Linked List |
| **Run-length encoding** | 2 | 0 | Strings |
| **Running minimum** | 2 | 0 | Queues & Deques |
| **Shifts** | 2 | 0 | Bit Manipulation |
| **Simulation** | 2 | 0 | Arrays |
| **Sorted array** | 2 | 0 | Two Pointers |
| **Structural comparison** | 2 | 1 | Trees & BST |
| **Subset-sum DP** | 2 | 0 | Dynamic Programming |
| **Sweep line** | 2 | 1 | Intervals |
| **Tarjan** | 2 | 0 | Advanced Graphs |
| **Trial division** | 2 | 0 | Math & Number Theory |
| **Two stacks** | 2 | 0 | Design |
| **0/1 knapsack** | 1 | 0 | Dynamic Programming |
| **2D prefix sums** | 1 | 0 | Prefix & Suffix Sums |
| **Addition without the + operator** | 1 | 0 | Bit Manipulation |
| **Adjacency matrix** | 1 | 0 | Graphs |
| **Adjacent pair scan** | 1 | 0 | Arrays |
| **Aggregation** | 1 | 0 | Design |
| **All-pairs shortest path** | 1 | 0 | Advanced Graphs |
| **Alternating direction** | 1 | 0 | Trees & BST |
| **Arithmetic** | 1 | 0 | Arrays |
| **Array** | 1 | 0 | Queues & Deques |
| **Array with a cursor** | 1 | 0 | Design |
| **Atomics** | 1 | 0 | Concurrency |
| **Augmented node state** | 1 | 0 | Trie |
| **Auxiliary minimum tracking** | 1 | 1 | Stacks |
| **Backtracking with wildcards** | 1 | 0 | Trie |
| **Balance counting** | 1 | 0 | Prefix & Suffix Sums |
| **Bit manipulation** | 1 | 0 | Math & Number Theory |
| **Bit partitioning** | 1 | 0 | Bit Manipulation |
| **Block reversal** | 1 | 0 | Linked List |
| **Blocking queue** | 1 | 0 | Concurrency |
| **Borrow propagation** | 1 | 0 | Bit Manipulation |
| **Boundary shrinking** | 1 | 0 | Arrays |
| **Bracket matching** | 1 | 1 | Stacks |
| **Bucket sort** | 1 | 0 | Arrays |
| **Bucketing** | 1 | 0 | Design |
| **Canonical key** | 1 | 0 | Hashing |
| **Case rules** | 1 | 0 | Trie |
| **Circular array** | 1 | 0 | Stacks |
| **Circular DP** | 1 | 0 | Dynamic Programming |
| **Circular list** | 1 | 0 | Linked List |
| **Complement counting** | 1 | 0 | Prefix & Suffix Sums |
| **Complement trick** | 1 | 0 | Arrays |
| **Counting** | 1 | 0 | Sliding Window |
| **Counting factors** | 1 | 0 | Math & Number Theory |
| **Custom comparator** | 1 | 0 | Greedy |
| **Custom ordering** | 1 | 0 | Hashing |
| **Cut property** | 1 | 0 | Advanced Graphs |
| **Cut vertices** | 1 | 0 | Advanced Graphs |
| **Cyclic shift** | 1 | 0 | Arrays |
| **Deep copy with cycles** | 1 | 0 | Linked List |
| **Deferred evaluation** | 1 | 0 | Stacks |
| **Degree conditions** | 1 | 0 | Advanced Graphs |
| **Degree peeling** | 1 | 0 | Binary Search |
| **Digit-by-digit carry** | 1 | 1 | Linked List |
| **Distance ranking** | 1 | 0 | Heaps & Priority Queues |
| **Divide and conquer on a list** | 1 | 0 | Linked List |
| **Divide and select** | 1 | 0 | Sorting |
| **Divisor pairs** | 1 | 0 | Math & Number Theory |
| **Double-checked locking** | 1 | 0 | Concurrency |
| **Doubly linked list** | 1 | 1 | Design |
| **DSATUR** | 1 | 0 | Advanced Graphs |
| **Duplicate skipping** | 1 | 1 | Two Pointers |
| **Duplicates** | 1 | 0 | Binary Search |
| **Dynamic Programming** | 1 | 0 | Strings |
| **Earliest finishing time** | 1 | 0 | Intervals |
| **Euclidean algorithm** | 1 | 0 | Math & Number Theory |
| **Expand around centre** | 1 | 0 | Strings |
| **Expand around the centre** | 1 | 0 | Dynamic Programming |
| **Explicit stack** | 1 | 1 | Trees & BST |
| **Extended to two candidates** | 1 | 0 | Arrays |
| **Fast and slow** | 1 | 0 | Linked List |
| **Fast exponentiation** | 1 | 0 | Math & Number Theory |
| **Finite state machine** | 1 | 0 | Strings |
| **Fisher-Yates** | 1 | 0 | Arrays |
| **Fleet time from the back** | 1 | 0 | Intervals |
| **Flood fill** | 1 | 0 | Backtracking |
| **Frequency buckets** | 1 | 0 | Design |
| **Game DP** | 1 | 0 | Dynamic Programming |
| **Graph theory** | 1 | 0 | Graphs |
| **Greedy + DP** | 1 | 0 | Dynamic Programming |
| **Greedy heap (the wrong answer)** | 1 | 0 | Heaps & Priority Queues |
| **Greedy post-order** | 1 | 0 | Trees & BST |
| **Greedy sorting** | 1 | 0 | Greedy |
| **Grid search** | 1 | 0 | Trie |
| **Growing sorted prefix** | 1 | 0 | Sorting |
| **Half reversal** | 1 | 0 | Math & Number Theory |
| **HashSet lookups** | 1 | 0 | Dynamic Programming |
| **In-order iteration** | 1 | 1 | Trees & BST |
| **In-place accumulation** | 1 | 0 | Prefix & Suffix Sums |
| **In-place sorting** | 1 | 0 | Sorting |
| **In-place swap** | 1 | 0 | Strings |
| **In-place transformation** | 1 | 0 | Arrays |
| **Inclusion-exclusion** | 1 | 0 | Prefix & Suffix Sums |
| **Index maps** | 1 | 0 | Trees & BST |
| **Interleaving** | 1 | 0 | Linked List |
| **Interval scheduling** | 1 | 0 | Heaps & Priority Queues |
| **Iterative recurrence** | 1 | 0 | Dynamic Programming |
| **Iterative reversal** | 1 | 1 | Linked List |
| **Join before reading** | 1 | 0 | Concurrency |
| **Jump game** | 1 | 0 | Dynamic Programming |
| **Kahn's algorithm** | 1 | 0 | Graphs |
| **Keep the k largest** | 1 | 0 | Greedy |
| **Kernighan's algorithm** | 1 | 0 | Bit Manipulation |
| **Kosaraju** | 1 | 0 | Advanced Graphs |
| **Largest denomination first** | 1 | 0 | Greedy |
| **Left-to-right scan** | 1 | 0 | Strings |
| **Level linking** | 1 | 0 | Trees & BST |
| **Level-order encoding** | 1 | 0 | Trees & BST |
| **LIFO over FIFO** | 1 | 0 | Queues & Deques |
| **Linear scan** | 1 | 0 | Arrays |
| **Lock** | 1 | 0 | Concurrency |
| **Lock-free** | 1 | 0 | Concurrency |
| **Long division** | 1 | 0 | Bit Manipulation |
| **Lookup table** | 1 | 0 | Strings |
| **Majority guarantee** | 1 | 0 | Arrays |
| **Marker rows and columns** | 1 | 0 | Arrays |
| **Matrix transposition** | 1 | 0 | Arrays |
| **Max-heap simulation** | 1 | 0 | Greedy |
| **Merge then complement** | 1 | 0 | Intervals |
| **Merging** | 1 | 0 | Sorting |
| **Min-heap** | 1 | 0 | Graphs |
| **Min-heap of end times** | 1 | 0 | Intervals |
| **Minimum spanning tree** | 1 | 0 | Advanced Graphs |
| **Modulo indexing** | 1 | 0 | Arrays |
| **Monotone predicate** | 1 | 0 | Binary Search |
| **Monotonic deque** | 1 | 1 | Queues & Deques |
| **Negative weights** | 1 | 0 | Advanced Graphs |
| **Nested parsing** | 1 | 0 | Stacks |
| **No division** | 1 | 0 | Prefix & Suffix Sums |
| **Non-comparison sort** | 1 | 0 | Sorting |
| **NP-hard** | 1 | 0 | Advanced Graphs |
| **O(1) range queries** | 1 | 0 | Prefix & Suffix Sums |
| **One deletion** | 1 | 0 | Strings |
| **One pass** | 1 | 0 | Two Pointers |
| **One-pass** | 1 | 1 | Arrays |
| **One-pass minimum tracking** | 1 | 0 | Arrays |
| **Operator precedence** | 1 | 0 | Stacks |
| **Ordered merge** | 1 | 0 | Concurrency |
| **Overflow check** | 1 | 0 | Math & Number Theory |
| **Overflow guards** | 1 | 0 | Strings |
| **Overlap detection** | 1 | 0 | Intervals |
| **Parsing a nested structure** | 1 | 0 | Linked List |
| **Patience sorting** | 1 | 1 | Dynamic Programming |
| **Per-index history** | 1 | 0 | Design |
| **Pigeonhole bound** | 1 | 0 | Arrays |
| **Pipeline** | 1 | 0 | Concurrency |
| **Pointer switching** | 1 | 0 | Linked List |
| **Poison pill** | 1 | 0 | Concurrency |
| **Post-order height check** | 1 | 1 | Trees & BST |
| **Post-order with global state** | 1 | 0 | Trees & BST |
| **Postfix evaluation** | 1 | 0 | Stacks |
| **Precedence graph** | 1 | 0 | Graphs |
| **Prefix and suffix products** | 1 | 0 | Prefix & Suffix Sums |
| **Prefix sum with a hash map** | 1 | 0 | Prefix & Suffix Sums |
| **Prefix sums with a hash map** | 1 | 0 | Prefix & Suffix Sums |
| **Prefix tree** | 1 | 0 | Trie |
| **Prefix walk** | 1 | 0 | Trie |
| **Prefix-sum reset** | 1 | 0 | Greedy |
| **Radix sort** | 1 | 0 | Sorting |
| **Range bounds** | 1 | 1 | Trees & BST |
| **Rate limiting** | 1 | 0 | Design |
| **Reach tracking** | 1 | 0 | Greedy |
| **Reachability** | 1 | 0 | Graphs |
| **Recurrence** | 1 | 0 | Linked List |
| **Recursion + memoization** | 1 | 0 | Dynamic Programming |
| **Repeated swapping** | 1 | 0 | Sorting |
| **Reverse a half list** | 1 | 0 | Linked List |
| **Right-to-left scan** | 1 | 0 | Arrays |
| **Ring buffer** | 1 | 0 | Queues & Deques |
| **Rotation** | 1 | 0 | Queues & Deques |
| **Round trip** | 1 | 0 | Trees & BST |
| **Running aggregates** | 1 | 0 | Design |
| **Running balance** | 1 | 0 | Prefix & Suffix Sums |
| **Running best** | 1 | 0 | Two Pointers |
| **Running difference** | 1 | 0 | Arrays |
| **Running maxima** | 1 | 1 | Stacks |
| **Running value** | 1 | 0 | Strings |
| **Safe publication** | 1 | 0 | Concurrency |
| **Segment by segment** | 1 | 0 | Strings |
| **Segment reversal** | 1 | 0 | Linked List |
| **Sentinel** | 1 | 0 | Stacks |
| **Separate chaining** | 1 | 0 | Design |
| **Set intersection** | 1 | 0 | Hashing |
| **Set membership** | 1 | 0 | Hashing |
| **Sieve of Eratosthenes** | 1 | 0 | Math & Number Theory |
| **Single pass** | 1 | 0 | Arrays |
| **Sliding distance window** | 1 | 0 | Arrays |
| **Sort and two pointers** | 1 | 0 | Greedy |
| **Sort by value per unit** | 1 | 0 | Greedy |
| **Sorted map** | 1 | 0 | Design |
| **Sorted sweep** | 1 | 0 | Intervals |
| **Sorted sweep with room availability** | 1 | 0 | Intervals |
| **Stable counting sort** | 1 | 0 | Sorting |
| **Stack of frames** | 1 | 0 | Stacks |
| **Stack of pending results** | 1 | 0 | Stacks |
| **Staircase search** | 1 | 0 | Binary Search |
| **State compression** | 1 | 0 | Dynamic Programming |
| **State machine** | 1 | 0 | Design |
| **State-compression DP** | 1 | 0 | Dynamic Programming |
| **String building** | 1 | 0 | Strings |
| **String comparison** | 1 | 0 | Graphs |
| **String hashing** | 1 | 0 | Sliding Window |
| **String manipulation** | 1 | 0 | Graphs |
| **String scanning** | 1 | 0 | Two Pointers |
| **String splitting** | 1 | 0 | Strings |
| **Strings** | 1 | 0 | Sliding Window |
| **Subset sum DP** | 1 | 0 | Heaps & Priority Queues |
| **Suffix maximum** | 1 | 0 | Stacks |
| **Symmetric two-stack deque** | 1 | 0 | Queues & Deques |
| **Take-or-skip** | 1 | 1 | Dynamic Programming |
| **Three pointers** | 1 | 0 | Math & Number Theory |
| **Three-way partitioning** | 1 | 0 | Sorting |
| **Three-way sweep** | 1 | 0 | Intervals |
| **Transpose graph** | 1 | 0 | Advanced Graphs |
| **Tree** | 1 | 0 | Binary Search |
| **Tree DP** | 1 | 0 | Trees & BST |
| **Trie + backtracking** | 1 | 0 | Trie |
| **Twin bounded heaps** | 1 | 0 | Heaps & Priority Queues |
| **Two chains** | 1 | 0 | Linked List |
| **Two DFS passes** | 1 | 0 | Advanced Graphs |
| **Two heaps** | 1 | 1 | Heaps & Priority Queues |
| **Two-colouring** | 1 | 0 | Graphs |
| **Two-pass constraint propagation** | 1 | 0 | Greedy |
| **Two-phase scan** | 1 | 0 | Arrays |
| **Two-stack FIFO** | 1 | 0 | Queues & Deques |
| **Two's complement** | 1 | 0 | Bit Manipulation |
| **Undo journal** | 1 | 0 | Design |
| **Uniform random permutation** | 1 | 0 | Arrays |
| **Upper bound** | 1 | 0 | Binary Search |
| **Used array** | 1 | 1 | Backtracking |
| **Versioning** | 1 | 0 | Design |
| **Vertical scan** | 1 | 0 | Strings |
| **Visited set** | 1 | 0 | Greedy |
| **Weighted interval scheduling** | 1 | 0 | Greedy |
| **Wildcard bucketing** | 1 | 0 | Graphs |
| **Win detection** | 1 | 0 | Design |
| **Work splitting** | 1 | 0 | Concurrency |
| **XOR trick** | 1 | 0 | Arrays |

## The pattern families

**Linear scans** — Two Pointers, Sliding Window, Prefix Sum, Prefix/Suffix, Dutch National Flag.
*Shape:* you are looking at a contiguous range and can rule out candidates as you go.

**Lookup** — Hashing, Frequency Counting, Hash Map, Hash Set.
*Shape:* you need "have I seen this before?" in constant time.

**Ordered access** — Binary Search, Binary Search on Answer, Rotated Sorted Array, Tapping.
*Shape:* the input is sorted, or the answer is monotonic.

**Selection** — Heaps, Top-K, Two Heaps, Quickselect.
*Shape:* you need the k-th smallest, or the k largest, without sorting everything.

**Structure building** — Linked List, Stack, Queue, Monotonic Stack, Deque, Trie, Heap.
*Shape:* the problem is really asking you to maintain a data structure under a sequence of
operations.

**Traversal** — BFS, DFS, Trees, Graph Traversal, Topological Sort, Union-Find.
*Shape:* you are exploring a structure, and order matters (or does not).

**Recursive decomposition** — Dynamic Programming, Divide and Conquer, Backtracking,
Bit Manipulation.
*Shape:* the problem splits into smaller copies of itself.

**Optimisation** — Greedy, Intervals, Sliding Window, Two Pointers, Greedy + Heap.
*Shape:* there is a constraint and you want the best arrangement under it.

**Merger** — Merge Sort, Merge K Sorted Lists, K-Way Merge, Linked List Merge.
*Shape:* several already-ordered inputs.

## Per-pattern breakdown

### Greedy

*Topics: Advanced Graphs, Arrays, Binary Search, Dynamic Programming, Graphs, Greedy, Heaps & Priority Queues, Intervals, Sliding Window, Strings, Two Pointers*

- Container With Most Water — Medium · \`twopointers.ContainerWithMostWater\`
- Dijkstra's Shortest Path — Medium · \`advancedgraphs.DijkstraShortestPath\`
- Task Scheduler — Medium · \`heaps.TaskScheduler\`
- Best Time to Buy and Sell Stock — Easy · \`arrays.BestTimeToBuyAndSellStock\`
- Best Time to Buy and Sell Stock III — Hard · \`dynamicprogramming.BestTimeToBuySellStockIII\`
- Candy — Hard · \`greedy.Candy\`
- Capacity To Ship Packages Within D Days — Medium · \`binarysearch.CapacityToShipPackages\`
- Car Fleet — Medium · \`intervals.CarFleet\`
- Gas Station — Medium · \`greedy.GasStation\`
- Graph Coloring — Hard · \`advancedgraphs.GraphColoring\`
- Jump Game — Medium · \`greedy.JumpGame\`
- Jump Game II — Medium · \`greedy.JumpGameII\`
- Kruskal's Minimum Spanning Tree — Medium · \`advancedgraphs.KruskalMinimumSpanningTree\`
- Largest Number — Medium · \`greedy.LargestNumber\`
- Longest Repeating Character Replacement — Medium · \`slidingwindow.LongestRepeatingCharacterReplacement\`
- Minimum Spanning Tree — Medium · \`advancedgraphs.MinimumSpanningTree\`
- Non-overlapping Intervals — Medium · \`intervals.NonOverlappingIntervals\`
- Prim's Minimum Spanning Tree — Medium · \`advancedgraphs.PrimMinimumSpanningTree\`
- Reconstruct Itinerary — Hard · \`graphs.ReconstructItinerary\`
- Reorganize String — Medium · \`heaps.ReorganizeString\`
- Split Array Largest Sum — Hard · \`binarysearch.SplitArrayLargestSum\`
- Wildcard Matching — Hard · \`dynamicprogramming.WildcardMatching\`
- Aggressive Cows — Medium · \`binarysearch.AggressiveCows\`
- Allocate Minimum Number of Painters — Hard · \`binarysearch.AllocateMinimumNumberOfPainters\`
- Assign Cookies — Easy · \`greedy.AssignCookies\`
- Best Time to Buy and Sell Stock II — Medium · \`arrays.BestTimeToBuyAndSellStockII\`
- Coin Change with Greedy — Medium · \`greedy.GreedyCoinChange\`
- Employee Free Day — Medium · \`heaps.EmployeeFreeDay\`
- Hand of Straights — Medium · \`greedy.HandOfStraights\`
- Integer to Roman — Medium · \`strings.IntegerToRoman\`
- Maximum Difference Between Two Elements of an Array — Medium · \`twopointers.MaximumDifferenceBetweenTwoElements\`
- Meeting Rooms III — Hard · \`intervals.MeetingRoomsIII\`
- Minimum Number of Refueling Stops — Medium · \`greedy.MinimumNumberOfRefuelingStops\`
- Partition Array Into Maximum Subarrays — Medium · \`greedy.PartitionArrayToMaximumSum\`
- Roman to Integer — Easy · \`strings.RomanToInteger\`
- Maximum Units on a Truck — Easy · \`greedy.MaximumUnitsOnATruck\`

### DFS

*Topics: Advanced Graphs, Graphs, Trees & BST*

- Balanced Binary Tree — Easy · \`trees.BalancedBinaryTree\`
- Binary Tree Inorder Traversal — Easy · \`trees.BinaryTreeInorderTraversal\`
- Lowest Common Ancestor of a Binary Tree — Medium · \`trees.LowestCommonAncestor\`
- Maximum Depth of Binary Tree — Easy · \`trees.BinaryTreeMaximumDepth\`
- Path Sum — Easy · \`trees.PathSum\`
- Same Tree — Easy · \`trees.SameTree\`
- Validate Binary Search Tree — Medium · \`trees.ValidateBinarySearchTree\`
- Articulation Points in a Graph — Hard · \`advancedgraphs.ArticulationPoints\`
- Binary Tree Minimum Depth — Easy · \`trees.BinaryTreeMinimumDepth\`
- Binary Tree Paths — Easy · \`trees.BinaryTreePaths\`
- Bridges in a Graph — Hard · \`advancedgraphs.BridgesInGraph\`
- Diameter of Binary Tree — Easy · \`trees.DiameterOfBinaryTree\`
- Invert Binary Tree — Easy · \`trees.InvertBinaryTree\`
- Number of Islands — Medium · \`graphs.NumberOfIslands\`
- Path Sum III — Medium · \`trees.CountPathsWithGivenSum\`
- Subtree of Another Tree — Easy · \`trees.SubtreeOfAnotherTree\`
- Symmetric Tree — Easy · \`trees.SymmetricTree\`
- Tarjan's Strongly Connected Components — Hard · \`advancedgraphs.TarjanStronglyConnectedComponents\`
- Keys and Rooms — Medium · \`graphs.KeysAndRooms\`
- Sum of Left Leaves — Easy · \`trees.SumOfLeftLeaves\`

### Two pointers

*Topics: Arrays, Heaps & Priority Queues, Intervals, Linked List, Queues & Deques, Sliding Window, Sorting, Stacks, Strings, Trie*

- Linked List Cycle — Easy · \`linkedlist.DetectCycle\`
- Longest Substring Without Repeating Characters — Medium · \`slidingwindow.LongestSubstringWithoutRepeatingCharacters\`
- Merge Two Sorted Lists — Easy · \`linkedlist.MergeTwoSortedLists\`
- Remove Nth Node From End of List — Medium · \`linkedlist.DeleteNthFromEnd\`
- Sliding Window Maximum — Hard · \`queues.SlidingWindowMaximum\`
- Trapping Rain Water — Hard · \`stacks.TrappingRainWater\`
- Dutch National Flag — Medium · \`sorting.DutchNationalFlag\`
- Intersection of Two Linked Lists — Easy · \`linkedlist.IntersectionOfTwoLinkedLists\`
- K Closest Elements — Medium · \`heaps.KClosestElements\`
- Linked List Cycle II — Medium · \`linkedlist.LinkedListCycleII\`
- Middle of the Linked List — Easy · \`linkedlist.MiddleOfTheLinkedList\`
- Minimum Window Substring — Hard · \`slidingwindow.MinimumWindowSubstring\`
- Palindrome Linked List — Medium · \`linkedlist.PalindromeLinkedList\`
- Reorder List — Medium · \`linkedlist.ReorderList\`
- Camelcase Matching — Medium · \`trie.CamelCaseMatching\`
- Interval List Intersections — Medium · \`intervals.IntervalListIntersections\`
- Reverse Words in a String — Medium · \`strings.ReverseWordsInString\`
- Maximum Width Ramp — Hard · \`arrays.MaximumWidthRamp\`
- Remove Element — Easy · \`arrays.RemoveElement\`

### Hashing

*Topics: Arrays, Design, Hashing, Heaps & Priority Queues, Prefix & Suffix Sums, Sliding Window*

- Longest Substring Without Repeating Characters — Medium · \`slidingwindow.LongestSubstringWithoutRepeatingCharacters\`
- Top K Frequent Elements — Medium · \`heaps.TopKFrequentElements\`
- Two Sum — Easy · \`arrays.TwoSum\`
- Contains Duplicate — Easy · \`hashing.ContainsDuplicate\`
- Fruit Into Baskets — Medium · \`slidingwindow.FruitIntoBaskets\`
- Group Anagrams — Medium · \`hashing.GroupAnagrams\`
- Longest Consecutive Sequence — Medium · \`hashing.LongestConsecutiveSequence\`
- Longest Subarray with At Most K Distinct — Medium · \`slidingwindow.LongestSubarrayWithAtMostKDistinct\`
- Minimum Window Substring — Hard · \`slidingwindow.MinimumWindowSubstring\`
- Permutation in String — Medium · \`slidingwindow.PermutationInString\`
- Contains Duplicate II — Medium · \`arrays.ContainsDuplicateII\`
- Design HashMap — Easy · \`design.DesignHashMap\`
- Find All Duplicates in an Array — Medium · \`hashing.FindAllDuplicatesInArray\`
- Intersection of Two Arrays — Easy · \`hashing.IntersectionOfTwoArrays\`
- Isomorphic Strings — Easy · \`hashing.IsomorphicStrings\`
- Word Pattern — Easy · \`hashing.WordPattern\`
- Pairs With a Target Sum — Medium · \`prefixsum.PairsWithTargetSum\`

### Two Pointers

*Topics: Sorting, Strings, Two Pointers*

- 3Sum — Medium · \`twopointers.ThreeSum\`
- Container With Most Water — Medium · \`twopointers.ContainerWithMostWater\`
- 3Sum Closest — Medium · \`twopointers.ThreeSumClosest\`
- Longest Common Prefix — Easy · \`strings.LongestCommonPrefix\`
- Longest Palindromic Substring — Medium · \`strings.LongestPalindromicSubstring\`
- Move Zeroes — Easy · \`twopointers.MoveZeroes\`
- Remove Duplicates from Sorted Array — Easy · \`twopointers.RemoveDuplicatesFromSortedArray\`
- Remove Duplicates from Sorted Array II — Medium · \`twopointers.RemoveDuplicatesFromSortedArrayII\`
- Squares of a Sorted Array — Easy · \`twopointers.SquaresOfSortedArray\`
- Two Sum II - Input Array Is Sorted — Easy · \`twopointers.TwoSumII\`
- Valid Palindrome — Easy · \`twopointers.ValidPalindrome\`
- Compare Version Numbers — Medium · \`strings.CompareVersionNumbers\`
- Reverse String — Easy · \`strings.ReverseString\`
- Sort Array By Parity — Easy · \`sorting.SortArrayByParity\`
- Valid Palindrome II — Easy · \`strings.ValidPalindromeII\`
- String Compression — Easy · \`strings.StringCompression\`

### Backtracking

*Topics: Advanced Graphs, Backtracking, Dynamic Programming, Trees & BST*

- Combination Sum — Medium · \`backtracking.CombinationSum\`
- Permutations — Medium · \`backtracking.Permutations\`
- Subsets — Medium · \`backtracking.Subsets\`
- Binary Tree Paths — Easy · \`trees.BinaryTreePaths\`
- Combination Sum II — Medium · \`backtracking.CombinationSumII\`
- Generate Parentheses — Medium · \`backtracking.GenerateParentheses\`
- Graph Coloring — Hard · \`advancedgraphs.GraphColoring\`
- Letter Combinations of a Phone Number — Medium · \`backtracking.LetterCombinationsOfAPhoneNumber\`
- N-Queens — Hard · \`backtracking.NQueens\`
- Palindrome Partitioning — Medium · \`backtracking.PalindromePartitioning\`
- Permutations II — Medium · \`backtracking.PermutationsII\`
- Sudoku Solver — Hard · \`backtracking.SudokuSolver\`
- Word Search — Medium · \`backtracking.WordSearch\`
- N-Queens II — Hard · \`backtracking.NQueensII\`
- Unique Paths III — Hard · \`dynamicprogramming.GridUniquePathsIII\`

### BFS

*Topics: Graphs, Greedy, Trees & BST*

- Binary Tree Level Order Traversal — Medium · \`trees.BinaryTreeLevelOrderTraversal\`
- Course Schedule — Medium · \`graphs.CourseSchedule\`
- Course Schedule II — Medium · \`graphs.CourseScheduleII\`
- Is Graph Bipartite — Medium · \`graphs.BipartiteCheck\`
- Number of Connected Components in an Undirected Graph — Medium · \`graphs.NumberOfConnectedComponents\`
- Number of Islands — Medium · \`graphs.NumberOfIslands\`
- Populating Next Right Pointers in Each Node — Medium · \`trees.PopulateNextRightPointers\`
- Word Ladder — Medium · \`graphs.WordLadder\`
- Zigzag Level Order Traversal — Medium · \`trees.ZigzagLevelOrderTraversal\`
- Clone Graph — Medium · \`graphs.CloneGraph\`
- Jump Game III — Medium · \`greedy.JumpGameIII\`
- Pacman Paths — Medium · \`graphs.PacmanPaths\`
- Shortest Path in a Binary Maze — Medium · \`graphs.ShortestPathInBinaryGrid\`

### Design

*Topics: Design*

- LRU Cache — Medium · \`design.LRUCache\`
- LFU Cache — Hard · \`design.LFUCache\`
- Rate Limiter — Medium · \`design.RateLimiter\`
- Design Browser History — Medium · \`design.DesignBrowserHistory\`
- Design HashMap — Easy · \`design.DesignHashMap\`
- Design Hit Counter — Medium · \`design.DesignHitCounter\`
- Design Tic-Tac-Toe — Medium · \`design.DesignTicTacToe\`
- Design Underground System — Medium · \`design.DesignUndergroundSystem\`
- Min Max Stack — Medium · \`design.MinMaxStack\`
- Moving Average — Easy · \`design.MovingAverage\`
- Semaphore — Medium · \`design.SemaphoreClass\`
- Snapshot Array — Medium · \`design.SnapshotArray\`
- Design Text Editor — Hard · \`design.DesignTextEditor\`

### Frequency counting

*Topics: Greedy, Hashing, Heaps & Priority Queues, Sliding Window, Sorting, Strings*

- Task Scheduler — Medium · \`heaps.TaskScheduler\`
- Top K Frequent Elements — Medium · \`heaps.TopKFrequentElements\`
- Find All Anagrams in a String — Medium · \`slidingwindow.FindAllAnagramsInString\`
- Fruit Into Baskets — Medium · \`slidingwindow.FruitIntoBaskets\`
- Longest Subarray with At Most K Distinct — Medium · \`slidingwindow.LongestSubarrayWithAtMostKDistinct\`
- Permutation in String — Medium · \`slidingwindow.PermutationInString\`
- Reorganize String — Medium · \`heaps.ReorganizeString\`
- Valid Anagram — Easy · \`strings.ValidAnagram\`
- Counting Sort — Medium · \`sorting.CountingSort\`
- Find All Duplicates in an Array — Medium · \`hashing.FindAllDuplicatesInArray\`
- First Unique Character in a String — Easy · \`hashing.FirstUniqueCharacterInString\`
- Hand of Straights — Medium · \`greedy.HandOfStraights\`
- Sort by Frequency of Characters — Medium · \`hashing.FrequencySort\`

### Sliding window

*Topics: Design, Queues & Deques, Sliding Window*

- Longest Substring Without Repeating Characters — Medium · \`slidingwindow.LongestSubstringWithoutRepeatingCharacters\`
- Sliding Window Maximum — Hard · \`queues.SlidingWindowMaximum\`
- Find All Anagrams in a String — Medium · \`slidingwindow.FindAllAnagramsInString\`
- Fruit Into Baskets — Medium · \`slidingwindow.FruitIntoBaskets\`
- Longest Repeating Character Replacement — Medium · \`slidingwindow.LongestRepeatingCharacterReplacement\`
- Longest Subarray with At Most K Distinct — Medium · \`slidingwindow.LongestSubarrayWithAtMostKDistinct\`
- Minimum Window Substring — Hard · \`slidingwindow.MinimumWindowSubstring\`
- Permutation in String — Medium · \`slidingwindow.PermutationInString\`
- Rate Limiter — Medium · \`design.RateLimiter\`
- Design Hit Counter — Medium · \`design.DesignHitCounter\`
- Longest Repeating Substring — Hard · \`slidingwindow.LongestRepeatingSubstring\`
- Minimum Number of Flips to Make the Binary String Alternating — Medium · \`slidingwindow.MinimumNumberOfFlips\`
- Moving Average — Easy · \`design.MovingAverage\`

### Bit tricks

*Topics: Bit Manipulation*

- Single Number — Easy · \`bitmanipulation.SingleNumber\`
- Divide Two Integers — Medium · \`bitmanipulation.DivideTwoIntegers\`
- Hamming Distance — Easy · \`bitmanipulation.HammingDistance\`
- Number of 1 Bits — Easy · \`bitmanipulation.CountSetBits\`
- Power of Two — Easy · \`bitmanipulation.PowerOfTwo\`
- Reverse Bits — Easy · \`bitmanipulation.ReverseBits\`
- Sum of Two Integers — Medium · \`bitmanipulation.AddTwoIntegers\`
- Counting Bits — Easy · \`bitmanipulation.NumberOfSetBits\`
- Gray Code — Medium · \`bitmanipulation.GrayCode\`
- Subtract Two Integers without Minus — Medium · \`bitmanipulation.SubtractWithoutMinus\`
- XOR of All Elements — Easy · \`bitmanipulation.XOROfArrayElements\`

### Binary search

*Topics: Binary Search, Heaps & Priority Queues*

- Median of Two Sorted Arrays — Hard · \`heaps.MedianOfTwoSortedArrays\`
- Search in Rotated Sorted Array — Medium · \`binarysearch.SearchInRotatedSortedArray\`
- Binary Search — Easy · \`binarysearch.BinarySearch\`
- Find First and Last Position of Element in Sorted Array — Medium · \`binarysearch.FindFirstAndLastPosition\`
- Find Minimum in Rotated Sorted Array — Medium · \`binarysearch.FindMinimumInRotatedSortedArray\`
- Find Peak Element — Medium · \`binarysearch.PeakElement\`
- First Bad Version — Easy · \`binarysearch.FirstBadVersion\`
- Search a 2D Matrix — Medium · \`binarysearch.Search2DMatrix\`
- Search in Rotated Sorted Array II — Medium · \`binarysearch.SearchInRotatedSortedArrayII\`
- Search Insert Position — Easy · \`binarysearch.SearchInsertPosition\`

### Bottom-up DP

*Topics: Dynamic Programming*

- Coin Change — Medium · \`dynamicprogramming.CoinChange\`
- House Robber — Medium · \`dynamicprogramming.HouseRobber\`
- Longest Increasing Subsequence — Medium · \`dynamicprogramming.LongestIncreasingSubsequence\`
- Burst Balloons — Hard · \`dynamicprogramming.BurstBalloons\`
- Climbing Stairs — Easy · \`dynamicprogramming.ClimbingStairs\`
- Maximum Product Subarray — Medium · \`dynamicprogramming.MaximumProductSubarray\`
- Minimum Path Sum — Medium · \`dynamicprogramming.MinimumPathSum\`
- Fibonacci Number — Easy · \`dynamicprogramming.FibonacciNumber\`
- Rod Cutting — Medium · \`dynamicprogramming.RodCutting\`
- Stone Game II — Medium · \`dynamicprogramming.StoneGameII\`

### Divide and conquer

*Topics: Binary Search, Dynamic Programming, Heaps & Priority Queues, Math & Number Theory, Sorting, Trees & BST*

- Binary Search — Easy · \`binarysearch.BinarySearch\`
- Construct Binary Tree from Preorder and Inorder Traversal — Medium · \`trees.BuildTreeFromPreorderAndInorder\`
- Find Peak Element — Medium · \`binarysearch.PeakElement\`
- House Robber II — Medium · \`dynamicprogramming.HouseRobberII\`
- Merge k Sorted Lists — Hard · \`heaps.MergeKSortedLists\`
- Merge Sort — Medium · \`sorting.MergeSort\`
- Pow(x, n) — Medium · \`math.PowOfANumber\`
- Quick Sort — Medium · \`sorting.QuickSort\`
- Search a 2D Matrix — Medium · \`binarysearch.Search2DMatrix\`

### Heap

*Topics: Heaps & Priority Queues, Sorting*

- Find Median from Data Stream — Hard · \`heaps.FindMedianFromDataStream\`
- Kth Largest Element in an Array — Medium · \`heaps.KthLargestElement\`
- Median of Two Sorted Arrays — Hard · \`heaps.MedianOfTwoSortedArrays\`
- Top K Frequent Elements — Medium · \`heaps.TopKFrequentElements\`
- K Closest Elements — Medium · \`heaps.KClosestElements\`
- Kth Smallest Element in a Sorted Matrix — Medium · \`heaps.KthSmallestElement\`
- Merge k Sorted Lists — Hard · \`heaps.MergeKSortedLists\`
- Find Kth Largest and Kth Smallest — Medium · \`heaps.FindKthLargestAndSmallest\`
- Heap Sort — Medium · \`sorting.HeapSort\`

### Concurrency

*Topics: Concurrency, Design*

- Bounded Blocking Queue — Medium · \`concurrency.BoundedBlockingQueue\`
- Producer–Consumer Problem — Medium · \`concurrency.ProducerConsumer\`
- Singleton with Double-Checked Locking — Medium · \`concurrency.SingletonDoubleCheckedLocking\`
- Thread-Safe Counter — Easy · \`concurrency.AtomicCounter\`
- Concurrent Sum using Threads — Medium · \`concurrency.ConcurrentSumWithThreads\`
- Semaphore — Medium · \`design.SemaphoreClass\`
- Parallel Pipeline Merge — Hard · \`concurrency.ParallelPipelineMerge\`

### Dynamic programming

*Topics: Advanced Graphs, Arrays, Bit Manipulation, Graphs, Math & Number Theory, Sliding Window*

- Cheapest Flights Within K Stops — Medium · \`graphs.CheapestFlightsWithinKStops\`
- Floyd-Warshall All-Pairs Shortest Path — Medium · \`advancedgraphs.FloydWarshall\`
- Maximum Subarray — Medium · \`arrays.MaxSubarray\`
- Counting Bits — Easy · \`bitmanipulation.NumberOfSetBits\`
- Longest Repeating Substring — Hard · \`slidingwindow.LongestRepeatingSubstring\`
- Shortest Path in a Binary Maze — Medium · \`graphs.ShortestPathInBinaryGrid\`
- Ugly Number — Medium · \`math.UglyNumber\`

### Monotonic stack

*Topics: Arrays, Stacks*

- Daily Temperatures — Medium · \`stacks.DailyTemperatures\`
- Largest Rectangle in Histogram — Hard · \`stacks.LargestRectangleInHistogram\`
- Next Greater Element — Easy · \`stacks.NextGreaterElement\`
- Next Greater Element II — Medium · \`stacks.NextGreaterElementII\`
- Max of Min for Every Window — Hard · \`stacks.MaxOfMinForEveryWindow\`
- Stock Span — Medium · \`stacks.StockSpan\`
- Maximum Width Ramp — Hard · \`arrays.MaximumWidthRamp\`

### Sorting

*Topics: Advanced Graphs, Arrays, Intervals, Two Pointers*

- 3Sum — Medium · \`twopointers.ThreeSum\`
- Merge Intervals — Medium · \`intervals.MergeIntervals\`
- 3Sum Closest — Medium · \`twopointers.ThreeSumClosest\`
- Insert Interval — Medium · \`intervals.InsertInterval\`
- Kruskal's Minimum Spanning Tree — Medium · \`advancedgraphs.KruskalMinimumSpanningTree\`
- Meeting Rooms — Easy · \`intervals.MeetingRooms\`
- Minimum Absolute Difference — Medium · \`arrays.MinimumAbsoluteDifference\`

### Stack

*Topics: Design, Queues & Deques, Stacks*

- Min Stack — Medium · \`stacks.MinStack\`
- Valid Parentheses — Easy · \`stacks.ValidParentheses\`
- Design a Min Queue — Medium · \`queues.MinQueue\`
- Evaluate Reverse Polish Notation — Medium · \`stacks.EvaluateReversePolishNotation\`
- Implement Queue using Stacks — Medium · \`queues.ImplementQueueUsingStacks\`
- Implement Deque using Two Stacks — Medium · \`queues.ImplementDequeUsingTwoStacks\`
- Min Max Stack — Medium · \`design.MinMaxStack\`

### String DP

*Topics: Dynamic Programming*

- Edit Distance — Medium · \`dynamicprogramming.EditDistance\`
- Longest Common Subsequence — Medium · \`dynamicprogramming.LongestCommonSubsequence\`
- Decode Ways — Medium · \`dynamicprogramming.DecodeWays\`
- Interleaving String — Medium · \`dynamicprogramming.InterleavingString\`
- Longest Common Substring — Medium · \`dynamicprogramming.LongestCommonSubstring\`
- Regular Expression Matching — Hard · \`dynamicprogramming.RegexMatching\`
- Wildcard Matching — Hard · \`dynamicprogramming.WildcardMatching\`

### 2-D DP

*Topics: Dynamic Programming*

- Edit Distance — Medium · \`dynamicprogramming.EditDistance\`
- Longest Common Subsequence — Medium · \`dynamicprogramming.LongestCommonSubsequence\`
- Interleaving String — Medium · \`dynamicprogramming.InterleavingString\`
- Longest Common Substring — Medium · \`dynamicprogramming.LongestCommonSubstring\`
- Regular Expression Matching — Hard · \`dynamicprogramming.RegexMatching\`
- Wildcard Matching — Hard · \`dynamicprogramming.WildcardMatching\`

### Binary search on the answer

*Topics: Binary Search*

- Capacity To Ship Packages Within D Days — Medium · \`binarysearch.CapacityToShipPackages\`
- Koko Eating Bananas — Medium · \`binarysearch.KokoEatingBananas\`
- Split Array Largest Sum — Hard · \`binarysearch.SplitArrayLargestSum\`
- Sqrt(x) — Easy · \`binarysearch.SquareRootOfANumber\`
- Aggressive Cows — Medium · \`binarysearch.AggressiveCows\`
- Allocate Minimum Number of Painters — Hard · \`binarysearch.AllocateMinimumNumberOfPainters\`

### Grid traversal

*Topics: Graphs*

- 01 Matrix — Medium · \`graphs.DistanceToNearestZero\`
- Number of Islands — Medium · \`graphs.NumberOfIslands\`
- Rotting Oranges — Medium · \`graphs.RottingOranges\`
- Pacman Paths — Medium · \`graphs.PacmanPaths\`
- Shortest Path in a Binary Maze — Medium · \`graphs.ShortestPathInBinaryGrid\`
- Walls and Gates — Medium · \`graphs.WallAndGates\`

### Number theory

*Topics: Math & Number Theory*

- Count Primes — Medium · \`math.SieveOfEratosthenes\`
- Factorial Trailing Zeroes — Easy · \`math.FactorialTrailingZeroes\`
- Happy Number — Easy · \`math.HappyNumber\`
- Is a Number Prime — Medium · \`math.DetectPrime\`
- Perfect Number — Easy · \`math.PerfectNumber\`
- Largest Prime Factor — Medium · \`math.LargestPrimeFactor\`

### Pointer rewiring

*Topics: Linked List*

- Reverse Linked List — Easy · \`linkedlist.ReverseLinkedList\`
- Odd Even Linked List — Medium · \`linkedlist.OddEvenLinkedList\`
- Reverse Linked List II — Medium · \`linkedlist.ReverseLinkedListII\`
- Reverse Nodes in k-Group — Hard · \`linkedlist.ReverseNodesInKGroup\`
- Rotate List — Medium · \`linkedlist.RotateList\`
- Swap Nodes in Pairs — Medium · \`linkedlist.SwapPairs\`

### Union-Find

*Topics: Advanced Graphs, Graphs*

- Is Graph Bipartite — Medium · \`graphs.BipartiteCheck\`
- Kruskal's Minimum Spanning Tree — Medium · \`advancedgraphs.KruskalMinimumSpanningTree\`
- Minimum Spanning Tree — Medium · \`advancedgraphs.MinimumSpanningTree\`
- Number of Connected Components in an Undirected Graph — Medium · \`graphs.NumberOfConnectedComponents\`
- Number of Provinces — Medium · \`graphs.NumberOfProvinces\`
- Graph Valid Tree — Medium · \`graphs.GraphValidTree\`

### BST

*Topics: Trees & BST*

- Kth Smallest Element in a BST — Medium · \`trees.KthSmallestElementInBST\`
- Lowest Common Ancestor of a BST — Medium · \`trees.LowestCommonAncestorOfBST\`
- Delete Node in a BST — Medium · \`trees.DeleteFromBST\`
- Insert into a Binary Search Tree — Medium · \`trees.InsertIntoBST\`
- Search in a Binary Search Tree — Easy · \`trees.SearchInBST\`

### Counting DP

*Topics: Dynamic Programming*

- Catalan Number — Medium · \`dynamicprogramming.CatalanNumber\`
- Coin Change II — Medium · \`dynamicprogramming.CoinChangeII\`
- Target Sum — Medium · \`dynamicprogramming.TargetSum\`
- Distinct Subsequences — Medium · \`dynamicprogramming.DistinctSubsequences\`
- Number of Partitions — Medium · \`dynamicprogramming.NumberOfPartitions\`

### Dummy head

*Topics: Linked List*

- Add Two Numbers — Medium · \`linkedlist.AddTwoNumbers\`
- Merge Two Sorted Lists — Easy · \`linkedlist.MergeTwoSortedLists\`
- Remove Nth Node From End of List — Medium · \`linkedlist.DeleteNthFromEnd\`
- Remove Duplicates from Sorted List II — Medium · \`linkedlist.RemoveDuplicatesFromSortedListII\`
- Swap Nodes in Pairs — Medium · \`linkedlist.SwapPairs\`

### Top-K

*Topics: Heaps & Priority Queues*

- Kth Largest Element in an Array — Medium · \`heaps.KthLargestElement\`
- Top K Frequent Elements — Medium · \`heaps.TopKFrequentElements\`
- K Closest Elements — Medium · \`heaps.KClosestElements\`
- Kth Smallest Element in a Sorted Matrix — Medium · \`heaps.KthSmallestElement\`
- Find Kth Largest and Kth Smallest — Medium · \`heaps.FindKthLargestAndSmallest\`

### XOR

*Topics: Bit Manipulation*

- Single Number — Easy · \`bitmanipulation.SingleNumber\`
- Hamming Distance — Easy · \`bitmanipulation.HammingDistance\`
- Single Number III — Medium · \`bitmanipulation.SingleNumberIII\`
- Gray Code — Medium · \`bitmanipulation.GrayCode\`
- XOR of All Elements — Easy · \`bitmanipulation.XOROfArrayElements\`

### Cycle detection

*Topics: Advanced Graphs, Graphs, Math & Number Theory*

- Bellman-Ford Shortest Path — Medium · \`advancedgraphs.BellmanFord\`
- Course Schedule — Medium · \`graphs.CourseSchedule\`
- Graph Valid Tree — Medium · \`graphs.GraphValidTree\`
- Happy Number — Easy · \`math.HappyNumber\`

### In-place compaction

*Topics: Arrays, Two Pointers*

- Move Zeroes — Easy · \`twopointers.MoveZeroes\`
- Remove Duplicates from Sorted Array — Easy · \`twopointers.RemoveDuplicatesFromSortedArray\`
- Remove Duplicates from Sorted Array II — Medium · \`twopointers.RemoveDuplicatesFromSortedArrayII\`
- Remove Element — Easy · \`arrays.RemoveElement\`

### Priority queue

*Topics: Advanced Graphs, Graphs*

- Dijkstra's Shortest Path — Medium · \`advancedgraphs.DijkstraShortestPath\`
- Course Schedule II — Medium · \`graphs.CourseScheduleII\`
- Network Delay Time — Medium · \`graphs.NetworkDelayTime\`
- Prim's Minimum Spanning Tree — Medium · \`advancedgraphs.PrimMinimumSpanningTree\`

### Topological sort

*Topics: Graphs*

- Course Schedule — Medium · \`graphs.CourseSchedule\`
- Course Schedule II — Medium · \`graphs.CourseScheduleII\`
- Topological Sort — Medium · \`graphs.TopologicalSort\`
- Alien Dictionary — Medium · \`graphs.AlienDictionary\`

### Trie

*Topics: Trie*

- Design Add and Search Words — Medium · \`trie.DesignAddAndSearchWords\`
- Implement Trie — Medium · \`trie.ImplementTrie\`
- Longest Prefix of a Phone Number — Medium · \`trie.LongestPrefixOfAPhoneNumber\`
- Trie with Prefix Counting — Medium · \`trie.PrefixCount\`

### Unbounded knapsack

*Topics: Dynamic Programming*

- Coin Change — Medium · \`dynamicprogramming.CoinChange\`
- Coin Change II — Medium · \`dynamicprogramming.CoinChangeII\`
- Number of Partitions — Medium · \`dynamicprogramming.NumberOfPartitions\`
- Rod Cutting — Medium · \`dynamicprogramming.RodCutting\`

### Amortised O(1)

*Topics: Queues & Deques*

- Design a Min Queue — Medium · \`queues.MinQueue\`
- Implement Queue using Stacks — Medium · \`queues.ImplementQueueUsingStacks\`
- Implement Deque using Two Stacks — Medium · \`queues.ImplementDequeUsingTwoStacks\`

### Bounded heap

*Topics: Heaps & Priority Queues*

- Kth Largest Element in an Array — Medium · \`heaps.KthLargestElement\`
- Kth Smallest Element in a Sorted Matrix — Medium · \`heaps.KthSmallestElement\`
- Employee Free Day — Medium · \`heaps.EmployeeFreeDay\`

### Carry propagation

*Topics: Arrays, Linked List, Math & Number Theory*

- Add Binary — Easy · \`math.AddBinary\`
- Add Two Numbers II — Medium · \`linkedlist.AddTwoNumbersII\`
- Plus One — Easy · \`arrays.PlusOne\`

### Comparison sort

*Topics: Sorting*

- Bubble Sort — Easy · \`sorting.BubbleSort\`
- Insertion Sort — Easy · \`sorting.InsertionSort\`
- Selection Sort — Easy · \`sorting.SelectionSort\`

### Constraint pruning

*Topics: Backtracking*

- N-Queens — Hard · \`backtracking.NQueens\`
- Sudoku Solver — Hard · \`backtracking.SudokuSolver\`
- N-Queens II — Hard · \`backtracking.NQueensII\`

### DFS on a grid

*Topics: Backtracking, Dynamic Programming*

- Word Search — Medium · \`backtracking.WordSearch\`
- Flood Fill — Easy · \`backtracking.FloodFill\`
- Unique Paths III — Hard · \`dynamicprogramming.GridUniquePathsIII\`

### DFS with a path

*Topics: Backtracking*

- Combination Sum — Medium · \`backtracking.CombinationSum\`
- Subsets — Medium · \`backtracking.Subsets\`
- Letter Combinations of a Phone Number — Medium · \`backtracking.LetterCombinationsOfAPhoneNumber\`

### HashMap

*Topics: Design, Graphs*

- LRU Cache — Medium · \`design.LRUCache\`
- LFU Cache — Hard · \`design.LFUCache\`
- Clone Graph — Medium · \`graphs.CloneGraph\`

### Interval DP

*Topics: Dynamic Programming, Strings*

- Burst Balloons — Hard · \`dynamicprogramming.BurstBalloons\`
- Palindromic Substrings — Medium · \`dynamicprogramming.PalindromicSubstrings\`
- Longest Palindromic Subsequence — Medium · \`strings.LongestPalindromicSubsequence\`

### Low-link values

*Topics: Advanced Graphs*

- Articulation Points in a Graph — Hard · \`advancedgraphs.ArticulationPoints\`
- Bridges in a Graph — Hard · \`advancedgraphs.BridgesInGraph\`
- Tarjan's Strongly Connected Components — Hard · \`advancedgraphs.TarjanStronglyConnectedComponents\`

### Multi-source BFS

*Topics: Graphs*

- 01 Matrix — Medium · \`graphs.DistanceToNearestZero\`
- Rotting Oranges — Medium · \`graphs.RottingOranges\`
- Walls and Gates — Medium · \`graphs.WallAndGates\`

### Partition

*Topics: Binary Search, Heaps & Priority Queues*

- Last Stone Weight II — Medium · \`heaps.LastStoneWeightII\`
- Split Array Largest Sum — Hard · \`binarysearch.SplitArrayLargestSum\`
- Allocate Minimum Number of Painters — Hard · \`binarysearch.AllocateMinimumNumberOfPainters\`

### Post-order recursion

*Topics: Trees & BST*

- Lowest Common Ancestor of a Binary Tree — Medium · \`trees.LowestCommonAncestor\`
- Maximum Depth of Binary Tree — Easy · \`trees.BinaryTreeMaximumDepth\`
- Binary Tree Minimum Depth — Easy · \`trees.BinaryTreeMinimumDepth\`

### Prefix DP

*Topics: Dynamic Programming*

- Decode Ways — Medium · \`dynamicprogramming.DecodeWays\`
- Word Break — Medium · \`dynamicprogramming.WordBreak\`
- Distinct Subsequences — Medium · \`dynamicprogramming.DistinctSubsequences\`

### Prefix sums

*Topics: Prefix & Suffix Sums, Trees & BST*

- Path Sum III — Medium · \`trees.CountPathsWithGivenSum\`
- Pivot Index — Easy · \`prefixsum.PivotIndex\`
- Range Sum Query — Immutable — Easy · \`prefixsum.RangeSumQuery\`

### Recursive descent

*Topics: Stacks, Trees & BST*

- Basic Calculator — Hard · \`stacks.BasicCalculator\`
- Delete Node in a BST — Medium · \`trees.DeleteFromBST\`
- Insert into a Binary Search Tree — Medium · \`trees.InsertIntoBST\`

### Rotated array

*Topics: Binary Search*

- Search in Rotated Sorted Array — Medium · \`binarysearch.SearchInRotatedSortedArray\`
- Find Minimum in Rotated Sorted Array — Medium · \`binarysearch.FindMinimumInRotatedSortedArray\`
- Search in Rotated Sorted Array II — Medium · \`binarysearch.SearchInRotatedSortedArrayII\`

### Run detection

*Topics: Hashing, Linked List, Two Pointers*

- Longest Consecutive Sequence — Medium · \`hashing.LongestConsecutiveSequence\`
- Remove Duplicates from Sorted Array II — Medium · \`twopointers.RemoveDuplicatesFromSortedArrayII\`
- Remove Duplicates from Sorted List II — Medium · \`linkedlist.RemoveDuplicatesFromSortedListII\`

### Running sum

*Topics: Design, Prefix & Suffix Sums, Trees & BST*

- Path Sum — Easy · \`trees.PathSum\`
- Moving Average — Easy · \`design.MovingAverage\`
- Running Sum of 1d Array — Easy · \`prefixsum.RunningSum\`

### Shortest path

*Topics: Graphs*

- Cheapest Flights Within K Stops — Medium · \`graphs.CheapestFlightsWithinKStops\`
- Network Delay Time — Medium · \`graphs.NetworkDelayTime\`
- Pacman Paths — Medium · \`graphs.PacmanPaths\`

### Base-26 conversion

*Topics: Strings*

- Excel Sheet Column Number — Easy · \`strings.ExcelSheetColumnNumber\`
- Excel Sheet Column Title — Easy · \`strings.ExcelSheetColumnTitle\`

### Bellman-Ford

*Topics: Advanced Graphs, Graphs*

- Bellman-Ford Shortest Path — Medium · \`advancedgraphs.BellmanFord\`
- Cheapest Flights Within K Stops — Medium · \`graphs.CheapestFlightsWithinKStops\`

### BFS by layers

*Topics: Binary Search, Greedy*

- Jump Game II — Medium · \`greedy.JumpGameII\`
- Minimum Height Trees — Medium · \`binarysearch.MinimumHeightTrees\`

### Bijective mapping

*Topics: Hashing*

- Isomorphic Strings — Easy · \`hashing.IsomorphicStrings\`
- Word Pattern — Easy · \`hashing.WordPattern\`

### Boyer-Moore voting

*Topics: Arrays*

- Majority Element — Easy · \`arrays.MajorityElement\`
- Majority Element II — Medium · \`arrays.MajorityElementII\`

### Combinatorics

*Topics: Dynamic Programming*

- Unique Paths — Medium · \`dynamicprogramming.UniquePaths\`
- Catalan Number — Medium · \`dynamicprogramming.CatalanNumber\`

### Condition variables

*Topics: Concurrency, Design*

- Bounded Blocking Queue — Medium · \`concurrency.BoundedBlockingQueue\`
- Semaphore — Medium · \`design.SemaphoreClass\`

### Connected components

*Topics: Graphs*

- Number of Connected Components in an Undirected Graph — Medium · \`graphs.NumberOfConnectedComponents\`
- Number of Provinces — Medium · \`graphs.NumberOfProvinces\`

### Cooldown

*Topics: Heaps & Priority Queues*

- Task Scheduler — Medium · \`heaps.TaskScheduler\`
- Reorganize String — Medium · \`heaps.ReorganizeString\`

### Digit manipulation

*Topics: Math & Number Theory*

- Palindrome Number — Easy · \`math.PalindromeNumber\`
- Reverse Integer — Medium · \`math.ReverseInteger\`

### Dijkstra

*Topics: Advanced Graphs, Graphs*

- Dijkstra's Shortest Path — Medium · \`advancedgraphs.DijkstraShortestPath\`
- Network Delay Time — Medium · \`graphs.NetworkDelayTime\`

### Duplicate pruning

*Topics: Backtracking*

- Combination Sum II — Medium · \`backtracking.CombinationSumII\`
- Permutations II — Medium · \`backtracking.PermutationsII\`

### Eulerian path

*Topics: Advanced Graphs, Graphs*

- Eulerian Path — Hard · \`advancedgraphs.EulerianPath\`
- Reconstruct Itinerary — Hard · \`graphs.ReconstructItinerary\`

### Floyd cycle detection

*Topics: Linked List*

- Linked List Cycle — Easy · \`linkedlist.DetectCycle\`
- Linked List Cycle II — Medium · \`linkedlist.LinkedListCycleII\`

### Graph traversal

*Topics: Graphs*

- Clone Graph — Medium · \`graphs.CloneGraph\`
- Keys and Rooms — Medium · \`graphs.KeysAndRooms\`

### Grid DP

*Topics: Dynamic Programming*

- Unique Paths — Medium · \`dynamicprogramming.UniquePaths\`
- Minimum Path Sum — Medium · \`dynamicprogramming.MinimumPathSum\`

### Hash map

*Topics: Hashing, Strings*

- Valid Anagram — Easy · \`strings.ValidAnagram\`
- First Unique Character in a String — Easy · \`hashing.FirstUniqueCharacterInString\`

### Hierholzer's algorithm

*Topics: Advanced Graphs, Graphs*

- Eulerian Path — Hard · \`advancedgraphs.EulerianPath\`
- Reconstruct Itinerary — Hard · \`graphs.ReconstructItinerary\`

### Iterative descent

*Topics: Trees & BST*

- Lowest Common Ancestor of a BST — Medium · \`trees.LowestCommonAncestorOfBST\`
- Search in a Binary Search Tree — Easy · \`trees.SearchInBST\`

### K-way merge

*Topics: Heaps & Priority Queues*

- Median of Two Sorted Arrays — Hard · \`heaps.MedianOfTwoSortedArrays\`
- Merge k Sorted Lists — Hard · \`heaps.MergeKSortedLists\`

### Kadane's algorithm

*Topics: Arrays*

- Maximum Subarray — Medium · \`arrays.MaxSubarray\`
- Maximum Circular Subarray — Medium · \`arrays.MaxCircularSubarray\`

### Lower bound

*Topics: Binary Search*

- Find First and Last Position of Element in Sorted Array — Medium · \`binarysearch.FindFirstAndLastPosition\`
- Search Insert Position — Easy · \`binarysearch.SearchInsertPosition\`

### Matrix

*Topics: Binary Search*

- Search a 2D Matrix — Medium · \`binarysearch.Search2DMatrix\`
- Search a 2D Matrix II — Medium · \`binarysearch.Search2DMatrixII\`

### Max-heap

*Topics: Heaps & Priority Queues*

- Task Scheduler — Medium · \`heaps.TaskScheduler\`
- Reorganize String — Medium · \`heaps.ReorganizeString\`

### Mirror recursion

*Topics: Trees & BST*

- Invert Binary Tree — Easy · \`trees.InvertBinaryTree\`
- Symmetric Tree — Easy · \`trees.SymmetricTree\`

### Modular arithmetic

*Topics: Queues & Deques, Strings*

- Design Circular Queue — Medium · \`queues.ImplementCircularQueue\`
- Excel Sheet Column Title — Easy · \`strings.ExcelSheetColumnTitle\`

### Order statistics

*Topics: Heaps & Priority Queues*

- Find Median from Data Stream — Hard · \`heaps.FindMedianFromDataStream\`
- Median of Two Sorted Arrays — Hard · \`heaps.MedianOfTwoSortedArrays\`

### Parsing

*Topics: Strings*

- String to Integer (atoi) — Medium · \`strings.StringToInteger\`
- Valid Number — Medium · \`strings.ValidNumber\`

### Partitioning

*Topics: Sorting*

- Quick Sort — Medium · \`sorting.QuickSort\`
- Sort Array By Parity — Easy · \`sorting.SortArrayByParity\`

### Pruning

*Topics: Backtracking*

- Generate Parentheses — Medium · \`backtracking.GenerateParentheses\`
- Palindrome Partitioning — Medium · \`backtracking.PalindromePartitioning\`

### Queue

*Topics: Queues & Deques, Trees & BST*

- Binary Tree Level Order Traversal — Medium · \`trees.BinaryTreeLevelOrderTraversal\`
- Implement Stack using Queues — Medium · \`queues.ImplementStackUsingQueues\`

### Recursion

*Topics: Linked List, Trees & BST*

- Flatten a Multilevel Linked List — Medium · \`linkedlist.FlattenLinkedList\`
- Sum of Left Leaves — Easy · \`trees.SumOfLeftLeaves\`

### Run-length encoding

*Topics: Strings*

- Count and Say — Medium · \`strings.CountAndSay\`
- String Compression — Easy · \`strings.StringCompression\`

### Running minimum

*Topics: Queues & Deques, Two Pointers*

- Design a Min Queue — Medium · \`queues.MinQueue\`
- Maximum Difference Between Two Elements of an Array — Medium · \`twopointers.MaximumDifferenceBetweenTwoElements\`

### Shifts

*Topics: Bit Manipulation*

- Divide Two Integers — Medium · \`bitmanipulation.DivideTwoIntegers\`
- Reverse Bits — Easy · \`bitmanipulation.ReverseBits\`

### Simulation

*Topics: Arrays, Linked List*

- Spiral Matrix — Medium · \`arrays.SpiralMatrix\`
- Josephus Problem — Medium · \`linkedlist.JosephusProblem\`

### Sorted array

*Topics: Two Pointers*

- Squares of a Sorted Array — Easy · \`twopointers.SquaresOfSortedArray\`
- Two Sum II - Input Array Is Sorted — Easy · \`twopointers.TwoSumII\`

### Structural comparison

*Topics: Trees & BST*

- Same Tree — Easy · \`trees.SameTree\`
- Subtree of Another Tree — Easy · \`trees.SubtreeOfAnotherTree\`

### Subset-sum DP

*Topics: Dynamic Programming*

- Partition Equal Subset Sum — Medium · \`dynamicprogramming.PartitionEqualSubsetSum\`
- Target Sum — Medium · \`dynamicprogramming.TargetSum\`

### Sweep line

*Topics: Intervals*

- Merge Intervals — Medium · \`intervals.MergeIntervals\`
- Meeting Rooms II — Medium · \`intervals.MeetingRoomsII\`

### Tarjan

*Topics: Advanced Graphs*

- Bridges in a Graph — Hard · \`advancedgraphs.BridgesInGraph\`
- Tarjan's Strongly Connected Components — Hard · \`advancedgraphs.TarjanStronglyConnectedComponents\`

### Trial division

*Topics: Math & Number Theory*

- Is a Number Prime — Medium · \`math.DetectPrime\`
- Largest Prime Factor — Medium · \`math.LargestPrimeFactor\`

### Two stacks

*Topics: Design, Linked List*

- Add Two Numbers II — Medium · \`linkedlist.AddTwoNumbersII\`
- Design Text Editor — Hard · \`design.DesignTextEditor\`

### 0/1 knapsack

*Topics: Dynamic Programming*

- Partition Equal Subset Sum — Medium · \`dynamicprogramming.PartitionEqualSubsetSum\`

### 2D prefix sums

*Topics: Prefix & Suffix Sums*

- 2D Prefix Sum — Medium · \`prefixsum.TwoDimensionalPrefixSum\`

### Addition without the + operator

*Topics: Bit Manipulation*

- Sum of Two Integers — Medium · \`bitmanipulation.AddTwoIntegers\`

### Adjacency matrix

*Topics: Graphs*

- Number of Provinces — Medium · \`graphs.NumberOfProvinces\`

### Adjacent pair scan

*Topics: Arrays*

- Minimum Absolute Difference — Medium · \`arrays.MinimumAbsoluteDifference\`

### Aggregation

*Topics: Design*

- Design Underground System — Medium · \`design.DesignUndergroundSystem\`

### All-pairs shortest path

*Topics: Advanced Graphs*

- Floyd-Warshall All-Pairs Shortest Path — Medium · \`advancedgraphs.FloydWarshall\`

### Alternating direction

*Topics: Trees & BST*

- Zigzag Level Order Traversal — Medium · \`trees.ZigzagLevelOrderTraversal\`

### Arithmetic

*Topics: Arrays*

- Missing Number — Easy · \`arrays.MissingNumber\`

### Array

*Topics: Queues & Deques*

- Design Circular Queue — Medium · \`queues.ImplementCircularQueue\`

### Array with a cursor

*Topics: Design*

- Design Browser History — Medium · \`design.DesignBrowserHistory\`

### Atomics

*Topics: Concurrency*

- Thread-Safe Counter — Easy · \`concurrency.AtomicCounter\`

### Augmented node state

*Topics: Trie*

- Trie with Prefix Counting — Medium · \`trie.PrefixCount\`

### Auxiliary minimum tracking

*Topics: Stacks*

- Min Stack — Medium · \`stacks.MinStack\`

### Backtracking with wildcards

*Topics: Trie*

- Design Add and Search Words — Medium · \`trie.DesignAddAndSearchWords\`

### Balance counting

*Topics: Prefix & Suffix Sums*

- Contiguous Array — Medium · \`prefixsum.ContiguousArray\`

### Bit manipulation

*Topics: Math & Number Theory*

- Add Binary — Easy · \`math.AddBinary\`

### Bit partitioning

*Topics: Bit Manipulation*

- Single Number III — Medium · \`bitmanipulation.SingleNumberIII\`

### Block reversal

*Topics: Linked List*

- Reverse Nodes in k-Group — Hard · \`linkedlist.ReverseNodesInKGroup\`

### Blocking queue

*Topics: Concurrency*

- Producer–Consumer Problem — Medium · \`concurrency.ProducerConsumer\`

### Borrow propagation

*Topics: Bit Manipulation*

- Subtract Two Integers without Minus — Medium · \`bitmanipulation.SubtractWithoutMinus\`

### Boundary shrinking

*Topics: Arrays*

- Spiral Matrix — Medium · \`arrays.SpiralMatrix\`

### Bracket matching

*Topics: Stacks*

- Valid Parentheses — Easy · \`stacks.ValidParentheses\`

### Bucket sort

*Topics: Arrays*

- Maximum Gap — Hard · \`arrays.MaxGap\`

### Bucketing

*Topics: Design*

- Design Hit Counter — Medium · \`design.DesignHitCounter\`

### Canonical key

*Topics: Hashing*

- Group Anagrams — Medium · \`hashing.GroupAnagrams\`

### Case rules

*Topics: Trie*

- Camelcase Matching — Medium · \`trie.CamelCaseMatching\`

### Circular array

*Topics: Stacks*

- Next Greater Element II — Medium · \`stacks.NextGreaterElementII\`

### Circular DP

*Topics: Dynamic Programming*

- House Robber II — Medium · \`dynamicprogramming.HouseRobberII\`

### Circular list

*Topics: Linked List*

- Rotate List — Medium · \`linkedlist.RotateList\`

### Complement counting

*Topics: Prefix & Suffix Sums*

- Pairs With a Target Sum — Medium · \`prefixsum.PairsWithTargetSum\`

### Complement trick

*Topics: Arrays*

- Maximum Circular Subarray — Medium · \`arrays.MaxCircularSubarray\`

### Counting

*Topics: Sliding Window*

- Minimum Number of Flips to Make the Binary String Alternating — Medium · \`slidingwindow.MinimumNumberOfFlips\`

### Counting factors

*Topics: Math & Number Theory*

- Factorial Trailing Zeroes — Easy · \`math.FactorialTrailingZeroes\`

### Custom comparator

*Topics: Greedy*

- Largest Number — Medium · \`greedy.LargestNumber\`

### Custom ordering

*Topics: Hashing*

- Sort by Frequency of Characters — Medium · \`hashing.FrequencySort\`

### Cut property

*Topics: Advanced Graphs*

- Prim's Minimum Spanning Tree — Medium · \`advancedgraphs.PrimMinimumSpanningTree\`

### Cut vertices

*Topics: Advanced Graphs*

- Articulation Points in a Graph — Hard · \`advancedgraphs.ArticulationPoints\`

### Cyclic shift

*Topics: Arrays*

- Rotate Array — Medium · \`arrays.RotateArray\`

### Deep copy with cycles

*Topics: Linked List*

- Copy List with Random Pointer — Medium · \`linkedlist.CopyListWithRandomPointer\`

### Deferred evaluation

*Topics: Stacks*

- Basic Calculator II — Medium · \`stacks.BasicCalculatorII\`

### Degree conditions

*Topics: Advanced Graphs*

- Eulerian Path — Hard · \`advancedgraphs.EulerianPath\`

### Degree peeling

*Topics: Binary Search*

- Minimum Height Trees — Medium · \`binarysearch.MinimumHeightTrees\`

### Digit-by-digit carry

*Topics: Linked List*

- Add Two Numbers — Medium · \`linkedlist.AddTwoNumbers\`

### Distance ranking

*Topics: Heaps & Priority Queues*

- K Closest Elements — Medium · \`heaps.KClosestElements\`

### Divide and conquer on a list

*Topics: Linked List*

- Reorder List — Medium · \`linkedlist.ReorderList\`

### Divide and select

*Topics: Sorting*

- Selection Sort — Easy · \`sorting.SelectionSort\`

### Divisor pairs

*Topics: Math & Number Theory*

- Perfect Number — Easy · \`math.PerfectNumber\`

### Double-checked locking

*Topics: Concurrency*

- Singleton with Double-Checked Locking — Medium · \`concurrency.SingletonDoubleCheckedLocking\`

### Doubly linked list

*Topics: Design*

- LRU Cache — Medium · \`design.LRUCache\`

### DSATUR

*Topics: Advanced Graphs*

- Graph Coloring — Hard · \`advancedgraphs.GraphColoring\`

### Duplicate skipping

*Topics: Two Pointers*

- 3Sum — Medium · \`twopointers.ThreeSum\`

### Duplicates

*Topics: Binary Search*

- Search in Rotated Sorted Array II — Medium · \`binarysearch.SearchInRotatedSortedArrayII\`

### Dynamic Programming

*Topics: Strings*

- Longest Palindromic Subsequence — Medium · \`strings.LongestPalindromicSubsequence\`

### Earliest finishing time

*Topics: Intervals*

- Non-overlapping Intervals — Medium · \`intervals.NonOverlappingIntervals\`

### Euclidean algorithm

*Topics: Math & Number Theory*

- GCD and LCM — Easy · \`math.GcdAndLcm\`

### Expand around centre

*Topics: Strings*

- Longest Palindromic Substring — Medium · \`strings.LongestPalindromicSubstring\`

### Expand around the centre

*Topics: Dynamic Programming*

- Palindromic Substrings — Medium · \`dynamicprogramming.PalindromicSubstrings\`

### Explicit stack

*Topics: Trees & BST*

- Binary Tree Inorder Traversal — Easy · \`trees.BinaryTreeInorderTraversal\`

### Extended to two candidates

*Topics: Arrays*

- Majority Element II — Medium · \`arrays.MajorityElementII\`

### Fast and slow

*Topics: Linked List*

- Middle of the Linked List — Easy · \`linkedlist.MiddleOfTheLinkedList\`

### Fast exponentiation

*Topics: Math & Number Theory*

- Pow(x, n) — Medium · \`math.PowOfANumber\`

### Finite state machine

*Topics: Strings*

- Valid Number — Medium · \`strings.ValidNumber\`

### Fisher-Yates

*Topics: Arrays*

- Shuffle Array — Medium · \`arrays.ShuffleArray\`

### Fleet time from the back

*Topics: Intervals*

- Car Fleet — Medium · \`intervals.CarFleet\`

### Flood fill

*Topics: Backtracking*

- Flood Fill — Easy · \`backtracking.FloodFill\`

### Frequency buckets

*Topics: Design*

- LFU Cache — Hard · \`design.LFUCache\`

### Game DP

*Topics: Dynamic Programming*

- Stone Game II — Medium · \`dynamicprogramming.StoneGameII\`

### Graph theory

*Topics: Graphs*

- Graph Valid Tree — Medium · \`graphs.GraphValidTree\`

### Greedy + DP

*Topics: Dynamic Programming*

- Jump Game II — Medium · \`dynamicprogramming.MinimumJumpSteps\`

### Greedy heap (the wrong answer)

*Topics: Heaps & Priority Queues*

- Last Stone Weight II — Medium · \`heaps.LastStoneWeightII\`

### Greedy post-order

*Topics: Trees & BST*

- Binary Tree Cameras — Medium · \`trees.BinaryTreeCameras\`

### Greedy sorting

*Topics: Greedy*

- Maximum Profit Scheduling Jobs — Medium · \`greedy.SchedulingMaximumProfit\`

### Grid search

*Topics: Trie*

- Word Search II — Hard · \`trie.WordSearchII\`

### Growing sorted prefix

*Topics: Sorting*

- Insertion Sort — Easy · \`sorting.InsertionSort\`

### Half reversal

*Topics: Math & Number Theory*

- Palindrome Number — Easy · \`math.PalindromeNumber\`

### HashSet lookups

*Topics: Dynamic Programming*

- Word Break — Medium · \`dynamicprogramming.WordBreak\`

### In-order iteration

*Topics: Trees & BST*

- Kth Smallest Element in a BST — Medium · \`trees.KthSmallestElementInBST\`

### In-place accumulation

*Topics: Prefix & Suffix Sums*

- Running Sum of 1d Array — Easy · \`prefixsum.RunningSum\`

### In-place sorting

*Topics: Sorting*

- Heap Sort — Medium · \`sorting.HeapSort\`

### In-place swap

*Topics: Strings*

- Reverse String — Easy · \`strings.ReverseString\`

### In-place transformation

*Topics: Arrays*

- Rotate Image — Medium · \`arrays.RotateImage\`

### Inclusion-exclusion

*Topics: Prefix & Suffix Sums*

- 2D Prefix Sum — Medium · \`prefixsum.TwoDimensionalPrefixSum\`

### Index maps

*Topics: Trees & BST*

- Construct Binary Tree from Preorder and Inorder Traversal — Medium · \`trees.BuildTreeFromPreorderAndInorder\`

### Interleaving

*Topics: Linked List*

- Copy List with Random Pointer — Medium · \`linkedlist.CopyListWithRandomPointer\`

### Interval scheduling

*Topics: Heaps & Priority Queues*

- Employee Free Day — Medium · \`heaps.EmployeeFreeDay\`

### Iterative recurrence

*Topics: Dynamic Programming*

- Fibonacci Number — Easy · \`dynamicprogramming.FibonacciNumber\`

### Iterative reversal

*Topics: Linked List*

- Reverse Linked List — Easy · \`linkedlist.ReverseLinkedList\`

### Join before reading

*Topics: Concurrency*

- Concurrent Sum using Threads — Medium · \`concurrency.ConcurrentSumWithThreads\`

### Jump game

*Topics: Dynamic Programming*

- Jump Game II — Medium · \`dynamicprogramming.MinimumJumpSteps\`

### Kahn's algorithm

*Topics: Graphs*

- Topological Sort — Medium · \`graphs.TopologicalSort\`

### Keep the k largest

*Topics: Greedy*

- Partition Array Into Maximum Subarrays — Medium · \`greedy.PartitionArrayToMaximumSum\`

### Kernighan's algorithm

*Topics: Bit Manipulation*

- Number of 1 Bits — Easy · \`bitmanipulation.CountSetBits\`

### Kosaraju

*Topics: Advanced Graphs*

- Kosaraju's Strongly Connected Components — Hard · \`advancedgraphs.KosarajuStronglyConnectedComponents\`

### Largest denomination first

*Topics: Greedy*

- Coin Change with Greedy — Medium · \`greedy.GreedyCoinChange\`

### Left-to-right scan

*Topics: Strings*

- Roman to Integer — Easy · \`strings.RomanToInteger\`

### Level linking

*Topics: Trees & BST*

- Populating Next Right Pointers in Each Node — Medium · \`trees.PopulateNextRightPointers\`

### Level-order encoding

*Topics: Trees & BST*

- Serialize and Deserialize Binary Tree — Medium · \`trees.SerializeAndDeserializeBinaryTree\`

### LIFO over FIFO

*Topics: Queues & Deques*

- Implement Stack using Queues — Medium · \`queues.ImplementStackUsingQueues\`

### Linear scan

*Topics: Arrays*

- Find Minimum and Maximum Element — Easy · \`arrays.FindMinimumAndMaximumElement\`

### Lock

*Topics: Concurrency*

- Bounded Blocking Queue — Medium · \`concurrency.BoundedBlockingQueue\`

### Lock-free

*Topics: Concurrency*

- Thread-Safe Counter — Easy · \`concurrency.AtomicCounter\`

### Long division

*Topics: Bit Manipulation*

- Divide Two Integers — Medium · \`bitmanipulation.DivideTwoIntegers\`

### Lookup table

*Topics: Strings*

- Integer to Roman — Medium · \`strings.IntegerToRoman\`

### Majority guarantee

*Topics: Arrays*

- Majority Element — Easy · \`arrays.MajorityElement\`

### Marker rows and columns

*Topics: Arrays*

- Set Matrix Zeroes — Medium · \`arrays.SetMatrixZeroes\`

### Matrix transposition

*Topics: Arrays*

- Rotate Image — Medium · \`arrays.RotateImage\`

### Max-heap simulation

*Topics: Greedy*

- Minimum Number of Refueling Stops — Medium · \`greedy.MinimumNumberOfRefuelingStops\`

### Merge then complement

*Topics: Intervals*

- Employee Free Time — Medium · \`intervals.EmployeeFreeTime\`

### Merging

*Topics: Sorting*

- Merge Sort — Medium · \`sorting.MergeSort\`

### Min-heap

*Topics: Graphs*

- Topological Sort — Medium · \`graphs.TopologicalSort\`

### Min-heap of end times

*Topics: Intervals*

- Meeting Rooms II — Medium · \`intervals.MeetingRoomsII\`

### Minimum spanning tree

*Topics: Advanced Graphs*

- Minimum Spanning Tree — Medium · \`advancedgraphs.MinimumSpanningTree\`

### Modulo indexing

*Topics: Arrays*

- Rotate Array — Medium · \`arrays.RotateArray\`

### Monotone predicate

*Topics: Binary Search*

- First Bad Version — Easy · \`binarysearch.FirstBadVersion\`

### Monotonic deque

*Topics: Queues & Deques*

- Sliding Window Maximum — Hard · \`queues.SlidingWindowMaximum\`

### Negative weights

*Topics: Advanced Graphs*

- Bellman-Ford Shortest Path — Medium · \`advancedgraphs.BellmanFord\`

### Nested parsing

*Topics: Stacks*

- Decode String — Medium · \`stacks.DecodeString\`

### No division

*Topics: Prefix & Suffix Sums*

- Product of Array Except Self — Medium · \`prefixsum.ProductExceptSelf\`

### Non-comparison sort

*Topics: Sorting*

- Counting Sort — Medium · \`sorting.CountingSort\`

### NP-hard

*Topics: Advanced Graphs*

- Graph Coloring — Hard · \`advancedgraphs.GraphColoring\`

### O(1) range queries

*Topics: Prefix & Suffix Sums*

- Range Sum Query — Immutable — Easy · \`prefixsum.RangeSumQuery\`

### One deletion

*Topics: Strings*

- Valid Palindrome II — Easy · \`strings.ValidPalindromeII\`

### One pass

*Topics: Two Pointers*

- Maximum Difference Between Two Elements of an Array — Medium · \`twopointers.MaximumDifferenceBetweenTwoElements\`

### One-pass

*Topics: Arrays*

- Two Sum — Easy · \`arrays.TwoSum\`

### One-pass minimum tracking

*Topics: Arrays*

- Best Time to Buy and Sell Stock — Easy · \`arrays.BestTimeToBuyAndSellStock\`

### Operator precedence

*Topics: Stacks*

- Basic Calculator II — Medium · \`stacks.BasicCalculatorII\`

### Ordered merge

*Topics: Concurrency*

- Parallel Pipeline Merge — Hard · \`concurrency.ParallelPipelineMerge\`

### Overflow check

*Topics: Math & Number Theory*

- Reverse Integer — Medium · \`math.ReverseInteger\`

### Overflow guards

*Topics: Strings*

- String to Integer (atoi) — Medium · \`strings.StringToInteger\`

### Overlap detection

*Topics: Intervals*

- Meeting Rooms — Easy · \`intervals.MeetingRooms\`

### Parsing a nested structure

*Topics: Linked List*

- Flatten a Multilevel Linked List — Medium · \`linkedlist.FlattenLinkedList\`

### Patience sorting

*Topics: Dynamic Programming*

- Longest Increasing Subsequence — Medium · \`dynamicprogramming.LongestIncreasingSubsequence\`

### Per-index history

*Topics: Design*

- Snapshot Array — Medium · \`design.SnapshotArray\`

### Pigeonhole bound

*Topics: Arrays*

- Maximum Gap — Hard · \`arrays.MaxGap\`

### Pipeline

*Topics: Concurrency*

- Parallel Pipeline Merge — Hard · \`concurrency.ParallelPipelineMerge\`

### Pointer switching

*Topics: Linked List*

- Intersection of Two Linked Lists — Easy · \`linkedlist.IntersectionOfTwoLinkedLists\`

### Poison pill

*Topics: Concurrency*

- Producer–Consumer Problem — Medium · \`concurrency.ProducerConsumer\`

### Post-order height check

*Topics: Trees & BST*

- Balanced Binary Tree — Easy · \`trees.BalancedBinaryTree\`

### Post-order with global state

*Topics: Trees & BST*

- Diameter of Binary Tree — Easy · \`trees.DiameterOfBinaryTree\`

### Postfix evaluation

*Topics: Stacks*

- Evaluate Reverse Polish Notation — Medium · \`stacks.EvaluateReversePolishNotation\`

### Precedence graph

*Topics: Graphs*

- Alien Dictionary — Medium · \`graphs.AlienDictionary\`

### Prefix and suffix products

*Topics: Prefix & Suffix Sums*

- Product of Array Except Self — Medium · \`prefixsum.ProductExceptSelf\`

### Prefix sum with a hash map

*Topics: Prefix & Suffix Sums*

- Contiguous Array — Medium · \`prefixsum.ContiguousArray\`

### Prefix sums with a hash map

*Topics: Prefix & Suffix Sums*

- Subarray Sum Equals K — Medium · \`prefixsum.SubarraySumEqualsK\`

### Prefix tree

*Topics: Trie*

- Implement Trie — Medium · \`trie.ImplementTrie\`

### Prefix walk

*Topics: Trie*

- Longest Prefix of a Phone Number — Medium · \`trie.LongestPrefixOfAPhoneNumber\`

### Prefix-sum reset

*Topics: Greedy*

- Gas Station — Medium · \`greedy.GasStation\`

### Radix sort

*Topics: Sorting*

- Sort a Hand of Cards — Medium · \`sorting.SortHand\`

### Range bounds

*Topics: Trees & BST*

- Validate Binary Search Tree — Medium · \`trees.ValidateBinarySearchTree\`

### Rate limiting

*Topics: Design*

- Rate Limiter — Medium · \`design.RateLimiter\`

### Reach tracking

*Topics: Greedy*

- Jump Game — Medium · \`greedy.JumpGame\`

### Reachability

*Topics: Graphs*

- Keys and Rooms — Medium · \`graphs.KeysAndRooms\`

### Recurrence

*Topics: Linked List*

- Josephus Problem — Medium · \`linkedlist.JosephusProblem\`

### Recursion + memoization

*Topics: Dynamic Programming*

- Climbing Stairs — Easy · \`dynamicprogramming.ClimbingStairs\`

### Repeated swapping

*Topics: Sorting*

- Bubble Sort — Easy · \`sorting.BubbleSort\`

### Reverse a half list

*Topics: Linked List*

- Palindrome Linked List — Medium · \`linkedlist.PalindromeLinkedList\`

### Right-to-left scan

*Topics: Arrays*

- Plus One — Easy · \`arrays.PlusOne\`

### Ring buffer

*Topics: Queues & Deques*

- Design Circular Queue — Medium · \`queues.ImplementCircularQueue\`

### Rotation

*Topics: Queues & Deques*

- Implement Stack using Queues — Medium · \`queues.ImplementStackUsingQueues\`

### Round trip

*Topics: Trees & BST*

- Serialize and Deserialize Binary Tree — Medium · \`trees.SerializeAndDeserializeBinaryTree\`

### Running aggregates

*Topics: Design*

- Min Max Stack — Medium · \`design.MinMaxStack\`

### Running balance

*Topics: Prefix & Suffix Sums*

- Pivot Index — Easy · \`prefixsum.PivotIndex\`

### Running best

*Topics: Two Pointers*

- 3Sum Closest — Medium · \`twopointers.ThreeSumClosest\`

### Running difference

*Topics: Arrays*

- Best Time to Buy and Sell Stock II — Medium · \`arrays.BestTimeToBuyAndSellStockII\`

### Running maxima

*Topics: Stacks*

- Trapping Rain Water — Hard · \`stacks.TrappingRainWater\`

### Running value

*Topics: Strings*

- Excel Sheet Column Number — Easy · \`strings.ExcelSheetColumnNumber\`

### Safe publication

*Topics: Concurrency*

- Singleton with Double-Checked Locking — Medium · \`concurrency.SingletonDoubleCheckedLocking\`

### Segment by segment

*Topics: Strings*

- Compare Version Numbers — Medium · \`strings.CompareVersionNumbers\`

### Segment reversal

*Topics: Linked List*

- Reverse Linked List II — Medium · \`linkedlist.ReverseLinkedListII\`

### Sentinel

*Topics: Stacks*

- Largest Rectangle in Histogram — Hard · \`stacks.LargestRectangleInHistogram\`

### Separate chaining

*Topics: Design*

- Design HashMap — Easy · \`design.DesignHashMap\`

### Set intersection

*Topics: Hashing*

- Intersection of Two Arrays — Easy · \`hashing.IntersectionOfTwoArrays\`

### Set membership

*Topics: Hashing*

- Contains Duplicate — Easy · \`hashing.ContainsDuplicate\`

### Sieve of Eratosthenes

*Topics: Math & Number Theory*

- Count Primes — Medium · \`math.SieveOfEratosthenes\`

### Single pass

*Topics: Arrays*

- Find Minimum and Maximum Element — Easy · \`arrays.FindMinimumAndMaximumElement\`

### Sliding distance window

*Topics: Arrays*

- Contains Duplicate II — Medium · \`arrays.ContainsDuplicateII\`

### Sort and two pointers

*Topics: Greedy*

- Assign Cookies — Easy · \`greedy.AssignCookies\`

### Sort by value per unit

*Topics: Greedy*

- Maximum Units on a Truck — Easy · \`greedy.MaximumUnitsOnATruck\`

### Sorted map

*Topics: Design*

- Design Underground System — Medium · \`design.DesignUndergroundSystem\`

### Sorted sweep

*Topics: Intervals*

- Interval List Intersections — Medium · \`intervals.IntervalListIntersections\`

### Sorted sweep with room availability

*Topics: Intervals*

- Meeting Rooms III — Hard · \`intervals.MeetingRoomsIII\`

### Stable counting sort

*Topics: Sorting*

- Sort a Hand of Cards — Medium · \`sorting.SortHand\`

### Stack of frames

*Topics: Stacks*

- Decode String — Medium · \`stacks.DecodeString\`

### Stack of pending results

*Topics: Stacks*

- Basic Calculator — Hard · \`stacks.BasicCalculator\`

### Staircase search

*Topics: Binary Search*

- Search a 2D Matrix II — Medium · \`binarysearch.Search2DMatrixII\`

### State compression

*Topics: Dynamic Programming*

- Maximum Product Subarray — Medium · \`dynamicprogramming.MaximumProductSubarray\`

### State machine

*Topics: Design*

- Design Tic-Tac-Toe — Medium · \`design.DesignTicTacToe\`

### State-compression DP

*Topics: Dynamic Programming*

- Best Time to Buy and Sell Stock III — Hard · \`dynamicprogramming.BestTimeToBuySellStockIII\`

### String building

*Topics: Strings*

- Count and Say — Medium · \`strings.CountAndSay\`

### String comparison

*Topics: Graphs*

- Alien Dictionary — Medium · \`graphs.AlienDictionary\`

### String hashing

*Topics: Sliding Window*

- Longest Repeating Substring — Hard · \`slidingwindow.LongestRepeatingSubstring\`

### String manipulation

*Topics: Graphs*

- Word Ladder — Medium · \`graphs.WordLadder\`

### String scanning

*Topics: Two Pointers*

- Valid Palindrome — Easy · \`twopointers.ValidPalindrome\`

### String splitting

*Topics: Strings*

- Reverse Words in a String — Medium · \`strings.ReverseWordsInString\`

### Strings

*Topics: Sliding Window*

- Minimum Number of Flips to Make the Binary String Alternating — Medium · \`slidingwindow.MinimumNumberOfFlips\`

### Subset sum DP

*Topics: Heaps & Priority Queues*

- Last Stone Weight II — Medium · \`heaps.LastStoneWeightII\`

### Suffix maximum

*Topics: Stacks*

- Max of Min for Every Window — Hard · \`stacks.MaxOfMinForEveryWindow\`

### Symmetric two-stack deque

*Topics: Queues & Deques*

- Implement Deque using Two Stacks — Medium · \`queues.ImplementDequeUsingTwoStacks\`

### Take-or-skip

*Topics: Dynamic Programming*

- House Robber — Medium · \`dynamicprogramming.HouseRobber\`

### Three pointers

*Topics: Math & Number Theory*

- Ugly Number — Medium · \`math.UglyNumber\`

### Three-way partitioning

*Topics: Sorting*

- Dutch National Flag — Medium · \`sorting.DutchNationalFlag\`

### Three-way sweep

*Topics: Intervals*

- Insert Interval — Medium · \`intervals.InsertInterval\`

### Transpose graph

*Topics: Advanced Graphs*

- Kosaraju's Strongly Connected Components — Hard · \`advancedgraphs.KosarajuStronglyConnectedComponents\`

### Tree

*Topics: Binary Search*

- Minimum Height Trees — Medium · \`binarysearch.MinimumHeightTrees\`

### Tree DP

*Topics: Trees & BST*

- Binary Tree Cameras — Medium · \`trees.BinaryTreeCameras\`

### Trie + backtracking

*Topics: Trie*

- Word Search II — Hard · \`trie.WordSearchII\`

### Twin bounded heaps

*Topics: Heaps & Priority Queues*

- Find Kth Largest and Kth Smallest — Medium · \`heaps.FindKthLargestAndSmallest\`

### Two chains

*Topics: Linked List*

- Odd Even Linked List — Medium · \`linkedlist.OddEvenLinkedList\`

### Two DFS passes

*Topics: Advanced Graphs*

- Kosaraju's Strongly Connected Components — Hard · \`advancedgraphs.KosarajuStronglyConnectedComponents\`

### Two heaps

*Topics: Heaps & Priority Queues*

- Find Median from Data Stream — Hard · \`heaps.FindMedianFromDataStream\`

### Two-colouring

*Topics: Graphs*

- Is Graph Bipartite — Medium · \`graphs.BipartiteCheck\`

### Two-pass constraint propagation

*Topics: Greedy*

- Candy — Hard · \`greedy.Candy\`

### Two-phase scan

*Topics: Arrays*

- Set Matrix Zeroes — Medium · \`arrays.SetMatrixZeroes\`

### Two-stack FIFO

*Topics: Queues & Deques*

- Implement Queue using Stacks — Medium · \`queues.ImplementQueueUsingStacks\`

### Two's complement

*Topics: Bit Manipulation*

- Subtract Two Integers without Minus — Medium · \`bitmanipulation.SubtractWithoutMinus\`

### Undo journal

*Topics: Design*

- Design Text Editor — Hard · \`design.DesignTextEditor\`

### Uniform random permutation

*Topics: Arrays*

- Shuffle Array — Medium · \`arrays.ShuffleArray\`

### Upper bound

*Topics: Binary Search*

- Find First and Last Position of Element in Sorted Array — Medium · \`binarysearch.FindFirstAndLastPosition\`

### Used array

*Topics: Backtracking*

- Permutations — Medium · \`backtracking.Permutations\`

### Versioning

*Topics: Design*

- Snapshot Array — Medium · \`design.SnapshotArray\`

### Vertical scan

*Topics: Strings*

- Longest Common Prefix — Easy · \`strings.LongestCommonPrefix\`

### Visited set

*Topics: Greedy*

- Jump Game III — Medium · \`greedy.JumpGameIII\`

### Weighted interval scheduling

*Topics: Greedy*

- Maximum Profit Scheduling Jobs — Medium · \`greedy.SchedulingMaximumProfit\`

### Wildcard bucketing

*Topics: Graphs*

- Word Ladder — Medium · \`graphs.WordLadder\`

### Win detection

*Topics: Design*

- Design Tic-Tac-Toe — Medium · \`design.DesignTicTacToe\`

### Work splitting

*Topics: Concurrency*

- Concurrent Sum using Threads — Medium · \`concurrency.ConcurrentSumWithThreads\`

### XOR trick

*Topics: Arrays*

- Missing Number — Easy · \`arrays.MissingNumber\`

`,n={id:e,body:t};export{t as body,n as default,e as id};