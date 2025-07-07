const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware (must come BEFORE routes)
app.use(cors());
app.use(express.json());

// ✅ Route setup (after middleware)
app.use('/api/auth', require('./routes/auth'));

app.use('/api/journals', require('./routes/journals'));


// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
