package com.dsa.design;

import com.dsa.utils.FastScanner;

import java.util.ArrayList;
import java.util.List;

/**
 * Problem: Design Browser History
 * LeetCode: 348 | Difficulty: Medium | Frequency: 3/5
 * Pattern: Design, Array with a cursor
 *
 * <p>Problem:
 * Implement a browser history with three operations: {@code visit(url)} opens a new page,
 * {@code back(steps)} moves back and {@code forward(steps)} moves forward. Visiting a new
 * page erases the forward history.
 *
 * <p>Input format (stdin):
 * <pre>
 * n
 * visit url
 * back k
 * forward k
 * ...
 * </pre>
 * The program prints one line per {@code back} and {@code forward}: the URL that is now
 * shown, or {@code none} when the history does not reach that far.
 *
 * <p>Sample input:
 * <pre>
 * 6
 * visit a
 * visit b
 * back 1
 * back 1
 * forward 1
 * forward 1
 * </pre>
 *
 * <p>Sample output:
 * <pre>
 * a
 * none
 * a
 * b
 * </pre>
 *
 * <p>Approach: an {@link ArrayList} of URLs plus a cursor. The cursor is the index of the
 * currently displayed page and may be {@code -1} (before the first page) or
 * {@code history.size() - 1} (the last page). Visiting truncates everything after the
 * cursor and appends the new URL.
 *
 * <p>Complexity: Time O(1) for visit and back/forward, O(n) worst case for visit because
 * the list may have to be truncated, Space O(n).
 */
public class DesignBrowserHistory {

    /** Text shown when the cursor is outside the recorded history. */
    public static final String EMPTY = "none";

    private final List<String> history = new ArrayList<>();
    private int cursor = -1;

    /** Opens {@code url}, discarding any forward history. */
    public void visit(String url) {
        while (history.size() > cursor + 1) {
            history.remove(history.size() - 1);
        }
        history.add(url);
        cursor++;
    }

    /** Moves back at most {@code steps} pages and returns the current URL. */
    public String back(int steps) {
        cursor = Math.max(-1, cursor - steps);
        return current();
    }

    /** Moves forward at most {@code steps} pages and returns the current URL. */
    public String forward(int steps) {
        cursor = Math.min(history.size() - 1, cursor + steps);
        return current();
    }

    /** The URL currently shown. */
    public String current() {
        if (cursor < 0 || cursor >= history.size()) {
            return EMPTY;
        }
        return history.get(cursor);
    }

    /** The recorded history, oldest first — used by the tests. */
    public List<String> entries() {
        return new ArrayList<>(history);
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        int n = fs.nextInt();

        DesignBrowserHistory browser = new DesignBrowserHistory();
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < n; i++) {
            String command = fs.next();
            if ("visit".equals(command)) {
                browser.visit(fs.next());
            } else if ("back".equals(command)) {
                out.append(browser.back(fs.nextInt())).append('\n');
            } else if ("forward".equals(command)) {
                out.append(browser.forward(fs.nextInt())).append('\n');
            }
        }
        System.out.print(out);
    }
}
