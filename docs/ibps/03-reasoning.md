---
title: IBPS PO — Reasoning Ability
order: 3
summary: Reasoning from zero — the puzzle method that actually works, syllogism and inequality shortcuts, coding-decoding, and the coding traps in every paper.
---

# IBPS PO — Reasoning Ability

**Prelims:** 35 questions · **40 marks** · 20 minutes
**Mains:** 40 questions · 60 marks · 45 minutes
**Level:** basic → advanced

Reasoning is now the **highest-scoring section in Prelims** — 35 questions for 40 marks.
That is a deliberate rebalancing, and it changes the strategy: **a puzzle you solve
correctly is worth more than a puzzle you attempt and get wrong.**

---

## The topic map

| Topic | Prelims | Mains | Priority |
|---|---:|---:|---|
| Puzzles & Seating Arrangement | 14–25 | 18–28 | Critical |
| Syllogism | 3–5 | 2–3 | Critical |
| Inequality | 0–5 | 2–4 | Critical |
| Coding-Decoding | 1–5 | 2–5 | High |
| Machine Input-Output | 0–1 | 5–7 | High |
| Data Sufficiency | 0–2 | 3–4 | Medium |
| Blood Relations | 0–3 | 0–3 | Medium |
| Direction Sense | 0–3 | 0–3 | Medium |
| Order & Ranking | 0–3 | 2–3 | Medium |
| Statement & Assumption | 0–2 | 2–3 | Medium |

---

## Layer 1 — puzzles and seating: the method that works

**Puzzles are 40–60% of the Reasoning section.** They look like the hardest part of the
paper and they are actually the most mechanical — if you have a system.

### The system (learn this and puzzles stop being scary)

**Step 1 — note the FIXED entities first.**
Fixed means the position is known: "B sits third from the left", "C is at one of the
ends", "D sits immediately to the right of A". Every fixed entity is an anchor. Start
there.

**Step 2 — note the VARIABLE entities and their ranges.**
"Five people sit in a row. Each is from a different city." A variable entity with a
range of 5 possible positions is a candidate for the "least information, most
positions" principle.

**Step 3 — apply the "most constrained first" rule.**
Place the entity with the **fewest possible positions** first. Narrow things fastest.
This single rule is the difference between 8 minutes and 20 minutes.

**Step 4 — draw as you go, and use a table for each entity.**
For a 5-person row, a table with columns `Name | Pos` (and a second table for
attributes like `Age | Name`) is far better than scribbling in the row. Rebuild the
table after every placement.

**Step 5 — respect the negative information.**
"A is not next to B" is a constraint. "A is not at an end" is a constraint. Most
wrong puzzle answers come from ignoring what was ruled out.

**Step 6 — verify before you answer.**
Check every clue against your final arrangement. Two minutes of verification saves a
wrong answer and the negative mark.

### Linear arrangement

Positions numbered 1..n left to right.

- **"Third from the left"** = position 3.
- **"Third from the right"** = position n − 2.
- **"Exactly three people sit between A and B"** → |pos(A) − pos(B)| = 4.
- **"A sits between B and C"** → B < A < C or C < A < B, and A is adjacent to one.
- **"A sits second to the left of B"** → pos(B) = pos(A) + 2.
- **"The person who likes X sits second to the right of the one who likes Y"** →
  pos(Y) + 2 = pos(X).

**The single most common bug:** "second to the left of" means there is exactly one person
between them and A is on the left. So pos(B) = pos(A) + 2. Getting this backwards is the
most common seating mistake.

### Circular arrangement

Fix **one person at a fixed reference point** to remove the rotation. Then treat it as a
line with the person to the right of your anchor wrapping to the start.

- **"A is second to the left of B"** on a circle → count counter-clockwise.
- **"Everyone is seated facing the centre"** — left and right reverse compared to
  facing outward. **Check which way the people face.**
- **"A and B are opposite each other"** → n/2 positions apart (n even).
- **"A is second to the left of B, and C is immediately right of B"** → draw it.

### Floor-based puzzle

Each floor has a fixed number of people (usually 3). The person who lives on floor 1 is
**immediately below** the person on floor 2, etc.

