import AdminNavigation from '../Layout/AdminNavigation';
import TitleHeader from '../../TitleHeader';
import React, { useState, useEffect } from 'react';

// Helper functions to manage local storage
const loadFromLocalStorage = () => {
  const data = localStorage.getItem('customers');
  return data ? JSON.parse(data) : [];
};

const saveToLocalStorage = (data) => {
  localStorage.setItem('customers', JSON.stringify(data));
};

const Customers = () => {
  const [customers, setCustomers] = useState(loadFromLocalStorage());
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    address: '',
    email: '',
  });

  useEffect(() => {
    saveToLocalStorage(customers);
  }, [customers]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const addCustomer = () => {
    if (newCustomer.name && newCustomer.address && newCustomer.email) {
      setCustomers((prev) => [...prev, newCustomer]);
      setNewCustomer({ name: '', address: '', email: '' });
    }
  };

  const clearCustomers = () => {
    setCustomers([]);
    localStorage.removeItem('customers');
  };


    return (
        <>
        <div>
    <div className='container-fluid'>
      <div className='row'>
        <div className='z-1 sidebar border border-right col-2 col-md-1 p-0 bg-body-tertiary shadow vh-100 position-fixed d-flex align-items-center justify-content-center'>
          <div className='bg-body-tertiary h-100' tabIndex='-1' id='sidebarMenu' aria-labelledby='sidebarMenuLabel'>
            <div className='d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto h-100'>
              <AdminNavigation />
            </div>
          </div>
        </div>

        <main className='ms-auto col-10 col-xs-9 col-md-11 px-md-4'>
          <TitleHeader  heading={'Customers'}  />
          <div className="container mt-5">
      <h1 className="mb-4">Customer Management</h1>

      {/* Add Customer Form */}
      <div className="mb-4">
        <h2>Add New Customer</h2>

        {/* Form Row: Name and Address */}
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

        {/* Form Row: Email and Add Button */}
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
            <button className="btn btn-primary w-100" onClick={addCustomer}>
              Add Customer
            </button>
          </div>
        </div>
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
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{customer.name}</td>
                  <td>{customer.address}</td>
                  <td>{customer.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No customers added yet.</p>
        )}
      </div>

      {/* Clear Customers Button */}
      <button className="btn btn-danger mt-3" onClick={clearCustomers}>
        Clear All Customers
      </button>
    </div>
        
        </main>
      </div>
    </div>
  </div></>
    );
  }
  
  export default Customers;
  