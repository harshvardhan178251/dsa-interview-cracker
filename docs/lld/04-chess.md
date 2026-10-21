---
title: LLD — Chess game
order: 4
summary: Designing a chess engine — the board model, piece hierarchy, legal move generation, and why the hard part is validation, not the representation.
---

# LLD — Chess game

## Requirements

- Represent a chess board and the pieces on it.
- Validate a move (legal for the piece, legal for the position).
- Move a piece and update the board state.
- Detect check, checkmate and stalemate.
- Track whose turn it is, and the move history.

## Core design

```
ChessGame
 ├── board: Board
 ├── turn: Color
 ├── history: List<Move>
 └── state: IN_PROGRESS | CHECKMATE | STALEMATE | DRAW

Board
 ├── squares: Piece[8][8]
 └── positionKey: String        // for repetition detection

Piece (abstract)
 ├── color: Color
 ├── type: PieceType
 ├── hasMoved: boolean          // for castling and en passant
 └── moves(Board): List<Square> // piece-specific movement rules

  ├── Pawn   ├── Knight ├── Bishop
  ├── Rook   ├── Queen  └── King

Move
 ├── from: Square
 ├── to: Square
 ├── piece: Piece
 ├── captured: Piece (nullable)
 └── flags: castle, enPassant, doublePush
```

**The piece hierarchy is the right shape.** Each piece knows how it moves. The board does
not contain a giant `if (pieceType == ...)` switch.

## The board

An 8×8 array indexed by `[rank][file]`, with rank 0 as white's back rank.

```java
public class Board {
    private final Piece[][] squares = new Piece[8][8];

    public Piece at(int rank, int file) {
        return squares[rank][file];
    }

    public void place(Piece piece, int rank, int file) {
        squares[rank][file] = piece;
    }

    public void remove(int rank, int file) {
        squares[rank][file] = null;
    }

    public boolean isEmpty(int rank, int file) {
        return squares[rank][file] == null;
    }
}
```

**Using `null` for empty squares** is fine here because there is exactly one kind of
"nothing" on a chess board. (Contrast with the LRU cache, where `null` was ambiguous.)

**Alternative:** a `char[8][8]` with characters like `'P'`, `'p'`, `'N'`. Simpler and
faster, and it is what most engines use. Mention it as a simplification, but the
piece-object model is easier to extend.

## Move generation

Each piece implements its own movement:

```java
public abstract class Piece {
    protected final Color color;
    protected final PieceType type;
    protected boolean hasMoved;

    /** Squares this piece attacks, ignoring whether the king would be left in check. */
    public abstract List<Square> pseudoMoves(Board board);
}
```

The distinction that matters:

- **Pseudo-legal moves** — moves that follow the piece's movement rules. A knight has up
  to 8, a rook up to 14.
- **Legal moves** — pseudo-legal moves that do not leave your own king in check.

**Generating legal moves is the expensive part**, because you must simulate the move and
test the king. The standard approach:

```java
public List<Move> legalMoves(Board board, Color color) {
    List<Move> result = new ArrayList<>();
    for (int rank = 0; rank < 8; rank++) {
        for (int file = 0; file < 8; file++) {
            Piece piece = board.at(rank, file);
            if (piece == null || piece.getColor() != color) continue;
            for (Square to : piece.pseudoMoves(board)) {
                Move move = new Move(new Square(rank, file), to, piece);
                if (!leavesKingInCheck(board, move)) {
                    result.add(move);
                }
            }
        }
    }
    return result;
}
```

**`leavesKingInCheck`** applies the move to a copy of the board, finds the king, and tests
whether it is attacked.

## Sliding pieces (rook, bishop, queen)

Slide until you hit something:

```java
private List<Square> slide(Board board, Square from, int rankStep, int fileStep) {
    List<Square> moves = new ArrayList<>();
    int rank = from.rank() + rankStep;
    int file = from.file() + fileStep;
    while (isOnBoard(rank, file)) {
        Piece occupant = board.at(rank, file);
        if (occupant == null) {
            moves.add(new Square(rank, file));   // empty square: can land here
        } else {
            if (occupant.getColor() != color) {
                moves.add(new Square(rank, file));   // enemy: can capture, then stop
            }
            break;   // blocked either way
        }
        rank += rankStep;
        file += fileStep;
    }
    return moves;
}
```

Rook: 4 directions. Bishop: 4 diagonals. Queen: all 8.

## The special moves

