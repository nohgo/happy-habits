// External Dependencies
import express, { Request, Response } from "express";
import { collections } from "../services/database.service";
import verifyToken from "../middleware/auth.middleware";
import Habit from "../models/habit.model";
import AuthRequest from "../models/auth-request.model";

// Global Config
export const habitsRouter = express.Router();
habitsRouter.use(express.json());

// Test GET
habitsRouter.get("/", verifyToken, async (_req: Request, res: Response) => {
  try {
    const habits = await collections.habits.find({}).toArray();
    res.status(200).send(habits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch habits" });
  }
});

habitsRouter.post(
  "/addHabit",
  verifyToken,
  async (req: AuthRequest, res: Response) => {
    try {
      const { name, description, days } = req.body;
      const user = await collections.users.findOne({ username: req.userId });
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
      console.error(error);
      res.status(500).json({ error: "Failed to add habit" });
    }
  }
);

habitsRouter.post(
  "/updateHabit",
  verifyToken,
  async (req: AuthRequest, res: Response) => {
    try {
      const { habitId, name, description, frequency } = req.body;
      await collections.habits.updateOne(
        { _id: habitId },
        { $set: { name, description, frequency } }
      );

      res.status(201).json({ message: "Habit updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update habit" });
    }
  }
);

habitsRouter.post(
  "/deleteHabit",
  verifyToken,
  async (req: AuthRequest, res: Response) => {
    try {
      const { habitId } = req.body;
      const user = await collections.users.findOne({ username: req.userId });

      await collections.habits.deleteOne({ _id: habitId });

      await user.habits.remove(habitId);
      await user.save();

      res.status(201).json({ message: "Habit deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erorr: "Failed to delete habit" });
    }
  }
);

habitsRouter.post(
  "/deleteAllHabits",
  verifyToken,
  async (req: AuthRequest, res: Response) => {
    try {
      const user = await collections.users.findOne({ username: req.userId });
      await collections.habits.deleteMany({ _id: { $in: user.habits } });
      user.habits = [];
      await user.save();
      res.status(201).json({ message: "All habits deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete all habits" });
    }
  }
);

habitsRouter.post(
  "/incrementStreak",
  verifyToken,
  async (req: AuthRequest, res: Response) => {
    try {
      const { habitId } = req.body;
      const habit = await collections.habits.findOne({ _id: habitId });

      if (habit.lastIncrement) {
        const now = new Date();
        const diff = now.getTime() - habit.lastIncrement.getTime();
        const diffDays = Math.ceil(diff / Number.parseInt(process.env.DAY_MS));

        if (diffDays === habit.frequency) {
          habit.streak++;
        } else if (diffDays > habit.frequency) {
          habit.streak = 1;
        }
      } else {
        habit.streak = 1;
      }

      habit.lastIncrement = new Date();
      await habit.save();

      res
        .status(201)
        .json({ message: "Habit streak incremented successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Failed to increment habit streak",
      });
    }
  }
);

habitsRouter.post(
  "/resetStreak",
  verifyToken,
  async (req: AuthRequest, res: Response) => {
    try {
      const { habitId } = req.body;
      const habit = await collections.habits.findOne({ _id: habitId });
      habit.streak = 0;
      await habit.save();
      res.status(201).json({ message: "Habit streak reset successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Failed to reset habit streak",
      });
    }
  }
);

habitsRouter.post(
  "/resetAllStreaks",
  verifyToken,
  async (req: AuthRequest, res: Response) => {
    try {
      const user = await collections.users.findOne({ username: req.userId });
      await collections.habits.updateMany(
        { _id: { $in: user.habits } },
        { $set: { streak: 0 } }
      );

      res.status(201).json({ message: "All habit streaks reset successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Failed to reset all habit streaks",
      });
    }
  }
);

export default habitsRouter;
