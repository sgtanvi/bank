import React from 'react';
import { Link } from 'react-router-dom';


export default function Home() {

  return (
    <div style={{ marginTop: "150px" }}>
      <h1> Welcome to Warriors Bank! </h1>

      <div>
        <label> Log In to Online Banking:</label>
        <Link to={"/login"}><button>Login</button></Link>

        <label> Withdraw from the ATM:</label>
        <Link to={"/ATMLanding"}><button>ATM</button></Link>
      </div>

    </div>

  );
}