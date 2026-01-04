import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Plans.css";

const Plans = () => {
  const navigate = useNavigate();

  const handlePlanSelect = (planName, price) => {
    localStorage.setItem(
      "selectedPlan",
      JSON.stringify({ name: planName, price })
    );
    navigate("/payment");
  };

  const plans = [
    {
      name: "Basic",
      price: 999,
      period: "per month",
      features: [
        "Access to gym floor",
        "Basic equipment usage",
        "Locker room access",
      ],
      recommended: false,
    },
    {
      name: "Premium",
      price: 1999,
      period: "per month",
      features: [
        "All Basic features",
        "Personal trainer",
        "Nutrition consultation",
      ],
      recommended: true,
    },
    {
      name: "Elite",
      price: 2999,
      period: "per month",
      features: [
        "Unlimited training",
        "Massage session",
        "Private locker",
      ],
      recommended: false,
    },
  ];

  return (
    <div className="plans-container">
      <h1>Choose Your Plan</h1>

      <div className="plans-grid">
        {plans.map((plan, index) => (
          <div key={index} className="plan-card">
            {plan.recommended && <span>Most Popular</span>}
            <h2>{plan.name}</h2>
            <h3>₹{plan.price}</h3>
            <p>{plan.period}</p>

            <ul>
              {plan.features.map((f, i) => (
                <li key={i}>✓ {f}</li>
              ))}
            </ul>

            <button
              onClick={() => handlePlanSelect(plan.name, plan.price)}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>

      <p>
        Need help? <Link to="/contact">Contact us</Link>
      </p>
    </div>
  );
};

export default Plans;
