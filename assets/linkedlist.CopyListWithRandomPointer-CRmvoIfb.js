var e=`linkedlist.CopyListWithRandomPointer`,t=`package com.dsa.linkedlist;

import com.dsa.utils.FastScanner;

import java.util.IdentityHashMap;
import java.util.Map;

/**
 * Problem: Copy List with Random Pointer
 * LeetCode: 138 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Interleaving, Deep copy with cycles
 *
 * <p>Problem:
 * A linked list node has a {@code next} pointer and a {@code random} pointer that may point
 * at any node of the list (or at {@code null}). Return a **deep copy** of the list: every
 * node is new, and the copy's random pointers point at the **copy's** nodes, not at the
 * originals.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * values[0] values[1] ... values[n-1]
 * random[0] random[1] ... random[n-1]
 * </pre>
 * where {@code random[i]} is the 0-based index of the node that node {@code i}'s random
 * pointer refers to, or {@code -1} for {@code null}.
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 7 13 11
 * 2 0 0
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * 0
 * 0
 * </pre>
 *
 * <p>Approach: weave a copy of every node in between the original nodes, fix up the random
 * pointers while the copy is adjacent to its original, then split the list again.
 *
 * <p>Complexity: Time O(n), Space O(1) besides the copy.
 */
public class CopyListWithRandomPointer {

    /** A node with an extra {@code random} pointer. */
    public static class RandomNode {
        public int val;
        public RandomNode next;
        public RandomNode random;

        public RandomNode(int val) {
            this.val = val;
        }
    }

    /**
     * Deep copies the list: new nodes, and random pointers that point into the copy.
     *
     * @param head head of the original list
     * @return the head of the copy
     */
    public static RandomNode copyList(RandomNode head) {
        if (head == null) {
            return null;
        }
        // 1. weave: A -> A' -> B -> B' -> C -> C'
        for (RandomNode cur = head; cur != null; ) {
            RandomNode copy = new RandomNode(cur.val);
            copy.next = cur.next;
            cur.next = copy;
            cur = copy.next;
        }
        // 2. random pointers: the copy of X points at the copy of X.random
        for (RandomNode cur = head; cur != null; cur = cur.next.next) {
            if (cur.random != null) {
                cur.next.random = cur.random.next;
            }
        }
        // 3. split the two chains apart again
        RandomNode copyHead = null;
        RandomNode copyTail = null;
        for (RandomNode cur = head; cur != null; ) {
            RandomNode copy = cur.next;
            cur.next = copy.next;                    // original chain
            if (copyTail == null) {
                copyHead = copy;
            } else {
                copyTail.next = copy;                // copy chain
            }
            copyTail = copy;
            cur = cur.next;
        }
        return copyHead;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] values = fs.nextIntArray(n);
        int[] random = fs.nextIntArray(n);

        RandomNode head = null;
        RandomNode tail = null;
        RandomNode[] nodes = new RandomNode[n];
        for (int i = 0; i < n; i++) {
            nodes[i] = new RandomNode(values[i]);
            if (tail == null) {
                head = nodes[i];
            } else {
                tail.next = nodes[i];
            }
            tail = nodes[i];
        }
        for (int i = 0; i < n; i++) {
            nodes[i].random = random[i] < 0 ? null : nodes[random[i]];
        }

        RandomNode copy = copyList(head);

        // map every node of the copy to its index so the random pointers can be reported
        Map<RandomNode, Integer> index = new IdentityHashMap<>();
        int i = 0;
        for (RandomNode c = copy; c != null; c = c.next) {
            index.put(c, i++);
        }

        StringBuilder sb = new StringBuilder();
        for (RandomNode c = copy; c != null; c = c.next) {
            Integer target = c.random == null ? null : index.get(c.random);
            if (sb.length() > 0) {
                sb.append('\\n');
            }
            sb.append(target == null ? -1 : target);
        }
        System.out.println(sb);
    }
}
`,n=`import java.util.IdentityHashMap;
import java.util.Map;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Copy List with Random Pointer
 * LeetCode: 138 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Interleaving, Deep copy with cycles
 *
 * <p>Problem:
 * A linked list node has a {@code next} pointer and a {@code random} pointer that may point
 * at any node of the list (or at {@code null}). Return a **deep copy** of the list: every
 * node is new, and the copy's random pointers point at the **copy's** nodes, not at the
 * originals.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * values[0] values[1] ... values[n-1]
 * random[0] random[1] ... random[n-1]
 * </pre>
 * where {@code random[i]} is the 0-based index of the node that node {@code i}'s random
 * pointer refers to, or {@code -1} for {@code null}.
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 7 13 11
 * 2 0 0
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * 0
 * 0
 * </pre>
 *
 * <p>Approach: weave a copy of every node in between the original nodes, fix up the random
 * pointers while the copy is adjacent to its original, then split the list again.
 *
 * <p>Complexity: Time O(n), Space O(1) besides the copy.
 */
public class Main {

    /** A node with an extra {@code random} pointer. */
    public static class RandomNode {
        public int val;
        public RandomNode next;
        public RandomNode random;

        public RandomNode(int val) {
            this.val = val;
        }
    }

    /**
     * Deep copies the list: new nodes, and random pointers that point into the copy.
     *
     * @param head head of the original list
     * @return the head of the copy
     */
    public static RandomNode copyList(RandomNode head) {
        if (head == null) {
            return null;
        }
        // 1. weave: A -> A' -> B -> B' -> C -> C'
        for (RandomNode cur = head; cur != null; ) {
            RandomNode copy = new RandomNode(cur.val);
            copy.next = cur.next;
            cur.next = copy;
            cur = copy.next;
        }
        // 2. random pointers: the copy of X points at the copy of X.random
        for (RandomNode cur = head; cur != null; cur = cur.next.next) {
            if (cur.random != null) {
                cur.next.random = cur.random.next;
            }
        }
        // 3. split the two chains apart again
        RandomNode copyHead = null;
        RandomNode copyTail = null;
        for (RandomNode cur = head; cur != null; ) {
            RandomNode copy = cur.next;
            cur.next = copy.next;                    // original chain
            if (copyTail == null) {
                copyHead = copy;
            } else {
                copyTail.next = copy;                // copy chain
            }
            copyTail = copy;
            cur = cur.next;
        }
        return copyHead;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] values = fs.nextIntArray(n);
        int[] random = fs.nextIntArray(n);

        RandomNode head = null;
        RandomNode tail = null;
        RandomNode[] nodes = new RandomNode[n];
        for (int i = 0; i < n; i++) {
            nodes[i] = new RandomNode(values[i]);
            if (tail == null) {
                head = nodes[i];
            } else {
                tail.next = nodes[i];
            }
            tail = nodes[i];
        }
        for (int i = 0; i < n; i++) {
            nodes[i].random = random[i] < 0 ? null : nodes[random[i]];
        }

        RandomNode copy = copyList(head);

        // map every node of the copy to its index so the random pointers can be reported
        Map<RandomNode, Integer> index = new IdentityHashMap<>();
        int i = 0;
        for (RandomNode c = copy; c != null; c = c.next) {
            index.put(c, i++);
        }

        StringBuilder sb = new StringBuilder();
        for (RandomNode c = copy; c != null; c = c.next) {
            Integer target = c.random == null ? null : index.get(c.random);
            if (sb.length() > 0) {
                sb.append('\\n');
            }
            sb.append(target == null ? -1 : target);
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
# Copy List with Random Pointer — LeetCode 138

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Interleaving · Deep copy with cycles |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Microsoft, Uber, Bloomberg |

## Problem Statement

A linked list node has a \`next\` pointer and a **\`random\`** pointer that may point at any node
of the list (or at \`null\`). Return a **deep copy**:

- every node of the result is a *new* node,
- the copy's \`next\` chain points at the copy's nodes,
- the copy's \`random\` pointers point at the **copy's** nodes, never at the originals.

The list \`7 -> 13 -> 11\` with \`7.random = 11\`, \`13.random = 7\` and \`11.random = 7\` must be
copied so that the new nodes' random pointers refer to the new nodes.

## Input Format

The program reads from standard input:

\`\`\`
n
values[0] values[1] ... values[n-1]
random[0] random[1] ... random[n-1]
\`\`\`

- \`n\` — number of nodes (0 ≤ n ≤ 1000)
- \`values\` — n space-separated integers
- \`random\` — n space-separated integers; \`random[i]\` is the **0-based index** of the node
  that node \`i\`'s random pointer refers to, or \`-1\` for \`null\`

The program prints, one per line, the index **inside the copy** that each copied node's
random pointer refers to (\`-1\` for \`null\`). Printing the copy's own indices proves the
random pointers were rewired to the copy and not left pointing into the original.

## Sample Input

\`\`\`
3
7 13 11
2 0 0
\`\`\`

## Expected Output

\`\`\`
2
0
0
\`\`\`

The copy's \`7\` points (randomly) at the copy's third node (index 2), and the copy's \`13\` and
\`11\` both point at the copy's first node (index 0). ✓

## Approach — Weave, Wire, Split

Copying the list is easy; copying the **random** pointers is the hard part, because a node's
random pointer may point *backwards*, to a node that has not been copied yet.

The **interleaving** trick removes the problem entirely:

1. **Weave.** Put a copy of every node directly *after* its original:
   \`A -> A' -> B -> B' -> C -> C'\`. Now every original node is immediately followed by its
   copy, and the copy of any node \`X\` is always \`X.next\`.
2. **Wire the random pointers.** For every original node \`X\` with \`X.random = Y\`, set
   \`X.next.random = Y.next\` — the copy of \`X\` now points at the copy of \`Y\`. Because the
   copy of \`Y\` sits right next to \`Y\`, this is a single assignment, and the "backwards
   pointer" problem disappears.
3. **Split.** Walk the chain and pull out the even-indexed nodes (the copies) into a chain
   of their own. The original chain is restored as it was.

**Why not a hash map?** \`map.get(node.random)\` gives you the copy, but the map costs O(n)
space and the whole point of this problem is that the O(1)-space solution exists.

## Dry Run

Input: \`7 -> 13 -> 11\`, random indices \`2 0 0\`

**Step 1 — weave**

| Step | \`cur\` | copy created | chain |
|---:|---|---|---|
| 1 | \`7\` | \`7'\` | \`7 -> 7' -> 13 -> 11\` |
| 2 | \`13\` | \`13'\` | \`7 -> 7' -> 13 -> 13' -> 11\` |
| 3 | \`11\` | \`11'\` | \`7 -> 7' -> 13 -> 13' -> 11 -> 11'\` |

**Step 2 — wire the random pointers** (\`cur.next\` is the copy, \`cur.random.next\` is the
copy of the random target)

| Step | \`cur\` | \`cur.random\` | assignment | result |
|---:|---|---|---|---|
| 1 | \`7\` | \`11\` | \`7'.random = 11.next = 11'\` | \`7'.random = 11'\` ✓ |
| 2 | \`13\` | \`7\` | \`13'.random = 7.next = 7'\` | \`13'.random = 7'\` ✓ |
| 3 | \`11\` | \`7\` | \`11'.random = 7.next = 7'\` | \`11'.random = 7'\` ✓ |

**Step 3 — split** (even positions go to the copy chain)

| Step | \`cur\` | \`copy\` | original chain | copy chain |
|---:|---|---|---|---|
| 1 | \`7\` | \`7'\` | \`13 -> 13' -> 11 -> 11'\` | \`7'\` |
| 2 | \`13\` | \`13'\` | \`11 -> 11'\` | \`7' -> 13'\` |
| 3 | \`11\` | \`11'\` | \`null\` | \`7' -> 13' -> 11'\` |

Copy indices: \`7'\` is 0, \`13'\` is 1, \`11'\` is 2. The random pointers of the copy are
\`11'\` (index 2), \`7'\` (index 0) and \`7'\` (index 0) → the output

\`\`\`
2
0
0
\`\`\`

✓

## Java Solution

See [\`CopyListWithRandomPointer.java\`](./CopyListWithRandomPointer.java).

\`\`\`java
public static RandomNode copyList(RandomNode head) {
    if (head == null) {
        return null;
    }
    // 1. weave: A -> A' -> B -> B' -> C -> C'
    for (RandomNode cur = head; cur != null; ) {
        RandomNode copy = new RandomNode(cur.val);
        copy.next = cur.next;
        cur.next = copy;
        cur = copy.next;
    }
    // 2. random pointers: the copy of X points at the copy of X.random
    for (RandomNode cur = head; cur != null; cur = cur.next.next) {
        if (cur.random != null) {
            cur.next.random = cur.random.next;
        }
    }
    // 3. split the two chains apart again
    RandomNode copyHead = null;
    RandomNode copyTail = null;
    for (RandomNode cur = head; cur != null; ) {
        RandomNode copy = cur.next;
        cur.next = copy.next;
        if (copyTail == null) {
            copyHead = copy;
        } else {
            copyTail.next = copy;
        }
        copyTail = copy;
        cur = cur.next;
    }
    return copyHead;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Three linear passes |
| **Space** | O(n) | The copy itself — the algorithm needs no extra container beyond it |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it with a hash map?"* → yes: \`map.get(node.random)\`; O(n) space but much
  shorter code. Mention it as the fallback.
- *"The random pointer points to a node outside the list."* → the map approach still works;
  the interleaving approach needs the outside node to be copied too.
- *"What if the node had three extra pointers?"* → the same weaving idea generalises.
- *"Do it without allocating the copy until later."* → the copy is the point, so no.

**Common mistakes:**
- ❌ Setting \`copy.random = cur.random\` → the copy points into the **original** list; the
  whole point is to avoid that.
- ❌ Forgetting the \`cur.random != null\` check → \`NullPointerException\` for nodes whose
  random pointer is null.
- ❌ Splitting the chains in the wrong order → the original list ends up with the copy's
  nodes; the original chain must be relinked with \`cur.next = copy.next\` **before** the copy
  chain is extended.

**How to narrate:**
> "The tricky part is the random pointers, because they can point backwards. Instead of a
> map I interleave: I put a copy of every node right after its original, so the copy of any
> node is always its \`next\`. Now the random pointer of a copy is one assignment:
> \`copy.random = original.random.next\`. After that I split the two chains apart. Three
> linear passes and no extra container beyond the copy itself."

## Related Problems

- [Reverse Linked List](ReverseLinkedList.md) — pointer rewiring drill
- [Clone a graph](../../../../../../docs/topics/15-graphs.md) — the same "copy with extra pointers" idea
- [Copy List with Random Pointer](../../../../../../docs/topics/23-design.md) — the hash-map variant
`,i=[`copyList`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};