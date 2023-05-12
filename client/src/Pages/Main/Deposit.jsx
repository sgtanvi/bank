///////////////////////TANVI CHANGES 

import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Axios from 'axios';

export default function Deposit() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [image, setImage] = useState(null);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleDepositSubmit = async (event) => {
    event.preventDefault();
    if (amount <= 0) {
      toast.error('Please enter a value greater than 0!');
      return;
    }
    if (!/^\d+$/.test(amount)) {
      toast.error('Please enter a valid whole number!');
      return;
    }
    if (!image) {
      toast.error('Please select an image!');
      return;
    }
    const formData = new FormData();
    formData.append('userId', username);
    formData.append('amount', amount);
    formData.append('image', image);
    try {
      const response = await Axios.post('http://localhost:5000/api/deposit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      toast.success(`Deposited $${amount} successfully`);
      navigate(`/dashboard/${username}`);
    } catch (error) {
      console.log(error);
      // TODO: handle error response
    }
  };

  return (
    <div style={{ marginTop: '150px' }}>
      <h1> Deposit </h1>
      <form>
        <h3> How much would you like to deposit?: </h3>
        <input type="text" id="User" name="User" value={amount} onChange={handleAmountChange} />
        <h3>Select an image:</h3>
        <input type="file" name="image" accept=".png, .jpg" onChange={handleImageChange} />
        <button type="submit" onClick={handleDepositSubmit}>
          Deposit
        </button>
      </form>
      <div>
        <Link to={`/dashboard/${username}`}>
          <input type="button" value="Back" />
        </Link>
      </div>
    </div>
  );
}



////***************JAIME_CODE********************//////
/*

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
*/