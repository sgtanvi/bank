import React from 'react';
import { Link } from 'react-router-dom';


export default function ATMConfirm() {

  return (
    <div style={{ marginTop: "150px" }}>
      <h1> Transaction Completed Successfully! </h1>

      <div>
        <Link to={`/ATM-landing`}>
          <input type="button" value="Done" />
        </Link>
      </div>

    </div>

  );
}