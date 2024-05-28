import User from "../../models/user.model";
import Habit from "../../models/habit.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../email/sendEmail";

export async function register(
  username: string,
  email: string,
  password: string,
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
  password: string,
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

  if (!(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid password");
  }

  if (!user.isEmailVerified) {
    throw new Error("Email not verified");
  }

  return jwt.sign({ username: user.username }, process.env.SECRET_KEY, {
    expiresIn: 60000 * 30,
  });
}

export async function updatePassword(
  username: string,
  email: string,
  password: string,
  newPassword: string,
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
  password: string,
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

export async function isUsernameAvailable(username: string): Promise<boolean> {
  return (await User.findOne({ username })) == null;
}

export async function isEmailAvailable(email: string): Promise<boolean> {
  return (await User.findOne({ email })) == null;
}

export async function forgotPasswordSend(email: string): Promise<void> {
  if (!email) {
    throw new Error("Missing required fields");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const token = jwt.sign(
    { username: user.username },
    process.env.PASSWORD_RESET_KEY,
    { expiresIn: "1h" },
  );
  const payload = {
    link: `${process.env.CLIENT_URL}/reset-password?token=${token}`,
    name: user.username,
  };
  await sendEmail(
    user.email,
    "Password Reset",
    payload,
    "../email/template/reset-password.template.handlebars",
  );
}

export async function resetPassword(username: string, newPassword: string) {
  if (!username || !newPassword) {
    throw new Error("Missing required fields");
  }

  const user = await User.findOne({ username: username });
  if (!user) {
    throw new Error("User not found");
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
}

export async function verifyEmailSend(email: string): Promise<void> {
  if (!email) {
    throw new Error("Missing required fields");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  if (user.isEmailVerified) {
    throw new Error("User already verified");
  }
  const token = jwt.sign(
    { username: user.username },
    process.env.VERIFY_EMAIL_KEY,
    { expiresIn: "1h" },
  );

  const payload = {
    link: `${process.env.CLIENT_URL}/verify-email?token=${token}`,
    name: user.username,
  };

  await sendEmail(
    user.email,
    "Verify Email",
    payload,
    "../email/template/verify-email.template.handlebars",
  );
}

export async function verifyEmail(username: string) {
  if (!username) {
    throw new Error("Missing required fields");
  }

  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("User not found");
  }

  user.isEmailVerified = true;
  await user.save();
}
