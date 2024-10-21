// src/components/TradeinForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Layout/TradeinForm.css'; // Custom CSS for styling

const TradeinForm = () => {
    const [selectedDevice, setSelectedDevice] = useState('iphone13');
    const [workingPrice, setWorkingPrice] = useState('$250');
    const [notWorkingPrice, setNotWorkingPrice] = useState('$100');
    const [recyclePrice, setRecyclePrice] = useState('No Payout');
    const [submitButtonText, setSubmitButtonText] = useState('Proceed with Selection for iPhone 13');
    const [images, setImages] = useState({
        working: 'https://i.pinimg.com/564x/65/af/f9/65aff991cf8507dbe04bff239d610da7.jpg',
        notWorking: 'https://i.pinimg.com/564x/65/af/f9/65aff991cf8507dbe04bff239d610da7.jpg',
        recycle: 'https://i.pinimg.com/564x/65/af/f9/65aff991cf8507dbe04bff239d610da7.jpg',
    });

    const navigate = useNavigate();

    const updateDeviceDetails = (device) => {
        setSelectedDevice(device);

        const details = {
            iphone13: {
                prices: ['$250', '$100', 'No Payout'],
                text: 'Proceed with Selection for iPhone 13',
                image: 'https://i.pinimg.com/564x/65/af/f9/65aff991cf8507dbe04bff239d610da7.jpg',
            },
            iphone12: {
                prices: ['$150', '$90', 'No Payout'],
                text: 'Proceed with Selection for iPhone 12',
                image: 'https://www.apple.com/v/iphone-12/h/images/meta/iphone-12_specs__ffy8c0h8c2ai_og.png',
            },
            iphone11: {
                prices: ['$120', '$80', 'No Payout'],
                text: 'Proceed with Selection for iPhone 11',
                image: 'https://guide-images.cdn.ifixit.com/igi/DloUgLs2IpDAbDFF.large',
            },
        };

        const { prices, text, image } = details[device];
        setWorkingPrice(prices[0]);
        setNotWorkingPrice(prices[1]);
        setRecyclePrice(prices[2]);
        setSubmitButtonText(text);
        setImages({ working: image, notWorking: image, recycle: image });
    };

    const handleProceed = () => {
        navigate('/customer-info');
    };

    return (
        <div className="container">
            <h2>Select Device and Condition</h2>

            <div className="form-group">
                <label htmlFor="deviceSelect">Select Device:</label>
                <select
                    id="deviceSelect"
                    name="device"
                    onChange={(e) => updateDeviceDetails(e.target.value)}
                    value={selectedDevice}
                >
                    <option value="iphone13">iPhone 13</option>
                    <option value="iphone12">iPhone 12</option>
                    <option value="iphone11">iPhone 11</option>
                </select>
            </div>

            <div className="cards">
                <Card title="Working" image={images.working} price={workingPrice} badgeClass="bg-success" />
                <Card title="Defective" image={images.notWorking} price={notWorkingPrice} badgeClass="bg-danger" />
                <Card title="Recycle" image={images.recycle} price={recyclePrice} badgeClass="bg-warning" />
            </div>

            <div className="form-submit">
                <button type="button" className="btn btn-primary" onClick={handleProceed}>
                    {submitButtonText}
                </button>
            </div>
        </div>
    );
};

const Card = ({ title, image, price, badgeClass }) => (
    <div className="card">
        <h3>{title}</h3>
        <img src={image} className="device-image" alt={title} />
        <br />
        <input type="radio" name="deviceCondition" value={title.toLowerCase()} required />
        <br />
        <span className={`badge ${badgeClass}`}>{price}</span>
    </div>
);

export default TradeinForm;
