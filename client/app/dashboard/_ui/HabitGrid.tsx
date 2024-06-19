"use client";
import { useEffect, useState, useMemo } from "react";
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
import AddHabit from "./AddHabit";
import HabitSkeleton from "./HabitSkeleton";
import { OverlayScrollbars } from "overlayscrollbars";

export default function HabitGrid({
  sortedBy,
  searchContents,
}: {
  sortedBy: number;
  searchContents: string;
}) {
  const [habits, setHabits] = useState([] as IHabit[]);
  const [error, setError] = useState(false);
  const [finalHabits, setFinalHabits] = useState([] as IHabit[]);
  const comparators = useMemo(
    () => [
      nameComparator,
      descriptionComparator,
      streakComparator,
      frequencyComparator,
      lastIncrementedComparator,
    ],
    [],
  );
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getHabits()
      .then((data) => {
        setLoading(false);
        setHabits(data);
        setFinalHabits(data);
      })
      .catch(() => setError(true));
  }, []);

  useEffect(() => {
    let newHabits = finalHabits;
    if (searchContents != "") {
      newHabits = habits.filter((x) => x.name.includes(searchContents));
    } else {
      newHabits = habits;
    }
    if (sortedBy != -1) {
      newHabits = newHabits.sort(comparators[sortedBy]);
    }
    setFinalHabits(newHabits);
    router.refresh();
  }, [searchContents, sortedBy, comparators, finalHabits, habits, router]);
  if (error) {
    return (
      <div className="ml-2 grid basis-3/4 grid-cols-3 gap-3 overflow-y-scroll rounded-xl bg-grayscale-300 p-5 text-red-500">
        Something went wrong. Please refresh.
      </div>
    );
  }
  return (
    <div
      id="habits"
      className="ml-2 grid basis-3/4 grid-cols-3 items-center gap-3 overflow-y-scroll rounded-xl bg-grayscale-300 p-5"
    >
      {finalHabits.map((item: IHabit, index: number) => (
        <>
          <Habit key={item._id} {...item} />
        </>
      ))}
      {[...Array(9)].map((_, index) => (
        <HabitSkeleton key={index} loading={loading} />
      ))}
      <AddHabit />
    </div>
  );
}
