"use server";

import { cookies } from "next/headers";

export default async function deleteAccount(password: string) {
  const authorization = cookies().get("token")?.value;
  if (!authorization) throw new Error("User does not have authorization");

  fetch("localhost:5050/api/auth/delete-account", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization,
    },
    body: JSON.stringify({
      password,
    }),
  });
}
