import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';


function logout(){
    console.log(localStorage.clear());
    window.location.href = "/";
}

function Connected(){

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

    if (localStorage.getItem("santaToken") === null){
        return(
            <span>
                <li>
                    <Link to="/signup">Sign up</Link>
                </li>
                <li>
                    <Link to="/login">Log in</Link>
                </li>
            </span>
        )
    }
    else{
        return(
            <span>
                <li>
                    <Link to={linkToMyWishlist}>My Wishlist</Link>
                </li>
                <li>
                    <Link to="/wishlist-list">Friends' Wishlists</Link>
                </li>
                <li>
                    <a onClick={logout}><u>Log out</u></a>
                </li>
            </span>
        )
            
    }
}

export default logout;
export {Connected};