import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function Home() {
    let navigate = useNavigate();
    
  
  return(
    <div style={{marginTop: "150px"}}>
          <h1> Welcome! </h1> 

          <button to="/login"> Login </button>
          <button to="/register"> Register </button>

          </div>
  );
}