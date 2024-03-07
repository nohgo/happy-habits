import { ObjectId } from "mongodb";

export type User = {
  username: string;
  password: string;
  ids: Array<ObjectId>;
  _id?: ObjectId;
};
