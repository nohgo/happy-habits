import mongoose, { Schema, Document } from "mongoose";
import { ObjectId } from "mongodb";
mongoose.connect(process.env.DB_CONN_STRING);

interface User extends Document {
  username: string;
  password: string;
  habits: Array<ObjectId>;
}

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  habits: { type: Array<ObjectId>, required: true },
});

export default mongoose.model<User>("User", UserSchema);
