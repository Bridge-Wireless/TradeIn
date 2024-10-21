
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import '../Layout/ContactForm.css'; // Optional for styling

const Contact = () => {
    const form = useRef();
    const [status, setStatus] = useState('');

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            'service_dpek8vp', // Replace with your EmailJS Service ID
            'template_72ki3ks', // Replace with your EmailJS Template ID
            form.current,
            'rXqF8dWptwdk30yuD' // Replace with your EmailJS Public Key
        )
        .then((result) => {
            console.log(result.text);
            setStatus('Message sent successfully!');
            e.target.reset(); // Clear the form after submission
        })
        .catch((error) => {
            console.log(error.text);
            setStatus('Failed to send the message. Please try again later.');
        });
    };

    return (
        <div className="contact-form-container">
            <h2>Contact Us</h2>
            <form ref={form} onSubmit={sendEmail}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="user_name" required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="user_email" required />
                </div>
                <div className="form-group">
                    <label>Message</label>
                    <textarea name="message" rows="5" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                    Send
                </button>
            </form>
            {status && <p className="status-message">{status}</p>}
        </div>
    );
};

export default Contact;
