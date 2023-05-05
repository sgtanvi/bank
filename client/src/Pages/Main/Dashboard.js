import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useParams } from "react-router-dom";

function Dashboard() {
  const {username} = useParams();

  const [user, setUser] = useState({});

  useEffect(() => {
    Axios.get(`http://localhost:5000/api/get/${username}`).then((response) => setUser({ ...response.data[0] }))
  }, [username]);

  return (
    <div>
      <div class="input-color">
        <h1>Welcome {user.username}!</h1>
      </div>
      <p>Account Number #...{(user.accnum)%10000}</p>
      <p>Your current balance is ${user.money}</p>
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