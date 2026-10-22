var e=`topic:prefixsum`,t=`
# Prefix and suffix sums — concept notes

## The mental model

If a question asks about a **contiguous range**, precompute the totals so the range
becomes a subtraction instead of a loop.

\`\`\`
prefix[i] = sum of a[0..i-1]
rangeSum(l, r) = prefix[r + 1] - prefix[l]
\`\`\`

This one idea answers a whole family of problems.

---

## The three shapes

**Prefix only** — everything before \`i\`.

\`\`\`java
long[] prefix = new long[n + 1];
for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i];
\`\`\`

**Suffix only** — everything from \`i\` onwards.

\`\`\`java
long[] suffix = new long[n + 1];
for (int i = n - 1; i >= 0; i--) suffix[i] = suffix[i + 1] + nums[i];
\`\`\`

**Prefix and suffix** — the answer at \`i\` depends on both sides.

\`\`\`java
// Product Except Self (LC 238)
long[] prefix = new long[n + 1], suffix = new long[n + 1];
prefix[0] = 1;
for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] * nums[i];
suffix[n] = 1;
for (int i = n - 1; i >= 0; i--) suffix[i] = suffix[i + 1] * nums[i];
// answer[i] = prefix[i] * suffix[i + 1]
\`\`\`

**Note the \`prefix[0] = 1\` and \`suffix[n] = 1\`** — the identity for multiplication.
Getting those wrong is the classic bug.

**Product Except Self is worth knowing because it is O(n) time and O(1) extra space** if
you build the answer in the output array itself, using it for both the prefix and the
suffix passes.

---

## Prefix sum + hash map — the subarray family

**Subarray Sum Equals K (LC 560):**

\`\`\`java
Map<Long, Integer> counts = new HashMap<>();
counts.put(0L, 1L);
long sum = 0;
int result = 0;
for (int x : nums) {
    sum += x;
    result += counts.getOrDefault(sum - k, 0);
    counts.merge(sum, 1, Integer::sum);
}
return result;
\`\`\`

**The idea:** \`prefix[j] - prefix[i] == k\` ⟺ \`prefix[i] == prefix[j] - k\`. While scanning
the right end \`j\`, count how many earlier prefixes equal \`sum - k\`.

**Why seed the map with \`0 → 1\`:** the empty prefix (before index 0) is a legitimate
starting point. Without it, every subarray beginning at index 0 is missed.

**Why look up before inserting:** otherwise the empty subarray (length 0) would count.

**The variants:**

| Problem | Change |
|---|---|
| Subarray sum equals K | \`counts.get(sum - k)\` |
| Subarray sum **at most** K | Prefix sums + a sorted structure, or a sliding window if all values ≥ 0 |
| Subarray with **odd** number of odd integers | Count prefix parity: \`sum % 2\` |
| **Longest** subarray with sum K | Store the *earliest* index for each prefix; overwrite only on first sight |
| **Contiguous Array (LC 525)** | Same, with \`prefix[i] - prefix[i-1]\` as the state (0 or 1) |
| **Binary subarrays with sum K (LC 930)** | Same, over a 0/1 array |

**The "longest" variant** needs the opposite insert policy:

\`\`\`java
if (!firstIndex.containsKey(sum)) {
    firstIndex.put(sum, i);      // keep the EARLIEST index only
}
\`\`\`

**Say why:** "I want the longest subarray, so for each prefix sum I keep the earliest
index it occurred at — that maximises the distance to any later occurrence."

---

## The difference array

The inverse of prefix sums, and it answers **range update, point query** (and range
update, range query) in O(1) per update.

\`\`\`java
// Add value to every element in [l, r]
diff[l] += value;
diff[r + 1] -= value;
\`\`\`

Then the actual values are recovered by a prefix sum over \`diff\`.

**Why it works:** adding \`value\` at \`l\` starts the effect; subtracting it at \`r + 1\`
stops it.

**When to use it:**
- Many range updates followed by a final array read.
- Many range updates with a final total (just sum \`diff\`).

**A classic problem:** a flight booking system where seats are booked and cancelled in
ranges — apply the bookings as range updates, then take one prefix-sum pass at the end.

---

## The running-state pattern

Sometimes you do not need a prefix array — you just need a **running value** as you
scan.

**Kadane (maximum subarray):**

\`\`\`java
int current = nums[0], best = nums[0];
for (int i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    best = Math.max(best, current);
}
\`\`\`

**Pivot index (LC 724)** — the split point where the left sum equals the right sum:

\`\`\`java
int total = 0;
for (int x : nums) total += x;
int leftSum = 0;
for (int i = 0; i < nums.length; i++) {
    leftSum += nums[i];
    if (leftSum == total - leftSum) return i;
}
return -1;
\`\`\`

**Gas Station (LC 134)** — the same running-total idea, with a greedy argument.

**Running sum (LC 1480)** — the prefix sums *are* the answer.

**Maximum product subarray (LC 152)** — track the running max **and** min product,
because a negative flips them.

\`\`\`java
int maxHere = nums[0], minHere = nums[0], best = nums[0];
for (int i = 1; i < nums.length; i++) {
    int x = nums[i];
    int tempMax = Math.max(x, Math.max(maxHere * x, minHere * x));
    int tempMin = Math.min(x, Math.min(maxHere * x, minHere * x));
    maxHere = tempMax;
    minHere = tempMin;
    best = Math.max(best, maxHere);
}
\`\`\`

**The \`tempMax\`/\`tempMin\` temporaries are essential** — you must compute both before
updating either, or you corrupt the state.

---

## The 2D prefix sum

\`\`\`java
// prefix[i][j] = sum of the rectangle (0,0) to (i-1, j-1)
prefix[i + 1][j + 1] = nums[i][j] + prefix[i][j + 1] + prefix[i + 1][j] - prefix[i][j];
\`\`\`

**Then any rectangle sum is:**

\`\`\`
sum(r1, c1, r2, c2) = prefix[r2+1][c2+1] - prefix[r1][c2+1] - prefix[r2+1][c1] + prefix[r1][c1]
\`\`\`

**The \`+ prefix[i][j]\` term** is the inclusion-exclusion correction — it subtracts the
overlapping region twice, so you add it back once.

**The 2D version of "subarray sum equals K"** follows the same shape: a map from
prefix-sum value to count.

---

## When NOT to use prefix sums

| Situation | Use instead |
|---|---|
| The range is not contiguous | A Fenwick tree or a segment tree |
| You need the max/min of a range | A sparse table or a segment tree |
| The array is updated frequently | A Fenwick tree |
| The values are strings | A rolling hash, or the double-hash trick |
| There is only one query | Just do it directly — O(n) is fine |

**Prefix sums are for static arrays with many range queries.** If the array changes, the
prefix sums go stale.

**For dynamic range sums, a Fenwick tree (Binary Indexed Tree)** gives O(log n) updates
and queries. It is a natural follow-up question and worth knowing.

---

## Common traps

| Trap | Why it bites |
|---|---|
| Forgetting \`prefix[0] = 0\` | Everything shifts |
| Off-by-one in the range formula | \`prefix[r+1] - prefix[l]\`, not \`prefix[r] - prefix[l]\` |
| Forgetting \`prefix[0] = 1\` for products | The identity element for multiplication |
| Seeding the hash map with \`0 → 1\` incorrectly | Missing or extra subarrays |
| Inserting into the map before looking up | You count the empty subarray |
| Overwriting the earliest index in the "longest" variant | You lose the longest subarray |
| Using \`int\` for prefix sums that can overflow | Use \`long\` |
| The 2D inclusion-exclusion sign | \`+ - - +\` in that order |

---

## Complexity cheat sheet

| Problem | Time | Space |
|---|---|---|
| Prefix sum build | O(n) | O(n) |
| Range sum query | O(1) | — |
| Subarray sum equals K | O(n) | O(n) |
| Longest subarray with sum K | O(n) | O(n) |
| Difference array, many range updates | O(n + m) | O(n) |
| 2D prefix sum build | O(rows × cols) | O(rows × cols) |
| 2D range sum query | O(1) | — |
| Kadane | O(n) | O(1) |
| Gas station | O(n) | O(1) |

---

## How to crack it in an interview

1. **Say what you are precomputing.** "A prefix array where \`prefix[i]\` is the sum of the
   first \`i\` elements."
2. **State the range formula** and show the cancellation: "the sum of \`[l..r]\` is
   \`prefix[r+1] - prefix[l]\`, because the terms before \`l\` cancel."
3. **For the hash-map variant, say why you seed \`0 → 1\`.**
4. **Say whether you need \`long\`.** Prefix sums overflow fast.
5. **Mention the alternative** — a Fenwick tree if the array is dynamic, or a sliding
   window if all values are non-negative and the constraint is a sum.
`,n={id:e,body:t};export{t as body,n as default,e as id};