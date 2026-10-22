var e=`stacks.EvaluateReversePolishNotation`,t=`package com.dsa.stacks;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Evaluate Reverse Polish Notation
 * LeetCode: 150 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Stack, Postfix evaluation
 *
 * <p>Problem:
 * Evaluate an expression given in **reverse polish notation** (postfix). The operators
 * {@code + - * /} are placed after their operands.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * token[0] token[1] ... token[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 2 1 + 3 * 4 -
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Approach: push the numbers on a stack; when an operator appears, pop the two topmost
 * values, combine them and push the result back.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class EvaluateReversePolishNotation {

    /**
     * Evaluates a postfix expression.
     *
     * @param tokens the tokens of the expression
     * @return the value of the expression
     */
    public static int evaluate(String[] tokens) {
        Deque<Integer> stack = new ArrayDeque<>();

        for (String token : tokens) {
            if (isOperator(token)) {
                int right = stack.pop();     // the right operand is on top
                int left = stack.pop();      // then the left operand
                stack.push(apply(token, left, right));
            } else {
                stack.push(Integer.parseInt(token));
            }
        }
        return stack.pop();
    }

    private static boolean isOperator(String token) {
        return token.equals("+") || token.equals("-") || token.equals("*") || token.equals("/");
    }

    private static int apply(String operator, int left, int right) {
        switch (operator) {
            case "+":
                return left + right;
            case "-":
                return left - right;
            case "*":
                return left * right;
            case "/":
                return left / right;     // truncates towards zero
            default:
                throw new IllegalArgumentException("unknown operator: " + operator);
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        String[] tokens = fs.nextStringArray(n);

        System.out.println(evaluate(tokens));
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
 * Problem: Evaluate Reverse Polish Notation
 * LeetCode: 150 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Stack, Postfix evaluation
 *
 * <p>Problem:
 * Evaluate an expression given in **reverse polish notation** (postfix). The operators
 * {@code + - * /} are placed after their operands.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * token[0] token[1] ... token[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 2 1 + 3 * 4 -
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Approach: push the numbers on a stack; when an operator appears, pop the two topmost
 * values, combine them and push the result back.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class Main {

    /**
     * Evaluates a postfix expression.
     *
     * @param tokens the tokens of the expression
     * @return the value of the expression
     */
    public static int evaluate(String[] tokens) {
        Deque<Integer> stack = new ArrayDeque<>();

        for (String token : tokens) {
            if (isOperator(token)) {
                int right = stack.pop();     // the right operand is on top
                int left = stack.pop();      // then the left operand
                stack.push(apply(token, left, right));
            } else {
                stack.push(Integer.parseInt(token));
            }
        }
        return stack.pop();
    }

    private static boolean isOperator(String token) {
        return token.equals("+") || token.equals("-") || token.equals("*") || token.equals("/");
    }

    private static int apply(String operator, int left, int right) {
        switch (operator) {
            case "+":
                return left + right;
            case "-":
                return left - right;
            case "*":
                return left * right;
            case "/":
                return left / right;     // truncates towards zero
            default:
                throw new IllegalArgumentException("unknown operator: " + operator);
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        String[] tokens = fs.nextStringArray(n);

        System.out.println(evaluate(tokens));
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
`,r=`
# Evaluate Reverse Polish Notation — LeetCode 150

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Stack · Postfix evaluation |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

Evaluate an expression given in **reverse polish notation** (postfix notation), where the
operator comes **after** its operands.

- \`2 1 + 3 * 4 -\` → \`5\` (that is \`((2 + 1) * 3) - 4\`)
- \`4 2 +\` → \`6\`
- Division is integer division that truncates towards zero.

## Input Format

The program reads from standard input:

\`\`\`
n
token[0] token[1] ... token[n-1]
\`\`\`

- \`n\` — the number of tokens (1 ≤ n ≤ 10⁵)
- \`tokens\` — n space-separated tokens: either an integer or one of \`+ - * /\`

## Sample Input

\`\`\`
7
2 1 + 3 * 4 -
\`\`\`

## Expected Output

\`\`\`
5
\`\`\`

## Approach — The Stack Is the Expression

Postfix notation exists precisely so that an expression can be evaluated with a stack and
nothing else. The rule is one sentence:

> Push every number. When you meet an operator, pop the **right** operand, pop the **left**
> operand, push the result.

The order of the two pops matters: for \`-\` and \`/\` the operands are not commutative, and the
**right** operand is on top of the stack.

**Why the order is guaranteed:** in postfix notation the operands of an operator always
appear before it, so by the time the operator is reached both operands are already on the
stack, and the most recently pushed one is the right operand.

At the end exactly one value is left on the stack — the answer.

**Why this problem is a stack exercise, not a parsing exercise:** there is no grammar to
follow and no parentheses to match. The stack *is* the expression.

## Dry Run

Input: \`2 1 + 3 * 4 -\`, stack shown **bottom → top**

| Step | token | action | stack |
|---:|---|---|---|
| 1 | \`2\` | push 2 | \`[2]\` |
| 2 | \`1\` | push 1 | \`[2, 1]\` |
| 3 | \`+\` | pop right = 1, pop left = 2 → push \`2 + 1 = 3\` | \`[3]\` |
| 4 | \`3\` | push 3 | \`[3, 3]\` |
| 5 | \`*\` | pop right = 3, pop left = 3 → push \`3 * 3 = 9\` | \`[9]\` |
| 6 | \`4\` | push 4 | \`[9, 4]\` |
| 7 | \`-\` | pop right = 4, pop left = 9 → push \`9 - 4 = 5\` | \`[5]\` |

The stack holds a single value: \`5\` ✓

### Order matters — \`5 1 -\`

| Step | token | action | stack |
|---:|---|---|---|
| 1 | \`5\` | push 5 | \`[5]\` |
| 2 | \`1\` | push 1 | \`[5, 1]\` |
| 3 | \`-\` | pop right = 1, pop left = 5 → push \`5 - 1 = 4\` | \`[4]\` |

Popping in the wrong order would give \`1 - 5 = -4\` ✗

## Java Solution

See [\`EvaluateReversePolishNotation.java\`](./EvaluateReversePolishNotation.java).

\`\`\`java
public static int evaluate(String[] tokens) {
    Deque<Integer> stack = new ArrayDeque<>();

    for (String token : tokens) {
        if (isOperator(token)) {
            int right = stack.pop();     // the right operand is on top
            int left = stack.pop();      // then the left operand
            stack.push(apply(token, left, right));
        } else {
            stack.push(Integer.parseInt(token));
        }
    }
    return stack.pop();
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Every token is processed once, each push/pop is O(1) |
| **Space** | O(n) | The stack |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Convert infix to postfix."* → the shunting-yard algorithm with an operator stack and a
  precedence table.
- *"Evaluate infix directly with two stacks."* → one stack of values, one of operators.
- *"Add the \`^\` operator (right associative)."* → the shunting-yard algorithm handles the
  associativity rules; a single stack does not.
- *"What about unary minus?"* → it needs a context flag: an operator expecting an operand
  versus one expecting a value.

**Common mistakes:**
- ❌ Popping the operands in the wrong order → subtraction and division give wrong results.
- ❌ Treating a negative number as an operator → check the token, not the first character.
- ❌ Forgetting to push the result back after an operation → the stack loses a value.
- ❌ Using \`int\` division and expecting a float → Java's \`int\` division truncates towards
  zero.

**How to narrate:**
> "Postfix is designed for a stack. I push every number. When I see an operator I pop the
> right operand first, then the left one, compute the result and push it back. At the end
> the single remaining value is the answer. The pop order matters for \`-\` and \`/\` because
> those operators are not commutative. O(n) time, O(n) space."

## Related Problems

- [Basic Calculator II](BasicCalculatorII.md) — infix with precedence
- [Basic Calculator](BasicCalculator.md) — infix with parentheses
- [Decode String](DecodeString.md) — stack of partial results
`,i=[`evaluate`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};