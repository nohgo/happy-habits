import { ObjectId } from "mongodb";

export default class Habit {
  constructor(
    public address: Object,
    public borough: String,
    public cuisine: String,
    public grades: Array<Object>,
    public name: String,
    public restaurant_id: String,
    public id?: ObjectId
  ) {}
}
