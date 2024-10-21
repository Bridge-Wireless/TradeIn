import React, { useState, useEffect } from 'react';
import CSVReader from 'react-csv-reader';
import AdminNavigation from '../Layout/AdminNavigation';
import TitleHeader from '../../TitleHeader';

// Helper functions to interact with local storage
const loadFromLocalStorage = () => {
  const data = localStorage.getItem('tradeInHistory');
  return data ? JSON.parse(data) : [];
};

const saveToLocalStorage = (data) => {
  localStorage.setItem('tradeInHistory', JSON.stringify(data));
};

const sampleCSVData = [
  ['Customer Name', 'Address', 'Device', 'Condition', 'Quantity', 'Value', 'Status'],
  ['John Doe', '123 Main St', 'iPhone 13', 'Working', '2', '130', 'Pending'],
  ['Jane Smith', '456 Elm St', 'iPhone 14', 'Non-Working', '1', '80', 'Pending'],
];

const Trade = () => {
  const [history, setHistory] = useState(loadFromLocalStorage());
  const [manualEntry, setManualEntry] = useState({
    name: '',
    address: '',
    device: 'iPhone 13',
    condition: 'Working',
    quantity: 1,
    value: 130,
    status: 'Pending',
  });

  useEffect(() => {
    saveToLocalStorage(history);
  }, [history]);

  const handleCSVUpload = (data) => {
    const parsedData = data.map((row) => ({
      name: row[0],
      address: row[1],
      device: row[2],
      condition: row[3],
      quantity: parseInt(row[4]),
      value: parseInt(row[5]),
      status: row[6] || 'Pending',
    }));
    setHistory((prev) => [...prev, ...parsedData]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setManualEntry({ ...manualEntry, [name]: value });
  };

  const handleConditionChange = (e) => {
    const condition = e.target.value;
    const value = condition === 'Working' ? 130 : condition === 'Non-Working' ? 80 : 0;
    setManualEntry({ ...manualEntry, condition, value });
  };

  const addManualEntry = () => {
    if (manualEntry.name && manualEntry.address && manualEntry.quantity > 0) {
      setHistory((prev) => [...prev, { ...manualEntry, quantity: parseInt(manualEntry.quantity) }]);
      setManualEntry({ name: '', address: '', device: 'iPhone 13', condition: 'Working', quantity: 1, value: 130, status: 'Pending' });
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('tradeInHistory');
  };

  const handleStatusChange = (index, newStatus) => {
    const updatedHistory = history.map((entry, i) =>
      i === index ? { ...entry, status: newStatus } : entry
    );
    setHistory(updatedHistory);
  };

  const downloadCSVTemplate = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      sampleCSVData.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'trade_in_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
              <h2>Upload CSV</h2>
              <CSVReader onFileLoaded={handleCSVUpload} inputStyle={{ color: 'black' }} />
              <button className="btn btn-secondary mt-2" onClick={downloadCSVTemplate}>
                Download Sample CSV Template
              </button>
            </div>

            <div className="mb-4">
              <h2>Manual Trade-In Entry</h2>

              {/* Row 1: Customer Name and Address */}
              <div className="row">
                <div className="col-md-6 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Customer Name"
                    name="name"
                    value={manualEntry.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    name="address"
                    value={manualEntry.address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Row 2: Device and Condition */}
              <div className="row">
                <div className="col-md-6 mb-2">
                  <select
                    className="form-control"
                    name="device"
                    value={manualEntry.device}
                    onChange={handleInputChange}
                  >
                    <option value="iPhone 13">iPhone 13</option>
                    <option value="iPhone 14">iPhone 14</option>
                    <option value="iPhone 11">iPhone 11</option>
                  </select>
                </div>
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

              {/* Row 3: Quantity and Value */}
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

              {/* Add Entry Button */}
              <div className="row">
                <div className="col-md-12">
                  <button className="btn btn-primary w-100" onClick={addManualEntry}>
                    Add Entry
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h2>Trade-In History</h2>
              {history.length > 0 ? (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Customer Name</th>
                      <th>Address</th>
                      <th>Device</th>
                      <th>Condition</th>
                      <th>Quantity</th>
                      <th>Value</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((entry, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{entry.name}</td>
                        <td>{entry.address}</td>
                        <td>{entry.device}</td>
                        <td>{entry.condition}</td>
                        <td>{entry.quantity}</td>
                        <td>${entry.value}</td>
                        <td>
                          <select
                            className="form-control"
                            value={entry.status}
                            onChange={(e) => handleStatusChange(index, e.target.value)}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </td>
                        <td>
                          <button
                            className="btn btn-primary"
                            disabled={entry.status !== 'Approved'}
                          >
                            Print Label
                          </button>
                        </td>
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
