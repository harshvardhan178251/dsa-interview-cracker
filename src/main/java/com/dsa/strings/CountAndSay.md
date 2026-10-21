---
title: Count and Say
leetcode: 38
difficulty: Medium
patterns: [Run-length encoding, String building]
companies: [Amazon, Meta, Google, Uber, Adobe]
frequency: 3
tags: [string, run-length-encoding, simulation]
sampleInput: |
  4
sampleOutput: "1211"
---

# Count and Say — LeetCode 38

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Run-length encoding · String building |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Meta, Google, Uber, Adobe |

## Problem Statement

The **look-and-say** sequence starts with `"1"`. Every following term describes the
previous one: read it left to right, and for every run of equal digits write **how
many** there are followed by **which** digit it is.

```
1 → 11 → 21 → 1211 → 111221 → 312211 → ...
```

Return the `n`-th term (1-based).

- Term 1 is `"1"`.
- `"1211"` is read as *one 1, one 2, two 1s* → `"111221"`.

## Input Format

The program reads from standard input:

```
n
```

- `n` — the 1-based term number (1 ≤ n ≤ 30), on its own line.

## Sample Input

```
4
```

## Expected Output

```
1211
```

## Approach — One helper, applied `n - 1` times

Split the problem into two pieces:

- `countAndSay(n)` — starts from `"1"` and applies the helper `n - 1` times.
- `describe(s)` — walks `s` once, splits it into runs, and writes
  `<run length><run character>` for each run.

The helper uses **two indices**: `i` is the start of the current run and `j` runs
ahead while the characters are equal. When `j` stops, the run is `s[i..j-1]`, so its
length is `j - i` and its character is `s.charAt(i)`.

## Dry Run

Input: `n = 4`

| Step | term | runs in the term | next term |
|---:|---|---|---|
| 1 | `"1"` | one `1` | `"11"` |
| 2 | `"11"` | two `1`s | `"21"` |
| 3 | `"21"` | one `2`, one `1` | `"1211"` |
| 4 | `"1211"` | one `1`, one `2`, two `1`s | `"111221"` |

The loop applies `describe` exactly `n - 1 = 3` times, so the value printed is the
term produced at **step 3**: **`1211`**.

### Inside `describe("1211")`

| Step | i | j | run | length | appended | output so far |
|---:|---:|---:|---|---:|---|---|
| 1 | 0 | 1 | `"1"` | 1 | `"11"` | `11` |
| 2 | 1 | 2 | `"2"` | 1 | `"12"` | `1112` |
| 3 | 2 | 4 | `"11"` | 2 | `"21"` | `111221` |

### Inside `describe("21")`

| Step | i | j | run | length | appended | output so far |
|---:|---:|---:|---|---:|---|---|
| 1 | 0 | 1 | `"2"` | 1 | `"12"` | `12` |
| 2 | 1 | 2 | `"1"` | 1 | `"11"` | `1211` |

## Java Solution

See [`CountAndSay.java`](./CountAndSay.java).

```java
public static String countAndSay(int n) {
    String current = "1";
    for (int step = 1; step < n; step++) {
        current = describe(current);
    }
    return current;
}

private static String describe(String s) {
    StringBuilder sb = new StringBuilder();
    int i = 0;
    while (i < s.length()) {
        int j = i;
        while (j < s.length() && s.charAt(j) == s.charAt(i)) {
            j++;
        }
        sb.append(j - i).append(s.charAt(i));
        i = j;
    }
    return sb.toString();
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(L) | L is the total length of all generated terms — each term is scanned once |
| **Space** | O(k) | k is the length of the longest term (only the current term is kept) |

The sequence grows by roughly 1.3× per term, so for n = 30 the last term has about
5 000 characters.

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the sequence started with a different seed — `"2"` or `"99"`?"* → the
  helper does not change; only the seed does.
- *"Generate the first n terms, not just the n-th."* → collect them in a list; the
  total time is the same.
- *"Can you do it without building intermediate strings?"* → you would have to
  stream the output, but each term depends on the previous one, so the intermediate
  term has to exist somewhere.
- *"What is the time complexity precisely?"* → it is the sum of the term lengths, not
  a simple O(n).

**Common mistakes:**
- ❌ Running the helper **n** times instead of `n - 1` → the answer is one term ahead.
- ❌ Writing the character **before** the count → `"1"` instead of `"11"`.
- ❌ Off-by-one in the run length → the run `s[i..j-1]` has length `j - i`, not
  `j - i + 1`.
- ❌ Using `String` concatenation instead of a `StringBuilder` → O(k²) instead of O(k).

**How to narrate:**
> "The sequence is generated, not computed, so I simulate it. I keep a helper that
> takes a term and writes the runs: with two indices I find the end of each run of
> equal characters and append its length and the character itself. I start from '1'
> and call the helper n-1 times, so the total time is the sum of the term lengths."

## Related Problems

- [String Compression](../../../../../../docs/topics/02-strings.md) — the same run-length idea, without the sequence
- [Longest Palindromic Substring](../../../../../../docs/topics/02-strings.md) — another character-level walk
