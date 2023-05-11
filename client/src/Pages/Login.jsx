import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const login = () => {
    if (!username) {
      toast.error("Please enter a username...");
    }
    else if (!password) {
      toast.error("Please enter a password...");
    }
    else {
      Axios.post("http://localhost:5000/login", {
        username: username,
        password: password,
      }).then((response) => {
        if (response.data.message) {
          toast.error(response.data.message);
        } else {
          setLoginStatus("success");
          navigate(`/dashboard/${response.data[0].id}`);
        }
      });
    }
  };

  return (
    <div className="Login">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username…"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      /><br />
      <input
        type="password"
        placeholder="Password…"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br></br>
      <button onClick={login}>Login</button>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
      <h1>{loginStatus}</h1>
      <br></br>
      <Link to={"/"}><button>Exit</button></Link>
    </div>
  );
}

export default Login;