const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
console.log("JSON parser setup done.");

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log(err));

// Import routes
const indexRoutes = require('./routes/index');
const scoreRoutes = require('./routes/scores'); 

// Use routes
app.use('/', indexRoutes);
app.use('/api/scores', scoreRoutes);  // Use the scores API routes
console.log("Scores route setup done.");

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
