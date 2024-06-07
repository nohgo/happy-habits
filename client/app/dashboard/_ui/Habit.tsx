// preliminary assumptions -- this will be the child of a flexbox

import deleteHabit from "../_lib/deleteHabit";
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
      (Date.now() - new Date(lastIncrement).getTime()) / (frequency * 86400000); // 86400000 is the number of milliseconds in a day
  }
  return (
    <div className="flex h-80 flex-col justify-between rounded-xl bg-grayscale-400 p-5">
      <div>
        <div className="flex justify-between">
          <h1 className="text-3xl">{name}</h1>
          <p className="text-2xl">🔥{streak}</p>
          <button
            onClick={async () => {
              await deleteHabit(_id);
              location.reload();
            }}
            className="text-5xl text-red-500 transition-all hover:brightness-75"
          >
            X
          </button>
        </div>
        <p className="">{description}</p>
      </div>
      <ProgressBar
        percentFilled={percentFilled}
        onClick={async () => await incrementStreak(_id)}
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
  if (ms >= 3600000) {
    result += Math.floor(ms / 3600000) + "h ";
    ms %= 3600000;
  }
  if (ms >= 60000) {
    result += Math.floor(ms / 60000) + "m ";
  }

  return result;
}
