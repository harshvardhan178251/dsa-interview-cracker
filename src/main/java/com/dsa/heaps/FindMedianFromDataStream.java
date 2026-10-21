package com.dsa.heaps;

import com.dsa.utils.FastScanner;
import com.dsa.utils.MaxHeap;
import com.dsa.utils.MinHeap;

/**
 * Problem: Find Median from Data Stream
 * LeetCode: 295 | Difficulty: Hard | Frequency: 5/5
 * Pattern: Two heaps, Order statistics
 *
 * <p>Problem:
 * Support adding numbers to a stream and reporting the **median** of all the numbers
 * added so far, in O(1) amortised time per operation.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * v0 v1 ... v(n-1)
 * </pre>
 * {@code n} is the number of values; the n values are inserted one by one, in the order
 * they are read.
 *
 * <p>Sample input:
 * <pre>
 * 5
 * 1 2 3 4 5
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 1.0
 * 1.5
 * 2.0
 * 2.5
 * 3.0
 * </pre>
 *
 * <p>Approach: keep two heaps — a max-heap {@code lower} with the smaller half of the
 * values and a min-heap {@code upper} with the larger half. {@code lower} always holds
 * either the same number of elements as {@code upper} or exactly one more, so the median
 * is either {@code lower}'s maximum or the average of the two heap tops.
 *
 * <p>Complexity: Time O(log n) per insertion, O(1) per median, Space O(n).
 */
public class FindMedianFromDataStream {

    /** A median finder backed by two heaps. */
    public static class MedianFinder {

        /** The smaller half — its maximum is the lower median. */
        private final MaxHeap<Integer> lower = new MaxHeap<>();

        /** The larger half — its minimum is the upper median. */
        private final MinHeap<Integer> upper = new MinHeap<>();

        /** Adds one number to the stream. */
        public void addNum(int value) {
            lower.add(value);
            upper.add(lower.poll());
            if (upper.size() > lower.size()) {
                lower.add(upper.poll());
            }
        }

        /** The median of everything added so far. */
        public double findMedian() {
            if (lower.isEmpty()) {
                throw new IllegalStateException("no numbers added yet");
            }
            if (lower.size() > upper.size()) {
                return lower.peek();
            }
            return (lower.peek() + upper.peek()) / 2.0;
        }

        /** The median formatted as {@code X.0} or {@code X.5}. */
        public String medianText() {
            double median = findMedian();
            if (median == Math.floor(median) && !Double.isInfinite(median)) {
                return ((long) median) + ".0";
            }
            return String.valueOf(median);
        }

        /** Debug helper: the lower half, largest first. */
        public String lowerState() {
            return lower.asList().toString();
        }

        /** Debug helper: the upper half, smallest first. */
        public String upperState() {
            return upper.asList().toString();
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        MedianFinder finder = new MedianFinder();
        for (int i = 0; i < n; i++) {
            finder.addNum(fs.nextInt());
            System.out.println(finder.medianText());
        }
    }
}
