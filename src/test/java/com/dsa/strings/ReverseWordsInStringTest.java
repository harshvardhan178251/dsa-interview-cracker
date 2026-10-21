package com.dsa.strings;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ReverseWordsInStringTest {

    @Test
    void reversesTheClassicExample() {
        assertEquals("blue is sky the", ReverseWordsInString.reverseWords("the sky is blue"));
    }

    @Test
    void collapsesMultipleSpaces() {
        assertEquals("blue is sky the", ReverseWordsInString.reverseWords("the   sky  is blue"));
        assertEquals("world hello", ReverseWordsInString.reverseWords("hello    world"));
    }

    @Test
    void trimsLeadingAndTrailingSpaces() {
        assertEquals("blue is sky the", ReverseWordsInString.reverseWords("  the sky is blue  "));
    }

    @Test
    void handlesASingleWord() {
        assertEquals("hello", ReverseWordsInString.reverseWords("hello"));
    }

    @Test
    void handlesEmptyInput() {
        assertEquals("", ReverseWordsInString.reverseWords(""));
        assertEquals("", ReverseWordsInString.reverseWords("     "));
    }

    @Test
    void handlesTabsAsWhitespace() {
        assertEquals("c b a", ReverseWordsInString.reverseWords("a\tb\tc"));
    }
}
