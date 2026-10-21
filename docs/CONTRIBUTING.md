# Authoring a problem

Every problem in this repository is **three files**:

| File | Purpose |
|---|---|
| `src/main/java/com/dsa/<topic>/<ClassName>.java` | the solution, with a `main` that reads stdin |
| `src/main/java/com/dsa/<topic>/<ClassName>.md` | the walkthrough: statement, I/O, dry run, complexity, interview notes |
| `src/test/java/com/dsa/<topic>/<ClassName>Test.java` | JUnit 5 tests |

The markdown file starts with a YAML frontmatter block — the website generator reads it
and turns the problem into a searchable, runnable card.

---

## 1. The Java file

```java
package com.dsa.arrays;                 // package must match the topic folder

import com.dsa.utils.FastScanner;       // only com.dsa.utils.* and the JDK are allowed
import java.util.*;

/**
 * Problem: Two Sum
 * LeetCode: 1 | Difficulty: Easy | Frequency: 5/5
 * Pattern: Hashing, One-pass
 *
 * <p>Problem: ...
 * <p>Input format (stdin): ...
 * <p>Approach: ...
 * <p>Complexity: Time O(n), Space O(n).
 */
public class TwoSum {

    /** Pure, testable algorithm. */
    public static int[] twoSum(int[] nums, int target) { ... }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] nums = fs.nextIntArray(n);
        int target = fs.nextInt();

        int[] answer = twoSum(nums, target);
        System.out.println(answer[0] + " " + answer[1]);
    }
}
```

**Hard rules**

1. The class name is `PascalCase`, matching the file name exactly.
2. `main` reads from `System.in` and writes **only** the answer to `System.out`.
   No prompts, no labels, no `System.err` noise — the output must match `sampleOutput` byte for byte
   (ignoring trailing whitespace).
3. The algorithm lives in its own `public static` method so tests can call it directly.
   `main` only does I/O.
4. Only `com.dsa.utils.*` and the Java standard library may be imported.
5. The solution must be deterministic — no `Math.random()`, no time or hash-order dependence
   in the output.
6. Keep the algorithm readable. This is study material, not golf.

### Available helpers (`com.dsa.utils`)

| Class | API |
|---|---|
| `FastScanner` | `nextInt()`, `nextLong()`, `nextDouble()`, `next()`, `nextChar()`, `nextIntArray(n)`, `nextLongArray(n)`, `nextStringArray(n)`, `hasNext()` |
| `ListNode` | `new ListNode(v)`, `ListNode.of(1, 2, 3)`, `ListNode.fromArray(int[])`, `node.toArray()`, `node.size()` |
| `TreeNode` | `new TreeNode(v)`, `TreeNode.of(1, 2, 3, null, 4)` (level order, `null` = missing), `node.height()`, `node.size()`, `node.toLevelOrderList()` |
| `TrieNode` | `children` map, `isEndOfWord`, `hasChild(c)`, `child(c)`, `getOrCreateChild(c)` |
| `MinHeap<T>` | `add`, `peek`, `poll`, `size`, `isEmpty`, `asList`; `MinHeap<T>(Comparator)` |
| `MaxHeap<T>` | same as `MinHeap`, reversed order |
| `UnionFind` | `find(x)`, `union(a, b)`, `connected(a, b)`, `components()` |
| `Pair<A, B>` | `first`, `second`, `Pair.of(a, b)` |
| `Interval` | `start`, `end`, `length()`, `overlaps(other)` |

Anything else you need, write it as a nested/auxiliary class **inside the same file**.

---

## 2. The markdown file

````markdown
---
title: Two Sum
leetcode: 1
difficulty: Easy
patterns: [Hashing, One-pass]
companies: [Amazon, Google, Meta, Uber]
frequency: 5
tags: [array, hashmap]
sampleInput: |
  4
  2 7 11 15
  9
sampleOutput: "0 1"
---

# Two Sum — LeetCode 1
````

