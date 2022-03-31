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

function AddGift() {
    return (
        <div className="gift">
            <h5 className="giftName">Ajouter un cadeau</h5>
            <form id="addGift" action="/add-gift" method="post">
            <div>
                <label className="labelAddGift" htmlFor="giftAddName">Nom : </label>
                <input className="inputAddGift" type="text" id="giftAddName" name="giftAddName" required/>
            </div>
            <div>
                <label className="labelAddGift" htmlFor="giftAddPrice">Prix (€): </label>
                <input className="inputAddGift" type="number" id="giftAddPrice" name="giftAddPrice"/>
            </div>
            <div>
                <label className="labelAddGift" htmlFor="giftAddDesc">Description : </label>
                <input className="inputAddGift" type="text" id="giftAddDesc" name="giftAddDesc"/>
            </div>
            <div>
                <label className="labelAddGift" htmlFor="giftAddLink">Lien : </label>
                <input className="inputAddGift" type="url" id="giftAddLink" name="giftAddLink"/>
            </div>
            <a className="button" id="AddGiftSubmit">Ajouter ce cadeau</a>
            <p id="errorAddGift"></p>
            </form>
        </div>
    );
}

export default Gift;
export {AddGift};
