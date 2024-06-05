"use client";
import HabitGrid from "./HabitGrid";
import SortGrid from "./SortGrid";
import { useState } from "react";

export default function GridContainer({}) {
  const [sortedBy, setSortedBy] = useState(-1);
  const [searchContents, setSearchContents] = useState("");
  return (
    <>
      <SortGrid
        sortedBy={sortedBy}
        setSortedBy={setSortedBy}
        setSearchContents={setSearchContents}
      />
      <HabitGrid sortedBy={sortedBy} searchContents={searchContents} />
    </>
  );
}
