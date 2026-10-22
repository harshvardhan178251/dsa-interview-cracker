var e=`hashing.FrequencySort`,t=`package com.dsa.hashing;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Problem: Sort by Frequency of Characters
 * LeetCode: null | Difficulty: Medium | Frequency: 2/5
 * Pattern: Frequency counting, Custom ordering
 *
 * <p>Problem: Reorder the characters of a string so that the most frequent character
 * comes first, the second most frequent comes next, and so on. Characters with the
 * same frequency are ordered by their character code (smaller first).
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * tree
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * eert
 * </pre>
 *
 * <p>Approach: count the characters in a hash map, sort the distinct characters by
 * (frequency descending, character ascending) and write each character as often as
 * it was counted.
 *
 * <p>Complexity: Time O(n + k log k), Space O(k).
 */
public class FrequencySort {

    /**
     * Sorts the characters of {@code s} by descending frequency.
     *
     * @param s the string to reorder
     * @return the reordered string
     */
    public static String frequencySort(String s) {
        Map<Character, Integer> counts = new HashMap<>();
        for (char c : s.toCharArray()) {
            counts.merge(c, 1, Integer::sum);
        }

        List<Map.Entry<Character, Integer>> entries = new ArrayList<>(counts.entrySet());
        entries.sort((a, b) -> {
            int byFrequency = b.getValue() - a.getValue(); // most frequent first
            if (byFrequency != 0) {
                return byFrequency;
            }
            return Character.compare(a.getKey(), b.getKey()); // ties: smaller character first
        });

        StringBuilder sb = new StringBuilder();
        for (Map.Entry<Character, Integer> entry : entries) {
            for (int i = 0; i < entry.getValue(); i++) {
                sb.append(entry.getKey());
            }
        }
        return sb.toString();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(frequencySort(s));
    }
}
`,n=`import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Sort by Frequency of Characters
 * LeetCode: null | Difficulty: Medium | Frequency: 2/5
 * Pattern: Frequency counting, Custom ordering
 *
 * <p>Problem: Reorder the characters of a string so that the most frequent character
 * comes first, the second most frequent comes next, and so on. Characters with the
 * same frequency are ordered by their character code (smaller first).
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * tree
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * eert
 * </pre>
 *
 * <p>Approach: count the characters in a hash map, sort the distinct characters by
 * (frequency descending, character ascending) and write each character as often as
 * it was counted.
 *
 * <p>Complexity: Time O(n + k log k), Space O(k).
 */
public class Main {

    /**
     * Sorts the characters of {@code s} by descending frequency.
     *
     * @param s the string to reorder
     * @return the reordered string
     */
    public static String frequencySort(String s) {
        Map<Character, Integer> counts = new HashMap<>();
        for (char c : s.toCharArray()) {
            counts.merge(c, 1, Integer::sum);
        }

        List<Map.Entry<Character, Integer>> entries = new ArrayList<>(counts.entrySet());
        entries.sort((a, b) -> {
            int byFrequency = b.getValue() - a.getValue(); // most frequent first
            if (byFrequency != 0) {
                return byFrequency;
            }
            return Character.compare(a.getKey(), b.getKey()); // ties: smaller character first
        });

        StringBuilder sb = new StringBuilder();
        for (Map.Entry<Character, Integer> entry : entries) {
            for (int i = 0; i < entry.getValue(); i++) {
                sb.append(entry.getKey());
            }
        }
        return sb.toString();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(frequencySort(s));
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
# Sort by Frequency of Characters

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Frequency counting · Custom ordering |
| **Interview heat** | ★★☆☆☆ |
| **Asked at** | Amazon, Meta, Google, Uber |

## Problem Statement

Reorder the characters of a string so that the most frequent character comes first,
the second most frequent comes next, and so on.

- Characters with the **same frequency** are ordered by their character code, the
  smaller one first — this makes the output deterministic.
- \`"tree"\` → \`"eert"\`: \`e\` occurs twice, \`r\` and \`t\` occur once each, and \`r\` comes
  before \`t\`.

## Input Format

The program reads from standard input:

\`\`\`
s
\`\`\`

- \`s\` — the string to reorder (1 ≤ |s| ≤ 10⁵), on a single line, no quotes.

## Sample Input

\`\`\`
tree
\`\`\`

## Expected Output

\`\`\`
eert
\`\`\`

## Approach — Count, sort the distinct characters, write them out

1. Count the occurrences of every character in a hash map.
2. Sort the **distinct** characters with a custom comparator:
   - primary key: frequency, descending
   - secondary key: character code, ascending
3. Write every character as often as it was counted.

**Why the tie-break matters:** without it, two characters with the same frequency
could be emitted in any order, and the output would not be reproducible.

**Why sorting the distinct characters (k of them) is cheaper than sorting the whole
string (n characters):** k ≤ 26 for lowercase English, so the sort is tiny.

## Dry Run

Input: \`s = "tree"\` — \`t r e e\`

### Phase 1 — count the characters

| Step | index | char | \`counts\` after |
|---:|---:|---|---|
| 1 | 0 | \`t\` | \`{t: 1}\` |
| 2 | 1 | \`r\` | \`{t: 1, r: 1}\` |
| 3 | 2 | \`e\` | \`{t: 1, r: 1, e: 1}\` |
| 4 | 3 | \`e\` | \`{t: 1, r: 1, e: 2}\` |

### Phase 2 — sort the distinct characters

| character | frequency | compared with | verdict | order |
|---|---:|---|---|---:|
| \`e\` | 2 | highest frequency | first | 1 |
| \`r\` | 1 | same frequency as \`t\` → \`r\` < \`t\` | second | 2 |
| \`t\` | 1 | same frequency as \`r\` → \`t\` > \`r\` | third | 3 |

### Phase 3 — write every character out

| step | character | copies | output so far |
|---:|---|---:|---|
| 1 | \`e\` | 2 | \`ee\` |
| 2 | \`r\` | 1 | \`eer\` |
| 3 | \`t\` | 1 | \`eert\` |

Final answer: **\`eert\`**

### A case with a clear winner — \`s = "abbaa"\`

| character | frequency |
|---|---:|
| \`a\` | 3 |
| \`b\` | 2 |

Sorted order: \`a\`, \`b\` → output **\`aaabb\`**

## Java Solution

See [\`FrequencySort.java\`](./FrequencySort.java).

\`\`\`java
public static String frequencySort(String s) {
    Map<Character, Integer> counts = new HashMap<>();
    for (char c : s.toCharArray()) {
        counts.merge(c, 1, Integer::sum);
    }
    List<Map.Entry<Character, Integer>> entries = new ArrayList<>(counts.entrySet());
    entries.sort((a, b) -> {
        int byFrequency = b.getValue() - a.getValue();
        if (byFrequency != 0) {
            return byFrequency;
        }
        return Character.compare(a.getKey(), b.getKey());
    });
    StringBuilder sb = new StringBuilder();
    for (Map.Entry<Character, Integer> entry : entries) {
        for (int i = 0; i < entry.getValue(); i++) {
            sb.append(entry.getKey());
        }
    }
    return sb.toString();
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n + k log k) | n counting increments plus a sort of the k distinct characters |
| **Space** | O(k) | The map and the list of entries |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the tie-break should be the *first* occurrence instead?"* → store the
  first index of every character and use it as the secondary key.
- *"How would you do it with a bucket sort?"* → one bucket per frequency, then walk
  the buckets from the highest frequency down: O(n + max frequency).
- *"What if you had to keep the relative order of the equal-frequency characters?"* →
  that is the stable variant: bucket the characters by frequency and fill the buckets
  in first-occurrence order.
- *"Can it be done in O(n)?"* → yes, with bucket sort: the number of buckets is bounded
  by the maximum frequency, which is at most n.

**Common mistakes:**
- ❌ Forgetting the **tie-break** → the output order is not deterministic.
- ❌ Sorting the **characters** instead of the distinct characters → O(n log n)
  instead of O(n + k log k).
- ❌ Getting the comparator **backwards** (\`a.getValue() - b.getValue()\`) → the
  *least* frequent character ends up first.
- ❌ Comparing the frequencies with \`==\` in the comparator → all the ties are treated
  as equal and the secondary key never runs.

**How to narrate:**
> "I count the characters in a hash map, then sort the distinct characters by
> frequency descending with a tie-break on the character code, and finally write each
> character out as many times as it was counted. Counting is O(n) and the sort only
> touches the distinct characters, so it's O(n + k log k) with k the alphabet size."

## Related Problems

- [Valid Anagram](../../../../../../docs/topics/02-strings.md) — counting characters with a map
- [First Unique Character in a String](../../../../../../docs/topics/09-hashing.md) — counting characters with a map
- [Group Anagrams](../../../../../../docs/topics/09-hashing.md) — grouping words by a canonical key
`,i=[`frequencySort`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};