**Frontmatter fields**

| Field | Type | Notes |
|---|---|---|
| `title` | string | Human title, not the class name |
| `leetcode` | number or `null` | LeetCode problem number when one exists |
| `difficulty` | `Easy` \| `Medium` \| `Hard` | |
| `patterns` | list | The interview technique(s) it demonstrates |
| `companies` | list | Companies known to ask it |
| `frequency` | 1–5 | Interview heat — 5 means "asked constantly" |
| `tags` | list | Free-form topical tags |
| `sampleInput` | block scalar `\|` | Exactly what the program reads |
| `sampleOutput` | string | Exactly what the program prints |

`sampleInput` must be a YAML block (`|`) so the newlines survive. `sampleOutput` is a
single-line string — if the answer spans several lines, use a block scalar there too.

**Body sections** (use these headings, in this order):

```markdown
# <Title> — LeetCode <n>

| | |
|---|---|
| **Difficulty** | Easy |
| **Pattern** | Hashing · One-pass |
| **Interview heat** | ★★★★★ |
| **Asked at** | Amazon, Google, Meta |

## Problem Statement
## Input Format
## Sample Input
## Expected Output
## Approach
## Dry Run          <- a markdown table, one row per step
## Java Solution
## Complexity       <- a table with Time and Space
## Interview Notes  <- follow-ups, common mistakes, how to narrate
## Related Problems
```

### The dry run is the point

This is what makes the repository worth studying. It must show the **state of the
algorithm at every step**, not a summary.

```markdown
| Step | i | nums[i] | complement | `seen` before | found? | `seen` after |
|---:|---:|---:|---:|---|---|---|
| 1 | 0 | 2 | 7 | `{}` | no | `{2: 0}` |
| 2 | 1 | 7 | 2 | `{2: 0}` | **yes** | `{2: 0}` |
```

Show the intermediate containers, not just "found". For recursion, show the call stack.
For graphs, show the queue or visited set. For DP, show the table row by row.

---

## 3. The test file

```java
package com.dsa.arrays;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class TwoSumTest {

    @Test
    void findsPairAtTheStart() {
        assertArrayEquals(new int[]{0, 1}, TwoSum.twoSum(new int[]{2, 7, 11, 15}, 9));
    }
}
```

Cover at least: the happy path, an edge case (empty/single element), a duplicate case, and
a case that exercises the boundary of the constraint.

---

## 4. Before you finish

1. **Compile** without touching the shared Maven `target/` directory:

   ```powershell
   javac -d "$env:TEMP\dsa-check" -sourcepath src\main\java src\main\java\com\dsa\<topic>\*.java
   ```

2. **Regenerate the site data** so the problem shows up on the website:

   ```powershell
   cd web; node scripts\generate-data.mjs
   ```

3. **Verify the runner source** compiles and produces the documented output:

   ```powershell
   cd web; node scripts\verify-judge-sources.mjs --id <topic>.<ClassName>
   ```

   This is the same code path the browser uses, so a failure here means the problem will
   fail in the site's Run tab.

4. **Check the site** still works end to end (needs `cd web; npm run dev` running in
   another terminal):

   ```powershell
   npm run qa
   ```

---

## Maintenance scripts

| Script | What it does |
|---|---|
| `node scripts/fix-links.mjs` | Rewrites relative links inside the write-ups so they resolve (`--check` to report only) |
| `node scripts/sync-samples.mjs` | Copies the frontmatter `sampleOutput` into the JavaDoc sample block so the two cannot drift (`--check` to report only) |
| `cd web; npm run gen:guides` | Rebuilds the company map, pattern index, coverage matrix and problem index from the catalogue |
| `cd web; npm run gen:data` | Rebuilds `web/src/data/**` from the Java sources |
| `cd web; npm run verify:judge` | Compiles and runs every problem's runner source against its sample |
| `.\scripts\test.ps1` | The whole JUnit suite |
