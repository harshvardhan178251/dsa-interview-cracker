---
title: Compare Version Numbers
leetcode: 165
difficulty: Medium
patterns: [Two Pointers, Segment by segment]
companies: [Amazon, Salesforce, Facebook]
frequency: 3
tags: [string, parsing, version-control]
sampleInput: |
  1.2
  1.10
sampleOutput: "-1"
---

# Compare Version Numbers — LeetCode 165

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Two Pointers · Segment by segment |
| **Interview heat** | ★★★☆☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Airbnb |

## Problem Statement

Compare two version numbers and return:

- `-1` if `version1` is **older** than `version2`
- `0` if they are equal
- `1` if `version1` is **newer** than `version2`

Rules:

- Versions are dotted strings: `"1.2.3"`.
- Revisions are compared **numerically**, so `"1.10"` is newer than `"1.2"`.
- Leading zeros are ignored: `"1.01"` equals `"1.001"`.
- A missing revision counts as zero: `"1.0"` equals `"1.0.0"` and `"1.0"` equals `"1"`.

## Input Format

The program reads from standard input:

```
version1
version2
```

- `version1` — the first version, on its own line, no quotes.
- `version2` — the second version, on its own line, no quotes.

## Sample Input

```
1.2
1.10
```

## Expected Output

```
-1
```

`1.2` is older than `1.10` because `2 < 10` — a text comparison would get this wrong.

## Approach — Split, then compare revision by revision

1. Split both versions on `'.'` into revision arrays.
2. Walk the revisions in parallel:
   - a revision that is missing on one side counts as `0`
   - compare the two revisions **as integers**
   - the first unequal pair decides the result immediately
3. If every compared revision is equal, the versions are equal — a longer version with
   extra zero revisions is still equal.

**Why numeric comparison matters:** `"1.10".compareTo("1.2")` is positive, because
`'1' < '2'` as characters. Version revisions must be read as numbers.

## Dry Run

Input: `version1 = "1.2"`, `version2 = "1.10"`

Split:

| array | index 0 | index 1 | index 2 |
|---|---|---|---|
| `a` (version1) | `"1"` | `"2"` | — |
| `b` (version2) | `"1"` | `"10"` | — |

Compare revision by revision:

| Step | i | `a[i]` | left | `b[i]` | right | decision |
|---:|---:|---|---:|---|---:|---|
| 1 | 0 | `"1"` | 1 | `"1"` | 1 | equal → keep going |
| 2 | 1 | `"2"` | 2 | `"10"` | 10 | 2 < 10 → **return −1** |

### Trace where the length matters — `"1.0"` vs `"1"`

| Step | i | `a[i]` | left | `b[i]` | right | decision |
|---:|---:|---|---:|---|---:|---|
| 1 | 0 | `"1"` | 1 | `"1"` | 1 | equal → keep going |
| 2 | 1 | `"0"` | 0 | *missing* | 0 | equal → keep going |
| 3 | — | — | — | — | — | loop finished → **return 0** |

### Trace where the length decides — `"1.0.1"` vs `"1.0"`

| Step | i | `a[i]` | left | `b[i]` | right | decision |
|---:|---:|---|---:|---|---:|---|
| 1 | 0 | `"1"` | 1 | `"1"` | 1 | equal → keep going |
| 2 | 1 | `"0"` | 0 | `"0"` | 0 | equal → keep going |
| 3 | 2 | `"1"` | 1 | *missing* | 0 | 1 > 0 → **return 1** |

### Leading zeros — `"1.01"` vs `"1.001"`

| Step | i | `a[i]` | left | `b[i]` | right | decision |
|---:|---:|---|---:|---|---:|---|
| 1 | 0 | `"1"` | 1 | `"1"` | 1 | equal → keep going |
| 2 | 1 | `"01"` | 1 | `"001"` | 1 | equal → keep going |
| 3 | — | — | — | — | — | **return 0** |

`"01"` accumulates as `0 * 10 + 0 = 0`, then `0 * 10 + 1 = 1` — the zeros simply
never contribute.

## Java Solution

See [`CompareVersionNumbers.java`](./CompareVersionNumbers.java).

```java
public static int compareVersions(String version1, String version2) {
    String[] a = version1.split("\\.");
    String[] b = version2.split("\\.");
    int revisions = Math.max(a.length, b.length);
    for (int i = 0; i < revisions; i++) {
        int left = (i < a.length) ? parseRevision(a[i]) : 0;
        int right = (i < b.length) ? parseRevision(b[i]) : 0;
        if (left != right) {
            return left < right ? -1 : 1;
        }
    }
    return 0;
}
```

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(n + m) | One pass to split, one pass over the revisions |
| **Space** | O(n + m) | The two revision arrays produced by `split` |

**Alternative without splitting:** walk both strings with two indices, copying each
revision into a temporary buffer — O(1) extra space. Worth mentioning in an interview
if the interviewer cares about allocations.

## Interview Notes

**Follow-ups to raise yourself:**
- *"Can you avoid the `split` allocations?"* → yes, two indices plus a small buffer.
- *"What if the version numbers are huge — 1000 revisions?"* → the same algorithm,
  but parse the revisions as strings and compare digit-by-digit instead of as `int`s.
- *"What if a revision overflows an `int`?"* → saturate at `Integer.MAX_VALUE` (as
  here) or compare the revision strings directly.
- *"How would you compare semantic versions with a `pre-release` suffix?"* → compare
  the numeric core first, then treat a pre-release as *older* than the release.

**Common mistakes:**
- ❌ Comparing the versions as **strings** → `"1.10"` looks smaller than `"1.2"`.
- ❌ Forgetting that a **missing revision is 0** → `"1.0"` vs `"1.0.0"` is wrongly
  reported as different.
- ❌ Comparing the **number of revisions** before the values → `"1.0.1"` is newer
  than `"1.0"` even though the extra revision is the only difference.

**How to narrate:**
> "I split both versions on the dot and compare the revisions pairwise as integers.
> A missing revision counts as zero, so '1.0' equals '1.0.0'. The first pair that
> differs decides the answer, and if nothing differs the versions are equal. The
> important detail is comparing numerically — '1.10' is newer than '1.2' even though
> the strings say otherwise."

## Related Problems

- [Roman to Integer](../../../../../../docs/topics/02-strings.md) — the same "parse a formatted string" shape
- [String to Integer (atoi)](../../../../../../docs/topics/02-strings.md) — parsing with overflow guards
