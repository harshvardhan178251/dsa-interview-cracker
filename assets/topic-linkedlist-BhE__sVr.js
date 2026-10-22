var e=`topic:linkedlist`,t=`
# Linked lists — concept notes

## The mental model

A linked list is a chain of nodes. In Java:

\`\`\`java
public class ListNode {
    int val;
    ListNode next;
}
\`\`\`

**The structural differences from an array:**

| | Array | Linked list |
|---|---|---|
| Random access | O(1) | O(n) |
| Insert at the head | O(n) | O(1) |
| Insert after a node | O(n) | **O(1)** |
| Size | fixed | dynamic |
| Memory | contiguous | scattered |

**The one operation a linked list is uniquely good at: inserting or deleting a node when
you already hold a reference to its predecessor.** O(1), no shifting.

**Java has no manual memory management.** The GC handles it, so you never need to free a
node. But you still need to worry about **breaking a cycle** if you reassign \`next\`
without saving the old pointer.

---

## The four patterns

### 1. The dummy head

The single most useful trick in linked-list problems.

\`\`\`java
ListNode dummy = new ListNode(0);
dummy.next = head;
// ... do your work ...
return dummy.next;
\`\`\`

**Why:** every "delete the head", "remove the first", or "insert at the front" case
special-cases the head node. The dummy head makes the head an ordinary node, so you
write **one** code path instead of two.

**The dry-run rule:** always show the dummy head in the trace. The moment the list is
\`[1] → [2] → [3]\`, say "the dummy head points at 1, and I am looking at node 2, so I
will make \`dummy.next = 3\`."

**When you must use it:** deleting a node from a list, removing all duplicates, adding a
node at the front, reversing (sometimes), partition.

### 2. Fast and slow pointers

\`\`\`java
ListNode slow = head, fast = head;
while (fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;
}
\`\`\`

**What it finds:**

| Problem | What to look for |
|---|---|
| Cycle | \`fast == slow\` → there is a cycle |
| Cycle entry | Reset \`slow\` to head, advance both one step → they meet at the entry |
| Middle element | \`slow\` ends at the middle |
| Middle of an even list | Decide which middle — the 2nd is the common convention |
| Palindrome | Reverse the second half with slow/fast, then compare |
| nth from end | Advance \`fast\` n steps first, then move both |

**Why the cycle-entry trick works:** in a cycle of length L, the fast pointer travels
twice as far as the slow one, so when they meet, the slow pointer has travelled L steps
more than it needs to. Resetting it to the head and advancing both one step at a time
means they meet exactly at the entry.

**The safety check is \`fast != null && fast.next != null\`** — never \`fast.next.next\`
without checking \`fast.next\` first. This is the classic NPE in these problems.

### 3. Two pointers

For "reverse the second half", "find the kth from the end", "partition".

\`\`\`java
// Reverse the nodes from the kth to the end
ListNode reverseBetween(ListNode head, int k) {
    if (head == null || k <= 1) return head;
    ListNode dummy = new ListNode(0);
    dummy.next = head;
    ListNode prev = dummy;
    for (int i = 0; i < k - 1 && prev.next != null; i++) prev = prev.next;
    if (prev.next == null) return head;

    ListNode tail = prev.next;
    ListNode curr = tail.next;
    prev.next = null;
    while (curr != null) {
        ListNode next = curr.next;
        curr.next = prev.next;
        prev.next = curr;
        curr = next;
    }
    tail.next = null;
    return dummy.next;
}
\`\`\`

**The invariant:** \`prev\` is always the node *before* the part being reversed, and
\`tail\` is the last node of the reversed section.

### 4. Recursion

**Recursion is a linked-list technique**, not just a tree technique. The list is a
recursive structure, so recursive solutions are often shorter.

\`\`\`java
// Reverse recursively
public static ListNode reverseRecursively(ListNode head) {
    if (head == null || head.next == null) return head;
    ListNode newHead = reverseRecursively(head.next);
    head.next.next = head;
    head.next = null;
    return newHead;
}
\`\`\`

**How to explain it:** "The recursive call reverses everything after \`head\` and returns the
new head of that reversed list. I then make the old second node point back at \`head\`, and
point \`head\` at null."

**The stack depth is O(n)** — for a 10⁵-element list, that can overflow. Say so in the
interview: "the iterative version avoids the stack depth risk at the cost of being less
elegant."

---

## Reversal: the three variants

| Variant | Problem | Technique |
|---|---|---|
| **Reverse the whole list** | LC 206 | Three pointers: \`prev\`, \`curr\`, \`next\` |
| **Reverse between two positions** | LC 92 | Dummy head + partial reversal |
| **Reverse k nodes at a time** | LC 25 | Group reversal with a pointer to the previous group's tail |

**Whole list, three pointers:**

\`\`\`java
public static ListNode reverse(ListNode head) {
    ListNode prev = null;
    ListNode curr = head;
    while (curr != null) {
        ListNode next = curr.next;   // save before we overwrite
        curr.next = prev;            // flip
        prev = curr;                 // advance
        curr = next;
    }
    return prev;                     // the new head
}
\`\`\`

**The three-pointer invariant:** \`prev\` is the head of the already-reversed prefix,
\`curr\` is the first node of the not-yet-reversed suffix, and \`next\` is \`curr\`'s original
successor.

**The bug everybody makes:** writing \`curr.next = prev\` before saving \`curr.next\`. Save
first.

---

## Merging and adding

**Merge two sorted lists — the dummy head again:**

\`\`\`java
ListNode dummy = new ListNode(0);
ListNode tail = dummy;
while (l1 != null && l2 != null) {
    if (l1.val <= l2.val) { tail.next = l1; l1 = l1.next; }
    else                 { tail.next = l2; l2 = l2.next; }
    tail = tail.next;
}
tail.next = (l1 != null) ? l1 : l2;
return dummy.next;
\`\`\`

**The \`tail.next = l1 != null ? l1 : l2\` line** attaches the remaining tail — the most
commonly forgotten step.

**Add Two Numbers (LC 2)** — digits are in reverse order, so you add from the head and
carry forward. A dummy head makes the first digit easy.

**Add Two Numbers II (LC 445)** — digits are in forward order, so you add from the tail.
Two options:

1. **Reverse both lists**, add, reverse the result. Simple and O(n).
2. **Use stacks** — push both onto stacks, pop and add from the least significant digit.

The stack version avoids the reversal and is the more elegant answer. It is also the
better interview answer, because it shows you chose the approach that matches the data.

**The carry loop:**

\`\`\`java
int carry = 0;
while (!s1.isEmpty() || !s2.isEmpty() || carry != 0) {
    int sum = carry;
    if (!s1.isEmpty()) { sum += s1.pop(); }
    if (!s2.isEmpty()) { sum += s2.pop(); }
    carry = sum / 10;
    result.push(sum % 10);
}
\`\`\`

**The \`|| carry != 0\` in the loop condition** is the detail that handles a final carry
producing an extra digit. Missing it is the classic bug.

---

## In-place algorithms

**Reorder List (LC 143):** find the middle, reverse the second half, then interleave.

\`\`\`
1 → 2 → 3 → 4 → 5        split at 3
1 → 2 → 3 ⇄ 4 → 5        reverse the second half
1 → 4 → 2 → 5 → 3        interleave
\`\`\`

**Split the list in half first** — that is the fast/slow pointer again.

**Odd Even Linked List (LC 328):** two tails, one for odd indices and one for even.
Maintain \`oddTail\` and \`evenTail\` and append each node to the right one.

**Flatten a multilevel list:** DFS with a stack, or a recursive merge.

**Copy List with Random Pointer (LC 138):** three-pass with a hash map, or the O(1)
interweaving trick:

\`\`\`java
// 1. weave a copy of each node after the original
for (ListNode cur = head; cur != null; ) {
    ListNode copy = new ListNode(cur.val);
    copy.next = cur.next;
    cur.next = copy;
    cur = copy.next;
}
// 2. assign the random pointers using the original's random pointer
for (ListNode cur = head; cur != null; cur = cur.next.next) {
    cur.next.random = (cur.random == null) ? null : cur.random.next;
}
// 3. split the two lists apart
\`\`\`

**This is a genuinely elegant problem.** The hash-map version is O(n) space; the
interweaving version is O(1) space. Offer both.

---

## Common traps

| Trap | Why it bites |
|---|---|
| Losing the \`next\` pointer before reassigning it | Save \`next\` first |
| Not checking \`fast.next\` before \`fast.next.next\` | NPE on an odd-length list |
| Forgetting the dummy head's \`next\` when returning | Return \`dummy.next\`, not \`dummy\` |
| Off-by-one in "remove the nth from the end" | \`fast\` should advance n steps, then both move |
| Modifying \`val\` when the problem wanted a new node | Read the wording carefully |
| Assuming the list is not empty | Guard every \`head\` dereference |
| Returning the old head after reversing | The new head is the **old tail** |
| Forgetting to attach the remaining list when merging | \`tail.next = l1 != null ? l1 : l2\` |
| Forgetting the \`carry != 0\` in the addition loop | A final carry is dropped |
| Comparing \`node == null\` on a \`ListNode\` | Use \`node == null\`, and check \`node.next\` too |

---

## Complexity cheat sheet

| Operation | Time |
|---|---|
| Traverse | O(n) |
| Find the middle | O(n) |
| Find the kth from the end | O(n) |
| Reverse in place | O(n) time, O(1) space |
| Merge two sorted lists | O(n + m) time, O(1) space |
| Detect a cycle | O(n) time, O(1) space |
| Reverse k-group | O(n) time, O(k) space for the pointers |
| Insert after a known node | O(1) |
| Delete a known node | O(1) — but you cannot delete the head without a dummy |

---

## How to crack it in an interview

1. **Say the structure out loud:** "each node has a value and a pointer to the next."
2. **Ask about the head** — is it guaranteed non-null? Can the list be empty?
3. **Check for cycles** if the problem involves multiple traversals.
4. **Announce your technique:** "I'll use a dummy head so the head case needs no special
   handling", or "fast and slow pointers to find the middle".
5. **State the invariant** at each step of the loop.
6. **Draw the list** for the interviewer if the pointer juggling is non-trivial. It is
   completely normal to say "let me draw this to make sure I get the pointer order
   right" — it is better than fumbling silently.
7. **Mention the recursion version** and why you chose the iterative one (or vice versa).
`,n={id:e,body:t};export{t as body,n as default,e as id};