var e=`topic:backtracking`,t=`
# Backtracking — concept notes

## The mental model

Backtracking is **DFS over a decision tree**, where you undo your choices as you return.

\`\`\`
choose a candidate
├── explore it (recurse)
└── undo it (backtrack)
\`\`\`

**The three-line template:**

\`\`\`java
private void backtrack(State state, List<Choice> path) {
    if (isComplete(state)) {
        result.add(new ArrayList<>(path));     // copy the path!
        return;
    }
    for (Choice choice : candidates(state)) {
        makeChoice(choice);                    // choose
        backtrack(state, path);               // explore
        undoChoice(choice);                   // undo
    }
}
\`\`\`

**Everything else is a variation of this.**

---

## The template in detail

**1. The state** — what is fixed for the whole subtree? (the prefix of the path, the
board, the remaining elements).

**2. The candidates** — what are the legal next choices *given the current state*?

**3. The completeness check** — is this a valid complete solution?

**4. The choose/undo pair** — it must be perfectly symmetric. **A missing undo is the
classic bug**, and it produces wrong answers that look almost right.

### The most common bug

\`\`\`java
// BUG: forgetting to undo
for (int i = start; i < nums.length; i++) {
    path.add(nums[i]);
    backtrack(nums, i + 1, path);
    // no path.remove(path.size() - 1);
}
\`\`\`

**And the second most common:** adding \`path\` to the result without copying it.

\`\`\`java
result.add(path);          // BUG — every entry is the same list
result.add(new ArrayList<>(path));   // correct
\`\`\`

---

## Subsets vs combinations vs permutations

| Problem | The set of candidates | The constraint |
|---|---|---|
| **Subsets** (LC 78) | All remaining elements | Each element used at most once, order does not matter |
| **Combinations** (LC 39) | All remaining elements | Each element used at most once, order does not matter, fixed size |
| **Permutations** (LC 46) | All remaining elements | Each element used at most once, order matters |
| **Combinations with repetition** (LC 39) | All elements, from \`start\` | Elements can repeat |
| **Permutations with repetition** (LC 47) | All elements | Elements can repeat, order matters |

**The single parameter that changes everything is the start index.**

\`\`\`java
// Subsets — each element at most once
for (int i = start; i < nums.length; i++) {
    path.add(nums[i]);
    backtrack(nums, i + 1, path);      // i + 1 → cannot reuse
    path.remove(path.size() - 1);
}

// Combinations with repetition — elements can repeat
for (int i = start; i < nums.length; i++) {
    path.add(nums[i]);
    backtrack(nums, i, path);          // i → can reuse
    path.remove(path.size() - 1);
}
\`\`\`

**That one-character difference is the whole distinction.** Say it out loud.

### Avoiding duplicates

**Subsets II / Permutations II / Combination Sum II** — when the input has duplicates,
sort it first and skip equal candidates at the same level:

\`\`\`java
Arrays.sort(nums);
for (int i = start; i < nums.length; i++) {
    if (i > start && nums[i] == nums[i - 1]) continue;   // skip duplicates at this level
    ...
}
\`\`\`

**The condition \`i > start\` is crucial.** It means duplicates are only skipped *within
the same recursion level* — the same element may still be chosen again deeper, which is
correct.

**Getting \`i > start\` wrong (writing \`i > 0\`) loses valid combinations.** This is the
single most common bug in duplicate-handling backtracking.

---

## The decision-tree view

**For each problem, draw the tree and label the branches.** This makes everything else
mechanical.

**Subsets of [1, 2, 3]:**

\`\`\`
                    []
                /    |    \\
             [1]    [2]    [3]
            / | \\   / | \\   / | \\
         [1,2] [1,3] [1,2,3]  [2,3]  ...
\`\`\`

**The pruning rule for subsets:** to avoid duplicates, only extend with elements
**after** the last chosen one. That is the \`start\` index.

---

## Grid and board problems

**Word Search (LC 79)** — the grid DFS:

\`\`\`java
private static boolean dfs(char[][] board, String word, int r, int c, int index) {
    if (r < 0 || r >= board.length || c < 0 || c >= board[0].length) return false;
    if (board[r][c] != word.charAt(index)) return false;
    if (index == word.length() - 1) return true;

    char saved = board[r][c];
    board[r][c] = '#';                 // mark visited

    boolean found = dfs(board, word, r + 1, c, index + 1)
                 || dfs(board, word, r - 1, c, index + 1)
                 || dfs(board, word, r, c + 1, index + 1)
                 || dfs(board, word, r, c - 1, index + 1);

    board[r][c] = saved;               // restore
    return found;
}
\`\`\`

**The mark-and-restore pattern.** \`board[r][c] = '#'\` prevents reusing the cell;
restoring it afterwards is what allows other paths to use it.

**The order of the base cases matters:** bounds check, then character match, then the
"last character" check.

---

## N-Queens (LC 51)

**The constraint set:**

1. One queen per row.
2. No two queens in the same column.
3. No two queens in the same diagonal (both directions).

\`\`\`java
private static boolean solve(int row, int[] queens, int n) {
    if (row == n) return true;
    for (int col = 0; col < n; col++) {
        if (isSafe(row, col, queens)) {
            queens[row] = col;
            if (solve(row + 1, queens, n)) return true;
            queens[row] = -1;              // undo
        }
    }
    return false;
}

private static boolean isSafe(int row, int col, int[] queens) {
    for (int r = 0; r < row; r++) {
        int c = queens[r];
        if (c == col) return false;                    // same column
        if (Math.abs(row - r) == Math.abs(col - c)) return false;   // same diagonal
    }
    return true;
}
\`\`\`

**The insight: one queen per row means you only need to place \`n\` queens, one per row.**
The search space is n^n but the constraints prune it heavily.

**For n-Queens II (LC 52),** count all solutions instead of stopping at the first — and
the diagonal check can be optimised with sets:

\`\`\`java
Set<Integer> cols = new HashSet<>();
Set<Integer> diag1 = new HashSet<>();     // row - col
Set<Integer> diag2 = new HashSet<>();     // row + col
\`\`\`

**The \`row + col\` / \`row - col\` trick** for diagonals is worth knowing — it converts the
diagonal check to a set lookup.

---

## Sudoku solver (LC 37)

**Backtracking with three validity helpers:**

\`\`\`java
private static boolean isValid(int[][] board, int r, int c, int num) {
    // check the row
    for (int i = 0; i < 9; i++) if (board[r][i] == num) return false;
    // check the column
    for (int i = 0; i < 9; i++) if (board[i][c] == num) return false;
    // check the 3x3 box
    int boxRow = (r / 3) * 3, boxCol = (c / 3) * 3;
    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++)
            if (board[boxRow + i][boxCol + j] == num) return false;
    return true;
}
\`\`\`

**The box index formula** \`(r / 3) * 3\` is the detail people get wrong.

**Use bitmasks for the validity check** — much faster:

\`\`\`java
int[] rows = new int[9], cols = new int[9], boxes = new int[9];
// bit i set means digit i+1 is used
\`\`\`

**Say the bitmask version is the production approach** even if you write the simple one.

---

## Palindrome partitioning (LC 131)

**A two-level backtracking:** choose the next substring, and recurse on the rest.

\`\`\`java
private void backtrack(String s, int start, List<String> path, List<List<String>> result) {
    if (start == s.length()) {
        result.add(new ArrayList<>(path));
        return;
    }
    for (int end = start; end < s.length(); end++) {
        if (isPalindrome(s, start, end)) {
            path.add(s.substring(start, end + 1));
            backtrack(s, end + 1, path, result);
            path.remove(path.size() - 1);
        }
    }
}
\`\`\`

**The \`isPalindrome\` check can be O(1) with a precomputed palindrome table**, or O(L) by
expanding from the centre.

**The pruning optimisation:** precompute \`isPalindrome[i][j]\` in O(n²) with the standard
expand-from-centre DP, then the backtracking is fast.

---

## Complexity and pruning

**Backtracking is exponential in the worst case** — O(k!) for permutations, O(2ⁿ) for
subsets, O(4^n) for grid word search.

**The pruning is what makes it practical.** Say the pruning rules:

| Technique | Effect |
|---|---|
| The \`start\` index | Prevents permutations of the same subset |
| Skipping duplicates at a level | Removes duplicate answers |
| Constraint checks before recursing | Prunes invalid branches early |
| Precomputed validity tables | Makes each check O(1) |
| Stop at the first solution | Turns "count all" into "find one" |

**"Stop at the first solution"** is a big one — if the problem only asks whether a
solution exists, return as soon as you find one.

---

## Common traps

| Trap | Why it bites |
|---|---|
| Forgetting to undo the choice | Wrong results, hard to debug |
| Adding the path without copying it | Every result is the same list |
| \`i > 0\` instead of \`i > start\` when skipping duplicates | Loses valid answers |
| Not restoring the grid cell | Other paths are blocked |
| Using \`i + 1\` instead of \`i\` for the reuse case | Wrong problem entirely |
| Forgetting the bounds check before indexing | ArrayIndexOutOfBounds |
| Checking the "last element" condition before the match condition | Off-by-one |
| Not sorting before duplicate-skipping | The duplicates are not adjacent, so nothing is skipped |
| Recursing without a progress guarantee | Infinite recursion |

---

## Complexity cheat sheet

| Problem | Time | Space |
|---|---|---|
| Subsets | O(n · 2ⁿ) | O(n) recursion |
| Permutations | O(n · n!) | O(n) |
| Combinations | O(n · 2ⁿ) | O(n) |
| N-Queens | O(n!) | O(n) |
| Sudoku | O(9^81) worst, pruned heavily | O(81) |
| Word Search | O(rows × cols × 4^L) | O(L) |
| Palindrome partitioning | O(2^n × n) | O(n) |

**The O(n · 2ⁿ) for subsets:** there are 2ⁿ subsets, and copying each into the result
costs O(n).

---

## How to crack it in an interview

1. **Draw the decision tree.** This is the step people skip, and it is the step that
   makes everything else obvious.
2. **State the four parts**: state, candidates, completeness check, choose/undo.
3. **Say what the start index means** and why it changes with each problem variant.
4. **Say how you avoid duplicates** — sort, and skip equal candidates at the same level.
5. **Mention the pruning** and the "stop at the first solution" optimisation.
6. **Trace the tree**, not just the final answer — the interviewer wants to see the
   choose/undo pairs.
`,n={id:e,body:t};export{t as body,n as default,e as id};