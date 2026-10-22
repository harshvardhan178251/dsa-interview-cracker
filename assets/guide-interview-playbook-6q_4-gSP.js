var e=`guide:interview-playbook`,t=`
# The DSA interview playbook

Most candidates lose DSA rounds on process, not on algorithms. You can know every problem
in this repository and still fail because you wrote code in silence for ten minutes and
then presented a solution you never explained.

This guide is about the process.

---

## The shape of a DSA round

| Phase | Typical length | What is being assessed |
|---|---|---|
| Clarification | 3–5 min | Do you ask, or do you assume? |
| Brute force | 3–5 min | Do you have a sane starting point? |
| Optimisation | 15–20 min | Can you find the better algorithm? |
| Implementation | 10–15 min | Can you code without freezing? |
| Dry run & edge cases | 5 min | Do you understand your own solution? |
| Follow-ups | 5–10 min | Do you know the trade-offs? |

---

## Phase 1 — Clarify (do not skip this)

Before writing anything, confirm:

- **What exactly is the input?** An array, a linked list, a tree, a graph? Values? Sorted?
  Unique?
- **What is the output?** A value, an index, a list, a boolean? Do they want indices or
  values? Is the order important?
- **What are the constraints?** This is the single most important question, because the
  constraints decide the algorithm. \`n ≤ 10⁵\` rules out O(n²). \`n ≤ 10³\` does not.
- **Is the input guaranteed valid?** Can it be empty? Can there be duplicates? Can there be
  no solution? What should you return then?
- **Is it a one-shot problem or a stream?** "Design a class with \`add\` and \`getMedian\`" is
  a completely different problem from "find the median of an array".

Say what you are checking and why. *"Let me check the constraints — with n up to 10⁵ I need
to avoid nested loops."* That sentence alone signals competence.

**Do not** ask questions whose answers are obvious from the statement — it reads as
nervous. Ask the ones that change the solution.

## Phase 2 — Say the brute force first

Always state the naive solution and its complexity, even if it is obviously bad:

> "Brute force is to check every pair, which is O(n²). With n up to 10⁵ that won't work,
> so let me think about doing it in one pass."

This does three things:
1. Establishes that you can solve the problem at all — an interviewer who sees no working
   idea will not wait for an optimal one.
2. Gives you a fallback if the optimal approach does not pan out.
3. Frames the optimisation as a deliberate, reasoned step.

## Phase 3 — Narrate the optimisation

State the idea in one or two sentences before coding:

> "I need to find the complement of each element as I scan. A hash map gives me that lookup
> in constant time, so I can do it in a single pass."

Then state the **data structures** and the **invariant**:

> "The invariant is: before processing index i, the map contains every element in
> nums[0..i-1]."

Interviewers latch onto invariants. They are the difference between "I wrote code that
works" and "I know why my code works".

## Phase 4 — Code while narrating

Say one short sentence before each meaningful block:

- "Let me set up the map and the loop."
- "Now, for each element, I look up the complement."
- "If I find it, I return the two indices."

Do **not** narrate every keystroke. A running commentary of every line is exhausting and
distracting. Block-level narration is the right granularity.

**Practical habits:**

- Write the signature and the base cases first.
- Handle the empty/single-element case before the main loop. It stops you from writing a
  loop that crashes on \`nums[0]\`.
- Use meaningful names. \`int[] seen\` beats \`int[] a\`.
- If you make a mistake, **stop and say so**: *"Let me trace this again — I think I have an
  off-by-one here."* Interviewers respect a candidate who debugs out loud. They do not
  respect a candidate who silently rewrites working code.

## Phase 5 — Dry run it out loud

Before you declare victory, walk the solution on the sample **from the code you just
wrote**. This catches more bugs than anything else.

> "Let me trace it. nums = [2, 7, 11, 15], target = 9. At i=0, complement is 7, the map is
> empty, so I store 2→0. At i=1, complement is 2, which is in the map at index 0. So I return
> 0 and 1."

Then test the edge cases out loud:

| Edge case | What it catches |
|---|---|
| Empty input | Loop guards, null checks |
| Single element | Off-by-one, "no answer" path |
| Duplicates | Whether the algorithm handles repeated values |
| Negative numbers | Sign errors, sentinel comparisons |
| Maximum values | Overflow |
| All equal | Unstable partition assumptions |
| Already sorted / reversed | Worst-case branches |

## Phase 6 — State the complexity

Say it explicitly, both time and space, and say *why*:

> "Time is O(n) because we make one pass and each map operation is O(1) on average. Space is
> O(n) because the map holds at most n entries."

Then compare to the brute force:

> "The brute force was O(n²) time and O(1) space, so we've traded space for time."

Interviewers are specifically checking whether you **notice the trade-off**. A solution
that is O(n log n) when O(n) was available will be rejected even if it passes.

## Phase 7 — Answer the follow-ups

Every problem here has follow-ups. The write-up in each problem lists them. Prepare for:

- **"What if the input were a stream?"** → you cannot revisit elements; the solution must
  change (e.g. a heap, or a frequency map with a sliding window).
- **"Can you do it in O(1) space?"** → often means sorting first, which is O(n log n) time
  but O(1) extra space.
- **"What if the values were huge?"** → hash the values, or use a \`TreeMap\` with
  \`floorKey\`/\`ceilingKey\`.
- **"How would you handle this at scale?"** → the bridge into system design.
- **"What if you needed to support deletion?"** → what data structure would change.

**Always answer a follow-up even if you cannot solve it**, out loud:

> "I'd need to think about that. My instinct is that the map would become the bottleneck and
> we'd want to batch updates — let me think..."

A candidate who thinks aloud and reasons from first principles is often rated higher than
one who silently gives up.

---

## Handling the moment you are stuck

This happens. It is not a failure state — it is a graded one.

**1. Say so explicitly.** *"I'm stuck — let me restart from the constraints."* Silence is
much worse than admitting you are stuck, because the interviewer cannot tell whether you
are thinking or frozen.

**2. Go back to the constraints.** Re-read the input size and the required output. Often
the constraint tells you the shape: \`n ≤ 10⁵\` means linear, \`n ≤ 1000\` means quadratic is
fine.

**3. Re-state the problem in your own words.** You may have misread it.

**4. Try the smallest case.** Work through a 2-3 element example on paper. The structure of
the problem usually becomes obvious.

**5. Return to brute force and optimise from there.** Brute force is always correct. Say:
> "Let me just get the brute force working first, then I'll look for the optimisation."

Getting a working O(n²) answer and then improving it in front of the interviewer is a
completely normal and often *impressive* trajectory.

**6. If you truly cannot solve it,** say what you *did* understand:

> "I wasn't able to find the efficient approach. Here's my brute force and where I think the
> optimisation would have to come in — I'd want to avoid the nested loop, which suggests
> either a hash map or a two-pointer sweep depending on whether the input is sorted."

That answer demonstrates transferable judgement, which is what the rubric actually scores.

---

## What each interview stage is really testing

### Online assessment (90 min, 2 problems)

Usually one easy and one medium, with a hidden test suite. You cannot debug with a
print statement — you read the error output. So:

- Read the whole problem set first. Start with the one you can finish.
- Write the function signature **exactly** as specified. A wrong signature fails
  everything.
- Do not print debug output. It breaks the comparison.
- Submit early and often. A submitted solution that gets 60% beats an unsubmitted one
  that gets 100% but never made it past the last edit.
- Handle the empty input.

### Phone screen (45–60 min)

One problem, usually easy or medium, with a human on the line. The bar is:
**communication**. They want to know what it is like to solve a problem with you.

- Use a shared editor if they offer one, so they can see your thinking.
- If you have no editor, talk through your pseudocode first, then code.
- Expect them to ask: *"Why did you choose that data structure?"*

### Onsite, first round (60 min)

One medium or hard problem, sometimes two. This is where the "cracking" questions come
from — the follow-ups on top of the solution.

- Expect 45 minutes of problem and 15 minutes of questions for you.
- The follow-ups are not a separate test — they are checking whether you actually
  understood your own solution. If you cannot explain your approach, the follow-ups will
  expose it.
- Complexity discussion is mandatory here. "O(n) time" with no explanation gets a
  non-committal answer.

### Onsite, second round (60 min)

Usually a harder problem or a different flavour:

- **Graphs and DP** are the favourites here.
- A harder variant of a problem you solved in round one is common — the interviewer is
  testing how you *extend* your own solution. Re-deriving from scratch wastes time; say
  *"can I build on the approach I just used?"* and modify it.

### System design / architecture (45–60 min)

This is where the [system-design notes](../system-design/01-fundamentals.md) come in. The bar:
can you reason about trade-offs under ambiguity?

- The most common mistake is jumping into a design without clarifying requirements.
- Say out loud: *"Let me first understand the scale and the core requirements."*
- Always cover: functional requirements, data model, the API, the storage choice, and the
  bottleneck you expect.

---

## Questions you should ask

Never skip this. It is free score.

**About the problem:**
- "What does the input look like in practice — how big, how structured?"
- "Is the order of the output important?"
- "Is there a follow-up you'd like to steer towards?" *(this one is bold and often works)*

**About the team:**
- "What does a normal day look like for someone on this team?"
- "How does the team decide what to build next?"
- "What is the biggest technical challenge the team is working on right now?"
- "How does code get from a design to production here?"
- "What does the on-call rotation look like?"

**About your growth:**
- "What does success look like in this role after six months?"
- "How do you give feedback, and what feedback have you found most useful?"

---

## Common mistakes, in rough order of how often they cost the offer

| Mistake | What it signals | Avoid it by |
|---|---|---|
| Coding in silence | Cannot collaborate | Narrate in blocks |
| Not asking about constraints | Cannot pick an algorithm | Always ask |
| No complexity analysis | Does not understand trade-offs | State it explicitly, always |
| Guessing silently for 10 minutes | Frozen | Say "I'm stuck" and restart from constraints |
| Patching code instead of debugging | Poor debugging skill | Trace the failing case out loud |
| Defensive coding everywhere | Over-engineering | Handle the stated edge cases, not imaginary ones |
| "It won't work in Java" | Did not check | Check the language; it almost always works |
| No questions at the end | Not interested | Ask two or three |
| Argumenting with the interviewer | Poor collaboration | Disagree once, with a reason, then follow their lead |

---

## A note on language

You may be asked to code in a language of the interviewer's choosing. If it is not Java,
you will still need to say the algorithm in a language-agnostic way first:

> "I'd use a hash map from value to index. For each element I'd look up the complement."

That sentence is the algorithm. The code is just a transcription of it. Learn the
standard library of whatever language is offered *for the data structures you listed
above* — hash map, dynamic array, hash set, priority queue, sort with a comparator — and
you can solve almost everything.

## The last five minutes

Before you leave:

1. Re-read your solution once. Look for the classic bugs: off-by-one, wrong comparison
   operator, wrong loop bound, missing \`else\`, forgetting to update a counter.
2. Make sure you have stated the complexity.
3. Make sure you have tested the empty input and one edge case.
4. Ask your questions.
5. Say thank you, and follow up with a short email.

Good luck. Work the problems, but work them the way the interview will ask for them.
`,n={id:e,body:t};export{t as body,n as default,e as id};