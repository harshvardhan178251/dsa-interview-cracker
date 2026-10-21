package com.dsa.hashing;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

class GroupAnagramsTest {

    @Test
    void groupsTheClassicExample() {
        List<List<String>> groups = GroupAnagrams.groupAnagrams(
                new String[]{"eat", "tea", "tan", "nat", "ate", "bat"});
        assertEquals(3, groups.size());
        assertEquals(List.of("ate", "eat", "tea"), groups.get(0));
        assertEquals(List.of("bat"), groups.get(1));
        assertEquals(List.of("nat", "tan"), groups.get(2));
    }

    @Test
    void putsEveryWordIntoItsOwnGroup() {
        List<List<String>> groups = GroupAnagrams.groupAnagrams(new String[]{"a", "b", "c"});
        assertEquals(3, groups.size());
        assertEquals(List.of("a"), groups.get(0));
    }

    @Test
    void handlesAnEmptyInput() {
        assertEquals(0, GroupAnagrams.groupAnagrams(new String[]{}).size());
    }

    @Test
    void handlesDuplicateWords() {
        List<List<String>> groups = GroupAnagrams.groupAnagrams(new String[]{"ab", "ab", "ba"});
        assertEquals(1, groups.size());
        assertEquals(3, groups.get(0).size());
    }

    @Test
    void handlesSingleCharacterWords() {
        List<List<String>> groups = GroupAnagrams.groupAnagrams(new String[]{"a", "a", "b"});
        assertEquals(2, groups.size());
        assertEquals(List.of("a", "a"), groups.get(0));
    }

    @Test
    void groupsAreOrderedDeterministically() {
        List<List<String>> groups = GroupAnagrams.groupAnagrams(new String[]{"tea", "eat", "tan"});
        assertTrue(groups.get(0).get(0).compareTo(groups.get(1).get(0)) < 0);
    }
}
