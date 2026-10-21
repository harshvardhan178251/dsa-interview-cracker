---
title: The 8-week interview study plan
order: 1
summary: A day-by-day plan that sequences 24 topics so each builds on the last, with weekly checkpoints, mock-interview drills and a progress tracker.
---

# The 8-week interview study plan

**Assumption:** you can spare 2–3 hours a day, six days a week. That is 12–18 hours a week,
which is enough to cover the whole set at a reasonable depth. If you have more time, add a
second problem per day; if less, drop to ★★★★★ problems only.

## How the weeks are sequenced

Each week ends with a **checkpoint** — a mock interview you run against yourself. The
checkpoint is not optional. Solving problems you chose is comfortable; solving problems you
were handed, cold, under time pressure, is what the real interview is.

| Week | Topics | Why here |
|---|---|---|
| 1 | Arrays, Strings, Hashing | The base data structures everything else uses |
| 2 | Two Pointers, Sliding Window, Prefix Sums | Three patterns that solve a huge slice of array problems |
| 3 | Linked List, Stacks, Queues | Pointer manipulation and LIFO/FIFO thinking |
| 4 | Binary Search, Sorting, Heaps | Order, search, and selection |
| 5 | Trees, Trie | Recursion on a structured shape |
| 6 | Graphs, Advanced Graphs | Search over a relation, and the algorithms built on it |
| 7 | Dynamic Programming, Backtracking | The two hard ones — give them a full week each |
| 8 | Greedy, Intervals, Bit Manipulation, Math, Design, Concurrency | The long tail, plus full mock interviews |

---

## Week 1 — Arrays, Strings, Hashing

**Goal:** be fluent with a one-pass scan of an array, and never reach for a nested loop when
a hash map will do.

| Day | Focus |
|---|---|
| Mon | `arrays` — the ★★★★★ problems: Two Sum, Best Time to Buy and Sell Stock, Max Subarray |
| Tue | `arrays` — Rotate Array, Missing Number, Product Except Self, Majority Element |
| Wed | `strings` — Valid Palindrome, Valid Anagram, String to Integer, Reverse Words in a String |
| Thu | `strings` — Longest Substring Without Repeating Characters, Longest Palindromic Substring |
| Fri | `hashing` — Group Anagrams, Subarray Sum Equals K, Longest Consecutive Sequence |
| Sat | `arrays` + `strings` — the Medium problems you skipped |

**Checkpoint (Sat evening, 60 min):** solve two unseen array problems from the catalogue in
25 minutes each, in a single sitting, without looking anything up. If you needed more than
25 minutes, re-read the corresponding topic note before Week 2.

---

## Week 2 — Two Pointers, Sliding Window, Prefix Sums

**Goal:** recognise these three patterns from the *shape* of the problem, not from the title.

| Day | Focus |
|---|---|
| Mon | `twopointers` — Two Sum II, 3Sum, Container With Most Water |
| Tue | `twopointers` — Move Zeroes, Remove Duplicates, Squares of a Sorted Array |
| Wed | `slidingwindow` — Longest Substring Without Repeating Characters, Fruit Into Baskets |
| Thu | `slidingwindow` — Minimum Window Substring, Permutation in String, Find All Anagrams in a String |
| Fri | `prefixsum` — Subarray Sum Equals K, Range Sum Query, Product Except Self |
| Sat | `prefixsum` + `twopointers` — the remaining Mediums |

**Checkpoint (Sat evening, 75 min):** one sliding-window problem and one two-pointer problem,
cold, 35 minutes each. Then write down the *shape* that told you which pattern applied.

---

## Week 3 — Linked List, Stacks, Queues

**Goal:** never lose your place in a linked list; know when a stack beats a queue.

| Day | Focus |
|---|---|
| Mon | `linkedlist` — Reverse Linked List, Detect Cycle, Merge Two Sorted Lists |
| Tue | `linkedlist` — Add Two Numbers, Remove Nth Node From End, Intersection of Two Linked Lists |
| Wed | `linkedlist` — Reverse Nodes in k-Group, Reorder List, Copy List with Random Pointer |
| Thu | `stacks` — Valid Parentheses, Min Stack, Next Greater Element, Daily Temperatures |
| Fri | `stacks` — Largest Rectangle in Histogram, Trapping Rain Water, Decode String |
| Sat | `queues` — Implement Queue using Stacks, Implement Circular Queue, Sliding Window Maximum |

**Checkpoint (Sat evening, 75 min):** reverse a linked list in place *and* explain why the
pointer juggling works — drawing it on paper first. Then one stack problem cold.

