package com.dsa.heaps;

import com.dsa.utils.FastScanner;
import com.dsa.utils.MaxHeap;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Task Scheduler
 * LeetCode: 621 | Difficulty: Medium | Frequency: 5/5
 * Pattern: Greedy scheduling, Max-heap with cooldown
 *
 * <p>Problem:
 * Given a list of tasks (uppercase letters) and a cooldown {@code k}, the same task may
 * not run twice within {@code k} slots. Return the minimum number of time slots needed
 * to run all the tasks.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * task0 task1 ... task(n-1)
 * k
 * </pre>
 * {@code n} is the number of tasks; the n task letters follow (whitespace separated),
 * then the cooldown.
 *
 * <p>Sample input:
 * <pre>
 * 6
 * A A B C D D
 * 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 6
 * </pre>
 *
 * <p>Approach: always run the task with the most remaining occurrences. A max-heap holds
 * the remaining count of every task; a small queue holds the tasks that are cooling down
 * together with the number of slots they still have to wait. When the heap runs dry the
 * only thing left to do is wait for the shortest cooldown to expire.
 *
 * <p>Complexity: Time O(n log m) with m distinct tasks, Space O(m).
 */
public class TaskScheduler {

    /** A task with its remaining number of occurrences. */
    public static class Task {
        public final char letter;
        public int remaining;

        public Task(char letter, int remaining) {
            this.letter = letter;
            this.remaining = remaining;
        }

        @Override
        public String toString() {
            return letter + "x" + remaining;
        }
    }

    /** A task that is cooling down, with the number of slots it still has to wait. */
    public static class Cooldown {
        public int remaining;
        public final Task task;

        public Cooldown(int remaining, Task task) {
            this.remaining = remaining;
            this.task = task;
        }
    }

    /**
     * Returns the minimum number of slots needed to run all the tasks.
     *
     * @param tasks the task letters
     * @param k     the cooldown: the same task may not repeat within k slots
     * @return the minimum number of slots
     */
    public static int leastInterval(char[] tasks, int k) {
        if (tasks == null || tasks.length == 0) {
            return 0;
        }
        if (k <= 0) {
            return tasks.length;
        }

        int[] counts = new int[26];
        for (char task : tasks) {
            counts[task - 'A']++;
        }

        // The heap is ordered by remaining count, so its top is the most urgent task.
        MaxHeap<Task> heap = new MaxHeap<Task>(
                (a, b) -> Integer.compare(a.remaining, b.remaining));
        for (int i = 0; i < 26; i++) {
            if (counts[i] > 0) {
                heap.add(new Task((char) ('A' + i), counts[i]));
            }
        }

        // Tasks that are cooling down, with the slots they still have to wait.
        Deque<Cooldown> cooling = new ArrayDeque<>();
        int slots = 0;

        while (!heap.isEmpty() || !cooling.isEmpty()) {
            // Release the task whose cooldown expired.
            if (!cooling.isEmpty() && cooling.peek().remaining == 0) {
                heap.add(cooling.poll().task);
            }

            if (heap.isEmpty()) {
                if (cooling.isEmpty()) {
                    break;
                }
                // Nothing can run - idle until the next task is ready.
                int wait = cooling.peek().remaining;
                for (Cooldown entry : cooling) {
                    entry.remaining -= wait;
                }
                slots += wait;
                continue;
            }

            slots++;
            for (Cooldown entry : cooling) {
                entry.remaining--;
            }

            Task current = heap.poll();
            current.remaining--;
            if (current.remaining > 0) {
                cooling.addLast(new Cooldown(k, current));
            }
        }
        return slots;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        char[] tasks = new char[n];
        for (int i = 0; i < n; i++) {
            tasks[i] = fs.nextChar();
        }
        int k = fs.nextInt();

        System.out.println(leastInterval(tasks, k));
    }
}
