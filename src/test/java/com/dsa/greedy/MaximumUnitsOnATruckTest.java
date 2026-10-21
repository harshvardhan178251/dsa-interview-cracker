package com.dsa.greedy;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MaximumUnitsOnATruckTest {

    @Test
    void fillsTheTruckWithTheMostValuableBoxes() {
        assertEquals(8, MaximumUnitsOnATruck.maximumUnits(new int[]{1, 2, 3}, new int[]{3, 2, 1}, 4));
    }

    @Test
    void aTruckThatFitsEverythingTakesEveryUnit() {
        assertEquals(5, MaximumUnitsOnATruck.maximumUnits(new int[]{1, 2}, new int[]{1, 2}, 10));
    }

    @Test
    void aTruckWithoutSlotsTakesNothing() {
        assertEquals(0, MaximumUnitsOnATruck.maximumUnits(new int[]{1, 2}, new int[]{1, 2}, 0));
    }

    @Test
    void withoutBoxesNothingIsCarried() {
        assertEquals(0, MaximumUnitsOnATruck.maximumUnits(new int[]{}, new int[]{}, 5));
    }

    @Test
    void onlyTheAvailableBoxesAreCounted() {
        assertEquals(5, MaximumUnitsOnATruck.maximumUnits(new int[]{1, 5}, new int[]{3, 2}, 2));
    }

    @Test
    void aNegativeTruckSizeIsTreatedAsEmpty() {
        assertEquals(0, MaximumUnitsOnATruck.maximumUnits(new int[]{1}, new int[]{1}, -3));
    }
}
