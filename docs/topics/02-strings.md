---
title: Strings — concept notes
order: 2
summary: Character-level thinking — parsing, palindromes, anagrams, and the difference between the immutable-String tricks that work in Java and the ones that do not.
---

# Strings — concept notes

## The mental model

A Java `String` is **immutable**. That single fact explains most of the idioms:

- `s.charAt(i)` — O(1), but a method call on an immutable object.
- `s.substring(i)` — **O(n)**, because it copies. This surprises people.
- `s + "x"` — **O(n)**, because it builds a new string. In a loop this is O(n²).
- `new StringBuilder(s).reverse().toString()` — O(n), and the right tool for repeated
  concatenation.
- `s.equals(t)` — value comparison. `s == t` compares references.

**The golden rule:** inside a loop, never build strings with `+`. Use a `StringBuilder`,
or a `char[]`.

---

## The parsing problems

**String to Integer (atoi)** is the classic. The order of the checks is the whole problem:

1. Skip leading whitespace.
2. Optional `+` or `-`.
3. Digits, accumulating into a `long` (not `int` — overflow is a real case).
4. **Clamp** to `Integer.MIN_VALUE` / `Integer.MAX_VALUE` on overflow rather than
   wrapping.
5. Apply the sign.

```java
public static int myAtoi(String s) {
    int i = 0, n = s.length();
    while (i < n && Character.isWhitespace(s.charAt(i))) i++;

    int sign = 1;
    if (i < n && (s.charAt(i) == '+' || s.charAt(i) == '-')) {
        sign = s.charAt(i) == '-' ? -1 : 1;
        i++;
    }

    long result = 0;
    while (i < n && Character.isDigit(s.charAt(i))) {
        result = result * 10 + (s.charAt(i) - '0');
        if (sign == 1 && result > Integer.MAX_VALUE) return Integer.MAX_VALUE;
        if (sign == -1 && -result < Integer.MIN_VALUE) return Integer.MIN_VALUE;
        i++;
    }
    return (int) (sign * result);
}
```

**The clamp inside the loop** is what makes it correct. Clamping *after* the loop is too
late — `result` may already have overflowed and wrapped to a wrong value.

**Valid Number** is the same idea with more states. It is a **state machine**:

```
      [space]      [sign]      [digit]      [dot]      [e/E]
START ------> SIGNED ------> NUMBER ------> ------> ------> END
```

Draw the states, label the transitions, then implement it. **This is the right approach
for any "validate a format" problem** — regular expressions are tempting but a state
machine is what interviewers want to see.

---

## Palindromes

**Valid Palindrome (LC 125)** — reverse and compare.

```java
public static boolean isPalindrome(String s) {
    int left = 0, right = s.length() - 1;
    while (left < right) {
        while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;
        while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;
        if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}
```

**Two pointers, skipping non-alphanumerics, case-insensitive.** Ignore everything that is
not a letter or digit.

**Valid Palindrome II (LC 680)** — you may skip **one** character:

```java
public static boolean isPalindrome(String s, int skipped) {
    int left = 0, right = s.length() - 1;
    while (left < right) {
        if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
            if (skipped == 1) return false;
            // try skipping either side
            return isPalindromeRange(s, left + 1, right)
                || isPalindromeRange(s, left, right - 1);
        }
        left++;
        right--;
    }
    return true;
}
```

**The key insight:** the first mismatch gives you exactly two options — skip the left
character or skip the right one. Check both. That is O(n), not O(n²).

**Longest Palindromic Substring (LC 5)** — expand around the centre.

```java
for (int i = 0; i < s.length(); i++) {
    expand(s, i, i);      // odd length
    expand(s, i, i + 1);  // even length
}
```

**There are 2n − 1 centres** for a string of length n (n odd-length centres and n−1
even-length ones). Check both at every index. O(n²) time, O(1) space.

**Manacher's algorithm** is O(n) but almost never what an interview wants.

**Longest Palindromic Subsequence (LC 516)** — that is DP, not two pointers: it is the
longest common subsequence of the string and its reverse.

---

## Anagrams and frequency counting

**The canonical key:** sort the characters. Two strings are anagrams iff their sorted
forms are equal.

```java
static String canonical(String s) {
    char[] chars = s.toLowerCase().toCharArray();
    Arrays.sort(chars);
    return new String(chars);
}
```

**The faster key:** a 26-element frequency array. For lowercase English letters only:

```java
static int[] frequency(String s) {
    int[] counts = new int[26];
    for (char c : s.toLowerCase().toCharArray()) counts[c - 'a']++;
    return counts;
}
```

**Which to use in the interview:** say both. "Sorting is O(n log n) and simple; a
frequency array is O(n) and only works for a fixed alphabet. For grouping anagrams, a
frequency array with a fixed size is usually better."

**Group Anagrams (LC 49)** — use the canonical key as a hash map key.

**Counting with a fixed-size array vs a hash map:**

| Situation | Use |
|---|---|
| Alphabet is fixed and small (a-z, 0-9) | An array — O(1), no hashing, no boxing |
| Values are arbitrary ints | A `HashMap<Integer, Integer>` |
| Values are in a known small range | An array sized to the range |

---

## Word manipulation

**Reverse Words in a String (LC 151)** — the trap is the **multiple spaces**.

