import { ObjectId } from "mongodb";

export type Habit = {
  name: string;
  description: string;
  streak: number;
  _id?: ObjectId;
};
