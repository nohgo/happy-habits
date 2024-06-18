import { useState } from "react";
import addHabit from "../_lib/addHabit";
import InputBox from "@/app/(auth)/_ui/InputBox";
import Image from "next/image";

export default function AddHabit() {
  const [inputting, setInputting] = useState(false);
  return (
    <div
      onClick={() => {
        if (!inputting) setInputting(true);
      }}
      className={`relative flex h-80 items-center justify-around rounded-xl bg-grayscale-400 p-5 transition-all ${!inputting ? "cursor-pointer hover:brightness-75" : "cursor-auto"}`}
    >
      <div
        className={`text-7xl text-accent-600 ${inputting ? "hidden" : "block"}`}
      >
        +
      </div>
      <button
        onClick={() => setInputting(false)}
        className={`flex h-10 w-10 transition-all hover:brightness-75 ${inputting ? "absolute" : "hidden"} right-1 top-1`}
      >
        <Image
          src="/close.svg"
          width={1}
          height={1}
          className="grow"
          alt="Delete habit"
        />
      </button>
      <form
        action={addHabit}
        className={`h-full w-3/4 ${inputting ? "block" : "hidden"}`}
      >
        <div className="flex h-full flex-col items-center justify-around">
          <InputBox
            id="name"
            placeholder="Name"
            invalidError="Enter a valid name"
          />
          <InputBox
            id="description"
            placeholder="Description"
            invalidError="Enter a valid description"
          />
          <InputBox
            id="frequency"
            placeholder="Frequency"
            invalidError="Enter a valid frequency"
            type="number"
            min="1"
          />
          <button
            onClick={() => location.reload()}
            type="submit"
            className="h-12 w-48 rounded-2xl border border-accent-border bg-accent-main text-2xl transition hover:brightness-90"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
