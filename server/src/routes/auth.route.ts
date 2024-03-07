import express, { Request, Response } from "express";
import { collections } from "../services/database.service";
import { ObjectId } from "mongodb";
import { User } from "../models/user";
import { Habit } from "../models/habit";
import bcrypt from "bcrypt";

export const authRouter = express.Router();
authRouter.use(express.json());

authRouter.post("/", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user: User = (await collections.users.findOne({
      username: username,
    })) as User;

    if (!user) {
      res.status(401).json({
        message: "Login not successful",
        error: "Username not found",
      });
    } else {
      bcrypt.compare(password, user.password, async function (err, result) {
        if (result) {
          res.status(200).json({
            message: "Login successful",
            habits: await findHabits(user),
          });
        } else {
          res.status(401).json({
            message: "Login not successful",
            error: "Password not found",
          });
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
});
