import { useState, useEffect } from 'react';
import './Wishlist-List.css';
import WishlistElem from './WishlistElem/WishlistElem';

function WishlistList() {
    let [listOfWishlists, setData] = useState([]);

    useEffect(() => {
        const url = "http://localhost:5000/get_all_wishlists";
        const fetchData = async () => {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('santaToken')
                }
            });
            const json = await response.json();
            setData(json);
            }
        fetchData();
    }, []);

    return (
        <div className="wishlist-list">
        <div className="center-top">
            <div className="text-center">
                <h1>Découvre les listes de souhaits de tes amis !</h1>
                <h3>Et profites-en pour leur offrir quelque chose ;)</h3>
                <ul className="scrollbar">
                {listOfWishlists.map(wishlist => (
                    <li key={wishlist.id}>{WishlistElem(wishlist)}</li>
                ))}
                </ul>

	        </div>
        </div>
        </div>
    );
    }

export default WishlistList;