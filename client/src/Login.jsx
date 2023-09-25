import React, { useState} from 'react';
import { Fragment } from 'react';
import './LoginForm.css'; // Import the CSS file for styling
import axios from  "axios"


function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    axios.post("http://localhost:8080/login",{username,password})
    .then(res=>console.log(res))
    .catch(err=>console.log(err));
  
  };

  return (
    <Fragment>
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
   
    
   
    </Fragment>
  );
}

export default LoginForm;
