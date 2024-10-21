// src/components/Trade.jsx
import React, { useState, useEffect } from 'react';
import CSVReader from 'react-csv-reader';
import AdminNavigation from '../Layout/AdminNavigation';
import TitleHeader from '../../TitleHeader';

// Helper functions to load and save data from localStorage
const loadFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const Trade = () => {
  const [customers, setCustomers] = useState(loadFromLocalStorage('customers'));
  const [devices, setDevices] = useState(loadFromLocalStorage('devices')); // Load devices
  const [history, setHistory] = useState(loadFromLocalStorage('tradeInHistory'));
  const [manualEntry, setManualEntry] = useState({
    name: '',
    device: '',
    condition: 'Working',
    quantity: 1,
    value: 0,
    status: 'Pending',
  });

  // Save trade history to localStorage when it changes
  useEffect(() => {
    saveToLocalStorage('tradeInHistory', history);
  }, [history]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setManualEntry({ ...manualEntry, [name]: value });

    if (name === 'device') {
      const selectedDevice = devices.find((device) => device.modelName === value);
      if (selectedDevice) {
        setManualEntry({
          ...manualEntry,
          device: value,
          condition: 'Working',
          value: selectedDevice.priceWorking,
        });
      }
    }
  };

  const handleConditionChange = (e) => {
    const condition = e.target.value;
    const selectedDevice = devices.find((device) => device.modelName === manualEntry.device);

    let value = 0;
    if (selectedDevice) {
      if (condition === 'Working') value = selectedDevice.priceWorking;
      else if (condition === 'Non-Working') value = selectedDevice.priceNonWorking;
      else value = selectedDevice.priceRecycle;
    }

    setManualEntry({ ...manualEntry, condition, value });
  };

  const addManualEntry = () => {
    if (manualEntry.name && manualEntry.device && manualEntry.quantity > 0) {
      setHistory((prev) => [...prev, { ...manualEntry, quantity: parseInt(manualEntry.quantity) }]);
      setManualEntry({ name: '', device: '', condition: 'Working', quantity: 1, value: 0, status: 'Pending' });
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('tradeInHistory');
  };

  const totalQuantity = history.reduce((acc, entry) => acc + entry.quantity, 0);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="z-1 sidebar border border-right col-2 col-md-1 p-0 bg-body-tertiary shadow vh-100 position-fixed d-flex align-items-center justify-content-center">
          <div className="bg-body-tertiary h-100" tabIndex="-1" id="sidebarMenu">
            <div className="d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto h-100">
              <AdminNavigation />
            </div>
          </div>
        </div>

        <main className="ms-auto col-10 col-xs-9 col-md-11 px-md-4">
          <TitleHeader heading="Devices" />

          <div className="mt-5">
            <h1 className="mb-4">Trade-In Page</h1>

            <div className="mb-4">
              <h2>Manual Trade-In Entry</h2>

              {/* Customer Name */}
              <div className="row">
                <div className="col-md-12 mb-2">
                  <select
                    className="form-control"
                    name="name"
                    value={manualEntry.name}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Customer</option>
                    {customers.map((customer, index) => (
                      <option key={index} value={customer.name}>
                        {customer.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Device Selection */}
              <div className="row">
                <div className="col-md-6 mb-2">
                  <select
                    className="form-control"
                    name="device"
                    value={manualEntry.device}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Device</option>
                    {devices.map((device, index) => (
                      <option key={index} value={device.modelName}>
                        {device.modelName} ({device.memory})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Condition Selection */}
                <div className="col-md-6 mb-2">
                  <select
                    className="form-control"
                    name="condition"
                    value={manualEntry.condition}
                    onChange={handleConditionChange}
                  >
                    <option value="Working">Working</option>
                    <option value="Non-Working">Non-Working</option>
                    <option value="Recycle">Recycle</option>
                  </select>
                </div>
              </div>

              {/* Quantity and Value */}
              <div className="row">
                <div className="col-md-6 mb-2">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Quantity"
                    name="quantity"
                    value={manualEntry.quantity}
                    min="1"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Trade-In Value"
                    name="value"
                    value={manualEntry.value}
                    readOnly
                  />
                </div>
              </div>

              <button className="btn btn-primary w-100 mt-2" onClick={addManualEntry}>
                Add Entry
              </button>
            </div>

            <div className="mt-4">
              <h2>Trade-In History</h2>
              {/* History Table */}
              {history.length > 0 ? (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Customer Name</th>
                      <th>Device</th>
                      <th>Condition</th>
                      <th>Quantity</th>
                      <th>Value</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((entry, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{entry.name}</td>
                        <td>{entry.device}</td>
                        <td>{entry.condition}</td>
                        <td>{entry.quantity}</td>
                        <td>${entry.value}</td>
                        <td>{entry.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No trade-in history available.</p>
              )}
              <h4>Total Devices: {totalQuantity}</h4>
            </div>

            <button className="btn btn-danger mt-3" onClick={clearHistory}>
              Clear History
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Trade;
