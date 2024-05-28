import User from "../models/user.model";
import Habit from "../models/habit.model";
import { ObjectId } from "mongodb";

export async function addHabit(
  username: string,
  name: string,
  description: string,
  frequency: number,
) {
  if (!(username && name && description && frequency)) {
    throw new Error("Missing required fields");
  }

  const user = await User.findOne({ username });
  const habit = new Habit({
    name,
    description,
    frequency,
  });
  await habit.save();
  user.habits.push(habit._id as ObjectId);
  await user.save();
}

export async function getHabits(username: string): Promise<ObjectId[]> {
  if (!username) {
    throw new Error("Missing required fields");
  }
  const user = await User.findOne({ username }).populate("habits");
  if (!user) throw new Error("User not found");
  return user.habits;
}

export async function updateHabit(
  username: string,
  habitId: string,
  name: string,
  description: string,
  frequency: number,
) {
  if (!(username && habitId && name && description && frequency)) {
    throw new Error("Missing required fields");
  }
  const user = await User.findOne({ username });
  if (!user) throw new Error("User not found");
  if (!user.habits.includes(new ObjectId(habitId)))
    throw new Error("Habit not found");

  await Habit.updateOne(
    { _id: habitId },
    {
      $set: {
        name,
        description,
        frequency,
      },
    },
  );
}

export async function deleteHabit(username: string, habitId: string) {
  if (!username || !habitId) {
    throw new Error("Missing required fields");
  }

  const user = await User.findOne({ username: username });
  await Habit.deleteOne({ _id: habitId });
  user.habits = user.habits.filter((habit) => habit._id.toString() !== habitId);
  user.save();
}

export async function deleteMultipleHabits(
  username: string,
  habitIds: Array<string>,
) {
  if (!username || !habitIds) {
    throw new Error("Missing required fields");
  }
  const user = await User.findOne({ username: username });
  await Habit.deleteMany({ _id: { $in: habitIds } });
  user.habits = [];
  user.save();
}

export async function deleteAllHabits(username: string) {
  if (!username) {
    throw new Error("Missing required fields");
  }
  const user = await User.findOne({ username: username });
  await Habit.deleteMany({ _id: { $in: user.habits } });
  user.habits = [];
  user.save();
}
export async function incrementStreak(username: string, habitId: string) {
  if (!habitId || !username) {
    throw new Error("Missing required fields");
  }
  const user = await User.findOne({ username });
  if (!user) throw new Error("User not found");
  if (!user.habits.includes(new ObjectId(habitId)))
    throw new Error("Habit not found");

  const habit = await Habit.findOne({ _id: habitId });
  const now = new Date();

  if (habit.lastIncrement === null) {
    habit.streak += 1;
    habit.lastIncrement = now;
  }

  const diffInDays = Math.floor(
    (now.getTime() - habit.lastIncrement.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffInDays >= habit.frequency) {
    habit.streak += 1;
    habit.lastIncrement = now;
  } else {
    throw new Error("Cannot increment habit yet");
  }

  await habit.save();
}

export async function resetStreak(username: string, habitId: string) {
  if (!habitId || !username) {
    throw new Error("Missing required fields");
  }
  const user = await User.findOne({ username });
  if (!user) throw new Error("User not found");
  if (!user.habits.includes(new ObjectId(habitId)))
    throw new Error("Habit not found");
  const habit = await Habit.findOne({ _id: habitId });

  habit.streak = 0;
  await habit.save();
}

export async function resetAllStreaks(username: string) {
  if (!username) {
    throw new Error("Missing required fields");
  }
  const user = await User.findOne({ username: username });
  await Habit.updateMany(
    { _id: { $in: user.habits } },
    { $set: { streak: 0 } },
  );
}
