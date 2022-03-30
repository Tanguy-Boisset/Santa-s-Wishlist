import './Gift.css';

let linkText = "Lien vers mon cadeau -->";

function Gift(gift) {
    return (
        <div className="gift">
            <h5>{gift.name}</h5>
            <p>{gift.price}€</p>
            <p>{gift.description}</p>
            <a href={gift.link}>{linkText}</a>
        </div>
    );
    }

export default Gift;