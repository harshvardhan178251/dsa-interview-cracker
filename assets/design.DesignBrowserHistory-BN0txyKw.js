var e=`design.DesignBrowserHistory`,t=`package com.dsa.design;

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
                out.append(browser.back(fs.nextInt())).append('\\n');
            } else if ("forward".equals(command)) {
                out.append(browser.forward(fs.nextInt())).append('\\n');
            }
        }
        System.out.print(out);
    }
}
`,n=`import java.util.ArrayList;
import java.util.List;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

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
public class Main {

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

        Main browser = new Main();
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < n; i++) {
            String command = fs.next();
            if ("visit".equals(command)) {
                browser.visit(fs.next());
            } else if ("back".equals(command)) {
                out.append(browser.back(fs.nextInt())).append('\\n');
            } else if ("forward".equals(command)) {
                out.append(browser.forward(fs.nextInt())).append('\\n');
            }
        }
        System.out.print(out);
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
`,r='\n# Design Browser History — LeetCode 348\n\n| | |\n|---|---|\n| **Difficulty** | Medium |\n| **Pattern** | Design · Array with a cursor |\n| **Interview heat** | ★★★☆☆ |\n| **Asked at** | Amazon, Google, Meta, Uber, Airbnb |\n\n## Problem Statement\n\nImplement a browser history with three operations:\n\n- `visit(url)` — open a new page. **The forward history is erased**, exactly like a real\n  browser: if you go back and then open a new tab, the pages you had gone forward to are\n  gone.\n- `back(steps)` — move back up to `steps` pages and return the URL now shown.\n- `forward(steps)` — move forward up to `steps` pages and return the URL now shown.\n\nMoving beyond the ends of the history clamps to the end instead of failing.\n\n## Input Format\n\n```\nn\nvisit url\nback k\nforward k\n...\n```\n\n- `n` — the number of commands.\n- `visit url` — open the page `url`.\n- `back k` / `forward k` — move `k` pages.\n\nThe program prints one line per `back` and `forward`: the URL that is now shown, or\n`none` when the history does not reach that far. `visit` prints nothing.\n\n## Sample Input\n\n```\n6\nvisit a\nvisit b\nback 1\nback 1\nforward 1\nforward 1\n```\n\n## Expected Output\n\n```\na\nnone\na\nb\n```\n\nThe second `back 1` tries to leave the history before its first page; the cursor stops\nat "before the beginning", so nothing is shown.\n\n## Approach — a list of URLs plus a cursor\n\nThe history is an `ArrayList<String>` and the cursor is the index of the page that is\ncurrently shown. It may be:\n\n- `0..size-1` — a real page,\n- `-1` — before the first page (the state after `back` at the very beginning).\n\n`visit(url)` truncates everything **after** the cursor and appends the new URL:\nthe forward history is exactly the tail of the list.\n\n```\nhistory = [a, b, c]      cursor = 1  (showing b)\n\nvisit d   →  truncate the tail after the cursor  →  history = [a, b]  →  append d\n          →  history = [a, b, d]                 cursor = 2\n```\n\n`back(k)` moves the cursor left, clamped at `-1`. `forward(k)` moves it right, clamped\nat `size - 1`.\n\n**Alternative: two stacks.** One stack for the pages before the cursor, one for the\npages after it; `back` pops from the first and pushes to the second. The array with a\ncursor is simpler and gives O(1) `back`/`forward`; the two-stack version gives O(1)\n`visit` without the O(n) truncation.\n\n## Dry Run\n\nInput: `visit a`, `visit b`, `back 1`, `back 1`, `forward 1`, `forward 1`.\n\n| Step | Command | `history` before | `cursor` before | Action | `history` after | `cursor` after | Shown | Output |\n|---:|---|---|---:|---|---|---:|---|---|\n| 1 | `visit a` | `[]` | -1 | truncate tail after cursor (nothing), append `a` | `[a]` | 0 | `a` | — |\n| 2 | `visit b` | `[a]` | 0 | truncate tail after cursor (nothing), append `b` | `[a, b]` | 1 | `b` | — |\n| 3 | `back 1` | `[a, b]` | 1 | cursor = max(-1, 1-1) = 0 | `[a, b]` | 0 | `a` | `a` |\n| 4 | `back 1` | `[a, b]` | 0 | cursor = max(-1, 0-1) = -1 | `[a, b]` | -1 | none | `none` |\n| 5 | `forward 1` | `[a, b]` | -1 | cursor = min(1, -1+1) = 0 | `[a, b]` | 0 | `a` | `a` |\n| 6 | `forward 1` | `[a, b]` | 0 | cursor = min(1, 0+1) = 1 | `[a, b]` | 1 | `b` | `b` |\n\n### Visiting after going back erases the forward history\n\n`visit a`, `visit b`, `visit c`, `back 2`, `visit d`:\n\n| Step | Command | `history` before | `cursor` | Action | `history` after | `cursor` |\n|---:|---|---|---:|---|---|---:|\n| 1 | `visit a` | `[]` | -1 | append `a` | `[a]` | 0 |\n| 2 | `visit b` | `[a]` | 0 | append `b` | `[a, b]` | 1 |\n| 3 | `visit c` | `[a, b]` | 1 | append `c` | `[a, b, c]` | 2 |\n| 4 | `back 2` | `[a, b, c]` | 2 | cursor = 0 | `[a, b, c]` | 0 |\n| 5 | `visit d` | `[a, b, c]` | 0 | truncate the tail after the cursor → `[a]`, append `d` | `[a, d]` | 1 |\n\nPages `b` and `c` are gone — that is the browser behaviour the problem asks for.\n\n## Java Solution\n\nSee [`DesignBrowserHistory.java`](./DesignBrowserHistory.java).\n\n```java\npublic void visit(String url) {\n    while (history.size() > cursor + 1) {\n        history.remove(history.size() - 1);   // erase the forward history\n    }\n    history.add(url);\n    cursor++;\n}\n\npublic String back(int steps) {\n    cursor = Math.max(-1, cursor - steps);\n    return current();\n}\n\npublic String forward(int steps) {\n    cursor = Math.min(history.size() - 1, cursor + steps);\n    return current();\n}\n\npublic String current() {\n    if (cursor < 0 || cursor >= history.size()) {\n        return EMPTY;                       // "none"\n    }\n    return history.get(cursor);\n}\n```\n\n## Complexity\n\n| | Value | Why |\n|---|---|---|\n| **Time** | O(1) for `back`/`forward`, O(n) worst case for `visit` | `visit` may have to truncate the tail |\n| **Space** | O(n) | one URL per visited page |\n\n## Interview Notes\n\n**Follow-ups to raise yourself:**\n- *"How would you make `visit` O(1)?"* → two stacks (before/after the cursor) instead of\n  one list with a cursor.\n- *"How would you support many tabs, each with its own history?"* → a stack of cursors,\n  one per tab.\n- *"How would you persist the history across restarts?"* → an append-only log on disk\n  plus a periodic checkpoint of the cursor.\n- *"What if `back` had to be O(1) for a huge history?"* → a doubly linked list, where\n  moving the cursor is a pointer swap.\n\n**Common mistakes:**\n- ❌ Not erasing the forward history on `visit`.\n- ❌ Clamping `back` to `0` instead of `-1` — then the "before the first page" state\n  cannot be represented.\n- ❌ Forgetting that `forward` past the last page must clamp, not throw.\n- ❌ Returning an empty string instead of a defined "nothing here" marker — pick one and\n  document it.\n\n**A note on the LeetCode wording.** LeetCode 348 says that a `back` beyond the first page\n*goes back to the first page*; this implementation instead stops one step further, in the\n"before the beginning" state, and prints `none`. The truncation on `visit` — the actual\npoint of the problem — behaves exactly like LeetCode\'s. If the interviewer insists on\nLeetCode\'s exact contract, change `Math.max(-1, ...)` to `Math.max(0, ...)` and drop the\n`none` state.\n\n**How to narrate:**\n> "The history is a list of URLs and a cursor that points at the current page. The\n> cursor can sit at -1, before the first page. `visit` truncates everything after the\n> cursor — that\'s the forward history — and appends the new URL. `back` and `forward`\n> just move the cursor and clamp it at the ends. Both are O(1); only `visit` can be O(n)\n> because of the truncation."\n\n## Related Problems\n\n- [Design Text Editor — LeetCode 2296](./DesignTextEditor.md) — a cursor and an undo journal\n- [Snapshot Array — LeetCode 1146](./SnapshotArray.md) — versioning a list of values\n- [Min Max Stack](./MinMaxStack.md) — the same "one mutable cursor" idea on a stack\n',i=[`main`],a={id:e,source:t,judgeSource:n,doc:r,methods:i};export{a as default,r as doc,e as id,n as judgeSource,i as methods,t as source};