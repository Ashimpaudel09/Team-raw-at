import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import UserContext from '../context/UserContext';
import eyeclose from '../image/eye-close.png'
import eyeopen from '../image/eye-open.png'

// import NoteContext from '../context/NoteContext';
import '../css/style.css'
export default function Signup() {
    let eyecloses = eyeclose;
    let eyeopens = eyeopen;
    const navigate = useNavigate();
    const location = useLocation();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const host = 'http://localhost:5000'
    const from = location.state?.from || '/';
    const handleSignup = async (e) => {
        e.preventDefault();
        if (password < 6) {
            setError('Password must have atleast 6 characters');
            return
        }
        if (password !== confirmPassword) {
        setError('Password and Confirm Password must be Same');
          return;
        }
        if(email===''){
            setError('Email field is required')}
        const url = `${host}/api/auth/signup`
        const response = await fetch(url,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password, confirmPassword })
            }
        )
        if (!response.ok) {
            if (response.status == 500) {
                setError('User already exists')
                return;
            }
            return;
        }
        const json = await response.json();
        localStorage.setItem('user_token', json.user_token);
        localStorage.setItem('username', email)
        localStorage.setItem('userId', json.userId)
        navigate(`/academicform`)
    }

    const paswordClick = (e) => {
        if (e.target.src === eyecloses) {
            e.target.src = eyeopens
            e.target.previousSibling.type = 'text';
        }
        else if (e.target.src === eyeopens) {
            e.target.src = eyecloses
            e.target.previousSibling.type = 'password';


        }
    }
    return (
        <div className="singup-container container" id="singup-container">

            <div className="left" id="left">
                <h1>Academic </h1>
                <h2>Tinder</h2>
                <p className="upper">Regester to grow and</p>
                <p className="lower">enhance your knowledge</p>
            </div>

            <div className="right" id="right-side">
            {error && (
          <div style={{ color: "red", marginTop: '5px', fontSize: '14px', textAlign: 'center' }}>{error}</div>
        )}
                <form action="" onSubmit={handleSignup}>
                    <h1>Create Account</h1>

                    <div className="input-field" id="signup-input-field">
                        <input type="name" placeholder="Name" autoComplete="current-password" onChange={(e) => {setName(e.target.value)}}/>

                    </div>

                    <div className="input-field" id="sec-signup-input-field">
                        <input type="email" placeholder="Email" autoComplete="current-password" onChange={(e) => {setEmail(e.target.value)}} />

                    </div>

                    <div className="input-field" id="third-input-field">
                        <input type="password" placeholder="Password" id='password' autoComplete="current-password" onChange={(e) => { setPassword(e.target.value)}} />
                        <img src={eyeclose} onClick={paswordClick} />

                    </div>

                    <div className="input-field" id="forth-input-field">
                        <input type="password" placeholder="Conform Password" id="confirmpassword"autoComplete="current-password" onChange={(e) => {setConfirmPassword(e.target.value)}} />
                        <img src={eyeclose} id="closeicon" onClick={paswordClick} />
                    </div>
                    <button type="submit" id="signup" className="signup">SIGN UP</button>
                    <div class="alog">Already have an account? <Link to="/login">login</Link></div>

                </form>
            </div>
        </div>


    )
}
