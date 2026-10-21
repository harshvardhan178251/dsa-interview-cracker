package com.dsa.strings;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ExcelSheetColumnNumberTest {

    @Test
    void convertsTheClassicExample() {
        assertEquals(28, ExcelSheetColumnNumber.titleToNumber("AB"));
    }

    @Test
    void convertsSingleLetters() {
        assertEquals(1, ExcelSheetColumnNumber.titleToNumber("A"));
        assertEquals(26, ExcelSheetColumnNumber.titleToNumber("Z"));
    }

    @Test
    void convertsTwoLetterTitles() {
        assertEquals(27, ExcelSheetColumnNumber.titleToNumber("AA"));
        assertEquals(52, ExcelSheetColumnNumber.titleToNumber("AZ"));
        assertEquals(53, ExcelSheetColumnNumber.titleToNumber("BA"));
    }

    @Test
    void convertsThreeLetterTitles() {
        assertEquals(703, ExcelSheetColumnNumber.titleToNumber("AAA"));
        assertEquals(18278, ExcelSheetColumnNumber.titleToNumber("ZZZ"));
    }

    @Test
    void emptyTitleIsZero() {
        assertEquals(0, ExcelSheetColumnNumber.titleToNumber(""));
    }
}
