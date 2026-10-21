package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;
import com.dsa.utils.ListNode;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Add Two Numbers II
 * LeetCode: 445 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Two stacks, Carry propagation
 *
 * <p>Problem:
 * Two non-negative numbers are given as linked lists of digits, **most significant digit
 * first**. Add them and return the sum as a linked list of digits in the same order.
 *
 * <p>Input format (stdin):
 * <pre>
 * n1
 * l1 digits (most significant first)
 * n2
 * l2 digits (most significant first)
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 3 4 2 7
 * 2
 * 6 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3 4 9 2
 * </pre>
 *
 * <p>Approach: push every digit of both lists onto two stacks. Popping the stacks yields the
 * digits from least to most significant, which is the order the carry needs. The result
 * digits are computed least significant first, so each one is prepended to the result.
 *
 * <p>Complexity: Time O(n + m), Space O(n + m).
 */
public class AddTwoNumbersII {

    /**
     * Adds two numbers stored as digit lists (most significant digit first).
     *
     * @param l1 first number
     * @param l2 second number
     * @return the sum as a digit list, most significant digit first
     */
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

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n1 = fs.nextInt();
        int[] digits1 = fs.nextIntArray(n1);
        int n2 = fs.nextInt();
        int[] digits2 = fs.nextIntArray(n2);

        ListNode sum = addTwoNumbers(ListNode.of(digits1), ListNode.of(digits2));

        StringBuilder sb = new StringBuilder();
        for (ListNode c = sum; c != null; c = c.next) {
            if (sb.length() > 0) {
                sb.append(' ');
            }
            sb.append(c.val);
        }
        System.out.println(sb);
    }
}
