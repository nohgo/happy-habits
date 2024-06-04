"use client";
import { useEffect, useState } from "react";
import getHabits from "../_lib/getHabits";
import Habit, { IHabit } from "./Habit";

export default function HabitGrid() {
  const [habits, setHabits] = useState([] as IHabit[]);
  useEffect(() => {
    console.log("effected!");
    getHabits().then((data) => setHabits(data));
  }, []);
  return (
    <div className="overflow-y-scroll justify-baseline ml-2 flex basis-3/4 flex-wrap items-baseline space-x-2 rounded-xl bg-grayscale-300 p-5">
      {habits.map((item: IHabit, index: number) => (
        <Habit key={index} {...item} />
      ))}
    </div>
  );
}
