// External Dependencies
import express, { Response } from "express";
import { verifyToken } from "../security/middleware/auth.middleware";
import AuthRequest from "../security/models/auth-request.model";
import {
  addHabit,
  getHabits,
  updateHabit,
  deleteHabit,
  incrementStreak,
} from "../services/habits.service";

// Global Config
export const habitsRouter = express.Router();
habitsRouter.use(express.json());

// Test GET
habitsRouter.get("", verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    res.status(200).send(await getHabits(req.username));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch habits" });
  }
});

habitsRouter.post("", verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    await addHabit(
      req.username,
      req.body.name,
      req.body.description,
      req.body.frequency,
    );

    res.status(201).json({ message: "Habit added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add habit" });
  }
});

habitsRouter.put(
  "/:id",
  verifyToken,
  async (req: AuthRequest, res: Response) => {
    try {
      const habitId = req.params.id;
      const { name, description, frequency } = req.body;
      await updateHabit(req.username, habitId, name, description, frequency);
      res.status(200).json({ message: "Habit updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update habit" });
    }
  },
);

habitsRouter.delete(
  "/:id",
  verifyToken,
  async (req: AuthRequest, res: Response) => {
    try {
      const habitId = req.params.id;
      const username = req.username;
      await deleteHabit(username, habitId);
      res.status(204).json({ message: "Habit deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erorr: "Failed to delete habit" });
    }
  },
);

habitsRouter.put(
  "/increment/:id",
  verifyToken,
  async (req: AuthRequest, res: Response) => {
    try {
      const habitId = req.params.id;
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
  },
);

export default habitsRouter;
