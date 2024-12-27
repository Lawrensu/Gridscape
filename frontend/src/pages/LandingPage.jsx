import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    document.querySelector('.landing-page').classList.add('fade-out');
    setTimeout(() => navigate('/home'), 500); // Delay to ensure smooth transition
  };

  return (
    <div className="landing-page">
      <h1>Welcome to Gridscape</h1>
      <p>This is where you can witness me and my friends' moments.</p>
      <button onClick={handleStart}>View</button>
    </div>
  );
};

export default LandingPage;