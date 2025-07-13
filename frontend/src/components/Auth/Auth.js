import './Auth.css'
import { useState } from 'react';

const Auth = ({isOpen, onClose}) => {
    const [login, setLogin] = useState(false);

    if(!isOpen) return null;

    return (
        <div id='auth'>
            <div id='auth-box'>
                <button id='auth-close-btn' className='btn-ghost' onClick={e=>{
                    setLogin(false);
                    onClose(e);
                }}><p>X</p></button>
                <p id='auth-title'>{login ? "Login" : "Create an account"}</p>   
                <button className='external-acc-btn'><h1>G</h1><h3>Google</h3></button>
                <div className='auth-line'>
                    <hr/>
                    <p>OR CONTINUE WITH</p>
                </div>

                <form id='auth-form'>
                    <div className='auth-block'>
                        <label htmlFor='email'>Email</label>
                        <input className='auth-input' id='email' name='email' type='text' required />
                    </div>
                    <div className='auth-block'>
                        <label htmlFor='password'>Password</label>
                        <input className='auth-input' id='password' name='password' type='password' required />
                    </div>
                    <div className='auth-block'>
                        <input id='auth-submit-btn' type='submit' value={login ? "Login" : "Create account"}/>
                    </div>  
                </form>
                <div id='register-option-switch'>
                    <button className=' btn-ghost btn-anchor' onClick={() => setLogin(!login)} >
                            <p>{login ? "Don't have an account?" : "Already have an account?"}</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

const Login = () => {
    return (
        <div></div>
    )
}

const SignUp = () => {
    return(
        <div></div>
    )
}

export default Auth