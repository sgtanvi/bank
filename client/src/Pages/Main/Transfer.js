import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Transfer.css";


export default function Transfer() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const handleRecipientChange = (event) => {
    setRecipient(event.target.value);
  }

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  }

  const handlePaySubmit = (event) => {
    event.preventDefault();
    console.log(`Paying ${amount} to ${recipient}`);
    // TODO: Implement payment logic here
  }

  const handleRequestSubmit = (event) => {
    event.preventDefault();
    console.log(`Requesting ${amount} from ${recipient}`);
    // TODO: Implement request logic here
  }

  return (
    <div style={{ marginTop: "150px" }}>
      <h1> Pay or Request </h1>

      <form>
        <label> Recipient: </label>
        <input
          type="text"
          id="User"
          name="User"
          value={recipient}
          onChange={handleRecipientChange}
        />
        <br></br>
        <label> Amount: </label>
        <input
          type="text"
          id="Amount"
          name="Amount"
          value={amount}
          onChange={handleAmountChange}
        />
        <br></br>
        <button type="submit" onClick={handlePaySubmit}>Pay</button>
        <button type="submit" onClick={handleRequestSubmit}>Request</button>
      </form>

      <div>
        <Link to="/">
          <input type="button" value="Back" />
        </Link>
      </div>

    </div>
    
  );
}
