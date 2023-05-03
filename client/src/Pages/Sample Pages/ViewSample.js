import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"
import axios from "axios";
import "./ViewSample.css"

const ViewSample = () => {
    const [user, setUser] = useState({});

    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5001/api/get/${id}`).then((resp) => setUser({ ...resp.data[0] }))
    }, [id]);
    return (
        <div style={{ marginTop: "150px" }}>
            <div className="card">
                <div className="card-header">
                    <p> User Info</p>
                </div>
                .<div className="container">
                    <strong> ID: </strong>
                    <span>{id}</span>
                    <br/>
                    <br/>

                    <strong> Username: </strong>
                    <span>{user.username}</span>
                    <br/>
                    <br/>

                    <strong> Password: </strong>
                    <span>{user.password}</span>
                    <br/>
                    <br/>

                    <Link to = "/">
                        <div className="btn btn-edit">Back</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default View