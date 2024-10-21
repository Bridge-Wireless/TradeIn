import React, { useState, useEffect } from 'react';
import CSVReader from 'react-csv-reader';

// Helper functions to interact with local storage
const loadFromLocalStorage = () => {
  const data = localStorage.getItem('tradeInHistory');
  return data ? JSON.parse(data) : [];
};

const saveToLocalStorage = (data) => {
  localStorage.setItem('tradeInHistory', JSON.stringify(data));
};

const sampleCSVData = [
  ['Customer Name', 'Device', 'Condition', 'Quantity', 'Value', 'Status'],
  ['John Doe', 'iPhone 13', 'Working', '2', '130', 'Pending'],
  ['Jane Smith', 'iPhone 14', 'Non-Working', '1', '80', 'Pending'],
];

const Trade = () => {
  const [history, setHistory] = useState(loadFromLocalStorage());
  const [manualEntry, setManualEntry] = useState({
    name: '',
    device: 'iPhone 13',
    condition: 'Working',
    quantity: 1,
    value: 130,
    status: 'Pending', // Default status
  });

  useEffect(() => {
    saveToLocalStorage(history);
  }, [history]);

  const handleCSVUpload = (data) => {
    const parsedData = data.map((row) => ({
      name: row[0],
      device: row[1],
      condition: row[2],
      quantity: parseInt(row[3]),
      value: parseInt(row[4]),
      status: row[5] || 'Pending', // Default status if not provided
    }));
    setHistory((prev) => [...prev, ...parsedData]);
  };

  const handleConditionChange = (e) => {
    const condition = e.target.value;
    let value = condition === 'Working' ? 130 : condition === 'Non-Working' ? 80 : 0;
    setManualEntry({ ...manualEntry, condition, value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setManualEntry({ ...manualEntry, [name]: value });
  };

  const addManualEntry = () => {
    if (manualEntry.name && manualEntry.device && manualEntry.quantity > 0) {
      setHistory((prev) => [...prev, { ...manualEntry, quantity: parseInt(manualEntry.quantity) }]);
      setManualEntry({ name: '', device: 'iPhone 13', condition: 'Working', quantity: 1, value: 130, status: 'Pending' });
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('tradeInHistory');
  };

  const updateStatus = (index, newStatus) => {
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
    <div className="container mt-5">
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
        {/* Form fields */}
        <div className="form-group mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Customer Name"
            name="name"
            value={manualEntry.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mb-2">
          <select className="form-control" name="device" value={manualEntry.device} onChange={handleInputChange}>
            <option value="iPhone 13">iPhone 13</option>
            <option value="iPhone 14">iPhone 14</option>
            <option value="iPhone 11">iPhone 11</option>
          </select>
        </div>
        <div className="form-group mb-2">
          <select className="form-control" name="condition" value={manualEntry.condition} onChange={handleConditionChange}>
            <option value="Working">Working</option>
            <option value="Non-Working">Non-Working</option>
            <option value="Recycle">Recycle</option>
          </select>
        </div>
        <div className="form-group mb-2">
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
        <div className="form-group mb-2">
          <input type="number" className="form-control" placeholder="Value" name="value" value={manualEntry.value} readOnly />
        </div>
        <button className="btn btn-primary" onClick={addManualEntry}>
          Add Entry
        </button>
      </div>

      <div className="mt-4">
        <h2>Trade-In History</h2>
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
                <th>Actions</th>
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
                  <td>
                    <button className="btn btn-success btn-sm" onClick={() => updateStatus(index, 'Approved')}>
                      Approve
                    </button>
                    <button className="btn btn-danger btn-sm ms-2" onClick={() => updateStatus(index, 'Rejected')}>
                      Reject
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
  );
};

export default Trade;
