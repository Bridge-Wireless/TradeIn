// src/components/Incentive.jsx
import React, { useState, useEffect } from 'react';
import AdminNavigation from '../Layout/AdminNavigation';
import TitleHeader from '../../TitleHeader';

// Helper function to load data from localStorage
const loadFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const Incentive = () => {
  const [tradeInHistory] = useState(loadFromLocalStorage('tradeInHistory'));
  const [totalIncentive, setTotalIncentive] = useState(0);

  // Calculate total incentive on component mount or when history changes
  useEffect(() => {
    const incentive = tradeInHistory.reduce((acc, entry) => acc + entry.quantity * 100, 0);
    setTotalIncentive(incentive);
  }, [tradeInHistory]);

  // const clearIncentives = () => {
  //   setTradeInHistory([]);
  //   localStorage.removeItem('tradeInHistory');
  //   setTotalIncentive(0);
  // };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='z-1 sidebar border border-right col-2 col-md-1 p-0 bg-body-tertiary shadow vh-100 position-fixed d-flex align-items-center justify-content-center'>
          <div className='bg-body-tertiary h-100' tabIndex='-1' id='sidebarMenu'>
            <div className='d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto h-100'>
              <AdminNavigation />
            </div>
          </div>
        </div>

        <main className='ms-auto col-10 col-xs-9 col-md-11 px-md-4'>
          <TitleHeader heading="Sales Rep Incentives" />

          <div className="container mt-5">
            <h1 className="mb-4">Incentive Dashboard</h1>

            <div className="mb-4">
              <h2>Total Incentive Earned</h2>
              <h3>${totalIncentive}</h3>
            </div>

            <div className="mt-4">
              <h2>Trade-In History</h2>
              {tradeInHistory.length > 0 ? (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Customer Name</th>
                      <th>Device</th>
                      <th>Condition</th>
                      <th>Quantity</th>
                      <th>Incentive Earned</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tradeInHistory.map((entry, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{entry.name}</td>
                        <td>{entry.device}</td>
                        <td>{entry.condition}</td>
                        <td>{entry.quantity}</td>
                        <td>${entry.quantity * 100}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No trade-in history available.</p>
              )}
            </div>

            {/* <button className="btn btn-danger mt-3" onClick={clearIncentives}>
              Clear Incentives
            </button> */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Incentive;
