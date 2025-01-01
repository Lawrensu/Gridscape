import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ConfirmationPage.css';

const ConfirmationPage = () => {
  const { token } = useParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const confirmEmail = async () => {
      const response = await fetch(`http://localhost:3001/api/users/confirm/${token}`);
      const data = await response.text();
      setMessage(data);
    };

    confirmEmail();
  }, [token]);

  return (
    <div className="confirmation-page">
      <h1>{message}</h1>
    </div>
  );
};

export default ConfirmationPage;