interface ISortButton {
  text: string;
  toSelect: number;
  selected: number;
  setSelected: Function;
}

export default function SortButton({
  text,
  toSelect,
  selected,
  setSelected,
}: ISortButton) {
  return (
    <button
      className={`${selected === toSelect ? "bg-accent-400 outline-accent-300" : "bg-grayscale-400 outline-grayscale-300"} h-16 w-full rounded-xl pl-5 text-left text-2xl transition-all hover:brightness-90`}
      onClick={() => setSelected(toSelect)}
    >
      {text}
    </button>
  );
}
