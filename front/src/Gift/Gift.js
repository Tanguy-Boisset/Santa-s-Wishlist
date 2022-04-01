import { useLocation } from 'react-router-dom';
import './Gift.css';

let linkText = "Lien vers mon cadeau -->";

function Gift(gift,func,globVar) {
    const location = useLocation().pathname.slice(10);

    function postDeleteGift() {
        const rawResponse = fetch('http://localhost:5000/delete_gift', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({
            id_gift_delete: gift.id
            })
        }).then(() => func(!globVar));
    }
    return (
        <div className="gift">
            <h5 className="giftName">{gift.name}</h5>
            <p className="giftPrice">{gift.price}€</p>
            <p className="giftDesc">{gift.description}</p>
            <a href={gift.url} target="_blank" rel="noreferrer" className="giftLink">{linkText}</a>
            <div className="imgHolder" onClick={postDeleteGift}><img className="deleteImg" src="../../img/bin.png" alt="delete_gift"/></div>
            <div className="imgHolder2"><img className="acceptImg" src="../../img/gift.png" alt="accept_gift"/></div>
        </div>
    );
}

function AddGift({giftFunc, giftVar}) {
    const location = useLocation().pathname.slice(10);

    function postNewGift() {
        const rawResponse = fetch('http://localhost:5000/add_gift', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({
            name: document.getElementById("giftAddName").value,
            url: document.getElementById("giftAddLink").value,
            price: document.getElementById("giftAddPrice").value,
            description: document.getElementById("giftAddDesc").value,
            hashed_url: location
            })
        }).then(() => giftFunc(!giftVar));
    }

    return (
        <div className="gift">
            <h5 className="giftName">Ajouter un cadeau</h5>
            <div id="addGift">
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
            <button className="button" id="AddGiftSubmit" onClick={postNewGift}>Ajouter ce cadeau</button>
            <p id="errorAddGift"></p>
            </div>
        </div>
    );
}

export default Gift;
export {AddGift};
