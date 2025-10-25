// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

const app = express();

// Middleware to parse incoming JSON
app.use(express.json());

// Connect to MongoDB
connectDb();

// Register Product routes
app.use('/products', productRoutes);

// Central error handling middleware (Optional: Add as needed)
// app.use((err, req, res, next) => {
//   res.status(err.status || 500).json({ error: err.message });
// });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});