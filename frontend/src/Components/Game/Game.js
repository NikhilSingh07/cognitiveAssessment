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
    let event = new Date();
    let clickEvent = {
      shape: shapeID,
      time: event.toString()
    }
    const response = await postClicked(clickEvent)
    console.log({response})

    const newGrid = [...response.shapeGrid];
    setGrid(newGrid);
    setClickedIndex(null)
    setShowFruit(false)
  }

  const revealFruit = (cell, index) => {
    if(cell.shapeType !== "null"){
      setClicks(prev => prev + 1)
      setClickedIndex(index)
      postClickedItem(cell.shapeId)
      if(cell.hasProducedFruit === false && cell.producedFruit === true){
        setShowFruit(true)
        console.log({cell})
    }
  }
  };

  return (
    <div>
      <div id="grid" className="grid">
        {grid.map((cell, index) => (
          <div
            key={index}
            className={`cell`}
            onClick={() => {revealFruit(cell, index)}}
            style={{ cursor: 'pointer' }}
          >
            { clickIndex !== index && cell.shapeType === "Circle" && (
                <BsFillCircleFill color='#000000' fontSize={cell.shapeSize === "large" ? `7rem` : (cell.shapeSize === "medium" ? `4.5rem` : `2.5rem`)} />
            )}
            { clickIndex !== index && cell.shapeType === "Star" && (
                <BsFillStarFill color='#3366cc' fontSize={cell.shapeSize === "large" ? `7rem` : (cell.shapeSize === "medium" ? `4.5rem` : `2.5rem`)} />
            )}
            { clickIndex !== index && cell.shapeType === "Triangle" && (
                <BsFillTriangleFill color='#b800e6' fontSize={cell.shapeSize === "large" ? `7rem` : (cell.shapeSize === "medium" ? `4.5rem` : `2.5rem`)} />
            )}
            { clickIndex !== index && cell.shapeType === "Hexagon" && (
                <BsFillHexagonFill color='#00c452' fontSize={cell.shapeSize === "large" ? `7rem` : (cell.shapeSize === "medium" ? `4.5rem` : `2.5rem`)} />
            )}
            { clickIndex !== index && cell.shapeType === "Square" && (
                <BsFillSquareFill color='#ffcc00' fontSize={cell.shapeSize === "large" ? `7rem` : (cell.shapeSize === "medium" ? `4.5rem` : `2.5rem`)} />
            )}
            { clickIndex !== index && cell.shapeType === "Diamond" && (
                <BsFillDiamondFill color='#ff0000' fontSize={cell.shapeSize === "large" ? `7rem` : (cell.shapeSize === "medium" ? `4.5rem` : `2.5rem`)} />
            )}
            {showFruit && cell.fruit !== "null" && clickIndex === index && (
              <div className="fruit-label">{cell.fruit === "Pear" ? `🍐` : `🍎`}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
