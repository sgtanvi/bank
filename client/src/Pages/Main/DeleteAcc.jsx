import axios from "axios";
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function DeleteAcc() {
    const navigate = useNavigate();

    const { username } = useParams(); //Tried naming variable "ID" (This value is the User ID from the URL) but anything but "username" causes problems)

    const [users, setUser] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${username}`).then((response) => setUser({ ...response.data[0] }))
    }, [username]);

    const handleDelete = async (id) => {



        try {
            if (users.money > 0) {
                toast.error("Please Transfer your money to another account before deleting your account?");
                navigate(`/transfer/${username}`);
            }
            else {
                await axios.delete(`http://localhost:5000/users/${username}`)
                navigate(`/`);
            }

        } catch (err) {
            console.log()
        }
    }

    return (
        <div>
            <div>
                <h2>Are you sure you want to delete your account {users.money}?</h2>
                <button className="delete" onClick={() => handleDelete(username)}>Delete</button>
            </div>
            <button>
                <Link to={`/dashboard/${username}`}>Back</Link>
            </button>

        </div>
    );
};

export default DeleteAcc;
