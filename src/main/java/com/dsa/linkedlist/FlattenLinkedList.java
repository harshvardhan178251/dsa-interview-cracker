package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;

/**
 * Problem: Flatten a Multilevel Linked List
 * Difficulty: Medium | Frequency: 3/5
 * Pattern: Recursion, Parsing a nested structure
 *
 * <p>Problem:
 * A multilevel linked list is a list whose nodes can also own a <em>child</em> list. The
 * task is to flatten it into a single list that contains every value, in the order they are
 * reached by a depth-first walk (a node, then its whole child list, then the next sibling).
 *
 * <p>Input format (stdin): a single line with a nested description
 * <pre>
 * value[childList],value[childList],...
 * </pre>
 * where a child list is written the same way inside brackets. Example: {@code 1[2[3],4],5}
 *
 * <p>Sample input:
 * <pre>
 * 1[2[3],4],5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 2 3 4 5
 * </pre>
 *
 * <p>Approach: parse the text into a tree of nodes, then splice every child list into the
 * chain right after its owner.
 *
 * <p>Complexity: Time O(n), Space O(n) for the parse (the flattening itself is in place).
 */
public class FlattenLinkedList {

    /** A node of a multilevel list: a value, a next sibling and a child list. */
    public static class MultiNode {
        public int val;
        public MultiNode next;
        public MultiNode child;

        public MultiNode(int val) {
            this.val = val;
        }
    }

    private static int pos;

    /**
     * Parses the nested description into a multilevel list.
     *
     * @param text the description, e.g. {@code 1[2[3],4],5}
     * @return the head of the parsed multilevel list
     */
    public static MultiNode parse(String text) {
        pos = 0;
        return parseList(text);
    }

    /** Parses a comma separated list of nodes; stops at a closing bracket or at the end. */
    private static MultiNode parseList(String text) {
        MultiNode head = null;
        MultiNode tail = null;
        while (pos < text.length()) {
            char c = text.charAt(pos);
            if (c == ']') {
                pos++;              // consume the closing bracket of this level
                break;
            }
            if (c == ',') {
                pos++;
                continue;
            }
            int start = pos;
            while (pos < text.length() && Character.isDigit(text.charAt(pos))) {
                pos++;
            }
            MultiNode node = new MultiNode(Integer.parseInt(text.substring(start, pos)));
            if (pos < text.length() && text.charAt(pos) == '[') {
                pos++;              // consume '['
                node.child = parseList(text);
            }
            if (tail == null) {
                head = node;
            } else {
                tail.next = node;
            }
            tail = node;
        }
        return head;
    }

    /**
     * Flattens the multilevel list in place: every child list is spliced in right after the
     * node that owns it.
     *
     * @param head the head of the multilevel list
     */
    public static void flatten(MultiNode head) {
        for (MultiNode cur = head; cur != null; cur = cur.next) {
            if (cur.child != null) {
                flatten(cur.child);                    // flatten the child list first
                MultiNode tail = cur.child;
                while (tail.next != null) {
                    tail = tail.next;
                }
                tail.next = cur.next;                  // attach it after the owner
                cur.next = cur.child;                   // and put it in front of the sibling
                cur.child = null;
            }
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String text = fs.next();

        MultiNode head = parse(text);
        flatten(head);

        StringBuilder sb = new StringBuilder();
        for (MultiNode c = head; c != null; c = c.next) {
            if (sb.length() > 0) {
                sb.append(' ');
            }
            sb.append(c.val);
        }
        System.out.println(sb);
    }
}
