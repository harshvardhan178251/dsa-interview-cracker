var e=`queues.ImplementStackUsingQueues`,t=`package com.dsa.queues;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Implement Stack using Queues
 * LeetCode: null | Difficulty: Medium | Frequency: 3/5
 * Pattern: Queue rotation, LIFO over FIFO
 *
 * <p>Problem:
 * Implement a LIFO stack using only FIFO queues. {@code push(x)} puts an element on top,
 * {@code pop()} removes and returns the top element, {@code peek()} returns the top
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
 * 6
 * push 1
 * push 2
 * push 3
 * peek
 * pop
 * size
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * [1]
 * [2, 1]
 * [3, 2, 1]
 * 3
 * 3
 * 2
 * </pre>
 *
 * <p>Approach: a single queue stores the elements in insertion order, so the <em>back</em>
 * of the queue is the top of the stack — {@code peek} is therefore O(1). To pop, the
 * queue is rotated {@code size - 1} times (each rotation moves the front element to the
 * back) until the most recently pushed element reaches the front, and that element is
 * removed.
 *
 * <p>Complexity: Time O(n) per {@code pop}, O(1) for {@code push} and {@code peek},
 * Space O(n).
 */
public class ImplementStackUsingQueues {

    /** A LIFO stack built from a single FIFO queue. */
    public static class MyStack {

        /** The single backing queue (front = the current top of the stack). */
        private final Deque<Integer> queue = new ArrayDeque<>();

        /** Puts {@code value} on top of the stack. */
        public void push(int value) {
            queue.add(value);
        }

        /** Removes and returns the top element. */
        public int pop() {
            rotateNewestToFront();
            return queue.poll();
        }

        /** Returns the top element without removing it. */
        public int peek() {
            return queue.peekLast();
        }

        /** Number of elements currently stacked. */
        public int size() {
            return queue.size();
        }

        /** True when the stack holds no element. */
        public boolean isEmpty() {
            return queue.isEmpty();
        }

        /** Moves the most recently pushed element (the queue's back) to the front. */
        private void rotateNewestToFront() {
            int n = queue.size();
            for (int i = 0; i < n - 1; i++) {
                queue.add(queue.poll());
            }
        }

        /** The stack contents from top to bottom, e.g. {@code [3, 2, 1]}. */
        public String contents() {
            Integer[] items = queue.toArray(new Integer[0]);
            StringBuilder sb = new StringBuilder("[");
            for (int i = items.length - 1; i >= 0; i--) {
                if (i != items.length - 1) {
                    sb.append(", ");
                }
                sb.append(items[i]);
            }
            return sb.append("]").toString();
        }

        /** Debug helper: the backing queue from front to back. */
        public String queueContents() {
            StringBuilder sb = new StringBuilder("[");
            boolean first = true;
            for (int v : queue) {
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

        MyStack stack = new MyStack();
        for (int i = 0; i < m; i++) {
            String op = fs.next();
            switch (op) {
                case "push" -> {
                    stack.push(fs.nextInt());
                    System.out.println(stack.contents());
                }
                case "pop" -> System.out.println(stack.isEmpty() ? "empty" : String.valueOf(stack.pop()));
                case "peek" -> System.out.println(stack.isEmpty() ? "empty" : String.valueOf(stack.peek()));
                case "size" -> System.out.println(stack.size());
                case "isEmpty" -> System.out.println(stack.isEmpty());
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
 * Problem: Implement Stack using Queues
 * LeetCode: null | Difficulty: Medium | Frequency: 3/5
 * Pattern: Queue rotation, LIFO over FIFO
 *
 * <p>Problem:
 * Implement a LIFO stack using only FIFO queues. {@code push(x)} puts an element on top,
 * {@code pop()} removes and returns the top element, {@code peek()} returns the top
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
 * 6
 * push 1
 * push 2
 * push 3
 * peek
 * pop
 * size
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * [1]
 * [2, 1]
 * [3, 2, 1]
 * 3
 * 3
 * 2
 * </pre>
 *
 * <p>Approach: a single queue stores the elements in insertion order, so the <em>back</em>
 * of the queue is the top of the stack — {@code peek} is therefore O(1). To pop, the
 * queue is rotated {@code size - 1} times (each rotation moves the front element to the
 * back) until the most recently pushed element reaches the front, and that element is
 * removed.
 *
 * <p>Complexity: Time O(n) per {@code pop}, O(1) for {@code push} and {@code peek},
 * Space O(n).
 */
public class Main {

    /** A LIFO stack built from a single FIFO queue. */
    public static class MyStack {

        /** The single backing queue (front = the current top of the stack). */
        private final Deque<Integer> queue = new ArrayDeque<>();

        /** Puts {@code value} on top of the stack. */
        public void push(int value) {
            queue.add(value);
        }

        /** Removes and returns the top element. */
        public int pop() {
            rotateNewestToFront();
            return queue.poll();
        }

        /** Returns the top element without removing it. */
        public int peek() {
            return queue.peekLast();
        }

        /** Number of elements currently stacked. */
        public int size() {
            return queue.size();
        }

        /** True when the stack holds no element. */
        public boolean isEmpty() {
            return queue.isEmpty();
        }

        /** Moves the most recently pushed element (the queue's back) to the front. */
        private void rotateNewestToFront() {
            int n = queue.size();
            for (int i = 0; i < n - 1; i++) {
                queue.add(queue.poll());
            }
        }

        /** The stack contents from top to bottom, e.g. {@code [3, 2, 1]}. */
        public String contents() {
            Integer[] items = queue.toArray(new Integer[0]);
            StringBuilder sb = new StringBuilder("[");
            for (int i = items.length - 1; i >= 0; i--) {
                if (i != items.length - 1) {
                    sb.append(", ");
                }
                sb.append(items[i]);
            }
            return sb.append("]").toString();
        }

        /** Debug helper: the backing queue from front to back. */
        public String queueContents() {
            StringBuilder sb = new StringBuilder("[");
            boolean first = true;
            for (int v : queue) {
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

        MyStack stack = new MyStack();
        for (int i = 0; i < m; i++) {
            String op = fs.next();
            switch (op) {
                case "push" -> {
                    stack.push(fs.nextInt());
                    System.out.println(stack.contents());
                }
                case "pop" -> System.out.println(stack.isEmpty() ? "empty" : String.valueOf(stack.pop()));
                case "peek" -> System.out.println(stack.isEmpty() ? "empty" : String.valueOf(stack.peek()));
                case "size" -> System.out.println(stack.size());
                case "isEmpty" -> System.out.println(stack.isEmpty());
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
`,r='\n# Implement Stack using Queues\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Queue · Rotation · LIFO over FIFO |\n| **Interview heat** | ★★★☆☆ |\n| **Asked at** | Amazon, Meta, Google, Microsoft |\n\n## Problem Statement\n\nBuild a **LIFO stack** (last in, first out) out of **FIFO queues** (first in, first out).\n\nThe stack must support:\n\n| Operation | Meaning |\n|---|---|\n| `push x` | put `x` on top of the stack |\n| `pop` | remove and return the top element |\n| `peek` | return the top element without removing it |\n| `size` | number of stacked elements |\n| `isEmpty` | `true` when nothing is stacked |\n\nQueues are the only allowed building block — no `java.util.Stack` or `ArrayDeque` inside\nthe structure.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nm\npush 1\npop\npeek\nsize\nisEmpty\n...\n```\n\n- `m` — the number of operations (1 ≤ m ≤ 10⁵), on the first line.\n- Every following line is **one operation**: the operation word, optionally followed by a\n  single integer argument (`push` is the only operation that takes one).\n\nOutput rules — **one line per operation**:\n\n| Operation | Printed |\n|---|---|\n| `push x` | the stack contents from **top** to bottom, e.g. `[3, 2, 1]` |\n| `pop` | the removed element, or `empty` when the stack is empty |\n| `peek` | the top element, or `empty` when the stack is empty |\n| `size` | the number of stacked elements |\n| `isEmpty` | `true` / `false` |\n\n## Sample Input\n\n```\n6\npush 1\npush 2\npush 3\npeek\npop\nsize\n```\n\n## Expected Output\n\n```\n[1]\n[2, 1]\n[3, 2, 1]\n3\n3\n2\n```\n\nThe stack prints **top first**, so after three pushes the top is `3`; the `pop` removes\n`3` and one element (`2`) is left.\n\n## Approach — Rotate the queue\n\nA queue hands out the **oldest** element, a stack must hand out the **newest**. With one\nqueue we can fix that by **rotating** the queue: move the front element to the back, over\nand over, until the newest element reaches the front.\n\nThe invariant is simple: **the queue always stores the stack elements in insertion\norder**, so\n\n- the **back** of the queue is the **top** of the stack → `peek` is `queue.peekLast()`,\n  O(1), and it does not disturb the queue;\n- the **front** of the queue is the **bottom** of the stack;\n- `pop` rotates the queue `size - 1` times (`queue.add(queue.poll())` each time) so the\n  newest element reaches the front, and then removes it. The survivors are left in\n  insertion order again, so the invariant survives the operation.\n\n`push` is a plain `queue.add(value)` — O(1).\n\n**Why rotation is needed at all:** a queue has no way to "un-enqueue" an element, so the\nonly way to make a specific element the next one out is to rotate everything in front\nof it to the back.\n\n## Dry Run\n\nInput: `push 1`, `push 2`, `push 3`, `peek`, `pop`, `pop`, `size`\n\n| Step | Operation | Queue (front→back) | Stack (top→bottom) | Printed |\n|---:|---|---|---|---|\n| 1 | `push 1` | `[1]` | `[1]` | `[1]` |\n| 2 | `push 2` | `[1, 2]` | `[2, 1]` | `[2, 1]` |\n| 3 | `push 3` | `[1, 2, 3]` | `[3, 2, 1]` | `[3, 2, 1]` |\n| 4 | `peek` — reads the queue\'s **back** | `[1, 2, 3]` | `[3, 2, 1]` | `3` |\n| 5 | `pop` — rotate 1 (`1` → back) | `[2, 3, 1]` | `[3, 2, 1]` | — |\n| 6 | `pop` — rotate 2 (`2` → back) | `[3, 1, 2]` | `[3, 2, 1]` | — |\n| 7 | `pop` — remove the front (`3`) | `[1, 2]` | `[2, 1]` | `3` |\n| 8 | `pop` — rotate 1 (`1` → back) | `[2, 1]` | `[2, 1]` | — |\n| 9 | `pop` — remove the front (`2`) | `[1]` | `[1]` | `2` |\n| 10 | `size` | `[1]` | `[1]` | `1` |\n\nNotice that `peek` never touches the queue: because the queue keeps insertion order, the\ntop of the stack is simply its last element. Only `pop` pays for the rotation.\n\n## Java Solution\n\nSee [`ImplementStackUsingQueues.java`](./ImplementStackUsingQueues.java).\n\n```java\nprivate void rotateNewestToFront() {\n    int n = queue.size();\n    for (int i = 0; i < n - 1; i++) {\n        queue.add(queue.poll());\n    }\n}\n\npublic void push(int value) { queue.add(value); }\npublic int pop()  { rotateNewestToFront(); return queue.poll(); }\npublic int peek() { return queue.peekLast(); }\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n) per `pop`, O(1) for `push` and `peek` | `pop` rotates the whole queue |\n| **Space** | O(n) | the queue holds every stacked element |\n\n**Better?** Yes — the two-queue variant pushes the new element to the first queue and,\non `pop`, moves every element to the second queue. That makes `pop` O(n) too, but it\navoids the rotation bookkeeping. Neither variant beats O(1) amortised per operation with\nqueues alone, because a queue cannot remove an element from the middle.\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"Can `pop` be made O(1)?"* → not with a single queue; a stack (or a deque) gives O(1).\n  With two queues it stays O(n), with one queue plus a counter you only amortise.\n- *"Why not just use two queues and swap them?"* → the transfer of *n* elements costs\n  O(n) exactly like the rotation, but it does not have to keep the surviving elements in\n  any particular order — easier to reason about, same complexity.\n- *"How does this compare with the two-stack queue?"* → the stack version is O(1)\n  amortised, the queue version is O(n) per `pop`; the asymmetry is why real stacks are\n  built on arrays, not on linked queues.\n\n**Common mistakes:**\n- ❌ Rotating **n** times instead of **n − 1** → the newest element ends up back at the\n  back and `pop` removes the *oldest* element, silently turning the stack into a queue.\n- ❌ Implementing `peek` with a rotation and not rotating back → the queue\'s order is\n  destroyed and the next `pop` returns the wrong element (this bug is invisible until\n  the second `pop`).\n- ❌ Assuming `pop` is O(1) because the queue operation is O(1) → the rotation dominates.\n\n**How to narrate:**\n> "One queue is enough if I keep the invariant that the queue stores the elements in\n> insertion order. Then the back of the queue is the top of the stack, so `peek` is a\n> `peekLast`. For `pop` I rotate the queue `size - 1` times to bring the newest element\n> to the front and then dequeue it. Push is O(1), pop is O(n)."\n\n## Related Problems\n\n- [Implement Queue using Stacks](ImplementQueueUsingStacks.md) — the mirror image\n- [Implement Deque using Two Stacks](ImplementDequeUsingTwoStacks.md) — both ends at once\n- [Design a Min Queue](MinQueue.md) — a queue with a running minimum\n- [Design Circular Queue](ImplementCircularQueue.md) — a queue backed by a ring buffer\n',i=[`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};