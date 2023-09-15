import React, { useEffect, useState } from 'react';
import './Game.css';
import { BsFillCircleFill, BsFillHexagonFill, BsFillSquareFill, BsFillStarFill, BsFillTriangleFill, BsFillDiamondFill } from 'react-icons/bs';
import { getInitialItems, postClicked } from '../../apicalls/ApiCalls';
import { useRecoilState, useRecoilValue } from 'recoil';
import JWTatom from '../../Recoil/Atoms/JWT';
import ClickData from '../../Recoil/Atoms/ClickData';
import { useHistory } from "react-router-dom";

const Game = () => {
  const [showFruit, setShowFruit] = useState(false)
  const [clickIndex, setClickedIndex] = useState(null)
  const [clickData, setClickData] = useRecoilState(ClickData)
  const [grid, setGrid] = useState([])
  const jwt = useRecoilValue(JWTatom)
  let history = useHistory();

  useEffect(() => {
    setGrid(clickData.shapeGrid)
  }, [clickData.shapeGrid]);

  useEffect(() => {
    console.log("in useEffect for updating grid",clickData, grid)
  }, [clickData.shapeGrid])

  async function getInitial(){
    let event = new Date();
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    const val = {
      shapeGrid: clickData.shapeGrid,
      patterns: clickData.patterns,
      currentTrial: clickData.currentTrial,
      fruitCount: clickData.fruitCount,
      date: today.toDateString(),
      timestamp: event.toString()
    }
    const response = await getInitialItems(jwt.token, val).then((resp) =>{
      setClickData((prev) => ({
        ...prev,
        shapeGrid: resp?.shapeGrid,
        patterns: resp?.patterns,
        trialId: resp?.trial_id,
        currentTrial: resp?.currentTrial,
        clickNumber: resp?.click_number
      }))
      setGrid(resp.shapeGrid)
    })
  }

  async function postClickedItem(shapeID){
    let event = new Date();
    let clickEvent = {
      clickedShapeId: shapeID,
      shapeGrid: clickData.shapeGrid,
      trial_id: clickData.trialId,
      patterns: clickData.patterns,
      currentTrial: clickData.currentTrial,
      fruitCount: clickData.fruitCount,
      timestamp: event.toString(),
      click_number: clickData.clickNumber
    }
    const response = await postClicked(clickEvent, jwt.token).then((resp) => {
      
      if(resp.fruitCount < 6){
        setClickData((prev) => ({
          ...prev,
          clickNumber: resp?.click_number,
          fruitCount: resp?.fruitCount,
          shapeGrid: resp?.shapeGrid
        }))
        // setGrid(resp.shapeGrid)
      }
      else{
        setClickData((prev) => ({
          ...prev,
          clickNumber: resp?.click_number,
          fruitCount: resp?.fruitCount,
        }))
        history.push("/next")
      }
    })
    setClickedIndex(null)
    setShowFruit(false);
  }

  const delayedFunction = (shapeID) => {
    setTimeout(() => {
      postClickedItem(shapeID)
    }, 1000); // Delay for 1 second (1000 milliseconds)
  };

  const revealFruit = (cell, index) => {
    if(cell.shapeType !== "null"){
      setClickData((prev) => ({
        ...prev,
        clickNumber: prev.clickNumber + 1
      }))
      
      // if(cell.hasProducedFruit === false && cell.producedFruit === true){
          setClickedIndex(index);
          setShowFruit(true);
          delayedFunction(cell.shapeId)
      // }
    }
  };

  //hasProducedfruit === true, don't display
  return (
    <div>
      <div id="grid" className="grid">
        {grid.length > 0 && grid.map((cell, index) => (
          <div
            key={index}
            className={`cell`}
            onClick={() => {revealFruit(cell, index)}}
            style={{ cursor: 'pointer' }}
          >
            { clickIndex !== index && cell.shapeType === "circle" && (
                <BsFillCircleFill color='#000000' fontSize={cell.shapeSize === "large" ? `7rem` : (cell.shapeSize === "medium" ? `4.5rem` : `2.5rem`)} />
            )}
            { clickIndex !== index && cell.shapeType === "star" && (
                <BsFillStarFill color='#3366cc' fontSize={cell.shapeSize === "large" ? `7rem` : (cell.shapeSize === "medium" ? `4.5rem` : `2.5rem`)} />
            )}
            { clickIndex !== index && cell.shapeType === "triangle" && (
                <BsFillTriangleFill color='#b800e6' fontSize={cell.shapeSize === "large" ? `7rem` : (cell.shapeSize === "medium" ? `4.5rem` : `2.5rem`)} />
            )}
            { clickIndex !== index && cell.shapeType === "hexagon" && (
                <BsFillHexagonFill color='#00c452' fontSize={cell.shapeSize === "large" ? `7rem` : (cell.shapeSize === "medium" ? `4.5rem` : `2.5rem`)} />
            )}
            { clickIndex !== index && cell.shapeType === "square" && (
                <BsFillSquareFill color='#ffcc00' fontSize={cell.shapeSize === "large" ? `7rem` : (cell.shapeSize === "medium" ? `4.5rem` : `2.5rem`)} />
            )}
            { clickIndex !== index && cell.shapeType === "diamond" && (
                <BsFillDiamondFill color='#fff' fontSize={cell.shapeSize === "large" ? `7rem` : (cell.shapeSize === "medium" ? `4.5rem` : `2.5rem`)} />
            )}
            {showFruit && cell.fruit !== "null" && clickIndex === index && cell.hasProducedFruit !== true && (
              <div className="fruit-label">{cell.fruit === "Pear" ? `🍐` : `🍎`}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
