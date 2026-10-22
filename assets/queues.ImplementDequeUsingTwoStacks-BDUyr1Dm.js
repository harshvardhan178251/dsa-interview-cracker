var e=`queues.ImplementDequeUsingTwoStacks`,t=`package com.dsa.queues;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Implement Deque using Two Stacks
 * LeetCode: null | Difficulty: Medium | Frequency: 3/5
 * Pattern: Symmetric two-stack deque
 *
 * <p>Problem:
 * Implement a double-ended queue using two LIFO stacks. {@code pushFront} and
 * {@code pushBack} insert at either end; {@code popFront}, {@code popBack},
 * {@code peekFront} and {@code peekBack} read or remove from either end.
 *
 * <p>Input format (stdin):
 * <pre>
 * m
 * pushFront 1
 * pushBack 2
 * popFront
 * popBack
 * peekFront
 * peekBack
 * size
 * isEmpty
 * ...
 * </pre>
 * {@code m} is the number of operations; every operation is one line and the optional
 * argument of the push operations follows the operation word.
 *
 * <p>Sample input:
 * <pre>
 * 8
 * pushBack 1
 * pushBack 2
 * pushFront 0
 * pushBack 3
 * popFront
 * popBack
 * size
 * isEmpty
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * [1]
 * [1, 2]
 * [0, 1, 2]
 * [0, 1, 2, 3]
 * 0
 * 3
 * 2
 * false
 * </pre>
 *
 * <p>Approach: {@code left} owns the front of the deque and {@code right} owns the back.
 * A push always lands on its own stack. A pop from an empty side transfers every element
 * of the opposite stack — the transfer reverses the order, so the requested end becomes
 * the top of the receiving stack.
 *
 * <p>Complexity: Time O(1) amortised per operation, Space O(n).
 */
public class ImplementDequeUsingTwoStacks {

    /** A double-ended queue built from two LIFO stacks. */
    public static class MyDeque {

        /** Stack holding the front elements (top = front of the deque). */
        private final Deque<Integer> left = new ArrayDeque<>();

        /** Stack holding the back elements (top = back of the deque). */
        private final Deque<Integer> right = new ArrayDeque<>();

        /** Inserts {@code value} at the front. */
        public void pushFront(int value) {
            left.push(value);
        }

        /** Inserts {@code value} at the back. */
        public void pushBack(int value) {
            right.push(value);
        }

        /** Removes and returns the front element. */
        public int popFront() {
            if (left.isEmpty()) {
                while (!right.isEmpty()) {
                    left.push(right.pop());
                }
            }
            return left.pop();
        }

        /** Removes and returns the back element. */
        public int popBack() {
            if (right.isEmpty()) {
                while (!left.isEmpty()) {
                    right.push(left.pop());
                }
            }
            return right.pop();
        }

        /** The front element without removing it. */
        public int peekFront() {
            if (left.isEmpty()) {
                while (!right.isEmpty()) {
                    left.push(right.pop());
                }
            }
            return left.peek();
        }

        /** The back element without removing it. */
        public int peekBack() {
            if (right.isEmpty()) {
                while (!left.isEmpty()) {
                    right.push(left.pop());
                }
            }
            return right.peek();
        }

        /** Number of elements currently stored. */
        public int size() {
            return left.size() + right.size();
        }

        /** True when the deque holds no element. */
        public boolean isEmpty() {
            return left.isEmpty() && right.isEmpty();
        }

        /** The deque contents from front to back, e.g. {@code [1, 2, 3]}. */
        public String contents() {
            StringBuilder sb = new StringBuilder("[");
            boolean first = true;
            for (int v : left) {
                if (!first) {
                    sb.append(", ");
                }
                sb.append(v);
                first = false;
            }
            Integer[] back = right.toArray(new Integer[0]);
            for (int i = back.length - 1; i >= 0; i--) {
                if (!first) {
                    sb.append(", ");
                }
                sb.append(back[i]);
                first = false;
            }
            return sb.append("]").toString();
        }

        /** Debug helper: the {@code left} stack, top first. */
        public String leftStack() {
            return stackToString(left);
        }

        /** Debug helper: the {@code right} stack, top first. */
        public String rightStack() {
            return stackToString(right);
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

        MyDeque deque = new MyDeque();
        for (int i = 0; i < m; i++) {
            String op = fs.next();
            switch (op) {
                case "pushFront" -> {
                    deque.pushFront(fs.nextInt());
                    System.out.println(deque.contents());
                }
                case "pushBack" -> {
                    deque.pushBack(fs.nextInt());
                    System.out.println(deque.contents());
                }
                case "popFront" -> System.out.println(deque.isEmpty() ? "empty" : String.valueOf(deque.popFront()));
                case "popBack" -> System.out.println(deque.isEmpty() ? "empty" : String.valueOf(deque.popBack()));
                case "peekFront" -> System.out.println(deque.isEmpty() ? "empty" : String.valueOf(deque.peekFront()));
                case "peekBack" -> System.out.println(deque.isEmpty() ? "empty" : String.valueOf(deque.peekBack()));
                case "size" -> System.out.println(deque.size());
                case "isEmpty" -> System.out.println(deque.isEmpty());
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
 * Problem: Implement Deque using Two Stacks
 * LeetCode: null | Difficulty: Medium | Frequency: 3/5
 * Pattern: Symmetric two-stack deque
 *
 * <p>Problem:
 * Implement a double-ended queue using two LIFO stacks. {@code pushFront} and
 * {@code pushBack} insert at either end; {@code popFront}, {@code popBack},
 * {@code peekFront} and {@code peekBack} read or remove from either end.
 *
 * <p>Input format (stdin):
 * <pre>
 * m
 * pushFront 1
 * pushBack 2
 * popFront
 * popBack
 * peekFront
 * peekBack
 * size
 * isEmpty
 * ...
 * </pre>
 * {@code m} is the number of operations; every operation is one line and the optional
 * argument of the push operations follows the operation word.
 *
 * <p>Sample input:
 * <pre>
 * 8
 * pushBack 1
 * pushBack 2
 * pushFront 0
 * pushBack 3
 * popFront
 * popBack
 * size
 * isEmpty
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * [1]
 * [1, 2]
 * [0, 1, 2]
 * [0, 1, 2, 3]
 * 0
 * 3
 * 2
 * false
 * </pre>
 *
 * <p>Approach: {@code left} owns the front of the deque and {@code right} owns the back.
 * A push always lands on its own stack. A pop from an empty side transfers every element
 * of the opposite stack — the transfer reverses the order, so the requested end becomes
 * the top of the receiving stack.
 *
 * <p>Complexity: Time O(1) amortised per operation, Space O(n).
 */
public class Main {

    /** A double-ended queue built from two LIFO stacks. */
    public static class MyDeque {

        /** Stack holding the front elements (top = front of the deque). */
        private final Deque<Integer> left = new ArrayDeque<>();

        /** Stack holding the back elements (top = back of the deque). */
        private final Deque<Integer> right = new ArrayDeque<>();

        /** Inserts {@code value} at the front. */
        public void pushFront(int value) {
            left.push(value);
        }

        /** Inserts {@code value} at the back. */
        public void pushBack(int value) {
            right.push(value);
        }

        /** Removes and returns the front element. */
        public int popFront() {
            if (left.isEmpty()) {
                while (!right.isEmpty()) {
                    left.push(right.pop());
                }
            }
            return left.pop();
        }

        /** Removes and returns the back element. */
        public int popBack() {
            if (right.isEmpty()) {
                while (!left.isEmpty()) {
                    right.push(left.pop());
                }
            }
            return right.pop();
        }

        /** The front element without removing it. */
        public int peekFront() {
            if (left.isEmpty()) {
                while (!right.isEmpty()) {
                    left.push(right.pop());
                }
            }
            return left.peek();
        }

        /** The back element without removing it. */
        public int peekBack() {
            if (right.isEmpty()) {
                while (!left.isEmpty()) {
                    right.push(left.pop());
                }
            }
            return right.peek();
        }

        /** Number of elements currently stored. */
        public int size() {
            return left.size() + right.size();
        }

        /** True when the deque holds no element. */
        public boolean isEmpty() {
            return left.isEmpty() && right.isEmpty();
        }

        /** The deque contents from front to back, e.g. {@code [1, 2, 3]}. */
        public String contents() {
            StringBuilder sb = new StringBuilder("[");
            boolean first = true;
            for (int v : left) {
                if (!first) {
                    sb.append(", ");
                }
                sb.append(v);
                first = false;
            }
            Integer[] back = right.toArray(new Integer[0]);
            for (int i = back.length - 1; i >= 0; i--) {
                if (!first) {
                    sb.append(", ");
                }
                sb.append(back[i]);
                first = false;
            }
            return sb.append("]").toString();
        }

        /** Debug helper: the {@code left} stack, top first. */
        public String leftStack() {
            return stackToString(left);
        }

        /** Debug helper: the {@code right} stack, top first. */
        public String rightStack() {
            return stackToString(right);
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

        MyDeque deque = new MyDeque();
        for (int i = 0; i < m; i++) {
            String op = fs.next();
            switch (op) {
                case "pushFront" -> {
                    deque.pushFront(fs.nextInt());
                    System.out.println(deque.contents());
                }
                case "pushBack" -> {
                    deque.pushBack(fs.nextInt());
                    System.out.println(deque.contents());
                }
                case "popFront" -> System.out.println(deque.isEmpty() ? "empty" : String.valueOf(deque.popFront()));
                case "popBack" -> System.out.println(deque.isEmpty() ? "empty" : String.valueOf(deque.popBack()));
                case "peekFront" -> System.out.println(deque.isEmpty() ? "empty" : String.valueOf(deque.peekFront()));
                case "peekBack" -> System.out.println(deque.isEmpty() ? "empty" : String.valueOf(deque.peekBack()));
                case "size" -> System.out.println(deque.size());
                case "isEmpty" -> System.out.println(deque.isEmpty());
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
`,r='\n# Implement Deque using Two Stacks\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Stack · Symmetric two-stack deque · Amortised O(1) |\n| **Interview heat** | ★★★☆☆ |\n| **Asked at** | Amazon, Meta, Google, Microsoft |\n\n## Problem Statement\n\nBuild a **double-ended queue** (deque) out of **two LIFO stacks**. A deque can be read\nand written at both ends.\n\n| Operation | Meaning |\n|---|---|\n| `pushFront x` | insert `x` at the front |\n| `pushBack x` | insert `x` at the back |\n| `popFront` | remove and return the front element |\n| `popBack` | remove and return the back element |\n| `peekFront` | the front element, without removing it |\n| `peekBack` | the back element, without removing it |\n| `size` | number of stored elements |\n| `isEmpty` | `true` when nothing is stored |\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nm\npushFront 1\npushBack 2\npopFront\npopBack\npeekFront\npeekBack\nsize\nisEmpty\n...\n```\n\n- `m` — the number of operations (1 ≤ m ≤ 10⁵), on the first line.\n- Every following line is **one operation**: the operation word, optionally followed by a\n  single integer argument (the two push operations take one).\n\nOutput rules — **one line per operation**:\n\n| Operation | Printed |\n|---|---|\n| `pushFront x` / `pushBack x` | the deque contents from front to back, e.g. `[0, 1, 2]` |\n| `popFront` / `popBack` | the removed element, or `empty` when the deque is empty |\n| `peekFront` / `peekBack` | the element, or `empty` when the deque is empty |\n| `size` | the number of stored elements |\n| `isEmpty` | `true` / `false` |\n\n## Sample Input\n\n```\n8\npushBack 1\npushBack 2\npushFront 0\npushBack 3\npopFront\npopBack\nsize\nisEmpty\n```\n\n## Expected Output\n\n```\n[1]\n[1, 2]\n[0, 1, 2]\n[0, 1, 2, 3]\n0\n3\n2\nfalse\n```\n\n`popFront` removes `0` (the element pushed at the front) and `popBack` removes `3` (the\nelement pushed last at the back); two elements are left.\n\n## Approach — Two stacks, one per end\n\nThe trick from [Implement Queue using Stacks](ImplementQueueUsingStacks.md)\ngeneralises neatly:\n\n- **`left`** owns the front of the deque — its top is the front element;\n- **`right`** owns the back of the deque — its top is the back element.\n\nPushes are trivial: `pushFront` goes onto `left`, `pushBack` goes onto `right`.\n\nA removal from an end whose stack is empty needs a **transfer**: pour the whole opposite\nstack onto it. The transfer reverses the order, and that reversal is exactly what puts\nthe correct element on top:\n\n- `popFront` with an empty `left` → move everything from `right` to `left`. `right` held\n  the elements back-to-front, so after the reversal `left` holds them front-to-back and\n  its top is the true front.\n- `popBack` with an empty `right` → move everything from `left` to `right`. Symmetrically.\n\n**Why amortised O(1):** an element is pushed once and can be transferred at most once in\neach direction, so the total movement over *m* operations is O(m).\n\n## Dry Run\n\nInput: `pushBack 1`, `pushBack 2`, `pushFront 0`, `pushBack 3`, `popFront`, `popBack`,\n`popBack`, `popFront`\n\nStacks are printed **top first**.\n\n| Step | Operation | `left` (top→bottom) | `right` (top→bottom) | Deque (front→back) | Printed |\n|---:|---|---|---|---|---|\n| 1 | `pushBack 1` | `[]` | `[1]` | `[1]` | `[1]` |\n| 2 | `pushBack 2` | `[]` | `[2, 1]` | `[1, 2]` | `[1, 2]` |\n| 3 | `pushFront 0` | `[0]` | `[2, 1]` | `[0, 1, 2]` | `[0, 1, 2]` |\n| 4 | `pushBack 3` | `[0]` | `[3, 2, 1]` | `[0, 1, 2, 3]` | `[0, 1, 2, 3]` |\n| 5 | `popFront` — `left` is not empty | `[0]` → `[]` | `[3, 2, 1]` | `[1, 2, 3]` | `0` |\n| 6 | `popBack` — `right` is not empty | `[]` | `[3, 2, 1]` → `[2, 1]` | `[1, 2]` | `3` |\n| 7 | `popBack` — `right` is not empty | `[]` | `[2, 1]` → `[1]` | `[1]` | `2` |\n| 8 | `popFront` — `left` empty → transfer `right`→`left` | `[]` → `[1]` | `[1]` → `[]` | `[1]` | — |\n| 9 | `popFront` — takes `left`\'s top | `[1]` → `[]` | `[]` | `[]` | `1` |\n\nStep 8 is the only transfer in this trace: `right` held `[1]`, so `left` received `[1]`\nand the deque order is unchanged. A transfer with more than one element reverses it,\nwhich is precisely what fixes the order for the requested end.\n\n## Java Solution\n\nSee [`ImplementDequeUsingTwoStacks.java`](./ImplementDequeUsingTwoStacks.java).\n\n```java\npublic int popFront() {\n    if (left.isEmpty()) {\n        while (!right.isEmpty()) {\n            left.push(right.pop());\n        }\n    }\n    return left.pop();\n}\n\npublic int popBack() {\n    if (right.isEmpty()) {\n        while (!left.isEmpty()) {\n            right.push(left.pop());\n        }\n    }\n    return right.pop();\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(1) amortised per operation | every element is transferred at most once per direction |\n| **Space** | O(n) | the two stacks together hold every element |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"Could one stack do it?"* → yes, with the classic "store a sign bit on the stack" trick:\n  push negative values for the front and positive ones for the back, and use the sign to\n  decide which end to pop. It is fiddly and rarely worth it.\n- *"What if pushes and pops are interleaved randomly?"* → the amortised bound still holds;\n  the worst single operation is O(n) (one big transfer), but the average is constant.\n- *"How does `java.util.ArrayDeque` do it?"* → it uses a single circular array with a\n  head and a tail index, i.e. the ring-buffer idea from\n  [Design Circular Queue](ImplementCircularQueue.md).\n- *"How would you add `removeFirstOccurrence(x)`?"* → you would need random access, so\n  the two-stack trick stops being the right tool; use a doubly linked list.\n\n**Common mistakes:**\n- ❌ Transferring in the **wrong direction** for a pop → the deque order flips and the\n  wrong element comes out.\n- ❌ Transferring **every time** instead of only when the target stack is empty → the\n  order is destroyed on every operation.\n- ❌ Assuming `peekFront`/`peekBack` are free when the stack is empty → they also need\n  the transfer (or they must peek into the opposite stack).\n\n**How to narrate:**\n> "I\'ll split the deque between two stacks: one owns the front, one owns the back. Every\n> push is O(1) on its own stack. When I need to pop from a side whose stack is empty, I\n> pour the other stack into it — the reversal that causes is exactly what puts the right\n> element on top. Each element moves at most twice, so the whole thing is O(1) amortised."\n\n## Related Problems\n\n- [Implement Queue using Stacks](ImplementQueueUsingStacks.md) — the one-ended version\n- [Implement Stack using Queues](ImplementStackUsingQueues.md) — the mirror image\n- [Design a Min Queue](MinQueue.md) — the same two stacks plus a running minimum\n- [Design Circular Queue](ImplementCircularQueue.md) — the array-based deque\n',i=[`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};