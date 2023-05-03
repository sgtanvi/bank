import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import "./Registration.css";

function Registration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = () => {
    Axios.post("http://localhost:5001/api/post", {
      username: username,
      password: password,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="Registration">
      <h1>Registration</h1>
      <label>Username</label>
      <input
        type="text"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      /><br />
      <label>Password</label>
      <input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      /><br />
      <button onClick={register}>Register</button>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default Registration;
