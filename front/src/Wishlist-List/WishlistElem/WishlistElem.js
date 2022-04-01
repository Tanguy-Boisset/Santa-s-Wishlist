import { Link } from "react-router-dom";
import './WishlistElem.css';

function WishlistElem(props) {
    return (
        <Link to={"../wishlist/" + props.hashed_url} className="wishlistElemLink">
        <div className="wishlistElem">
            <h5 className="wishlistElemName">{props.name}</h5>
            <p className="wishlistElemDate">Créée par {props.name_creator}</p>
            <p className="wishlistElemDesc">{props.description}</p>
        </div>
        </Link>
    );
    }

export default WishlistElem;