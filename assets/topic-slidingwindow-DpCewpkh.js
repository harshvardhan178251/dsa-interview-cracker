var e=`topic:slidingwindow`,t=`
# Sliding window — concept notes

## The mental model

A sliding window is a **contiguous range** \`[left, right]\` that moves across the array.
You maintain some state about the window and update it as it changes.

**The two types:**

| Type | Window size | Example |
|---|---|---|
| **Fixed** | Exactly \`k\` | Sliding Window Maximum (LC 239), average of k |
| **Variable** | Grows and shrinks to satisfy a constraint | Longest Substring Without Repeating (LC 3) |

---

## The ten-second classifier

\`\`\`
Is there a "k" in the problem?         → FIXED window
Is there a "longest" or "minimum"?     → VARIABLE window
Does the constraint depend on the
SUM of the window?                     → prefix sum + hash map, NOT a window
Does the constraint depend on the
FREQUENCY of characters?               → sliding window with a frequency map
\`\`\`

**The critical distinction:** if the constraint is about the **sum**, a sliding window
does not work, because you cannot remove an element from the middle. You need prefix
sums (see the [prefix sum notes](./12-prefixsum.md)).

- "Longest subarray with sum ≤ K" → **prefix sum + two pointers** (or a sliding window
  with a running sum, which does work if all values are non-negative).
- "Longest substring with no repeated characters" → **sliding window** (it is about
  character sets, not sums).

---

## The variable-window loop

The single most important loop shape in this topic:

\`\`\`java
int left = 0;
for (int right = 0; right < n; right++) {
    // 1. ADD the new element to the window
    add(right);

    // 2. SHRINK the window until the constraint is satisfied
    while (!valid()) {
        remove(left);
        left++;
    }

    // 3. RECORD the answer
    answer = Math.max(answer, right - left + 1);
}
\`\`\`

**The three phases, in this order, always.** The order matters:
- Add **before** shrinking, so the window includes the new element when you test validity.
- Shrink **before** recording, so the recorded window is always valid.
- Record **after** shrinking, so it is the longest valid window ending at \`right\`.

**The invariant:** after the inner while loop, \`[left, right]\` is the **longest valid
window ending at \`right\`**.

**Why that is true:** \`left\` only moves when the window is invalid, and it moves just
enough. So every start position smaller than \`left\` was already shown to be invalid for
this (or an earlier) right endpoint, and adding more elements cannot make it valid
again. That last point is the subtle one — it holds because **invalidity is monotone
under extension**, which is true whenever removing an element cannot make a window
invalid.

**That monotonicity is the assumption you must check.** If adding an element could make a
previously invalid window valid, the technique breaks.

---

## Longest substring without repeating characters (LC 3)

\`\`\`java
public static int lengthOfLongestSubstring(String s) {
    Map<Character, Integer> lastSeen = new HashMap<>();
    int left = 0, best = 0;
    for (int right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        if (lastSeen.containsKey(c) && lastSeen.get(c) >= left) {
            left = lastSeen.get(c) + 1;       // jump past the duplicate
        }
        lastSeen.put(c, right);
        best = Math.max(best, right - left + 1);
    }
    return best;
}
\`\`\`

**The key trick: \`left = lastSeen.get(c) + 1\`, not \`left++\`.** When you hit a repeat,
you jump the left boundary directly past the previous occurrence. Shrinking one at a time
would still be correct but slower to reason about.

**The \`lastSeen.get(c) >= left\` guard is essential.** Without it, a character that
appeared *before* the current window would push \`left\` backwards, which is wrong.

**The last-index map beats the "remove from a set" version** because it avoids the
remove/re-add bookkeeping and it is a single lookup.

---

## Longest repeating character replacement (LC 424)

\`\`\`java
public static int characterReplacement(String s, int k) {
    int[] counts = new int[26];
    int left = 0, maxCount = 0, best = 0;

    for (int right = 0; right < s.length(); right++) {
        counts[s.charAt(right) - 'A']++;
        maxCount = Math.max(maxCount, counts[s.charAt(right) - 'A']);

        while (right - left + 1 - maxCount > k) {
            counts[s.charAt(left) - 'A']--;
            left++;
        }
        best = Math.max(best, right - left + 1);
    }
    return best;
}
\`\`\`

**The insight:** the window is valid if \`windowLength − maxFrequency ≤ k\`.

**The subtle part: \`maxCount\` is never decreased.** This is deliberate and correct for
this problem — a stale (too high) \`maxCount\` only makes the condition *more* permissive,
so the window may be slightly shorter than optimal, but it never produces a wrong
*maximum*. It is a well-known subtlety and explaining it is a strong signal.

**Say it explicitly:** "I don't decrease maxCount because we only care about the maximum
window length ever seen, and keeping a stale maxCount never causes us to record an
invalid window as valid — it only means we might miss a marginally longer one."

---

## Minimum window substring (LC 76)

The hardest common sliding-window problem.

\`\`\`java
public static String minWindow(String s, String t) {
    if (s.length() < t.length()) return "";
    int[] need = new int[128];
    for (char c : t.toCharArray()) need[c]++;

    int required = t.length();
    int formed = 0;
    int left = 0, bestLen = Integer.MAX_VALUE, bestStart = 0;

    for (int right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        if (need[c] > 0) formed++;
        need[c]--;

        while (formed == required) {
            if (right - left + 1 < bestLen) {
                bestLen = right - left + 1;
                bestStart = left;
            }
            char leftChar = s.charAt(left);
            need[leftChar]++;
            if (need[leftChar] > 0) formed--;
            left++;
        }
    }
    return bestStart == 0 && bestLen == Integer.MAX_VALUE ? "" : s.substring(bestStart, bestStart + bestLen);
}
\`\`\`

**The state:** \`need[c]\` is how many more of \`c\` we need. \`formed\` counts how many
required characters are currently satisfied. The window is complete when
\`formed == required\`.

**The subtlety:** \`need[c]--\` for every character, including extras. \`need[c]\` going
negative means "we have extra copies of c", which is fine. When we remove a character
from the left, \`need[c]++\` and if it becomes positive again, that character is missing
again, so \`formed--\`.

**The \`need[c] > 0\` check before incrementing \`formed\`** is the detail that makes it
correct. Missing it breaks the counting.

---

## Permutation in string (LC 567)

\`\`\`java
public static boolean checkInclusion(String s1, String s2) {
    if (s1.length() < s2.length()) return false;
    int[] need = new int[26];
    for (char c : s2.toCharArray()) need[c - 'a']++;
    int matched = 0;

    for (int i = 0; i < s1.length(); i++) {
        char c = s1.charAt(i);
        if (need[c - 'a'] > 0) matched++;
        need[c - 'a']--;

        if (i >= s2.length()) {
            need[s1.charAt(i - s2.length()) - 'a']++;
        }
        if (matched == s2.length()) return true;
    }
    return false;
}
\`\`\`

**This is a fixed-size window with a frequency array.** The \`matched\` counter tracks how
many distinct characters of \`s2\` are fully satisfied.

---

## Fruit into baskets (LC 904)

\`\`\`java
public static int totalFruit(int[] fruits) {
    Map<Integer, Integer> counts = new HashMap<>();
    int left = 0, best = 0;
    for (int right = 0; right < fruits.length; right++) {
        counts.merge(fruits[right], 1, Integer::sum);
        while (counts.size() > 2) {
            counts.merge(fruits[left], -1, Integer::sum);
            if (counts.get(fruits[left]) == 0) counts.remove(fruits[left]);
            left++;
        }
        best = Math.max(best, right - left + 1);
    }
    return best;
}
\`\`\`

**The window constraint is "at most 2 distinct values".** A frequency map tracks the
distinct types; when the size exceeds 2, shrink from the left.

**The removal must delete zero-count entries** — otherwise \`counts.size()\` never drops
and the loop spins forever.

---

## The fixed window

**Sliding Window Maximum (LC 239)** uses a monotonic deque rather than a frequency array,
because you need the maximum, not the counts.

**Sliding window average / sum (LC 643)** — the simplest case:

\`\`\`java
int sum = 0;
for (int i = 0; i < nums.length; i++) {
    sum += nums[i];
    if (i >= k) sum -= nums[i - k];
    if (i >= k - 1) best = Math.max(best, sum / k);
}
\`\`\`

**A fixed window is really just a variable window where the shrink always removes
exactly one element.** Recognising that unifies the two.

---

## When a sliding window will NOT work

| Situation | Why | Use instead |
|---|---|---|
| The constraint is about the **sum** and values can be negative | Removing from the left changes the sum unpredictably | Prefix sum + hash map |
| You need to remove a **specific** element, not the oldest | The window structure does not fit | A different structure entirely |
| The constraint is not **monotone** under extension | Shrinking might never restore validity | Binary search on the answer |

**"Longest subarray with sum ≤ K" with negative numbers** is the classic trap. With
non-negative values it works as a sliding window; with negatives it does not.

---

## Common traps

| Trap | Why it bites |
|---|---|
| Recording the answer before shrinking | You record an invalid window |
| Shrinking before adding | You test a window that excludes the new element |
| Forgetting to delete zero-count entries | The shrink loop never terminates |
| Not checking \`lastSeen.get(c) >= left\` | The left boundary moves backwards |
| Using a sliding window for a sum constraint with negatives | The technique does not apply |
| Off-by-one in the window length | \`right - left + 1\` vs \`right - left\` |
| Not resetting \`formed\` correctly after the shrink | The completeness check breaks |
| Assuming \`maxCount\` should decrease | It should not — and explaining why is the point |

---

## Complexity cheat sheet

| Problem type | Time | Space |
|---|---|---|
| Fixed window, no extra state | O(n) | O(1) |
| Fixed window with a frequency map | O(n) | O(k) alphabet |
| Variable window with a frequency map | O(n) | O(distinct) |
| Minimum window substring | O(n) | O(alphabet) |
| Sliding window maximum (monotonic deque) | O(n) | O(k) |
| Sum constraint with negatives | O(n) with prefix sum + hash map | O(n) |

**Every element enters the window once and leaves once** — that is why it is O(n), not
O(n²). Say that when asked for the complexity.

---

## How to crack it in an interview

1. **Classify: fixed or variable?** "There's a k in the problem, so it's a fixed window."
2. **Classify the constraint:** characters, or sum? If it is a sum and the values may be
   negative, say "this needs prefix sums, not a window".
3. **State the invariant:** "after the shrink loop, [left, right] is the longest valid
   window ending at right".
4. **Say what the window state holds** — a frequency map, a running sum, a monotonic
   deque.
5. **Explain the monotonicity assumption** — why shrinking makes the constraint easier.
6. **Trace it** with the window boundaries marked.
`,n={id:e,body:t};export{t as body,n as default,e as id};