import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { toast } from "react-toastify";

function ATMLanding() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [PIN, setPIN] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const ATMlogin = () => {
    Axios.post("http://localhost:5000/ATMlogin", {
      username: username,
      PIN: PIN,
    }).then((response) => {
      if (response.data.message) {
        toast.error(response.data.message);
      } else {
        setLoginStatus("success");
        navigate(`/ATM/${response.data[0].id}`);
      }
    });
  };

  return (
    <div className="ATMLogin">
      <h1>ATM: Login</h1>
      <input
        type="text"
        placeholder="Username…"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      /><br />
      <input
        type="PIN"
        placeholder="PIN"
        onChange={(e) => {
          setPIN(e.target.value);
        }}
      />
      <br></br>
      <button onClick={ATMlogin}>Login</button>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
      <h1>{loginStatus}</h1>
      <br></br>
      <Link to={"/"}><button>Exit</button></Link>
    </div>
  );
}

export default ATMLanding;