import React from 'react';
import { connect } from 'react-redux';

class Bank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const amount = parseInt(this.state.number, 10);
    if (amount <= 0) {
      alert('Error: Deposit amount cannot be negative.');
    } else {
      this.props.deposit(amount);
      this.setState({
        number: ''
      });
    }
  }

  render() {
    return (
      <div className="bank">    
        <h2>Bank</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Make a deposit:
            <br />
            <input
              type="number"
              className="textfield"
              value={this.state.number}
              onChange={e => this.setState({ number: e.target.value })}
            />
          </label>
          <button className="mainbtn" type="submit">Confirm</button>
        </form>
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
    deposit: (amount) => dispatch({type:'deposit', value: amount}),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bank);
