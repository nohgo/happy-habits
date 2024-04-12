import { MouseEventHandler } from "react";

export default function AuthButton({
  text,
  set,
}: {
  text: string;
  set: Function;
}) {
  return (
    <button
      onClick={() => set()}
      className="mb-3 rounded-full w-64 h-14 bg-accent-main border border-accent-border transition hover:brightness-105 text-xl"
    >
      {text}
    </button>
  );
}
