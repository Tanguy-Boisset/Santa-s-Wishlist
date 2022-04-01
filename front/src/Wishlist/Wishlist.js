import { useState, useEffect } from 'react';
import './Wishlist.css';
import Gift, {AddGift} from '../Gift/Gift';

// Data exported from Database
let cadeau1 = {
    'id': 0,
    'name' : 'Un stage',
    'description' : 'Nolwenn bordel tu fous quoi !?',
    'link' : 'https://www.amazon.fr/Nintendo-Switch-avec-paire-Rouge/dp/B07WKNQ8JT/',
    'price' : 5,
    'chosen': true
};

let cadeau2 = {
    'id': 1,
    'name' : 'Une validation en OS',
    'description' : 'Stp, pas les rattrapages',
    'link' : 'https://www.amazon.fr/Nintendo-Switch-avec-paire-Rouge/dp/B07WKNQ8JT/',
    'price' : 0,
    'chosen': true
};

let cadeau3 = {
    'id': 2,
    'name' : 'Nintendo Switch',
    'description' : 'En tant que grand gamer, j\'ai besoin d\'une Switch',
    'link' : 'https://www.amazon.fr/Nintendo-Switch-avec-paire-Rouge/dp/B07WKNQ8JT/',
    'price' : 270,
    'chosen': true
};

let myWishlist = {
    'id': 0,
    'name': 'La Wishlist de Tanguy :D',
    'description': 'Voilà tous les cadeaux que j\'adoooorerais avoir pour Noël !! :D',
    'cadeaux': [cadeau1,cadeau2,cadeau3,cadeau3,cadeau3]
};


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


    return (
        <div className="wishlist">
        <div className="center-top">
            <div className="text-center">
                <h1>{myWishlist.name}</h1>
                <h3>{myWishlist.description}</h3>
                <ul className="scrollbar">
                    {myWishlist.cadeaux.map(function(cadeau){
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