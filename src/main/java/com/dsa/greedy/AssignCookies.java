package com.dsa.greedy;

import com.dsa.utils.FastScanner;

import java.util.Arrays;

/**
 * Problem: Assign Cookies
 * LeetCode: 455 | Difficulty: Easy | Frequency: 3/5
 * Pattern: Greedy, Sort and two pointers
 *
 * <p>Problem:
 * Every child has a greed factor {@code g} and every cookie has a size {@code s}. A
 * child can be satisfied with a cookie when {@code s >= g}, and each child receives at
 * most one cookie. Return the maximum number of children that can be satisfied.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * greed[0] greed[1] ... greed[n-1]
 * m
 * size[0] size[1] ... size[m-1]
 * </pre>
 *
 * <p>Sample input:
 * <pre>
 * 2
 * 1 2
 * 3
 * 1 1 2
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * 2
 * </pre>
 *
 * <p>Approach: sort both lists and walk them with two pointers. The smallest cookie is
 * offered to the least greedy child it can satisfy. A cookie that is too small for the
 * current child is useless for every remaining child and is thrown away.
 *
 * <p>Complexity: Time O(n log n + m log m), Space O(1) beyond the input arrays.
 */
public class AssignCookies {

    /**
     * Returns the maximum number of children that can be satisfied.
     *
     * @param greed greed factor of every child
     * @param size  size of every cookie
     * @return the number of satisfied children
     */
    public static int findContentChildren(int[] greed, int[] size) {
        if (greed == null || size == null || greed.length == 0 || size.length == 0) {
            return 0;
        }
        int[] g = greed.clone();
        int[] s = size.clone();
        Arrays.sort(g);
        Arrays.sort(s);

        int child = 0;
        int cookie = 0;
        int satisfied = 0;
        while (child < g.length && cookie < s.length) {
            if (s[cookie] >= g[child]) {
                satisfied++;
                child++;
            }
            cookie++;
        }
        return satisfied;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();
        int[] greed = fs.nextIntArray(n);
        int m = fs.nextInt();
        int[] size = fs.nextIntArray(m);

        System.out.println(findContentChildren(greed, size));
    }
}
