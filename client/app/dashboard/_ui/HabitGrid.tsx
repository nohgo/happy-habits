"use client";
import { useEffect, useState } from "react";
import Habit, { IHabit } from "./Habit";
import getHabits from "../_lib/getHabits";

export default function HabitGrid({}) {
  const [habits, setHabits] = useState([] as IHabit[]);
  useEffect(() => {
    async function findHabits(): Promise<void> {
      try {
        const habits = await getHabits();
        setHabits(habits);
        console.log(habits);
      } catch (err) {
        console.log("Error occured when fetching books");
      }
    }
    findHabits();
  }, []);

  return habits.map((item) => <Habit {...item} />);
}
