"use server";

import { cookies } from "next/headers";

export default async function getUserInfo() {
  const authorization = cookies().get("token")?.value;
  if (!authorization) throw new Error("User does not have authorization");

  const response = await fetch("http://localhost:5050/api/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization,
    },
  });

  return await response.json();
}
