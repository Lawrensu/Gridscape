import React from 'react';
import { Link } from 'react-router-dom';
import '/SuccessPage.css';

const SuccessPage = () => {
    return (
        <div>
            <h1>Registration Successful!</h1>
            <p>Your account has been created successfully. One of us now.</p>
            <Link to="/login" className="success-link">Login</Link>
        </div>
    );
};

export default SuccessPage;