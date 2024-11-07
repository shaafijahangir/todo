const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Use the MONGO_URI from .env
const db = process.env.MONGO_URI;
console.log(db); 

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');

    // // Optional: Test a simple query to confirm the connection
    // const dbTest = mongoose.connection.db.collection('testCollection');
    // const testDoc = await dbTest.findOne(); // Adjust 'testCollection' to an actual collection name if possible
    // console.log('Connection Test Document:', testDoc);

  } catch (err) {
    console.error('Error connecting to MongoDB:', err); // Log full error details
    process.exit(1);
  }
};

module.exports = connectDB;
