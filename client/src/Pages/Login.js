import React, { useEffect, useState } from "react";
import Axios from 'axios';
import './Login.css';
 
function Login() {
 
 const [usernameReg, setUernameReg] = useState("");
 const [passwordReg, setPasswordReg] = useState ("");
 
 const [username, setUername] = useState("");
 const [password, setPassword] = useState ("");
 
 const [loginStatus, setLoginStatus] = useState("");
 
 const register = () => {
    Axios.post("http://localhost:5000/register", {
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response);
    });
 };
 
 const login = () => {
    Axios.post("http://localhost:5000/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
         setLoginStatus( "fail");
      } else {
         setLoginStatus ("success");
      }
   });
 };
 
 return (
    <div className="Registration">
       <div className="registration">
          <h1>Registration</h1>
          <label>Username</label>
          <input
             type="text"
             onChange={(e) => {
                setUernameReg(e.target.value);
             }}
          /><br/>
          <label>password</label>
          <input 
            type="text"
            onChange={(e) =>{
               setPasswordReg(e.target.value);
            }}
          /> <br />
          <button onClick={register} > Register</button>
       </div>
 
       <div className="login">
           <h1>Login</h1>
           <input
              type="text"
              placeholder="Username…"
              onChange = { (e) => {
                 setUername (e.target.value);
              }}
              /> <br/>
           <input
              type="password"
              placeholder="Password…"
              onChange = { (e) => {
                 setPassword (e.target.value);
              }}
           />
           <button onClick={login}>Login</button>
       </div>
       <h1> {loginStatus}</h1>
    </div>
 );
}

export default Login;