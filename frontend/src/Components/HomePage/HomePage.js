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
            <p>You need to click on the shapes to find the hidden fruits.</p>
            <p>This task will be repeated several times. Good luck!</p>
            <button className="nextbutton" onClick={() => history.push("/form")}>Next</button>
        </section>
        </div>
        
    )
}

export default HomePage