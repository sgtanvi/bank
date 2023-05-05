import React from 'react';
import { Link } from 'react-router-dom';
import "./Transfer.css";


export default function Transfer() {

  /* const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
        toast.error("Please provide value into each input field");
    }
    else {
        if (!id) {
            axios.post("http://localhost:5000/api/post", {
                username,
                password
            }).then(() => {
                setState({ username: "", password: "" })
            }).catch((err) => toast.error(err.response.data));
            toast.success("Registration Successful!");
            setTimeout(() => navigate("/"), 500)
        }
        else {
            axios.put(`http://localhost:5000/api/update/${id}`, {
                username,
                password
            }).then(() => {
                setState({ username: "", password: "" })
            }).catch((err) => toast.error(err.response.data));
            toast.success("Updated Successful!");
            setTimeout(() => navigate("/"), 500)
        }
    }
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
};
 */
  return (
    <div style={{ marginTop: "150px" }} /* onSubmit={handleSubmit} */>
      <h1> Pay or Request </h1>

      <label> Recipient: </label>
      <input
        type="text"
        id="User"
        name="User"
        //onChange={handleInputChange}
      />
      <br></br>
      <label> Amount: </label>
      <input
        type="text"
        id="Amount"
        name="Amount"
        //onChange={handleInputChange}
      />

      <br></br>

      <input type="button" value="Pay" />
      <input type="button" value="Request" />

      <div>
        <Link to="/">
          <input type="button" value="Back" />
        </Link>
      </div>

    </div>

  );
}