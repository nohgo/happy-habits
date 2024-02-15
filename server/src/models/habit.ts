import { ObjectId } from "mongodb";

export default class Habit {
  constructor(
    public name: string,
    public description: string,
    public streak: number,
    public _id?: ObjectId
  ) {}
}
