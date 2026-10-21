package com.dsa.design;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class DesignTextEditorTest {

    @Test
    void appendsCharacters() {
        DesignTextEditor editor = new DesignTextEditor();
        editor.append('a');
        editor.append('b');
        editor.append('c');
        assertEquals("abc", editor.text());
    }

    @Test
    void backspaceRemovesTheLastCharacter() {
        DesignTextEditor editor = new DesignTextEditor();
        editor.append('a');
        editor.append('b');
        editor.backspace();
        assertEquals("a", editor.text());
    }

    @Test
    void backspaceOnAnEmptyTextChangesNothing() {
        DesignTextEditor editor = new DesignTextEditor();
        editor.backspace();
        assertEquals("", editor.text());
        assertEquals(0, editor.undoDepth());
    }

    @Test
    void undoRevertsAnAppend() {
        DesignTextEditor editor = new DesignTextEditor();
        editor.append('a');
        editor.append('b');
        editor.undo();
        assertEquals("a", editor.text());
    }

    @Test
    void undoRevertsABackspace() {
        DesignTextEditor editor = new DesignTextEditor();
        editor.append('a');
        editor.append('b');
        editor.backspace();
        assertEquals("a", editor.text());
        editor.undo();
        assertEquals("ab", editor.text());
    }

    @Test
    void twoUndosWalkBackTwoChanges() {
        DesignTextEditor editor = new DesignTextEditor();
        editor.append('a');
        editor.append('b');
        editor.append('c');
        editor.undo();
        editor.undo();
        assertEquals("a", editor.text());
    }

    @Test
    void undoOnAnEmptyJournalDoesNothing() {
        DesignTextEditor editor = new DesignTextEditor();
        editor.undo();
        assertEquals("", editor.text());
    }

    @Test
    void anUndoIsNotAChangeItself() {
        DesignTextEditor editor = new DesignTextEditor();
        editor.append('a');
        editor.undo();                       // the append is reverted
        editor.undo();                       // there is nothing left to revert
        assertEquals("", editor.text());
        assertEquals(0, editor.undoDepth());
    }
}