```java
String[] words = s.trim().split("\\s+");
StringBuilder sb = new StringBuilder();
for (int i = words.length - 1; i >= 0; i--) {
    if (sb.length() > 0) sb.append(' ');
    sb.append(words[i]);
}
return sb.toString();
```

`split("\\s+")` after a `trim()` handles runs of spaces, tabs and newlines. Note the
**regex** — `" "` (a plain space) would leave empty strings behind.

**`split` gotchas:**

| Input | `split(",")` | `split(",\\s*")` |
|---|---|---|
| `"a,b,,c"` | `["a","b","","c"]` | `["a","b","c"]` |
| `"a, b"` | `["a"," b"]` | `["a","b"]` |

**Java's `split` drops trailing empty strings** by default — `"a,b,,".split(",")` gives
`["a","b"]`. Use `split(",", -1)` to keep them.

**String Compression** — count runs:

```java
StringBuilder sb = new StringBuilder();
for (int i = 0; i < s.length(); ) {
    int j = i;
    while (j < s.length() && s.charAt(j) == s.charAt(i)) j++;
    sb.append(j - i).append(s.charAt(i));
    i = j;
}
```

**Decide the tie-break rule up front.** "If compression does not shorten the string,
return the original" is a common requirement — and the interviewer will tell you, or
you should ask.

---

## Roman numerals

**Integer to Roman (LC 12)** — greedy over a value table:

```java
int[] values  = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
String[] symbols = {"M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"};
```

The table includes the **subtractive forms** (900, 400, 90, 40, 9, 4) so the greedy
algorithm works in one pass. Without them you would need special-casing.

**Roman to Integer (LC 13)** — subtract when a symbol is smaller than the next one:

```java
for (int i = 0; i < s.length(); i++) {
    int v = value(s.charAt(i));
    if (i + 1 < s.length() && v < value(s.charAt(i + 1))) {
        total -= v;
    } else {
        total += v;
    }
}
```

**Explain why:** "I is only subtracted before V or X, so a symbol smaller than the next
one is always the first half of a subtractive pair."

---

## Excel sheet columns

**Title to number (LC 171):** base-26 with A = 1.

```java
int result = 0;
for (int i = 0; i < s.length(); i++) {
    result = result * 26 + (s.charAt(i) - 'A' + 1);
}
```

**Number to title (LC 168):** the reverse, but you must subtract 1 first because there is
no zero digit.

```java
StringBuilder sb = new StringBuilder();
while (columnNumber > 0) {
    int rem = (columnNumber - 1) % 26;
    sb.append((char) ('A' + rem));
    columnNumber = (columnNumber - 1) / 26;
}
return sb.reverse().toString();
```

**The `-1` is the whole trick.** In bijective base-26 the digits are 1..26, not 0..25.
Getting this wrong is the single most common bug — and the classic follow-up question
("why do you subtract 1?").

---

## Count and Say (LC 38)

The run-length encoding of the previous term.

```java
StringBuilder sb = new StringBuilder();
for (int i = 0; i < s.length(); ) {
    int j = i;
    while (j < s.length() && s.charAt(j) == s.charAt(i)) j++;
    sb.append(j - i).append(s.charAt(i));
    i = j;
}
```

Note the difference from String Compression: here the digit comes **before** the
character, and the counts are not grouped (a run of 11 ones is `"21"`, not `"111"`).

---

## Common traps

| Trap | Why it bites |
|---|---|
| `s.charAt(i)` returning a `char` — arithmetic on it | `s.charAt(i) - '0'` gives the digit; `s.charAt(i) - 48` also works but is cryptic |
| `substring` in a loop being O(n²) | Copy the chars into a `char[]` instead |
| `split` with a regex metacharacter | `"a.b".split(".")` splits on every character — you need `"\\."` |
| Forgetting `\\s+` in a split on whitespace | Leaves empty strings |
| Comparing with `==` instead of `.equals()` | Compares references |
| Not handling the empty string | `"".split(",")` returns `[""]`, not `[]` |
| Off-by-one on `i + 1 < n` in a loop that looks ahead | Index out of bounds on the last element |
| Integer overflow in atoi | Clamp inside the loop |
| Assuming the input is lowercase | Call `toLowerCase()` — or state the assumption |

---

## Complexity cheat sheet

| Operation | Complexity |
|---|---|
| `length()`, `charAt(i)` | O(1) |
| `substring`, `concat`, `+` | O(n) |
| `equals`, `contains`, `indexOf` | O(n) |
| `split`, `replace`, `trim` | O(n) |
| `toLowerCase`, `toCharArray` | O(n) |
| `StringBuilder.append` | O(1) amortised |
| `StringBuilder.toString` | O(n) |
| `String.join` | O(total length) |
| Sorting characters | O(n log n) |
| Frequency array (26 letters) | O(n) |

---

## How to crack it in an interview

1. **Ask about the alphabet.** Lowercase only? Unicode? Spaces? This decides between an
   array and a map.
2. **Ask whether the string can be modified.** Java says no, so you will need a
   `char[]` or a `StringBuilder`.
3. **State the approach by name** — "two pointers from both ends", "frequency array with a
   fixed alphabet", "a state machine for validation".
4. **For validation problems, draw the state machine.** It is faster to write and easier
   to verify than a pile of conditions.
5. **Mention the alternatives** — sorting vs counting — and say why you chose one.
