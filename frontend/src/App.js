import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Game from './Components/Game/Game';
import HomePage from './Components/HomePage/HomePage';
import FormPage from './Components/FormPage/FormPage';

const App = () => {
    return(
        <Router>
      <div>
        <Switch>
          <Route path="/game">
            <Game />
          </Route>
          <Route path="/form">
            <FormPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
    )
}

export default App