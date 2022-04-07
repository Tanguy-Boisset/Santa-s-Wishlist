import { useLocation } from 'react-router-dom';
import './Gift.css';

let linkText = "Lien vers mon cadeau -->";

function Gift(gift,func,globVar,isItMyWishlist) {

    function postDeleteGift() {
        const rawResponse = fetch('http://localhost:5000/delete_gift', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('santaToken')
            },
        body: JSON.stringify({
            id_gift_delete: gift.id
            })
        }).then(() => func(!globVar));
    }

    function postAttributeGift() {
        const rawResponse = fetch('http://localhost:5000/attribute_gift', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('santaToken')
            },
        body: JSON.stringify({
            id_gift: gift.id
            })
        }).then(() => func(!globVar));
    }

    async function postNameFromId() {
        const responseNameFromId = await fetch("http://localhost:5000/getname",{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('santaToken')
            },
            body: JSON.stringify({
                id: gift.id_user_who_offer
                })
        });
        const jsonNameFromId = await responseNameFromId.json();
        Array.from(document.getElementsByClassName(gift.id_user_who_offer)).map(e => e.innerText = jsonNameFromId);
    };

    function RenderButton(props) {
        if (props.isItMyWishlist) {
            return (
                <div className="imgHolder" onClick={postDeleteGift}><img className="deleteImg" src="../../img/bin.png" alt="delete_gift"/></div>
            );
        }
        else {
            if (props.taken == "attributed") {
                return (
                    <div>
                    <div className="imgHolder2 taken"><img className="acceptImg" src="../../img/gift.png" alt="accept_gift"/></div>
                    <p className="offreurDiv">Ce cadeau sera offert par : <span className={props.offreurId} onLoad={postNameFromId()}></span></p>
                    </div>
                );
            }
            else {
                return (
                    <div className="imgHolder2" onClick={postAttributeGift}><img className="acceptImg" src="../../img/gift.png" alt="accept_gift"/></div>
                );
            }
            
        }
    }

    if (!isItMyWishlist && gift.state == "attributed") {
        return (
            <div className="gift giftAttributed">
                <h5 className="giftName">{gift.name}</h5>
                <p className="giftPrice">{gift.price}€</p>
                <p className="giftDesc">{gift.description}</p>
                <a href={gift.url} rel="noreferrer" className="giftLink">{linkText}</a>
                <RenderButton isItMyWishlist={isItMyWishlist} taken={gift.state} offreurId={gift.id_user_who_offer}/>
            </div>
        );
    }
    else {
        return (
            <div className="gift">
                <h5 className="giftName">{gift.name}</h5>
                <p className="giftPrice">{gift.price}€</p>
                <p className="giftDesc">{gift.description}</p>
                <a href={gift.url} rel="noreferrer" className="giftLink">{linkText}</a>
                <RenderButton isItMyWishlist={isItMyWishlist} taken={gift.state}/>
            </div>
        );
    }

}

function AddGift({giftFunc, giftVar, isItMyWishlist}) {
    const location = useLocation().pathname.slice(10);

    function postNewGift() {
        const rawResponse = fetch('http://localhost:5000/add_gift', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('santaToken')
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

    if (isItMyWishlist) {
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
    else {
        return null;
    }

    
}

export default Gift;
export {AddGift};
