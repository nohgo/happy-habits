// preliminary assumptions -- this will be the child of a flexbox

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
  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
      <p>Streak: {streak}</p>
      <p>Frequency: {frequency}</p>
      <p>LastIncrement: {lastIncrement.toString()}</p>
    </div>
  );
}
