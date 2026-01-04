import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { plan, amount } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `${plan} Gym Membership`,
            },
            unit_amount: amount * 100, // ₹ → paise
          },
          quantity: 1,
        },
      ],
      metadata: {
       plan: plan,
      },
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/payment",
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
