---
title: Reverse String
leetcode: 344
difficulty: Easy
patterns: [Two Pointers, In-place swap]
companies: [Meta, JP Morgan, Uber]
frequency: 3
tags: [string, two-pointers, array]
sampleInput: |
  hello
sampleOutput: "olleh"
---

# Reverse String — LeetCode 344

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Two Pointers · In-place swap |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Meta, Google, Uber |

## Problem Statement

Given a string `s`, return it reversed.

- `"hello"` → `"olleh"`
- Every character is reversed, **not** the order of the words — see
  [Reverse Words in a String](../../../../../../docs/topics/02-strings.md) for that variant.

## Input Format

The program reads from standard input:

```
s
```

- `s` — the string to reverse (0 ≤ |s| ≤ 10⁴), on a single line, no quotes.

## Sample Input

```
hello
```

## Expected Output

```
olleh
```

## Approach — Two pointers swapping inwards

Java strings are immutable, so the string is copied into a `char[]` first. Then two
pointers walk towards each other and swap the characters they point at:

```
left = 0, right = chars.length - 1
while left < right:
    swap(chars[left], chars[right])
    left++, right--
```

The loop stops when the pointers meet (odd length — the middle character is already
in place) or cross (even length — everything has been swapped).

**Why `left < right` and not `left <= right`:** with `<=` the middle character of an
odd-length string would be swapped with itself, which is harmless but wasteful; more
importantly the `left == right` case must not perform an extra swap.

## Dry Run

Input: `s = "hello"` → `chars = [h, e, l, l, o]`

| Step | left | right | swap | `chars` after |
|---:|---:|---:|---|---|
| 1 | 0 | 4 | `h` ↔ `o` | `[o, e, l, l, h]` |
| 2 | 1 | 3 | `e` ↔ `l` | `[o, l, l, e, h]` |
| 3 | 2 | 2 | — | `left == right` → loop ends |

Result: `new String(chars)` = **`olleh`**

### The even-length case — `"abc"` → `[a, b, c]`

| Step | left | right | swap | `chars` after |
|---:|---:|---:|---|---|
| 1 | 0 | 2 | `a` ↔ `c` | `[c, b, a]` |
| 2 | 1 | 1 | — | `left == right` → loop ends |

Result: **`cba`**

## Java Solution

See [`ReverseString.java`](./ReverseString.java).

```java
public static String reverse(String s) {
    char[] chars = s.toCharArray();
    for (int left = 0, right = chars.length - 1; left < right; left++, right--) {
        char temp = chars[left];
        chars[left] = chars[right];
        chars[right] = temp;
    }
    return new String(chars);
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | n/2 swaps, each O(1) |
| **Space** | O(n) | The `char[]` copy — unavoidable in Java because `String` is immutable |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it in O(1) extra space?"* → yes in other languages (C/C++ strings are
  mutable); in Java you would need a `char[]` or a `StringBuilder` with
  `reverse()`.
- *"Reverse the words instead of the characters."* → see
  [Reverse Words in a String](../../../../../../docs/topics/02-strings.md).
- *"Reverse only the vowels, or only the alphabetic characters?"* → the same
  two-pointer skeleton with an extra "is this swappable?" guard.
- *"Why not `new StringBuilder(s).reverse()`?"* → that is a perfectly good answer;
  writing the loop shows you understand the algorithm.

**Common mistakes:**
- ❌ Using `left <= right` → an extra swap in the middle (harmless but wrong-looking).
- ❌ Off-by-one on `right` → `chars.length` instead of `chars.length - 1` throws
  `ArrayIndexOutOfBoundsException`.
- ❌ Swapping only `chars[left]` and forgetting `chars[right]` → the right half stays
  untouched.
- ❌ Trying to modify the `String` directly → Java strings are immutable.

**How to narrate:**
> "Java strings are immutable, so I copy into a char array and swap the two ends with
> two pointers moving inwards. The loop condition is left < right, so for an odd
> length the middle character is left alone. O(n) time and O(n) space for the copy."

## Related Problems

- [Reverse Words in a String](../../../../../../docs/topics/02-strings.md) — the word-level variant
- [Valid Palindrome II](../../../../../../docs/topics/02-strings.md) — the same two-pointer skeleton, reading instead of writing
