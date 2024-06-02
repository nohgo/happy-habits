// preliminary assumptions -- this will be the child of a flexbox

import incrementStreak from "../_lib/incrementStreak";
import ProgressBar from "./ProgressBar";

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
  let percentFilled = 1;
  if (lastIncrement) {
    percentFilled =
      (Date.now() - new Date(lastIncrement).getTime()) / (frequency * 86400000); // 8640000 is the number of milliseconds in a day
  }
  return (
    <div className="flex h-[40%] basis-1/3 flex-col justify-between rounded-xl bg-grayscale-400 p-5">
      <div className="flex justify-between">
        <h1 className="text-3xl">{name}</h1>
        <p className="text-2xl">🔥{streak}</p>
      </div>
      <p className="">{description}</p>
      <ProgressBar
        percentFilled={percentFilled}
        onClick={() => incrementStreak(_id)}
        progressText={msToDateString(
          new Date(lastIncrement).getTime() + frequency * 86400000 - Date.now(),
        )}
      />
    </div>
  );
}

function msToDateString(ms: number): string {
  let result: string = "🕒 ";
  if (ms >= 86400000) {
    result += Math.floor(ms / 86400000) + "d ";
    ms %= 86400000;
  }
  if (ms >= 360000) {
    result += Math.floor(ms / 3600000) + "h ";
    ms %= 360000;
  }
  if (ms >= 60000) {
    result += Math.floor(ms / 60000) + "m ";
  }

  return result;
}
