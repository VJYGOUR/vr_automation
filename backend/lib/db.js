// db.js
import mongoose from "mongoose";
import { configDotenv } from "dotenv";

const connectDB = async () => {
  configDotenv();
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};

export default connectDB;
