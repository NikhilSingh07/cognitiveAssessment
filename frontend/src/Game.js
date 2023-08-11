import React, { useEffect, useState } from 'react';
import './Game.css';

const gridSize = 5;
const totalShapes = 18;
const shapes = ['▢', '☆', '△', '○', '♦', '⬡'];
const revealDuration = 3000;
const numShapesToHideFruit = 6;

const Game = () => {
  const [grid, setGrid] = useState([]);
  const [fruitIndex, setFruitIndex] = useState(-1);
  const [foundFruits, setFoundFruits] = useState(0);

  useEffect(() => {
    initializeGrid();
  }, []);

  const initializeGrid = () => {
    const shapeIndices = Array.from({ length: totalShapes }, (_, i) => i);
    const hiddenShapesIndices = [];
    const newGrid = [];

    // Create an array with 3 of each shape
    const shapeCountMap = {};
    for (const shape of shapes) {
      shapeCountMap[shape] = 3;
    }

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const availableShapes = Object.keys(shapeCountMap).filter(shape => shapeCountMap[shape] > 0);
        const randomShape = availableShapes[Math.floor(Math.random() * availableShapes.length)];

        if (randomShape) {
          shapeCountMap[randomShape]--;
        }

        const cell = {
          row,
          col,
          shape: randomShape || '', // Empty shape if no more available
        };
        newGrid.push(cell);
      }
    }

    // Choose the fruit index from the hidden shapes
    for (let i = 0; i < numShapesToHideFruit; i++) {
      const randomIndex = Math.floor(Math.random() * shapeIndices.length);
      hiddenShapesIndices.push(shapeIndices[randomIndex]);
      shapeIndices.splice(randomIndex, 1);
    }

    setFruitIndex(hiddenShapesIndices[Math.floor(Math.random() * numShapesToHideFruit)]);
    setGrid(newGrid);
  };

  const revealShape = (cell) => {
    if (!cell.shape) return;

    if (cell.row * gridSize + cell.col === fruitIndex) {
      const updatedGrid = [...grid];
      updatedGrid[cell.row * gridSize + cell.col].shape = '🍎';
      setGrid(updatedGrid);
      setFoundFruits(foundFruits + 1);

      if (foundFruits + 1 === numShapesToHideFruit) {
        setTimeout(() => {
          alert('Congratulations! You found all 6 fruits!');
        }, 500);
      }
    } else {
      const updatedGrid = [...grid];
      const originalShape = updatedGrid[cell.row * gridSize + cell.col].shape;
      updatedGrid[cell.row * gridSize + cell.col].shape = '';

      setTimeout(() => {
        updatedGrid[cell.row * gridSize + cell.col].shape = originalShape;
        setGrid(updatedGrid);
      }, revealDuration);
    }
  };

  return (
    <div>
      <div id="grid" className="grid">
        {grid.map((cell) => (
          <div
            key={`${cell.row}-${cell.col}`}
            className="cell"
            onClick={() => revealShape(cell)}
          >
            {cell.shape}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
