import { Link } from "react-router-dom";


function logout(){
    console.log(localStorage.clear());
    window.location.href = "/";
}

function Connected(){
    if (localStorage.getItem("santaToken") === null){
        return(
            <span>
                <li>
                <Link to="/signup">Sign up</Link>
                </li>
                <li>
                    <Link to="/login">Log in</Link>
                </li>
            </span>
        )
    }
    else{
        return(
            <li>
                <a onClick={logout}><u>Log out</u></a>
            </li>
    //     <div id="connected">connected as : <span id='username'></span></div>
        )
            
    }
}

export default logout;
export {Connected};