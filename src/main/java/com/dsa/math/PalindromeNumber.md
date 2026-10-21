---
title: Palindrome Number
leetcode: 9
difficulty: Easy
patterns: [Digit manipulation, Half reversal]
companies: [Google, Meta, Apple, Goldman Sachs, Visa, Wipro, TCS, EY]
frequency: 4
tags: [math, numbers]
sampleInput: |
  121
sampleOutput: "true"
---

# Palindrome Number — LeetCode 9

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Digit manipulation · Half reversal |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg |

## Problem Statement

Decide whether a non-negative integer reads the same forwards and backwards.

- `121` → `true`
- `-121` → `false` (the minus sign breaks the symmetry)
- `10` → `false` (the leading digit would have to be `0`)

## Input Format

The program reads from standard input:

```
n
```

- `n` — the number to test (0 ≤ n ≤ 2³¹ - 1)

## Sample Input

```
121
```

## Expected Output

```
true
```

## Approach — reverse only the second half

Fully reversing the number needs extra space when the digits are strings, and it
overflows for large numbers. Instead, reverse the digits **one by one** and stop as
soon as the reversed prefix catches up with the remaining suffix:

```
reverted  = 0
remaining = n
while (remaining > reverted) {
    reverted  = reverted * 10 + remaining % 10
    remaining = remaining / 10
}
```

After the loop the number has been split into a reversed first half (`reverted`) and a
remaining second half (`remaining`):

- even number of digits → the halves have the same length → `remaining == reverted`;
- odd number of digits → the middle digit sits in `reverted` → `remaining == reverted / 10`.

**Why this is correct:** for a palindrome the two halves are mirror images, so they are
equal (or equal after dropping the middle digit). For a non-palindrome the halves
differ — the loop stops at the first moment where the comparison is meaningful, so
the test is exact.

## Dry Run

Input: `n = 121`

| Step | `remaining` before | `reverted` before | `remaining > reverted`? | `reverted` after | `remaining` after |
|---:|---:|---:|---|---|---:|
| 1 | 121 | 0 | yes | `0*10 + 1 = 1` | 12 |
| 2 | 12 | 1 | yes | `1*10 + 2 = 12` | 1 |
| 3 | 1 | 12 | no (`1 > 12` is false) | 12 | 1 |

`remaining = 1`, `reverted = 12` → `remaining == reverted / 10` → `1 == 1` → **true**
(odd number of digits).

### Trace of an even-length palindrome — `n = 1221`

| Step | `remaining` before | `reverted` before | `reverted` after | `remaining` after |
|---:|---:|---:|---:|---:|
| 1 | 1221 | 0 | 1 | 122 |
| 2 | 122 | 1 | 12 | 12 |
| 3 | 12 | 12 | no (`12 > 12` is false) | 12 |

`remaining == reverted` → `12 == 12` → **true**.

### Trace of a non-palindrome — `n = 123`

| Step | `remaining` before | `reverted` before | `reverted` after | `remaining` after |
|---:|---:|---:|---:|---:|
| 1 | 123 | 0 | 3 | 12 |
| 2 | 12 | 3 | 31 | 1 |
| 3 | 1 | 31 | no | 1 |

`remaining = 1`, `reverted = 31` → `1 == 31 / 10 = 3`? no → **false**.

## Java Solution

See [`PalindromeNumber.java`](./PalindromeNumber.java).

```java
public static boolean isPalindrome(int n) {
    if (n < 0 || (n % 10 == 0 && n != 0)) {
        return false;
    }
    int reverted = 0;
    int remaining = n;
    while (remaining > reverted) {
        reverted = reverted * 10 + remaining % 10;
        remaining = remaining / 10;
    }
    return remaining == reverted || remaining == reverted / 10;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(log n) | half of the digits are processed |
| **Space** | O(1) | two integers, no string conversion |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the number is given as a string?"* → a two-pointer scan from both ends.
- *"What if leading zeros are allowed (`"010"`)?"* → the problem changes: `"010"` is a
  palindrome as a string but not as a number.
- *"What about a palindrome with an even number of digits?"* → it must be divisible by
  11 — a nice follow-up to test understanding.

**Common mistakes:**
- ❌ Forgetting the trailing-zero special case — `10` reverses to `01`, which is not a
  palindrome.
- ❌ Comparing `remaining == reverted` only — odd-length numbers need the
  `reverted / 10` variant.
- ❌ Converting to a string and reversing it — it works but costs O(n) space and
  overflows for long numbers.

**How to narrate:**
> "I avoid strings and avoid a full reversal: I peel digits off the end of the number
> and build the reversed prefix, stopping as soon as the prefix catches up with the
> remaining suffix. Then the two halves are either equal, or equal after dropping the
> middle digit for odd-length numbers."

## Related Problems

- [Reverse Integer](./ReverseInteger.md) — the same digit loop, producing a number
- [Add Binary](./AddBinary.md) — digit-by-digit addition with a carry
