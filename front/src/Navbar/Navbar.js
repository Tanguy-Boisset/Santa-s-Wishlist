import React from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';
import logout from "./libNavbar.js";

function Navbar() {
    return (
        <div className="nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/wishlist">My Wishlist</Link>
          </li>
          <li>
            <Link to="/wishlist-list">Friends' Wishlists</Link>
          </li>
          <li>
            <Link to="/login">Log in</Link>
          </li>
          <li>
            <a onClick={logout}><u>Log out</u></a>
          </li>
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
        </ul>
        </div>
    );
    }

export default Navbar;