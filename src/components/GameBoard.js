import React, { useState, useEffect } from "react";
import { randomTetromino } from "./Tetromino";
import "./TetrisBoard.css";

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

const createEmptyBoard = () =>
  Array.from({ length: BOARD_HEIGHT }, () => new Array(BOARD_WIDTH).fill(0));

const GameBoard = () => {
  const [board, setBoard] = useState(createEmptyBoard());
  const [tetromino, setTetromino] = useState(randomTetromino());

  // Place tetromino on board
  useEffect(() => {
    const newBoard = createEmptyBoard();
    tetromino.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell !== 0) {
          const newY = y + tetromino.position.y;
          const newX = x + tetromino.position.x;

          // Ensure it's within bounds
          if (
            newY >= 0 &&
            newY < BOARD_HEIGHT &&
            newX >= 0 &&
            newX < BOARD_WIDTH
          ) {
            newBoard[newY][newX] = cell;
          }
        }
      });
    });
    setBoard(newBoard);
  }, [tetromino]);

  return (
    <div className="tetris-board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div key={colIndex} className={`cell ${cell ? "filled" : ""}`} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
