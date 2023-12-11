import React, { useState, useEffect } from 'react';
//import axios from 'axios';

const TransactionList = () => {
  const [TXID, setTXID] = useState([]);
  useEffect(() => {
    // Fetch toppings data from the backend API
    const fetchTXID = async () => {
      try {
        const response = await fetch('YOUR_BACKEND_API_ENDPOINT');
        const data = await response.json();
        setTXID(data); // Update the state with fetched toppings
      } catch (error) {
        console.error('Error fetching toppings:', error);
      }
    };

    fetchTXID();
  }, []);


  return (
    <div>
      <h2>Transaction List</h2>
      {TXID.length === 0 ? (
        <p>No UTXO transactions available.</p>
      ) : (
        <ul>
          {TXID.map((transaction) => (
            <li key={transaction.id}>{transaction.description}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;

//useEffect(() => {
  // Fetch transactions from your Node.js backend
//  axios.get('http://localhost:3001/transactions')
//    .then(response => setTransactions(response.data))
//    .catch(error => console.error('Error fetching transactions:', error));
//}, []);