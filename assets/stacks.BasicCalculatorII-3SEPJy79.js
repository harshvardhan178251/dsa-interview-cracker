var e=`stacks.BasicCalculatorII`,t=`package com.dsa.stacks;

import com.dsa.utils.FastScanner;

/**
 * Problem: Basic Calculator II
 * LeetCode: 227 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Operator precedence, Deferred evaluation
 *
 * <p>Problem:
 * Given a string containing the operators {@code +}, {@code -}, {@code *} and {@code /} and
 * integer numbers, evaluate the expression with the usual operator precedence. Division is
 * integer division that truncates towards zero.
 *
 * <p>Input format (stdin): the expression on a single line
 * <pre>
 * 3 + 2 * 2
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3 + 2 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 7
 * </pre>
 *
 * <p>Approach: keep the running total and the last number together with the last operator.
 * {@code *} and {@code /} are applied to the last number immediately, {@code +} and {@code -}
 * are deferred until the next number of the same level is known.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class BasicCalculatorII {

    /**
     * Evaluates an expression containing {@code +}, {@code -}, {@code *} and {@code /}.
     *
     * @param expression the expression
     * @return the value of the expression
     */
    public static int evaluate(String expression) {
        int result = 0;      // the terms that are completely finished
        int lastNumber = 0;  // the last number, already multiplied/divided
        int number = 0;      // the number currently being read
        char operator = '+';

        for (int i = 0; i < expression.length(); i++) {
            char c = expression.charAt(i);
            if (c >= '0' && c <= '9') {
                number = number * 10 + (c - '0');
            }
            boolean isOperator = c != ' ' && (c < '0' || c > '9');
            if (isOperator || i == expression.length() - 1) {
                switch (operator) {
                    case '+':
                        result += lastNumber;   // flush the previous term
                        lastNumber = number;
                        break;
                    case '-':
                        result += lastNumber;
                        lastNumber = -number;
                        break;
                    case '*':
                        lastNumber = lastNumber * number;
                        break;
                    case '/':
                        lastNumber = lastNumber / number;   // truncates towards zero
                        break;
                    default:
                        break;
                }
                operator = c;
                number = 0;
            }
        }
        return result + lastNumber;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        StringBuilder expression = new StringBuilder();
        while (fs.hasNext()) {
            expression.append(fs.next());
        }

        System.out.println(evaluate(expression.toString()));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Basic Calculator II
 * LeetCode: 227 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Operator precedence, Deferred evaluation
 *
 * <p>Problem:
 * Given a string containing the operators {@code +}, {@code -}, {@code *} and {@code /} and
 * integer numbers, evaluate the expression with the usual operator precedence. Division is
 * integer division that truncates towards zero.
 *
 * <p>Input format (stdin): the expression on a single line
 * <pre>
 * 3 + 2 * 2
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3 + 2 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 7
 * </pre>
 *
 * <p>Approach: keep the running total and the last number together with the last operator.
 * {@code *} and {@code /} are applied to the last number immediately, {@code +} and {@code -}
 * are deferred until the next number of the same level is known.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Evaluates an expression containing {@code +}, {@code -}, {@code *} and {@code /}.
     *
     * @param expression the expression
     * @return the value of the expression
     */
    public static int evaluate(String expression) {
        int result = 0;      // the terms that are completely finished
        int lastNumber = 0;  // the last number, already multiplied/divided
        int number = 0;      // the number currently being read
        char operator = '+';

        for (int i = 0; i < expression.length(); i++) {
            char c = expression.charAt(i);
            if (c >= '0' && c <= '9') {
                number = number * 10 + (c - '0');
            }
            boolean isOperator = c != ' ' && (c < '0' || c > '9');
            if (isOperator || i == expression.length() - 1) {
                switch (operator) {
                    case '+':
                        result += lastNumber;   // flush the previous term
                        lastNumber = number;
                        break;
                    case '-':
                        result += lastNumber;
                        lastNumber = -number;
                        break;
                    case '*':
                        lastNumber = lastNumber * number;
                        break;
                    case '/':
                        lastNumber = lastNumber / number;   // truncates towards zero
                        break;
                    default:
                        break;
                }
                operator = c;
                number = 0;
            }
        }
        return result + lastNumber;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        StringBuilder expression = new StringBuilder();
        while (fs.hasNext()) {
            expression.append(fs.next());
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
`,r="\n# Basic Calculator II — LeetCode 227\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Operator precedence · Deferred evaluation |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |\n\n## Problem Statement\n\nGiven a string containing the operators `+`, `-`, `*` and `/` and integer numbers, evaluate the\nexpression with the usual **operator precedence** (`*` and `/` before `+` and `-`).\n\n- `3 + 2 * 2` → `7`\n- `3 / 2` → `1` (integer division, truncated towards zero)\n- `2 * 3 + 4` → `10`\n\nSpaces inside the expression are ignored.\n\n## Input Format\n\nThe program reads the **expression** from standard input (a single line):\n\n```\nexpression\n```\n\n- `expression` — e.g. `3 + 2 * 2`\n\n## Sample Input\n\n```\n3 + 2 * 2\n```\n\n## Expected Output\n\n```\n7\n```\n\n## Approach — Defer the `+` and `-`\n\nThe classic trick is to keep **three** values:\n\n| Variable | Meaning |\n|---|---|\n| `result` | the terms that are completely finished |\n| `lastNumber` | the last number, already multiplied/divided, with its sign |\n| `number` | the number currently being read |\n\nand the **operator that is still pending**.\n\nWhenever a new operator is reached (or the end of the string), the **previous** operator is\napplied to the number that was just read:\n\n- `+` → flush `lastNumber` into `result` and make `lastNumber` the new number,\n- `-` → flush `lastNumber` into `result` and make `lastNumber` the **negated** number,\n- `*` → `lastNumber = lastNumber * number` (the flush has to wait),\n- `/` → `lastNumber = lastNumber / number`.\n\nAt the very end the answer is `result + lastNumber`.\n\n**Why this works:** `*` and `/` bind tighter than `+` and `-`, so they are applied to\n`lastNumber` immediately, while `+` and `-` only decide the *sign* of the term — and that\nsign can be stored without touching `result` until the term is really over.\n\n**Why not a stack?** A two-stack shunting-yard parser handles any precedence table, but this\nproblem only has one level of precedence, so three variables are enough.\n\n**Division truncates towards zero** in Java for `int` operands, which is what the problem\nasks for (`7 / 2 == 3`, `-7 / 2 == -3`).\n\n## Dry Run\n\nInput: `3 + 2 * 2` — the characters are `3`, ` `, `+`, ` `, `2`, ` `, `*`, ` `, `2`\n\nThe switch is entered when an operator is met **or** at the last character; it always\napplies the operator that was pending from the previous step.\n\n| Step | i | char | `number` | pending operator | action | `result` | `lastNumber` |\n|---:|---:|---|---:|---|---|---:|---:|\n| 1 | 0 | `3` | 3 | — | digits are only accumulated | 0 | 0 |\n| 2 | 2 | `+` | 3 | `+` (initial) | `result += lastNumber (0)`; `lastNumber = number (3)`; pending becomes `+` | 0 | 3 |\n| 3 | 4 | `2` | 2 | — | digits are only accumulated | 0 | 3 |\n| 4 | 6 | `*` | 2 | `+` | `result += lastNumber (3)`; `lastNumber = number (2)`; pending becomes `*` | 3 | 2 |\n| 5 | 8 | `2` (last char) | 2 | `*` | `lastNumber = lastNumber * number = 2 * 2 = 4` | 3 | 4 |\n\nThe answer is `result + lastNumber` = `3 + 4` = **7** ✓\n\nThe multiplication was applied to the `2` that followed it, not to the `3` — that is exactly\nwhat the precedence requires.\n\n### Division — `14 / 3`\n\n| Step | char | `number` | pending operator | action | `result` | `lastNumber` |\n|---:|---|---:|---|---|---:|---:|\n| 1 | `1` | 1 | — | accumulate | 0 | 0 |\n| 2 | `4` | 14 | — | accumulate | 0 | 0 |\n| 3 | `/` | 14 | `+` | `result += 0`; `lastNumber = 14`; pending becomes `/` | 0 | 14 |\n| 4 | `3` (last char) | 3 | `/` | `lastNumber = 14 / 3 = 4` | 0 | 4 |\n\nThe answer is `0 + 4` = **4** ✓ (integer division truncates).\n\n## Java Solution\n\nSee [`BasicCalculatorII.java`](./BasicCalculatorII.java).\n\n```java\npublic static int evaluate(String expression) {\n    int result = 0;\n    int lastNumber = 0;\n    int number = 0;\n    char operator = '+';\n\n    for (int i = 0; i < expression.length(); i++) {\n        char c = expression.charAt(i);\n        if (c >= '0' && c <= '9') {\n            number = number * 10 + (c - '0');\n        }\n        boolean isOperator = c != ' ' && (c < '0' || c > '9');\n        if (isOperator || i == expression.length() - 1) {\n            switch (operator) {\n                case '+':\n                    result += lastNumber;\n                    lastNumber = number;\n                    break;\n                case '-':\n                    result += lastNumber;\n                    lastNumber = -number;\n                    break;\n                case '*':\n                    lastNumber = lastNumber * number;\n                    break;\n                case '/':\n                    lastNumber = lastNumber / number;\n                    break;\n                default:\n                    break;\n            }\n            operator = c;\n            number = 0;\n        }\n    }\n    return result + lastNumber;\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n) | One pass over the expression |\n| **Space** | O(1) | Four variables, no stack |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *\"Add parentheses too (LeetCode 224 + 227 combined).\"* → a stack of `(result, lastNumber,\n  operator)` frames; that is the natural next step.\n- *\"Support an arbitrary precedence table.\"* → the shunting-yard algorithm with two stacks.\n- *\"What about floating point division?\"* → use `double` and be careful with the rounding.\n- *\"What if the expression contains variables?\"* → a map from names to values, resolved when\n  the identifier is read.\n\n**Common mistakes:**\n- ❌ Applying the **new** operator instead of the **pending** one → the precedence is off by\n  one term.\n- ❌ Forgetting the `i == length - 1` case → the last number is never flushed.\n- ❌ Treating a space as an operator → `3 + 2` would be split at the space and produce\n  garbage.\n- ❌ Using floating point division and truncating later → `7 / 2` must be `3`, not `3.5`.\n\n**How to narrate:**\n> \"I keep a running total, a last number and the pending operator. When I hit an operator I\n> apply the *previous* operator to the number I just read: `*` and `/` are applied to the\n> last number immediately, while `+` and `-` flush the last number into the total and store\n> the new number with its sign. At the end the answer is the total plus the last number.\n> One pass, O(1) space.\"\n\n## Related Problems\n\n- [Basic Calculator](BasicCalculator.md) — parentheses instead of precedence\n- [Evaluate Reverse Polish Notation](EvaluateReversePolishNotation.md) — postfix evaluation\n- [Decode String](DecodeString.md) — another stack parser\n",i=[`evaluate`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};