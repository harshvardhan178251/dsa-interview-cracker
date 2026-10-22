var e=`design.DesignTextEditor`,t=`package com.dsa.design;

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
`,n=`import java.util.ArrayDeque;
import java.util.Deque;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

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
public class Main {

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

        Main editor = new Main();
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

// ---------- inlined com.dsa.utils.FastScanner ----------
/**
 * Allocation-light scanner for contest-style stdin input.
 *
 * <p>Every problem in this repository reads its input through this class so the
 * expected stdin format stays consistent across the whole set.
 *
 * <p>Typical usage:
 * <pre>{@code
 * FastScanner fs = new FastScanner(System.in);
 * int n = fs.nextInt();
 * int[] nums = fs.nextIntArray(n);
 * }</pre>
 */
class FastScanner {

    private final BufferedReader reader;
    private final char[] buffer = new char[1 << 16];
    private int ptr = 0;
    private int len = 0;

    public FastScanner(InputStream in) {
        this.reader = new BufferedReader(new InputStreamReader(in, StandardCharsets.UTF_8), 1 << 16);
    }

    /** Returns the next raw character, or -1 at end of input. */
    private int read() throws IOException {
        if (ptr >= len) {
            len = reader.read(buffer);
            ptr = 0;
            if (len <= 0) {
                return -1;
            }
        }
        return buffer[ptr++];
    }

    private void skipWhitespace() throws IOException {
        int c;
        while ((c = read()) != -1) {
            if (!Character.isWhitespace(c)) {
                ptr--; // step back onto the first meaningful character
                return;
            }
        }
    }

    /** True when at least one more non-whitespace character exists. */
    public boolean hasNext() throws IOException {
        skipWhitespace();
        return ptr < len;
    }

    /** Reads the next whitespace-delimited token as a string. */
    public String next() throws IOException {
        skipWhitespace();
        StringBuilder sb = new StringBuilder();
        int c;
        while ((c = read()) != -1 && !Character.isWhitespace(c)) {
            sb.append((char) c);
        }
        return sb.toString();
    }

    public int nextInt() throws IOException {
        skipWhitespace();
        int c = read();
        while (c != -1 && c != '-' && (c < '0' || c > '9')) {
            c = read();
        }
        int sign = 1;
        if (c == '-') {
            sign = -1;
            c = read();
        }
        int value = 0;
        while (c >= '0' && c <= '9') {
            value = value * 10 + (c - '0');
            c = read();
        }
        return sign * value;
    }

    public long nextLong() throws IOException {
        skipWhitespace();
        int c = read();
        while (c != -1 && c != '-' && (c < '0' || c > '9')) {
            c = read();
        }
        int sign = 1;
        if (c == '-') {
            sign = -1;
            c = read();
        }
        long value = 0;
        while (c >= '0' && c <= '9') {
            value = value * 10 + (c - '0');
            c = read();
        }
        return sign * value;
    }

    public double nextDouble() throws IOException {
        return Double.parseDouble(next());
    }

    public char nextChar() throws IOException {
        skipWhitespace();
        int c = read();
        return c == -1 ? '\\0' : (char) c;
    }

    /** Reads exactly {@code n} integers. */
    public int[] nextIntArray(int n) throws IOException {
        int[] out = new int[n];
        for (int i = 0; i < n; i++) {
            out[i] = nextInt();
        }
        return out;
    }

    /** Reads exactly {@code n} longs. */
    public long[] nextLongArray(int n) throws IOException {
        long[] out = new long[n];
        for (int i = 0; i < n; i++) {
            out[i] = nextLong();
        }
        return out;
    }

    /** Reads exactly {@code n} whitespace-delimited strings. */
    public String[] nextStringArray(int n) throws IOException {
        String[] out = new String[n];
        for (int i = 0; i < n; i++) {
            out[i] = next();
        }
        return out;
    }
}
`,r='\n# Design Text Editor — LeetCode 2296\n\n| | |\n|---|---|\n| **Difficulty** | Hard |\n| **Pattern** | Design · Undo journal · Two stacks |\n| **Interview heat** | ★★☆☆☆ |\n| **Asked at** | Amazon, Google, Meta, Uber, Adobe |\n\n## Problem Statement\n\nImplement a text editor with three operations:\n\n- `append(c)` — append the character `c` at the end of the text,\n- `backspace()` — delete the last character,\n- `undo()` — revert the last change.\n\nTwo details decide the design:\n\n1. `undo` must restore the text **exactly** as it was before the last change, whether\n   that change was an append or a backspace.\n2. An `undo` is not a change itself: two consecutive `undo`s walk back through **two**\n   changes, they do not cancel each other out.\n\n## Input Format\n\n```\nn\nappend c\nbackspace\nundo\n...\n```\n\n- `n` — the number of commands.\n- `append c` — append the single character `c`.\n- `backspace` — delete the last character.\n- `undo` — revert the last change.\n\nThe program prints the final text on one line.\n\n## Sample Input\n\n```\n6\nappend a\nappend b\nappend c\nbackspace\nundo\nbackspace\n```\n\n## Expected Output\n\n```\nab\n```\n\n`append a`, `append b`, `append c` → `abc`; `backspace` → `ab`; `undo` → `abc` again\n(the backspace is undone, not the append); `backspace` → `ab`.\n\n## Approach — the text plus a journal of changes\n\nThe text itself is a stack of characters. The second stack is the **journal**: it\nrecords what every change did, so an undo can be replayed backwards.\n\n| Command | Effect on the text | Journal entry |\n|---|---|---|\n| `append c` | push `c` | `APPEND c` |\n| `backspace` | pop the top character `c` | `BACKSPACE c` |\n| `undo` | pop the journal and reverse the recorded effect | — |\n\nReversing an entry:\n\n- `APPEND c` → pop the top character (it is `c`, because everything above it in the\n  journal has already been undone);\n- `BACKSPACE c` → push `c` back.\n\nBecause the journal is last-in-first-out, the change that `undo` reverses is always the\nmost recent one, and the text is always in the state that change left it in.\n\n**Backspace on an empty text** changes nothing, so it is *not* journaled. Otherwise an\n`undo` would have to skip over it, and the "undo the last change" contract would be\nmuddled.\n\n**Alternative: snapshot the whole text on every change.** That is trivially correct but\nO(n) memory per change. The journal is O(1) per change.\n\n## Dry Run\n\nInput: `append a`, `append b`, `append c`, `backspace`, `undo`, `backspace`.\n\n| Step | Command | Text before | Journal before | Action | Text after | Journal after |\n|---:|---|---|---|---|---|---|\n| 1 | `append a` | `` | `[]` | push `a`, log `APPEND a` | `a` | `[APPEND a]` |\n| 2 | `append b` | `a` | `[APPEND a]` | push `b`, log `APPEND b` | `ab` | `[APPEND a, APPEND b]` |\n| 3 | `append c` | `ab` | `[APPEND a, APPEND b]` | push `c`, log `APPEND c` | `abc` | `[APPEND a, APPEND b, APPEND c]` |\n| 4 | `backspace` | `abc` | `[APPEND a, APPEND b, APPEND c]` | pop `c`, log `BACKSPACE c` | `ab` | `[APPEND a, APPEND b, APPEND c, BACKSPACE c]` |\n| 5 | `undo` | `ab` | `[… , BACKSPACE c]` | pop `BACKSPACE c` → push `c` back | `abc` | `[APPEND a, APPEND b, APPEND c]` |\n| 6 | `backspace` | `abc` | `[APPEND a, APPEND b, APPEND c]` | pop `c`, log `BACKSPACE c` | `ab` | `[APPEND a, APPEND b, APPEND c, BACKSPACE c]` |\n\nFinal text: **ab**.\n\n### Undoing an append\n\n`append a`, `append b`, `undo`:\n\n| Step | Command | Text before | Action | Text after |\n|---:|---|---|---|---|\n| 1 | `append a` | `` | push `a` | `a` |\n| 2 | `append b` | `a` | push `b` | `ab` |\n| 3 | `undo` | `ab` | pop `APPEND b` → remove the top character `b` | `a` |\n\nThe character that is removed is the current top of the text, because every change\nabove the undone one has already been undone.\n\n## Java Solution\n\nSee [`DesignTextEditor.java`](./DesignTextEditor.java).\n\n```java\npublic void append(char character) {\n    text.addLast(character);\n    journal.addLast(new JournalEntry(APPEND, character));\n}\n\npublic void backspace() {\n    if (text.isEmpty()) {\n        return;                            // nothing changed, nothing to journal\n    }\n    char removed = text.removeLast();\n    journal.addLast(new JournalEntry(BACKSPACE, removed));\n}\n\npublic void undo() {\n    if (journal.isEmpty()) {\n        return;\n    }\n    JournalEntry entry = journal.removeLast();\n    if (entry.kind == APPEND) {\n        text.removeLast();                 // remove what was appended\n    } else {\n        text.addLast(entry.character);     // put the backspaced character back\n    }\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(1) per operation | one push/pop on each of the two stacks |\n| **Space** | O(n) | the text plus one journal entry per change |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"What if the cursor can be in the middle of the text?"* → two stacks, one for the\n  left and one for the right of the cursor; `append` pushes left, `backspace` pops left\n  and pushes to right, and the undo journal records both directions.\n- *"How would you support redo?"* → a second journal: an `undo` pushes the reverted\n  entry onto the redo stack, and a `redo` pops it and replays it.\n- *"How would you make `undo` O(1) for a huge document?"* → it already is; a snapshot\n  approach would not be.\n- *"What if you had to support collaborative editing?"* → an operation log with\n  transformation functions (OT), the same idea as an undo journal but reconciled across\n  clients.\n\n**Common mistakes:**\n- ❌ Recording the undo of an undo → two `undo`s then cancel each other instead of\n  walking back two changes.\n- ❌ Logging a backspace on an empty text → the undo then has to skip it.\n- ❌ Forgetting to store *which* character a backspace removed → the undo cannot restore\n  it.\n- ❌ Assuming the text is always a plain string — for a cursor in the middle you need the\n  two-stack version.\n\n**How to narrate:**\n> "The text is a stack of characters and I keep a second stack, the journal, that\n> records what every change did. An append pushes the character and logs an APPEND\n> entry; a backspace pops the character and logs a BACKSPACE entry carrying that\n> character. `undo` pops the journal and reverses the recorded effect — remove the\n> appended character, or put the backspaced character back. Because the journal is LIFO,\n> the entry I reverse is always the most recent change, so the text is always exactly\n> where that change left it."\n\n## Related Problems\n\n- [Design Browser History — LeetCode 348](./DesignBrowserHistory.md) — the same cursor idea with\n  a history instead of an undo log\n- [Min Max Stack](./MinMaxStack.md) — a stack whose frames carry extra state\n- [Snapshot Array — LeetCode 1146](./SnapshotArray.md) — the same journal idea, indexed by time\n',i=[`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};