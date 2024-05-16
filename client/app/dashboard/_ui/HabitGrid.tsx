"use client";
import { useEffect, useState } from "react";
import Habit, { IHabit } from "./Habit";
import getHabits from "../_lib/getHabits";

export default function HabitGrid({}) {
  const [habits, setHabits] = useState([] as IHabit[]);
  useEffect(() => {
    getHabits().then((data) => setHabits(data));
  }, []);

  return (
    <div className="flex justify-around">
      {habits.map((item: IHabit) => (
        <Habit {...item} />
      ))}
    </div>
  );
}
