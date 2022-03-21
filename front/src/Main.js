import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Theme from './Theme/Theme';
import Home from './Home/Home';


export default function Main() {
  return (
    <Router>
      <div>
          {/* TODO ADD CLEAN NAVBAR
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
          */}

        <Theme/>
        <Routes>
            <Route path='/' element={<Home/>} />

        </Routes>
      </div>
    </Router>
  );
}
