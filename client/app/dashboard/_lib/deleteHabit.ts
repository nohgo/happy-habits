"use server";
import { cookies } from "next/headers";

export default async function deleteHabit(habitId: string): Promise<void> {
  const authorization = cookies().get("token")?.value;
  if (!authorization) throw new Error("User has no authorization token");
  await fetch(`${process.env.SERVER_URL}/api/habits/${habitId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization,
    },
  });
}
