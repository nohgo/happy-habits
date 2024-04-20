// External Dependencies
import express, { Response } from "express";
import verifyToken from "../security/middleware/auth.middleware";
import AuthRequest from "../security/models/auth-request.model";
import {
  addHabit,
  deleteMultipleHabits,
  getHabits,
  updateHabit,
  deleteAllHabits,
  deleteHabit,
  incrementStreak,
  resetStreak,
  resetAllStreaks,
} from "../services/habits.service";

// Global Config
export const habitsRouter = express.Router();
habitsRouter.use(express.json());

// Test GET
habitsRouter.get(
  "/getAllHabits",
  verifyToken,
  async (req: AuthRequest, res: Response) => {
    try {
      res.status(200).send(await getHabits(req.username));
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
      await addHabit(
        req.username,
        req.body.name,
        req.body.description,
        req.body.frequency
      );

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
      await updateHabit(req.username, habitId, name, description, frequency);
      res.status(200).json({ message: "Habit updated successfully" });
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
      const username = req.username;
      await deleteHabit(username, habitId);
      res.status(204).json({ message: "Habit deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erorr: "Failed to delete habit" });
    }
  }
);

habitsRouter.delete(
  "/deleteMultipleHabits",
  verifyToken,
  async (req: AuthRequest, res: Response) => {
    try {
      const { habitIds } = req.body;
      const { username } = req.body;

      await deleteMultipleHabits(username, habitIds);
      res.status(204).json({ message: "Habits deleted successfully" });
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
      const username = req.username;
      await deleteAllHabits(username);
      res.status(204).json({ message: "All habits deleted successfully" });
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
      await incrementStreak(req.username, habitId);
      res
        .status(200)
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
      await resetStreak(req.username, habitId);
      res.status(200).json({ message: "Habit streak reset successfully" });
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
      const username = req.username;
      await resetAllStreaks(username);
      res.status(200).json({ message: "All habit streaks reset successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Failed to reset all habit streaks",
      });
    }
  }
);

export default habitsRouter;
