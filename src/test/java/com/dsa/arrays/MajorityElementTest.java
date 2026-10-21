package com.dsa.arrays;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MajorityElementTest {

    @Test
    void findsTheMajorityElement() {
        assertEquals(2, MajorityElement.majorityElement(new int[]{2, 2, 1, 1, 1, 2, 2}));
    }

    @Test
    void findsTheMajorityAtTheStart() {
        assertEquals(1, MajorityElement.majorityElement(new int[]{1, 1, 2, 3}));
    }

    @Test
    void findsTheMajorityAtTheEnd() {
        assertEquals(3, MajorityElement.majorityElement(new int[]{2, 1, 3, 3, 3}));
    }

    @Test
    void handlesASingleElement() {
        assertEquals(9, MajorityElement.majorityElement(new int[]{9}));
    }

    @Test
    void handlesAnArrayOfTwoEqualElements() {
        assertEquals(4, MajorityElement.majorityElement(new int[]{4, 4}));
    }

    @Test
    void handlesNegativeValues() {
        assertEquals(-1, MajorityElement.majorityElement(new int[]{-1, -1, 2, -1}));
    }
}
