// pages/api/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://root:4QHgSwuuT7kbjMoLiNYU6lmg@alfie.iran.liara.ir:32741/my-app?authSource=admin", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectDB;
