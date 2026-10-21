package com.dsa.greedy;

import com.dsa.utils.FastScanner;

/**
 * Problem: Gas Station
 * LeetCode: 134 | Difficulty: Medium | Frequency: 4/5
 * Pattern: Greedy, Prefix-sum reset
 *
 * <p>Problem:
 * There are {@code n} gas stations in a circle. Station {@code i} has
 * {@code gas[i]} units of fuel and the trip from station {@code i} to station
 * {@code i+1} costs {@code cost[i]}. Starting with an empty tank, return the index of
 * the station from which the circuit can be completed, or {@code -1} when it is
 * impossible.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * gas[0] gas[1] ... gas[n-1]
 * cost[0] cost[1] ... cost[n-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 2 3 4 5
 * 3 4 5 1 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 3
 * </pre>
 *
 * <p>Approach: keep the running tank of the current candidate start. Whenever the tank
 * goes negative the candidate start is impossible, so restart from the next station.
 * If the total of {@code gas - cost} is negative no circuit exists at all.
 *
 * <p>Complexity: Time O(n), Space O(1).
 */
public class GasStation {

    /**
     * Returns the index of a station from which the whole circuit can be driven.
     *
     * @param gas  fuel available at each station
     * @param cost fuel needed to drive from each station to the next
     * @return a valid starting index, or {@code -1} when the circuit is impossible
     */
    public static int canCompleteCircuit(int[] gas, int[] cost) {
        if (gas == null || cost == null || gas.length == 0 || gas.length != cost.length) {
            return -1;
        }
        int total = 0;   // fuel left over after a full lap
        int tank = 0;    // fuel left over since the current candidate start
        int start = 0;
        for (int i = 0; i < gas.length; i++) {
            int diff = gas[i] - cost[i];
            total += diff;
            tank += diff;
            if (tank < 0) {
                start = i + 1;   // station i cannot be the start, try the next one
                tank = 0;
            }
        }
        return total >= 0 ? start % gas.length : -1;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] gas = fs.nextIntArray(n);
        int[] cost = fs.nextIntArray(n);

        System.out.println(canCompleteCircuit(gas, cost));
    }
}
