"use client";
import { useEffect, useState } from "react";
import getHabits from "../_lib/getHabits";
import Habit, { IHabit } from "./Habit";

export default function HabitGrid({ sortedBy }: { sortedBy: number }) {
  const [habits, setHabits] = useState([] as IHabit[]);
  useEffect(() => {
    getHabits().then((data) => setHabits(data));
  }, []);
  return (
    <div className="ml-2 grid basis-3/4 grid-cols-3 gap-3 overflow-y-scroll rounded-xl bg-grayscale-300 p-5">
      {habits.map((item: IHabit, index: number) => (
        <Habit key={index} {...item} />
      ))}
    </div>
  );
}
