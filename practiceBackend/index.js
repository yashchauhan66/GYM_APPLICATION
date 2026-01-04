import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import auth from './routes/auth.js';
import exercises from './routes/exercises.js';
import cors from 'cors';
import contact from './routes/contact.js';
import webhookRoutes from './routes/webhook.js';
import paymentRoutes from './routes/paymentRoutes.js';


const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
}));

app.use('/api/webhook', webhookRoutes);

app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Hello from Express API');
});



// Auth routes
app.use('/api/auth', auth);
app.use('/api/exercises', exercises);
app.use('/api/contact', contact);
app.use('/api/payment', paymentRoutes);




// Start server
app.listen(5000, () => {
  connectDB();
  console.log('App running at http://localhost:5000');
});   



