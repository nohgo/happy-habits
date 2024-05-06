import { useEffect, useState } from "react";
import Habit, { IHabit } from "./Habit";
import getHabits from "../_lib/getHabits";

export default function HabitGrid({}) {

  const [habits, setHabits] = useState({} as IHabit[]);
  useEffect(() => setHabits(getHabits()), []);

  return habits.map((item) => <Habit {...item} />);
}
