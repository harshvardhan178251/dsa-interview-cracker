---
title: Add Binary
leetcode: 415
difficulty: Easy
patterns: [Bit manipulation, Carry propagation]
companies: [Amazon, Meta, JP Morgan, LinkedIn, Visa, Infosys, Tech Mahindra, Swiggy]
frequency: 4
tags: [math, strings, bit-manipulation]
sampleInput: |
  1010
  1011
sampleOutput: "10101"
---

# Add Binary — LeetCode 415

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Bit manipulation · Carry propagation |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Given two binary strings, return the sum of the two numbers **as a binary string**.

- `1010 + 1011 = 10101`
- The strings may be very long — do not convert them to an integer.

## Input Format

The program reads from standard input:

```
a
b
```

- `a` — the first binary string
- `b` — the second binary string

## Sample Input

```
1010
1011
```

## Expected Output

```
10101
```

`1010₂ = 10` and `1011₂ = 11`, and `10 + 11 = 21 = 10101₂`.

## Approach — add digit by digit, from the right

Walk both strings from the **right** (least significant digit first). For every
position add the two digits and the carry:

- the resulting digit is `sum % 2`,
- the carry for the next position is `sum / 2`.

The digits are produced right-to-left, so the result is built in reverse and flipped
at the end.

**Why this is correct:** binary addition is exactly the same as decimal addition
except that the base is 2 — a sum of two digits plus a carry is at most `1 + 1 + 1 = 3`,
which is `1` with a carry of `1` in base 2. The loop processes every digit of both
strings and then keeps going while a carry is left, so no digit is ever missed.

## Dry Run

Input: `a = "1010"`, `b = "1011"`

| Step | digit of `a` | digit of `b` | carry in | sum | digit out (`sum % 2`) | carry out (`sum / 2`) | result (reversed) |
|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | 0 | 1 | 0 | 1 | 1 | 0 | `1` |
| 2 | 1 | 1 | 0 | 2 | 0 | 1 | `10` |
| 3 | 0 | 0 | 1 | 1 | 1 | 0 | `101` |
| 4 | 1 | 1 | 0 | 2 | 0 | 1 | `1010` |
| 5 | — | — | 1 | 1 | 1 | 0 | `10101` |

Reversing `10101` gives `10101` — the same string, because the sum is symmetric here.
For `a = "11"`, `b = "1"` the reversed result `001` becomes `"11"` after the flip (and
the leading zero is dropped by the reversal of a shorter string).

## Java Solution

See [`AddBinary.java`](./AddBinary.java).

```java
public static String addBinary(String a, String b) {
    int i = a.length() - 1;
    int j = b.length() - 1;
    int carry = 0;
    StringBuilder result = new StringBuilder();
    while (i >= 0 || j >= 0 || carry > 0) {
        int sum = carry;
        if (i >= 0) {
            sum += a.charAt(i--) - '0';
        }
        if (j >= 0) {
            sum += b.charAt(j--) - '0';
        }
        result.append((char) ('0' + (sum % 2)));
        carry = sum / 2;
    }
    return result.reverse().toString();
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(max(\|a\|, \|b\|)) | one pass over the longer string |
| **Space** | O(max(\|a\|, \|b\|)) | the result buffer |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the inputs are numbers instead of strings?"* → use the bit operators
  (`a ^ b` for the sum without carries, `(a & b) << 1` for the carries) and repeat
  until the carries vanish.
- *"Subtract two binary strings."* → the same loop, but borrow instead of carry.
- *"What if the base was 7?"* → the same algorithm with `sum % 7` and `sum / 7`.

**Common mistakes:**
- ❌ Converting the strings to `int` — they may be far too long.
- ❌ Forgetting to continue the loop while a carry is left (`"1" + "1" = "10"`).
- ❌ Not reversing the result at the end — the digits come out least-significant first.

**How to narrate:**
> "I add the two strings from the right, keeping a carry: the digit is `sum % 2` and
> the next carry is `sum / 2`. The digits come out backwards, so I flip the buffer at
> the end. It is the same as schoolbook addition, just in base 2."

## Related Problems

- [Reverse Integer](./ReverseInteger.md) — the other "pull the digits apart" routine
- [Palindrome Number](./PalindromeNumber.md) — digit manipulation
