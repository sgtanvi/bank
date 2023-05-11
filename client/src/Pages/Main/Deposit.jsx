import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Axios from 'axios';


export default function Deposit() {

  const { username } = useParams(); //Tried naming variable "ID" (This value is the User ID from the URL) but anything but "username" causes problems)
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  }

  const handleDepositSubmit = (event) => {
    event.preventDefault();
    if (amount <= 0) {
      toast.error("Please enter a value greater than 0!");
    }
    else if (!/^\d+$/.test(amount)){
      toast.error("Please enter a number!");
    }
    else {
      Axios.post('http://localhost:5000/api/deposit', {
        userId: username,
        amount: amount
      }).then(response => {
        console.log(response.data);
        // TODO: handle success response
      }).catch(error => {
        console.log(error);
        // TODO: handle error response
      });

      toast.success(`Deposited $${amount} successfully`);
      navigate(`/dashboard/${username}`);
    }
  }


  return (
    <div style={{ marginTop: "150px" }}>
      <h1> Deposit </h1>

      <form>
        <h3> How much would you like to deposit?: </h3>
        <input
          type="text"
          id="User"
          name="User"
          value={amount}
          onChange={handleAmountChange}
        />
        <button type="submit" onClick={handleDepositSubmit}>Deposit</button>
      </form>

      <div>
        <Link to={`/dashboard/${username}`}>
          <input type="button" value="Back" />
        </Link>
      </div>

    </div>

  );
}