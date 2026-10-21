package com.dsa.design;

import com.dsa.utils.FastScanner;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.TreeMap;

/**
 * Problem: Design Underground System
 * LeetCode: 373 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Design, Aggregation with a sorted map
 *
 * <p>Problem:
 * Track the average travel time between every pair of stations. Each customer checks in
 * at a start station and checks out at an end station; the trip duration is known.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * start end t
 * start end t
 * ...
 * </pre>
 * Every line is one completed trip: the start station, the end station and the duration.
 * The program prints one line per station pair, sorted by start station then end
 * station, formatted as {@code start end average}.
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 1 2 4
 * 1 3 8
 * 1 2 6
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1 2 5.00
 * 1 3 8.00
 * </pre>
 *
 * <p>Approach: a nested {@link TreeMap} keyed by start station and then end station keeps
 * the pairs sorted for output; each cell stores the running total time and the number of
 * trips. The average is the quotient of the two.
 *
 * <p>Complexity: Time O(log p) per trip for p station pairs, Space O(p).
 */
public class DesignUndergroundSystem {

    /** Running total time and trip count of one station pair. */
    private static final class Stats {
        long total;
        long count;

        Stats(long total, long count) {
            this.total = total;
            this.count = count;
        }
    }

    private final TreeMap<Integer, TreeMap<Integer, Stats>> stats = new TreeMap<>();

    /** Records a completed trip and returns the new average for that station pair. */
    public double recordTrip(int startStation, int endStation, int travelTime) {
        Stats cell = stats
                .computeIfAbsent(startStation, k -> new TreeMap<>())
                .computeIfAbsent(endStation, k -> new Stats(0, 0));
        cell.total += travelTime;
        cell.count++;
        return average(startStation, endStation);
    }

    /** The average travel time between two stations, or {@code 0} when nothing was recorded. */
    public double average(int startStation, int endStation) {
        TreeMap<Integer, Stats> inner = stats.get(startStation);
        if (inner == null) {
            return 0.0;
        }
        Stats cell = inner.get(endStation);
        if (cell == null || cell.count == 0) {
            return 0.0;
        }
        return (double) cell.total / cell.count;
    }

    /** Number of distinct station pairs seen so far. */
    public int pairCount() {
        int pairs = 0;
        for (Map.Entry<Integer, TreeMap<Integer, Stats>> outer : stats.entrySet()) {
            pairs += outer.getValue().size();
        }
        return pairs;
    }

    /** Formats an average the same way on every machine and locale. */
    public static String format(double average) {
        return String.format(Locale.ROOT, "%.2f", average);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        DesignUndergroundSystem system = new DesignUndergroundSystem();
        for (int i = 0; i < n; i++) {
            int start = fs.nextInt();
            int end = fs.nextInt();
            int travelTime = fs.nextInt();
            system.recordTrip(start, end, travelTime);
        }

        StringBuilder out = new StringBuilder();
        for (Map.Entry<Integer, TreeMap<Integer, Stats>> outer : system.stats.entrySet()) {
            for (Map.Entry<Integer, Stats> inner : outer.getValue().entrySet()) {
                out.append(outer.getKey())
                        .append(' ')
                        .append(inner.getKey())
                        .append(' ')
                        .append(format((double) inner.getValue().total / inner.getValue().count))
                        .append('\n');
            }
        }
        System.out.print(out);
    }
}
