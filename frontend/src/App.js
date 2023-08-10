import React, { useState, useEffect } from 'react';
import './App.css';

const gridSize = 5;
const totalGrids = gridSize * gridSize;
const numShapes = 6;
const numShapesPerType = 3;
const filledGrids = numShapes * numShapesPerType;

const shapes = ['triangle', 'square', 'circle', 'diamond', 'hexagon', 'star'];
const fruit = 'apple'; // Change this to your desired fruit image file name

function App() {
  const [gridItems, setGridItems] = useState([]);
  const [revealedFruit, setRevealedFruit] = useState(false);
  const [clickable, setClickable] = useState(true);

  useEffect(() => {
    createRandomGrid();
  }, []);

  function createRandomGrid() {
    const gridItemsData = Array.from({ length: totalGrids }, () => ({
      shape: null,
      revealed: false,
      invisible: false,
    }));

    // Shuffle the grid indices and select random grids for shapes
    const shuffledIndices = shuffle(Array.from({ length: totalGrids }, (_, index) => index));
    const shapeIndices = shuffledIndices.slice(0, filledGrids);

    shapeIndices.forEach((shapeIndex, index) => {
      const shapeType = index % numShapes;
      const shape = shapes[shapeType];
      gridItemsData[shapeIndex].shape = shape;
    });

    // Add the fruit to a random grid item
    const fruitIndex = shapeIndices[Math.floor(Math.random() * filledGrids)];
    gridItemsData[fruitIndex].fruit = fruit;

    setGridItems(gridItemsData);
  }

  function onGridItemClick(index) {
    if (!clickable) {
      return;
    }

    const gridItemsCopy = [...gridItems];
    const gridItem = gridItemsCopy[index];

    if (!gridItem.revealed && !gridItem.invisible) {
      gridItem.revealed = true;
      setGridItems(gridItemsCopy);

      if (gridItem.fruit === fruit) {
        setRevealedFruit(true);

        setTimeout(() => {
          alert('Congratulations! You found the fruit!');
        }, 500);
      }

      setClickable(false);

      setTimeout(() => {
        gridItem.revealed = false;
        setGridItems(gridItemsCopy);
        setClickable(true);
      }, 3000);

      // Make the shape invisible for a few seconds
      gridItem.invisible = true;
      setTimeout(() => {
        gridItem.invisible = false;
        setGridItems(gridItemsCopy);
      }, 3000);
    }
  }

  return (
    <div className="App">
      <div className="grid-container">
        {gridItems.map((gridItem, index) => (
          <div
            key={index}
            className={`grid-item ${gridItem.revealed ? 'revealed' : ''} ${gridItem.invisible ? 'invisible' : ''}`}
            style={gridItem.shape ? { backgroundImage: `url(images/${gridItem.shape}.png)` } : {}}
            onClick={() => onGridItemClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

function shuffle(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export default App;
