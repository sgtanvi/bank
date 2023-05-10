import axios from "axios";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3003/users");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllUsers();
  }, []);
  
  const handleDelete = async (id)=>{
    try {
      await axios.delete("http://localhost:3003/users/"+id)
      window.location.reload()
    } catch (err) {
      console.log()
    } 
  }

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.username}</h2>
          <button className="delete" onClick={()=>handleDelete(user.id)}>Delete</button>
        </div>
      ))}
      <button>
        <Link to="/">Add</Link>
      </button>
    
    </div>
  );
};

export default Users;