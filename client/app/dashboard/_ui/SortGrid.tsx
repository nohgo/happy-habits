"use client";
import SortButton from "./SortButton";

export default function SortGrid({
  sortedBy,
  setSortedBy,
  setSearchContents,
}: {
  sortedBy: number;
  setSortedBy: Function;
  setSearchContents: Function;
}) {
  const sortButtonText = [
    "✏️ Name",
    "📝 Description",
    "🔥 Streak",
    "⌛ Frequency",
    "🕑 Last incremented",
  ];

  return (
    <div className="mr-2 flex basis-1/4 flex-col items-center justify-around rounded-xl bg-grayscale-300 p-10">
      <input
        placeholder="🔍 Search"
        className="h-16 w-full rounded-xl p-5 text-xl outline outline-transparent transition-all hover:brightness-90 focus:outline-accent-400"
        onChange={(e) => setSearchContents(e.target.value)}
      />
      <div className="flex h-3/4 w-full flex-col justify-between">
        <h1 className="w-full text-left text-3xl">Sort by</h1>
        {sortButtonText.map((text, index) => (
          <SortButton
            key={index}
            text={text}
            setSortedBy={setSortedBy}
            sortedBy={sortedBy}
            toSortBy={index}
          />
        ))}
      </div>
    </div>
  );
}
