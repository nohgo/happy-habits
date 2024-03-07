import { ObjectId } from "mongodb";

export class Habit {
  name: string;
  description: string;
  streak: number;
  frequency: number;
  lastIncrement: Date | null;
  _id?: ObjectId;

  constructor(
    name: string,
    description: string,
    streak: number,
    frequency: number, // daily = 1, weekly = 7
    _id?: ObjectId
  ) {
    this.name = name;
    this.description = description;
    this.streak = streak;
    this.frequency = frequency;
    this.lastIncrement = null;
    this._id = _id;
  }

  static fromJson(json: any): Habit {
    return new Habit(json.name, json.description, json.streak, json._id);
  }

  incrementStreak() {
    if (this.lastIncrement) {
      const now = new Date();
      const timeDiff = now.getTime() - this.lastIncrement.getTime();
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      if (diffDays >= this.frequency) {
        this.streak++;
        this.lastIncrement = now;
      } else {
        return new Error("Not enough time has passed");
      }
    } else {
      this.streak++;
      this.lastIncrement = new Date();
    }
  }
}
