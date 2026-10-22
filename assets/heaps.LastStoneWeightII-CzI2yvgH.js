var e=`heaps.LastStoneWeightII`,t=`package com.dsa.heaps;

import com.dsa.utils.FastScanner;
import com.dsa.utils.MaxHeap;

/**
 * Problem: Last Stone Weight II
 * LeetCode: 1049 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Partition, Subset sum, Greedy heap (the wrong answer)
 *
 * <p>Problem:
 * Every turn you pick the two heaviest stones and smash them together: the heavier stone
 * survives with the difference of the two weights (a stone of weight 0 disappears).
 * You must find the **minimum possible weight of the last remaining stone**.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * stones[0] stones[1] ... stones[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 31 26 33 21 40
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Approach: smashing stones is equivalent to splitting the stones into two groups and
 * cancelling out the pairs, so the answer is {@code total - 2 * best}, where {@code best}
 * is the largest subset sum that does not exceed {@code total / 2}. The subset sum is
 * computed with a bitset-style DP.
 *
 * <p>The greedy max-heap smash — the natural first idea — is <em>not</em> optimal for
 * this variant; {@link #greedySmash(int[])} implements it so the difference can be shown
 * side by side.
 *
 * <p>Complexity: Time O(n · total / 64) with a bitset, Space O(total / 64).
 */
public class LastStoneWeightII {

    /**
     * Returns the minimum possible weight of the last remaining stone.
     *
     * @param stones the stone weights
     * @return the smallest achievable remaining weight
     */
    public static int lastStoneWeightII(int[] stones) {
        if (stones == null || stones.length == 0) {
            return 0;
        }

        int total = 0;
        for (int stone : stones) {
            total += stone;
        }
        int target = total / 2;

        // reachable[s] is true when some subset of the processed stones sums to s.
        boolean[] reachable = new boolean[target + 1];
        reachable[0] = true;
        for (int stone : stones) {
            for (int s = target; s >= stone; s--) {
                if (reachable[s - stone]) {
                    reachable[s] = true;
                }
            }
        }

        int best = 0;
        for (int s = target; s >= 0; s--) {
            if (reachable[s]) {
                best = s;
                break;
            }
        }
        return total - 2 * best;
    }

    /**
     * The greedy "always smash the two heaviest" simulation.
     *
     * <p>This is the obvious first idea, and it is exactly the solution of the first part
     * of the problem — but it is <em>not</em> optimal here. For
     * {@code [31, 26, 33, 21, 40]} it returns 9 while the optimum is 5.
     *
     * @param stones the stone weights
     * @return the weight left by the greedy simulation
     */
    public static int greedySmash(int[] stones) {
        MaxHeap<Integer> heap = new MaxHeap<>();
        for (int stone : stones) {
            heap.add(stone);
        }
        while (heap.size() > 1) {
            int first = heap.poll();
            int second = heap.poll();
            if (first != second) {
                heap.add(first - second);
            }
        }
        return heap.isEmpty() ? 0 : heap.peek();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] stones = fs.nextIntArray(n);

        System.out.println(lastStoneWeightII(stones));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Comparator;
import java.util.ArrayList;
import java.util.List;

/**
 * Problem: Last Stone Weight II
 * LeetCode: 1049 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Partition, Subset sum, Greedy heap (the wrong answer)
 *
 * <p>Problem:
 * Every turn you pick the two heaviest stones and smash them together: the heavier stone
 * survives with the difference of the two weights (a stone of weight 0 disappears).
 * You must find the **minimum possible weight of the last remaining stone**.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * stones[0] stones[1] ... stones[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 31 26 33 21 40
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 5
 * </pre>
 *
 * <p>Approach: smashing stones is equivalent to splitting the stones into two groups and
 * cancelling out the pairs, so the answer is {@code total - 2 * best}, where {@code best}
 * is the largest subset sum that does not exceed {@code total / 2}. The subset sum is
 * computed with a bitset-style DP.
 *
 * <p>The greedy max-heap smash — the natural first idea — is <em>not</em> optimal for
 * this variant; {@link #greedySmash(int[])} implements it so the difference can be shown
 * side by side.
 *
 * <p>Complexity: Time O(n · total / 64) with a bitset, Space O(total / 64).
 */
public class Main {

    /**
     * Returns the minimum possible weight of the last remaining stone.
     *
     * @param stones the stone weights
     * @return the smallest achievable remaining weight
     */
    public static int lastStoneWeightII(int[] stones) {
        if (stones == null || stones.length == 0) {
            return 0;
        }

        int total = 0;
        for (int stone : stones) {
            total += stone;
        }
        int target = total / 2;

        // reachable[s] is true when some subset of the processed stones sums to s.
        boolean[] reachable = new boolean[target + 1];
        reachable[0] = true;
        for (int stone : stones) {
            for (int s = target; s >= stone; s--) {
                if (reachable[s - stone]) {
                    reachable[s] = true;
                }
            }
        }

        int best = 0;
        for (int s = target; s >= 0; s--) {
            if (reachable[s]) {
                best = s;
                break;
            }
        }
        return total - 2 * best;
    }

    /**
     * The greedy "always smash the two heaviest" simulation.
     *
     * <p>This is the obvious first idea, and it is exactly the solution of the first part
     * of the problem — but it is <em>not</em> optimal here. For
     * {@code [31, 26, 33, 21, 40]} it returns 9 while the optimum is 5.
     *
     * @param stones the stone weights
     * @return the weight left by the greedy simulation
     */
    public static int greedySmash(int[] stones) {
        MaxHeap<Integer> heap = new MaxHeap<>();
        for (int stone : stones) {
            heap.add(stone);
        }
        while (heap.size() > 1) {
            int first = heap.poll();
            int second = heap.poll();
            if (first != second) {
                heap.add(first - second);
            }
        }
        return heap.isEmpty() ? 0 : heap.peek();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] stones = fs.nextIntArray(n);

        System.out.println(lastStoneWeightII(stones));
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

// ---------- inlined com.dsa.utils.MaxHeap ----------
/**
 * Array-backed binary max-heap.
 *
 * <p>Mirrors {@link MinHeap} with reversed ordering.
 *
 * @param <T> element type
 */
class MaxHeap<T> extends MinHeap<T> {

    public MaxHeap() {
        super((a, b) -> compareNatural(b, a));
    }

    public MaxHeap(Comparator<? super T> comparator) {
        super((a, b) -> comparator.compare(b, a));
    }

    /** Largest element without removing it. */
    @Override
    public T peek() {
        return heap.get(0);
    }

    /** Removes and returns the largest element. */
    @Override
    public T poll() {
        T top = heap.get(0);
        int last = heap.size() - 1;
        heap.set(0, heap.get(last));
        heap.remove(last);
        if (!heap.isEmpty()) {
            siftDown(0);
        }
        return top;
    }
}

// ---------- inlined com.dsa.utils.MinHeap ----------
/**
 * Array-backed binary min-heap.
 *
 * <p>Used by the priority-queue problems (top-K, streaming median, merge-K) so the
 * heap mechanics stay visible instead of being hidden behind {@code PriorityQueue}.
 *
 * @param <T> element type
 */
class MinHeap<T> {

    protected final List<T> heap;
    protected final Comparator<? super T> comparator;

    /** Natural ordering. */
    @SuppressWarnings("unchecked")
    public MinHeap() {
        this.comparator = (a, b) -> ((Comparable<Object>) a).compareTo(b);
        this.heap = new ArrayList<>();
    }

    public MinHeap(Comparator<? super T> comparator) {
        this.comparator = comparator;
        this.heap = new ArrayList<>();
    }

    /**
     * Natural comparison helper, usable from subclasses that need the reverse order.
     */
    @SuppressWarnings("unchecked")
    protected static <T> int compareNatural(T a, T b) {
        return ((Comparable<Object>) a).compareTo(b);
    }

    /** Builds a heap from an existing collection in O(n). */
    public MinHeap(List<T> items, Comparator<? super T> comparator) {
        this.comparator = comparator;
        this.heap = new ArrayList<>(items);
        for (int i = heap.size() / 2 - 1; i >= 0; i--) {
            siftDown(i);
        }
    }

    public void add(T item) {
        heap.add(item);
        siftUp(heap.size() - 1);
    }

    /** Smallest element without removing it. */
    public T peek() {
        return heap.get(0);
    }

    /** Removes and returns the smallest element. */
    public T poll() {
        T top = heap.get(0);
        int last = heap.size() - 1;
        heap.set(0, heap.get(last));
        heap.remove(last);
        if (!heap.isEmpty()) {
            siftDown(0);
        }
        return top;
    }

    public int size() {
        return heap.size();
    }

    public boolean isEmpty() {
        return heap.isEmpty();
    }

    /** Snapshot of the backing array (not a heap-ordered view). */
    public List<T> asList() {
        return new ArrayList<>(heap);
    }

    protected void siftUp(int index) {
        T item = heap.get(index);
        while (index > 0) {
            int parent = (index - 1) / 2;
            if (comparator.compare(item, heap.get(parent)) >= 0) {
                break;
            }
            heap.set(index, heap.get(parent));
            index = parent;
        }
        heap.set(index, item);
    }

    protected void siftDown(int index) {
        int size = heap.size();
        T item = heap.get(index);
        while (true) {
            int left = 2 * index + 1;
            if (left >= size) {
                break;
            }
            int smaller = left;
            int right = left + 1;
            if (right < size && comparator.compare(heap.get(right), heap.get(left)) < 0) {
                smaller = right;
            }
            if (comparator.compare(item, heap.get(smaller)) <= 0) {
                break;
            }
            heap.set(index, heap.get(smaller));
            index = smaller;
        }
        heap.set(index, item);
    }
}
`,r=`
# Last Stone Weight II — LeetCode 1049

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Partition · Subset sum DP · Greedy heap (the wrong answer) |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Meta, Google, Microsoft |

## Problem Statement

Every turn you pick the two heaviest stones and smash them together: the heavier stone
survives with the difference of the two weights (a stone of weight \`0\` disappears).
Find the **minimum possible weight of the last remaining stone**.

For \`[31, 26, 33, 21, 40]\` the answer is \`5\`.

## Input Format

The program reads from standard input:

\`\`\`
n
stones[0] stones[1] ... stones[n-1]
\`\`\`

- \`n\` — the number of stones (1 ≤ n ≤ 30)
- \`stones\` — n space-separated weights (1 ≤ stones[i] ≤ 100)

## Sample Input

\`\`\`
5
31 26 33 21 40
\`\`\`

## Expected Output

\`\`\`
5
\`\`\`

## Approach — Smashing is a partition

Every smash subtracts one weight from another, and the two weights end up on **opposite
sides** of a cancellation. So the final weight is

\`\`\`
|sum of group A − sum of group B|
\`\`\`

and minimising it means splitting the stones into two groups whose sums are as close as
possible. The answer is therefore

\`\`\`
total − 2 × best
\`\`\`

where \`best\` is the **largest subset sum that does not exceed \`total / 2\`** (the smaller
group is the one we look for).

\`best\` is a classic **0/1 subset-sum** problem, solved with a boolean DP:

\`\`\`
reachable[0] = true
for each stone s:
    for sum from target down to s:
        reachable[sum] |= reachable[sum - s]
\`\`\`

The loop runs **downwards** so that each stone is used at most once.

### Why the greedy heap is wrong here

The first part of this problem (LeetCode 1049 part 1, "Last Stone Weight") *is* a
max-heap problem: smash the two heaviest, repeat. That greedy is optimal for
"simulate the game", but **not** for "find the best possible outcome" — the greedy
simulation follows one particular sequence of smashes.

The file also implements the greedy (\`greedySmash\`) so the two can be compared:

| | greedy max-heap | optimal partition |
|---|---|---|
| \`[31, 26, 33, 21, 40]\` | \`9\` | **\`5\`** |

## Dry Run — the optimal partition

Input: \`stones = [31, 26, 33, 21, 40]\`, \`total = 151\`, \`target = 75\`

\`reachable\` lists the subset sums that are achievable with the stones processed so far.

| Step | stone | \`reachable\` afterwards | note |
|---:|---:|---|---|
| 0 | — | \`{0}\` | the empty subset |
| 1 | 31 | \`{0, 31}\` | 0, 31 |
| 2 | 26 | \`{0, 26, 31, 57}\` | 26, 57 = 31+26 |
| 3 | 33 | \`{0, 26, 31, 33, 57, 59, 64}\` | 33, 59 = 26+33, 64 = 31+33 |
| 4 | 21 | \`{0, 21, 26, 31, 33, 47, 52, 54, 57, 59, 64}\` | 47 = 26+21, 52 = 31+21, 54 = 33+21, … |
| 5 | 40 | \`{0, 21, 26, 31, 33, 40, 47, 52, 54, 57, 59, 61, 64, 66, 71, 73}\` | 61 = 21+40, 71 = 31+40, 73 = 33+40 |

The largest reachable sum \`≤ 75\` is \`73\` (= 33 + 40), so

\`\`\`
answer = total − 2 × best = 151 − 2 × 73 = 5
\`\`\`

The two groups are \`{33, 40}\` (sum 73) and \`{31, 26, 21}\` (sum 78) — the difference is
\`5\` ✓

### Dry Run — the greedy max-heap (for comparison)

| Step | heap before | smashed | heap after |
|---:|---|---|---|
| 0 | \`[40, 33, 31, 21, 26]\` | — | — |
| 1 | \`[40, 33, 31, 21, 26]\` | 40 & 33 → 7 | \`[31, 26, 21, 7]\` |
| 2 | \`[31, 26, 21, 7]\` | 31 & 26 → 5 | \`[21, 7, 5]\` |
| 3 | \`[21, 7, 5]\` | 21 & 7 → 14 | \`[14, 5]\` |
| 4 | \`[14, 5]\` | 14 & 5 → 9 | \`[9]\` |

The greedy ends at \`9\` — it is stuck with the sequence of smashes it chose, while a
different grouping reaches \`5\`.

## Java Solution

See [\`LastStoneWeightII.java\`](./LastStoneWeightII.java).

\`\`\`java
boolean[] reachable = new boolean[target + 1];
reachable[0] = true;
for (int stone : stones) {
    for (int s = target; s >= stone; s--) {
        if (reachable[s - stone]) {
            reachable[s] = true;
        }
    }
}
\`\`\`

The greedy variant lives next to it:

\`\`\`java
MaxHeap<Integer> heap = new MaxHeap<>();
for (int stone : stones) { heap.add(stone); }
while (heap.size() > 1) {
    int first = heap.poll();
    int second = heap.poll();
    if (first != second) { heap.add(first - second); }
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n · total) | the DP table is walked once per stone |
| **Space** | O(total) | the \`reachable\` array |

\`total\` is the sum of the weights, so this is a **pseudo-polynomial** algorithm — fine
for the given constraints (total ≤ 3000), but it is exponential in the *bit length* of
the weights. For huge weights you need meet-in-the-middle (O(2^(n/2))) or a bitset
implementation of the same DP.

## Interview Notes

**Follow-ups to raise yourself:**
- *"Why is the greedy max-heap not optimal here?"* → the greedy follows one particular
  smash order; a different grouping can do better (\`9\` vs \`5\` on the sample).
- *"Can you do it with a bitset?"* → yes: \`dp |= dp << stone\` packs the whole subset-sum
  table into a \`long[]\`, which is 64× faster and much smaller.
- *"What if the weights are huge (10⁹) and n is small?"* → meet in the middle: split the
  stones, enumerate the subset sums of each half (2^(n/2)), sort one half and binary
  search the other.
- *"How would you prove the partition equivalence?"* → each smash pairs one stone from
  each side of the final partition; the surviving weight is the difference of the two
  side sums.

**Common mistakes:**
- ❌ Answering with the **greedy** heap simulation → that solves part 1 of the problem,
  not this one.
- ❌ Looping the subset-sum DP **upwards** → the same stone can then be used several
  times, which yields impossible sums.
- ❌ Forgetting the \`total − 2 × best\` formula and reporting \`best\` itself.
- ❌ Ignoring the constraint that \`best ≤ total / 2\` → the DP must only track sums up to
  \`target\`.

**How to narrate:**
> "Smashing two stones is the same as putting one of them on each side of a partition
> and cancelling them out, so the final weight is the difference of the two group sums.
> I want the two sums as close as possible, so I look for the largest subset sum not
> exceeding half of the total — a 0/1 subset-sum DP over a boolean array, walked
> downwards so each stone is used once. The answer is \`total − 2 × best\`. The greedy
> max-heap smash is the natural first idea, and it gives 9 instead of 5 here."

## Related Problems

- [Target Sum](../dynamicprogramming/TargetSum.md) — the greedy part-1 version
- [Target Sum](../dynamicprogramming/TargetSum.md) — the same subset-sum DP, different framing
- [Partition Equal Subset Sum](../dynamicprogramming/PartitionEqualSubsetSum.md) — the same DP, boolean answer
- [Top K Frequent Elements](TopKFrequentElements.md) — bounded heap
`,i=[`lastStoneWeightII`,`greedySmash`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};