import express, { Request, Response } from "express";
import { collections } from "../services/database.service";
import { ObjectId } from "mongodb";

export const authRouter = express.Router();
authRouter.use(express.json());

authRouter.post("/", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await collections.users.findOne({
      username: username,
      password: password,
    });

    if (!user) {
      res.status(401).json({
        message: "Login not successful",
        error: "User not found",
        user: username,
        pass: password,
      });
    } else {
      res.status(200).json({ message: "Login successful", user });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "An error occurred", error: error.message });
  }
});
