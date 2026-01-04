import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import "./Payment.css";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    const selectedPlan = JSON.parse(localStorage.getItem("selectedPlan"));
    setPlan(selectedPlan);
  }, []);

  const handlePayment = async () => {
    console.log("PAY BUTTON CLICKED");

    if (!plan) {
      alert("No plan selected");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:5000/api/payment/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            plan: plan.name,
            amount: plan.price,
          }),
        }
      );

      const data = await res.json();
      console.log("STRIPE RESPONSE:", data);

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Stripe URL missing");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert("Payment failed");
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h1>Complete Your Payment</h1>
        
        {plan && (
          <div className="plan-details">
            <div className="plan-name">{plan.name}</div>
            <div className="plan-price">
              ${plan.price}
              <span>/month</span>
            </div>
          </div>
        )}

        <button 
          onClick={handlePayment} 
          disabled={loading}
          className={loading ? "loading" : ""}
        >
          {loading ? "Processing..." : "Pay Securely"}
        </button>

        <div className="security-badges">
          <div className="security-badge">256-bit SSL</div>
          <div className="security-badge">PCI Compliant</div>
          <div className="security-badge">Secure Payment</div>
        </div>
      </div>
    </div>
  );
};

export default Payment;