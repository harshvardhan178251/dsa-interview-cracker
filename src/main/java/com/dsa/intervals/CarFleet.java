package com.dsa.intervals;

import com.dsa.utils.FastScanner;

import java.util.Arrays;

/**
 * Problem: Car Fleet
 * LeetCode: 1491 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Greedy, Fleet time from the back
 *
 * <p>Problem:
 * {@code n} cars drive towards a target at position {@code target}. Car {@code i} starts
 * at {@code position[i]} and drives at {@code speed[i]}. A car that catches up with the
 * car in front of it joins its fleet and can never go faster than that fleet. Return
 * the number of fleets that reach the target.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * position[0] speed[0]
 * position[1] speed[1]
 * ...
 * position[n-1] speed[n-1]
 * target
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 4
 * 0 4
 * 2 2
 * 4 1
 * 6 3
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: process the cars from the one closest to the target backwards. The
 * arrival time of a car is {@code (target - position) / speed}. If a car would arrive
 * later than the fleet in front of it, it catches up and joins that fleet; if it would
 * arrive earlier it forms a new fleet that the cars behind have to catch.
 *
 * <p>Complexity: Time O(n log n), Space O(n).
 */
public class CarFleet {

    /**
     * Returns the number of fleets that reach the target.
     *
     * @param target    position of the target
     * @param positions start position of every car
     * @param speeds    speed of every car
     * @return the number of fleets
     */
    public static int carFleet(int target, int[] positions, int[] speeds) {
        if (positions == null || speeds == null || positions.length == 0
                || positions.length != speeds.length) {
            return 0;
        }
        int n = positions.length;
        Integer[] order = new Integer[n];
        for (int i = 0; i < n; i++) {
            order[i] = i;
        }
        // closest to the target first
        Arrays.sort(order, (a, b) -> Integer.compare(positions[b], positions[a]));

        int fleets = 0;
        double fleetTime = 0;   // arrival time of the fleet directly ahead
        for (int i : order) {
            double time = (double) (target - positions[i]) / speeds[i];
            if (time > fleetTime) {
                fleets++;            // this car is slower, it starts a new fleet
                fleetTime = time;
            }
            // otherwise it catches up with the fleet ahead and joins it
        }
        return fleets;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] positions = new int[n];
        int[] speeds = new int[n];
        for (int i = 0; i < n; i++) {
            positions[i] = fs.nextInt();
            speeds[i] = fs.nextInt();
        }
        int target = fs.nextInt();

        System.out.println(carFleet(target, positions, speeds));
    }
}
