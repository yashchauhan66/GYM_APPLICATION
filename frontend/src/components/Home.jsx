import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleReviewClick = () => {
    navigate('/reviews');
  };
  const handleServiceClick = () => {
    navigate('/services');
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Transform Your Body</h1>
            <p>
              <h1>Join the best gym community and reach your fitness goals with expert trainers and modern equipment.</h1>
            </p>
            <div className="hero-buttons">
              <Link to="/signup" className="primary-button">Join Now</Link>
              <Link to="/login" className="secondary-button">Member Login</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose Us</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Expert Trainers</h3>
            <p>Our certified trainers help you every step of the way.</p>
          </div>
          <div className="feature-card">
            <h3>Modern Equipment</h3>
            <p>Top-quality machines to power your workouts.</p>
          </div>
          <div className="feature-card" onClick={handleReviewClick} style={{ cursor: 'pointer' }}>
            <h3>Reviews</h3>
            <p>Top-quality machines to power your workouts.</p>
          </div>
          <div className="feature-card" onClick={handleServiceClick} style={{ cursor: 'pointer' }}>
            <h3>Services</h3>
            <p>Open 24/7 to fit your lifestyle and routine.</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Start Your Transformation Today</h2>
        <p>Join now and get your first month free!</p>
        <Link to="/signup" className="cta-button">Get Started</Link>
      </section>
    </div>
  );
};

export default Home;
