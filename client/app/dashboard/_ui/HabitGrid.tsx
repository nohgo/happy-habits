"use client";
import { useEffect, useState } from "react";
import getHabits from "../_lib/getHabits";
import Habit, { IHabit } from "./Habit";

export default function HabitGrid() {
  const [habits, setHabits] = useState([] as IHabit[]);
  useEffect(() => {
    getHabits().then((data) => setHabits(data));
  }, []);
  return (
    <div className="justify-baseline ml-2 flex basis-3/4 flex-wrap items-baseline space-x-2 rounded-xl bg-grayscale-300 p-5">
      {habits.map((item: IHabit) => (
        <Habit {...item} />
      ))}
    </div>
  );
}
