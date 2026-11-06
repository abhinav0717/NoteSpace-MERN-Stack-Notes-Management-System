
import mongoose from 'mongoose';

export default async function connectDB() {
  try {
    const mongoURI = process.env.MONGO_URI;

    // Check MongoDB URI
    if (!mongoURI) {
      throw new Error('MONGO_URI is missing in the .env file');
    }

    // Connect to MongoDB
    await mongoose.connect(mongoURI);

    console.log('MongoDB connected successfully');

    console.log(
      `Database Name: ${mongoose.connection.name}`
    );

  } catch (error) {
    console.error('MongoDB connection failed:', error.message);

    process.exit(1);
  }
}
