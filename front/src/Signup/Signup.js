import './Signup.css';
import checkInfo from './lib.js';


function Signup() {
    return (
        <div className='left'>
            <div className="text-left">
            <div>
                <h2 id="title">Fill in your information :</h2>
            </div>
            <form id="formSignup" action="/my-handling-form-page" method="get">
            <div>
                <label className="labelSignup" htmlFor="name">Name : </label>
                <input className="inputSignup" type="text" id="name" name="name"/>
            </div>
            <div>
                <label className="labelSignup" htmlFor="surname">Last name : </label>
                <input className="inputSignup" type="text" id="surname" name="surname"/>
            </div>
            <div>
                <label className="labelSignup" htmlFor="pseudo">Pseudo : </label>
                <input className="inputSignup" type="text" id="pseudo" name="pseudo"/>
            </div>
            <div>
                <label className="labelSignup" htmlFor="password">Enter your password : </label>
                <input className="inputSignup" type="password" id="password" name="password"/>
            </div>
            <div>
                <label className="labelSignup" htmlFor="passwordCheck">Re-type your password : </label>
                <input className="inputSignup" type="password" id="passwordCheck" name="passwordCheck"/>
            </div>
            <a className="button" onClick={checkInfo}>Create your account now !</a>
            <p id="error"></p>
            </form>
        </div>
        </div>
    );
    }

export default Signup;