import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth.middleware";
import {
  deleteAccount,
  isUsernameAvailable,
  isEmailAvailable,
  login,
  register,
  updatePassword,
  forgotPasswordSend,
  resetPassword,
} from "../services/auth.service";
import { verifyResetToken } from "../middleware/auth.middleware";
import AuthRequest from "../models/auth-request.model";

export const authRouter = express.Router();
authRouter.use(express.json());

authRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;
    await register(username, email, password);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
});

authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { emailUsername, password } = req.body;
    res
      .status(200)
      .json({ type: "Bearer", token: await login(emailUsername, password) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
});

authRouter.post("/updatePassword", async (req: Request, res: Response) => {
  try {
    const { username, password, newPassword, email } = req.body;

    await updatePassword(username, email, password, newPassword);
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
      const { username, password, email } = req.body;

      await deleteAccount(username, email, password);
      res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete account" });
    }
  }
);

authRouter.get("/isUsernameAvailable", async (req: Request, res: Response) => {
  try {
    const { username } = req.query;
    (await isUsernameAvailable(username as string))
      ? res.status(200).json({})
      : res.status(404).json({});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to check username" });
  }
});

authRouter.get("/isEmailAvailable", async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    (await isEmailAvailable(email as string))
      ? res.status(200).json({})
      : res.status(404).json({});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to check email" });
  }
});

authRouter.post("/forgotPassword", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    await forgotPasswordSend(email);
    res.status(200).json({ message: "Email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

authRouter.post(
  "/resetPassword",
  verifyResetToken,
  async (req: AuthRequest, res: Response) => {
    try {
      const { newPassword } = req.body;
      const userId = req.userId;
      await resetPassword(userId, newPassword);
      res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to reset password" });
    }
  }
);
