package com.dsa.backtracking;

import org.junit.jupiter.api.Test;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class GenerateParenthesesTest {

    @Test
    void classicExample() {
        List<String> result = GenerateParentheses.generateParenthesis(3);
        assertEquals(5, result.size());
        assertEquals("((()))", result.get(0));
        assertEquals("()()()", result.get(4));
    }

    @Test
    void singlePair() {
        assertEquals(java.util.Arrays.asList("()"), GenerateParentheses.generateParenthesis(1));
    }

    @Test
    void twoPairs() {
        assertEquals(2, GenerateParentheses.generateParenthesis(2).size());
    }

    @Test
    void fourPairsGiveCatalanFourteen() {
        assertEquals(14, GenerateParentheses.generateParenthesis(4).size());
    }

    @Test
    void everyCombinationIsWellFormed() {
        for (String combination : GenerateParentheses.generateParenthesis(4)) {
            int balance = 0;
            for (char ch : combination.toCharArray()) {
                balance += ch == '(' ? 1 : -1;
                assertTrue(balance >= 0);
            }
            assertEquals(0, balance);
        }
    }
}
