var e=`design.SnapshotArray`,t=`package com.dsa.design;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.List;

/**
 * Problem: Snapshot Array
 * LeetCode: 1146 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Design, Versioned history per index
 *
 * <p>Problem:
 * Support a snapshot array: {@code set(index, value)} stores a new value and
 * {@code get(index, snap_id)} returns the value that index had at the given snapshot.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * idx val
 * idx val
 * ...
 * snap_id
 * snap_idx
 * </pre>
 * {@code n} is both the length of the array and the number of set operations. The
 * {@code i}-th set operation belongs to snapshot {@code i + 1}, so snapshot {@code 0} is
 * the pristine array full of zeros. The last two values are the snapshot id and the
 * index to query.
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 0 5
 * 1 6
 * 0 7
 * 3
 * 0
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 7
 * </pre>
 *
 * <p>Approach: every index keeps its own history list of {@code (snapshotId, value)}
 * pairs, appended in increasing snapshot order. A read walks the list and keeps the last
 * value whose snapshot id is not greater than the requested one — which is exactly the
 * value the index had at that snapshot.
 *
 * <p>Complexity: Time O(1) per set, O(log s) per get with binary search or O(s) with a
 * linear scan, Space O(number of sets).
 */
public class SnapshotArray {

    /** One recorded write: the snapshot id it belongs to and the value written. */
    private static final class Version {
        final int snapId;
        final int value;

        Version(int snapId, int value) {
            this.snapId = snapId;
            this.value = value;
        }
    }

    private final List<List<Version>> history = new ArrayList<>();

    public SnapshotArray(int length) {
        for (int i = 0; i < Math.max(0, length); i++) {
            history.add(new ArrayList<>());
        }
    }

    /** Records {@code value} for {@code index} as of snapshot {@code snapId}. */
    public void set(int index, int snapId, int value) {
        history.get(index).add(new Version(snapId, value));
    }

    /** Returns the value of {@code index} as of snapshot {@code snapId}. */
    public int get(int index, int snapId) {
        int result = 0; // every index starts at 0
        for (Version version : history.get(index)) {
            if (version.snapId > snapId) {
                break; // history is ordered by snapshot id
            }
            result = version.value;
        }
        return result;
    }

    /** Number of recorded writes for {@code index}. */
    public int versions(int index) {
        return history.get(index).size();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        SnapshotArray array = new SnapshotArray(n);
        for (int snapId = 1; snapId <= n; snapId++) {
            int index = fs.nextInt();
            int value = fs.nextInt();
            array.set(index, snapId, value);
        }
        int snapId = fs.nextInt();
        int snapIndex = fs.nextInt();

        System.out.println(array.get(snapIndex, snapId));
    }
}
`,n=`import java.util.ArrayList;
import java.util.List;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Snapshot Array
 * LeetCode: 1146 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Design, Versioned history per index
 *
 * <p>Problem:
 * Support a snapshot array: {@code set(index, value)} stores a new value and
 * {@code get(index, snap_id)} returns the value that index had at the given snapshot.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * idx val
 * idx val
 * ...
 * snap_id
 * snap_idx
 * </pre>
 * {@code n} is both the length of the array and the number of set operations. The
 * {@code i}-th set operation belongs to snapshot {@code i + 1}, so snapshot {@code 0} is
 * the pristine array full of zeros. The last two values are the snapshot id and the
 * index to query.
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 0 5
 * 1 6
 * 0 7
 * 3
 * 0
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 7
 * </pre>
 *
 * <p>Approach: every index keeps its own history list of {@code (snapshotId, value)}
 * pairs, appended in increasing snapshot order. A read walks the list and keeps the last
 * value whose snapshot id is not greater than the requested one — which is exactly the
 * value the index had at that snapshot.
 *
 * <p>Complexity: Time O(1) per set, O(log s) per get with binary search or O(s) with a
 * linear scan, Space O(number of sets).
 */
public class Main {

    /** One recorded write: the snapshot id it belongs to and the value written. */
    private static final class Version {
        final int snapId;
        final int value;

        Version(int snapId, int value) {
            this.snapId = snapId;
            this.value = value;
        }
    }

    private final List<List<Version>> history = new ArrayList<>();

    public Main(int length) {
        for (int i = 0; i < Math.max(0, length); i++) {
            history.add(new ArrayList<>());
        }
    }

    /** Records {@code value} for {@code index} as of snapshot {@code snapId}. */
    public void set(int index, int snapId, int value) {
        history.get(index).add(new Version(snapId, value));
    }

    /** Returns the value of {@code index} as of snapshot {@code snapId}. */
    public int get(int index, int snapId) {
        int result = 0; // every index starts at 0
        for (Version version : history.get(index)) {
            if (version.snapId > snapId) {
                break; // history is ordered by snapshot id
            }
            result = version.value;
        }
        return result;
    }

    /** Number of recorded writes for {@code index}. */
    public int versions(int index) {
        return history.get(index).size();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        Main array = new Main(n);
        for (int snapId = 1; snapId <= n; snapId++) {
            int index = fs.nextInt();
            int value = fs.nextInt();
            array.set(index, snapId, value);
        }
        int snapId = fs.nextInt();
        int snapIndex = fs.nextInt();

        System.out.println(array.get(snapIndex, snapId));
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
# Snapshot Array — LeetCode 1146

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Design · Versioning · Per-index history |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Airbnb |

## Problem Statement

Support a snapshot array.

- \`set(index, value)\` stores a new value for that index.
- \`get(index, snap_id)\` returns the value the index had **at the given snapshot** — the
  last value written to that index at or before that snapshot. An index that was never
  written returns \`0\`.

A snapshot freezes the whole array; the trick is that we only have to remember *when*
each value was written.

## Input Format

\`\`\`
n
idx val
idx val
...
snap_id
snap_idx
\`\`\`

- \`n\` — the length of the array **and** the number of set operations.
- \`idx val\` — one write. The \`i\`-th write belongs to snapshot \`i + 1\`, so snapshot \`0\` is
  the pristine array full of zeros.
- \`snap_id\` — the snapshot to read.
- \`snap_idx\` — the index to read.

The program prints the value of \`snap_idx\` as of snapshot \`snap_id\`.

## Sample Input

\`\`\`
3
0 5
1 6
0 7
3
0
\`\`\`

## Expected Output

\`\`\`
7
\`\`\`

Index \`0\` was written with \`5\` in snapshot \`1\` and overwritten with \`7\` in snapshot \`3\`,
so at snapshot \`3\` it holds \`7\`.

## Approach — one history list per index

Every index keeps its own list of \`(snapshotId, value)\` pairs, appended in increasing
snapshot order:

\`\`\`
index 0 → [(1, 5), (3, 7)]
index 1 → [(2, 6)]
index 2 → []
\`\`\`

\`get(index, snap_id)\` walks the list and keeps the value of the last pair whose
\`snapshotId <= snap_id\`; if there is none, the answer is \`0\`.

Because the history of an index is ordered by snapshot id, the walk can stop at the first
pair that is already too new.

**Space.** The naive version stores a full copy of the array per snapshot — O(n·s). The
history version stores one entry per *write*, so it is O(number of writes) in total, no
matter how many snapshots there are. That is the whole point of the problem.

## Dry Run

Input: \`n = 3\`, writes \`(0,5)\`, \`(1,6)\`, \`(0,7)\`, query \`snap_id = 3\`, \`snap_idx = 0\`.

| Step | Write | Index | Snapshot id | History of index before | History after | Note |
|---:|---|---:|---:|---|---|---|
| 1 | \`0 5\` | 0 | 1 | \`[]\` | \`[(1,5)]\` | first write to index 0 |
| 2 | \`1 6\` | 1 | 2 | \`[]\` | \`[(2,6)]\` | first write to index 1 |
| 3 | \`0 7\` | 0 | 3 | \`[(1,5)]\` | \`[(1,5), (3,7)]\` | index 0 written again |

Query \`get(0, 3)\`:

| Step | Pair | \`snapId <= 3\`? | Running result |
|---:|---|---|---|
| 1 | \`(1, 5)\` | yes | \`5\` |
| 2 | \`(3, 7)\` | yes | \`7\` |

Result: **7**.

The same query at an earlier snapshot gives a different answer:

| Query | Walk | Result |
|---|---|---|
| \`get(0, 0)\` | first pair \`(1,5)\` is already newer → stop | \`0\` (never written at snapshot 0) |
| \`get(0, 1)\` | \`(1,5)\` → yes, \`(3,7)\` → no → stop | \`5\` |
| \`get(0, 2)\` | \`(1,5)\` → yes, \`(3,7)\` → no → stop | \`5\` |
| \`get(0, 3)\` | \`(1,5)\` → yes, \`(3,7)\` → yes | \`7\` |

## Java Solution

See [\`SnapshotArray.java\`](./SnapshotArray.java).

\`\`\`java
public void set(int index, int snapId, int value) {
    history.get(index).add(new Version(snapId, value));
}

public int get(int index, int snapId) {
    int result = 0;                         // every index starts at 0
    for (Version version : history.get(index)) {
        if (version.snapId > snapId) {
            break;                          // the history is ordered by snapshot id
        }
        result = version.value;
    }
    return result;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(1) per \`set\`, O(w) per \`get\` | one append; one walk over the writes of that index |
| **Space** | O(w) for w writes | one entry per write, not per snapshot |

**With binary search?** The history of an index is sorted by snapshot id, so \`get\` can
be O(log w) with a binary search for the last pair with \`snapId <= snap_id\`.

## Interview Notes

**Follow-ups to raise yourself:**
- *"How would you support \`get(index, snap_id)\` in O(log w)?"* → binary search over the
  per-index history.
- *"What if the array is huge and mostly zeros?"* → store only the indices that were
  written (a hash map of histories) — that is what this solution effectively does.
- *"How would you implement a real snapshot (copy-on-write)?"* → a persistent data
  structure, or a versioned B-tree, where a snapshot is just a root pointer.
- *"How would you undo to a snapshot?"* → the same history, read backwards.

**Common mistakes:**
- ❌ Copying the whole array for every snapshot — O(n) memory per snapshot.
- ❌ Storing the *diff* against the previous snapshot in a way that requires replaying
  from the beginning.
- ❌ Returning the current value instead of the value at the requested snapshot.
- ❌ Forgetting that an index that was never written must return \`0\`.

**How to narrate:**
> "A snapshot array only needs to remember *when* a value was written. So I'll keep a
> list of \`(snapshotId, value)\` pairs per index. A write appends one pair, and a read
> walks the list and takes the last pair whose snapshot id is not newer than the
> requested one. Memory is proportional to the number of writes, not to the number of
> snapshots, and the walk can be turned into a binary search if I need it."

## Related Problems

- [Design HashMap — LeetCode 706](./DesignHashMap.md) — the per-index store underneath
- [Design Browser History — LeetCode 348](./DesignBrowserHistory.md) — versioning a list
  instead of an array
- [Design Text Editor — LeetCode 2296](./DesignTextEditor.md) — an undo journal, the same idea
  in time
`,i=[`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};