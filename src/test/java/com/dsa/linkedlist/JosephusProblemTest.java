package com.dsa.linkedlist;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class JosephusProblemTest {

    @Test
    void findsTheSurvivor() {
        assertEquals(3, JosephusProblem.josephus(7, 3));
    }

    @Test
    void handlesASinglePerson() {
        assertEquals(0, JosephusProblem.josephus(1, 3));
    }

    @Test
    void handlesKEqualsOne() {
        assertEquals(6, JosephusProblem.josephus(7, 1));
    }

    @Test
    void handlesKEqualsTwo() {
        assertEquals(6, JosephusProblem.josephus(7, 2));
    }

    @Test
    void handlesKGreaterThanN() {
        assertEquals(3, JosephusProblem.josephus(5, 7));
    }

    @Test
    void matchesTheKnownSmallCases() {
        assertEquals(0, JosephusProblem.josephus(2, 2));
        assertEquals(2, JosephusProblem.josephus(5, 2));
        assertEquals(1, JosephusProblem.josephus(4, 4));
        assertEquals(1, JosephusProblem.josephus(5, 5));
    }

    @Test
    void handlesALargeInput() {
        assertEquals(49, JosephusProblem.josephus(100, 7));
    }
}
