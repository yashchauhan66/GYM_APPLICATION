import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  stripeSessionId: String,
  plan: String,
  amount: Number,
  currency: String,
  status: String,
  customerEmail: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Payment", paymentSchema);
