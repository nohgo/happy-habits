"use server";
import { cookies } from "next/headers";

export default async function addHabit(formData: FormData) {
  const authorization = cookies().get("token")?.value;
  if (!authorization) throw new Error("User has no authorization token");

  await fetch("http://localhost:5050/api/habits", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization,
    },
    body: JSON.stringify({
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      frequency: formData.get("frequency") as string,
    }),
  });
}
