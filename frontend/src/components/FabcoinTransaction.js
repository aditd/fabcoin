import React from 'react';
import { useState } from "react";
//import { initiateTransaction } from '../services/FabcoinService';

const FabcoinTransaction = () => {
  const [amount, setAmount] = useState(false);
  const [receiver, setReceiver] = useState("");

  // State to store the list of input pairs
  const [inputList, setInputList] = useState([])

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handling the name change
  const handleAmount = (e) => {
    const value =
    e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setAmount(value);
      //setAmount(e.target.value);
    setSubmitted(false);
  };

  // Handling the email change
  const handleReceiver = (e) => {
      setReceiver(e.target.value);
      setSubmitted(false);
  };

  // Function to handle adding the input pair to the list
  const handleAddInput = () => {
    // Split the input value into name and number
    const [name, number] = receiver.split(',').map(item => item.trim());

    // Check if both name and number are provided
    if (name && number) {
      // Add the input pair to the list
      setInputList([...inputList, { name, number }]);
      
      // Clear the input field
      if (!submitted) {
        setReceiver('');
        //setAmount(amount)
      }
    }
  };

// Showing success message
const successMessage = () => {
    return (
        <div
            className="success"
            style={{
                display: submitted ? "" : "none",
            }}
        >
            <h1>Transferred {amount ? 'some' : 'no'} coins to {receiver} successfully!!</h1>
        </div>
    );
};

// Showing error message if error is true
const errorMessage = () => {
    return (
        <div
            className="error"
            style={{
                display: error ? "" : "none",
            }}
        >
            <h1>Please enter all the fields</h1>
        </div>
    );
};

  const handleTransaction = (e) => {
    // Implement transaction initiation logic
    e.preventDefault();
    if (amount === 0 || receiver === "") {
        setError(true);
    } else {
        setSubmitted(true);
        setError(false);
        console.log('Sending Transaction:', { amount, receiver });
        setInputList([]);
    }
    //console.log('Sending Transaction:', { amount, receiver });
  };

  return (
    <div>
      <h2>Fabcoin Transfer</h2>
      <form>
        <label>
          UTXO:
          <input type="checkbox" name="hooks" checked={amount} onChange={handleAmount} />
        </label>
        <br />
        <label>
          Receiver:
          <input type="text" value={receiver} onChange={handleReceiver} />
        </label>
        <button type="button" onClick={handleAddInput}>Add</button>
        <br />
        <ul>
          {/* Displaying recent input pairs */}
          {inputList.map((item, index) => (
            <li key={index}>{`Name: ${item.name}, Number: ${item.number}`}</li>
          ))}
        </ul>

        <h2>All Input Pairs:</h2>
        <ul>
          {/* Displaying all input pairs */}
          {inputList.map((item, index) => (
            <li key={index}>{`Name: ${item.name}, Number: ${item.number}`}</li>
          ))}
        </ul>
        <button type="button" onClick={handleTransaction}>
          Initiate Transaction
        </button>
      </form>

      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>
    </div>
  );
};

export default FabcoinTransaction;

//<div>
//<h2>Fabcoin Transactions</h2>
//{/* Add transaction initiation form or button */}
//<button onClick={handleTransaction}>Initiate Transaction</button>
//</div>