package com.dsa.heaps;

import com.dsa.utils.FastScanner;
import com.dsa.utils.MaxHeap;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Problem: Employee Free Day
 * LeetCode: 1497 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Greedy interval selection, Bounded heap
 *
 * <p>Problem:
 * Every event has a start day, an end day and the id of the employee who wants to attend
 * it. An employee may attend several events as long as no two of them overlap, and the
 * events are inclusive — {@code [1, 2]} and {@code [2, 3]} <em>do</em> overlap. Return
 * the maximum total number of events that all employees can attend together.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * start end employeeId
 * ...
 * </pre>
 * {@code n} is the number of events; every event is one line with its start day, its end
 * day and the employee id.
 *
 * <p>Sample input:
 * <pre>
 * 8
 * 1 2 1
 * 2 3 1
 * 3 4 1
 * 3 5 1
 * 1 3 2
 * 2 4 2
 * 3 5 2
 * 4 6 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 4
 * </pre>
 *
 * <p>Approach: the employees are independent, so solve the problem per employee and add
 * the answers. For one employee the events are sorted by end day and scanned greedily:
 * an event is taken when it starts strictly after the end of the last taken event. A
 * max-heap of the end days of the taken events plays the role of the "last end day"
 * pointer and also counts the answer.
 *
 * <p>Complexity: Time O(n log n), Space O(n).
 */
public class EmployeeFreeDay {

    /**
     * Returns the maximum number of events that can be attended.
     *
     * @param events one entry per event: {@code {startDay, endDay, employeeId}}
     * @return the total number of attendable events
     */
    public static int maxEvents(int[][] events) {
        if (events == null || events.length == 0) {
            return 0;
        }

        Map<Integer, List<int[]>> byEmployee = new LinkedHashMap<>();
        for (int[] event : events) {
            byEmployee.computeIfAbsent(event[2], key -> new ArrayList<>()).add(event);
        }

        int total = 0;
        for (List<int[]> employeeEvents : byEmployee.values()) {
            // Earliest end day first: the classic activity-selection greedy.
            employeeEvents.sort(Comparator.comparingInt(event -> event[1]));

            // The heap keeps the end days of the accepted events. Its maximum is the
            // end day of the last accepted event, and its size is the number of
            // accepted events.
            MaxHeap<Integer> accepted = new MaxHeap<>();
            for (int[] event : employeeEvents) {
                if (accepted.isEmpty() || accepted.peek() < event[0]) {
                    accepted.add(event[1]);
                }
            }
            total += accepted.size();
        }
        return total;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        int[][] events = new int[n][];
        for (int i = 0; i < n; i++) {
            events[i] = new int[]{fs.nextInt(), fs.nextInt(), fs.nextInt()};
        }

        System.out.println(maxEvents(events));
    }
}
