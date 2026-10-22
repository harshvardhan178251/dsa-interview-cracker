var e=`heaps.ReorganizeString`,t=`package com.dsa.heaps;

import com.dsa.utils.FastScanner;
import com.dsa.utils.MaxHeap;

/**
 * Problem: Reorganize String
 * LeetCode: 358 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Greedy scheduling, Max-heap with cooldown
 *
 * <p>Problem:
 * Rearrange the characters of a string so that no two equal characters are adjacent.
 * Return the rearranged string, or the empty string when no arrangement exists.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * s
 * </pre>
 * {@code n} is the length of the string and {@code s} is the string itself (lowercase
 * English letters only, no whitespace inside).
 *
 * <p>Sample input:
 * <pre>
 * 3
 * aab
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * aba
 * </pre>
 *
 * <p>Approach: a max-heap holds the remaining count of every letter. The letter with the
 * most occurrences left is always the safest to place, because it needs the most room.
 * The letter placed in the previous slot is <em>blocked</em>: it only re-enters the heap
 * after a different letter has been placed, so equal letters can never become adjacent.
 *
 * <p>Complexity: Time O(n log m) with m distinct letters, Space O(m).
 */
public class ReorganizeString {

    /** A letter with its remaining number of occurrences. */
    public static class Letter {
        public final char ch;
        public int remaining;

        public Letter(char ch, int remaining) {
            this.ch = ch;
            this.remaining = remaining;
        }

        @Override
        public String toString() {
            return ch + "x" + remaining;
        }
    }

    /**
     * Rearranges {@code s} so that no two equal characters are adjacent.
     *
     * @param s the input string, lowercase English letters
     * @return the rearranged string, or an empty string when it is impossible
     */
    public static String reorganizeString(String s) {
        if (s == null || s.isEmpty()) {
            return "";
        }

        int[] counts = new int[26];
        for (int i = 0; i < s.length(); i++) {
            counts[s.charAt(i) - 'a']++;
        }

        int maxCount = 0;
        for (int count : counts) {
            maxCount = Math.max(maxCount, count);
        }
        if (maxCount > (s.length() + 1) / 2) {
            return "";
        }

        MaxHeap<Letter> heap = new MaxHeap<Letter>((a, b) -> Integer.compare(a.remaining, b.remaining));
        for (int i = 0; i < 26; i++) {
            if (counts[i] > 0) {
                heap.add(new Letter((char) ('a' + i), counts[i]));
            }
        }

        // The letter placed in the previous slot: it may only be used again after a
        // different letter has been placed in between.
        Letter blocked = null;
        StringBuilder result = new StringBuilder(s.length());

        while (true) {
            if (heap.isEmpty()) {
                if (blocked == null || blocked.remaining == 0) {
                    break;
                }
                // Only the blocked letter is left and it cannot follow itself.
                return "";
            }
            Letter current = heap.poll();

            result.append(current.ch);
            current.remaining--;

            // The slot is filled, so the previously blocked letter becomes usable again.
            if (blocked != null) {
                heap.add(blocked);
                blocked = null;
            }
            if (current.remaining > 0) {
                blocked = current;
            }
        }
        return result.length() == s.length() ? result.toString() : "";
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        String s = fs.next();

        System.out.println(reorganizeString(s));
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
 * Problem: Reorganize String
 * LeetCode: 358 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Greedy scheduling, Max-heap with cooldown
 *
 * <p>Problem:
 * Rearrange the characters of a string so that no two equal characters are adjacent.
 * Return the rearranged string, or the empty string when no arrangement exists.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * s
 * </pre>
 * {@code n} is the length of the string and {@code s} is the string itself (lowercase
 * English letters only, no whitespace inside).
 *
 * <p>Sample input:
 * <pre>
 * 3
 * aab
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * aba
 * </pre>
 *
 * <p>Approach: a max-heap holds the remaining count of every letter. The letter with the
 * most occurrences left is always the safest to place, because it needs the most room.
 * The letter placed in the previous slot is <em>blocked</em>: it only re-enters the heap
 * after a different letter has been placed, so equal letters can never become adjacent.
 *
 * <p>Complexity: Time O(n log m) with m distinct letters, Space O(m).
 */
public class Main {

    /** A letter with its remaining number of occurrences. */
    public static class Letter {
        public final char ch;
        public int remaining;

        public Letter(char ch, int remaining) {
            this.ch = ch;
            this.remaining = remaining;
        }

        @Override
        public String toString() {
            return ch + "x" + remaining;
        }
    }

    /**
     * Rearranges {@code s} so that no two equal characters are adjacent.
     *
     * @param s the input string, lowercase English letters
     * @return the rearranged string, or an empty string when it is impossible
     */
    public static String reorganizeString(String s) {
        if (s == null || s.isEmpty()) {
            return "";
        }

        int[] counts = new int[26];
        for (int i = 0; i < s.length(); i++) {
            counts[s.charAt(i) - 'a']++;
        }

        int maxCount = 0;
        for (int count : counts) {
            maxCount = Math.max(maxCount, count);
        }
        if (maxCount > (s.length() + 1) / 2) {
            return "";
        }

        MaxHeap<Letter> heap = new MaxHeap<Letter>((a, b) -> Integer.compare(a.remaining, b.remaining));
        for (int i = 0; i < 26; i++) {
            if (counts[i] > 0) {
                heap.add(new Letter((char) ('a' + i), counts[i]));
            }
        }

        // The letter placed in the previous slot: it may only be used again after a
        // different letter has been placed in between.
        Letter blocked = null;
        StringBuilder result = new StringBuilder(s.length());

        while (true) {
            if (heap.isEmpty()) {
                if (blocked == null || blocked.remaining == 0) {
                    break;
                }
                // Only the blocked letter is left and it cannot follow itself.
                return "";
            }
            Letter current = heap.poll();

            result.append(current.ch);
            current.remaining--;

            // The slot is filled, so the previously blocked letter becomes usable again.
            if (blocked != null) {
                heap.add(blocked);
                blocked = null;
            }
            if (current.remaining > 0) {
                blocked = current;
            }
        }
        return result.length() == s.length() ? result.toString() : "";
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        String s = fs.next();

        System.out.println(reorganizeString(s));
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
# Reorganize String — LeetCode 358

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Greedy · Max-heap · Frequency counting · Cooldown |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber |

## Problem Statement

Rearrange the characters of a string so that **no two equal characters are adjacent**.
Return the rearranged string, or the empty string when no arrangement exists.

For \`"aab"\` the answer is \`"aba"\`. For \`"aaab"\` no arrangement exists — the \`a\`s cannot
all be separated.

## Input Format

The program reads from standard input:

\`\`\`
n
s
\`\`\`

- \`n\` — the length of the string (1 ≤ n ≤ 10⁴)
- \`s\` — the string itself, lowercase English letters only, no whitespace inside

## Sample Input

\`\`\`
3
aab
\`\`\`

## Expected Output

\`\`\`
aba
\`\`\`

## Approach — Greedy with a max-heap and one blocked letter

The letter with the **most occurrences left** is the one that needs the most room, so
placing it first is what keeps the arrangement possible.

- A **max-heap** holds the remaining count of every letter; its top is the letter to
  place next.
- The letter placed in the **previous slot** is *blocked*: it may only re-enter the heap
  after a different letter has been placed. That single rule guarantees no two equal
  letters ever become adjacent.

**When is it impossible?** If the most frequent letter appears more than
\`ceil(n / 2)\` times, there are not enough other letters to separate the copies. The
program returns an empty string in that case.

## Dry Run

Input: \`s = "aab"\`, counts \`a → 2\`, \`b → 1\`

The heap is printed as \`letter x count\`; the root is the most frequent letter.

| Step | placed | heap before | heap after | blocked | result |
|---:|---|---|---|---|---|
| 1 | \`a\` (2 → 1) | \`[ax2, bx1]\` | \`[bx1]\` | \`a\` (still has one copy) | \`a\` |
| 2 | \`b\` (1 → 0) | \`[bx1]\` → \`a\` is released → \`[ax1, bx1]\` | \`[ax1]\` | — | \`ab\` |
| 3 | \`a\` (1 → 0) | \`[ax1]\` | \`[]\` | — | \`aba\` |

Step 2 is the rule in action: \`a\` was blocked after step 1, so it was **not** eligible
when the next letter was picked — \`b\` was. Only after \`b\` was placed did \`a\` re-enter
the heap.

### The impossible case — \`"aaab"\`

\`a\` appears 3 times, \`ceil(4 / 2) = 2\` → the check \`maxCount > (n + 1) / 2\` fails and
the program prints an empty line.

## Java Solution

See [\`ReorganizeString.java\`](./ReorganizeString.java).

\`\`\`java
Letter blocked = null;
while (true) {
    if (heap.isEmpty()) {
        if (blocked == null || blocked.remaining == 0) {
            break;
        }
        return "";
    }
    Letter current = heap.poll();
    result.append(current.ch);
    current.remaining--;

    // the slot is filled, so the blocked letter becomes usable again
    if (blocked != null) {
        heap.add(blocked);
        blocked = null;
    }
    if (current.remaining > 0) {
        blocked = current;
    }
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n log m) | m distinct letters, one heap operation per character |
| **Space** | O(m) | the heap holds one entry per distinct letter |

## Interview Notes

**Follow-ups to raise yourself:**
- *"How do you know in advance that it is impossible?"* → the most frequent letter must
  fit into the gaps: \`maxCount ≤ ceil(n / 2)\`.
- *"Could you solve it without a heap?"* → yes: place the most frequent letters in the
  even positions first, then the rest (the "fill the gaps" technique).
- *"What if the alphabet were huge (all Unicode)?"* → use a hash map instead of an array
  of 26 counters.
- *"How does this compare with the Task Scheduler?"* → the same cooldown idea, but there
  the cooldown is \`k\` slots instead of one.

**Common mistakes:**
- ❌ Releasing the blocked letter **before** picking the next one → the same letter is
  placed twice in a row.
- ❌ Forgetting the impossibility check → the greedy happily produces \`"aaab"\`.
- ❌ Placing the **least** frequent letter first → the frequent letters then collide at
  the end.

**How to narrate:**
> "The letter with the most copies left is the one with the least room, so I always
> place the top of a max-heap of remaining counts. To avoid two equal letters next to
> each other, the letter I just placed is blocked: it only re-enters the heap after a
> different letter has been placed. Before starting I also check that no letter occurs
> more than ceil(n/2) times — otherwise no arrangement exists and I return an empty
> string."

## Related Problems

- [Task Scheduler](TaskScheduler.md) — the same cooldown idea with k slots
- [Top K Frequent Elements](TopKFrequentElements.md) — frequency counting
- [String Compression](../strings/StringCompression.md) — run-length encoding
- [Valid Palindrome II](../strings/ValidPalindromeII.md) — rearranging a string
`,i=[`reorganizeString`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};