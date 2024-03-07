import express, { Request, Response } from "express";
import { collections } from "../services/database.service";
import { ObjectId } from "mongodb";
import { User } from "../models/user";
import { Habit } from "../models/habit";

export const authRouter = express.Router();
authRouter.use(express.json());

authRouter.post("/", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user: User = (await collections.users.findOne({
      username: username,
      password: password,
    })) as User;

    if (!user) {
      res.status(401).json({
        message: "Login not successful",
        error: "User not found",
      });
    } else {
      res.status(200).json({
        message: "Login successful",
        habits: await findHabits(user),
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
});

const findHabits = async (user: User) => {
  return (await collections.habits.findOne({ id: 123 })) as Habit;
  // return user.ids.map(async (id) => {
  //   console.log(await collections.habits.findOne({ _id: id }));
  // });
};
