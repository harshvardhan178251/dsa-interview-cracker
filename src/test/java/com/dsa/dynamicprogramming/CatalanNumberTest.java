package com.dsa.dynamicprogramming;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CatalanNumberTest {

    @Test
    void knownValues() {
        assertEquals(1, CatalanNumber.catalan(0));
        assertEquals(1, CatalanNumber.catalan(1));
        assertEquals(2, CatalanNumber.catalan(2));
        assertEquals(5, CatalanNumber.catalan(3));
    }

    @Test
    void classicExample() {
        assertEquals(42, CatalanNumber.catalan(5));
    }

    @Test
    void largerIndex() {
        assertEquals(1767263190L, CatalanNumber.catalan(19));
    }

    @Test
    void matchesTheClosedForm() {
        for (int n = 0; n <= 10; n++) {
            long binomial = binomial(2 * n, n);
            assertEquals(binomial / (n + 1), CatalanNumber.catalan(n));
        }
    }

    /** Helper: the binomial coefficient "n choose k". */
    private static long binomial(int n, int k) {
        long result = 1;
        for (int i = 0; i < k; i++) {
            result = result * (n - i) / (i + 1);
        }
        return result;
    }
}
