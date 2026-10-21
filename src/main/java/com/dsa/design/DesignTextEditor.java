package com.dsa.design;

import com.dsa.utils.FastScanner;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Problem: Design Text Editor
 * LeetCode: 2296 | Difficulty: Hard | Frequency: 2/5
 * Pattern: Design, Two stacks with an undo journal
 *
 * <p>Problem:
 * Implement a text editor supporting {@code append(c)} (add a character at the end),
 * {@code backspace()} (delete the last character) and {@code undo()} (revert the last
 * change). An undo of an undo is not a change of its own, so consecutive undos walk back
 * through the change history.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * append c
 * backspace
 * undo
 * ...
 * </pre>
 * The program prints the final text on a single line.
 *
 * <p>Sample input:
 * <pre>
 * 6
 * append a
 * append b
 * append c
 * backspace
 * undo
 * backspace
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * ab
 * </pre>
 *
 * <p>Approach: the text is a stack of characters and a second stack records what every
 * change did. {@code append} pushes a character and logs "append"; {@code backspace}
 * removes the top character and logs "backspace of that character"; {@code undo} pops the
 * journal and replays the change backwards. Because the journal is last-in-first-out, the
 * character an undo removes is always the current top.
 *
 * <p>Complexity: Time O(1) per operation, Space O(n).
 */
public class DesignTextEditor {

    private static final int APPEND = 0;
    private static final int BACKSPACE = 1;

    /** One logged change. */
    private static final class JournalEntry {
        final int kind;
        final char character;

        JournalEntry(int kind, char character) {
            this.kind = kind;
            this.character = character;
        }
    }

    private final Deque<Character> text = new ArrayDeque<>();
    private final Deque<JournalEntry> journal = new ArrayDeque<>();

    /** Appends {@code character} at the end of the text. */
    public void append(char character) {
        text.addLast(character);
        journal.addLast(new JournalEntry(APPEND, character));
    }

    /** Deletes the last character; a backspace on an empty text changes nothing. */
    public void backspace() {
        if (text.isEmpty()) {
            return;
        }
        char removed = text.removeLast();
        journal.addLast(new JournalEntry(BACKSPACE, removed));
    }

    /** Reverts the last change; does nothing when no change was made yet. */
    public void undo() {
        if (journal.isEmpty()) {
            return;
        }
        JournalEntry entry = journal.removeLast();
        if (entry.kind == APPEND) {
            text.removeLast();
        } else {
            text.addLast(entry.character);
        }
    }

    /** The current text. */
    public String text() {
        StringBuilder sb = new StringBuilder();
        for (Character character : text) {
            sb.append(character);
        }
        return sb.toString();
    }

    /** Number of logged changes that can still be undone. */
    public int undoDepth() {
        return journal.size();
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        DesignTextEditor editor = new DesignTextEditor();
        for (int i = 0; i < n; i++) {
            String command = fs.next();
            if ("append".equals(command)) {
                editor.append(fs.nextChar());
            } else if ("backspace".equals(command)) {
                editor.backspace();
            } else if ("undo".equals(command)) {
                editor.undo();
            }
        }
        System.out.println(editor.text());
    }
}
