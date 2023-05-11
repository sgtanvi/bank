import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Login from "./Pages/Login";
import Dashboard from "./Pages/Main/Dashboard";
import Deposit from './Pages/Main/Deposit';
import Transfer from "./Pages/Main/Transfer";
import useToken from './useToken';
import AccountInfo from './Pages/Main/AccountInfo';
import PIN from './Pages/PIN';
import Registration from './Pages/Registration';
import TransferConfirm from './Pages/Main/Transfer';
//import useToken from './useToken';
function App() {
  //const { token, setToken } = useToken();


  return (
    <Router>
      <div className="App">
        <ToastContainer position="top-center" />
        <Routes>
        <Route path="/" element={<Login /* setToken={setToken} */ />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/dashboard/:username" element={<Dashboard />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/transfer/:username" element={<Transfer />} />
          <Route path="/accountinfo" element={<AccountInfo />} />
          <Route path="/PIN" element={<PIN />} />
          <Route path="/confirm-transfer/:username" element={<TransferConfirm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;