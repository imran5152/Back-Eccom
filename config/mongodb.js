import mongoose from 'mongoose';

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected to Ecom');
  } catch (err) {
    console.error('Connection error:', err.message);
    process.exit(1);
  }
};

export default connectdb;
