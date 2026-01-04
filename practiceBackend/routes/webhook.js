import express from "express";
import Stripe from "stripe";
import Payment from "../Model/payment.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// ✅ Stripe Secret Key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post(
  "/stripe",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log("Webhook error:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      await Payment.create({
        stripeSessionId: session.id,
        plan: session.metadata.plan,
        amount: session.amount_total / 100,
        currency: session.currency,
        status: session.payment_status,
        customerEmail: session.customer_details.email,
      });
    }

    res.json({ received: true });
  }
);

export default router;
