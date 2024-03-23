// External Dependencies
import express, { Response } from "express";
import verifyToken from "../middleware/authMiddleware";
import Habit from "../models/habit";
import User from "../models/user";
import AuthRequest from "../models/AuthRequest";

// Global Config
export const habitsRouter = express.Router();
habitsRouter.use(express.json());

// Test GET
habitsRouter.get("/", verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findOne({ username: req.userId });
    console.log(user);
    const habits = await Habit.find({ _id: { $in: user.habits } });
    res.status(200).send(habits);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

habitsRouter.post(
  "/newHabit",
  verifyToken,
  async (req: AuthRequest, res: Response) => {
    try {
      const { name, description, days } = req.body;
      const user = await User.findOne({ username: req.userId });
      const habit = new Habit({
        name,
        description,
        frequency: days * parseInt(process.env.DAY_MS),
      });
      await habit.save();
      user.habits.push(habit._id);
      await user.save();
      res.status(201).json({ message: "Habit added successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to add habit" });
      console.log(error);
    }
  }
);

export default habitsRouter;
