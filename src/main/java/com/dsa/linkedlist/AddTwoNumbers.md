---
title: Add Two Numbers
leetcode: 2
difficulty: Medium
patterns: [Digit-by-digit carry, Dummy head]
companies: [Amazon, Meta, Google, Microsoft, Salesforce, Facebook, Twitter, Accenture, Cognizant, Razorpay]
frequency: 5
tags: [linked-list, math, carry]
sampleInput: |
  2
  9 9
  1
  1
sampleOutput: "0 0 1"
---

# Add Two Numbers — LeetCode 2

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Digit-by-digit carry · Dummy head |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg, Adobe |

## Problem Statement

Two non-negative integers are represented as linked lists of digits, **least significant
digit first** (the classic "reverse order" storage). Add them and return the sum in the same
representation.

- `9 -> 9` (99) plus `1` (1) gives `0 -> 0 -> 1` (100).
- The lists may have **different lengths** — the missing digits sit at the tail, which is the
  most significant end.
- The result uses the same least-significant-first order as the input.

## Input Format

The program reads from standard input:

```
n1
digits1[0] digits1[1] ... digits1[n1-1]
n2
digits2[0] digits2[1] ... digits2[n2-1]
```

- `n1` — number of digits of the first number (1 ≤ n1 ≤ 10⁴)
- `digits1` — the digits, **least significant first** (each 0…9)
- `n2` — number of digits of the second number (1 ≤ n2 ≤ 10⁴)
- `digits2` — the digits, least significant first

## Sample Input

```
2
9 9
1
1
```

## Expected Output

```
0 0 1
```

99 + 1 = 100, written least significant digit first. ✓

## Approach — Carry Propagation, One Column at a Time

Because the digits are stored least significant first, **the head of the list is the units
column**. Walking both lists from the head therefore visits the columns in exactly the order
the carry needs: units first, tens second, and so on.

Per column:

```
sum   = digit1 + digit2 + carry
digit = sum % 10
carry = sum / 10
```

`sum` is at most `9 + 9 + 1 = 19`, so the carry is always `0` or `1` and the modulo/division
split is exact.

Two details make the loop correct:

- The condition is `l1 != null || l2 != null || carry != 0` — the last term is what emits the
  extra leading digit of `99 + 1 = 100`.
- A list that has already ended contributes `0` to the remaining columns. Because the short
  list's missing digits are at its tail, those zeros land at the **most significant** end,
  which is exactly right.

A dummy head removes the "what is the first digit?" special case: we always append to the
tail and return `dummy.next` at the end.

## Dry Run

Input: `9 -> 9` (99) and `1 -> null` (1)

| Step | `l1.val` | `l2.val` | carry in | `sum` | digit out | carry out | result so far |
|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | `9` | `1` | `0` | `10` | `0` | `1` | `0` |
| 2 | `9` | `null` | `1` | `10` | `0` | `1` | `0 -> 0` |
| 3 | `null` | `null` | `1` | `1` | `1` | `0` | `0 -> 0 -> 1` |

The loop stops when the carry is `0` **and** both lists are exhausted. ✓

### Unequal lengths — `2 -> 4 -> 3` (342) plus `5 -> 6 -> 1` (165)

| Step | `l1.val` | `l2.val` | carry in | `sum` | digit out | carry out | result so far |
|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | `2` | `5` | `0` | `7` | `7` | `0` | `7` |
| 2 | `4` | `6` | `0` | `10` | `0` | `1` | `7 -> 0` |
| 3 | `3` | `1` | `1` | `5` | `5` | `0` | `7 -> 0 -> 5` |

342 + 165 = 507, stored as `7 -> 0 -> 5`. ✓

## Java Solution

See [`AddTwoNumbers.java`](./AddTwoNumbers.java).

```java
public static ListNode addTwoNumbers(ListNode l1, ListNode l2) {
    ListNode dummy = new ListNode(0);
    ListNode tail = dummy;
    int carry = 0;

    while (l1 != null || l2 != null || carry != 0) {
        int sum = carry;
        if (l1 != null) {
            sum += l1.val;
            l1 = l1.next;
        }
        if (l2 != null) {
            sum += l2.val;
            l2 = l2.next;
        }
        carry = sum / 10;
        tail.next = new ListNode(sum % 10);
        tail = tail.next;
    }
    return dummy.next;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n + m) | Each digit of both lists is visited once |
| **Space** | O(n + m) | The result list — the algorithm itself uses O(1) extra space |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the digits are stored most significant first?"* → the columns are in the wrong
  order; reverse the lists, add, and reverse the result — or use two stacks — see
  [Add Two Numbers II](AddTwoNumbersII.md).
- *"What if the numbers can be negative?"* → handle the sign separately, or use a signed
  representation with borrow propagation.
- *"Do it without creating new nodes."* → write the digits back into the existing nodes and
  re-use the longer list.
- *"Add three numbers."* → same loop with three lists, or add two and then add the third.

**Common mistakes:**
- ❌ Forgetting the `|| carry != 0` in the loop condition → `99 + 1` returns `0 -> 0` instead
  of `0 -> 0 -> 1`.
- ❌ Using `sum / 10` and `sum % 10` the other way round → digits and carries are swapped.
- ❌ Mutating the **input** lists while reading them → the caller's lists are destroyed; walk
  with local pointers instead.

**How to narrate:**
> "The digits are stored least significant first, so the head of each list is the units
> column — walking both lists in parallel visits the columns in the order the carry needs.
> For each column I add the two digits plus the carry, emit `sum % 10` and carry `sum / 10`
> forward. The loop runs while either list has digits **or** a carry is left, and that last
> part is what emits the extra leading digit when the sum overflows. A missing list
> contributes zero, and because the short list's gap is at its tail those zeros land at the
> most significant end, which is correct."

## Related Problems

- [Add Two Numbers II](AddTwoNumbersII.md) — most significant digit first
- [Merge Two Sorted Lists](MergeTwoSortedLists.md) — the same merge skeleton
- [Evaluate Reverse Polish Notation](../stacks/EvaluateReversePolishNotation.md) — stack evaluation
