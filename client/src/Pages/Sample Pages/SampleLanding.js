import React, {useState, useEffect} from 'react';
import {} from "react-router-dom";
import "./SampleLanding.css";
import {} from "react-toastify";
import { Link } from 'react-router-dom';
import axios from "axios";
import {toast} from "react-toastify";

const SampleLanding = () => {
    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get ("http://localhost:5001/api/get");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const deleteUser = (id) => {
        if(window.confirm("Are you sure you want to delete your account?")){
            axios.delete(`http://localhost:5001/api/remove/${id}`);
            toast.success("Your Account has been successfully removed!");
            setTimeout(()=> loadData(), 500);
        }
    }
    return (
        <div style={{marginTop: "150px"}}>
            <Link to = "/register">
                <button className="btn btn-register">Don't have an account? Click here to Register</button>
            </Link>
            <table className = "styled-table">
                <thead>
                    <tr>
                        <th style = {{textAlign: "center"}}> No. </th>
                        <th style = {{textAlign: "center"}}> Username </th>
                        <th style = {{textAlign: "center"}}> Password </th>
                        <th style = {{textAlign: "center"}}> Action </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return(
                            <tr key = {item.id}>
                                <th scope = "row">{index+1}</th>
                                <td>{item.username}</td>
                                <td>{item.password}</td>
                                <td>
                                    <Link to = {`/update/${item.id}`}>
                                        <button className = "btn btn-edit">Edit</button>
                                    </Link>
                                        <button className = "btn btn-delete" onClick = {() => deleteUser(item.id)}>Delete</button>
                                    <Link to = {`/view/${item.id}`}>
                                        <button className = "btn btn-view">View</button>
                                    </Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Login
