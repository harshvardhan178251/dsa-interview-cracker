var e=`queues.MinQueue`,t=`package com.dsa.queues;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Design a Min Queue
 * LeetCode: null | Difficulty: Medium | Frequency: 4/5
 * Pattern: Two-stack queue with a running minimum
 *
 * <p>Problem:
 * Implement a FIFO queue that additionally answers {@code min()} — the smallest value
 * currently stored — in constant time.
 *
 * <p>Input format (stdin):
 * <pre>
 * m
 * push 5
 * push 3
 * min
 * pop
 * front
 * back
 * size
 * isEmpty
 * ...
 * </pre>
 * {@code m} is the number of operations; every operation is one line and the optional
 * argument of {@code push} follows the operation word.
 *
 * <p>Sample input:
 * <pre>
 * 8
 * push 5
 * push 3
 * push 7
 * min
 * pop
 * min
 * front
 * isEmpty
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * [5]
 * [5, 3]
 * [5, 3, 7]
 * 3
 * 5
 * 3
 * 3
 * false
 * </pre>
 *
 * <p>Approach: the classic two-stack queue, but every element carries the minimum of the
 * stack it sits on. Pushing {@code x} stores {@code min(x, currentTop.min)}; the value
 * that leaves the stack head is therefore the minimum of everything below it. The queue
 * minimum is the minimum of the two stack headers.
 *
 * <p>Complexity: Time O(1) amortised per operation, Space O(n).
 */
public class MinQueue {

    /** A FIFO queue that can report its minimum in constant time. */
    public static class MyMinQueue {

        /** Element pair: {@code {value, minimum of this stack up to this element}}. */
        private final Deque<int[]> in = new ArrayDeque<>();

        /** Element pair, same layout as {@link #in}. */
        private final Deque<int[]> out = new ArrayDeque<>();

        /** Appends {@code value} to the back of the queue. */
        public void push(int value) {
            int min = in.isEmpty() ? value : Math.min(in.peek()[1], value);
            in.push(new int[]{value, min});
        }

        /** Removes and returns the front element. */
        public int pop() {
            shift();
            return out.pop()[0];
        }

        /** The front element without removing it. */
        public int front() {
            shift();
            return out.peek()[0];
        }

        /** The back element without removing it. */
        public int back() {
            return in.isEmpty() ? out.peekLast()[0] : in.peek()[0];
        }

        /** The smallest element currently stored. */
        public int min() {
            int result = Integer.MAX_VALUE;
            if (!in.isEmpty()) {
                result = Math.min(result, in.peek()[1]);
            }
            if (!out.isEmpty()) {
                result = Math.min(result, out.peek()[1]);
            }
            return result;
        }

        /** Number of elements currently queued. */
        public int size() {
            return in.size() + out.size();
        }

        /** True when the queue holds no element. */
        public boolean isEmpty() {
            return in.isEmpty() && out.isEmpty();
        }

        /**
         * Reverses {@code in} into {@code out} when {@code out} is empty.
         *
         * <p>The running minimum is recomputed during the transfer: the order of the
         * elements changes, so a minimum that was valid for the old stack may no longer
         * be valid for the new one.
         */
        private void shift() {
            if (out.isEmpty()) {
                while (!in.isEmpty()) {
                    int[] pair = in.pop();
                    int min = out.isEmpty() ? pair[0] : Math.min(pair[0], out.peek()[1]);
                    out.push(new int[]{pair[0], min});
                }
            }
        }

        /** The queue contents from front to back, e.g. {@code [5, 3, 7]}. */
        public String contents() {
            StringBuilder sb = new StringBuilder("[");
            boolean first = true;
            for (int[] pair : out) {
                if (!first) {
                    sb.append(", ");
                }
                sb.append(pair[0]);
                first = false;
            }
            int[][] pushed = in.toArray(new int[0][]);
            for (int i = pushed.length - 1; i >= 0; i--) {
                if (!first) {
                    sb.append(", ");
                }
                sb.append(pushed[i][0]);
                first = false;
            }
            return sb.append("]").toString();
        }

        /** Debug helper: the {@code in} stack as {@code value/min} pairs, top first. */
        public String inStack() {
            return stackToString(in);
        }

        /** Debug helper: the {@code out} stack as {@code value/min} pairs, top first. */
        public String outStack() {
            return stackToString(out);
        }

        private static String stackToString(Deque<int[]> stack) {
            StringBuilder sb = new StringBuilder("[");
            boolean first = true;
            for (int[] pair : stack) {
                if (!first) {
                    sb.append(", ");
                }
                sb.append(pair[0]).append("/").append(pair[1]);
                first = false;
            }
            return sb.append("]").toString();
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int m = fs.nextInt();

        MyMinQueue queue = new MyMinQueue();
        for (int i = 0; i < m; i++) {
            String op = fs.next();
            switch (op) {
                case "push" -> {
                    queue.push(fs.nextInt());
                    System.out.println(queue.contents());
                }
                case "pop" -> System.out.println(queue.isEmpty() ? "empty" : String.valueOf(queue.pop()));
                case "front" -> System.out.println(queue.isEmpty() ? "empty" : String.valueOf(queue.front()));
                case "back" -> System.out.println(queue.isEmpty() ? "empty" : String.valueOf(queue.back()));
                case "min" -> System.out.println(queue.isEmpty() ? "empty" : String.valueOf(queue.min()));
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
 * Problem: Design a Min Queue
 * LeetCode: null | Difficulty: Medium | Frequency: 4/5
 * Pattern: Two-stack queue with a running minimum
 *
 * <p>Problem:
 * Implement a FIFO queue that additionally answers {@code min()} — the smallest value
 * currently stored — in constant time.
 *
 * <p>Input format (stdin):
 * <pre>
 * m
 * push 5
 * push 3
 * min
 * pop
 * front
 * back
 * size
 * isEmpty
 * ...
 * </pre>
 * {@code m} is the number of operations; every operation is one line and the optional
 * argument of {@code push} follows the operation word.
 *
 * <p>Sample input:
 * <pre>
 * 8
 * push 5
 * push 3
 * push 7
 * min
 * pop
 * min
 * front
 * isEmpty
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * [5]
 * [5, 3]
 * [5, 3, 7]
 * 3
 * 5
 * 3
 * 3
 * false
 * </pre>
 *
 * <p>Approach: the classic two-stack queue, but every element carries the minimum of the
 * stack it sits on. Pushing {@code x} stores {@code min(x, currentTop.min)}; the value
 * that leaves the stack head is therefore the minimum of everything below it. The queue
 * minimum is the minimum of the two stack headers.
 *
 * <p>Complexity: Time O(1) amortised per operation, Space O(n).
 */
public class Main {

    /** A FIFO queue that can report its minimum in constant time. */
    public static class MyMinQueue {

        /** Element pair: {@code {value, minimum of this stack up to this element}}. */
        private final Deque<int[]> in = new ArrayDeque<>();

        /** Element pair, same layout as {@link #in}. */
        private final Deque<int[]> out = new ArrayDeque<>();

        /** Appends {@code value} to the back of the queue. */
        public void push(int value) {
            int min = in.isEmpty() ? value : Math.min(in.peek()[1], value);
            in.push(new int[]{value, min});
        }

        /** Removes and returns the front element. */
        public int pop() {
            shift();
            return out.pop()[0];
        }

        /** The front element without removing it. */
        public int front() {
            shift();
            return out.peek()[0];
        }

        /** The back element without removing it. */
        public int back() {
            return in.isEmpty() ? out.peekLast()[0] : in.peek()[0];
        }

        /** The smallest element currently stored. */
        public int min() {
            int result = Integer.MAX_VALUE;
            if (!in.isEmpty()) {
                result = Math.min(result, in.peek()[1]);
            }
            if (!out.isEmpty()) {
                result = Math.min(result, out.peek()[1]);
            }
            return result;
        }

        /** Number of elements currently queued. */
        public int size() {
            return in.size() + out.size();
        }

        /** True when the queue holds no element. */
        public boolean isEmpty() {
            return in.isEmpty() && out.isEmpty();
        }

        /**
         * Reverses {@code in} into {@code out} when {@code out} is empty.
         *
         * <p>The running minimum is recomputed during the transfer: the order of the
         * elements changes, so a minimum that was valid for the old stack may no longer
         * be valid for the new one.
         */
        private void shift() {
            if (out.isEmpty()) {
                while (!in.isEmpty()) {
                    int[] pair = in.pop();
                    int min = out.isEmpty() ? pair[0] : Math.min(pair[0], out.peek()[1]);
                    out.push(new int[]{pair[0], min});
                }
            }
        }

        /** The queue contents from front to back, e.g. {@code [5, 3, 7]}. */
        public String contents() {
            StringBuilder sb = new StringBuilder("[");
            boolean first = true;
            for (int[] pair : out) {
                if (!first) {
                    sb.append(", ");
                }
                sb.append(pair[0]);
                first = false;
            }
            int[][] pushed = in.toArray(new int[0][]);
            for (int i = pushed.length - 1; i >= 0; i--) {
                if (!first) {
                    sb.append(", ");
                }
                sb.append(pushed[i][0]);
                first = false;
            }
            return sb.append("]").toString();
        }

        /** Debug helper: the {@code in} stack as {@code value/min} pairs, top first. */
        public String inStack() {
            return stackToString(in);
        }

        /** Debug helper: the {@code out} stack as {@code value/min} pairs, top first. */
        public String outStack() {
            return stackToString(out);
        }

        private static String stackToString(Deque<int[]> stack) {
            StringBuilder sb = new StringBuilder("[");
            boolean first = true;
            for (int[] pair : stack) {
                if (!first) {
                    sb.append(", ");
                }
                sb.append(pair[0]).append("/").append(pair[1]);
                first = false;
            }
            return sb.append("]").toString();
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int m = fs.nextInt();

        MyMinQueue queue = new MyMinQueue();
        for (int i = 0; i < m; i++) {
            String op = fs.next();
            switch (op) {
                case "push" -> {
                    queue.push(fs.nextInt());
                    System.out.println(queue.contents());
                }
                case "pop" -> System.out.println(queue.isEmpty() ? "empty" : String.valueOf(queue.pop()));
                case "front" -> System.out.println(queue.isEmpty() ? "empty" : String.valueOf(queue.front()));
                case "back" -> System.out.println(queue.isEmpty() ? "empty" : String.valueOf(queue.back()));
                case "min" -> System.out.println(queue.isEmpty() ? "empty" : String.valueOf(queue.min()));
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
`,r='\n# Design a Min Queue\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Stack · Running minimum · Amortised O(1) |\n| **Interview heat** | ★★★★☆ |\n| **Asked at** | Amazon, Meta, Google, Microsoft, Uber |\n\n## Problem Statement\n\nDesign a **FIFO queue** that can also report its **minimum element** in constant time.\n\n| Operation | Meaning |\n|---|---|\n| `push x` | append `x` to the back of the queue |\n| `pop` | remove and return the front element |\n| `front` | the front element, without removing it |\n| `back` | the back element, without removing it |\n| `min` | the smallest element currently stored |\n| `size` | number of queued elements |\n| `isEmpty` | `true` when nothing is queued |\n\n`min` must be O(1) — scanning the queue on every call is not acceptable.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nm\npush 5\nmin\npop\nfront\nback\nsize\nisEmpty\n...\n```\n\n- `m` — the number of operations (1 ≤ m ≤ 10⁵), on the first line.\n- Every following line is **one operation**: the operation word, optionally followed by a\n  single integer argument (`push` is the only operation that takes one).\n\nOutput rules — **one line per operation**:\n\n| Operation | Printed |\n|---|---|\n| `push x` | the queue contents from front to back, e.g. `[5, 3, 7]` |\n| `pop` | the removed element, or `empty` when the queue is empty |\n| `front` / `back` | the element, or `empty` when the queue is empty |\n| `min` | the smallest element, or `empty` when the queue is empty |\n| `size` | the number of queued elements |\n| `isEmpty` | `true` / `false` |\n\n## Sample Input\n\n```\n8\npush 5\npush 3\npush 7\nmin\npop\nmin\nfront\nisEmpty\n```\n\n## Expected Output\n\n```\n[5]\n[5, 3]\n[5, 3, 7]\n3\n5\n3\n3\nfalse\n```\n\nThe minimum is `3`; after the `pop` removes `5` the minimum is still `3`, because `3` is\nstill in the queue.\n\n## Approach — Two stacks, each carrying a running minimum\n\nStart from [Implement Queue using Stacks](ImplementQueueUsingStacks.md)\nand add one idea: **every element remembers the minimum of everything below it in its\nstack**.\n\nWhen an element is pushed onto a stack, it stores\n\n```\nmin = min(value, minimum stored at the current top of the stack)\n```\n\nBecause a stack only ever removes from the top, the stored minimum of the element that\nis about to leave the stack is **exactly** the minimum of that stack at that moment. No\nscanning, no extra bookkeeping.\n\nThe queue minimum is then just the minimum of the two stack headers:\n\n```\nmin() = min(top(in).min, top(out).min)\n```\n\n**Why the running minimum survives a pop:** the popped element carries the minimum of\nthe stack *below* it, and that information is exactly what the next element down needs.\nPopping never destroys the minimum of the remaining stack — it just exposes the\npreviously stored one.\n\n**One trap:** the `in` → `out` transfer reverses the elements, and a running minimum is\nonly valid relative to the *order* of its stack. The minimum therefore has to be\n**recomputed while transferring** — see the note under the dry run.\n\n## Dry Run\n\nInput: `push 5`, `push 3`, `push 7`, `min`, `pop`, `min`, `push 2`, `min`\n\nStacks are printed **top first**; each entry is shown as `value/min` — the element and\nthe minimum of the stack up to that element.\n\n| Step | Operation | `in` (top→bottom) | `out` (top→bottom) | Queue (front→back) | Printed |\n|---:|---|---|---|---|---|\n| 1 | `push 5` → min = min(5, ∞) = 5 | `[5/5]` | `[]` | `[5]` | `[5]` |\n| 2 | `push 3` → min = min(3, 5) = 3 | `[3/3, 5/5]` | `[]` | `[5, 3]` | `[5, 3]` |\n| 3 | `push 7` → min = min(7, 3) = 3 | `[7/3, 3/3, 5/5]` | `[]` | `[5, 3, 7]` | `[5, 3, 7]` |\n| 4 | `min` → min(3, ∞) = 3 | `[7/3, 3/3, 5/5]` | `[]` | `[5, 3, 7]` | `3` |\n| 5 | `pop` → shift `in`→`out`, mins recomputed (7, 3, 5) | `[]` | `[5/3, 3/3, 7/7]` | — | — |\n| 6 | `pop` → takes `out` top `5` | `[]` | `[3/3, 7/7]` | `[3, 7]` | `5` |\n| 7 | `min` → min(∞, 3) = 3 | `[]` | `[3/3, 7/7]` | `[3, 7]` | `3` |\n| 8 | `push 2` → min = min(2, ∞) = 2 | `[2/2]` | `[3/3, 7/7]` | `[3, 7, 2]` | `[3, 7, 2]` |\n| 9 | `min` → min(2, 3) = 2 | `[2/2]` | `[3/3, 7/7]` | `[3, 7, 2]` | `2` |\n\nStep 5 is where the running minimum has to be **recomputed**: the transfer reverses the\norder, so the minimum that was stored for `7` (it was `3`, because `3` sat below it in\n`in`) becomes `7` in the new stack — `7` is now at the bottom of `out`, so nothing is\nbelow it. Step 6 then pops `5` and exposes `3/3`, whose stored minimum is still the\nminimum of the remaining queue.\n\n## The subtle part — recomputing the minimum during the transfer\n\nA "stack with a running minimum" stores, for every element, the minimum of everything\n*below it in that stack*. The trick works only as long as the stack keeps its order. The\n`in` → `out` transfer **reverses** the order, so the stored minima become stale: after\nmoving `7` (stored min `3`) to the bottom of `out`, nothing is below it any more and its\nminimum must become `7`.\n\nThe fix is to recompute while transferring:\n\n```java\nint[] pair = in.pop();\nint min = out.isEmpty() ? pair[0] : Math.min(pair[0], out.peek()[1]);\nout.push(new int[]{pair[0], min});\n```\n\nNow every element in `out` carries the minimum of the elements below it **in `out`**, and\nthe header of each stack always holds the minimum of that whole stack.\n\n## Java Solution\n\nSee [`MinQueue.java`](./MinQueue.java).\n\n```java\npublic void push(int value) {\n    int min = in.isEmpty() ? value : Math.min(in.peek()[1], value);\n    in.push(new int[]{value, min});\n}\n\npublic int min() {\n    int result = Integer.MAX_VALUE;\n    if (!in.isEmpty()) {\n        result = Math.min(result, in.peek()[1]);\n    }\n    if (!out.isEmpty()) {\n        result = Math.min(result, out.peek()[1]);\n    }\n    return result;\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(1) amortised per operation | each element moves between the stacks at most once |\n| **Space** | O(n) | two ints per queued element (value + running minimum) |\n\n**Alternative:** a monotonic deque of candidates plus a plain queue — the same idea with\ndifferent containers, O(n) space in the worst case (when the input is sorted).\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"What if you also need the maximum?"* → store both running minima and maxima per\n  element, or keep a second structure in parallel.\n- *"Can you do it with one stack?"* → yes: store the minimum **under** each element\n  (push the new minimum first, then the value) — the classic "stack with min" trick.\n- *"What if `push`/`pop` must be thread-safe?"* → guard the shift with a lock; the\n  `min` read then also needs the lock, or an `AtomicInteger`.\n- *"How does this compare with `java.util.PriorityQueue`?"* → a priority queue gives\n  O(1) `peek` of the minimum but **destroys the FIFO order**; you cannot recover the\n  front element. Order and minimum are the two requirements that clash.\n\n**Common mistakes:**\n- ❌ Storing the **global** minimum of the queue instead of the minimum **of the stack**\n  → popping the element that carried that minimum loses the information and `min`\n  returns a stale value.\n- ❌ **Not** recomputing the running minimum during the `in` → `out` transfer → the\n  transfer reverses the order, so the stored minimum belongs to a different part of the\n  queue and `min` returns a value that is no longer in the queue.\n- ❌ Recomputing the minimum by scanning the queue on every `min` call → O(n) per call,\n  which defeats the purpose of the exercise.\n- ❌ Forgetting that `back` is the **tail** of `out` after a transfer (not its top) → the\n  wrong element is returned after the first `pop`.\n\n**How to narrate:**\n> "I\'ll use the two-stack queue, but every element carries the minimum of the stack\n> beneath it. Pushing computes `min(x, top.min)` in O(1). Because a stack only pops from\n> the top, the element that leaves the stack already knows the minimum of what stays\n> behind it, so `min` is just the minimum of the two stack headers — no scanning."\n\n## Related Problems\n\n- [Implement Queue using Stacks](ImplementQueueUsingStacks.md) — the base structure\n- [Implement Deque using Two Stacks](ImplementDequeUsingTwoStacks.md) — both ends\n- [Find Median from Data Stream](../heaps/FindMedianFromDataStream.md) — the same idea with two heaps\n- [Sliding Window Maximum](SlidingWindowMaximum.md) — a monotonic deque\n',i=[`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};