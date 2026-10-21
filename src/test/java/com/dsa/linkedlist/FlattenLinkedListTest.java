package com.dsa.linkedlist;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class FlattenLinkedListTest {

    private static List<Integer> flattenToList(String text) {
        FlattenLinkedList.MultiNode head = FlattenLinkedList.parse(text);
        FlattenLinkedList.flatten(head);
        List<Integer> out = new ArrayList<>();
        for (FlattenLinkedList.MultiNode c = head; c != null; c = c.next) {
            out.add(c.val);
        }
        return out;
    }

    @Test
    void flattensTheHappyPath() {
        assertEquals(List.of(1, 2, 3, 4, 5), flattenToList("1[2[3],4],5"));
    }

    @Test
    void flattensAPlainList() {
        assertEquals(List.of(1, 2, 3), flattenToList("1,2,3"));
    }

    @Test
    void flattensASingleNode() {
        assertEquals(List.of(7), flattenToList("7"));
    }

    @Test
    void flattensOneLevelOfChildren() {
        assertEquals(List.of(1, 2, 3), flattenToList("1[2],3"));
    }

    @Test
    void flattensDeeplyNestedChildren() {
        assertEquals(List.of(1, 2, 3, 4, 5), flattenToList("1[2[3[4[5]]]]"));
    }

    @Test
    void flattensSeveralChildrenInOrder() {
        assertEquals(List.of(1, 2, 3, 4, 5, 6), flattenToList("1[2,3],4[5,6]"));
    }
}
