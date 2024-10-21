import React, { useState, useEffect } from 'react';
import CSVReader from 'react-csv-reader';
import AdminNavigation from '../Layout/AdminNavigation';
import TitleHeader from '../../TitleHeader';

// Helper functions to manage local storage
const loadFromLocalStorage = () => {
  const data = localStorage.getItem('devices');
  return data ? JSON.parse(data) : [];
};

const saveToLocalStorage = (data) => {
  localStorage.setItem('devices', JSON.stringify(data));
};

const Devices = () => {
  const [devices, setDevices] = useState(loadFromLocalStorage());
  const [newDevice, setNewDevice] = useState({
    modelName: '',
    memory: '',
    priceWorking: 0,
    priceNonWorking: 0,
    priceRecycle: 0,
    image: '',
  });
  const [editingIndex, setEditingIndex] = useState(null); // Track the editing state

  useEffect(() => {
    saveToLocalStorage(devices);
  }, [devices]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDevice({ ...newDevice, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewDevice({ ...newDevice, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const addOrUpdateDevice = () => {
    if (newDevice.modelName && newDevice.memory) {
      if (editingIndex !== null) {
        const updatedDevices = [...devices];
        updatedDevices[editingIndex] = newDevice;
        setDevices(updatedDevices);
        setEditingIndex(null); // Reset editing state
      } else {
        setDevices((prev) => [...prev, newDevice]);
      }

      setNewDevice({
        modelName: '',
        memory: '',
        priceWorking: 0,
        priceNonWorking: 0,
        priceRecycle: 0,
        image: '',
      });
    }
  };

  const handleEdit = (index) => {
    setNewDevice(devices[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedDevices = devices.filter((_, i) => i !== index);
    setDevices(updatedDevices);
  };

  const handleCSVUpload = (data) => {
    const parsedDevices = data.slice(1).map((row) => ({
      modelName: row[0],
      memory: row[1],
      priceWorking: parseFloat(row[2]),
      priceNonWorking: parseFloat(row[3]),
      priceRecycle: 0,
      image: '',
    }));
    setDevices((prev) => [...prev, ...parsedDevices]);
  };

  const clearDevices = () => {
    setDevices([]);
    localStorage.removeItem('devices');
  };

  const downloadCSVTemplate = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Model Name,Memory,Price (Working),Price (Defective)']
        .concat(['iPhone 13,128GB,130,80', 'iPhone 14,256GB,150,100'])
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'device_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
          <TitleHeader heading={'Devices'} />

          <div className="container mt-5">
            <h1 className="mb-4">Device Management</h1>

            <div className="mb-4">
              <h2>{editingIndex !== null ? 'Edit Device' : 'Add New Device'}</h2>

              <div className="row">
                <div className="col-md-6 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Model Name"
                    name="modelName"
                    value={newDevice.modelName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Memory (e.g., 64GB, 128GB)"
                    name="memory"
                    value={newDevice.memory}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mb-2">
                  <label>Price (Working)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="priceWorking"
                    value={newDevice.priceWorking}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-4 mb-2">
                  <label>Price (Defective)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="priceNonWorking"
                    value={newDevice.priceNonWorking}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-4 mb-2">
                  <label>Price (Recycle)</label>
                  <input type="number" className="form-control" value={0} readOnly />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-2">
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
                <div className="col-md-6 d-flex align-items-center">
                  <button className="btn btn-primary w-100" onClick={addOrUpdateDevice}>
                    {editingIndex !== null ? 'Update Device' : 'Add Device'}
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h2>Upload Devices via CSV</h2>
              <CSVReader
                onFileLoaded={handleCSVUpload}
                inputStyle={{ color: 'black', marginBottom: '10px' }}
              />
              <button className="btn btn-secondary mt-2" onClick={downloadCSVTemplate}>
                Download CSV Template
              </button>
            </div>

            <div className="mt-4">
              <h2>Device List</h2>
              {devices.length > 0 ? (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Model Name</th>
                      <th>Memory</th>
                      <th>Price (Working)</th>
                      <th>Price (Defective)</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {devices.map((device, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{device.modelName}</td>
                        <td>{device.memory}</td>
                        <td>${device.priceWorking}</td>
                        <td>${device.priceNonWorking}</td>
                        <td>
                          <button className="btn btn-warning me-2" onClick={() => handleEdit(index)}>
                            Edit
                          </button>
                          <button className="btn btn-danger" onClick={() => handleDelete(index)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No devices added yet.</p>
              )}
            </div>

            <button className="btn btn-danger mt-3" onClick={clearDevices}>
              Clear All Devices
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Devices;
