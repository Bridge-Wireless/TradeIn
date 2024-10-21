// src/components/TradeinForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Layout/TradeinForm.css'; // Custom CSS for styling

const TradeinForm = () => {
    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState('');
    const [workingPrice, setWorkingPrice] = useState('');
    const [notWorkingPrice, setNotWorkingPrice] = useState('');
    const [recyclePrice, setRecyclePrice] = useState('');
    const [submitButtonText, setSubmitButtonText] = useState('Please select a device');
    const [ setImages] = useState({});
    const [isDeviceSelected, setIsDeviceSelected] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [condition, setCondition] = useState(''); // Initialize condition state
    const navigate = useNavigate();

    useEffect(() => {
        const storedDevices = JSON.parse(localStorage.getItem('devices')) || [];
        setDevices(storedDevices);
    }, []);

    const updateDeviceDetails = (device) => {
        setSelectedDevice(device.modelName);
        setWorkingPrice(`$${device.priceWorking}`);
        setNotWorkingPrice(`$${device.priceNonWorking}`);
        setRecyclePrice(`$${device.priceRecycle}`);
        setSubmitButtonText(`Proceed with Selection for ${device.modelName}`);
        setImages({
            working: device.image || '',
            notWorking: device.image || '',
        });
        setIsDeviceSelected(true);
    };

    const handleProceed = () => {
        if (isDeviceSelected && quantity > 0) {
            const tradeData = {
                device: selectedDevice,
                condition,
                quantity,
            };
            navigate('/customer-info', { state: tradeData }); // Pass data via React Router
        } else {
            alert('Please select a device and enter a valid quantity.');
        }
    };

    return (
        <div className="container">
            <h2>Select Device and Condition</h2>

            <div className="form-group text-center">
                <label htmlFor="deviceSelect">Select Device:</label>
                <select
                    id="deviceSelect"
                    name="device"
                    onChange={(e) => {
                        const device = devices.find(d => d.modelName === e.target.value);
                        if (device) updateDeviceDetails(device);
                    }}
                    value={selectedDevice}
                >
                    <option value="" disabled>
                        -- Select a device --
                    </option>
                    {devices.map((device, index) => (
                        <option key={index} value={device.modelName}>
                            {device.modelName} ({device.memory})
                        </option>
                    ))}
                </select>
            </div>

            {isDeviceSelected && (
                <>
                    <div className="form-group mt-3">
                        <label htmlFor="quantity">Quantity:</label>
                        <input
                            type="number"
                            id="quantity"
                            className="form-control"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                        />
                    </div>

                    <div className="cards mt-3">
                        <Card
                            title="Working"
                            price={workingPrice}
                            badgeClass="bg-success btn"
                            setCondition={setCondition}
                        />
                        <Card
                            title="Defective"
                            price={notWorkingPrice}
                            badgeClass="bg-danger btn"
                            setCondition={setCondition}
                        />
                        <Card
                            title="Recycle"
                            price={recyclePrice}
                            badgeClass="bg-warning btn"
                            setCondition={setCondition}
                        />
                    </div>
                </>
            )}

            <div className="form-submit mt-3">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleProceed}
                    disabled={!isDeviceSelected || quantity <= 0}
                >
                    {submitButtonText}
                </button>
            </div>
        </div>
    );
};

const Card = ({ title, price, badgeClass, setCondition }) => (
    <div className="card">
        <h3>{title}</h3>
        <br />
        <input
            type="radio"
            name="deviceCondition"
            value={title}
            onChange={(e) => setCondition(e.target.value)}
            required
        />
        <br />
        <span className={`badge ${badgeClass}`}>{price}</span>
    </div>
);

export default TradeinForm;
