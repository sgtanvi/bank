import React from 'react';
import { Link } from 'react-router-dom';
import "./Transfer.css";


export default function Transfer() {



  return (
    <div style={{ marginTop: "150px" }}>
      <h1> Pay or Request </h1>

      <label> Recipient: </label>
      <input
        type="text"
        id="User"
        name="User"
      /* value={targetusername}
      onChange={handleInputChange} */
      />
      <br></br>
      <label> Amount: </label>
      <input
        type="text"
        id="Amount"
        name="Amount"
      /* value={targetusername}
      onChange={handleInputChange} */
      />

      <br></br>

      <input type="button" value="Pay" />
      <input type="button" value="Request" />

      <div>
        <Link to="/">
          <input type="button" value="Back" />
        </Link>
      </div>

    </div>

  );
}