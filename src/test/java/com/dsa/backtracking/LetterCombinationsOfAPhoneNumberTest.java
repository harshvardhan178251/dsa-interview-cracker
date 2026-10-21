package com.dsa.backtracking;

import org.junit.jupiter.api.Test;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class LetterCombinationsOfAPhoneNumberTest {

    @Test
    void classicExample() {
        List<String> result = LetterCombinationsOfAPhoneNumber.letterCombinations("23");
        assertEquals(9, result.size());
        assertEquals("ad", result.get(0));
        assertEquals("cf", result.get(8));
    }

    @Test
    void singleDigit() {
        assertEquals(java.util.Arrays.asList("a", "b", "c"),
                LetterCombinationsOfAPhoneNumber.letterCombinations("2"));
    }

    @Test
    void twoDigitsWithFourLetters() {
        assertEquals(16, LetterCombinationsOfAPhoneNumber.letterCombinations("79").size());
    }

    @Test
    void emptyInputHasNoCombination() {
        assertEquals(0, LetterCombinationsOfAPhoneNumber.letterCombinations("").size());
    }

    @Test
    void everyCombinationHasTheRightLength() {
        for (String combination : LetterCombinationsOfAPhoneNumber.letterCombinations("234")) {
            assertEquals(3, combination.length());
        }
    }
}
