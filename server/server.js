const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
