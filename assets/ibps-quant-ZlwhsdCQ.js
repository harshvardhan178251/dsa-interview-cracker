var e=`ibps:quant`,t=`
# IBPS PO — Quantitative Aptitude

**Prelims:** 35 questions · 30 marks · 20 minutes
**Mains:** DI and arithmetic dominate · 45–60 min in the DI section
**Level:** basic → advanced

Quant carries the most questions in Prelims but only 30 marks. Two facts follow:

1. **DI + Arithmetic is 20–24 of the 35 questions.** Master those two and the section
   is done.
2. **In Mains, DI is 40 of 170 questions and 60 marks.** It is the highest
   marks-per-minute section in the entire paper.

Speed beats cleverness here. Every question below has a **method** — the aim is to
execute the method in under 40 seconds.

---

## The topic map

| Topic | Prelims | Mains | Priority |
|---|---:|---:|---|
| Data Interpretation & Caselet | 10–23 | 17–23 | Critical |
| Simplification & Approximation | 4–7 | 4–7 | Critical |
| Arithmetic (percent, ratio, average, P&L, SI/CI) | 7–15 | 5–11 | Critical |
| Number Series | 0–6 | 4–5 | High |
| Quadratic Equations | 0–6 | 3–4 | High |
| Time, Speed & Distance | 1–2 | 1–2 | High |
| Time & Work | 1–2 | 1–2 | High |
| Mixture & Alligation | 1–2 | 1–2 | High |
| Permutation, Combination & Probability | 1–3 | 2–4 | Medium |
| Mensuration, Partnership, Ages, Number System | 1–2 each | 1–2 each | Medium |
| Inequality, Data Sufficiency | 0–3 | 3–4 | Medium |
| Boats, Pipes, Calendar, Clock | 0–1 | 0–1 | Low |

---

## Layer 1 — Data Interpretation (the biggest single block)

### The three-step method that works

**Step 1 — read the question first, not the data.** Know what is being asked before you
look at the table. Many DI questions ask about a value you can compute directly
("what fraction of X is Y?") and the whole table is a distraction.

**Step 2 — write down the units.** DI goes wrong on scale errors, not on arithmetic.
Annotate: *total customers = 4,200 (in thousands)*. Every number you write must carry
its unit.

**Step 3 — estimate before you calculate.** For a multiple-choice question, you often
only need to know which option is *plausible*. Compute a rough value first, then check
the options.

### Types of DI and their traps

| Type | The trap |
|---|---|
| **Table DI** | Reading across the wrong row; missing that the rows are not comparable |
| **Bar graph** | The y-axis does not start at zero; the bars are percentage points, not values |
| **Pie chart** | The angle/value mismatch; "the ratio of X to Y" needs LCM, not decimals |
| **Line graph** | Reading the value at a point between two lines; assuming monotonicity |
| **Caselet** | **The killer.** A missing-data table where you must combine 2–3 statements |
| **Missing DI** | The "missing row/column" value must be inferred from a total |

### Caselet — the technique that matters

A caselet gives partial information about a group (e.g. "twice as many A as B in
Q1") and asks about another period. **It appears in almost every Mains paper.**

**The method:**

1. **Choose a base unit** — pick the smallest variable and make it 1 (or 100 if you
   prefer percentages).
2. **Express everything in that unit.** Build a small table: Q1, Q2, Q3, each row in
   units of the base.
3. **Apply each statement as a constraint**, tightening the possible values.
4. **Check consistency** — if two statements contradict, one of your assumptions is wrong.
5. **Convert back** to the asked-for unit.

**Caselets become trivial once you fix a base unit.** The difficulty is entirely in the
setup, so do the setup on the rough sheet every single time.

### DI speed rules

- **Prefer ratios to decimals.** 3/8 of 2,400 is 900; 0.375 × 2,400 requires a
  calculator you do not have.
- **Learn the fraction set**: 1/2, 1/3, 2/3, 1/4, 3/4, 1/5, 2/5, 3/5, 4/5, 1/6, 1/8,
  3/8, 5/8, 7/8, 1/9, 1/10.
- **Percentage of percentage**: 25% of 40% = 10% (multiply the fractions).
- **Successive percentage change**: +10% then −10% = −1%, not 0%.

---

## Layer 2 — Simplification & approximation

**The section exists so that you never need a calculator.** Every question has a
shortcut.

### The core shortcuts

| Question | Shortcut |
|---|---|
| 15% of 480 | 10% + 5% = 48 + 24 = **72** |
| 25% of 640 | ÷4 = **160** |
| 12.5% of 480 | 1/8 of 480 = **60** |
| 37.5% of 480 | 3/8 = **180** |
| 16⅔% of 450 | 1/6 = **75** |
| 14⅔% of 450 | 7/30 → 15% = 67.5, minus 0.33% = 1.5 → **66** |
| √1444 | 38² = 1444 → **38** |
| √1521 | 39² = 1521 → **39** |
| Cube root of 1331 | 11³ = 1331 → **11** |
| 45% of 45% of 400 | 0.45 × 180 = **81** |

### Approximation — when the answer is "approximately"

Round to friendly numbers, then check which option the approximation lands near.

> √999 ≈ √1000 ≈ 31.6 → pick the option closest to 31.6

> 149% of 349 ≈ 1.5 × 350 = 525 → pick the option near 525

**Never approximate when the options are close together.** If two options differ by less
than 2%, do the exact calculation.

### BODMAS with fractions — the traps

- \`2 + 3/4\` = 2.75, **not** 2.75… → compute the fraction first if it follows a ÷.
- \`8/4 + 2\` = 4, not 2.5.
- \`0.2 × 0.3\` = 0.06, not 0.05 (the classic trap).
- \`(2 + 3) × 4\` ≠ \`2 + 3 × 4\`.

---

## Layer 3 — number series

**A series question is a pattern-recognition question.** There are only a few patterns.

### The pattern catalogue

| Pattern | Example |
|---|---|
| Difference of differences | 2, 6, 12, 20, 30 → 4, 6, 8, 10 → +2 each |
| Multiply then add | 3, 8, 19, 44 → ×2+2, ×2+3, ×2+6 |
| Square ± constant | 5, 9, 14, 20 → 2²+1, 3², 4²−2 |
| Prime-based | 2, 3, 5, 7, 11 → primes |
| Fibonacci-like | 1, 1, 2, 3, 5 → each term = sum of two before |
| Alternating series | 2, 6, 3, 15, 9, 45 → two interleaved series |
| Cubic-based | 1, 8, 27, 64 → n³ |
| Ratio + increment | 2, 5, 12, 27 → ×2+1, ×2+2, ×2+3 |
| Sum of digits | 12, 21, 39, 60 → 1+2=3, 2+1=3, 3+9=12... (pairs whose digit sum is 3) |
| Powers with gaps | 1, 4, 16, 64 → ×4 |

### The method

1. **Write the differences.** If the differences form a pattern, that is your answer.
2. **If not, check the ratios.**
3. **If neither, check for two interleaved series** (odd terms and even terms separately).
4. **For "wrong number" questions**, find which term breaks the pattern of the *others* —
   the odd one out is usually a term that could belong to a different but also valid
   pattern. The trick is to find the pattern that fits the **most** terms.
5. **For "missing number"**, apply the pattern you found and check the gap.

---

## Layer 4 — the arithmetic toolkit

### Percentage

- \`x% of y\` = \`y × x/100\`.
- **Percentage change** = \`(new − old) / old × 100\`.
- **Successive changes**: multiply the factors. +10% then +10% = 1.1 × 1.1 = 1.21 → **+21%**.
- A number increased by 25% must be decreased by **20%** to return (1/1.25 = 0.8).
- **Percentage of percentage**: 25% of 30% = 7.5%.

### Ratio and proportion

- Ratio 2:3:5 → total 10 parts.
- When the ratio changes from a:b to c:d with one quantity constant, find the shared part.
- **Alligation (alternate)**: for two mixtures at prices p₁ and p₂ giving a mean p, the
  ratio is \`(p₂ − p) : (p − p₁)\`.

### Average

- Average = sum / count.
- **If one value is added**: new average = (old sum + value) / (n + 1).
- **If one value is removed**: recompute from the sum.
- **Averages of averages**: weight by the counts. Average of averages of groups of sizes
  n₁, n₂ is NOT the simple average — use the weighted mean.

### Profit and loss

- Profit% = (SP − CP)/CP × 100.
- Selling two articles at the same price, one at x% profit and one at x% loss → **overall
  loss = x²/100 %**.
- Successive percentage: multiply the factors.
- Discount chain: 20% then 10% = 0.8 × 0.9 = 0.72 → **28% off**.

### Simple and compound interest

- SI = PRT/100.
- **CI for 2 years** = P(1 + r/100)² − P = P(2r/100 + (r/100)²).
- **CI for 2 years − SI for 2 years** = P(r/100)².
- **When do SI and CI meet?** When R = 100/T, where T is in years. (10% for 10 years.)
- A sum doubles under CI in \`log2(2)/log2(1+r/100)\` years. Doubles in 5 years → ~15%
  (rule of 72: 72/5 ≈ 14.4%).

### Time, speed and distance

- Speed = distance / time.
- **Same distance** → speed is inversely proportional to time.
- **Same time** → speed is directly proportional to distance.
- **Trains**: relative speed when opposite directions; the crossing time is
  (sum of lengths) / relative speed.
- Average speed for equal distances = **harmonic mean** = 2xy/(x+y), not the arithmetic
  mean.
- **Averages of speeds over unequal times** = total distance / total time, not the mean
  of the speeds.

### Time and work

- Work = rate × time. Total rate = sum of individual rates.
- **If A does in a days and B in b days**, together they take ab/(a+b) days.
- **A does half the work in 15 days** → A does the whole in 30 days.
- If A is twice as efficient as B, A takes half the time.
- **Days problem**: work is proportional to the number of people × days.

### Mixture and allegation

- Alligation rule: the ratio of the quantities is the ratio of the differences from the
  mean price, **inverted** when the mean is between them.
- Replacement: new mean = (sum − replaced amount + new amount) / count.

### Mensuration

- Circle: area = πr², circumference = 2πr.
- Rectangle perimeter = 2(l + b).
- Sphere: surface = 4πr², volume = 4/3 πr³.
- Cylinder: curved surface = 2πrh, volume = πr²h.
- Cone: curved surface = πrl, volume = 1/3 πr²h.
- **Square**: perimeter = 4a, area = a², diagonal = a√2.
- **Volume of a cube** = a³; **surface** = 6a².

### Permutation, combination, probability

- nPr = n! / (n − r)!, nCr = n! / (r!(n − r)!).
- **nCr = nCr(n − r)** — use the smaller side.
- Circular arrangements: (n − 1)!.
- Probability = favourable / total.
- **A and B both**: P(A) × P(B|A).
- **At least one** = 1 − P(none).
- Cards: 52 cards, 13 ranks × 4 suits; 26 red, 26 black; 12 face cards.

### Ages, number system, HCF/LCM

- Average age = sum / number of people.
- **HCF × LCM = product of the two numbers.**
- HCF of 12 and 18 = 6; LCM = 36.
- Number system: divisibility rules — 3 (digit sum), 9 (digit sum), 11 (alternating sum),
  4 (last two digits), 8 (last three), 25 (last two end in 00/25/50/75), 11 rule for
  3-digit numbers.

---

## Layer 5 — quadratic equations (the banker favourite)

**Almost always asked as:** *if x and y are the roots of x² + px + q = 0, find x + y, xy,
x/y etc.*

**Vieta's formulas:**

\`\`\`
x + y = −p        (or b/a with sign)
xy  = q            (or c/a)
x² + y² = (x + y)² − 2xy
1/x + 1/y = (x + y) / xy
\`\`\`

**Worked example.** If x and y are roots of \`x² − 7x + 12 = 0\`:

- x + y = 7, xy = 12.
- x² + y² = 49 − 24 = **25**.
- 1/x + 1/y = 7/12.
- (x − y)² = 49 − 24 = 25 → |x − y| = 5.

**The second question form:** *find the value of (1/x + 1/y + 1/z)* for three roots of
\`x³ − 6x² + 11x − 6 = 0\`:

- x + y + z = 6, xy + yz + zx = 11, xyz = 6.
- 1/x + 1/y + 1/z = (xy + yz + zx) / xyz = 11/6.

**The third form:** *if the roots of \`x² + px + q\` are α and β, find the value of
α²β + αβ²* → αβ(α + β) = q × (−p).

**Everything reduces to symmetric sums.** Learn Vieta and the question becomes arithmetic.

---

## Layer 6 — data sufficiency and quantity comparison (Mains)

**Data Sufficiency (Mains, 3–4 questions):**

Each question gives two statements and asks for the answer. Rules:
- If **either** statement alone is sufficient → answer **1**.
- If **both together** are sufficient but neither alone is → **2**.
- If **both together** are still not sufficient → **3**.
- The statements are numbered (I) and (II) — you cannot mix a statement from one
  question with another.

**Quantity Comparison:** two quantities A and B, and you answer whether A > B, A < B,
A = B, or cannot be determined. **Always try to answer in terms of a variable** and see
whether the comparison holds for all values of the variable. If it flips for some value,
the answer is "cannot be determined".

---

## Exam traps by topic

| Topic | Trap |
|---|---|
| DI | Scale errors — forgetting "in thousands" |
| DI | Comparing years with different totals |
| Caselet | Not fixing a base unit, and drowning in unknowns |
| Simplification | \`0.2 × 0.3\` computed as 0.05 |
| Simplification | Approximating when the options are within 2% |
| Number series | Forcing a pattern onto the wrong terms |
| Percentage change | Adding two successive changes instead of multiplying |
| Average speed | Using the arithmetic mean of two speeds |
| P&L | The "same price, x% profit and x% loss" trap |
| SI/CI | Assuming SI and CI are equal for 1 year |
| Quadratic | Forgetting the sign in x + y = −b/a |
| Data sufficiency | Using statement I from a different question |

---

## Practice plan

| Weeks | What to do |
|---|---|
| 1–2 | Percentage, ratio, average, P&L, SI/CI. 30 questions a day, no timer. |
| 3–4 | Speed. Simplification and approximation drills. Memorise the fraction set. |
| 5–6 | DI. One caselet a day for 10 days. Then full DI sets, timed at 20 minutes. |
| 7–8 | Number series (30 a day), quadratic equations, time & work, TSD. |
| 9–10 | Permutation/combination, probability, mensuration, ages, number system. |
| 11+ | Mixed sets of 35, timed at 20 minutes, then full Prelims mocks. |

**Every arithmetic topic needs a calculator-free drill.** Do 20 questions a day with a
stopwatch and a penalty for using a calculator. Speed is a skill, not a personality trait.
`,n={id:e,body:t};export{t as body,n as default,e as id};