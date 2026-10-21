package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;
import com.dsa.utils.ListNode;

/**
 * Problem: Add Two Numbers
 * LeetCode: 2 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Digit-by-digit carry, Dummy head
 *
 * <p>Problem:
 * Two non-negative numbers are given as linked lists of digits, **least significant digit
 * first** (the classic "reverse order" storage). Add them and return the sum as a linked
 * list of digits in the same order.
 *
 * <p>Input format (stdin):
 * <pre>
 * n1
 * l1 digits (least significant first)
 * n2
 * l2 digits (least significant first)
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 2
 * 9 9
 * 1
 * 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0 0 1
 * </pre>
 *
 * <p>Approach: walk both lists in parallel — the head of each list is the units column — add
 * the two digits plus the carry, and emit {@code sum % 10} with the carry {@code sum / 10}.
 *
 * <p>Complexity: Time O(n + m), Space O(1) besides the output.
 */
public class AddTwoNumbers {

    /**
     * Adds two numbers stored as digit lists (least significant digit first).
     *
     * @param l1 first number
     * @param l2 second number
     * @return the sum as a digit list, least significant digit first
     */
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
