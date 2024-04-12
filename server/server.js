const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();  // To use environment variables from .env file

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.use('/', require('./routes/index'));

// MongoDB URI
const dbURI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
