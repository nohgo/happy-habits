import { useState } from "react";
import addHabit from "../_lib/addHabit";
import InputBox from "@/app/(auth)/_ui/InputBox";

export default function AddHabit() {
  const [inputting, setInputting] = useState(false);
  return (
    <div
      onClick={() => {
        if (!inputting) setInputting(true);
      }}
      className={`relative col-span-3 flex h-48 items-center justify-around rounded-xl bg-grayscale-400 p-5 transition-all ${!inputting ? "cursor-pointer hover:brightness-75" : "cursor-auto"}`}
    >
      <div
        className={`text-7xl text-accent-600 ${inputting ? "hidden" : "block"}`}
      >
        +
      </div>
      <button
        onClick={() => setInputting(false)}
        className={`text-5xl text-red-500 transition-all hover:brightness-75 ${inputting ? "absolute" : "hidden"} right-5 top-5`}
      >
        X
      </button>
      <form
        action={addHabit}
        className={`w-3/4 ${inputting ? "block" : "hidden"}`}
      >
        <div className="flex items-center justify-around">
          <InputBox
            id="name"
            placeholder="✏️ Name"
            invalidError="Enter a valid name"
          />
          <InputBox
            id="description"
            placeholder="📝 Description"
            invalidError="Enter a valid description"
          />
          <InputBox
            id="frequency"
            placeholder="⌛ Frequency"
            invalidError="Enter a valid frequency"
            type="number"
            min="1"
          />
          <button
            type="submit"
            className="h-12 w-48 rounded-2xl border border-accent-border bg-accent-main text-2xl transition hover:brightness-90"
          >
            Add
          </button>
        </div>
        <p className=""></p>
      </form>
    </div>
  );
}
