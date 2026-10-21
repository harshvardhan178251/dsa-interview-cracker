package com.dsa.greedy;

import com.dsa.utils.FastScanner;

import java.util.Arrays;

/**
 * Problem: Maximum Units on a Truck
 * LeetCode: none (USACO "Delivering Cookies" style) | Difficulty: Easy | Frequency: 2/5
 * Pattern: Greedy, Sort by value per unit
 *
 * <p>Problem:
 * A truck can carry {@code truckSize} boxes. Box type {@code i} exists in
 * {@code quantities[i]} copies and every copy holds {@code unitsPerBox[i]} units.
 * Return the maximum number of units the truck can carry.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * quantities[0] quantities[1] ... quantities[n-1]
 * unitsPerBox[0] unitsPerBox[1] ... unitsPerBox[n-1]
 * truckSize
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 1 2 3
 * 3 2 1
 * 4
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 8
 * </pre>
 *
 * <p>Approach: every box occupies exactly one slot of the truck, so a box that holds
 * more units is always at least as good as one that holds fewer. Take the boxes with
 * the largest {@code unitsPerBox} first until the truck is full.
 *
 * <p>Complexity: Time O(n log n), Space O(n).
 */
public class MaximumUnitsOnATruck {

    /**
     * Returns the maximum number of units the truck can carry.
     *
     * @param quantities   number of boxes of every type
     * @param unitsPerBox  units carried by one box of every type
     * @param truckSize    number of boxes the truck can hold
     * @return the maximum number of units
     */
    public static int maximumUnits(int[] quantities, int[] unitsPerBox, int truckSize) {
        if (quantities == null || unitsPerBox == null || truckSize <= 0) {
            return 0;
        }
        int n = Math.min(quantities.length, unitsPerBox.length);
        Integer[] order = new Integer[n];
        for (int i = 0; i < n; i++) {
            order[i] = i;
        }
        Arrays.sort(order, (a, b) -> Integer.compare(unitsPerBox[b], unitsPerBox[a]));

        int slots = truckSize;
        int units = 0;
        for (int i : order) {
            if (slots == 0) {
                break;
            }
            int taken = Math.min(slots, quantities[i]);
            units += taken * unitsPerBox[i];
            slots -= taken;
        }
        return units;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] quantities = fs.nextIntArray(n);
        int[] unitsPerBox = fs.nextIntArray(n);
        int truckSize = fs.nextInt();

        System.out.println(maximumUnits(quantities, unitsPerBox, truckSize));
    }
}
