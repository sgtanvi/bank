
import React, { Component } from 'react';
import './DashboardForm.css';
import Bank from "../Bank/Bank";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

//import {useState} from "react";

class Main extends Component {

render() { 

  let transactionHistory = (
   <div>
    {this.props.transactionHistory.map((log, index) => { return <li key={index}>{log.transactionType} ${log.amount} | closing balance: ${log.newBalance} | {log.date} </li> })} 
   </div>
  )

    return (
      <div className="Main">

      <header className="Main-header">
            Welcome
      </header>

      <h1>Balance: {this.props.balance}</h1>

      <button>
        <Link to="/atm">Go to ATM</Link>
      </button>

      <Bank />

      <div>
        <h2>Transaction History</h2>
        {transactionHistory}
      </div>
 
    </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
    balance: state.balance,
    transactionHistory: state.transactionHistory
  }
}

const mapDispatchToProps = dispatch => {
  return {
    //in last app values were hard coded, now we pass a payload depending on which button is clicked
    withdraw: (amount) => dispatch({type:'withdraw', value: amount}),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Main);

