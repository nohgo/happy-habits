import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import { collections } from "../services/database.service";
import { Habit } from "./habit";
const workFactor: number = 10;

export class User {
  private username: string;
  password: string;
  habits: Array<Habit>;
  _id?: ObjectId;

  constructor(
    username: string,
    password: string,
    ids: Array<ObjectId>,
    _id?: ObjectId
  ) {
    this.username = username;
    bcrypt.hash(password, workFactor, function (err, hash) {
      this.password = hash;
    });
    this.ids = ids;
    this._id = _id;
  }

  static fromJson(json: any): User {
    return new User(json.username, json.password, json.ids, json._id);
  }

  async findHabits() {
    return (await collections.habits.findOne({ id: 123 })) as Habit;
    // return user.ids.map(async (id) => {
    //   console.log(await collections.habits.findOne({ _id: id }));
    // });
  }


}
