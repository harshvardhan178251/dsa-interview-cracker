var e=`stacks.MinStack`,t=`package com.dsa.stacks;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

/**
 * Problem: Min Stack
 * LeetCode: 155 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Stack, Auxiliary minimum tracking
 *
 * <p>Problem:
 * Design a stack that supports pushing an integer, popping the top element, retrieving the
 * top element and retrieving the minimum element — all in **constant time**.
 *
 * <p>Input format (stdin): a number of operations, one per line
 * <pre>
 * q
 * push 5
 * getMin
 * ...
 * </pre>
 * The program prints one line per query operation ({@code top} or {@code getMin}).
 *
 * <p>Sample input:
 * <pre>
 * 6
 * push 5
 * push 3
 * getMin
 * pop
 * top
 * getMin
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * 5
 * 5
 * </pre>
 *
 * <p>Approach: every entry stores the value **and** the minimum of the stack at the moment
 * it was pushed.
 *
 * <p>Complexity: Time O(1) per operation, Space O(n).
 */
public class MinStack {

    /** One stack entry: the value and the minimum of the stack when it was pushed. */
    public static class Entry {
        public final int value;
        public final int min;

        public Entry(int value, int min) {
            this.value = value;
            this.min = min;
        }
    }

    private final Deque<Entry> stack = new ArrayDeque<>();

    /**
     * Pushes a value onto the stack.
     *
     * @param value the value to push
     */
    public void push(int value) {
        int min = stack.isEmpty() ? value : Math.min(value, stack.peek().min);
        stack.push(new Entry(value, min));
    }

    /**
     * Removes the top element.
     *
     * @return the removed value, or {@code null} when the stack was empty
     */
    public Integer pop() {
        if (stack.isEmpty()) {
            return null;
        }
        return stack.pop().value;
    }

    /**
     * Returns the top element without removing it.
     *
     * @return the top value, or {@code null} when the stack is empty
     */
    public Integer top() {
        return stack.isEmpty() ? null : stack.peek().value;
    }

    /**
     * Returns the smallest value currently on the stack.
     *
     * @return the minimum, or {@code null} when the stack is empty
     */
    public Integer getMin() {
        return stack.isEmpty() ? null : stack.peek().min;
    }

    /**
     * Replays a list of operations and returns the answers of the query operations.
     *
     * @param operations operations such as {@code "push 5"}, {@code "pop"}, {@code "top"},
     *                    {@code "getMin"}
     * @return the answers, one per query operation
     */
    public static List<Integer> simulate(String[] operations) {
        MinStack stack = new MinStack();
        List<Integer> answers = new ArrayList<>();
        for (String operation : operations) {
            String[] parts = operation.trim().split("\\\\s+");
            String kind = parts[0].toLowerCase();
            switch (kind) {
                case "push":
                    stack.push(Integer.parseInt(parts[1]));
                    break;
                case "pop":
                    stack.pop();
                    break;
                case "top":
                    answers.add(stack.top());
                    break;
                case "getmin":
                    answers.add(stack.getMin());
                    break;
                default:
                    break;
            }
        }
        return answers;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int q = fs.nextInt();

        String[] operations = new String[q];
        for (int i = 0; i < q; i++) {
            String kind = fs.next();
            if ("push".equalsIgnoreCase(kind)) {
                operations[i] = "push " + fs.nextInt();
            } else {
                operations[i] = kind;
            }
        }

        StringBuilder sb = new StringBuilder();
        for (Integer answer : simulate(operations)) {
            if (sb.length() > 0) {
                sb.append('\\n');
            }
            sb.append(answer == null ? "empty" : String.valueOf(answer));
        }
        System.out.println(sb);
    }
}
`,n=`import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Min Stack
 * LeetCode: 155 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Stack, Auxiliary minimum tracking
 *
 * <p>Problem:
 * Design a stack that supports pushing an integer, popping the top element, retrieving the
 * top element and retrieving the minimum element — all in **constant time**.
 *
 * <p>Input format (stdin): a number of operations, one per line
 * <pre>
 * q
 * push 5
 * getMin
 * ...
 * </pre>
 * The program prints one line per query operation ({@code top} or {@code getMin}).
 *
 * <p>Sample input:
 * <pre>
 * 6
 * push 5
 * push 3
 * getMin
 * pop
 * top
 * getMin
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * 5
 * 5
 * </pre>
 *
 * <p>Approach: every entry stores the value **and** the minimum of the stack at the moment
 * it was pushed.
 *
 * <p>Complexity: Time O(1) per operation, Space O(n).
 */
public class Main {

    /** One stack entry: the value and the minimum of the stack when it was pushed. */
    public static class Entry {
        public final int value;
        public final int min;

        public Entry(int value, int min) {
            this.value = value;
            this.min = min;
        }
    }

    private final Deque<Entry> stack = new ArrayDeque<>();

    /**
     * Pushes a value onto the stack.
     *
     * @param value the value to push
     */
    public void push(int value) {
        int min = stack.isEmpty() ? value : Math.min(value, stack.peek().min);
        stack.push(new Entry(value, min));
    }

    /**
     * Removes the top element.
     *
     * @return the removed value, or {@code null} when the stack was empty
     */
    public Integer pop() {
        if (stack.isEmpty()) {
            return null;
        }
        return stack.pop().value;
    }

    /**
     * Returns the top element without removing it.
     *
     * @return the top value, or {@code null} when the stack is empty
     */
    public Integer top() {
        return stack.isEmpty() ? null : stack.peek().value;
    }

    /**
     * Returns the smallest value currently on the stack.
     *
     * @return the minimum, or {@code null} when the stack is empty
     */
    public Integer getMin() {
        return stack.isEmpty() ? null : stack.peek().min;
    }

    /**
     * Replays a list of operations and returns the answers of the query operations.
     *
     * @param operations operations such as {@code "push 5"}, {@code "pop"}, {@code "top"},
     *                    {@code "getMin"}
     * @return the answers, one per query operation
     */
    public static List<Integer> simulate(String[] operations) {
        Main stack = new Main();
        List<Integer> answers = new ArrayList<>();
        for (String operation : operations) {
            String[] parts = operation.trim().split("\\\\s+");
            String kind = parts[0].toLowerCase();
            switch (kind) {
                case "push":
                    stack.push(Integer.parseInt(parts[1]));
                    break;
                case "pop":
                    stack.pop();
                    break;
                case "top":
                    answers.add(stack.top());
                    break;
                case "getmin":
                    answers.add(stack.getMin());
                    break;
                default:
                    break;
            }
        }
        return answers;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int q = fs.nextInt();

        String[] operations = new String[q];
        for (int i = 0; i < q; i++) {
            String kind = fs.next();
            if ("push".equalsIgnoreCase(kind)) {
                operations[i] = "push " + fs.nextInt();
            } else {
                operations[i] = kind;
            }
        }

        StringBuilder sb = new StringBuilder();
        for (Integer answer : simulate(operations)) {
            if (sb.length() > 0) {
                sb.append('\\n');
            }
            sb.append(answer == null ? "empty" : String.valueOf(answer));
        }
        System.out.println(sb);
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
# Min Stack — LeetCode 155

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Stack · Auxiliary minimum tracking |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

Design a stack that supports \`push\`, \`pop\`, \`top\` and \`getMin\`, and does all of them in
**O(1)** time.

- \`getMin\` must return the smallest value currently on the stack.
- \`pop\` removes the top element.
- A query on an empty stack answers \`empty\`.

## Input Format

The program reads from standard input: a count, then one operation per line.

\`\`\`
q
push <value>
pop
top
getMin
\`\`\`

- \`q\` — the number of operations (1 ≤ q ≤ 10⁵)
- \`push v\` — push the integer \`v\` (|v| ≤ 2³¹ − 1)
- \`pop\` — remove the top element
- \`top\` — query the top element
- \`getMin\` — query the smallest element

The program prints **one line per query** (\`top\` or \`getMin\`), in the order the queries
appear. \`push\` and \`pop\` produce no output.

## Sample Input

\`\`\`
6
push 5
push 3
getMin
pop
top
getMin
\`\`\`

## Expected Output

\`\`\`
3
5
5
\`\`\`

The minimum of \`{5, 3}\` is \`3\`; after popping \`3\` the top is \`5\` and the minimum is \`5\`. ✓

## Approach — Store the Minimum With Every Entry

A plain stack cannot answer \`getMin\` in O(1): the minimum may be anywhere inside it, and
scanning the whole stack is O(n).

The fix is to keep the running minimum **alongside** each value. Every entry becomes a pair
\`(value, minSoFar)\`:

- \`push(x)\` → store \`(x, min(x, currentMin))\`; for an empty stack the minimum is \`x\` itself.
- \`pop()\` → remove the top entry; the minimum of the remaining stack is already stored in
  the new top entry.
- \`top()\` → the \`value\` of the top entry.
- \`getMin()\` → the \`min\` of the top entry.

The trick is that the minimum of the stack *after* a pop is exactly the minimum that was
recorded when the popped element was pushed — no recomputation is needed.

**Alternative:** two stacks (one for the values, one for the minima). Same complexity, more
memory traffic. The single stack of pairs is the cleaner answer.

**Why not a min-heap?** A heap gives O(1) \`getMin\` but O(log n) \`pop\`, and it does not
preserve LIFO order.

## Dry Run

Input: \`push 5\`, \`push 3\`, \`getMin\`, \`pop\`, \`top\`, \`getMin\`

| Step | operation | stack (top → bottom) | answer |
|---:|---|---|---|
| 1 | \`push 5\` | \`[(5, 5)]\` | — |
| 2 | \`push 3\` | \`[(3, 3), (5, 5)]\` | — |
| 3 | \`getMin\` | \`[(3, 3), (5, 5)]\` | \`3\` — the top entry's \`min\` |
| 4 | \`pop\` | \`[(5, 5)]\` | — (the popped value was \`3\`) |
| 5 | \`top\` | \`[(5, 5)]\` | \`5\` — the top entry's \`value\` |
| 6 | \`getMin\` | \`[(5, 5)]\` | \`5\` — the top entry's \`min\` |

The output is

\`\`\`
3
5
5
\`\`\`

✓ — note how step 4 needs no recomputation: the new top already carries the minimum \`5\`.

### Edge case — a query on an empty stack

| Step | operation | stack | answer |
|---:|---|---|---|
| 1 | \`getMin\` | \`[]\` | \`empty\` |

## Java Solution

See [\`MinStack.java\`](./MinStack.java).

\`\`\`java
public void push(int value) {
    int min = stack.isEmpty() ? value : Math.min(value, stack.peek().min);
    stack.push(new Entry(value, min));
}

public Integer pop() {
    if (stack.isEmpty()) {
        return null;
    }
    return stack.pop().value;
}

public Integer top() {
    return stack.isEmpty() ? null : stack.peek().value;
}

public Integer getMin() {
    return stack.isEmpty() ? null : stack.peek().min;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(1) per operation | One push, one pop or one read — no scanning |
| **Space** | O(n) | One entry per element (the value plus the running minimum) |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the values are strings?"* → the same idea, the \`min\` becomes the lexicographically
  smallest string.
- *"Implement a max stack, a sum stack, a product stack."* → the same pattern with a
  different combination function.
- *"What about a queue with a minimum?"* → two stacks (in-stack/out-stack) or the same
  trick with a deque.
- *"Support \`getMin\` without extra memory per element."* → you cannot: the information has
  to be stored somewhere, either in the entries or in a parallel structure.

**Common mistakes:**
- ❌ Storing the minimum in a **separate variable** → after a pop the variable is stale.
- ❌ Forgetting the empty-stack case in \`min\` computation → \`Math.min(x, peek().min)\` throws
  when the stack is empty.
- ❌ Storing the *global* minimum instead of the minimum **at push time** → popping the
  minimum exposes a wrong answer.

**How to narrate:**
> "A stack alone cannot answer \`getMin\` in constant time, so I store the running minimum
> inside every entry: each element is a pair of the value and the minimum of the stack when
> it was pushed. Push computes the new minimum, pop just removes the entry, and \`getMin\`
> reads the \`min\` field of the top entry — after a pop the new top already carries the
> correct minimum, so nothing has to be recomputed. All operations are O(1)."

## Related Problems

- [Valid Parentheses](ValidParentheses.md) — the classic stack exercise
- [Evaluate Reverse Polish Notation](EvaluateReversePolishNotation.md) — stack of operands
- [Decode String](DecodeString.md) — a stack of partial results
`,i=[`simulate`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};