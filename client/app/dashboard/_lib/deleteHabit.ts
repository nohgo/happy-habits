"use server";
import { cookies } from "next/headers";

export default async function deleteHabit(habitId: string): Promise<void> {
  const authorization = cookies().get("token")?.value;
  if (!authorization) throw new Error("User has no authorization token");
  await fetch("http://localhost:5050/api/habits/deleteHabit", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization,
    },
    body: JSON.stringify({
      habitId,
    }),
  });
}
