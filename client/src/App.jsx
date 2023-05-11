import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './Pages/Home';
import Login from "./Pages/Login";
import Dashboard from "./Pages/Main/Dashboard";
import Deposit from './Pages/Main/Deposit';
import Transfer from "./Pages/Main/Transfer";
import DeleteAcc from "./Pages/Main/DeleteAcc"
import Registration from './Pages/Registration';
import ATM from './Pages/Main/ATM';
import ATMConfirmation from './Pages/Main/ATMConfirm';
import ATMLanding from './Pages/Main/ATMLanding';
//import useToken from './useToken';
function App() {
  //const { token, setToken } = useToken();


  return (
    <Router>
      <div className="App">
        <ToastContainer position="top-center" />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Registration />} />
          <Route path="/dashboard/:username" element={<Dashboard />} />
          <Route path="/deposit/:username" element={<Deposit />} />
          <Route path="/transfer/:username" element={<Transfer />} />
          <Route path="/delete/:username" element={<DeleteAcc />} />
          <Route path="/ATM/:username" element={<ATM />} />
          <Route path="/ATM-landing" element={<ATMLanding />} />
          <Route path="/ATM-confirmation" element={<ATMConfirmation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;