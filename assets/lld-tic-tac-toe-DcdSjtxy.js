var e=`lld:tic-tac-toe`,t=`
# LLD — Tic-tac-toe

*Small enough to complete in an interview, rich enough to demonstrate the patterns.*

## Requirements

- A 3×3 board, two players, X and O.
- X moves first; players alternate.
- Detect a win (row, column, or diagonal), a draw (board full), and reset.
- Optionally: an AI opponent.

## Core design

\`\`\`
TicTacToeGame
 ├── board: Board
 ├── currentPlayer: Player
 └── state: IN_PROGRESS | X_WINS | O_WINS | DRAW

Board
 └── cells: Cell[3][3]

Cell
 ├── row, col
 ├── mark: X | O | EMPTY
\`\`\`

**The board owns the rules, the game owns the flow.** A clean separation.

\`\`\`java
public enum Mark { X, O, EMPTY }
public enum Player { X, O }

public class Board {
    private final Mark[][] cells = new Mark[3][3];

    public Board() {
        for (Mark[] row : cells) {
            Arrays.fill(row, Mark.EMPTY);
        }
    }

    public Mark at(int row, int col) {
        return cells[row][col];
    }

    public boolean place(int row, int col, Mark mark) {
        if (cells[row][col] != Mark.EMPTY) return false;
        cells[row][col] = mark;
        return true;
    }

    public boolean isFull() {
        for (Mark[] row : cells) {
            for (Mark cell : row) {
                if (cell == Mark.EMPTY) return false;
            }
        }
        return true;
    }
}
\`\`\`

**Win detection with winning-line constants:**

\`\`\`java
private static final int[][][] WINNING_LINES = {
    {{0,0},{0,1},{0,2}},   // rows
    {{1,0},{1,1},{1,2}},
    {{2,0},{2,1},{2,2}},
    {{0,0},{1,0},{2,0}},   // columns
    {{0,1},{1,1},{2,1}},
    {{0,2},{1,2},{2,2}},
    {{0,0},{1,1},{2,2}},   // diagonals
    {{0,2},{1,1},{2,0}},
};

public Optional<Player> winner() {
    for (int[][] line : WINNING_LINES) {
        Mark first = cells[line[0][0]][line[0][1]];
        if (first != Mark.EMPTY
                && cells[line[1][0]][line[1][1]] == first
                && cells[line[2][0]][line[2][1]] == first) {
            return Optional.of(first == Mark.X ? Player.X : Player.O);
        }
    }
    return Optional.empty();
}
\`\`\`

**The \`WINNING_LINES\` table is better than eight hand-written \`if\` checks** — it is
data, not control flow, and adding a rule (or a 4×4 variant) means adding a line.

**For an n×n board, derive the lines instead of hard-coding them** — generate the rows,
the columns and the diagonals programmatically. The hard-coded table is fine for 3×3.

## Game flow

\`\`\`java
public class TicTacToeGame {
    private final Board board = new Board();
    private Player currentPlayer = Player.X;

    public boolean play(int row, int col) {
        if (status() != Status.IN_PROGRESS) {
            throw new IllegalStateException("The game is already over");
        }
        if (!board.place(row, col, currentPlayer == Player.X ? Mark.X : Mark.O)) {
            return false;                       // the cell was taken
        }
        currentPlayer = currentPlayer == Player.X ? Player.O : Player.X;
        return true;
    }

    public Status status() {
        Optional<Player> winner = board.winner();
        if (winner.isPresent()) {
            return winner.get() == Player.X ? Status.X_WINS : Status.O_WINS;
        }
        return board.isFull() ? Status.DRAW : Status.IN_PROGRESS;
    }
}
\`\`\`

**Note the order of the checks:** winner first, then draw. A full board with a winning
line is a win, not a draw.

## The AI — minimax with alpha-beta pruning

The AI scores each possible move for the current player:

| Outcome | Score (from X's perspective) |
|---|---|
| X wins | +10 |
| O wins | −10 |
| Draw | 0 |

\`\`\`java
private int minimax(Mark[][] board, int depth, boolean isMax, boolean isAiTurn, int alpha, int beta) {
    int score = evaluate(board);
    if (score == 10 || score == -10 || depth == 0 || isFull(board)) {
        return score;
    }

    if (isAiTurn) {   // maximise
        int best = Integer.MIN_VALUE;
        for (Move move : availableMoves(board)) {
            board[move.row()][move.col()] = Mark.O;
            best = Math.max(best, minimax(board, depth - 1, false, false, alpha, beta));
            board[move.row()][move.col()] = Mark.EMPTY;
            alpha = Math.max(alpha, best);
            if (alpha >= beta) break;    // beta cutoff
        }
        return best;
    } else {          // minimise
        int worst = Integer.MAX_VALUE;
        for (Move move : availableMoves(board)) {
            board[move.row()][move.col()] = Mark.X;
            worst = Math.min(worst, minimax(board, depth - 1, false, true, alpha, beta));
            board[move.row()][move.col()] = Mark.EMPTY;
            beta = Math.min(beta, worst);
            if (alpha >= beta) break;    // alpha cutoff
        }
        return worst;
    }
}
\`\`\`

**Alpha-beta pruning** is the reason this is fast: once a branch is provably worse than
something already explored, the rest of the branch is skipped. On a 3×3 board it cuts the
tree from ~550k nodes to a few thousand.

**Explain it in the interview:** "alpha is the best score the maximiser can guarantee so
far, beta is the best the minimiser can guarantee. If alpha ≥ beta, this branch cannot
change the parent's decision, so we stop exploring it."

## Making the AI swappable — the strategy pattern

\`\`\`java
public interface MoveStrategy {
    Optional<Move> nextMove(Board board, Player player);
}

public class MinimaxStrategy implements MoveStrategy { ... }
public class FirstAvailableMoveStrategy implements MoveStrategy { ... }
public class RandomMoveStrategy implements MoveStrategy { ... }
public class CornerFirstStrategy implements MoveStrategy { ... }
\`\`\`

The game holds a \`MoveStrategy\` and never knows which one it has. **This is the point of
the exercise** — the interviewer wants to see the abstraction, not the minimax.

\`\`\`java
public class TicTacToeGame {
    private final MoveStrategy strategy;
    ...
}
\`\`\`

## Undo

Same approach as the chess design: keep an undo stack of moves, or copy the board.

\`\`\`java
private final Deque<Move> history = new ArrayDeque<>();

public void undo() {
    Move last = history.pop();
    board.clear(last.row(), last.col());
}
\`\`\`

## Complexity

| Operation | Complexity |
|---|---|
| Play a move | O(1) |
| Check for a winner | O(1) — 8 lines × 3 cells |
| Check for a draw | O(1) — 9 cells |
| Minimax (no pruning) | O(9!) ≈ 362,880 nodes |
| Minimax (with alpha-beta) | ~O(√9!) ≈ a few thousand nodes |
| Undo | O(1) |

## Common mistakes

- ❌ Checking for a draw before checking for a win.
- ❌ Letting a player overwrite an occupied cell.
- ❌ Forgetting to switch the turn after a successful move.
- ❌ Letting the player move after the game has ended.
- ❌ Mutating the board in minimax without restoring it — the classic bug. Always undo the
  trial move.
- ❌ Getting the alpha-beta update backwards (alpha is for the maximiser, beta for the
  minimiser).

## Extensions to be ready for

| Extension | Design |
|---|---|
| Different board sizes | Generalise to n×n; derive the winning lines |
| Undo / redo | An undo stack plus a redo stack |
| Score tracking | A \`Map<Player, Integer>\` of wins and draws |
| N-player variant | Generalise \`Mark\` to a list of players; the win check becomes "does this player have a line" |
| Human vs AI | The strategy pattern above |
| A game server | The server owns the state; clients send moves and receive the new board |
`,n={id:e,body:t};export{t as body,n as default,e as id};