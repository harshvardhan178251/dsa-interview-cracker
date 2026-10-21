package com.dsa.design;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.List;

/**
 * Problem: Snapshot Array
 * LeetCode: 1146 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Design, Versioned history per index
 *
 * <p>Problem:
 * Support a snapshot array: {@code set(index, value)} stores a new value and
 * {@code get(index, snap_id)} returns the value that index had at the given snapshot.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * idx val
 * idx val
 * ...
 * snap_id
 * snap_idx
 * </pre>
 * {@code n} is both the length of the array and the number of set operations. The
 * {@code i}-th set operation belongs to snapshot {@code i + 1}, so snapshot {@code 0} is
 * the pristine array full of zeros. The last two values are the snapshot id and the
 * index to query.
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 0 5
 * 1 6
 * 0 7
 * 3
 * 0
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 7
 * </pre>
 *
 * <p>Approach: every index keeps its own history list of {@code (snapshotId, value)}
 * pairs, appended in increasing snapshot order. A read walks the list and keeps the last
 * value whose snapshot id is not greater than the requested one — which is exactly the
 * value the index had at that snapshot.
 *
 * <p>Complexity: Time O(1) per set, O(log s) per get with binary search or O(s) with a
 * linear scan, Space O(number of sets).
 */
public class SnapshotArray {

    /** One recorded write: the snapshot id it belongs to and the value written. */
    private static final class Version {
        final int snapId;
        final int value;

        Version(int snapId, int value) {
            this.snapId = snapId;
            this.value = value;
        }
    }

    private final List<List<Version>> history = new ArrayList<>();

    public SnapshotArray(int length) {
        for (int i = 0; i < Math.max(0, length); i++) {
            history.add(new ArrayList<>());
        }
    }

    /** Records {@code value} for {@code index} as of snapshot {@code snapId}. */
    public void set(int index, int snapId, int value) {
        history.get(index).add(new Version(snapId, value));
    }

    /** Returns the value of {@code index} as of snapshot {@code snapId}. */
    public int get(int index, int snapId) {
        int result = 0; // every index starts at 0
        for (Version version : history.get(index)) {
            if (version.snapId > snapId) {
                break; // history is ordered by snapshot id
            }
            result = version.value;
        }
        return result;
    }

    /** Number of recorded writes for {@code index}. */
    public int versions(int index) {
        return history.get(index).size();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        SnapshotArray array = new SnapshotArray(n);
        for (int snapId = 1; snapId <= n; snapId++) {
            int index = fs.nextInt();
            int value = fs.nextInt();
            array.set(index, snapId, value);
        }
        int snapId = fs.nextInt();
        int snapIndex = fs.nextInt();

        System.out.println(array.get(snapIndex, snapId));
    }
}
