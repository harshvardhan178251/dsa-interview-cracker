var e=`strings.ValidPalindromeII`,t=`package com.dsa.strings;

import com.dsa.utils.FastScanner;

/**
 * Problem: Valid Palindrome II
 * LeetCode: 680 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Two pointers, One deletion
 *
 * <p>Problem: Given a string {@code s}, decide whether it can become a palindrome
 * after deleting <b>at most one</b> character.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * abca
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: two pointers walk towards the middle of the string. Every matching
 * pair is skipped, but the <b>first</b> mismatching pair is the only place where a
 * deletion can still help: delete the left character or delete the right one, and
 * check whether the remaining range is a palindrome.
 *
 * <p>Complexity: Time O(n) &mdash; one forward pass plus at most two linear scans.
 * Space O(1).
 */
public class ValidPalindromeII {

    /**
     * Returns {@code true} when {@code s} is a palindrome after deleting at most
     * one character.
     *
     * @param s the string to test
     * @return {@code true} if at most one deletion makes {@code s} a palindrome
     */
    public static boolean validPalindrome(String s) {
        int left = 0;
        int right = s.length() - 1;

        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                // First mismatch: the single allowed deletion must remove one of these two.
                return isPalindromeRange(s, left + 1, right) || isPalindromeRange(s, left, right - 1);
            }
            left++;
            right--;
        }
        return true;
    }

    /**
     * Returns {@code true} when the substring {@code s[left..right]} reads the same
     * forwards and backwards.
     */
    private static boolean isPalindromeRange(String s, int left, int right) {
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(validPalindrome(s));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Valid Palindrome II
 * LeetCode: 680 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Two pointers, One deletion
 *
 * <p>Problem: Given a string {@code s}, decide whether it can become a palindrome
 * after deleting <b>at most one</b> character.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * abca
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: two pointers walk towards the middle of the string. Every matching
 * pair is skipped, but the <b>first</b> mismatching pair is the only place where a
 * deletion can still help: delete the left character or delete the right one, and
 * check whether the remaining range is a palindrome.
 *
 * <p>Complexity: Time O(n) &mdash; one forward pass plus at most two linear scans.
 * Space O(1).
 */
public class Main {

    /**
     * Returns {@code true} when {@code s} is a palindrome after deleting at most
     * one character.
     *
     * @param s the string to test
     * @return {@code true} if at most one deletion makes {@code s} a palindrome
     */
    public static boolean validPalindrome(String s) {
        int left = 0;
        int right = s.length() - 1;

        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                // First mismatch: the single allowed deletion must remove one of these two.
                return isPalindromeRange(s, left + 1, right) || isPalindromeRange(s, left, right - 1);
            }
            left++;
            right--;
        }
        return true;
    }

    /**
     * Returns {@code true} when the substring {@code s[left..right]} reads the same
     * forwards and backwards.
     */
    private static boolean isPalindromeRange(String s, int left, int right) {
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        String s = fs.next();

        System.out.println(validPalindrome(s));
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
# Valid Palindrome II — LeetCode 680

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Two Pointers · One deletion |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Meta, Google, Microsoft |

## Problem Statement

Given a string \`s\`, return \`true\` if \`s\` can be turned into a palindrome by
deleting **at most one** character.

- The string may contain any character except whitespace.
- Deleting zero characters is allowed (the string may already be a palindrome).
- Exactly one character may be removed, never more.

## Input Format

The program reads from standard input:

\`\`\`
s
\`\`\`

- \`s\` — the string to test (1 ≤ |s| ≤ 10⁵), on a single line, no quotes.

## Sample Input

\`\`\`
abca
\`\`\`

## Expected Output

\`\`\`
true
\`\`\`

\`abca\` is not a palindrome, but deleting the \`b\` leaves \`aca\` — so the answer is \`true\`.

## Approach — Two pointers, one mismatch

A string is a palindrome when it reads the same from both ends. Walk two pointers
(\`left\`, \`right\`) towards each other:

1. If \`s[left] == s[right]\`, the pair is fine — move both pointers inwards.
2. Otherwise we have hit the **first mismatch**. This is the only place where the
   single allowed deletion can help, because everything outside \`[left, right]\`
   already matches.

At the mismatch there are exactly two candidate deletions:

- delete \`s[left]\` → the rest of the range is \`s[left+1 .. right]\`
- delete \`s[right]\` → the rest of the range is \`s[left .. right-1]\`

If either remaining range is a palindrome, the answer is \`true\`. Otherwise it is \`false\`.

**Why only the first mismatch matters:** the deletion must fix *every* mismatch, and
the mismatches outside the first one are already matched by symmetric characters. A
single deletion can only remove one character, so it can only ever fix the pair it
belongs to.

## Dry Run

Input: \`s = "abca"\` (length 4)

| Step | left | right | \`s[left]\` | \`s[right]\` | match? | action |
|---:|---:|---:|---|---|---|---|
| 1 | 0 | 3 | \`a\` | \`a\` | ✓ | symmetric — \`left++\`, \`right--\` |
| 2 | 1 | 2 | \`b\` | \`c\` | ✗ | first mismatch — try both deletions |
| 3a | 2 | 2 | — | — | — | delete \`s[1]\`: check \`s[2..2]\` = \`"c"\` → single char → palindrome ✓ |
| 4 | — | — | — | — | — | **return true** (the \`\\|\\|\` short-circuits here) |

The "delete \`s[2]\`" branch would check \`s[1..1]\` = \`"b"\` → also a palindrome, so in
this example *both* single deletions work.

### Trace where both branches fail — \`s = "abcd"\`

| Step | left | right | \`s[left]\` | \`s[right]\` | match? | action |
|---:|---:|---:|---|---|---|---|
| 1 | 0 | 3 | \`a\` | \`d\` | ✗ | first mismatch — try both deletions |
| 2a | 1 | 3 | \`b\` | \`d\` | ✗ | delete \`s[0]\`: check \`s[1..3]\` = \`"bcd"\` → not a palindrome |
| 2b | 0 | 2 | \`a\` | \`c\` | ✗ | delete \`s[3]\`: check \`s[0..2]\` = \`"abc"\` → not a palindrome |
| 3 | — | — | — | — | — | both branches fail → **return false** |

## Java Solution

See [\`ValidPalindromeII.java\`](./ValidPalindromeII.java).

\`\`\`java
public static boolean validPalindrome(String s) {
    int left = 0;
    int right = s.length() - 1;
    while (left < right) {
        if (s.charAt(left) != s.charAt(right)) {
            return isPalindromeRange(s, left + 1, right) || isPalindromeRange(s, left, right - 1);
        }
        left++;
        right--;
    }
    return true;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | One outer scan plus at most two inner scans, each O(n) |
| **Space** | O(1) | Only two indices; the recursive/substring checks are done by index, never by copying |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if at most \`k\` deletions are allowed?"* → the greedy "first mismatch" trick
  stops working; you need DP: \`dp[i][j] = min(dp[i+1][j] + 1, dp[i][j-1] + 1)\`.
- *"Can you do it in one pass without a helper?"* → yes, but the second scan has to
  restart from the mismatch, which is what the helper does anyway.
- *"Return the index you would delete, not just a boolean."* → return \`left\` or \`right\`
  from the branch that succeeds.
- *"What about case-insensitivity and non-alphanumeric characters?"* → normalise the
  string first (lowercase, drop non-alphanumerics) — LeetCode 125 / 680 variants.

**Common mistakes:**
- ❌ Trying **every** deletion position → O(n²) and unnecessary; only the first
  mismatch matters.
- ❌ Allowing the helper check to start at \`left\` instead of \`left + 1\` (or
  \`right\` instead of \`right - 1\`) → you "delete" nothing and the answer is always
  \`true\`.
- ❌ Comparing \`s[left]\` with \`s[right]\` **after** already incrementing them →
  off-by-one that silently accepts \`"abcd"\`.

**How to narrate:**
> "A palindrome check is a two-pointer scan. Since I may delete at most one
> character, the first pair that doesn't match is the only place a deletion can
> help. At that point I try the two possibilities — delete the left character or
> delete the right one — and check whether the rest of the range is a palindrome.
> That's O(n) time and O(1) space."

## Related Problems

- [Longest Palindromic Substring](../../../../../../docs/topics/02-strings.md) — expand around every centre
- [Valid Palindrome](../../../../../../docs/topics/02-strings.md) — the same scan without the deletion branch
`,i=[`validPalindrome`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};