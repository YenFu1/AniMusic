import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import HomePage from './components/HomePage'
import GameScreen from './components/GameScreen';

function App() {
  return (
    <Router>
      {/*<Route path="/" exact component={HomePage}/> main screen is still a work in progress*/}
      <Route path="/" exact component={GameScreen}/>
    </Router>
  );
}

export default App;