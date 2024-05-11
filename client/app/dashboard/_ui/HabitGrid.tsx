"use client";
import { useEffect, useState } from "react";
import Habit, { IHabit } from "./Habit";
import getHabits from "../_lib/getHabits";

export default function HabitGrid({}) {
  const [habits, setHabits] = useState([] as IHabit[]);
  useEffect(() => {
    (async () => {
      try {
        const books = await getHabits();
        setHabits(books);
      } catch (err) {
        console.log("Error occured when fetching books");
      }
    })();
  }, []);

  return habits.map((item) => <Habit {...item} />);
}
