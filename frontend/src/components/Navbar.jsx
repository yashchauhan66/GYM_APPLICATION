import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import img from '../../public/gym1.jpg';
// import img from '../assets/himal.jpg';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
  const handleScroll = () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={img} alt="Logo" className='logo' />
        </Link>
        
        <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-button" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/login" className="nav-button" onClick={() => setIsOpen(false)}>Login</Link>
          <Link to="/signup" className="nav-button" onClick={() => setIsOpen(false)}>Sign Up</Link>
          <Link to="/about" className="nav-button" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/contact" className="nav-button" onClick={() => setIsOpen(false)}>Contact</Link>
        </div>
      </div>
    </nav>
  );
} 