var e=`guide:problem-index`,t=`
# Full problem index

> **This page is generated.** It is rebuilt from the problem catalogue by
> \`web/scripts/generate-guides.mjs\`.

**322 problems** across 24 topics. The heat column is the interview
frequency: ★★★★★ means the problem is asked constantly, ★ means it is rare.

Use the [pattern index](./03-pattern-index.md) to work by technique instead, and the
[company problem map](./02-company-problem-map.md) to work by target company.

### Arrays (20)

| Problem | Difficulty | LeetCode | Heat | Patterns | Companies |
|---|---|---|---|---|---|
| Best Time to Buy and Sell Stock | Easy | LC 121 | ★★★★☆ | Greedy, One-pass minimum tracking | Meta, Amazon, Adobe |
| Best Time to Buy and Sell Stock II | Medium | LC 122 | ★★★☆☆ | Greedy, Running difference | Amazon, Salesforce, Bloomberg |
| Contains Duplicate II | Medium | LC 219 | ★★★☆☆ | Hashing, Sliding distance window | Meta, JP Morgan, Uber |
| Find Minimum and Maximum Element | Easy | — | ★★☆☆☆ | Linear scan, Single pass | Meta, Apple |
| Majority Element | Easy | LC 169 | ★★★★☆ | Boyer-Moore voting, Majority guarantee | Meta, Google, LinkedIn |
| Majority Element II | Medium | LC 229 | ★★★☆☆ | Boyer-Moore voting, Extended to two candidates | Amazon, Microsoft, Apple |
| Maximum Circular Subarray | Medium | LC 134 | ★★☆☆☆ | Kadane's algorithm, Complement trick | Amazon, Airbnb, Tech Mahindra |
| Maximum Gap | Hard | LC 164 | ★★☆☆☆ | Bucket sort, Pigeonhole bound | Meta, Facebook, HCLTech |
| Maximum Subarray | Medium | LC 53 | ★★★★☆ | Dynamic programming, Kadane's algorithm | Google, Meta, Netflix |
| Maximum Width Ramp | Hard | LC 962 | ★★☆☆☆ | Monotonic stack, Two pointers | Amazon, LinkedIn, Infosys |
| Minimum Absolute Difference | Medium | LC 1200 | ★★☆☆☆ | Sorting, Adjacent pair scan | Google, Netflix, Wipro |
| Missing Number | Easy | LC 268 | ★★★☆☆ | Arithmetic, XOR trick | Amazon, Uber, Microsoft |
| Plus One | Easy | LC 66 | ★★★☆☆ | Carry propagation, Right-to-left scan | Amazon, LinkedIn, Uber |
| Remove Element | Easy | LC 27 | ★★☆☆☆ | Two pointers, In-place compaction | Meta, Microsoft, HCLTech |
| Rotate Array | Medium | LC 189 | ★★★☆☆ | Modulo indexing, Cyclic shift | Amazon, Salesforce, JP Morgan |
| Rotate Image | Medium | LC 48 | ★★★★☆ | Matrix transposition, In-place transformation | Amazon, Meta, Bloomberg |
| Set Matrix Zeroes | Medium | LC 73 | ★★★★☆ | Marker rows and columns, Two-phase scan | Google, Amazon, Salesforce |
| Shuffle Array | Medium | LC 384 | ★★★☆☆ | Fisher-Yates, Uniform random permutation | Meta, LinkedIn, Microsoft |
| Spiral Matrix | Medium | LC 54 | ★★★★☆ | Boundary shrinking, Simulation | Meta, Amazon, Uber |
| Two Sum | Easy | LC 1 | ★★★★★ | Hashing, One-pass | Meta, Amazon, Google |

### Strings (16)

| Problem | Difficulty | LeetCode | Heat | Patterns | Companies |
|---|---|---|---|---|---|
| Compare Version Numbers | Medium | LC 165 | ★★★☆☆ | Two Pointers, Segment by segment | Amazon, Salesforce, Facebook |
| Count and Say | Medium | LC 38 | ★★★☆☆ | Run-length encoding, String building | Amazon, Adobe, Bloomberg |
| Excel Sheet Column Number | Easy | LC 171 | ★★★☆☆ | Base-26 conversion, Running value | Google, Apple, Goldman Sachs |
| Excel Sheet Column Title | Easy | LC 168 | ★★★☆☆ | Base-26 conversion, Modular arithmetic | Google, Netflix, Salesforce |
| Integer to Roman | Medium | LC 12 | ★★★☆☆ | Greedy, Lookup table | Google, Adobe, Facebook |
| Longest Common Prefix | Easy | LC 14 | ★★★★☆ | Two Pointers, Vertical scan | Meta, Amazon, Apple |
| Longest Palindromic Subsequence | Medium | LC 516 | ★★★☆☆ | Dynamic Programming, Interval DP | Google, JP Morgan, Bloomberg |
| Longest Palindromic Substring | Medium | LC 5 | ★★★★☆ | Expand around centre, Two Pointers | Google, Amazon, Airbnb |
| Reverse String | Easy | LC 344 | ★★★☆☆ | Two Pointers, In-place swap | Meta, JP Morgan, Uber |
| Reverse Words in a String | Medium | LC 151 | ★★★☆☆ | String splitting, Two pointers | Amazon, Goldman Sachs, Facebook |
| Roman to Integer | Easy | LC 13 | ★★★☆☆ | Greedy, Left-to-right scan | Amazon, Salesforce, Adobe |
| String Compression | Easy | — | ★★☆☆☆ | Run-length encoding, Two Pointers | Google, Microsoft |
| String to Integer (atoi) | Medium | LC 8 | ★★★★☆ | Parsing, Overflow guards | Google, Meta, LinkedIn |
| Valid Anagram | Easy | LC 242 | ★★★★☆ | Frequency counting, Hash map | Meta, Amazon, Salesforce |
| Valid Number | Medium | — | ★★☆☆☆ | Parsing, Finite state machine | Amazon, Facebook |
| Valid Palindrome II | Easy | LC 680 | ★★★☆☆ | Two Pointers, One deletion | Google, Salesforce, Goldman Sachs |

### Linked List (20)

| Problem | Difficulty | LeetCode | Heat | Patterns | Companies |
|---|---|---|---|---|---|
| Add Two Numbers | Medium | LC 2 | ★★★★★ | Digit-by-digit carry, Dummy head | Amazon, Meta, Google |
| Add Two Numbers II | Medium | LC 445 | ★★★★☆ | Two stacks, Carry propagation | Amazon, Meta, Bloomberg |
| Copy List with Random Pointer | Medium | LC 138 | ★★★★☆ | Interleaving, Deep copy with cycles | Google, Meta, Adobe |
| Flatten a Multilevel Linked List | Medium | — | ★★★☆☆ | Recursion, Parsing a nested structure | Amazon, Facebook, Capgemini |
| Intersection of Two Linked Lists | Easy | LC 160 | ★★★★☆ | Two pointers, Pointer switching | Amazon, Google, Apple |
| Josephus Problem | Medium | — | ★★★☆☆ | Recurrence, Simulation | Google, Microsoft, Capgemini |
| Linked List Cycle | Easy | LC 141 | ★★★★★ | Two pointers, Floyd cycle detection | Amazon, Meta, Google |
| Linked List Cycle II | Medium | LC 142 | ★★★★☆ | Two pointers, Floyd cycle detection | Google, Meta, JP Morgan |
| Merge Two Sorted Lists | Easy | LC 21 | ★★★★★ | Two pointers, Dummy head | Google, Amazon, Meta |
| Middle of the Linked List | Easy | LC 876 | ★★★★☆ | Two pointers, Fast and slow | Amazon, Google, Apple |
| Odd Even Linked List | Medium | LC 328 | ★★★★☆ | Pointer rewiring, Two chains | Google, Meta, Bloomberg |
| Palindrome Linked List | Medium | LC 234 | ★★★★☆ | Two pointers, Reverse a half list | Meta, Amazon, Goldman Sachs |
| Remove Duplicates from Sorted List II | Medium | LC 83 | ★★★★☆ | Dummy head, Run detection | Amazon, Meta, Facebook |
| Remove Nth Node From End of List | Medium | LC 19 | ★★★★★ | Two pointers, Dummy head | Meta, Google, Amazon |
| Reorder List | Medium | LC 143 | ★★★★☆ | Two pointers, Divide and conquer on a list | Amazon, Google, Salesforce |
| Reverse Linked List | Easy | LC 206 | ★★★★★ | Pointer rewiring, Iterative reversal | Google, Meta, Amazon |
| Reverse Linked List II | Medium | LC 92 | ★★★★☆ | Pointer rewiring, Segment reversal | Amazon, Google, JP Morgan |
| Reverse Nodes in k-Group | Hard | LC 25 | ★★★★☆ | Pointer rewiring, Block reversal | Amazon, Google, Microsoft |
| Rotate List | Medium | LC 61 | ★★★★☆ | Pointer rewiring, Circular list | Amazon, Meta, Microsoft |
| Swap Nodes in Pairs | Medium | LC 24 | ★★★★☆ | Pointer rewiring, Dummy head | Amazon, Google, Apple |

### Stacks (13)

| Problem | Difficulty | LeetCode | Heat | Patterns | Companies |
|---|---|---|---|---|---|
| Basic Calculator | Hard | LC 224 | ★★★★☆ | Stack of pending results, Recursive descent | Google, Amazon, JP Morgan |
| Basic Calculator II | Medium | LC 227 | ★★★★☆ | Operator precedence, Deferred evaluation | Meta, Google, Microsoft |
| Daily Temperatures | Medium | LC 739 | ★★★★☆ | Monotonic stack | Google, Meta, Bloomberg |
| Decode String | Medium | LC 394 | ★★★★☆ | Stack of frames, Nested parsing | Meta, Amazon, Netflix |
| Evaluate Reverse Polish Notation | Medium | LC 150 | ★★★★☆ | Stack, Postfix evaluation | Google, Amazon, Salesforce |
| Largest Rectangle in Histogram | Hard | LC 84 | ★★★★☆ | Monotonic stack, Sentinel | Google, Amazon, Apple |
| Max of Min for Every Window | Hard | — | ★★★☆☆ | Monotonic stack, Suffix maximum | Amazon, Microsoft, Infosys |
| Min Stack | Medium | LC 155 | ★★★★★ | Stack, Auxiliary minimum tracking | Meta, Amazon, Google |
| Next Greater Element | Easy | LC 496 | ★★★★☆ | Monotonic stack | Meta, Google, Airbnb |
| Next Greater Element II | Medium | LC 503 | ★★★★☆ | Monotonic stack, Circular array | Google, Amazon, Apple |
| Stock Span | Medium | — | ★★★☆☆ | Monotonic stack | Meta, LinkedIn, Accenture |
| Trapping Rain Water | Hard | LC 42 | ★★★★★ | Two pointers, Running maxima | Meta, Google, Amazon |
| Valid Parentheses | Easy | LC 20 | ★★★★★ | Stack, Bracket matching | Google, Amazon, Meta |

### Queues & Deques (6)

| Problem | Difficulty | LeetCode | Heat | Patterns | Companies |
|---|---|---|---|---|---|
| Design a Min Queue | Medium | — | ★★★★☆ | Stack, Running minimum, Amortised O(1) | Meta, JP Morgan, Uber |
| Design Circular Queue | Medium | LC 622 | ★★★☆☆ | Ring buffer, Modular arithmetic, Array | Meta, LinkedIn, Salesforce |
| Implement Deque using Two Stacks | Medium | — | ★★★☆☆ | Stack, Symmetric two-stack deque, Amortised O(1) | Google, Goldman Sachs, Accenture |
| Implement Queue using Stacks | Medium | — | ★★★★☆ | Stack, Two-stack FIFO, Amortised O(1) | Google, Salesforce, Bloomberg |
| Implement Stack using Queues | Medium | — | ★★★☆☆ | Queue, Rotation, LIFO over FIFO | Amazon, Microsoft, Accenture |
| Sliding Window Maximum | Hard | LC 239 | ★★★★★ | Monotonic deque, Sliding window, Two pointers | Meta, Google, Amazon |

### Heaps & Priority Queues (12)

| Problem | Difficulty | LeetCode | Heat | Patterns | Companies |
|---|---|---|---|---|---|
| Employee Free Day | Medium | LC 1497 | ★★★☆☆ | Greedy, Interval scheduling, Bounded heap | Google, Facebook, Bloomberg |
| Find Kth Largest and Kth Smallest | Medium | — | ★★★☆☆ | Heap, Top-K, Twin bounded heaps | Google, LinkedIn, Infosys |
| Find Median from Data Stream | Hard | LC 295 | ★★★★★ | Heap, Two heaps, Order statistics | Meta, Amazon, Google |
| K Closest Elements | Medium | LC 658 | ★★★★☆ | Heap, Top-K, Distance ranking, Two pointers | Meta, Google, Uber |
| Kth Largest Element in an Array | Medium | LC 215 | ★★★★★ | Heap, Top-K, Bounded heap | Meta, Google, Amazon |
| Kth Smallest Element in a Sorted Matrix | Medium | LC 378 | ★★★★☆ | Heap, Top-K, Bounded heap | Amazon, Google, Bloomberg |
| Last Stone Weight II | Medium | LC 1049 | ★★★★☆ | Partition, Subset sum DP, Greedy heap (the wrong answer) | Amazon, Meta, Salesforce |
| Median of Two Sorted Arrays | Hard | LC 4 | ★★★★★ | Heap, K-way merge, Order statistics, Binary search | Amazon, Google, Meta |
| Merge k Sorted Lists | Hard | LC 23 | ★★★★☆ | Heap, K-way merge, Divide and conquer | Amazon, Google, Apple |
| Reorganize String | Medium | LC 358 | ★★★★☆ | Greedy, Max-heap, Frequency counting, Cooldown | Amazon, Google, Airbnb |
| Task Scheduler | Medium | LC 621 | ★★★★★ | Greedy, Max-heap, Cooldown, Frequency counting | Meta, Amazon, Google |
| Top K Frequent Elements | Medium | LC 347 | ★★★★★ | Hashing, Heap, Top-K, Frequency counting | Google, Amazon, Meta |

### Binary Search (17)

| Problem | Difficulty | LeetCode | Heat | Patterns | Companies |
|---|---|---|---|---|---|
| Aggressive Cows | Medium | — | ★★★☆☆ | Binary search on the answer, Greedy | Meta, Microsoft, Tech Mahindra |
| Allocate Minimum Number of Painters | Hard | — | ★★★☆☆ | Binary search on the answer, Greedy, Partition | Google, Apple, Wipro |
| Binary Search | Easy | LC 704 | ★★★★☆ | Binary search, Divide and conquer | Amazon, Meta, JP Morgan |
| Capacity To Ship Packages Within D Days | Medium | LC 1011 | ★★★★☆ | Binary search on the answer, Greedy | Amazon, Google, Apple |
| Find First and Last Position of Element in Sorted Array | Medium | LC 34 | ★★★★☆ | Binary search, Lower bound, Upper bound | Meta, Google, LinkedIn |
| Find Minimum in Rotated Sorted Array | Medium | LC 153 | ★★★★☆ | Binary search, Rotated array | Meta, Amazon, LinkedIn |
| Find Peak Element | Medium | LC 162 | ★★★★☆ | Binary search, Divide and conquer | Google, Meta, Netflix |
| First Bad Version | Easy | LC 278 | ★★★★☆ | Binary search, Monotone predicate | Google, Amazon, Apple |
| Koko Eating Bananas | Medium | LC 875 | ★★★★☆ | Binary search on the answer | Meta, Google, Apple |
| Minimum Height Trees | Medium | LC 910 | ★★★☆☆ | BFS by layers, Tree, Degree peeling | Google, Facebook, Adobe |
| Search a 2D Matrix | Medium | LC 74 | ★★★★☆ | Binary search, Matrix, Divide and conquer | Google, Meta, Microsoft |
| Search a 2D Matrix II | Medium | LC 240 | ★★★★☆ | Staircase search, Matrix | Amazon, Google, Uber |
| Search in Rotated Sorted Array | Medium | LC 33 | ★★★★★ | Binary search, Rotated array | Meta, Amazon, Google |
| Search in Rotated Sorted Array II | Medium | LC 81 | ★★★★☆ | Binary search, Rotated array, Duplicates | Google, Meta, Bloomberg |
| Search Insert Position | Easy | LC 35 | ★★★★☆ | Binary search, Lower bound | Meta, Google, Apple |
| Split Array Largest Sum | Hard | LC 410 | ★★★★☆ | Binary search on the answer, Greedy, Partition | Google, Meta, Microsoft |
| Sqrt(x) | Easy | LC 69 | ★★★★☆ | Binary search on the answer | Meta, Google, Uber |

### Sorting (10)

| Problem | Difficulty | LeetCode | Heat | Patterns | Companies |
|---|---|---|---|---|---|
| Bubble Sort | Easy | — | ★★★☆☆ | Comparison sort, Repeated swapping | Amazon, Goldman Sachs, Wipro |
| Counting Sort | Medium | — | ★★★☆☆ | Non-comparison sort, Frequency counting | Meta, Adobe, Wipro |
| Dutch National Flag | Medium | LC 75 | ★★★★☆ | Three-way partitioning, Two pointers | Amazon, Google, Netflix |
| Heap Sort | Medium | — | ★★★☆☆ | Heap, In-place sorting | Google, LinkedIn, Tech Mahindra |
| Insertion Sort | Easy | — | ★★★☆☆ | Comparison sort, Growing sorted prefix | Amazon, Uber, Cognizant |
| Merge Sort | Medium | — | ★★★★☆ | Divide and conquer, Merging | Amazon, JP Morgan, Netflix |
| Quick Sort | Medium | — | ★★★★☆ | Divide and conquer, Partitioning | Amazon, LinkedIn, Uber |
| Selection Sort | Easy | — | ★★☆☆☆ | Comparison sort, Divide and select | Amazon, Adobe |
| Sort a Hand of Cards | Medium | — | ★★☆☆☆ | Radix sort, Stable counting sort | Meta, Netflix |
| Sort Array By Parity | Easy | LC 905 | ★★★☆☆ | Two Pointers, Partitioning | Google, Bloomberg, Facebook |

### Hashing (9)

| Problem | Difficulty | LeetCode | Heat | Patterns | Companies |
|---|---|---|---|---|---|
| Contains Duplicate | Easy | LC 217 | ★★★★☆ | Hashing, Set membership | Google, Amazon, Adobe |
| Find All Duplicates in an Array | Medium | LC 442 | ★★★☆☆ | Hashing, Frequency counting | Meta, Bloomberg, Facebook |
| First Unique Character in a String | Easy | LC 387 | ★★★☆☆ | Frequency counting, Hash map | Amazon, Airbnb, JP Morgan |
| Group Anagrams | Medium | LC 49 | ★★★★☆ | Hashing, Canonical key | Meta, Google, Uber |
| Intersection of Two Arrays | Easy | LC 349 | ★★★☆☆ | Hashing, Set intersection | Meta, Netflix, Apple |
| Isomorphic Strings | Easy | LC 205 | ★★★☆☆ | Hashing, Bijective mapping | Amazon, Airbnb, Uber |
| Longest Consecutive Sequence | Medium | LC 128 | ★★★★☆ | Hashing, Run detection | Google, Meta, Apple |
| Sort by Frequency of Characters | Medium | — | ★★☆☆☆ | Frequency counting, Custom ordering | Amazon, JP Morgan |
| Word Pattern | Easy | LC 290 | ★★★☆☆ | Hashing, Bijective mapping | Google, Uber, Microsoft |

### Two Pointers (10)

| Problem | Difficulty | LeetCode | Heat | Patterns | Companies |
|---|---|---|---|---|---|
| 3Sum | Medium | LC 15 | ★★★★★ | Two Pointers, Sorting, Duplicate skipping | Amazon, Google, Meta |
| 3Sum Closest | Medium | LC 16 | ★★★★☆ | Two Pointers, Sorting, Running best | Google, Meta, Microsoft |
| Container With Most Water | Medium | LC 11 | ★★★★★ | Two Pointers, Greedy | Meta, Amazon, Google |
| Maximum Difference Between Two Elements of an Array | Medium | LC 2016 | ★★★☆☆ | Running minimum, One pass, Greedy | Google, Airbnb, Salesforce |
| Move Zeroes | Easy | LC 283 | ★★★★☆ | Two Pointers, In-place compaction | Amazon, Google, JP Morgan |
| Remove Duplicates from Sorted Array | Easy | LC 26 | ★★★★☆ | Two Pointers, In-place compaction | Google, Meta, Bloomberg |
| Remove Duplicates from Sorted Array II | Medium | LC 80 | ★★★★☆ | Two Pointers, In-place compaction, Run detection | Google, Meta, Netflix |
| Squares of a Sorted Array | Easy | LC 977 | ★★★★☆ | Two Pointers, Sorted array | Amazon, Google, Microsoft |
| Two Sum II - Input Array Is Sorted | Easy | LC 167 | ★★★★☆ | Two Pointers, Sorted array | Meta, Amazon, Facebook |
| Valid Palindrome | Easy | LC 125 | ★★★★☆ | Two Pointers, String scanning | Amazon, Google, Bloomberg |

### Sliding Window (9)

| Problem | Difficulty | LeetCode | Heat | Patterns | Companies |
|---|---|---|---|---|---|
| Find All Anagrams in a String | Medium | LC 438 | ★★★★☆ | Sliding window, Frequency counting | Google, Amazon, Facebook |
| Fruit Into Baskets | Medium | LC 904 | ★★★★☆ | Sliding window, Frequency counting, Hashing | Amazon, Meta, Uber |
| Longest Repeating Character Replacement | Medium | LC 424 | ★★★★☆ | Sliding window, Greedy | Amazon, Meta, Facebook |
| Longest Repeating Substring | Hard | LC 1062 | ★★★☆☆ | Dynamic programming, Sliding window, String hashing | Amazon, Salesforce, Apple |
| Longest Subarray with At Most K Distinct | Medium | LC 340 | ★★★★☆ | Sliding window, Frequency counting, Hashing | Meta, Google, Microsoft |
| Longest Substring Without Repeating Characters | Medium | LC 3 | ★★★★★ | Sliding window, Hashing, Two pointers | Amazon, Meta, Google |
| Minimum Number of Flips to Make the Binary String Alternating | Medium | LC 188 | ★★★☆☆ | Sliding window, Counting, Strings | Amazon, Airbnb, Apple |
| Minimum Window Substring | Hard | LC 76 | ★★★★☆ | Sliding window, Hashing, Two pointers | Meta, Google, JP Morgan |
| Permutation in String | Medium | LC 567 | ★★★★☆ | Sliding window, Frequency counting, Hashing | Google, Meta, JP Morgan |

### Prefix & Suffix Sums (8)

| Problem | Difficulty | LeetCode | Heat | Patterns | Companies |
|---|---|---|---|---|---|
| 2D Prefix Sum | Medium | — | ★★☆☆☆ | 2D prefix sums, Inclusion-exclusion | Google, Microsoft |
| Contiguous Array | Medium | LC 525 | ★★★☆☆ | Prefix sum with a hash map, Balance counting | Meta, Adobe, Microsoft |
| Pairs With a Target Sum | Medium | LC 1674 | ★★☆☆☆ | Hashing, Complement counting | Amazon, Microsoft, Infosys |
| Pivot Index | Easy | LC 724 | ★★★☆☆ | Prefix sums, Running balance | Amazon, LinkedIn, Airbnb |
| Product of Array Except Self | Medium | LC 238 | ★★★★☆ | Prefix and suffix products, No division | Google, Amazon, Microsoft |
| Range Sum Query — Immutable | Easy | LC 303 | ★★★☆☆ | Prefix sums, O(1) range queries | Amazon, Salesforce, Goldman Sachs |
| Running Sum of 1d Array | Easy | LC 1480 | ★★☆☆☆ | Running sum, In-place accumulation | Meta, Salesforce, TCS |
| Subarray Sum Equals K | Medium | LC 560 | ★★★★☆ | Prefix sums with a hash map | Amazon, Meta, Microsoft |

### Trees & BST (26)

| Problem | Difficulty | LeetCode | Heat | Patterns | Companies |
|---|---|---|---|---|---|
| Balanced Binary Tree | Easy | LC 110 | ★★★★★ | DFS, Post-order height check | Amazon, Meta, Google |
| Binary Tree Cameras | Medium | LC 757 | ★★★☆☆ | Greedy post-order, Tree DP | Google, JP Morgan, Facebook |
| Binary Tree Inorder Traversal | Easy | LC 94 | ★★★★★ | DFS, Explicit stack | Google, Amazon, Meta |
| Binary Tree Level Order Traversal | Medium | LC 102 | ★★★★★ | BFS, Queue | Meta, Amazon, Google |
| Binary Tree Minimum Depth | Easy | LC 111 | ★★★★☆ | DFS, Post-order recursion | Google, Amazon, Microsoft |
| Binary Tree Paths | Easy | LC 257 | ★★★★☆ | DFS, Backtracking | Google, Meta, Microsoft |
| Construct Binary Tree from Preorder and Inorder Traversal | Medium | LC 105 | ★★★★☆ | Divide and conquer, Index maps | Meta, Google, JP Morgan |
| Delete Node in a BST | Medium | LC 450 | ★★★★☆ | BST, Recursive descent | Google, Amazon, Uber |
| Diameter of Binary Tree | Easy | LC 543 | ★★★★☆ | DFS, Post-order with global state | Google, Amazon, Microsoft |
| Insert into a Binary Search Tree | Medium | LC 701 | ★★★★☆ | BST, Recursive descent | Meta, Amazon, Bloomberg |
| Invert Binary Tree | Easy | LC 226 | ★★★★☆ | DFS, Mirror recursion | Meta, Amazon, Adobe |
| Kth Smallest Element in a BST | Medium | LC 230 | ★★★★★ | BST, In-order iteration | Amazon, Google, Meta |
| Lowest Common Ancestor of a Binary Tree | Medium | LC 236 | ★★★★★ | DFS, Post-order recursion | Meta, Amazon, Google |
| Lowest Common Ancestor of a BST | Medium | LC 235 | ★★★★★ | BST, Iterative descent | Meta, Amazon, Google |
| Maximum Depth of Binary Tree | Easy | LC 104 | ★★★★★ | DFS, Post-order recursion | Amazon, Google, Meta |
| Path Sum | Easy | LC 112 | ★★★★★ | DFS, Running sum | Meta, Amazon, Google |
| Path Sum III | Medium | LC 437 | ★★★★☆ | DFS, Prefix sums | Meta, Google, Adobe |
| Populating Next Right Pointers in Each Node | Medium | LC 116 | ★★★★☆ | BFS, Level linking | Meta, Google, LinkedIn |
| Same Tree | Easy | LC 100 | ★★★★★ | DFS, Structural comparison | Amazon, Meta, Google |
| Search in a Binary Search Tree | Easy | LC 700 | ★★★★☆ | BST, Iterative descent | Amazon, Meta, Adobe |
| Serialize and Deserialize Binary Tree | Medium | LC 297 | ★★★★☆ | Level-order encoding, Round trip | Meta, Amazon, Adobe |
| Subtree of Another Tree | Easy | LC 572 | ★★★★☆ | DFS, Structural comparison | Meta, Google, Adobe |
| Sum of Left Leaves | Easy | LC 404 | ★★★☆☆ | DFS, Recursion | Meta, Netflix, Microsoft |
| Symmetric Tree | Easy | LC 101 | ★★★★☆ | DFS, Mirror recursion | Google, Amazon, Microsoft |
| Validate Binary Search Tree | Medium | LC 98 | ★★★★★ | DFS, Range bounds | Meta, Amazon, Google |
| Zigzag Level Order Traversal | Medium | LC 103 | ★★★★☆ | BFS, Alternating direction | Amazon, Meta, Airbnb |

### Trie (6)

| Problem | Difficulty | LeetCode | Heat | Patterns | Companies |
|---|---|---|---|---|---|
| Camelcase Matching | Medium | LC 1253 | ★★★☆☆ | Two pointers, Case rules | Google, Adobe, Bloomberg |
| Design Add and Search Words | Medium | LC 211 | ★★★★☆ | Trie, Backtracking with wildcards | Google, Meta, JP Morgan |
| Implement Trie | Medium | LC 208 | ★★★★☆ | Trie, Prefix tree | Amazon, Google, Facebook |
| Longest Prefix of a Phone Number | Medium | LC 17 | ★★★☆☆ | Trie, Prefix walk | Google, Netflix, Microsoft |
| Trie with Prefix Counting | Medium | — | ★★★☆☆ | Trie, Augmented node state | Amazon, Bloomberg, Capgemini |
| Word Search II | Hard | LC 212 | ★★★★☆ | Trie + backtracking, Grid search | Google, Meta, JP Morgan |

### Graphs (20)

| Problem | Difficulty | LeetCode | Heat | Patterns | Companies |
|---|---|---|---|---|---|
| 01 Matrix | Medium | LC 542 | ★★★★☆ | Multi-source BFS, Grid traversal | Amazon, Meta, Facebook |
| Alien Dictionary | Medium | LC 269 | ★★★☆☆ | Topological sort, Precedence graph, String comparison | Google, Airbnb, Goldman Sachs |
| Cheapest Flights Within K Stops | Medium | LC 787 | ★★★★☆ | Bellman-Ford, Dynamic programming, Shortest path | Meta, Amazon, Facebook |
| Clone Graph | Medium | LC 133 | ★★★☆☆ | Graph traversal, HashMap, BFS | Google, LinkedIn, Bloomberg |
| Course Schedule | Medium | LC 207 | ★★★★☆ | Topological sort, Cycle detection, BFS | Meta, Google, Netflix |
| Course Schedule II | Medium | LC 210 | ★★★★☆ | Topological sort, Priority queue, BFS | Meta, Amazon, Adobe |
| Graph Valid Tree | Medium | LC 261 | ★★★☆☆ | Union-Find, Cycle detection, Graph theory | Amazon, Apple, Bloomberg |
| Is Graph Bipartite | Medium | LC 785 | ★★★★☆ | BFS, Two-colouring, Union-Find | Google, Amazon, Facebook |
| Keys and Rooms | Medium | LC 841 | ★★★☆☆ | Graph traversal, DFS, Reachability | Meta, Salesforce, Apple |
| Network Delay Time | Medium | LC 743 | ★★★★☆ | Dijkstra, Shortest path, Priority queue | Google, Amazon, Goldman Sachs |
| Number of Connected Components in an Undirected Graph | Medium | LC 547 | ★★★★☆ | Union-Find, Connected components, BFS | Meta, Google, Adobe |
| Number of Islands | Medium | LC 200 | ★★★★☆ | DFS, BFS, Grid traversal | Google, Meta, Goldman Sachs |
| Number of Provinces | Medium | LC 547 | ★★★★☆ | Union-Find, Connected components, Adjacency matrix | Amazon, Google, Microsoft |
| Pacman Paths | Medium | — | ★★★☆☆ | BFS, Grid traversal, Shortest path | Meta, Salesforce, Infosys |
| Reconstruct Itinerary | Hard | LC 332 | ★★★★☆ | Hierholzer's algorithm, Eulerian path, Greedy | Google, Meta, Netflix |
| Rotting Oranges | Medium | LC 994 | ★★★★☆ | Multi-source BFS, Grid traversal | Google, Amazon, JP Morgan |
| Shortest Path in a Binary Maze | Medium | LC 1293 | ★★★☆☆ | BFS, Grid traversal, Dynamic programming | Google, Facebook, Uber |
| Topological Sort | Medium | — | ★★★★☆ | Topological sort, Kahn's algorithm, Min-heap | Google, Airbnb, Bloomberg |
| Walls and Gates | Medium | LC 286 | ★★★☆☆ | Multi-source BFS, Grid traversal | Google, Adobe, Salesforce |
| Word Ladder | Medium | LC 127 | ★★★★☆ | BFS, Wildcard bucketing, String manipulation | Amazon, Google, Facebook |

### Advanced Graphs (12)

| Problem | Difficulty | LeetCode | Heat | Patterns | Companies |
|---|---|---|---|---|---|
| Articulation Points in a Graph | Hard | — | ★★★★☆ | Low-link values, DFS, Cut vertices | Amazon, Facebook, Bloomberg |
| Bellman-Ford Shortest Path | Medium | — | ★★★★☆ | Bellman-Ford, Negative weights, Cycle detection | Amazon, Microsoft, Apple |
| Bridges in a Graph | Hard | — | ★★★★☆ | Low-link values, DFS, Tarjan | Amazon, Bloomberg, Salesforce |
| Dijkstra's Shortest Path | Medium | — | ★★★★★ | Dijkstra, Priority queue, Greedy | Google, Meta, Goldman Sachs |
| Eulerian Path | Hard | — | ★★★★☆ | Hierholzer's algorithm, Eulerian path, Degree conditions | Meta, Bloomberg, Facebook |
| Floyd-Warshall All-Pairs Shortest Path | Medium | — | ★★★★☆ | Dynamic programming, All-pairs shortest path | Amazon, Uber, LinkedIn |
| Graph Coloring | Hard | — | ★★★★☆ | Backtracking, Greedy, DSATUR, NP-hard | Meta, Airbnb, Netflix |
| Kosaraju's Strongly Connected Components | Hard | — | ★★★★☆ | Kosaraju, Two DFS passes, Transpose graph | Meta, Uber, Microsoft |
| Kruskal's Minimum Spanning Tree | Medium | — | ★★★★☆ | Greedy, Union-Find, Sorting | Amazon, Airbnb, LinkedIn |
| Minimum Spanning Tree | Medium | LC 1584 | ★★★★☆ | Minimum spanning tree, Union-Find, Greedy | Meta, Amazon, Adobe |
| Prim's Minimum Spanning Tree | Medium | — | ★★★★☆ | Greedy, Priority queue, Cut property | Amazon, Netflix, Facebook |
| Tarjan's Strongly Connected Components | Hard | — | ★★★★☆ | Tarjan, Low-link values, DFS | Meta, LinkedIn, Airbnb |

### Dynamic Programming (30)

| Problem | Difficulty | LeetCode | Heat | Patterns | Companies |
|---|---|---|---|---|---|
| Best Time to Buy and Sell Stock III | Hard | LC 123 | ★★★★☆ | State-compression DP, Greedy | Meta, Amazon, Microsoft |
| Burst Balloons | Hard | LC 312 | ★★★★☆ | Interval DP, Bottom-up DP | Google, Amazon, Bloomberg |
| Catalan Number | Medium | LC 96 | ★★★★☆ | Counting DP, Combinatorics | Amazon, Google, Apple |
| Climbing Stairs | Easy | LC 70 | ★★★★☆ | Bottom-up DP, Recursion + memoization | Amazon, Meta, JP Morgan |
| Coin Change | Medium | LC 322 | ★★★★★ | Unbounded knapsack, Bottom-up DP | Amazon, Meta, Google |
| Coin Change II | Medium | LC 518 | ★★★★☆ | Unbounded knapsack, Counting DP | Google, Amazon, LinkedIn |
| Decode Ways | Medium | LC 91 | ★★★★☆ | Prefix DP, String DP | Meta, Amazon, Adobe |
| Distinct Subsequences | Medium | — | ★★★☆☆ | Counting DP, Prefix DP | Google, LinkedIn, Capgemini |
| Edit Distance | Medium | LC 72 | ★★★★★ | 2-D DP, String DP | Google, Amazon, Meta |
| Fibonacci Number | Easy | LC 509 | ★★★☆☆ | Bottom-up DP, Iterative recurrence | Meta, Adobe, Airbnb |
| House Robber | Medium | LC 198 | ★★★★★ | Bottom-up DP, Take-or-skip | Amazon, Meta, Google |
| House Robber II | Medium | LC 213 | ★★★★☆ | Circular DP, Divide and conquer | Amazon, Google, Facebook |
| Interleaving String | Medium | LC 97 | ★★★★☆ | 2-D DP, String DP | Google, Amazon, LinkedIn |
| Jump Game II | Medium | LC 45 | ★★★★☆ | Greedy + DP, Jump game | Amazon, Meta, Facebook |
| Longest Common Subsequence | Medium | LC 1143 | ★★★★★ | 2-D DP, String DP | Amazon, Meta, Google |
| Longest Common Substring | Medium | LC 718 | ★★★★☆ | 2-D DP, String DP | Google, Amazon, Airbnb |
| Longest Increasing Subsequence | Medium | LC 300 | ★★★★★ | Bottom-up DP, Patience sorting | Google, Meta, Amazon |
| Maximum Product Subarray | Medium | LC 152 | ★★★★☆ | Bottom-up DP, State compression | Amazon, Meta, Airbnb |
| Minimum Path Sum | Medium | LC 64 | ★★★★☆ | Grid DP, Bottom-up DP | Google, Amazon, Airbnb |
| Number of Partitions | Medium | — | ★★★☆☆ | Counting DP, Unbounded knapsack | Amazon, JP Morgan, Tech Mahindra |
| Palindromic Substrings | Medium | LC 647 | ★★★★☆ | Interval DP, Expand around the centre | Meta, Google, Airbnb |
| Partition Equal Subset Sum | Medium | LC 416 | ★★★★☆ | Subset-sum DP, 0/1 knapsack | Google, Amazon, Uber |
| Regular Expression Matching | Hard | LC 10 | ★★★★☆ | 2-D DP, String DP | Google, Meta, Bloomberg |
| Rod Cutting | Medium | — | ★★★☆☆ | Unbounded knapsack, Bottom-up DP | Google, LinkedIn, Cognizant |
| Stone Game II | Medium | LC 1140 | ★★★☆☆ | Game DP, Bottom-up DP | Meta, Apple, Salesforce |
| Target Sum | Medium | LC 494 | ★★★★☆ | Subset-sum DP, Counting DP | Amazon, Google, Airbnb |
| Unique Paths | Medium | LC 62 | ★★★★★ | Grid DP, Combinatorics | Meta, Google, Amazon |
| Unique Paths III | Hard | LC 980 | ★★★☆☆ | Backtracking, DFS on a grid | Amazon, Goldman Sachs, Facebook |
| Wildcard Matching | Hard | LC 44 | ★★★★☆ | 2-D DP, String DP, Greedy | Meta, Google, Facebook |
| Word Break | Medium | LC 139 | ★★★★☆ | Prefix DP, HashSet lookups | Amazon, Google, Apple |

### Backtracking (13)

| Problem | Difficulty | LeetCode | Heat | Patterns | Companies |
|---|---|---|---|---|---|
| Combination Sum | Medium | LC 39 | ★★★★★ | Backtracking, DFS with a path | Amazon, Google, Meta |
| Combination Sum II | Medium | LC 40 | ★★★★☆ | Backtracking, Duplicate pruning | Amazon, Google, LinkedIn |
| Flood Fill | Easy | LC 733 | ★★★☆☆ | DFS on a grid, Flood fill | Amazon, LinkedIn, Bloomberg |
| Generate Parentheses | Medium | LC 22 | ★★★★☆ | Backtracking, Pruning | Amazon, Google, Facebook |
| Letter Combinations of a Phone Number | Medium | LC 17 | ★★★★☆ | Backtracking, DFS with a path | Google, Amazon, Adobe |
| N-Queens | Hard | LC 51 | ★★★★☆ | Backtracking, Constraint pruning | Google, Meta, Apple |
| N-Queens II | Hard | LC 52 | ★★★☆☆ | Backtracking, Constraint pruning | Meta, Airbnb, Bloomberg |
| Palindrome Partitioning | Medium | LC 131 | ★★★★☆ | Backtracking, Pruning | Amazon, Meta, Apple |
| Permutations | Medium | LC 46 | ★★★★★ | Backtracking, Used array | Google, Amazon, Meta |
| Permutations II | Medium | LC 47 | ★★★★☆ | Backtracking, Duplicate pruning | Google, Amazon, Airbnb |
| Subsets | Medium | LC 78 | ★★★★★ | Backtracking, DFS with a path | Amazon, Google, Meta |
| Sudoku Solver | Hard | LC 37 | ★★★★☆ | Backtracking, Constraint pruning | Meta, Amazon, Microsoft |
| Word Search | Medium | LC 79 | ★★★★☆ | Backtracking, DFS on a grid | Amazon, Meta, Facebook |

### Greedy (13)

| Problem | Difficulty | LeetCode | Heat | Patterns | Companies |
|---|---|---|---|---|---|
| Assign Cookies | Easy | LC 455 | ★★★☆☆ | Greedy, Sort and two pointers | Amazon, LinkedIn, JP Morgan |
| Candy | Hard | LC 135 | ★★★★☆ | Greedy, Two-pass constraint propagation | Meta, Google, Microsoft |
| Coin Change with Greedy | Medium | — | ★★★☆☆ | Greedy, Largest denomination first | Google, Microsoft, HCLTech |
| Gas Station | Medium | LC 134 | ★★★★☆ | Greedy, Prefix-sum reset | Meta, Amazon, Salesforce |
| Hand of Straights | Medium | LC 846 | ★★★☆☆ | Greedy, Frequency counting | Google, Goldman Sachs, Adobe |
| Jump Game | Medium | LC 55 | ★★★★☆ | Greedy, Reach tracking | Meta, Google, Netflix |
| Jump Game II | Medium | LC 45 | ★★★★☆ | Greedy, BFS by layers | Google, Amazon, LinkedIn |
| Jump Game III | Medium | LC 1306 | ★★★☆☆ | BFS, Visited set | Amazon, Airbnb, Adobe |
| Largest Number | Medium | LC 179 | ★★★★☆ | Greedy, Custom comparator | Amazon, Google, Airbnb |
| Maximum Profit Scheduling Jobs | Medium | — | ★★★☆☆ | Greedy sorting, Weighted interval scheduling | Meta, Bloomberg, Infosys |
| Maximum Units on a Truck | Easy | — | ★★☆☆☆ | Greedy, Sort by value per unit | Amazon, Apple |
| Minimum Number of Refueling Stops | Medium | LC 871 | ★★★☆☆ | Greedy, Max-heap simulation | Meta, Salesforce, Adobe |
| Partition Array Into Maximum Subarrays | Medium | LC 813 | ★★★☆☆ | Greedy, Keep the k largest | Amazon, Apple, Netflix |

### Intervals (9)

| Problem | Difficulty | LeetCode | Heat | Patterns | Companies |
|---|---|---|---|---|---|
| Car Fleet | Medium | LC 1491 | ★★★★☆ | Greedy, Fleet time from the back | Meta, Amazon, Bloomberg |
| Employee Free Time | Medium | LC 759 | ★★★☆☆ | Merge then complement | Meta, Microsoft, LinkedIn |
| Insert Interval | Medium | LC 57 | ★★★★☆ | Sorting, Three-way sweep | Meta, Amazon, Microsoft |
| Interval List Intersections | Medium | LC 986 | ★★★☆☆ | Two pointers, Sorted sweep | Meta, Salesforce, Netflix |
| Meeting Rooms | Easy | LC 862 | ★★★★☆ | Sorting, Overlap detection | Meta, Google, Facebook |
| Meeting Rooms II | Medium | LC 692 | ★★★★☆ | Sweep line, Min-heap of end times | Meta, Google, Microsoft |
| Meeting Rooms III | Hard | LC 1859 | ★★★☆☆ | Greedy, Sorted sweep with room availability | Amazon, Microsoft, Salesforce |
| Merge Intervals | Medium | LC 56 | ★★★★★ | Sorting, Sweep line | Amazon, Google, Meta |
| Non-overlapping Intervals | Medium | LC 435 | ★★★★☆ | Greedy, Earliest finishing time | Meta, Google, JP Morgan |

### Bit Manipulation (12)

| Problem | Difficulty | LeetCode | Heat | Patterns | Companies |
|---|---|---|---|---|---|
| Counting Bits | Easy | LC 338 | ★★★☆☆ | Bit tricks, Dynamic programming | Meta, Adobe, Apple |
| Divide Two Integers | Medium | LC 29 | ★★★★☆ | Bit tricks, Shifts, Long division | Google, Meta, Apple |
| Gray Code | Medium | LC 89 | ★★★☆☆ | Bit tricks, XOR | Amazon, Adobe, Salesforce |
| Hamming Distance | Easy | LC 461 | ★★★★☆ | XOR, Bit tricks | Meta, Amazon, Facebook |
| Number of 1 Bits | Easy | LC 191 | ★★★★☆ | Bit tricks, Kernighan's algorithm | Amazon, Meta, Goldman Sachs |
| Power of Two | Easy | LC 231 | ★★★★☆ | Bit tricks | Meta, Amazon, Microsoft |
| Reverse Bits | Easy | LC 190 | ★★★★☆ | Bit tricks, Shifts | Amazon, Google, Apple |
| Single Number | Easy | LC 136 | ★★★★★ | XOR, Bit tricks | Meta, Amazon, Google |
| Single Number III | Medium | LC 260 | ★★★★☆ | XOR, Bit partitioning | Amazon, Google, Salesforce |
| Subtract Two Integers without Minus | Medium | — | ★★★☆☆ | Bit tricks, Two's complement, Borrow propagation | Meta, Airbnb, HCLTech |
| Sum of Two Integers | Medium | LC 371 | ★★★★☆ | Bit tricks, Addition without the + operator | Amazon, Meta, Uber |
| XOR of All Elements | Easy | LC 1486 | ★★★☆☆ | XOR, Bit tricks | Google, Uber, Microsoft |

### Math & Number Theory (12)

| Problem | Difficulty | LeetCode | Heat | Patterns | Companies |
|---|---|---|---|---|---|
| Add Binary | Easy | LC 415 | ★★★★☆ | Bit manipulation, Carry propagation | Amazon, Meta, JP Morgan |
| Count Primes | Medium | LC 204 | ★★★★☆ | Number theory, Sieve of Eratosthenes | Amazon, Google, Airbnb |
| Factorial Trailing Zeroes | Easy | LC 172 | ★★★☆☆ | Number theory, Counting factors | Meta, Salesforce, Airbnb |
| GCD and LCM | Easy | — | ★★★★☆ | Euclidean algorithm | Meta, Adobe, Bloomberg |
| Happy Number | Easy | LC 202 | ★★★☆☆ | Number theory, Cycle detection | Google, Adobe, LinkedIn |
| Is a Number Prime | Medium | — | ★★★☆☆ | Number theory, Trial division | Google, Apple, Infosys |
| Largest Prime Factor | Medium | — | ★★☆☆☆ | Number theory, Trial division | Amazon, Bloomberg |
| Palindrome Number | Easy | LC 9 | ★★★★☆ | Digit manipulation, Half reversal | Google, Meta, Apple |
| Perfect Number | Easy | LC 507 | ★★★☆☆ | Number theory, Divisor pairs | Amazon, Bloomberg, Goldman Sachs |
| Pow(x, n) | Medium | LC 50 | ★★★★☆ | Divide and conquer, Fast exponentiation | Meta, Google, Airbnb |
| Reverse Integer | Medium | LC 7 | ★★★★☆ | Digit manipulation, Overflow check | Meta, Google, Adobe |
| Ugly Number | Medium | LC 313 | ★★★☆☆ | Dynamic programming, Three pointers | Meta, Apple, Microsoft |

### Design (13)

| Problem | Difficulty | LeetCode | Heat | Patterns | Companies |
|---|---|---|---|---|---|
| Design Browser History | Medium | LC 348 | ★★★☆☆ | Design, Array with a cursor | Google, Airbnb, JP Morgan |
| Design HashMap | Easy | LC 706 | ★★★☆☆ | Design, Hashing, Separate chaining | Amazon, Bloomberg, Salesforce |
| Design Hit Counter | Medium | LC 362 | ★★★☆☆ | Design, Sliding window, Bucketing | Google, Bloomberg, Uber |
| Design Text Editor | Hard | LC 2296 | ★★☆☆☆ | Design, Undo journal, Two stacks | Meta, Facebook, Infosys |
| Design Tic-Tac-Toe | Medium | — | ★★★☆☆ | Design, State machine, Win detection | Amazon, Salesforce, Infosys |
| Design Underground System | Medium | LC 373 | ★★★☆☆ | Design, Aggregation, Sorted map | Amazon, Adobe, LinkedIn |
| LFU Cache | Hard | LC 460 | ★★★★☆ | Design, Frequency buckets, HashMap | Google, Meta, Adobe |
| LRU Cache | Medium | LC 146 | ★★★★★ | Design, HashMap, Doubly linked list | Google, Meta, Amazon |
| Min Max Stack | Medium | — | ★★★☆☆ | Design, Stack, Running aggregates | Google, Apple, Wipro |
| Moving Average | Easy | LC 346 | ★★★☆☆ | Design, Sliding window, Running sum | Amazon, LinkedIn, Facebook |
| Rate Limiter | Medium | — | ★★★★☆ | Design, Sliding window, Rate limiting | Amazon, Salesforce, Goldman Sachs |
| Semaphore | Medium | — | ★★★☆☆ | Design, Concurrency, Condition variables | Amazon, Netflix, Cognizant |
| Snapshot Array | Medium | LC 1146 | ★★★☆☆ | Design, Versioning, Per-index history | Amazon, Adobe, Facebook |

### Concurrency (6)

| Problem | Difficulty | LeetCode | Heat | Patterns | Companies |
|---|---|---|---|---|---|
| Bounded Blocking Queue | Medium | — | ★★★★☆ | Concurrency, Lock, Condition variables | Google, LinkedIn, Adobe |
| Concurrent Sum using Threads | Medium | — | ★★★☆☆ | Concurrency, Work splitting, Join before reading | Meta, Apple, Tech Mahindra |
| Parallel Pipeline Merge | Hard | — | ★★☆☆☆ | Concurrency, Pipeline, Ordered merge | Google, LinkedIn |
| Producer–Consumer Problem | Medium | — | ★★★★☆ | Concurrency, Blocking queue, Poison pill | Google, JP Morgan, Microsoft |
| Singleton with Double-Checked Locking | Medium | — | ★★★★☆ | Concurrency, Double-checked locking, Safe publication | Google, Netflix, Adobe |
| Thread-Safe Counter | Easy | — | ★★★★☆ | Concurrency, Atomics, Lock-free | Google, Apple, Airbnb |

`,n={id:e,body:t};export{t as body,n as default,e as id};