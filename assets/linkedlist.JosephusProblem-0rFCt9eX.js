var e=`linkedlist.JosephusProblem`,t=`package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;

/**
 * Problem: Josephus Problem
 * Difficulty: Medium | Frequency: 3/5
 * Pattern: Recurrence, Simulation
 *
 * <p>Problem:
 * {@code n} people stand in a circle. Starting at person 0, every {@code k}-th person is
 * removed and the counting continues from the next person. Which person survives?
 * This program prints the **0-based index** of the survivor.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * k
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 7
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: the O(n) recurrence J(1) = 0, J(m) = (J(m - 1) + k) % m.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class JosephusProblem {

    /**
     * Returns the 0-based index of the survivor.
     *
     * @param n number of people (n &ge; 1)
     * @param k the counting step (k &ge; 1)
     * @return the index of the survivor
     */
    public static int josephus(int n, int k) {
        int survivor = 0;                 // J(1, k) = 0
        for (int size = 2; size <= n; size++) {
            survivor = (survivor + k) % size;
        }
        return survivor;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int k = fs.nextInt();

        System.out.println(josephus(n, k));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Josephus Problem
 * Difficulty: Medium | Frequency: 3/5
 * Pattern: Recurrence, Simulation
 *
 * <p>Problem:
 * {@code n} people stand in a circle. Starting at person 0, every {@code k}-th person is
 * removed and the counting continues from the next person. Which person survives?
 * This program prints the **0-based index** of the survivor.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * k
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 7
 * 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: the O(n) recurrence J(1) = 0, J(m) = (J(m - 1) + k) % m.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Returns the 0-based index of the survivor.
     *
     * @param n number of people (n &ge; 1)
     * @param k the counting step (k &ge; 1)
     * @return the index of the survivor
     */
    public static int josephus(int n, int k) {
        int survivor = 0;                 // J(1, k) = 0
        for (int size = 2; size <= n; size++) {
            survivor = (survivor + k) % size;
        }
        return survivor;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int k = fs.nextInt();

        System.out.println(josephus(n, k));
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
`,r='\n# Josephus Problem\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Recurrence · Simulation |\n| **Interview heat** | ★★★☆☆ |\n| **Asked at** | Amazon, Google, Meta, Microsoft, Uber |\n\n## Problem Statement\n\n`n` people stand in a circle, numbered `0` to `n - 1`. Starting at person `0`, count `k`\npeople and remove the last one; continue counting from the next person. Which person is left\nlast?\n\n- `n = 7, k = 3` → the survivor is person `3` (the 4th person).\n- `n = 1` → the survivor is person `0`.\n- `k = 1` → people are removed in order, so the survivor is person `n - 1`.\n\nThe program prints the **0-based index** of the survivor.\n\n## Input Format\n\nThe program reads from standard input:\n\n```\nn\nk\n```\n\n- `n` — the number of people (1 ≤ n ≤ 10⁶)\n- `k` — the counting step (1 ≤ k ≤ 10⁶)\n\n## Sample Input\n\n```\n7\n3\n```\n\n## Expected Output\n\n```\n3\n```\n\nThe elimination order is `2, 5, 1, 6, 4, 0`, so person `3` survives. ✓\n\n## Approach — The O(n) Recurrence\n\nA simulation with a linked list takes O(n · k) time — with `k = 10⁶` that is hopeless. The\nclassic trick is to notice that the answer for `n` people is the answer for `n - 1` people\n**rotated**.\n\nLet `J(m)` be the 0-based index of the survivor among `m` people. The first person removed\nis `(k - 1) % m`. Relabel the circle so that the person *after* the removed one becomes\nperson `0` — then the remaining `m - 1` people are exactly the same problem, and the\nsurvivor\'s position in the new labelling is `J(m - 1)`. Undoing the relabelling shifts\nevery position by `k`:\n\n```\nJ(1) = 0\nJ(m) = (J(m - 1) + k) % m\n```\n\nComputing this bottom-up is a single loop of `n` iterations, each O(1) — O(n) time, O(1)\nspace.\n\n**Why the shift is `k` and not `k - 1`:** the new person 0 is the old person `k % m`, so\nold position = new position + `k` (mod `m`).\n\n## Dry Run\n\nInput: `n = 7`, `k = 3`\n\n| Step | `size` (m) | `J(m - 1)` | `J(m) = (J(m - 1) + k) % m` | note |\n|---:|---:|---:|---:|---|\n| 1 | `1` | — | `0` | base case: one person survives |\n| 2 | `2` | `0` | `(0 + 3) % 2 = 1` | |\n| 3 | `3` | `1` | `(1 + 3) % 3 = 1` | |\n| 4 | `4` | `1` | `(1 + 3) % 4 = 0` | |\n| 5 | `5` | `0` | `(0 + 3) % 5 = 3` | |\n| 6 | `6` | `3` | `(3 + 3) % 6 = 0` | |\n| 7 | `7` | `0` | `(0 + 3) % 7 = 3` | **answer: person 3** |\n\nThe loop keeps only the previous value, so the memory used is a single int. ✓\n\n### Cross-check with the simulation for `n = 7, k = 3`\n\n| Round | circle before | removed | circle after |\n|---:|---|---|---|\n| 1 | `0 1 2 3 4 5 6` | `2` | `0 1 3 4 5 6` (counting restarts at 3) |\n| 2 | `0 1 3 4 5 6` | `5` | `0 1 3 4 6` |\n| 3 | `0 1 3 4 6` | `1` | `0 3 4 6` |\n| 4 | `0 3 4 6` | `6` | `0 3 4` |\n| 5 | `0 3 4` | `4` | `0 3` |\n| 6 | `0 3` | `0` | `3` |\n\nThe last person standing is `3` — the same answer the recurrence gives. ✓\n\n## Java Solution\n\nSee [`JosephusProblem.java`](./JosephusProblem.java).\n\n```java\npublic static int josephus(int n, int k) {\n    int survivor = 0;                 // J(1, k) = 0\n    for (int size = 2; size <= n; size++) {\n        survivor = (survivor + k) % size;\n    }\n    return survivor;\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(n) | One iteration per person |\n| **Space** | O(1) | A single variable holds the running answer |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"Make it work for huge `n`."* → the recurrence is already O(n); for `n` up to 10¹⁸ use\n  the matrix-exponentiation variant, or the fact that `J(n) = n - 1` for `k = 1`.\n- *"What if the counting starts at person 1?"* → add 1 to the 0-based answer.\n- *"What if `k` is fixed and `n` varies — can you precompute?"* → yes, the recurrence gives\n  every `J(m)` for `m = 1..n` in one pass.\n- *"Can you do it with a linked list?"* → yes: a circular list and `k - 1` steps per\n  removal — O(n·k), which is exactly why the recurrence is the better answer.\n\n**Common mistakes:**\n- ❌ Using `(survivor + k - 1) % size` → off by one; the shift is `k`, not `k - 1`.\n- ❌ Starting the loop at `size = 1` with the base case `J(1) = 1` → mixing 1-based and\n  0-based indexing.\n- ❌ Forgetting the modulo → the running value grows without bound.\n\n**How to narrate:**\n> "A simulation is O(n·k) and too slow. I use the recurrence: with one person the survivor\n> is 0, and going from m-1 people to m people is just a rotation by k, so\n> `J(m) = (J(m-1) + k) % m`. I compute it bottom-up in one loop, keeping a single variable.\n> O(n) time and O(1) space."\n\n## Related Problems\n\n- [Rotate List](RotateList.md) — the same circle, a different cut\n- [Linked List Cycle](DetectCycle.md) — circular list detection\n- [Game of Life](../../../../../../docs/topics/17-dynamicprogramming.md) — the same "reduce to a smaller circle" idea\n',i=[`josephus`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};