// preliminary assumptions -- this will be the child of a flexbox

import Image from "next/image";
import deleteHabit from "../_lib/deleteHabit";
import incrementStreak from "../_lib/incrementStreak";
import ProgressBar from "./ProgressBar";
import { useState } from "react";

export interface IHabit {
  _id: string;
  name: string;
  description: string;
  streak: number;
  frequency: number;
  lastIncrement: Date; // Might not be able to transfer these dates easily through jsons
}

export default function Habit({
  _id,
  name,
  description,
  streak,
  frequency,
  lastIncrement,
}: IHabit) {
  const [deleting, setDeleting] = useState(false);
  let percentFilled = 1;
  if (lastIncrement) {
    percentFilled =
      (Date.now() - new Date(lastIncrement).getTime()) / (frequency * 86400000); // 86400000 is the number of milliseconds in a day
  }
  return (
    <div className="my-auto flex h-80 flex-col justify-between rounded-xl bg-grayscale-400 p-5">
      {!deleting ? (
        <>
          <div>
            <div className={`flex items-center justify-between`}>
              <h1 className="text-2xl">{name}</h1>
              <div className="flex items-center">
                <p className="text-2xl">🔥{streak}</p>
                <button
                  onClick={async () => {
                    setDeleting(true);
                  }}
                  className="ml-2 rounded-full p-2 text-5xl text-red-500 transition-all hover:bg-black/25 focus:bg-black/50"
                >
                  <Image
                    src="/trash-can.png"
                    width={30}
                    height={30}
                    alt="Delete this habit"
                  />
                </button>
              </div>
            </div>
            <p>{description}</p>
          </div>
          <ProgressBar
            percentFilled={percentFilled}
            onClick={async () => await incrementStreak(_id)}
            progressText={msToDateString(
              new Date(lastIncrement).getTime() +
                frequency * 86400000 -
                Date.now(),
            )}
          />
        </>
      ) : (
        <div className="my-16 flex flex-col items-center justify-between space-y-10">
          <p className="text-3xl">Delete this habit?</p>
          <div className="space-x-10">
            <button
              onClick={async () => {
                await deleteHabit(_id);
                location.reload();
              }}
              className="rounded-xl bg-red-500 px-5 py-2 transition-all hover:brightness-90"
            >
              Delete
            </button>
            <button
              onClick={() => {
                setDeleting(false);
              }}
              className="rounded-xl bg-grayscale-300 px-5 py-2 transition-all hover:brightness-90"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function msToDateString(ms: number): string {
  let result: string = "🕒 ";
  if (ms >= 86400000) {
    result += Math.floor(ms / 86400000) + "d ";
    ms %= 86400000;
  }
  if (ms >= 3600000) {
    result += Math.floor(ms / 3600000) + "h ";
    ms %= 3600000;
  }
  if (ms >= 60000) {
    result += Math.floor(ms / 60000) + "m ";
  }

  return result;
}
