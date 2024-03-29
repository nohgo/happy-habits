import express, { Request, Response } from "express";
import User from "../../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const authRouter = express.Router();
authRouter.use(express.json());

authRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
    });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const token = jwt.sign({ userId: user.username }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });
    res.status(200).json({ type: "Bearer", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
});

authRouter.post("/updatePassword", async (req, res) => {
  try {
    const { username, password, newPassword } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Failed to update password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update password" });
  }
});
