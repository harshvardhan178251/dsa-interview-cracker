package com.dsa.design;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class DesignTicTacToeTest {

    @Test
    void theFirstPlayerIsX() {
        DesignTicTacToe game = new DesignTicTacToe();
        assertEquals(1, game.currentPlayer());
        assertEquals(0, game.move(0, 0));
        assertEquals(2, game.currentPlayer());
    }

    @Test
    void detectsARowWin() {
        DesignTicTacToe game = new DesignTicTacToe();
        game.move(0, 0);   // X
        game.move(1, 0);   // O
        game.move(0, 1);   // X
        game.move(1, 1);   // O
        assertEquals(1, game.move(0, 2));
    }

    @Test
    void detectsAColumnWin() {
        DesignTicTacToe game = new DesignTicTacToe();
        game.move(0, 0);
        game.move(0, 1);
        game.move(1, 0);
        game.move(1, 1);
        assertEquals(1, game.move(2, 0));
    }

    @Test
    void detectsADiagonalWinForTheSecondPlayer() {
        DesignTicTacToe game = new DesignTicTacToe();
        game.move(0, 1);   // X
        game.move(0, 0);   // O
        game.move(2, 0);   // X
        game.move(1, 1);   // O
        game.move(1, 2);   // X
        assertEquals(2, game.move(2, 2));
    }

    @Test
    void detectsADraw() {
        DesignTicTacToe game = new DesignTicTacToe();
        game.move(0, 0);   // X
        game.move(0, 1);   // O
        game.move(0, 2);   // X
        game.move(1, 1);   // O
        game.move(1, 0);   // X
        game.move(1, 2);   // O
        game.move(2, 1);   // X
        game.move(2, 0);   // O
        assertEquals(3, game.move(2, 2));    // the board is full, nobody won
    }

    @Test
    void rejectsAnIllegalMove() {
        DesignTicTacToe game = new DesignTicTacToe();
        assertEquals(0, game.move(0, 0));
        assertEquals(-1, game.move(0, 0));   // the cell is taken
        assertEquals(-1, game.move(3, 0));   // out of range
        assertEquals(-1, game.move(-1, 0));  // out of range
    }

    @Test
    void rejectsMovesAfterTheGameIsOver() {
        DesignTicTacToe game = new DesignTicTacToe();
        game.move(0, 0);
        game.move(1, 0);
        game.move(0, 1);
        game.move(1, 1);
        assertEquals(1, game.move(0, 2));
        assertEquals(-1, game.move(2, 2));
    }

    @Test
    void showsTheBoard() {
        DesignTicTacToe game = new DesignTicTacToe();
        game.move(0, 0);
        game.move(1, 1);
        assertEquals("X..\n.O.\n...", game.state());
    }
}
