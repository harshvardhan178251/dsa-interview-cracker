var e=`strings.ReverseString`,t=`package com.dsa.strings;

import com.dsa.utils.FastScanner;

/**
 * Problem: Reverse String
 * LeetCode: 344 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Two pointers, In-place swap
 *
 * <p>Problem: Reverse the characters of a string.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * hello
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * olleh
 * </pre>
 *
 * <p>Approach: copy the string into a character array and swap the two ends, moving
 * inwards until the pointers meet.
 *
 * <p>Complexity: Time O(n), Space O(n) for the character array.
 */
public class ReverseString {

    /**
     * Reverses the characters of {@code s}.
     *
     * @param s the string to reverse
     * @return the reversed string
     */
    public static String reverse(String s) {
        char[] chars = s.toCharArray();
        for (int left = 0, right = chars.length - 1; left < right; left++, right--) {
            char temp = chars[left];
            chars[left] = chars[right];
            chars[right] = temp;
        }
        return new String(chars);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(reverse(s));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Reverse String
 * LeetCode: 344 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Two pointers, In-place swap
 *
 * <p>Problem: Reverse the characters of a string.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * hello
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * olleh
 * </pre>
 *
 * <p>Approach: copy the string into a character array and swap the two ends, moving
 * inwards until the pointers meet.
 *
 * <p>Complexity: Time O(n), Space O(n) for the character array.
 */
public class Main {

    /**
     * Reverses the characters of {@code s}.
     *
     * @param s the string to reverse
     * @return the reversed string
     */
    public static String reverse(String s) {
        char[] chars = s.toCharArray();
        for (int left = 0, right = chars.length - 1; left < right; left++, right--) {
            char temp = chars[left];
            chars[left] = chars[right];
            chars[right] = temp;
        }
        return new String(chars);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(reverse(s));
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
# Reverse String — LeetCode 344

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Two Pointers · In-place swap |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Meta, Google, Uber |

## Problem Statement

Given a string \`s\`, return it reversed.

- \`"hello"\` → \`"olleh"\`
- Every character is reversed, **not** the order of the words — see
  [Reverse Words in a String](../../../../../../docs/topics/02-strings.md) for that variant.

## Input Format

The program reads from standard input:

\`\`\`
s
\`\`\`

- \`s\` — the string to reverse (0 ≤ |s| ≤ 10⁴), on a single line, no quotes.

## Sample Input

\`\`\`
hello
\`\`\`

## Expected Output

\`\`\`
olleh
\`\`\`

## Approach — Two pointers swapping inwards

Java strings are immutable, so the string is copied into a \`char[]\` first. Then two
pointers walk towards each other and swap the characters they point at:

\`\`\`
left = 0, right = chars.length - 1
while left < right:
    swap(chars[left], chars[right])
    left++, right--
\`\`\`

The loop stops when the pointers meet (odd length — the middle character is already
in place) or cross (even length — everything has been swapped).

**Why \`left < right\` and not \`left <= right\`:** with \`<=\` the middle character of an
odd-length string would be swapped with itself, which is harmless but wasteful; more
importantly the \`left == right\` case must not perform an extra swap.

## Dry Run

Input: \`s = "hello"\` → \`chars = [h, e, l, l, o]\`

| Step | left | right | swap | \`chars\` after |
|---:|---:|---:|---|---|
| 1 | 0 | 4 | \`h\` ↔ \`o\` | \`[o, e, l, l, h]\` |
| 2 | 1 | 3 | \`e\` ↔ \`l\` | \`[o, l, l, e, h]\` |
| 3 | 2 | 2 | — | \`left == right\` → loop ends |

Result: \`new String(chars)\` = **\`olleh\`**

### The even-length case — \`"abc"\` → \`[a, b, c]\`

| Step | left | right | swap | \`chars\` after |
|---:|---:|---:|---|---|
| 1 | 0 | 2 | \`a\` ↔ \`c\` | \`[c, b, a]\` |
| 2 | 1 | 1 | — | \`left == right\` → loop ends |

Result: **\`cba\`**

## Java Solution

See [\`ReverseString.java\`](./ReverseString.java).

\`\`\`java
public static String reverse(String s) {
    char[] chars = s.toCharArray();
    for (int left = 0, right = chars.length - 1; left < right; left++, right--) {
        char temp = chars[left];
        chars[left] = chars[right];
        chars[right] = temp;
    }
    return new String(chars);
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | n/2 swaps, each O(1) |
| **Space** | O(n) | The \`char[]\` copy — unavoidable in Java because \`String\` is immutable |

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you do it in O(1) extra space?"* → yes in other languages (C/C++ strings are
  mutable); in Java you would need a \`char[]\` or a \`StringBuilder\` with
  \`reverse()\`.
- *"Reverse the words instead of the characters."* → see
  [Reverse Words in a String](../../../../../../docs/topics/02-strings.md).
- *"Reverse only the vowels, or only the alphabetic characters?"* → the same
  two-pointer skeleton with an extra "is this swappable?" guard.
- *"Why not \`new StringBuilder(s).reverse()\`?"* → that is a perfectly good answer;
  writing the loop shows you understand the algorithm.

**Common mistakes:**
- ❌ Using \`left <= right\` → an extra swap in the middle (harmless but wrong-looking).
- ❌ Off-by-one on \`right\` → \`chars.length\` instead of \`chars.length - 1\` throws
  \`ArrayIndexOutOfBoundsException\`.
- ❌ Swapping only \`chars[left]\` and forgetting \`chars[right]\` → the right half stays
  untouched.
- ❌ Trying to modify the \`String\` directly → Java strings are immutable.

**How to narrate:**
> "Java strings are immutable, so I copy into a char array and swap the two ends with
> two pointers moving inwards. The loop condition is left < right, so for an odd
> length the middle character is left alone. O(n) time and O(n) space for the copy."

## Related Problems

- [Reverse Words in a String](../../../../../../docs/topics/02-strings.md) — the word-level variant
- [Valid Palindrome II](../../../../../../docs/topics/02-strings.md) — the same two-pointer skeleton, reading instead of writing
`,i=[`reverse`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};