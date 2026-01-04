import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import auth from './routes/auth.js';
import exercises from './routes/exercises.js';
import contact from './routes/contact.js';
import paymentRoutes from './routes/paymentRoutes.js';
import webhookRoutes from './routes/webhook.js';
import cors from 'cors';

const app = express();

// Middleware
// ⚠️ Always put CORS BEFORE routes
app.use(cors({
  origin: [
    "http://localhost:5173", // local dev
    "https://gym-application-adj9.vercel.app" // deployed frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// OPTIONS preflight fix
app.options(/.*/, cors());

// Body parser
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Hello from Express API');
});

// Routes
app.use('/api/auth', auth);
app.use('/api/exercises', exercises);
app.use('/api/contact', contact);
app.use('/api/payment', paymentRoutes);
app.use('/api/webhook', webhookRoutes);

// Connect to DB and start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('DB connection failed:', err);
});
