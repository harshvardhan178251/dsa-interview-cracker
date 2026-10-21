package com.dsa.strings;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ExcelSheetColumnTitleTest {

    @Test
    void convertsTheClassicExample() {
        assertEquals("AB", ExcelSheetColumnTitle.convertToTitle(28));
    }

    @Test
    void convertsTheFirstLetters() {
        assertEquals("A", ExcelSheetColumnTitle.convertToTitle(1));
        assertEquals("B", ExcelSheetColumnTitle.convertToTitle(2));
        assertEquals("Z", ExcelSheetColumnTitle.convertToTitle(26));
    }

    @Test
    void convertsTheBoundariesOfEachLetter() {
        assertEquals("AA", ExcelSheetColumnTitle.convertToTitle(27));
        assertEquals("AZ", ExcelSheetColumnTitle.convertToTitle(52));
        assertEquals("BA", ExcelSheetColumnTitle.convertToTitle(53));
    }

    @Test
    void convertsThreeLetterTitles() {
        assertEquals("AAA", ExcelSheetColumnTitle.convertToTitle(703));
        assertEquals("ZZZ", ExcelSheetColumnTitle.convertToTitle(18278));
    }

    @Test
    void zeroProducesAnEmptyTitle() {
        assertEquals("", ExcelSheetColumnTitle.convertToTitle(0));
    }
}
