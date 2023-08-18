import React, { useEffect, useState } from 'react';
import './Game.css';
import { BsFillCircleFill, BsFillHexagonFill, BsFillSquareFill, BsFillStarFill, BsFillTriangleFill, BsFillDiamondFill } from 'react-icons/bs';
import { getInitialItems, postClicked } from '../../apicalls/ApiCalls';

const Game = () => {
  const [grid, setGrid] = useState([]);
  const [showFruit, setShowFruit] = useState(false)
  const [clickIndex, setClickedIndex] = useState(null)
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    getInitial();
  }, []);

  async function getInitial(){
    const response = await getInitialItems()
    console.log({response})
    
    const newGrid = [...response];
    setGrid(newGrid);
  }

  async function postClickedItem(shapeID){
    const response = await postClicked(shapeID)
    console.log({response})

    const newGrid = [...response.shapeGrid];
    setGrid(newGrid);
    setClickedIndex(null)
    setShowFruit(false)
  }

  const revealFruit = (cell, index) => {
    setClicks(prev => prev + 1)
    setClickedIndex(index)
    postClickedItem(cell.shapeId)
    if(cell.hasProducedFruit === false && cell.producedFruit === true){
    setShowFruit(true)
    console.log({cell})
  }
  };

  return (
    <div>
      <div id="grid" className="grid">
        {grid.map((cell, index) => (
          <div
            key={index}
            className={`cell`}
            onClick={() => revealFruit(cell, index)}
            style={{ cursor: 'pointer' }}
          >
            { clickIndex !== index && cell.shapeType == "Circle" && (
                <BsFillCircleFill fontSize={cell.shapeSize == "large" ? "larger" : (cell.shapeSize == "small" ? "x-small" : cell.shapeSize)} />
            )}
            { clickIndex !== index && cell.shapeType == "Star" && (
                <BsFillStarFill fontSize={cell.shapeSize == "large" ? "larger" : (cell.shapeSize == "small" ? "x-small" : cell.shapeSize)} />
            )}
            { clickIndex !== index && cell.shapeType == "Triangle" && (
                <BsFillTriangleFill fontSize={cell.shapeSize == "large" ? "larger" : (cell.shapeSize == "small" ? "x-small" : cell.shapeSize)} />
            )}
            { clickIndex !== index && cell.shapeType == "Hexagon" && (
                <BsFillHexagonFill fontSize={cell.shapeSize == "large" ? "larger" : (cell.shapeSize == "small" ? "x-small" : cell.shapeSize)} />
            )}
            { clickIndex !== index && cell.shapeType == "Square" && (
                <BsFillSquareFill fontSize={cell.shapeSize == "large" ? "larger" : (cell.shapeSize == "small" ? "x-small" : cell.shapeSize)} />
            )}
            { clickIndex !== index && cell.shapeType == "Diamond" && (
                <BsFillDiamondFill fontSize={cell.shapeSize == "large" ? "larger" : (cell.shapeSize == "small" ? "x-small" : cell.shapeSize)} />
            )}
            {showFruit && cell.fruit !== "null" && clickIndex === index && (
              <div className="fruit-label">{cell.fruit}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
