import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import { toast } from 'react-toastify';


export default function Transfer() {
  const { username } = useParams(); //Tried naming variable "ID" (This value is the User ID from the URL) but anything but "username" causes problems)
  const navigate = useNavigate();

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
    
    if(!user2.id){
      toast.error(`${recipient} is not a registered user...`);
    }
    else if(user.id = user2.id){
      toast.error(`Please enter a user other than yourself...`)
    }
    else if (amount <= 0) {
      toast.error("Please enter a value greater than 0!");
    }
    else if (!/^\d+$/.test(amount)){
      toast.error("Please enter a number!");
    }
    else if(amount > user.money){
      toast.error("You do not have enough money!");
    }
    else {

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
        navigate(`/confirm-transfer/${user.id}`);
        // TODO: handle success response
      }).catch(error => {
        console.log(error);
        // TODO: handle error response
      });

      toast.success(`Successfully paid ${amount} to ${recipient}`);
      navigate(`/dashboard/${user.id}`);
    }
  }

  const handleRequestSubmit = (event) => {
    event.preventDefault();
    
    if(!user2.id){
      toast.error(`${recipient} is not a registered user...`);
    }
    else if (amount <= 0) {
      toast.error("Please enter a value greater than 0!");
    }
    else if (!/^\d+$/.test(amount)){
      toast.error("Please enter a number!");
    }
    else if(amount > user2.money){
      toast.error(`${user2.username} does not have enough money...`);
    }
    else {

      Axios.post('http://localhost:5000/api/requestadd', {
        requesterId: user.id,
        amount: amount
      }).then(response => {
        console.log(response.data);
        // TODO: handle success response
      }).catch(error => {
        console.log(error);
        // TODO: handle error response
      });

      Axios.post('http://localhost:5000/api/requestpull', {
        requestedId: user2.id,
        amount: amount
      }).then(response => {
        console.log(response.data);
        // TODO: handle success response
      }).catch(error => {
        console.log(error);
        // TODO: handle error response
      });

      toast.success(`Successfully requested ${amount} from ${recipient}`);
      navigate(`/dashboard/${user.id}`);
    }
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
        <Link to={`/dashboard/${username}`}>
          <input type="button" value="Back" />
        </Link>
      </div>

    </div>

  );
}