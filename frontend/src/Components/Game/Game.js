import React, { useEffect, useState } from 'react';
import './Game.css';
import { BsFillCircleFill, BsFillHexagonFill, BsFillSquareFill, BsFillStarFill, BsFillTriangleFill, BsFillDiamondFill } from 'react-icons/bs';
import { getInitialItems, postClicked } from '../../apicalls/ApiCalls';
import { useRecoilState, useRecoilValue } from 'recoil';
import JWTatom from '../../Recoil/Atoms/JWT';
import ClickData from '../../Recoil/Atoms/ClickData';

const Game = () => {
  const [grid, setGrid] = useState([]);
  const [showFruit, setShowFruit] = useState(false)
  const [clickIndex, setClickedIndex] = useState(null)
  const [clickData, setClickData] = useRecoilState(ClickData)
  const jwt = useRecoilValue(JWTatom)

  useEffect(() => {
    getInitial();
  }, []);

  async function getInitial(){
    let event = new Date();
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    const val = {
      shapeGrid: clickData.shapeGrid,
      patterns: clickData.patterns,
      currentTrail: clickData.currentTrial,
      fruitCount: clickData.fruitCount,
      date: today.toDateString(),
      timestamp: event.toString()
    }
    const response = await getInitialItems(jwt.token, val).then((resp) =>{
      setClickData((prev) => ({
        ...prev,
        shapeGrid: resp.shapeGrid,
        patterns: resp.patterns,
        trialId: resp.trialId,
        currentTrial: resp.currentTrial,
        clickNumber: resp.click_number
      }))
    })
    console.log({response})
    
    const newGrid = [...response.shapeGrid];
    setGrid(newGrid);
  }

  async function postClickedItem(shapeID){
    let event = new Date();
    let clickEvent = {
      clickedShapeId: shapeID,
      shapeGrid: clickData.shapeGrid,
      trial_id: clickData.trialId,
      patterns: clickData.patterns,
      currentTrail: clickData.currentTrial,
      fruitCount: clickData.fruitCount,
      timestamp: event.toString(),
      click_number: clickData.clickNumber
    }
    const response = await postClicked(clickEvent, jwt.token).then((resp) => {
      setClickData((prev) => ({
        ...prev,
        clickNumber: resp.click_number,
        fruitCount: resp.fruitCount,
        shapeGrid: resp.shapeGrid
      }))
    })
    console.log({response})

    const newGrid = [...response.shapeGrid];
    setGrid(newGrid);
    setClickedIndex(null)
    setShowFruit(false)
  }

  const revealFruit = (cell, index) => {
    if(cell.shapeType !== "null"){
      setClickData((prev) => ({
        ...prev,
        clickNumber: prev.clickNumber + 1
      }))
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
