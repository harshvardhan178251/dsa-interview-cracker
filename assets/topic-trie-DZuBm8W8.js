var e=`topic:trie`,t=`
# Trie — concept notes

## The mental model

A trie is a tree where each edge is a **character**, and each node represents a
**prefix**.

\`\`\`
        (root)
       /  |  \\
      a   b   c
     /       |
    p        a
   /           \\
  p             b
\`\`\`

- The root is the empty prefix.
- A node at depth \`k\` represents a string of length \`k\`.
- A node is marked \`isEndOfWord\` if that prefix is a complete word.
- Every node has one child per possible character.

**The key property:** two strings share a prefix exactly when their paths share a prefix
in the trie. So **prefix queries are O(prefix length)**, not O(n).

---

## When a trie beats a hash map

| Query | Hash map | Trie |
|---|---|---|
| "Does this exact word exist?" | **O(1)** — use a hash map | O(L) |
| "What words start with \`ab\`?" | O(n) — scan everything | **O(L)** |
| "Does any word start with \`ab\`?" | O(n) | **O(L)** |
| Autocomplete | O(n) | **O(L + results)** |
| Longest prefix in a dictionary | O(n) | **O(L)** |

**Rule of thumb:** use a trie when the question involves a **prefix**, or when you need
to share the work across many similar queries.

**Do not use a trie for exact-match lookups.** A \`HashSet\` is faster and simpler.

---

## The node representation

\`\`\`java
public class TrieNode {
    public Map<Character, TrieNode> children = new HashMap<>();
    public boolean isEndOfWord;
}
\`\`\`

**Two designs, and the choice matters:**

| Design | Pros | Cons |
|---|---|---|
| **HashMap per node** | Any alphabet, sparse | Allocation heavy, hashing per character |
| **Fixed array per node** (26 for a-z) | O(1) index, no hashing | 26 pointers per node — memory heavy |
| **Map per node, but only for branching nodes** | Best of both | More complex |

**The fixed-array version** is the classic in textbooks:

\`\`\`java
class TrieNode {
    TrieNode[] children = new TrieNode[26];
    boolean isEndOfWord;
}
\`\`\`

**The hash-map version** is the right choice in production, because real text has
uppercase, digits and punctuation.

**A good middle ground:** a map, but with a fast path for single-child nodes. Most trie
nodes have exactly one child, so this saves a lot of allocation.

---

## Implementing a trie

\`\`\`java
public class Trie {
    private final TrieNode root = new TrieNode();

    public void insert(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            node = node.getOrCreateChild(c);
        }
        node.isEndOfWord = true;
    }

    public boolean search(String word) {
        TrieNode node = find(word);
        return node != null && node.isEndOfWord;
    }

    public boolean startsWith(String prefix) {
        return find(prefix) != null;
    }

    private TrieNode find(String s) {
        TrieNode node = root;
        for (char c : s.toCharArray()) {
            node = node.child(c);
            if (node == null) return null;
        }
        return node;
    }
}
\`\`\`

**\`search\` vs \`startsWith\`:** \`search\` requires the node to be a complete word;
\`startsWith\` only requires the path to exist. **This distinction is the whole point of
the structure** — say it in the interview.

**The \`getOrCreateChild\` vs \`child\` distinction** in the insert/find paths is worth
pointing out: insert creates, find only looks up.

---

## Add and Search Words (LC 211)

Wildcard support: \`.\` matches any single character.

\`\`\`java
public boolean search(String word) {
    return search(word, 0, root);
}

private boolean search(String word, int index, TrieNode node) {
    if (index == word.length()) return node.isEndOfWord;
    char c = word.charAt(index);
    if (c != '.') {
        TrieNode child = node.child(c);
        return child != null && search(word, index + 1, child);
    }
    // wildcard: try every child
    for (TrieNode child : node.children.values()) {
        if (search(word, index + 1, child)) return true;
    }
    return false;
}
\`\`\`

**The \`.\` case is a backtracking search** — the trie gives you the candidate branches, and
recursion picks one.

**An optimisation:** if the node has no children, the rest of the word must be all
wildcards.

---

## Word Search II (LC 212) — the killer application

**The problem:** given a grid and a list of words, find all words in the grid. Doing it
word by word is O(words × rows × cols × 4^length) — far too slow.

**The trie solution:** walk the grid, and at each cell try to continue a path in the trie.
Every time you reach a node marked \`isEndOfWord\`, you have found a word.

\`\`\`java
public List<String> findWords(char[][] board, String[] words) {
    TrieNode root = new TrieNode();
    for (String word : words) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            node = node.getOrCreateChild(c);
        }
        node.isEndOfWord = true;
        node.word = word;             // store the full word for output
    }

    List<String> result = new ArrayList<>();
    for (int r = 0; r < board.length; r++) {
        for (int c = 0; c < board[0].length; c++) {
            dfs(board, r, c, root, result);
        }
    }
    return result;
}

private void dfs(char[][] board, int r, int c, TrieNode node, List<String> result) {
    if (r < 0 || r >= board.length || c < 0 || c >= board[0].length) return;
    char ch = board[r][c];
    if (!node.hasChild(ch)) return;

    TrieNode child = node.child(ch);
    if (child.isEndOfWord) {
        result.add(child.word);
        child.isEndOfWord = false;      // do not report the same word twice
    }

    board[r][c] = '#';                   // mark visited
    dfs(board, r + 1, c, child, result);
    dfs(board, r - 1, c, child, result);
    dfs(board, r, c + 1, child, result);
    dfs(board, r, c - 1, child, result);
    board[r][c] = ch;                   // restore

    // optional pruning: if this subtree has no words left, remove it
}
\`\`\`

**The key insight: the trie shares the work.** All words starting with "ab" share the
same path, so exploring the grid once finds all of them.

**The \`child.isEndOfWord = false\` trick** prevents reporting duplicates — and it also
enables the **pruning optimisation**: after a word is found, you can delete it from the
trie, and any node with no remaining word descendants can be pruned. That turns the
worst case from O(rows × cols × maxLength) into something much better.

**The complexity:** O(rows × cols × 4^L) in the worst case, but the trie pruning makes
the *effective* cost proportional to the trie size rather than the grid area times the
word length.

---

## The prefix-counting variant

**A common follow-up:** "insert words, then count how many words start with a given
prefix."

\`\`\`java
public class PrefixCountTrie {
    private final TrieNode root = new TrieNode();

    public void insert(String word) {
        TrieNode node = root;
        node.passCount++;                 // the empty prefix matches every word
        for (char c : word.toCharArray()) {
            node = node.getOrCreateChild(c);
            node.passCount++;
        }
        node.isEndOfWord = true;
    }

    public int countStartingWith(String prefix) {
        TrieNode node = find(prefix);
        return node == null ? 0 : node.passCount;
    }
}
\`\`\`

**\`passCount\` counts how many inserted words pass through the node** — that is exactly
the number of words with that prefix.

**This is the design behind autocomplete** ("give me the 10 most common completions of
\`ab\`") and behind prefix range queries.

---

## Camelcase matching (LC 1253)

**The problem:** a query like \`"ba"\` matches \`"Black Apple"\` but not \`"BlaCk apple"\`.

The rule: **an uppercase letter in the query must match an uppercase letter in the
input**, and a lowercase query letter matches the next letter regardless of case.

\`\`\`java
public static boolean isCamelMatch(String query, String s) {
    int i = 0;
    for (char c : query.toCharArray()) {
        if (Character.isUpperCase(c)) {
            // find the next uppercase letter in s
            while (i < s.length() && !Character.isUpperCase(s.charAt(i))) i++;
            if (i >= s.length() || s.charAt(i) != c) return false;
            i++;
        } else {
            if (i >= s.length() || Character.toLowerCase(s.charAt(i)) != c) return false;
            i++;
        }
    }
    return true;
}
\`\`\`

**This is a two-pointer problem wearing a trie's clothes** — the trie is not needed, but
the *idea* of scanning in parallel with case-sensitivity rules is the same.

---

## Memory: the real problem with tries

A trie is **memory-hungry**. Each node holds a map (or 26 array slots), and most nodes
have exactly one child.

For a dictionary of a million words averaging 8 characters, you have ~8 million nodes,
each holding a \`HashMap\` object. **That is hundreds of megabytes.**

**Mitigations:**
1. **Compressed trie (radix tree)** — collapse chains of single-child nodes into one edge
   labelled with the whole substring. This typically cuts the node count by 5–10×.
2. **Store only the branching nodes** in a map, and handle the single-child case inline.
3. **Use a sorted array of words + binary search** for prefix queries — \`lower_bound\`
   on the prefix gives the range. This is often the *better* answer, and it is worth
   offering it as an alternative.

**The sorted-array alternative is a genuinely good interview answer:**

\`\`\`java
// All words starting with "ab" are contiguous in sorted order
int index = lowerBound(words, prefix);
while (index < words.size() && words.get(index).startsWith(prefix)) {
    // this word matches
    index++;
}
\`\`\`

**O(log n) to find the start, then O(results).** No trie needed. If the interviewer
asks "design an autocomplete", offering both and discussing the trade-offs is the
strongest possible answer.

---

## Common traps

| Trap | Why it bites |
|---|---|
| Confusing \`search\` and \`startsWith\` | The whole point of the structure |
| Not marking \`isEndOfWord\` on the final node | The word is never found |
| Forgetting to mark visited in a grid DFS | Infinite recursion / duplicate results |
| Not restoring the grid cell after backtracking | Other paths are blocked |
| Reporting the same word twice | Need to clear \`isEndOfWord\` or track a found set |
| Using a 26-element array for non-lowercase input | ArrayIndexOutOfBounds |
| Not pruning the trie in Word Search II | TLE on large inputs |
| Assuming the trie saves memory | It usually uses more |

---

## Complexity cheat sheet

| Operation | Time | Space |
|---|---|---|
| Insert a word of length L | O(L) | O(L) nodes |
| Search a word of length L | O(L) | — |
| Starts-with a prefix of length L | O(L) | — |
| Prefix count | O(L) | — |
| Word Search II | O(rows × cols × 4^L) worst, far less with pruning | O(total characters) |
| Sorted-array prefix search | O(log n + results) | O(n) for the array |

---

## How to crack it in an interview

1. **Say what the nodes represent** — "each node is a prefix, and \`isEndOfWord\` marks
   complete words".
2. **Explain the advantage over a hash map** — "a hash map cannot answer prefix queries
   without scanning everything".
3. **Choose the child representation** and justify it — fixed array for a small fixed
   alphabet, map otherwise.
4. **For grid search problems, describe the pruning** — deleting found words and pruning
   empty subtrees is what makes it fast enough.
5. **Mention the sorted-array alternative** for prefix queries. It shows judgement.
6. **Mention memory** if the dictionary is large — a compressed trie or a sorted array.
`,n={id:e,body:t};export{t as body,n as default,e as id};