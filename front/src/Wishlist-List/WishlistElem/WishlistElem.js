import './WishlistElem.css';

function WishlistElem(props) {
    return (
        <a href={props.hash} className="wishlistElemLink">
        <div className="wishlistElem">
            <h5 className="wishlistElemName">{props.name}</h5>
            <p className="wishlistElemDate">Créée par {props.id_creator}</p>
            <p className="wishlistElemDesc">{props.description}</p>
        </div>
        </a>
    );
    }

export default WishlistElem;