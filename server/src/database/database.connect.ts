import mongoose from "mongoose";

export async function connectDB() {
  try {
    const dbUri = process.env.DB_CONN_STRING;
    await mongoose.connect(dbUri, {
      autoCreate: true,
    });
  } catch (error) {
    console.log("DB connect error");
  }
}

export async function disconnectDB() {
  try {
    await mongoose.connection.close();
  } catch (error) {
    console.log("DB disconnect error");
  }
}
