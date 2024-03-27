import mongoose, { Schema, Document } from "mongoose";
import { ObjectId } from "mongodb";

interface IUser extends Document {
  username: string;
  password: string;
  habits: Array<ObjectId>;
}

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "username is required"],
    index: true,
  },
  password: { type: String, required: [true, "password is required"] },
  habits: {
    type: [Schema.Types.ObjectId],
    default: [],
    ref: "Habit",
  },
});

export default mongoose.model<IUser>("User", UserSchema);
