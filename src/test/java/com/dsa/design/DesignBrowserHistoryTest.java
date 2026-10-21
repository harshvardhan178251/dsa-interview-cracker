package com.dsa.design;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class DesignBrowserHistoryTest {

    @Test
    void visitsAPage() {
        DesignBrowserHistory browser = new DesignBrowserHistory();
        browser.visit("a");
        assertEquals("a", browser.current());
        assertEquals(1, browser.entries().size());
    }

    @Test
    void goesBackAndForward() {
        DesignBrowserHistory browser = new DesignBrowserHistory();
        browser.visit("a");
        browser.visit("b");
        assertEquals("a", browser.back(1));
        assertEquals("b", browser.forward(1));
    }

    @Test
    void goingBackBeforeTheFirstPageShowsNothing() {
        DesignBrowserHistory browser = new DesignBrowserHistory();
        browser.visit("a");
        assertEquals(DesignBrowserHistory.EMPTY, browser.back(1));
        assertEquals(DesignBrowserHistory.EMPTY, browser.back(5));
    }

    @Test
    void goingForwardPastTheLastPageStaysThere() {
        DesignBrowserHistory browser = new DesignBrowserHistory();
        browser.visit("a");
        browser.visit("b");
        assertEquals("b", browser.forward(3));
        assertEquals("b", browser.current());
    }

    @Test
    void visitingErasesTheForwardHistory() {
        DesignBrowserHistory browser = new DesignBrowserHistory();
        browser.visit("a");
        browser.visit("b");
        browser.visit("c");
        browser.back(2);
        browser.visit("d");
        assertEquals(2, browser.entries().size());
        assertEquals("d", browser.current());
        assertEquals("a", browser.back(1));
        assertEquals("d", browser.forward(5));
    }

    @Test
    void movingByMoreStepsThanPossibleIsClamped() {
        DesignBrowserHistory browser = new DesignBrowserHistory();
        browser.visit("a");
        browser.visit("b");
        browser.visit("c");
        assertEquals("b", browser.back(1));
        assertEquals(DesignBrowserHistory.EMPTY, browser.back(100));   // before the first page
        assertEquals("c", browser.forward(100));                       // clamped to the last page
    }

    @Test
    void anEmptyHistoryShowsNothing() {
        DesignBrowserHistory browser = new DesignBrowserHistory();
        assertEquals(DesignBrowserHistory.EMPTY, browser.current());
        assertEquals(DesignBrowserHistory.EMPTY, browser.back(1));
        assertEquals(DesignBrowserHistory.EMPTY, browser.forward(1));
    }
}
