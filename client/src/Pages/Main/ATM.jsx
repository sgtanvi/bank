import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Axios from 'axios';


export default function ATM() {

    const { username } = useParams(); //Tried naming variable "ID" (This value is the User ID from the URL) but anything but "username" causes problems)
    const navigate = useNavigate();

    const [user, setUser] = useState({});
    const [amount, setAmount] = useState("");

    useEffect(() => {
        Axios.get(`http://localhost:5000/api/get/${username}`).then((response) => setUser({ ...response.data[0] }))
    }, [username]);

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    }

    const handleWithdrawalSubmit = (event) => {
        event.preventDefault();

        if (amount <= 0) {
            toast.error("Please enter a value greater than 0!");
        }
        else if (!/^\d+$/.test(amount)){
            toast.error("Please enter a number!");
          }
        else if (user.money < amount){
            toast.error("You don't have enough money in your account!");
          }
        else {
            Axios.post('http://localhost:5000/api/withdraw', {
                userId: user.id,
                amount: amount
            }).then(response => {
                console.log(response.data);
                // TODO: handle success response
            }).catch(error => {
                console.log(error);
                // TODO: handle error response
            });

            toast.success(`Withdrew $${amount} successfully`);
            navigate(`/ATM-confirmation`);
        }
    }


    return (
        <div style={{ marginTop: "150px" }}>
            <h1> ATM: Withdraw Money </h1>
            <div className = "cardcontainer">
                <div className = "card">
                    <h3 className ="cardheader">Available Balance:</h3>
                    <h2 className = "cardheader">${user.money}</h2>
                    <br/>
                    <h3 className = "cardheader">Account Number: (....{user.id})<br/> </h3>
                </div>
                
            </div>

            <form>
                <h3> How much would you like to withdraw?: </h3>
                <input
                    type="text"
                    id="User"
                    name="User"
                    value={amount}
                    onChange={handleAmountChange}
                />
                <button type="submit" id="submitButton" onClick={handleWithdrawalSubmit}>Withdraw</button>
            </form>

            <div>
                <Link to={`/ATM-landing`}>
                    <input type="button" id="exitButton" value="Exit" />
                </Link>
            </div>

        </div>

    );
}