"use server";
import { cookies } from "next/headers";

export default async function getHabits() {
  const authorization = cookies().get("token")?.value;

  if (!authorization) throw new Error("User has no authorization token");

  const response = await fetch(`${process.env.SERVER_URL}/api/habits`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization,
    },
  });
  return (await response.json()) as [];
}
