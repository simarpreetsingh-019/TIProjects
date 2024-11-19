const mongoose = require( 'mongoose' );

const connectDB = async () =>
{
  try
  {
    await mongoose.connect( process.env.MONGO_URI );
    console.log( 'MongoDB connected successfully' );
  } catch ( error )
  {
    console.error( 'Error connecting to MongoDB:', error.message );
    process.exit( 1 ); // Stop the application if connection fails
  }
};

module.exports = connectDB;
