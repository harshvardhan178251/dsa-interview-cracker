var e=`hashing.FirstUniqueCharacterInString`,t=`package com.dsa.hashing;

import com.dsa.utils.FastScanner;

import java.util.HashMap;
import java.util.Map;

/**
 * Problem: First Unique Character in a String
 * LeetCode: 387 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Frequency counting, Hash map
 *
 * <p>Problem: Given a string, return the index of the **first** character that does
 * not repeat anywhere else in the string. If there is no such character, return
 * {@code -1}.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * leetcode
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0
 * </pre>
 *
 * <p>Approach: count the occurrences of every character in a hash map, then walk the
 * string again and return the first index whose character has a count of one.
 *
 * <p>Complexity: Time O(n), Space O(k) where k is the number of distinct characters.
 */
public class FirstUniqueCharacterInString {

    /**
     * Returns the index of the first non-repeating character of {@code s}.
     *
     * @param s the input string
     * @return the index of the first unique character, or {@code -1} when there is none
     */
    public static int firstUniqueCharacter(String s) {
        Map<Character, Integer> counts = new HashMap<>();
        for (char c : s.toCharArray()) {
            counts.merge(c, 1, Integer::sum);
        }

        for (int i = 0; i < s.length(); i++) {
            if (counts.get(s.charAt(i)) == 1) {
                return i;
            }
        }
        return -1;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(firstUniqueCharacter(s));
    }
}
`,n=`import java.util.HashMap;
import java.util.Map;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: First Unique Character in a String
 * LeetCode: 387 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Frequency counting, Hash map
 *
 * <p>Problem: Given a string, return the index of the **first** character that does
 * not repeat anywhere else in the string. If there is no such character, return
 * {@code -1}.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * leetcode
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 0
 * </pre>
 *
 * <p>Approach: count the occurrences of every character in a hash map, then walk the
 * string again and return the first index whose character has a count of one.
 *
 * <p>Complexity: Time O(n), Space O(k) where k is the number of distinct characters.
 */
public class Main {

    /**
     * Returns the index of the first non-repeating character of {@code s}.
     *
     * @param s the input string
     * @return the index of the first unique character, or {@code -1} when there is none
     */
    public static int firstUniqueCharacter(String s) {
        Map<Character, Integer> counts = new HashMap<>();
        for (char c : s.toCharArray()) {
            counts.merge(c, 1, Integer::sum);
        }

        for (int i = 0; i < s.length(); i++) {
            if (counts.get(s.charAt(i)) == 1) {
                return i;
            }
        }
        return -1;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(firstUniqueCharacter(s));
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
# First Unique Character in a String — LeetCode 387

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Frequency counting · Hash map |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Meta, Google, Uber |

## Problem Statement

Given a string \`s\`, return the index of the **first** character that does **not**
repeat anywhere else in the string.

- If every character repeats, return \`-1\`.
- The index is 0-based.

## Input Format

The program reads from standard input:

\`\`\`
s
\`\`\`

- \`s\` — the string to scan (1 ≤ |s| ≤ 10⁵), on a single line, no quotes.

## Sample Input

\`\`\`
leetcode
\`\`\`

## Expected Output

\`\`\`
0
\`\`\`

\`l\` appears only once — it is the first unique character.

## Approach — Two passes over the string

1. **Count**: walk the string once and store how often every character occurs in a
   hash map.
2. **Find**: walk the string again and return the first index whose character has a
   count of exactly \`1\`.

The second pass has to be in **string order**, not map order — the question asks for
the *first* unique character, so the order of the scan decides the answer.

**Why not one pass?** The count of a character is only known after the whole string
has been seen, so a character that looked unique at index 3 can turn out to repeat
later. Counting first and scanning second is the simplest way to get that right.

## Dry Run

Input: \`s = "leetcode"\` — \`l e e t c o d e\`

### Phase 1 — count the characters

| Step | index | char | \`counts\` after |
|---:|---:|---|---|
| 1 | 0 | \`l\` | \`{l: 1}\` |
| 2 | 1 | \`e\` | \`{l: 1, e: 1}\` |
| 3 | 2 | \`e\` | \`{l: 1, e: 2}\` |
| 4 | 3 | \`t\` | \`{l: 1, e: 2, t: 1}\` |
| 5 | 4 | \`c\` | \`{l: 1, e: 2, t: 1, c: 1}\` |
| 6 | 5 | \`o\` | \`{l: 1, e: 2, t: 1, c: 1, o: 1}\` |
| 7 | 6 | \`d\` | \`{l: 1, e: 2, t: 1, c: 1, o: 1, d: 1}\` |
| 8 | 7 | \`e\` | \`{l: 1, e: 3, t: 1, c: 1, o: 1, d: 1}\` |

### Phase 2 — scan for the first character with a count of 1

| Step | index | char | count | unique? | action |
|---:|---:|---|---:|---|---|
| 1 | 0 | \`l\` | 1 | ✔ | **return 0** |

Final answer: **0**

### A longer scan — \`s = "loveleetcode"\`

| index | char | count | unique? | action |
|---:|---|---:|---|---|
| 0 | \`l\` | 2 | ✘ | continue |
| 1 | \`o\` | 2 | ✘ | continue |
| 2 | \`v\` | 1 | ✔ | **return 2** |

### A rejection — \`s = "aabb"\`

| index | char | count | unique? | action |
|---:|---|---:|---|---|
| 0 | \`a\` | 2 | ✘ | continue |
| 1 | \`a\` | 2 | ✘ | continue |
| 2 | \`b\` | 2 | ✘ | continue |
| 3 | \`b\` | 2 | ✘ | continue |

The loop ends without a hit → **return −1**

## Java Solution

See [\`FirstUniqueCharacterInString.java\`](./FirstUniqueCharacterInString.java).

\`\`\`java
public static int firstUniqueCharacter(String s) {
    Map<Character, Integer> counts = new HashMap<>();
    for (char c : s.toCharArray()) {
        counts.merge(c, 1, Integer::sum);
    }
    for (int i = 0; i < s.length(); i++) {
        if (counts.get(s.charAt(i)) == 1) {
            return i;
        }
    }
    return -1;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Two passes over the string |
| **Space** | O(k) | The map holds one entry per distinct character (k ≤ 26 for lowercase English) |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Return the character instead of the index."* → return \`s.charAt(i)\`.
- *"Return every unique character."* → collect them all in the second pass.
- *"What if the string is a stream?"* → you cannot know the counts yet; either buffer
  the stream or use a two-pass approach over the buffered data.
- *"What if the alphabet is large?"* → a \`HashMap<Character, Integer>\` handles any
  character; an array of 256 counters is faster for ASCII.

**Common mistakes:**
- ❌ Returning the first character whose count **in the map** is 1 while iterating
  over the **map** → the map's iteration order is not the string order, so the
  "first" character can be wrong.
- ❌ Checking \`counts.get(c) == 1\` with an \`int\` and a boxed \`Integer\` → use
  \`Integer\` consistently, or \`.equals\`.
- ❌ Forgetting to return \`-1\` when nothing is unique.
- ❌ Returning the **last** unique character instead of the first.

**How to narrate:**
> "I count the characters in a hash map in one pass, then scan the string again in
> order and return the first index whose character has a count of one. If I get
> through the string without a hit, I return -1. The second pass has to follow the
> string order, not the map order. O(n) time, O(k) space."

## Related Problems

- [Contains Duplicate](../../../../../../docs/topics/09-hashing.md) — the simplest "have I seen this before?" check
- [Valid Anagram](../../../../../../docs/topics/02-strings.md) — counting characters with a map
- [FrequencySort](../../../../../../docs/topics/09-hashing.md) — counting characters and reordering them
`,i=[`firstUniqueCharacter`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};