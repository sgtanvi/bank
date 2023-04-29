import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
//import Login from "./Pages/Login";
//import Registration from "./Pages/Registration";
import Dashboard from "./Pages/Main/Dashboard";
import Deposit from './Pages/Main/Deposit';
import Transfer from "./Pages/Main/Transfer";
import useToken from './useToken';
import AccountInfo from './Pages/Main/AccountInfo';
import PIN from './Pages/PIN';
import Registration from './Pages/Registration';

/* function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken.token 
}*/

function App() {

  /* const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />
  } */

  return (
    <Router>
      <div className="App">
        <ToastContainer position="top-center" />
        <Routes>
          {/* Login will intecept the dashboard when opened withut credentials*/}
          <Route path="/" Component = {Dashboard}>
          </Route>
          <Route exact path="/deposit" Component = {Deposit}>
          </Route>
          <Route exact path="/transfer" Component = {Transfer}>
          </Route>
          <Route exact path="/accountinfo" Component = {AccountInfo}>
          </Route>
          <Route exact path="/transfer" Component = {Transfer}>
          </Route>
          <Route exact path="/transfer" Component = {Transfer}>
          </Route>
          <Route exact path="/PIN" Component = {PIN}>
          </Route>
          <Route path = "/register" Component={Registration}>
          </Route>
        </Routes>
      </div>
    </Router>

  );
}

export default App;
