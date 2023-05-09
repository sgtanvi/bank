import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Axios from 'axios';
import "./Transfer.css";


export default function Transfer(props) {
  const {username} = useParams(); //Tried naming variable "ID" (This value is the User ID from the URL) but anything but "username" causes problems)

  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  
  const [user, setUser] = useState({});
  const [user2, setUser2] = useState({});

  useEffect(() => {
    Axios.get(`http://localhost:5000/api/get/${username}`).then((response) => setUser({ ...response.data[0] }))
  }, [username]);

  useEffect(() => {
    Axios.get(`http://localhost:5000/api/getuser/${recipient}`).then((resp) => setUser2({ ...resp.data[0] }))
  }, [recipient]);

  const handleRecipientChange = (event) => {
    setRecipient(event.target.value);
  }

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  }

  const handlePaySubmit = (event) => {
    event.preventDefault();
    console.log(`Paying ${amount} to ${recipient}`);
  
    Axios.post('http://localhost:5000/api/transferpull', {
      senderId: user.id,
      amount: amount
    }).then(response => {
      console.log(response.data);
      // TODO: handle success response
    }).catch(error => {
      console.log(error);
      // TODO: handle error response
    });

    Axios.post('http://localhost:5000/api/transferadd', {
      recipientId: user2.id,
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
  
    Axios.post('http://localhost:5000/request', {
      requesterId: user.id,
      recipientId: user2.id,
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
