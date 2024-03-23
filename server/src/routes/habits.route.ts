// External Dependencies
import express, { Request, Response } from "express";
import { collections } from "../services/database.service";
import verifyToken from "../middleware/authMiddleware";
import Habit from "../models/Habit";

// Global Config
export const habitsRouter = express.Router();
habitsRouter.use(express.json());

// Test GET
habitsRouter.get("/", verifyToken, async (_req: Request, res: Response) => {
  try {
    const habits = await collections.habits.find({ id: 123 }).toArray();
    res.status(200).send(habits);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

habitsRouter.post(
  "/newHabit",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { name, description, days } = req.body;
      const habit = new Habit({
        name,
        description,
        frequency: days * parseInt(process.env.DAY_MS),
      });
      await habit.save();
      res.status(201).json({ message: "Habit added successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to add habit" });
    }
  }
);

export default habitsRouter;
