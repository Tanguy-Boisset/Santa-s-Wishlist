import './Wishlist.css';

// Data exported from Database
let cadeau1 = {
    'name' : 'Nintendo Switch',
    'description' : 'En tant que grand gamer, j\'ai besoin d\'une Switch',
    'link' : 'https://www.amazon.fr/Nintendo-Switch-avec-paire-Rouge/dp/B07WKNQ8JT/',
    'price' : 270
};

let cadeau2 = {
    'name' : 'Nintendo Switch',
    'description' : 'En tant que grand gamer, j\'ai besoin d\'une Switch',
    'link' : 'https://www.amazon.fr/Nintendo-Switch-avec-paire-Rouge/dp/B07WKNQ8JT/',
    'price' : 270
};

let cadeau3 = {
    'name' : 'Nintendo Switch',
    'description' : 'En tant que grand gamer, j\'ai besoin d\'une Switch',
    'link' : 'https://www.amazon.fr/Nintendo-Switch-avec-paire-Rouge/dp/B07WKNQ8JT/',
    'price' : 270
};

let myWishlist = {
    'name': 'La Wishlist de Tanguy :D',
    'date': '28-01-2022',
    'description': 'Voilà tous les cadeaux que j\'adoooorerais avoir pour Noël !! :D',
    'cadeaux': [cadeau1,cadeau2,cadeau3]
};


function Wishlist() {
    return (
        <div>
        <div className="center-top">
            <div className="text-center">
                <h1>{myWishlist.name}</h1>
                <h3>{myWishlist.description}</h3>
                <h4>Créée le {myWishlist.date}</h4>
                <ul>
                    {myWishlist.cadeaux.map(function(cadeau){
            		    return <li>{cadeau.name}</li>;
          		})}
                </ul>

	        </div>
        </div>
        </div>
    );
    }

export default Wishlist;