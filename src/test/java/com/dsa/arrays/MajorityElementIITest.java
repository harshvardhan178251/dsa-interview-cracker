package com.dsa.arrays;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

class MajorityElementIITest {

    @Test
    void findsBothQualifyingElements() {
        assertEquals(List.of(1, 2), MajorityElementII.majorityElements(new int[]{1, 1, 1, 2, 2, 2, 3}));
    }

    @Test
    void findsASingleQualifyingElement() {
        assertEquals(List.of(1), MajorityElementII.majorityElements(new int[]{1, 1, 1, 3, 3, 2}));
    }

    @Test
    void returnsNothingWhenNoElementQualifies() {
        assertEquals(List.of(), MajorityElementII.majorityElements(new int[]{1, 2, 3, 4, 5, 6, 7}));
    }

    @Test
    void handlesASingleElement() {
        assertEquals(List.of(6), MajorityElementII.majorityElements(new int[]{6}));
    }

    @Test
    void handlesTwoElements() {
        assertEquals(List.of(1, 2), MajorityElementII.majorityElements(new int[]{1, 2}));
    }

    @Test
    void handlesThreeElementsWithOneMajority() {
        assertEquals(List.of(3), MajorityElementII.majorityElements(new int[]{3, 2, 3}));
    }
}
