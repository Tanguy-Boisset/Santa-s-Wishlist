import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './Navbar/Navbar';
import Theme from './Theme/Theme';
import Home from './Home/Home';
import Wishlist from './Wishlist/Wishlist';
import Login from './Login/Login';



export default function Main() {
  return (
    <Router>
      <div>
        <Navbar/>
        <Theme/>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/wishlist' element={<Wishlist/>} />
            <Route path='/login' element={<Login/>} />

        </Routes>
      </div>
    </Router>
  );
}
