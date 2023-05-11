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

            <form>
                <h3> How much would you like to withdraw?: </h3>
                <input
                    type="text"
                    id="User"
                    name="User"
                    value={amount}
                    onChange={handleAmountChange}
                />
                <button type="submit" onClick={handleWithdrawalSubmit}>Withdraw</button>
            </form>

            <div>
                <Link to={`/ATM-landing`}>
                    <input type="button" value="Exit" />
                </Link>
            </div>

        </div>

    );
}