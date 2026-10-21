---
title: Stone Game II
leetcode: 1140
difficulty: Medium
patterns: [Game DP, Bottom-up DP]
companies: [Meta, Apple, Salesforce, Tech Mahindra, Philips]
frequency: 3
tags: [dynamic-programming, game-theory, prefix-sum]
sampleInput: |
  5
  2 7 9 4 4
sampleOutput: "10"
---

# Stone Game II — LeetCode 1140

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Game DP · Bottom-up DP |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Alice and Bob play a game with a row of piles of stones. The rules:

- The piles are taken from the **front** of the row.
- A player may take any number of piles between `1` and `2M`.
- After a player takes `X` piles, `M` becomes `max(M, X)` for the next player.
- `M` starts at `1`.

Alice moves first. Both play optimally. Return the **maximum number of stones Alice can get**.

> Note: this is LeetCode **1140** (Stone Game II). LeetCode 877 is the simpler *Stone Game*, where the players take from either end and you only decide whether Alice wins.

## Input Format

The program reads from standard input:

```
n
piles[0] piles[1] ... piles[n-1]
```

- `n` — number of piles (1 ≤ n ≤ 100)
- `piles` — n space-separated positive integers

## Sample Input

```
5
2 7 9 4 4
```

## Expected Output

```
10
```

Alice takes one pile (`2`), Bob then plays optimally on `[7, 9, 4, 4]` and takes 15 stones, so Alice ends with `26 − 16 = 10`. Taking two piles first would only give her 9.

## Approach

This is a **zero-sum game**, and that is what makes the DP clean: the total number of stones is fixed, so "I get more" and "the opponent gets less" are the same thing.

1. `suffix[i]` = the stones in piles `i … n-1` (prefix sums read backwards).
2. `dp[i][m]` = the best score of the **player whose turn it is**, when the remaining piles are    `i … n-1` and the current `M` is `m`.
3. Base case: if `2m ≥ n - i` the player takes everything → `dp[i][m] = suffix[i]`.
4. Otherwise try every legal move `taken ∈ [1, 2m]`. After the move the opponent plays the    sub-game `(i + taken, max(m, taken))` and gets `dp[i + taken][max(m, taken)]` stones.    Everything else is mine:
   `dp[i][m] = max over taken of ( suffix[i] − dp[i + taken][max(m, taken)] )`.
5. Alice starts at `(0, 1)`, so the answer is `dp[0][1]`.

The same recurrence written with a memoised recursive function is the more common interview answer; the table version makes the state space visible.

## Dry Run

Input: `piles = [2, 7, 9, 4, 4]`, `suffix = [26, 24, 17, 8, 4, 0]`.

**The table** (`dp[i][m]` = best score of the player to move):

| | `m = 1` | `m = 2` | `m = 3` | `m = 4` |
|---|---:|---:|---:|---:|
| `i = 4` | 4 | 4 | 4 | 4 |
| `i = 3` | 8 | 8 | 8 | 8 |
| `i = 2` | 13 | 17 | 17 | 17 |
| `i = 1` | 16 | 24 | 24 | 24 |
| `i = 0` | **10** | 22 | 26 | 26 |

The answer is `dp[0][1] = 10`.

**The two branches Alice has at the start** (`i = 0`, `m = 1`, so she may take 1 or 2 piles):

| Alice takes | stones now | opponent plays | opponent gets | Alice gets |
|---:|---:|---|---|---:|
| 1 | 2 | `dp[1][1]` = 16 | 16 | `26 − 16` = **10** |
| 2 | 9 | `dp[2][2]` = 17 | 17 | `26 − 17` = 9 |

Alice takes **one** pile — taking more would give the opponent a bigger `M`.

**How `dp[1][1] = 16` is built:** `suffix[1] = 24`, and Bob may take 1 or 2 piles:

| Bob takes | opponent (Alice) plays | Alice gets from there | Bob gets |
|---:|---|---:|---:|
| 1 | `dp[2][1]` = 13 | 13 | `24 − 13` = 11 |
| 2 | `dp[3][2]` = 8 | 8 | `24 − 8` = 16 |

Bob takes two piles, so Alice ends up with `26 − 16 = 10` stones.

## Java Solution

See [`StoneGameII.java`](./StoneGameII.java).

```java
    public static int stoneGameII(int[] piles) {
        int n = piles.length;
        int[] suffix = new int[n + 1];
        for (int i = n - 1; i >= 0; i--) {
            suffix[i] = suffix[i + 1] + piles[i];
        }

        int[][] dp = new int[n][n + 1];
        for (int i = n - 1; i >= 0; i--) {
            for (int m = 1; m <= n; m++) {
                if (2 * m >= n - i) {
                    dp[i][m] = suffix[i];
                    continue;
                }
                int best = 0;
                for (int taken = 1; taken <= 2 * m; taken++) {
                    int score = suffix[i] - dp[i + taken][Math.max(m, taken)];
                    best = Math.max(best, score);
                }
                dp[i][m] = best;
            }
        }
        return dp[0][1];
    }
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n³) | `n²` states, each trying up to `2n` moves |
| **Space** | O(n²) | the `n × (n + 1)` table |

**Space `O(n²)`.** A memoised recursion (`HashMap` or a 2-D array) gives the same bound; the suffix array adds `O(n)`.

## Interview Notes

**Follow-ups to raise yourself:**

- "What is the difference to Stone Game (877)?"* → there the players take from **either end** and you only decide whether Alice wins (the answer is always `true` for an even number of piles).
- "What if the players may take from either end?"* → the state needs two indices (`dp[l][r][m]`) instead of one.
- "Why is the recurrence a subtraction?"* → the game is zero-sum: the stones I do not get are exactly the stones the opponent does.
- "Can you play it as a minimax search?"* → yes, but the number of states is exponential without memoisation.

**Common mistakes:**

- ❌ Using `m` (the number just taken) instead of `max(m, taken)` for the next player.
- ❌ Forgetting that `M` starts at `1`, not `2` — Alice may take one or two piles on the first turn.
- ❌ Maximising `taken` directly instead of "remaining stones minus the opponent's best".
- ❌ Using `prefix[i]` instead of `suffix[i]` in the subtraction.

**How to narrate:**

> "The game is zero-sum, so I only need to know the best score of the player whose turn it is. `dp[i][m]` is that score with the remaining piles starting at `i` and the current `M` equal to `m`. If `2m` covers all the remaining piles I take them all; otherwise I try every legal number of piles and subtract the opponent's answer for the resulting position, because everything that is not theirs is mine. The answer is `dp[0][1]` because Alice starts with `M = 1`."

## Related Problems

- [House Robber II — LeetCode 213](./HouseRobberII.java) — another "two cases" reduction
- [Target Sum — LeetCode 494](./TargetSum.java) — counting DP
