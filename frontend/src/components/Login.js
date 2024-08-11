import React, { useContext, useEffect, useState } from 'react'
// import NoteContext from '../context/NoteContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../css/style.css'
import eyeclose from '../image/eye-close.png'
import eyeopen from '../image/eye-open.png'
export default function Login() {
  let eyecloses = eyeclose;
  let eyeopens = eyeopen;
  const host = 'http://localhost:5000'
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();
  // const context = useContext(NoteContext);
  // const {authToken, setUser, setAlert, setAlertmsg} = context
  const from = location.state?.from || '/';
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('user_token')) {
      navigate(`${from}`)
    }
    //   setLoading(false)
  }, [from, navigate])
  if (localStorage.getItem('user_token')) {
    navigate(`/`)
  }
  const handleLogin = async (e) => {
    console.log(error)
    e.preventDefault();
    try {
      const url = `${host}/api/auth/login`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: username, password: password })
      });

      if (!response.ok) {
        setError('Invalid Username and Password')
        return;
      }

      const json = await response.json();
      localStorage.setItem('user_token', json.user_token);
      localStorage.setItem('username', username);
      localStorage.setItem('userId', json.userId);
      if(json.academicform === false){
          navigate('/academicform')
      }
      setError('');
      navigate(`${from}`);
    } catch (error) {
      setError("Invalid Username and Password");
    }

  };

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
    <div className="container" id="container">
      <div className="left" id="left">
        <h1>Academic </h1>
        <h2>Tender</h2>
        <p className="upper">Regester to grow and</p>
        <p className="lower">enhance your knowledge</p>
      </div>

      <div className="right" id="right">
        <h1>Login</h1>

        {error && (
          <div style={{ color: "red", margin: 0, fontSize: '14px', textAlign: 'center' }}>{error}</div>
        )}

        <div> </div>
        <form action="" onSubmit={handleLogin}>
          <div className="input-field" id="input-field">
            <input type="text" placeholder="Username" autoComplete="current-password" onChange={(e) => { setError(''); setUsername(e.target.value) }} />
          </div>

          <div className="input-field" id="sec-input-field">
            <input type="password" placeholder="Password" id="password" value={password} autoComplete="current-password" onChange={(e) => { setError(''); setPassword(e.target.value) }} />
            <img src={eyecloses} id="closeicon" onClick={paswordClick} />
          </div>

          <button type="submit" className="login">Login</button>


          <div className="forget" id="forget">
            <small> <Link to="#">Forget password?</Link></small>
          </div>

          <div className="new_register" id="new-register">
            <button type="menu"><Link style={{ textDecoration: "none" }} to='/signup'>Create new account</Link></button>
          </div>
        </form>
      </div>
    </div>
  )
}