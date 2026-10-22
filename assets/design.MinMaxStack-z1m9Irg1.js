var e=`design.MinMaxStack`,t=`package com.dsa.design;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Min Max Stack
 * LeetCode: null | Difficulty: Medium | Frequency: 3/5
 * Pattern: Design, Stack with running aggregates
 *
 * <p>Problem:
 * Implement a stack that supports {@code push}, {@code pop}, {@code top}, {@code getMin}
 * and {@code getMax}, where {@code getMin} and {@code getMax} must return the minimum and
 * maximum of the whole stack in O(1) time.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * push v
 * pop
 * top
 * getMin
 * getMax
 * ...
 * </pre>
 * {@code push} prints nothing; every other operation prints one line with its result
 * ({@code -1} when the stack is empty).
 *
 * <p>Sample input:
 * <pre>
 * 7
 * push 5
 * push 3
 * push 7
 * getMin
 * getMax
 * pop
 * top
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * 7
 * 7
 * 3
 * </pre>
 *
 * <p>Approach: every frame stores the pushed value <em>together with</em> the running
 * minimum and maximum of the stack up to that frame. Pushing computes the new extremes in
 * O(1); popping simply discards a frame, which restores the previous extremes for free.
 *
 * <p>Complexity: Time O(1) per operation, Space O(n).
 */
public class MinMaxStack {

    /** One stack frame: the value plus the running min and max below it. */
    static final class Frame {
        final int value;
        final int min;
        final int max;

        Frame(int value, int min, int max) {
            this.value = value;
            this.min = min;
            this.max = max;
        }
    }

    private final Deque<Frame> stack = new ArrayDeque<>();

    /** Pushes {@code value} onto the stack. */
    public void push(int value) {
        int min = stack.isEmpty() ? value : Math.min(value, stack.peek().min);
        int max = stack.isEmpty() ? value : Math.max(value, stack.peek().max);
        stack.push(new Frame(value, min, max));
    }

    /** Removes and returns the top value, or {@code -1} when the stack is empty. */
    public int pop() {
        if (stack.isEmpty()) {
            return -1;
        }
        return stack.pop().value;
    }

    /** Returns the top value without removing it, or {@code -1} when the stack is empty. */
    public int top() {
        return stack.isEmpty() ? -1 : stack.peek().value;
    }

    /** Returns the smallest value on the stack, or {@code -1} when the stack is empty. */
    public int getMin() {
        return stack.isEmpty() ? -1 : stack.peek().min;
    }

    /** Returns the largest value on the stack, or {@code -1} when the stack is empty. */
    public int getMax() {
        return stack.isEmpty() ? -1 : stack.peek().max;
    }

    /** Number of elements on the stack. */
    public int size() {
        return stack.size();
    }

    /** Human readable snapshot of the stack, top first. */
    public String state() {
        StringBuilder sb = new StringBuilder("[");
        boolean first = true;
        for (Frame frame : stack) {
            if (!first) {
                sb.append(", ");
            }
            first = false;
            sb.append(frame.value);
        }
        return sb.append(']').toString();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        MinMaxStack stack = new MinMaxStack();

        StringBuilder out = new StringBuilder();
        for (int i = 0; i < n; i++) {
            String command = fs.next();
            if ("push".equals(command)) {
                stack.push(fs.nextInt());
            } else if ("pop".equals(command)) {
                out.append(stack.pop()).append('\\n');
            } else if ("top".equals(command)) {
                out.append(stack.top()).append('\\n');
            } else if ("getMin".equals(command)) {
                out.append(stack.getMin()).append('\\n');
            } else if ("getMax".equals(command)) {
                out.append(stack.getMax()).append('\\n');
            }
        }
        System.out.print(out);
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
 * Problem: Min Max Stack
 * LeetCode: null | Difficulty: Medium | Frequency: 3/5
 * Pattern: Design, Stack with running aggregates
 *
 * <p>Problem:
 * Implement a stack that supports {@code push}, {@code pop}, {@code top}, {@code getMin}
 * and {@code getMax}, where {@code getMin} and {@code getMax} must return the minimum and
 * maximum of the whole stack in O(1) time.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * push v
 * pop
 * top
 * getMin
 * getMax
 * ...
 * </pre>
 * {@code push} prints nothing; every other operation prints one line with its result
 * ({@code -1} when the stack is empty).
 *
 * <p>Sample input:
 * <pre>
 * 7
 * push 5
 * push 3
 * push 7
 * getMin
 * getMax
 * pop
 * top
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * 7
 * 7
 * 3
 * </pre>
 *
 * <p>Approach: every frame stores the pushed value <em>together with</em> the running
 * minimum and maximum of the stack up to that frame. Pushing computes the new extremes in
 * O(1); popping simply discards a frame, which restores the previous extremes for free.
 *
 * <p>Complexity: Time O(1) per operation, Space O(n).
 */
public class Main {

    /** One stack frame: the value plus the running min and max below it. */
    static final class Frame {
        final int value;
        final int min;
        final int max;

        Frame(int value, int min, int max) {
            this.value = value;
            this.min = min;
            this.max = max;
        }
    }

    private final Deque<Frame> stack = new ArrayDeque<>();

    /** Pushes {@code value} onto the stack. */
    public void push(int value) {
        int min = stack.isEmpty() ? value : Math.min(value, stack.peek().min);
        int max = stack.isEmpty() ? value : Math.max(value, stack.peek().max);
        stack.push(new Frame(value, min, max));
    }

    /** Removes and returns the top value, or {@code -1} when the stack is empty. */
    public int pop() {
        if (stack.isEmpty()) {
            return -1;
        }
        return stack.pop().value;
    }

    /** Returns the top value without removing it, or {@code -1} when the stack is empty. */
    public int top() {
        return stack.isEmpty() ? -1 : stack.peek().value;
    }

    /** Returns the smallest value on the stack, or {@code -1} when the stack is empty. */
    public int getMin() {
        return stack.isEmpty() ? -1 : stack.peek().min;
    }

    /** Returns the largest value on the stack, or {@code -1} when the stack is empty. */
    public int getMax() {
        return stack.isEmpty() ? -1 : stack.peek().max;
    }

    /** Number of elements on the stack. */
    public int size() {
        return stack.size();
    }

    /** Human readable snapshot of the stack, top first. */
    public String state() {
        StringBuilder sb = new StringBuilder("[");
        boolean first = true;
        for (Frame frame : stack) {
            if (!first) {
                sb.append(", ");
            }
            first = false;
            sb.append(frame.value);
        }
        return sb.append(']').toString();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        Main stack = new Main();

        StringBuilder out = new StringBuilder();
        for (int i = 0; i < n; i++) {
            String command = fs.next();
            if ("push".equals(command)) {
                stack.push(fs.nextInt());
            } else if ("pop".equals(command)) {
                out.append(stack.pop()).append('\\n');
            } else if ("top".equals(command)) {
                out.append(stack.top()).append('\\n');
            } else if ("getMin".equals(command)) {
                out.append(stack.getMin()).append('\\n');
            } else if ("getMax".equals(command)) {
                out.append(stack.getMax()).append('\\n');
            }
        }
        System.out.print(out);
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
`,r='\n# Min Max Stack\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Design · Stack · Running aggregates |\n| **Interview heat** | ★★★☆☆ |\n| **Asked at** | Amazon, Google, Meta, Uber, Bloomberg |\n\n## Problem Statement\n\nImplement a stack that supports\n\n- `push(value)` — push a value,\n- `pop()` — remove and return the top value,\n- `top()` — read the top value,\n- `getMin()` — the smallest value **anywhere** in the stack,\n- `getMax()` — the largest value anywhere in the stack,\n\nwhere `getMin` and `getMax` must be **O(1)**.\n\n## Input Format\n\n```\nn\npush v\npop\ntop\ngetMin\ngetMax\n...\n```\n\n- `n` — number of commands.\n- `push v` — push the integer `v`.\n- `pop`, `top`, `getMin`, `getMax` — read only.\n\n`push` prints nothing; every other command prints one line with its result. An empty\nstack answers `-1` for `pop`, `top`, `getMin` and `getMax`.\n\n## Sample Input\n\n```\n7\npush 5\npush 3\npush 7\ngetMin\ngetMax\npop\ntop\n```\n\n## Expected Output\n\n```\n3\n7\n7\n3\n```\n\nThe stack holds `[5, 3, 7]` (top is `7`). `getMin` → `3`, `getMax` → `7`, `pop` returns\nthe top `7`, and after that the top is `3`.\n\n## Approach — store the extremes inside every frame\n\nThe classic mistake is to keep a *separate* min-stack and max-stack: then `pop` has to\nundo the change on both of them, and you need extra bookkeeping to know whether the\npopped value *was* the extreme.\n\nInstead, every frame carries the value **and** the running minimum and maximum of the\nstack up to that frame:\n\n```\npush 5  ->  frame(value=5, min=5, max=5)\npush 3  ->  frame(value=3, min=3, max=5)\npush 7  ->  frame(value=7, min=3, max=7)\n```\n\n- `push(v)`: `min = min(v, top.min)`, `max = max(v, top.max)` — O(1).\n- `pop()`: throw the frame away — the previous extremes are automatically restored.\n- `getMin()` / `getMax()`: read the top frame — O(1).\n\nEvery operation is O(1) and the extra memory is two integers per element.\n\n## Dry Run\n\n| Step | Command | Stack (top → bottom) before | Top frame before | Action | Stack after | Top frame after | Output |\n|---:|---|---|---|---|---|---|---|\n| 1 | `push 5` | `[]` | — | min = max = 5 | `[5]` | `(5, min 5, max 5)` | — |\n| 2 | `push 3` | `[5]` | `(5, 5, 5)` | min = min(3,5)=3, max = max(3,5)=5 | `[3, 5]` | `(3, min 3, max 5)` | — |\n| 3 | `push 7` | `[3, 5]` | `(3, 3, 5)` | min = min(7,3)=3, max = max(7,5)=7 | `[7, 3, 5]` | `(7, min 3, max 7)` | — |\n| 4 | `getMin` | `[7, 3, 5]` | `(7, 3, 7)` | read `top.min` | unchanged | unchanged | `3` |\n| 5 | `getMax` | `[7, 3, 5]` | `(7, 3, 7)` | read `top.max` | unchanged | unchanged | `7` |\n| 6 | `pop` | `[7, 3, 5]` | `(7, 3, 7)` | discard frame | `[3, 5]` | `(3, min 3, max 5)` | `7` |\n| 7 | `top` | `[3, 5]` | `(3, 3, 5)` | read `top.value` | unchanged | unchanged | `3` |\n\nNotice step 6: the frame that is exposed again already carries `min 3, max 5` — the\nextremes were restored for free, no undo logic needed.\n\n## Java Solution\n\nSee [`MinMaxStack.java`](./MinMaxStack.java).\n\n```java\npublic void push(int value) {\n    int min = stack.isEmpty() ? value : Math.min(value, stack.peek().min);\n    int max = stack.isEmpty() ? value : Math.max(value, stack.peek().max);\n    stack.push(new Frame(value, min, max));\n}\n\npublic int pop() {\n    if (stack.isEmpty()) {\n        return -1;\n    }\n    return stack.pop().value;      // the frame carried the old extremes with it\n}\n\npublic int getMin() {\n    return stack.isEmpty() ? -1 : stack.peek().min;\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(1) per operation | one frame push/pop or one field read |\n| **Space** | O(n) | one frame per element, each holding 3 integers |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"What if `getMin` must also return the index of the minimum?"* → store the index in\n  the frame as well.\n- *"What if the values can be removed from the middle?"* → a min-heap with lazy deletion\n  (or an indexed heap) instead of a stack.\n- *"How would you do it for a queue?"* → two monotonic queues, or the same trick with a\n  deque.\n- *"What if you want the k-th smallest?"* → a heap of size k maintained per frame.\n\n**Common mistakes:**\n- ❌ Using two independent stacks and forgetting to undo the other one on `pop`.\n- ❌ Using `if` instead of `while` when re-checking the condition — not an issue here,\n  but it is the classic bug in the "min stack with two stacks" variant.\n- ❌ Not handling `getMin`/`getMax` on an empty stack → exception instead of a value.\n\n**How to narrate:**\n> "I don\'t want a separate min-stack and max-stack because then `pop` has to undo both.\n> Instead every stack frame stores the value together with the running minimum and\n> maximum of the stack up to that point. Pushing computes the new extremes in constant\n> time, popping just discards a frame, and the previous extremes come back for free."\n\n## Related Problems\n\n- [Design Browser History — LeetCode 348](./DesignBrowserHistory.md) — another "history with a\n  cursor" structure\n- [Design Text Editor — LeetCode 2296](./DesignTextEditor.md) — a stack plus an undo journal\n- [Min Heap](../utils/MinHeap.java) — the heap based alternative\n  for "k-th smallest"\n',i=[`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};