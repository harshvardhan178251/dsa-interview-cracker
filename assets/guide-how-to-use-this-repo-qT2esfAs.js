var e=`guide:how-to-use-this-repo`,t=`
# How to use this repository

This repository exists to get you through a DSA interview, not to be read cover to cover.
There are three parts, and they are meant to be used in a loop.

## The three parts

| Part | What it is | What it is for |
|---|---|---|
| \`src/main/java/com/dsa/<topic>/\` | one \`.java\` + one \`.md\` per problem | **Learning** — the write-up carries the dry run |
| \`src/test/java/com/dsa/<topic>/\` | one JUnit class per topic | **Verification** — the solution is proven, not just asserted |
| \`web/\` | React + Vite site | **Practice** — browse, read, run, track progress |

The \`.md\` file that sits next to every \`.java\` file is the centre of gravity. It contains
the problem statement, the exact stdin format, a step-by-step **dry run**, the complexity
analysis, and the interview notes. The Java file is the clean solution you are meant to
re-implement yourself.

## The loop that actually works

Most people fail DSA preparation by *reading* solutions. Reading produces a feeling of
recognition that evaporates in the interview room. What works is this four-step loop, done
once per problem:

### 1. Read only the statement and the input format

Open the problem on the website. Read the statement, the constraints and the sample I/O.
**Do not look at the solution.** Say out loud what data structures you would use.

Write down your brute-force idea. Every problem has one. You are going to need it later to
explain why your optimisation is correct.

### 2. Implement it yourself

Open your editor and write the solution. Do not look at the repository's \`.java\` file yet.

Constraints to respect:

- O(n) beats O(n log n) beats O(n²). If the constraints allow O(n), an O(n log n) solution is
  a red flag in the interview.
- Java only — no \`var\` gymnastics, no streams in the hot loop, no recursion that can blow
  the stack on a 10⁵-element input.
- If the problem says the input is sorted, do not sort it. Say that you noticed.

### 3. Read the dry run, not the code

Now open the write-up and read the **dry run** section. This is the part that separates
"you have seen this problem" from "you can solve this problem". It shows the state of the
algorithm at every single step.

Compare the dry run to what your own implementation would have done. If your trace differs
from the reference trace, you have a bug — find it now, with a pen and paper, not in a
debugger.

Then read the complexity table and the interview notes. The notes list the follow-ups you
should raise yourself and the mistakes interviewers see most often.

### 4. Run it, then mark it solved

Run your solution against the sample on the website's **Run** tab. Then feed it edge cases:

| Edge case | Why it matters |
|---|---|
| Empty input | Off-by-one in the loop guard |
| Single element | The "no answer" path |
| All elements equal | Duplicate handling |
| Already sorted / already reversed | Worst case for naive sorts and two pointers |
| Maximum allowed values | Integer overflow, recursion depth, memory |

When it passes, mark it **solved** in the UI. The dashboard tracks your progress per topic,
and solved problems come back for a second look after seven days.

## Why the dry run matters more than the code

An interviewer is not testing whether you can recite an algorithm. They are testing:

1. **Can you decompose the problem?** (you start by describing your approach out loud)
2. **Do you understand why it works?** (the dry run is where this shows)
3. **Can you debug under pressure?** (walking a trace is the debugging skill)
4. **Do you know the trade-offs?** (time vs space, and what happens if the input grows)

If you can narrate a dry run of your solution out loud, you have answered all four.

A useful drill: **narrate your dry run before you narrate your code.** Interviewers notice
the difference. It proves you understood the problem rather than pattern-matched it.

## Running things locally

\`\`\`powershell
# everything
.\\scripts\\dev.ps1                 # regenerates the site data, runs the tests, starts the site

# just the tests
.\\scripts\\test.ps1

# one problem
.\\scripts\\run.ps1 arrays.TwoSum "4\`n2 7 11 15\`n9"
\`\`\`

Or use the website: \`cd web; npm run dev\` and open <http://localhost:5173>.

## How the website stays in sync

The site does not keep its own copy of the problems. \`web/scripts/generate-data.mjs\` reads
the Java sources and the markdown files straight out of \`src/main/java\`, and writes
\`web/src/data/*.json\`. That JSON is committed, so the site works with no build step and no
network — but it is generated output, not the source of truth.

**If you add a problem, regenerate the data** (\`node web/scripts/generate-data.mjs\`), or the
site will not show it.

## What to do when you get stuck

Timebox it. If you have no idea after 15 minutes, look at the approach section — but only
the *approach*, not the code. Implement it yourself from that description, then compare
against the reference solution.

If you understood the reference solution but could not derive it, that is the normal state
for a hard problem on the first encounter. Come back in three days.

If you did not understand the reference solution, read the dry run again, slowly, and
re-derive each step. Then write your own explanation in your own words and compare it with
the write-up.

## The order to work through them

Do not go alphabetically. Use the [study plan](./01-8-week-study-plan.md) — it sequences the topics
so each one builds on the last, and it front-loads the highest-frequency problems.

If you only have two weeks, do this instead:

1. \`arrays\`, \`strings\`, \`hashing\`, \`twopointers\`, \`slidingwindow\` — the easy wins
2. \`binarysearch\`, \`linkedlist\`, \`stacks\`, \`queues\`, \`heaps\`
3. \`trees\`, \`graphs\`
4. \`dynamicprogramming\`
5. \`backtracking\`, \`greedy\`

And for every one of them, only do the problems marked ★★★★★ in the frequency column. That
is roughly 40% of the set and covers most of what gets asked.
`,n={id:e,body:t};export{t as body,n as default,e as id};