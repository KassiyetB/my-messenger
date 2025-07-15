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
                {login ? <Login /> : <SignUp />}
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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const loginUser = async (email, password) => {
        try{
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();

            if (!response.ok){
                throw new Error(data.msg || 'login failed');
            }

            localStorage.setItem('token', data.token);
            return { success: true, token: data.token };

        }catch(err){
            console.error('Login error:', err.message);
            return { success: false, error: err.message };
        }
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await loginUser(email, password);
        if (result.success) {
            window.location.reload();
        } else {
        setError(result.error);
        }
    };

    return (
        <form id='auth-form' onSubmit={handleSubmit}>
            <div className='auth-block'>
                <label htmlFor='email'>Email</label>
                <input 
                    className='auth-input' 
                    id='email' 
                    name='email' 
                    value={email} 
                    type='text'
                    onChange={e => setEmail(e.target.value)}  
                    required 
                />
            </div>
            <div className='auth-block'>
                <label htmlFor='password'>Password</label>
                <input 
                    className='auth-input' 
                    id='password' 
                    name='password'
                    value={password} 
                    type='password'
                    onChange={e => setPassword(e.target.value)}  
                    required 
                />
            </div>
            {error && <p style={{color:"red", margin:"", fontSize:"12px"}}>{error}</p>}
            <div className='auth-block'>
                <input id='auth-submit-btn' type='submit' value="Login"/>
            </div> 
            
        </form>
    )
}

const SignUp = () => {
    return(
        <form id='auth-form'>
            <div className='auth-block'>
                <label htmlFor='email'>Username</label>
                <input className='auth-input' id='username' name='username' type='text' required />
            </div>
            <div className='auth-block'>
                <label htmlFor='email'>Email</label>
                <input className='auth-input' id='email' name='email' type='text' required />
            </div>
            <div className='auth-block'>
                <label htmlFor='password'>Password</label>
                <input className='auth-input' id='password' name='password' type='password' required />
            </div>
            <div className='auth-block'>
                <input id='auth-submit-btn' type='submit' value="Create account"/>
            </div>  
        </form>
    )
}

export default Auth