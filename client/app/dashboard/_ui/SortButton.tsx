interface ISortButton {
  text: string;
  toSortBy: number;
  sortedBy: number;
  setSortedBy: Function;
}

export default function SortButton({
  text,
  toSortBy,
  sortedBy,
  setSortedBy,
}: ISortButton) {
  return (
    <button
      className={`${sortedBy === toSortBy ? "bg-accent-400 outline-accent-300" : "bg-grayscale-400 outline-grayscale-300"} h-16 w-full rounded-xl pl-5 text-left text-2xl transition-all hover:brightness-90`}
      onClick={() => setSortedBy(toSortBy)}
    >
      {text}
    </button>
  );
}
