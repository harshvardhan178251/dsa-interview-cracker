var e=`topic:greedy`,t=`
# Greedy — concept notes

## The mental model

A greedy algorithm makes the **locally optimal** choice at each step and never
reconsiders it.

**The difference from DP:** DP considers all options and keeps the best; greedy commits
to one option and moves on. Greedy is O(n) where DP is often O(n²) — but greedy is only
correct when the problem has a specific structure.

---

## The three questions for any greedy problem

\`\`\`
1. WHAT is the local choice?
2. WHY is it optimal?        ← the exchange argument
3. WHAT is the state you maintain to make the choice?
\`\`\`

**Question 2 is the entire interview.** A greedy solution without an exchange argument
is a guess.

---

## The exchange argument

**The proof pattern:** suppose there is an optimal solution \`OPT\` that does not make your
greedy choice \`g\` at some step. Show that you can modify \`OPT\` to make \`g\` without
making it worse. Then \`OPT\` was not optimal, or \`g\` was also optimal — so the greedy
choice is safe.

**Verbalised:** "At any step, I take the cheapest remaining interval. If an optimal
solution took a more expensive one instead, swapping them for mine cannot increase the
total, because mine covers at least as much at a lower price. So there is always an
optimal solution that makes my choice."

**You do not need a formal proof.** You need a convincing one-sentence exchange
argument.

---

## The four shapes where greedy works

### 1. Scheduling — sort by the value that determines the ordering

**Jump Game II (LC 45):**

\`\`\`java
int jumps = 0, currentEnd = 0, farthest = 0;
for (int i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    if (i == currentEnd) {
        jumps++;
        currentEnd = farthest;
    }
}
return jumps;
\`\`\`

**The greedy insight:** rather than choosing *which* position to jump to, track the
**farthest reachable position** from the current range. Every time you exhaust the
current range, you must take one more jump.

**The exchange argument:** "the farthest reachable position after \`k\` jumps is the best
possible boundary for \`k\` jumps — no other choice of intermediate positions gets you
further. So greedily expanding to the farthest reachable point after each jump is
optimal."

**Greedy fails here:** "Jump Game III (LC 1306)" — that is BFS.

**Gas Station (LC 134):**

\`\`\`java
int total = 0, tank = 0, start = 0;
for (int i = 0; i < gas.length; i++) {
    total += gas[i] - cost[i];
    tank += gas[i] - cost[i];
    if (tank < 0) { start = i + 1; tank = 0; }
}
return total >= 0 ? start : -1;
\`\`\`

**The insight:** if the tank goes negative at index \`i\`, then **no** station from the
current start through \`i\` can be a valid start — the net from that start to \`i\` is
negative. So skip them all.

**The exchange argument:** "if the cumulative sum from \`start\` to \`i\` is negative, then
starting anywhere in \`[start..i]\` also gives a negative cumulative sum at \`i\`, so none
of them works. The next candidate is \`i + 1\`."

### 2. Interval scheduling — sort by the end time

**Non-overlapping intervals (LC 435):**

\`\`\`java
Arrays.sort(intervals, Comparator.comparingInt(i -> i.end));
int count = 0, end = Integer.MIN_VALUE;
for (int[] interval : intervals) {
    if (interval.start >= end) {
        count++;
        end = interval.end;
    }
}
\`\`\`

**The greedy insight:** always pick the interval that **finishes earliest**, leaving the
most room for the rest.

**The exchange argument:** "take any optimal solution. Its first interval \`I\` ends no
earlier than the earliest-ending interval \`G\`. Replacing \`I\` with \`G\` leaves at least as
much room for everything after, so the rest of the solution still fits. Therefore
choosing \`G\` is safe."

**The sort key is the whole problem.** Sorting by start time gives the wrong answer.

**Activity selection (the maximum number of non-overlapping intervals) is the same
problem.**

### 3. Greedy with a heap — always take from the most constrained resource

**Hand of Straights (LC 846):**

\`\`\`java
int[] count = new int[5];
for (int card : hand) count[card]++;
for (int i = 0; i < 5; i++) {
    if (count[i] == 0) return false;
    count[i]--;
}
for (int start = 1; start < 5; start++) {
    for (int card = start; card < start + 5; card++) {
        if (count[card] == 0) return false;
        count[card]--;
    }
}
\`\`\`

**The insight:** always form the straights starting from the **smallest** card you have.
A straight starting from a small card is the hardest to complete later.

**The exchange argument:** "if I have a 1, it must start a straight — no other straight
uses it. So I place it first. Same logic cascades."

**Reorganize String (LC 358), Task Scheduler (LC 621), Employee Free Day (LC 1497)** are
all the same shape.

### 4. Local optimisation with an invariant — candy, assign cookies

**Candy (LC 135):**

\`\`\`java
int[] candies = new int[n];
for (int i = 0; i < n; i++) candies[i] = 1;
for (int i = 1; i < n; i++) {
    if (ratings[i] > ratings[i-1]) candies[i] = candies[i-1] + 1;
}
for (int i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i+1]) candies[i] = Math.max(candies[i], candies[i+1] + 1);
}
\`\`\`

**The insight:** satisfy the constraints in both directions — left-to-right for the
left neighbour, right-to-left for the right neighbour.

**Assign Cookies (LC 455):**

\`\`\`java
Arrays.sort(g, g.length);       // greed
Arrays.sort(s, s.length);       // children
int child = 0;
for (int greedSize : g) {
    if (child < s.length && s[child] >= greedSize) child++;
}
return child;
\`\`\`

**The insight:** always satisfy the **smallest** child first with the smallest greedy
that fits.

**The exchange argument:** "if the smallest greedy could not satisfy the smallest
child, it cannot satisfy anyone. If it could, giving it to the smallest child leaves
the larger greedies for the larger children, which is always at least as good."

---

## Greedy vs DP — when to use which

| Use greedy when | Use DP when |
|---|---|
| The problem has a **matroid** or exchange structure | Choices genuinely interact |
| There is a **local** rule that is provably safe | You cannot prove a local rule is safe |
| You need the **value**, not the count of solutions | You need to count or enumerate |
| The state is simple (one counter) | The state is a whole table |

**The test:** try the greedy solution on small cases and look for a counterexample. If
you cannot find one after a few tries, and you can articulate the exchange argument, it
is probably right.

**Common greedy traps:**
- Sorting by the wrong key (by start instead of by end).
- Greedy on a problem that needs DP — the classic is the coin change where greedy fails
  (coins 1, 3, 4 and amount 6: greedy gives 4+1+1, but 3+3 is optimal).
- Forgetting that the greedy must be applied **after** sorting.

**Say the counterexample if you suspect DP.** "Greedy would take the 4 first, leaving 2,
which cannot be made — so greedy fails here and I need DP." That is a strong answer.

---

## The greedy proof, in three templates

**Template 1 — the exchange argument:**
> "In an optimal solution, suppose step \`i\` takes \`y\` instead of my \`x\`. Since \`x ≤ y\`
> (or x covers at least as much), swapping \`x\` in does not increase the cost. So an
> optimal solution exists that makes my choice."

**Template 2 — the stays-ahead argument:**
> "After \`k\` of my steps, I am at least as far along as any other solution after \`k\`
> steps. By induction, my solution is never behind, so it finishes no later."

**Template 3 — the counting argument:**
> "Any solution needs at least \`m\` of something (e.g. at least one break between
> different tasks). My construction uses exactly \`m\`. So it is optimal."

---

## Common traps

| Trap | Why it bites |
|---|---|
| Sorting by the wrong key | The greedy choice is wrong |
| Not sorting at all | The local choice is not the globally best one |
| Greedy on a coin-change-like problem | Greedy is not always optimal |
| Forgetting to handle the empty/single case | Off-by-one |
| Not stating the exchange argument | The interviewer cannot tell it is correct |
| Assuming "always take the largest" works | It does not in general |
| Modifying the input while iterating | Concurrent modification |

---

## Complexity cheat sheet

| Greedy type | Time | Space |
|---|---|---|
| Sorting + one pass | O(n log n) | O(1) or O(n) for the sort |
| Counting + one pass | O(n + k) | O(k) |
| Heap-based | O(n log n) | O(n) |
| Two-pointer | O(n) | O(1) |
| O(n²) scan (Candy) | O(n) | O(n) |

---

## How to crack it in an interview

1. **State the local choice** in one clear sentence. "I always pick the interval that
   ends earliest."
2. **Give the exchange argument.** This is the part that earns the hire.
3. **Say what you sort by and why.** The sort key is the design.
4. **If you suspect DP, say so** — and give the counterexample that proves greedy fails.
5. **Mention the heap variant** when there are multiple resource types (task scheduling).
6. **Trace the choices**, not just the answer.
`,n={id:e,body:t};export{t as body,n as default,e as id};