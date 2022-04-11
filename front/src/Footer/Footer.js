import './Footer.css';

function Footer(){
    if (localStorage.getItem("santaToken") == null) {
        return (
            <div id='footer'>
                <div>Not logged in</div>
            </div>
        )
    }
    let username;
    const fetchName = async () => {
        const urlGetName = "http://127.0.0.1:5000/getmyname";
        const responseName = await fetch(urlGetName,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("santaToken")
            },
        });
        username = await responseName.json();
        document.getElementById("username").innerText = username;
        // console.log(username)
    }
    fetchName();
    return (
        <div id='footer'>
           <div>Logged as :  <span id='username'></span></div>
        </div>
    );
}

export default Footer;