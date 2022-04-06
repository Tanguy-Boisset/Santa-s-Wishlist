import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';
import logout from "./libNavbar.js";

function Navbar() {
  let [linkToMyWishlist, setLink] = useState("");

    useEffect(() => {
        const urlLink = "http://localhost:5000/get_my_wishlist";
        const fetchLink = async () => {
            const responseLink = await fetch(urlLink,{
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('santaToken')
                }
            });
            const jsonLink = await responseLink.json();
            setLink("/wishlist/" + jsonLink.hashed_url);
            }
            if (localStorage.getItem("santaToken") != null){
              fetchLink();
            }
    }, []);

  if (localStorage.getItem("santaToken") === null) {
    return (
        <div className="nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
          <li>
          <Link to="/login">Log in</Link>
        </li>
        </ul>
        </div>
    );
  }
  else{
    return (
      <div className="nav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to={linkToMyWishlist}>My Wishlist</Link>
        </li>
        <li>
          <Link to="/wishlist-list">Friends' Wishlists</Link>
        </li>
        <li>
          <a className='linkNav' onClick={logout}><u>Log out</u></a>
        </li>
      </ul>
      </div>  
    );
  }
}

export default Navbar;