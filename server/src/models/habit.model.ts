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

HabitSchema.methods.increment = function () {
  const now = new Date();

  if (this.lastIncrement === null) {
    this.streak += 1;
    this.lastIncrement = now;
    return true;
  }

  const diffInDays = Math.floor(
    (now.getTime() - this.lastIncrement.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays >= this.frequency) {
    this.streak += 1;
    this.lastIncrement = now;
    return true;
  } else {
    return false;
  }
};

export default mongoose.model<IHabit>("Habit", HabitSchema);
