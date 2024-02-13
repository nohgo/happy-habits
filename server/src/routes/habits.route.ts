// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Habit from "../models/habit";

// Global Config
export const habitsRouter = express.Router();
habitsRouter.use(express.json());

// GET
habitsRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const habits = (await collections.habits
      .find({})
      .toArray()) as unknown as Habit[];
    res.status(200).send(habits);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
