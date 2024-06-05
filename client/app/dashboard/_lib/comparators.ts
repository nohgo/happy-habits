import { IHabit } from "../_ui/Habit";

export function nameComparator(a: IHabit, b: IHabit): number {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

export function descriptionComparator(a: IHabit, b: IHabit): number {
  if (a.description < b.description) {
    return -1;
  }
  if (a.description > b.description) {
    return 1;
  }
  return 0;
}

export function streakComparator(a: IHabit, b: IHabit): number {
  return a.streak - b.streak;
}

export function frequencyComparator(a: IHabit, b: IHabit): number {
  return a.frequency - b.frequency;
}

export function lastIncrementedComparator(a: IHabit, b: IHabit): number {
  if (a.lastIncrement == null) {
    return -1;
  }
  if (b.lastIncrement == null) {
    return 1;
  }
  return (
    new Date(a.lastIncrement).getTime() - new Date(b.lastIncrement).getTime()
  );
}
