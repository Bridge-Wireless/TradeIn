// src/components/CustomerInfoForm.js
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';


import { useLocation, useNavigate } from 'react-router-dom';
// Helper functions to manage local storage
const loadFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
};
const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

const CustomerInfoForm = () => {
    const [serialNumbers, setSerialNumbers] = useState([]);
    const [fileName, setFileName] = useState('');
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        customerAddress: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onload = (event) => {
                const text = event.target.result;
                const parsedSerialNumbers = text
                    .split('\n')
                    .map((line) => line.trim())
                    .filter((line) => line);
                setSerialNumbers(parsedSerialNumbers);
            };
            reader.readAsText(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const customers = loadFromLocalStorage('customers');

        // Check if the customer already exists by name and email
        const existingCustomer = customers.find(
            (customer) =>
                customer.name === formData.customerName &&
                customer.email === formData.customerEmail
        );

        if (!existingCustomer) {
            // Add new customer to localStorage
            const newCustomer = {
                name: formData.customerName,
                email: formData.customerEmail,
                address: formData.customerAddress,
                phone: formData.customerPhone,
            };
            const updatedCustomers = [...customers, newCustomer];
            saveToLocalStorage('customers', updatedCustomers);
            alert('New customer added successfully!');
        } else {
            alert('Customer already exists.');
        }

        // Handle email sending (optional)
        const emailParams = {
            customer_name: formData.customerName,
            customer_phone: formData.customerPhone,
            customer_email: formData.customerEmail,
            customer_address: formData.customerAddress,
            serial_numbers: serialNumbers.join(', '),
        };

        emailjs
            .send(
                'service_dpek8vp', // Replace with your EmailJS Service ID
                'template_72ki3ks', // Replace with your EmailJS Template ID
                emailParams,
                'rXqF8dWptwdk30yuD' // Replace with your EmailJS public key
            )
            .then(
                (response) => {
                    alert('Email sent successfully!');
                    console.log('SUCCESS!', response.status, response.text);
                    navigate('/tradein');
                },
                (error) => {
                    alert('Failed to send email. Please try again.');
                    console.error('FAILED...', error);
                }
            );
    };
    
    const { state: tradeData } = useLocation(); // Get trade-in data from TradeinForm


    return (
        <div className="container mt-5">
            <h2 className="text-center">Customer Information and Trade-In Summary</h2>

<table className="table table-bordered mt-4">
    <thead>
        <tr>
            <th>Device</th>
            <th>Condition</th>
            <th>Quantity</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>{tradeData.device}</td>
            <td>{tradeData.condition}</td>
            <td>{tradeData.quantity}</td>
        </tr>
    </tbody>
</table>

            <h2 className="text-center">Enter Customer Information for Trade-In</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="customerName" className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="customerName"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="customerPhone" className="form-label">Phone Number</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="customerPhone"
                            name="customerPhone"
                            value={formData.customerPhone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="customerEmail" className="form-label">Email Address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="customerEmail"
                            name="customerEmail"
                            value={formData.customerEmail}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="customerAddress" className="form-label">Street Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="customerAddress"
                            name="customerAddress"
                            value={formData.customerAddress}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-12">
                        <label htmlFor="serialUpload" className="form-label">Upload Serial Numbers (CSV)</label>
                        <input
                            type="file"
                            className="form-control"
                            id="serialUpload"
                            accept=".csv"
                            onChange={handleFileUpload}
                       
                        />
                        {fileName && <p className="mt-2">Uploaded: {fileName}</p>}
                    </div>
                </div>

                {serialNumbers.length > 0 && (
                    <div className="mt-4">
                        <h5>Uploaded Serial Numbers:</h5>
                        <ul className="list-group">
                            {serialNumbers.map((serial, index) => (
                                <li key={index} className="list-group-item">
                                    {serial}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="text-center mt-4">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default CustomerInfoForm;
