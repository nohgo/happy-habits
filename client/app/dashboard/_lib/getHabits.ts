import { IHabit } from "../_ui/Habit";
import { cookies } from "next/headers";

export default async function getHabits(): Promise<IHabit[]> {
  const authorization = cookies().get("token")?.value;

  if (!authorization) throw new Error("User has no authorization token");

  const response = await fetch(
    "http://localhost:5050/api/habits/getAllHabits",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: authorization,
      },
    },
  );
  return response as unknown as IHabit[];
}