### Box-based puzzle

Six boxes in a row, or a 2×3 arrangement, or a 3×3 grid. Sometimes "diagonally adjacent".

### Scheduling puzzle

People are assigned to **days** (usually 7 days, one person per day). Use a table with
`Person | Day` and apply the same constrained-first rule.

### What actually gets asked

- **Who sits where** (position-based).
- **Who is the neighbour of X** (attribute-based).
- **Which attribute belongs to the person at a given position.**
- **How many people like A and are not sitting next to B** (the hardest).

---

## Layer 2 — syllogism

**The method: draw a Venn diagram.** Always. For three statements it takes 20 seconds
and removes all doubt.

**The possible conclusions:**
- **A – B – C** (all definite)
- **Either A or B** (exactly one)
- **Either A or B, or both** (at least one)
- **Only A** (A is certain, and B is not)

**The rules:**

| Statement type | Meaning |
|---|---|
| **All A are B** | A ⊆ B |
| **No A is B** | A ∩ B = ∅ |
| **Some A are B** | A ∩ B ≠ ∅ (at least one) |
| **Some A are not B** | A − B ≠ ∅ |

**The decisive moves:**

- **"Some A are B"** guarantees at least one A is a B, and at least one A is **not** a B.
  So "Some A are not B" is **always true**.
- **"All A are B" + "Some B are C"** does *not* give "Some A are C" — the B that is a C
  might not be an A. This is the classic trap.
- **"No A is B" + "All B are C"** → "No A is C" ✓
- **"All A are B" + "All B are A"** → "All A are B" (they are the same set) and
  "All A are A" is true, so "Some A are A" is also true (if A is non-empty).
- **Either-or conclusions** need proof that *both* cannot hold together.

**The quickest test for a conclusion:** draw the most restrictive Venn possible and see if
the conclusion is forced. If a counterexample exists, the conclusion is false.

---

## Layer 3 — inequality

**Two forms.**

### Coded inequalities

`A > B`, `C ≤ D` etc., sometimes with letters standing for numbers. **Replace the
letters with numbers** — pick a consistent assignment (e.g. A=8, B=3, C=6, D=5) and
compute. Then check the conclusion against the *derived order*, not the symbols.

### Mathematical inequalities (quantity comparison)

`a + b < c + d`, `a/b > c/d`, etc., with a, b, c, d positive.

**The method — bring everything to one side and simplify:**

> Is `a/b > c/d`? → `ad > bc` (multiply by bd, which is positive) → compare.

> Is `a + b < c + d`? → `a − c < d − b`.

**If the expression cannot be simplified, substitute values.** Pick values that make
the comparison *close*, because that is where the answer flips.

**The "cannot be determined" answer is common** — roughly a third of the questions. If
you can find one value of the variable where A > B and another where A < B, the answer is
"cannot be determined".

---

## Layer 4 — coding-decoding

**Read the coding key carefully. It is free marks.** Most candidates lose 2–4 questions
per paper by misreading the key.

**The types:**

| Type | Example |
|---|---|
| **Letter coding** | +2, −3 from each letter in the word |
| **Word coding** | "MONKEY is written as XDJMNL" — shift each letter |
| **Number coding** | 345 → 3+4=7, 4+5=9, 5+6=11 |
| **Symbol coding** | `+` means `−`, `×` means `+` |
| **Conditional coding** | if a letter is a vowel, apply one rule; else another |

**The method:**
1. **Write the coding in a table**: `Plain: A B C D` / `Code: C E G I`. The shift is
   obvious when it is written out.
2. **Check whether the shift is constant** (+2) or **position-dependent** (the first
   letter +1, the second +2, …). Position-dependent codings are common in Mains.
3. **Decode or encode consistently** — if the question gives plain → code, to find the
   code of a new word you encode; if it gives code → plain, you decode. Do not mix.
4. **Count the letters.** If the coded word has a different length, the rule involves
   deletion or addition.

---

## Layer 5 — machine input–output

**A sequence of steps transforms a set of machine codes into another. You must find the
step, then apply it.**

**The method:**

