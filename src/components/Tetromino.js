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
  // Additional shapes
  U: {
    shape: [
      [8, 0, 8],
      [8, 8, 8],
    ],
    color: "pink",
  },
  X: {
    shape: [
      [0, 9, 0],
      [9, 9, 9],
      [0, 9, 0],
    ],
    color: "brown",
  },
  P: {
    shape: [
      [10, 10],
      [10, 0],
      [10, 10],
    ],
    color: "teal",
  },
  Q: {
    shape: [
      [11, 11, 0],
      [0, 11, 0],
      [0, 11, 11],
    ],
    color: "gold",
  },
  R: {
    shape: [
      [12, 12, 12],
      [12, 0, 0],
      [12, 12, 12],
    ],
    color: "lime",
  },
  W: {
    shape: [
      [0, 13, 13],
      [13, 13, 0],
      [13, 0, 0],
    ],
    color: "maroon",
  },
};

export const randomTetromino = () => {
  const keys = Object.keys(TETROMINOES);
  const key = keys[Math.floor(Math.random() * keys.length)];
  return { ...TETROMINOES[key], position: { x: 3, y: 0 } }; // Start at x: 3
};
