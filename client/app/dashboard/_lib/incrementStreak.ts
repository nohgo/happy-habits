"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default async function incrementStreak(habitId: String): Promise<void> {
  const authorization = cookies().get("token")?.value;

  if (!authorization) throw new Error("User has no authorization token");

  await fetch(`http://localhost:5050/api/habits/increment/${habitId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization,
    },
  }),
    revalidatePath("/dashboard");
}
