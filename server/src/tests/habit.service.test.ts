import mockingoose from "mockingoose";
import Habit from "../models/habit.model";
import User from "../models/user.model";
import { getHabits } from "../services/habits.service";

const mockUser = {
  _id: "507f1f77bcf86cd799439011",
  username: "testuser",
  password: "password",
  habits: ["507f1f77bcf86cd799439012", "507f1f77bcf86cd799439013"],
};

const mockHabits = [
  {
    _id: "507f1f77bcf86cd799439012",
    name: "Habit 1",
    description: "Description 1",
    frequency: 1,
  },
  {
    _id: "507f1f77bcf86cd799439013",
    name: "Habit 2",
    description: "Description 2",
    frequency: 2,
  },
];

describe("getHabits", () => {
  it("should return all habits of a user", async () => {
    mockingoose(User).toReturn(mockUser, "findOne");
    mockingoose(Habit).toReturn(mockHabits, "find");

    const habits = await getHabits(mockUser.username);
    expect(habits).toEqual(mockHabits);
  });
});
