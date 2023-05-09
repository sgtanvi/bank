import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./Transfer.css";


export default function Transfer(props) {
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
  
    axios.post('/transfer', {
      senderId: props.location.state.userID,
      recipientId: recipient,
      amount: amount
    }).then(response => {
      console.log(response.data);
      // TODO: handle success response
    }).catch(error => {
      console.log(error);
      // TODO: handle error response
    });
  }

  const handleRequestSubmit = (event) => {
    event.preventDefault();
    console.log(`Requesting ${amount} from ${recipient}`);
  
    axios.post('/request', {
      requesterId: props.location.state.userID,
      recipientId: recipient,
      amount: amount
    }).then(response => {
      console.log(response.data);
      // TODO: handle success response
    }).catch(error => {
      console.log(error);
      // TODO: handle error response
    });
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
