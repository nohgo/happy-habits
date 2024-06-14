import express, { Request, Response } from "express";
import {
  deleteAccount,
  isUsernameAvailable,
  isEmailAvailable,
  login,
  register,
  forgotPasswordSend,
  resetPassword,
  verifyEmailSend,
  verifyEmail,
} from "../services/auth.service";
import {
  verifyToken,
  verifyResetToken,
  verifyEmailToken,
} from "../middleware/auth.middleware";
import AuthRequest from "../models/auth-request.model";
import User from "../../models/user.model";

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
    res
      .status(error.message === "Email not verified" ? 501 : 500)
      .json({ error: "Login failed" });
  }
});

authRouter.delete("", verifyToken, async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    await deleteAccount(username, password);
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete account" });
  }
});

authRouter.get("", verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const username = req.username;
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("Cannot find user");
    }
    const email = user.email;
    res.status(200).json({ username, email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get username" });
  }
});

authRouter.get(
  "/is-username-available",
  async (req: Request, res: Response) => {
    try {
      const { username } = req.query;
      (await isUsernameAvailable(username as string))
        ? res.status(200).json({})
        : res.status(404).json({});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to check username" });
    }
  },
);

authRouter.get("/is-email-available", async (req: Request, res: Response) => {
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

authRouter.post("/forgot-password", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    await forgotPasswordSend(email);
    res.status(200).json({ message: "Email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

authRouter.put(
  "/password",
  verifyResetToken,
  async (req: AuthRequest, res: Response) => {
    try {
      const { newPassword } = req.body;
      const username = req.username;
      await resetPassword(username, newPassword);
      res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to reset password" });
    }
  },
);

authRouter.get("/verify-email", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    await verifyEmailSend(email);
    res.status(200).json({ message: "Email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

authRouter.post(
  "/verify-email",
  verifyEmailToken,
  async (req: AuthRequest, res: Response) => {
    try {
      const username = req.username;
      await verifyEmail(username);
      console.log("here");
      res.status(200).send();
    } catch (error) {
      res.status(500).send();
    }
  },
);
