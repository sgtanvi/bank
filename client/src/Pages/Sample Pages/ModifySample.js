import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import "./ModifySample.css";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    username: "",
    password: ""
};

const ModifySample = () => {
    const [state, setState] = useState(initialState);

    const { username, password } = state;

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`).then((resp) => setState({ ...resp[0] }))
    }, [id]);

    const handleSubmit = (e) => {
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

    return (
        <div style={{ marginTop: "100px" }}>
            <form style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center"
            }}
                onSubmit={handleSubmit}
            >
                <label htmlFor="username"> Username </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Please Select a Username..."
                    value={username || ""}
                    onChange={handleInputChange}
                />

                <label htmlFor="password"> Password </label>
                <input
                    type="text"
                    id="password"
                    name="password"
                    placeholder="Please Select a Password..."
                    value={password || ""}
                    onChange={handleInputChange}
                />

                <input type="submit" value={id ? "Update" : "Save"} />
                <Link to="/">
                    <input type="button" value="Back" />
                </Link>
            </form>
        </div>
    )
}

export default Registration