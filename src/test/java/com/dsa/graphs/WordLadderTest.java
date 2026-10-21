package com.dsa.graphs;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class WordLadderTest {

    @Test
    void findsTheSampleLadder() {
        assertEquals(5, WordLadder.ladderLength(
                new String[]{"hot", "dot", "dog", "lot", "log", "cog"}, "hit", "cog"));
    }

    @Test
    void anUnreachableEndWordGivesZero() {
        assertEquals(0, WordLadder.ladderLength(
                new String[]{"hot", "dot", "dog", "lot", "log", "cog"}, "hit", "xyz"));
    }

    @Test
    void beginEqualToEndGivesOne() {
        assertEquals(1, WordLadder.ladderLength(new String[]{"a", "b", "c"}, "a", "a"));
    }

    @Test
    void aSingleChangeGivesTwo() {
        assertEquals(2, WordLadder.ladderLength(new String[]{"hit", "hot"}, "hit", "hot"));
    }

    @Test
    void aOneLetterDictionaryHasNoPath() {
        assertEquals(0, WordLadder.ladderLength(new String[]{"a"}, "a", "b"));
    }

    @Test
    void theShortestLadderIsFoundWhenSeveralExist() {
        // hit -> hot -> dot -> dog -> cog  (5 words)
        // hit -> hot -> lot -> log -> cog  (5 words)
        assertEquals(5, WordLadder.ladderLength(
                new String[]{"hot", "dot", "dog", "lot", "log", "cog"}, "hit", "cog"));
    }

    @Test
    void theEndWordMustBeInTheDictionary() {
        assertEquals(0, WordLadder.ladderLength(new String[]{"hot"}, "hot", "not"));
    }

    @Test
    void aChainOfThreeWordsGivesThree() {
        // aaaa -> aaab -> aabb; "aaaa" and "aabb" differ in two letters, so no shortcut exists
        assertEquals(3, WordLadder.ladderLength(
                new String[]{"aaaa", "aaab", "aabb"}, "aaaa", "aabb"));
    }
}