1. **Do step 1 on the first input.** Work mechanically.
2. **Look for the pattern** across all the pairs, not just the first.
3. **The pattern is usually:** a machine-code transformation (swap, reverse, add a
   constant, rotate), sometimes combined with a step on the numbers.
4. **Verify on the LAST pair** before applying it to the new input. If it works on the
   last pair, it is almost certainly right.
5. **Apply to the new input and check the answer against the options.** If none match,
   your pattern is wrong — go back.

**Mains adds a twist:** the transformation is applied **twice**, or the steps run in
**reverse order**, or there is a conditional. Read the question: "the steps are applied
in reverse order" is the clue.

---

## Layer 6 — blood relations, direction, ranking

**Blood relations:** draw the family tree. The standard statements:
- "A is the son of B" → A is a child of B.
- "A is the brother of B" → same generation, same gender.
- "A is the father of B" → A is a parent.
- "Plus sign" means male, "minus sign" means female.
- "A is the grandmother of B" → two generations up.
- Count **down** the tree for daughters, **up** for mothers, and remember that the
  spouse relation is not blood.

**Direction sense:**
- Clockwise from north: N → NE → E → SE → S → SW → W → NW.
- If the question says "facing south", left and right swap.
- **Count the turns, not the steps.** Take one full step at a time, or use the 45°
  per turn method: N = 0°, NE = 45°, E = 90°, and so on. Add the turn to the current
  heading, then compute the final displacement.

**Order and ranking:**
- "A is 12th from the left and 18th from the right" → total = 12 + 18 − 1 = **29**.
- For two positions from opposite ends: total = left + right − 1.
- "A ranks 5th, B is 3 ranks below A" → B is 8th.

---

## Layer 7 — data sufficiency and statement-conclusion (Mains)

**Data Sufficiency (reasoning):** the same rules as Quant, but the statements are about
relationships, not numbers. Sufficiency means *the answer is uniquely determined*.

**Statement & Assumption:**
- A statement is an **assumption** if it is **necessary** and **not already stated**.
- If it is not necessary → not an assumption.
- If it follows from the given statements → not an assumption.

**Statement & Conclusion:**
- **Definitely true** — it must follow.
- **Possibly true** — it could be true but is not guaranteed.
- **Definitely false** — it contradicts.

**The method:** try to construct a scenario where the conclusion fails. If you can, it is
"possibly true" (or false). If you cannot construct it, it is definitely true.

---

## Exam traps by topic

| Topic | Trap |
|---|---|
| Puzzle | Ignoring a *negative* constraint ("A is not next to B") |
| Puzzle | Placing the least-constrained entity first — slow but correct |
| Seating | "Second to the left" reversed |
| Circular seating | Forgetting that facing the centre reverses left and right |
| Syllogism | Assuming "All A are B" + "Some B are C" gives "Some A are C" |
| Syllogism | Treating "Some" as "All" |
| Inequality | Not substituting values when the expression will not simplify |
| Coding | Misreading the coding key |
| Machine I/O | Fixing the pattern from the first pair only, without verifying the last |
| Blood relation | Not drawing the tree |
| Direction | Not accounting for a change of facing direction |

---

## Practice plan

| Weeks | What to do |
|---|---|
| 1–2 | Syllogism (Venn diagrams), inequality, coding-decoding. 20 a day. |
| 3–4 | Linear arrangement and circular seating. 3 puzzles a day, timed. |
| 5–6 | Floor, box and scheduling puzzles. 3 a day, timed. |
| 7–8 | Blood relations, direction, ranking, machine I/O. |
| 9–10 | Data sufficiency, statement & assumption, critical reasoning. |
| 11+ | Full Reasoning sets of 35 in 20 minutes, then Prelims mocks. |

**The puzzle drill that matters:** solve the **same** puzzle again three days later
from scratch and check your time. The improvement is in *speed and certainty*, not in
new puzzles.

**And the rule that decides the section:** in Prelims, with 20 minutes, attempt **at
most two puzzles**. If a puzzle is not 60% solved in 8 minutes, abandon it and mark for
review. A puzzle attempted and wrong costs 0.75 marks; a puzzle skipped costs nothing.
