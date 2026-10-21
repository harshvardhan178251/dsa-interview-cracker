package com.dsa.stacks;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Decode String
 * LeetCode: 394 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Stack of frames, Nested parsing
 *
 * <p>Problem:
 * Given an encoded string, decode it. The encoding rule is {@code k[encoded_string]}, where
 * the content of the square brackets is repeated {@code k} times. The brackets may be
 * nested.
 *
 * <p>Input format (stdin): the encoded string on a single line
 * <pre>
 * 3[a2[c]]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3[a2[c]]
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * accaccacc
 * </pre>
 *
 * <p>Approach: a stack of frames. Every {@code [} pushes the current text and the repeat
 * count; every {@code ]} pops them, repeats the finished text and appends it to the outer
 * text.
 *
 * <p>Complexity: Time O(L) for the length of the decoded output, Space O(L).
 */
public class DecodeString {

    /** One open bracket: the repeat count and the text that was being built outside it. */
    public static class Frame {
        public final int count;
        public final StringBuilder text;

        public Frame(int count, StringBuilder text) {
            this.count = count;
            this.text = text;
        }
    }

    /**
     * Decodes an encoded string.
     *
     * @param encoded the encoded string
     * @return the decoded string
     */
    public static String decode(String encoded) {
        Deque<Frame> stack = new ArrayDeque<>();
        StringBuilder current = new StringBuilder();
        int number = 0;

        for (int i = 0; i < encoded.length(); i++) {
            char c = encoded.charAt(i);
            if (c >= '0' && c <= '9') {
                number = number * 10 + (c - '0');      // the count may have several digits
            } else if (c == '[') {
                stack.push(new Frame(number, current));
                number = 0;
                current = new StringBuilder();
            } else if (c == ']') {
                Frame frame = stack.pop();
                StringBuilder outer = frame.text;
                for (int k = 0; k < frame.count; k++) {
                    outer.append(current);
                }
                current = outer;
            } else {
                current.append(c);
            }
        }
        return current.toString();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        StringBuilder encoded = new StringBuilder();
        while (fs.hasNext()) {
            encoded.append(fs.next());
        }

        System.out.println(decode(encoded.toString()));
    }
}
