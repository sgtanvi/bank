import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function Dashboard({ location }) {
  const [balance, setBalance] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userID, setUserID] = useState(location.state.id);

  useEffect(() => {
    Axios.get(`http://localhost:5001/getUser/${userID}`).then((response) => {
      setFirstName(response.data[0].first_name);
      setLastName(response.data[0].last_name);
      setBalance(response.data[0].balance);
    });
  }, [userID]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {firstName} {lastName}!</p>
      <p>Your current balance is ${balance}</p>
      <div>
        <Link to="/deposit">Deposit</Link>
        <Link to="/transfer">Transfer</Link>
        <Link to="/accountinfo">Account Info</Link>
        <Link to="/PIN">Change PIN</Link>
      </div>
    </div>
  );
}

export default Dashboard;
