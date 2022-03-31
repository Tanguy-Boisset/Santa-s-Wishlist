import './WishlistElem.css';

function WishlistElem(wishlist) {
    return (
        <a href={wishlist.hash} className="wishlistElemLink">
        <div className="wishlistElem">
            <h5 className="wishlistElemName">{wishlist.name}</h5>
            <p className="wishlistElemDate">Créée le {wishlist.date}, par {wishlist.creatorName}</p>
            <p className="wishlistElemDesc">{wishlist.description}</p>
        </div>
        </a>
    );
    }

export default WishlistElem;