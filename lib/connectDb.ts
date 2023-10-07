import mongoose from "mongoose";

const DB_URL = process.env.MONGO_URI as string
let connection: typeof mongoose

const connectDB = async () => {
  try {
    if (!connection) {
      connection = await mongoose.connect(DB_URL);
      console.log("Database connected!");

      return connection
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;