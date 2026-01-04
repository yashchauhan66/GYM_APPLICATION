import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./contact.css";

const Contact = () => {
  const navigate = useNavigate();

  // State to store form input
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const infoCards = [
    { icon: "📍", title: "Visit Us", lines: ["Nurpur Road Jaitra, Dhampur", "Near City Center, Easy Parking"] },
    { icon: "📞", title: "Call Us", lines: ["Membership: +91 9389507913", "Training: +91 9186507811"] },
    { icon: "📧", title: "Email Us", lines: ["Membership: chauhangym5979@gmail.com", "Training: chauhangym3887@gmail.com"] },
    { icon: "⏰", title: "Gym Hours", lines: ["Mon-Fri: 6 AM - 10 PM", "Sat-Sun: 8 AM - 8 PM", "Holidays: 8 AM - 6 PM"] },
  ];

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://gym-application-zfff.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        alert("Contact saved successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" }); // Reset form
        navigate("/plans"); // Optional navigation
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <section className="contact-page">
      {/* HERO */}
      <div className="contact-hero">
        <img
          src="https://images.unsplash.com/photo-1554284126-74b67e11e0f7?auto=format&fit=crop&w=2027&q=80"
          alt="Gym Hero"
          className="hero-img"
        />
        <div className="hero-overlay">
          <h1>Contact Us</h1>
          <p>Ready to start your fitness journey? Reach out for memberships, personal training, or facility info.</p>
        </div>
      </div>

      {/* INFO & FORM */}
      <div className="contact-wrapper">
        <div className="contact-cards">
          {infoCards.map((card, index) => (
            <div className="info-card" key={index}>
              <div className="icon">{card.icon}</div>
              <h3>{card.title}</h3>
              {card.lines.map((line, idx) => <p key={idx}>{line}</p>)}
            </div>
          ))}
        </div>

        <div className="contact-form">
          <h2>Join Our Fitness Community</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your fitness goals"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit">Start Your Fitness Journey</button>
          </form>
        </div>
      </div>

      {/* MAP */}
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.8762343765677!2d78.5107!3d29.3083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDE4JzI5LjkiTiA3OMKwMzAnMzguNSJF!5e0!3m2!1sen!2sin!4v1635000000000!5m2!1sen!2sin"
          title="Gym Location"
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
};

export default Contact;
