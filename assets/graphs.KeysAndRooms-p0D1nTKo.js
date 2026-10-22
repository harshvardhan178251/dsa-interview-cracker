var e=`graphs.KeysAndRooms`,t=`package com.dsa.graphs;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

/**
 * Problem: Keys and Rooms
 * LeetCode: 841 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Graph traversal, iterative DFS
 *
 * <p>Problem: Rooms are numbered {@code 0..n-1}. Room {@code i} may contain keys to other rooms.
 * Starting in room 0, decide whether every room can be opened. A key can only be used once it
 * has been picked up in a room that was already opened.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * k0 key0_1 key0_2 ...   (room 0: how many keys it holds, then the key numbers)
 * k1 key1_1 ...
 * ...
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 1 1
 * 1 2
 * 0
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: model the rooms as a graph where an edge goes from a room to every room whose key
 * it holds, then run an iterative DFS from room 0. The answer is {@code true} when the DFS
 * reaches every room.
 *
 * <p>Complexity: Time O(n + K) where K is the total number of keys, Space O(n + K).
 */
public class KeysAndRooms {

    /**
     * Decides whether all rooms can be visited starting from room 0.
     *
     * @param rooms room {@code i} holds the keys listed in {@code rooms.get(i)}
     * @return {@code true} when every room can be reached
     */
    public static boolean canVisitAllRooms(List<List<Integer>> rooms) {
        int n = rooms.size();
        if (n == 0) {
            return true;
        }
        boolean[] visited = new boolean[n];
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(0);
        visited[0] = true;
        int opened = 1;

        while (!stack.isEmpty()) {
            int room = stack.pop();
            for (int key : rooms.get(room)) {
                if (key >= 0 && key < n && !visited[key]) {
                    visited[key] = true;
                    opened++;
                    stack.push(key);
                }
            }
        }
        return opened == n;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        List<List<Integer>> rooms = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            int keyCount = fs.nextInt();
            List<Integer> keys = new ArrayList<>(keyCount);
            for (int j = 0; j < keyCount; j++) {
                keys.add(fs.nextInt());
            }
            rooms.add(keys);
        }

        System.out.println(canVisitAllRooms(rooms));
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
 * Problem: Keys and Rooms
 * LeetCode: 841 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Graph traversal, iterative DFS
 *
 * <p>Problem: Rooms are numbered {@code 0..n-1}. Room {@code i} may contain keys to other rooms.
 * Starting in room 0, decide whether every room can be opened. A key can only be used once it
 * has been picked up in a room that was already opened.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * k0 key0_1 key0_2 ...   (room 0: how many keys it holds, then the key numbers)
 * k1 key1_1 ...
 * ...
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 1 1
 * 1 2
 * 0
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: model the rooms as a graph where an edge goes from a room to every room whose key
 * it holds, then run an iterative DFS from room 0. The answer is {@code true} when the DFS
 * reaches every room.
 *
 * <p>Complexity: Time O(n + K) where K is the total number of keys, Space O(n + K).
 */
public class Main {

    /**
     * Decides whether all rooms can be visited starting from room 0.
     *
     * @param rooms room {@code i} holds the keys listed in {@code rooms.get(i)}
     * @return {@code true} when every room can be reached
     */
    public static boolean canVisitAllRooms(List<List<Integer>> rooms) {
        int n = rooms.size();
        if (n == 0) {
            return true;
        }
        boolean[] visited = new boolean[n];
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(0);
        visited[0] = true;
        int opened = 1;

        while (!stack.isEmpty()) {
            int room = stack.pop();
            for (int key : rooms.get(room)) {
                if (key >= 0 && key < n && !visited[key]) {
                    visited[key] = true;
                    opened++;
                    stack.push(key);
                }
            }
        }
        return opened == n;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        List<List<Integer>> rooms = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            int keyCount = fs.nextInt();
            List<Integer> keys = new ArrayList<>(keyCount);
            for (int j = 0; j < keyCount; j++) {
                keys.add(fs.nextInt());
            }
            rooms.add(keys);
        }

        System.out.println(canVisitAllRooms(rooms));
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
# Keys and Rooms — LeetCode 841

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Graph traversal · Reachability |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Airbnb |

## Problem Statement

Rooms are numbered \`0 … n-1\`. Room \`i\` may contain **keys** to other rooms. Starting in room
\`0\`, decide whether **every** room can be opened.

A key can only be used once it has been picked up in a room that was already opened, so the
question is exactly: *is every vertex reachable from vertex 0?*

## Input Format

\`\`\`
n
k0 key0_1 key0_2 ...
k1 key1_1 ...
...
k(n-1) ...
\`\`\`

- \`n\` — number of rooms (\`1 ≤ n ≤ 20\`)
- one line per room, holding the **number of keys** in that room followed by the key numbers

## Sample Input

\`\`\`
3
1 1
1 2
0
\`\`\`

## Expected Output

\`\`\`
true
\`\`\`

Room 0 holds the key to room 1, room 1 holds the key to room 2, so all three rooms open.

## Approach — model it as a graph and traverse it

Room \`i\` holding the key to room \`j\` is an edge \`i → j\`. The answer is \`true\` when a DFS from
room 0 reaches every vertex.

The traversal is the standard one:

1. Mark room \`0\` visited and push it onto a stack.
2. Pop a room, look at its keys. For every key that points at an unvisited room, mark it visited
   **immediately** and push it.
3. Count how many rooms were opened; the answer is \`opened == n\`.

**Mark visited on push, not on pop.** Otherwise the same room can be pushed many times (once per
key that opens it) and the stack can blow up. Marking on push makes every room enter the stack
exactly once.

## Dry Run

| Step | Pop | Keys in that room | Newly opened | Visited after | Stack after |
|---:|---|---|---|---|---|
| 0 | — | — | \`0\` (the start) | \`{0}\` | \`[0]\` |
| 1 | \`0\` | \`[1]\` | \`1\` | \`{0, 1}\` | \`[1]\` |
| 2 | \`1\` | \`[2]\` | \`2\` | \`{0, 1, 2}\` | \`[2]\` |
| 3 | \`2\` | \`[]\` | — | \`{0, 1, 2}\` | \`[]\` |

\`opened = 3 == n\` → **\`true\`**.

### The unreachable case

\`\`\`
3
0
1 1
1 2
\`\`\`

Room 0 is empty, so no key is ever picked up. Only room 0 is opened → \`opened = 1 ≠ 3\` →
**\`false\`**.

## Java Solution

See [\`KeysAndRooms.java\`](./KeysAndRooms.java).

\`\`\`java
public static boolean canVisitAllRooms(List<List<Integer>> rooms) {
    int n = rooms.size();
    boolean[] visited = new boolean[n];
    Deque<Integer> stack = new ArrayDeque<>();
    stack.push(0);
    visited[0] = true;
    int opened = 1;
    while (!stack.isEmpty()) {
        int room = stack.pop();
        for (int key : rooms.get(room)) {
            if (key >= 0 && key < n && !visited[key]) {
                visited[key] = true;
                opened++;
                stack.push(key);
            }
        }
    }
    return opened == n;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n + K) | \`K\` is the total number of keys; every key is inspected exactly once |
| **Space** | O(n + K) | The visited array, the stack and the room list |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the keys are in a single global list instead of per room?"* → the same traversal, but
  you need the room→keys mapping first.
- *"What if a key can open a room that contains the key back?"* → cycles are handled by the
  visited array.
- *"Can you solve it without a stack, using the room array itself?"* → yes — mark a room as
  visited in place (e.g. by emptying its key list) and scan the array repeatedly until no
  progress is made; that is the O(n·K) version.
- *"What if you had to report the order the rooms are opened?"* → record the order in which you
  push the rooms.

**Common mistakes:**
- ❌ Marking visited **after** popping → the same room gets pushed repeatedly.
- ❌ Forgetting to seed the stack with room \`0\` → the traversal never starts.
- ❌ Not handling \`n == 0\` → the start room does not exist; the answer is trivially \`true\`.

**How to narrate:**
> "This is reachability: treat every key as an edge from the room that holds it to the room it
> opens. I run an iterative DFS from room 0, marking a room visited the moment I push it so no
> room is pushed twice. If the number of opened rooms equals n, every room can be reached."

## Related Problems

- [Number of Connected Components](./NumberOfConnectedComponents.java) — count components instead
- [Graph Valid Tree](./GraphValidTree.java) — connectivity plus cycle detection
- [Clone Graph](./CloneGraph.java) — copying an arbitrary connected structure
- [Bipartite Check](./BipartiteCheck.java) — colouring every component
`,i=[`canVisitAllRooms`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};