import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';
import logout,{Connected} from "./libNavbar.js";

function Navbar() {
  return(
     <div className="nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <Connected></Connected>
          </ul>
    </div>
  );
}

export default Navbar;
