"use client";
import HabitGrid from "./HabitGrid";
import SortGrid from "./SortGrid";
import { useState } from "react";

export default function GridContainer({}) {
  const [sortedBy, setSortedBy] = useState(-1);
  return (
    <>
      <SortGrid sortedBy={sortedBy} setSortedBy={setSortedBy} />
      <HabitGrid sortedBy={sortedBy} />
    </>
  );
}
