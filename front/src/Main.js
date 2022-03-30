import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './Navbar/Navbar';
import Theme from './Theme/Theme';
import Home from './Home/Home';


export default function Main() {
  return (
    <Router>
      <div>
        <Navbar/>
        <Theme/>
        <Routes>
            <Route path='/' element={<Home/>} />

        </Routes>
      </div>
    </Router>
  );
}