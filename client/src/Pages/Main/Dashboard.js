import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useParams } from "react-router-dom";

function Dashboard() {
  const {username} = useParams(); //Tried naming variable "ID" (This value is the User ID from the URL) but anything but "username" causes problems)

  const [user, setUser] = useState({});

  useEffect(() => {
    Axios.get(`http://localhost:5000/api/get/${username}`).then((response) => setUser({ ...response.data[0] }))
  }, [username]);

  return (
    <div>
      <div class="input-color">
        <h1>Welcome {user.username}!</h1>
      </div>
      <p>Account Number #...{(100000000000+(user.id))%10000}</p>
      <p>Your current balance is ${user.money}</p>
      <div>
        <Link to="/deposit"><button>Deposit</button></Link>
        <br></br>
        <Link to={`/transfer/${username}`}><button>Transfer</button></Link>
        <br></br>
        <Link to={`/accountinfo/${username}`}><button>Delete</button></Link>
        <br></br>
        <Link to={`/PIN${username}`}><button>Change PIN</button></Link>
        <br></br>
        <Link to={"/"}><button>Logout</button></Link>
      </div>
    </div>
  );
}

export default Dashboard;