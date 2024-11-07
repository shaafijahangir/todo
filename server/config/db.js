const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from the .env file
dotenv.config();

// Use the MONGO_URI from .env
const db = process.env.MONGO_URI;

// Log the MONGO_URI to confirm it's loaded (for debugging purposes)
if (!db) {
  console.warn('Warning: MONGO_URI is not defined in .env file.');
} else {
  console.log(`Connecting to MongoDB`);
}

const connectDB = async () => {
  try {
    await mongoose.connect(db); // No options needed
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err); // Log full error details
    process.exit(1);
  }
};

module.exports = connectDB;
