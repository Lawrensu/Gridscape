import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './components/AdminDashboard';
import LandingPage from './pages/LandingPage';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleSetToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  return (
    <Router>
      <Navigation token={token} setToken={handleSetToken} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage token={token} />} />
        <Route path="/login" element={<Login setToken={handleSetToken} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute token={token}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;