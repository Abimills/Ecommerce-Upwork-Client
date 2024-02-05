import mongoose from "mongoose";

const connectMongoDB = async () => {
  const db: any = process.env.MONGODB;
  try {
    await mongoose.connect(db);
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
