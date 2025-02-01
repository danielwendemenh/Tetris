import React, { useState } from "react";

const tetrominoes = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: "cyan",
  },
  J: {
    shape: [
      [0, 0, 0],
      [2, 2, 2],
      [0, 0, 2],
    ],
    color: "blue",
  },
  L: {
    shape: [
      [0, 0, 0],
      [3, 3, 3],
      [3, 0, 0],
    ],
    color: "orange",
  },
  O: {
    shape: [
      [4, 4],
      [4, 4],
    ],
    color: "yellow",
  },
  S: {
    shape: [
      [0, 5, 5],
      [5, 5, 0],
      [0, 0, 0],
    ],
    color: "green",
  },
  T: {
    shape: [
      [0, 6, 0],
      [6, 6, 6],
      [0, 0, 0],
    ],
    color: "purple",
  },
  Z: {
    shape: [
      [7, 7, 0],
      [0, 7, 7],
      [0, 0, 0],
    ],
    color: "red",
  },
};

// Function to get a random Tetromino with default position
export const randomTetromino = () => {
  const tetrominoKeys = Object.keys(tetrominoes);
  const randomKey =
    tetrominoKeys[Math.floor(Math.random() * tetrominoKeys.length)];

  return {
    ...tetrominoes[randomKey],
    position: { x: Math.floor(10 / 2) - 1, y: 0 }, // Start in the middle at the top
  };
};

const Tetromino = () => {
  const [currentTetromino, setCurrentTetromino] = useState(randomTetromino());

  return (
    <div className="tetromino">
      {currentTetromino.shape.map((row, rowIndex) => (
        <div key={rowIndex} className="row" style={{ display: "flex" }}>
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className="cell"
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: cell ? currentTetromino.color : "transparent",
                border: cell ? "1px solid black" : "none",
              }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Tetromino;
