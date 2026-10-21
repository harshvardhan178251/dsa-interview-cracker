package com.dsa.templates;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Deque;
import java.util.List;

/**
 * Copy-paste starting points for graph traversal: BFS, DFS, and topological sort.
 *
 * <p>See the [graph notes](../../../docs/topics/15-graphs.md).
 */
public final class GraphTraversalTemplate {

    private GraphTraversalTemplate() {
    }

    /** Adjacency list. Vertex ids are {@code 0..n-1}. */
    public static List<List<Integer>> buildGraph(int n, int[][] edges) {
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            graph.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            graph.get(edge[0]).add(edge[1]);
        }
        return graph;
    }

    /** BFS — shortest path in an unweighted graph. */
    public static int shortestPathUnweighted(List<List<Integer>> graph, int source, int target) {
        if (source == target) {
            return 0;
        }
        boolean[] visited = new boolean[graph.size()];
        Deque<Integer> queue = new ArrayDeque<>();
        queue.add(source);
        visited[source] = true;                     // mark on ENQUEUE, not on dequeue
        int distance = 0;

        while (!queue.isEmpty()) {
            int levelSize = queue.size();           // capture the size BEFORE adding children
            for (int i = 0; i < levelSize; i++) {
                int node = queue.poll();
                for (int next : graph.get(node)) {
                    if (visited[next]) {
                        continue;
                    }
                    if (next == target) {
                        return distance + 1;
                    }
                    visited[next] = true;
                    queue.add(next);
                }
            }
            distance++;
        }
        return -1;
    }

    /** DFS with an explicit stack — avoids recursion depth issues. */
    public static List<Integer> dfsOrder(List<List<Integer>> graph, int start) {
        List<Integer> order = new ArrayList<>();
        boolean[] visited = new boolean[graph.size()];
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(start);

        while (!stack.isEmpty()) {
            int node = stack.pop();
            if (visited[node]) {
                continue;
            }
            visited[node] = true;
            order.add(node);
            for (int next : graph.get(node)) {
                if (!visited[next]) {
                    stack.push(next);
                }
            }
        }
        return order;
    }

    /** DFS recursion — the shape most tree and graph problems use. */
    public static void dfsRecursive(List<List<Integer>> graph, int node, boolean[] visited,
                                    List<Integer> order) {
        visited[node] = true;
        order.add(node);
        for (int next : graph.get(node)) {
            if (!visited[next]) {
                dfsRecursive(graph, next, visited, order);
            }
        }
    }

    /** Kahn's algorithm — topological order. Throws if the graph has a cycle. */
    public static List<Integer> topologicalSort(int n, List<List<Integer>> graph) {
        int[] inDegree = new int[n];
        for (List<Integer> neighbours : graph) {
            for (int to : neighbours) {
                inDegree[to]++;
            }
        }
        Deque<Integer> queue = new ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            if (inDegree[i] == 0) {
                queue.add(i);
            }
        }

        List<Integer> order = new ArrayList<>();
        while (!queue.isEmpty()) {
            int node = queue.poll();
            order.add(node);
            for (int next : graph.get(node)) {
                if (--inDegree[next] == 0) {
                    queue.add(next);
                }
            }
        }
        if (order.size() != n) {
            throw new IllegalArgumentException("The graph has a cycle");
        }
        return order;
    }

    /** Cycle detection with three colours. */
    public static boolean hasCycle(List<List<Integer>> graph) {
        int[] colour = new int[graph.size()];       // 0 = new, 1 = on the stack, 2 = done
        for (int i = 0; i < graph.size(); i++) {
            if (colour[i] == 0 && cycleDfs(graph, i, colour)) {
                return true;
            }
        }
        return false;
    }

    private static boolean cycleDfs(List<List<Integer>> graph, int node, int[] colour) {
        colour[node] = 1;
        for (int next : graph.get(node)) {
            if (colour[next] == 1) {
                return true;                        // a grey neighbour means a cycle
            }
            if (colour[next] == 0 && cycleDfs(graph, next, colour)) {
                return true;
            }
        }
        colour[node] = 2;
        return false;
    }

    public static void main(String[] args) {
        List<List<Integer>> graph = buildGraph(6, new int[][]{{5, 2}, {5, 0}, {4, 0}, {4, 1}, {2, 3}, {3, 1}});
        System.out.println("shortestPath(5,3) = " + shortestPathUnweighted(graph, 5, 3));
        System.out.println("dfsOrder(0)        = " + dfsOrder(graph, 0));
        System.out.println("topologicalSort     = " + topologicalSort(6, graph));
        System.out.println("hasCycle            = " + hasCycle(graph));
        System.out.println("grid BFS neighbours = " + Arrays.toString(new int[]{-1, 0, 1, 0, -1, 1, 0, -1}));
    }
}
