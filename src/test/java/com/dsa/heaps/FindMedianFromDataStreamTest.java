package com.dsa.heaps;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class FindMedianFromDataStreamTest {

    @Test
    void reportsTheMedianAfterEveryInsertion() {
        FindMedianFromDataStream.MedianFinder finder = new FindMedianFromDataStream.MedianFinder();
        finder.addNum(1);
        assertEquals(1.0, finder.findMedian());
        finder.addNum(2);
        assertEquals(1.5, finder.findMedian());
        finder.addNum(3);
        assertEquals(2.0, finder.findMedian());
    }

    @Test
    void singleValue() {
        FindMedianFromDataStream.MedianFinder finder = new FindMedianFromDataStream.MedianFinder();
        finder.addNum(42);
        assertEquals(42.0, finder.findMedian());
    }

    @Test
    void evenNumberOfValuesAveragesTheTwoMiddles() {
        FindMedianFromDataStream.MedianFinder finder = new FindMedianFromDataStream.MedianFinder();
        finder.addNum(4);
        finder.addNum(1);
        finder.addNum(3);
        finder.addNum(2);
        assertEquals(2.5, finder.findMedian());
    }

    @Test
    void handlesUnsortedInput() {
        FindMedianFromDataStream.MedianFinder finder = new FindMedianFromDataStream.MedianFinder();
        finder.addNum(9);
        finder.addNum(1);
        finder.addNum(5);
        assertEquals(5.0, finder.findMedian());
    }

    @Test
    void handlesDuplicates() {
        FindMedianFromDataStream.MedianFinder finder = new FindMedianFromDataStream.MedianFinder();
        finder.addNum(2);
        finder.addNum(2);
        finder.addNum(2);
        assertEquals(2.0, finder.findMedian());
    }

    @Test
    void handlesNegativeValues() {
        FindMedianFromDataStream.MedianFinder finder = new FindMedianFromDataStream.MedianFinder();
        finder.addNum(-5);
        finder.addNum(-1);
        assertEquals(-3.0, finder.findMedian());
    }

    @Test
    void medianTextFormatsWholeAndHalfValues() {
        FindMedianFromDataStream.MedianFinder finder = new FindMedianFromDataStream.MedianFinder();
        finder.addNum(1);
        assertEquals("1.0", finder.medianText());
        finder.addNum(2);
        assertEquals("1.5", finder.medianText());
    }

    @Test
    void queryingWithoutAnyValueFails() {
        FindMedianFromDataStream.MedianFinder finder = new FindMedianFromDataStream.MedianFinder();
        assertThrows(IllegalStateException.class, finder::findMedian);
    }
}
