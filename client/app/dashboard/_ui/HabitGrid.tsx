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
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  useEffect(() => {
    getHabits().then((data) => {
      setHabits(data);
      setFinalHabits(data);
    });
  }, []);

  useEffect(() => {
    let newHabits = finalHabits;
    if (searchContents != "") {
      console.log(searchContents);
      newHabits = habits.filter((x) => x.name.includes(searchContents));
    } else {
      newHabits = habits;
    }
    if (sortedBy != -1) {
      console.log(sortedBy);
      newHabits = newHabits.sort(comparators[sortedBy]);
    }
    setFinalHabits(newHabits);
    router.refresh();
  }, [searchContents, sortedBy]);
  return (
    <div className="ml-2 grid basis-3/4 grid-cols-3 gap-3 overflow-y-scroll rounded-xl bg-grayscale-300 p-5">
      {finalHabits.map((item: IHabit, index: number) => (
        <Habit key={index} {...item} />
      ))}
    </div>
  );
}
