import './Login.css';

/*TODO
 changer la destination du bouton
 changer le handler du form
*/

function Login() {
    return (
        <div className='center'>
            <div className="text-center">
            <div>
                <h2>Sign in :</h2>
            </div>
            <form action="/my-handling-form-page" method="get">
            <div>
                <label for="login">Login :</label>
                <input className="inputForm" type="text" id="login" name="login"/>
            </div>
            <div>
                <label for="password">Password :</label>
                <input className="inputForm" type="password" id="password" name="password"/>
            </div>
            <a href="#" className="button">Sign in</a>
            </form>
        </div>
        </div>
    );
    }

export default Login;