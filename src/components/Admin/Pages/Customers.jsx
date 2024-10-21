import AdminNavigation from '../Layout/AdminNavigation';
import TitleHeader from '../../TitleHeader';
import React, { useState, useEffect } from 'react';
import CSVReader from 'react-csv-reader'; // Import CSV Reader

// Helper functions to manage local storage
const loadFromLocalStorage = () => {
  const data = localStorage.getItem('customers');
  return data ? JSON.parse(data) : [];
};

const saveToLocalStorage = (data) => {
  localStorage.setItem('customers', JSON.stringify(data));
};

// Sample CSV content
const sampleCSVContent = `name,address,email
John Doe,123 Elm Street,johndoe@example.com
Jane Smith,456 Oak Avenue,janesmith@example.com
Alice Johnson,789 Pine Road,alicej@example.com`;

const createSampleCSV = () => {
  const blob = new Blob([sampleCSVContent], { type: 'text/csv' });
  return URL.createObjectURL(blob);
};

const Customers = () => {
  const [customers, setCustomers] = useState(loadFromLocalStorage());
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    address: '',
    email: '',
  });
  const [editIndex, setEditIndex] = useState(null); // Track customer being edited

  useEffect(() => {
    saveToLocalStorage(customers);
  }, [customers]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const addOrUpdateCustomer = () => {
    if (newCustomer.name && newCustomer.address && newCustomer.email) {
      if (editIndex !== null) {
        // Update existing customer
        const updatedCustomers = [...customers];
        updatedCustomers[editIndex] = newCustomer;
        setCustomers(updatedCustomers);
        setEditIndex(null); // Reset edit mode
      } else {
        // Add new customer
        setCustomers((prev) => [...prev, newCustomer]);
      }
      setNewCustomer({ name: '', address: '', email: '' });
    }
  };

  const handleEdit = (index) => {
    setNewCustomer(customers[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedCustomers = customers.filter((_, i) => i !== index);
    setCustomers(updatedCustomers);
  };

  // const clearCustomers = () => {
  //   setCustomers([]);
  //   localStorage.removeItem('customers');
  // };

  const handleCSVUpload = (data) => {
    const uploadedCustomers = data.map((row) => ({
      name: row[0],
      address: row[1],
      email: row[2],
    }));
    setCustomers((prev) => [...prev, ...uploadedCustomers]);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="z-1 sidebar border border-right col-2 col-md-1 p-0 bg-body-tertiary shadow vh-100 position-fixed d-flex align-items-center justify-content-center">
            <div className="bg-body-tertiary h-100" tabIndex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
              <div className="d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto h-100">
                <AdminNavigation />
              </div>
            </div>
          </div>

          <main className="ms-auto col-10 col-xs-9 col-md-11 px-md-4">
            <TitleHeader heading={'Customers'} />
            <div className=" mt-5">
              <h1 className="mb-4">Customer Management</h1>

              {/* Add/Edit Customer Form */}
              <div className="mb-4">
                <h2>{editIndex !== null ? 'Edit Customer' : 'Add New Customer'}</h2>

                <div className="row">
                  <div className="col-md-6 mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Customer Name"
                      name="name"
                      value={newCustomer.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6 mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Address"
                      name="address"
                      value={newCustomer.address}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-2">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      value={newCustomer.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6 d-flex align-items-center">
                    <button className="btn btn-primary w-100" onClick={addOrUpdateCustomer}>
                      {editIndex !== null ? 'Update Customer' : 'Add Customer'}
                    </button>
                  </div>
                </div>
              </div>

              {/* CSV Upload Section */}
              <div className="mb-4">
                <h2>Upload Customers via CSV</h2>
                <CSVReader onFileLoaded={handleCSVUpload} />
                <a
                  href={createSampleCSV()}
                  download="sample-customers.csv"
                  className="btn btn-secondary mt-3"
                >
                  Download Sample CSV
                </a>
              </div>

              {/* Customer List */}
              <div className="mt-4">
                <h2>Customer List</h2>
                {customers.length > 0 ? (
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((customer, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{customer.name}</td>
                          <td>{customer.address}</td>
                          <td>{customer.email}</td>
                          <td>
                            <button
                              className="btn btn-warning btn-sm me-2"
                              onClick={() => handleEdit(index)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(index)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No customers added yet.</p>
                )}
              </div>

              {/* <button className="btn btn-danger mt-3" onClick={clearCustomers}>
                Clear All Customers
              </button> */}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Customers;
