import React from 'react';
import { Link } from 'react-router-dom';


export default function Home() {

  return (
    <div style={{ marginTop: "150px" }}>
      <h1> Welcome to Warriors Bank! </h1>

      <div>
        <label> Log In to Online Banking:</label>
        <Link to={`/login`}>
          <input type="button" value="Login" />
        </Link>

        <label> Withdraw from the ATM:</label>
        <Link to={`/ATM-landing`}>
          <input type="button" value="ATM" />
        </Link>
      </div>

    </div>

  );
}