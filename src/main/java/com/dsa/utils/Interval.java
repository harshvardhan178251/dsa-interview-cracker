package com.dsa.utils;

/**
 * Half-open interval {@code [start, end)} used by the interval problems.
 */
public class Interval implements Comparable<Interval> {

    public int start;
    public int end;

    public Interval(int start, int end) {
        this.start = start;
        this.end = end;
    }

    public int length() {
        return end - start;
    }

    /** True when the two intervals overlap (touching endpoints do not overlap). */
    public boolean overlaps(Interval other) {
        return start < other.end && other.start < end;
    }

    @Override
    public int compareTo(Interval o) {
        int byStart = Integer.compare(start, o.start);
        return byStart != 0 ? byStart : Integer.compare(end, o.end);
    }

    @Override
    public String toString() {
        return "[" + start + ", " + end + ")";
    }
}
