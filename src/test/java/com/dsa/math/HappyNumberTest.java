package com.dsa.math;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class HappyNumberTest {

    @Test
    void nineteenIsHappy() {
        assertTrue(HappyNumber.isHappy(19));
    }

    @Test
    void oneIsHappy() {
        assertTrue(HappyNumber.isHappy(1));
    }

    @Test
    void twoIsNotHappy() {
        assertFalse(HappyNumber.isHappy(2));
    }

    @Test
    void aCycleIsDetected() {
        assertFalse(HappyNumber.isHappy(4));
    }

    @Test
    void theSumOfSquaredDigitsIsCorrect() {
        assertEquals(82, HappyNumber.sumOfSquaredDigits(19));
        assertEquals(1, HappyNumber.sumOfSquaredDigits(100));
        assertEquals(0, HappyNumber.sumOfSquaredDigits(0));
    }

    @Test
    void sevenIsHappy() {
        assertTrue(HappyNumber.isHappy(7));
    }
}
