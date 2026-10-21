package com.dsa.greedy;

import com.dsa.utils.FastScanner;

import java.util.Arrays;
import java.util.PriorityQueue;

/**
 * Problem: Minimum Number of Refueling Stops
 * LeetCode: 871 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Greedy, Max-heap simulation
 *
 * <p>Problem:
 * A car has to travel {@code target} miles east. It starts with {@code startFuel} litres
 * in an unlimited tank and burns one litre per mile. Station {@code i} sits
 * {@code distance[i]} miles from the start and offers {@code fuel[i]} litres. Refuelling
 * at a station takes the whole offer and counts as one stop. Return the minimum number
 * of stops, or {@code -1} when the target cannot be reached.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * distance[0] fuel[0]
 * distance[1] fuel[1]
 * ...
 * distance[n-1] fuel[n-1]
 * target
 * startFuel
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 10 60
 * 20 30
 * 30 30
 * 60 40
 * 100
 * 10
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: drive as far as the fuel collected so far allows and remember every
 * station that has been passed in a max-heap. When the tank runs dry, refuel at the
 * passed station with the most fuel — that single choice reaches at least as far as
 * any other single choice would.
 *
 * <p>Complexity: Time O(n log n), Space O(n).
 */
public class MinimumNumberOfRefuelingStops {

    /**
     * Returns the minimum number of refuelling stops needed to reach {@code target}.
     *
     * @param target    distance of the destination
     * @param startFuel fuel in the tank when the car starts
     * @param stations  station distances and fuel amounts
     * @return the minimum number of stops, or {@code -1} when the target is unreachable
     */
    public static int minRefuelStops(int target, int startFuel, int[][] stations) {
        if (target <= 0) {
            return 0;
        }
        if (stations == null || stations.length == 0) {
            return startFuel >= target ? 0 : -1;
        }
        int[][] sorted = stations.clone();
        Arrays.sort(sorted, (a, b) -> Integer.compare(a[0], b[0]));

        PriorityQueue<Integer> fuel = new PriorityQueue<>((a, b) -> b - a);   // max-heap
        int stops = 0;
        int previous = 0;      // last position the car stood at
        int tank = startFuel;
        for (int i = 0; i <= sorted.length; i++) {
            int position = (i < sorted.length) ? sorted[i][0] : target;
            tank -= position - previous;
            while (tank < 0 && !fuel.isEmpty()) {
                tank += fuel.poll();   // refuel at the best station passed so far
                stops++;
            }
            if (tank < 0) {
                return -1;      // not enough fuel to even reach this checkpoint
            }
            if (i < sorted.length) {
                fuel.offer(sorted[i][1]);
                previous = sorted[i][0];
            }
        }
        return stops;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[][] stations = new int[n][2];
        for (int i = 0; i < n; i++) {
            stations[i][0] = fs.nextInt();
            stations[i][1] = fs.nextInt();
        }
        int target = fs.nextInt();
        int startFuel = fs.nextInt();

        System.out.println(minRefuelStops(target, startFuel, stations));
    }
}