---

## Week 4 — Binary Search, Sorting, Heaps

**Goal:** write binary search without hesitation, including the "search on the answer"
variant; know when a heap beats sorting.

| Day | Focus |
|---|---|
| Mon | `binarysearch` — Binary Search, Search Insert Position, Find First and Last Position |
| Tue | `binarysearch` — Search in Rotated Sorted Array, Peak Element, Square Root |
| Wed | `binarysearch` — the search-on-answer problems: Koko Eating Bananas, Aggressive Cows, Capacity to Ship Packages, Painters |
| Thu | `sorting` — Merge Sort, Quick Sort, Heap Sort, Counting Sort, Dutch National Flag |
| Fri | `heaps` — Kth Largest Element, Top K Frequent Elements, Merge K Sorted Lists |
| Sat | `heaps` — Find Median from Data Stream, K Closest Elements, Task Scheduler |

**Checkpoint (Sat evening, 90 min):** three binary-search problems in a row (one on index,
one on a rotated array, one on an answer), 25 minutes each. Then implement a heap from
scratch on paper — sift-up and sift-down.

---

## Week 5 — Trees, Trie

**Goal:** think recursively by default on trees; be able to pick the right traversal on
sight.

| Day | Focus |
|---|---|
| Mon | `trees` — the four traversals, Maximum Depth, Minimum Depth |
| Tue | `trees` — Diameter, Same Tree, Invert, Symmetric, Balanced Binary Tree |
| Wed | `trees` — Lowest Common Ancestor, Validate BST, Insert/Search/Delete in BST, Kth Smallest in BST |
| Thu | `trees` — Path Sum, Binary Tree Paths, Path Sum III, Sum of Left Leaves |
| Fri | `trees` — Build Tree from Preorder and Inorder, Serialize and Deserialize, Zigzag Level Order |
| Sat | `trie` — Implement Trie, Design Add and Search Words, Word Search II |

**Checkpoint (Sat evening, 75 min):** given a random tree, write all four traversals
without running anything, then compute its diameter and height by hand.

---

## Week 6 — Graphs, Advanced Graphs

**Goal:** pick the right graph algorithm from the problem's *question*: reachability,
ordering, shortest path, or spanning tree.

| Day | Focus |
|---|---|
| Mon | `graphs` — Number of Islands, BFS vs DFS on a grid |
| Tue | `graphs` — Course Schedule, Topological Sort, Course Schedule II, Alien Dictionary |
| Wed | `graphs` — Word Ladder, Rotting Oranges, Network Delay Time, Cheapest Flights Within K Stops |
| Thu | `graphs` — Clone Graph, Reconstruct Itinerary, Bipartite Check, Pacman Paths |
| Fri | `advancedgraphs` — Dijkstra, Bellman-Ford, Floyd-Warshall |
| Sat | `advancedgraphs` — Kruskal, Prim, Tarjan SCC, Kosaraju SCC |

**Checkpoint (Sat evening, 90 min):** one BFS/DFS graph problem and one shortest-path
problem, cold, 40 minutes each. Be ready to say aloud which algorithm you chose and why.

---

## Week 7 — Dynamic Programming, Backtracking

**Goal:** this is the week people skip, and it is the week that decides the interview.
Give it real hours.

| Day | Focus |
|---|---|
| Mon | `dynamicprogramming` — Climbing Stairs, Fibonacci, House Robber, House Robber II |
| Tue | `dynamicprogramming` — Coin Change, Coin Change II, Partition Equal Subset Sum, Target Sum |
| Wed | `dynamicprogramming` — LIS, LCS, Longest Common Substring, Word Break |
| Thu | `dynamicprogramming` — Unique Paths, Minimum Path Sum, Edit Distance, Decode Ways |
| Fri | `backtracking` — Subsets, Combination Sum, Permutations, Generate Parentheses |
| Sat | `backtracking` — N-Queens, Sudoku Solver, Word Search, Palindrome Partitioning |

**DP is a skill, not a set of problems.** Before solving any DP problem, fill in this
template out loud:

1. **State** — what does `dp[i]` (or `dp[i][j]`) mean, in one sentence?
2. **Transition** — how do I compute it from smaller subproblems?
3. **Base case** — what is `dp[0]` / `dp[i][0]`?
4. **Answer** — which cell or entry do I return?
5. **Order** — do I fill the table forwards, backwards, or by length?

If you cannot answer 1 and 2, you do not understand the problem yet — no matter how many
DP solutions you have memorised.

