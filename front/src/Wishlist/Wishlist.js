import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Wishlist.css';
import Gift, {AddGift} from '../Gift/Gift';

function Wishlist() {
    const location = useLocation().pathname.slice(10);

    let [my_wishlist, setDataWishlist] = useState([]);
    let [my_gifts, setDataGifts] = useState([]);
    let [updateGifts, updateGiftsFunc] = useState(true);

    useEffect(() => {
        const urlWishlist = "http://localhost:5000/get_wishlist";
        const fetchDataWishlist = async () => {
            const responseWishlist = await fetch(urlWishlist,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({hashed_url: location})
            });
            const jsonWishlist = await responseWishlist.json();
            setDataWishlist(jsonWishlist);
            }
        fetchDataWishlist();
    }, []);

    useEffect(() => {
        const urlGifts = "http://localhost:5000/get_gift_from_wishlist";
        const fetchDataGifts = async () => {
            const responseGifts = await fetch(urlGifts,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id_wishlist: my_wishlist.id})
            });
            const jsonGifts = await responseGifts.json();
            setDataGifts(jsonGifts);
            }
        fetchDataGifts();
    }, [my_wishlist, updateGifts]);

    return (
        <div className="wishlist">
        <div className="center-top">
            <div className="text-center">
                <h1>{my_wishlist.name}</h1>
                <h3>{my_wishlist.description}</h3>
                <ul className="scrollbar">
                    {my_gifts.map(function(cadeau){
            		    return <li key={cadeau.id}>{Gift(cadeau,updateGiftsFunc,updateGifts)}</li>;
          		})}
                <AddGift giftFunc={updateGiftsFunc} giftVar={updateGifts}/>
                </ul>

	        </div>
        </div>
        </div>
    );
    }

export default Wishlist;
