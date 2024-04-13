import User from "../../models/user.model";
import Habit from "../../models/habit.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(
  username: string,
  email: string,
  password: string
): Promise<void> {
  if (!username || !password || !email) {
    throw new Error("Missing required fields");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    username,
    email,
    password: hashedPassword,
  });

  await user.save();
}
export async function login(
  emailUsername: string,
  password: string
): Promise<string> {
  if (!emailUsername || !password) {
    throw new Error("Missing required fields");
  }

  const user = emailUsername.includes("@")
    ? await User.findOne({ email: emailUsername })
    : await User.findOne({ username: emailUsername });

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
  email: string,
  password: string,
  newPassword: string
) {
  if (!(username || email) || !password || !newPassword) {
    throw new Error("Missing required fields");
  }

  const user = username
    ? await User.findOne({ username })
    : await User.findOne({ email });

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

export async function deleteAccount(
  username: string,
  email: string,
  password: string
) {
  if (!(username || email) || !password) {
    throw new Error("Missing required fields");
  }

  const user = username
    ? await User.findOne({ username })
    : await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }
  if (!bcrypt.compare(password, user.password)) {
    throw new Error("Invalid password");
  }
  await Habit.deleteMany({ _id: { $in: user.habits } });
  await User.deleteOne({ _id: user._id });
}

export async function doesUsernameExist(username: string): Promise<boolean> {
  return (await User.findOne({ username })) !== null;
}

export async function doesEmailExist(email: string): Promise<boolean> {
  return (await User.findOne({ email })) !== null;
}
