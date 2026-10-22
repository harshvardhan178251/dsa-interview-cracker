var e=`concurrency.SingletonDoubleCheckedLocking`,t=`package com.dsa.concurrency;

import com.dsa.utils.FastScanner;

import java.util.concurrent.CountDownLatch;

/**
 * Problem: Singleton with Double-Checked Locking
 * LeetCode: null | Difficulty: Medium | Frequency: 4/5
 * Pattern: Concurrency, Double-checked locking, Safe publication
 *
 * <p>Problem:
 * Create a thread safe singleton with the classic double-checked locking pattern: the
 * fast path reads the instance without taking a lock, the slow path takes the class lock
 * and checks again. The instance field must be {@code volatile} so that the write of the
 * reference and the writes done by the constructor are published safely.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 * {@code n} is the number of threads that race for the instance. The program prints two
 * numbers: the number of distinct instances the threads observed and the number of
 * threads that saw a partially constructed instance. With the {@code volatile} field
 * both are {@code 1} and {@code 0}.
 *
 * <p>Sample input:
 * <pre>
 * 8
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 0
 * </pre>
 *
 * <p>Approach: every thread calls {@code getInstance()} at the same time, released by a
 * {@link CountDownLatch}. The first thread that enters the synchronized block builds the
 * instance and publishes it with a volatile write; every other thread sees that write
 * and, because it is volatile, also sees the fields the constructor wrote.
 *
 * <p>Complexity: Time O(1) after the instance exists, Space O(1).
 */
public class SingletonDoubleCheckedLocking {

    /** The one and only instance — volatile is what makes the pattern safe. */
    private static volatile SingletonDoubleCheckedLocking instance;

    /** How often the constructor ran; only touched under the class monitor. */
    private static int constructions;

    /** Written last by the constructor, so a badly published instance shows up here. */
    private boolean ready;

    private final int id;

    private SingletonDoubleCheckedLocking() {
        constructions++;
        this.id = constructions;
        // A real constructor does some work; that is exactly what makes an unsafe
        // publication visible to another thread.
        this.ready = true;
    }

    /** The classic double-checked locking accessor. */
    public static SingletonDoubleCheckedLocking getInstance() {
        if (instance == null) {                 // first check: no lock
            synchronized (SingletonDoubleCheckedLocking.class) {
                if (instance == null) {         // second check: under the lock
                    instance = new SingletonDoubleCheckedLocking();
                }
            }
        }
        return instance;
    }

    /** True when the constructor finished before this instance was handed out. */
    public boolean isReady() {
        return ready;
    }

    /** The creation order of this instance. */
    public int id() {
        return id;
    }

    /** How often the constructor of the safe singleton ran. */
    public static int constructions() {
        return constructions;
    }

    /**
     * The broken variant: the field is <em>not</em> volatile, so a second thread may
     * observe a non-null reference to an instance whose constructor has not finished.
     */
    public static final class UnsafeSingleton {
        private static UnsafeSingleton unsafeInstance; // deliberately not volatile
        private boolean ready;

        private UnsafeSingleton() {
            ready = true;
        }

        public static UnsafeSingleton getInstance() {
            if (unsafeInstance == null) {
                synchronized (UnsafeSingleton.class) {
                    if (unsafeInstance == null) {
                        unsafeInstance = new UnsafeSingleton();
                    }
                }
            }
            return unsafeInstance;
        }

        public boolean isReady() {
            return ready;
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int threads = Math.max(1, fs.nextInt());

        SingletonDoubleCheckedLocking[] observed = new SingletonDoubleCheckedLocking[threads];
        boolean[] ready = new boolean[threads];
        CountDownLatch start = new CountDownLatch(1);
        CountDownLatch done = new CountDownLatch(threads);

        for (int i = 0; i < threads; i++) {
            final int slot = i;
            Thread thread = new Thread(() -> {
                try {
                    start.await();
                    SingletonDoubleCheckedLocking mine = getInstance();
                    observed[slot] = mine;
                    ready[slot] = mine.isReady();
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                } finally {
                    done.countDown();
                }
            }, "racer-" + i);
            thread.start();
        }

        start.countDown();
        done.await();

        int distinct = 0;
        int partial = 0;
        for (int i = 0; i < threads; i++) {
            if (observed[i] == null) {
                continue;
            }
            boolean known = false;
            for (int j = 0; j < i; j++) {
                if (observed[j] == observed[i]) {
                    known = true;
                    break;
                }
            }
            if (!known) {
                distinct++;
            }
            if (!ready[i]) {
                partial++;
            }
        }

        System.out.println(distinct + " " + partial);
    }
}
`,n=`import java.util.concurrent.CountDownLatch;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Problem: Singleton with Double-Checked Locking
 * LeetCode: null | Difficulty: Medium | Frequency: 4/5
 * Pattern: Concurrency, Double-checked locking, Safe publication
 *
 * <p>Problem:
 * Create a thread safe singleton with the classic double-checked locking pattern: the
 * fast path reads the instance without taking a lock, the slow path takes the class lock
 * and checks again. The instance field must be {@code volatile} so that the write of the
 * reference and the writes done by the constructor are published safely.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * </pre>
 * {@code n} is the number of threads that race for the instance. The program prints two
 * numbers: the number of distinct instances the threads observed and the number of
 * threads that saw a partially constructed instance. With the {@code volatile} field
 * both are {@code 1} and {@code 0}.
 *
 * <p>Sample input:
 * <pre>
 * 8
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 0
 * </pre>
 *
 * <p>Approach: every thread calls {@code getInstance()} at the same time, released by a
 * {@link CountDownLatch}. The first thread that enters the synchronized block builds the
 * instance and publishes it with a volatile write; every other thread sees that write
 * and, because it is volatile, also sees the fields the constructor wrote.
 *
 * <p>Complexity: Time O(1) after the instance exists, Space O(1).
 */
public class Main {

    /** The one and only instance — volatile is what makes the pattern safe. */
    private static volatile Main instance;

    /** How often the constructor ran; only touched under the class monitor. */
    private static int constructions;

    /** Written last by the constructor, so a badly published instance shows up here. */
    private boolean ready;

    private final int id;

    private Main() {
        constructions++;
        this.id = constructions;
        // A real constructor does some work; that is exactly what makes an unsafe
        // publication visible to another thread.
        this.ready = true;
    }

    /** The classic double-checked locking accessor. */
    public static Main getInstance() {
        if (instance == null) {                 // first check: no lock
            synchronized (Main.class) {
                if (instance == null) {         // second check: under the lock
                    instance = new Main();
                }
            }
        }
        return instance;
    }

    /** True when the constructor finished before this instance was handed out. */
    public boolean isReady() {
        return ready;
    }

    /** The creation order of this instance. */
    public int id() {
        return id;
    }

    /** How often the constructor of the safe singleton ran. */
    public static int constructions() {
        return constructions;
    }

    /**
     * The broken variant: the field is <em>not</em> volatile, so a second thread may
     * observe a non-null reference to an instance whose constructor has not finished.
     */
    public static final class UnsafeSingleton {
        private static UnsafeSingleton unsafeInstance; // deliberately not volatile
        private boolean ready;

        private UnsafeSingleton() {
            ready = true;
        }

        public static UnsafeSingleton getInstance() {
            if (unsafeInstance == null) {
                synchronized (UnsafeSingleton.class) {
                    if (unsafeInstance == null) {
                        unsafeInstance = new UnsafeSingleton();
                    }
                }
            }
            return unsafeInstance;
        }

        public boolean isReady() {
            return ready;
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int threads = Math.max(1, fs.nextInt());

        Main[] observed = new Main[threads];
        boolean[] ready = new boolean[threads];
        CountDownLatch start = new CountDownLatch(1);
        CountDownLatch done = new CountDownLatch(threads);

        for (int i = 0; i < threads; i++) {
            final int slot = i;
            Thread thread = new Thread(() -> {
                try {
                    start.await();
                    Main mine = getInstance();
                    observed[slot] = mine;
                    ready[slot] = mine.isReady();
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                } finally {
                    done.countDown();
                }
            }, "racer-" + i);
            thread.start();
        }

        start.countDown();
        done.await();

        int distinct = 0;
        int partial = 0;
        for (int i = 0; i < threads; i++) {
            if (observed[i] == null) {
                continue;
            }
            boolean known = false;
            for (int j = 0; j < i; j++) {
                if (observed[j] == observed[i]) {
                    known = true;
                    break;
                }
            }
            if (!known) {
                distinct++;
            }
            if (!ready[i]) {
                partial++;
            }
        }

        System.out.println(distinct + " " + partial);
    }
}

// ---------- inlined com.dsa.utils.FastScanner ----------
/**
 * Allocation-light scanner for contest-style stdin input.
 *
 * <p>Every problem in this repository reads its input through this class so the
 * expected stdin format stays consistent across the whole set.
 *
 * <p>Typical usage:
 * <pre>{@code
 * FastScanner fs = new FastScanner(System.in);
 * int n = fs.nextInt();
 * int[] nums = fs.nextIntArray(n);
 * }</pre>
 */
class FastScanner {

    private final BufferedReader reader;
    private final char[] buffer = new char[1 << 16];
    private int ptr = 0;
    private int len = 0;

    public FastScanner(InputStream in) {
        this.reader = new BufferedReader(new InputStreamReader(in, StandardCharsets.UTF_8), 1 << 16);
    }

    /** Returns the next raw character, or -1 at end of input. */
    private int read() throws IOException {
        if (ptr >= len) {
            len = reader.read(buffer);
            ptr = 0;
            if (len <= 0) {
                return -1;
            }
        }
        return buffer[ptr++];
    }

    private void skipWhitespace() throws IOException {
        int c;
        while ((c = read()) != -1) {
            if (!Character.isWhitespace(c)) {
                ptr--; // step back onto the first meaningful character
                return;
            }
        }
    }

    /** True when at least one more non-whitespace character exists. */
    public boolean hasNext() throws IOException {
        skipWhitespace();
        return ptr < len;
    }

    /** Reads the next whitespace-delimited token as a string. */
    public String next() throws IOException {
        skipWhitespace();
        StringBuilder sb = new StringBuilder();
        int c;
        while ((c = read()) != -1 && !Character.isWhitespace(c)) {
            sb.append((char) c);
        }
        return sb.toString();
    }

    public int nextInt() throws IOException {
        skipWhitespace();
        int c = read();
        while (c != -1 && c != '-' && (c < '0' || c > '9')) {
            c = read();
        }
        int sign = 1;
        if (c == '-') {
            sign = -1;
            c = read();
        }
        int value = 0;
        while (c >= '0' && c <= '9') {
            value = value * 10 + (c - '0');
            c = read();
        }
        return sign * value;
    }

    public long nextLong() throws IOException {
        skipWhitespace();
        int c = read();
        while (c != -1 && c != '-' && (c < '0' || c > '9')) {
            c = read();
        }
        int sign = 1;
        if (c == '-') {
            sign = -1;
            c = read();
        }
        long value = 0;
        while (c >= '0' && c <= '9') {
            value = value * 10 + (c - '0');
            c = read();
        }
        return sign * value;
    }

    public double nextDouble() throws IOException {
        return Double.parseDouble(next());
    }

    public char nextChar() throws IOException {
        skipWhitespace();
        int c = read();
        return c == -1 ? '\\0' : (char) c;
    }

    /** Reads exactly {@code n} integers. */
    public int[] nextIntArray(int n) throws IOException {
        int[] out = new int[n];
        for (int i = 0; i < n; i++) {
            out[i] = nextInt();
        }
        return out;
    }

    /** Reads exactly {@code n} longs. */
    public long[] nextLongArray(int n) throws IOException {
        long[] out = new long[n];
        for (int i = 0; i < n; i++) {
            out[i] = nextLong();
        }
        return out;
    }

    /** Reads exactly {@code n} whitespace-delimited strings. */
    public String[] nextStringArray(int n) throws IOException {
        String[] out = new String[n];
        for (int i = 0; i < n; i++) {
            out[i] = next();
        }
        return out;
    }
}
`,r=`
# Singleton with Double-Checked Locking

| | |
|---|---|
| **Difficulty** | Medium |
| **Pattern** | Concurrency · Double-checked locking · Safe publication |
| **Interview heat** | ★★★★☆ |
| **Asked at** | Amazon, Google, Meta, Uber, Oracle |

## Problem Statement

Create a thread safe singleton with the classic **double-checked locking** pattern:

- the fast path reads the instance field **without taking a lock**,
- the slow path takes the class lock and checks the field **again** before creating the
  instance.

The pattern is only correct if the field is \`volatile\`. Explain why, and show that the
instance is created exactly once and that no thread ever observes a partially constructed
object.

## Input Format

\`\`\`
n
\`\`\`

- \`n\` — the number of threads that race for the instance.

The program prints two numbers:

1. the number of **distinct instances** the threads observed — with a correct
   implementation this is always \`1\`;
2. the number of threads that saw a **partially constructed** instance — with a correct
   implementation this is always \`0\`.

## Sample Input

\`\`\`
8
\`\`\`

## Expected Output

\`\`\`
1 0
\`\`\`

Eight threads race for the instance; exactly one instance exists and every thread sees
the fully constructed object.

## Approach — double check plus \`volatile\`

\`\`\`java
private static volatile SingletonDoubleCheckedLocking instance;

public static SingletonDoubleCheckedLocking getInstance() {
    if (instance == null) {                 // 1st check: no lock, the fast path
        synchronized (SingletonDoubleCheckedLocking.class) {
            if (instance == null) {         // 2nd check: under the lock
                instance = new SingletonDoubleCheckedLocking();
            }
        }
    }
    return instance;
}
\`\`\`

The first check makes the *steady state* (the instance already exists) lock-free: after
the initialisation, every caller only does a volatile read.

### Why \`volatile\` is not optional

Without \`volatile\`, the write \`instance = new SingletonDoubleCheckedLocking()\` can be
**reordered** by the compiler and the CPU so that it becomes visible *before* the
constructor has finished writing the fields. A second thread can then see a non-null
reference to an object whose fields are still the default values — a *partially
constructed* instance.

\`volatile\` fixes exactly that:

1. the write to \`instance\` is a **release** — everything the constructor wrote before it
   is visible to any thread that reads \`instance\`;
2. the read of \`instance\` is an **acquire** — the reader is guaranteed to see the
   constructor's writes.

The synchronisation on the class monitor alone is **not** enough, because the fast path
does not take the lock at all.

This is exactly the rule the Java Memory Model states: *"an object is safely published
through a volatile field or through a lock, but not through an unsynchronised field."*

### The demonstration

The constructor writes a \`ready\` flag **last**. Every thread that receives the instance
checks the flag:

- with \`volatile\` the flag is always \`true\` — the instance is fully constructed,
- without \`volatile\` a thread can observe \`ready == false\` — the bug is visible.

The program reports both numbers, so the difference is measurable, not just theoretical.

## Dry Run

\`n = 8\`. The table shows **one valid interleaving**. The rows move from run to run; the
two numbers never do.

| Step | Thread | Fast path \`instance == null\`? | Monitor | Action | \`instance\` after | Thread sees \`ready\` |
|---:|---|---|---|---|---|---|
| 1 | T0 | yes | free | enters the \`synchronized\` block | \`null\` | — |
| 2 | T1 | yes | held by T0 | **blocks** on the monitor | \`null\` | — |
| 3 | T2…T7 | yes | held by T0 | block on the monitor | \`null\` | — |
| 4 | T0 | — | held by T0 | second check: still \`null\` → \`new SingletonDoubleCheckedLocking()\` → constructor runs → \`ready = true\` | the new instance | — |
| 5 | T0 | — | held by T0 | \`instance = new …\` (**volatile write** — publishes the constructor's writes), exit the block | the new instance | \`true\` |
| 6 | T1 | — | acquired | second check: \`instance != null\` → skip the creation | the new instance | \`true\` |
| 7 | T2 | **no** — the volatile read sees the instance | free | skip the block entirely, return the instance | the new instance | \`true\` |
| 8 | T3…T7 | no | free | same as T2 | the new instance | \`true\` |

Result: **1 distinct instance, 0 partially constructed observations.**

### The same race without \`volatile\`

| Step | Thread | Action | What T1 can see |
|---:|---|---|---|
| 1 | T0 | \`new SingletonDoubleCheckedLocking()\` — the reference is stored, the constructor has not finished | — |
| 2 | T1 | reads \`instance\` — **not null**, so it skips the lock entirely | an instance whose \`ready\` flag is still \`false\` |
| 3 | T0 | the constructor finishes, \`ready = true\` | — |

T1 used the instance before it was fully constructed. With \`volatile\` the write of
\`instance\` cannot become visible before the constructor's writes.

## Java Solution

See [\`SingletonDoubleCheckedLocking.java\`](./SingletonDoubleCheckedLocking.java).

\`\`\`java
private static volatile SingletonDoubleCheckedLocking instance;

public static SingletonDoubleCheckedLocking getInstance() {
    if (instance == null) {                 // 1st check: no lock
        synchronized (SingletonDoubleCheckedLocking.class) {
            if (instance == null) {         // 2nd check: under the lock
                instance = new SingletonDoubleCheckedLocking();
            }
        }
    }
    return instance;
}
\`\`\`

The driver releases all the threads at the same time with a \`CountDownLatch\`, counts the
distinct instances **by identity** (not by \`equals\`), and counts the threads that saw a
\`ready == false\` instance.

## Complexity

| | Value | Why |
|---|---|---|
| **Time** | O(1) after the first call | a volatile read in the fast path |
| **Space** | O(1) | one instance |

## Interview Notes

**Follow-ups to raise yourself:**
- *"How would you do it without \`synchronized\`?"* → an \`enum\` singleton (the JVM
  guarantees the initialisation) or an \`AtomicReference\` with \`compareAndSet\`.
- *"What is the holder idiom?"* → a static nested class with the instance in a static
  final field; the class initialisation lock guarantees thread safety and laziness, and
  it is the fastest variant.
- *"Does \`synchronized\` on the method suffice?"* → \`public static synchronized getInstance()\`
  is correct but **always** takes the lock — the double check exists to avoid that.
- *"Why is the second check inside the lock necessary?"* → without it, two threads could
  both see \`null\` and both create an instance.
- *"What about reflection and \`clone\`?"* → the classic ways to break a singleton; the
  answers are an enum, a defensive \`readResolve\`, or a module system.

**Common mistakes:**
- ❌ Forgetting \`volatile\` → the broken pattern that looks right and passes a
  single-threaded test.
- ❌ Making the field \`final\` — \`final\` does not help here, because the problem is the
  *publication* of a partially constructed object.
- ❌ Using \`instance == null\` twice but with the check *outside* the lock only.
- ❌ Synchronizing on an instance field instead of the class object.
- ❌ Believing \`synchronized getInstance()\` on a non-static method works — it would lock
  on different objects.

**How to narrate:**
> "Double-checked locking needs three things: a \`volatile\` field, the check outside the
> lock for the fast path, and the second check inside the lock. The \`volatile\` is the
> interesting part: it guarantees that the write of the reference also publishes
> everything the constructor wrote, so no thread can see a half-built object. Without it
> the write of the reference can be reordered before the constructor's writes, and the
> fast path — which takes no lock — can hand out a broken instance."

## Related Problems

- [Atomic Counter](./AtomicCounter.md) — \`volatile\` versus atomics, the same memory model
- [Bounded Blocking Queue](./BoundedBlockingQueue.md) — the lock and condition pattern
- [Semaphore](../design/SemaphoreClass.java) — the monitor based
  pattern
`,i=[`getInstance`,`constructions`,`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};