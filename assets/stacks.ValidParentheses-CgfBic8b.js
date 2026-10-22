var e=`stacks.ValidParentheses`,t=`package com.dsa.stacks;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Valid Parentheses
 * LeetCode: 20 | Difficulty: Easy | Frequency: 5/5
 * Pattern: Stack, Bracket matching
 *
 * <p>Problem:
 * Given a string containing the characters {@code ( ) [ ] { }}, decide whether the brackets
 * are balanced: every opening bracket must be closed by the same type of bracket, and the
 * brackets must be closed in the correct order.
 *
 * <p>Input format (stdin): a single line with the bracket string
 * <pre>
 * ()[]{}
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * ()[]{}
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: push every opening bracket on a stack; for every closing bracket the top of
 * the stack must be its matching opening bracket.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class ValidParentheses {

    /**
     * Returns {@code true} when the bracket string is balanced.
     *
     * @param s the string of brackets
     * @return whether the brackets are balanced
     */
    public static boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '(' || c == '[' || c == '{') {
                stack.push(c);                       // remember what has to be closed
            } else {
                if (stack.isEmpty()) {
                    return false;                    // a closing bracket without an opener
                }
                char open = stack.pop();
                if (!matches(open, c)) {
                    return false;                    // the types do not match
                }
            }
        }
        return stack.isEmpty();                      // no opening bracket left unclosed
    }

    /** Returns whether the closing bracket {@code close} matches the opening bracket {@code open}. */
    private static boolean matches(char open, char close) {
        return (open == '(' && close == ')')
                || (open == '[' && close == ']')
                || (open == '{' && close == '}');
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(isValid(s) ? "true" : "false");
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
 * Problem: Valid Parentheses
 * LeetCode: 20 | Difficulty: Easy | Frequency: 5/5
 * Pattern: Stack, Bracket matching
 *
 * <p>Problem:
 * Given a string containing the characters {@code ( ) [ ] { }}, decide whether the brackets
 * are balanced: every opening bracket must be closed by the same type of bracket, and the
 * brackets must be closed in the correct order.
 *
 * <p>Input format (stdin): a single line with the bracket string
 * <pre>
 * ()[]{}
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * ()[]{}
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: push every opening bracket on a stack; for every closing bracket the top of
 * the stack must be its matching opening bracket.
 *
 * <p>Complexity: Time O(n), Space O(n).
 */
public class Main {

    /**
     * Returns {@code true} when the bracket string is balanced.
     *
     * @param s the string of brackets
     * @return whether the brackets are balanced
     */
    public static boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '(' || c == '[' || c == '{') {
                stack.push(c);                       // remember what has to be closed
            } else {
                if (stack.isEmpty()) {
                    return false;                    // a closing bracket without an opener
                }
                char open = stack.pop();
                if (!matches(open, c)) {
                    return false;                    // the types do not match
                }
            }
        }
        return stack.isEmpty();                      // no opening bracket left unclosed
    }

    /** Returns whether the closing bracket {@code close} matches the opening bracket {@code open}. */
    private static boolean matches(char open, char close) {
        return (open == '(' && close == ')')
                || (open == '[' && close == ']')
                || (open == '{' && close == '}');
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(isValid(s) ? "true" : "false");
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
# Valid Parentheses — LeetCode 20

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Stack · Bracket matching |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg, Adobe |

## Problem Statement

Given a string containing only the characters \`( ) [ ] { }\`, decide whether the brackets are
**balanced**:

- every opening bracket is closed by a bracket of the same type,
- and the closing happens in the correct order (last opened, first closed).

\`()\` and \`([]{})\` are balanced; \`([)]\` and \`(\` are not.

## Input Format

The program reads a **single line** from standard input:

\`\`\`
brackets
\`\`\`

- \`brackets\` — the bracket string (1 ≤ length ≤ 10⁴)

## Sample Input

\`\`\`
()[]{}
\`\`\`

## Expected Output

\`\`\`
true
\`\`\`

## Approach — A Stack of Unclosed Brackets

The rule "last opened, first closed" is exactly what a **stack** does, so the algorithm is
almost a restatement of the definition:

1. Push every **opening** bracket.
2. For every **closing** bracket:
   - if the stack is empty → \`false\` (a closing bracket with nothing to close),
   - pop the top and check that it is the matching opening bracket → if not, \`false\`.
3. At the end the stack must be empty → otherwise some opening bracket was never closed.

**Why the stack and not a counter?** A counter only tracks *how many* brackets are open; it
cannot tell you that \`([)]\` is invalid, because the types are interleaved. The stack keeps
the **order**, which is exactly the information the problem is about.

**Why not recursion?** A recursive solution is elegant (push, recurse, pop) but costs O(n)
stack space in the call frames and blows up on a 10⁴-character input. The explicit stack is
the same idea with a predictable memory cost.

## Dry Run

Input: \`()[]{}\`

| Step | char | stack before | action | stack after |
|---:|---|---|---|---|
| 1 | \`(\` | \`[]\` | push \`(\` | \`[(]\` |
| 2 | \`)\` | \`[(]\` | pop \`(\` → matches | \`[]\` |
| 3 | \`[\` | \`[]\` | push \`[\` | \`[[]\` |
| 4 | \`]\` | \`[[]\` | pop \`[\` → matches | \`[]\` |
| 5 | \`{\` | \`[]\` | push \`{\` | \`[{]\` |
| 6 | \`}\` | \`[{]\` | pop \`{\` → matches | \`[]\` |

The stack is empty at the end → **balanced** ✓

### Counter-example — \`([)]\`

| Step | char | stack before | action | stack after | verdict |
|---:|---|---|---|---|---|
| 1 | \`(\` | \`[]\` | push | \`[(]\` | |
| 2 | \`[\` | \`[(]\` | push | \`[[(]\` | |
| 3 | \`)\` | \`[[(]\` | pop \`[\` → does **not** match \`)\` | \`[(]\` | **false** |

The types are interleaved, so the bracket that closes \`(\` was never opened at that point. ✓

## Java Solution

See [\`ValidParentheses.java\`](./ValidParentheses.java).

\`\`\`java
public static boolean isValid(String s) {
    Deque<Character> stack = new ArrayDeque<>();
    for (int i = 0; i < s.length(); i++) {
        char c = s.charAt(i);
        if (c == '(' || c == '[' || c == '{') {
            stack.push(c);
        } else {
            if (stack.isEmpty()) {
                return false;
            }
            char open = stack.pop();
            if (!matches(open, c)) {
                return false;
            }
        }
    }
    return stack.isEmpty();
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One pass; every character is pushed and popped at most once |
| **Space** | O(n) | The stack holds the unclosed brackets |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the string also contains other characters?"* → ignore everything that is not a
  bracket.
- *"Return the position of the first invalid bracket."* → track the index and report it
  instead of a boolean.
- *"What about the *longest valid parentheses* (LeetCode 32)?"* → keep the **indices** on
  the stack and use a sentinel \`-1\` for the "last invalid position" — a classic stack
  variation.
- *"Do it with a counter."* → only possible if there is a single bracket type.

**Common mistakes:**
- ❌ Checking only the **count** of open and closed brackets → \`([)]\` would pass.
- ❌ Forgetting the "stack is empty" check before popping → \`NullPointerException\` on \`")"\`.
- ❌ Not checking that the stack is empty at the end → \`"("\` would be reported as valid.

**How to narrate:**
> "The rule is last opened, first closed, which is a stack. I push every opening bracket and
> for every closing bracket I pop the top — it has to be the matching opening bracket, and
> the stack must not be empty. At the end the stack must be empty too. That's O(n) time and
> O(n) space, and it is the only approach that also checks the *types*."

## Related Problems

- [Decode String](DecodeString.md) — stack based parsing
- [Basic Calculator](BasicCalculator.md) — a stack of pending results
- [Minimum Stack](MinStack.md) — the other classic stack design
`,i=[`isValid`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};