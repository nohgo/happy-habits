"use server";
import { cookies } from "next/headers";

export default async function getHabits() {
  console.log(cookies().getAll());
  const authorization = cookies().get("token")?.value;

  if (!authorization) throw new Error("User has no authorization token");

  const response = await fetch(
    "http://localhost:5050/api/habits/getAllHabits",
    {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization,
      },
    },
  );
  return (await response.json()) as [];
}
