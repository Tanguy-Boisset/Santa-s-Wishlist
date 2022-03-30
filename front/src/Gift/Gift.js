import './Gift.css';

let linkText = "Lien vers mon cadeau -->";

function Gift(gift) {
    return (
        <div className="gift">
            <h5 className="giftName">{gift.name}</h5>
            <p className="giftPrice">{gift.price}€</p>
            <p className="giftDesc">{gift.description}</p>
            <a href={gift.link} target="_blank" className="giftLink">{linkText}</a>
        </div>
    );
    }

export default Gift;