| Move | Rule | State to track |
|---|---|---|
| **Castling** | King and rook have not moved; squares between are empty; king is not in check | `hasMoved` on the king and rook |
| **En passant** | A pawn just moved two squares; you may capture it as if it moved one | The previous move's double-push |
| **Promotion** | A pawn reaching the last rank becomes a queen (or rook, bishop, knight) | Handled in the move application |
| **Fifty-move rule** | 50 moves without a capture or pawn move | Move history |
| **Threefold repetition** | The same position occurred three times | A hash of the position |
| **Insufficient material** | King vs king, or king+bishop vs king | A material check |

**Castling implementation:**

```java
boolean canCastle(Board board, Square kingFrom, Square kingTo) {
    King king = (King) board.at(kingFrom.rank(), kingFrom.file());
    if (king.hasMoved()) return false;
    if (isInCheck(board)) return false;

    int rookFile = kingTo.file() > kingFrom.file() ? 7 : 0;   // king side or queen side
    Rook rook = (Rook) board.at(kingFrom.rank(), rookFile);
    if (rook == null || rook.hasMoved()) return false;

    // squares between the king and the rook must be empty
    for (int file = Math.min(kingFrom.file(), rookFile) + 1;
         file < Math.max(kingFrom.file(), rookFile); file++) {
        if (!board.isEmpty(kingFrom.rank(), file)) return false;
    }
    return true;
}
```

**En passant** needs the previous move, so the game state must keep it.

## Check and checkmate

```java
public boolean isInCheck(Board board, Color color) {
    Square kingSquare = board.findKing(color);
    return board.isAttacked(kingSquare, color.opposite());
}

public boolean isCheckmate(Board board, Color color) {
    if (!isInCheck(board, color)) return false;
    return legalMoves(board, color).isEmpty();   // in check and no escape
}

public boolean isStalemate(Board board, Color color) {
    if (isInCheck(board, color)) return false;
    return legalMoves(board, color).isEmpty();   // not in check and no move
}
```

**Checkmate and stalemate have the same shape** — the difference is only whether the king
is in check. That symmetry is worth pointing out.

## Move application

```java
public void apply(Move move) {
    Piece piece = move.piece();
    Piece captured = board.at(move.to());

    board.remove(move.from().rank(), move.from().file());
    board.place(piece, move.to().rank(), move.to().file());

    if (captured != null) {
        capturedCount[piece.getColor()]++;
    }
    if (piece instanceof Pawn) {
        handlePawnPromotions(move);
        handleEnPassantCapture(move);
    }
    if (piece instanceof King && Math.abs(move.to().file() - move.from().file()) == 2) {
        handleCastlingRookMove(move);
    }
    piece.setHasMoved(true);
    history.add(move);
    turn = turn.opposite();
}
```

**Make the move, then evaluate.** Never evaluate the position from a partially applied
state.

## Undo

Chess UIs need undo, and it is a good demonstration of immutable state.

**Option A: copy the board.** Simple, and the board is small enough (64 squares).

**Option B: an undo stack.** Each `apply` pushes the inverse move; `undo` pops and
reverses it.

**Option C: keep the full history and replay.** Simplest, and the most robust — but O(n)
per undo.

For a design interview, **Option A** (copy the board) is perfectly defensible and much
easier to get right. Say so.

## Complexity

| Operation | Complexity |
|---|---|
| Generate pseudo-legal moves | O(squares × branching) ≈ O(64 × 27) |
| Legal moves (with check validation) | O(moves × board scan) — the expensive part |
| Apply a move | O(1) |
| Find the king | O(64) |

**A note on performance:** real engines use bitboards (a `long` per piece type, one bit per
square) so move generation is a handful of bitwise operations instead of a nested loop.
Mentioning that you know bitboards exist shows depth — but do not implement them unless
asked.

## Common mistakes

- ❌ Generating pseudo-legal moves and calling them legal.
- ❌ Forgetting to handle the king's own castling rights and the rook's.
- ❌ Not handling en passant at all.
- ❌ Forgetting pawn promotion.
- ❌ Missing that the king cannot move into check — a subtle bug that requires checking
  the king on *every* candidate square.
- ❌ Treating checkmate and stalemate as the same thing.
- ❌ Not checking that the path to a rook/queen is clear.
- ❌ Forgetting to swap the turn after a move.

## Extensions to be ready for

| Extension | Design |
|---|---|
| Move history and notation | Store the `Move` list; render algebraic notation from it |
| AI opponent | Minimax with alpha-beta pruning, plus a piece-square table |
| Save/load | Serialise the board, turn, and special-state flags |
| Multiplayer | A server holding the authoritative game state; moves are messages |
| Timer | A clock per side, decremented on a server-authoritative tick |
| Hints | Highlight all legal moves for the player to move |
