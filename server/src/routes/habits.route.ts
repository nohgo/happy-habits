// External Dependencies
import express, { Response } from "express";
import verifyToken from "../security/middleware/auth.middleware";
import Habit from "../models/habit.model";
import User from "../models/user.model";
import AuthRequest from "../security/models/auth-request.model";

// Global Config
export const habitsRouter = express.Router();
habitsRouter.use(express.json());

// Test GET
habitsRouter.get(
  "/getAllHabits",
  verifyToken,
  async (req: AuthRequest, res: Response) => {
    try {
      const user = await User.findOne({ username: req.userId });
      const habits = await Habit.find({ _id: { $in: user.habits } });
      res.status(200).send(habits);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch habits" });
    }
  }
);

habitsRouter.post(
  "/addHabit",
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
      await Habit.updateOne(
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

habitsRouter.delete(
  "/deleteHabit",
  verifyToken,
  async (req: AuthRequest, res: Response) => {
    try {
      const { habitId } = req.body;
      const user = await User.findOne({ username: req.userId });

      await Habit.deleteOne({ _id: habitId });

      user.habits = user.habits.filter((habit) => habit !== habitId);
      await user.save();

      res.status(201).json({ message: "Habit deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erorr: "Failed to delete habit" });
    }
  }
);

habitsRouter.delete(
  "/deleteHabits",
  verifyToken,
  async (req: AuthRequest, res: Response) => {
    try {
      const { habitIds } = req.body;
      const user = await User.findOne({ username: req.userId });

      await Habit.deleteMany({ _id: { $in: habitIds } });

      user.habits = user.habits.filter((habit) => habitIds.contains(habit));
      await user.save();

      res.status(201).json({ message: "Habits deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erorr: "Failed to delete habits" });
    }
  }
);

habitsRouter.delete(
  "/deleteAllHabits",
  verifyToken,
  async (req: AuthRequest, res: Response) => {
    try {
      const user = await User.findOne({ username: req.userId });
      await Habit.deleteMany({ _id: { $in: user.habits } });
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
      const habit = await Habit.findOne({ _id: habitId });
      const incremented = habit.increment();
      await habit.save();
      incremented
        ? res
            .status(201)
            .json({ message: "Habit streak incremented successfully" })
        : res
            .status(400)
            .json({ message: "Habit streak not incremented successfully" });
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
      const habit = await Habit.findOne({ _id: habitId });
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
      const user = await User.findOne({ username: req.userId });
      await Habit.updateMany(
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
