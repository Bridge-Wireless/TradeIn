// src/components/LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // const handleLogin = (e) => {
    //     e.preventDefault();
    //     const user = JSON.parse(localStorage.getItem('user'));

    //     if (user && user.email === email && user.password === password) {
    //         alert('Login successful!');
    //         navigate('/'); // Redirect to dashboard or another page
    //     } else {
    //         setError('Invalid email or password');
    //     }
    // };
    const handleLogin = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || []; // Retrieve all users
    
        const validUser = users.find(
            (user) => user.email === email && user.password === password
        );
    
        if (validUser) {
            alert('Login successful!');
            navigate('/'); // Redirect to the dashboard
        } else {
            setError('Invalid email or password');
        }
    };
    

    return (
        <div className="container mt-5">
            <h2 className="text-center">Login</h2>
            <form onSubmit={handleLogin} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className={`form-control ${error ? 'is-invalid' : ''}`}
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className={`form-control ${error ? 'is-invalid' : ''}`}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="text-danger mb-3">{error}</div>}
                <div className="text-center mt-4">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
