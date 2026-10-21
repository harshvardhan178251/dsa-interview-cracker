package com.dsa.hashing;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class FrequencySortTest {

    @Test
    void sortsTheClassicExample() {
        assertEquals("eert", FrequencySort.frequencySort("tree"));
    }

    @Test
    void breaksTiesByCharacterCode() {
        // r and t both occur once -> "r" comes before "t".
        assertEquals("eert", FrequencySort.frequencySort("tree"));
        assertEquals("aab", FrequencySort.frequencySort("aab"));
    }

    @Test
    void handlesAnEmptyString() {
        assertEquals("", FrequencySort.frequencySort(""));
    }

    @Test
    void handlesASingleCharacter() {
        assertEquals("a", FrequencySort.frequencySort("a"));
    }

    @Test
    void handlesAllDistinctCharacters() {
        assertEquals("abc", FrequencySort.frequencySort("cba"));
    }

    @Test
    void handlesOneCharacterDominating() {
        assertEquals("aaabb", FrequencySort.frequencySort("abbaa"));
    }
}
