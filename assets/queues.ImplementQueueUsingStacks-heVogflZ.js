var e=`queues.ImplementQueueUsingStacks`,t=`package com.dsa.queues;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Implement Queue using Stacks
 * LeetCode: null | Difficulty: Medium | Frequency: 4/5
 * Pattern: Two-stack FIFO, Amortised O(1)
 *
 * <p>Problem:
 * Implement a FIFO queue using only LIFO stacks. {@code push(x)} appends to the back,
 * {@code pop()} removes and returns the front element, {@code peek()} returns the front
 * element without removing it.
 *
 * <p>Input format (stdin):
 * <pre>
 * m
 * push 1
 * pop
 * peek
 * size
 * isEmpty
 * ...
 * </pre>
 * {@code m} is the number of operations; every operation is one line and the optional
 * argument of {@code push} follows the operation word.
 *
 * <p>Sample input:
 * <pre>
 * 7
 * push 1
 * push 2
 * pop
 * peek
 * size
 * push 3
 * isEmpty
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * [1]
 * [1, 2]
 * 1
 * 2
 * 1
 * [2, 3]
 * false
 * </pre>
 *
 * <p>Approach: keep two stacks. {@code in} receives every push. When a pop or a peek needs
 * the front element and {@code out} is empty, every element of {@code in} is moved onto
 * {@code out} — that single reversal turns the LIFO order into FIFO order. After that,
 * {@code out} serves the front until it is empty again.
 *
 * <p>Complexity: Time O(1) amortised per operation (each element is pushed once and moved
 * at most once), Space O(n).
 */
public class ImplementQueueUsingStacks {

    /** A FIFO queue built from two LIFO stacks. */
    public static class MyQueue {

        /** Stack that receives new elements (top = most recently pushed). */
        private final Deque<Integer> in = new ArrayDeque<>();

        /** Stack that serves the front of the queue (top = next element to leave). */
        private final Deque<Integer> out = new ArrayDeque<>();

        /** Appends {@code value} to the back of the queue. */
        public void push(int value) {
            in.push(value);
        }

        /** Removes and returns the front element. */
        public int pop() {
            shift();
            return out.pop();
        }

        /** Returns the front element without removing it. */
        public int peek() {
            shift();
            return out.peek();
        }

        /** Number of elements currently queued. */
        public int size() {
            return in.size() + out.size();
        }

        /** True when the queue holds no element. */
        public boolean isEmpty() {
            return in.isEmpty() && out.isEmpty();
        }

        /** Reverses {@code in} into {@code out} when {@code out} is empty. */
        private void shift() {
            if (out.isEmpty()) {
                while (!in.isEmpty()) {
                    out.push(in.pop());
                }
            }
        }

        /** The queue contents from front to back, e.g. {@code [1, 2, 3]}. */
        public String contents() {
            StringBuilder sb = new StringBuilder("[");
            boolean first = true;
            for (int v : out) {
                if (!first) {
                    sb.append(", ");
                }
                sb.append(v);
                first = false;
            }
            Integer[] pushed = in.toArray(new Integer[0]);
            for (int i = pushed.length - 1; i >= 0; i--) {
                if (!first) {
                    sb.append(", ");
                }
                sb.append(pushed[i]);
                first = false;
            }
            return sb.append("]").toString();
        }

        /** Debug helper: the backing {@code in} stack, top first. */
        public String inStack() {
            return stackToString(in);
        }

        /** Debug helper: the backing {@code out} stack, top first. */
        public String outStack() {
            return stackToString(out);
        }

        private static String stackToString(Deque<Integer> stack) {
            StringBuilder sb = new StringBuilder("[");
            boolean first = true;
            for (int v : stack) {
                if (!first) {
                    sb.append(", ");
                }
                sb.append(v);
                first = false;
            }
            return sb.append("]").toString();
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int m = fs.nextInt();

        MyQueue queue = new MyQueue();
        for (int i = 0; i < m; i++) {
            String op = fs.next();
            switch (op) {
                case "push" -> {
                    queue.push(fs.nextInt());
                    System.out.println(queue.contents());
                }
                case "pop" -> System.out.println(queue.isEmpty() ? "empty" : String.valueOf(queue.pop()));
                case "peek" -> System.out.println(queue.isEmpty() ? "empty" : String.valueOf(queue.peek()));
                case "size" -> System.out.println(queue.size());
                case "isEmpty" -> System.out.println(queue.isEmpty());
                default -> throw new IllegalArgumentException("unknown operation: " + op);
            }
        }
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
 * Problem: Implement Queue using Stacks
 * LeetCode: null | Difficulty: Medium | Frequency: 4/5
 * Pattern: Two-stack FIFO, Amortised O(1)
 *
 * <p>Problem:
 * Implement a FIFO queue using only LIFO stacks. {@code push(x)} appends to the back,
 * {@code pop()} removes and returns the front element, {@code peek()} returns the front
 * element without removing it.
 *
 * <p>Input format (stdin):
 * <pre>
 * m
 * push 1
 * pop
 * peek
 * size
 * isEmpty
 * ...
 * </pre>
 * {@code m} is the number of operations; every operation is one line and the optional
 * argument of {@code push} follows the operation word.
 *
 * <p>Sample input:
 * <pre>
 * 7
 * push 1
 * push 2
 * pop
 * peek
 * size
 * push 3
 * isEmpty
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * [1]
 * [1, 2]
 * 1
 * 2
 * 1
 * [2, 3]
 * false
 * </pre>
 *
 * <p>Approach: keep two stacks. {@code in} receives every push. When a pop or a peek needs
 * the front element and {@code out} is empty, every element of {@code in} is moved onto
 * {@code out} — that single reversal turns the LIFO order into FIFO order. After that,
 * {@code out} serves the front until it is empty again.
 *
 * <p>Complexity: Time O(1) amortised per operation (each element is pushed once and moved
 * at most once), Space O(n).
 */
public class Main {

    /** A FIFO queue built from two LIFO stacks. */
    public static class MyQueue {

        /** Stack that receives new elements (top = most recently pushed). */
        private final Deque<Integer> in = new ArrayDeque<>();

        /** Stack that serves the front of the queue (top = next element to leave). */
        private final Deque<Integer> out = new ArrayDeque<>();

        /** Appends {@code value} to the back of the queue. */
        public void push(int value) {
            in.push(value);
        }

        /** Removes and returns the front element. */
        public int pop() {
            shift();
            return out.pop();
        }

        /** Returns the front element without removing it. */
        public int peek() {
            shift();
            return out.peek();
        }

        /** Number of elements currently queued. */
        public int size() {
            return in.size() + out.size();
        }

        /** True when the queue holds no element. */
        public boolean isEmpty() {
            return in.isEmpty() && out.isEmpty();
        }

        /** Reverses {@code in} into {@code out} when {@code out} is empty. */
        private void shift() {
            if (out.isEmpty()) {
                while (!in.isEmpty()) {
                    out.push(in.pop());
                }
            }
        }

        /** The queue contents from front to back, e.g. {@code [1, 2, 3]}. */
        public String contents() {
            StringBuilder sb = new StringBuilder("[");
            boolean first = true;
            for (int v : out) {
                if (!first) {
                    sb.append(", ");
                }
                sb.append(v);
                first = false;
            }
            Integer[] pushed = in.toArray(new Integer[0]);
            for (int i = pushed.length - 1; i >= 0; i--) {
                if (!first) {
                    sb.append(", ");
                }
                sb.append(pushed[i]);
                first = false;
            }
            return sb.append("]").toString();
        }

        /** Debug helper: the backing {@code in} stack, top first. */
        public String inStack() {
            return stackToString(in);
        }

        /** Debug helper: the backing {@code out} stack, top first. */
        public String outStack() {
            return stackToString(out);
        }

        private static String stackToString(Deque<Integer> stack) {
            StringBuilder sb = new StringBuilder("[");
            boolean first = true;
            for (int v : stack) {
                if (!first) {
                    sb.append(", ");
                }
                sb.append(v);
                first = false;
            }
            return sb.append("]").toString();
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int m = fs.nextInt();

        MyQueue queue = new MyQueue();
        for (int i = 0; i < m; i++) {
            String op = fs.next();
            switch (op) {
                case "push" -> {
                    queue.push(fs.nextInt());
                    System.out.println(queue.contents());
                }
                case "pop" -> System.out.println(queue.isEmpty() ? "empty" : String.valueOf(queue.pop()));
                case "peek" -> System.out.println(queue.isEmpty() ? "empty" : String.valueOf(queue.peek()));
                case "size" -> System.out.println(queue.size());
                case "isEmpty" -> System.out.println(queue.isEmpty());
                default -> throw new IllegalArgumentException("unknown operation: " + op);
            }
        }
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
`,r='\n# Implement Queue using Stacks\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Stack · Two-stack FIFO · Amortised O(1) |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Meta, Google, Microsoft, Uber |\n\n## Problem Statement\n\nBuild a **FIFO queue** (first in, first out) out of **LIFO stacks** (last in, first out).\n\nThe queue must support:\n\n| Operation | Meaning |\n|---|---|\n| `push x` | append `x` to the **back** of the queue |\n| `pop` | remove and return the **front** element |\n| `peek` | return the **front** element without removing it |\n| `size` | number of queued elements |\n| `isEmpty` | `true` when nothing is queued |\n\nThe implementation may use any number of stacks, but stacks are the only allowed\nbuilding block — no `java.util.Queue` inside the structure.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nm\npush 1\npop\npeek\nsize\nisEmpty\n...\n```\n\n- `m` — the number of operations (1 ≤ m ≤ 10⁵), on the first line.\n- Every following line is **one operation**: the operation word, optionally followed by a\n  single integer argument (`push` is the only operation that takes one).\n\nOutput rules — **one line per operation**:\n\n| Operation | Printed |\n|---|---|\n| `push x` | the queue contents from front to back, e.g. `[1, 2, 3]` |\n| `pop` | the removed element, or `empty` when the queue is empty |\n| `peek` | the front element, or `empty` when the queue is empty |\n| `size` | the number of queued elements |\n| `isEmpty` | `true` / `false` |\n\n## Sample Input\n\n```\n7\npush 1\npush 2\npop\npeek\nsize\npush 3\nisEmpty\n```\n\n## Expected Output\n\n```\n[1]\n[1, 2]\n1\n2\n1\n[2, 3]\nfalse\n```\n\n`pop` removes the oldest element (`1`), `peek` now sees `2`, and the queue still holds\n`2` after the last push.\n\n## Approach — Two stacks, one reversal\n\nA stack hands out the **last** element it received, a queue must hand out the **first**.\nThe gap between the two is exactly one reversal, and a stack is the cheapest machine\nthat can perform a reversal.\n\nSo we keep two stacks:\n\n- **`in`** — receives every `push`. New elements land on its top.\n- **`out`** — serves the front of the queue. Its top is the next element to leave.\n\nThe rules are short:\n\n1. `push x` → `in.push(x)`.\n2. `pop` / `peek` → if `out` is empty, **move every element of `in` onto `out`**\n   (`out.push(in.pop())`, repeated). That single pass reverses the order, so the oldest\n   element ends up on top of `out`. Then read (and remove) `out`\'s top.\n3. `size` → `in.size() + out.size()`.\n4. `isEmpty` → both stacks are empty.\n\n**Why it is amortised O(1):** every element is pushed onto `in` once and moved to `out`\n**at most once** (it can never travel back). A transfer of *m* elements costs *m*, but\nthose *m* pops are amortised over the *m* pushes that created them — so the average cost\nper operation is constant. The classic counter-example is "push, pop, push, pop, …":\neach pop triggers a transfer, but the transfer only ever moves the one element that was\npushed since the last transfer, so the total work is still O(n).\n\n## Dry Run\n\nInput: `push 1`, `push 2`, `push 3`, `pop`, `peek`, `push 4`, `pop`, `pop`, `pop`\n\nStacks are printed **top first** (the element that `pop` would remove is on the left).\n\n| Step | Operation | `in` (top→bottom) | `out` (top→bottom) | Queue (front→back) | Printed |\n|---:|---|---|---|---|---|\n| 1 | `push 1` | `[1]` | `[]` | `[1]` | `[1]` |\n| 2 | `push 2` | `[2, 1]` | `[]` | `[1, 2]` | `[1, 2]` |\n| 3 | `push 3` | `[3, 2, 1]` | `[]` | `[1, 2, 3]` | `[1, 2, 3]` |\n| 4 | `pop` → shift `in`→`out` (`3`, `2`, `1` pushed) | `[]` | `[1, 2, 3]` | — | — |\n| 5 | `pop` (takes `out` top `1`) | `[]` | `[2, 3]` | `[2, 3]` | `1` |\n| 6 | `peek` (`out` not empty, no shift) | `[]` | `[2, 3]` | `[2, 3]` | `2` |\n| 7 | `push 4` | `[4]` | `[2, 3]` | `[2, 3, 4]` | `[2, 3, 4]` |\n| 8 | `pop` (takes `out` top `2`) | `[4]` | `[3]` | `[3, 4]` | `2` |\n| 9 | `pop` (takes `out` top `3`) | `[4]` | `[]` | `[4]` | `3` |\n| 10 | `pop` → shift `in`→`out` | `[]` | `[4]` | — | — |\n| 11 | `pop` (takes `out` top `4`) | `[]` | `[]` | `[]` | `4` |\n\nStep 4 is the only expensive step: the three elements move from `in` to `out` in the\nreverse order, which is exactly what turns LIFO into FIFO. After that, `out` serves the\nqueue until it runs dry again.\n\n## Java Solution\n\nSee [`ImplementQueueUsingStacks.java`](./ImplementQueueUsingStacks.java).\n\n```java\nprivate void shift() {\n    if (out.isEmpty()) {\n        while (!in.isEmpty()) {\n            out.push(in.pop());\n        }\n    }\n}\n\npublic void push(int value) { in.push(value); }\npublic int pop()  { shift(); return out.pop(); }\npublic int peek() { shift(); return out.peek(); }\npublic int size() { return in.size() + out.size(); }\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(1) amortised per operation | every element is pushed once and moved at most once |\n| **Space** | O(n) | the two stacks together hold every queued element |\n\n**Optimal?** Yes for the amortised bound. A single-pop transfer costs O(n) in the worst\ncase, but no implementation can beat O(1) amortised per operation here.\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"Can you do it with one stack?"* → yes: keep a single stack and, on `pop`, pour the\n  whole stack into a second "auxiliary" stack — that is exactly the two-stack solution\n  with the roles swapped.\n- *"What if `push` and `pop` are interleaved 1:1?"* → that is the worst case for the\n  naive version and the best case for amortised analysis: each transfer moves only the\n  elements pushed since the previous transfer.\n- *"How would you extend this to support `pop` from the back as well?"* → that is\n  [Implement Deque using Two Stacks](./ImplementDequeUsingTwoStacks.md).\n- *"Can it be made thread-safe?"* → yes, with a lock around the shift, or by using\n  `ConcurrentLinkedDeque` and accepting that the two-stack trick is no longer needed.\n\n**Common mistakes:**\n- ❌ Forgetting to shift **only when `out` is empty** — shifting unconditionally destroys\n  the FIFO order and the queue starts returning the newest element first.\n- ❌ Shifting in the wrong direction (`out.push(in.push(x))` style) — the reversal is the\n  whole trick; get it backwards and the queue becomes a stack again.\n- ❌ Claiming O(1) *worst-case* per operation — a single `pop` right after `m` pushes\n  costs O(m). Say **amortised**.\n\n**How to narrate:**\n> "A stack gives me the newest element, a queue needs the oldest, so I need exactly one\n> reversal. I keep an `in` stack for pushes and an `out` stack for pops. When `out` runs\n> dry I pour `in` into it — that reversal flips LIFO into FIFO. Every element is moved at\n> most once, so the whole thing is O(1) amortised per operation."\n\n## Related Problems\n\n- [Implement Stack using Queues](ImplementStackUsingQueues.md) — the mirror image\n- [Implement Deque using Two Stacks](ImplementDequeUsingTwoStacks.md) — both ends at once\n- [Design a Min Queue](MinQueue.md) — the same two stacks plus a running minimum\n- [Design Circular Queue](ImplementCircularQueue.md) — a queue backed by a ring buffer\n',i=[`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};