import React, { useState, useEffect } from 'react';
import { } from "react-router-dom";
import "./Dashboard.css";
import { } from "react-toastify";
import { Link } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";

export default function Dashboard() {

  const [data, setData] = useState([]);
  /* const username = 'Jaime';
  const accnum = 1234;
  const money = 20; */
  const id = '20';

  const [user, setUser] = useState({});

  //const { id } = useParams();

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/get");
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/get/${id}`).then((resp) => setUser({ ...resp.data[0] }))
  }, [id]);

  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      axios.delete(`http://localhost:5000/api/remove/${id}}`);
      toast.success("Your Account has been successfully removed!");
      setTimeout(() => loadData(), 500);
    }
  }

  return (
    <div style={{ marginTop: "150px" }}>
      <h1> Welcome {user.username}! </h1>

      <div>
        <Link to="/deposit">
          <button className="btn btn-deposit">Deposit Money</button>
        </Link>

        <Link to="/transfer">
          <button className="btn btn-transfer">Transfer Money</button>
        </Link>

      </div>
      <table>
        <tr>
          <th>Account Number:</th>
          <td>#{user.accnum}</td>

        </tr>
        <tr>
          <th>Balance:</th>
          <td>${user.money}</td>

        </tr>
      </table>
      <div>
        <button className="btn btn-delete" onClick={() => deleteUser(id)}>Delete Account</button>
      </div>

      <div>
        {/* <Link to="/"> */}
        <button className="btn btn-log out">Log Out</button> {/* Add functionality once Login and Sessions are working*/}
        {/* </Link> */}
      </div>

    </div>
  );
}