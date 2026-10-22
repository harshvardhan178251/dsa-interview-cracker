var e=`stacks.BasicCalculator`,t=`package com.dsa.stacks;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Basic Calculator
 * LeetCode: 224 | Difficulty: Hard | Frequency: 4/5
 * Pattern: Stack of pending results, Recursive descent
 *
 * <p>Problem:
 * Given a string containing the operators {@code +}, {@code -}, parentheses and integer
 * numbers, evaluate the expression. Parentheses may be nested and a unary minus is allowed.
 *
 * <p>Input format (stdin): the expression on a single line
 * <pre>
 * 1 - (2 - 3)
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 1 - (2 - 3)
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: a stack of {@code (result, sign)} pairs. Every parenthesis pushes the work
 * done so far and starts a fresh sub-expression.
 *
 * <p>Complexity: Time O(n), Space O(d) with d the nesting depth.
 */
public class BasicCalculator {

    /**
     * Evaluates an expression containing {@code +}, {@code -} and parentheses.
     *
     * @param expression the expression
     * @return the value of the expression
     */
    public static int evaluate(String expression) {
        Deque<int[]> stack = new ArrayDeque<>();   // pairs of (result so far, sign)
        int result = 0;
        int number = 0;
        int sign = 1;

        for (int i = 0; i < expression.length(); i++) {
            char c = expression.charAt(i);
            if (c >= '0' && c <= '9') {
                number = number * 10 + (c - '0');
            } else if (c == '+' || c == '-') {
                result += sign * number;            // close the previous number
                number = 0;
                sign = (c == '+') ? 1 : -1;          // the sign of the next number
            } else if (c == '(') {
                stack.push(new int[]{result, sign}); // remember the outer state
                result = 0;
                number = 0;
                sign = 1;                           // a sub-expression starts with '+'
            } else if (c == ')') {
                result += sign * number;            // finish the sub-expression
                number = 0;
                int[] previous = stack.pop();
                result = previous[0] + previous[1] * result;
                sign = 1;
            }
            // spaces are ignored
        }
        return result + sign * number;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        StringBuilder expression = new StringBuilder();
        while (fs.hasNext()) {
            expression.append(fs.next());      // whitespace is irrelevant for the parser
        }

        System.out.println(evaluate(expression.toString()));
    }
}
`,n=`import java.util.ArrayDeque;
import java.util.Deque;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Basic Calculator
 * LeetCode: 224 | Difficulty: Hard | Frequency: 4/5
 * Pattern: Stack of pending results, Recursive descent
 *
 * <p>Problem:
 * Given a string containing the operators {@code +}, {@code -}, parentheses and integer
 * numbers, evaluate the expression. Parentheses may be nested and a unary minus is allowed.
 *
 * <p>Input format (stdin): the expression on a single line
 * <pre>
 * 1 - (2 - 3)
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 1 - (2 - 3)
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: a stack of {@code (result, sign)} pairs. Every parenthesis pushes the work
 * done so far and starts a fresh sub-expression.
 *
 * <p>Complexity: Time O(n), Space O(d) with d the nesting depth.
 */
public class Main {

    /**
     * Evaluates an expression containing {@code +}, {@code -} and parentheses.
     *
     * @param expression the expression
     * @return the value of the expression
     */
    public static int evaluate(String expression) {
        Deque<int[]> stack = new ArrayDeque<>();   // pairs of (result so far, sign)
        int result = 0;
        int number = 0;
        int sign = 1;

        for (int i = 0; i < expression.length(); i++) {
            char c = expression.charAt(i);
            if (c >= '0' && c <= '9') {
                number = number * 10 + (c - '0');
            } else if (c == '+' || c == '-') {
                result += sign * number;            // close the previous number
                number = 0;
                sign = (c == '+') ? 1 : -1;          // the sign of the next number
            } else if (c == '(') {
                stack.push(new int[]{result, sign}); // remember the outer state
                result = 0;
                number = 0;
                sign = 1;                           // a sub-expression starts with '+'
            } else if (c == ')') {
                result += sign * number;            // finish the sub-expression
                number = 0;
                int[] previous = stack.pop();
                result = previous[0] + previous[1] * result;
                sign = 1;
            }
            // spaces are ignored
        }
        return result + sign * number;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        StringBuilder expression = new StringBuilder();
        while (fs.hasNext()) {
            expression.append(fs.next());      // whitespace is irrelevant for the parser
        }

        System.out.println(evaluate(expression.toString()));
    }
}

// ---------- inlined com.dsa.utils.FastScanner ----------
/**
 * Allocation-light scanner for contest-style stdin input.
 *
 * <p>Every problem in this repository reads its input through this class so the
 * expected stdin format stays consistent across the whole set.
 *
 * <p>Typical usage:
 * <pre>{@code
 * FastScanner fs = new FastScanner(System.in);
 * int n = fs.nextInt();
 * int[] nums = fs.nextIntArray(n);
 * }</pre>
 */
class FastScanner {

    private final BufferedReader reader;
    private final char[] buffer = new char[1 << 16];
    private int ptr = 0;
    private int len = 0;

    public FastScanner(InputStream in) {
        this.reader = new BufferedReader(new InputStreamReader(in, StandardCharsets.UTF_8), 1 << 16);
    }

    /** Returns the next raw character, or -1 at end of input. */
    private int read() throws IOException {
        if (ptr >= len) {
            len = reader.read(buffer);
            ptr = 0;
            if (len <= 0) {
                return -1;
            }
        }
        return buffer[ptr++];
    }

    private void skipWhitespace() throws IOException {
        int c;
        while ((c = read()) != -1) {
            if (!Character.isWhitespace(c)) {
                ptr--; // step back onto the first meaningful character
                return;
            }
        }
    }

    /** True when at least one more non-whitespace character exists. */
    public boolean hasNext() throws IOException {
        skipWhitespace();
        return ptr < len;
    }

    /** Reads the next whitespace-delimited token as a string. */
    public String next() throws IOException {
        skipWhitespace();
        StringBuilder sb = new StringBuilder();
        int c;
        while ((c = read()) != -1 && !Character.isWhitespace(c)) {
            sb.append((char) c);
        }
        return sb.toString();
    }

    public int nextInt() throws IOException {
        skipWhitespace();
        int c = read();
        while (c != -1 && c != '-' && (c < '0' || c > '9')) {
            c = read();
        }
        int sign = 1;
        if (c == '-') {
            sign = -1;
            c = read();
        }
        int value = 0;
        while (c >= '0' && c <= '9') {
            value = value * 10 + (c - '0');
            c = read();
        }
        return sign * value;
    }

    public long nextLong() throws IOException {
        skipWhitespace();
        int c = read();
        while (c != -1 && c != '-' && (c < '0' || c > '9')) {
            c = read();
        }
        int sign = 1;
        if (c == '-') {
            sign = -1;
            c = read();
        }
        long value = 0;
        while (c >= '0' && c <= '9') {
            value = value * 10 + (c - '0');
            c = read();
        }
        return sign * value;
    }

    public double nextDouble() throws IOException {
        return Double.parseDouble(next());
    }

    public char nextChar() throws IOException {
        skipWhitespace();
        int c = read();
        return c == -1 ? '\\0' : (char) c;
    }

    /** Reads exactly {@code n} integers. */
    public int[] nextIntArray(int n) throws IOException {
        int[] out = new int[n];
        for (int i = 0; i < n; i++) {
            out[i] = nextInt();
        }
        return out;
    }

    /** Reads exactly {@code n} longs. */
    public long[] nextLongArray(int n) throws IOException {
        long[] out = new long[n];
        for (int i = 0; i < n; i++) {
            out[i] = nextLong();
        }
        return out;
    }

    /** Reads exactly {@code n} whitespace-delimited strings. */
    public String[] nextStringArray(int n) throws IOException {
        String[] out = new String[n];
        for (int i = 0; i < n; i++) {
            out[i] = next();
        }
        return out;
    }
}
`,r="\n# Basic Calculator — LeetCode 224\n\n| | |\n|---|---|\n| **Difficulty** | Hard |\n| **Pattern** | Stack of pending results · Recursive descent |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |\n\n## Problem Statement\n\nGiven a string containing the operators `+` and `-`, integer numbers and parentheses, evaluate\nthe expression.\n\n- `1 - (2 - 3)` → `2`\n- `2 - (5 - 3)` → `0`\n- `-(2 + 3)` → `-5` (a unary minus is allowed)\n\nSpaces inside the expression are ignored.\n\n## Input Format\n\nThe program reads the **expression** from standard input (a single line; the whitespace\nbetween the tokens does not matter):\n\n```\nexpression\n```\n\n- `expression` — e.g. `1 - (2 - 3)`\n\n## Sample Input\n\n```\n1 - (2 - 3)\n```\n\n## Expected Output\n\n```\n2\n```\n\n`2 - 3` is `-1`, and `1 - (-1) = 2`. ✓\n\n## Approach — A Stack of Pending Results\n\nThe tricky part of `+`/`-` is that the sign of a term depends on the parentheses around it:\n`1 - (2 - 3)` is not `1 - 2 - 3`. So when a parenthesis opens we must **remember** the\nsign that was in effect, and restore it when the parenthesis closes.\n\nThe state of the parser is `(result, sign, number)`:\n\n- `result` — the value of the terms that are already finished,\n- `number` — the digits of the term being read,\n- `sign` — `+1` or `-1`, the sign of the term being read.\n\nWalking the expression:\n\n- **digit** → extend `number`.\n- **`+` / `-`** → finish the current term (`result += sign * number`), reset `number`, and\n  set `sign` for the next term.\n- **`(`** → push `(result, sign)` on the stack, then start a fresh sub-expression with\n  `result = 0`, `number = 0`, `sign = +1`.\n- **`)`** → finish the sub-expression and combine it with the outer state:\n  `result = outerResult + outerSign * subResult`.\n\n**Why the stack instead of recursion?** A recursive solution is a natural fit, but the\nexplicit stack has the same shape, uses heap memory instead of call frames, and never\noverflows on a deeply nested expression.\n\n## Dry Run\n\nInput: `1 - (2 - 3)`, stack shown as **(result, sign) pairs, bottom → top**\n\n| Char | action | `result` | `number` | `sign` | stack |\n|---|---|---:|---:|---:|---|\n| `1` | `number = 1` | 0 | 1 | 1 | `[]` |\n| `-` | `result += 1*1 = 1`; `number = 0`; `sign = -1` | 1 | 0 | -1 | `[]` |\n| `(` | push `(1, -1)`; `result = 0`; `sign = 1` | 0 | 0 | 1 | `[(1, -1)]` |\n| `2` | `number = 2` | 0 | 2 | 1 | `[(1, -1)]` |\n| `-` | `result += 1*2 = 2`; `number = 0`; `sign = -1` | 2 | 0 | -1 | `[(1, -1)]` |\n| `3` | `number = 3` | 2 | 3 | -1 | `[(1, -1)]` |\n| `)` | `result += -1*3 = -1`; pop `(1, -1)` → `result = 1 + (-1)*(-1) = 2`; `sign = 1` | 2 | 0 | 1 | `[]` |\n| end | return `result + sign*number = 2 + 0` | | | | |\n\nThe answer is `2` ✓\n\n### Unary minus — `-(3 + 4)`\n\n| Char | action | `result` | `sign` | stack |\n|---|---|---:|---:|---|\n| `-` | `result += 0`; `sign = -1` | 0 | -1 | `[]` |\n| `(` | push `(0, -1)`; `result = 0`; `sign = 1` | 0 | 1 | `[(0, -1)]` |\n| `3` | `number = 3` | 0 | 1 | `[(0, -1)]` |\n| `+` | `result += 3`; `sign = 1` | 3 | 1 | `[(0, -1)]` |\n| `4` | `number = 4` | 3 | 1 | `[(0, -1)]` |\n| `)` | `result += 4 = 7`; pop → `result = 0 + (-1)*7 = -7` | -7 | 1 | `[]` |\n\nThe answer is `-7` for `-(3 + 4)` ✓\n\n## Java Solution\n\nSee [`BasicCalculator.java`](./BasicCalculator.java).\n\n```java\npublic static int evaluate(String expression) {\n    Deque<int[]> stack = new ArrayDeque<>();\n    int result = 0;\n    int number = 0;\n    int sign = 1;\n\n    for (int i = 0; i < expression.length(); i++) {\n        char c = expression.charAt(i);\n        if (c >= '0' && c <= '9') {\n            number = number * 10 + (c - '0');\n        } else if (c == '+' || c == '-') {\n            result += sign * number;\n            number = 0;\n            sign = (c == '+') ? 1 : -1;\n        } else if (c == '(') {\n            stack.push(new int[]{result, sign});\n            result = 0;\n            number = 0;\n            sign = 1;\n        } else if (c == ')') {\n            result += sign * number;\n            number = 0;\n            int[] previous = stack.pop();\n            result = previous[0] + previous[1] * result;\n            sign = 1;\n        }\n    }\n    return result + sign * number;\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n) | One pass over the expression |\n| **Space** | O(d) | The stack holds one entry per open parenthesis (d = nesting depth) |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *\"Add `*` and `/` (LeetCode 227).\"* → operator precedence has to be respected: keep the\n  last number and the last operator and apply them late — see\n  [Basic Calculator II](BasicCalculatorII.md).\n- *\"Add parentheses-free multiplication with precedence.\"* → two stacks (shunting yard).\n- *\"Support variables and functions.\"* → the stack holds scopes; each scope keeps a map of\n  names to values.\n- *\"Evaluate it with a recursive descent parser.\"* → the same algorithm, written with a\n  method per grammar rule.\n\n**Common mistakes:**\n- ❌ Forgetting to add the pending `number` when the expression ends → the last term is\n  dropped.\n- ❌ Resetting the sign to `+1` at the wrong moment → `1 - (2 - 3)` becomes `1 - 2 + 3`.\n- ❌ Not restoring the outer `result` after `)` → the outer terms are lost.\n- ❌ Not handling the unary minus at the start → `-(2+3)` is wrong.\n\n**How to narrate:**\n> \"The sign of a term depends on the parentheses around it, so when I hit an opening\n> parenthesis I push the current result and sign on a stack and start a fresh\n> sub-expression. When I hit the closing parenthesis I finish the sub-expression and combine\n> it with the outer state as `outerResult + outerSign * innerResult`. Digits accumulate in\n> a number buffer, and `+`/`-` flush that buffer. One pass over the string, and the stack\n> depth is the nesting depth.\"\n\n## Related Problems\n\n- [Basic Calculator II](BasicCalculatorII.md) — with multiplication and division\n- [Decode String](DecodeString.md) — a stack based parser\n- [Valid Parentheses](ValidParentheses.md) — the simplest stack parser\n",i=[`evaluate`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};