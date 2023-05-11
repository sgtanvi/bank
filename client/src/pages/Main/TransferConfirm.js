import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Axios from 'axios';
import "./Transfer.css";


export default function Transfer(props) {
  const {username} = useParams(); //Tried naming variable "ID" (This value is the User ID from the URL) but anything but "username" causes problems)

  return (
    <div style={{ marginTop: "150px" }}>
      <h1> Transfer Completed Successfully! </h1>

      <div>
        <Link to={`/dashboard/${username}`}>
          <input type="button" value="Done" />
        </Link>
      </div>

    </div>
    
  );
}