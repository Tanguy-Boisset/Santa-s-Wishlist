import { useState, useEffect } from 'react';
import './Wishlist.css';
import Gift, {AddGift} from '../Gift/Gift';

function Wishlist(id_wishlist=1) {
    let [my_wishlist, setDataWishlist] = useState([]);

    useEffect(() => {
        const urlWishlist = "http://localhost:5000/get_wishlist";
        const fetchDataWishlist = async () => {
            const responseWishlist = await fetch(urlWishlist,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id_wishlist: 1})
            });
            const jsonWishlist = await responseWishlist.json();
            console.log(jsonWishlist);
            setDataWishlist(jsonWishlist);
            }
        fetchDataWishlist();
    }, []);

    let [my_gifts, setDataGifts] = useState([]);

    useEffect(() => {
        const urlGifts = "http://localhost:5000/get_gift_from_wishlist";
        const fetchDataGifts = async () => {
            const responseGifts = await fetch(urlGifts,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id_wishlist: 1})
            });
            const jsonGifts = await responseGifts.json();
            console.log(jsonGifts);
            setDataGifts(jsonGifts);
            }
        fetchDataGifts();
    }, []);


    return (
        <div className="wishlist">
        <div className="center-top">
            <div className="text-center">
                <h1>{my_wishlist.name}</h1>
                <h3>{my_wishlist.description}</h3>
                <ul className="scrollbar">
                    {my_gifts.map(function(cadeau){
            		    return <li key={cadeau.id}>{Gift(cadeau)}</li>;
          		})}
                <AddGift/>
                </ul>

	        </div>
        </div>
        </div>
    );
    }

export default Wishlist;