var e=`twopointers.ValidPalindrome`,t=`package com.dsa.twopointers;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Valid Palindrome
 * LeetCode: 125 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Two pointers, String scanning
 *
 * <p>Problem:
 * Given a string {@code s}, return {@code true} if it is a palindrome after ignoring all
 * non-alphanumeric characters and the case of the letters.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 * The string is a single whitespace-free token.
 *
 * <p>Sample input:
 * <pre>
 * A man, a plan, a canal: Panama
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: two pointers, one at each end. Skip everything that is not a letter or a
 * digit, compare the remaining characters case-insensitively, and move inwards. The
 * string never has to be copied or cleaned.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class ValidPalindrome {

    /**
     * Returns true when {@code s} is a palindrome ignoring punctuation and case.
     *
     * @param s the input string
     * @return {@code true} / {@code false}
     */
    public static boolean isPalindrome(String s) {
        if (s == null) {
            return false;
        }

        int left = 0;
        int right = s.length() - 1;
        while (left < right) {
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) {
                left++;
            }
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) {
                right--;
            }
            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }

    public static void main(String[] args) throws Exception {
        // The string may contain spaces, so the whole line is read.
        BufferedReader reader =
                new BufferedReader(new InputStreamReader(System.in, StandardCharsets.UTF_8));
        String s = reader.readLine();
        if (s == null) {
            s = "";
        }

        System.out.println(isPalindrome(s));
    }
}
`,n=`import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Valid Palindrome
 * LeetCode: 125 | Difficulty: Easy | Frequency: 4/5
 * Pattern: Two pointers, String scanning
 *
 * <p>Problem:
 * Given a string {@code s}, return {@code true} if it is a palindrome after ignoring all
 * non-alphanumeric characters and the case of the letters.
 *
 * <p>Input format (stdin):
 * <pre>
 * s
 * </pre>
 * The string is a single whitespace-free token.
 *
 * <p>Sample input:
 * <pre>
 * A man, a plan, a canal: Panama
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: two pointers, one at each end. Skip everything that is not a letter or a
 * digit, compare the remaining characters case-insensitively, and move inwards. The
 * string never has to be copied or cleaned.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Returns true when {@code s} is a palindrome ignoring punctuation and case.
     *
     * @param s the input string
     * @return {@code true} / {@code false}
     */
    public static boolean isPalindrome(String s) {
        if (s == null) {
            return false;
        }

        int left = 0;
        int right = s.length() - 1;
        while (left < right) {
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) {
                left++;
            }
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) {
                right--;
            }
            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }

    public static void main(String[] args) throws Exception {
        // The string may contain spaces, so the whole line is read.
        BufferedReader reader =
                new BufferedReader(new InputStreamReader(System.in, StandardCharsets.UTF_8));
        String s = reader.readLine();
        if (s == null) {
            s = "";
        }

        System.out.println(isPalindrome(s));
    }
}`,r=`
# Valid Palindrome — LeetCode 125

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Two Pointers · String scanning |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Meta, Google, Microsoft, Uber |

## Problem Statement

Given a string \`s\`, return \`true\` if it is a palindrome after **ignoring all
non-alphanumeric characters** and the **case of the letters**.

\`"A man, a plan, a canal: Panama"\` → ignoring punctuation and case it reads
\`amanaplanacanalpanama\` backwards → \`true\`.

## Input Format

The program reads from standard input:

\`\`\`
s
\`\`\`

- \`s\` — the string to test, on a single line (it may contain spaces).

The program prints \`true\` or \`false\`.

## Sample Input

\`\`\`
A man, a plan, a canal: Panama
\`\`\`

## Expected Output

\`\`\`
true
\`\`\`

## Approach — Two pointers that skip the noise

The classic palindrome check compares mirrored characters. Here the "characters" that
matter are the letters and digits only, so each pointer first **skips** everything it
should not compare.

\`\`\`
while left < right:
    skip non-alphanumeric characters from both ends
    if lowercase(s[left]) != lowercase(s[right]): return false
    left++, right--
\`\`\`

**Why not clean the string first?** Building a cleaned copy works, but it costs O(n)
extra space and a second pass. Skipping in place keeps the extra space at O(1) and the
pass at O(n) — and it is the version interviewers like, because it shows you understand
*which* characters count.

\`Character.isLetterOrDigit\` does the filtering and \`Character.toLowerCase\` handles the
case, so no manual \`Character.isUpperCase\` juggling is needed.

## Dry Run

Input: \`A man, a plan, a canal: Panama\` (length 30)

| Step | left | right | characters | action |
|---:|---:|---:|---|---|
| 1 | 0 | 29 | \`a\` vs \`a\` | match → \`left++\`, \`right--\` |
| 2 | 1 | 28 | skip \`' '\` → 2 | left moves to \`m\` |
| 3 | 2 | 28 | \`m\` vs \`m\` | match |
| 4 | 3 | 27 | \`a\` vs \`a\` | match |
| 5 | 4 | 26 | \`n\` vs \`n\` | match |
| 6 | 5 | 25 | skip \`','\` and \`' '\` → left 7 | left moves to \`a\` |
| 7 | 7 | 25 | \`a\` vs \`a\` | match |
| 8 | 8 | 24 | skip \`' '\` → 9 | left moves to \`p\` |
| 9 | 9 | 24 | \`p\` vs \`p\` | match |
| 10 | 10 | 23 | skip \`' '\`, \`':'\` → right 21 | right moves to \`l\` |
| 11 | 10 | 21 | \`l\` vs \`l\` | match |
| 12 | 11 | 20 | \`a\` vs \`a\` | match |
| 13 | 12 | 19 | \`n\` vs \`n\` | match |
| 14 | 13 | 18 | skip \`','\`, \`' '\` → left 15 | left moves to \`a\` |
| 15 | 15 | 18 | \`a\` vs \`a\` | match |
| 16 | 16 | 17 | skip \`' '\` → 17 | left moves to \`c\` |
| 17 | 17 | 17 | \`c\` vs \`c\` | match → pointers meet → **palindrome** |

Every letter matched its mirror ✓

## Java Solution

See [\`ValidPalindrome.java\`](./ValidPalindrome.java).

\`\`\`java
int left = 0;
int right = s.length() - 1;
while (left < right) {
    while (left < right && !Character.isLetterOrDigit(s.charAt(left))) {
        left++;
    }
    while (left < right && !Character.isLetterOrDigit(s.charAt(right))) {
        right--;
    }
    if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
        return false;
    }
    left++;
    right--;
}
return true;
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | every character is visited at most once by the two pointers |
| **Space** | O(1) | the string is not copied or cleaned |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if you are allowed to delete at most one character?"* → that is
  [Valid Palindrome II](../strings/ValidPalindromeII.md): on a mismatch, try
  skipping the left or the right character.
- *"What if the string is huge and you want to stream it?"* → you cannot: a palindrome
  check needs both ends.
- *"What about Unicode / surrogate pairs?"* → \`Character.isLetterOrDigit\` handles code
  points correctly when you use the \`int\` overload.
- *"Can you do it with a regex?"* → yes, but it is slower and needs extra memory.

**Common mistakes:**
- ❌ Comparing the characters **without** lowercasing → \`"A man..."\` fails on the very
  first pair.
- ❌ Treating \`_\` or other punctuation as a letter → use \`isLetterOrDigit\`, not
  \`isLetter\`.
- ❌ Running out of bounds when the string is empty or all punctuation → the inner skip
  loops check \`left < right\` first.
- ❌ Removing the punctuation into a new string and forgetting the O(n) space.

**How to narrate:**
> "I use two pointers at the two ends. Each pointer first skips everything that is not
> a letter or a digit, then I compare the two characters case-insensitively. If they
> differ, the string is not a palindrome; otherwise both pointers move inwards. The
> string is never copied, so the extra space stays O(1)."

## Related Problems

- [Valid Palindrome II](../strings/ValidPalindromeII.md) — one deletion allowed
- [Longest Palindromic Substring](../strings/LongestPalindromicSubstring.md) — expand around the centre
- [Two Sum II - Input Array Is Sorted](TwoSumII.md) — the same pointer pattern
- [Palindrome Number](../math/PalindromeNumber.md) — the same idea on digits
`,i=[`isPalindrome`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};