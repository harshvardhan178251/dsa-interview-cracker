var e=`topic:queues`,t=`
# Queues and deques — concept notes

## The mental model

In Java, use \`ArrayDeque\` for everything queue-like:

\`\`\`java
Deque<Integer> queue = new ArrayDeque<>();
queue.addLast(x);      // enqueue
queue.pollFirst();     // dequeue — throws if empty
queue.peekFirst();     // front — throws if empty
queue.addFirst(x);     // push front
queue.pollLast();      // pop back
\`\`\`

**\`ArrayDeque\` does not permit \`null\`** and is not thread-safe.

\`LinkedList\` implements \`Queue\` and \`Deque\` and allows nulls, but it is slower and almost
never the right choice. \`PriorityQueue\` is a different thing entirely — see the
[heap notes](06-heaps.md).

---

## When a queue is the answer

- **Level-order traversal** of a tree or graph — BFS.
- **Processing in arrival order** — a work queue, a task queue.
- **Fixed-size buffers** — a circular array.
- **Sliding windows** — a deque where you add at the back and remove from the front.
- **Producer/consumer** — a bounded queue with blocking semantics.

---

## Implement a queue using stacks

**Amortised O(1) with two stacks** — the classic.

\`\`\`java
public class MyQueue {
    private final Deque<Integer> inStack = new ArrayDeque<>();
    private final Deque<Integer> outStack = new ArrayDeque<>();

    public void push(int x) {
        inStack.push(x);
    }

    public int pop() {
        if (outStack.isEmpty()) {
            while (!inStack.isEmpty()) {
                outStack.push(inStack.pop());
            }
        }
        if (outStack.isEmpty()) throw new NoSuchElementException();
        return outStack.pop();
    }

    public int peek() {
        if (outStack.isEmpty()) {
            while (!inStack.isEmpty()) {
                outStack.push(inStack.pop());
            }
        }
        if (outStack.isEmpty()) throw new NoSuchElementException();
        return outStack.peek();
    }

    public boolean empty() {
        return inStack.isEmpty() && outStack.isEmpty();
    }
}
\`\`\`

**The idea:** push everything into \`inStack\`. When you need to pop, transfer everything
from \`inStack\` to \`outStack\` — that reverses the order, so the oldest element is now on
top of \`outStack\`. After the transfer, \`outStack\` serves all pops until it is empty.

**Amortised O(1):** each element is pushed onto \`inStack\` once, transferred to \`outStack\`
once, and popped once. So the total work is O(n) over n operations.

**The follow-up:** *"Can you do it in O(1) per operation, worst case?"* — no, not with two
stacks. There is a lower bound argument: you cannot know which element is oldest without
touching it. Say so honestly; it shows you understand the amortisation.

---

## Implement a stack using queues

**One queue, rotate on push:**

\`\`\`java
public class MyStack {
    private final Deque<Integer> queue = new ArrayDeque<>();

    public void push(int x) {
        queue.addLast(x);
        for (int i = 0; i < queue.size() - 1; i++) {
            queue.addLast(queue.pollFirst());
        }
    }

    public int pop() {
        return queue.pollFirst();
    }

    public int top() {
        return queue.peekFirst();
    }

    public boolean empty() {
        return queue.isEmpty();
    }
}
\`\`\`

**Push is O(n)**, pop and top are O(1). **Two queues** flips that: push is O(1), pop is
O(n). Neither gives O(1) for everything — the same lower bound applies.

**Say which trade-off you chose and why.** If pushes are more frequent, use two queues;
if pops are more frequent, use the single-queue version.

---

## Implement a deque using two stacks

\`\`\`java
public class MyDeque {
    private final Deque<Integer> front = new ArrayDeque<>();
    private final Deque<Integer> back = new ArrayDeque<>();

    public void addFirst(int x) {
        if (front.isEmpty()) back.push(x); else front.push(x);
    }

    public void addLast(int x) {
        if (back.isEmpty()) front.push(x); else back.push(x);
    }

    public int removeFirst() {
        if (front.isEmpty()) {
            while (!back.isEmpty()) front.push(back.pop());
        }
        return front.pop();
    }

    public int removeLast() {
        if (back.isEmpty()) {
            while (!front.isEmpty()) back.push(front.pop());
        }
        return back.pop();
    }
}
\`\`\`

**The invariant:** at most one of the two stacks is non-empty at any time. When one is
empty and you need to serve from it, you transfer everything from the other.

**The asymmetry:** \`front\` holds elements in the correct order for removal from the front,
\`back\` holds them for removal from the back. When you add to one side while the other is
empty, you must flip.

---

## Circular queue

The fixed-capacity version — a very common design question.

\`\`\`java
public class MyCircularQueue {
    private final int[] data;
    private int head = 0;
    private int size = 0;

    public MyCircularQueue(int capacity) {
        this.data = new int[capacity];
    }

    public boolean enQueue(int value) {
        if (isFull()) return false;
        data[(head + size) % data.length] = value;
        size++;
        return true;
    }

    public boolean deQueue() {
        if (isEmpty()) return false;
        head = (head + 1) % data.length;
        size--;
        return true;
    }

    public int front() {
        return isEmpty() ? -1 : data[head];
    }

    public int rear() {
        return isEmpty() ? -1 : data[(head + size - 1) % data.length];
    }

    public boolean isEmpty() { return size == 0; }
    public boolean isFull()  { return size == data.length; }
}
\`\`\`

**The modulo is what makes it circular.** \`data[(head + size) % capacity]\` is the next
write position, and it wraps automatically.

**Alternative: keep the array full and waste one slot.** Then \`head == tail\` means empty
and you need a separate \`count\` for the full case. The \`size\` field above avoids that
ambiguity at a cost of one integer — a good trade.

**The alternative that avoids modulo entirely:** increment and reset on overflow:

\`\`\`java
private int next(int index) {
    index++;
    if (index == data.length) index = 0;
    return index;
}
\`\`\`

Modulo is clearer; the branch version is marginally faster. Say which you prefer and why.

---

## Sliding window maximum (LC 239) — the monotonic deque

This is the problem that makes deques famous.

\`\`\`java
public static int[] maxSlidingWindow(int[] nums, int k) {
    Deque<Integer> dq = new ArrayDeque<>();   // indices, decreasing values
    int[] result = new int[nums.length - k + 1];

    for (int i = 0; i < nums.length; i++) {
        // 1. remove indices outside the window
        while (!dq.isEmpty() && dq.peekFirst() <= i - k) {
            dq.pollFirst();
        }
        // 2. remove dominated indices
        while (!dq.isEmpty() && nums[dq.peekLast()] <= nums[i]) {
            dq.pollLast();
        }
        dq.addLast(i);
        // 3. record the maximum
        if (i >= k - 1) {
            result[i - k + 1] = nums[dq.peekFirst()];
        }
    }
    return result;
}
\`\`\`

**The invariant:** the deque holds indices of the current window, in increasing index
order and strictly decreasing value order. The front is always the maximum.

**Why we can remove from the back:** if \`nums[j] <= nums[i]\` and \`j < i\`, then \`j\` is
useless — any future window containing \`j\` also contains \`i\` (since \`i\` is newer and
expires later), and \`nums[i]\` is at least as large. So \`j\` can never be the answer.

**Why we remove from the front:** the index has fallen out of the window.

**Each index is added once and removed at most once**, so the whole thing is O(n).

**The dry run must show the deque contents after each step** — the domination removal is
the part people find hard.

---

## BFS and the queue

BFS is the canonical queue algorithm:

\`\`\`java
Deque<Node> queue = new ArrayDeque<>();
queue.add(start);
while (!queue.isEmpty()) {
    Node current = queue.poll();
    // process
    for (Node next : current.neighbours()) {
        if (!visited.contains(next)) {
            visited.add(next);
            queue.add(next);
        }
    }
}
\`\`\`

**Mark visited when you enqueue, not when you dequeue.** Marking on dequeue lets a node
be enqueued twice.

**Use \`ArrayDeque\`, not \`LinkedList\`, for BFS.** It has better cache behaviour and no
per-node allocation.

**The \`Queue\` interface vs \`Deque\`:** \`Queue<Integer> q = new ArrayDeque<>()\` gives you
the queue API; \`Deque\` gives you both ends. For BFS you only need one end.

---

## Priority queues are not queues

A \`PriorityQueue\` is a **heap**, not a FIFO queue. \`poll()\` removes the *smallest*
element, not the oldest. This trips people up constantly.

\`\`\`java
PriorityQueue<Integer> pq = new PriorityQueue<>();   // min-heap
PriorityQueue<Integer> pq = new PriorityQueue<>(Comparator.reverseOrder());   // max-heap
\`\`\`

See the [heap notes](06-heaps.md).

---

## Common traps

| Trap | Why it bites |
|---|---|
| Using \`PriorityQueue\` where FIFO order is needed | It orders by priority, not arrival |
| Using \`LinkedList\` as a queue when \`ArrayDeque\` would do | Slower, more allocation |
| Marking visited on dequeue instead of on enqueue | Nodes get enqueued multiple times |
| Allowing \`null\` in an \`ArrayDeque\` | \`NullPointerException\` |
| Forgetting the modulo in a circular queue | Overwrites existing entries |
| Confusing the amortised complexity of the two-stack queue | Each element moves once, not once per operation |
| Not removing dominated elements from the monotonic deque | The front is no longer the maximum |
| Using a \`Queue\` where you need \`Deque\` semantics | No \`addFirst\`/\`pollLast\` |

---

## Complexity cheat sheet

| Operation | Time |
|---|---|
| enqueue, dequeue, peek | O(1) |
| Two-stack queue push | O(1) |
| Two-stack queue pop | O(1) amortised, O(n) worst case |
| Single-queue stack push | O(n) |
| Single-queue stack pop | O(1) |
| Circular queue enqueue/dequeue | O(1) |
| BFS on a graph with V vertices, E edges | O(V + E) |
| Sliding window maximum | O(n) — each index enters and leaves the deque once |
| PriorityQueue add / poll | O(log n) |

---

## How to crack it in an interview

1. **Say what ordering you need.** FIFO, LIFO, or priority? These lead to completely
   different structures, and saying it out loud is half the answer.
2. **Name the structure:** "a single \`ArrayDeque\` as the backing store", "two stacks with
   a transfer", "a fixed-size circular array".
3. **State the amortisation** for the two-stack queue: "each element is pushed, moved and
   popped exactly once, so it is O(1) amortised".
4. **Mention the space trade-off** for the stack-from-queue variants: O(n) auxiliary space
   is the price.
5. **For BFS**, say "visited set, marked on enqueue" — it shows you know the common bug.
`,n={id:e,body:t};export{t as body,n as default,e as id};