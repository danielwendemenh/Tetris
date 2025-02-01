# Plan for Building a Tetris Game in React

## 1. Project Setup

- Initialize a new React project with Vite or CRA.
- Install necessary dependencies:
  - `react`, `react-dom`
  - `tailwindcss` for styling (optional)
  - `zustand` or `redux` for state management (optional)

## 2. Core Game Mechanics

### 2.1 Game Board

- Define a grid-based system (10 columns × 20 rows).
- Store the board as a 2D array of cells where each cell is empty or occupied by a tetromino.
- Render the grid using a simple `<div>` structure or Canvas API for performance.

### 2.2 Tetrominoes

- Define tetromino shapes (L, J, O, I, T, S, Z) using arrays.
- Store:
  - Shape configurations (rotations)
  - Current position (x, y)
- Implement randomized spawning of tetrominoes.

### 2.3 Movement & Collision

- Implement functions for:
  - Moving left, right, down
  - Rotating (checking wall kicks)
  - Hard dropping
- Handle collision detection (prevent moving into walls or other tetrominoes).

## 3. Game Logic

### 3.1 Line Clearing & Scoring

- Detect and remove full rows.
- Shift rows downward when lines are cleared.
- Implement a scoring system based on:
  - Number of lines cleared
  - Soft drops and hard drops

### 3.2 Game Over & Restart

- Detect when tetrominoes stack above the board.
- Display a Game Over screen with restart functionality.

## 4. UI & Controls

### 4.1 Keyboard Controls

- Move (Arrow keys / A, D, S)
- Rotate (Up arrow / W)
- Hard drop (Spacebar)
- Pause (P)

### 4.2 UI Elements

- Start screen (Play button, instructions)
- Game board (Grid-based layout)
- Score panel (Current score, level, lines cleared)
- Next piece preview
- Hold piece system (Optional)

## 5. Advanced Features (Optional)

### 5.1 Ghost Piece

- Show where the tetromino will land.

### 5.2 Hold Mechanic

- Allow storing a tetromino for later use.

### 5.3 Levels & Speed Increase

- Increase drop speed as the game progresses.

### 5.4 Multiplayer Mode

- Implement a basic online mode using WebSockets.

### 5.5 Animations & Sound Effects

- Add CSS animations for smooth movement.
- Use sound effects for clearing lines, dropping pieces, and game over.

```
/src
  /components
    - GameBoard.js
    - Tetromino.js
    - NextPiece.js
    - HoldPiece.js
    - ScorePanel.js
  /hooks
    - useGameLogic.ts
    - useKeyboardControls.ts
  /utils
    - tetrominoShapes.ts
    - collisionDetection.ts
    - scoringSystem.ts
  /assets
    - sounds/
    - images/
  App.js
  index.js
```