**Checkpoint (Sat evening, 120 min, two sessions of 60):**
- Session 1: one DP problem cold, 45 minutes.
- Session 2: one backtracking problem cold, 45 minutes.

Write the state definition down before you write code.

---

## Week 8 — Greedy, Intervals, Bit Manipulation, Math, Design, Concurrency

**Goal:** polish the long tail, then run full mock interviews.

| Day | Focus |
|---|---|
| Mon | `greedy` — Jump Game, Jump Game II, Gas Station, Candy, Assign Cookies |
| Tue | `intervals` — Merge Intervals, Insert Interval, Meeting Rooms I/II, Non-overlapping Intervals |
| Wed | `bitmanipulation` — Single Number, Count Set Bits, Power of Two, Add Two Integers |
| Thu | `math` — Happy Number, Reverse Integer, Pow(x,n), Factorial Trailing Zeroes |
| Fri | `design` — LRUCache, LFUCache, Min Stack, Rate Limiter |
| Sat | `concurrency` — Producer-Consumer, Atomic Counter, Singleton |

---

## Mock interviews

From Week 5 onwards, run one mock every Saturday. **Rules:**

- 45 minutes, one problem, chosen at random from the catalogue.
- No notes, no search, no autocomplete. A timer running.
- **Narrate out loud the whole time.** Say your brute force, your approach, your complexity,
  and walk a dry run on the shared screen or on paper.
- When you are stuck for more than 10 minutes, say what you would do next — that is a real
  skill. Interviewers are grading your debugging, not your silence.
- Afterwards, spend 20 minutes reading the write-up. That is where the learning happens.

Track your score out of 5 per mock:

| Score | Meaning | Action |
|---|---|---|
| 5 | Solved, correct complexity, narrated cleanly | Move on |
| 4 | Solved, minor sloppiness | Move on, note the topic |
| 3 | Solved with a hint, or solved but could not explain | Redo it in 3 days |
| 2 | Wrong approach, or needed the answer | Re-study the topic note, then re-do |
| 1 | No idea where to start | Do 3 problems from that topic, then re-do |

Your score should climb. If it plateaus for two weeks, the problem is usually **breadth, not
depth** — you are over-practising topics you already know. Widen the set.

---

## Progress tracker

Tick these off. Copy the block into your own notes or a spreadsheet.

### Week 1
- [ ] Arrays — ★★★★★ problems
- [ ] Strings — ★★★★★ problems
- [ ] Hashing — ★★★★★ problems
- [ ] Checkpoint: 2 cold array problems in 50 min

### Week 2
- [ ] Two Pointers
- [ ] Sliding Window
- [ ] Prefix Sums
- [ ] Checkpoint: 1 sliding window + 1 two pointer

### Week 3
- [ ] Linked List
- [ ] Stacks
- [ ] Queues
- [ ] Checkpoint: reverse a list + 1 stack problem

### Week 4
- [ ] Binary Search (index, rotated, on-answer)
- [ ] Sorting
- [ ] Heaps
- [ ] Checkpoint: 3 binary searches in 75 min

### Week 5
- [ ] Trees — traversals, BST, LCA
- [ ] Trie
- [ ] Checkpoint: 4 traversals of a random tree

### Week 6
- [ ] Graphs — BFS, DFS, topological, shortest path
- [ ] Advanced Graphs — MST, SCC, Floyd-Warshall
- [ ] Checkpoint: 2 cold graph problems

### Week 7
- [ ] Dynamic Programming — 1D, 2D, knapsack, LIS/LCS
- [ ] Backtracking
- [ ] Checkpoint: 2 × 60-minute mocks

### Week 8
- [ ] Greedy
- [ ] Intervals
- [ ] Bit Manipulation
- [ ] Math
- [ ] Design
- [ ] Concurrency
- [ ] Checkpoint: 4 full mock interviews back to back

### Final
- [ ] 6 mock interviews scored, average ≥ 4
- [ ] Every ★★★★★ problem solved at least twice
- [ ] Able to state the complexity of every solution **before** writing it

---

## If you only have two weeks

Cut Week 3's Wednesday, Week 4's sorting day, Week 5's trie day, Week 6's advanced-graphs
day, and all of Week 8 except `design`.

Then do ★★★★★ problems only, two per day, and run a mock every third day instead of weekly.

## If you have a month and a half

Do the plan as written, then a second pass over **only** the problems you marked as
"could not derive". That second pass is worth more than a third pass over everything.
