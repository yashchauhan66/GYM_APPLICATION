import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle login logic here
    console.log(formData);
    await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email: formData.email, password: formData.password}),
  });
  // const data =  response.json();
  // console.log(data);
};

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Please enter your credentials to login</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>

          <button type="submit" className="login-button" onClick={() => navigate('/')}>
            Login
          </button>
        </form>

        <div className="signup-link">
          Don't have an account? <button onClick={() => navigate('/signup')}>Signup</button>
        </div>
      </div>
    </div>
  );
}