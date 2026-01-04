import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

const Success = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Get order data from localStorage
      const storedOrder = localStorage.getItem('orderConfirmation');
      console.log('Stored order data:', storedOrder); // Debug log

      if (storedOrder) {
        const parsedData = JSON.parse(storedOrder);
        console.log('Parsed order data:', parsedData); // Debug log
        setOrderData(parsedData);
      } else {
        console.log('No order data found in localStorage'); // Debug log
        setError('No order data found');
        // If no order data, redirect to home after a short delay
        setTimeout(() => navigate('/'), 2000);
      }
    } catch (err) {
      console.error('Error in Success component:', err);
      setError('Error loading order data');
      setTimeout(() => navigate('/'), 2000);
    }
  }, [navigate]);

  if (error) {
    return (
      <div className="success-container">
        <div className="success-card">
          <div className="error-message">{error}</div>
          <button 
            className="back-button"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="success-container">
        <div className="success-card">
          <div className="loading">Loading order details...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-header">
          <div className="success-icon">✓</div>
          <h1>Payment Successful!</h1>
          <p>Thank you for your purchase</p>
        </div>

        <div className="order-details">
          <h2>Order Confirmation</h2>
          <div className="order-info">
            <div className="info-row">
              <span>Order ID:</span>
              <span>{orderData.orderId}</span>
            </div>
            <div className="info-row">
              <span>Plan:</span>
              <span>{orderData.plan}</span>
            </div>
            <div className="info-row">
              <span>Amount:</span>
              <span>₹{orderData.amount}</span>
            </div>
            <div className="info-row">
              <span>Date:</span>
              <span>{orderData.date}</span>
            </div>
            <div className="info-row">
              <span>Status:</span>
              <span className="status-success">{orderData.status}</span>
            </div>
          </div>
        </div>

        <div className="success-footer">
          <p>A confirmation email has been sent to your registered email address.</p>
          <button 
            className="back-button"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success; 