import './Login.css';
import submitLogin from './libLogin.js';

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
            <div action="/my-handling-form-page" method="get">
                <div>
                    <label htmlFor="login">Login :</label>
                    <input className="inputForm" type="text" id="login" name="login"/>
                </div>
                <div>
                    <label htmlFor="password">Password :</label>
                    <input className="inputForm" type="password" id="password" name="password"/>
                </div>
                <a className="button" onClick={submitLogin}>Sign in</a>
            </div>
        </div>
        </div>
    );
    }

export default Login;