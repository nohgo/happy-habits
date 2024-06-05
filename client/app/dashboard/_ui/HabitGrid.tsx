"use client";
import { useEffect, useState } from "react";
import getHabits from "../_lib/getHabits";
import Habit, { IHabit } from "./Habit";
import {
  nameComparator,
  descriptionComparator,
  streakComparator,
  frequencyComparator,
  lastIncrementedComparator,
} from "../_lib/comparators";

export default function HabitGrid({
  sortedBy,
  searchContents,
}: {
  sortedBy: number;
  searchContents: string;
}) {
  const [habits, setHabits] = useState([] as IHabit[]);
  const [finalHabits, setFinalHabits] = useState([] as IHabit[]);
  const comparators = [
    nameComparator,
    descriptionComparator,
    streakComparator,
    frequencyComparator,
    lastIncrementedComparator,
  ];

  useEffect(() => {
    getHabits().then((data) => {
      setHabits(data);
      setFinalHabits(data);
    });
  }, []);

  useEffect(() => {
    if (searchContents != "") {
      console.log(searchContents);
      setFinalHabits(
        finalHabits.filter((x) => x.name.includes(searchContents)),
      );
    } else {
      setFinalHabits(habits);
    }
    if (sortedBy != -1) {
      setFinalHabits(finalHabits.sort(comparators[sortedBy]));
    }
  }, [searchContents, sortedBy]);
  return (
    <div className="ml-2 grid basis-3/4 grid-cols-3 gap-3 overflow-y-scroll rounded-xl bg-grayscale-300 p-5">
      {finalHabits.map((item: IHabit, index: number) => (
        <Habit key={index} {...item} />
      ))}
    </div>
  );
}
