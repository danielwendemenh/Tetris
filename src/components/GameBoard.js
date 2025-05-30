import React, { useState, useEffect, useRef, useCallback } from "react";
import { randomTetromino } from "./Tetromino";
import { FaPause } from "react-icons/fa"; // Import pause icon
import "./GameBoard.css";

const WIDTH = 10;
const HEIGHT = 20;
const colors = {
  1: "cyan",
  2: "blue",
  3: "orange",
  4: "yellow",
  5: "green",
  6: "purple",
  7: "red",
  8: "pink",
  9: "brown",
  10: "teal",
  11: "gold",
  12: "lime",
  13: "maroon",
};

// Create an empty board
const createBoard = () =>
  Array.from({ length: HEIGHT }, () => Array(WIDTH).fill(0));

const GameBoard = () => {
  const [board, setBoard] = useState(createBoard());
  const [tetromino, setTetromino] = useState(null);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const intervalRef = useRef(null);

  // Start the game
  const startGame = useCallback(() => {
    setGameStarted(true);
    setBoard(createBoard());
    setTetromino(randomTetromino());
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
  }, []);

  // Check for collisions
  const checkCollision = useCallback(
    (x, y, shape) => {
      for (let dy = 0; dy < shape.length; dy++) {
        for (let dx = 0; dx < shape[0].length; dx++) {
          if (shape[dy][dx]) {
            const boardY = y + dy;
            const boardX = x + dx;
            if (
              boardY < 0 ||
              boardY >= HEIGHT ||
              boardX < 0 ||
              boardX >= WIDTH ||
              board[boardY][boardX]
            ) {
              return true;
            }
          }
        }
      }
      return false;
    },
    [board]
  );

  // Place the tetromino on the board
  const placeTetromino = useCallback(() => {
    const newBoard = board.map((row) => [...row]);

    tetromino.shape.forEach((row, dy) =>
      row.forEach((cell, dx) => {
        if (cell) {
          newBoard[tetromino.position.y + dy][tetromino.position.x + dx] = cell;
        }
      })
    );

    const clearedBoard = clearLines(newBoard);
    setBoard(clearedBoard);

    // Spawn a new tetromino
    const newTetromino = randomTetromino();
    if (
      checkCollision(
        newTetromino.position.x,
        newTetromino.position.y,
        newTetromino.shape
      )
    ) {
      setGameOver(true);
    } else {
      setTetromino(newTetromino);
    }
  }, [board, tetromino, checkCollision]);

  // Clear completed lines and update the score
  const clearLines = useCallback((newBoard) => {
    const filteredBoard = newBoard.filter((row) => row.some((cell) => !cell));
    const cleared = HEIGHT - filteredBoard.length;
    setScore((prev) => prev + cleared * 100);

    while (filteredBoard.length < HEIGHT) {
      filteredBoard.unshift(Array(WIDTH).fill(0));
    }
    return filteredBoard;
  }, []);

  // Move the tetromino
  const moveTetromino = useCallback(
    (dx, dy) => {
      if (
        !checkCollision(
          tetromino.position.x + dx,
          tetromino.position.y + dy,
          tetromino.shape
        )
      ) {
        setTetromino((prev) => ({
          ...prev,
          position: { x: prev.position.x + dx, y: prev.position.y + dy },
        }));
      } else if (dy > 0) {
        placeTetromino();
      }
    },
    [tetromino, checkCollision, placeTetromino]
  );

  // Rotate the tetromino
  const rotateTetromino = useCallback(() => {
    const rotatedShape = tetromino.shape[0].map((_, i) =>
      tetromino.shape.map((row) => row[i]).reverse()
    );
    if (
      !checkCollision(tetromino.position.x, tetromino.position.y, rotatedShape)
    ) {
      setTetromino((prev) => ({ ...prev, shape: rotatedShape }));
    }
  }, [tetromino, checkCollision]);

  // Handle keyboard input
  const handleKey = useCallback(
    (e) => {
      if (!gameStarted || gameOver || isPaused) return;

      const actions = {
        ArrowLeft: () => moveTetromino(-1, 0),
        ArrowRight: () => moveTetromino(1, 0),
        ArrowDown: () => moveTetromino(0, 1),
        ArrowUp: rotateTetromino,
        p: () => setIsPaused((prev) => !prev),
      };

      if (actions[e.key]) actions[e.key]();
    },
    [
      gameStarted,
      gameOver,
      isPaused,
      moveTetromino,
      rotateTetromino,
      tetromino,
      checkCollision,
      placeTetromino,
    ]
  );

  // Add keyboard event listener
  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  // Game loop
  useEffect(() => {
    if (gameStarted && !gameOver && !isPaused) {
      intervalRef.current = setInterval(() => moveTetromino(0, 1), 1000);
      return () => clearInterval(intervalRef.current);
    }
  }, [gameStarted, gameOver, isPaused, moveTetromino]);

  const renderBoard = useCallback(() => {
    const newBoard = board.map((row) => [...row]);
    if (tetromino) {
      tetromino.shape.forEach((row, dy) =>
        row.forEach((cell, dx) => {
          if (cell) {
            const y = tetromino.position.y + dy;
            const x = tetromino.position.x + dx;
            if (y >= 0 && y < HEIGHT && x >= 0 && x < WIDTH) {
              newBoard[y][x] = cell; // Use the tetromino color
            }
          }
        })
      );
    }
    return newBoard;
  }, [board, tetromino]);

  const handlePause = () => {
    setIsPaused((prev) => !prev);
  };

  const goToMainMenu = () => {
    setGameStarted(false);
    setIsPaused(false);
    setGameOver(false);
  };

  return (
    <div className="tetris-game">
      {!gameStarted ? (
        <div className="main-menu">
          <h1 className="game-title">Tetris</h1>
          <p className="difficulty-notice">
            Increase difficulty in settings before starting!
          </p>
          <button className="start-button" onClick={startGame}>
            Start Game
          </button>
          <div className="menu-options">
            <button className="menu-item">Last Scores</button>
            <button className="menu-item">Settings</button>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", gap: "10px" }}>
          {/* Pause Button */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <button className="pause-icon" onClick={handlePause}>
                <FaPause />
              </button>
            </div>
          </div>

          <div>
            <div className="score">Score: {score}</div>
            {gameOver && <div className="game-over">Game Over!</div>}

            {/* Overlay Menu when Paused */}
            {(gameOver || isPaused) && (
              <div className="pause-menu-overlay">
                <div className="pause-menu">
                  <h2>Paused</h2>
                  <button onClick={handlePause} className="resume-button">
                    Resume
                  </button>
                  <button onClick={startGame} className="restart-button">
                    Restart
                  </button>
                  <button onClick={goToMainMenu} className="menu-button">
                    Main Menu
                  </button>
                </div>
              </div>
            )}
            {/* Game Board */}
            <div className="tetris-board">
              {renderBoard().map((row, y) => (
                <div key={y} className="row">
                  {row.map((cell, x) => {
                    let color = null;
                    if (cell) {
                      color = colors[cell] ?? tetromino.color;
                    }
                    return (
                      <div
                        key={x}
                        className="cell"
                        style={{
                          width: "20px",
                          height: "20px",
                          backgroundColor: color || "transparent",
                          border: cell ? "1px solid black" : "none",
                        }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Mobile touch controls */}
            <div className="mobile-controls">
              <button onTouchStart={() => moveTetromino(-1, 0)}>◀</button>
              <button onTouchStart={() => moveTetromino(1, 0)}>▶</button>
              <button onTouchStart={() => moveTetromino(0, 1)}>▼</button>
              <button onTouchStart={rotateTetromino}>⟳</button>
              <button onTouchStart={handlePause}>
                {isPaused ? "▶︎ Resume" : "❚❚ Pause"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
