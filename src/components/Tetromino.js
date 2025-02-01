import React from "react";

const TETROMINOES = {
  I: { shape: [[1, 1, 1, 1]], color: "cyan" },
  J: {
    shape: [
      [2, 0, 0],
      [2, 2, 2],
    ],
    color: "blue",
  },
  L: {
    shape: [
      [0, 0, 3],
      [3, 3, 3],
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
    ],
    color: "green",
  },
  T: {
    shape: [
      [0, 6, 0],
      [6, 6, 6],
    ],
    color: "purple",
  },
  Z: {
    shape: [
      [7, 7, 0],
      [0, 7, 7],
    ],
    color: "red",
  },
};

export const randomTetromino = () => {
  const keys = Object.keys(TETROMINOES);
  const key = keys[Math.floor(Math.random() * keys.length)];
  return { ...TETROMINOES[key], position: { x: 3, y: 0 } }; // Start at x: 3
};

const Tetromino = ({ tetromino }) => (
  <div className="tetromino">
    {tetromino.shape.map((row, y) => (
      <div key={y} className="row">
        {row.map((cell, x) => (
          <div
            key={x}
            className="cell"
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: cell ? tetromino.color : "transparent",
              border: cell ? "1px solid black" : "none",
            }}
          />
        ))}
      </div>
    ))}
  </div>
);

export default Tetromino;
