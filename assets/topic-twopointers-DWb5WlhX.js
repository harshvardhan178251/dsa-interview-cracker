var e=`topic:twopointers`,t=`
# Two pointers — concept notes

## The mental model

Two indices moving through the same array. There are only two shapes, and choosing
between them is the whole skill.

**Shape A — moving toward each other:**

\`\`\`
[0] → → → → [n-1]
        ← ← ← ←
\`\`\`

Used when the answer is a **pair** and the property is monotone in both indices.

**Shape B — both moving the same way:**

\`\`\`
[0] → → → → [n-1]
   [1] → → → →
\`\`\`

Used for partitioning, removal, and window-like problems.

**Shape C — one fixed, one moving** (the sliding window):

\`\`\`
[0] → → → → [n-1]
   ↑ fixed
\`\`\`

---

## The three questions

When you see a problem and think "two pointers", ask:

1. **Is the input sorted (or can it be sorted)?** If not, two pointers rarely work.
2. **What is monotone?** What property lets you discard a candidate permanently?
3. **Do I need the pair itself, or a count, or an index?**

**The monotonicity argument is the heart of it.** Without it, the two-pointer technique
is just a guess.

---

## Shape A — pointers moving toward each other

**Two Sum II (LC 167)** — the sorted-input version:

\`\`\`java
int left = 0, right = nums.length - 1;
while (left < right) {
    int sum = nums[left] + nums[right];
    if (sum == target) return new int[]{left, right};
    if (sum < target) left++;      // the sum is too small → need a bigger left value
    else right--;                  // the sum is too big → need a smaller right value
}
\`\`\`

**Why is this correct?** Because the array is sorted:
- If \`sum < target\`, then \`nums[left] + nums[right]\` is too small. Since \`nums[right]\` is
  the **largest** remaining value, pairing \`nums[left]\` with anything else would be even
  smaller. So \`nums[left]\` can be discarded — move \`left\` right.
- If \`sum > target\`, symmetric: \`nums[right]\` cannot pair with anything remaining, so move
  \`right\` left.

**Each step permanently eliminates one candidate**, so the algorithm is O(n).

**Say this elimination argument out loud.** It is the proof.

### The classic applications

| Problem | The monotone property |
|---|---|
| Two Sum II (167) | Sorted — a bigger left value is needed for a bigger sum |
| 3Sum (15) | Same, nested with a third pointer |
| 3Sum Closest (16) | Same |
| Container With Most Water (11) | Area = min(h) × width; moving the shorter wall is the only way to improve |
| Squares of a Sorted Array (977) | The largest square is at one of the ends |
| Valid Palindrome (125) | Mismatched pairs tell you which end to move |

**Container With Most Water** deserves the full argument:

\`\`\`java
int left = 0, right = height.length - 1, best = 0;
while (left < right) {
    best = Math.max(best, Math.min(height[left], height[right]) * (right - left));
    if (height[left] < height[right]) left++;
    else right--;
}
\`\`\`

**Why move the shorter wall?** The area is limited by the shorter wall. If you keep the
shorter wall and move the other, the width shrinks and the height cannot exceed the
shorter wall — so the area can only get worse. Therefore the shorter wall must move.
**This is a proper exchange argument** and it is exactly what interviewers want to hear.

---

## 3Sum (LC 15) — two pointers plus a fixed first element

\`\`\`java
for (int i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] == nums[i - 1]) continue;    // skip duplicate first elements
    int left = i + 1, right = nums.length - 1;
    while (left < right) {
        int sum = nums[i] + nums[left] + nums[right];
        if (sum == 0) {
            result.add(List.of(nums[i], nums[left], nums[right]));
            while (left < right && nums[left] == nums[left + 1]) left++;   // skip duplicates
            while (left < right && nums[right] == nums[right - 1]) right--;
            left++;
            right--;
        } else if (sum < 0) {
            left++;
        } else {
            right--;
        }
    }
}
\`\`\`

**Three layers of duplicate skipping.** This is where 3Sum solutions usually go wrong:

1. Skip duplicate \`nums[i]\` — the same first element would produce the same triples.
2. After finding a triple, skip duplicate \`nums[left]\`.
3. Skip duplicate \`nums[right]\`.

**Without the skip in step 1, the output contains duplicate triples** — and LeetCode
rejects that.

**Complexity:** O(n²) — n first elements, each with an O(n) two-pointer scan.

---

## Shape B — both pointers moving forward

**Remove Duplicates (LC 26)** — the write-pointer technique (see the
[array notes](./01-arrays.md)):

\`\`\`java
int write = 0;
for (int read = 0; read < nums.length; read++) {
    if (write == 0 || nums[write - 1] != nums[read]) {
        nums[write++] = nums[read];
    }
}
return write;
\`\`\`

**Remove Duplicates II (LC 80)** — allow at most two copies:

\`\`\`java
int write = 0;
for (int read = 0; read < nums.length; read++) {
    if (write < 2 || nums[write - 2] != nums[read]) {
        nums[write++] = nums[read];
    }
}
\`\`\`

**The \`write < 2\` guard** handles the "at most two copies" rule directly: you may always
write the first two, and after that you can only write if the value differs from what is
two positions back.

**Move Zeroes (LC 283)** — the classic write-pointer:

\`\`\`java
int write = 0;
for (int read = 0; read < nums.length; read++) {
    if (nums[read] != 0) {
        swap(nums, write++, read);
    }
}
\`\`\`

**Note: \`swap\`, not \`nums[write++] = nums[read]\`.** Moving zeroes preserves the *relative
order* of the non-zero elements, which the problem requires. A plain copy would not.

---

## Shape C — the fixed left, moving right

**Squares of a Sorted Array (LC 977)**:

\`\`\`java
int[] result = new int[nums.length];
int left = 0, right = n - 1;
for (int i = n - 1; i >= 0; i--) {
    int a = nums[left] * nums[left];
    int b = nums[right] * nums[right];
    if (a > b) { result[i] = a; left++; }
    else       { result[i] = b; right--; }
}
\`\`\`

**Fill from the back.** The largest square must go at the end of the result, and the
largest square comes from whichever end has the larger absolute value. So the two
pointers move **toward each other**, and the *output* is filled from the right.

**That is the trick worth explaining:** two pointers converging, output filled backwards.

---

## The comparison between two pointers and a hash map

**Two Sum (LC 1)** — the unsorted version:

\`\`\`java
Map<Integer, Integer> seen = new HashMap<>();
for (int i = 0; i < nums.length; i++) {
    Integer j = seen.get(target - nums[i]);
    if (j != null) return new int[]{j, i};
    seen.put(nums[i], i);
}
\`\`\`

| | Hash map | Two pointers |
|---|---|---|
| Requires sorted input | No | **Yes** |
| Time | O(n) | O(n) |
| Extra space | O(n) | O(1) |
| Finds all pairs | Yes | Needs care with duplicates |

**The follow-up question — "can you do it in O(1) space?" — is exactly this comparison.**
The answer: sort first (O(n log n)), then two pointers, then map the sorted indices back
to the original positions.

**Always mention this in the interview.** "If you need O(1) extra space, I can sort the
array and use two pointers — the sort is O(n log n) but the scan is O(1) space. The
trade-off is time for space."

---

## When to use two pointers vs a hash map

\`\`\`
Is the array sorted or sortable?
├─ Yes, and you need a PAIR and can afford O(n log n)
│  → two pointers (O(1) space)
├─ Yes, and you need a PAIR and cannot afford the sort
│  → hash map (O(n))
├─ No, and you need to preserve order
│  → hash map
└─ The property is monotone even without sorting (e.g. "is this subarray valid")
   → sliding window
\`\`\`

---

## Common traps

| Trap | Why it bites |
|---|---|
| Forgetting to skip duplicates in 3Sum | Duplicate triples in the output |
| Using \`left < right\` vs \`left <= right\` | Off by one; for a pair you need \`<\` |
| Moving the wrong pointer in Container With Most Water | You get the wrong maximum |
| Swapping when you should be copying (Move Zeroes) | Relative order is lost |
| Assuming the array is sorted when it is not | Wrong answers |
| Not stating the monotonicity argument | The interviewer cannot verify your reasoning |
| Off-by-one on the write pointer | Elements lost or duplicated |
| Using \`Arrays.sort\` and losing the original indices | The answer no longer matches the input order |

---

## Complexity cheat sheet

| Technique | Time | Space |
|---|---|---|
| Two pointers, converging | O(n) | O(1) |
| Two pointers + a fixed outer loop (3Sum) | O(n²) | O(1) |
| Write pointer (removal) | O(n) | O(1) |
| Hash map one-pass (Two Sum) | O(n) | O(n) |
| Sorting then two pointers | O(n log n) | O(1) |

---

## How to crack it in an interview

1. **Check sortedness first.** "Is the array sorted?" or "may I sort it?"
2. **State the monotonicity.** "If the sum is too small, then \`nums[left]\` cannot pair
   with any remaining element, because \`nums[right]\` is the largest of them." That single
   sentence is the proof.
3. **Say which direction each pointer moves and why.** The interviewer is checking your
   reasoning, not just the code.
4. **Handle duplicates explicitly** and say so.
5. **Mention the space/time trade-off** against the hash map solution — it is the
   standard follow-up.
6. **Trace it** with the pointers marked.
`,n={id:e,body:t};export{t as body,n as default,e as id};