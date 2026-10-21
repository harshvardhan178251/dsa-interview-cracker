package com.dsa.strings;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CompareVersionNumbersTest {

    @Test
    void comparesNumericallyNotLexicographically() {
        assertEquals(-1, CompareVersionNumbers.compareVersions("1.2", "1.10"));
        assertEquals(1, CompareVersionNumbers.compareVersions("1.10", "1.2"));
    }

    @Test
    void equalVersions() {
        assertEquals(0, CompareVersionNumbers.compareVersions("1.2.3", "1.2.3"));
        assertEquals(0, CompareVersionNumbers.compareVersions("1.0", "1"));
    }

    @Test
    void missingRevisionsCountAsZero() {
        assertEquals(0, CompareVersionNumbers.compareVersions("1.0", "1.0.0"));
        assertEquals(1, CompareVersionNumbers.compareVersions("1.0.1", "1.0"));
        assertEquals(-1, CompareVersionNumbers.compareVersions("1.0", "1.0.1"));
    }

    @Test
    void leadingZerosAreIgnored() {
        assertEquals(0, CompareVersionNumbers.compareVersions("1.01", "1.001"));
        assertEquals(0, CompareVersionNumbers.compareVersions("1.02", "1.2"));
        assertEquals(1, CompareVersionNumbers.compareVersions("1.03", "1.2"));
    }

    @Test
    void firstDifferingRevisionDecides() {
        assertEquals(1, CompareVersionNumbers.compareVersions("2.0.0", "1.99.99"));
        assertEquals(-1, CompareVersionNumbers.compareVersions("1.0.0", "1.0.1"));
    }

    @Test
    void singleSegmentVersions() {
        assertEquals(-1, CompareVersionNumbers.compareVersions("1", "2"));
        assertEquals(0, CompareVersionNumbers.compareVersions("7", "7"));
    }
}
