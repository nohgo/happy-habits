import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth.middleware";
import {
  deleteAccount,
  login,
  register,
  updatePassword,
} from "../services/auth.service";

export const authRouter = express.Router();
authRouter.use(express.json());

authRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    await register(username, password);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
});

authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    res
      .status(200)
      .json({ type: "Bearer", token: await login(username, password) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
});

authRouter.post("/updatePassword", async (req: Request, res: Response) => {
  try {
    const { username, password, newPassword } = req.body;

    await updatePassword(username, password, newPassword);
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update password" });
  }
});

authRouter.delete(
  "/deleteAccount",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      await deleteAccount(username, password);
      res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete account" });
    }
  }
);
