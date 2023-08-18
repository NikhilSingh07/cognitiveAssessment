import React from "react";
import { useHistory } from "react-router-dom";
import './HomePage.css'

const HomePage = () => {
    let history = useHistory();

    return(
        <div>
        <section className="instructions">
            <h2>Game Instructions</h2>
            <p>Welcome to the cognitive assessment game! Your task is to find hidden fruits behind shapes.</p>
            <p>There will be 18 shapes, and the fruits are hidden underneath.</p>
            <p>Pay attention to the spatial arrangement of the shapes as it changes. Good luck!</p>
            <button className="nextbutton" onClick={() => history.push("/game")}>Next</button>
        </section>
        </div>
        
    )
}

export default HomePage