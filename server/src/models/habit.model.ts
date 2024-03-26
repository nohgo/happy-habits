import { ObjectId } from "mongodb";

import mongoose, { Schema, Document } from "mongoose";

interface IHabit extends Document {
  name: string;
  description: string;
  streak: number;
  frequency: number; // daily = 1, weekly = 7
  lastIncrement: Date | null;
}

const HabitSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  streak: { type: Number, default: 0 },
  frequency: { type: Number, required: true },
  lastIncrement: { type: Date, default: null },
});

export default mongoose.model<IHabit>("Habit", HabitSchema);
