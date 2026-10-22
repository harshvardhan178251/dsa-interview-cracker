var e=`topic:dynamicprogramming`,t=`
# Dynamic programming — concept notes

## The mental model

**Dynamic programming is memoisation with a better argument.** A problem is DP when:

1. It can be broken into **overlapping subproblems**.
2. Each subproblem is computed **many times** naively.
3. The subproblems have a **dependency structure** (a DAG — you can order the
   computation).

**The one-line test:** if you can define \`dp[i]\` as "the answer for the first i
elements", you are halfway there.

---

## The four questions

**Fill these in on paper, out loud, before writing any code.** If you cannot answer 1
and 2, you do not understand the problem yet — no matter how many DP solutions you have
memorised.

\`\`\`
1. STATE      — what does dp[i] mean, in one sentence?
2. TRANSITION — how do I compute it from smaller subproblems?
3. BASE CASE  — what is dp[0]?
4. ORDER      — do I fill the table forwards, backwards, or by length?
\`\`\`

**The state definition is the hard part.** A wrong state makes the transition
impossible to write. Give yourself time on question 1.

---

## Memoisation vs tabulation

| | Top-down (memoisation) | Bottom-up (tabulation) |
|---|---|---|
| Style | Recursive, with a cache | Iterative, filling a table |
| Starts from | The answer, recursing down | The base cases, building up |
| Code | Shorter, closer to the recursion | Often clearer, no stack risk |
| Computes | Only the states you need | **All** states |
| Stack | O(n) depth — can overflow | None |

**Top-down is easier to write.** The recursion *is* the definition, and the cache is
bolted on.

\`\`\`java
public static int climbStairs(int n) {
    int[] memo = new int[n + 1];
    Arrays.fill(memo, -1);
    return climb(n, memo);
}

private static int climb(int n, int[] memo) {
    if (n <= 2) return n;
    if (memo[n] != -1) return memo[n];
    return memo[n] = climb(n - 1, memo) + climb(n - 2, memo);
}
\`\`\`

**Bottom-up is usually what you want to write in an interview**, because the interviewer
can see the table and verify it.

\`\`\`java
public static int climbStairs(int n) {
    if (n <= 2) return n;
    int prev2 = 1, prev1 = 2;
    for (int i = 3; i <= n; i++) {
        int current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    return prev1;
}
\`\`\`

**Say both:** "top-down is more intuitive; I'll write it bottom-up so the space is O(1)
and there is no recursion depth risk."

---

## The DP patterns

Most DP problems are one of six shapes. Recognising the shape is the skill.

### 1. Linear DP — \`dp[i]\` depends on \`dp[i-1]\`, \`dp[i-2]\`, …

**Climbing Stairs, House Robber, Fibonacci, Best Time to Buy and Sell.**

\`\`\`java
// House Robber — dp[i] = max(dp[i-1], dp[i-2] + nums[i])
int prev2 = 0, prev1 = 0;
for (int x : nums) {
    int current = Math.max(prev1, prev2 + x);
    prev2 = prev1;
    prev1 = current;
}
return prev1;
\`\`\`

**The two-variable optimisation:** if \`dp[i]\` only depends on the last two values, keep
only two variables. O(n) time, O(1) space.

### 2. Knapsack — \`dp[i][w]\` = the best value using the first i items with capacity w

\`\`\`java
// 0/1 knapsack — iterate capacity DOWNWARDS
for (int i = 0; i < items.length; i++) {
    for (int w = capacity; w >= items[i].weight; w--) {
        dp[w] = Math.max(dp[w], dp[w - items[i].weight] + items[i].value);
    }
}
\`\`\`

**The loop direction is the whole trick.** Iterate capacity **downwards** for 0/1
knapsack (each item used at most once) and **upwards** for unbounded knapsack (each item
reusable).

**Getting this backwards is the single most common DP bug.** If you iterate upwards for
0/1 knapsack, you can use the same item multiple times.

**Coin Change (LC 322)** is unbounded knapsack — the number of coins, minimised:

\`\`\`java
// dp[amount] = the fewest coins to make amount
int[] dp = new int[amount + 1];
Arrays.fill(dp, amount + 1);          // "unreachable" sentinel
dp[0] = 0;
for (int a = 1; a <= amount; a++) {
    for (int coin : coins) {
        if (coin <= a && dp[a - coin] + 1 < dp[a]) {
            dp[a] = dp[a - coin] + 1;
        }
    }
}
\`\`\`

**Coin Change II (LC 518)** — the number of combinations, not the minimum count. The
loop order swaps: **coins outer, amounts inner.**

\`\`\`java
for (int coin : coins) {
    for (int a = coin; a <= amount; a++) {
        dp[a] += dp[a - coin];
    }
}
\`\`\`

**That swap is the entire difference between the two problems.** Swapping the loops
counts *permutations* instead of *combinations*. Say it explicitly.

### 3. Two-dimensional DP — \`dp[i][j]\`

**Grid paths, LCS, edit distance.**

**Unique Paths (LC 62):**

\`\`\`java
int[][] dp = new int[m][n];
for (int i = 0; i < m; i++) {
    for (int j = 0; j < n; j++) {
        if (i == 0 || j == 0) dp[i][j] = 1;
        else dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
}
\`\`\`

**The 1-D optimisation:** since each row only depends on the previous row, you can use a
single array:

\`\`\`java
int[] dp = new int[n];
Arrays.fill(dp, 1);
for (int i = 1; i < m; i++) {
    for (int j = 1; j < n; j++) {
        dp[j] += dp[j - 1];
    }
}
\`\`\`

**Say this:** "since \`dp[i][j]\` only depends on \`dp[i-1][j]\` and \`dp[i][j-1]\`, I can
compress the table to one row." That shows you understand the dependency structure.

### 4. Longest increasing subsequence — \`dp[i]\` = the longest increasing subsequence
**ending at i**

\`\`\`java
int[] dp = new int[n];
Arrays.fill(dp, 1);
int best = 1;
for (int i = 1; i < n; i++) {
    for (int j = 0; j < i; j++) {
        if (nums[j] < nums[i]) {
            dp[i] = Math.max(dp[i], dp[j] + 1);
        }
    }
    best = Math.max(best, dp[i]);
}
\`\`\`

**O(n²)** — the straightforward version. The **O(n log n)** version uses a "tails" array
with binary search:

\`\`\`java
int[] tails = new int[n];
int size = 0;
for (int x : nums) {
    int index = Arrays.binarySearch(tails, 0, size, x);
    if (index < 0) index = -(index + 1);
    tails[index] = x;
    if (index == size) size++;
}
return size;
\`\`\`

**\`tails[i]\` is the smallest possible tail value of an increasing subsequence of length
\`i + 1\`.** That is a subtle state definition — explain it carefully if you use it.

**Mention both.** The O(n²) version is safe; the O(n log n) version is what a strong
candidate offers.

### 5. Interval DP — \`dp[i][j]\` = the answer for the subproblem between i and j

**Burst Balloons (LC 312), Matrix Chain Multiplication, Edit Distance (one form).**

\`\`\`java
// Burst Balloons
for (int length = 2; length <= n; length++) {
    for (int left = 0; left + length <= n; left++) {
        int right = left + length - 1;
        for (int k = left; k <= right; k++) {
            dp[left][right] = Math.max(dp[left][right],
                dp[left][k-1] + nums[k] * nums[left-1] * nums[right+1] + dp[k+1][right]);
        }
    }
}
\`\`\`

**The loop order: by length.** Interval DP must be filled in increasing interval size,
because \`dp[left][right]\` depends on strictly smaller intervals.

**Say: "I'll fill the table by increasing interval length, because each entry depends on
strictly smaller intervals."**

### 6. State-compression DP — a bitmask over a small set

**Travelling salesman, assignment problem.**

\`\`\`java
// dp[mask] = the minimum cost to visit the set of cities in mask
int[] dp = new int[1 << n];
Arrays.fill(dp, Integer.MAX_VALUE);
dp[0] = 0;
for (int mask = 0; mask < (1 << n); mask++) {
    for (int city = 0; city < n; city++) {
        if ((mask & (1 << city)) == 0) continue;
        int nextMask = mask | (1 << city);
        dp[nextMask] = Math.min(dp[nextMask], dp[mask] + cost[last][city]);
    }
}
\`\`\`

**The bitmask trick:** \`(1 << n)\` states, so this is exponential and only viable for
n ≤ ~20.

---

## The DP traps

| Trap | Why it bites |
|---|---|
| The wrong state definition | The transition becomes impossible to write |
| Wrong loop order in knapsack | You reuse items |
| Swapping the loops in Coin Change II | You count permutations |
| Uninitialised DP entries | Wrong answers — initialise with a sentinel or a valid base |
| Integer overflow | Use \`long\` for counts |
| Off-by-one in the base case | \`dp[0]\` is usually special |
| Forgetting the "unreachable" sentinel in Coin Change | \`Integer.MAX_VALUE + 1\` overflows |
| 2-D DP with the wrong row/column meaning | Silent wrongness |
| Not optimising space when the interviewer asks for it | Missed follow-up |

---

## Space optimisation

**When the interviewer says "can you do it in O(1) space?", look at the dependency:**

| \`dp[i]\` depends on | You can keep |
|---|---|
| \`dp[i-1]\` only | 1 variable |
| \`dp[i-1]\`, \`dp[i-2]\` | 2 variables |
| \`dp[i-1][j]\`, \`dp[i][j-1]\` | 1 row (update left to right) |
| \`dp[i-1][j]\`, \`dp[i][j-1]\`, \`dp[i-1][j-1]\` | 1 row, with a saved diagonal |

**The diagonal trick** for LCS and edit distance:

\`\`\`java
int[] dp = new int[n + 1];
for (int i = 1; i <= m; i++) {
    int diagonal = 0;
    for (int j = 1; j <= n; j++) {
        int saved = dp[j];
        if (a[i-1] == b[j-1]) dp[j] = diagonal + 1;
        else dp[j] = Math.max(dp[j], dp[j-1]);
        diagonal = saved;
    }
}
\`\`\`

**Say why it works:** "the old \`dp[j]\` is \`dp[i-1][j]\`, the new \`dp[j-1]\` is \`dp[i][j-1]\`,
and \`diagonal\` holds the previous \`dp[i-1][j-1]\`."

---

## Complexity cheat sheet

| Problem | Time | Space |
|---|---|---|
| Fibonacci | O(n) | O(1) optimised |
| House Robber | O(n) | O(1) optimised |
| Coin Change | O(amount × coins) | O(amount) |
| Coin Change II | O(amount × coins) | O(amount) |
| 0/1 Knapsack | O(items × capacity) | O(capacity) |
| LIS (quadratic) | O(n²) | O(n) |
| LIS (with binary search) | O(n log n) | O(n) |
| LCS | O(m × n) | O(min(m,n)) optimised |
| Edit Distance | O(m × n) | O(min(m,n)) optimised |
| Grid paths | O(m × n) | O(min(m,n)) optimised |
| Interval DP | O(n³) | O(n²) |
| Bitmask DP | O(n² · 2ⁿ) | O(2ⁿ) |

---

## How to crack it in an interview

1. **Say the state definition out loud** before writing anything. "dp[i] is the maximum
   amount I can rob from the first i houses."
2. **Say the transition.** "Either I rob house i, so I add nums[i] to dp[i-2], or I skip
   it, so I take dp[i-1]."
3. **State the base case** and the answer.
4. **Say the loop order** and why — especially for knapsack.
5. **State the complexity**, then offer the space optimisation.
6. **If you are stuck, work a small example by hand** and watch what varies. That is how
   you discover the state.
7. **Name the pattern**: "this is a 0/1 knapsack — the loop over capacity must go
   downwards".
`,n={id:e,body:t};export{t as body,n as default,e as id};