var e=`arrays.MajorityElementII`,t=`package com.dsa.arrays;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Problem: Majority Element II
 * LeetCode: 229 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Boyer-Moore voting, Extended to two candidates
 *
 * <p>Problem:
 * Given an integer array {@code nums}, return all elements that appear more than
 * {@code n / 3} times. The answer may contain at most two elements and is returned in
 * ascending order.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 7
 * 1 1 1 2 2 2 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 2
 * </pre>
 *
 * <p>Approach: at most two elements can exceed the n/3 threshold, so the extended
 * Boyer-Moore vote keeps two candidates. A second pass recounts the candidates to confirm
 * that each one really crosses the threshold, because the voting pass alone only
 * nominates candidates.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class MajorityElementII {

    /**
     * Returns every element that appears in more than {@code n / 3} positions.
     *
     * @param nums the input array
     * @return the qualifying elements in ascending order
     */
    public static List<Integer> majorityElements(int[] nums) {
        int candidate1 = 0;
        int candidate2 = 0;
        int count1 = 0;
        int count2 = 0;

        for (int value : nums) {
            if (count1 > 0 && value == candidate1) {
                count1++;
            } else if (count2 > 0 && value == candidate2) {
                count2++;
            } else if (count1 == 0) {
                candidate1 = value;
                count1 = 1;
            } else if (count2 == 0) {
                candidate2 = value;
                count2 = 1;
            } else {
                count1--;
                count2--;
            }
        }

        count1 = 0;
        count2 = 0;
        for (int value : nums) {
            if (value == candidate1) {
                count1++;
            } else if (value == candidate2) {
                count2++;
            }
        }

        List<Integer> answer = new ArrayList<>();
        int n = nums.length;
        if (count1 > n / 3) {
            answer.add(candidate1);
        }
        if (count2 > n / 3) {
            answer.add(candidate2);
        }
        Collections.sort(answer);
        return answer;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        List<Integer> answer = majorityElements(nums);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < answer.size(); i++) {
            if (i > 0) {
                out.append(' ');
            }
            out.append(answer.get(i));
        }
        System.out.println(out);
    }
}
`,n=`import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Majority Element II
 * LeetCode: 229 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Boyer-Moore voting, Extended to two candidates
 *
 * <p>Problem:
 * Given an integer array {@code nums}, return all elements that appear more than
 * {@code n / 3} times. The answer may contain at most two elements and is returned in
 * ascending order.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * nums[0] nums[1] ... nums[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 7
 * 1 1 1 2 2 2 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 2
 * </pre>
 *
 * <p>Approach: at most two elements can exceed the n/3 threshold, so the extended
 * Boyer-Moore vote keeps two candidates. A second pass recounts the candidates to confirm
 * that each one really crosses the threshold, because the voting pass alone only
 * nominates candidates.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class Main {

    /**
     * Returns every element that appears in more than {@code n / 3} positions.
     *
     * @param nums the input array
     * @return the qualifying elements in ascending order
     */
    public static List<Integer> majorityElements(int[] nums) {
        int candidate1 = 0;
        int candidate2 = 0;
        int count1 = 0;
        int count2 = 0;

        for (int value : nums) {
            if (count1 > 0 && value == candidate1) {
                count1++;
            } else if (count2 > 0 && value == candidate2) {
                count2++;
            } else if (count1 == 0) {
                candidate1 = value;
                count1 = 1;
            } else if (count2 == 0) {
                candidate2 = value;
                count2 = 1;
            } else {
                count1--;
                count2--;
            }
        }

        count1 = 0;
        count2 = 0;
        for (int value : nums) {
            if (value == candidate1) {
                count1++;
            } else if (value == candidate2) {
                count2++;
            }
        }

        List<Integer> answer = new ArrayList<>();
        int n = nums.length;
        if (count1 > n / 3) {
            answer.add(candidate1);
        }
        if (count2 > n / 3) {
            answer.add(candidate2);
        }
        Collections.sort(answer);
        return answer;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);

        List<Integer> answer = majorityElements(nums);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < answer.size(); i++) {
            if (i > 0) {
                out.append(' ');
            }
            out.append(answer.get(i));
        }
        System.out.println(out);
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
# Majority Element II — LeetCode 229

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Boyer-Moore voting · Extended to two candidates |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber |

## Problem Statement

Given an integer array \`nums\`, return **all** elements that appear **more than
\`n / 3\` times**.

- The answer contains **at most two** elements.
- The elements are returned in **ascending** order.

## Input Format

\`\`\`
n
nums[0] nums[1] ... nums[n-1]
\`\`\`

- \`n\` — length of the array (1 ≤ n ≤ 5 × 10⁴)
- \`nums\` — n space-separated integers

## Sample Input

\`\`\`
7
1 1 1 2 2 2 3
\`\`\`

## Expected Output

\`\`\`
1 2
\`\`\`

\`n / 3 = 2\` (integer division), so an element qualifies with **at least 3** occurrences.
\`1\` occurs 3 times, \`2\` occurs 3 times, \`3\` occurs once.

## Approach — Two-Candidate Boyer-Moore

**Why at most two elements?** If three elements each occurred more than \`n / 3\` times,
their total would exceed \`n\`. So the extended Boyer-Moore vote needs two candidate slots.

The vote:

\`\`\`
for each value:
    if it matches candidate1 → count1++
    else if it matches candidate2 → count2++
    else if count1 == 0 → candidate1 = value, count1 = 1
    else if count2 == 0 → candidate2 = value, count2 = 1
    else → count1--, count2--      // the value cancels one unit of both candidates
\`\`\`

A value that does not match either candidate is used to "kill" one unit of **both**
candidates — that is what keeps the two-candidate invariant.

**The verification pass is mandatory.** The voting pass only *nominates* candidates: a
value can end up as a candidate even if it occurs twice. So a second pass recounts the
occurrences of each candidate and keeps the ones above the threshold.

## Dry Run

Input: \`nums = [1, 1, 1, 2, 2, 2, 3]\`, \`n = 7\`, threshold \`n / 3 = 2\` (qualify with > 2)

### Pass 1 — voting

| Step | i | \`value\` | \`candidate1\` | \`count1\` | \`candidate2\` | \`count2\` | action | counts after |
|---:|---:|---:|---:|---:|---:|---:|---|---|
| 1 | 0 | 1 | 0 | 0 | 0 | 0 | \`count1 == 0\` → new candidate | c1=1, c2=0 |
| 2 | 1 | 1 | 1 | 1 | 0 | 0 | matches candidate1 → \`count1++\` | c1=2, c2=0 |
| 3 | 2 | 1 | 1 | 2 | 0 | 0 | matches candidate1 → \`count1++\` | c1=3, c2=0 |
| 4 | 3 | 2 | 1 | 3 | 0 | 0 | \`count2 == 0\` → new candidate | c1=3, c2=1 |
| 5 | 4 | 2 | 1 | 3 | 2 | 1 | matches candidate2 → \`count2++\` | c1=3, c2=2 |
| 6 | 5 | 2 | 1 | 3 | 2 | 2 | matches candidate2 → \`count2++\` | c1=3, c2=3 |
| 7 | 6 | 3 | 1 | 3 | 2 | 3 | matches neither, both counts > 0 → cancel both | c1=2, c2=2 |

Nominees: \`candidate1 = 1\`, \`candidate2 = 2\`.

### Pass 2 — verification

| candidate | occurrences | \`> n / 3\`? | kept? |
|---|---:|---|---|
| 1 | 3 | 3 > 2 → **yes** | ✔ |
| 2 | 3 | 3 > 2 → **yes** | ✔ |
| 3 | 1 | 1 > 2 → no | ✘ (never became a candidate) |

Answer (sorted): **1 2**

## Java Solution

See [\`MajorityElementII.java\`](./MajorityElementII.java).

\`\`\`java
public static List<Integer> majorityElements(int[] nums) {
    int candidate1 = 0, candidate2 = 0, count1 = 0, count2 = 0;
    for (int value : nums) {
        if (count1 > 0 && value == candidate1) { count1++; }
        else if (count2 > 0 && value == candidate2) { count2++; }
        else if (count1 == 0) { candidate1 = value; count1 = 1; }
        else if (count2 == 0) { candidate2 = value; count2 = 1; }
        else { count1--; count2--; }
    }
    count1 = 0; count2 = 0;
    for (int value : nums) {
        if (value == candidate1) { count1++; }
        else if (value == candidate2) { count2++; }
    }
    List<Integer> answer = new ArrayList<>();
    int n = nums.length;
    if (count1 > n / 3) { answer.add(candidate1); }
    if (count2 > n / 3) { answer.add(candidate2); }
    Collections.sort(answer);
    return answer;
}
\`\`\`

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n) | Two passes, constant work per element |
| **Space** | O(1) | Two candidates and two counters (the result holds ≤ 2 values) |

## Interview Notes

**Follow-ups to raise yourself:**
- *"What if the threshold were \`n / 4\`?"* → the same technique with **three** candidates.
  In general, \`k\` candidates handle the \`> n / (k + 1)\` threshold.
- *"Can you skip the verification pass?"* → only if the existence of the majority is
  guaranteed (as in LeetCode 169). Here it is not, so the pass is required.
- *"What if I want the elements in the order they appear?"* → drop the final \`sort()\`.
- *"Is there a hashing solution?"* → yes, count frequencies and filter, but it is O(n)
  space; the vote is O(1) space.
- *"How would you extend this to a stream?"* → the vote is online; the verification needs
  a second pass or a frequency sketch.

**Common mistakes:**
- ❌ Skipping the verification pass — the vote only nominates candidates.
- ❌ Using \`>= n / 3\` instead of \`> n / 3\` — the condition is *strictly* more than one
  third.
- ❌ Forgetting the \`count > 0\` checks before comparing to a candidate — a stale
  candidate with count 0 would steal values from the other slot.
- ❌ Resetting a candidate to \`0\` and then comparing real values against it — harmless
  here only because \`0\` is just another value, but the count checks keep the logic sound.

**How to narrate:**
> "Since three elements can't each exceed a third of the array, at most two can qualify.
> I extend Boyer-Moore to two candidate slots: a value that matches neither candidate
> cancels one unit from both, which preserves the invariant. Then I do a second pass to
> verify each candidate really occurs more than n/3 times — the vote alone only
> nominates. Finally I sort the (at most two) results."

## Related Problems

- [Majority Element](MajorityElement.md) — the single-candidate version
- [Contains Duplicate II](ContainsDuplicateII.md) — hash-map counting
- [Pairs With a Target Sum](../../../../../../docs/topics/12-prefixsum.md) — hash-map counting with complements
`,i=[`majorityElements`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};