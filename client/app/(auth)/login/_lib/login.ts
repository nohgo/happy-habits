"use server";

import { cookies } from "next/headers";

export default async function login(formData: FormData) {
  const emailUsername = formData.get("emailUsername") as string;
  const password = formData.get("password") as string;

  const response = await fetch(`${process.env.SERVER_URL}/api/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emailUsername,
      password,
    }),
  });

  // switch secure to true before prod
  cookies().set("token", `Bearer ${(await response.json()).token}`, {
    secure: true,
    httpOnly: true,
    maxAge: 60000 * 30,
  });

  return response.status;
}
