---
title: Add Two Numbers II
leetcode: 445
difficulty: Medium
patterns: [Two stacks, Carry propagation]
companies: [Amazon, Meta, Bloomberg, Apple, Lyft]
frequency: 4
tags: [linked-list, stack, math, carry]
sampleInput: |
  4
  3 4 2 7
  2
  6 5
sampleOutput: "3 4 9 2"
---

# Add Two Numbers II — LeetCode 445

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Two stacks · Carry propagation |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

Two non-negative integers are represented as linked lists of digits, **most significant digit
first**. Add them and return the sum in the same representation.

- `3 -> 4 -> 2 -> 7` (3427) plus `6 -> 5` (65) gives `3 -> 4 -> 9 -> 2` (3492).
- The result is **also** stored most significant digit first.

This is the harder twin of [Add Two Numbers](AddTwoNumbers.md): there the
digits were stored least significant first, so the columns were already lined up. Here they
are stored the other way round, and the carry has to travel **against** the direction the
lists are stored in.

## Input Format

The program reads from standard input:

```
n1
digits1[0] digits1[1] ... digits1[n1-1]
n2
digits2[0] digits2[1] ... digits2[n2-1]
```

- `n1` — number of digits of the first number (1 ≤ n1 ≤ 10⁴)
- `digits1` — the digits, **most significant first** (each 0…9)
- `n2` — number of digits of the second number (1 ≤ n2 ≤ 10⁴)
- `digits2` — the digits, most significant first

## Sample Input

```
4
3 4 2 7
2
6 5
```

## Expected Output

```
3 4 9 2
```

3427 + 65 = 3492, written most significant digit first. ✓

## Approach — Two Stacks

The digits are stored most significant first, but the carry travels from the **least**
significant column to the most significant one. We therefore need to read the lists in the
opposite order of how they are stored.

Two options:

1. Reverse both lists in place, add them with the usual carry, and reverse the result.
2. **Push every digit onto a stack.** A stack is LIFO, so the first digit pushed (the most
   significant one) comes out last — exactly the order the carry needs.

Option 2 never mutates the input, so it is the safer choice in an interview.

Then, for each column:

```
sum   = (first.pop() or 0) + (second.pop() or 0) + carry
digit = sum % 10
carry = sum / 10
```

The digits come out **least significant first**. The result list must be most significant
first, so every new digit is **prepended**: the last digit computed (the most significant
one) ends up at the head of the list.

## Dry Run

Input: `3 -> 4 -> 2 -> 7` (3427) and `6 -> 5` (65)

**Phase 1 — fill the stacks** (`push` adds to the front, `pop` takes from the front)

| Step | pushed | `first` (front → back) | pushed | `second` (front → back) |
|---:|---|---|---|---|
| 1 | `3` | `3` | `6` | `6` |
| 2 | `4` | `4 3` | `5` | `5 6` |
| 3 | `2` | `2 4 3` | — | `5 6` |
| 4 | `7` | `7 2 4 3` | — | `5 6` |

**Phase 2 — add column by column** (the digits are prepended)

| Step | `first.pop()` | `second.pop()` | carry in | `sum` | digit | carry out | result (head → tail) |
|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | `7` | `5` | `0` | `12` | `2` | `1` | `2` |
| 2 | `2` | `6` | `1` | `9` | `9` | `0` | `9 -> 2` |
| 3 | `4` | `null` | `0` | `4` | `4` | `0` | `4 -> 9 -> 2` |
| 4 | `3` | `null` | `0` | `3` | `3` | `0` | `3 -> 4 -> 9 -> 2` |

The list is read from the head, so the program prints `3 4 9 2` — most significant first,
the same format as the input. ✓

**Watch out:** *appending* the digits instead of prepending them would produce
`2 -> 9 -> 4 -> 3`, which is the least-significant-first format of the sibling problem.

## Java Solution

See [`AddTwoNumbersII.java`](./AddTwoNumbersII.java).

```java
public static ListNode addTwoNumbers(ListNode l1, ListNode l2) {
    Deque<Integer> first = new ArrayDeque<>();
    Deque<Integer> second = new ArrayDeque<>();
    for (ListNode cur = l1; cur != null; cur = cur.next) {
        first.push(cur.val);
    }
    for (ListNode cur = l2; cur != null; cur = cur.next) {
        second.push(cur.val);
    }

    ListNode head = null;
    int carry = 0;
    while (!first.isEmpty() || !second.isEmpty() || carry != 0) {
        int sum = carry;
        if (!first.isEmpty()) {
            sum += first.pop();
        }
        if (!second.isEmpty()) {
            sum += second.pop();
        }
        carry = sum / 10;
        // the digits come out least significant first, so prepend them
        head = new ListNode(sum % 10, head);
    }
    return head;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n + m) | Every digit is pushed and popped exactly once |
| **Space** | O(n + m) | The two stacks hold all the digits |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you avoid the extra space?"* → reverse both input lists in place, add, and reverse
  the result back: O(1) extra space, three reversals.
- *"What if the numbers are huge and you cannot convert them to a primitive type?"* → this
> solution never does.
- *"What about subtraction?"* → same skeleton with borrow propagation.
- *"Multiply the two numbers?"* → the classic "multiply strings" trick: accumulate the
  digits of one number into the other, least significant first.

**Common mistakes:**
- ❌ Appending the result digits → the result comes out least significant first, which is
  the **other** problem.
- ❌ Forgetting `|| carry != 0` in the loop → a final carry is dropped.
- ❌ Mutating the input lists → the caller's lists are destroyed.

**How to narrate:**
> "The digits are stored most significant first but the carry travels from the least
> significant column, so I push both lists onto stacks — a stack hands the digits back to me
> in the opposite order, which is exactly the order the carry needs. Then I add column by
> column with the usual carry rule. The digits come out least significant first, and the
> result has to be most significant first, so I prepend each new digit. O(n + m) time and
> O(n + m) space, and I never touch the input lists."

## Related Problems

- [Add Two Numbers](AddTwoNumbers.md) — least significant digit first
- [Evaluate Reverse Polish Notation](../stacks/EvaluateReversePolishNotation.md) — stack evaluation
- [Reverse Linked List](ReverseLinkedList.md) — the in-place alternative
