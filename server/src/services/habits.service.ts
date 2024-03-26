import User from "../models/user.model";
import Habit from "../models/habit.model";

export async function addHabit(
  userId: string,
  name: string,
  description: string,
  frequency: number
) {
  const user = await User.findOne({ username: userId });
  const habit = new Habit({
    name,
    description,
    frequency,
  });
  await habit.save();
  user.habits.push(habit._id);
  await user.save();
}

export async function getHabits(userId: string) {
  const user = await User.findOne({ username: userId });
  const habits = await Habit.find({ _id: { $in: user.habits } });
  return habits;
}

export async function updateHabit(
  habitId: string,
  name: string,
  description: string,
  frequency: number
) {
  await Habit.updateOne(
    { _id: habitId },
    {
      $set: {
        name,
        description,
        frequency,
      },
    }
  );
}

export async function deleteHabit(userId: string, habitId: string) {
  const user = await User.findOne({ username: userId });
  await Habit.deleteOne({ _id: habitId });
  user.habits = user.habits.filter((habit) => habit._id.toString() !== habitId);
  user.save();
}

export async function deleteMultipleHabits(
  userId: string,
  habitIds: Array<string>
) {
  const user = await User.findOne({ username: userId });
  await Habit.deleteMany({ _id: { $in: habitIds } });
  user.habits = [];
  user.save();
}

export async function deleteAllHabits(userId: string) {
  const user = await User.findOne({ username: userId });
  await Habit.deleteMany({ _id: { $in: user.habits } });
  user.habits = [];
  user.save();
}
export async function incrementStreak(habitId: string) {
  const habit = await Habit.findOne({ _id: habitId });
  const now = new Date();

  if (habit.lastIncrement === null) {
    habit.streak += 1;
    habit.lastIncrement = now;
  }

  const diffInDays = Math.floor(
    (now.getTime() - habit.lastIncrement.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays >= habit.frequency) {
    habit.streak += 1;
    habit.lastIncrement = now;
  } else {
    throw new Error("Cannot increment habit yet");
  }

  await habit.save();
}

export async function resetStreak(habitId: string) {
  const habit = await Habit.findOne({ _id: habitId });

  habit.streak = 0;
  await habit.save();
}

export async function resetAllStreaks(userId: string) {
  const user = await User.findOne({ username: userId });
  await Habit.updateMany(
    { _id: { $in: user.habits } },
    { $set: { streak: 0 } }
  );
}
