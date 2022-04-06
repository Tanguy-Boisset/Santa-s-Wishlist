import React from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';
import logout,{Connected} from "./libNavbar.js";

function Navbar() {
  // if (localStorage.getItem("santaToken") === null) {
  //   return (
  //       <div className="nav">
  //         <ul>
  //           <li>
  //             <Link to="/">Home</Link>
  //           </li>
  //           <li>
  //             <Link to="/wishlist">My Wishlist</Link>
  //           </li>
  //           <li>
  //             <Link to="/wishlist-list">Friends' Wishlists</Link>
  //           </li>
  //           <li>
  //             <Link to="/signup">Sign up</Link>
  //           </li>
  //           <li>
  //           <Link to="/login">Log in</Link>
  //         </li>
  //         </ul>
  //         </div>
  //     );
  //   }
  //   else{
  //     return (
  //       <div className="nav">
  //       <ul>
  //         <li>
  //           <Link to="/">Home</Link>
  //         </li>
  //         <li>
  //           <Link to="/wishlist">My Wishlist</Link>
  //         </li>
  //         <li>
  //           <Link to="/wishlist-list">Friends' Wishlists</Link>
  //         </li>
  //         <li>
  //           <a onClick={logout}><u>Log out</u></a>
  //         </li>
          
  //       </ul>
  //     </div>  
  //   );
  // }
  return(
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
            <Connected></Connected>
          </ul>
    </div>
  );
}

export default Navbar;