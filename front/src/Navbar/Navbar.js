import React from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';

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
            <Link to="/">Log out</Link>
          </li>
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
        </ul>
        </div>
    );
    }

export default Navbar;