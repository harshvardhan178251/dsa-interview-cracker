var e=`topic:stacks`,t=`
# Stacks — concept notes

## The mental model

LIFO: last in, first out. In Java, use \`Deque<Integer> stack = new ArrayDeque<>()\` —
**not** \`Stack\` or \`Vector\` (both legacy, both \`synchronized\`).

\`\`\`java
Deque<Integer> stack = new ArrayDeque<>();
stack.push(1);       // addFirst
stack.pop();         // removeFirst → throws NoSuchElementException if empty
stack.peek();        // element → throws if empty
stack.isEmpty();
\`\`\`

**\`ArrayDeque\` does not permit \`null\`.** That is usually fine, but it is worth knowing.

## When a stack is the answer

A stack is right when the problem has one of these shapes:

- **Nested structure** — brackets, parentheses, tags, HTML/XML.
- **Undo/redo** — each action pushed, popped to undo.
- **Reversal** — push all, pop all.
- **Expression evaluation** — infix to postfix, or evaluating postfix directly.
- **Backtracking** — the current path is a stack.
- **Monotonic property** — when the next element to act on is determined by the previous ones.

---

## Monotonic stack

The most valuable stack technique, and the one interviewers love.

**The idea:** maintain a stack whose elements are in a **monotonic order** (strictly
increasing or strictly decreasing). When the current element breaks the order, pop and
process.

**The classic: Next Greater Element (LC 496).**

\`\`\`java
for (int i = 0; i < nums.length; i++) {
    while (!stack.isEmpty() && nums[stack.peek()] < nums[i]) {
        result[stack.pop()] = nums[i];      // nums[i] is the next greater for stack.peek()
    }
    stack.push(i);
}
\`\`\`

**What is on the stack?** Not values — **indices**. You need the index to write the
answer.

**The invariant:** the stack holds indices of elements that are still waiting for their
next greater element, in decreasing order of value. When \`nums[i]\` pops the top, it is
the first greater element for that index — because anything earlier was already smaller.

**Why "first"?** Because the stack is in decreasing order, the top is the smallest of
the waiting elements, so it is the first to be satisfied. Any element deeper in the stack
has a larger value, and it would need an even larger \`nums[i]\` — but \`nums[i]\` is already
popping the smaller ones.

**The next-greater pattern (LC 503) is the same with a circular scan:** push the indices
twice, or iterate \`2n\` steps and modulo.

**Daily Temperatures (LC 739)** is the same algorithm, counting days instead of storing
values.

### Other monotonic-stack problems

| Problem | Stack holds | Direction |
|---|---|---|
| Next Greater Element (496) | indices | decreasing |
| Next Greater Element II (503) | indices, circular | decreasing |
| Daily Temperatures (739) | indices | decreasing |
| Largest Rectangle in Histogram (84) | indices | increasing |
| Trapping Rain Water (42) | indices | decreasing |
| Remove Duplicate Letters (316) | characters | — |
| Asteroid Collision (735) | asteroids | — |

---

## Largest Rectangle in Histogram (LC 84)

The hardest common stack problem, and worth knowing well.

**The idea:** for each bar, the largest rectangle with that bar as the shortest side
extends until a **smaller** bar stops it. A stack of **increasing heights** (with
indices) tracks which bars are still open.

\`\`\`java
public static int largestRectangleArea(int[] heights) {
    Deque<Integer> stack = new ArrayDeque<>();   // indices, increasing heights
    int maxArea = 0;

    for (int i = 0; i <= heights.length; i++) {
        int currentHeight = (i == heights.length) ? 0 : heights[i];
        while (!stack.isEmpty() && heights[stack.peek()] >= currentHeight) {
            int height = heights[stack.pop()];
            int left = stack.isEmpty() ? -1 : stack.peek();
            int width = i - left - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        stack.push(i);
    }
    return maxArea;
}
\`\`\`

**The sentinel trick:** the loop runs one extra time with \`currentHeight = 0\`, which pops
everything remaining. Without it, bars at the end of the array are never closed out.

**The width calculation:** \`i - left - 1\`. The right boundary is \`i - 1\` (the bar that
stopped us) and the left boundary is \`stack.peek()\` after the pop. So the width is
\`i - left - 1\`.

**The invariant:** the stack holds indices with strictly increasing heights. When a bar
pops, the rectangle of that height cannot extend past the current index or the new stack
top.

**The dry run must show the stack contents and the computed area at each pop.** That is
the only way to convey it.

---

## Trapping Rain Water (LC 42)

Two solutions, both worth knowing.

**Two pointers (O(1) space):**

\`\`\`java
int left = 0, right = heights.length - 1;
int leftMax = 0, rightMax = 0;
int water = 0;
while (left < right) {
    if (heights[left] < heights[right]) {
        leftMax = Math.max(leftMax, heights[left]);
        water += leftMax - heights[left];
        left++;
    } else {
        rightMax = Math.max(rightMax, heights[right]);
        water += rightMax - heights[right];
        right--;
    }
}
\`\`\`

**The reasoning:** if \`heights[left] < heights[right]\`, the right side has a tall wall
already, so the water at \`left\` is determined by the tallest wall seen so far on the
left. Symmetrically for the right.

**Prefix/suffix maxima (O(n) space) — easier to explain:**

\`\`\`java
int[] leftMax = new int[n], rightMax = new int[n];
leftMax[0] = heights[0];
for (int i = 1; i < n; i++) leftMax[i] = Math.max(leftMax[i-1], heights[i]);
rightMax[n-1] = heights[n-1];
for (int i = n-2; i >= 0; i--) rightMax[i] = Math.max(rightMax[i+1], heights[i]);

int water = 0;
for (int i = 0; i < n; i++) {
    water += Math.min(leftMax[i], rightMax[i]) - heights[i];
}
\`\`\`

**The formula:** water at index \`i\` = \`min(tallest left wall, tallest right wall) − heights[i]\`.

**Offer the two-pointer version as the optimisation of the prefix/suffix version.** That
narrative is exactly what an interviewer wants.

---

## Expression evaluation

### Reverse Polish notation (LC 150)

\`\`\`java
Deque<Integer> stack = new ArrayDeque<>();
for (String token : tokens) {
    if (isOperator(token)) {
        int b = stack.pop();      // right operand first!
        int a = stack.pop();      // then left
        stack.push(apply(token, a, b));
    } else {
        stack.push(Integer.parseInt(token));
    }
}
return stack.pop();
\`\`\`

**The operand order is the bug.** For subtraction and division, the **second** pop is the
left operand.

**Why a stack?** Because postfix is exactly a stack machine — the operators arrive after
their operands.

### Basic Calculator (LC 224) and II (LC 227)

**LC 224** — handle \`+\`, \`-\`, parentheses, and spaces. The classic approach:

\`\`\`java
int result = 0, sign = 1, num = 0;
Deque<Integer> stack = new ArrayDeque<>();
for (char c : expression.toCharArray()) {
    if (Character.isDigit(c)) {
        num = num * 10 + (c - '0');
    } else if (c == '+' || c == '-') {
        result += sign * num;
        num = 0;
        sign = (c == '+') ? 1 : -1;
    } else if (c == '(') {
        stack.push(result);
        stack.push(sign);
        result = 0;
        sign = 1;
    } else if (c == ')') {
        result += sign * num;
        num = 0;
        result *= stack.pop();   // apply the sign
        result += stack.pop();   // add the outer accumulated result
        sign = 1;
    }
}
return result + sign * num;
\`\`\`

**The stack holds the outer context** — the accumulated result and the sign before each
\`(\`.

**LC 227** — no parentheses, but \`*\` and \`/\`. The trick: keep a running \`last\` operand
and apply multiplication/division immediately, deferring only \`+\`/\`-\`:

\`\`\`java
int result = 0, last = 0, num = 0;
char op = '+';
for (int i = 0; i <= expression.length(); i++) {
    char c = (i == expression.length()) ? '+' : expression.charAt(i);
    if (Character.isDigit(c)) {
        num = num * 10 + (c - '0');
    }
    if ((c != ' ' && !Character.isDigit(c)) || i == expression.length()) {
        switch (op) {
            case '+': result += last; last = num; break;
            case '-': result += last; last = -num; break;
            case '*': last = last * num; break;
            case '/': last = last / num; break;
        }
        op = c;
        num = 0;
    }
}
return result + last;
\`\`\`

**The \`i <= length\` with a sentinel \`'+'\`** flushes the last number.

### Decode String (LC 394)

Nested \`k[substring]\`. Stack of (count, current string) pairs:

\`\`\`java
Deque<Integer> counts = new ArrayDeque<>();
Deque<StringBuilder> parts = new ArrayDeque<>();

for (char c : s.toCharArray()) {
    if (Character.isDigit(c)) {
        count = count * 10 + (c - '0');
    } else if (c == '[') {
        counts.push(count); count = 0;
        parts.push(current); current = new StringBuilder();
    } else if (c == ']') {
        StringBuilder prev = parts.pop();
        int k = counts.pop();
        prev.append(current.toString().repeat(k));
        current = prev;
    } else {
        current.append(c);
    }
}
\`\`\`

**The stack saves the outer context** — the same idea as the basic calculator.

---

## Valid parentheses (LC 20)

\`\`\`java
Deque<Character> stack = new ArrayDeque<>();
for (char c : s.toCharArray()) {
    if (c == '(' || c == '[' || c == '{') {
        stack.push(c);
    } else {
        if (stack.isEmpty()) return false;
        char open = stack.pop();
        if (!matches(open, c)) return false;
    }
}
return stack.isEmpty();
\`\`\`

**Two failure modes:** a closing bracket with an empty stack, and leftover opening
brackets at the end. Check both.

**The dry run should show the stack contents after each character.** That is the entire
content of the problem.

---

## Min Stack (LC 155)

**A stack that supports \`getMin()\` in O(1).**

Two designs:

**1. Store the min with every element** — a parallel stack or a \`Stack<(value, min)>\`:

\`\`\`java
public void push(int val) {
    stack.push(val);
    if (minStack.isEmpty() || val <= minStack.peek()) minStack.push(val);
}
public int getMin() { return minStack.peek(); }
\`\`\`

Space O(n), simple, correct.

**2. Store the difference** — clever but fragile. Skip it in an interview unless asked.

**The follow-up:** "design a stack that supports \`getMedian\` in O(1)" — two heaps, one
max-heap and one min-heap, with the max-heap holding one extra element. That is the
[heap notes](06-heaps.md) problem.

---

## Common traps

| Trap | Why it bites |
|---|---|
| Using \`Stack\`/\`Vector\` instead of \`ArrayDeque\` | Legacy, slower, \`synchronized\` |
| Popping from an empty stack | \`NoSuchElementException\` — check \`isEmpty()\` first |
| \`ArrayDeque\` and \`null\` | \`NullPointerException\` — do not push null |
| Forgetting to flush the stack at the end (LC 84) | Bars at the end never get their area computed |
| Wrong operand order in RPN | The **second** pop is the left operand |
| Computing the width as \`i - left\` | It is \`i - left - 1\` |
| Storing values instead of indices in a monotonic stack | You cannot write the answer without the index |
| Forgetting to reset the accumulator at \`(\` | The inner expression overwrites the outer result |
| Off-by-one in the number of centres for palindromes | It is \`2n − 1\` |

---

## Complexity cheat sheet

| Operation | Time |
|---|---|
| push, pop, peek | O(1) |
| \`ArrayDeque\` growth | O(1) amortised |
| Balanced-bracket validation | O(n) |
| Next greater element | O(n) — each element is pushed and popped once |
| Largest rectangle in histogram | O(n) |
| Trapping rain water (two pointers) | O(n) time, O(1) space |
| RPN evaluation | O(n) |
| Basic calculator | O(n) |
| Decode string | O(n + output size) |

**The amortised argument is worth saying once:** a stack operation is O(1) amortised,
because a push that triggers a resize copies at most 2× the elements, spread over many
operations.

---

## How to crack it in an interview

1. **Name the pattern:** "this is a monotonic stack problem" / "this is a nested structure,
   so a stack".
2. **Say what the stack holds** — values, indices, or a pair. This is the key design
   decision and saying it aloud gets you the "yes, that's right" from the interviewer.
3. **State the invariant:** "the stack holds indices of elements still waiting for their
   next greater element, in decreasing order of value".
4. **Handle the boundary carefully** — the sentinel \`0\` in the histogram problem, the
   empty-stack case in the brackets problem.
5. **Trace the stack contents**, not just the final answer.
`,n={id:e,body:t};export{t as body,n as default,e as id};