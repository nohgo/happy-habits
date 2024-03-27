import User from "../../models/user.model";
import Habit from "../../models/habit.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(
  username: string,
  password: string
): Promise<void> {
  if (!username || !password) {
    throw new Error("Missing required fields");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    username,
    password: hashedPassword,
  });

  await user.save();
}
export async function login(
  username: string,
  password: string
): Promise<string> {
  if (!username || !password) {
    throw new Error("Missing required fields");
  }
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("User not found");
  }

  if (!bcrypt.compare(password, user.password)) {
    throw new Error("Invalid password");
  }

  return jwt.sign({ userId: user.username }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
}

export async function updatePassword(
  username: string,
  password: string,
  newPassword: string
) {
  if (!username || !password || !newPassword) {
    throw new Error("Missing required fields");
  }
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("User not found");
  }
  if (!bcrypt.compare(password, user.password)) {
    throw new Error("Invalid password");
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedNewPassword;
  await user.save();
}

export async function deleteAccount(username: string, password: string) {
  if (!username || !password) {
    throw new Error("Missing required fields");
  }
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("User not found");
  }
  if (!bcrypt.compare(password, user.password)) {
    throw new Error("Invalid password");
  }
  await Habit.deleteMany({ _id: { $in: user.habits } });
  await User.deleteOne({ _id: user._id });
}
