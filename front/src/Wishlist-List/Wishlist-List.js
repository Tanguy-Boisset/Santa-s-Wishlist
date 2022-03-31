import './Wishlist-List.css';
import WishlistElem from './WishlistElem/WishlistElem';

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

let wishlist1 = {
    'id': 0,
    'creatorId': 0,
    'creatorName': 'Tanguy', 
    'hash': '1234aef',
    'name': 'La Wishlist de Tanguy :D',
    'date': '28-01-2022',
    'description': 'Voilà tous les cadeaux que j\'adoooorerais avoir pour Noël !! :D',
    'cadeaux': [cadeau1,cadeau2,cadeau3,cadeau3,cadeau3]
};

let wishlist2 = {
    'id': 1,
    'creatorId': 1,
    'creatorName': 'Thomas',
    'hash': '1234aef',
    'name': 'Thomas\' Wishlist',
    'date': '23-04-2022',
    'description': 'Pour mon anniv\'',
    'cadeaux': [cadeau1,cadeau2,cadeau3,cadeau3,cadeau3]
};

let wishlist3 = {
    'id': 2,
    'creatorId': 2,
    'creatorName': 'Vangelis',
    'hash': '1234aef',
    'name': 'Liste de souhait',
    'date': '02-12-2021',
    'description': '',
    'cadeaux': [cadeau1,cadeau2,cadeau3,cadeau3,cadeau3]
};

let List_of_wishlists = [wishlist1,wishlist2,wishlist3];


function WishlistList() {
    return (
        <div className="wishlist-list">
        <div className="center-top">
            <div className="text-center">
                <h1>Découvre les listes de souhaits de tes amis !</h1>
                <h3>Et profites-en pour leur offrir quelque chose ;)</h3>
                <ul className="scrollbar">
                    {List_of_wishlists.map(function(wishlist){
            		    return <li key={wishlist.id}>{WishlistElem(wishlist)}</li>;
          		})}
                </ul>

	        </div>
        </div>
        </div>
    );
    }

export default WishlistList;