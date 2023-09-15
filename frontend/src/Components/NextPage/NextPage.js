import React from 'react'
import { getNextTrial } from '../../apicalls/ApiCalls';
import { useRecoilState, useRecoilValue } from 'recoil';
import ClickData from '../../Recoil/Atoms/ClickData';
import JWTatom from '../../Recoil/Atoms/JWT';
import { useHistory } from "react-router-dom";
import './NextPage.css';

const NextPage = () => {
    const [clickData, setClickData] = useRecoilState(ClickData)
    const jwt = useRecoilValue(JWTatom)
    let history = useHistory();

    const clickFn = async () =>{
        let event = new Date();
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
    
        const val = {
          shapeGrid: clickData.shapeGrid,
          patterns: clickData.patterns,
          currentTrial: clickData.currentTrial,
          fruitCount: clickData.fruitCount,
          date: today.toDateString(),
          timestamp: event.toString(),
          trial_id: clickData.trialId
        }
        console.log({val})
        const response = await getNextTrial(jwt.token, val).then((resp) =>{
          setClickData((prev) => ({
            ...prev,
            shapeGrid: resp?.shapeGrid,
            patterns: resp?.patterns,
            trialId: resp?.trial_id,
            currentTrial: resp?.currentTrial,
            clickNumber: resp?.click_number,
            fruitCount: resp?.fruitCount
          }))
        }).then(() => {
            history.push("/game")
        })
    }

    return(
        <div className="container">
            <h3>Proceed to next trial by clicking on this !</h3>
            <button onClick={() => {clickFn()}}>
                Next Trial
            </button>
        </div>
    )
}

export default NextPage;