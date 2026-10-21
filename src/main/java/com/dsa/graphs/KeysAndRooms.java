package com.dsa.graphs;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

/**
 * Problem: Keys and Rooms
 * LeetCode: 841 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Graph traversal, iterative DFS
 *
 * <p>Problem: Rooms are numbered {@code 0..n-1}. Room {@code i} may contain keys to other rooms.
 * Starting in room 0, decide whether every room can be opened. A key can only be used once it
 * has been picked up in a room that was already opened.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * k0 key0_1 key0_2 ...   (room 0: how many keys it holds, then the key numbers)
 * k1 key1_1 ...
 * ...
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 3
 * 1 1
 * 1 2
 * 0
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * true
 * </pre>
 *
 * <p>Approach: model the rooms as a graph where an edge goes from a room to every room whose key
 * it holds, then run an iterative DFS from room 0. The answer is {@code true} when the DFS
 * reaches every room.
 *
 * <p>Complexity: Time O(n + K) where K is the total number of keys, Space O(n + K).
 */
public class KeysAndRooms {

    /**
     * Decides whether all rooms can be visited starting from room 0.
     *
     * @param rooms room {@code i} holds the keys listed in {@code rooms.get(i)}
     * @return {@code true} when every room can be reached
     */
    public static boolean canVisitAllRooms(List<List<Integer>> rooms) {
        int n = rooms.size();
        if (n == 0) {
            return true;
        }
        boolean[] visited = new boolean[n];
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(0);
        visited[0] = true;
        int opened = 1;

        while (!stack.isEmpty()) {
            int room = stack.pop();
            for (int key : rooms.get(room)) {
                if (key >= 0 && key < n && !visited[key]) {
                    visited[key] = true;
                    opened++;
                    stack.push(key);
                }
            }
        }
        return opened == n;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        List<List<Integer>> rooms = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            int keyCount = fs.nextInt();
            List<Integer> keys = new ArrayList<>(keyCount);
            for (int j = 0; j < keyCount; j++) {
                keys.add(fs.nextInt());
            }
            rooms.add(keys);
        }

        System.out.println(canVisitAllRooms(rooms));
    }
}
