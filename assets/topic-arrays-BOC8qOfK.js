var e=`topic:arrays`,t=`
# Arrays — concept notes

## The mental model

An array is a **contiguous block of memory** with a fixed length. Two consequences drive
everything else:

1. **Indexing is O(1)** — \`arr[i]\` computes \`base + i * elementSize\`.
2. **Inserting or deleting in the middle is O(n)** — everything after must shift.

Every array problem is a question of which of those two facts you are allowed to exploit.

---

## Choosing an approach

\`\`\`
Does the array need to keep its original order?
├─ Yes → in-place algorithms (partitioning, rotating, dedup)
└─ No  → can you sort it? → sorting + a linear pass

Is the input sorted?
├─ Yes → two pointers, or binary search
└─ No  → hash map for O(1) lookups, or sort it first

Do you need the count of each value?
└─ Hash map / frequency array

Do you need "how many subarrays satisfy P"?
├─ P depends only on the subarray's elements → sliding window
├─ P depends on the sum        → prefix sum + hash map
└─ P depends on the order      → DP
\`\`\`

---

## The three traversal shapes

**Forward with a write pointer** — the workhorse for in-place problems:

\`\`\`java
int write = 0;
for (int read = 0; read < nums.length; read++) {
    if (keep(nums[read])) {
        nums[write++] = nums[read];
    }
}
\`\`\`

Used by: Remove Duplicates, Remove Element, Move Zeroes, Partition Array, Dutch Flag.

**Two pointers from both ends** — used when a property is monotone:

\`\`\`java
int left = 0, right = nums.length - 1;
while (left < right) {
    if (ok(nums[left], nums[right])) { left++; right--; }
    else if (needMoreLeft(nums[left], nums[right])) { left++; }
    else { right--; }
}
\`\`\`

Used by: Container With Most Water, Two Sum II, 3Sum, Squares of a Sorted Array, Reverse
String.

**Prefix/suffix accumulation** — when each element's answer depends on everything before
it or everything after it:

\`\`\`java
// prefix products
long[] prefix = new long[n + 1];
for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] * nums[i];
\`\`\`

Used by: Product Except Self, Left and Right Sum, Maximum Gap.

---

## In-place algorithms: the write-pointer discipline

The rule that makes these correct:

> **Read pointer moves every iteration. Write pointer moves only when you keep an element.**
> At the end, \`write\` is the number of kept elements.

\`\`\`java
// Remove Duplicates from Sorted Array (allow duplicates)
int write = 0;
for (int read = 0; read < nums.length; read++) {
    if (read == 0 || nums[read] != nums[read - 1]) {
        nums[write++] = nums[read];
    }
}
\`\`\`

**Why it is safe:** you only ever write to index \`write\`, and \`write <= read\` always holds
(write advances at most once per read). So you never overwrite an element you have not
yet read.

**Prove \`write <= read\` in the interview.** It takes 15 seconds and it is exactly the kind
of reasoning that separates a candidate from a memoriser.

---

## The gap technique

Sometimes you need the *distance* between elements, not the elements themselves.

**Maximum Gap (bucket sort, O(n)):** the answer is at least \`(max - min) / (n - 1)\`. So
bucket the numbers into that many buckets and only compare within and across bucket
boundaries — you never sort.

\`\`\`
min = 1, max = 10, n = 4  →  gap >= (10-1)/3 = 3
Buckets: [1..3] [4..6] [7..9] [10]
\`\`\`

**Why not just sort?** Sorting is O(n log n) and the problem asked for O(n). The bucket
argument is the whole point: the answer is bounded below by the average gap, so you only
need buckets, not a full sort.

---

## Kadane's algorithm

**Maximum subarray, in one pass:**

\`\`\`java
int maxSoFar = nums[0];
int current = nums[0];
for (int i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    maxSoFar = Math.max(maxSoFar, current);
}
\`\`\`

**The insight:** at each position, the best subarray ending there either starts here or
extends the best subarray ending at the previous position. That is the entire recurrence:
\`dp[i] = max(nums[i], dp[i-1] + nums[i])\`.

**Two common variants:**

| Variant | Change | Example problem |
|---|---|---|
| Maximum subarray | \`max(nums[i], current + nums[i])\` | LC 53 |
| Maximum **product** subarray | Track both max and min product | LC 152 |
| Maximum circular subarray | Compare \`maxSubarray\` with \`total - minSubarray\` | LC 134 |

**For the circular variant**, the trick is that a circular subarray wrapping around is
the complement of the minimum subarray in the middle. So:

\`\`\`
answer = max(maxSubarray, totalSum - minSubarray)
\`\`\`

with the caveat that if all elements are negative, \`total - minSubarray\` is wrong (it
would give 0) — guard with \`if (maxSubarray < 0) return maxSubarray\`.

**For the product variant**, you need to track the minimum too, because a negative number
times a minimum becomes a maximum.

---

## Prefix sum: turning a range query into a subtraction

\`\`\`
prefix[i] = sum of nums[0..i-1]
sum(l, r) = prefix[r + 1] - prefix[l]
\`\`\`

Any range-sum question becomes two lookups. The same idea generalises:

| Query | Prefix structure |
|---|---|
| Range sum | \`prefix[r+1] - prefix[l]\` |
| Range product | \`prefix[r+1] / prefix[l]\` (careful with zeros) |
| Subarray sum equals K | \`prefix[i] - prefix[j] == K\` → look up \`prefix[i] - K\` in a map |
| Count of subarrays with sum K | Same, but count the occurrences |
| 2D range sum | A 2D prefix table, same subtraction |

**Subarray sum equals K** is the one that comes up most, and the hash-map variant is the
one worth having:

\`\`\`java
Map<Integer, Integer> counts = new HashMap<>();
counts.put(0, 1);                        // the empty prefix
int sum = 0, result = 0;
for (int x : nums) {
    sum += x;
    result += counts.getOrDefault(sum - K, 0);
    counts.merge(sum, 1, Integer::sum);
}
return result;
\`\`\`

**Why \`counts.put(0, 1)\`?** Because a subarray starting at index 0 has an empty prefix
before it. Without that seed, every subarray starting at 0 is missed. This is the single
most common bug in this problem, and it is worth explaining out loud.

---

## Rotation and cycling

**Rotate right by k** (k may exceed the length):

\`\`\`java
k %= nums.length;
reverse(nums, 0, nums.length - 1);
reverse(nums, 0, k - 1);
reverse(nums, k, nums.length - 1);
\`\`\`

Three reversals, O(n) time, O(1) space. **The classic three-reversal trick** — know it
cold, and be able to explain why it works (the first reversal puts the array back in
order, the other two rotate it).

**Caveat:** if the array contains duplicates, the three-reversal result can differ from
the "expected" answer in LeetCode's checker. Mention it if relevant.

---

## The matrix problems

**Rotate 90° clockwise in place:** transpose, then reverse each row.

**Spiral traversal:** four boundaries (\`top\`, \`bottom\`, \`left\`, \`right\`). Shrink after
each edge. **The classic bug is traversing the last row or column twice** when the
matrix has a single row or column left — check for that.

**Set Matrix Zeroes:** two passes with a header row/column. The trick is using the first
row and first column as the marker arrays, then handling them at the end.

---

## Common traps

| Trap | How to avoid |
|---|---|
| \`arr.length\` vs \`arr.length - 1\` | Remember: valid indices are \`0..length-1\` |
| Modifying the array while iterating with an enhanced for | Use an index loop, or copy first |
| Off-by-one in the write pointer | Assert \`write <= read\` in your head |
| Integer overflow in a sum | Use \`long\` when the values can be large |
| \`i <= arr.length\` in a loop condition | \`<\` is almost always right |
| Comparing \`arr[i] == null\` on a primitive array | It cannot be null — did you mean \`arr[i] == 0\`? |
| Allocating a new array when in-place was required | Re-read the prompt; it usually says "in place" for a reason |

---

## Complexity cheat sheet

| Operation | Complexity |
|---|---|
| Read \`arr[i]\` | O(1) |
| Search (unsorted) | O(n) |
| Binary search (sorted) | O(log n) |
| Insert / delete at the end | O(1) amortised |
| Insert / delete in the middle | O(n) |
| Sort | O(n log n) |
| Reverse in place | O(n) time, O(1) space |
| Rotate by k | O(n) time, O(1) space |
| Kadane | O(n) time, O(1) space |

---

## How to crack it in an interview

1. **Ask about the constraints.** \`n ≤ 10⁵\` kills the nested loop.
2. **Ask what may be modified.** "Can I modify the array?" decides everything.
3. **State the brute force and its complexity.** Always.
4. **Say whether the input is sorted.** It changes the algorithm completely.
5. **Name your approach out loud:** "one pass with a write pointer", "two pointers from
   both ends", "prefix sums with a hash map".
6. **State the invariant** — for the write-pointer technique, "everything in
   \`nums[0..write)\` is exactly the elements I have decided to keep, in order".
7. **Trace one example at the end.**
`,n={id:e,body:t};export{t as body,n as default,e as id};