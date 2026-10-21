package com.dsa.trie;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class CamelCaseMatchingTest {

    @Test
    void matchesTheOfficialExamples() {
        assertTrue(CamelCaseMatching.matches("FooBar", "FB"));
        assertTrue(CamelCaseMatching.matches("FootBall", "FB"));
        assertTrue(CamelCaseMatching.matches("FrameBuffer", "FB"));
        assertFalse(CamelCaseMatching.matches("FooBarTest", "FB"));
        assertFalse(CamelCaseMatching.matches("ForceFeedBack", "FB"));
    }

    @Test
    void matchesTheSecondOfficialPattern() {
        assertTrue(CamelCaseMatching.matches("FooBar", "FoBa"));
        assertFalse(CamelCaseMatching.matches("FooBarTest", "FoBa"));
        assertTrue(CamelCaseMatching.matches("FootBall", "FoBa"));
        assertFalse(CamelCaseMatching.matches("FrameBuffer", "FoBa"));
        assertFalse(CamelCaseMatching.matches("ForceFeedBack", "FoBa"));
    }

    @Test
    void matchesTheThirdOfficialPattern() {
        assertFalse(CamelCaseMatching.matches("FooBar", "FoBaT"));
        assertTrue(CamelCaseMatching.matches("FooBarTest", "FoBaT"));
        assertFalse(CamelCaseMatching.matches("FootBall", "FoBaT"));
    }

    @Test
    void isCaseSensitive() {
        assertFalse(CamelCaseMatching.matches("foobar", "FB"));
        assertTrue(CamelCaseMatching.matches("FOO", "FOO"));
    }

    @Test
    void needsTheWholePatternToBeConsumed() {
        assertFalse(CamelCaseMatching.matches("FooBar", "FooBarBaz"));
    }

    @Test
    void collectsTheMatchingPatternIndices() {
        List<String> patterns = List.of("FB", "FBar", "Buffer");
        assertEquals(List.of(0, 1), CamelCaseMatching.matchingPatterns("FooBar", patterns));
        assertEquals(List.of(0), CamelCaseMatching.matchingPatterns("FootBall", patterns));
        assertEquals(List.of(), CamelCaseMatching.matchingPatterns("ForceFeedBack", patterns));
    }
}
