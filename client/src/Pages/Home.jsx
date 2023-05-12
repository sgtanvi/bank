import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "gold", padding: "10px" }}>
        <Link to="/" style={{ textDecoration: "none", color: "blue", fontSize: "24px", fontWeight: "bold" }}>Golden State Bank</Link>
        <Link to="#about" style={{ textDecoration: "none", color: "blue", fontSize: "18px" }}>About</Link>
      </nav>

      <div style={{ marginTop: "150px" }}>
        <h1 style={{ color: "blue" }}>Welcome to Golden State Bank!</h1>

        <div>
          <h3>Log In to Online Banking:</h3>
          <Link to={"/login"}><button>Login</button></Link>

          <h3>Withdraw from the ATM:</h3>
          <Link to={"/ATM-Landing"}><button>ATM</button></Link>
        </div>
      </div>

      <div id="about" style={{ marginTop: "50px" }}>
        <h2 style={{ color: "blue" }}>About Golden State Bank</h2>
        <p style={{ color: "blue" }}>This is the best online banking service available for you!</p>
      </div>
    </div>
  );
}