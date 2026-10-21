package com.dsa.greedy;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class AssignCookiesTest {

    @Test
    void satisfiesBothChildren() {
        assertEquals(2, AssignCookies.findContentChildren(new int[]{1, 2}, new int[]{1, 1, 2}));
    }

    @Test
    void aCookieOfExactlyTheGreedFactorIsEnough() {
        assertEquals(1, AssignCookies.findContentChildren(new int[]{2}, new int[]{2}));
    }

    @Test
    void cookiesThatAreTooSmallAreDiscarded() {
        assertEquals(1, AssignCookies.findContentChildren(new int[]{1, 2, 3}, new int[]{1, 1}));
    }

    @Test
    void withoutCookiesNobodyIsSatisfied() {
        assertEquals(0, AssignCookies.findContentChildren(new int[]{1, 2}, new int[]{}));
    }

    @Test
    void withoutChildrenNobodyIsSatisfied() {
        assertEquals(0, AssignCookies.findContentChildren(new int[]{}, new int[]{1, 2}));
    }

    @Test
    void duplicateGreedFactorsNeedDuplicateCookies() {
        assertEquals(2, AssignCookies.findContentChildren(new int[]{1, 1}, new int[]{1, 2}));
    }
}
